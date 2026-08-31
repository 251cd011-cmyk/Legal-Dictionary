import React from 'react';
import { SearchX, HelpCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EmptyState({
  title = "No legal terms found",
  description = "We couldn't find any definitions matching your search. Try checking your spelling or explore popular categories.",
  query = ""
}) {
  const { navigate, executeSearch } = useApp();

  const suggestedTerms = ['Bail', 'Tort', 'Habeas Corpus', 'Indemnity', 'FIR', 'Negligence'];

  return (
    <div
      className="card"
      style={{
        textAlign: 'center',
        padding: '3rem 1.5rem',
        margin: '2rem 0',
        backgroundColor: 'var(--bg-surface)'
      }}
    >
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
        <SearchX size={32} />
      </div>

      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
        {title}
      </h3>

      <p style={{ maxWidth: '480px', margin: '0 auto 1.5rem', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
        {description}
      </p>

      <div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Try searching for:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
          {suggestedTerms.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => executeSearch(term)}
              className="quick-chip"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button
          type="button"
          onClick={() => navigate('/categories')}
          className="btn btn-secondary"
        >
          <span>Browse All 12 Legal Categories</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
