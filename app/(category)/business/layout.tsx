import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for business
const businessMeta = {
  en: {
    title: "Business Calculators",
    description: "Explore free Business Calculators to simplify finance, tax, profit, loan, and investment calculations. Accurate tools for smarter business decisions online.",
    keywords: "business calculator, startup tool, entrepreneurship calculator, business planning, ROI calculator, valuation tool, free business tools, financial projections"
  },
  br: {
    title: "Calculadora de negocios",
    description: "Use nossa Calculadora de Negocios gratuita para calcular lucros, impostos, empréstimos e investimentos. Ferramentas precisas para decisões de negócios inteligentes.",
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
        'x-default': getCategoryCanonicalUrl('business', 'en'),
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

export default async function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
