import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  BookOpen,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  getTermBySlug,
  getTermsByCategory,
  getCategoryBySlug,
  LEGAL_TERMS
} from '../data/legalData';
import CategoryBadge from '../components/CategoryBadge';
import BookmarkButton from '../components/BookmarkButton';
import AudioPronounceButton from '../components/AudioPronounceButton';
import TermCard from '../components/TermCard';

export default function TermDetailPage({ termSlug }) {
  const { navigate, addRecentlyViewed, openShareModal } = useApp();

  const term = getTermBySlug(termSlug);

  // Record into recently viewed
  useEffect(() => {
    if (term) {
      addRecentlyViewed(term.slug);
    }
  }, [termSlug, term]);

  if (!term) {
    return (
      <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Legal Term Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          We could not find the legal term definition you requested.
        </p>
        <button onClick={() => navigate('/search')} className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Legal Search
        </button>
      </div>
    );
  }

  // Related terms objects
  const relatedTerms = (term.relatedTermSlugs || [])
    .map((slug) => getTermBySlug(slug))
    .filter(Boolean);

  // Category sibling terms for next/prev navigation
  const categoryTerms = getTermsByCategory(term.categorySlug);
  const currentIndex = categoryTerms.findIndex((t) => t.slug === term.slug);
  const prevTerm = currentIndex > 0 ? categoryTerms[currentIndex - 1] : null;
  const nextTerm = currentIndex < categoryTerms.length - 1 ? categoryTerms[currentIndex + 1] : null;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.25rem 4rem' }}>
      {/* Breadcrumb Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          fontSize: '0.875rem'
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn-ghost"
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
        >
          Home
        </button>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <button
          type="button"
          onClick={() => navigate(`/categories/${term.categorySlug}`)}
          className="btn-ghost"
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
        >
          {term.category}
        </button>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{term.term}</span>
      </div>

      {/* Main Term Container Header */}
      <div className="term-detail-hero">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <CategoryBadge
                categoryName={term.category}
                categorySlug={term.categorySlug}
                onClick={() => navigate(`/categories/${term.categorySlug}`)}
              />
              {term.origin && (
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Origin: <em>{term.origin}</em>
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                {term.term}
              </h1>
              {term.phonetic && (
                <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {term.phonetic}
                </span>
              )}
            </div>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AudioPronounceButton text={term.term} label="Pronounce" />
            <button
              type="button"
              onClick={() => openShareModal(term)}
              className="btn btn-secondary"
              style={{ fontSize: '0.875rem', padding: '0.45rem 0.85rem' }}
            >
              <Share2 size={16} /> Share
            </button>
            <BookmarkButton termSlug={term.slug} showLabel />
          </div>
        </div>

        {/* Highlighted Card: In Simple Words */}
        <div className="detail-simple-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--emerald-700)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Sparkles size={18} />
            <span>In Simple Words</span>
          </div>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.6 }}>
            {term.simpleMeaning}
          </p>
        </div>

        {/* Detailed Explanation */}
        <div style={{ margin: '2.5rem 0' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} style={{ color: 'var(--brand-primary)' }} />
            Detailed Legal Explanation
          </h2>
          <div style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {term.detailedExplanation.split('\n\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Real-World Example Card */}
        {term.example && (
          <div className="detail-example-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              <Lightbulb size={18} />
              <span>Real-World Scenario / Example</span>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.65, fontStyle: 'italic' }}>
              "{term.example}"
            </p>
          </div>
        )}

        {/* Key Points & Takeaways */}
        {term.keyPoints && term.keyPoints.length > 0 && (
          <div style={{ margin: '2.5rem 0' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--emerald-600)' }} />
              Key Legal Takeaways
            </h2>
            <ul className="detail-takeaways-list">
              {term.keyPoints.map((point, i) => (
                <li key={i} className="detail-takeaway-item">
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--emerald-50)',
                      color: 'var(--emerald-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                      fontWeight: 700,
                      fontSize: '0.75rem'
                    }}
                  >
                    ✓
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Category Context & Next/Prev Sibling Navigation */}
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {prevTerm ? (
            <button
              type="button"
              onClick={() => navigate(`/term/${prevTerm.slug}`)}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              <ArrowLeft size={15} /> Previous: {prevTerm.term}
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={() => navigate(`/categories/${term.categorySlug}`)}
            className="btn btn-ghost"
            style={{ fontSize: '0.85rem', color: 'var(--brand-primary)' }}
          >
            Explore all in {term.category} ({categoryTerms.length})
          </button>

          {nextTerm ? (
            <button
              type="button"
              onClick={() => navigate(`/term/${nextTerm.slug}`)}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              Next: {nextTerm.term} <ArrowRight size={15} />
            </button>
          ) : <div />}
        </div>
      </div>

      {/* Related Terms Section */}
      {relatedTerms.length > 0 && (
        <section style={{ marginTop: '3.5rem' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <Sparkles size={22} style={{ color: 'var(--brand-primary)' }} />
                Related Legal Terms
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Explore interconnected legal doctrines, offences, and civil concepts.
              </p>
            </div>
          </div>

          <div className="grid-terms">
            {relatedTerms.map((relTerm) => (
              <TermCard key={relTerm.slug} term={relTerm} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
