import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for bmi-calculator
const bmicalculatorMeta = {
  en: {
    title: "BMI Calculator – Body Mass Index Online | TheSmartCalculator",
    description: "Use the BMI Calculator to calculate your Body Mass Index and understand weight status. Accurate, free online tool based on height and weight for health assessment.",
    keywords: "bmi calculator, body mass index, weight status, height weight tool, online bmi, health assessment, free bmi calculator, index calculation"
  },
  br: {
    title: "Calculadora IMC – Massa Corporal Online | TheSmartCalculator",
    description: "Use a Calculadora IMC para descobrir seu índice de massa corporal. Avalie se seu peso está ideal e acompanhe sua saúde com rapidez e precisão baseada em altura.",
    keywords: "calculadora imc, massa corporal, peso ideal, ferramenta saúde, online imc, avaliação peso, precisa calculadora"
  },
  pl: {
    title: "Kalkulator BMI – Masa Ciała Online | TheSmartCalculator",
    description: "Użyj kalkulatora BMI online, aby obliczyć wskaźnik masy ciała i sprawdzić swoją wagę idealną. Proste, dokładne i darmowe narzędzie zdrowotne na podstawie wzrostu.",
    keywords: "kalkulator bmi, masa ciała, waga idealna, narzędzie zdrowotne, online bmi, sprawdź wagę, darmowy tool"
  },
  de: {
    title: "BMI Rechner – Body Mass Index Berechnen | TheSmartCalculator",
    description: "Mit dem BMI Rechner berechnen Sie Ihren Body-Mass-Index schnell & präzise. Finden Sie heraus, ob Ihr Gewicht im gesunden Bereich liegt – jetzt online testen.",
    keywords: "bmi rechner, body mass index, gewicht bereich, online testen, gesunden gewicht, präzise tool, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && bmicalculatorMeta[langHeader as keyof typeof bmicalculatorMeta]
      ? langHeader
      : "en";

  const meta = bmicalculatorMeta[language as keyof typeof bmicalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('bmi-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('bmi-calculator', 'en'),
        'pt-BR': getCanonicalUrl('bmi-calculator', 'br'),
        'pl': getCanonicalUrl('bmi-calculator', 'pl'),
        'de': getCanonicalUrl('bmi-calculator', 'de'),
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

export default async function BmiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
