import React, { useRef, useEffect, useState } from 'react';
import { PhysicsModel } from '../utils/physics';

export default function ChartCanvas({ records }) {
  const canvasRef = useRef(null);
  const [chartMode, setChartMode] = useState('vax'); // 'vax' | 'loglog' | 'three_halves'
  const [hoverPoint, setHoverPoint] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || 760;
    const height = rect.height || 420;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const margin = { top: 40, right: 35, bottom: 55, left: 65 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const x0 = margin.left;
    const y0 = margin.top + plotH;

    let minX = 0, maxX = 260, minY = 0, maxY = 14.5;
    if (chartMode === 'loglog') {
      minX = Math.log(3);
      maxX = Math.log(260);
      minY = Math.log(0.04);
      maxY = Math.log(15);
    } else if (chartMode === 'three_halves') {
      minX = 0;
      maxX = 4000;
      minY = 0;
      maxY = 14.5;
    }

    // Fon
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // To'r va o'qlar
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    const xTicks = 10, yTicks = 8;

    for (let i = 0; i <= xTicks; i++) {
      const gx = x0 + (i / xTicks) * plotW;
      ctx.beginPath(); ctx.moveTo(gx, y0); ctx.lineTo(gx, margin.top); ctx.stroke();
      const val = minX + (i / xTicks) * (maxX - minX);
      ctx.fillStyle = '#64748b';
      ctx.font = '500 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(chartMode === 'loglog' ? val.toFixed(1) : val.toFixed(0), gx, y0 + 18);
    }

    for (let j = 0; j <= yTicks; j++) {
      const gy = y0 - (j / yTicks) * plotH;
      ctx.beginPath(); ctx.moveTo(x0, gy); ctx.lineTo(x0 + plotW, gy); ctx.stroke();
      const val = minY + (j / yTicks) * (maxY - minY);
      ctx.fillStyle = '#64748b';
      ctx.font = '500 11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(val.toFixed(1), x0 - 8, gy + 4);
    }

    // Asosiy o'qlar
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(x0, margin.top);
    ctx.lineTo(x0, y0);
    ctx.lineTo(x0 + plotW, y0);
    ctx.stroke();

    // Sarlavhalar
    ctx.fillStyle = '#0f172a';
    ctx.font = '600 12px Inter, sans-serif';
    ctx.textAlign = 'center';

    let xLabel = 'Anod kuchlanishi U_A (V)';
    let yLabel = 'Anod toki I_A (mA)';
    if (chartMode === 'loglog') {
      xLabel = 'ln(U_A)';
      yLabel = 'ln(I_A)';
    } else if (chartMode === 'three_halves') {
      xLabel = 'U_A^(3/2) = √(U_A^3) [V^1.5]';
    }
    ctx.fillText(xLabel, x0 + plotW / 2, y0 + 42);

    ctx.save();
    ctx.translate(16, margin.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();

    // Nazariy egri chiziqlar
    if (chartMode === 'vax') {
      const presets = [
        { Uf: 4.0, color: '#10b981' },
        { Uf: 5.0, color: '#2563eb' },
        { Uf: 6.3, color: '#dc2626' }
      ];
      presets.forEach(({ Uf, color }) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        let first = true;
        for (let ua = 0; ua <= maxX; ua += 2) {
          const ia = PhysicsModel.calculateAnodeCurrent(ua, Uf, true, true, false);
          const sx = x0 + (ua / maxX) * plotW;
          const sy = y0 - (ia / maxY) * plotH;
          if (first) { ctx.moveTo(sx, sy); first = false; }
          else { ctx.lineTo(sx, sy); }
        }
        ctx.stroke();
      });

      // Xajmiy zaryad chegarasi
      const bx = x0 + (35 / maxX) * plotW;
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(bx, margin.top); ctx.lineTo(bx, y0); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#64748b';
      ctx.font = '500 10px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('← Xajmiy zaryad sohasi', bx + 6, margin.top + 16);
      ctx.fillText('To\'yinish sohasi →', bx + 6, margin.top + 30);
    } else if (chartMode === 'loglog') {
      const K = PhysicsModel.K_PERVEANCE;
      const lnK = Math.log(K);
      const slope = 1.50;

      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const xStart = Math.log(4);
      const xEnd = Math.log(50);
      const yStart = lnK + slope * xStart;
      const yEnd = lnK + slope * xEnd;

      const sx1 = x0 + ((xStart - minX) / (maxX - minX)) * plotW;
      const sy1 = y0 - ((yStart - minY) / (maxY - minY)) * plotH;
      const sx2 = x0 + ((xEnd - minX) / (maxX - minX)) * plotW;
      const sy2 = y0 - ((yEnd - minY) / (maxY - minY)) * plotH;

      ctx.moveTo(sx1, sy1);
      ctx.lineTo(sx2, sy2);
      ctx.stroke();

      ctx.fillStyle = '#1d4ed8';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Nazariy qiyalik: tg(α) = 3/2 = 1.500`, sx2 + 8, sy2);
    } else {
      const K = PhysicsModel.K_PERVEANCE;
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const maxU32 = 1600;
      const maxIa = K * maxU32;
      const sx1 = x0;
      const sy1 = y0;
      const sx2 = x0 + (maxU32 / maxX) * plotW;
      const sy2 = y0 - (maxIa / maxY) * plotH;
      ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
      ctx.fillStyle = '#059669';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.fillText(`To'g'ri chiziq: I_A = K • U_A^(3/2) (K = ${K})`, sx2 + 8, sy2);
    }

    // O'lchangan nuqtalar
    for (const pt of records) {
      let sx, sy;
      if (chartMode === 'vax') {
        sx = x0 + (pt.Ua / maxX) * plotW;
        sy = y0 - (pt.Ia / maxY) * plotH;
      } else if (chartMode === 'loglog') {
        if (pt.Ua <= 0 || pt.Ia <= 0) continue;
        const lx = Math.log(pt.Ua);
        const ly = Math.log(pt.Ia);
        sx = x0 + ((lx - minX) / (maxX - minX)) * plotW;
        sy = y0 - ((ly - minY) / (maxY - minY)) * plotH;
      } else {
        const u32 = Math.pow(Math.max(0, pt.Ua), 1.5);
        sx = x0 + (u32 / maxX) * plotW;
        sy = y0 - (pt.Ia / maxY) * plotH;
      }

      ctx.fillStyle = pt.color || '#2563eb';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sx, sy, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Legend
    const items = [
      { color: '#10b981', label: 'U_f = 4.0 V' },
      { color: '#2563eb', label: 'U_f = 5.0 V' },
      { color: '#dc2626', label: 'U_f = 6.3 V' }
    ];
    items.forEach((item, idx) => {
      const x = x0 + 15 + idx * 115;
      const ly = margin.top + 15;
      ctx.fillStyle = item.color;
      ctx.beginPath(); ctx.arc(x, ly, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#334155';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(item.label, x + 10, ly + 4);
    });

  }, [records, chartMode]);

  return (
    <div className="chart-section-card">
      <div className="chart-toolbar">
        <h4>📈 Volt-Amper Xarakteristikasi va Regressiya Grafigi</h4>

        <div className="chart-mode-pills">
          <button
            className={`chart-mode-btn ${chartMode === 'vax' ? 'active' : ''}`}
            onClick={() => setChartMode('vax')}
          >
            VAX: I<sub>A</sub> = f(U<sub>A</sub>)
          </button>
          <button
            className={`chart-mode-btn ${chartMode === 'loglog' ? 'active' : ''}`}
            onClick={() => setChartMode('loglog')}
          >
            Lengmyur-Chayld: ln(I) vs ln(U)
          </button>
          <button
            className={`chart-mode-btn ${chartMode === 'three_halves' ? 'active' : ''}`}
            onClick={() => setChartMode('three_halves')}
          >
            I<sub>A</sub> vs U<sub>A</sub><sup>3/2</sup> to'g'ri chizig'i
          </button>
        </div>
      </div>

      <div className="chart-canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
