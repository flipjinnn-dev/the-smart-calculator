import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for protein-calculator
const proteincalculatorMeta = {
  en: {
    title: "Protein Calculator - Daily Protein Needs",
    description: "Calculate daily protein needs with our Protein Calculator to plan meals and support fitness.",
    keywords: "protein calculator, daily protein, activity tool, goals calculation, online protein, diet building, free protein tool, muscle planning"
  },
  br: {
    title: "Calculadora de Proteína  – Calcule a Ingestão Diária Ideal",
    description: "Use a Calculadora de Proteína para saber quanto consumir por dia. Ajuste sua dieta e alcance seus objetivos de saúde e fitness com precisão.",
    keywords: "calculadora proteína, proteína diária, ferramenta atividade, cálculo metas, online proteína, construção dieta, gratuita ferramenta proteína, planejamento músculo"
  },
  pl: {
    title: "Kalkulator Białka – Oblicz Dzienne Spożycie Białka",
    description: "Użyj kalkulatora białka online, aby obliczyć dzienne zapotrzebowanie na białko w diecie. Proste, szybkie i dokładne narzędzie dla zdrowego stylu życia.",
    keywords: "kalkulator białka, białko dzienne, narzędzie aktywności, obliczenia celów, online białko, budowa diety, darmowe narzędzie białko, planowanie mięśni"
  },
  de: {
    title: "Proteinrechner – Täglichen Eiweißbedarf einfach berechnen",
    description: "Berechne mit dem Proteinrechner deinen täglichen Eiweißbedarf. Ideal für Muskelaufbau, Fitness & Ernährung – schnell, präzise und kostenlos online!",
    keywords: "proteinrechner, tägliches protein, aktivität tool, ziele berechnung, online protein, diät aufbau, kostenloser protein tool, muskel planung"
  }
,
  es: {
    title: "Calculadora de Proteínas – Calcula tu Ingesta Diaria Fácil",
    description: "Calcula tu ingesta diaria de proteínas al instante con nuestra herramienta precisa. ¡Optimiza tu dieta y alcanza tus metas de nutrición ahora mismo",
    keywords: "calculadora, proteínas, calcula, ingesta, diaria, fácil, instante, nuestra, herramienta, precisa, optimiza, dieta, alcanza, metas, nutrición"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && proteincalculatorMeta[langHeader as keyof typeof proteincalculatorMeta]
      ? langHeader
      : "en";

  const meta = proteincalculatorMeta[language as keyof typeof proteincalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('protein-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('protein-calculator', 'en'),
        'en': getCanonicalUrl('protein-calculator', 'en'),
        'es': getCanonicalUrl('protein-calculator', 'es'),
        'pt-BR': getCanonicalUrl('protein-calculator', 'br'),
        'pl': getCanonicalUrl('protein-calculator', 'pl'),
        'de': getCanonicalUrl('protein-calculator', 'de'),
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

export default async function ProteinCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.thesmartcalculator.com/health/protein-calculator",
        "url": "https://www.thesmartcalculator.com/health/protein-calculator",
        "name": "Protein Calculator - Daily Protein Intake Estimator",
        "description": "Free protein calculator to estimate your daily protein intake based on age, gender, weight, height, activity level, and goal. Find out how much protein you need for muscle gain, fat loss, or maintenance.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.thesmartcalculator.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Health Calculators",
              "item": "https://www.thesmartcalculator.com/health/"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Protein Calculator",
              "item": "https://www.thesmartcalculator.com/health/protein-calculator"
            }
          ]
        },
        "publisher": {
          "@type": "Organization",
          "name": "The Smart Calculator",
          "url": "https://www.thesmartcalculator.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.thesmartcalculator.com/logo.png"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.thesmartcalculator.com/health/protein-calculator#faqs",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much protein do I need daily?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The average sedentary adult needs about 0.8 grams of protein per kilogram of body weight per day. Active individuals or athletes may require 1.2–2.2 g/kg depending on their goals."
            }
          },
          {
            "@type": "Question",
            "name": "How much protein should I eat for muscle gain?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For muscle growth, most experts recommend around 1.6–2.2 grams of protein per kilogram of body weight daily, spread across meals."
            }
          },
          {
            "@type": "Question",
            "name": "What are the best protein food sources?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "High-quality protein sources include chicken breast, fish, eggs, Greek yogurt, lentils, beans, and lean beef."
            }
          },
          {
            "@type": "Question",
            "name": "Is high protein intake safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For healthy adults, higher protein intake is safe. However, people with kidney or liver issues should consult a doctor before increasing protein consumption."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="protein-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
