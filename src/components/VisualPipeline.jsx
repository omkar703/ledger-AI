import React from 'react';

export default function VisualPipeline() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-margin-desktop mb-32 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="relative bg-surface-soft border border-border-subtle shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 overflow-hidden h-auto lg:h-[420px] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        
        {/* Left: Source Invoice Document Card */}
        <div className="w-full lg:w-[32%] bg-surface-base border border-border-subtle p-6 shadow-sm z-10 rounded-lg relative">
          <div className="border-b border-border-subtle pb-4 mb-4 flex justify-between items-start">
            <div>
              <div className="w-24 h-4 bg-surface-container rounded-xs mb-2"></div>
              <div className="w-16 h-3 bg-surface-container rounded-xs"></div>
            </div>
            <div className="text-right">
              <div className="font-label-mono text-[10px] text-text-secondary uppercase">Invoice IN-4920</div>
              <div className="font-title-md text-title-md text-text-primary">$4,250.00</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-border-subtle pb-2">
              <div className="w-32 h-3 bg-surface-container rounded-xs"></div>
              <div className="w-12 h-3 bg-surface-container rounded-xs"></div>
            </div>
            <div className="flex justify-between border-b border-border-subtle pb-2">
              <div className="w-40 h-3 bg-surface-container rounded-xs"></div>
              <div className="w-16 h-3 bg-surface-container rounded-xs"></div>
            </div>
            <div className="flex justify-between border-b border-border-subtle pb-2">
              <div className="w-24 h-3 bg-surface-container rounded-xs"></div>
              <div className="w-12 h-3 bg-surface-container rounded-xs"></div>
            </div>
          </div>
        </div>

        {/* Center Section with Animated Flowing Files & Data */}
        <div className="w-full lg:w-[36%] h-36 lg:h-full relative flex items-center justify-between px-2">
          
          {/* Stream 1: Incoming Files (Left -> Center) */}
          <div className="relative w-1/2 h-full flex items-center justify-center overflow-hidden">
            
            {/* Animated Floating File 1 */}
            <div 
              className="absolute z-10 flex items-center gap-1.5 bg-white border border-border-strong px-2.5 py-1.5 rounded shadow-sm animate-flow-in text-[11px] font-mono text-text-secondary"
              style={{ animationDelay: '0s' }}
            >
              <span className="material-symbols-outlined text-[15px] text-text-primary">description</span>
              <span>invoice_4920.pdf</span>
            </div>

            {/* Animated Floating File 2 */}
            <div 
              className="absolute z-10 flex items-center gap-1.5 bg-white border border-border-strong px-2.5 py-1.5 rounded shadow-sm animate-flow-in text-[11px] font-mono text-text-secondary"
              style={{ animationDelay: '0.9s', top: '28%' }}
            >
              <span className="material-symbols-outlined text-[15px] text-text-primary">receipt</span>
              <span>receipt_oct.png</span>
            </div>

            {/* Animated Floating File 3 */}
            <div 
              className="absolute z-10 flex items-center gap-1.5 bg-white border border-border-strong px-2.5 py-1.5 rounded shadow-sm animate-flow-in text-[11px] font-mono text-text-secondary"
              style={{ animationDelay: '1.8s', top: '65%' }}
            >
              <span className="material-symbols-outlined text-[15px] text-text-primary">article</span>
              <span>acme_bill.pdf</span>
            </div>
          </div>

          {/* Center Hub: Extracting Node */}
          <div className="z-20 flex flex-col items-center gap-2 bg-surface-base px-5 py-3 border border-border-strong shadow-md rounded-lg shrink-0 animate-gentle-pulse">
            <span className="material-symbols-outlined text-text-primary text-[20px]" data-icon="memory">
              memory
            </span>
            <span className="font-label-mono text-[11px] text-text-primary font-medium tracking-wide uppercase">
              Extracting
            </span>
          </div>

          {/* Stream 2: Outgoing Structured Data Chips (Center -> Right) */}
          <div className="relative w-1/2 h-full flex items-center justify-center overflow-hidden">
            
            {/* Animated Structured Data Pill 1 */}
            <div 
              className="absolute z-10 flex items-center gap-1 bg-white border border-border-strong px-2.5 py-1 rounded shadow-sm animate-flow-out text-[11px] font-mono text-text-primary"
              style={{ animationDelay: '0.4s', top: '30%' }}
            >
              <span className="text-[10px] text-text-secondary font-medium">Vendor:</span>
              <span className="font-semibold">Acme Corp</span>
            </div>

            {/* Animated Structured Data Pill 2 */}
            <div 
              className="absolute z-10 flex items-center gap-1 bg-white border border-border-strong px-2.5 py-1 rounded shadow-sm animate-flow-out text-[11px] font-mono text-text-primary"
              style={{ animationDelay: '1.3s' }}
            >
              <span className="text-[10px] text-text-secondary font-medium">Total:</span>
              <span className="font-semibold text-text-primary">$4,250.00</span>
            </div>

            {/* Animated Structured Data Pill 3 */}
            <div 
              className="absolute z-10 flex items-center gap-1 bg-white border border-border-strong px-2.5 py-1 rounded shadow-sm animate-flow-out text-[11px] font-mono text-text-primary"
              style={{ animationDelay: '2.2s', top: '65%' }}
            >
              <span className="text-[10px] text-text-secondary font-medium">Tax:</span>
              <span className="font-semibold">8.5% ($350)</span>
            </div>
          </div>

        </div>

        {/* Right: Spreadsheet Table Card */}
        <div className="w-full lg:w-[32%] bg-surface-base border border-border-subtle shadow-sm z-10 overflow-hidden rounded-lg">
          <div className="bg-surface-container-low px-4 py-2 border-b border-border-subtle flex gap-2">
            <div className="w-2 h-2 rounded-full bg-border-strong"></div>
            <div className="w-2 h-2 rounded-full bg-border-strong"></div>
            <div className="w-2 h-2 rounded-full bg-border-strong"></div>
          </div>
          <div className="overflow-x-auto">
            <div className="data-grid text-left">
              <div className="data-cell data-header">Invoice No.</div>
              <div className="data-cell data-header">Vendor</div>
              <div className="data-cell data-header">Date</div>
              <div className="data-cell data-header">Item</div>
              <div className="data-cell data-header">Qty</div>
              <div className="data-cell data-header">Tax</div>
              <div className="data-cell data-header">Total</div>
              
              <div className="data-cell">IN-4920</div>
              <div className="data-cell">Acme Corp</div>
              <div className="data-cell">2023-10-24</div>
              <div className="data-cell">Server Hosting</div>
              <div className="data-cell">12</div>
              <div className="data-cell">8.5%</div>
              <div className="data-cell font-medium text-text-primary">$4,250.00</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
