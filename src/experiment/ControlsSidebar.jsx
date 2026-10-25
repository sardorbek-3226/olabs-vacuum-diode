import React from 'react';
import { Sliders, Plus, Zap, Sparkles, RotateCcw } from 'lucide-react';

export default function ControlsSidebar({
  state,
  onUpdateState,
  onAddReading,
  onAutoSweep,
  onAutoSweepAll,
  onResetSim,
  isSweeping
}) {
  const presets = [4.0, 5.0, 6.3];

  const handleStep = (step) => {
    const newUa = Math.max(0, Math.min(250, +(state.Ua + step).toFixed(1)));
    onUpdateState({ Ua: newUa });
  };

  return (
    <aside className="controls-sidebar">
      <div className="control-panel-header">
        <h3><Sliders size={18} /> Boshqaruv Paneli</h3>
        <span className="val-badge">LD Didactic</span>
      </div>

      {/* 1. Katodni qizdirish U_f */}
      <div className="control-group">
        <div className="control-group-title">
          <span>Katodni Qizdirish (U<sub>f</sub>)</span>
          <span className="val-badge">{Number(state.Uf).toFixed(1)} V</span>
        </div>
        <div className="preset-btn-row">
          {presets.map((val) => (
            <button
              key={val}
              className={`preset-btn preset-${val === 4 ? '4' : val === 5 ? '5' : '6'} ${Math.abs(state.Uf - val) < 0.15 ? 'active' : ''}`}
              onClick={() => onUpdateState({ Uf: val })}
            >
              {val.toFixed(1)} V
            </button>
          ))}
        </div>
        <input
          type="range"
          className="range-slider"
          min="2.0"
          max="7.0"
          step="0.1"
          value={state.Uf}
          onChange={(e) => onUpdateState({ Uf: parseFloat(e.target.value) })}
        />
        <div className="slider-labels">
          <span>2.0 V</span>
          <span>5.0 V</span>
          <span>7.0 V</span>
        </div>
      </div>

      {/* 2. Anod kuchlanishi U_A */}
      <div className="control-group">
        <div className="control-group-title">
          <span>Anod Kuchlanishi (U<sub>A</sub>)</span>
          <span className="val-badge anode">{Number(state.Ua).toFixed(1)} V</span>
        </div>
        <input
          type="range"
          className="range-slider"
          min="0"
          max="250"
          step="0.5"
          value={state.Ua}
          onChange={(e) => onUpdateState({ Ua: parseFloat(e.target.value) })}
        />
        <div className="slider-labels">
          <span>0 V</span>
          <span>125 V</span>
          <span>250 V</span>
        </div>
        <div className="quick-step-row">
          {[-10, -1, 1, 5, 10, 25].map((step) => (
            <button
              key={step}
              className="step-btn"
              onClick={() => handleStep(step)}
            >
              {step > 0 ? `+${step}V` : `${step}V`}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Qutblanish va Kalit */}
      <div className="control-group">
        <div className="toggle-switch-row" style={{ marginBottom: 12 }}>
          <span className="switch-label" style={{ color: state.isForward ? '#10b981' : '#ef4444' }}>
            {state.isForward ? "To'g'ri ulash (Anod +, Katod -)" : "Teskari ulash (Anod -, Katod +)"}
          </span>
          <label className="custom-switch">
            <input
              type="checkbox"
              checked={state.isForward}
              onChange={(e) => onUpdateState({ isForward: e.target.checked })}
            />
            <span className="switch-slider"></span>
          </label>
        </div>
        <div className="toggle-switch-row">
          <span className="switch-label" style={{ color: state.isPowerOn ? '#10b981' : '#64748b' }}>
            {state.isPowerOn ? "Yoqilgan (ON)" : "O'chirilgan (OFF)"}
          </span>
          <label className="custom-switch">
            <input
              type="checkbox"
              checked={state.isPowerOn}
              onChange={(e) => onUpdateState({ isPowerOn: e.target.checked })}
            />
            <span className="switch-slider"></span>
          </label>
        </div>
      </div>

      {/* 4. Animatsiya tezligi */}
      <div className="control-group">
        <div className="control-group-title">
          <span>Animatsiya tezligi</span>
          <span style={{ fontSize: 11, color: '#64748b' }}>{state.animSpeed || 1.0}x</span>
        </div>
        <input
          type="range"
          className="range-slider"
          min="0.2"
          max="2.0"
          step="0.1"
          value={state.animSpeed || 1.0}
          onChange={(e) => onUpdateState({ animSpeed: parseFloat(e.target.value) })}
        />
      </div>

      {/* 5. Amallar Tugmalari */}
      <div className="action-buttons-group">
        <button className="btn-primary-action" onClick={onAddReading}>
          <Plus size={16} />
          <span>Jadvalga qo'shish</span>
        </button>

        <button
          className="btn-secondary-action"
          disabled={isSweeping}
          onClick={onAutoSweep}
        >
          <Zap size={16} />
          <span>{isSweeping ? "⏳ O'lchanmoqda..." : "Avtomatik o'lchash (0–240V)"}</span>
        </button>

        <button
          className="btn-tertiary-action"
          disabled={isSweeping}
          onClick={onAutoSweepAll}
        >
          <Sparkles size={15} style={{ color: '#0284c7' }} />
          <span>Barcha 3 ta VAX egri chizig'ini olish</span>
        </button>

        <button className="btn-tertiary-action" onClick={onResetSim}>
          <RotateCcw size={15} style={{ color: '#64748b' }} />
          <span>Qayta o'rnatish (Reset)</span>
        </button>
      </div>
    </aside>
  );
}
