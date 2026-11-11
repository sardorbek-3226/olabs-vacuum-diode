import React from 'react';
import { Atom, Home, Newspaper, GraduationCap, Download, Phone, Globe } from 'lucide-react';

export default function Header({ currentPage, onNavigate }) {
  return (
    <>
      {/* 1. Brending va Logotiplar */}
      <header className="olabs-top-header">
        <div className="header-container">
          <div className="olabs-main-logo" onClick={() => onNavigate('home')}>
            <div className="logo-badge">🔬</div>
            <div className="logo-titles">
              <h1>OLabs</h1>
            </div>
          </div>

          <div className="partner-badges">
            <div className="partner-tag ld-badge">
              <span>🏛️</span>
              <span>LD DIDACTIC FIZIKA</span>
            </div>
            <div className="partner-tag">
              <span>⚡</span>
              <span>Elektr va Termoemissiya</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Asosiy Menyu */}
      <nav className="olabs-nav-bar">
        <div className="nav-container">
          <ul className="nav-links">
            <li>
              <button
                className={`nav-item-btn ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => onNavigate('home')}
              >
                <Home size={15} /> Bosh sahifa
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${currentPage === 'experiment' ? 'active' : ''}`}
                onClick={() => onNavigate('experiment')}
              >
                <Atom size={15} /> Vakuumli diod (P 3.8.1.1)
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${currentPage === 'news' ? 'active' : ''}`}
                onClick={() => onNavigate('news')}
              >
                <Newspaper size={15} /> Yangiliklar
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${currentPage === 'workshops' ? 'active' : ''}`}
                onClick={() => onNavigate('workshops')}
              >
                <GraduationCap size={15} /> Seminarlar
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${currentPage === 'downloads' ? 'active' : ''}`}
                onClick={() => onNavigate('downloads')}
              >
                <Download size={15} /> Yuklab olish
              </button>
            </li>
            <li>
              <button
                className={`nav-item-btn ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => onNavigate('contact')}
              >
                <Phone size={15} /> Bog'lanish
              </button>
            </li>
          </ul>

          <div className="nav-right-controls">
            <div className="lang-selector-box">
              <Globe size={14} />
              <span>O'zbek tili</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
