import React from 'react';
import { Download, Printer, Trash2 } from 'lucide-react';

export default function DataTable({
  records,
  activeFilter,
  onSetFilter,
  onDeleteRow,
  onClearAll,
  onExportCSV,
  onPrint
}) {
  let filtered = records;
  if (activeFilter !== 'all') {
    const target = parseFloat(activeFilter);
    filtered = records.filter(r => Math.abs(r.Uf - target) < 0.15);
  }

  return (
    <div className="table-section-card">
      <div className="table-toolbar">
        <h4>📊 O'lchov Natijalari Jadvali ({records.length} ta o'lchov)</h4>

        <div className="table-filter-pills">
          <button
            className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onSetFilter('all')}
          >
            Barchasi
          </button>
          <button
            className={`filter-pill ${activeFilter === '4.0' ? 'active' : ''}`}
            onClick={() => onSetFilter('4.0')}
          >
            U<sub>f</sub> = 4.0 V
          </button>
          <button
            className={`filter-pill ${activeFilter === '5.0' ? 'active' : ''}`}
            onClick={() => onSetFilter('5.0')}
          >
            U<sub>f</sub> = 5.0 V
          </button>
          <button
            className={`filter-pill ${activeFilter === '6.3' ? 'active' : ''}`}
            onClick={() => onSetFilter('6.3')}
          >
            U<sub>f</sub> = 6.3 V
          </button>
        </div>

        <div className="table-export-actions">
          <button className="table-btn" onClick={onExportCSV}>
            <Download size={14} /> CSV yuklab olish
          </button>
          <button className="table-btn" onClick={onPrint}>
            <Printer size={14} /> Chop etish
          </button>
          <button className="table-btn clear" onClick={onClearAll}>
            <Trash2 size={14} /> Tozalash
          </button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="sigma-table">
          <thead>
            <tr>
              <th style={{ width: 50 }} className="text-center">№</th>
              <th style={{ width: 110 }} className="text-center">U<sub>f</sub> (V)</th>
              <th style={{ width: 130 }} style={{ textAlign: 'right' }}>U<sub>A</sub> (V)</th>
              <th style={{ width: 130 }} style={{ textAlign: 'right' }}>I<sub>A</sub> (mA)</th>
              <th style={{ width: 130 }} style={{ textAlign: 'right' }}>U<sub>A</sub><sup>3/2</sup></th>
              <th style={{ width: 120 }} style={{ textAlign: 'right' }}>ln(U<sub>A</sub>)</th>
              <th style={{ width: 120 }} style={{ textAlign: 'right' }}>ln(I<sub>A</sub>)</th>
              <th>Ish Sohasi</th>
              <th style={{ width: 60 }} className="text-center">Amal</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b' }}>
                  Hozircha o'lchov ma'lumotlari mavjud emas. Boshqaruv panelidagi <b>"➕ Jadvalga qo'shish"</b> yoki <b>"⚡ Avtomatik o'lchash"</b> tugmasini bosing.
                </td>
              </tr>
            ) : (
              filtered.map((r, i) => (
                <tr key={r.id}>
                  <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{i + 1}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      backgroundColor: r.color,
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 700
                    }}>
                      {r.Uf.toFixed(1)} V
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>
                    {r.Ua.toFixed(1)}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>
                    {r.Ia.toFixed(2)}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', color: '#64748b' }}>
                    {r.u32}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                    {r.lnUa}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                    {r.lnIa}
                  </td>
                  <td>
                    <span className={`badge-region ${r.regionId}`}>
                      {r.regionName}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-del-row"
                      onClick={() => onDeleteRow(r.id)}
                      title="O'chirish"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
