import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata
const enterpriseSeoMeta = {
  en: { 
    title: "Enterprise SEO ROI Calculator", 
    description: "Estimate SEO returns using our Enterprise SEO ROI Calculator for marketers and businesses." },
  pl: { title: "Enterprise SEO ROI Kalkulator", description: "Oblicz the return on investment (ROI) dla enterprise SEO." },
  br: { title: "Calculadora de ROI de SEO Empresarial", description: "Use a calculadora de ROI de SEO empresarial para medir o retorno dos seus investimentos. Planeje suas estratégias e maximize resultados agora mesmo!" },
  de: { title: "Unternehmens-SEO-ROI-Rechner", description: "Berechnen Sie die Rendite (ROI) für Unternehmens-SEO. Optimieren Sie Ihr digitales Marketingbudget." },
  es: { title: "Calculadora de ROI SEO – Mide tu Retorno Rápido y Fácil", description: "Calcula el ROI de tus estrategias SEO al instante y optimiza tus inversiones. ¡Descubre cuánto retorno obtienes y mejora tu marketing ahora mismo" },
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && enterpriseSeoMeta[langHeader as keyof typeof enterpriseSeoMeta]
      ? langHeader
      : "en";

  const meta = enterpriseSeoMeta[language as keyof typeof enterpriseSeoMeta];
  const canonicalUrl = getCanonicalUrl('enterprise-seo-roi-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('enterprise-seo-roi-calculator', 'en'),
        'en': getCanonicalUrl('enterprise-seo-roi-calculator', 'en'),
        'es': getCanonicalUrl('enterprise-seo-roi-calculator', 'es'),
        'pt-BR': getCanonicalUrl('enterprise-seo-roi-calculator', 'br'),
        'pl': getCanonicalUrl('enterprise-seo-roi-calculator', 'pl'),
        'de': getCanonicalUrl('enterprise-seo-roi-calculator', 'de'),
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

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Enterprise SEO ROI Calculator",
    "url": "https://www.thesmartcalculator.com/enterprise-seo-roi-calculator",
    "description": "Free Enterprise SEO ROI Calculator to estimate revenue, ROI, and payback period from SEO investments. Ideal for marketing managers, SEO professionals, and business owners.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Enterprise SEO ROI Calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Estimate ROI from SEO investments",
          "Calculate projected revenue from traffic and conversions",
          "Determine payback period for SEO spend",
          "Scenario modeling with different traffic and conversion assumptions",
          "Mobile-friendly and free to use"
        ],
        "url": "https://www.thesmartcalculator.com/enterprise-seo-roi-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Enterprise SEO ROI Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enterprise SEO ROI Calculator",
            "text": "Input monthly organic traffic, conversion rate, and average revenue per conversion."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enterprise SEO ROI Calculator",
            "text": "Include monthly or annual expenses for your SEO team, tools, and agencies."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enterprise SEO ROI Calculator",
            "text": "Provide expected traffic growth from SEO efforts."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Enterprise SEO ROI Calculator",
            "text": "View projected revenue, ROI percentage, and payback period instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an Enterprise SEO ROI Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It estimates ROI, revenue, and payback period from SEO investments."
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
              "text": "No, it works directly in your browser on any device."
            }
          },
          {
            "@type": "Question",
            "name": "Can it estimate revenue?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it calculates projected revenue based on traffic, conversion rate, and average revenue per conversion."
            }
          },
          {
            "@type": "Question",
            "name": "Does it calculate ROI automatically?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, ROI is calculated instantly after entering inputs."
            }
          },
          {
            "@type": "Question",
            "name": "Can I test multiple scenarios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can adjust traffic growth, conversion rates, and SEO costs to see different outcomes."
            }
          },
          {
            "@type": "Question",
            "name": "Is it only for large websites?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is designed for enterprise-level websites but can also be used by smaller businesses."
            }
          },
          {
            "@type": "Question",
            "name": "Can it help justify SEO budgets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides data-driven ROI estimates for decision-making and reporting."
            }
          },
          {
            "@type": "Question",
            "name": "Does it include payback period?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it estimates how long it will take to recover your SEO investment."
            }
          },
          {
            "@type": "Question",
            "name": "Are results guaranteed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, results are projections based on your input values and assumptions."
            }
          }
        ]
      }
    ]
  }
  return <>
    <Script
      id="enterprise-seo-roi-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
    {children}

  </>
}
