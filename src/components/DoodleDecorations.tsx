import React from 'react';

export const SparkleDoodle: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-brand-peach' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export const StarDoodle: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-[#3975EA]' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export const BowlIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8 text-current' }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {/* Steam lines */}
    <path d="M16 10C15 6 17 4 16 2" className="opacity-75" />
    <path d="M24 11C23 7 25 5 24 3" className="opacity-90" />
    <path d="M32 10C31 6 33 4 32 2" className="opacity-75" />
    {/* Bowl body */}
    <path d="M6 18H42C42 29 34 38 24 38C14 38 6 29 6 18Z" fill="currentColor" fillOpacity="0.12" />
    {/* Bowl base */}
    <path d="M18 38H30V42H18V38Z" />
    {/* Chopstick accent */}
    <path d="M10 14L38 22" strokeWidth="2" strokeDasharray="1 1" />
  </svg>
);

export const SquiggleDoodle: React.FC<{ className?: string }> = ({ className = 'w-16 h-4 text-brand-peach' }) => (
  <svg viewBox="0 0 80 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} aria-hidden="true">
    <path d="M2 8C12 2 18 14 28 8C38 2 44 14 54 8C64 2 70 14 78 8" />
  </svg>
);
