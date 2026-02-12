import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for height-calculator
const heightcalculatorMeta = {
  en: {
    title: "Height Calculator",
    description: "Find exact height conversions using our Height Calculator for accurate measurements.",
    keywords: "height calculator, estimate height, growth tool, online height, height prediction, genetics calculator, free height tool, health height"
  },
  br: {
    title: "Calculadora de Altura ",
    description: "Use a calculadora de altura para estimar seu crescimento e medidas. Planeje sua saúde ou treinos e descubra seus resultados agora mesmo!",
    keywords: "calculadora de altura, estimar altura, crescimento tool, ferramenta altura online, saúde altura, planejamento calculadora, altura genética"
  },
  pl: {
    title: "Kalkulator Wzrostu – Przewiduj Wzrost Online | TheSmartCalculator",
    description: "Użyj kalkulatora wzrostu online, aby oszacować swój przyszły wzrost lub wzrost dziecka. Proste, szybkie i darmowe narzędzie zdrowotne do planowania.",
    keywords: "kalkulator wzrostu, oszacować wzrost, przyszły wzrost, narzędzie wzrost online, dziecko wzrost, darmowy kalkulator wzrost, zdrowotne narzędzie"
  },
  de: {
    title: "Grobenrechner – Große Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Grobenrechner Maßeinheiten schnell & genau. Kostenlos & einfach – ideal für Schule, Studium, Alltag und Handwerk! Einschätzung für Wachstum.",
    keywords: "grobenrechner, große berechnen, maßeinheiten tool, online rechner, schule studium, alltag handwerk, kostenloser groben tool"
  },
  es: {
    title: "Calculadora de Altura – Predice tu Crecimiento Fácilmente",
    description: "Usa nuestra calculadora de altura para estimar tu crecimiento o el de tus hijos. ¡Descúbrelo al instante y planifica tu desarrollo ahora mismo!",
    keywords: "calculadora, altura, predice, crecimiento, fácilmente, nuestra, estimar, hijos, descúbrelo, instante, planifica, desarrollo, ahora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && heightcalculatorMeta[langHeader as keyof typeof heightcalculatorMeta]
      ? langHeader
      : "en";

  const meta = heightcalculatorMeta[language as keyof typeof heightcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('height-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('height-calculator', 'en'),
        'en': getCanonicalUrl('height-calculator', 'en'),
        'es': getCanonicalUrl('height-calculator', 'es'),
        'pt-BR': getCanonicalUrl('height-calculator', 'br'),
        'pl': getCanonicalUrl('height-calculator', 'pl'),
        'de': getCanonicalUrl('height-calculator', 'de'),
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

export default async function HeightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Height Calculator",
    "url": "https://www.thesmartcalculator.com/height-calculator",
    "description": "Free online Height Calculator to convert between units (cm, meters, feet/inches) and estimate adult height accurately.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Height Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Accurate height conversion between cm, meters, and feet/inches",
          "Optional adult height estimation",
          "Instant calculation",
          "Mobile-friendly interface",
          "Free to use"
        ],
        "url": "https://www.thesmartcalculator.com/height-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Height Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Height Calculator",
            "text": "Input your height in cm, meters, or feet/inches."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Height Calculator",
            "text": "Choose whether you want unit conversion or adult height estimate."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Height Calculator",
            "text": "For height prediction, enter age and parental heights."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Height Calculator",
            "text": "Get instant results for height conversion or predicted adult height."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Height Calculator",
            "text": "View accurate converted height or estimated adult height."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Height Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is an online tool to measure, convert, or estimate height accurately."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is completely free to use online."
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
            "name": "Can it convert units?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it supports cm, meters, and feet/inches conversions."
            }
          },
          {
            "@type": "Question",
            "name": "Does it predict adult height?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it can estimate adult height using age and parental height."
            }
          },
          {
            "@type": "Question",
            "name": "Is it accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unit conversions are precise; adult height predictions are estimates."
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
            "name": "Who can use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Students, parents, fitness enthusiasts, and health professionals."
            }
          },
          {
            "@type": "Question",
            "name": "Can it help with school or sports records?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides correct height units for official documentation."
            }
          },
          {
            "@type": "Question",
            "name": "Can I rely on predicted height?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Predicted height is an estimate and may vary due to genetics or health factors."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="height-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
