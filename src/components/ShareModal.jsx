import React, { useState } from 'react';
import { Share2, Copy, Check, X, Mail, MessageSquare, Globe, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ShareModal() {
  const { isShareModalOpen, shareData, closeShareModal, addToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen || !shareData) return null;

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/term/${shareData.slug}`
    : `https://lexiclear.app/term/${shareData.slug}`;

  const shareTitle = `Learn what "${shareData.term}" means in legal terms - Lexi Clear`;
  const shareText = `"${shareData.term}": ${shareData.simpleMeaning} | Read more on Lexi Clear:`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    addToast('Link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: url
      }).catch(() => {
        // Share cancelled or failed
      });
    } else {
      handleCopyLink();
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: '#25D366',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`
    },
    {
      name: 'X / Twitter',
      icon: Send,
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`
    },
    {
      name: 'LinkedIn',
      icon: Globe,
      color: '#0A66C2',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: '#EA4335',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${url}`)}`
    }
  ];

  return (
    <div className="modal-backdrop" onClick={closeShareModal}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        <div className="modal-header">
          <h2 id="share-modal-title" className="modal-title">
            <Share2 size={20} style={{ color: 'var(--brand-primary)' }} />
            Share "{shareData.term}"
          </h2>
          <button
            type="button"
            onClick={closeShareModal}
            className="btn-icon"
            aria-label="Close share dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Share this legal term definition with colleagues, students, or clients.
          </p>

          {/* Copy URL Field */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.4rem 0.5rem 0.4rem 1rem',
              marginBottom: '1.5rem'
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {url}
            </span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="btn btn-primary"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.8125rem' }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Social Share Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {shareLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.85rem 0.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-surface)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="card-interactive"
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.4rem'
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          {typeof navigator !== 'undefined' && navigator.share && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="btn btn-secondary"
            >
              <Share2 size={16} /> Native Share
            </button>
          )}
          <button
            type="button"
            onClick={closeShareModal}
            className="btn btn-primary"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
