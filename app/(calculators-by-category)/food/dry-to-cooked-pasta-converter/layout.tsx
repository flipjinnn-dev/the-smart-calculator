import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for dry-to-cooked-pasta-converter
const drytocookedpastaconverterMeta = {
  en: {
    title: "Dry to Cooked Pasta Converter – Measurements Online | TheSmart",
    description: "Use the Dry to Cooked Pasta Converter to convert dry measurements to cooked equivalents. Accurate, free online tool for cooking and portion planning.",
    keywords: "dry to cooked pasta converter, measurements tool, equivalents calculation, online pasta, cooking planning, portion calculator, free converter, pasta estimate"
  },
  br: {
    title: "Conversor Macarrão Cru para Cozido – Medidas Precisas",
    description: "Use o Conversor de Macarrão Cru para Cozido para calcular a quantidade exata de massa pronta. Cozinhe com precisão e evite desperdícios na receita.",
    keywords: "conversor macarrão cru, cozido quantidade, precisão receita, evitar desperdícios, online conversor, porções tool, gratuita medida"
  },
  pl: {
    title: "Przelicznik Makaronu Suchego na Gotowany – Online Szybko",
    description: "Użyj przelicznika makaronu suchego na gotowany online, aby obliczyć równoważne miary. Dokładne, darmowe narzędzie do gotowania i planowania porcji.",
    keywords: "przelicznik makaronu suchego, gotowany miary, obliczyć równoważne, narzędzie gotowania, online makaron, planowanie porcji, darmowy tool"
  },
  de: {
    title: "Dry to Cooked Pasta Converter – Measurements Online | TheSmart",
    description: "Umrechne mit dem Trocken zu Gekochte Pasta Umrechner trockene Maße zu gekochten Äquivalenten. Präzises Tool für Kochen und Portionsplanung kostenlos.",
    keywords: "trocken gekochte pasta umrechner, maße tool, äquivalente berechnung, online pasta, kochen planning, portionen rechner, kostenloser tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && drytocookedpastaconverterMeta[langHeader as keyof typeof drytocookedpastaconverterMeta]
      ? langHeader
      : "en";

  const meta = drytocookedpastaconverterMeta[language as keyof typeof drytocookedpastaconverterMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('dry-to-cooked-pasta-converter', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }dry-to-cooked-pasta-converter`,
      languages: {
        'en': getCanonicalUrl('dry-to-cooked-pasta-converter', 'en'),
        'pt-BR': getCanonicalUrl('dry-to-cooked-pasta-converter', 'br'),
        'pl': getCanonicalUrl('dry-to-cooked-pasta-converter', 'pl'),
        'de': getCanonicalUrl('dry-to-cooked-pasta-converter', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }dry-to-cooked-pasta-converter`,
    },
  };
}

export default async function DryToCookedPastaConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
