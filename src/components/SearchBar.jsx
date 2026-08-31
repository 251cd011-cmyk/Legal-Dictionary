import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, ScanLine, X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEGAL_TERMS } from '../data/legalData';
import CategoryBadge from './CategoryBadge';

export default function SearchBar({
  placeholder = "Search legal terms, acts, e.g. 'Bail', 'Tort', 'Habeas Corpus'...",
  initialValue = "",
  onSearch,
  autoFocus = false,
  showCategoryFilter = false
}) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const {
    navigate,
    openVoiceModal,
    openScanModal,
    executeSearch
  } = useApp();

  // Sync initial value if changed
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Click outside listener for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions on input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length >= 1) {
      const q = value.toLowerCase().trim();
      const matches = LEGAL_TERMS.filter((item) =>
        item.term.toLowerCase().includes(q) ||
        item.simpleMeaning.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      ).slice(0, 6);
      setSuggestions(matches);
      setShowDropdown(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setShowDropdown(false);
    if (onSearch) {
      onSearch(query);
    } else {
      executeSearch(query);
    }
  };

  const handleSelectSuggestion = (term) => {
    setShowDropdown(false);
    navigate(`/term/${term.slug}`);
  };

  return (
    <div className="search-bar-wrapper" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="search-bar-form">
        <div className="search-icon-prefix">
          <Search size={20} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.trim().length >= 1 && suggestions.length > 0) {
              setShowDropdown(true);
            }
          }}
          placeholder={placeholder}
          className="search-input-field"
          autoFocus={autoFocus}
          aria-label="Search legal terms"
          autoComplete="off"
        />

        <div className="search-bar-actions">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="search-action-btn"
              title="Clear search"
              aria-label="Clear search text"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="button"
            onClick={openVoiceModal}
            className="search-action-btn"
            title="Voice Search"
            aria-label="Search with voice"
          >
            <Mic size={18} />
          </button>

          <button
            type="button"
            onClick={openScanModal}
            className="search-action-btn"
            title="Scan Document or Photo"
            aria-label="Scan legal document or image"
          >
            <ScanLine size={18} />
          </button>

          <button
            type="submit"
            className="btn search-submit-btn"
            aria-label="Submit search"
          >
            <span>Search</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="search-suggestions-dropdown">
          <div className="suggestion-header">
            Matching Legal Terms ({suggestions.length})
          </div>
          {suggestions.map((term) => (
            <div
              key={term.slug}
              className="suggestion-item"
              onClick={() => handleSelectSuggestion(term)}
            >
              <div>
                <div className="suggestion-term-title">{term.term}</div>
                <div className="suggestion-term-meaning">{term.simpleMeaning}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CategoryBadge categoryName={term.category} categorySlug={term.categorySlug} />
                <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
