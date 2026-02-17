import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for period-calculator
const periodcalculatorMeta = {
  en: {
    title: "Period Calculator - Menstrual Cycle Tracker",
    description: "Track menstrual cycle and fertile days using our Period Calculator for health monitoring.",
    keywords: "period calculator, menstrual cycle, ovulation dates, online period, women's health, fertility tracking, free cycle tool, date calculation"
  },
  br: {
    title: "Calculadora de Período Fértil",
    description: "Use a Calculadora de Período Fértil para descobrir seus dias férteis e ovulação. Ferramenta simples, rápida e gratuita para acompanhar sua fertilidade.",
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
,
  es: {
    title: "Calculadora Menstrual – Controla tu Ciclo Fácil y Rápido",
    description: "Calcula tus fechas del ciclo menstrual al instante con nuestra herramienta precisa. ¡Lleva un control de tu salud y predice tu próximo periodo ahora mismo!",
    keywords: "calculadora, menstrual, controla, ciclo, fácil, rápido, calcula, fechas, instante, nuestra, herramienta, precisa, lleva, control, salud"
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
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('period-calculator', 'en'),
        'en': getCanonicalUrl('period-calculator', 'en'),
        'es': getCanonicalUrl('period-calculator', 'es'),
        'pt-BR': getCanonicalUrl('period-calculator', 'br'),
        'pl': getCanonicalUrl('period-calculator', 'pl'),
        'de': getCanonicalUrl('period-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function PeriodCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Period Calculator",
    "url": "https://www.thesmartcalculator.com/health/period-calculator",
    "description": "A simple online Period Calculator to estimate your next period, ovulation date, and fertile window based on your last menstrual period and cycle information.",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com"
    },
    "mainEntity": {
      "@type": "WebApplication",
      "name": "Period Calculator Tool",
      "url": "https://www.thesmartcalculator.com/health/period-calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "softwareRequirements": "Any modern web browser",
      "featureList": [
        "Calculate next period date based on last menstrual period and average cycle length",
        "Predict ovulation date (LMP + cycle length − 14)",
        "Estimate fertile window (ovulation ± 2 days)",
        "Forecast predictions for multiple cycles",
        "Provide educational information about menstrual phases"
      ],
      "input": [
        {
          "@type": "PropertyValue",
          "name": "First day of last period",
          "valueRequired": true,
          "valueType": "Date"
        },
        {
          "@type": "PropertyValue",
          "name": "Average cycle length",
          "valueRequired": true,
          "valueType": "Integer",
          "minValue": 22,
          "maxValue": 44
        },
        {
          "@type": "PropertyValue",
          "name": "Average period length",
          "valueRequired": true,
          "valueType": "Integer",
          "minValue": 3,
          "maxValue": 10
        }
      ],
      "output": [
        {
          "@type": "PropertyValue",
          "name": "Next Period Date",
          "valueType": "Date"
        },
        {
          "@type": "PropertyValue",
          "name": "Ovulation Date",
          "valueType": "Date"
        },
        {
          "@type": "PropertyValue",
          "name": "Fertile Window",
          "valueType": "DateRange"
        }
      ],
      "usageInfo": "Estimates are based on average cycle data. Results may vary for irregular cycles. Not intended as medical advice."
    }
  }
  return <>
    {children}
    <Script
      id="period-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
