import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for carbohydrate-calculator
const carbohydratecalculatorMeta = {
  en: {
    title: "Carbohydrate Calculator - Daily Carb Intake",
    description: "Track daily carb intake using our Carbohydrate Calculator for balanced nutrition planning.",
    keywords: "carbohydrate calculator, daily needs, activity tool, goals calculation, online carb, diet balancing, free carb tool, nutrition planning"
  },
  br: {
    title: "Calculadora Carboidratos",
    description: "Use a calculadora de carboidratos para calcular sua ingestão diária ideal. Planeje sua dieta e descubra seus carboidratos agora mesmo!",
    keywords: "calculadora carboidratos, ingestão diária, consumir dia, dieta equilíbrio, energia saúde, precisa online, metas calculadora"
  },
  pl: {
    title: "Kalkulator węglowodanów – Kompletny przewodnik 2026",
    description: "Kalkulator węglowodanów to narzędzie umożliwiające precyzyjne monitorowanie spożycia węglowodanów, białek i tłuszczy w codziennej diecie. Dzięki niemu możesz obliczyć ile węglowodanów dziennie kalkulator zaleca w Twoim przypadku, dostosować ilość węglowodanów do masy ciała (ile węglowodanów na kg masy kalkulator), a także planować diety ketogeniczne, low carb i dla cukrzyków.",
    keywords: "kalkulator węglowodanów, spożycie dzienne, obliczyć kalorie, narzędzie dietetyczne, online węglowodany, dokładne darmowe, planowanie diety"
  },
  de: {
    title: "Kohlenhydrate Rechner – Bedarf Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Kohlenhydrate Rechner deinen täglichen Bedarf. Ideal für Diät, Fitness & gesunde Ernährung – schnell, präzise und kostenlos online!",
    keywords: "kohlenhydrate rechner, bedarf berechnen, täglichen bedarf, diät fitness, gesunde ernährung, schnell präzise, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Carbohidratos – Controla tu Dieta Fácil",
    description: "Calcula tu ingesta diaria de carbohidratos al instante con nuestra herramienta precisa. ¡Optimiza tu alimentación y mejora tu salud ahora mismo",
    keywords: "calculadora, carbohidratos, controla, dieta, fácil, calcula, ingesta, diaria, instante, nuestra, herramienta, precisa, optimiza, alimentación, mejora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && carbohydratecalculatorMeta[langHeader as keyof typeof carbohydratecalculatorMeta]
      ? langHeader
      : "en";

  const meta = carbohydratecalculatorMeta[language as keyof typeof carbohydratecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('carbohydrate-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('carbohydrate-calculator', 'en'),
        'en': getCanonicalUrl('carbohydrate-calculator', 'en'),
        'es': getCanonicalUrl('carbohydrate-calculator', 'es'),
        'pt-BR': getCanonicalUrl('carbohydrate-calculator', 'br'),
        'pl': getCanonicalUrl('carbohydrate-calculator', 'pl'),
        'de': getCanonicalUrl('carbohydrate-calculator', 'de'),
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

export default async function CarbohydrateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language = langHeader || 'en';

  // Only add Polish-specific schema for Polish version
  const jsonLdSchema = language === 'pl' ? {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Kalkulator węglowodanów",
    "description": "Kalkulator węglowodanów to narzędzie umożliwiające precyzyjne monitorowanie spożycia węglowodanów, białek i tłuszczy w codziennej diecie. Dzięki niemu możesz obliczyć ile węglowodanów dziennie kalkulator zaleca w Twoim przypadku, dostosować ilość węglowodanów do masy ciała (ile węglowodanów na kg masy kalkulator), a także planować diety ketogeniczne, low carb i dla cukrzyków. Narzędzie pomaga także w analizie karmy dla zwierząt, co jest istotne dla właścicieli psów i kotów. W artykule przedstawiamy szczegółowe informacje, jak korzystać z kalkulatora węglowodanów, jakie funkcje oferuje i jakie są najlepsze praktyki.\n",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "softwareVersion": "6.5.1",
    "url": "https://www.thesmartcalculator.com/pl/zdrowie/kalkulator-weglowodanow",
    "image": "https://cdn.sanity.io/images/f0wclefz/production/c206eff7e579f5a144deeb1478a03085d91ed96c-832x914.png",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "2800",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Simon Stephen"
    }
  } : null;

  return <>
    {children}
    {jsonLdSchema && (
      <Script
        id="carbohydrate-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    )}
  </>;
}
