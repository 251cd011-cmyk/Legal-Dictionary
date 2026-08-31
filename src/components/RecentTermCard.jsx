import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CategoryBadge from './CategoryBadge';

export default function RecentTermCard({ term }) {
  const { navigate } = useApp();

  if (!term) return null;

  return (
    <div
      onClick={() => navigate(`/term/${term.slug}`)}
      className="card card-interactive"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/term/${term.slug}`);
        }
      }}
      style={{
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 0 }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            flexShrink: 0
          }}
        >
          <Clock size={18} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {term.term}
            </h4>
            <CategoryBadge categoryName={term.category} categorySlug={term.categorySlug} />
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {term.simpleMeaning}
          </p>
        </div>
      </div>

      <div style={{ color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <ArrowRight size={16} />
      </div>
    </div>
  );
}
