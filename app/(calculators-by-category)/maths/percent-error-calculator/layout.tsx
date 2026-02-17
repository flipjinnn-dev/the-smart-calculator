import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for percent-error-calculator
const percenterrorcalculatorMeta = {
  en: {
    title: "Percent Error Calculator Error Percentage",
    description: "Calculate percentage errors fast using our Percent Error Calculator for science, math, and homework.",
    keywords: "percent error calculator, error calculation, estimated actual, online error, scientific tool, math analysis, free error tool, percentage error"
  },
  br: {
    title: "Calculadora de Redução Percentual",
    description: "Use nossa Calculadora de Redução Percentual para calcular descontos e reduções em porcentagem de forma rápida, fácil e gratuita online.",
    keywords: "calculadora erro percentual, cálculo erro, estimado atual, online erro, ferramenta científica, análise matemática, gratuita ferramenta erro, erro porcentagem"
  },
  pl: {
    title: "Kalkulator Błędu Procentowego – Oblicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora błędu procentowego, aby obliczyć błąd procentowy między szacunkową a rzeczywistą wartością. Dokładne, darmowe narzędzie do analizy naukowej i matematycznej.",
    keywords: "kalkulator błędu procentowego, obliczenia błędu, szacunkowa rzeczywista, online błąd, narzędzie naukowe, analiza matematyczna, darmowe narzędzie błąd, błąd procentowy"
  },
  de: {
    title: "Prozentfehler Rechner – Fehler Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Prozentfehler Rechner den Prozentfehler zwischen geschätztem und tatsächlichem Wert. Präzises, kostenloses Tool für wissenschaftliche und math Analyse.",
    keywords: "prozentfehler rechner, fehler berechnung, geschätzt tatsächlich, online fehler, wissenschaftliches tool, math analyse, kostenloser fehler tool, prozent fehler"
  }
,
  es: {
    title: "Calculadora de Error Porcentual – Resultado Preciso y Rápido",
    description: "Calcula el error porcentual en segundos con nuestra herramienta exacta. Ideal para laboratorio, ciencia y matemáticas. ¡Ingresa tus datos y obtén el resultado ya!",
    keywords: "calculadora, error, porcentual, resultado, preciso, rápido, calcula, segundos, nuestra, herramienta, exacta, ideal, laboratorio, ciencia, matemáticas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && percenterrorcalculatorMeta[langHeader as keyof typeof percenterrorcalculatorMeta]
      ? langHeader
      : "en";

  const meta = percenterrorcalculatorMeta[language as keyof typeof percenterrorcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('percent-error-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('percent-error-calculator', 'en'),
        'en': getCanonicalUrl('percent-error-calculator', 'en'),
        'es': getCanonicalUrl('percent-error-calculator', 'es'),
        'pt-BR': getCanonicalUrl('percent-error-calculator', 'br'),
        'pl': getCanonicalUrl('percent-error-calculator', 'pl'),
        'de': getCanonicalUrl('percent-error-calculator', 'de'),
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

export default async function PercentErrorCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Percent Error Calculator - The Complete Guide",
    "url": "https://www.thesmartcalculator.com/maths/percent-error-calculator",
    "description": "Use our Percent Error Calculator to quickly calculate the percentage difference between observed and true values. Complete guide with examples, features, and FAQs.",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com"
    },
    "mainEntity": [
      {
        "@type": "HowTo",
        "name": "How to Use the Percent Error Calculator",
        "description": "Step-by-step guide to calculate percent error using our calculator.",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Enter the Observed Value (your measured or estimated result)."
          },
          {
            "@type": "HowToStep",
            "text": "Enter the True Value (the accepted or reference value)."
          },
          {
            "@type": "HowToStep",
            "text": "Click Calculate to get the percent error instantly."
          },
          {
            "@type": "HowToStep",
            "text": "Analyze the result; lower percentage error indicates higher accuracy."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between Percent Error and Percentage Error?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "They are the same; both represent the accuracy of a measurement."
            }
          },
          {
            "@type": "Question",
            "name": "Why is percent error always positive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Because it uses the absolute value of the difference between observed and true values."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate percent error manually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, using the formula: (|Observed – True| / |True|) × 100."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator suitable for decimals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works with both decimals and whole numbers."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate percent error for multiple measurements?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, calculate each measurement separately to get individual errors."
            }
          },
          {
            "@type": "Question",
            "name": "Is it safe to use online Percent Error Calculators?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, reputable calculators are free and do not collect personal data."
            }
          },
          {
            "@type": "Question",
            "name": "Why should I use a calculator instead of manual calculation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It saves time, reduces mistakes, and provides instant results."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it in financial analysis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it helps compare predicted vs actual outcomes."
            }
          },
          {
            "@type": "Question",
            "name": "What does a low percent error indicate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It shows that your observed value is close to the true value — high accuracy."
            }
          },
          {
            "@type": "Question",
            "name": "Can percent error be greater than 100%?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, if the observed value is much higher or lower than the true value."
            }
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Percent Error Calculator",
        "operatingSystem": "Web",
        "applicationCategory": "Educational / Calculator",
        "url": "https://www.thesmartcalculator.com/maths/percent-error-calculator",
        "description": "Calculate percent error instantly by entering the observed and true values. Easy, accurate, and free online tool."
      }
    ]
  }
  return <>
    <Script
      id="percent-error-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
    {children}
  </>;
}
