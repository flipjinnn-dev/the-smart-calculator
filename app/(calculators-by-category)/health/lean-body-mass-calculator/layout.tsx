import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for lean-body-mass-calculator
const leanbodymasscalculatorMeta = {
  en: {
    title: "Lean Body Mass Calculator – Weight Fat Online | TheSmartCalculator",
    description: "Use the Lean Body Mass Calculator to estimate mass based on weight and fat percentage. Accurate, free online tool for fitness and health tracking.",
    keywords: "lean body mass calculator, mass estimate, weight fat, online lean, fitness tracking, health tool, free mass calculator, body mass"
  },
  br: {
    title: "Calculadora Massa Corporal Magra – Descubra Seu Percentual Ideal",
    description: "Use a Calculadora de Massa Corporal Magra para estimar massa baseada em peso e porcentagem de gordura. Ferramenta precisa para rastreamento de fitness e saúde.",
    keywords: "calculadora massa magra, estimativa massa, peso gordura, online magra, rastreamento fitness, ferramenta saúde, gratuita calculadora massa, massa corporal"
  },
  pl: {
    title: "Kalkulator Masy Ciała Chudego – Oblicz Procent Tłuszczu",
    description: "Użyj kalkulatora masy ciała chudego online, aby oszacować masę na podstawie wagi i procentu tłuszczu. Dokładne, darmowe narzędzie do fitness i zdrowia.",
    keywords: "kalkulator masy chudego, estymacja masy, waga tłuszcz, online chudy, tracking fitness, narzędzie zdrowie, darmowy kalkulator masy, masa ciała"
  },
  de: {
    title: "Lean Body Mass Rechner – Körperfettanteil einfach berechnen",
    description: "Berechne mit dem Lean Body Mass Rechner Masse basierend auf Gewicht und Fettanteil. Präzises, kostenloses Tool für Fitness und Gesundheits-Tracking.",
    keywords: "lean body mass rechner, masse schätzung, gewicht fett, online lean, fitness tracking, gesundheit tool, kostenloser mass rechner, körper masse"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && leanbodymasscalculatorMeta[langHeader as keyof typeof leanbodymasscalculatorMeta]
      ? langHeader
      : "en";

  const meta = leanbodymasscalculatorMeta[language as keyof typeof leanbodymasscalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('lean-body-mass-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }lean-body-mass-calculator`,
      languages: {
        'en': getCanonicalUrl('lean-body-mass-calculator', 'en'),
        'pt-BR': getCanonicalUrl('lean-body-mass-calculator', 'br'),
        'pl': getCanonicalUrl('lean-body-mass-calculator', 'pl'),
        'de': getCanonicalUrl('lean-body-mass-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }lean-body-mass-calculator`,
    },
  };
}

export default async function LeanBodyMassCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
