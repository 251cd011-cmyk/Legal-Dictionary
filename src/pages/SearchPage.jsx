import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Sparkles,
  ArrowUpDown,
  BookOpen,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEGAL_TERMS, CATEGORIES, searchLegalTerms } from '../data/legalData';
import SearchBar from '../components/SearchBar';
import TermCard from '../components/TermCard';
import EmptyState from '../components/EmptyState';

export default function SearchPage() {
  const { currentPath, globalSearchQuery, selectedCategoryFilter } = useApp();

  // Read URL search params
  const [query, setQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || globalSearchQuery || '';
    }
    return '';
  });

  const [activeCategory, setActiveCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('cat') || selectedCategoryFilter || 'all';
    }
    return 'all';
  });

  const [sortBy, setSortBy] = useState('relevance'); // 'relevance' | 'alpha' | 'popular'

  // Update query when path changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const cat = params.get('cat');
    if (q !== null) setQuery(q);
    if (cat !== null) setActiveCategory(cat);
  }, [currentPath]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    const params = new URLSearchParams();
    if (newQuery) params.set('q', newQuery);
    if (activeCategory && activeCategory !== 'all') params.set('cat', activeCategory);
    const newUrl = `/search${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  const handleCategorySelect = (catSlug) => {
    setActiveCategory(catSlug);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (catSlug && catSlug !== 'all') params.set('cat', catSlug);
    const newUrl = `/search${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  // Filtered and sorted results
  const filteredResults = useMemo(() => {
    let results = searchLegalTerms(query, activeCategory);

    if (sortBy === 'alpha') {
      results = [...results].sort((a, b) => a.term.localeCompare(b.term));
    } else if (sortBy === 'popular') {
      results = [...results].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return results;
  }, [query, activeCategory, sortBy]);

  const resetAllFilters = () => {
    setQuery('');
    setActiveCategory('all');
    setSortBy('relevance');
    window.history.replaceState({}, '', '/search');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.25rem 4rem' }}>
      {/* Search Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Search Legal Dictionary
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Explore terms, latin legal maxims, court procedures, and statutory definitions.
        </p>

        {/* Large Prominent Search Bar */}
        <div style={{ marginTop: '1.5rem', maxWidth: '800px' }}>
          <SearchBar
            initialValue={query}
            onSearch={handleSearchSubmit}
            placeholder="Search by legal term or keyword, e.g. 'Bail', 'Custody', 'Indemnity'..."
          />
        </div>
      </div>

      {/* Category Filter Pills (12 Branches) */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Filter by Area of Law:
          </span>
          {(activeCategory !== 'all' || query) && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="btn btn-ghost"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', color: 'var(--brand-primary)' }}
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="filter-bar">
          <button
            type="button"
            onClick={() => handleCategorySelect('all')}
            className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
          >
            All Disciplines ({LEGAL_TERMS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleCategorySelect(cat.slug)}
              className={`filter-pill ${activeCategory === cat.slug ? 'active' : ''}`}
            >
              {cat.name} ({cat.termCount})
            </button>
          ))}
        </div>
      </div>

      {/* Results Header & Sort Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {filteredResults.length} {filteredResults.length === 1 ? 'Legal Term' : 'Legal Terms'} Found
          </span>
          {query && (
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
              for <strong style={{ color: 'var(--brand-primary)' }}>"{query}"</strong>
            </span>
          )}
        </div>

        {/* Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowUpDown size={15} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="relevance">Most Relevant</option>
            <option value="alpha">Alphabetical (A to Z)</option>
            <option value="popular">Popular First</option>
          </select>
        </div>
      </div>

      {/* Search Results Grid */}
      {filteredResults.length > 0 ? (
        <div className="grid-terms">
          {filteredResults.map((term) => (
            <TermCard key={term.slug} term={term} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No legal terms matching "${query}"`}
          description="Try modifying your search keywords, clearing specific law branch filters, or trying voice search."
          query={query}
        />
      )}
    </div>
  );
}
