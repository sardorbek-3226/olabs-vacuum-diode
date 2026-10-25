import React from 'react';
import { Newspaper } from 'lucide-react';

export default function NewsPage({ onNavigate }) {
  const articles = [
    {
      date: "24-Oktyabr, 2026",
      title: "O'zbekiston OTMlarida Fizika Virtual Laboratoriyalarini joriy etish kengaytirilmoqda",
      desc: "Oliy ta'lim, fan va innovatsiyalar vazirligi tomonidan OLabs hamkorligida talabalar uchun masofaviy va gibrid ta'lim shaklida laboratoriya mashg'ulotlarini o'tkazish platformasi taqdim etildi. Jumladan, LD Didactic tajribalari to'liq raqamlashtirildi."
    },
    {
      date: "15-Oktyabr, 2026",
      title: "Respublika Yosh Fiziklar Olimpiadasida OLabs simulyatorlaridan foydalanildi",
      desc: "Akademik litsey va maktab o'quvchilari o'rtasidagi fizika musobaqasining amaliy bosqichida ishtirokchilar 'Vakuumli diod VAX' va 'Metrli ko'prik' virtual laboratoriyalari orqali hisoblashlarni amalga oshirdilar."
    },
    {
      date: "02-Oktyabr, 2026",
      title: "Lengmyur-Chayld qonunini tekshirish bo'yicha yangi 3D interaktiv mikroskopik animatsiya ishga tushirildi",
      desc: "Vakuumda xajmiy manfiy zaryadning potensial to'siq hosil qilishi hamda katoddan elektronlarning termoemissiyasi jarayoni atomar miqyosda modellashtirildi."
    }
  ];

  return (
    <div className="static-page-wrapper">
      <div className="static-page-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <Newspaper size={28} color="#8e1236" />
          <h2 style={{ margin: 0 }}>Yangiliklar va E'lonlar</h2>
        </div>
        <p className="subtitle">
          OLabs platformasi yangiliklari, ilmiy konferensiyalar va ta'lim sohasidagi so'nggi ma'lumotlar.
        </p>

        <div className="news-articles-list">
          {articles.map((art, idx) => (
            <div key={idx} className="news-article-item">
              <div className="news-date">{art.date}</div>
              <h3>{art.title}</h3>
              <p>{art.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
