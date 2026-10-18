import React, { useState } from 'react';
import Logo from '../components/Logo';
import Step01Workspace from './onboarding/Step01Workspace';
import Step02Company from './onboarding/Step02Company';
import Step03Workflow from './onboarding/Step03Workflow';
import Step04Ready from './onboarding/Step04Ready';

const STEPS = [
  { id: 1, label: 'Workspace' },
  { id: 2, label: 'Company' },
  { id: 3, label: 'Workflow' },
  { id: 4, label: 'Ready' }
];

export default function OnboardingPage({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceData, setWorkspaceData] = useState({
    workspaceName: 'Acme Manufacturing',
    companyName: 'Acme Corp',
    industry: 'Software / SaaS',
    country: 'United States',
    currency: 'USD ($)',
    companySize: '51-200 employees',
    workflow: 'Invoice Data Entry',
    outputs: ['Excel (.xlsx)', 'PDF Summary', 'CSV Export']
  });

  const handleUpdate = (fields) => {
    setWorkspaceData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="bg-[#F9F9FB] text-text-primary font-sans min-h-screen flex flex-col antialiased">
      {/* Top Minimal Brand Header */}
      <header className="w-full h-16 border-b border-border-subtle bg-white flex items-center justify-between px-6 md:px-12 shrink-0">
        <button 
          onClick={() => onNavigate('landing')} 
          className="flex items-center hover:opacity-80 transition-opacity focus:outline-none"
          title="Back to home"
        >
          <Logo />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
        
        {/* Modern Apple-style Stepper Bar */}
        <div className="w-full max-w-xl mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-border-subtle -z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-text-primary -z-0 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            ></div>

            {STEPS.map((s) => {
              const isCompleted = currentStep > s.id;
              const isCurrent = currentStep === s.id;

              return (
                <div key={s.id} className="flex flex-col items-center gap-2 bg-[#F9F9FB] px-2 z-10">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs transition-all ${
                      isCompleted
                        ? 'bg-text-primary text-white'
                        : isCurrent
                        ? 'border-2 border-text-primary bg-white text-text-primary font-bold shadow-2xs'
                        : 'border border-border-subtle bg-white text-text-secondary/60'
                    }`}
                  >
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    ) : (
                      `0${s.id}`
                    )}
                  </div>
                  <span
                    className={`font-sans text-[11px] hidden sm:block font-medium ${
                      isCurrent || isCompleted ? 'text-text-primary' : 'text-text-secondary/60'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Step View */}
        {currentStep === 1 && (
          <Step01Workspace
            data={workspaceData}
            onChange={handleUpdate}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <Step02Company
            data={workspaceData}
            onChange={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <Step03Workflow
            data={workspaceData}
            onChange={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <Step04Ready
            data={workspaceData}
            onComplete={handleComplete}
            onReview={() => setCurrentStep(1)}
          />
        )}

      </main>
    </div>
  );
}
