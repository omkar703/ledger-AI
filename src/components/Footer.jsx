import React from 'react';
import Logo from './Logo';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-surface-base w-full border-t border-border-subtle flat no shadows">
      <div className="max-w-container-max mx-auto px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6 cursor-pointer inline-block" onClick={() => onNavigate && onNavigate('landing')}>
              <Logo />
            </div>
            <p className="font-body-md text-text-secondary mb-8 max-w-sm">
              Join our newsletter for financial ops insights.
            </p>
            <div className="flex gap-2 max-w-sm">
              <input className="w-full bg-surface-base border border-border-strong rounded-DEFAULT px-4 py-2 font-body-sm text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-text-secondary" placeholder="Enter your email" type="email" />
              <button className="bg-text-primary text-surface-base px-4 py-2 rounded-DEFAULT font-button hover:opacity-90 transition-opacity whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-title-md text-sm text-text-primary mb-6">Product</h3>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate && onNavigate('signup')} className="font-body-sm text-text-secondary hover:text-primary transition-colors text-left">Features</button></li>
              <li><button onClick={() => onNavigate && onNavigate('signup')} className="font-body-sm text-text-secondary hover:text-primary transition-colors text-left">Integrations</button></li>
              <li><button onClick={() => onNavigate && onNavigate('signup')} className="font-body-sm text-text-secondary hover:text-primary transition-colors text-left">Pricing</button></li>
              <li><button onClick={() => onNavigate && onNavigate('signup')} className="font-body-sm text-text-secondary hover:text-primary transition-colors text-left">Changelog</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-title-md text-sm text-text-primary mb-6">Solutions</h3>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate && onNavigate('signup')} className="font-body-sm text-text-secondary hover:text-primary transition-colors text-left">Accounts Payable</button></li>
              <li><button onClick={() => onNavigate && onNavigate('signup')} className="font-body-sm text-text-secondary hover:text-primary transition-colors text-left">Expense Management</button></li>
              <li><button onClick={() => onNavigate && onNavigate('signup')} className="font-body-sm text-text-secondary hover:text-primary transition-colors text-left">Procurement</button></li>
              <li><button onClick={() => onNavigate && onNavigate('signup')} className="font-body-sm text-text-secondary hover:text-primary transition-colors text-left">Enterprise</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-title-md text-sm text-text-primary mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><a className="font-body-sm text-text-secondary hover:text-primary transition-colors" href="#">API Docs</a></li>
              <li><a className="font-body-sm text-text-secondary hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="font-body-sm text-text-secondary hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="font-body-sm text-text-secondary hover:text-primary transition-colors" href="#">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-title-md text-sm text-text-primary mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a className="font-body-sm text-text-secondary hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="font-body-sm text-text-secondary hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="font-body-sm text-text-secondary hover:text-primary transition-colors" href="#">Contact</a></li>
              <li><a className="font-body-sm text-text-secondary hover:text-primary transition-colors" href="#">Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border-subtle">
          <div className="font-body-sm text-text-secondary">
            © 2024 Ledger AI. Precision in Financial Automation.
          </div>
          <div className="flex gap-6">
            <a className="font-body-sm text-text-secondary hover:text-text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-body-sm text-text-secondary hover:text-text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-body-sm text-text-secondary hover:text-text-primary transition-colors" href="#">Security</a>
            <a className="font-body-sm text-text-secondary hover:text-text-primary transition-colors" href="#">Status</a>
          </div>
          <div className="flex items-center gap-4">
            <a className="text-text-secondary hover:text-text-primary transition-colors" href="#">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a className="text-text-secondary hover:text-text-primary transition-colors" href="#">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" fillRule="evenodd"></path>
              </svg>
            </a>
            <a className="text-text-secondary hover:text-text-primary transition-colors" href="#">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
