import React from 'react';

export default function Step04Ready({ data, onComplete, onReview }) {
  return (
    <div className="w-full max-w-2xl bg-white border border-border-subtle rounded-2xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] animate-float-slow">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-600 mb-4 shadow-xs">
          <span className="material-symbols-outlined text-[32px]">check_circle</span>
        </div>
        <h1 className="font-sans text-2xl sm:text-3xl font-semibold text-text-primary mb-2 tracking-tight">
          Your workspace is ready.
        </h1>
        <p className="font-sans text-sm text-text-secondary">
          The system has been configured and is ready for automated invoice extraction.
        </p>
      </div>

      {/* Visual Pipeline Schematic */}
      <div className="mb-8 bg-surface-soft border border-border-subtle rounded-xl p-5">
        <h3 className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
          Data Pipeline Enabled
        </h3>
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-border-subtle flex items-center justify-center text-text-primary shadow-2xs">
              <span className="material-symbols-outlined text-[18px]">description</span>
            </div>
            <span className="font-sans font-medium text-[11px]">Invoice</span>
          </div>

          <div className="flex-1 border-t border-dashed border-border-strong mx-2"></div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-border-subtle flex items-center justify-center text-text-primary shadow-2xs">
              <span className="material-symbols-outlined text-[18px]">memory</span>
            </div>
            <span className="font-sans font-medium text-[11px]">AI Extract</span>
          </div>

          <div className="flex-1 border-t border-dashed border-border-strong mx-2"></div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-border-subtle flex items-center justify-center text-text-primary shadow-2xs">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <span className="font-sans font-medium text-[11px]">Validate</span>
          </div>

          <div className="flex-1 border-t border-dashed border-border-strong mx-2"></div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-border-subtle flex items-center justify-center text-text-primary shadow-2xs">
              <span className="material-symbols-outlined text-[18px]">download</span>
            </div>
            <span className="font-sans font-medium text-[11px]">Export</span>
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="mb-8 border border-border-subtle rounded-xl overflow-hidden">
        <div className="bg-surface-soft px-4 py-2.5 border-b border-border-subtle flex items-center justify-between">
          <span className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Configuration Summary
          </span>
        </div>

        <div className="p-4 divide-y divide-border-subtle/60 font-sans text-xs space-y-2">
          <div className="flex justify-between items-center pb-2">
            <span className="text-text-secondary">Workspace Name</span>
            <span className="font-semibold text-text-primary">{data.workspaceName || 'My Workspace'}</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">Company & Industry</span>
            <span className="font-medium text-text-primary">
              {data.companyName || 'Acme Corp'} • {data.industry}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">Region & Currency</span>
            <span className="font-medium text-text-primary">
              {data.country} ({data.currency})
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-text-secondary">Workflow Mode</span>
            <span className="font-medium text-text-primary">
              {data.workflow}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-text-secondary">Output Formats</span>
            <span className="font-medium text-text-primary">
              {data.outputs.length > 0 ? data.outputs.join(', ') : 'Excel (.xlsx)'}
            </span>
          </div>
        </div>
      </div>

      {/* Final CTAs */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onComplete}
          className="w-full h-11 bg-text-primary hover:bg-black text-white font-sans font-medium text-sm rounded-lg shadow-sm flex justify-center items-center gap-2 transition-all hover:opacity-95 active:scale-[0.99]"
        >
          <span>Enter Workspace</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <button
          type="button"
          onClick={onReview}
          className="font-sans text-xs text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors"
        >
          Review & Edit Settings
        </button>
      </div>
    </div>
  );
}
