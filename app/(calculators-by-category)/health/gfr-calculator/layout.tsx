import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for gfr-calculator
const gfrcalculatorMeta = {
  en: {
    title: "GFR Calculator – Filtration Rate Online | TheSmartCalculator",
    description: "Use the GFR Calculator to estimate Glomerular Filtration Rate from creatinine. Accurate, free online tool for kidney health monitoring and medical assessment.",
    keywords: "gfr calculator, glomerular filtration rate, creatinine tool, online gfr, kidney health, medical assessment, free gfr tool, rate estimate"
  },
  br: {
    title: "Calculadora GFR – Filtração Renal Online | TheSmartCalculator",
    description: "Use a Calculadora GFR para estimar taxa de filtração glomerular de creatinina. Ferramenta precisa para monitoramento de saúde renal e avaliação médica.",
    keywords: "calculadora gfr, taxa filtração glomerular, ferramenta creatinina, online gfr, saúde renal, avaliação médica, gratuita tool"
  },
  pl: {
    title: "Kalkulator GFR – Filtracja Online | TheSmartCalculator",
    description: "Użyj kalkulatora GFR online, aby obliczyć wskaźnik filtracji kłębuszkowej i ocenić funkcję nerek. Proste, dokładne i darmowe narzędzie zdrowotne.",
    keywords: "kalkulator gfr, wskaźnik filtracji kłębuszkowej, narzędzie kreatynina, online gfr, zdrowie nerek, ocena medyczna, darmowy tool"
  },
  de: {
    title: "GFR Rechner – Nierenfunktion Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem GFR Rechner deine Nierenfunktion schnell und genau. Ideal zur Kontrolle der Gesundheit – einfach & kostenlos online für medizinische Bewertung.",
    keywords: "gfr rechner, glomeruläre filtrationsrate, kreatinin tool, online gfr, nieren gesundheit, medizinische bewertung, kostenloser gfr tool, rate schätzung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && gfrcalculatorMeta[langHeader as keyof typeof gfrcalculatorMeta]
      ? langHeader
      : "en";

  const meta = gfrcalculatorMeta[language as keyof typeof gfrcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('gfr-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }gfr-calculator`,
      languages: {
        'en': getCanonicalUrl('gfr-calculator', 'en'),
        'pt-BR': getCanonicalUrl('gfr-calculator', 'br'),
        'pl': getCanonicalUrl('gfr-calculator', 'pl'),
        'de': getCanonicalUrl('gfr-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }gfr-calculator`,
    },
  };
}

export default async function GfrCalculatorLayout({
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
        "publisher": {
          "@type": "Organization",
          "name": "The Smart Calculator",
          "url": "https://www.thesmartcalculator.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.thesmartcalculator.com/path-to-your-logo.png"
          }
        }
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.thesmartcalculator.com/health/gfr-calculator#webpage",
        "url": "https://www.thesmartcalculator.com/health/gfr-calculator",
        "name": "GFR Calculator — Estimate eGFR (CKD-EPI, MDRD, Schwartz)",
        "description": "Free online GFR (eGFR) calculator supporting CKD-EPI 2021 (race-free), MDRD (IDMS), and Schwartz (pediatric). Includes CKD staging, limitations and clinical notes.",
        "isPartOf": {
          "@id": "https://www.thesmartcalculator.com/#website"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.thesmartcalculator.com/path-to-preview-image.jpg",
          "width": 1200,
          "height": 630
        },
        "datePublished": "2024-01-01",
        "dateModified": "2025-09-01",
        "lastReviewedBy": {
          "@type": "Person",
          "name": "[REPLACE: Dr. Full Name]",
          "description": "Nephrology reviewer"
        },
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": "GFR (eGFR) Calculator",
          "url": "https://www.thesmartcalculator.com/health/gfr-calculator",
          "applicationCategory": "MedicalWebApplication",
          "operatingSystem": "Web",
          "isAccessibleForFree": true,
          "description": "Calculates estimated glomerular filtration rate using CKD-EPI 2021 (race-free), MDRD (IDMS) and Schwartz (pediatric) formulas. Accepts serum creatinine in mg/dL or µmol/L and offers automatic unit conversion.",
          "featureList": [
            "CKD-EPI 2021 (race-free) formula",
            "MDRD (IDMS-traceable) formula",
            "Schwartz bedside formula for pediatrics (requires height)",
            "Unit conversion mg/dL ↔ µmol/L",
            "CKD staging interpretation"
          ],
          "softwareVersion": "1.0",
          "author": {
            "@type": "Organization",
            "name": "The Smart Calculator",
            "url": "https://www.thesmartcalculator.com/"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.thesmartcalculator.com/health/gfr-calculator#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What formulas does this GFR calculator use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This tool supports the CKD-EPI 2021 race-free equation for adults, the MDRD (IDMS-traceable) equation, and the bedside Schwartz formula for children (height required)."
            }
          },
          {
            "@type": "Question",
            "name": "Which units are accepted for serum creatinine?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can enter serum creatinine in mg/dL or µmol/L. The calculator converts units automatically (1 mg/dL ≈ 88.42 µmol/L)."
            }
          },
          {
            "@type": "Question",
            "name": "Is this a medical diagnosis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. The eGFR value is an estimate and for informational use only. It should not replace professional medical evaluation. Consult your healthcare provider for interpretation and clinical decisions."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="gfr-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
