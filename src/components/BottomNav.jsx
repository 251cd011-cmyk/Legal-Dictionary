import React from 'react';
import { BookOpen, Search, Scale, Bookmark, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BottomNav() {
  const { currentPath, navigate, bookmarks } = useApp();

  const navItems = [
    { path: '/', label: 'Home', icon: BookOpen },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/categories', label: 'Categories', icon: Scale },
    { path: '/bookmarks', label: 'Saved', icon: Bookmark, badge: bookmarks.length },
    { path: '/recent', label: 'Recent', icon: Clock }
  ];

  const isCurrent = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isCurrent(item.path);
        return (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className={`mobile-nav-btn ${active ? 'active' : ''}`}
            aria-label={item.label}
          >
            <Icon size={20} />
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="mobile-nav-badge">{item.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
