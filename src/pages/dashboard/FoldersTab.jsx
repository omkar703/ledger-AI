import React, { useState } from 'react';

const FOLDER_KPIS = [
  {
    title: 'Total Folders',
    value: '16',
    subtitle: 'Organized collections'
  },
  {
    title: 'Organized Invoices',
    value: '2,481',
    subtitle: '100% categorized'
  },
  {
    title: 'Auto-Routing Rules',
    value: '8 Active',
    statusDot: 'bg-emerald-500'
  },
  {
    title: 'Total Value',
    value: '$48.7M',
    subtitle: 'Across all workspaces'
  }
];

const INITIAL_FOLDERS = [
  {
    id: 1,
    name: 'Dell Technologies',
    category: 'company',
    categoryLabel: 'By Company',
    icon: 'corporate_fare',
    color: 'blue',
    accent: 'bg-blue-50 text-blue-700 border-blue-200/60',
    rule: 'Vendor name contains "Dell" or "Alienware"',
    invoiceCount: 342,
    totalAmount: '$4,120,500.00',
    lastUpdated: '12 mins ago',
    invoices: [
      { id: 'INV-2026-0842', date: 'Aug 14, 2026', amount: '$2,450.00', confidence: '91%', status: 'Needs Review', statusColor: 'amber' },
      { id: 'DELL-901-X', date: 'Aug 10, 2026', amount: '$18,400.00', confidence: '99%', status: 'Completed', statusColor: 'emerald' },
      { id: 'DELL-884-B', date: 'Aug 04, 2026', amount: '$9,200.00', confidence: '98%', status: 'Completed', statusColor: 'emerald' }
    ]
  },
  {
    id: 2,
    name: 'AWS & Cloud Infrastructure',
    category: 'company',
    categoryLabel: 'By Company',
    icon: 'cloud',
    color: 'amber',
    accent: 'bg-amber-50 text-amber-700 border-amber-200/60',
    rule: 'Vendor name contains "Amazon Web Services" or "AWS"',
    invoiceCount: 184,
    totalAmount: '$1,850,200.00',
    lastUpdated: '2 hours ago',
    invoices: [
      { id: 'AWS-2026-AUG', date: 'Aug 01, 2026', amount: '$8,490.20', confidence: '99%', status: 'Completed', statusColor: 'emerald' },
      { id: 'AWS-2026-JUL', date: 'Jul 01, 2026', amount: '$7,840.00', confidence: '99%', status: 'Completed', statusColor: 'emerald' }
    ]
  },
  {
    id: 3,
    name: 'Standard Tax & VAT Invoices',
    category: 'format',
    categoryLabel: 'By Format',
    icon: 'receipt',
    color: 'emerald',
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    rule: 'Document type matches "Standard Tax Invoice (GST / VAT)"',
    invoiceCount: 1240,
    totalAmount: '$24,600,000.00',
    lastUpdated: '1 hour ago',
    invoices: [
      { id: 'INV-2026-0841', date: 'Aug 14, 2026', amount: '$12,890.50', confidence: '99%', status: 'Completed', statusColor: 'emerald' },
      { id: 'TAX-004-991', date: 'Aug 12, 2026', amount: '$3,150.00', confidence: '97%', status: 'Completed', statusColor: 'emerald' }
    ]
  },
  {
    id: 4,
    name: 'Multi-Page Purchase Orders',
    category: 'format',
    categoryLabel: 'By Format',
    icon: 'layers',
    color: 'purple',
    accent: 'bg-purple-50 text-purple-700 border-purple-200/60',
    rule: 'Format layout matches "Itemized Purchase Order (> 3 pages)"',
    invoiceCount: 290,
    totalAmount: '$8,420,000.00',
    lastUpdated: 'Yesterday',
    invoices: [
      { id: 'PO-9920-A', date: 'Aug 11, 2026', amount: '$42,500.00', confidence: '96%', status: 'Completed', statusColor: 'emerald' },
      { id: 'PO-9918-B', date: 'Aug 08, 2026', amount: '$19,800.00', confidence: '95%', status: 'Completed', statusColor: 'emerald' }
    ]
  },
  {
    id: 5,
    name: 'Acme Components & Manufacturing',
    category: 'company',
    categoryLabel: 'By Company',
    icon: 'factory',
    color: 'rose',
    accent: 'bg-rose-50 text-rose-700 border-rose-200/60',
    rule: 'Vendor name contains "Acme" or "Acme Corp"',
    invoiceCount: 215,
    totalAmount: '$3,890,000.00',
    lastUpdated: '3 days ago',
    invoices: [
      { id: 'ACM-092-26', date: 'Aug 09, 2026', amount: '$4,200.00', confidence: '98%', status: 'Completed', statusColor: 'emerald' }
    ]
  },
  {
    id: 6,
    name: 'Q3 2026 Verified Invoices',
    category: 'period',
    categoryLabel: 'By Period',
    icon: 'calendar_month',
    color: 'indigo',
    accent: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    rule: 'Invoice date falls in Q3 2026 (Jul 1 - Sep 30)',
    invoiceCount: 412,
    totalAmount: '$6,420,000.00',
    lastUpdated: 'Just now',
    invoices: [
      { id: 'INV-Q3-01', date: 'Aug 14, 2026', amount: '$5,400.00', confidence: '99%', status: 'Completed', statusColor: 'emerald' },
      { id: 'INV-Q3-02', date: 'Aug 13, 2026', amount: '$2,100.00', confidence: '94%', status: 'Completed', statusColor: 'emerald' }
    ]
  }
];

export default function FoldersTab() {
  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'company' | 'format' | 'period'
  const [selectedFolderId, setSelectedFolderId] = useState(1);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderCategory, setNewFolderCategory] = useState('company');
  const [newFolderRule, setNewFolderRule] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const selectedFolder = folders.find((f) => f.id === selectedFolderId) || folders[0];

  const filteredFolders = folders.filter((f) => {
    if (activeFilter === 'all') return true;
    return f.category === activeFilter;
  });

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newFolder = {
      id: Date.now(),
      name: newFolderName,
      category: newFolderCategory,
      categoryLabel: newFolderCategory === 'company' ? 'By Company' : newFolderCategory === 'format' ? 'By Format' : 'By Period',
      icon: newFolderCategory === 'company' ? 'corporate_fare' : newFolderCategory === 'format' ? 'receipt_long' : 'calendar_month',
      accent: newFolderCategory === 'company' ? 'bg-blue-50 text-blue-700 border-blue-200/60' : newFolderCategory === 'format' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
      rule: newFolderRule || `Auto-sort by ${newFolderName}`,
      invoiceCount: 0,
      totalAmount: '$0.00',
      lastUpdated: 'Just now',
      invoices: []
    };

    setFolders([newFolder, ...folders]);
    setSelectedFolderId(newFolder.id);
    setIsNewFolderModalOpen(false);
    setNewFolderName('');
    setNewFolderRule('');
    triggerToast(`Created folder "${newFolderName}" with auto-routing rule!`);
  };

  const handleImportToFolder = () => {
    triggerToast(`Importing mock invoices into "${selectedFolder.name}"...`);
    setTimeout(() => {
      const mockInvoice = {
        id: `IMP-${Date.now().toString().slice(-4)}`,
        date: 'Aug 26, 2026',
        amount: '$3,450.00',
        confidence: '99%',
        status: 'Completed',
        statusColor: 'emerald'
      };

      setFolders((prev) =>
        prev.map((f) =>
          f.id === selectedFolder.id
            ? {
                ...f,
                invoiceCount: f.invoiceCount + 1,
                lastUpdated: 'Just now',
                invoices: [mockInvoice, ...f.invoices]
              }
            : f
        )
      );
      triggerToast(`Added 1 invoice directly to "${selectedFolder.name}"!`);
    }, 700);
  };

  return (
    <div className="space-y-8 animate-float-slow">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-text-primary text-white font-sans text-xs font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in border border-white/10">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl lg:text-3xl font-semibold text-text-primary tracking-tight mb-1.5">
            Folders & Smart Categorization
          </h1>
          <p className="font-sans text-sm text-text-secondary max-w-xl">
            Automatically group invoices by company vendor, document template, or import custom datasets into organized workspaces.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleImportToFolder}
            className="h-10 px-4 bg-white border border-border-subtle hover:border-border-strong text-text-primary rounded-lg font-sans font-medium text-xs transition-all shadow-2xs"
          >
            Import Invoices
          </button>
          <button
            type="button"
            onClick={() => setIsNewFolderModalOpen(true)}
            className="h-10 px-5 bg-text-primary hover:bg-black text-white rounded-lg font-sans font-medium text-xs flex items-center gap-2 transition-all shadow-sm active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">create_new_folder</span>
            <span>New Folder</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards (Row of 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FOLDER_KPIS.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white border border-border-subtle rounded-xl p-5 shadow-2xs flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-sans text-xs font-medium text-text-secondary">
                {kpi.title}
              </span>
              {kpi.statusDot && (
                <span className={`w-2 h-2 rounded-full ${kpi.statusDot}`}></span>
              )}
            </div>

            <div>
              <div className="font-sans text-2xl font-semibold text-text-primary tracking-tight">
                {kpi.value}
              </div>
              {kpi.subtitle && (
                <p className="font-sans text-[11px] text-text-secondary mt-1">
                  {kpi.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>



      {/* Main Master-Detail Layout: Folders Grid + Selected Folder Inspector */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left: Folders Grid */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredFolders.map((folder) => {
            const isSelected = selectedFolderId === folder.id;

            return (
              <div
                key={folder.id}
                onClick={() => setSelectedFolderId(folder.id)}
                className={`bg-white rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all cursor-pointer border ${
                  isSelected
                    ? 'border-text-primary ring-1 ring-text-primary shadow-xs'
                    : 'border-border-subtle hover:border-border-strong'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${folder.accent}`}>
                      <span className="material-symbols-outlined text-[20px]">{folder.icon}</span>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-surface-soft text-text-secondary border border-border-subtle">
                      {folder.categoryLabel}
                    </span>
                  </div>

                  <h3 className="font-sans font-semibold text-sm text-text-primary mb-1">
                    {folder.name}
                  </h3>

                  <p className="font-sans text-[11px] text-text-secondary line-clamp-1 mb-4">
                    {folder.rule}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-subtle flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-text-primary font-sans">{folder.invoiceCount}</span>
                    <span className="text-text-secondary font-sans ml-1">invoices</span>
                  </div>
                  <span className="font-semibold text-text-primary font-sans">{folder.totalAmount}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Folder Detailed Inspection & Direct Drop Area */}
        {selectedFolder && (
          <div className="w-full lg:w-96 bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-2xs flex flex-col shrink-0">
            
            {/* Header */}
            <div className="p-5 border-b border-border-subtle">
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${selectedFolder.accent}`}>
                  <span className="material-symbols-outlined text-[18px]">{selectedFolder.icon}</span>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-sm text-text-primary">
                    {selectedFolder.name}
                  </h3>
                  <span className="font-sans text-[11px] text-text-secondary">
                    {selectedFolder.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Auto-routing rule card */}
              <div className="p-2.5 bg-surface-soft border border-border-subtle rounded-xl text-xs space-y-1 mb-4">
                <div className="flex items-center gap-1.5 text-text-secondary font-medium text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">alt_route</span>
                  <span>Auto-Routing Rule</span>
                </div>
                <p className="font-sans text-text-primary font-medium text-xs">
                  {selectedFolder.rule}
                </p>
              </div>

              {/* Folder Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2.5 bg-surface-soft border border-border-subtle rounded-xl">
                  <span className="text-text-secondary text-[11px] block">Invoices</span>
                  <span className="font-semibold text-text-primary text-sm">{selectedFolder.invoiceCount}</span>
                </div>
                <div className="p-2.5 bg-surface-soft border border-border-subtle rounded-xl">
                  <span className="text-text-secondary text-[11px] block">Total Sum</span>
                  <span className="font-semibold text-text-primary text-sm">{selectedFolder.totalAmount}</span>
                </div>
              </div>

              {/* Direct Action */}
              <button
                type="button"
                onClick={handleImportToFolder}
                className="w-full h-9 bg-text-primary hover:bg-black text-white rounded-lg font-sans font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[16px]">upload_file</span>
                <span>Add Invoices to Folder</span>
              </button>
            </div>

            {/* Folder Files List */}
            <div className="p-4 bg-surface-soft flex-1">
              <div className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2.5">
                Invoices in Folder
              </div>

              {selectedFolder.invoices.length > 0 ? (
                <div className="space-y-2">
                  {selectedFolder.invoices.map((inv, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white border border-border-subtle rounded-xl flex items-center justify-between shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-text-secondary text-[16px]">
                          description
                        </span>
                        <div>
                          <p className="font-sans font-semibold text-xs text-text-primary">{inv.id}</p>
                          <p className="font-sans text-[10px] text-text-secondary">{inv.date}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-sans font-semibold text-xs text-text-primary">{inv.amount}</p>
                        <span className={`inline-block px-1.5 py-0.2 rounded-full text-[10px] font-medium ${
                          inv.statusColor === 'emerald' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-text-secondary text-xs">
                  <span className="material-symbols-outlined text-[24px] mb-1 text-text-secondary/60">folder_open</span>
                  <p>No invoices in this folder yet.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* New Folder Modal */}
      {isNewFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-border-subtle rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5 animate-scale-up">
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-sans font-semibold text-base text-text-primary">
                  Create Smart Folder
                </h3>
                <p className="font-sans text-xs text-text-secondary mt-0.5">
                  Organize invoices automatically by company, format, or date
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewFolderModalOpen(false)}
                className="text-text-secondary hover:text-text-primary p-1 rounded-lg hover:bg-surface-soft"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="block font-sans text-xs font-medium text-text-primary mb-1">
                  Folder Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google Cloud Services or Utility Invoices"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full h-9 px-3 bg-white border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-medium text-text-primary mb-1">
                  Categorization Type
                </label>
                <select
                  value={newFolderCategory}
                  onChange={(e) => setNewFolderCategory(e.target.value)}
                  className="w-full h-9 px-3 bg-white border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:outline-none focus:border-primary transition-all"
                >
                  <option value="company">By Company / Vendor Name</option>
                  <option value="format">By Document Format / Template</option>
                  <option value="period">By Fiscal Period / Quarter</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-xs font-medium text-text-primary mb-1">
                  Auto-Routing Match Condition
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vendor contains 'Google' or layout has 'Tax Receipt'"
                  value={newFolderRule}
                  onChange={(e) => setNewFolderRule(e.target.value)}
                  className="w-full h-9 px-3 bg-white border border-border-subtle rounded-lg text-xs font-sans text-text-primary focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewFolderModalOpen(false)}
                  className="h-9 px-4 bg-white border border-border-subtle hover:border-border-strong text-text-primary rounded-lg font-sans font-medium text-xs transition-all shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 bg-text-primary hover:bg-black text-white rounded-lg font-sans font-medium text-xs transition-all shadow-sm active:scale-[0.99]"
                >
                  Create Folder
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
