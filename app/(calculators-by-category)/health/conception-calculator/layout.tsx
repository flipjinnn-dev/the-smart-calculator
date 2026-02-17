import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for conception-calculator
const conceptioncalculatorMeta = {
  en: {
    title: "Conception Calculator",
    description: "Estimate fertile days and plan pregnancy using our Conception Calculator for better timing.",
    keywords: "conception calculator, date estimate, ovulation tool, intercourse calculation, online conception, pregnancy planning, free date tool, timeline tracker"
  },
  br: {
    title: "Calculadora de Concepção",
    description: "Use a calculadora de concepção para estimar a data da gravidez com precisão. Planeje sua gestação e simule a concepção agora mesmo!",
    keywords: "calculadora concepção, data gravidez, bebê concebido, ferramenta online, precisão facilidade, planejamento gravidez, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Poczęcia – Data Online | TheSmartCalculator",
    description: "Użyj kalkulatora poczęcia online, aby obliczyć przewidywaną datę poczęcia i dni płodne. Proste, dokładne i darmowe narzędzie dla przyszłych rodziców.",
    keywords: "kalkulator poczęcia, data poczęcia, dni płodne, narzędzie rodzice, online poczęcie, dokładne darmowe, proste narzędzie"
  },
  de: {
    title: "Empfängnisrechner – Termin Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Empfängnisrechner den genauen Empfängnistag und Geburtstermin. Einfach, schnell und kostenlos – ideal für Familienplanung und Timeline!",
    keywords: "empfängnisrechner, termin berechnen, empfängnistag tool, geburtstermin, familienplanung, schnell kostenlos, ideal rechner"
  }
,
  es: {
    title: "Calculadora de Concepción – Planea tu Embarazo Fácil",
    description: "Calcula tus fechas ideales para concebir al instante con nuestra herramienta precisa. ¡Planifica tu embarazo y aumenta tus posibilidades ahora mismo",
    keywords: "calculadora, concepción, planea, embarazo, fácil, calcula, fechas, ideales, concebir, instante, nuestra, herramienta, precisa, planifica, aumenta"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && conceptioncalculatorMeta[langHeader as keyof typeof conceptioncalculatorMeta]
      ? langHeader
      : "en";

  const meta = conceptioncalculatorMeta[language as keyof typeof conceptioncalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('conception-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('conception-calculator', 'en'),
        'en': getCanonicalUrl('conception-calculator', 'en'),
        'es': getCanonicalUrl('conception-calculator', 'es'),
        'pt-BR': getCanonicalUrl('conception-calculator', 'br'),
        'pl': getCanonicalUrl('conception-calculator', 'pl'),
        'de': getCanonicalUrl('conception-calculator', 'de'),
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

export default async function ConceptionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Conception Calculator",
    "url": "https://www.thesmartcalculator.com/health/conception-calculator",
    "description": "Free online Conception Calculator to estimate fertile window, ovulation date, possible conception date, and estimated due date based on your last menstrual period and cycle length.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Conception Calculator",
      "operatingSystem": "All",
      "applicationCategory": "HealthApplication",
      "description": "This conception calculator estimates a woman's fertile days, ovulation period, likely conception date, and due date using last menstrual period and cycle length.",
      "url": "https://www.thesmartcalculator.com/health/conception-calculator",
      "publisher": {
        "@type": "Organization",
        "name": "The Smart Calculator",
        "url": "https://www.thesmartcalculator.com"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "faq": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Conception Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A conception calculator is a tool that estimates your fertile window, ovulation day, and possible conception dates based on your last menstrual period and cycle length."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is the Conception Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The conception calculator provides an estimate based on the average 14-day luteal phase assumption. Individual results can vary and should not replace medical advice."
          }
        },
        {
          "@type": "Question",
          "name": "Can this calculator predict my due date?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the calculator estimates an expected due date based on the likely conception date, usually around 266 days after conception. This is only an estimate."
          }
        },
        {
          "@type": "Question",
          "name": "What if my cycle is irregular?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For women with irregular cycles, the calculator’s accuracy decreases. Consult a healthcare professional for personalized fertility guidance."
          }
        }
      ]
    }
  }
  return <>
    {children}
    <Script
      id="conception-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
