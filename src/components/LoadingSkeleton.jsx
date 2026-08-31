import React from 'react';

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid-terms">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="card"
          style={{
            padding: '1.5rem',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div
              style={{
                width: '60%',
                height: '24px',
                backgroundColor: 'var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1rem',
                animation: 'pulseRing 1.5s infinite'
              }}
            />
            <div
              style={{
                width: '35%',
                height: '18px',
                backgroundColor: 'var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1rem'
              }}
            />
            <div
              style={{
                width: '95%',
                height: '14px',
                backgroundColor: 'var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.5rem'
              }}
            />
            <div
              style={{
                width: '75%',
                height: '14px',
                backgroundColor: 'var(--border-subtle)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
          </div>
          <div
            style={{
              width: '40%',
              height: '16px',
              backgroundColor: 'var(--border-subtle)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      ))}
    </div>
  );
}
