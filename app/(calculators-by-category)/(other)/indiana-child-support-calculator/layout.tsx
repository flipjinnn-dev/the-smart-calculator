import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for indiana-child-support-calculator
const indianachildsupportcalculatorMeta = {
  en: {
    title: "Indiana Child Support Calculator",
    description: "Estimate child support payments using our Indiana Child Support Calculator for accurate planning.",
    keywords: "indiana child support calculator, estimate payments, child support tool, income calculation, custody estimator, online child support, free indiana tool, family budgeting"
  },
  br: {
    title: "Calculadora de Pensão Alimentícia de Indiana",
    description: "Use a calculadora de pensão alimentícia de Indiana para estimar o valor de pagamento com precisão — ferramenta online gratuita e fácil de usar.",
    keywords: "calculadora pensão indiana, estimar pagamentos, pensão infantil tool, renda cálculo, custódia estimativa, online pensão, gratuita ferramenta indiana"
  },
  pl: {
    title: "Indiana Child Support Calculator – Estimate Payments | TheSmar",
    description: "Użyj kalkulatora wsparcia dziecka Indiana, aby oszacować płatności na podstawie dochodu i opieki. Dokładne, darmowe narzędzie online do planowania prawnego w Indiana.",
    keywords: "kalkulator wsparcia dziecka indiana, obliczyć płatności, wsparcie tool, dochód obliczenia, opieka estymacja, online wsparcie, darmowy tool indiana"
  },
  de: {
    title: "Indiana Child Support Calculator – Estimate Payments | TheSmar",
    description: "Berechne mit dem Indiana Kindesunterhalt Rechner Zahlungen basierend auf Einkommen und Sorgerecht. Präzises, kostenloses Online-Tool für rechtliche Planung in Indiana.",
    keywords: "indiana kindesunterhalt rechner, zahlungen schätzen, unterhalt tool, einkommen berechnung, sorgerecht estimator, online unterhalt, kostenloser indiana tool"
  },
  es: {
    title: "Calculadora de Manutención Infantil – Calcula Fácil y Rápido",
    description: "Calcula la manutención infantil al instante con nuestra herramienta precisa. ¡Conoce los pagos justos y planifica el bienestar de tus hijos ahora mismo!",
    keywords: "calculadora, manutención, infantil, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, conoce, pagos, justos, planifica, bienestar"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && indianachildsupportcalculatorMeta[langHeader as keyof typeof indianachildsupportcalculatorMeta]
      ? langHeader
      : "en";

  const meta = indianachildsupportcalculatorMeta[language as keyof typeof indianachildsupportcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('indiana-child-support-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('indiana-child-support-calculator', 'en'),
        'en': getCanonicalUrl('indiana-child-support-calculator', 'en'),
        'es': getCanonicalUrl('indiana-child-support-calculator', 'es'),
        'pt-BR': getCanonicalUrl('indiana-child-support-calculator', 'br'),
        'pl': getCanonicalUrl('indiana-child-support-calculator', 'pl'),
        'de': getCanonicalUrl('indiana-child-support-calculator', 'de'),
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

export default async function IndianaChildSupportCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Indiana Child Support Calculator",
    "url": "https://www.thesmartcalculator.com/indiana-child-support-calculator",
    "description": "Free Indiana Child Support Calculator to estimate support payments based on income, custody, number of children, and child-related expenses.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Indiana Child Support Calculator",
        "applicationCategory": "FinancialApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Estimate child support obligations under Indiana guidelines",
          "Include income, custody, children count, and expenses",
          "Quick calculation with detailed breakdown",
          "Free and mobile-friendly",
          "Useful for budgeting, legal planning, and custody decisions"
        ],
        "url": "https://www.thesmartcalculator.com/indiana-child-support-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Indiana Child Support Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Indiana Child Support Calculator",
            "text": "Input gross weekly or monthly income for each parent."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Indiana Child Support Calculator",
            "text": "Add any prior child support or spousal maintenance obligations."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Indiana Child Support Calculator",
            "text": "Enter the number of children requiring support."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Indiana Child Support Calculator",
            "text": "Include childcare costs, health insurance, or other relevant expenses."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Indiana Child Support Calculator",
            "text": "Enter overnights or custody arrangement."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Indiana Child Support Calculator",
            "text": "View estimated child support obligation instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the Indiana Child Support Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It estimates child support payments based on Indiana state guidelines."
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
            "name": "Do I need software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it works directly in any browser."
            }
          },
          {
            "@type": "Question",
            "name": "Does it calculate exact court orders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, results are estimates; actual court orders may vary."
            }
          },
          {
            "@type": "Question",
            "name": "Can it include childcare and insurance costs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can input relevant child-related expenses."
            }
          },
          {
            "@type": "Question",
            "name": "Does it account for custody or parenting time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, shared custody and overnights affect the estimate."
            }
          },
          {
            "@type": "Question",
            "name": "Can it handle multiple children?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can enter the number of children for support calculation."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for legal planning?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides guideline estimates but not legal advice."
            }
          },
          {
            "@type": "Question",
            "name": "Can incomes be adjusted for deductions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, prior obligations like existing support or maintenance can be included."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate are results?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Results are reliable based on inputs, but court-ordered support may differ."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="indiana-child-support-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
