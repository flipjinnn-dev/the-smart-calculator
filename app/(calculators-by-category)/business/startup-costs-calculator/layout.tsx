import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for startup-costs-calculator
const startupcostscalculatorMeta = {
  en: {
    title: "Startup Costs Calculator – Estimate Launch Budget",
    description: "Calculate startup costs including equipment, licenses, marketing, and operating expenses. Free tool to estimate total investment needed to launch your business.",
    keywords: "startup costs calculator, business startup costs, launch budget, startup expenses, initial investment, business costs, startup capital, operating expenses, equipment costs, licensing fees, startup funding"
  },
  br: {
    title: "Calculadora Custos Iniciais – Orçamento de Startup",
    description: "Calcule custos iniciais incluindo equipamentos, licenças, marketing e despesas operacionais. Ferramenta gratuita para estimar investimento total do negócio.",
    keywords: "calculadora custos iniciais, custos startup, orçamento lançamento, despesas iniciais, investimento inicial, custos negócio, capital startup, despesas operacionais, custos equipamentos"
  },
  pl: {
    title: "Kalkulator Kosztów Startowych – Budżet Uruchomienia",
    description: "Oblicz koszty startowe w tym sprzęt, licencje, marketing i wydatki operacyjne. Darmowe narzędzie do oszacowania całkowitej inwestycji w biznes.",
    keywords: "kalkulator kosztów startowych, koszty startup, budżet uruchomienia, wydatki początkowe, inwestycja początkowa, koszty biznesu, kapitał startowy, wydatki operacyjne"
  },
  de: {
    title: "Startup-Kosten Rechner – Gründungsbudget Schätzen",
    description: "Berechnen Sie Startup-Kosten inkl. Ausrüstung, Lizenzen, Marketing und Betriebskosten. Kostenloses Tool zur Schätzung der Gesamtinvestition für Ihr Unternehmen.",
    keywords: "startup-kosten rechner, gründungskosten, startbudget, anfangskosten, erstinvestition, unternehmenskosten, startkapital, betriebskosten, ausrüstungskosten, lizenzgebühren"
  },
  es: {
    title: "Calculadora Costos Iniciales – Presupuesto Startup",
    description: "Calcula costos iniciales incluyendo equipos, licencias, marketing y gastos operativos. Herramienta gratuita para estimar inversión total del negocio.",
    keywords: "calculadora costos iniciales, costos startup, presupuesto lanzamiento, gastos iniciales, inversión inicial, costos negocio, capital startup, gastos operativos, costos equipos"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && startupcostscalculatorMeta[langHeader as keyof typeof startupcostscalculatorMeta]
      ? langHeader
      : "en";

  const meta = startupcostscalculatorMeta[language as keyof typeof startupcostscalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('startup-costs-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('startup-costs-calculator', 'en'),
        'en': getCanonicalUrl('startup-costs-calculator', 'en'),
        'es': getCanonicalUrl('startup-costs-calculator', 'es'),
        'pt-BR': getCanonicalUrl('startup-costs-calculator', 'br'),
        'pl': getCanonicalUrl('startup-costs-calculator', 'pl'),
        'de': getCanonicalUrl('startup-costs-calculator', 'de'),
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

export default async function StartupCostsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
