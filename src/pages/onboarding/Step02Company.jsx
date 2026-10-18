import React from 'react';

export default function Step02Company({ data, onChange, onNext, onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const isIndia = data.country === 'India';
  const isUS = data.country === 'United States';

  return (
    <div className="w-full max-w-5xl bg-white border border-border-subtle rounded-2xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (6 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="mb-6">
            <h1 className="font-sans text-2xl sm:text-3xl font-semibold text-text-primary mb-2 tracking-tight">
              Company Details
            </h1>
            <p className="font-sans text-sm text-text-secondary">
              Provide your business information to configure regional tax and currency settings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block font-sans font-medium text-sm text-text-primary">
                Company Name
              </label>
              <input
                type="text"
                className="w-full h-10.5 px-3.5 bg-surface-soft border border-border-subtle rounded-lg font-sans text-sm text-text-primary focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all"
                placeholder="e.g. Acme Corp"
                value={data.companyName}
                onChange={(e) => onChange({ companyName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-sans font-medium text-sm text-text-primary">
                Industry
              </label>
              <select
                className="w-full h-10.5 px-3.5 bg-surface-soft border border-border-subtle rounded-lg font-sans text-sm text-text-primary focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all"
                value={data.industry}
                onChange={(e) => onChange({ industry: e.target.value })}
              >
                <option value="Software / SaaS">Software / SaaS</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail & E-commerce">Retail & E-commerce</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Consulting & Agency">Consulting & Agency</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block font-sans font-medium text-sm text-text-primary">
                  Country
                </label>
                <select
                  className="w-full h-10.5 px-3.5 bg-surface-soft border border-border-subtle rounded-lg font-sans text-sm text-text-primary focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all"
                  value={data.country}
                  onChange={(e) => {
                    const country = e.target.value;
                    let currency = data.currency;
                    if (country === 'India') currency = 'INR (₹)';
                    else if (country === 'United States') currency = 'USD ($)';
                    else if (country === 'United Kingdom') currency = 'GBP (£)';
                    else if (country === 'Germany' || country === 'France') currency = 'EUR (€)';
                    onChange({ country, currency });
                  }}
                >
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-sans font-medium text-sm text-text-primary">
                  Base Currency
                </label>
                <select
                  className="w-full h-10.5 px-3.5 bg-surface-soft border border-border-subtle rounded-lg font-sans text-sm text-text-primary focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all"
                  value={data.currency}
                  onChange={(e) => onChange({ currency: e.target.value })}
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="INR (₹)">INR (₹)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                  <option value="SGD ($)">SGD ($)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-sans font-medium text-sm text-text-primary">
                Company Size
              </label>
              <select
                className="w-full h-10.5 px-3.5 bg-surface-soft border border-border-subtle rounded-lg font-sans text-sm text-text-primary focus:border-primary focus:outline-none focus:shadow-[0_0_0_2px_rgba(0,82,255,0.1)] transition-all"
                value={data.companySize}
                onChange={(e) => onChange({ companySize: e.target.value })}
              >
                <option value="1-50 employees">1-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="500+ employees">500+ employees</option>
              </select>
            </div>

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

        {/* Right Financial Intelligence Visualization (6 cols) */}
        <div className="lg:col-span-6 bg-surface-soft border border-border-subtle rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
              <h3 className="font-sans font-semibold text-sm text-text-primary">Financial Intelligence Engine</h3>
            </div>
          </div>

          {/* Dynamic Tax & Compliance Modules with Clean Typography */}
          <div className="grid grid-cols-2 gap-3 flex-1 items-center">
            {isIndia ? (
              <>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Tax Engine</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">GST Auto-Engine</div>
                </div>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Central Tax</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">CGST / SGST Ready</div>
                </div>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Inter-State</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">IGST Processing</div>
                </div>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Classification</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">HSN/SAC Validation</div>
                </div>
              </>
            ) : isUS ? (
              <>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Tax Engine</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">US Sales Tax Engine</div>
                </div>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Jurisdiction</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">State & County Split</div>
                </div>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Compliance</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">1099-MISC Tagging</div>
                </div>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">GL Integration</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">GAAP Multi-Ledger</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Tax Engine</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">Standard VAT Engine</div>
                </div>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Cross-Border</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">Reverse Charge Ready</div>
                </div>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Verification</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">VIES Tax Validation</div>
                </div>
                <div className="bg-white border border-border-subtle p-3.5 rounded-xl shadow-2xs">
                  <span className="font-sans text-[11px] font-medium text-text-secondary block mb-1">Ledger</span>
                  <div className="font-sans text-sm font-semibold text-text-primary">Multi-Currency GL</div>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-secondary">
            <span>Adaptive Automation Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
