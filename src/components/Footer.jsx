import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="olabs-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>OLabs Fizika</h4>
            <ul>
              <li><button onClick={() => onNavigate('home')}>Bosh sahifa / Katalog</button></li>
              <li><button onClick={() => onNavigate('experiment', '1')}>Nazariy asoslar</button></li>
              <li><button onClick={() => onNavigate('experiment', '2')}>Jarayon va ko'rsatmalar</button></li>
              <li><button onClick={() => onNavigate('experiment', '4')}>Virtual Simulyator</button></li>
              <li><button onClick={() => onNavigate('experiment', '9')}>Video va animatsiya</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Tajriba Mavzulari</h4>
            <ul>
              <li><button onClick={() => onNavigate('experiment', '4')}>Vakuumli diod (LD 555610)</button></li>
              <li><button onClick={() => onNavigate('experiment', '1')}>Lengmyur-Chayld 3/2 qonuni</button></li>
              <li><button onClick={() => onNavigate('experiment', '1')}>Richardson-Dushman emissiyasi</button></li>
              <li><button onClick={() => onNavigate('experiment', '4')}>To'g'rilagichlik xossasi</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Platforma Bo'limlari</h4>
            <ul>
              <li><button onClick={() => onNavigate('news')}>Yangiliklar va xabarlar</button></li>
              <li><button onClick={() => onNavigate('workshops')}>O'qituvchilar seminarlari</button></li>
              <li><button onClick={() => onNavigate('downloads')}>Qo'llanmalar yuklab olish</button></li>
              <li><button onClick={() => onNavigate('contact')}>Texnik qo'llab-quvvatlash</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Standartlar</h4>
            <p style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6 }}>
              Mazkur virtual laboratoriya platformasi LD DIDACTIC GmbH P 3.8.1.1 tajriba dasturi hamda Oliy ta'lim fizika kursi talablariga to'liq mos keladi.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 OLabs • O'zbekiston Virtual Laboratoriyalar Portali (LD FIZIKA P 3.8.1.1)
          </div>
          <div>
            Barcha huquqlar himoyalangan • Toshkent
          </div>
        </div>
      </div>
    </footer>
  );
}
