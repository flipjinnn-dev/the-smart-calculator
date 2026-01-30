import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for website-cost-calculator
const websitecostcalculatorMeta = {
  en: {
    title: "Website Cost Calculator – Get Accurate Development Quotes",
    description: "Use our Website Cost Calculator to estimate development cost, timeline, and features.Transparent pricing for freelancers or agencies.",
    keywords: "website cost calculator, development cost, timeline, features, freelancers, agencies, transparent pricing"
  },
  br: {
    title: "Calculadora de Costos de Sitio Web – Precio y Tiempo",
    description: "Usa nuestra Calculadora de Costos de Sitio Web para estimar precio, funciones y tiempo de desarrollo. Cálculo claro para freelancers y agencias.",
    keywords: "calculadora de costos de sitio web, precio y tiempo, freelancers, agencias, herramienta gratuita"
  },
  pl: {
    title: "Wycena projektu strony internetowej – szybki kalkulator",
    description: "Skorzystaj z kalkulatora, by poznać wycenę projektu strony internetowej: koszt, czas realizacji i funkcje. Przejrzyste i realistyczne oszacowanie.",
    keywords: "wycena projektu strony internetowej, szybki kalkulator, koszt projektu, strona internetowa, projektowanie stron, kalkulator wyceny"
  },
  de: {
    title: "Website Kostenrechner – Kosten & Zeit online schätzen",
    description: "Nutzen Sie unseren Website Kostenrechner, um Preis, Zeit und Funktionen zu schätzen. Transparente Kalkulation für Freelancer oder Agenturen.",
    keywords: "website kostenrechner, kosten & zeit, online schätzen, fixkosten, variable kosten, rentabilitätsplanung, kostenloses tool"
  },
  es: {
    title: "Calculadora de Custo de Site – Estime o Valor Online",
    description: "Use nossa Calculadora de Custo de Site para estimar preço, prazo e recursos. Transparência total para freelancers ou agências.",
    keywords: "calculadora de custo de site, preço e prazo, freelancers, agências, ferramenta gratuita"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && websitecostcalculatorMeta[langHeader as keyof typeof websitecostcalculatorMeta]
      ? langHeader
      : "en";

  const meta = websitecostcalculatorMeta[language as keyof typeof websitecostcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('website-cost-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('website-cost-calculator', 'en'),
        'en': getCanonicalUrl('website-cost-calculator', 'en'),
        'es': getCanonicalUrl('website-cost-calculator', 'es'),
        'pt-BR': getCanonicalUrl('website-cost-calculator', 'br'),
        'pl': getCanonicalUrl('website-cost-calculator', 'pl'),
        'de': getCanonicalUrl('website-cost-calculator', 'de'),
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

export default async function WebsiteCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
