import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for macro-calculator
const macrocalculatorMeta = {
  en: {
    title: "Macro Calculator",
    description: "Calculate daily macros using our Macro Calculator to plan meals and reach fitness goals.",
    keywords: "macro calculator, macronutrients, requirements tool, online macro, diet balance, nutrition goals, free macro tool, goals calculation"
  },
  br: {
    title: "Calculadora Macro",
    description: "Use a calculadora macro para calcular suas macros diárias ideais. Planeje sua dieta e treinos e simule suas macros agora mesmo!",
    keywords: "calculadora macro, macronutrientes, ferramenta requisitos, online macro, equilíbrio dieta, metas nutrição, gratuita ferramenta macro, cálculo metas"
  },
  pl: {
    title: "Kalkulator Makro – Oblicz Makroskładniki Online",
    description: "Użyj kalkulatora makro online, aby obliczyć białka, tłuszcze i węglowodany w diecie. Proste, dokładne i darmowe narzędzie zdrowotne dla każdego.",
    keywords: "kalkulator makro, makroskładniki, narzędzie wymagania, online makro, równowaga diety, cele odżywianie, darmowe narzędzie makro, obliczenia celów"
  },
  de: {
    title: "Makro Rechner – Berechne deine täglichen Makronährstoffe",
    description: "Berechne mit dem Makro Rechner dein ideales Verhältnis von Eiweiß, Kohlenhydraten & Fett. Schnell, präzise & kostenlos – perfekt für Fitness & Diät!",
    keywords: "makro rechner, makronährstoffe, bedarf tool, online makro, diät balance, ernährungsziele, kostenloser makro tool, ziele berechnung"
  }
,
  es: {
    title: "Calculadora de Macros – Calcula Proteínas, Grasas y Carbs",
    description: "Calcula tus macronutrientes diarios al instante con nuestra herramienta precisa. ¡Optimiza tu dieta y alcanza tus metas de nutrición ahora mismo!",
    keywords: "calculadora, macros, calcula, proteínas, grasas, carbs, macronutrientes, diarios, instante, nuestra, herramienta, precisa, optimiza, dieta, alcanza"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && macrocalculatorMeta[langHeader as keyof typeof macrocalculatorMeta]
      ? langHeader
      : "en";

  const meta = macrocalculatorMeta[language as keyof typeof macrocalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('macro-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('macro-calculator', 'en'),
        'en': getCanonicalUrl('macro-calculator', 'en'),
        'es': getCanonicalUrl('macro-calculator', 'es'),
        'pt-BR': getCanonicalUrl('macro-calculator', 'br'),
        'pl': getCanonicalUrl('macro-calculator', 'pl'),
        'de': getCanonicalUrl('macro-calculator', 'de'),
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

export default async function MacroCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.thesmartcalculator.com/health/macro-calculator",
    "url": "https://www.thesmartcalculator.com/health/macro-calculator",
    "name": "Macro Calculator - Daily Calorie & Macronutrient Breakdown",
    "headline": "Macro Calculator",
    "description": "Free online Macro Calculator to estimate daily calorie needs and macronutrient breakdown (protein, carbs, fats) based on age, gender, height, weight, activity level, and fitness goal.",
    "inLanguage": "en",
    "isPartOf": {
      "@type": "WebSite",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/images/logo.png"
      }
    },
    "about": {
      "@type": "Thing",
      "name": "Macro Calculator",
      "description": "A health calculator that helps users determine calorie intake and daily macro split using Mifflin-St Jeor or Katch-McArdle formulas."
    },
    "mainEntity": {
      "@type": "Calculator",
      "name": "Macro Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "url": "https://www.thesmartcalculator.com/health/macro-calculator",
      "featureList": [
        "Calculate daily calories",
        "Macro split: protein, carbohydrates, fats",
        "Unit system toggle: US, Metric, Other",
        "Supports Mifflin-St Jeor & Katch-McArdle BMR formulas",
        "Custom goals: maintain, lose, or gain weight",
        "Activity level adjustment"
      ]
    },
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
          "item": "https://www.thesmartcalculator.com/health"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Macro Calculator",
          "item": "https://www.thesmartcalculator.com/health/macro-calculator"
        }
      ]
    },
    "faq": [
      {
        "@type": "Question",
        "name": "What is a macro calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A macro calculator helps you determine daily calorie intake and the right balance of protein, carbs, and fats based on your age, gender, height, weight, activity level, and goals."
        }
      },
      {
        "@type": "Question",
        "name": "Which formulas does this macro calculator use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This calculator uses Mifflin-St Jeor and Katch-McArdle equations to estimate Basal Metabolic Rate (BMR) before adjusting for activity level and goals."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this macro calculator for weight loss or muscle gain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The calculator allows you to select goals such as losing weight, gaining weight, or maintaining weight, and provides customized macro breakdowns."
        }
      }
    ]
  }
  return <>
    {children}
    <Script
      id="macro-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
