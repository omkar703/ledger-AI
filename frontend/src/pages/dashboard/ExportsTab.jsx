import React, { useState } from 'react';

const EXPORT_KPIS = [
  {
    title: 'Total Exports',
    value: '384',
    subtitle: 'Generated to date'
  },
  {
    title: 'Exported Volume',
    value: '$48.7M',
    subtitle: '2,481 invoices total'
  },
  {
    title: 'Scheduled Syncs',
    value: '4 Active',
    statusDot: 'bg-emerald-500'
  },
  {
    title: 'Primary Format',
    value: 'Excel (.xlsx)',
    subtitle: 'Auto-mapped ledger'
  }
];

const PRESET_FORMATS = [
  {
    id: 'xlsx',
    title: 'Excel Workbook',
    format: '.xlsx',
    badge: 'Recommended',
    description: 'GAAP multi-tab financial ledger with automated tax calculations, line item splits, and vendor summaries.',
    icon: 'table_view',
    accent: 'text-emerald-600 bg-emerald-50 border-emerald-200/60',
    buttonText: 'Generate & Download (.xlsx)'
  },
  {
    id: 'csv',
    title: 'CSV Flat File',
    format: '.csv',
    description: 'Normalized tabular dataset formatted for direct import into QuickBooks, NetSuite, SAP, and Xero.',
    icon: 'dataset',
    accent: 'text-blue-600 bg-blue-50 border-blue-200/60',
    buttonText: 'Generate & Download (.csv)'
  },
  {
    id: 'pdf',
    title: 'Audit PDF Package',
    format: '.pdf',
    description: 'Executive summary report with visual invoice scans, OCR verification badges, and compliance audit trail.',
    icon: 'picture_as_pdf',
    accent: 'text-rose-600 bg-rose-50 border-rose-200/60',
    buttonText: 'Generate & Download (.pdf)'
  },
  {
    id: 'json',
    title: 'JSON API Stream',
    format: '.json',
    description: 'Structured JSON payload for automated webhooks, ERP integrations, and custom developer pipelines.',
    icon: 'data_object',
    accent: 'text-indigo-600 bg-indigo-50 border-indigo-200/60',
    buttonText: 'Generate & Download (.json)'
  }
];

const INITIAL_EXPORTS = [
  {
    id: 'EXP-2026-088',
    name: 'August_2026_Full_General_Ledger.xlsx',
    format: 'XLSX',
    source: 'August 2026 Batch (243 Invoices)',
    size: '1.4 MB',
    date: 'Aug 28, 2026 • 2:30 PM',
    status: 'Ready',
    downloadCount: 3
  },
  {
    id: 'EXP-2026-087',
    name: 'Q3_Vendor_Discrepancies_Audit.pdf',
    format: 'PDF',
    source: 'Q3 Invoices (84 Invoices)',
    size: '4.8 MB',
    date: 'Aug 26, 2026 • 11:15 AM',
    status: 'Ready',
    downloadCount: 1
  },
  {
    id: 'EXP-2026-086',
    name: 'QuickBooks_GL_Export_Normalized.csv',
    format: 'CSV',
    source: 'Verified Invoices (412 Items)',
    size: '420 KB',
    date: 'Aug 24, 2026 • 5:45 PM',
    status: 'Ready',
    downloadCount: 8
  },
  {
    id: 'EXP-2026-085',
    name: 'Tax_Year_2025_Compliance_Archive.xlsx',
    format: 'XLSX',
    source: '2025 Archive (1,420 Invoices)',
    size: '12.6 MB',
    date: 'Aug 15, 2026 • 9:00 AM',
    status: 'Ready',
    downloadCount: 14
  }
];

export default function ExportsTab() {
  const [exportsList, setExportsList] = useState(INITIAL_EXPORTS);
  const [selectedPresetId, setSelectedPresetId] = useState('xlsx');
  const [selectedExportIds, setSelectedExportIds] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleGenerateAndDownload = (preset) => {
    setIsGenerating(true);
    const newId = `EXP-2026-0${exportsList.length + 89}`;
    const fileName = `Ledger_${preset.title.replace(/\s+/g, '_')}_${Date.now().toString().slice(-4)}${preset.format}`;

    triggerToast(`Processing & generating ${fileName}...`);

    setTimeout(() => {
      const newExport = {
        id: newId,
        name: fileName,
        format: preset.format.replace('.', '').toUpperCase(),
        source: 'Current Workspace Active Invoices',
        size: preset.id === 'pdf' ? '3.2 MB' : preset.id === 'xlsx' ? '1.1 MB' : preset.id === 'csv' ? '410 KB' : '280 KB',
        date: 'Just now',
        status: 'Ready',
        downloadCount: 1
      };

      setExportsList([newExport, ...exportsList]);
      setIsGenerating(false);
      setDownloadingId(newId);

      setTimeout(() => {
        setDownloadingId(null);
        triggerToast(`Successfully generated and downloaded ${fileName}!`);
      }, 700);
    }, 800);
  };

  const handleDownloadSingle = (item) => {
    setDownloadingId(item.id);
    setTimeout(() => {
      setDownloadingId(null);
      triggerToast(`Downloaded ${item.name}`);
      setExportsList((prev) =>
        prev.map((exp) =>
          exp.id === item.id ? { ...exp, downloadCount: exp.downloadCount + 1 } : exp
        )
      );
    }, 600);
  };

  const toggleSelectAll = () => {
    if (selectedExportIds.length === filteredExports.length) {
      setSelectedExportIds([]);
    } else {
      setSelectedExportIds(filteredExports.map((e) => e.id));
    }
  };

  const toggleSelectOne = (id, e) => {
    e.stopPropagation();
    if (selectedExportIds.includes(id)) {
      setSelectedExportIds(selectedExportIds.filter((item) => item !== id));
    } else {
      setSelectedExportIds([...selectedExportIds, id]);
    }
  };

  const handleBulkDownload = () => {
    if (selectedExportIds.length === 0) return;
    triggerToast(`Downloading ${selectedExportIds.length} selected export files...`);
    setTimeout(() => {
      setSelectedExportIds([]);
      triggerToast(`All selected files downloaded successfully!`);
    }, 1000);
  };

  const filteredExports = exportsList.filter((exp) =>
    exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-float-slow">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-text-primary text-white font-sans text-xs font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in border border-white/10">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section (Removed Create New Export button as requested) */}
      <div>
        <h1 className="font-sans text-2xl lg:text-3xl font-semibold text-text-primary tracking-tight mb-1.5">
          Exports & Integrations
        </h1>
        <p className="font-sans text-sm text-text-secondary max-w-xl">
          Choose a financial format below to generate and process instant downloads, or access all your previous export files.
        </p>
      </div>

      {/* KPI Cards (Row of 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EXPORT_KPIS.map((kpi, idx) => (
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

      {/* Choose File Format & 1-Click Generate Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-sans font-semibold text-base text-text-primary">
              Choose Export Format
            </h2>
            <p className="font-sans text-xs text-text-secondary mt-0.5">
              Select a format to automatically process and download your financial data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRESET_FORMATS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;

            return (
              <div
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`bg-white rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all cursor-pointer border ${
                  isSelected
                    ? 'border-text-primary ring-1 ring-text-primary shadow-xs'
                    : 'border-border-subtle hover:border-border-strong'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${preset.accent}`}>
                      <span className="material-symbols-outlined text-[20px]">{preset.icon}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {preset.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          {preset.badge}
                        </span>
                      )}
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'border-text-primary bg-text-primary text-white' : 'border-border-subtle'
                      }`}>
                        {isSelected && <span className="material-symbols-outlined text-[12px]">check</span>}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans font-semibold text-sm text-text-primary mb-1">
                    {preset.title}
                  </h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed mb-5">
                    {preset.description}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPresetId(preset.id);
                    handleGenerateAndDownload(preset);
                  }}
                  className={`w-full h-9 rounded-lg font-sans font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-[0.99] ${
                    isSelected
                      ? 'bg-text-primary text-white hover:bg-black'
                      : 'bg-surface-soft text-text-primary hover:bg-text-primary hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isGenerating && isSelected ? 'sync' : 'file_download'}
                  </span>
                  <span>{isGenerating && isSelected ? 'Processing...' : preset.buttonText}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Exports & Download History Table with Checkboxes */}
      <div className="bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-2xs flex flex-col">
        
        {/* Table Header Bar */}
        <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-soft">
          <div className="flex items-center gap-3">
            <h3 className="font-sans font-semibold text-sm text-text-primary">
              Recent Export Files
            </h3>
            <span className="text-xs text-text-secondary font-sans">
              Showing all {filteredExports.length} files
            </span>

            {/* Bulk Action Button when items are checked */}
            {selectedExportIds.length > 0 && (
              <button
                type="button"
                onClick={handleBulkDownload}
                className="ml-2 h-7 px-2.5 bg-text-primary text-white hover:bg-black rounded-md font-sans text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
                <span>Download ({selectedExportIds.length})</span>
              </button>
            )}
          </div>

          <div className="relative flex-1 max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[16px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search export files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8.5 pl-9 pr-3 bg-white border border-border-subtle rounded-lg text-xs font-sans text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Table Content with Multi-Select Checkboxes */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-soft/60 text-xs font-sans font-medium text-text-secondary">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={filteredExports.length > 0 && selectedExportIds.length === filteredExports.length}
                    onChange={toggleSelectAll}
                    className="rounded border-border-strong text-text-primary focus:ring-0"
                  />
                </th>
                <th className="py-3 px-4">Export File</th>
                <th className="py-3 px-4">Source Data</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Generated On</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="font-sans text-xs text-text-primary divide-y divide-border-subtle/60">
              {filteredExports.map((exp) => {
                const isChecked = selectedExportIds.includes(exp.id);

                return (
                  <tr 
                    key={exp.id} 
                    onClick={() => toggleSelectOne(exp.id, { stopPropagation: () => {} })}
                    className={`cursor-pointer transition-colors ${
                      isChecked ? 'bg-surface-soft font-medium' : 'hover:bg-surface-soft/60'
                    }`}
                  >
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => toggleSelectOne(exp.id, e)}
                        className="rounded border-border-strong text-text-primary focus:ring-0"
                      />
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                          exp.format === 'XLSX'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                            : exp.format === 'CSV'
                            ? 'bg-blue-50 text-blue-700 border-blue-200/60'
                            : exp.format === 'PDF'
                            ? 'bg-rose-50 text-rose-700 border-rose-200/60'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200/60'
                        }`}>
                          {exp.format}
                        </span>
                        <span className="font-semibold text-text-primary truncate max-w-xs">
                          {exp.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-text-secondary">
                      {exp.source}
                    </td>

                    <td className="py-3.5 px-4 text-text-secondary font-medium">
                      {exp.size}
                    </td>

                    <td className="py-3.5 px-4 text-text-secondary">
                      {exp.date}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {exp.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleDownloadSingle(exp)}
                        disabled={downloadingId === exp.id}
                        className="h-8 px-3 bg-white border border-border-subtle hover:border-text-primary rounded-lg font-sans font-medium text-xs text-text-primary inline-flex items-center gap-1.5 transition-all shadow-2xs active:scale-[0.98]"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {downloadingId === exp.id ? 'sync' : 'download'}
                        </span>
                        <span>{downloadingId === exp.id ? 'Saving...' : 'Download'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
