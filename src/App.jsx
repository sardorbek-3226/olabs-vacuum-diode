import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ExperimentPage from './pages/ExperimentPage';
import NewsPage from './pages/NewsPage';
import WorkshopsPage from './pages/WorkshopsPage';
import DownloadsPage from './pages/DownloadsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  // Sahifa holati: 'home' | 'experiment' | 'news' | 'workshops' | 'downloads' | 'contact'
  const [currentPage, setCurrentPage] = useState('experiment');
  const [initialExperimentTab, setInitialExperimentTab] = useState('4');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // URL parametrlarini tekshirish
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const cntParam = params.get('cnt');
    const simParam = params.get('sim');

    if (pageParam) {
      setCurrentPage(pageParam);
    } else if (simParam || cntParam) {
      setCurrentPage('experiment');
      if (cntParam) setInitialExperimentTab(cntParam);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleNavigate = (page, tabId = '4') => {
    setCurrentPage(page);
    if (page === 'experiment') {
      setInitialExperimentTab(tabId);
      const url = new URL(window.location);
      url.searchParams.set('sub', '1');
      url.searchParams.set('brch', '6');
      url.searchParams.set('sim', '146');
      url.searchParams.set('cnt', tabId);
      url.searchParams.delete('page');
      window.history.pushState({}, '', url);
    } else {
      const url = new URL(window.location);
      url.searchParams.set('page', page);
      url.searchParams.delete('cnt');
      url.searchParams.delete('sim');
      window.history.pushState({}, '', url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExperiment = (expId) => {
    if (expId === 'vacuum_diode') {
      handleNavigate('experiment', '4');
    } else {
      showToast(`Tanlangan laboratoriya ochilmoqda: ${expId}`);
      handleNavigate('experiment', '4');
    }
  };

  return (
    <>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="main-app-content">
        {currentPage === 'home' && (
          <HomePage onSelectExperiment={handleSelectExperiment} />
        )}

        {currentPage === 'experiment' && (
          <ExperimentPage
            onNavigate={handleNavigate}
            onShowToast={showToast}
            initialTab={initialExperimentTab}
          />
        )}

        {currentPage === 'news' && (
          <NewsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'workshops' && (
          <WorkshopsPage onShowToast={showToast} />
        )}

        {currentPage === 'downloads' && (
          <DownloadsPage onShowToast={showToast} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onShowToast={showToast} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <Toast message={toastMessage} />
    </>
  );
}
