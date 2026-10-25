import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Headphones } from 'lucide-react';

export default function ContactPage({ onShowToast }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onShowToast("Xabaringiz yuborildi! Tez orada mutaxassislarimiz javob berishadi.");
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="static-page-wrapper">
      <div className="static-page-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <Headphones size={28} color="#8e1236" />
          <h2 style={{ margin: 0 }}>Biz bilan Bog'lanish va Texnik Qo'llab-quvvatlash</h2>
        </div>
        <p className="subtitle">
          Platforma bo'yicha savollaringiz, takliflaringiz yoki hamkorlik masalalari bo'yicha murojaat qiling.
        </p>

        <div className="contact-grid">
          {/* Chap: Aloqa ma'lumotlari */}
          <div className="contact-info-block">
            <div className="contact-info-item">
              <div className="contact-icon-box"><MapPin size={20} /></div>
              <div>
                <h4 style={{ fontSize: 14.5, fontWeight: 700, margin: '0 0 2px' }}>Manzil:</h4>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                  Toshkent shahri, Universitet ko'chasi 4-uy, Fizika fakulteti binosi
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-box"><Phone size={20} /></div>
              <div>
                <h4 style={{ fontSize: 14.5, fontWeight: 700, margin: '0 0 2px' }}>Telefon:</h4>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                  +998 (71) 200-45-45 / +998 (71) 246-00-11
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-box"><Mail size={20} /></div>
              <div>
                <h4 style={{ fontSize: 14.5, fontWeight: 700, margin: '0 0 2px' }}>Elektron Pochta:</h4>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                  info@olabs.edu.uz / support@ld-physics.uz
                </p>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 10 }}>
              <h5 style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                Ish Tartibi:
              </h5>
              <p style={{ fontSize: 12.5, color: '#64748b', margin: 0 }}>
                Dushanba – Shanba: 09:00 dan 18:00 gacha<br />
                Onlayn laboratoriya simulyatorlari: 24/7 uzluksiz ishlaydi.
              </p>
            </div>
          </div>

          {/* O'ng: Murojaat shakli */}
          <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Ism-familiyangiz:</label>
                <input
                  type="text"
                  required
                  placeholder="Jasurbek Ahmedov"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Elektron pochta:</label>
                <input
                  type="email"
                  required
                  placeholder="jasur@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Mavzu:</label>
                <input
                  type="text"
                  required
                  placeholder="Laboratoriya ishi bo'yicha savol"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Xabaringiz:</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Murojaatingizni batafsil yozing..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn-primary-action">
                <Send size={15} /> Xabarni yuborish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
