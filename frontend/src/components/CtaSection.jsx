import React from 'react';

export default function CtaSection({ onNavigate }) {
  return (
    <section className="relative bg-surface-soft border-t border-border-subtle pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50"></div>
      <div className="absolute inset-0 glow-effect"></div>
      <div className="relative max-w-container-max mx-auto px-margin-desktop z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 text-left">
          <h2 className="font-display-lg text-[40px] leading-tight text-text-primary mb-6 tracking-tight">
            Ready to turn documents into data?
          </h2>
          <p className="font-body-md text-title-md text-text-secondary mb-10 leading-relaxed max-w-lg">
            Join forward-thinking finance teams automating their invoice processing with enterprise-grade accuracy and speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate && onNavigate('signup')}
              className="font-button text-button bg-primary text-surface-base px-8 py-4 rounded-DEFAULT hover:opacity-90 transition-opacity focus:outline-none"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('login')}
              className="font-button text-button bg-surface-base text-text-primary border border-border-strong px-8 py-4 rounded-DEFAULT hover:bg-surface-soft transition-colors focus:outline-none"
            >
              Contact Sales
            </button>
          </div>
          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-text-primary text-lg" data-icon="check_circle">check_circle</span>
              <span className="font-body-sm text-text-secondary">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-text-primary text-lg" data-icon="check_circle">check_circle</span>
              <span className="font-body-sm text-text-secondary">Cancel anytime</span>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="bg-surface-base border border-border-subtle shadow-xl rounded-xl p-6 relative">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" data-icon="dataset">dataset</span>
                <span className="font-title-md text-text-primary">Validated Output</span>
              </div>
              <span className="font-label-mono text-xs text-text-secondary bg-surface-container-low px-2 py-1 rounded">JSON / CSV</span>
            </div>
            <div className="bg-surface-container-lowest border border-border-subtle rounded-DEFAULT p-4 font-label-mono text-[11px] text-text-secondary leading-relaxed overflow-x-auto">
              <pre><code>{`{
  "invoice_id": "IN-4920",
  "vendor": {
    "name": "Acme Corp",
    "tax_id": "GB123456789"
  },
  "line_items": [
    {
      "description": "Server Hosting",
      "quantity": 12,
      "unit_price": 325.00,
      "total": 3900.00
    }
  ],
  "tax_total": 350.00,
  "grand_total": 4250.00,
  "confidence_score": 0.998
}`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
