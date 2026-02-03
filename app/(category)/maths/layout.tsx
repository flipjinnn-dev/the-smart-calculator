import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for maths
const mathsMeta = {
  en: {
    title: "Math Calculators",
    description: "Explore free online math calculators for percentages, errors, extrema, scientific functions, volume, and square roots to solve problems accurately and quickly.",
    keywords: "math calculator, solve equations, fractions tool, percentage calculator, online math, education tool, problem solver, free math calculator"
  },
  br: {
    title: "Calculadora de Matemática – Equações Online | TheSmartCalculator",
    description: "Use a Calculadora de Matemática para resolver equações, frações e porcentagens. Ferramenta online rápida e precisa para seus cálculos diários e estudos.",
    keywords: "calculadora de matemática, resolver equações, frações porcentagens, ferramenta matemática online, cálculos diários, estudos calculadora, precisa matemática"
  },
  pl: {
    title: "Kalkulator Matematyka – Rozwiązuj Online | TheSmartCalculator",
    description: "Użyj kalkulatora matematyka online, aby szybko rozwiązywać równania, działania i zadania. Proste, dokładne i darmowe narzędzie do nauki matematyki.",
    keywords: "kalkulator matematyka, rozwiązywać równania, działania zadania, narzędzie matematyka online, nauka matematyki, darmowy kalkulator, dokładne obliczenia"
  },
  de: {
    title: "Mathe Rechner – Gleichungen Online Lösen | TheSmartCalculator",
    description: "Mit dem Mathe Rechner können Sie Gleichungen lösen, Brüche berechnen und Formeln anwenden. Verwenden Sie den Mathe Rechner für schnelle Berechnungen in Schule und Alltag.",
    keywords: "mathe rechner, gleichungen lösen, brüche berechnen, formeln tool, online mathe, schule rechner, schnelle berechnungen"
  },
  es: {
    title: "Calculadora de Matemáticas – Resuelve Ecuaciones Online | TheSmartCalculator",
    description: "Usa la Calculadora de Matemáticas para resolver ecuaciones, fracciones y porcentajes. Herramienta precisa y gratuita para educación y resolución de problemas.",
    keywords: "calculadora matemática, resolver ecuaciones, fracciones, calculadora de porcentajes, educación matemática"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && mathsMeta[langHeader as keyof typeof mathsMeta]
      ? langHeader
      : "en";

  const meta = mathsMeta[language as keyof typeof mathsMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('maths', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCategoryCanonicalUrl('maths', 'en'),
        'en': getCategoryCanonicalUrl('maths', 'en'),
        'pt-BR': getCategoryCanonicalUrl('maths', 'br'),
        'pl': getCategoryCanonicalUrl('maths', 'pl'),
        'de': getCategoryCanonicalUrl('maths', 'de'),
        'es': getCategoryCanonicalUrl('maths', 'es'),
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

export default async function MathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
