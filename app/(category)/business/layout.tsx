import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for business
const businessMeta = {
  en: {
    title: "Business Calculator – Startup & Entrepreneurship Tools | TheSmartCalculator",
    description: "Use the Business Calculator for startups, entrepreneurship, and business planning. Accurate, free online tools for ROI, valuation, budgeting, and financial projections.",
    keywords: "business calculator, startup tool, entrepreneurship calculator, business planning, ROI calculator, valuation tool, free business tools, financial projections"
  },
  br: {
    title: "Calculadora Negócios – Ferramentas Startups | TheSmartCalculator",
    description: "Use a Calculadora Negócios para startups, empreendedorismo e planejamento empresarial. Ferramentas gratuitas para ROI, avaliação, orçamento e projeções financeiras.",
    keywords: "calculadora negócios, ferramenta startup, calculadora empreendedorismo, planejamento empresarial, calculadora ROI, avaliação negócios, ferramentas gratuitas"
  },
  pl: {
    title: "Kalkulator Biznes – Narzędzia dla Startupów | TheSmartCalculator",
    description: "Skorzystaj z kalkulatora biznes dla startupów, przedsiębiorczości i planowania biznesowego. Dokładne narzędzia online dla ROI, wyceny, budżetowania i prognoz finansowych.",
    keywords: "kalkulator biznes, narzędzie startup, kalkulator przedsiębiorczości, planowanie biznesowe, kalkulator ROI, narzędzie wyceny, darmowe narzędzia biznesowe"
  },
  de: {
    title: "Geschäft Rechner – Startup & Unternehmenstools | TheSmartCalculator",
    description: "Nutzen Sie den Geschäft Rechner für Startups, Unternehmertum und Geschäftsplanung. Kostenlose Online-Tools für ROI, Bewertung, Budgetierung und Finanzprognosen.",
    keywords: "geschäft rechner, startup tool, unternehmertum rechner, geschäftsplanung, ROI rechner, bewertungstool, kostenlose geschäftstools"
  },
  es: {
    title: "Calculadora Negocios – Herramientas Startups | TheSmartCalculator",
    description: "Usa la Calculadora Negocios para startups, emprendimiento y planificación empresarial. Herramientas gratuitas para ROI, valoración, presupuesto y proyecciones financieras.",
    keywords: "calculadora negocios, herramienta startup, calculadora emprendimiento, planificación empresarial, calculadora ROI, valoración negocio, herramientas gratuitas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && businessMeta[langHeader as keyof typeof businessMeta]
      ? langHeader
      : "en";

  const meta = businessMeta[language as keyof typeof businessMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('business', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCategoryCanonicalUrl('business', 'en'),
        'pt-BR': getCategoryCanonicalUrl('business', 'br'),
        'pl': getCategoryCanonicalUrl('business', 'pl'),
        'de': getCategoryCanonicalUrl('business', 'de'),
        'es': getCategoryCanonicalUrl('business', 'es'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
