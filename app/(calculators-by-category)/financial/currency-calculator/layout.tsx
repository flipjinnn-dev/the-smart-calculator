import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for currency-calculator
const currencycalculatorMeta = {
  en: {
    title: "Currency Calculator – Conversion Rates Online | TheSmartCalculator",
    description: "Use the Currency Calculator to convert between currencies with real-time rates. Accurate, free online tool for travel, business, and financial conversions.",
    keywords: "currency calculator, conversion rates, real time rates, online currency, travel business, financial converter, free currency tool, exchange rates"
  },
  br: {
    title: "Currency Calculator – Conversion Rates Online | TheSmartCalcul",
    description: "Use a Calculadora de Moedas para converter valores entre diferentes moedas. Veja taxas de câmbio atualizadas com rapidez e precisão online para viagens.",
    keywords: "calculadora moedas, conversão valores, taxas câmbio, online moedas, atualizadas rapidez, precisa tool, viagens negócios"
  },
  pl: {
    title: "Kalkulator Walutowy – Przelicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora walutowego online, aby szybko przeliczyć kursy i wartości walut. Proste, dokładne i darmowe narzędzie finansowe do konwersji i handlu.",
    keywords: "kalkulator walutowy, przeliczyć kursy, wartości walut, narzędzie finansowe, online waluty, dokładne darmowe, konwersja handel"
  },
  de: {
    title: "Währungsrechner – Umtausch Berechnen Online | TheSmartCalculator",
    description: "Mit dem Währungsrechner berechnen Sie live Wechselkurse zwischen Währungen. Nutzen Sie den Währungsrechner, um Beträge schnell und präzise umzutauschen.",
    keywords: "währungsrechner, umtausch berechnen, wechselkurse live, online währung, beträge umtauschen, schnell präzise, nutzen rechner"
  }
,
  es: {
    title: "Conversor de Divisas – Convierte Monedas al Instante",
    description: "Utiliza nuestro conversor de divisas para convertir monedas, conocer el cambio actual y gestionar tus transacciones internacionales de manera rápida y sencilla.",
    keywords: "conversor, divisas, convierte, monedas, instante, utiliza, nuestro, convertir, conocer, cambio, actual, gestionar, transacciones, internacionales, manera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && currencycalculatorMeta[langHeader as keyof typeof currencycalculatorMeta]
      ? langHeader
      : "en";

  const meta = currencycalculatorMeta[language as keyof typeof currencycalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('currency-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('currency-calculator', 'en'),
        'pt-BR': getCanonicalUrl('currency-calculator', 'br'),
        'pl': getCanonicalUrl('currency-calculator', 'pl'),
        'de': getCanonicalUrl('currency-calculator', 'de'),
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

export default async function CurrencyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
