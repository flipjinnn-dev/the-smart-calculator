import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for time-calculator
const timecalculatorMeta = {
  en: {
    title: "Time Calculator – Add, Subtract & Track Hours Fast",
    description: "Use our free time calculator to add hours and minutes, calculate work hours, find time between two times, convert to decimal, and track payroll easily.",
    keywords: "time calculator, add hours and minutes, subtract time, work hours calculator, time between two times, decimal time converter, payroll hours calculator, track hours, free time calculator"
  },
  br: {
    title: "Calculadora de Tempo",
    description: "Use a calculadora de tempo para calcular intervalos e durações facilmente. Planeje suas atividades e organize seu tempo de forma rápida agora mesmo!",
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
  },
  es: {
    title: "Calculadora de Tiempo – Calcula Duraciones Rápida y Fácil",
    description: "Calcula tiempos y duraciones al instante con nuestra herramienta precisa. ¡Ahorra tiempo y organiza tus actividades de manera eficiente ahora mismo!",
    keywords: "calculadora, tiempo, calcula, duraciones, rápida, fácil, tiempos, instante, nuestra, herramienta, precisa, ahorra, organiza, actividades, manera"
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
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('time-calculator', 'en'),
        'en': getCanonicalUrl('time-calculator', 'en'),
        'es': getCanonicalUrl('time-calculator', 'es'),
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

export default async function TimeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.thesmartcalculator.com/time-calculator",
        "name": "Time Calculator",
        "url": "https://www.thesmartcalculator.com/time-calculator",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Time Calculator",
            "item": "https://www.thesmartcalculator.com/time-calculator",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate time between two times?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter your start time and end time into a time calculator. It subtracts the earlier time from the later time and returns the difference in hours, minutes, and seconds.",
            },
          },
          {
            "@type": "Question",
            "name": "How do I add hours and minutes without a calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Convert everything to minutes, add the totals, then convert back. For example, 1 hour 45 minutes plus 2 hours 30 minutes equals 4 hours 15 minutes.",
            },
          },
          {
            "@type": "Question",
            "name": "What is hours to decimal conversion?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Divide minutes by 60 and add to hours. For example, 3 hours 30 minutes = 3.5 hours.",
            },
          },
          {
            "@type": "Question",
            "name": "Can a time calculator handle seconds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most modern time calculators support seconds and include them in results.",
            },
          },
          {
            "@type": "Question",
            "name": "How do I calculate time for payroll with a lunch break?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Subtract break duration from total working hours to calculate net paid time.",
            },
          },
          {
            "@type": "Question",
            "name": "What is elapsed time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Elapsed time is the total time passed between a start and end point.",
            },
          },
          {
            "@type": "Question",
            "name": "How does a running pace calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It divides total time by distance to calculate average pace.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I calculate time across time zones?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it converts time using timezone offsets and daylight saving adjustments.",
            },
          },
        ],
      },
    ],
  };
  return <>
    <Script
      id="time-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
    {children}
  </>;
}
