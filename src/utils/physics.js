/**
 * Vakuumli diod fizik modeli (LD FIZIKA P 3.8.1.1)
 * Physical Model & Child-Langmuir / Richardson-Dushman calculations
 */

export const PhysicsModel = {
  K_PERVEANCE: 0.0075, // mA / V^1.5 (Langmuir-Child koeffitsienti)
  GAMMA: 2.4,          // O'tish sohasi silliqligi
  SCHOTTKY_COEFF: 0.0028, // To'yinish sohasidagi Shottki effekti

  // 3 ta standart katodni qizdirish kuchlanishi (LD Fizika P 3.8.1.1)
  HEATER_PRESETS: {
    '4.0': { Uf: 4.0, Isat: 2.50, label: 'U_f = 4.0 V', color: '#10b981', nameUz: '4.0 V (Past qizdirish)' },
    '5.0': { Uf: 5.0, Isat: 6.20, label: 'U_f = 5.0 V', color: '#2563eb', nameUz: '5.0 V (O\'rta qizdirish)' },
    '6.3': { Uf: 6.3, Isat: 12.50, label: 'U_f = 6.3 V', color: '#dc2626', nameUz: '6.3 V (Nominal qizdirish)' }
  },

  // Katod harorati (Kelvinda)
  calculateCathodeTemp(Uf) {
    if (Uf <= 0.1) return 295;
    return Math.round(295 + 1155 * Math.pow(Uf / 6.3, 0.62));
  },

  // Qizdirgich toki (Amperda)
  calculateHeaterCurrent(Uf) {
    if (Uf <= 0.1) return 0.0;
    return +(0.32 * Math.sqrt(Uf / 6.3)).toFixed(2);
  },

  // To'yinish toki (mA da)
  getSaturationCurrent(Uf) {
    const key = Number(Uf).toFixed(1);
    if (this.HEATER_PRESETS[key]) {
      return this.HEATER_PRESETS[key].Isat;
    }
    return +(12.50 * Math.pow(Math.max(0, Uf) / 6.3, 4.2)).toFixed(2);
  },

  // Lengmyur-Chayld xajmiy zaryad toki
  calculateLangmuirChildCurrent(Ua) {
    if (Ua <= 0) return 0;
    return this.K_PERVEANCE * Math.pow(Ua, 1.5);
  },

  // Anod toki I_A = f(U_A, U_f, isForward, isPowerOn)
  calculateAnodeCurrent(Ua, Uf, isForward = true, isPowerOn = true, addNoise = false) {
    if (!isPowerOn || Uf < 1.0) {
      return 0.0;
    }

    // Teskari qutblanish
    if (!isForward || Ua < 0) {
      const absUa = Math.abs(Ua);
      if (absUa < 0.8) {
        return +(0.015 * Math.exp(-3 * absUa)).toFixed(3);
      }
      return 0.0;
    }

    if (Ua === 0) return 0.0;

    const I_sc = this.calculateLangmuirChildCurrent(Ua);
    const I_sat = this.getSaturationCurrent(Uf);

    const g = this.GAMMA;
    const I_base = (I_sc * I_sat) / Math.pow(Math.pow(I_sc, g) + Math.pow(I_sat, g), 1 / g);
    let I_final = I_base * (1 + this.SCHOTTKY_COEFF * Math.sqrt(Ua));

    if (addNoise) {
      const noise = (Math.random() - 0.5) * 0.03;
      I_final = Math.max(0, I_final + noise);
    }

    return +I_final.toFixed(2);
  },

  // Ish sohasini aniqlash
  determineWorkingRegion(Ua, Ia, Uf, isForward = true) {
    if (!isForward || Ua < 0) {
      return {
        id: 'reverse',
        nameUz: "Teskari qulflash sohasi (I_A ≈ 0)",
        color: '#6b7280'
      };
    }
    const Isat = this.getSaturationCurrent(Uf);
    if (Ia < 0.82 * Isat) {
      return {
        id: 'space_charge',
        nameUz: "Xajmiy zaryad sohasi (I_A ∝ U_A^(3/2))",
        color: '#2563eb'
      };
    } else if (Ia < 0.96 * Isat) {
      return {
        id: 'transition',
        nameUz: "O'tish sohasi",
        color: '#d97706'
      };
    } else {
      return {
        id: 'saturation',
        nameUz: "To'yinish sohasi (I_to'yinish)",
        color: '#dc2626'
      };
    }
  },

  // Log-log chiziqli regressiya (Lengmyur-Chayld qonunini tekshirish)
  calculateLinearRegression(dataPoints) {
    const validPoints = dataPoints.filter(p => p.Ua >= 5 && p.Ia > 0.05 && p.regionId === 'space_charge');
    if (validPoints.length < 2) return null;

    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    const n = validPoints.length;

    for (const pt of validPoints) {
      const x = Math.log(pt.Ua);
      const y = Math.log(pt.Ia);
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const meanY = sumY / n;
    let ssTot = 0, ssRes = 0;
    for (const pt of validPoints) {
      const x = Math.log(pt.Ua);
      const y = Math.log(pt.Ia);
      const yPred = slope * x + intercept;
      ssTot += Math.pow(y - meanY, 2);
      ssRes += Math.pow(y - yPred, 2);
    }
    const rSquared = ssTot > 0 ? +(1 - (ssRes / ssTot)).toFixed(4) : 0.999;

    return {
      slope: +slope.toFixed(3),        // Nazariy: ~1.500
      intercept: +intercept.toFixed(3),
      rSquared,
      kDerived: +Math.exp(intercept).toFixed(4),
      pointCount: n
    };
  }
};
