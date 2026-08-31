import React from 'react';
import { ArrowRight, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CategoryBadge from './CategoryBadge';
import BookmarkButton from './BookmarkButton';

export default function TermCard({ term }) {
  const { navigate, openShareModal } = useApp();

  if (!term) return null;

  const handleCardClick = () => {
    navigate(`/term/${term.slug}`);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    openShareModal(term);
  };

  return (
    <div
      onClick={handleCardClick}
      className="term-card card-interactive"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View legal definition for ${term.term}`}
    >
      <div>
        <div className="term-card-header">
          <div className="term-card-title-group">
            <h3 className="term-card-title">
              {term.term}
            </h3>
            {term.phonetic && (
              <span className="term-card-phonetic">{term.phonetic}</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <button
              onClick={handleShare}
              className="btn-ghost"
              style={{ padding: '0.35rem', borderRadius: 'var(--radius-md)' }}
              aria-label={`Share ${term.term}`}
              title="Share term"
            >
              <Share2 size={16} />
            </button>
            <BookmarkButton termSlug={term.slug} size={17} />
          </div>
        </div>

        <div style={{ marginBottom: '0.85rem' }}>
          <CategoryBadge
            categoryName={term.category}
            categorySlug={term.categorySlug}
          />
        </div>

        <p className="term-card-meaning">
          {term.simpleMeaning}
        </p>
      </div>

      <div className="term-card-footer">
        <span className="term-card-cta">
          View Definition <ArrowRight size={15} />
        </span>
        {term.keyPoints && term.keyPoints.length > 0 && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {term.keyPoints.length} key points
          </span>
        )}
      </div>
    </div>
  );
}
