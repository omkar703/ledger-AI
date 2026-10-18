import React from 'react';

export default function Step01Workspace({ data, onChange, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.workspaceName.trim()) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-[640px] bg-white border border-border-subtle rounded-2xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] animate-float-slow">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="font-sans text-2xl sm:text-3xl font-semibold text-text-primary mb-2 tracking-tight">
          Let's create your workspace.
        </h1>
        <p className="font-sans text-sm text-text-secondary max-w-md mx-auto">
          Your workspace keeps invoices, data, templates, and exports organized.
        </p>
      </section>

      {/* Form & Live Preview */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block font-sans font-medium text-sm text-text-primary" htmlFor="workspace-name">
            Workspace name
          </label>
          <input
            id="workspace-name"
            type="text"
            className="w-full h-11 bg-surface-soft border border-border-subtle rounded-lg px-4 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all"
            placeholder="e.g. Acme Manufacturing"
            value={data.workspaceName}
            onChange={(e) => onChange({ workspaceName: e.target.value })}
            required
            autoFocus
          />
        </div>

        {/* Real-Time Live Preview Card */}
        <div className="border border-border-subtle rounded-xl bg-surface-soft p-5 transition-all duration-300 hover:border-border-strong relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-white border border-border-subtle flex items-center justify-center text-text-secondary shadow-2xs">
                <span className="material-symbols-outlined text-[22px]">business</span>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-base text-text-primary leading-tight">
                  {data.workspaceName.trim() || 'New Workspace'}
                </h3>
                <p className="font-sans text-xs text-text-secondary mt-0.5">
                  Draft Environment • Ledger AI
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:border-l border-border-subtle sm:pl-4">
              <div className="text-center">
                <span className="block font-sans text-[11px] text-text-secondary uppercase">Invoices</span>
                <span className="font-sans font-medium text-sm text-text-primary">0</span>
              </div>
              <div className="text-center">
                <span className="block font-sans text-[11px] text-text-secondary uppercase">Data</span>
                <span className="font-sans font-medium text-sm text-text-primary">0</span>
              </div>
              <div className="text-center">
                <span className="block font-sans text-[11px] text-text-secondary uppercase">Tmpl</span>
                <span className="font-sans font-medium text-sm text-text-primary">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-text-primary hover:bg-black text-white px-8 h-11 rounded-lg font-sans font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-[0.99]"
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
}
