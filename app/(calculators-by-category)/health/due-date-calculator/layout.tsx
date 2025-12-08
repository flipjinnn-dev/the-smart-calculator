import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for due-date-calculator
const duedatecalculatorMeta = {
  en: {
    title: "Due Date Calculator – Pregnancy Timeline Online | TheSmartCalculator",
    description: "Use the Due Date Calculator to estimate date based on last period or conception. Accurate, free online tool for pregnancy tracking and planning.",
    keywords: "due date calculator, pregnancy timeline, last period, conception tool, online due, tracking calculator, free date tool, planning pregnancy"
  },
  br: {
    title: "Calculadora Data Vencimento – Descubra Sua DPP",
    description: "Use a Calculadora de Data de Vencimento para estimar a data provável do parto. Acompanhe sua gestação com praticidade e precisão online.",
    keywords: "calculadora data vencimento, dpp estimar, parto provável, acompanhe gestação, online data, precisão praticidade, período base"
  },
  pl: {
    title: "Kalkulator Terminu Porodu – Oblicz Datę Porodu Online",
    description: "Użyj kalkulatora terminu porodu online, aby dokładnie obliczyć przewidywaną datę porodu. Proste, szybkie i darmowe narzędzie dla przyszłych mam do śledzenia.",
    keywords: "kalkulator terminu porodu, data porodu, obliczyć przewidywana, narzędzie mamy, online termin, szybkie darmowe, śledzenie ciąża"
  },
  de: {
    title: "Fristenrechner – Online Berechnung gesetzlicher Fristen",
    description: "Nutzen Sie den Fristenrechner zur exakten Berechnung von Kündigungs-, Einspruchs- oder Zahlungsfristen. Der Fristenrechner unterstützt Sie zuverlässig bei Zeitgrenzen.",
    keywords: "fristenrechner, fristen berechnen, kündigungs einspruchs, zahlungsfristen tool, online fristen, zuverlässig unterstützt, zeitgrenzen rechner"
  }
,
  es: {
    title: "Calculadora de Fecha de Vencimiento – Calcula Fácil y Rápido",
    description: "Calcula la fecha de vencimiento al instante con nuestra herramienta precisa. ¡Evita retrasos y organiza tus fechas importantes ahora mismo",
    keywords: "calculadora, fecha, vencimiento, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, evita, retrasos, organiza, fechas, importantes"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && duedatecalculatorMeta[langHeader as keyof typeof duedatecalculatorMeta]
      ? langHeader
      : "en";

  const meta = duedatecalculatorMeta[language as keyof typeof duedatecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('due-date-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }due-date-calculator`,
      languages: {
        'en': getCanonicalUrl('due-date-calculator', 'en'),
        'pt-BR': getCanonicalUrl('due-date-calculator', 'br'),
        'pl': getCanonicalUrl('due-date-calculator', 'pl'),
        'de': getCanonicalUrl('due-date-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }due-date-calculator`,
    },
  };
}

export default async function DueDateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.thesmartcalculator.com/#website",
      "url": "https://www.thesmartcalculator.com/",
      "name": "The Smart Calculator",
      "description": "Free online calculators for health, finance, math and more.",
      "publisher": {
        "@type": "Organization",
        "name": "The Smart Calculator",
        "url": "https://www.thesmartcalculator.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "REPLACE_WITH_PUBLISHER_LOGO_URL"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.thesmartcalculator.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://www.thesmartcalculator.com/health/due-date-calculator#breadcrumb",
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
          "name": "Due Date Calculator",
          "item": "https://www.thesmartcalculator.com/health/due-date-calculator"
        }
      ]
    },

    {
      "@type": "WebPage",
      "@id": "https://www.thesmartcalculator.com/health/due-date-calculator#webpage",
      "url": "https://www.thesmartcalculator.com/health/due-date-calculator",
      "name": "Pregnancy Due Date Calculator - The Smart Calculator",
      "isPartOf": {
        "@id": "https://www.thesmartcalculator.com/#website"
      },
      "breadcrumb": {
        "@id": "https://www.thesmartcalculator.com/health/due-date-calculator#breadcrumb"
      },
      "description": "Estimate your pregnancy due date using LMP, conception date, ultrasound or IVF. Shows gestational age, due date and uncertainty window.",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "REPLACE_WITH_PAGE_IMAGE_URL",
        "width": 1200,
        "height": 628
      },
      "publisher": {
        "@type": "Organization",
        "name": "The Smart Calculator",
        "url": "https://www.thesmartcalculator.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "REPLACE_WITH_PUBLISHER_LOGO_URL"
        }
      },
      "author": {
        "@type": "Person",
        "name": "REPLACE_WITH_AUTHOR_NAME",
        "url": "REPLACE_WITH_AUTHOR_PROFILE_URL"
      },
      "datePublished": "REPLACE_WITH_ISO_DATE_PUBLISHED",
      "dateModified": "REPLACE_WITH_ISO_DATE_MODIFIED",
      "mainEntity": {
        "@type": "WebApplication",
        "name": "Pregnancy Due Date Calculator",
        "url": "https://www.thesmartcalculator.com/health/due-date-calculator",
        "description": "Calculate expected date of delivery (EDD) from LMP, conception, ultrasound or IVF transfer. Shows gestational age in weeks + days and estimated due-date range.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires Javascript for date input and calculation",
        "featureList": [
          "LMP based due date (adjustable cycle length)",
          "Ultrasound dating",
          "Conception date based estimate",
          "IVF/ET based precise dating",
          "Shows gestational age (weeks + days)",
          "Displays uncertainty window (± days)"
        ]
      }
    },

    {
      "@type": "FAQPage",
      "@id": "https://www.thesmartcalculator.com/health/due-date-calculator#faqs",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is the due date calculated using LMP?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The standard LMP method estimates EDD by adding 280 days (40 weeks) to the first day of the last menstrual period, with adjustments for cycle length if different from 28 days."
          }
        },
        {
          "@type": "Question",
          "name": "Which method is most accurate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IVF/embryo transfer dates are most precise (± a few days). Early ultrasound dating is generally more accurate than LMP when LMP is uncertain."
          }
        },
        {
          "@type": "Question",
          "name": "Can this calculator replace medical advice?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This tool provides an estimate only. Consult your healthcare provider for clinical dating and prenatal care."
          }
        }
      ]
    }
  ]
}
  return <>
    {children}
    <Script
      id="due-date-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
