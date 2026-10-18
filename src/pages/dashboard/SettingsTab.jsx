import React, { useState } from 'react';

const SETTINGS_SECTIONS = [
  { id: 'workspace', label: 'Workspace & Profile', icon: 'domain' },
  { id: 'ai', label: 'AI Extraction & OCR', icon: 'smart_toy' },
  { id: 'billing', label: 'Plan & Billing', icon: 'credit_card' }
];

export default function SettingsTab({ onNavigateTab }) {
  const [activeSection, setActiveSection] = useState('workspace');
  const [toastMessage, setToastMessage] = useState(null);

  // User Profile & Workspace states
  const [fullName, setFullName] = useState('Omkar Phadatare');
  const [emailAddress, setEmailAddress] = useState('omkar@acme.inc');
  const [profileImage, setProfileImage] = useState(null);
  const [workspaceName, setWorkspaceName] = useState('Acme Manufacturing Workspace');
  const [companyDomain, setCompanyDomain] = useState('acme.inc');
  const [taxId, setTaxId] = useState('US-TAX-89240182');
  const [currency, setCurrency] = useState('USD ($)');
  const [accountingStandard, setAccountingStandard] = useState('GAAP (US Standard)');
  
  // AI Settings
  const [confidenceThreshold, setConfidenceThreshold] = useState(90);
  const [autoRouting, setAutoRouting] = useState(true);
  const [autoStitching, setAutoStitching] = useState(true);
  const [taxSplits, setTaxSplits] = useState(true);

  // Delete Account Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSaveSettings = (e) => {
    if (e) e.preventDefault();
    triggerToast('Settings updated and synced successfully!');
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setProfileImage(uploadEvent.target.result);
        triggerToast('Profile picture uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    triggerToast('Profile picture removed.');
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    if (deleteConfirmationText !== 'DELETE') return;
    
    setIsDeleteModalOpen(false);
    triggerToast('Account and workspace scheduled for deletion. Signing out...');
    setTimeout(() => {
      window.location.hash = '/';
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-float-slow">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-text-primary text-white font-sans text-xs font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in border border-white/10">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl lg:text-3xl font-semibold text-text-primary tracking-tight mb-1.5">
            Settings & Workspace Configuration
          </h1>
          <p className="font-sans text-sm text-text-secondary max-w-xl">
            Manage your personal profile, workspace preferences, AI extraction parameters, and subscription plan.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleSaveSettings}
            className="h-10 px-5 bg-text-primary hover:bg-black text-white rounded-lg font-sans font-medium text-xs flex items-center gap-2 transition-all shadow-sm active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Main Settings Layout (Sidebar Tabs + Settings Content Panel) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Settings Navigation Menu */}
        <div className="w-full lg:w-64 bg-white border border-border-subtle rounded-2xl p-3 shadow-2xs shrink-0">
          <ul className="space-y-1">
            {SETTINGS_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <li key={sec.id}>
                  <button
                    type="button"
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-sans text-xs font-medium transition-all text-left ${
                      isActive
                        ? 'bg-text-primary text-white font-semibold shadow-xs'
                        : 'text-text-secondary hover:bg-surface-soft hover:text-text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{sec.icon}</span>
                    <span>{sec.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 w-full bg-white border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-2xs">
          
          {/* 1. Workspace & Profile Section */}
          {activeSection === 'workspace' && (
            <div className="space-y-8">
              
              {/* Profile Picture Upload Section */}
              <div>
                <h2 className="font-sans font-semibold text-base text-text-primary mb-1">
                  Personal Profile & Picture
                </h2>
                <p className="font-sans text-xs text-text-secondary mb-5">
                  Update your personal avatar and account details displayed across your financial workspace.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-surface-soft border border-border-subtle rounded-2xl">
                  {/* Avatar Preview */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xs bg-surface-muted flex items-center justify-center shrink-0">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-text-primary text-white flex items-center justify-center font-sans font-bold text-lg">
                        {fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'OP'}
                      </div>
                    )}
                  </div>

                  {/* Upload Actions */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <label className="h-8.5 px-3.5 bg-text-primary hover:bg-black text-white rounded-lg font-sans font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[16px]">upload</span>
                        <span>Upload New Picture</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageUpload}
                          className="hidden"
                        />
                      </label>

                      {profileImage && (
                        <button
                          type="button"
                          onClick={handleRemoveProfileImage}
                          className="h-8.5 px-3 bg-white border border-border-subtle hover:border-red-300 text-red-600 rounded-lg font-sans font-medium text-xs transition-all shadow-2xs"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                    <p className="font-sans text-[11px] text-text-secondary">
                      JPG, PNG, or GIF. Recommended square dimension 400x400px.
                    </p>
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  <div>
                    <label className="block font-sans text-xs font-medium text-text-primary mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-9 px-3 bg-surface-soft border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:bg-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium text-text-primary mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full h-9 px-3 bg-surface-soft border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:bg-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Workspace Details */}
              <div className="border-t border-border-subtle pt-6">
                <h3 className="font-sans font-semibold text-sm text-text-primary mb-1">
                  Workspace & Tax Profile
                </h3>
                <p className="font-sans text-xs text-text-secondary mb-5">
                  Company information and baseline financial accounting standards.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs font-medium text-text-primary mb-1.5">
                      Workspace Display Name
                    </label>
                    <input
                      type="text"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="w-full h-9 px-3 bg-surface-soft border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:bg-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium text-text-primary mb-1.5">
                      Company Domain
                    </label>
                    <input
                      type="text"
                      value={companyDomain}
                      onChange={(e) => setCompanyDomain(e.target.value)}
                      className="w-full h-9 px-3 bg-surface-soft border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:bg-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium text-text-primary mb-1.5">
                      Tax ID / VAT / GSTIN Number
                    </label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full h-9 px-3 bg-surface-soft border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:bg-white focus:outline-none focus:border-primary transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-medium text-text-primary mb-1.5">
                      Base Ledger Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full h-9 px-3 bg-surface-soft border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:bg-white focus:outline-none focus:border-primary transition-all"
                    >
                      <option value="USD ($)">USD - US Dollar ($)</option>
                      <option value="EUR (€)">EUR - Euro (€)</option>
                      <option value="GBP (£)">GBP - British Pound (£)</option>
                      <option value="INR (₹)">INR - Indian Rupee (₹)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-sans text-xs font-medium text-text-primary mb-1.5">
                      Default Accounting Standard
                    </label>
                    <select
                      value={accountingStandard}
                      onChange={(e) => setAccountingStandard(e.target.value)}
                      className="w-full h-9 px-3 bg-surface-soft border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:bg-white focus:outline-none focus:border-primary transition-all"
                    >
                      <option value="GAAP (US Standard)">GAAP (US Standard)</option>
                      <option value="IFRS (International Financial Reporting Standards)">IFRS (International Financial Reporting Standards)</option>
                      <option value="Custom Standard">Custom Standard</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Danger Zone: Delete Account Section */}
              <div className="border-t border-border-subtle pt-6">
                <div className="p-5 border border-red-200 bg-red-50/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-red-600 text-[18px]">warning</span>
                      <h4 className="font-sans font-semibold text-sm text-red-900">
                        Delete Account & Workspace
                      </h4>
                    </div>
                    <p className="font-sans text-xs text-red-700 max-w-xl leading-relaxed">
                      Permanently delete your account profile, all uploaded invoices, processed ledgers, and workspace history. This action cannot be reversed.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="h-9 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-sans font-medium text-xs shrink-0 transition-all shadow-xs active:scale-[0.98]"
                  >
                    Delete Account
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* 2. AI Extraction & OCR Rules */}
          {activeSection === 'ai' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-sans font-semibold text-base text-text-primary">
                  AI Extraction & OCR Rules
                </h2>
                <p className="font-sans text-xs text-text-secondary mt-0.5">
                  Tune model sensitivity, automated confidence thresholds, and line-item splitting.
                </p>
              </div>

              <div className="border-t border-border-subtle pt-5 space-y-6">
                
                {/* Confidence Slider */}
                <div className="p-4 bg-surface-soft border border-border-subtle rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-sans font-semibold text-xs text-text-primary block">
                        Auto-Approval OCR Confidence Threshold
                      </span>
                      <span className="font-sans text-[11px] text-text-secondary">
                        Invoices above this confidence score are automatically approved into the ledger.
                      </span>
                    </div>
                    <span className="font-sans font-bold text-sm text-emerald-600 bg-white border border-border-subtle px-2.5 py-1 rounded-lg">
                      {confidenceThreshold}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="70"
                    max="99"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                    className="w-full accent-text-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-sans text-text-secondary">
                    <span>70% (Permissive)</span>
                    <span>85% (Balanced)</span>
                    <span>99% (Strict Verification)</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-surface-soft border border-border-subtle rounded-xl">
                    <div>
                      <p className="font-sans font-semibold text-xs text-text-primary">
                        Automated Smart Categorization & Routing
                      </p>
                      <p className="font-sans text-[11px] text-text-secondary">
                        Automatically sort uploaded invoices into company and format folders.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoRouting(!autoRouting)}
                      className={`w-10 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        autoRouting ? 'bg-emerald-500' : 'bg-border-strong'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        autoRouting ? 'translate-x-4' : 'translate-x-0'
                      }`}></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-surface-soft border border-border-subtle rounded-xl">
                    <div>
                      <p className="font-sans font-semibold text-xs text-text-primary">
                        Multi-Page Document Stitching & Orientation Fix
                      </p>
                      <p className="font-sans text-[11px] text-text-secondary">
                        Detect multi-page purchase orders and auto-rotate rotated scans.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoStitching(!autoStitching)}
                      className={`w-10 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        autoStitching ? 'bg-emerald-500' : 'bg-border-strong'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        autoStitching ? 'translate-x-4' : 'translate-x-0'
                      }`}></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-surface-soft border border-border-subtle rounded-xl">
                    <div>
                      <p className="font-sans font-semibold text-xs text-text-primary">
                        Smart Line-Item Tax & Subtotal Reconciliation
                      </p>
                      <p className="font-sans text-[11px] text-text-secondary">
                        Validate mathematical sums between individual items, tax rates, and final total.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTaxSplits(!taxSplits)}
                      className={`w-10 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        taxSplits ? 'bg-emerald-500' : 'bg-border-strong'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        taxSplits ? 'translate-x-4' : 'translate-x-0'
                      }`}></span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. Plan & Billing */}
          {activeSection === 'billing' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-sans font-semibold text-base text-text-primary">
                  Plan & Resource Usage
                </h2>
                <p className="font-sans text-xs text-text-secondary mt-0.5">
                  Track monthly processed invoice quotas and manage workspace subscription.
                </p>
              </div>

              <div className="border-t border-border-subtle pt-5 space-y-6">
                
                {/* Plan Card */}
                <div className="p-5 bg-surface-soft border border-border-subtle rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-2 inline-block">
                      Active Subscription
                    </span>
                    <h3 className="font-sans font-bold text-lg text-text-primary">
                      Enterprise Pro Plan
                    </h3>
                    <p className="font-sans text-xs text-text-secondary mt-0.5">
                      Includes 5,000 monthly invoices, multi-entity auto-routing, and dedicated API capacity.
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-sans text-2xl font-bold text-text-primary">$149</span>
                    <span className="text-xs text-text-secondary">/month</span>
                  </div>
                </div>

                {/* Quota Progress */}
                <div className="p-5 bg-white border border-border-subtle rounded-2xl space-y-2 shadow-2xs">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-medium text-text-primary">Monthly Processing Quota</span>
                    <span className="font-semibold text-text-primary">2,481 / 5,000 Invoices (49.6%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-soft border border-border-subtle rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '49.6%' }}></div>
                  </div>
                  <p className="font-sans text-[11px] text-text-secondary">
                    Quota resets on September 1, 2026.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-border-subtle rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5 animate-scale-up">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200/60 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
              <div>
                <h3 className="font-sans font-bold text-base text-text-primary">
                  Delete Account & Workspace
                </h3>
                <p className="font-sans text-xs text-text-secondary mt-1 leading-relaxed">
                  This will immediately delete all invoices, processed ledger files, and user preferences. Type <strong className="text-red-600">DELETE</strong> to confirm.
                </p>
              </div>
            </div>

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Type DELETE to confirm"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                className="w-full h-9 px-3 bg-surface-soft border border-red-200 rounded-lg text-xs font-sans text-text-primary focus:bg-white focus:outline-none focus:border-red-500 transition-all font-mono"
              />

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="h-9 px-4 bg-white border border-border-subtle hover:border-border-strong text-text-primary rounded-lg font-sans font-medium text-xs transition-all shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleteConfirmationText !== 'DELETE'}
                  className="h-9 px-5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-sans font-semibold text-xs transition-all shadow-sm active:scale-[0.98]"
                >
                  Permanently Delete
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
