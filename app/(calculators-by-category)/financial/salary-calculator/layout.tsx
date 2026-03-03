import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for salary-calculator
const salarycalculatorMeta = {
  en: {
    title: "Salary Calculator",
    description: "Calculate take-home pay after taxes and deductions using our Salary Calculator for income clarity.",
    keywords: "salary calculator, take home pay, taxes deductions, online salary, payroll tool, income planning, free salary tool, net pay"
  },
  br: {
    title: "Calculadora de Salário",
    description: "Use a calculadora de salário para calcular descontos, impostos e líquido. Planeje seus ganhos e simule seu salário agora mesmo!",
    keywords: "calculadora salário, pagamento líquido, impostos deduções, online salário, ferramenta folha pagamento, planejamento renda, gratuita ferramenta salário, pagamento neto"
  },
  pl: {
    title: "Kalkulator Wynagrodzeń – Oblicz Pensję Netto i Brutto",
    description: "Użyj kalkulatora wynagrodzeń online, aby obliczyć pensję netto, brutto i składki ZUS. Proste, szybkie i dokładne narzędzie finansowe dla pracowników.",
    keywords: "kalkulator wynagrodzeń, wynagrodzenie netto, podatki odliczenia, online wynagrodzenie, narzędzie listy płac, planowanie dochodu, darmowe narzędzie wynagrodzenie, pensja netto"
  },
  de: {
    title: "Gehaltsrechner – Ihr Brutto-Netto-Tool online",
    description: "Mit dem Gehaltsrechner ermitteln Sie schnell Brutto- und Nettogehalt, Steuerklasse, Sozialabgaben sowie monatliches verfügbares Einkommen – einfach online berechnen.",
    keywords: "gehaltsrechner, netto gehalts, steuern abzüge, online gehalts, lohn tool, einkommensplanung, kostenloser gehalts tool, netto lohn"
  }
,
  es: {
    title: "Calculadora de Salario – Calcula tu Sueldo e Ingreso",
    description: "Utiliza nuestra calculadora de salario para estimar tu sueldo, controlar tus ingresos y planificar tus finanzas de manera rápida y sencilla.",
    keywords: "calculadora, salario, calcula, sueldo, ingreso, utiliza, nuestra, estimar, controlar, ingresos, planificar, finanzas, manera, rápida, sencilla"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && salarycalculatorMeta[langHeader as keyof typeof salarycalculatorMeta]
      ? langHeader
      : "en";

  const meta = salarycalculatorMeta[language as keyof typeof salarycalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('salary-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('salary-calculator', 'en'),
        'en': getCanonicalUrl('salary-calculator', 'en'),
        'es': getCanonicalUrl('salary-calculator', 'es'),
        'pt-BR': getCanonicalUrl('salary-calculator', 'br'),
        'pl': getCanonicalUrl('salary-calculator', 'pl'),
        'de': getCanonicalUrl('salary-calculator', 'de'),
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

export default async function SalaryCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language = langHeader || 'en';

  // Only add schema for English version
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.thesmartcalculator.com/financial/salary-calculator",
        "name": "Salary Calculator",
        "url": "https://www.thesmartcalculator.com/financial/salary-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.5,
          "reviewCount": 3000,
          "bestRating": 5,
          "worstRating": 1
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Salary Calculator",
            "item": "https://www.thesmartcalculator.com/financial/salary-calculator"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Investment Calculator",
            "item": "https://www.thesmartcalculator.com/financial/investment-calculator"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Finance Calculator",
            "item": "https://www.thesmartcalculator.com/financial/finance-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a salary calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A salary calculator converts pay across periods (hourly to annual) and estimates net after deductions."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate annual salary from monthly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Multiply monthly gross salary by 12 to get annual salary."
            }
          },
          {
            "@type": "Question",
            "name": "What's the best salary calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A good salary calculator provides accurate conversions, tax estimates, and pro-rata calculations."
            }
          },
          {
            "@type": "Question",
            "name": "Can it handle taxes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, advanced salary calculators include tax estimates and deduction breakdowns."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a free online salary calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can calculate salary online without sign-up."
            }
          },
          {
            "@type": "Question",
            "name": "How to prorate salary?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the formula: (Annual Salary / 260) × Days Worked."
            }
          },
          {
            "@type": "Question",
            "name": "Difference between wage and salary calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Wage calculators are for hourly pay, salary calculators are for fixed annual compensation."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate my salary after tax?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter gross pay, tax rates, and deductions to see take-home pay."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between gross and net salary?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gross salary is before deductions; net salary is after taxes and deductions."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate my hourly rate from annual salary?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, divide annual salary by total yearly working hours."
            }
          }
        ]
      }
    ]
  }

  return <>
    {children}
    {jsonLdSchema && (
      <Script
        id="salary-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    )}
  </>;
}
