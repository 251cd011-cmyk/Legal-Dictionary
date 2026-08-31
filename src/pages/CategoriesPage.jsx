import React, { useState } from 'react';
import { Scale, Search, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/legalData';
import CategoryCard from '../components/CategoryCard';

export default function CategoriesPage() {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.25rem 4rem' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
        <div className="hero-badge" style={{ margin: '0 auto 1rem' }}>
          <Scale size={15} />
          <span>12 Core Disciplines</span>
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Legal Categories
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Explore legal terms by area of law. From constitutional writs to corporate mergers and cybercrime regulations, discover structured legal clarity.
        </p>

        {/* Quick category search */}
        <div
          style={{
            marginTop: '1.75rem',
            position: 'relative',
            maxWidth: '480px',
            margin: '1.75rem auto 0'
          }}
        >
          <div className="search-bar-form" style={{ padding: '0 0.5rem' }}>
            <div className="search-icon-prefix" style={{ marginLeft: '0.5rem' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter categories (e.g. Criminal, Cyber, Tax)..."
              className="search-input-field"
              style={{ padding: '0.75rem 0.5rem', fontSize: '0.925rem' }}
              aria-label="Filter legal categories"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid-categories">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            No legal branch matching "{filterQuery}".
          </p>
          <button
            type="button"
            onClick={() => setFilterQuery('')}
            className="btn btn-secondary"
            style={{ marginTop: '1rem' }}
          >
            Show All 12 Categories
          </button>
        </div>
      )}
    </div>
  );
}
