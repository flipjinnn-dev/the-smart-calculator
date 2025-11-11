import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for pregnancy-conception-calculator
const pregnancyconceptioncalculatorMeta = {
  en: {
    title: "Pregnancy Conception Calculator – Milestones Online | TheSmart",
    description: "Use the Pregnancy Conception Calculator to estimate conception date and milestones based on due date or ultrasound. Accurate, free online tool for pregnancy planning.",
    keywords: "pregnancy conception calculator, conception date, milestones tool, online conception, due date based, ultrasound, pregnancy planning, free milestone tool"
  },
  br: {
    title: "Calculadora Concepção Gravidez – Marcos Online | TheSmartCalculator",
    description: "Use a Calculadora Concepção Gravidez para estimar data de concepção e marcos com base em data de parto ou ultrassom. Ferramenta precisa para planejamento de gravidez.",
    keywords: "calculadora concepção gravidez, data concepção, ferramenta marcos, online concepção, baseado data parto, ultrassom, planejamento gravidez, gratuita ferramenta marco"
  },
  pl: {
    title: "Pregnancy Conception Calculator – Milestones Online | TheSmart",
    description: "Użyj kalkulatora poczęcia ciąży online, aby oszacować datę poczęcia i kamienie milowe na podstawie daty porodu lub USG. Dokładne, darmowe narzędzie do planowania ciąży.",
    keywords: "kalkulator poczęcia ciąża, data poczęcia, narzędzie kamieni milowych, online poczęcia, na podstawie data porodu, usg, planowanie ciąża, darmowe narzędzie kamień milowy"
  },
  de: {
    title: "Pregnancy Conception Calculator – Milestones Online | TheSmart",
    description: "Nutzen Sie den pregnancy conception  – milestones online | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher.",
    keywords: "schwangerschaftsempfängnis rechner, empfängnis datum, meilensteine tool, online empfängnis, geburtstermin basierend, ultrasound, schwangerschaft planung, kostenloser meilenstein tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pregnancyconceptioncalculatorMeta[langHeader as keyof typeof pregnancyconceptioncalculatorMeta]
      ? langHeader
      : "en";

  const meta = pregnancyconceptioncalculatorMeta[language as keyof typeof pregnancyconceptioncalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pregnancy-conception-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }pregnancy-conception-calculator`,
      languages: {
        'en': getCanonicalUrl('pregnancy-conception-calculator', 'en'),
        'pt-BR': getCanonicalUrl('pregnancy-conception-calculator', 'br'),
        'pl': getCanonicalUrl('pregnancy-conception-calculator', 'pl'),
        'de': getCanonicalUrl('pregnancy-conception-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }pregnancy-conception-calculator`,
    },
  };
}

export default async function PregnancyConceptionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
