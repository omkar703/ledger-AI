import React from 'react';

const WORKFLOWS = [
  {
    id: 'Invoice Data Entry',
    title: 'Invoice Data Entry',
    desc: 'High volume data extraction for immediate ERP entry & direct batch sync.',
    icon: 'grid_view'
  },
  {
    id: 'Accounting Operations',
    title: 'Accounting Operations',
    desc: 'Full GL coding, multi-level line validation, and approval routing.',
    icon: 'bar_chart'
  },
  {
    id: 'Client Processing',
    title: 'Client Processing',
    desc: 'External facing approval workflows, audit trails, and client notifications.',
    icon: 'description'
  }
];

const OUTPUT_OPTIONS = [
  'Excel (.xlsx)',
  'PDF Summary',
  'CSV Export',
  'JSON API'
];

export default function Step03Workflow({ data, onChange, onNext, onBack }) {
  const toggleOutput = (opt) => {
    const outputs = [...data.outputs];
    if (outputs.includes(opt)) {
      onChange({ outputs: outputs.filter((item) => item !== opt) });
    } else {
      onChange({ outputs: [...outputs, opt] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="w-full max-w-3xl bg-white border border-border-subtle rounded-2xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <div className="text-center mb-8">
        <h1 className="font-sans text-2xl sm:text-3xl font-semibold text-text-primary mb-2 tracking-tight">
          How does your team process invoices?
        </h1>
        <p className="font-sans text-sm text-text-secondary max-w-lg mx-auto">
          Choose the primary workflow that best matches your organization's financial operations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WORKFLOWS.map((wf) => {
            const isSelected = data.workflow === wf.id;
            return (
              <div
                key={wf.id}
                onClick={() => onChange({ workflow: wf.id })}
                className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-primary bg-blue-50/20 shadow-xs ring-1 ring-primary/30'
                    : 'border-border-subtle bg-surface-soft hover:border-border-strong hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'bg-primary text-white shadow-2xs' : 'bg-white border border-border-subtle text-text-primary'}`}>
                    <span className="material-symbols-outlined text-[22px]">{wf.icon}</span>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  )}
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-sm text-text-primary mb-1">
                    {wf.title}
                  </h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Output Preferences */}
        <div className="space-y-3 pt-2">
          <label className="block font-sans font-medium text-xs text-text-secondary uppercase tracking-wider">
            Preferred Output Formats
          </label>
          <div className="flex flex-wrap gap-2.5">
            {OUTPUT_OPTIONS.map((opt) => {
              const isChecked = data.outputs.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggleOutput(opt)}
                  className={`px-3.5 py-2 rounded-lg border font-sans text-xs font-medium flex items-center gap-2 transition-all ${
                    isChecked
                      ? 'bg-text-primary text-white border-text-primary shadow-2xs'
                      : 'bg-surface-soft border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {isChecked ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 flex items-center justify-between border-t border-border-subtle">
          <button
            type="button"
            onClick={onBack}
            className="h-10 px-4 bg-white border border-border-subtle hover:bg-surface-soft text-text-secondary hover:text-text-primary rounded-lg font-sans font-medium text-sm transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            className="h-10 px-6 bg-text-primary hover:bg-black text-white rounded-lg font-sans font-medium text-sm flex items-center gap-2 transition-all shadow-sm active:scale-[0.99]"
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
}
