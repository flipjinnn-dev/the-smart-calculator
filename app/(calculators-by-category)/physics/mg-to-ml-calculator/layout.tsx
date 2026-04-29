import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for mg-to-ml-calculator
const mgToMlCalculatorMeta = {
  en: {
    title: "mg to mL Calculator | Instant Conversion Tool",
    description: "Convert mg to mL instantly using density or concentration. Free calculator for medicine, syringe dosing, lab work & liquid conversions.",
    keywords: "mg to ml, mg to ml calculator, milligrams to milliliters, medicine conversion, syringe dosage, liquid density, concentration calculator"
  },
  br: {
    title: "Calculadora mg para mL | Ferramenta de Conversão Instantânea",
    description: "Converta mg para mL instantaneamente usando densidade ou concentração. Calculadora gratuita para medicamentos, dosagem de seringa, trabalho de laboratório e conversões de líquidos.",
    keywords: "mg para ml, calculadora mg ml, miligramas para mililitros, conversão medicamentos, dosagem seringa, densidade líquidos"
  },
  pl: {
    title: "Kalkulator mg na mL | Narzędzie do Konwersji",
    description: "Konwertuj mg na mL natychmiastowo używając gęstości lub stężenia. Darmowy kalkulator do leków, dawkowania strzykawkami, pracy laboratoryjnej i konwersji płynów.",
    keywords: "mg na ml, kalkulator mg ml, miligramy na mililitry, konwersja leki, dawkowanie strzykawka, gęstość płynów"
  },
  de: {
    title: "mg in mL Rechner | Sofortige Umrechnung",
    description: "Konvertieren Sie mg sofort in mL mit Dichte oder Konzentration. Kostenloser Rechner für Medikamente, Spritzendosierung, Laborarbeit und Flüssigkeitsumrechnungen.",
    keywords: "mg in ml, mg ml rechner, milligramm in milliliter, medikament umrechnung, spritzendosierung, flüssigkeitsdichte"
  },
  es: {
    title: "Calculadora mg a mL | Herramienta de Conversión Instantánea",
    description: "Convierta mg a mL instantáneamente usando densidad o concentración. Calculadora gratuita para medicamentos, dosificación de jeringas, trabajo de laboratorio y conversiones de líquidos.",
    keywords: "mg a ml, calculadora mg ml, miligramos a mililitros, conversión medicamentos, dosificación jeringa, densidad líquidos"
  }
};

// JSON-LD Schema for mg to mL Calculator
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.thesmartcalculator.com/physics/mg-to-ml-calculator",
      "url": "https://www.thesmartcalculator.com/physics/mg-to-ml-calculator",
      "name": "mg to mL Calculator — Instant Conversion Tool",
      "description": "Convert mg to mL instantly using density or concentration. Free calculator for medicine, syringe dosing, lab work & liquid conversions.",
      "isPartOf": {
        "@type": "WebSite",
        "name": "The Smart Calculator",
        "url": "https://www.thesmartcalculator.com"
      },
      "breadcrumb": {
        "@id": "https://www.thesmartcalculator.com/physics/mg-to-ml-calculator#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.thesmartcalculator.com/physics/mg-to-ml-calculator#breadcrumb",
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
          "name": "Physics",
          "item": "https://www.thesmartcalculator.com/physics/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "mg to mL Calculator",
          "item": "https://www.thesmartcalculator.com/physics/mg-to-ml-calculator"
        }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "mg to mL Calculator",
      "operatingSystem": "All",
      "applicationCategory": "Science",
      "applicationSubCategory": "Calculator",
      "url": "https://www.thesmartcalculator.com/physics/mg-to-ml-calculator",
      "description": "Convert milligrams to milliliters instantly using density or concentration. Free calculator for medicine, syringe dosing, lab work & liquid conversions.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "mg to mL conversion",
        "mL to mg conversion", 
        "Multiple liquid presets",
        "Custom density input",
        "Medicine concentration calculations",
        "Syringe dosage calculations"
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Convert mg to mL",
      "description": "Follow these steps to convert milligrams to milliliters using the calculator.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Select Conversion Direction",
          "text": "Choose whether you want to convert mg to mL or mL to mg."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Enter Value",
          "text": "Input the milligram or milliliter value you want to convert."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Select Liquid Type",
          "text": "Choose from preset liquids (water, milk, oil, etc.) or enter custom density."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Medication Concentration (Optional)",
          "text": "For medicine, enter the concentration from the bottle label."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Calculate",
          "text": "Click the Calculate button to get instant conversion results."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I convert mg to mL?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Divide milligrams by the density or concentration of the liquid in mg/mL. For water, divide by 1000. For medicine, divide by the concentration shown on the label."
          }
        },
        {
          "@type": "Question",
          "name": "Is 1 mg equal to 1 mL?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. For water, 1 mg = 0.001 mL. For other liquids, the value depends on their density. Never assume 1 mg = 1 mL without checking the substance first."
          }
        },
        {
          "@type": "Question",
          "name": "How many mL is 500 mg?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For water: 500 mg = 0.5 mL. For a medicine with 50 mg/mL concentration: 500 mg = 10 mL. The answer always depends on the substance density or medication concentration."
          }
        },
        {
          "@type": "Question",
          "name": "How do I use this calculator for a syringe dose?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter your prescribed dose in mg and the concentration from the medicine label. The mg to mL dosage calculator for syringe calculates the exact mL to draw."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this calculator for any medication?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, as long as you know the concentration on the bottle. Enter that concentration into the medicine field and input your dose in mg. Always confirm the result with your pharmacist or doctor before administering any medication."
          }
        }
      ]
    }
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && mgToMlCalculatorMeta[langHeader as keyof typeof mgToMlCalculatorMeta]
      ? langHeader
      : "en";

  const meta = mgToMlCalculatorMeta[language as keyof typeof mgToMlCalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('mg-to-ml-calculator', language, 'physics');

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('mg-to-ml-calculator', 'en', 'physics'),
        'en': getCanonicalUrl('mg-to-ml-calculator', 'en', 'physics'),
        'es': getCanonicalUrl('mg-to-ml-calculator', 'es', 'physics'),
        'pt-BR': getCanonicalUrl('mg-to-ml-calculator', 'br', 'physics'),
        'pl': getCanonicalUrl('mg-to-ml-calculator', 'pl', 'physics'),
        'de': getCanonicalUrl('mg-to-ml-calculator', 'de', 'physics'),
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

export default async function MgToMlCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="mg-to-ml-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {children}
    </>
  );
}
