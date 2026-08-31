import React from 'react';
import { Scale, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/legalData';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Purpose */}
          <div>
            <div
              onClick={() => navigate('/')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer' }}
            >
              <div className="brand-icon-wrapper" style={{ width: '38px', height: '38px' }}>
                <Scale size={20} />
              </div>
              <span className="brand-title" style={{ fontSize: '1.25rem' }}>
                Lexi<span>Clear</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Demystifying complex legal terminology into simple, plain-English definitions, real-world examples, and statutory breakdowns for everyone.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.75rem',
                backgroundColor: 'var(--brand-primary-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                color: 'var(--brand-primary)',
                fontWeight: 600
              }}
            >
              <ShieldCheck size={14} />
              <span>Educational & Informational Resource</span>
            </div>
          </div>

          {/* Column 2: Core Areas of Law */}
          <div>
            <h4 className="footer-heading">Law Branches</h4>
            <ul className="footer-links">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <button
                    type="button"
                    onClick={() => navigate(`/categories/${cat.slug}`)}
                    className="footer-link"
                    style={{ textAlign: 'left' }}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Branches */}
          <div>
            <h4 className="footer-heading">Specialized Law</h4>
            <ul className="footer-links">
              {CATEGORIES.slice(6, 12).map((cat) => (
                <li key={cat.slug}>
                  <button
                    type="button"
                    onClick={() => navigate(`/categories/${cat.slug}`)}
                    className="footer-link"
                    style={{ textAlign: 'left' }}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Tools */}
          <div>
            <h4 className="footer-heading">Quick Access</h4>
            <ul className="footer-links">
              <li>
                <button type="button" onClick={() => navigate('/search')} className="footer-link">
                  Legal Search Bar
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/categories')} className="footer-link">
                  All 12 Categories
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/bookmarks')} className="footer-link">
                  Saved Definitions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/recent')} className="footer-link">
                  Recently Viewed
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('/term/bail')} className="footer-link">
                  Term of the Day (Bail)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '2rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5
          }}
        >
          <strong style={{ color: 'var(--text-primary)' }}>Legal Disclaimer:</strong> Lexi Clear provides legal definitions, simplified explanations, and examples for educational and general informational purposes only. Content does not constitute formal legal advice, attorney-client relationship, or official statutory counsel.
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Lexi Clear. All rights reserved. “Understand the law, simply.”
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>Built with modern legal typography & accessible design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
