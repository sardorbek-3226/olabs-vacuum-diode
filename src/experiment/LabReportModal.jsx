import React, { useState } from 'react';
import { Printer, X } from 'lucide-react';

export default function LabReportModal({ isOpen, onClose, state }) {
  const [studentName, setStudentName] = useState('Talaba Familiyasi Ismi');
  const [studentGroup, setStudentGroup] = useState('Fizika-301');
  const dateStr = new Date().toLocaleDateString('uz-UZ');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <h3>📑 Laboratoriya Ishi Rasmiy Hisobot Varaqasi</h3>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="report-sheet" style={{ border: '2px solid #0f172a', padding: 24, borderRadius: 8, background: '#ffffff' }}>
          <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: 14, marginBottom: 18 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
              OLIY VA O'RTA TA'LIM VAZIRLIGI • FIZIKA KAFEDRASI
            </h2>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0369a1', marginTop: 4 }}>
              LD Didactic P 3.8.1.1 — "Vakuumli diodning volt-amper xarakteristikasini o'rganish"
            </div>
          </div>

          <div className="report-details" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Talaba F.I.Sh:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={{ width: '100%', padding: '6px 10px', fontWeight: 700, border: '1px solid #cbd5e1', borderRadius: 4 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Guruh va Sana:</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={studentGroup}
                  onChange={(e) => setStudentGroup(e.target.value)}
                  style={{ width: '50%', padding: '6px 10px', fontWeight: 700, border: '1px solid #cbd5e1', borderRadius: 4 }}
                />
                <input
                  type="text"
                  readOnly
                  value={dateStr}
                  style={{ width: '50%', padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: 4, background: '#f8fafc' }}
                />
              </div>
            </div>
          </div>

          <div style={{ fontSize: 13, lineHeight: 1.6, color: '#1e293b', marginBottom: 18 }}>
            <b>Tajriba maqsadi:</b> Vakuumli diodning VAX ini katodni qizdirishning uch qiymatida (4.0V, 5.0V, 6.3V) o'lchash, xajmiy manfiy zaryadning anod maydoniga ta'sir sohasini va to'yinish sohasini aniqlash hamda Lengmyur-Chayld qonunini tekshirish.
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: 12, background: '#f8fafc', marginBottom: 20, fontSize: 12.5 }}>
            <div><b>Asosiy xulosalar:</b></div>
            <div>• Xajmiy zaryad sohasida: I_A ∝ U_A^(3/2) (Lengmyur-Chayld qonuni qanoatlantirildi).</div>
            <div>• To'yinish sohasida: I_to'yinish katod harorati T ga Richardson-Dushman qonuniga muvofiq bog'liq.</div>
            <div>• Teskari qutblanishda: tok nolga teng (vakuumli diod to'g'rilagichlik xossasiga ega).</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 20, borderTop: '1px dashed #cbd5e1', fontSize: 12.5 }}>
            <div>Talaba imzosi: _____________________</div>
            <div>O'qituvchi tekshirdi: _____________________</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
          <button className="btn-tertiary-action" onClick={onClose}>Yopish</button>
          <button className="btn-primary-action" onClick={() => window.print()}>
            <Printer size={15} /> Chop etish (Print)
          </button>
        </div>
      </div>
    </div>
  );
}
