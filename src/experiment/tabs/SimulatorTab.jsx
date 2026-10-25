import React, { useState } from 'react';
import LabCanvas from '../LabCanvas';
import ControlsSidebar from '../ControlsSidebar';
import DataTable from '../DataTable';
import ChartCanvas from '../ChartCanvas';
import { PhysicsModel } from '../../utils/physics';

export default function SimulatorTab({ onShowToast, onOpenReport }) {
  const [state, setState] = useState({
    Uf: 6.3,
    Ua: 40.0,
    isForward: true,
    isPowerOn: true,
    Ia: 1.68,
    viewMode: 'realistic',
    animSpeed: 1.0
  });

  const [records, setRecords] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSweeping, setIsSweeping] = useState(false);

  const updateState = (partial) => {
    setState((prev) => {
      const next = { ...prev, ...partial };
      next.Ia = PhysicsModel.calculateAnodeCurrent(next.Ua, next.Uf, next.isForward, next.isPowerOn);
      return next;
    });
  };

  const handleAddReading = () => {
    if (!state.isPowerOn) {
      onShowToast("Iltimos, avval zanjirni yoqing (Power ON)!");
      return;
    }

    const Ia = PhysicsModel.calculateAnodeCurrent(state.Ua, state.Uf, state.isForward, state.isPowerOn, true);
    const region = PhysicsModel.determineWorkingRegion(state.Ua, Ia, state.Uf, state.isForward);
    const preset = PhysicsModel.HEATER_PRESETS[Number(state.Uf).toFixed(1)] || { color: '#2563eb' };

    const u32 = state.Ua > 0 ? +(Math.pow(state.Ua, 1.5)).toFixed(1) : 0;
    const lnUa = state.Ua > 0 ? +(Math.log(state.Ua)).toFixed(2) : '-';
    const lnIa = Ia > 0 ? +(Math.log(Ia)).toFixed(2) : '-';

    const newRecord = {
      id: Date.now() + Math.random(),
      Uf: +Number(state.Uf).toFixed(1),
      Ua: +Number(state.Ua).toFixed(1),
      Ia: +Number(Ia).toFixed(2),
      u32,
      lnUa,
      lnIa,
      regionId: region.id,
      regionName: region.nameUz,
      color: preset.color
    };

    setRecords((prev) => {
      const idx = prev.findIndex(r => Math.abs(r.Uf - newRecord.Uf) < 0.1 && Math.abs(r.Ua - newRecord.Ua) < 0.5);
      let updated;
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = newRecord;
      } else {
        updated = [...prev, newRecord];
      }
      return updated.sort((a, b) => a.Uf === b.Uf ? a.Ua - b.Ua : a.Uf - b.Uf);
    });

    onShowToast(`O'lchov qo'shildi: U_A = ${newRecord.Ua}V, I_A = ${newRecord.Ia}mA`);
  };

  const handleAutoSweep = () => {
    setIsSweeping(true);
    const voltages = [0, 5, 10, 15, 20, 30, 45, 60, 80, 100, 130, 160, 200, 240];
    let i = 0;

    const interval = setInterval(() => {
      if (i >= voltages.length) {
        clearInterval(interval);
        setIsSweeping(false);
        onShowToast(`U_f = ${state.Uf}V uchun barcha nuqtalar olindi!`);
        return;
      }
      const ua = voltages[i];
      updateState({ Ua: ua });

      const Ia = PhysicsModel.calculateAnodeCurrent(ua, state.Uf, true, true, true);
      const region = PhysicsModel.determineWorkingRegion(ua, Ia, state.Uf, true);
      const preset = PhysicsModel.HEATER_PRESETS[Number(state.Uf).toFixed(1)] || { color: '#2563eb' };

      const u32 = ua > 0 ? +(Math.pow(ua, 1.5)).toFixed(1) : 0;
      const lnUa = ua > 0 ? +(Math.log(ua)).toFixed(2) : '-';
      const lnIa = Ia > 0 ? +(Math.log(Ia)).toFixed(2) : '-';

      const rec = {
        id: Date.now() + Math.random(),
        Uf: +Number(state.Uf).toFixed(1),
        Ua: +Number(ua).toFixed(1),
        Ia: +Number(Ia).toFixed(2),
        u32,
        lnUa,
        lnIa,
        regionId: region.id,
        regionName: region.nameUz,
        color: preset.color
      };

      setRecords((prev) => {
        const filtered = prev.filter(r => !(Math.abs(r.Uf - rec.Uf) < 0.1 && Math.abs(r.Ua - rec.Ua) < 0.5));
        return [...filtered, rec].sort((a, b) => a.Uf === b.Uf ? a.Ua - b.Ua : a.Uf - b.Uf);
      });

      i++;
    }, 75);
  };

  const handleAutoSweepAll = () => {
    setIsSweeping(true);
    const presets = [4.0, 5.0, 6.3];
    const voltages = [0, 5, 10, 15, 20, 30, 45, 60, 80, 100, 130, 160, 200, 240];
    let pIdx = 0;
    let vIdx = 0;

    const interval = setInterval(() => {
      if (pIdx >= presets.length) {
        clearInterval(interval);
        setIsSweeping(false);
        onShowToast("Barcha 3 ta katod qizdirish kuchlanishi uchun VAX olindi!");
        return;
      }

      const uf = presets[pIdx];
      const ua = voltages[vIdx];
      updateState({ Uf: uf, Ua: ua });

      const Ia = PhysicsModel.calculateAnodeCurrent(ua, uf, true, true, true);
      const region = PhysicsModel.determineWorkingRegion(ua, Ia, uf, true);
      const preset = PhysicsModel.HEATER_PRESETS[Number(uf).toFixed(1)] || { color: '#2563eb' };

      const u32 = ua > 0 ? +(Math.pow(ua, 1.5)).toFixed(1) : 0;
      const lnUa = ua > 0 ? +(Math.log(ua)).toFixed(2) : '-';
      const lnIa = Ia > 0 ? +(Math.log(Ia)).toFixed(2) : '-';

      const rec = {
        id: Date.now() + Math.random(),
        Uf: +Number(uf).toFixed(1),
        Ua: +Number(ua).toFixed(1),
        Ia: +Number(Ia).toFixed(2),
        u32,
        lnUa,
        lnIa,
        regionId: region.id,
        regionName: region.nameUz,
        color: preset.color
      };

      setRecords((prev) => {
        const filtered = prev.filter(r => !(Math.abs(r.Uf - rec.Uf) < 0.1 && Math.abs(r.Ua - rec.Ua) < 0.5));
        return [...filtered, rec].sort((a, b) => a.Uf === b.Uf ? a.Ua - b.Ua : a.Uf - b.Uf);
      });

      vIdx++;
      if (vIdx >= voltages.length) {
        vIdx = 0;
        pIdx++;
      }
    }, 40);
  };

  const handleResetSim = () => {
    if (window.confirm("Simulyator parametrlarini boshlang'ich holatga qaytarishni xohlaysizmi?")) {
      updateState({
        Uf: 6.3,
        Ua: 40.0,
        isForward: true,
        isPowerOn: true,
        viewMode: 'realistic'
      });
      onShowToast("Simulyator boshlang'ich holatga qaytarildi");
    }
  };

  const handleExportCSV = () => {
    if (records.length === 0) {
      alert("Eksport qilish uchun jadvalda o'lchov ma'lumotlari mavjud emas!");
      return;
    }
    let csv = "T/r,U_f (V),U_A (V),I_A (mA),U_A^(3/2),ln(U_A),ln(I_A),Ish sohasi\n";
    records.forEach((r, idx) => {
      csv += `${idx + 1},${r.Uf},${r.Ua},${r.Ia},${r.u32},${r.lnUa},${r.lnIa},"${r.regionName}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vakuumli_diod_VAX_olchovlar_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reg = PhysicsModel.calculateLinearRegression(records);

  return (
    <div>
      <div className="simulator-layout">
        {/* Chap: Canvas Lab */}
        <div className="lab-canvas-card">
          <div className="canvas-toolbar">
            <div className="view-mode-toggles">
              <button
                className={`view-toggle-btn ${state.viewMode === 'realistic' ? 'active' : ''}`}
                onClick={() => updateState({ viewMode: 'realistic' })}
              >
                🔬 Uskunalar ko'rinishi
              </button>
              <button
                className={`view-toggle-btn ${state.viewMode === 'schematic' ? 'active' : ''}`}
                onClick={() => updateState({ viewMode: 'schematic' })}
              >
                ⚡ Elektr sxemasi
              </button>
            </div>

            <div className="canvas-status-pills">
              <div className="pill-item">
                <span className={`pill-dot ${state.isPowerOn ? '' : 'off'}`} />
                <span>Zanjir holati</span>
              </div>
              <div className="pill-item" style={{ color: '#94a3b8' }}>
                <span>FPS: 60 • LD 555610</span>
              </div>
            </div>
          </div>

          <LabCanvas state={state} onUpdateState={updateState} />
        </div>

        {/* O'ng: Boshqaruv Paneli */}
        <ControlsSidebar
          state={state}
          onUpdateState={updateState}
          onAddReading={handleAddReading}
          onAutoSweep={handleAutoSweep}
          onAutoSweepAll={handleAutoSweepAll}
          onResetSim={handleResetSim}
          isSweeping={isSweeping}
        />
      </div>

      {/* Jadval */}
      <DataTable
        records={records}
        activeFilter={activeFilter}
        onSetFilter={setActiveFilter}
        onDeleteRow={(id) => setRecords(prev => prev.filter(r => r.id !== id))}
        onClearAll={() => setRecords([])}
        onExportCSV={handleExportCSV}
        onPrint={() => window.print()}
      />

      {/* Grafik */}
      <ChartCanvas records={records} />

      {/* Xulosa va Tekshirish Kartasi */}
      <div className="analysis-summary-card">
        <h4>📑 Laboratoriya Tahlili va Lengmyur-Chayld Qonunini Tekshirish</h4>
        <div className="analysis-grid">
          <div className="stat-item">
            <div className="label">Burchak Qiyaligi n:</div>
            <div className="value">{reg ? `${reg.slope} (Nazariya: 1.500)` : '—'}</div>
            <div className="desc">Nazariy qiymat: n = 1.500 (3/2 daraja qonuni)</div>
          </div>
          <div className="stat-item">
            <div className="label">Perveans Koeffitsienti K:</div>
            <div className="value">{reg ? `${reg.kDerived} mA/V^1.5` : '—'}</div>
            <div className="desc">K = (4/9)ε₀ √(2e/m) • (S/d²)</div>
          </div>
          <div className="stat-item">
            <div className="label">Determinatsiya Koeffitsienti R²:</div>
            <div className="value">{reg ? reg.rSquared : '—'}</div>
            <div className="desc">Chiziqli bog'liqlik aniqligi (1.000 ga yaqinligi)</div>
          </div>
          <div className="stat-item">
            <div className="label">Laboratoriya Xulosasi:</div>
            <div
              className="value"
              style={{
                fontSize: 14,
                fontFamily: 'var(--font-sans)',
                color: reg && Math.abs(reg.slope - 1.5) < 0.15 ? '#10b981' : '#0284c7'
              }}
            >
              {reg
                ? (Math.abs(reg.slope - 1.5) < 0.15 ? "✅ Lengmyur-Chayld qonuni muvaffaqiyatli tasdiqlandi!" : "ℹ️ Xajmiy zaryad sohasida yetarlicha nuqta kiritildi")
                : "O'lchovlar kiritilishi kutilmoqda"}
            </div>
            <div className="desc">LD FIZIKA P 3.8.1.1 standartiga muvofiqlik</div>
          </div>
        </div>
      </div>
    </div>
  );
}
