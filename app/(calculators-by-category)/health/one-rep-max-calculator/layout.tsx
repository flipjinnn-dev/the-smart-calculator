import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for one-rep-max-calculator
const onerepmaxcalculatorMeta = {
  en: {
    title: "One Rep Max Calculator – Strength Online | TheSmartCalculator",
    description: "Use the One Rep Max Calculator to estimate one-rep max for strength training. Accurate, free online tool based on weight and reps for workout planning.",
    keywords: "one rep max calculator, 1rep max, strength estimation, online rep tool, weight reps, workout planning, free max tool, training strength"
  },
  br: {
    title: "Calculadora One Rep Max – Força Online | TheSmartCalculator",
    description: "Use a Calculadora One Rep Max para estimar max para treinamento de força. Ferramenta precisa baseada em peso e reps para planejamento de treino.",
    keywords: "calculadora one rep max, max 1rep, estimativa força, ferramenta online rep, peso reps, planejamento treino, gratuita max tool, força treinamento"
  },
  pl: {
    title: "One Rep Max Calculator – Strength Online | TheSmartCalculator",
    description: "Użyj kalkulatora jednego powtórzenia max online, aby oszacować max do treningu siłowego. Dokładne, darmowe narzędzie na podstawie wagi i powtórzeń do planowania.",
    keywords: "kalkulator jednego powtórzenia max, max 1rep, estymacja siły, narzędzie online rep, waga reps, planowanie trening, darmowe max narzędzie, siła trening, 1RM Rechner – Maximalkraft Berechnen Online | TheSmartCalculator"
  },
  de: {
    title: "One Rep Max Calculator – Strength Online | TheSmartCalculator",
    description: "1rm rechner, 1rep max, kraft schätzung, online rep tool, gewicht reps, workout planung, kostenloser max tool, training kraft",
    keywords: "one rep max rechner, 1rep max, strength estimation, online rep tool, weight reps, workout planning, kostenlos max tool, training strength"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && onerepmaxcalculatorMeta[langHeader as keyof typeof onerepmaxcalculatorMeta]
      ? langHeader
      : "en";

  const meta = onerepmaxcalculatorMeta[language as keyof typeof onerepmaxcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('one-rep-max-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }one-rep-max-calculator`,
      languages: {
        'en': getCanonicalUrl('one-rep-max-calculator', 'en'),
        'pt-BR': getCanonicalUrl('one-rep-max-calculator', 'br'),
        'pl': getCanonicalUrl('one-rep-max-calculator', 'pl'),
        'de': getCanonicalUrl('one-rep-max-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }one-rep-max-calculator`,
    },
  };
}

export default async function OneRepMaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
