import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for period-calculator
const periodcalculatorMeta = {
  en: {
    title: "Period Calculator – Cycle Ovulation Online | TheSmartCalculator",
    description: "Use the Period Calculator to calculate your menstrual cycle and ovulation dates. Accurate, free online tool for women's health and fertility tracking.",
    keywords: "period calculator, menstrual cycle, ovulation dates, online period, women's health, fertility tracking, free cycle tool, date calculation"
  },
  br: {
    title: "Calculadora de Período Fértil – Descubra Seus Dias Férteis",
    description: "Use a Calculadora de Período Fértil para identificar os dias ideais para engravidar. Acompanhe seu ciclo menstrual com precisão e facilidade online.",
    keywords: "calculadora período fértil, ciclo menstrual, datas ovulação, online período, saúde mulheres, rastreamento fertilidade, gratuita ferramenta ciclo, cálculo data"
  },
  pl: {
    title: "Kalkulator Okresu – Oblicz Cykl Miesięczny Online",
    description: "Użyj kalkulatora okresu online, aby śledzić cykl menstruacyjny i przewidzieć kolejną miesiączkę. Proste, dokładne i darmowe narzędzie dla kobiet.",
    keywords: "kalkulator okresu, cykl menstruacyjny, datas owulacji, online okres, zdrowie kobiet, tracking płodności, darmowe narzędzie cyklu, obliczenia daty"
  },
  de: {
    title: "Periodenrechner – Menstruationszyklus einfach berechnen",
    description: "Berechne mit dem Periodenrechner deinen Menstruationszyklus. Erfahre nächste Periode & fruchtbare Tage – schnell, genau und kostenlos online!",
    keywords: "periodenrechner, menstruationszyklus, eisprung daten, online perioden, frauen gesundheit, fertilitäts tracking, kostenloser zyklus tool, datum berechnung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && periodcalculatorMeta[langHeader as keyof typeof periodcalculatorMeta]
      ? langHeader
      : "en";

  const meta = periodcalculatorMeta[language as keyof typeof periodcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('period-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }period-calculator`,
      languages: {
        'en': getCanonicalUrl('period-calculator', 'en'),
        'pt-BR': getCanonicalUrl('period-calculator', 'br'),
        'pl': getCanonicalUrl('period-calculator', 'pl'),
        'de': getCanonicalUrl('period-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }period-calculator`,
    },
  };
}

export default async function PeriodCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
