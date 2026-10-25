import React, { useState } from 'react';
import { Atom, FlaskConical, Dna, Calculator, ArrowRight, CheckCircle2, Users, Layers, Award } from 'lucide-react';

export default function HomePage({ onSelectExperiment }) {
  const [activeSubject, setActiveSubject] = useState('all');

  const subjects = [
    { id: 'all', name: 'Barcha Fanlar', icon: <Layers size={16} /> },
    { id: 'physics', name: 'Fizika (Physics)', icon: <Atom size={16} /> },
    { id: 'chemistry', name: 'Kimyo (Chemistry)', icon: <FlaskConical size={16} /> },
    { id: 'biology', name: 'Biologiya (Biology)', icon: <Dna size={16} /> },
    { id: 'math', name: 'Matematika (Math)', icon: <Calculator size={16} /> }
  ];

  const experiments = [
    {
      id: 'vacuum_diode',
      simId: 146,
      subjectId: 'physics',
      title: "Vakuumli diodning volt-amper xarakteristikasini o'rganish",
      code: "LD FIZIKA P 3.8.1.1",
      classLevel: "11-12 sinf / Oliy Fizika",
      desc: "Katodni 3 xil qizdirish kuchlanishida (4V, 5V, 6.3V) VAX o'lchash, xajmiy manfiy zaryad sohasini aniqlash va Lengmyur-Chayld 3/2 qonunini tekshirish.",
      image: "/assets/vacuum_diode_diagram.svg",
      active: true,
      badge: "Faol Laboratoriya"
    },
    {
      id: 'wheatstone_bridge',
      simId: 146,
      subjectId: 'physics',
      title: "Metrli ko'prik yordamida o'tkazgich qarshiligini aniqlash",
      code: "OLabs Sim 146",
      classLevel: "10-12 sinf Fizika",
      desc: "Vitston ko'prigi printsipi asosida noma'lum o'tkazgich qarshiligini va uning solishtirma qarshiligini o'lchash.",
      image: "/assets/vax_typical_curve.svg",
      active: false,
      badge: "OLabs Standart"
    },
    {
      id: 'photoelectric_effect',
      simId: 210,
      subjectId: 'physics',
      title: "Fotoelektr effektini o'rganish va Plank doimiysini aniqlash",
      code: "LD FIZIKA P 6.1.4.1",
      classLevel: "Oliy Fizika",
      desc: "Turli to'lqin uzunlikdagi monoxromatik nurlar ta'sirida to'xtatuvchi potensialni o'lchash va h Plank doimiysini hisoblash.",
      image: "/assets/vacuum_diode_diagram.svg",
      active: false,
      badge: "Kvant Fizikasi"
    },
    {
      id: 'pn_junction_diode',
      simId: 233,
      subjectId: 'physics',
      title: "Yarimo'tkazgich P-N o'tishli diod VAX ini o'rganish",
      code: "OLabs Sim 233",
      classLevel: "11-12 sinf",
      desc: "Kremniy va germaniy diodlarining to'g'ri va teskari ulanishdagi VAX egri chizig'i, to'siq kuchlanishi va teshilish zonasini o'rganish.",
      image: "/assets/vax_typical_curve.svg",
      active: false,
      badge: "Yarimo'tkazgichlar"
    },
    {
      id: 'acid_base_titration',
      simId: 305,
      subjectId: 'chemistry',
      title: "Kislota-asosli titrlash (Kislotalilikni aniqlash)",
      code: "OLabs Kimyo",
      classLevel: "10-11 sinf Kimyo",
      desc: "Fenolftalein indikatori yordamida noma'lum konsentratsiyali xlorid kislotasi eritmasini natriy gidroksid bilan neytrallash.",
      image: "/assets/vax_typical_curve.svg",
      active: false,
      badge: "Analitik Kimyo"
    },
    {
      id: 'osmosis_plant_cells',
      simId: 412,
      subjectId: 'biology',
      title: "O'simlik hujayralarida osmos va plazmoliz hodisasini kuzatish",
      code: "OLabs Biologiya",
      classLevel: "9-10 sinf Biologiya",
      desc: "Gipertonik va gipotonik eritmalar ta'sirida piyoz epidermisi hujayralarida plazmoliz va deplazmoliz jarayonini mikroskopda tahlil qilish.",
      image: "/assets/vacuum_diode_diagram.svg",
      active: false,
      badge: "Sitologiya"
    }
  ];

  const filtered = activeSubject === 'all'
    ? experiments
    : experiments.filter(e => e.subjectId === activeSubject);

  return (
    <div>
      {/* Hero Banner */}
      <section className="home-hero-banner">
        <div className="hero-inner">
          <div className="hero-text">
            <h2>OLabs Virtual Laboratoriya Platformasi</h2>
            <p>
              Maktab, kollej va oliy ta'lim muassasalari talabalari uchun yaratilgan interaktiv raqamli laboratoriyalar portali. Nazariya, interaktiv simulyator, video va o'z-o'zini baholash tizimi bir joyda!
            </p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-box">
              <div className="num">120+</div>
              <div className="lbl">Virtual Tajriba</div>
            </div>
            <div className="hero-stat-box">
              <div className="num">45K+</div>
              <div className="lbl">Faol Talaba</div>
            </div>
            <div className="hero-stat-box">
              <div className="num">100%</div>
              <div className="lbl">Interaktiv Fizika</div>
            </div>
          </div>
        </div>
      </section>

      {/* Fanlar Filteri */}
      <div className="subjects-filter-bar">
        {subjects.map(s => (
          <button
            key={s.id}
            className={`subject-filter-btn ${activeSubject === s.id ? 'active' : ''}`}
            onClick={() => setActiveSubject(s.id)}
          >
            {s.icon}
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      {/* Tajribalar Grid */}
      <div className="experiments-grid-container">
        {filtered.map(exp => (
          <div
            key={exp.id}
            className="experiment-card"
            onClick={() => onSelectExperiment(exp.id)}
          >
            <div className="exp-card-media">
              <img src={exp.image} alt={exp.title} />
              <div className={`exp-card-badge ${exp.active ? 'active-badge' : ''}`}>
                {exp.badge}
              </div>
            </div>

            <div className="exp-card-body">
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                <span className="exp-card-class">{exp.classLevel}</span>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#b45309', background: '#fef3c7', padding: '2px 6px', borderRadius: 4 }}>
                  {exp.code}
                </span>
              </div>

              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>

              <div className="exp-card-footer">
                <span style={{ fontSize: 12, color: '#64748b' }}>
                  {exp.active ? '🟢 To\'liq tayyor' : '⚡ Boshlash'}
                </span>
                <button className="btn-open-lab">
                  <span>Kirish</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
