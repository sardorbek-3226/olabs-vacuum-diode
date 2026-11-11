import React, { useRef, useEffect, useState } from 'react';

export default function AnimationTab() {
  const canvasRef = useRef(null);
  const [heat, setHeat] = useState(0.7);
  const [field, setField] = useState(0.5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = canvas.parentElement.clientWidth || 800;
    let height = canvas.height = 360;

    const atoms = [];
    const electrons = [];
    const rows = 4, cols = 14;
    const spacingX = width / (cols + 1);
    const startY = height * 0.65;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        atoms.push({
          baseX: (c + 1) * spacingX + ((r % 2) * spacingX * 0.5),
          baseY: startY + r * 30
        });
      }
    }

    for (let i = 0; i < 90; i++) {
      electrons.push({
        x: 30 + Math.random() * (width - 60),
        y: startY - 10 + Math.random() * (rows * 30 + 10),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        escaped: false
      });
    }

    let animId;

    const loop = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      const surfaceY = startY - 15;
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.fillRect(0, surfaceY, width, height - surfaceY);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(0, surfaceY);
      ctx.lineTo(width, surfaceY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = '600 12px Inter, sans-serif';
      ctx.fillText('Katod metall yuzasi (Potensial to\'siq: Chiqish ishi W = 4.54 eV)', 20, surfaceY + 20);

      // Anod maydoni
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.fillRect(0, 0, width, 40);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, width, 40);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`ANOD MUSBAT ELEKTR MAYDONI (E = ${(field * 100).toFixed(0)} V/cm)  [ + + + + + + + + + + + ]`, width / 2, 25);

      // Atomlar
      ctx.fillStyle = '#64748b';
      for (const a of atoms) {
        const shake = (Math.random() - 0.5) * 4 * heat;
        ctx.beginPath();
        ctx.arc(a.baseX + shake, a.baseY + shake, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // Elektronlar
      for (const e of electrons) {
        if (!e.escaped) {
          e.vx += (Math.random() - 0.5) * heat * 3.5;
          e.vy += (Math.random() - 0.5) * heat * 3.5;
          e.vx *= 0.88;
          e.vy *= 0.88;
          e.x += e.vx;
          e.y += e.vy;

          if (e.x < 10) e.x = width - 20;
          if (e.x > width - 10) e.x = 20;
          if (e.y > height - 10) e.y = height - 20;

          if (e.y < surfaceY) {
            const kinetic = 0.5 * (e.vx * e.vx + e.vy * e.vy);
            if (kinetic > 4.5 / (heat * 1.5)) {
              e.escaped = true;
            } else {
              e.y = surfaceY + 2;
              e.vy = Math.abs(e.vy);
            }
          }
        } else {
          e.vy -= field * 1.2;
          e.x += e.vx;
          e.y += e.vy;

          if (e.y <= 40) {
            e.escaped = false;
            e.y = startY + Math.random() * (rows * 30);
            e.x = 30 + Math.random() * (width - 60);
            e.vy = 0;
          }
        }

        ctx.fillStyle = e.escaped ? '#60a5fa' : '#fbbf24';
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.escaped ? 3 : 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [heat, field]);

  return (
    <div className="theory-document">
      <h3 style={{
        fontSize: 18,
        fontWeight: 800,
        color: '#0f172a',
        marginBottom: 16,
        borderLeft: '4px solid #8e1236',
        paddingLeft: 10
      }}>
        Termoelektron Emissiya va Potensial To'siq Modeli
      </h3>

      <p style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.7, marginBottom: 20 }}>
        Quyidagi interaktiv animatsiya volfram metall katodining kristall panjarasini namoyish etadi. Harorat (issiqlik energiyasi) oshirilganda atomlarning tebranishi kuchayadi va metall ichidagi erkin elektronlar Fermi-Dirak taqsimotiga binoan kinetik energiya oladi. Chiqish ishi to'sig'ini (W = 4.54 eV) yengib o'tgan elektronlar vakuumga chiqadi va anodning musbat elektr maydoni ta'sirida tezlanish oladi.
      </p>

      <div style={{ background: '#0f172a', borderRadius: 12, padding: 18, border: '1px solid #334155' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: 360, display: 'block', borderRadius: 8 }} />

        <div className="animation-controls" style={{ display: 'flex', gap: 24, marginTop: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#f8fafc', fontSize: 13 }}>
            <span>🔥 Katod harorati (T):</span>
            <input
              type="range"
              min="0.2"
              max="1.5"
              step="0.1"
              value={heat}
              onChange={(e) => setHeat(parseFloat(e.target.value))}
              style={{ width: 140 }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#f8fafc', fontSize: 13 }}>
            <span>⚡ Anod elektr maydoni (E):</span>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.1"
              value={field}
              onChange={(e) => setField(parseFloat(e.target.value))}
              style={{ width: 140 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
