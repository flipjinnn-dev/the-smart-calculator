import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for time-calculator
const timecalculatorMeta = {
  en: {
    title: "Time Calculator – Difference & Duration Online | TheSmartCalculator",
    description: "Use the Time Calculator to compute differences between dates and times. Accurate, free online tool for planning, studies, projects, and duration calculations.",
    keywords: "time calculator, date difference, duration tool, online time, planning calculator, study tool, project duration, free time calculator"
  },
  br: {
    title: "Calculadora de Tempo – Diferença Duração | TheSmartCalculator",
    description: "Use a Calculadora de Tempo para medir a duração entre datas e horários. Ferramenta rápida e precisa para planejamento, estudos e projetos com cálculos detalhados.",
    keywords: "calculadora de tempo, medir duração, datas horários, ferramenta tempo online, planejamento estudos, projetos calculadora, precisa tempo"
  },
  pl: {
    title: "Kalkulator Czasu – Upływ Czasu Online | TheSmartCalculator",
    description: "Użyj kalkulatora czasu online, aby obliczyć różnicę między datami i godzinami. Proste, szybkie i darmowe narzędzie do planowania i obliczeń czasowych.",
    keywords: "kalkulator czasu, obliczyć różnicę, daty godziny, narzędzie czasu online, planowanie obliczenia, darmowy kalkulator, szybkie narzędzie"
  },
  de: {
    title: "Zeitrechner – Zeitspannen Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Zeitrechner Zeitspannen, Additionen & Differenzen. Schnell, genau & kostenlos – ideal für Arbeit, Projekte & Alltag in Planung.",
    keywords: "zeitrechner, zeitspannen berechnen, additionen differenzen, online rechner, arbeit projekte, alltag tool, kostenloser zeitrechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && timecalculatorMeta[langHeader as keyof typeof timecalculatorMeta]
      ? langHeader
      : "en";

  const meta = timecalculatorMeta[language as keyof typeof timecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('time-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('time-calculator', 'en'),
        'pt-BR': getCanonicalUrl('time-calculator', 'br'),
        'pl': getCanonicalUrl('time-calculator', 'pl'),
        'de': getCanonicalUrl('time-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
    },
  };
}

export default async function TimeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
