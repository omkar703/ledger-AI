import React from 'react';

export function LogoIcon({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="logoAiGlow" x1="34" y1="34" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="16" fill="url(#logoBg)" />
      <rect x="1" y="1" width="62" height="62" rx="15" stroke="#334155" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Top Left: Ledger Primary Block */}
      <rect x="12" y="12" width="17" height="17" rx="4.5" fill="#F8FAFC" />
      <rect x="15.5" y="17" width="10" height="2" rx="1" fill="#0F172A" />
      <rect x="15.5" y="21.5" width="6.5" height="2" rx="1" fill="#64748B" />

      {/* Top Right: Processing Block */}
      <rect x="35" y="12" width="17" height="17" rx="4.5" fill="#334155" fillOpacity="0.75" />
      <rect x="38.5" y="17" width="10" height="2" rx="1" fill="#94A3B8" />
      <rect x="38.5" y="21.5" width="7" height="2" rx="1" fill="#64748B" />

      {/* Bottom Left: Reconciled Block */}
      <rect x="12" y="35" width="17" height="17" rx="4.5" fill="#334155" fillOpacity="0.75" />
      <rect x="15.5" y="40" width="10" height="2" rx="1" fill="#94A3B8" />
      <rect x="15.5" y="44.5" width="6.5" height="2" rx="1" fill="#64748B" />

      {/* Bottom Right: AI Core */}
      <rect x="35" y="35" width="17" height="17" rx="4.5" fill="url(#logoAiGlow)" />
      <path d="M43.5 39C43.5 41.5 42 43 39.5 43.5C42 44 43.5 45.5 43.5 48C43.5 45.5 45 44 47.5 43.5C45 43 43.5 41.5 43.5 39Z" fill="#FFFFFF" />

      {/* Connective Pipelines */}
      <rect x="29" y="19" width="6" height="2.5" rx="1.25" fill="#475569" />
      <rect x="19" y="29" width="2.5" height="6" rx="1.25" fill="#475569" />
      <rect x="29" y="42" width="6" height="2.5" rx="1.25" fill="#38BDF8" fillOpacity="0.7" />
      <rect x="42" y="29" width="2.5" height="6" rx="1.25" fill="#38BDF8" fillOpacity="0.7" />
    </svg>
  );
}

export default function Logo({ showBadge = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoIcon className="w-8 h-8 rounded-lg shadow-sm" />
      <div className="flex items-center gap-1.5">
        <span className="font-headline-lg text-[22px] font-semibold text-text-primary tracking-tight font-sans">
          Ledger <span className="font-bold">AI</span>
        </span>
        {showBadge && (
          <span className="text-[10px] uppercase font-mono bg-surface-container-high px-1.5 py-0.5 rounded text-text-secondary font-medium">
            v1.0
          </span>
        )}
      </div>
    </div>
  );
}
