import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for weight-watchers-points-calculator
const weightwatcherspointscalculatorMeta = {
  en: {
    title: "Weight Watchers Points Calculator",
    description: "Track daily points using our Weight Watchers Points Calculator for diet success.",
    keywords: "weight watchers points calculator, points calculation, food items, online points, diet tracking, free points tool, nutrition points, weight watchers"
  },
  br: {
    title: "Calculadora de Pontos Vigilantes do Peso ",
    description: "Use a calculadora de pontos Vigilantes do Peso para gerenciar sua dieta e controlar calorias. Planeje sua alimentação e simule agora mesmo!",
    keywords: "calculadora pontos weight watchers, cálculo pontos, itens comida, online pontos, rastreamento dieta, gratuita ferramenta pontos, pontos nutrição, weight watchers"
  },
  pl: {
    title: "Weight Watchers Points Calculator – Food Online | TheSmartCalc",
    description: "Użyj kalkulatora punktów Weight Watchers, aby obliczyć punkty na podstawie pozycji żywności. Dokładne, darmowe narzędzie do diety i tracking punktów.",
    keywords: "kalkulator punktów weight watchers, obliczenia punktów, pozycje żywności, online punkty, tracking diety, darmowe narzędzie punkty, punkty odżywianie, weight watchers"
  },
  de: {
    title: "Weight Watchers Punkte Rechner – WW Punkte berechnen",
    description: "Berechne deine WW Punkte kostenlos für Lebensmittel & Rezepte",
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
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('weight-watchers-points-calculator', 'en'),
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

export default async function WeightWatchersPointsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [

    {
      "@type": "SoftwareApplication",
      "@id": "https://www.thesmartcalculator.com/health/weight-watchers-points-calculator",
      "name": "Weight Watchers Points Calculator",
      "url": "https://www.thesmartcalculator.com/health/weight-watchers-points-calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All",
      "creator": {
        "@type": "Person",
        "name": "Simon Stephen",
        "jobTitle": "Health & Fitness Expert"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 1100,
        "bestRating": 5,
        "worstRating": 1
      }
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Weight Watchers Points Calculator",
          "item": "https://www.thesmartcalculator.com/health/weight-watchers-points-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Overweight Calculator",
          "item": "https://www.thesmartcalculator.com/health/overweight-calculator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Ideal Weight Calculator",
          "item": "https://www.thesmartcalculator.com/health/ideal-weight-calculator"
        }
      ]
    },

    {
      "@type": "FAQPage",
      "mainEntity": [

        {
          "@type": "Question",
          "name": "How many WW points am I allowed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your daily points allowance depends on your weight, age, gender, and activity level."
          }
        },
        {
          "@type": "Question",
          "name": "How do I figure out WW points?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter calories, fat, sugar, and protein into the calculator."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a free weight watchers points calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, free online calculators are available without subscription."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate weight watchers points without the app?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use an online SmartPoints calculator formula."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate exercise points?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can add activity points using an exercise calculator."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate WW points for a meal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Add all ingredients and sum total points."
          }
        },
        {
          "@type": "Question",
          "name": "How many SmartPoints are in an egg?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A boiled egg is typically 0 points."
          }
        },
        {
          "@type": "Question",
          "name": "What foods have zero WW points?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Eggs, lean chicken, fish, and non-starchy vegetables."
          }
        }

      ]
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
