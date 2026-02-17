import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for gpa-calculator
const gpacalculatorMeta = {
  en: {
    title: "GPA Calculator",
    description: "Calculate GPA accurately using our GPA Calculator for students and academic planning.",
    keywords: "gpa calculator, calculate gpa, grade average, academic tool, online gpa, student calculator, performance tracker, free gpa tool"
  },
  br: {
    title: "Calculadora GPA",
    description: "Use a calculadora GPA para calcular sua média acadêmica facilmente. Planeje seus estudos e descubra seu desempenho agora mesmo!",
    keywords: "calculadora gpa, calcular gpa, índice acadêmico, ferramenta estudantes, desempenho notas, calculadora online gpa, progresso escolar"
  },
  pl: {
    title: "Kalkulator Średniej Ocen – Oblicz Średnią | TheSmartCalculator",
    description: "Użyj kalkulatora średniej ocen online, aby szybko obliczyć średnią z przedmiotów i ocen. Proste, dokładne i darmowe narzędzie edukacyjne do śledzenia postępów.",
    keywords: "kalkulator średniej ocen, obliczyć średnią, średnia przedmiotów, narzędzie edukacyjne, oceny online, darmowy kalkulator średnia, postępy szkolne"
  },
  de: {
    title: "GPA Rechner – Notendurchschnitt Berechnen | TheSmartCalculator",
    description: "Berechne mit dem GPA Rechner deinen Notendurchschnitt aus Fächern und Noten. Schnelles, genaues und kostenloses Tool für Schüler zur Leistungsüberwachung.",
    keywords: "gpa rechner, notendurchschnitt berechnen, fach noten, schüler tool, online gpa, kostenloser rechner, leistungs tracker"
  },
  es: {
    title: "Calculadora de GPA – Calcula tu Promedio Académico Fácil",
    description: "Calcula tu GPA al instante con nuestra herramienta rápida y precisa. ¡Conoce tu promedio académico y planifica tu éxito universitario ahora mismo!",
    keywords: "calculadora, calcula, promedio, académico, fácil, nuestra, herramienta, rápida, precisa, conoce, planifica, éxito, universitario, ahora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && gpacalculatorMeta[langHeader as keyof typeof gpacalculatorMeta]
      ? langHeader
      : "en";

  const meta = gpacalculatorMeta[language as keyof typeof gpacalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('gpa-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('gpa-calculator', 'en'),
        'en': getCanonicalUrl('gpa-calculator', 'en'),
        'es': getCanonicalUrl('gpa-calculator', 'es'),
        'pt-BR': getCanonicalUrl('gpa-calculator', 'br'),
        'pl': getCanonicalUrl('gpa-calculator', 'pl'),
        'de': getCanonicalUrl('gpa-calculator', 'de'),
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

export default async function GpaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "GPA Calculator",
    "url": "https://www.thesmartcalculator.com/gpa-calculator",
    "description": "Free online GPA Calculator to calculate semester or cumulative GPA using course grades and credit hours accurately.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "GPA Calculator",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Accurate weighted GPA calculation",
          "Supports multiple courses and credit hours",
          "Flexible grading scales",
          "Instant results",
          "Mobile-friendly and free"
        ],
        "url": "https://www.thesmartcalculator.com/gpa-calculator"
      },
      {
        "@type": "HowTo",
        "name": "GPA Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "GPA Calculator",
            "text": "Input the letter grade (e.g., A, B+, B) for each course."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "GPA Calculator",
            "text": "Add the credit hours corresponding to each course."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "GPA Calculator",
            "text": "Enter all courses for the semester or cumulative calculation."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "GPA Calculator",
            "text": "Get the weighted GPA instantly."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "GPA Calculator",
            "text": "View the accurate GPA calculated for your courses."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a GPA Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates your GPA based on grades and credit hours."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the GPA Calculator is completely free."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need any software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it works directly in any web browser."
            }
          },
          {
            "@type": "Question",
            "name": "Can it handle multiple courses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can enter all courses for accurate GPA calculation."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support different grading scales?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most calculators allow the standard 4.0 scale or custom scales."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate cumulative GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by adding multiple semesters or course sets."
            }
          },
          {
            "@type": "Question",
            "name": "Is it mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on smartphones, tablets, and desktops."
            }
          },
          {
            "@type": "Question",
            "name": "Can it help with scholarship eligibility?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can estimate if your GPA meets scholarship requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Does it provide accurate results?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it uses standard weighted GPA formulas for precise calculation."
            }
          },
          {
            "@type": "Question",
            "name": "Can I plan my grades with it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can simulate the grades needed to reach a target GPA."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="gpa-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
