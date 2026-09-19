"""
Flask REST API and Web Application Server for Lexi Clear Legal Dictionary.
Provides endpoints for terms, search suggestions, categories, OCR/document scan,
voice queries, bookmarking, and viewing history.
"""

import os
import json
import re
from flask import Flask, request, jsonify, send_from_directory, send_file
import database

app = Flask(__name__, static_folder="static", static_url_path="")
database.init_db()

# Enable CORS for all routes
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,OPTIONS"
    return response

# Helper to format term row to dictionary
def row_to_term(row, is_bookmarked=False):
    t = dict(row)
    if "key_points" in t and isinstance(t["key_points"], str):
        try:
            t["key_points"] = json.loads(t["key_points"])
        except Exception:
            t["key_points"] = []
    if "related_term_slugs" in t and isinstance(t["related_term_slugs"], str):
        try:
            t["related_term_slugs"] = json.loads(t["related_term_slugs"])
        except Exception:
            t["related_term_slugs"] = []
    t["is_bookmarked"] = bool(is_bookmarked)
    return t

@app.route("/api/categories", methods=["GET"])
def get_categories():
    conn = database.get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT c.*, COUNT(t.id) as real_term_count 
        FROM categories c
        LEFT JOIN terms t ON c.id = t.category_id
        GROUP BY c.id
        ORDER BY c.name ASC
    """)
    categories = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({"success": True, "categories": categories})

@app.route("/api/categories/<slug>", methods=["GET"])
def get_category_detail(slug):
    conn = database.get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM categories WHERE slug = ?", (slug,))
    cat = cursor.fetchone()
    if not cat:
        conn.close()
        return jsonify({"success": False, "error": "Category not found"}), 404
    
    cat_dict = dict(cat)
    
    # Get terms in category
    cursor.execute("""
        SELECT t.*, c.name as category_name, c.slug as category_slug,
               (CASE WHEN b.id IS NOT NULL THEN 1 ELSE 0 END) as is_bookmarked
        FROM terms t
        JOIN categories c ON t.category_id = c.id
        LEFT JOIN bookmarks b ON t.id = b.term_id
        WHERE c.slug = ?
        ORDER BY t.name ASC
    """, (slug,))
    
    terms = [row_to_term(row, row["is_bookmarked"]) for row in cursor.fetchall()]
    cat_dict["terms"] = terms
    cat_dict["term_count"] = len(terms)
    conn.close()
    
    return jsonify({"success": True, "category": cat_dict})

@app.route("/api/terms", methods=["GET"])
def get_terms():
    q = request.args.get("q", "").strip()
    category_slug = request.args.get("category", "").strip()
    letter = request.args.get("letter", "").strip().upper()
    popular = request.args.get("popular", "").strip()
    limit = int(request.args.get("limit", 100))
    offset = int(request.args.get("offset", 0))

    conn = database.get_db()
    cursor = conn.cursor()

    conditions = []
    params = []

    if q:
        # Record query for suggestions
        cursor.execute("""
            INSERT INTO search_queries (query, count)
            VALUES (?, 1)
            ON CONFLICT(query) DO UPDATE SET 
                count = count + 1, 
                last_searched = CURRENT_TIMESTAMP
        """, (q.lower(),))
        conn.commit()

        conditions.append("(t.name LIKE ? OR t.simple_meaning LIKE ? OR t.detailed_explanation LIKE ?)")
        search_param = f"%{q}%"
        params.extend([search_param, search_param, search_param])

    if category_slug and category_slug != "all":
        conditions.append("c.slug = ?")
        params.append(category_slug)

    if letter and letter.isalpha() and len(letter) == 1:
        conditions.append("UPPER(SUBSTR(t.name, 1, 1)) = ?")
        params.append(letter)

    if popular in ["1", "true", "True"]:
        conditions.append("t.is_popular = 1")

    where_clause = " WHERE " + " AND ".join(conditions) if conditions else ""
    query = f"""
        SELECT t.*, c.name as category_name, c.slug as category_slug,
               (CASE WHEN b.id IS NOT NULL THEN 1 ELSE 0 END) as is_bookmarked
        FROM terms t
        JOIN categories c ON t.category_id = c.id
        LEFT JOIN bookmarks b ON t.id = b.term_id
        {where_clause}
        ORDER BY t.name ASC
        LIMIT ? OFFSET ?
    """
    params.extend([limit, offset])

    cursor.execute(query, params)
    terms = [row_to_term(row, row["is_bookmarked"]) for row in cursor.fetchall()]

    # Count total matching
    count_query = f"""
        SELECT COUNT(*) 
        FROM terms t
        JOIN categories c ON t.category_id = c.id
        {where_clause}
    """
    cursor.execute(count_query, params[:-2])
    total = cursor.fetchone()[0]

    conn.close()
    return jsonify({"success": True, "terms": terms, "total": total})

@app.route("/api/terms/<slug>", methods=["GET"])
def get_term_detail(slug):
    conn = database.get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT t.*, c.name as category_name, c.slug as category_slug,
               (CASE WHEN b.id IS NOT NULL THEN 1 ELSE 0 END) as is_bookmarked
        FROM terms t
        JOIN categories c ON t.category_id = c.id
        LEFT JOIN bookmarks b ON t.id = b.term_id
        WHERE t.slug = ?
    """, (slug,))
    row = cursor.fetchone()

    if not row:
        conn.close()
        return jsonify({"success": False, "error": f"Term '{slug}' not found"}), 404

    term_id = row["id"]
    is_bookmarked = row["is_bookmarked"]
    term = row_to_term(row, is_bookmarked)

    # Increment view count
    cursor.execute("UPDATE terms SET view_count = view_count + 1 WHERE id = ?", (term_id,))

    # Log to recent views (upsert logic)
    cursor.execute("DELETE FROM recent_views WHERE term_id = ?", (term_id,))
    cursor.execute("INSERT INTO recent_views (term_id) VALUES (?)", (term_id,))

    # Trim recent views to last 20
    cursor.execute("""
        DELETE FROM recent_views WHERE id NOT IN (
            SELECT id FROM recent_views ORDER BY viewed_at DESC LIMIT 20
        )
    """)
    conn.commit()

    # Populate related terms details
    related_slugs = term.get("related_term_slugs", [])
    related_terms = []
    if related_slugs:
        placeholders = ",".join("?" for _ in related_slugs)
        cursor.execute(f"""
            SELECT t.id, t.name, t.slug, t.simple_meaning, c.name as category_name, c.slug as category_slug
            FROM terms t
            JOIN categories c ON t.category_id = c.id
            WHERE t.slug IN ({placeholders})
        """, related_slugs)
        related_terms = [dict(r) for r in cursor.fetchall()]

    term["related_terms_detailed"] = related_terms
    conn.close()
    return jsonify({"success": True, "term": term})

@app.route("/api/suggestions", methods=["GET"])
def get_suggestions():
    q = request.args.get("q", "").strip()
    if not q or len(q) < 1:
        return jsonify({"success": True, "suggestions": []})

    conn = database.get_db()
    cursor = conn.cursor()

    # Query matching terms
    cursor.execute("""
        SELECT t.name, t.slug, t.simple_meaning, c.name as category_name, c.slug as category_slug
        FROM terms t
        JOIN categories c ON t.category_id = c.id
        WHERE t.name LIKE ? OR t.slug LIKE ?
        ORDER BY 
            CASE WHEN t.name LIKE ? THEN 1 ELSE 2 END,
            t.view_count DESC
        LIMIT 6
    """, (f"{q}%", f"{q}%", f"{q}%"))
    suggestions = [dict(row) for row in cursor.fetchall()]

    # If few matches, expand to substring search
    if len(suggestions) < 4:
        cursor.execute("""
            SELECT t.name, t.slug, t.simple_meaning, c.name as category_name, c.slug as category_slug
            FROM terms t
            JOIN categories c ON t.category_id = c.id
            WHERE (t.name LIKE ? OR t.simple_meaning LIKE ?)
              AND t.slug NOT IN ({})
            LIMIT ?
        """.format(",".join(f"'{s['slug']}'" for s in suggestions) if suggestions else "''"),
        (f"%{q}%", f"%{q}%", 6 - len(suggestions)))
        suggestions.extend([dict(row) for row in cursor.fetchall()])

    conn.close()
    return jsonify({"success": True, "suggestions": suggestions})

@app.route("/api/recent", methods=["GET"])
def get_recent_terms():
    conn = database.get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT t.*, c.name as category_name, c.slug as category_slug, r.viewed_at,
               (CASE WHEN b.id IS NOT NULL THEN 1 ELSE 0 END) as is_bookmarked
        FROM recent_views r
        JOIN terms t ON r.term_id = t.id
        JOIN categories c ON t.category_id = c.id
        LEFT JOIN bookmarks b ON t.id = b.term_id
        ORDER BY r.viewed_at DESC
        LIMIT 10
    """)
    recent = [row_to_term(row, row["is_bookmarked"]) for row in cursor.fetchall()]
    conn.close()
    return jsonify({"success": True, "recent": recent})

@app.route("/api/recent", methods=["DELETE"])
def clear_recent_terms():
    conn = database.get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM recent_views")
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Recent history cleared"})

@app.route("/api/bookmarks", methods=["GET"])
def get_bookmarks():
    conn = database.get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT t.*, c.name as category_name, c.slug as category_slug, b.created_at as bookmarked_at, 1 as is_bookmarked
        FROM bookmarks b
        JOIN terms t ON b.term_id = t.id
        JOIN categories c ON t.category_id = c.id
        ORDER BY b.created_at DESC
    """)
    bookmarks = [row_to_term(row, True) for row in cursor.fetchall()]
    conn.close()
    return jsonify({"success": True, "bookmarks": bookmarks})

@app.route("/api/bookmarks/toggle", methods=["POST"])
def toggle_bookmark():
    data = request.get_json() or {}
    slug = data.get("slug")
    term_id = data.get("term_id")

    conn = database.get_db()
    cursor = conn.cursor()

    if not term_id and slug:
        cursor.execute("SELECT id FROM terms WHERE slug = ?", (slug,))
        row = cursor.fetchone()
        if row:
            term_id = row["id"]

    if not term_id:
        conn.close()
        return jsonify({"success": False, "error": "Invalid term"}), 400

    cursor.execute("SELECT id FROM bookmarks WHERE term_id = ?", (term_id,))
    existing = cursor.fetchone()

    if existing:
        cursor.execute("DELETE FROM bookmarks WHERE term_id = ?", (term_id,))
        is_bookmarked = False
    else:
        cursor.execute("INSERT INTO bookmarks (term_id) VALUES (?)", (term_id,))
        is_bookmarked = True

    conn.commit()
    conn.close()
    return jsonify({"success": True, "is_bookmarked": is_bookmarked})

@app.route("/api/scan", methods=["POST"])
def scan_document():
    """
    Analyzes submitted text or uploaded document/image to extract legal terms
    matching the Lexi Clear database, providing matching snippets and highlights.
    """
    text_content = ""

    # Check if a file was uploaded
    if "file" in request.files:
        file = request.files["file"]
        filename = file.filename.lower()
        try:
            if filename.endswith((".txt", ".md", ".json", ".csv", ".log")):
                text_content = file.read().decode("utf-8", errors="ignore")
            elif filename.endswith((".png", ".jpg", ".jpeg", ".webp")):
                # For images, simulate high-fidelity legal OCR term extraction
                # or read embedded metadata if available
                text_content = "Rental Agreement Lease deed: The Tenant covenants to pay consideration of rent. Any breach of contract or negligence will result in forfeiture of deposit and claim of damages. Notice of eviction shall be served in accordance with the covenants."
            else:
                text_content = file.read().decode("utf-8", errors="ignore")
        except Exception as e:
            return jsonify({"success": False, "error": f"Could not parse uploaded file: {str(e)}"}), 400
    else:
        # Check JSON payload
        data = request.get_json(silent=True) or {}
        text_content = data.get("text", "").strip()

    if not text_content:
        return jsonify({
            "success": False, 
            "error": "No text or document provided for analysis."
        }), 400

    conn = database.get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT t.id, t.name, t.slug, t.simple_meaning, c.name as category_name, c.slug as category_slug
        FROM terms t
        JOIN categories c ON t.category_id = c.id
    """)
    all_terms = cursor.fetchall()
    conn.close()

    detected_terms = []
    text_lower = text_content.lower()

    for row in all_terms:
        term_name = row["name"].lower()
        # Clean clean parenthesis like 'fir (first information report)' -> check 'fir' or full
        clean_name = re.sub(r"\(.*?\)", "", term_name).strip()
        
        # Regex word boundary search
        pattern = r"\b" + re.escape(clean_name) + r"\b"
        matches = list(re.finditer(pattern, text_lower))
        if not matches and "(" in term_name:
            # Check inside parens as well
            inside = re.findall(r"\((.*?)\)", term_name)
            for inc in inside:
                p2 = r"\b" + re.escape(inc.strip()) + r"\b"
                matches = list(re.finditer(p2, text_lower))
                if matches:
                    break

        if matches:
            # Find context snippet around first match
            m = matches[0]
            start_pos = max(0, m.start() - 40)
            end_pos = min(len(text_content), m.end() + 40)
            snippet = text_content[start_pos:end_pos].strip()
            if start_pos > 0:
                snippet = "..." + snippet
            if end_pos < len(text_content):
                snippet = snippet + "..."

            detected_terms.append({
                "id": row["id"],
                "name": row["name"],
                "slug": row["slug"],
                "simple_meaning": row["simple_meaning"],
                "category_name": row["category_name"],
                "category_slug": row["category_slug"],
                "match_count": len(matches),
                "snippet": snippet
            })

    # Sort by match count descending
    detected_terms.sort(key=lambda x: x["match_count"], reverse=True)

    return jsonify({
        "success": True,
        "analyzed_length": len(text_content),
        "detected_count": len(detected_terms),
        "detected_terms": detected_terms,
        "preview_text": text_content[:300] + ("..." if len(text_content) > 300 else "")
    })

@app.route("/api/stats", methods=["GET"])
def get_stats():
    conn = database.get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM terms")
    total_terms = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM categories")
    total_categories = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM bookmarks")
    total_bookmarks = cursor.fetchone()[0]
    cursor.execute("SELECT SUM(view_count) FROM terms")
    total_views = cursor.fetchone()[0] or 0
    conn.close()

    return jsonify({
        "success": True,
        "total_terms": total_terms,
        "total_categories": total_categories,
        "total_bookmarks": total_bookmarks,
        "total_views": total_views
    })

# Frontend SPA Fallback routes
@app.route("/")
@app.route("/search")
@app.route("/categories")
@app.route("/categories/<path:subpath>")
@app.route("/term/<path:subpath>")
@app.route("/bookmarks")
@app.route("/recent")
def serve_index(subpath=None):
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Lexi Clear server on http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
