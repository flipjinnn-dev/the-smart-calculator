import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for random-number-generator
const randomnumbergeneratorMeta = {
  en: {
    title: "Random Number Generator – Range Online | TheSmartCalculator",
    description: "Use the Random Number Generator to generate random numbers within a specified range. Accurate, free online tool for games, simulations, and testing.",
    keywords: "random number generator, random range, number generator, online random, game tool, simulation random, free random tool, range number"
  },
  br: {
    title: "Generator Números Aleatórios – Intervalo Online | TheSmartCalculator",
    description: "Use o Generator de Números Aleatórios para gerar números aleatórios dentro de um intervalo especificado. Ferramenta precisa e gratuita para jogos, simulações e testes.",
    keywords: "generator números aleatórios, intervalo aleatório, generator número, online aleatório, ferramenta jogo, simulação aleatório, gratuita ferramenta aleatório, número intervalo"
  },
  pl: {
    title: "Generator Liczb Losowych – Zakres Online | TheSmartCalculator",
    description: "Użyj generatora liczb losowych online, aby generować losowe liczby w określonym zakresie. Dokładne, darmowe narzędzie do gier, symulacji i testów.",
    keywords: "generator liczb losowych, zakres losowy, generator liczby, online losowy, narzędzie gra, symulacja losowa, darmowe narzędzie losowe, liczba zakres"
  },
  de: {
    title: "Zufallszahlengenerator – Bereich Online | TheSmartCalculator",
    description: "Erzeuge mit dem Zufallszahlengenerator Zufallszahlen innerhalb eines angegebenen Bereichs. Präzises, kostenloses Tool für Spiele, Simulationen und Tests.",
    keywords: "zufallszahlengenerator, zufallsbereich, zahl generator, online zufall, spiel tool, simulation zufall, kostenloser zufall tool, bereich zahl"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && randomnumbergeneratorMeta[langHeader as keyof typeof randomnumbergeneratorMeta]
      ? langHeader
      : "en";

  const meta = randomnumbergeneratorMeta[language as keyof typeof randomnumbergeneratorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('random-number-generator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }random-number-generator`,
      languages: {
        'en': getCanonicalUrl('random-number-generator', 'en'),
        'pt-BR': getCanonicalUrl('random-number-generator', 'br'),
        'pl': getCanonicalUrl('random-number-generator', 'pl'),
        'de': getCanonicalUrl('random-number-generator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }random-number-generator`,
    },
  };
}

export default async function RandomNumberGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
