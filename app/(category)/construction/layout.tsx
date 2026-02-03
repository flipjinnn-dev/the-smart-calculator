import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for construction
const constructionMeta = {
  en: {
    title: "Construction Calculators",
    description: "Explore free construction calculators for board feet, cubic yards, material coverage, weight conversions, and base estimates to plan projects easily and accurately.",
    keywords: "construction calculator, materials calculator, building costs, renovation tool, online construction, estimate materials, construction measurements, free building calculator"
  },
  br: {
    title: "Calculadora de Construção – Materiais Online | TheSmartCalculator",
    description: "Use a construction  – materials & costs tool | thesmartcalculator para obter resultados rápidos e precisos. Entradas simples, saídas claras e contexto útil — gr.",
    keywords: "calculadora de construção, calcular materiais, custos construção, ferramenta obras online, reforma calculadora, medidas construção, calculadora gratuita construção, kalkylator budownictwo"
  },
  pl: {
    title: "Kalkulator Budowa – Koszty Materiały Online | TheSmartCalculator",
    description: "Skorzystaj z kalkulatora budowa online, aby szybko obliczyć koszty, materiały i powierzchnię. Proste, dokładne i darmowe narzędzie dla projektów budowy, remontów i planowania.",
    keywords: "kalkulator budowa, obliczyć koszty budowa, materiały budowa, powierzchnia kalkulator, narzędzie budowa online, remonty kalkulator, darmowy kalkulator budowa"
  },
  de: {
    title: "Konstruktion Rechner – Bau Online Tools | TheSmartCalculator",
    description: "Konstruktion online berechnen: Nutzen Sie kostenlose Tools für Bau, Technik und Planung. Präzise Berechnungen für Material, Kosten und Maße – ideal für Projekte und Renovierungen.",
    keywords: "konstruktion rechner, bau tools, technik berechnen, material kalkulator, kosten konstruktion, online bau rechner, kostenloser konstruktion tool"
  },
  es: {
    title: "Calculadora de Construcción – Materiales y Costos | TheSmartCalculator",
    description: "Estima materiales de construcción, concreto, techos y pies tablares. Herramienta precisa y gratuita para contratistas y aficionados al bricolaje.",
    keywords: "calculadora de construcción, estimar materiales, concreto, calculadora de techos, pies tablares"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && constructionMeta[langHeader as keyof typeof constructionMeta]
      ? langHeader
      : "en";

  const meta = constructionMeta[language as keyof typeof constructionMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('construction', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCategoryCanonicalUrl('construction', 'en'),
        'en': getCategoryCanonicalUrl('construction', 'en'),
        'pt-BR': getCategoryCanonicalUrl('construction', 'br'),
        'pl': getCategoryCanonicalUrl('construction', 'pl'),
        'de': getCategoryCanonicalUrl('construction', 'de'),
        'es': getCategoryCanonicalUrl('construction', 'es'),
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

export default async function ConstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
