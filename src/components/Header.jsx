import React from 'react';
import {
  Scale,
  Search,
  BookOpen,
  Bookmark,
  Clock,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const {
    currentPath,
    navigate,
    theme,
    toggleTheme,
    bookmarks,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();

  const navLinks = [
    { path: '/', label: 'Home', icon: BookOpen },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/categories', label: 'Categories', icon: Scale },
    { path: '/bookmarks', label: 'Saved Terms', icon: Bookmark, badge: bookmarks.length },
    { path: '/recent', label: 'Recently Viewed', icon: Clock }
  ];

  const isCurrent = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          {/* Brand Logo */}
          <div
            onClick={() => navigate('/')}
            className="brand-logo"
            style={{ cursor: 'pointer' }}
            tabIndex={0}
            role="link"
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/')}
          >
            <div className="brand-icon-wrapper">
              <Scale size={22} />
            </div>
            <div className="brand-text">
              <span className="brand-title">
                Lexi<span>Clear</span>
              </span>
              <span className="brand-tagline">Understand the law, simply</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isCurrent(item.path);
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`nav-link ${active ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="nav-counter-badge">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Action Controls */}
          <div className="header-actions">
            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="btn-icon"
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
            </button>

            {/* Quick Search Button (Desktop) */}
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="btn btn-primary"
              style={{ display: 'none', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              <Search size={15} />
              <span>Search Law</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-icon"
              style={{ display: 'flex' }}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
