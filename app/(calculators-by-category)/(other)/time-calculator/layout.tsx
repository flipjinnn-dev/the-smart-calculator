import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

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
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Time Calculator",
    "url": "https://www.thesmartcalculator.com/time-calculator",
    "description": "Free online Time Calculator to add, subtract, or compare hours, minutes, and seconds accurately for work, projects, events, and study.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Time Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Add or subtract multiple time values",
          "Supports hours, minutes, and seconds",
          "Automatic carryover for minutes and hours",
          "Mobile-friendly and free to use",
          "Accurate and easy for work, study, or event planning"
        ],
        "url": "https://www.thesmartcalculator.com/time-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Time Calculation",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Time Calculation",
            "text": "Input hours, minutes, and seconds for your calculation."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Time Calculation",
            "text": "Choose to add or subtract time."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Time Calculation",
            "text": "Enter additional time values if necessary."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Time Calculation",
            "text": "Get the total time or difference instantly."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Time Calculation",
            "text": "The result will display total time with proper carryover."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the Time Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is an online tool to add, subtract, or compare hours, minutes, and seconds."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the Time Calculator is completely free."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it works directly in any web browser."
            }
          },
          {
            "@type": "Question",
            "name": "Can it handle multiple time entries?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can add or subtract multiple durations."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support hours, minutes, and seconds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all standard time units are supported."
            }
          },
          {
            "@type": "Question",
            "name": "Is it mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on smartphones, tablets, and desktops."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for work hours or payroll?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it calculates total work hours and overtime accurately."
            }
          },
          {
            "@type": "Question",
            "name": "Does it automatically convert seconds and minutes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it handles carryover from seconds to minutes and minutes to hours."
            }
          },
          {
            "@type": "Question",
            "name": "Can it help with event planning?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it calculates durations and end times for events precisely."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is fully accurate when time inputs are correct."
            }
          }
        ]
      }
    ]
  }
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
