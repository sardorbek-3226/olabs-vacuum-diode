import React, { useState } from 'react';
import { BookOpen, ListOrdered, Play, Video, HelpCircle, FileText, MessageSquare, Printer, Zap } from 'lucide-react';
import TheoryTab from '../experiment/tabs/TheoryTab';
import ProcedureTab from '../experiment/tabs/ProcedureTab';
import SimulatorTab from '../experiment/tabs/SimulatorTab';
import AnimationTab from '../experiment/tabs/AnimationTab';
import QuizTab from '../experiment/tabs/QuizTab';
import ResourcesTab from '../experiment/tabs/ResourcesTab';
import FeedbackTab from '../experiment/tabs/FeedbackTab';
import LabReportModal from '../experiment/LabReportModal';

export default function ExperimentPage({ onNavigate, onShowToast, initialTab = '4' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // '1' | '2' | '4' | '9' | '94' | '6' | '7'
  const [isReportOpen, setIsReportOpen] = useState(false);

  const tabs = [
    { id: '1', name: 'Nazariya', icon: <BookOpen size={16} /> },
    { id: '2', name: 'Jarayon', icon: <ListOrdered size={16} /> },
    { id: '4', name: 'Simulyator', icon: <Play size={16} /> },
    { id: '9', name: 'Video va Animatsiya', icon: <Video size={16} /> },
    { id: '94', name: "O'z-o'zini baholash", icon: <HelpCircle size={16} /> },
    { id: '6', name: 'Manbalar', icon: <FileText size={16} /> },
    { id: '7', name: 'Fikr-mulohaza', icon: <MessageSquare size={16} /> }
  ];

  return (
    <div>
      {/* Nonushta (Breadcrumb) */}
      <div className="breadcrumb-section">
        <div className="breadcrumb-path">
          <span>Siz bu yerdasiz:</span>
          <button className="breadcrumb-link" onClick={() => onNavigate('home')}>Bosh sahifa</button>
          <span>›</span>
          <button className="breadcrumb-link" onClick={() => onNavigate('home')}>Fizika</button>
          <span>›</span>
          <button className="breadcrumb-link" onClick={() => onNavigate('home')}>11-12 sinf / Oliy Fizika</button>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Vakuumli diodning volt-amper xarakteristikasini o'rganish</span>
        </div>
      </div>

      {/* Sarlavha Kartasi */}
      <div className="experiment-header-card">
        <div className="header-card-inner">
          <div className="exp-title-area">
            <h2>Vakuumli diodning volt-amper xarakteristikasini o'rganish</h2>
            <div className="exp-meta-tags">
              <span className="exp-tag subject">Elektr va Magnetizm</span>
              <span className="exp-tag code">LD FIZIKA P 3.8.1.1</span>
              <span className="exp-tag standard">Lengmyur-Chayld qonuni</span>
              <span className="exp-tag standard">Termoelektron emissiya</span>
            </div>
          </div>

          <div className="header-action-btns">
            <button className="btn-report-header" onClick={() => setIsReportOpen(true)}>
              <Printer size={15} />
              <span>Hisobot varaqasi</span>
            </button>
            <button className="btn-sim-quick" onClick={() => setActiveTab('4')}>
              <Zap size={15} />
              <span>Virtual Simulyator</span>
            </button>
          </div>
        </div>
      </div>

      {/* OLabs Tab Navigatsiyasi */}
      <div className="tabs-navigation-wrapper">
        <ul className="olabs-tabs-bar">
          {tabs.map((t) => (
            <li key={t.id}>
              <button
                className={`olabs-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon}
                <span>{t.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Kontenti */}
      <div className="main-tab-content-container">
        <div className="tab-pane-card">
          {activeTab === '1' && <TheoryTab />}
          {activeTab === '2' && <ProcedureTab />}
          {activeTab === '4' && <SimulatorTab onShowToast={onShowToast} onOpenReport={() => setIsReportOpen(true)} />}
          {activeTab === '9' && <AnimationTab />}
          {activeTab === '94' && <QuizTab onShowToast={onShowToast} />}
          {activeTab === '6' && <ResourcesTab />}
          {activeTab === '7' && <FeedbackTab onShowToast={onShowToast} />}
        </div>
      </div>

      {/* Rasmiy Laboratoriya Hisoboti Modali */}
      <LabReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
