import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';

function getPageFromHash() {
  const hash = (window.location.hash || '').toLowerCase();
  if (hash.includes('login')) return 'login';
  if (hash.includes('signup')) return 'signup';
  if (hash.includes('onboarding')) return 'onboarding';
  if (hash.includes('dashboard')) return 'dashboard';
  return 'landing';
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleNavigate = (page) => {
    if (page === 'landing') {
      if (window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname);
      }
      window.location.hash = '';
    } else {
      window.location.hash = `/${page}`;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <SignUpPage onNavigate={handleNavigate} />}
      {currentPage === 'onboarding' && <OnboardingPage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
