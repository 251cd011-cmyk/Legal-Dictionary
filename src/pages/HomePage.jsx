import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2,
  Clock,
  Trash2,
  Scale,
  Shield,
  FileText,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  LEGAL_TERMS,
  CATEGORIES,
  getPopularTerms,
  getTermOfTheDay,
  getTermBySlug
} from '../data/legalData';
import SearchBar from '../components/SearchBar';
import TermCard from '../components/TermCard';
import CategoryCard from '../components/CategoryCard';
import RecentTermCard from '../components/RecentTermCard';
import CategoryBadge from '../components/CategoryBadge';
import BookmarkButton from '../components/BookmarkButton';
import AudioPronounceButton from '../components/AudioPronounceButton';

export default function HomePage() {
  const {
    navigate,
    recentlyViewed,
    clearRecentlyViewed,
    executeSearch,
    openShareModal
  } = useApp();

  const popularTerms = getPopularTerms();
  const termOfTheDay = getTermOfTheDay();

  // Resolve recently viewed objects
  const recentTermObjects = recentlyViewed
    .map((slug) => getTermBySlug(slug))
    .filter(Boolean)
    .slice(0, 4);

  const heroKeywords = [
    'Bail',
    'FIR',
    'Negligence',
    'Defamation',
    'Contract',
    'Tort',
    'Habeas Corpus',
    'Indemnity'
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <Sparkles size={15} />
            <span>Modern Legal Dictionary & Knowledge Hub</span>
          </div>

          <h1 className="hero-title">
            Understand the Law, <span style={{ color: 'var(--brand-primary)' }}>Simply.</span>
          </h1>

          <p className="hero-subtitle">
            Quickly search, demystify, and explore legal terms through plain-English meanings, structured statutory breakdowns, real-world examples, and voice search.
          </p>

          <div className="hero-search-container">
            <SearchBar placeholder="Search legal terms (e.g. 'Bail', 'FIR', 'Tort', 'Habeas Corpus')..." />

            <div className="hero-quick-chips">
              <span className="quick-chip-label">Popular Searches:</span>
              {heroKeywords.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => executeSearch(kw)}
                  className="quick-chip"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '3rem' }}>
        {/* Term of the Day Spotlight */}
        {termOfTheDay && (
          <div className="spotlight-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div className="spotlight-badge">
                <Sparkles size={13} />
                Term of the Day
              </div>
              <CategoryBadge categoryName={termOfTheDay.category} categorySlug={termOfTheDay.categorySlug} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h2 className="spotlight-title">
                {termOfTheDay.term}
              </h2>
              <AudioPronounceButton text={termOfTheDay.term} label="" className="text-white" />
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: '1rem', fontStyle: 'italic' }}>
              {termOfTheDay.phonetic} • Origin: {termOfTheDay.origin}
            </p>

            <p className="spotlight-meaning">
              "{termOfTheDay.simpleMeaning}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => navigate(`/term/${termOfTheDay.slug}`)}
                className="btn btn-primary"
                style={{ backgroundColor: '#2563EB', color: '#FFFFFF' }}
              >
                <span>Read Full Explanation & Examples</span>
                <ArrowRight size={16} />
              </button>
              <BookmarkButton termSlug={termOfTheDay.slug} showLabel />
            </div>
          </div>
        )}

        {/* Popular Legal Terms */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <Sparkles size={22} style={{ color: 'var(--brand-accent)' }} />
                Popular Legal Terms
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Most frequently searched concepts across courts, contracts, and exams.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="btn btn-ghost"
              style={{ color: 'var(--brand-primary)' }}
            >
              <span>Explore All</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid-terms">
            {popularTerms.map((term) => (
              <TermCard key={term.slug} term={term} />
            ))}
          </div>
        </section>

        {/* Recently Viewed Terms Section */}
        {recentTermObjects.length > 0 && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div className="section-header">
              <div>
                <h2 className="section-title">
                  <Clock size={22} style={{ color: 'var(--brand-primary)' }} />
                  Recently Viewed Terms
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Continue reading definitions you recently explored.
                </p>
              </div>
              <button
                type="button"
                onClick={clearRecentlyViewed}
                className="btn btn-ghost"
                style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}
              >
                <Trash2 size={14} /> Clear History
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {recentTermObjects.map((term) => (
                <RecentTermCard key={term.slug} term={term} />
              ))}
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <Scale size={22} style={{ color: 'var(--brand-primary)' }} />
                Explore by Area of Law
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Browse terminology categorized across 12 distinct legal disciplines.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/categories')}
              className="btn btn-secondary"
            >
              <span>View All 12 Categories</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-categories">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={() => navigate('/categories')}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.75rem' }}
            >
              <span>View All 12 Legal Categories</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Educational Trust & Feature Highlights */}
        <section
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Why Rely on Lexi Clear?
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Built for law students, legal professionals, and everyday citizens seeking clarity in legal documents.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-subtle)' }}>
              <div style={{ color: 'var(--brand-primary)', marginBottom: '0.75rem' }}>
                <BookOpen size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Plain-English Translations</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Every single term starts with a simplified, jargon-free summary anyone can understand in seconds.
              </p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-subtle)' }}>
              <div style={{ color: 'var(--emerald-600)', marginBottom: '0.75rem' }}>
                <FileText size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Real-World Scenarios</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Detailed practical case studies showing how terms apply in daily contracts, courts, and police stations.
              </p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-subtle)' }}>
              <div style={{ color: 'var(--brand-accent)', marginBottom: '0.75rem' }}>
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>Voice & Document OCR</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Search by voice or scan real legal agreements to instantly highlight and define unknown clauses.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
