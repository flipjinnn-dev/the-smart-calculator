import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for house-affordability-calculator
const houseaffordabilitycalculatorMeta = {
  en: {
    title: "House Affordability Calculator – How Much House Can You Afford?",
    description: "Use our How Much House Can I Afford Calculator to quickly estimate your home budget. Plan smart and find out the right house you can comfortably buy.",
    keywords: "house affordability calculator, affordable house, income expenses, online affordability, home buying, planning tool, free house calculator, determine affordability"
  },
  br: {
    title: "Calculadora de Acessibilidade à Casa",
    description: "Use nossa Calculadora de Acessibilidade à Casa para descobrir quanto você pode pagar. Planeje seu orçamento e encontre a casa ideal que cabe no seu bolso.",
    keywords: "Calculadora de Acessibilidade à Casa, affordable haus, einkommen ausgaben, online affordabilität, hauskauf, planung tool, kostenloser haus rechner, affordabilität bestimmen"
  },
  pl: {
    title: "Na Jakie Mieszkanie Mnie Stać – Kalkulator Domu",
    description: "Sprawdź, na jakie mieszkanie Cię stać z naszym Kalkulatorem Dostępności Domu. Szybko oblicz budżet i znajdź idealne mieszkanie dla siebie.",
    keywords: "cKalkulator Dostępności Domu, Wycena Nieruchomości, online acessibilidade, compra casa, ferramenta planejamento, gratuita calculadora, determinar acessibilidade"
  },
  de: {
    title: "Wie viel Haus kann ich mir leisten",
    description: "Finden Sie heraus, wie viel Haus Sie sich leisten können mit unserem Haus Erschwinglichkeitsrechner. Einfach Budget berechnen und passende Immobilie finden.",
    keywords: "Wie viel Haus kann ich mir leisten, affordable house, income expenses, online affordability, home buying, planning tool, kostenlos house rechner, determine affordability"
  }
,
  es: {
    title: "Calculadora de asequibilidad de vivienda",
    description: "Usa nuestra Calculadora de Asequibilidad de Vivienda para descubrir cuánto puedes pagar por una casa. Calcula tu presupuesto y encuentra la vivienda ideal.",
    keywords: "Calculadora de asequibilidad de vivienda, asequibilidad, vivienda, encuentra, hogar, calcula, cuánto, puedes, pagar, según, ingresos, gastos, planifica, compra, casa"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && houseaffordabilitycalculatorMeta[langHeader as keyof typeof houseaffordabilitycalculatorMeta]
      ? langHeader
      : "en";

  const meta = houseaffordabilitycalculatorMeta[language as keyof typeof houseaffordabilitycalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('house-affordability-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('house-affordability-calculator', 'en'),
        'en': getCanonicalUrl('house-affordability-calculator', 'en'),
        'es': getCanonicalUrl('house-affordability-calculator', 'es'),
        'pt-BR': getCanonicalUrl('house-affordability-calculator', 'br'),
        'pl': getCanonicalUrl('house-affordability-calculator', 'pl'),
        'de': getCanonicalUrl('house-affordability-calculator', 'de'),
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

export default async function HouseAffordabilityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
