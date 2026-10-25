import React, { useState } from 'react';
import { Send, Star } from 'lucide-react';

export default function FeedbackTab({ onShowToast }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onShowToast("Rahmat! Sizning fikr-mulohazangiz qabul qilindi.");
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <div className="theory-document" style={{ maxWidth: 640 }}>
      <h3 style={{
        fontSize: 18,
        fontWeight: 800,
        color: '#0f172a',
        marginBottom: 8,
        borderLeft: '4px solid #8e1236',
        paddingLeft: 10
      }}>
        Fikr-mulohaza Qoldirish
      </h3>
      <p style={{ fontSize: 13.5, color: '#64748b', marginBottom: 24 }}>
        Vakuumli diod virtual laboratoriyasi bo'yicha o'z fikr, taklif va mulohazalaringizni yozib qoldiring.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Ism-familiyangiz:
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masalan: Sardor Rustamov"
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 13.5, outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Elektron pochta (ixtiyoriy):
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@edu.uz"
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 13.5, outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Laboratoriyani baholang:
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Star
                  size={26}
                  fill={star <= rating ? '#f59e0b' : 'none'}
                  color={star <= rating ? '#f59e0b' : '#cbd5e1'}
                />
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Fikr va takliflaringiz:
          </label>
          <textarea
            rows="4"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Simulyatsiya qulayligi, o'lchovlar va grafiklar haqida fikringiz..."
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 13.5, outline: 'none', fontFamily: 'inherit' }}
          />
        </div>

        <button type="submit" className="btn-primary-action" style={{ width: '100%' }}>
          <Send size={15} /> Fikrni yuborish
        </button>
      </form>
    </div>
  );
}
