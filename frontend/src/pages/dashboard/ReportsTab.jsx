import React, { useState } from 'react';

const COMBINED_REPORTS = [
  {
    id: 'REP-AUG-2026',
    name: 'August 2026 Consolidated Master Ledger',
    folder: 'August 2026 Batch',
    created: 'Aug 28, 2026 • 2:30 PM',
    invoicesCount: 243,
    totalRows: 1284,
    totalSpend: '$48,740.00',
    totalTax: '$4,120.50',
    accuracy: '99.4%',
    status: 'Verified & Reconciled',
    rows: [
      { id: 'INV-842', vendor: 'Dell Technologies', category: 'Hardware', date: 'Aug 14, 2026', desc: 'Precision 7780 Workstation + RAM', qty: 2, unitPrice: '$2,100.00', tax: '8.5%', subtotal: '$4,200.00', total: '$4,557.00', confidence: '99%', status: 'Reconciled' },
      { id: 'INV-843', vendor: 'TechFlow Systems', category: 'Software', date: 'Aug 14, 2026', desc: 'Enterprise SaaS Annual Seat License', qty: 1, unitPrice: '$1,150.50', tax: '0.0%', subtotal: '$1,150.50', total: '$1,150.50', confidence: '98%', status: 'Reconciled' },
      { id: 'INV-844', vendor: 'Staples Inc', category: 'Office Supplies', date: 'Aug 13, 2026', desc: 'Recycled Paper Reams & Toners', qty: 5, unitPrice: '$16.99', tax: '8.25%', subtotal: '$84.95', total: '$91.96', confidence: '96%', status: 'Reconciled' },
      { id: 'INV-845', vendor: 'AWS Cloud Services', category: 'Cloud Infra', date: 'Aug 12, 2026', desc: 'EC2 Compute & S3 Storage Cluster', qty: 1, unitPrice: '$8,490.20', tax: '0.0%', subtotal: '$8,490.20', total: '$8,490.20', confidence: '99%', status: 'Reconciled' },
      { id: 'INV-846', vendor: 'Prime Logistics', category: 'Shipping', date: 'Aug 10, 2026', desc: 'Overnight Freight Delivery', qty: 3, unitPrice: '$320.00', tax: '5.0%', subtotal: '$960.00', total: '$1,008.00', confidence: '94%', status: 'Reconciled' },
      { id: 'INV-847', vendor: 'Global Office Furniture', category: 'Facilities', date: 'Aug 08, 2026', desc: 'Ergonomic Mesh Task Chairs', qty: 4, unitPrice: '$450.00', tax: '8.5%', subtotal: '$1,800.00', total: '$1,953.00', confidence: '98%', status: 'Reconciled' },
      { id: 'INV-848', vendor: 'Alpha Hosting', category: 'Cloud Infra', date: 'Aug 05, 2026', desc: 'Dedicated Server Backup Vault', qty: 1, unitPrice: '$3,800.00', tax: '0.0%', subtotal: '$3,800.00', total: '$3,800.00', confidence: '99%', status: 'Reconciled' }
    ],
    vendorBreakdown: [
      { vendor: 'Dell Technologies', amount: '$18,400.00', share: '37.7%' },
      { vendor: 'AWS Cloud Services', amount: '$8,490.20', share: '17.4%' },
      { vendor: 'Alpha Hosting', amount: '$3,800.00', share: '7.8%' },
      { vendor: 'TechFlow Systems', amount: '$2,450.00', share: '5.0%' },
      { vendor: 'Other Combined', amount: '$15,599.80', share: '32.1%' }
    ],
    categoryBreakdown: [
      { name: 'Hardware & Devices', pct: 45, color: 'bg-blue-500' },
      { name: 'Cloud & Infrastructure', pct: 28, color: 'bg-emerald-500' },
      { name: 'Software & SaaS', pct: 14, color: 'bg-purple-500' },
      { name: 'Facilities & Logistics', pct: 13, color: 'bg-amber-500' }
    ]
  },
  {
    id: 'REP-Q3-AUDIT',
    name: 'Q3 Vendor Comprehensive Audit',
    folder: 'Q3 Invoices',
    created: 'Aug 26, 2026 • 11:15 AM',
    invoicesCount: 84,
    totalRows: 412,
    totalSpend: '$19,850.00',
    totalTax: '$1,620.00',
    accuracy: '98.8%',
    status: 'Audit In Progress',
    rows: [
      { id: 'INV-790', vendor: 'Dell Technologies', category: 'Hardware', date: 'Aug 02, 2026', desc: 'PowerEdge R750 Rack Server', qty: 1, unitPrice: '$12,450.00', tax: '8.5%', subtotal: '$12,450.00', total: '$13,508.25', confidence: '97%', status: 'Audited' },
      { id: 'INV-791', vendor: 'Prime Logistics', category: 'Shipping', date: 'Jul 28, 2026', desc: 'Customs Clearance & Handling', qty: 2, unitPrice: '$460.00', tax: '5.0%', subtotal: '$920.00', total: '$966.00', confidence: '92%', status: 'Flagged' },
      { id: 'INV-792', vendor: 'Global Office', category: 'Facilities', date: 'Jul 22, 2026', desc: 'Whiteboards and Accessories', qty: 1, unitPrice: '$310.40', tax: '8.0%', subtotal: '$310.40', total: '$335.23', confidence: '99%', status: 'Audited' }
    ],
    vendorBreakdown: [
      { vendor: 'Dell Technologies', amount: '$13,508.25', share: '68.0%' },
      { vendor: 'Prime Logistics', amount: '$3,420.00', share: '17.2%' },
      { vendor: 'Global Office', amount: '$2,921.75', share: '14.8%' }
    ],
    categoryBreakdown: [
      { name: 'Hardware', pct: 68, color: 'bg-blue-500' },
      { name: 'Logistics', pct: 18, color: 'bg-amber-500' },
      { name: 'Facilities', pct: 14, color: 'bg-emerald-500' }
    ]
  }
];

const INITIAL_CHAT_MESSAGES = [
  {
    sender: 'ai',
    text: 'Hello! I am your Financial Report Copilot. I have analyzed your combined invoice dataset. You can ask me questions about vendor spend, tax breakdowns, anomalies, or category distributions.'
  }
];

export default function ReportsTab({ onNavigateTab }) {
  const [selectedReportId, setSelectedReportId] = useState('REP-AUG-2026');
  const [activeSubTab, setActiveSubTab] = useState('spreadsheet'); // 'spreadsheet' | 'analytics'
  const [searchFilter, setSearchFilter] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const selectedReport = COMBINED_REPORTS.find((r) => r.id === selectedReportId) || COMBINED_REPORTS[0];

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const newMessages = [...chatMessages, { sender: 'user', text: userText }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsChatTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('dell') || lower.includes('aws') || lower.includes('vendor')) {
        reply = `**Vendor Spend Breakdown for ${selectedReport.name}:**\n\n• **Dell Technologies**: $18,400.00 (37.7% of total spend across hardware/servers)\n• **AWS Cloud Services**: $8,490.20 (17.4% compute & hosting)\n• **Alpha Hosting**: $3,800.00 (7.8%)\n\nCombined Dell + AWS spend equals **$26,890.20** (55.1% of entire report volume).`;
      } else if (lower.includes('tax') || lower.includes('vat')) {
        reply = `**Tax & VAT Analysis:**\n\n• **Total Tax Calculated**: ${selectedReport.totalTax}\n• **Average Tax Rate**: 8.45% on eligible taxable items\n• Software licenses and Cloud infrastructure (AWS) are zero-rated for sales tax.\n• All line item tax amounts match vendor calculation standards.`;
      } else if (lower.includes('large') || lower.includes('highest') || lower.includes('top')) {
        reply = `**Top Highest-Value Invoices in this Report:**\n\n1. **INV-845 (AWS Cloud)**: $8,490.20\n2. **INV-842 (Dell Precision Workstations)**: $4,557.00\n3. **INV-848 (Alpha Hosting)**: $3,800.00\n\nThese 3 items represent over 70% of this ledger's line items.`;
      } else if (lower.includes('anomaly') || lower.includes('review') || lower.includes('confidence')) {
        reply = `**Anomaly & OCR Quality Scan:**\n\n• **Average Confidence**: ${selectedReport.accuracy}\n• **Flags**: 1 shipping invoice (Prime Logistics) has 94% confidence due to background stamp watermark.\n• **Summary**: No mathematical discrepancies found; all subtotals balance cleanly.`;
      } else {
        reply = `Based on the **${selectedReport.name}**:\n\n• **Combined Spend**: ${selectedReport.totalSpend}\n• **Total Tax**: ${selectedReport.totalTax}\n• **Items**: ${selectedReport.totalRows} line items across ${selectedReport.invoicesCount} invoices\n• **Reconciliation Status**: ${selectedReport.status}`;
      }

      setChatMessages([...newMessages, { sender: 'ai', text: reply }]);
      setIsChatTyping(false);
    }, 800);
  };

  const handleSuggestedPrompt = (prompt) => {
    setChatInput(prompt);
    setTimeout(() => {
      const form = document.getElementById('report-chat-form');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 50);
  };

  const filteredRows = selectedReport.rows.filter((r) =>
    r.vendor.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.desc.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-float-slow">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-text-primary text-white font-sans text-xs font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in border border-white/10">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Combined Report Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-text-secondary text-xs font-sans">
              Folder: {selectedReport.folder}
            </span>
          </div>

          {/* Selectable Report Title */}
          <div className="flex items-center gap-3">
            <select
              value={selectedReportId}
              onChange={(e) => setSelectedReportId(e.target.value)}
              className="font-sans text-xl lg:text-2xl font-bold text-text-primary tracking-tight bg-transparent border-b border-dashed border-border-strong hover:border-text-primary focus:outline-none cursor-pointer py-1 pr-6"
            >
              {COMBINED_REPORTS.map((rep) => (
                <option key={rep.id} value={rep.id}>
                  {rep.name}
                </option>
              ))}
            </select>
          </div>
          <p className="font-sans text-xs text-text-secondary mt-1">
            Generated on {selectedReport.created} • {selectedReport.invoicesCount} Invoices Combined
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`h-10 px-4 rounded-lg font-sans font-medium text-xs flex items-center gap-2 transition-all shadow-2xs border ${
              isChatOpen
                ? 'bg-text-primary text-white border-text-primary'
                : 'bg-white text-text-primary border-border-subtle hover:border-border-strong'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">chat_spark</span>
            <span>{isChatOpen ? 'Hide AI Copilot' : 'Chat with Report'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerToast(`Exporting ${selectedReport.name} to Excel (.xlsx)...`);
              if (onNavigateTab) onNavigateTab('Exports');
            }}
            className="h-10 px-5 bg-text-primary hover:bg-black text-white rounded-lg font-sans font-medium text-xs flex items-center gap-2 transition-all shadow-sm active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Export Full Sheet</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-2xs">
          <span className="font-sans text-xs font-medium text-text-secondary block mb-1">
            Combined Spend
          </span>
          <div className="font-sans text-2xl font-semibold text-text-primary tracking-tight">
            {selectedReport.totalSpend}
          </div>
          <p className="font-sans text-[11px] text-text-secondary mt-1">
            {selectedReport.invoicesCount} total invoices
          </p>
        </div>

        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-2xs">
          <span className="font-sans text-xs font-medium text-text-secondary block mb-1">
            Total Tax / VAT
          </span>
          <div className="font-sans text-2xl font-semibold text-text-primary tracking-tight">
            {selectedReport.totalTax}
          </div>
          <p className="font-sans text-[11px] text-emerald-600 font-medium mt-1">
            100% Tax verified
          </p>
        </div>

        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-2xs">
          <span className="font-sans text-xs font-medium text-text-secondary block mb-1">
            Line Items Extracted
          </span>
          <div className="font-sans text-2xl font-semibold text-text-primary tracking-tight">
            {selectedReport.totalRows}
          </div>
          <p className="font-sans text-[11px] text-text-secondary mt-1">
            Consolidated table rows
          </p>
        </div>

        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-2xs">
          <div className="flex justify-between items-start mb-1">
            <span className="font-sans text-xs font-medium text-text-secondary">
              Extraction Accuracy
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="font-sans text-2xl font-semibold text-text-primary tracking-tight">
            {selectedReport.accuracy}
          </div>
          <p className="font-sans text-[11px] text-emerald-600 font-medium mt-1">
            {selectedReport.status}
          </p>
        </div>
      </div>

      {/* Main Workspace Layout: Tabs & Excel Spreadsheet Grid + AI Copilot Chat Drawer */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Side: Report View Container */}
        <div className="flex-1 w-full bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-2xs flex flex-col min-h-[560px]">
          
          {/* Sub-Tabs & Search Toolbar */}
          <div className="p-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-soft">
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-border-subtle shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveSubTab('spreadsheet')}
                className={`px-3 py-1.5 rounded-lg font-sans text-xs font-medium flex items-center gap-1.5 transition-all ${
                  activeSubTab === 'spreadsheet'
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">table_view</span>
                <span>Excel Spreadsheet Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('analytics')}
                className={`px-3 py-1.5 rounded-lg font-sans text-xs font-medium flex items-center gap-1.5 transition-all ${
                  activeSubTab === 'analytics'
                    ? 'bg-text-primary text-white font-semibold shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">bar_chart</span>
                <span>Visual Analytics</span>
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative max-w-xs w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[16px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search vendor, item description, category..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full h-8.5 pl-9 pr-3 bg-white border border-border-subtle rounded-lg text-xs font-sans text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-all"
              />
            </div>

          </div>

          {/* Sub-Tab 1: Excel Spreadsheet Grid View */}
          {activeSubTab === 'spreadsheet' && (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse font-sans text-xs">
                <thead>
                  <tr className="border-b border-border-subtle bg-surface-soft text-text-secondary font-semibold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 w-12 text-center text-text-secondary/60">#</th>
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Vendor</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Line Item Description</th>
                    <th className="py-3 px-3 text-center">Qty</th>
                    <th className="py-3 px-3 text-right">Tax (%)</th>
                    <th className="py-3 px-3 text-right">Subtotal</th>
                    <th className="py-3 px-4 text-right font-bold text-text-primary">Total Amount</th>
                    <th className="py-3 px-3 text-center">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/60 text-text-primary">
                  {filteredRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-soft/80 transition-colors">
                      <td className="py-3 px-4 text-center font-mono text-[11px] text-text-secondary/60">
                        {idx + 1}
                      </td>

                      <td className="py-3 px-4 font-semibold text-text-primary">
                        {row.id}
                      </td>

                      <td className="py-3 px-4 font-medium text-text-primary truncate max-w-[130px]">
                        {row.vendor}
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface-soft border border-border-subtle text-text-secondary">
                          {row.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-text-secondary whitespace-nowrap">
                        {row.date}
                      </td>

                      <td className="py-3 px-4 text-text-primary max-w-xs truncate">
                        {row.desc}
                      </td>

                      <td className="py-3 px-3 text-center font-medium">
                        {row.qty}
                      </td>

                      <td className="py-3 px-3 text-right text-text-secondary font-mono">
                        {row.tax}
                      </td>

                      <td className="py-3 px-3 text-right text-text-secondary font-mono">
                        {row.subtotal}
                      </td>

                      <td className="py-3 px-4 text-right font-semibold text-text-primary font-mono">
                        {row.total}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono">
                          {row.confidence}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Excel Spreadsheet Footer Bar */}
              <div className="p-3 border-t border-border-subtle bg-surface-soft flex items-center justify-between text-xs text-text-secondary">
                <span>Showing {filteredRows.length} of {selectedReport.totalRows} combined entries</span>
                <span className="font-semibold text-text-primary">Total Sum: {selectedReport.totalSpend}</span>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Visual Analytics & Financial Charts View */}
          {activeSubTab === 'analytics' && (
            <div className="p-6 space-y-6 flex-1">
              
              {/* Vendor Spend Bar Chart */}
              <div className="bg-surface-soft border border-border-subtle rounded-2xl p-5">
                <h3 className="font-sans font-semibold text-sm text-text-primary mb-1">
                  Spend Distribution by Vendor
                </h3>
                <p className="font-sans text-xs text-text-secondary mb-4">
                  Primary vendor allocation across this consolidated report
                </p>

                <div className="space-y-3">
                  {selectedReport.vendorBreakdown.map((v, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-sans">
                        <span className="font-medium text-text-primary">{v.vendor}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-text-primary">{v.amount}</span>
                          <span className="text-text-secondary text-[11px]">({v.share})</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white border border-border-subtle rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: v.share }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expense Category Breakdown */}
              <div className="bg-surface-soft border border-border-subtle rounded-2xl p-5">
                <h3 className="font-sans font-semibold text-sm text-text-primary mb-1">
                  Expense Category Allocation
                </h3>
                <p className="font-sans text-xs text-text-secondary mb-4">
                  Tax category classification
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedReport.categoryBreakdown.map((cat, ci) => (
                    <div key={ci} className="p-3 bg-white border border-border-subtle rounded-xl">
                      <span className="text-[11px] text-text-secondary block truncate mb-1">{cat.name}</span>
                      <span className="font-sans text-lg font-bold text-text-primary">{cat.pct}%</span>
                      <div className="w-full h-1.5 bg-surface-soft rounded-full mt-2 overflow-hidden">
                        <div className={`h-full ${cat.color}`} style={{ width: `${cat.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Side: AI Report Copilot (Chatbot) */}
        {isChatOpen && (
          <div className="w-full lg:w-96 bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-2xs flex flex-col shrink-0 h-[560px]">
            
            {/* Chatbot Header */}
            <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-surface-soft">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-xs text-text-primary">
                    Report Financial Copilot
                  </h3>
                  <span className="font-sans text-[10px] text-emerald-600 font-medium">
                    Online • Grounded in Report
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="text-text-secondary hover:text-text-primary p-1 rounded-lg hover:bg-white"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Suggested Prompt Chips */}
            <div className="p-3 bg-surface-soft/40 border-b border-border-subtle flex gap-1.5 overflow-x-auto text-[11px] font-sans">
              <button
                type="button"
                onClick={() => handleSuggestedPrompt('Show spend on Dell & AWS')}
                className="px-2.5 py-1 bg-white border border-border-subtle hover:border-text-primary rounded-full shrink-0 text-text-secondary hover:text-text-primary transition-colors"
              >
                Dell & AWS Spend
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedPrompt('Show tax summary and anomalies')}
                className="px-2.5 py-1 bg-white border border-border-subtle hover:border-text-primary rounded-full shrink-0 text-text-secondary hover:text-text-primary transition-colors"
              >
                Tax Breakdown
              </button>
              <button
                type="button"
                onClick={() => handleSuggestedPrompt('What is the largest invoice?')}
                className="px-2.5 py-1 bg-white border border-border-subtle hover:border-text-primary rounded-full shrink-0 text-text-secondary hover:text-text-primary transition-colors"
              >
                Top Invoices
              </button>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white text-xs font-sans">
              {chatMessages.map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-text-primary text-white font-medium rounded-br-none'
                        : 'bg-surface-soft border border-border-subtle text-text-primary rounded-bl-none shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isChatTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-surface-soft border border-border-subtle text-text-secondary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form
              id="report-chat-form"
              onSubmit={handleSendMessage}
              className="p-3 border-t border-border-subtle bg-surface-soft flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask anything about this report..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 h-8.5 px-3 bg-white border border-border-subtle rounded-lg text-xs font-sans text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="h-8.5 px-3 bg-text-primary hover:bg-black text-white rounded-lg font-sans font-medium text-xs flex items-center justify-center transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>

          </div>
        )}

      </div>

    </div>
  );
}
