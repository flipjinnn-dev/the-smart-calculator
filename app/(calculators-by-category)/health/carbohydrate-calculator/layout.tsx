import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for carbohydrate-calculator
const carbohydratecalculatorMeta = {
  en: {
    title: "Carbohydrate Calculator – Daily Needs Online | TheSmartCalculator",
    description: "Use the Carbohydrate Calculator to estimate daily needs based on activity and goals. Accurate, free online tool for diet balancing and nutrition planning.",
    keywords: "carbohydrate calculator, daily needs, activity tool, goals calculation, online carb, diet balancing, free carb tool, nutrition planning"
  },
  br: {
    title: "Calculadora Carboidratos – Ingestão Diária Ideal",
    description: "Use a Calculadora de Carboidratos para saber quantos consumir por dia. Equilibre sua dieta e mantenha energia e saúde com precisão online.",
    keywords: "calculadora carboidratos, ingestão diária, consumir dia, dieta equilíbrio, energia saúde, precisa online, metas calculadora"
  },
  pl: {
    title: "Kalkulator Węglowodanów – Spożycie Online | TheSmartCalculator",
    description: "Użyj kalkulatora węglowodanów online, aby obliczyć dzienne spożycie węglowodanów i kalorie. Proste, dokładne i darmowe narzędzie dietetyczne do planowania.",
    keywords: "kalkulator węglowodanów, spożycie dzienne, obliczyć kalorie, narzędzie dietetyczne, online węglowodany, dokładne darmowe, planowanie diety"
  },
  de: {
    title: "Kohlenhydrate Rechner – Bedarf Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Kohlenhydrate Rechner deinen täglichen Bedarf. Ideal für Diät, Fitness & gesunde Ernährung – schnell, präzise und kostenlos online!",
    keywords: "kohlenhydrate rechner, bedarf berechnen, täglichen bedarf, diät fitness, gesunde ernährung, schnell präzise, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && carbohydratecalculatorMeta[langHeader as keyof typeof carbohydratecalculatorMeta]
      ? langHeader
      : "en";

  const meta = carbohydratecalculatorMeta[language as keyof typeof carbohydratecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('carbohydrate-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }carbohydrate-calculator`,
      languages: {
        'en': getCanonicalUrl('carbohydrate-calculator', 'en'),
        'pt-BR': getCanonicalUrl('carbohydrate-calculator', 'br'),
        'pl': getCanonicalUrl('carbohydrate-calculator', 'pl'),
        'de': getCanonicalUrl('carbohydrate-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }carbohydrate-calculator`,
    },
  };
}

export default async function CarbohydrateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
