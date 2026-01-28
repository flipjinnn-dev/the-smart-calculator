import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for weight-watchers-points-calculator
const weightwatcherspointscalculatorMeta = {
  en: {
    title: "Weight Watchers Points Calculator - Points Estimator",
    description: "Track daily points using our Weight Watchers Points Calculator for diet success.",
    keywords: "weight watchers points calculator, points calculation, food items, online points, diet tracking, free points tool, nutrition points, weight watchers"
  },
  br: {
    title: "Weight Watchers Points Calculator – Food Online | TheSmartCalc",
    description: "Use a Calculadora Pontos Weight Watchers para calcular pontos baseado em itens de comida. Ferramenta precisa e gratuita para dieta e rastreamento de pontos.",
    keywords: "calculadora pontos weight watchers, cálculo pontos, itens comida, online pontos, rastreamento dieta, gratuita ferramenta pontos, pontos nutrição, weight watchers"
  },
  pl: {
    title: "Weight Watchers Points Calculator – Food Online | TheSmartCalc",
    description: "Użyj kalkulatora punktów Weight Watchers, aby obliczyć punkty na podstawie pozycji żywności. Dokładne, darmowe narzędzie do diety i tracking punktów.",
    keywords: "kalkulator punktów weight watchers, obliczenia punktów, pozycje żywności, online punkty, tracking diety, darmowe narzędzie punkty, punkty odżywianie, weight watchers"
  },
  de: {
    title: "Weight Watchers Punkte Rechner – Punkte berechnen",
    description: "Berechne mit dem Weight Watchers Punkte Rechner deine täglichen Punkte. Ideal zum Abnehmen – schnell, genau und kostenlos online!",
    keywords: "weight watchers punkte rechner, punkte berechnung, lebensmittel items, online punkte, diät tracking, kostenloser punkte tool, ernährung punkte, weight watchers"
  }
,
  es: {
    title: "Calculadora de Puntos Weight Watchers – Calcula Fácil",
    description: "Calcula tus puntos Weight Watchers al instante con nuestra herramienta precisa. ¡Controla tu dieta y alcanza tus metas de manera saludable ahora mismo!",
    keywords: "calculadora, puntos, weight, watchers, calcula, fácil, instante, nuestra, herramienta, precisa, controla, dieta, alcanza, metas, manera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && weightwatcherspointscalculatorMeta[langHeader as keyof typeof weightwatcherspointscalculatorMeta]
      ? langHeader
      : "en";

  const meta = weightwatcherspointscalculatorMeta[language as keyof typeof weightwatcherspointscalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('weight-watchers-points-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('weight-watchers-points-calculator', 'en'),
        'es': getCanonicalUrl('weight-watchers-points-calculator', 'es'),
        'pt-BR': getCanonicalUrl('weight-watchers-points-calculator', 'br'),
        'pl': getCanonicalUrl('weight-watchers-points-calculator', 'pl'),
        'de': getCanonicalUrl('weight-watchers-points-calculator', 'de'),
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

export default async function WeightWatchersPointsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.thesmartcalculator.com/health/weight-watchers-points-calculator",
    "name": "Weight Watchers SmartPoints Calculator (2015–2021 Formula)",
    "description": "Free online Weight Watchers SmartPoints Calculator. Enter calories, saturated fat, sugar, and protein to calculate SmartPoints (2015–2021 formula).",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Weight Watchers Points Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Any",
      "url": "https://www.thesmartcalculator.com/health/weight-watchers-points-calculator",
      "description": "Calculate SmartPoints using the official 2015–2021 Weight Watchers formula. Helps track calories, saturated fat, sugar, and protein for healthy weight management.",
      "featureList": [
        "Weight Watchers SmartPoints formula",
        "Calculates points from calories, saturated fat, sugar, protein",
        "Rounds to nearest whole number",
        "Minimum points = 0",
        "Works with 2015–2021 WW SmartPoints system"
      ],
      "applicationSubCategory": "Diet & Nutrition Calculator",
      "creator": {
        "@type": "Organization",
        "name": "Smart Calculator",
        "url": "https://www.thesmartcalculator.com"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.thesmartcalculator.com/health/weight-watchers-points-calculator"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/logo.png"
      }
    },
    "faq": [
      {
        "@type": "Question",
        "name": "How do I calculate Weight Watchers SmartPoints?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enter calories, saturated fat, sugar, and protein. The calculator applies the 2015–2021 SmartPoints formula: (0.0305 × Calories) + (0.275 × Saturated Fat) + (0.12 × Sugar) − (0.098 × Protein), rounded to the nearest whole number."
        }
      },
      {
        "@type": "Question",
        "name": "Is this Weight Watchers Points Calculator up to date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This calculator is based on the 2015–2021 Weight Watchers SmartPoints system. Newer Weight Watchers programs (after 2021) may use different rules and algorithms."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum Weight Watchers points a food can have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The minimum possible SmartPoints value is 0. Even if the formula gives a negative number, the result will be floored to zero."
        }
      }
    ]
  }
  return <>
    {children}
    <Script
      id="weight-watchers-points-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
