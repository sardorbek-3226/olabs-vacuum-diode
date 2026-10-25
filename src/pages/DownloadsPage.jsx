import React from 'react';
import { Download, FileDown, FolderArchive, Layers } from 'lucide-react';

export default function DownloadsPage({ onShowToast }) {
  const materials = [
    {
      title: "LD Didactic P 3.8.1.1 Qo'llanmasi (PDF)",
      desc: "Vakuumli diodning volt-amper xarakteristikasini o'rganish bo'yicha to'liq laboratoriya yo'riqnomasi, texnik xarakteristikalar va formulalar.",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      title: "O'lchovlar va Xatoliklarni Hisoblash Excel Shablon",
      desc: "Anod toki va kuchlanish ma'lumotlarini kiritib, avtomatik ln(I) vs ln(U) chiziqli regressiya burchak koeffitsientini hisoblovchi Excel formula fayli.",
      size: "185 KB",
      format: "XLSX"
    },
    {
      title: "Fizika O'qituvchilari uchun Metodik Dars Ishlanmasi",
      desc: "Elektr va magnetizm bo'limi bo'yicha 2 soatlik amaliy mashg'ulot ssenariysi va dars rejasi.",
      size: "1.1 MB",
      format: "DOCX"
    },
    {
      title: "OLabs Oflayn Simulyator Dasturi (Portable)",
      desc: "Internet ulanishisiz sinfxonada yoki kompyuter xonasida mustaqil ishlaydigan HTML5 simulyatorlar to'plami.",
      size: "14.8 MB",
      format: "ZIP"
    }
  ];

  const handleDownload = (title) => {
    onShowToast(`Yuklab olish boshlandi: ${title}`);
  };

  return (
    <div className="static-page-wrapper">
      <div className="static-page-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <FolderArchive size={28} color="#8e1236" />
          <h2 style={{ margin: 0 }}>Qo'llanmalar va Resurslarni Yuklab Olish</h2>
        </div>
        <p className="subtitle">
          Talabalar va o'qituvchilar uchun rasmiy laboratoriya varaqalari, hisoblash shablonlari va oflayn paketlar.
        </p>

        <div className="download-cards-grid">
          {materials.map((m, idx) => (
            <div key={idx} className="download-card">
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0369a1', background: '#e0f2fe', padding: '2px 8px', borderRadius: 4 }}>
                  {m.format} • {m.size}
                </span>
                <h4 style={{ marginTop: 8 }}>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
              <button className="btn-download-file" onClick={() => handleDownload(m.title)}>
                <FileDown size={15} />
                <span>Yuklab olish</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
