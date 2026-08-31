import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, ArrowRight, RefreshCw, Sparkles, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEGAL_TERMS, getTermBySlug } from '../data/legalData';

export default function VoiceSearchModal() {
  const { isVoiceModalOpen, closeVoiceModal, executeSearch, navigate, addToast } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [matchedTerm, setMatchedTerm] = useState(null);
  const recognitionRef = useRef(null);

  // Check if browser supports Web Speech Recognition
  const isSpeechSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Start speech recognition on modal open
  useEffect(() => {
    if (isVoiceModalOpen) {
      setTranscript('');
      setErrorMessage('');
      setMatchedTerm(null);
      startListening();
    } else {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [isVoiceModalOpen]);

  const startListening = () => {
    setErrorMessage('');
    setTranscript('');
    setMatchedTerm(null);

    if (!isSpeechSupported) {
      setErrorMessage('Speech recognition is not natively supported in this browser. You can click any sample voice query below to test.');
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        checkForDirectMatch(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions or select a sample query below.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No speech was detected. Please try speaking again or click a sample phrase.');
        } else {
          setErrorMessage(`Microphone notice: ${event.error}. You can select any sample query below.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.error(err);
      setIsListening(false);
      setErrorMessage('Could not initialize speech recognition. Try clicking a sample phrase below.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const checkForDirectMatch = (text) => {
    if (!text) return;
    const clean = text.toLowerCase().trim().replace(/^(what is|define|tell me about|explain|meaning of)\s+/i, '');
    const found = LEGAL_TERMS.find(
      (t) => t.term.toLowerCase() === clean || t.slug.toLowerCase() === clean
    );
    if (found) {
      setMatchedTerm(found);
    }
  };

  const handleSampleQuery = (phrase) => {
    setTranscript(phrase);
    setErrorMessage('');
    checkForDirectMatch(phrase);
  };

  const handleConfirmSearch = () => {
    if (!transcript.trim()) return;

    closeVoiceModal();

    if (matchedTerm) {
      navigate(`/term/${matchedTerm.slug}`);
      addToast(`Opened definition for ${matchedTerm.term}`, 'success');
    } else {
      executeSearch(transcript.trim());
      addToast(`Searching for "${transcript}"`, 'info');
    }
  };

  if (!isVoiceModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={closeVoiceModal}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-modal-title"
      >
        <div className="modal-header">
          <h2 id="voice-modal-title" className="modal-title">
            <Mic size={22} style={{ color: 'var(--brand-primary)' }} />
            Voice Legal Search
          </h2>
          <button
            type="button"
            onClick={closeVoiceModal}
            className="btn-icon"
            aria-label="Close voice search"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center' }}>
          {/* Animated Microphone Icon */}
          <div
            className={`voice-mic-circle ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
            title={isListening ? 'Click to stop listening' : 'Click to start microphone'}
            style={{ cursor: 'pointer' }}
          >
            {isListening ? <Mic size={44} /> : <MicOff size={44} />}
          </div>

          <p style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {isListening ? 'Listening for legal terms...' : transcript ? 'Speech detected' : 'Click mic to speak'}
          </p>

          {isListening && (
            <div className="soundwave-container" aria-hidden="true">
              <div className="soundwave-bar" />
              <div className="soundwave-bar" />
              <div className="soundwave-bar" />
              <div className="soundwave-bar" />
              <div className="soundwave-bar" />
            </div>
          )}

          {/* Transcript Display Box */}
          <div
            style={{
              minHeight: '64px',
              padding: '0.85rem 1.25rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              margin: '1.25rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: transcript ? 'var(--text-primary)' : 'var(--text-muted)'
            }}
          >
            {transcript ? `"${transcript}"` : 'Say something like "What is Habeas Corpus?" or "Bail"...'}
          </div>

          {/* Matched Term Highlight */}
          {matchedTerm && (
            <div
              style={{
                backgroundColor: 'var(--emerald-50)',
                border: '1px solid var(--emerald-500)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                marginBottom: '1rem',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-700)', textTransform: 'uppercase' }}>
                  Direct Term Match
                </span>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                  {matchedTerm.term} ({matchedTerm.category})
                </div>
              </div>
              <Sparkles size={20} style={{ color: 'var(--emerald-600)' }} />
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 0.85rem',
                fontSize: '0.8125rem',
                color: '#EF4444',
                marginBottom: '1rem',
                textAlign: 'left'
              }}
            >
              {errorMessage}
            </div>
          )}

          {/* Sample Prompts to Try */}
          <div style={{ marginTop: '1.25rem', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Or try sample voice searches:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {[
                'Bail',
                'Habeas Corpus',
                'Force Majeure',
                'Negligence',
                'Indemnity',
                'FIR',
                'Piercing the corporate veil',
                'Tort'
              ].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleSampleQuery(sample)}
                  className="quick-chip"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Volume2 size={13} />
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={startListening}
            className="btn btn-secondary"
          >
            <RefreshCw size={15} className={isListening ? 'animate-spin' : ''} />
            {isListening ? 'Restart Listening' : 'Try Again'}
          </button>

          <button
            type="button"
            onClick={closeVoiceModal}
            className="btn btn-ghost"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmSearch}
            disabled={!transcript.trim()}
            className="btn btn-primary"
            style={{ opacity: !transcript.trim() ? 0.6 : 1 }}
          >
            <span>Search Term</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
