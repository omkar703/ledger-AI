import React from 'react';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="bg-surface-base fixed top-0 w-full z-50 border-b border-border-subtle flat no shadows">
      <div className="max-w-container-max mx-auto px-margin-desktop h-20 flex items-center justify-between">
        <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <Logo />
        </a>
        
        <div className="flex items-center gap-4">
          <a className="font-button text-button text-text-secondary hover:text-text-primary hidden sm:block px-3 py-2 rounded transition-colors" href="#">
            Sign in
          </a>
          <a className="font-button text-button bg-text-primary text-surface-base px-4 py-2 rounded-DEFAULT hover:opacity-90 transition-opacity shadow-sm" href="#">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
