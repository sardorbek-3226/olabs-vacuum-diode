import React, { useState } from 'react';
import { Calendar, CheckCircle, GraduationCap } from 'lucide-react';

export default function WorkshopsPage({ onShowToast }) {
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState({ name: '', role: 'teacher', email: '', workshop: 'vakuum' });

  const workshops = [
    {
      id: 'vakuum',
      title: "Vakuumli diod va Lengmyur-Chayld qonunini virtual o'qitish metodikasi",
      date: "28-Oktyabr, 2026 • 15:00",
      speaker: "Prof. N.Q. Rahimov",
      seats: "24 ta joy qoldi"
    },
    {
      id: 'wheatstone',
      title: "Vitston ko'prigi va metrli ko'prikda xatoliklarni kamaytirish usullari",
      date: "04-Noyabr, 2026 • 16:00",
      speaker: "Dots. S.H. To'xtayev",
      seats: "18 ta joy qoldi"
    },
    {
      id: 'photo',
      title: "Kvant optikasi: Fotoeffekt qonunlarini raqamli laboratoriyalarda o'rganish",
      date: "12-Noyabr, 2026 • 14:30",
      speaker: "PhD. M.B. Aliyev",
      seats: "30 ta joy qoldi"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistered(true);
    onShowToast("Tabriklaymiz! Siz seminar ishtirokchisi sifatida ro'yxatdan o'tdingiz.");
  };

  return (
    <div className="static-page-wrapper">
      <div className="static-page-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <GraduationCap size={28} color="#8e1236" />
          <h2 style={{ margin: 0 }}>Seminarlar va O'qituvchilar Treningi</h2>
        </div>
        <p className="subtitle">
          Fizika fani o'qituvchilari va talabalar uchun virtual laboratoriya texnologiyalaridan unumli foydalanish bo'yicha amaliy mashg'ulotlar.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18, marginBottom: 36 }}>
          {workshops.map((w) => (
            <div key={w.id} style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: 10,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0369a1', background: '#e0f2fe', padding: '3px 8px', borderRadius: 4 }}>
                  {w.date}
                </span>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '10px 0 6px' }}>
                  {w.title}
                </h4>
                <div style={{ fontSize: 12.5, color: '#64748b' }}>Ma'ruzachi: {w.speaker}</div>
              </div>
              <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#059669', fontWeight: 600 }}>
                <span>🟢 {w.seats}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ro'yxatdan o'tish formasi */}
        <div style={{ background: '#f1f5f9', borderRadius: 10, padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 14 }}>
            Seminarga Ro'yxatdan O'tish:
          </h3>

          {registered ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: 18, borderRadius: 8, color: '#065f46', display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle size={22} color="#10b981" />
              <span>Siz muvaffaqiyatli ro'yxatdan o'tdingiz. Havola va materiallar pochtangizga yuborildi.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Ismingiz:</label>
                <input
                  type="text"
                  required
                  placeholder="Azizbek Saidov"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Elektron pochta:</label>
                <input
                  type="email"
                  required
                  placeholder="azizbek@tuit.uz"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Seminarni tanlang:</label>
                <select
                  value={form.workshop}
                  onChange={(e) => setForm({ ...form, workshop: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                >
                  <option value="vakuum">Vakuumli diod va Lengmyur-Chayld qonuni (28-Oktyabr)</option>
                  <option value="wheatstone">Vitston ko'prigi va metrli ko'prik metodikasi (04-Noyabr)</option>
                  <option value="photo">Kvant optikasi: Fotoeffekt qonunlari (12-Noyabr)</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" className="btn-primary-action">
                  Ro'yxatdan o'tishni tasdiqlash
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
