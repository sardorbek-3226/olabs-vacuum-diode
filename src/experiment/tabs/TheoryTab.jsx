import React from 'react';

export default function TheoryTab() {
  return (
    <div className="theory-document">
      {/* LD FIZIKA Rasmiy Hujjat Bosh qismi */}
      <div style={{
        borderBottom: '2px solid #0f172a',
        paddingBottom: 12,
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Elektr</h3>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#475569' }}>Vakuumli diod</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 2, color: '#0f172a', fontStyle: 'italic' }}>LD</div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 3, color: '#0f172a' }}>FIZIKA</div>
        </div>
        <div style={{
          fontSize: 20,
          fontWeight: 800,
          fontFamily: 'monospace',
          color: '#0f172a',
          border: '2px solid #0f172a',
          padding: '4px 12px',
          borderRadius: 4
        }}>
          P 3.8.1.1
        </div>
      </div>

      <div style={{ textAlign: 'right', marginBottom: 30 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', maxWidth: 540, marginLeft: 'auto', lineHeight: 1.3 }}>
          Vakuumli diodning volt-amper xarakteristikasini o'rganish.
        </h2>
      </div>

      <h3 style={{
        fontSize: 16,
        fontWeight: 800,
        color: '#0f172a',
        margin: '24px 0 12px',
        borderLeft: '4px solid #8e1236',
        paddingLeft: 10
      }}>
        Tajribalarning maqsadi:
      </h3>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        <li style={{ paddingLeft: 20, position: 'relative', fontSize: 14.5, color: '#1e293b' }}>
          <span style={{ position: 'absolute', left: 0, color: '#8e1236', fontWeight: 800 }}>—</span>
          Vakuumli diodning volt-amper xarakteristikasini katodni qizdirish kuchlanishining uch qiymatida o'lchash.
        </li>
        <li style={{ paddingLeft: 20, position: 'relative', fontSize: 14.5, color: '#1e293b' }}>
          <span style={{ position: 'absolute', left: 0, color: '#8e1236', fontWeight: 800 }}>—</span>
          Xajmiy manfiy zaryadning anod maydoniga qarshi ta'sir sohasini va VAX ining to'yinish sohasini aniqlash.
        </li>
        <li style={{ paddingLeft: 20, position: 'relative', fontSize: 14.5, color: '#8e1236' }}>
          <span style={{ position: 'absolute', left: 0, color: '#8e1236', fontWeight: 800 }}>—</span>
          Lengmyur-Chayld qonunini tekshirish.
        </li>
      </ul>

      <h3 style={{
        fontSize: 16,
        fontWeight: 800,
        color: '#0f172a',
        margin: '24px 0 12px',
        borderLeft: '4px solid #8e1236',
        paddingLeft: 10
      }}>
        Asosiy ma'lumotlar:
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.75, color: '#1e293b', textAlign: 'justify', marginBottom: 24 }}>
        Vakuumli diod ichida vakuum hosil qilingan, germetik yopiq ikki elektrodni o'z ichiga olgan shisha lampadan iborat o'zidan elektronlar chiqaradigan termoionik katod va anod. (1-rasmga qarang). Agar lampaning katodi va anodi orasiga yetarlicha kuchlanish qo'yilsa shu ikki qutb o'rtasida elektr toki vujudga keladi. Katod elektr toki yordamida qiziydigan simdan iborat bo'lib u elektr kuchlanishi ta'sirida elektronlarni ajratib chiqaradi. Qizigan katod o'zidan elektronlarni chiqaradi (termoelektron emissiya). Agar anod potensiali katod potensialiga nisbatan musbat bo'lsa elektronlar anodga tomon tezlanish oladi va anod toki hosil bo'ladi. Anod tokining qiymati, boshqa narsalardan tashqari, anod va katod o'rtasidagi kuchlanishdan (anod kuchlanish) bog'liq bo'ladi. Agar anod kuchlanishning yo'nalishi qarama-qarshiga o'zgartirilsa katoddan chiqayotgan elektronlar qarama-qarshi yo'nalgan maydonga qarshi harakatlana olmasligi uchun anod toki hosil bo'lmaydi. Shuning uchun vakuumli diod filtrlash bloki sifatida yoki o'zgaruvchan toklarning to'g'rilagichi sifatida foydalanish mumkin. Demak, umuman olganda, vakuumli diod yarim o'tkazgichli diodga o'xshash xossalarga ega. Yarimo'tkazgichli diodlar rivojlanish bilan vakuumli diodlar tobora muhimligini yo'qotib bormoqda. Bugungi kunda integral zanjirlarda kam joy egallaganliklari uchun asosan yarimo'tkazgichli qurilmalardan foydalanilmoqda. Bu tajribada vakuumli diodning VAX o'rganiladi. VAX anod toki I<sub>A</sub> ning anod kuchlanishi U<sub>A</sub> dan bog'liqligini ifodalaydi. 2-rasmda diodni VAXning tipik shakli ko'rsatilgan.
      </p>

      {/* 1-rasm */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: 20,
        margin: '28px 0',
        textAlign: 'center'
      }}>
        <img
          src="/assets/vacuum_diode_diagram.svg"
          alt="1-rasm. P diodning diagrammasi"
          style={{ maxWidth: '100%', height: 'auto', maxHeight: 440, display: 'block', margin: '0 auto', borderRadius: 8 }}
        />
        <p style={{ fontSize: 13, color: '#475569', fontWeight: 500, marginTop: 14 }}>
          <b>1-rasm.</b> P diodning diagrammasi: <b>1</b>-qizdiruvchi vilka, <b>2</b>-katod plastinkasi, <b>3</b>-katod qizdirgich simi, <b>4</b>-Anod, <b>5</b>-anodni ulash simi.
        </p>
      </div>

      {/* 2-rasm */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: 20,
        margin: '28px 0',
        textAlign: 'center'
      }}>
        <img
          src="/assets/vax_typical_curve.svg"
          alt="2-rasm. Vakuumli diod VAX ning tipik shakli"
          style={{ maxWidth: '100%', height: 'auto', maxHeight: 400, display: 'block', margin: '0 auto', borderRadius: 8 }}
        />
        <p style={{ fontSize: 13, color: '#475569', fontWeight: 500, marginTop: 14 }}>
          <b>2-rasm.</b> Vakuumli diodning volt-amper xarakteristikasi (VAX) egri chizig'ining xarakterli zonalari:
          <br />
          <b>I</b> — Xajmiy zaryad sohasi (Lengmyur-Chayld qonuni: I<sub>A</sub> ∝ U<sub>A</sub><sup>3/2</sup>), 
          <b> II</b> — O'tish sohasi, 
          <b> III</b> — To'yinish sohasi (I<sub>to'yinish</sub>), 
          <b> U<sub>A</sub> &lt; 0</b> — Teskari qulflash sohasi (I<sub>A</sub> = 0).
        </p>
      </div>

      {/* Matematik Formulalar */}
      <h3 style={{
        fontSize: 16,
        fontWeight: 800,
        color: '#0f172a',
        margin: '24px 0 12px',
        borderLeft: '4px solid #8e1236',
        paddingLeft: 10
      }}>
        Matematik Formulalar va Fizik Qonuniyatlar:
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 18,
        margin: '24px 0'
      }}>
        <div style={{ background: '#f1f5f9', borderLeft: '4px solid #8e1236', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>
            1. Lengmyur-Chayld 3/2 Qonuni
          </h4>
          <div style={{ fontFamily: 'monospace', fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '8px 0' }}>
            I<sub>A</sub> = K • U<sub>A</sub><sup>3/2</sup>
          </div>
          <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.4 }}>
            Xajmiy manfiy zaryad sohasida anod toki anod kuchlanishining 3/2 darajasiga to'g'ri mutanosib. K — elektrodlar geometriyasiga bog'liq koeffitsient (perveans).
          </p>
        </div>

        <div style={{ background: '#f1f5f9', borderLeft: '4px solid #10b981', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>
            2. Richardson-Dushman Qonuni
          </h4>
          <div style={{ fontFamily: 'monospace', fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '8px 0' }}>
            j<sub>s</sub> = A • T<sup>2</sup> • e<sup>-W / (k•T)</sup>
          </div>
          <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.4 }}>
            Katod to'yinish toki zichligi uning mutlaq harorati T va metallning elektron chiqish ishi W ga bog'liqligi. Qizdirish kuchlanishi U<sub>f</sub> oshganda to'yinish toki eksponentsial ortadi.
          </p>
        </div>

        <div style={{ background: '#f1f5f9', borderLeft: '4px solid #0284c7', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>
            3. Logarifmik Qonuniyat
          </h4>
          <div style={{ fontFamily: 'monospace', fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '8px 0' }}>
            ln(I<sub>A</sub>) = ln(K) + 1.5 • ln(U<sub>A</sub>)
          </div>
          <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.4 }}>
            ln(I<sub>A</sub>) ning ln(U<sub>A</sub>) ga bog'liqlik grafigi to'g'ri chiziq bo'lib, uning burchak koeffitsienti (tangensi) n = 1.5 ga teng bo'lishi Lengmyur-Chayld qonunini isbotlaydi.
          </p>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #e2e8f0',
        paddingTop: 16,
        marginTop: 36,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 11.5,
        color: '#64748b',
        flexWrap: 'wrap',
        gap: 10
      }}>
        <div>LD Didactic GmbH • Leyboldstrasse 1 • D-50354 Huerth / Germany</div>
        <div>Phone: (02233) 604-0 • e-mail: info@ld-didactic.de</div>
        <div>© by LD Didactic GmbH</div>
      </div>
    </div>
  );
}
