import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for pregnancy-calculator
const pregnancycalculatorMeta = {
  en: {
    title: "Pregnancy Calculator – Acompanhe Sua Gestação Online",
    description: "Use a Calculadora de Gravidez para estimar semanas, data de parto e acompanhar o desenvolvimento do bebê. Planeje sua gestação com precisão online.",
    keywords: "pregnancy calculator, gestation weeks, due date, baby development, online pregnancy, precision planning, gestation tool, week calculation"
  },
  br: {
    title: "Calculadora de Gravidez – Acompanhe Sua Gestação Online",
    description: "Use a pregnancy  – acompanhe sua gestação online para obter resultados rápidos e precisos. Entradas simples, saídas claras e contexto útil — grátis e fácil de usar.",
    keywords: "calculadora gravidez, semanas gestação, data parto, desenvolvimento bebê, online gravidez, planejamento precisão, ferramenta gestação, cálculo semana"
  },
  pl: {
    title: "Kalkulator Ciąży – Oblicz Tydzień Ciąży Online",
    description: "Użyj kalkulatora ciąży online, aby obliczyć tydzień ciąży i przewidywaną datę porodu. Proste, szybkie i darmowe narzędzie dla przyszłych mam.",
    keywords: "kalkulator ciąży, tygodnie ciąża, data porodu, rozwój dziecka, online ciąża, planowanie dokładne, narzędzie ciąża, obliczenia tygodnia"
  },
  de: {
    title: "Schwangerschaftsrechner – Geburtstermin einfach berechnen",
    description: "Berechne mit dem Schwangerschaftsrechner deinen Geburtstermin & Schwangerschaftswoche. Schnell, genau & kostenlos – ideal für werdende Mütter!",
    keywords: "schwangerschaftsrechner, schwangerschaftswochen, geburtstermin, baby entwicklung, online schwangerschaft, präzise planung, gestations tool, wochen berechnung"
  }
,
  es: {
    title: "Calculadora de Embarazo – Conoce tu Fecha de Parto Fácil",
    description: "Calcula tu fecha de parto al instante con nuestra herramienta precisa. ¡Planifica tu embarazo y sigue tu desarrollo semana a semana ahora mismo!",
    keywords: "calculadora, embarazo, conoce, fecha, parto, fácil, calcula, instante, nuestra, herramienta, precisa, planifica, sigue, desarrollo, semana"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pregnancycalculatorMeta[langHeader as keyof typeof pregnancycalculatorMeta]
      ? langHeader
      : "en";

  const meta = pregnancycalculatorMeta[language as keyof typeof pregnancycalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pregnancy-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }pregnancy-calculator`,
      languages: {
        'en': getCanonicalUrl('pregnancy-calculator', 'en'),
        'es': getCanonicalUrl('pregnancy-calculator', 'es'),
        'pt-BR': getCanonicalUrl('pregnancy-calculator', 'br'),
        'pl': getCanonicalUrl('pregnancy-calculator', 'pl'),
        'de': getCanonicalUrl('pregnancy-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }pregnancy-calculator`,
    },
  };
}

export default async function PregnancyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
