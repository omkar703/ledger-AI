import React from 'react';

export default function HeroSection({ onNavigate }) {
  // Generate a wide, smooth wave profile across 48 bars
  const waveHeights = [
    15, 20, 28, 40, 55, 70, 85, 95, 80, 65, 45, 30, 25, 35, 50, 75, 90, 100, 85, 70,
    55, 40, 30, 45, 60, 80, 95, 85, 65, 45, 30, 25, 40, 60, 80, 95, 85, 65, 45, 30,
    25, 35, 50, 70, 85, 65, 40, 20
  ];

  return (
    <section className="relative max-w-container-max mx-auto px-margin-desktop text-center mt-16 mb-24 opacity-0 animate-fade-in-up isolate overflow-hidden">
      {/* Background Wide Extended Waveform */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="flex items-center justify-center gap-1.5 md:gap-2.5 h-64 w-full max-w-6xl px-4 opacity-10">
          {waveHeights.map((h, i) => (
            <div 
              key={i} 
              className="w-1 md:w-1.5 bg-text-primary rounded-full animate-wave-bar" 
              style={{ 
                height: `${h}%`, 
                animationDelay: `${(i * 0.08) % 1.6}s`,
                animationDuration: `${1.8 + (i % 5) * 0.2}s` 
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-display-lg text-display-lg text-text-primary mb-6 max-w-4xl mx-auto tracking-tighter leading-tight">
          Turn invoices into structured business data.<br />Automatically. Accurately.
        </h1>
        
        <p className="font-body-md text-title-md text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Upload invoices, extract the data, verify what matters, edit it like a spreadsheet, and export it in your company's format.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onNavigate && onNavigate('signup')}
            className="font-button text-button bg-text-primary text-surface-base px-6 py-3 rounded-DEFAULT hover:opacity-90 transition-opacity w-full sm:w-auto shadow-sm focus:outline-none"
          >
            Start Processing Invoices
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('login')}
            className="font-button text-button bg-surface-base text-text-primary border border-border-strong px-6 py-3 rounded-DEFAULT hover:bg-surface-soft transition-colors w-full sm:w-auto shadow-2xs focus:outline-none"
          >
            See How It Works
          </button>
        </div>
      </div>
    </section>
  );
}
