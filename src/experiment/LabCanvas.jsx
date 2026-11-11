import React, { useRef, useEffect } from 'react';
import { PhysicsModel } from '../utils/physics';

export default function LabCanvas({ state, onUpdateState }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 820;
    let height = 520;

    const setupDPI = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width || 820;
      height = rect.height || 520;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupDPI();
    const resizeObserver = new ResizeObserver(setupDPI);
    resizeObserver.observe(canvas);
    window.addEventListener('resize', setupDPI);

    // Elektron zarrachalari
    const maxElectrons = 180;
    const electrons = [];
    const sparkles = [];

    const getTubeCenter = () => ({ x: width * 0.50, y: height * 0.44 });

    const createElectron = (randomProgress = false) => {
      const center = getTubeCenter();
      const cathodeRadius = 14;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 95;

      const thermalSpeed = 0.5 + Math.random() * 0.8;
      return {
        x: center.x + Math.cos(angle) * cathodeRadius,
        y: center.y + yOffset,
        vx: Math.cos(angle) * thermalSpeed,
        vy: (Math.random() - 0.5) * 0.4,
        angle,
        life: randomProgress ? Math.random() * 100 : 0,
        maxLife: 80 + Math.random() * 60,
        captured: false
      };
    };

    for (let i = 0; i < maxElectrons; i++) {
      electrons.push(createElectron(true));
    }

    let lastTime = performance.now();

    const renderLoop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const s = stateRef.current;
      const center = getTubeCenter();

      // Fizika hisoblash
      if (s.isPowerOn && s.Uf >= 1.0) {
        const emissionFactor = Math.pow(s.Uf / 6.3, 3);
        const activeCount = Math.floor(maxElectrons * Math.min(1.0, emissionFactor));

        let accel = s.isForward ? (s.Ua / 100.0) * 14.0 : -(Math.abs(s.Ua) / 100.0) * 18.0;

        for (let i = 0; i < electrons.length; i++) {
          const e = electrons[i];
          if (i >= activeCount) {
            e.captured = true;
            continue;
          }
          e.life++;

          const dx = e.x - center.x;
          const dy = e.y - center.y;
          const r = Math.sqrt(dx * dx + dy * dy);
          const nx = r > 0.001 ? dx / r : Math.cos(e.angle);

          if (s.isForward && s.Ua > 0) {
            e.vx += nx * accel * dt * 25.0;
            if (r < 28) {
              const repulsion = Math.max(0, 1.2 - (s.Ua / 80.0));
              e.vx -= nx * repulsion * dt * 10.0;
            }
          } else if (!s.isForward || s.Ua < 0) {
            e.vx += nx * accel * dt * 30.0;
          } else {
            if (r > 30) e.vx -= nx * 1.5 * dt * 20.0;
          }

          e.x += e.vx * dt * 45.0 * (s.animSpeed || 1.0);
          e.y += e.vy * dt * 45.0 * (s.animSpeed || 1.0);

          if (r >= 68) {
            if (Math.random() < 0.25) {
              sparkles.push({ x: e.x, y: e.y, life: 1.0 });
            }
            Object.assign(e, createElectron(false));
          } else if (r < 12 || e.life > e.maxLife) {
            Object.assign(e, createElectron(false));
          }
        }

        for (let i = sparkles.length - 1; i >= 0; i--) {
          sparkles[i].life -= dt * 3.5;
          if (sparkles[i].life <= 0) sparkles.splice(i, 1);
        }
      }

      // Render
      ctx.clearRect(0, 0, width, height);

      if (s.viewMode === 'schematic') {
        renderSchematic(ctx, width, height, s);
      } else {
        renderRealistic(ctx, width, height, s, center, electrons, sparkles);
      }

      animRef.current = requestAnimationFrame(renderLoop);
    };

    animRef.current = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', setupDPI);
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
}

function renderRealistic(ctx, width, height, s, center, electrons, sparkles) {
  // Fon
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#111827');
  bgGrad.addColorStop(0.65, '#1e293b');
  bgGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Nozik to'r
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 28) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += 28) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  // Stol
  const benchY = height * 0.74;
  const benchGrad = ctx.createLinearGradient(0, benchY, 0, height);
  benchGrad.addColorStop(0, '#1e293b');
  benchGrad.addColorStop(0.15, '#334155');
  benchGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = benchGrad;
  ctx.fillRect(0, benchY, width, height - benchY);

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, benchY); ctx.lineTo(width, benchY); ctx.stroke();

  // Diod ushlagich tagligi
  const standW = 190, standH = 34;
  const standX = center.x - standW / 2, standY = benchY - 14;
  const standGrad = ctx.createLinearGradient(standX, standY, standX, standY + standH);
  standGrad.addColorStop(0, '#475569');
  standGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = standGrad;
  ctx.beginPath();
  ctx.roundRect(standX, standY, standW, standH, [6, 6, 2, 2]);
  ctx.fill();
  ctx.strokeStyle = '#64748b';
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 10px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LD DIDACTIC • 555 610 • VACUUM DIODE', center.x, standY + 22);

  // Quvvat manbalari
  renderHeaterBox(ctx, 22, height * 0.42, 190, 155, s);
  renderAnodeBox(ctx, width - 217, height * 0.42, 195, 155, s);

  // Vakuumli Diod (Shisha lampa)
  renderTube(ctx, center, s);

  // Elektronlar
  if (s.isPowerOn && s.Uf >= 1.0) {
    for (const e of electrons) {
      if (e.captured) continue;
      ctx.fillStyle = 'rgba(147, 197, 253, 0.85)';
      ctx.beginPath();
      ctx.arc(e.x, e.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const sp of sparkles) {
      ctx.fillStyle = `rgba(191, 219, 254, ${sp.life})`;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, 3 * sp.life, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Kabellar
  renderCables(ctx, width, height, center, benchY);

  // Yuqori HUD paneli
  renderHUD(ctx, width, s);
}

function renderTube(ctx, center, s) {
  const bulbW = 160, bulbH = 210;
  const bulbX = center.x - bulbW / 2;
  const bulbY = center.y - bulbH / 2 - 10;

  // Filament nurlanishi
  if (s.isPowerOn && s.Uf >= 1.0) {
    const rGlow = 45 + (s.Uf / 6.3) * 65;
    const col = s.Uf < 4.5 ? '239, 68, 68' : (s.Uf < 5.8 ? '249, 115, 22' : '251, 191, 36');
    const grad = ctx.createRadialGradient(center.x, center.y - 10, 5, center.x, center.y - 10, rGlow);
    grad.addColorStop(0, `rgba(${col}, 0.8)`);
    grad.addColorStop(1, `rgba(${col}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(center.x, center.y - 10, rGlow, 0, Math.PI * 2);
    ctx.fill();
  }

  // Shisha orqa foni
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.beginPath();
  ctx.roundRect(bulbX, bulbY, bulbW, bulbH, [bulbW / 2, bulbW / 2, 20, 20]);
  ctx.fill();

  // 4: Anod (tashqi silindr)
  const aCol = (s.isForward && s.Ua > 0) ? '#38bdf8' : '#64748b';
  ctx.strokeStyle = aCol;
  ctx.lineWidth = 2.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.arc(center.x, center.y - 10, 68, -Math.PI * 0.75, Math.PI * 0.75);
  ctx.stroke();
  ctx.setLineDash([]);

  // 2: Katod (ichki silindr)
  let catCol = '#475569';
  if (s.isPowerOn && s.Uf >= 1.0) {
    catCol = s.Uf < 4.5 ? '#ef4444' : (s.Uf < 5.8 ? '#f97316' : '#fef08a');
  }
  ctx.fillStyle = catCol;
  ctx.beginPath();
  ctx.roundRect(center.x - 14, center.y - 65, 28, 110, 6);
  ctx.fill();

  // 3: Filament spirali
  if (s.isPowerOn && s.Uf >= 1.0) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let y = center.y - 50; y <= center.y + 40; y += 7) {
      const xOff = Math.sin((y - center.y) * 0.8) * 4;
      if (y === center.y - 50) ctx.moveTo(center.x + xOff, y);
      else ctx.lineTo(center.x + xOff, y);
    }
    ctx.stroke();
  }

  // Shisha devori va aksi
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(bulbX, bulbY, bulbW, bulbH, [bulbW / 2, bulbW / 2, 20, 20]);
  ctx.stroke();

  // Diagramma raqamlari (1, 2, 3, 4, 5)
  const drawBadge = (txt, x, y) => {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 11px Inter, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(txt, x, y);
  };
  drawBadge('1', center.x - 56, bulbY + bulbH + 12);
  drawBadge('2', center.x - 40, center.y + 10);
  drawBadge('3', center.x - 14, center.y + 65);
  drawBadge('4', center.x + 92, center.y - 12);
  drawBadge('5', center.x + 36, bulbY + 16);
}

function renderHeaterBox(ctx, x, y, w, h, s) {
  ctx.fillStyle = '#334155';
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 8); ctx.fill();
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 12px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('KATOD QIZDIRISH (U_f)', x + 12, y + 22);

  ctx.fillStyle = '#090d16';
  ctx.beginPath(); ctx.roundRect(x + 12, y + 44, w - 24, 46, 4); ctx.fill();

  const isLive = s.isPowerOn && s.Uf >= 1.0;
  ctx.fillStyle = isLive ? '#f59e0b' : '#374151';
  ctx.font = '700 22px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`${Number(s.Uf).toFixed(1)} V`, x + w - 24, y + 74);

  const If = PhysicsModel.calculateHeaterCurrent(s.Uf);
  ctx.font = '500 11px monospace';
  ctx.fillStyle = isLive ? '#fbbf24' : '#4b5563';
  ctx.textAlign = 'left';
  ctx.fillText(`I_f: ${If} A`, x + 22, y + 72);
}

function renderAnodeBox(ctx, x, y, w, h, s) {
  ctx.fillStyle = '#334155';
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 8); ctx.fill();
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 12px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('ANOD TA\'MINOTI (U_A)', x + 12, y + 22);

  ctx.fillStyle = '#090d16';
  ctx.beginPath(); ctx.roundRect(x + 12, y + 44, w - 24, 46, 4); ctx.fill();

  const sign = s.isForward ? '+' : '-';
  ctx.fillStyle = s.isPowerOn ? '#38bdf8' : '#374151';
  ctx.font = '700 22px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`${sign}${Number(s.Ua).toFixed(1)} V`, x + w - 24, y + 74);

  ctx.fillStyle = s.isPowerOn ? '#4ade80' : '#374151';
  ctx.font = '700 11px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`I_A: ${Number(s.Ia).toFixed(2)} mA`, x + 20, y + 72);
}

function renderCables(ctx, width, height, center, benchY) {
  ctx.save();
  ctx.lineWidth = 2.8;

  ctx.strokeStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(180, height * 0.42 + 140);
  ctx.bezierCurveTo(180, benchY + 15, center.x - 40, benchY + 15, center.x - 20, benchY - 8);
  ctx.stroke();

  ctx.strokeStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(width - 180, height * 0.42 + 140);
  ctx.bezierCurveTo(width - 180, benchY + 10, center.x + 80, benchY + 10, center.x + 36, center.y - 70);
  ctx.stroke();

  ctx.restore();
}

function renderHUD(ctx, width, s) {
  const hudW = Math.min(width - 40, 780);
  const hudX = (width - hudW) / 2;
  const hudY = 12;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.beginPath(); ctx.roundRect(hudX, hudY, hudW, 46, 8); ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)'; ctx.lineWidth = 1.5; ctx.stroke();

  const reg = PhysicsModel.determineWorkingRegion(s.Ua, s.Ia, s.Uf, s.isForward);

  ctx.fillStyle = reg.color;
  ctx.beginPath(); ctx.arc(hudX + 20, hudY + 23, 6, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 13px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(reg.nameUz, hudX + 34, hudY + 22);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 10px Inter, sans-serif';
  const T = PhysicsModel.calculateCathodeTemp(s.Uf);
  ctx.fillText(`Katod harorati T ≈ ${T} K • Qizdirish U_f = ${s.Uf}V`, hudX + 34, hudY + 36);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 14px monospace';
  ctx.fillText(`U_A = ${s.Ua.toFixed(1)} V`, hudX + hudW - 140, hudY + 22);
  ctx.fillStyle = '#4ade80';
  ctx.fillText(`I_A = ${s.Ia.toFixed(2)} mA`, hudX + hudW - 20, hudY + 22);
}

function renderSchematic(ctx, width, height, s) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;

  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 16px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ELEKTR SXEMASI — LD FIZIKA P 3.8.1.1 (VAKUUMLI DIOD)', cx, 38);

  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx, cy, 65, 0, Math.PI * 2); ctx.stroke();

  ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx - 24, cy + 20); ctx.lineTo(cx + 24, cy + 20); ctx.stroke();

  ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(cx - 34, cy - 25); ctx.lineTo(cx + 34, cy - 25); ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.font = '600 13px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`U_A = ${s.Ua.toFixed(1)} V`, cx + 60, cy - 70);
  ctx.fillText(`I_A = ${s.Ia.toFixed(2)} mA`, cx + 60, cy - 95);
  ctx.fillText(`U_f = ${s.Uf.toFixed(1)} V`, cx - 220, cy + 50);
}
