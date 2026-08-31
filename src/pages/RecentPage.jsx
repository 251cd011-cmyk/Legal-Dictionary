import React from 'react';
import { Clock, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTermBySlug } from '../data/legalData';
import TermCard from '../components/TermCard';

export default function RecentPage() {
  const { recentlyViewed, clearRecentlyViewed, navigate } = useApp();

  const recentTerms = recentlyViewed
    .map((slug) => getTermBySlug(slug))
    .filter(Boolean);

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
            <Clock size={15} />
            <span>Browsing History</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Recently Viewed Legal Terms
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            A log of legal definitions and explanations you recently opened in this session.
          </p>
        </div>

        {recentTerms.length > 0 && (
          <button
            type="button"
            onClick={clearRecentlyViewed}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <Trash2 size={15} /> Clear History
          </button>
        )}
      </div>

      {/* Grid */}
      {recentTerms.length > 0 ? (
        <div className="grid-terms">
          {recentTerms.map((term) => (
            <TermCard key={term.slug} term={term} />
          ))}
        </div>
      ) : (
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
            <Clock size={30} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Search History
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 1.5rem', fontSize: '0.925rem' }}>
            Terms you explore will automatically appear here for easy reference.
          </p>
          <button
            type="button"
            onClick={() => navigate('/search')}
            className="btn btn-primary"
          >
            <span>Search Legal Dictionary</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
