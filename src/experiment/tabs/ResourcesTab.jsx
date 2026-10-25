import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

export default function ResourcesTab() {
  const references = [
    {
      title: "LD DIDACTIC GmbH — Leaflet P 3.8.1.1",
      desc: "Determining the current-voltage characteristics of a vacuum diode - Measuring the I-V characteristics at different cathode heating voltages - Verifying the Langmuir-Child law. Leyboldstrasse 1, D-50354 Huerth, Germany.",
      tag: "Rasmiy Laboratoriya Yo'riqnomasi"
    },
    {
      title: "O.A. Abduxoliqov, Sh.M. Mirzahmedov — Umumiy fizika kursi: Elektr va magnetizm",
      desc: "Oliy ta'lim muassasalari talabalari uchun darslik. Vakuumdagi elektr toki, termoemissiya va 3/2 daraja qonuni tahlili. Toshkent.",
      tag: "OTM Darsligi"
    },
    {
      title: "Irving Langmuir (1913) — The Effect of Space Charge on Thermionic Currents in High Vacuum",
      desc: "Physical Review, 2(6), 450-486. Xajmiy zaryad nazariyasi va Lengmyur tenglamasi keltirib chiqarilishi.",
      tag: "Ilmiy Maqola"
    },
    {
      title: "C.D. Child (1911) — Discharge From Hot CaO",
      desc: "Physical Review (Series I), 32(5), 492-511. Manfiy zaryadning potensial taqsimotiga ta'siri.",
      tag: "Tarixiy Manba"
    },
    {
      title: "Amrita Vishwa Vidyapeetham & C-DAC — OLabs Virtual Experiments",
      desc: "Ministry of Electronics and Information Technology (MeitY), Government of India.",
      tag: "Onlayn Platforma"
    }
  ];

  return (
    <div className="theory-document">
      <h3 style={{
        fontSize: 18,
        fontWeight: 800,
        color: '#0f172a',
        marginBottom: 20,
        borderLeft: '4px solid #8e1236',
        paddingLeft: 10
      }}>
        Foydalanilgan Adabiyotlar va Ilmiy Manbalar:
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {references.map((item, idx) => (
          <div key={idx} style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16
          }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#f1f5f9',
                color: '#8e1236',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <BookOpen size={18} />
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0369a1', background: '#e0f2fe', padding: '2px 8px', borderRadius: 4 }}>
                  {item.tag}
                </span>
                <h4 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', marginTop: 6, marginBottom: 4 }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
