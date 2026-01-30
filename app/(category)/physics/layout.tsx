import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for physics
const physicsMeta = {
  en: {
    title: "Physics Calculator – Formulas & Results Online | TheSmartCalculator",
    description: "Use the Physics Calculator to solve formulas, laws, and exercises. Accurate, free online tool for students and professionals in physics calculations and analysis.",
    keywords: "physics calculator, solve formulas, physics laws, exercise tool, online physics, student calculator, professional tool, free physics calculator"
  },
  br: {
    title: "Calculadora de Física – Fórmulas Online | TheSmartCalculator",
    description: "Use a Calculadora de Física para resolver fórmulas, leis e exercícios. Ferramenta online rápida e precisa para estudantes e profissionais em análises.",
    keywords: "calculadora de física, resolver fórmulas, leis exercícios, ferramenta física online, estudantes profissionais, precisa calculadora, análise física"
  },
  pl: {
    title: "Kalkulator Fizyka – Oblicz Wyniki Online | TheSmartCalculator",
    description: "Użyj kalkulatora fizyka online, aby szybko obliczać siłę, energię i inne wzory fizyczne. Proste, dokładne i darmowe narzędzie do nauki fizyki.",
    keywords: "kalkulator fizyka, obliczać siłę, energia wzory, narzędzie fizyka online, nauka fizyki, darmowy kalkulator, dokładne obliczenia"
  },
  de: {
    title: "Physik Rechner – Formeln Berechnen Online | TheSmartCalculator",
    description: "Mit dem Physik Rechner können Sie Geschwindigkeit, Energie und Kraft berechnen. Verwenden Sie den Physik Rechner für genaue physikalische Berechnungen in Studium und Beruf.",
    keywords: "physik rechner, formeln berechnen, geschwindigkeit energie, kraft tool, online physik, genaue berechnungen, kostenloser rechner"
  },
  es: {
    title: "Calculadora de Física – Fórmulas y Resultados | TheSmartCalculator",
    description: "Usa la Calculadora de Física para resolver fórmulas, leyes y ejercicios. Herramienta online gratuita y precisa para estudiantes y profesionales en física.",
    keywords: "calculadora de física, resolver fórmulas, leyes físicas, herramienta de ejercicios, física online"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && physicsMeta[langHeader as keyof typeof physicsMeta]
      ? langHeader
      : "en";

  const meta = physicsMeta[language as keyof typeof physicsMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('physics', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCategoryCanonicalUrl('physics', 'en'),
        'en': getCategoryCanonicalUrl('physics', 'en'),
        'pt-BR': getCategoryCanonicalUrl('physics', 'br'),
        'pl': getCategoryCanonicalUrl('physics', 'pl'),
        'de': getCategoryCanonicalUrl('physics', 'de'),
        'es': getCategoryCanonicalUrl('physics', 'es'),
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

export default async function PhysicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
