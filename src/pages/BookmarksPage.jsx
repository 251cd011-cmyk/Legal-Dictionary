import React, { useState } from 'react';
import { Bookmark, Trash2, ArrowRight, Download, Search, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTermBySlug } from '../data/legalData';
import TermCard from '../components/TermCard';

export default function BookmarksPage() {
  const { bookmarks, clearBookmarks, navigate, addToast } = useApp();
  const [filterQuery, setFilterQuery] = useState('');

  const savedTerms = bookmarks
    .map((slug) => getTermBySlug(slug))
    .filter(Boolean)
    .filter((term) =>
      term.term.toLowerCase().includes(filterQuery.toLowerCase()) ||
      term.simpleMeaning.toLowerCase().includes(filterQuery.toLowerCase()) ||
      term.category.toLowerCase().includes(filterQuery.toLowerCase())
    );

  const handleExport = () => {
    if (bookmarks.length === 0) return;
    const exportData = savedTerms.map((t) => ({
      term: t.term,
      category: t.category,
      phonetic: t.phonetic,
      simpleMeaning: t.simpleMeaning,
      link: `https://lexiclear.app/term/${t.slug}`
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lexi-clear-saved-terms-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded your saved legal dictionary terms!', 'success');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <div className="hero-badge" style={{ marginBottom: '0.75rem' }}>
            <Bookmark size={15} />
            <span>Personal Legal Library</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Saved Legal Terms
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {bookmarks.length} {bookmarks.length === 1 ? 'definition' : 'definitions'} bookmarked for quick revision and study.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={handleExport}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              <Download size={15} /> Export JSON
            </button>
            <button
              type="button"
              onClick={clearBookmarks}
              className="btn btn-ghost"
              style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
            >
              <Trash2 size={15} /> Clear All
            </button>
          </div>
        )}
      </div>

      {/* Filter Input if terms exist */}
      {bookmarks.length > 0 && (
        <div style={{ maxWidth: '500px', marginBottom: '1.75rem' }}>
          <div className="search-bar-form">
            <div className="search-icon-prefix">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter your saved terms..."
              className="search-input-field"
              style={{ padding: '0.75rem 0.5rem', fontSize: '0.925rem' }}
            />
          </div>
        </div>
      )}

      {/* Grid of Saved Terms */}
      {savedTerms.length > 0 ? (
        <div className="grid-terms">
          {savedTerms.map((term) => (
            <TermCard key={term.slug} term={term} />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="card" style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand-primary-subtle)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}
          >
            <Bookmark size={30} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Saved Terms Yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 1.5rem', fontSize: '0.925rem' }}>
            Bookmark legal terms, principles, or court procedures while browsing to build your personal legal study repository.
          </p>
          <button
            type="button"
            onClick={() => navigate('/search')}
            className="btn btn-primary"
          >
            <span>Explore Legal Terms</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            No saved terms matching "{filterQuery}".
          </p>
          <button
            type="button"
            onClick={() => setFilterQuery('')}
            className="btn btn-secondary"
            style={{ marginTop: '1rem' }}
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
}
