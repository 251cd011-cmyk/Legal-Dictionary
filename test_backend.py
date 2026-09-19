"""
Automated backend and API verification script for Lexi Clear.
Tests all endpoints using Flask's test client.
"""

import json
from app import app
import database

def run_tests():
    database.init_db()
    client = app.test_client()

    print("=== RUNNING LEXI CLEAR BACKEND VERIFICATION ===")

    # 1. Test Categories
    res = client.get("/api/categories")
    assert res.status_code == 200, f"Categories failed: {res.status_code}"
    data = res.get_json()
    assert data["success"] is True
    assert len(data["categories"]) == 12, f"Expected 12 categories, got {len(data['categories'])}"
    print(f"PASS: /api/categories returned {len(data['categories'])} categories.")

    # 2. Test Category Detail
    res = client.get("/api/categories/criminal-law")
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert data["category"]["slug"] == "criminal-law"
    assert len(data["category"]["terms"]) > 0
    print(f"PASS: /api/categories/criminal-law returned {len(data['category']['terms'])} terms.")

    # 3. Test Terms search
    res = client.get("/api/terms?q=bail")
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert any("bail" in t["name"].lower() for t in data["terms"])
    print(f"PASS: /api/terms?q=bail returned {len(data['terms'])} matching terms.")

    # 4. Test Popular Terms
    res = client.get("/api/terms?popular=true")
    assert res.status_code == 200
    data = res.get_json()
    assert len(data["terms"]) >= 6
    print(f"PASS: /api/terms?popular=true returned {len(data['terms'])} popular terms.")

    # 5. Test Term Detail
    res = client.get("/api/terms/bail")
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert data["term"]["name"] == "Bail"
    assert "simple_meaning" in data["term"]
    assert "detailed_explanation" in data["term"]
    assert "example" in data["term"]
    assert len(data["term"]["key_points"]) > 0
    print(f"PASS: /api/terms/bail returned detailed term with {len(data['term']['key_points'])} key points.")

    # 6. Test Suggestions
    res = client.get("/api/suggestions?q=neg")
    assert res.status_code == 200
    data = res.get_json()
    assert len(data["suggestions"]) > 0
    assert any("negligence" in s["name"].lower() for s in data["suggestions"])
    print(f"PASS: /api/suggestions?q=neg returned {len(data['suggestions'])} suggestions.")

    # 7. Test Scan Document
    sample_text = "This contract is executed for valuable consideration. Failure to perform is a breach of contract causing damages."
    res = client.post("/api/scan", json={"text": sample_text})
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert data["detected_count"] >= 3
    detected_names = [t["name"].lower() for t in data["detected_terms"]]
    print(f"PASS: /api/scan detected terms: {detected_names}")

    # 8. Test Bookmarks Toggle
    res = client.post("/api/bookmarks/toggle", json={"slug": "habeas-corpus"})
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert "is_bookmarked" in data
    print(f"PASS: /api/bookmarks/toggle successful, is_bookmarked: {data['is_bookmarked']}")

    # 9. Test Recent Views
    res = client.get("/api/recent")
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    print(f"PASS: /api/recent returned {len(data['recent'])} recent items.")

    # 10. Test Stats
    res = client.get("/api/stats")
    assert res.status_code == 200
    data = res.get_json()
    assert data["total_terms"] >= 45
    print(f"PASS: /api/stats total_terms: {data['total_terms']}, categories: {data['total_categories']}")

    # 11. Test Frontend SPA Routes
    routes_to_test = ["/", "/search", "/categories", "/categories/civil-law", "/term/bail", "/bookmarks", "/recent"]
    for r in routes_to_test:
        res = client.get(r)
        assert res.status_code == 200, f"Route {r} failed with {res.status_code}"
        assert b"Lexi Clear" in res.data
    print(f"PASS: All {len(routes_to_test)} SPA routes serve index.html successfully.")

    print("\nALL 11 BACKEND VERIFICATION CHECKS PASSED!")

if __name__ == "__main__":
    run_tests()
