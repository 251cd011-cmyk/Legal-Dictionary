import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BookmarkButton({ termSlug, size = 18, showLabel = false, className = '' }) {
  const { isBookmarked, toggleBookmark } = useApp();
  const saved = isBookmarked(termSlug);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleBookmark(termSlug);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? 'Remove from saved terms' : 'Save legal term'}
      title={saved ? 'Remove bookmark' : 'Bookmark this term'}
      className={`btn-ghost ${saved ? 'text-blue-600' : ''} ${className}`}
      style={{
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--radius-md)',
        color: saved ? 'var(--brand-primary)' : 'var(--text-muted)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        transition: 'all var(--transition-fast)'
      }}
    >
      {saved ? (
        <BookmarkCheck size={size} style={{ fill: 'var(--brand-primary)', color: 'var(--brand-primary)' }} />
      ) : (
        <Bookmark size={size} />
      )}
      {showLabel && (
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
          {saved ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}
