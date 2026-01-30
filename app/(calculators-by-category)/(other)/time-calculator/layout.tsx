import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for time-calculator
const timecalculatorMeta = {
  en: {
    title: "Time Calculation Made Easy | Powerful Tool",
    description: "Powerful time addition calculator to add hours, minutes, and seconds fast. Perfect seconds calculator for accurate time adding.",
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
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Time Calculation",
          "item": "https://www.thesmartcalculator.com/time-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Age Calculator",
          "item": "https://www.thesmartcalculator.com/age-calculator"
        }
      ]
    },

    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "Time Calculation",
      "alternateName": "Time Calculation",
      "url": "https://www.thesmartcalculator.com/time-calculator",
      "logo": "https://www.thesmartcalculator.com/logo.png",
      "sameAs": [
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.pinterest.com/thesmartcalculators/",
        "https://www.linkedin.com/in/smart-calculators-412288380/",
        "https://www.thesmartcalculator.com/",
        "https://x.com/SmartCalculat0r"
      ]
    },

    {
      "@type": "SoftwareApplication",
      "name": "Time Calculator",
      "operatingSystem": "All",
      "applicationCategory": "CalculatorApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5",
        "ratingCount": "1100"
      },
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Aiden Asher"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent and accurate time calculator. Very useful for work hours, planning, and payroll calculations."
      }
    },

    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Time Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is a tool to add, subtract, or compare hours, minutes, and seconds."
          }
        },
        {
          "@type": "Question",
          "name": "Is it free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it’s completely free to use."
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
            "text": "Yes, it works seamlessly on smartphones, tablets, and desktops."
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
