import React from 'react';

export function LegalLogo({ size = 'md', className = '', showText = false, textClassName = '' }) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-18 h-18'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative flex items-center justify-center rounded-2xl bg-[#3A2D27] text-[#CCAD8E] shadow-md border border-[#CCAD8E]/30 p-2 ${sizeClasses[size] || sizeClasses.md}`}>
        {/* Vector Scales of Justice + Legal Shield */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          {/* Pillar / Stand */}
          <path d="M12 3v18" stroke="#CCAD8E" />
          <path d="M7 21h10" stroke="#CCAD8E" />
          <path d="M5 6h14" stroke="#CCAD8E" />
          <circle cx="12" cy="3" r="1.5" fill="#CCAD8E" stroke="none" />
          
          {/* Left Pan */}
          <path d="M5 6l-3 6h6l-3-6z" stroke="#CCAD8E" fill="rgba(204, 173, 142, 0.15)" />
          {/* Right Pan */}
          <path d="M19 6l-3 6h6l-3-6z" stroke="#CCAD8E" fill="rgba(204, 173, 142, 0.15)" />
          
          {/* Book base line */}
          <path d="M9 18h6" stroke="#D2C8BE" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-bold tracking-tight text-[#3A2D27] leading-none ${textClassName || 'text-xl'}`}>
            Lexi Clear
          </span>
          <span className="text-[11px] font-medium tracking-wider text-[#A48374] uppercase">
            Legal Dictionary
          </span>
        </div>
      )}
    </div>
  );
}
