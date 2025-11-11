import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for size-to-weight-rectangular-cuboid-calculator
const sizetoweightrectangularcuboidcalculatorMeta = {
  en: {
    title: "Size to Weight Rectangular Cuboid Calculator – Online | TheSma",
    description: "Use the Size to Weight Rectangular Cuboid Calculator to calculate weight based on dimensions and density. Accurate, free online tool for materials and engineering.",
    keywords: "size to weight calculator, rectangular cuboid, dimension weight, online size, density calculation, materials tool, engineering weight, weight estimate"
  },
  br: {
    title: "Size to Weight Rectangular Cuboid Calculator – Online | TheSma",
    description: "Use a Calculadora Tamanho Peso Cuboide Retangular para calcular peso baseado em dimensões e densidade. Ferramenta precisa e gratuita para materiais e engenharia.",
    keywords: "calculadora tamanho peso, cuboide retangular, peso dimensão, online tamanho, cálculo densidade, ferramenta materiais, peso engenharia, estimativa peso"
  },
  pl: {
    title: "Size to Weight Rectangular Cuboid Calculator – Online | TheSma",
    description: "Użyj kalkulatora rozmiaru do wagi prostopadłościanu do obliczenia wagi na podstawie wymiarów i gęstości. Dokładne, darmowe narzędzie do materiałów i inżynierii.",
    keywords: "kalkulator rozmiaru wagi, prostopadłościan retangularny, waga wymiar, online rozmiar, obliczenia gęstości, narzędzie materiałów, waga inżynieria, estymacja wagi"
  },
  de: {
    title: "Size to Weight Rectangular Cuboid Calculator – Online | TheSma",
    description: "Berechne mit dem Größe zu Gewicht Rechteckiger Kuboid Rechner Gewicht basierend auf Abmessungen und Dichte. Präzises, kostenloses Tool für Materialien und Ingenieur.",
    keywords: "größe zu gewicht rechner, rechteckiger kuboid, dimension gewicht, online größe, densität berechnung, materials tool, ingenieur gewicht, gewicht schätzung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && sizetoweightrectangularcuboidcalculatorMeta[langHeader as keyof typeof sizetoweightrectangularcuboidcalculatorMeta]
      ? langHeader
      : "en";

  const meta = sizetoweightrectangularcuboidcalculatorMeta[language as keyof typeof sizetoweightrectangularcuboidcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'en'),
        'pt-BR': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'br'),
        'pl': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'pl'),
        'de': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
    },
  };
}

export default async function SizeToWeightRectangularCuboidCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
