import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for scientific-calculator
const scientificcalculatorMeta = {
  en: {
    title: "Scientific Calculator Advanced Calculations",
    description: "Perform complex calculations instantly using our Scientific Calculator for students and professionals.",
    keywords: "scientific calculator, advanced calculations, graphing tool, online scientific, science tool, engineering calculator, education math, free scientific tool"
  },
  br: {
    title: "Scientific Calculator – Advanced Calculations Online | TheSmar",
    description: "Use a Calculadora Científica para realizar cálculos matemáticos avançados e gráficos. Ferramenta precisa e gratuita para ciência, engenharia e educação.",
    keywords: "calculadora científica, cálculos avançados, ferramenta gráficos, online científica, ferramenta ciência, calculadora engenharia, matemática educação, gratuita ferramenta científica"
  },
  pl: {
    title: "Kalkulator Naukowy – Obliczenia Matematyczne Online",
    description: "Użyj kalkulatora naukowego online, aby wykonywać zaawansowane obliczenia matematyczne, funkcje i wzory. Proste, szybkie i darmowe narzędzie.",
    keywords: "kalkulator naukowy, zaawansowane obliczenia, narzędzie wykresy, online naukowy, narzędzie nauka, kalkulator inżynieria, matematyka edukacja, darmowe narzędzie naukowe"
  },
  de: {
    title: "Wissenschaftlicher Taschenrechner – Online & kostenlos nutzen",
    description: "Nutze den wissenschaftlichen Taschenrechner online für komplexe Berechnungen. Schnell, genau & kostenlos – ideal für Schule, Studium & Technik!",
    keywords: "wissenschaftlicher taschenrechner, fortgeschrittene berechnungen, graphing tool, online wissenschaftlich, wissenschaft tool, ingenieur rechner, bildung math, kostenloser wissenschaftlich tool"
  }
,
  es: {
    title: "Calculadora Científica Online – Cálculos Rápidos y Precisos",
    description: "Realiza operaciones científicas avanzadas al instante. Funciones trigonométricas, logarítmicas, potencias y más. ¡Usa la calculadora online ahora!",
    keywords: "calculadora, científica, online, cálculos, rápidos, precisos, realiza, operaciones, científicas, avanzadas, instante, funciones, trigonométricas, logarítmicas, potencias"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && scientificcalculatorMeta[langHeader as keyof typeof scientificcalculatorMeta]
      ? langHeader
      : "en";

  const meta = scientificcalculatorMeta[language as keyof typeof scientificcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('scientific-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('scientific-calculator', 'en'),
        'en': getCanonicalUrl('scientific-calculator', 'en'),
        'es': getCanonicalUrl('scientific-calculator', 'es'),
        'pt-BR': getCanonicalUrl('scientific-calculator', 'br'),
        'pl': getCanonicalUrl('scientific-calculator', 'pl'),
        'de': getCanonicalUrl('scientific-calculator', 'de'),
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

export default async function ScientificCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Scientific Calculator",
    "url": "https://www.thesmartcalculator.com/maths/scientific-calculator",
    "description": "Free online Scientific Calculator to perform advanced math functions including trigonometry, logarithms, exponents, roots, and powers. Ideal for students, professionals, and everyday use.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Scientific Calculator",
        "applicationCategory": "MathCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Trigonometry, logarithms, exponents, roots, and powers",
          "Instant calculations",
          "Memory storage for numbers",
          "Mobile-friendly interface",
          "Free and easy to use"
        ],
        "url": "https://www.thesmartcalculator.com/maths/scientific-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Scientific Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Scientific Calculator",
            "text": "Type the numbers or formulas you want to calculate."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Scientific Calculator",
            "text": "Choose math functions like sin, cos, tan, log, ln, √, x², or e^x."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Scientific Calculator",
            "text": "Add parentheses for complex calculations to ensure correct order of operations."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Scientific Calculator",
            "text": "Get the result instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a scientific calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A scientific calculator performs advanced calculations including trigonometry, logarithms, exponents, roots, and powers."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is completely free to use online on all devices."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it on mobile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the interface is mobile-friendly and responsive."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to install software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it works directly in your browser."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support complex calculations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it supports parentheses and follows the correct order of operations."
            }
          },
          {
            "@type": "Question",
            "name": "Can I store numbers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, memory functions are available to store and recall numbers."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is perfect for homework, practice, and exams."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for engineers and scientists?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it supports advanced scientific and engineering calculations."
            }
          },
          {
            "@type": "Question",
            "name": "Does it show history of calculations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most versions display a history of previous calculations for review."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides precise results for all supported functions."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="scientific-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
