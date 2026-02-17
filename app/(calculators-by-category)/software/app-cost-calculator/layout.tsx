import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for app-cost-calculator
const appcostcalculatorMeta = {
  en: {
    title: "App Cost Calculator – Estimate Mobile App Development Cost",
    description: "Calculate mobile app development costs instantly. Feature-based pricing, transparent methodology, and accurate market rates for iOS, Android, and cross-platform apps.",
    keywords: "app cost calculator, mobile app development cost, app development estimator, app cost estimator, mobile app pricing, app development calculator, iOS app cost, Android app cost, app budget calculator, MVP app cost, app development pricing tool"
  },
  br: {
    title: "Calculadora de Custo de App – Estimador de Custo de Desenvolvimento",
    description: "Calcule os custos de desenvolvimento de aplicativos móveis instantaneamente. Preços baseados em recursos, metodologia transparente e taxas de mercado precisas.",
    keywords: "calculadora de custo de app, custo de desenvolvimento de aplicativo, estimador de custo de app, preço de aplicativo móvel, calculadora de orçamento de app, custo de app iOS, custo de app Android, calculadora de desenvolvimento de app, custo de MVP, ferramenta de preços de app"
  },
  pl: {
    title: "Kalkulator Kosztów Aplikacji – Oszacuj Koszt Tworzenia Aplikacji",
    description: "Oblicz koszty tworzenia aplikacji mobilnych natychmiast. Ceny oparte na funkcjach, przejrzysta metodologia i dokładne stawki rynkowe.",
    keywords: "kalkulator kosztów aplikacji, koszt tworzenia aplikacji mobilnej, estymator kosztów aplikacji, cena aplikacji mobilnej, kalkulator budżetu aplikacji, koszt aplikacji iOS, koszt aplikacji Android, kalkulator rozwoju aplikacji, koszt MVP, narzędzie do wyceny aplikacji"
  },
  de: {
    title: "App-Kosten-Rechner – Schätzen Sie Mobile App-Entwicklungskosten",
    description: "Berechnen Sie die Kosten für die Entwicklung mobiler Apps sofort. Funktionsbasierte Preise, transparente Methodik und genaue Markttarife.",
    keywords: "app kosten rechner, mobile app entwicklungskosten, app kosten schätzer, app preis rechner, mobile app preisgestaltung, app entwicklung rechner, iOS app kosten, Android app kosten, app budget rechner, MVP app kosten, app preis tool"
  },
  es: {
    title: "Calculadora de Costo de App – Estimador de Desarrollo de Apps",
    description: "Calcule los costos de desarrollo de aplicaciones móviles al instante. Precios basados en características, metodología transparente y tarifas de mercado precisas.",
    keywords: "calculadora de costo de app, costo de desarrollo de aplicación móvil, estimador de costo de app, precio de aplicación móvil, calculadora de presupuesto de app, costo de app iOS, costo de app Android, calculadora de desarrollo de app, costo de MVP, herramienta de precios de app"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && appcostcalculatorMeta[langHeader as keyof typeof appcostcalculatorMeta]
      ? langHeader
      : "en";

  const meta = appcostcalculatorMeta[language as keyof typeof appcostcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('app-cost-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('app-cost-calculator', 'en'),
        'en': getCanonicalUrl('app-cost-calculator', 'en'),
        'es': getCanonicalUrl('app-cost-calculator', 'es'),
        'pt-BR': getCanonicalUrl('app-cost-calculator', 'br'),
        'pl': getCanonicalUrl('app-cost-calculator', 'pl'),
        'de': getCanonicalUrl('app-cost-calculator', 'de'),
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

export default async function AppCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
