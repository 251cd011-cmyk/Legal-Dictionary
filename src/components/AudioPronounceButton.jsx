import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AudioPronounceButton({ text, label = 'Listen', size = 18, className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { addToast } = useApp();

  const handlePronounce = (e) => {
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      addToast('Audio pronunciation is not supported in this browser.', 'error');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any active speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        setIsPlaying(false);
        addToast('Audio playback error', 'error');
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error(err);
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePronounce}
      aria-label={`Pronounce ${text}`}
      title="Listen to pronunciation"
      className={`btn-ghost ${className}`}
      style={{
        padding: '0.4rem 0.65rem',
        borderRadius: 'var(--radius-md)',
        color: isPlaying ? 'var(--brand-primary)' : 'var(--text-secondary)',
        backgroundColor: isPlaying ? 'var(--brand-primary-subtle)' : 'transparent',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem'
      }}
    >
      <Volume2
        size={size}
        style={{
          color: isPlaying ? 'var(--brand-primary)' : 'currentColor',
          animation: isPlaying ? 'pulseRing 1s infinite' : 'none'
        }}
      />
      {label && <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{label}</span>}
    </button>
  );
}
