import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Filter,
  ShieldAlert,
  Scale,
  Landmark,
  Users,
  Briefcase,
  FileCheck2,
  Home,
  HardHat,
  ShieldCheck,
  Receipt,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getCategoryBySlug, getTermsByCategory, CATEGORIES } from '../data/legalData';
import TermCard from '../components/TermCard';
import EmptyState from '../components/EmptyState';

const ICON_MAP = {
  ShieldAlert,
  Scale,
  Landmark,
  Users,
  Briefcase,
  FileCheck2,
  Home,
  HardHat,
  ShieldCheck,
  Receipt,
  ShoppingBag,
  Search,
};

export default function CategoryDetailPage({ categorySlug }) {
  const { navigate } = useApp();
  const [searchInCat, setSearchInCat] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');

  const category = getCategoryBySlug(categorySlug);
  const terms = getTermsByCategory(categorySlug);

  const IconComponent = category ? (ICON_MAP[category.iconName] || BookOpen) : BookOpen;

  // Available Alphabet Letters from terms
  const alphabet = ['ALL', ...Array.from(new Set(terms.map((t) => t.term[0].toUpperCase()))).sort()];

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      // Alphabet check
      if (selectedLetter !== 'ALL' && term.term[0].toUpperCase() !== selectedLetter) {
        return false;
      }
      // Text query check
      if (searchInCat.trim()) {
        const q = searchInCat.toLowerCase().trim();
        return (
          term.term.toLowerCase().includes(q) ||
          term.simpleMeaning.toLowerCase().includes(q) ||
          term.detailedExplanation.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [terms, searchInCat, selectedLetter]);

  if (!category) {
    return (
      <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <h2>Category Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem' }}>
          The requested legal category does not exist.
        </p>
        <button onClick={() => navigate('/categories')} className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Legal Categories
        </button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.25rem 4rem' }}>
      {/* Back Button & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => navigate('/categories')}
          className="btn btn-ghost"
          style={{ padding: '0.4rem 0.6rem' }}
        >
          <ArrowLeft size={16} />
          <span>All Categories</span>
        </button>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{category.name}</span>
      </div>

      {/* Category Banner Hero */}
      <div
        className="card"
        style={{
          padding: '2.25rem',
          backgroundColor: 'var(--bg-surface)',
          borderLeft: `5px solid ${category.color}`,
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div
            className="category-icon-box"
            style={{
              width: '56px',
              height: '56px',
              color: category.color,
              backgroundColor: category.bgLight,
              marginBottom: 0
            }}
          >
            <IconComponent size={30} />
          </div>

          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
                {category.name}
              </h1>
              <span
                className="badge"
                style={{
                  backgroundColor: category.bgLight,
                  color: category.color,
                  border: `1px solid ${category.color}40`,
                  fontSize: '0.8125rem'
                }}
              >
                {terms.length} Legal Terms
              </span>
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Search Within Category & Alphabet Nav */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ maxWidth: '600px', marginBottom: '1.25rem' }}>
          <div className="search-bar-form">
            <div className="search-icon-prefix">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchInCat}
              onChange={(e) => setSearchInCat(e.target.value)}
              placeholder={`Search within ${category.name} (e.g. term name or meaning)...`}
              className="search-input-field"
              style={{ padding: '0.75rem 0.5rem', fontSize: '0.925rem' }}
              aria-label={`Search within ${category.name}`}
            />
            {searchInCat && (
              <button
                type="button"
                onClick={() => setSearchInCat('')}
                className="search-action-btn"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Alphabet Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Index:
          </span>
          <div className="alphabet-bar" style={{ marginBottom: 0 }}>
            {alphabet.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(letter)}
                className={`alpha-btn ${selectedLetter === letter ? 'active' : ''}`}
                style={{ width: letter === 'ALL' ? '46px' : '32px' }}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid-terms">
          {filteredTerms.map((term) => (
            <TermCard key={term.slug} term={term} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No terms found in ${category.name}`}
          description={`No legal terms matching "${searchInCat}" within ${category.name}. Try broadening your search or exploring other branches.`}
          query={searchInCat}
        />
      )}

      {/* Explore Other Categories Footer Widget */}
      <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
          Explore Other Branches of Law
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {CATEGORIES.filter((c) => c.slug !== categorySlug).map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => navigate(`/categories/${c.slug}`)}
              className="quick-chip"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>{c.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({c.termCount})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
