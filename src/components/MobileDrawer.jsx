import React from 'react';
import {
  X,
  BookOpen,
  Search,
  Scale,
  Bookmark,
  Clock,
  Mic,
  ScanLine,
  Sun,
  Moon,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/legalData';

export default function MobileDrawer() {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentPath,
    navigate,
    theme,
    toggleTheme,
    bookmarks,
    openVoiceModal,
    openScanModal
  } = useApp();

  if (!isMobileMenuOpen) return null;

  const handleNav = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className="modal-backdrop"
      style={{ zIndex: 95, justifyContent: 'flex-start', padding: 0 }}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <div
        style={{
          width: '85%',
          maxWidth: '340px',
          height: '100%',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRight: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
              <Scale size={18} />
            </div>
            <div>
              <span className="brand-title" style={{ fontSize: '1.2rem' }}>
                Lexi<span>Clear</span>
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Legal Dictionary</span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-icon"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Tools */}
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => { setIsMobileMenuOpen(false); openVoiceModal(); }}
            className="btn btn-secondary"
            style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
          >
            <Mic size={16} style={{ color: 'var(--brand-primary)' }} />
            Voice Search
          </button>
          <button
            type="button"
            onClick={() => { setIsMobileMenuOpen(false); openScanModal(); }}
            className="btn btn-secondary"
            style={{ fontSize: '0.8125rem', padding: '0.5rem' }}
          >
            <ScanLine size={16} style={{ color: 'var(--brand-primary)' }} />
            Scan Doc
          </button>
        </div>

        {/* Primary Links */}
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {[
            { path: '/', label: 'Home', icon: BookOpen },
            { path: '/search', label: 'Legal Search', icon: Search },
            { path: '/categories', label: '12 Law Branches', icon: Scale },
            { path: '/bookmarks', label: 'Saved Terms', icon: Bookmark, badge: bookmarks.length },
            { path: '/recent', label: 'Recently Viewed', icon: Clock }
          ].map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNav(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: active ? 'var(--brand-primary-subtle)' : 'transparent',
                  color: active ? 'var(--brand-primary)' : 'var(--text-primary)',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.925rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 ? (
                  <span className="nav-counter-badge">{item.badge}</span>
                ) : (
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Popular Categories */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
            Browse Law Branches
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {CATEGORIES.slice(0, 8).map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleNav(`/categories/${cat.slug}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cat.termCount}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Theme Toggle */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {theme === 'light' ? 'Light Appearance' : 'Dark Appearance'}
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            className="btn-icon"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
