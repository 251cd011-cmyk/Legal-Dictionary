/**
 * Lexi Clear — API Service
 * Handles all REST API communications with the Flask backend.
 */

const API_BASE = '/api';

export const api = {
  /**
   * Fetch all 12 legal categories
   */
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      const data = await res.json();
      return data.success ? data.categories : [];
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      return [];
    }
  },

  /**
   * Fetch a single category with its terms
   */
  async getCategoryDetail(slug) {
    try {
      const res = await fetch(`${API_BASE}/categories/${encodeURIComponent(slug)}`);
      const data = await res.json();
      return data.success ? data.category : null;
    } catch (err) {
      console.error(`Failed to fetch category ${slug}:`, err);
      return null;
    }
  },

  /**
   * Fetch legal terms with optional filters
   */
  async getTerms({ q = '', category = '', letter = '', popular = false, limit = 50, offset = 0 } = {}) {
    try {
      const params = new URLSearchParams();
      if (q) params.append('q', q);
      if (category && category !== 'all') params.append('category', category);
      if (letter) params.append('letter', letter);
      if (popular) params.append('popular', '1');
      if (limit) params.append('limit', limit);
      if (offset) params.append('offset', offset);

      const res = await fetch(`${API_BASE}/terms?${params.toString()}`);
      const data = await res.json();
      return data.success ? { terms: data.terms, total: data.total } : { terms: [], total: 0 };
    } catch (err) {
      console.error('Failed to fetch terms:', err);
      return { terms: [], total: 0 };
    }
  },

  /**
   * Fetch term details by slug (increments view count and updates recent views)
   */
  async getTermDetail(slug) {
    try {
      const res = await fetch(`${API_BASE}/terms/${encodeURIComponent(slug)}`);
      const data = await res.json();
      return data.success ? data.term : null;
    } catch (err) {
      console.error(`Failed to fetch term ${slug}:`, err);
      return null;
    }
  },

  /**
   * Search suggestions autocomplete
   */
  async getSuggestions(query) {
    if (!query || query.trim().length === 0) return [];
    try {
      const res = await fetch(`${API_BASE}/suggestions?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      return data.success ? data.suggestions : [];
    } catch (err) {
      console.error('Failed to fetch suggestions:', err);
      return [];
    }
  },

  /**
   * Scan document or text for legal terms
   */
  async scanDocument(payload) {
    try {
      let options = { method: 'POST' };
      if (payload instanceof FormData) {
        options.body = payload;
      } else {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
      }

      const res = await fetch(`${API_BASE}/scan`, options);
      return await res.json();
    } catch (err) {
      console.error('Document scan error:', err);
      return { success: false, error: 'Scan request failed.' };
    }
  },

  /**
   * Fetch recently viewed terms
   */
  async getRecent() {
    try {
      const res = await fetch(`${API_BASE}/recent`);
      const data = await res.json();
      return data.success ? data.recent : [];
    } catch (err) {
      console.error('Failed to fetch recent terms:', err);
      return [];
    }
  },

  /**
   * Clear viewing history
   */
  async clearRecent() {
    try {
      const res = await fetch(`${API_BASE}/recent`, { method: 'DELETE' });
      return await res.json();
    } catch (err) {
      console.error('Failed to clear recent history:', err);
      return { success: false };
    }
  },

  /**
   * Fetch bookmarks
   */
  async getBookmarks() {
    try {
      const res = await fetch(`${API_BASE}/bookmarks`);
      const data = await res.json();
      return data.success ? data.bookmarks : [];
    } catch (err) {
      console.error('Failed to fetch bookmarks:', err);
      return [];
    }
  },

  /**
   * Toggle bookmark status
   */
  async toggleBookmark(slug) {
    try {
      const res = await fetch(`${API_BASE}/bookmarks/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      });
      return await res.json();
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
      return { success: false };
    }
  },

  /**
   * Platform statistics
   */
  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const data = await res.json();
      return data.success ? data : null;
    } catch (err) {
      return null;
    }
  }
};
