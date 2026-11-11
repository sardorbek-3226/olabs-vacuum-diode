import React from 'react';
import { AlertTriangle, CheckCircle2, Cpu } from 'lucide-react';

export default function ProcedureTab() {
  const steps = [
    {
      title: "1-qadam: Zanjirni yig'ish",
      desc: "Vakuumli diodning katod qizdiruvchi vilkasini (1-raqam) qizdirish manbaiga ulang. Katod (2) va anod (4) orasiga anod manbai hamda ketma-ket milliampermetrni ulang. Anodga nisbatan voltmetrni parallel ulang."
    },
    {
      title: "2-qadam: Katodni 4.0 V da qizdirish",
      desc: "Qizdirish kuchlanishini U_f = 4.0 V ga o'rnating. Katod yetarlicha qizib, termoelektron emissiya barqarorlashishi uchun 10-15 soniya kuting."
    },
    {
      title: "3-qadam: 4.0 V da VAX o'lchovlarini olish",
      desc: "Anod kuchlanishi U_A ni 0 V dan 240 V gacha (0, 5, 10, 20, 30, 45, 60, 80, 100, 150, 200, 240 V) asta-sekin oshirib, har bir kuchlanishdagi anod toki I_A qiymatlarini '➕ Jadvalga qo'shish' tugmasi bilan qayd qiling."
    },
    {
      title: "4-qadam: To'yinish tokini aniqlash",
      desc: "Kuchlanish ortsa ham anod toki deyarli o'zgarmay qoladigan to'yinish sohasini qayd eting (U_f = 4.0 V da I_to'yinish ≈ 2.50 mA)."
    },
    {
      title: "5-qadam: Katodni 5.0 V va 6.3 V da takrorlash",
      desc: "Qizdirish kuchlanishini U_f = 5.0 V ga, so'ngra nominal U_f = 6.3 V ga o'rnatib, yuqoridagi o'lchovlarni takrorlang va o'lchovlar jadvalini to'ldiring."
    },
    {
      title: "6-qadam: Teskari qutblanishni tekshirish",
      desc: "Qutblanish kommutatorini 'Teskari ulash' holatiga o'tkazing va anodga manfiy potensial berilganda tok oqmasligini (diodning bir tomonlama o'tkazuvchanligini) tekshiring."
    },
    {
      title: "7-qadam: Grafik tahlili va xulosa",
      desc: "'Grafik tahlili' bo'limida 'ln(I) vs ln(U)' rejimiga o'ting. To'g'ri chiziqning burchak qiyaligi n ≈ 1.50 (3/2) ga yaqinligini tekshiring hamda xulosa chiqaring."
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
        Tajribani Bajarish Tartibi (Bosqichma-bosqich qo'llanma):
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: 16,
        marginBottom: 28
      }}>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0369a1', fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>
            <Cpu size={18} /> Kerakli Asbob-uskunalar:
          </div>
          <ul style={{ listStyle: 'none', fontSize: 13, color: '#334155', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>• LD Didactic 555 610 Vakuumli diod lampasi</li>
            <li>• Katodni qizdirish manbai (0–10 V AC/DC)</li>
            <li>• Yuqori kuchlanishli tartiblangan DC manba (0–300 V)</li>
            <li>• Raqamli voltmetr va milliampermetr</li>
            <li>• Bog'lovchi qisqichli laboratoriya simlari</li>
          </ul>
        </div>

        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#b91c1c', fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>
            <AlertTriangle size={18} /> Xavfsizlik Qoidalari:
          </div>
          <ul style={{ listStyle: 'none', fontSize: 13, color: '#7f1d1d', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>⚠️ Anod kuchlanishi 250 V gacha yetadi, ehtiyot bo'ling!</li>
            <li>• Sxemani o'zgartirishdan oldin quvvatni o'chiring.</li>
            <li>• Qizigan shisha kolbaga tegmang.</li>
            <li>• Katod kuchlanishini 7.0 V dan oshirmang.</li>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {steps.map((st, idx) => (
          <div key={idx} style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: '14px 18px',
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: '#e0f2fe',
              color: '#0369a1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 13,
              flexShrink: 0,
              marginTop: 2
            }}>
              {idx + 1}
            </div>
            <div>
              <h4 style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                {st.title}
              </h4>
              <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.5, margin: 0 }}>
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
