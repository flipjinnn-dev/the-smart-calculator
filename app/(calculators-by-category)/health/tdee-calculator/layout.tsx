import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for tdee-calculator
const tdeecalculatorMeta = {
  en: {
    title: "TDEE Calculator – Energy Expenditure Online | TheSmartCalculator",
    description: "Use the TDEE Calculator to calculate Total Daily Energy Expenditure based on activity. Accurate, free online tool for calorie needs and weight management.",
    keywords: "tdee calculator, energy expenditure, activity level, online tdee, calorie needs, weight management, free tdee tool, daily energy"
  },
  br: {
    title: "Calculadora TDEE – Gasto Energético Online | TheSmartCalculator",
    description: "Use a Calculadora TDEE para calcular gasto energético diário total baseado em atividade. Ferramenta precisa e gratuita para necessidades de calorias e gerenciamento de peso.",
    keywords: "calculadora tdee, gasto energético, nível atividade, online tdee, necessidades calorias, gerenciamento peso, gratuita ferramenta tdee, energia diária"
  },
  pl: {
    title: "TDEE Calculator – Energy Expenditure Online | TheSmartCalculat",
    description: "Użyj kalkulatora TDEE online, aby obliczyć całkowite dzienne zapotrzebowanie kaloryczne na podstawie aktywności. Proste, dokładne i darmowe narzędzie do potrzeb kalorycznych.",
    keywords: "kalkulator tdee, wydatki energetyczne, poziom aktywności, online tdee, zapotrzebowanie kaloryczne, zarządzanie wagą, darmowe narzędzie tdee, energia dzienna"
  },
  de: {
    title: "TDEE Rechner – Täglichen Kalorienverbrauch berechnen",
    description: "Berechne mit dem TDEE Rechner deinen täglichen Kalorienverbrauch. Ideal für Abnehmen, Muskelaufbau & Fitness – schnell, genau und kostenlos online!",
    keywords: "tdee rechner, energie verbrauch, aktivität level, online tdee, kalorien bedarf, gewicht management, kostenloser tdee tool, tägliche energie"
  }
,
  es: {
    title: "Calculadora TDEE – Calcula tus Calorías y Gasto Energético",
    description: "Utiliza nuestra calculadora TDEE para estimar tu gasto energético diario, controlar tus calorías y optimizar tu nutrición y rendimiento físico de manera sencilla.",
    keywords: "calculadora, tdee, calcula, calorías, gasto, energético, utiliza, nuestra, estimar, diario, controlar, optimizar, nutrición, rendimiento, físico"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && tdeecalculatorMeta[langHeader as keyof typeof tdeecalculatorMeta]
      ? langHeader
      : "en";

  const meta = tdeecalculatorMeta[language as keyof typeof tdeecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('tdee-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }tdee-calculator`,
      languages: {
        'en': getCanonicalUrl('tdee-calculator', 'en'),
        'es': getCanonicalUrl('tdee-calculator', 'es'),
        'pt-BR': getCanonicalUrl('tdee-calculator', 'br'),
        'pl': getCanonicalUrl('tdee-calculator', 'pl'),
        'de': getCanonicalUrl('tdee-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }tdee-calculator`,
    },
  };
}

export default async function TdeeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TDEE Calculator – Total Daily Energy Expenditure",
    "url": "https://www.thesmartcalculator.com/health/tdee-calculator",
    "description": "Free TDEE Calculator to estimate your daily calorie needs using Mifflin-St Jeor and Katch-McArdle formulas. Includes activity multipliers, guidance for weight loss, maintenance, and muscle gain.",
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
          "name": "Health",
          "item": "https://www.thesmartcalculator.com/health/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "TDEE Calculator",
          "item": "https://www.thesmartcalculator.com/health/tdee-calculator"
        }
      ]
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "TDEE Calculator",
      "operatingSystem": "Web",
      "applicationCategory": "Calculator",
      "url": "https://www.thesmartcalculator.com/health/tdee-calculator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "about": {
      "@type": "Thing",
      "name": "Total Daily Energy Expenditure (TDEE)",
      "description": "TDEE is the total calories your body burns in a day. It helps estimate calorie needs for weight loss, maintenance, or bulking."
    },
    "publisher": {
      "@type": "Organization",
      "name": "Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/assets/images/logo.png"
      }
    },
    "faq": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is TDEE and why is it important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TDEE stands for Total Daily Energy Expenditure. It represents the number of calories you burn in a day, helping you determine how much to eat for weight loss, maintenance, or muscle gain."
          }
        },
        {
          "@type": "Question",
          "name": "Which formula is better: Mifflin-St Jeor or Katch-McArdle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Mifflin-St Jeor formula is accurate for most people, while the Katch-McArdle formula is better if you know your body fat percentage."
          }
        },
        {
          "@type": "Question",
          "name": "How do I use the TDEE Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter your age, gender, weight, height, and activity level. The calculator will estimate your daily calorie needs based on proven formulas."
          }
        }
      ]
    }
  }
  return <>
    {children}
    <Script
      id="tdee-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
