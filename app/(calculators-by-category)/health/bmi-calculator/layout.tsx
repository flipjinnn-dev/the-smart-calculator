import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for bmi-calculator
const bmicalculatorMeta = {
  en: {
    title: "BMI Calculator - Body Mass Index Check",
    description: "Check your BMI instantly with our BMI Calculator to monitor health and fitness goals easily.",
    keywords: "bmi calculator, body mass index, weight status, height weight tool, online bmi, health assessment, free bmi calculator, index calculation"
  },
  br: {
    title: "Calculadora IMC – Massa Corporal Online | TheSmartCalculator",
    description: "Use a Calculadora IMC para descobrir seu índice de massa corporal. Avalie se seu peso está ideal e acompanhe sua saúde com rapidez e precisão baseada em altura.",
    keywords: "calculadora imc, massa corporal, peso ideal, ferramenta saúde, online imc, avaliação peso, precisa calculadora"
  },
  pl: {
    title: "Kalkulator BMI – Masa Ciała Online | TheSmartCalculator",
    description: "Użyj kalkulatora BMI online, aby obliczyć wskaźnik masy ciała i sprawdzić swoją wagę idealną. Proste, dokładne i darmowe narzędzie zdrowotne na podstawie wzrostu.",
    keywords: "kalkulator bmi, masa ciała, waga idealna, narzędzie zdrowotne, online bmi, sprawdź wagę, darmowy tool"
  },
  de: {
    title: "BMI Rechner – Body Mass Index Berechnen | TheSmartCalculator",
    description: "Mit dem BMI Rechner berechnen Sie Ihren Body-Mass-Index schnell & präzise. Finden Sie heraus, ob Ihr Gewicht im gesunden Bereich liegt – jetzt online testen.",
    keywords: "bmi rechner, body mass index, gewicht bereich, online testen, gesunden gewicht, präzise tool, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora IMC – Evalúa tu Peso y Altura",
    description: "Utiliza nuestra calculadora IMC para medir tu índice de masa corporal, analizar tu peso y altura, y mejorar tu salud de manera sencilla y efectiva.",
    keywords: "calculadora, evalúa, peso, altura, utiliza, nuestra, medir, índice, masa, corporal, analizar, mejorar, salud, manera, sencilla"
  }
};

// JSON-LD Schema for BMI Calculator
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.thesmartcalculator.com/health/bmi-calculator",
      "url": "https://www.thesmartcalculator.com/health/bmi-calculator",
      "name": "BMI Calculator — Free Online Body Mass Index Checker",
      "description": "Free online BMI Calculator — calculate your Body Mass Index instantly in kg/cm or lbs/inches. See WHO categories (underweight, normal, overweight, obese) and learn BMI formulas with step-by-step instructions.",
      "isPartOf": {
        "@type": "WebSite",
        "name": "The Smart Calculator",
        "url": "https://www.thesmartcalculator.com"
      },
      "breadcrumb": {
        "@id": "https://www.thesmartcalculator.com/health/bmi-calculator#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.thesmartcalculator.com/health/bmi-calculator#breadcrumb",
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
          "name": "BMI Calculator",
          "item": "https://www.thesmartcalculator.com/health/bmi-calculator"
        }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "BMI Calculator",
      "operatingSystem": "All",
      "applicationCategory": "Health",
      "applicationSubCategory": "Calculator",
      "url": "https://www.thesmartcalculator.com/health/bmi-calculator",
      "description": "BMI Calculator to measure Body Mass Index using metric (kg/cm) or imperial (lbs/inches) units. Shows WHO BMI categories instantly.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate BMI",
      "description": "Follow these steps to calculate your Body Mass Index (BMI) using the calculator.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Enter Age",
          "text": "Enter your age (between 2 and 120 years)."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Select Gender",
          "text": "Choose Male or Female."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Enter Height",
          "text": "Input your height in centimeters (cm) or inches."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Enter Weight",
          "text": "Input your weight in kilograms (kg) or pounds (lbs)."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Click Calculate",
          "text": "Press the Calculate button to instantly get your BMI result and category."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a BMI Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A BMI Calculator measures your Body Mass Index using your height and weight. It helps to know if your weight is underweight, healthy, overweight, or obese."
          }
        },
        {
          "@type": "Question",
          "name": "What is the normal BMI range?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "According to WHO, a normal BMI is between 18.5 and 24.9."
          }
        },
        {
          "@type": "Question",
          "name": "Which formula is used to calculate BMI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BMI = Weight (kg) / [Height (m)]² in metric system or BMI = (Weight (lbs) ÷ Height (in)²) × 703 in imperial system."
          }
        },
        {
          "@type": "Question",
          "name": "What does a high BMI mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A high BMI usually indicates overweight or obesity, which can increase the risk of health conditions like diabetes, heart disease, and hypertension."
          }
        },
        {
          "@type": "Question",
          "name": "Is BMI accurate for everyone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BMI is a general indicator, but it may not accurately represent body fat in athletes, children, elderly, or very muscular individuals."
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
    langHeader && bmicalculatorMeta[langHeader as keyof typeof bmicalculatorMeta]
      ? langHeader
      : "en";

  const meta = bmicalculatorMeta[language as keyof typeof bmicalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('bmi-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('bmi-calculator', 'en'),
        'es': getCanonicalUrl('bmi-calculator', 'es'),
        'pt-BR': getCanonicalUrl('bmi-calculator', 'br'),
        'pl': getCanonicalUrl('bmi-calculator', 'pl'),
        'de': getCanonicalUrl('bmi-calculator', 'de'),
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

export default async function BmiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="bmi-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {children}
    </>
  );
}
