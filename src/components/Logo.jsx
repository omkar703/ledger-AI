import React from 'react';

export function LogoIcon({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#111827" />
      <rect x="7" y="7" width="8" height="8" rx="2" fill="#FFFFFF" fillOpacity="0.95" />
      <rect x="17" y="7" width="8" height="8" rx="2" fill="#FFFFFF" fillOpacity="0.3" />
      <rect x="7" y="17" width="8" height="8" rx="2" fill="#FFFFFF" fillOpacity="0.3" />
      <rect x="17" y="17" width="8" height="8" rx="2" fill="#3B82F6" />
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
