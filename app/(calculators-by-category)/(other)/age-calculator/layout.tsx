import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for age-calculator
const agecalculatorMeta = {
  en: {
    title: "Age Calculator – Exact Age Online Tool | TheSmartCalculator",
    description: "Use the Age  – Exact Age Online Tool | TheSmartCalculator calculator to get instant, accurate results. Fast inputs, clear outputs, and helpful context for quick.",
    keywords: "age calculator, calculate age, exact age, birthdate age, online age tool, age in months, age in days, free age calculator"
  },
  br: {
    title: "Calculadora de Idade – Idade Exata Online | TheSmartCalculator",
    description: "Use a age – exact age online tool | thesmartcalculator para obter resultados rápidos e precisos. Entradas simples, saídas claras e contexto útil — grátis e fác.",
    keywords: "calculadora de idade, calcular idade, idade exata, idade data nascimento, ferramenta idade online, idade em meses, idade em dias, calculadora idade gratuita"
  },
  pl: {
    title: "Kalkulator Wieku – Oblicz Wiek Online | TheSmartCalculator",
    description: "Użyj age  – exact age online tool | thesmartcalculator do szybkich i dokładnych wyników. Proste dane wejściowe, czytelne wyniki i pomocny kontekst — za darmo i.",
    keywords: "kalkulator wieku, obliczyć wiek, dokładny wiek, wiek data urodzenia, narzędzie wiek online, wiek w miesiącach, wiek w dniach, darmowy kalkulator wieku"
  },
  de: {
    title: "Altersrechner – Alter Berechnen Online | TheSmartCalculator",
    description: "Nutzen Sie den age  – exact age online tool | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher Kontext — kos.",
    keywords: "altersrechner, alter berechnen, genaues alter, geburtsdatum alter, online alter tool, alter in monaten, alter in tagen, kostenloser altersrechner"
  },
  es: {
    title: "Calculadora de Edad – Descubre tu Edad Exacta al Instante",
    description: "Calcula tu edad exacta al instante con nuestra herramienta rápida y precisa. ¡Descúbrelo ahora y lleva un control de tu tiempo de manera fácil!",
    keywords: "calculadora, edad, descubre, exacta, instante, calcula, nuestra, herramienta, rápida, precisa, descúbrelo, ahora, lleva, control, tiempo"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && agecalculatorMeta[langHeader as keyof typeof agecalculatorMeta]
      ? langHeader
      : "en";

  const meta = agecalculatorMeta[language as keyof typeof agecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('age-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('age-calculator', 'en'),
        'es': getCanonicalUrl('age-calculator', 'es'),
        'pt-BR': getCanonicalUrl('age-calculator', 'br'),
        'pl': getCanonicalUrl('age-calculator', 'pl'),
        'de': getCanonicalUrl('age-calculator', 'de'),
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

export default async function AgeCalculatorLayout({
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
          "name": "Age Calculator",
          "item": "https://www.thesmartcalculator.com/age-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Height Calculator",
          "item": "https://www.thesmartcalculator.com/height-calculator"
        }
      ]
    },

    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "Age Calculator",
      "alternateName": "Age Calculator",
      "url": "https://www.thesmartcalculator.com/age-calculator",
      "logo": "https://www.thesmartcalculator.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 614-596-2581",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": ["US","GB","PL","PT","DE","ES"],
        "availableLanguage": ["en","Polish","Portuguese","es","German"]
      },
      "sameAs": [
        "https://x.com/SmartCalculat0r",
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.linkedin.com/company/smart-calculator/",
        "https://www.pinterest.com/thesmartcalculators/",
        "https://www.thesmartcalculator.com/"
      ]
    },

    {
      "@type": "SoftwareApplication",
      "name": "Age Calculator",
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
        "ratingCount": "1900"
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
        "reviewBody": "Accurate and easy-to-use Age Calculator. Perfect for students and anyone who needs precise age calculations."
      }
    },

    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an Age Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It calculates exact age in years, months, and days from a given date of birth."
          }
        },
        {
          "@type": "Question",
          "name": "Is this calculator free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it’s completely free to use."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need software or installation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, it works directly in your browser."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use it on mobile devices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it’s fully mobile-friendly."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate age for a future or past date?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can select any reference date."
          }
        },
        {
          "@type": "Question",
          "name": "Does it account for leap years?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it accurately considers leap years and month lengths."
          }
        },
        {
          "@type": "Question",
          "name": "Can it show total days or weeks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Some versions provide total days or weeks lived."
          }
        },
        {
          "@type": "Question",
          "name": "Is it suitable for students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it’s simple and accurate for learning purposes."
          }
        },
        {
          "@type": "Question",
          "name": "Can it be used for official documents?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It’s good for estimates, but official documents require proof like a birth certificate."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It provides precise calculations based on the standard Gregorian calendar."
          }
        }
      ]
    }

  ]
}
  return <>
    {children}
    <Script
      id="age-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
