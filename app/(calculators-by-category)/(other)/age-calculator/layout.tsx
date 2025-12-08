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
    description: "Use a age  – exact age online tool | thesmartcalculator para obter resultados rápidos e precisos. Entradas simples, saídas claras e contexto útil — grátis e fác.",
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
    "@type": "WebPage",
    "name": "Age Calculator",
    "url": "https://www.thesmartcalculator.com/age-calculator",
    "description": "Free online Age Calculator to calculate exact age in years, months, and days based on date of birth. Ideal for students, professionals, and personal use.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Age Calculator",
        "applicationCategory": "Calculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate exact age in years, months, and days",
          "Instant calculation",
          "Mobile-friendly interface",
          "Supports custom reference dates",
          "Free and easy to use"
        ],
        "url": "https://www.thesmartcalculator.com/age-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Age Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Date of Birth",
            "text": "Input your date of birth including day, month, and year."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Age Calculator",
            "text": "Use today’s date or any past or future date as reference."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Age Calculator",
            "text": "Press the calculate button to see your age in years, months, and days instantly."
          }
        ]
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
              "text": "Yes, it is completely free to use online."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need software or installation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it works directly in your web browser."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it on mobile devices?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is fully mobile-friendly."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate age for a future or past date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can select any reference date for calculation."
            }
          },
          {
            "@type": "Question",
            "name": "Does it account for leap years?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it automatically adjusts for leap years and month variations."
            }
          },
          {
            "@type": "Question",
            "name": "Can it show total days or weeks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Some versions provide the total days or weeks lived."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is simple and accurate for learning purposes."
            }
          },
          {
            "@type": "Question",
            "name": "Can it be used for official documents?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is useful for estimates, but official documents require legal proof such as a birth certificate."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides precise calculations for standard Gregorian calendar dates."
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
