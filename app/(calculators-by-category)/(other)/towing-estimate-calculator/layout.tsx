import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for towing-estimate-calculator
const towingEstimateCalculatorMeta = {
  en: {
    title: "Towing Estimate Calculator",
    description: "Calculate towing costs quickly using our Towing Estimate Calculator for fast quotes.",
    keywords: "towing, estimate, calculator, cost, vehicle, distance, roadside assistance, flatbed, towing service"
  },
  br: {
    title: "Calculadora de Custo de Reboque",
    description: "Use a calculadora de custo de reboque para saber quanto custa chamar um reboque de carro, calcular preço por km e estimar o valor total do serviço.",
    keywords: "reboque, custo, calculadora, veículo, distância, assistência na estrada, plataforma, serviço de reboque"
  },
  pl: {
    title: "Kalkulator Kosztów Holowania – Oblicz Koszty Natychmiast",
    description: "Oblicz koszty holowania na podstawie typu pojazdu, odległości, lokalizacji, pory dnia i dodatkowych usług ze szczegółowym podziałem kosztów",
    keywords: "holowanie, koszty, kalkulator, pojazd, odległość, pomoc drogowa, platforma, usługa holowania"
  },
  de: {
    title: "Abschleppkosten-Rechner – Berechnen Sie Kosten Sofort",
    description: "Berechnen Sie Abschleppkosten basierend auf Fahrzeugtyp, Entfernung, Standort, Tageszeit und zusätzlichen Dienstleistungen mit detaillierter Kostenaufschlüsselung",
    keywords: "abschleppen, kosten, rechner, fahrzeug, entfernung, pannenhilfe, plateau, abschleppdienst"
  },
  es: {
    title: "Calculadora de Costos de Remolque – Calcule Costos Instantáneamente",
    description: "Calcule los costos de remolque según el tipo de vehículo, distancia, ubicación, hora del día y servicios adicionales con desglose detallado de costos",
    keywords: "remolque, costos, calculadora, vehículo, distancia, asistencia en carretera, plataforma, servicio de remolque"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && towingEstimateCalculatorMeta[langHeader as keyof typeof towingEstimateCalculatorMeta]
      ? langHeader
      : "en";

  const meta = towingEstimateCalculatorMeta[language as keyof typeof towingEstimateCalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('towing-estimate-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('towing-estimate-calculator', 'en'),
        'en': getCanonicalUrl('towing-estimate-calculator', 'en'),
        'es': getCanonicalUrl('towing-estimate-calculator', 'es'),
        'pt-BR': getCanonicalUrl('towing-estimate-calculator', 'br'),
        'pl': getCanonicalUrl('towing-estimate-calculator', 'pl'),
        'de': getCanonicalUrl('towing-estimate-calculator', 'de'),
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

export default async function TowingEstimateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Towing Estimate Calculator",
            "item": "https://www.thesmartcalculator.com/towing-estimate-calculator"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.thesmartcalculator.com/#organization",
        "name": "Towing Estimate Calculator",
        "alternateName": "Towing Cost Calculator",
        "url": "https://www.thesmartcalculator.com/towing-estimate-calculator",
        "logo": "https://www.thesmartcalculator.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1 614-596-2581",
          "contactType": "technical support",
          "contactOption": "TollFree",
          "areaServed": ["US","GB","DE","ES","PL","PT"],
          "availableLanguage": ["en","es","German","Polish","Portuguese"]
        },
        "sameAs": [
          "https://x.com/SmartCalculat0r",
          "https://www.instagram.com/thesmartcalculators/",
          "https://www.youtube.com/@TheSmartCalculators",
          "https://www.linkedin.com/company/smart-calculator/",
          "https://www.pinterest.com/thesmartcalculators/_saved/",
          "https://www.thesmartcalculator.com/"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Towing Estimate Calculator",
        "operatingSystem": "All",
        "applicationCategory": "UtilityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "bestRating": "5",
          "ratingCount": "1500"
        }
      }
    ]
  };

  return <>
    {children}
    <Script
      id="towing-estimate-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
