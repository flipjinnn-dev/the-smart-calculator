import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for pregnancy-conception-calculator
const pregnancyconceptioncalculatorMeta = {
  en: {
    title: "Pregnancy Conception Calculator",
    description: "Predict fertile days with our Pregnancy Conception Calculator to boost pregnancy chances.",
    keywords: "pregnancy conception calculator, conception date, milestones tool, online conception, due date based, ultrasound, pregnancy planning, free milestone tool"
  },
  br: {
    title: "Calculadora de Concepção de Gravidez",
    description: "Use a calculadora de concepção de gravidez para estimar seus dias férteis. Planeje sua gestação e simule sua concepção agora mesmo!",
    keywords: "calculadora concepção gravidez, data concepção, ferramenta marcos, online concepção, baseado data parto, ultrassom, planejamento gravidez, gratuita ferramenta marco"
  },
  pl: {
    title: "Pregnancy Conception Calculator – Milestones Online | TheSmart",
    description: "Użyj kalkulatora poczęcia ciąży online, aby oszacować datę poczęcia i kamienie milowe na podstawie daty porodu lub USG. Dokładne, darmowe narzędzie do planowania ciąży.",
    keywords: "kalkulator poczęcia ciąża, data poczęcia, narzędzie kamieni milowych, online poczęcia, na podstawie data porodu, usg, planowanie ciąża, darmowe narzędzie kamień milowy"
  },
  de: {
    title: "Pregnancy Conception Calculator – Milestones Online | TheSmart",
    description: "Nutzen Sie den pregnancy conception  – milestones online | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher.",
    keywords: "schwangerschaftsempfängnis rechner, empfängnis datum, meilensteine tool, online empfängnis, geburtstermin basierend, ultrasound, schwangerschaft planung, kostenloser meilenstein tool"
  }
,
  es: {
    title: "Calculadora de Fecha de Concepción – Calcula Fácil y Rápido",
    description: "Calcula la fecha de concepción al instante con nuestra herramienta precisa. ¡Planifica tu embarazo, estima fechas y obtén resultados ahora mismo!",
    keywords: "calculadora, fecha, concepción, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, planifica, embarazo, estima, fechas, obtén"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pregnancyconceptioncalculatorMeta[langHeader as keyof typeof pregnancyconceptioncalculatorMeta]
      ? langHeader
      : "en";

  const meta = pregnancyconceptioncalculatorMeta[language as keyof typeof pregnancyconceptioncalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pregnancy-conception-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('pregnancy-conception-calculator', 'en'),
        'en': getCanonicalUrl('pregnancy-conception-calculator', 'en'),
        'es': getCanonicalUrl('pregnancy-conception-calculator', 'es'),
        'pt-BR': getCanonicalUrl('pregnancy-conception-calculator', 'br'),
        'pl': getCanonicalUrl('pregnancy-conception-calculator', 'pl'),
        'de': getCanonicalUrl('pregnancy-conception-calculator', 'de'),
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

export default async function PregnancyConceptionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.thesmartcalculator.com/#organization",
        "name": "The Smart Calculator",
        "url": "https://www.thesmartcalculator.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.thesmartcalculator.com/path-to-logo.png",
          "width": 600,
          "height": 60
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.thesmartcalculator.com/#website",
        "url": "https://www.thesmartcalculator.com/",
        "name": "The Smart Calculator",
        "publisher": {
          "@id": "https://www.thesmartcalculator.com/#organization"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.thesmartcalculator.com/health/pregnancy-conception-calculator",
        "url": "https://www.thesmartcalculator.com/health/pregnancy-conception-calculator",
        "name": "Pregnancy Conception Calculator",
        "description": "Estimate conception date, ovulation window and pregnancy milestones from LMP, due date, ultrasound or IVF transfer. Not a substitute for medical advice.",
        "inLanguage": "en-US",
        "isPartOf": {
          "@id": "https://www.thesmartcalculator.com/#website"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.thesmartcalculator.com/path-to-feature-image.jpg",
          "width": 1200,
          "height": 630
        },
        "author": {
          "@type": "Person",
          "name": "Content Author Name",
          "url": "https://www.thesmartcalculator.com/authors/author-profile"
        },
        "copyrightHolder": {
          "@id": "https://www.thesmartcalculator.com/#organization"
        },
        "datePublished": "2024-01-01",
        "dateModified": "2025-09-26",
        "dateReviewed": "2025-09-26"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Pregnancy Conception Calculator",
        "url": "https://www.thesmartcalculator.com/health/pregnancy-conception-calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "description": "A web-based calculator that estimates conception date, ovulation window and related pregnancy milestones using LMP, due date, ultrasound or IVF transfer inputs.",
        "featureList": "LMP-based dating, ultrasound dating, IVF-transfer dating, ovulation window estimate",
        "provider": {
          "@id": "https://www.thesmartcalculator.com/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does a pregnancy conception calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It estimates conception using inputs such as last menstrual period (LMP), due date, average cycle length, early ultrasound measurements, or IVF transfer date to calculate an estimated conception window."
            }
          },
          {
            "@type": "Question",
            "name": "Can a calculator tell the exact day I conceived?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No — calculators provide an estimated window. First-trimester ultrasound dating is typically more accurate than LMP alone."
            }
          },
          {
            "@type": "Question",
            "name": "Which input is most accurate: LMP or ultrasound?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Early first-trimester ultrasound is generally more accurate for dating than LMP, especially if menstrual cycles are irregular."
            }
          },
          {
            "@type": "Question",
            "name": "Does this apply to IVF pregnancies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — the calculator supports IVF transfer date inputs for more precise conception estimates when IVF data is available."
            }
          }
        ]
      },
      {
        "@type": "MedicalWebPage",
        "url": "https://www.thesmartcalculator.com/health/pregnancy-conception-calculator",
        "mainEntityOfPage": {
          "@id": "https://www.thesmartcalculator.com/health/pregnancy-conception-calculator"
        },
        "reviewedBy": {
          "@type": "Person",
          "name": "Dr. Jane Doe, MD",
          "description": "Obstetrician & Gynecologist — Medical Review",
          "url": "https://www.thesmartcalculator.com/reviewers/dr-jane-doe"
        },
        "lastReviewed": "2025-09-26",
        "about": {
          "@type": "Thing",
          "name": "Pregnancy dating, conception estimation, ovulation window"
        }
      }
    ]
  }
  return <>
    {children}
    <Script
      id="pregnancy-conception-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
