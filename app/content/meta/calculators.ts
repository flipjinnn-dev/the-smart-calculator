// Manual SEO Meta - You write these for best SEO performance
// This file contains meta titles, descriptions, slugs, and page titles for all languages

export interface CalculatorMeta {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  pageTitle: string;
}

export interface CalculatorMetaData {
  [key: string]: {
    en: CalculatorMeta;
    br: CalculatorMeta;
    pl: CalculatorMeta;
    de: CalculatorMeta;
  };
}

export const calculatorsMeta: CalculatorMetaData = {
  "bmi-calculator": {
    en: {
      metaTitle: "BMI Calculator - Free Body Mass Index Calculator Online",
      metaDescription: "Calculate your Body Mass Index (BMI) with our free online calculator. Find out if you're at a healthy weight based on height and weight. Supports kg/cm and lbs/inches.",
      slug: "bmi-calculator",
      pageTitle: "BMI Calculator",
    },
    br: {
      metaTitle: "Calculadora de IMC - Calcule seu Índice de Massa Corporal Grátis",
      metaDescription: "Calcule seu Índice de Massa Corporal (IMC) com nossa calculadora online gratuita. Descubra se você está com peso saudável. Suporta kg/cm e lbs/polegadas.",
      slug: "calculadora-imc",
      pageTitle: "Calculadora de IMC",
    },
    pl: {
      metaTitle: "Kalkulator BMI - Oblicz swój wskaźnik masy ciała za darmo",
      metaDescription: "Oblicz swój wskaźnik masy ciała (BMI) za pomocą naszego darmowego kalkulatora online. Dowiedz się, czy masz zdrową wagę. Obsługuje kg/cm i lbs/cale.",
      slug: "kalkulator-bmi",
      pageTitle: "Kalkulator BMI",
    },
    de: {
      metaTitle: "BMI Rechner - Berechnen Sie Ihren Body-Mass-Index kostenlos",
      metaDescription: "Berechnen Sie Ihren Body-Mass-Index (BMI) mit unserem kostenlosen Online-Rechner. Finden Sie heraus, ob Sie ein gesundes Gewicht haben. Unterstützt kg/cm und lbs/Zoll.",
      slug: "bmi-rechner",
      pageTitle: "BMI Rechner",
    },
  },
  // Add more calculators here...
};

// Helper function to get meta by slug
export function getCalculatorMetaBySlug(slug: string, lang: string): CalculatorMeta | null {
  for (const [calcId, metaData] of Object.entries(calculatorsMeta)) {
    const meta = metaData[lang as keyof typeof metaData];
    if (meta && meta.slug === slug) {
      return meta;
    }
  }
  return null;
}

// Helper function to get calculator ID by slug
export function getCalculatorIdBySlug(slug: string, lang: string): string | null {
  for (const [calcId, metaData] of Object.entries(calculatorsMeta)) {
    const meta = metaData[lang as keyof typeof metaData];
    if (meta && meta.slug === slug) {
      return calcId;
    }
  }
  return null;
}
