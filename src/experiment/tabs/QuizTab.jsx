import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, RotateCcw } from 'lucide-react';

export default function QuizTab({ onShowToast }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const questions = [
    {
      id: 'q1',
      title: "1. Termoelektron emissiya hodisasi nima?",
      options: [
        { key: 'a', text: "A) Metallga yorug'lik tushganda elektronlarning ajralib chiqishi" },
        { key: 'b', text: "B) Metall yuqori haroratgacha qizdirilganda undan elektronlarning uchib chiqishi" },
        { key: 'c', text: "C) Radioaktiv parchalanish natijasida elektronlarning ajralishi" }
      ],
      correct: 'b',
      explanation: "Termoelektron emissiya — metall yetarli darajada qizdirilganda, elektronlarning issiqlik harakati tufayli metalldan vakuumga uchib chiqish hodisasidir."
    },
    {
      id: 'q2',
      title: "2. Lengmyur-Chayld qonuni qanday matematik ifodaga ega?",
      options: [
        { key: 'a', text: "A) I_A = K • U_A" },
        { key: 'b', text: "B) I_A = K • U_A^2" },
        { key: 'c', text: "C) I_A = K • U_A^(3/2)" }
      ],
      correct: 'c',
      explanation: "Lengmyur-Chayld qonuni bo'yicha xajmiy zaryad sohasida anod toki anod kuchlanishining 3/2 darajasiga to'g'ri mutanosib: I_A = K • U_A^(3/2)."
    },
    {
      id: 'q3',
      title: "3. Xajmiy manfiy zaryad sohasida tok nima sababli cheklanadi?",
      options: [
        { key: 'a', text: "A) Katod atrofida to'plangan elektronlar bulutining keyingi elektronlarni qaytaruvchi maydoni sababli" },
        { key: 'b', text: "B) Anod materialining qarshiligi sababli" },
        { key: 'c', text: "C) Vakuumdagi qoldiq gazlarning ionlanishi sababli" }
      ],
      correct: 'a',
      explanation: "Katoddan chiqqan elektronlar katod atrofida manfiy xajmiy zaryad bulutini hosil qilib, keyingi chiqayotgan elektronlarga qarshi elektrostatik maydon hosil qiladi."
    },
    {
      id: 'q4',
      title: "4. Qizdirish kuchlanishi U_f (masalan, 4.0 V dan 6.3 V ga) oshirilganda nima sodir bo'ladi?",
      options: [
        { key: 'a', text: "A) Faqat xajmiy zaryad koeffitsienti K ortadi, to'yinish toki o'zgarmaydi" },
        { key: 'b', text: "B) Katod harorati ortadi va to'yinish toki I_to'yinish keskin ko'payadi" },
        { key: 'c', text: "C) Anod toki nolga tushadi" }
      ],
      correct: 'b',
      explanation: "Qizdirish kuchlanishi U_f oshishi katod harorati T ni oshiradi. Richardson-Dushman qonuniga binoan to'yinish toki keskin ko'payadi."
    },
    {
      id: 'q5',
      title: "5. Vakuumli diodga teskari kuchlanish berilganda (anod manfiy, katod musbat) tok nima uchun oqmaydi?",
      options: [
        { key: 'a', text: "A) Katod soviy boshlaydi" },
        { key: 'b', text: "B) Shisha kolba sinishi mumkinligi uchun" },
        { key: 'c', text: "C) Manfiy anod elektronlarni itaradi va ular anodga yetib bora olmaydi" }
      ],
      correct: 'c',
      explanation: "Anodga manfiy potensial berilganda, u elektronlarni qaytaradi va tok oqmaydi. Bu xususiyat diodni o'zgaruvchan tok to'g'rilagichi sifatida ishlatish imkonini beradi."
    },
    {
      id: 'q6',
      title: "6. Richardson-Dushman qonuni qaysi fizik bog'liqlikni ifodalaydi?",
      options: [
        { key: 'a', text: "A) To'yinish toki zichligining katod harorati T va chiqish ishi W ga bog'liqligini" },
        { key: 'b', text: "B) Anod toki va kuchlanish o'rtasidagi O'm qonunini" },
        { key: 'c', text: "C) Zaryad saqlanish qonunini" }
      ],
      correct: 'a',
      explanation: "Richardson-Dushman formulasi: j_s = A • T^2 • e^(-W / kT), ya'ni to'yinish toki zichligining katod harorati T va chiqish ishi W ga bog'liqligini ifodalaydi."
    }
  ];

  const handleSelect = (qId, optionKey) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionKey }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentScore = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) currentScore++;
    });

    setScore(currentScore);
    setSubmitted(true);

    if (currentScore >= 5) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    onShowToast(`Test yakunlandi: ${currentScore} / ${questions.length} to'g'ri topildi!`);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(null);
    onShowToast("Test qayta topshirish uchun tozalandi");
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3 style={{
          fontSize: 18,
          fontWeight: 800,
          color: '#0f172a',
          margin: 0,
          borderLeft: '4px solid #8e1236',
          paddingLeft: 10
        }}>
          Vakuumli Diod va Lengmyur-Chayld Qonuni Bo'yicha Test
        </h3>
        <p style={{ fontSize: 13.5, color: '#64748b', marginTop: 6 }}>
          O'z bilimingizni tekshirish uchun quyidagi 6 ta savolga javob bering va <i>"Natijani tekshirish"</i> tugmasini bosing.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {questions.map((q) => {
          const userVal = selectedAnswers[q.id];
          return (
            <div key={q.id} className="quiz-question-card">
              <div className="question-title">{q.title}</div>
              <div className="quiz-options">
                {q.options.map((opt) => {
                  let cls = "quiz-option-label";
                  if (submitted) {
                    if (opt.key === q.correct) cls += " correct";
                    else if (userVal === opt.key && userVal !== q.correct) cls += " incorrect";
                  }
                  return (
                    <label
                      key={opt.key}
                      className={cls}
                      onClick={() => handleSelect(q.id, opt.key)}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.key}
                        checked={userVal === opt.key}
                        disabled={submitted}
                        readOnly
                      />
                      <span>{opt.text}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <div className="question-explanation" style={{ display: 'block' }}>
                  <b>Izoh:</b> {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        <div className="quiz-footer-actions">
          <div className="score-display">
            {score !== null ? (
              <span>
                Natija: <b style={{ color: score >= 5 ? '#10b981' : '#f59e0b' }}>
                  {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
                </b>
              </span>
            ) : (
              <span>Natija: <b>—</b></span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {submitted && (
              <button type="button" className="btn-tertiary-action" onClick={handleReset}>
                <RotateCcw size={15} /> Qayta topshirish
              </button>
            )}
            <button type="submit" className="btn-primary-action" disabled={submitted}>
              <Award size={16} /> Natijani tekshirish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
