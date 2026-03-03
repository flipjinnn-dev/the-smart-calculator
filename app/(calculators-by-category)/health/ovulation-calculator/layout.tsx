import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for ovulation-calculator
const ovulationcalculatorMeta = {
  en: {
    title: "Ovulation Calculator",
    description: "Predict fertile days using our Ovulation Calculator to plan conception easily.",
    keywords: "ovulation calculator, fertile window, date estimate, online ovulation, family planning, cycle tracking, free ovulation tool, window calculation"
  },
  br: {
    title: "Calculadora da Ovulação",
    description: "Use a calculadora da ovulação para descobrir seus dias férteis e planejar sua gravidez. Simule seu ciclo menstrual agora mesmo!",
    keywords: "calculadora ovulação, janela fértil, estimativa data, online ovulação, planejamento familiar, rastreamento ciclo, gratuita ferramenta ovulação, cálculo janela"
  },
  pl: {
    title: "Kalkulator Owulacji – Oblicz Dni Płodne Online",
    description: "Użyj kalkulatora owulacji online, aby obliczyć dni płodne i niepłodne. Proste, dokładne i darmowe narzędzie dla kobiet planujących ciążę.",
    keywords: "kalkulator owulacji, okno płodne, estymacja data, online owulacja, planowanie rodziny, tracking cyklu, darmowe narzędzie owulacja, obliczenia okna"
  },
  de: {
    title: "Eisprungrechner: Alles, was Sie über fruchtbare Tage und Zyklusberechnung wissen müssen",
    description: "Ein Eisprungrechner ist ein hilfreiches Online-Tool, das den Zeitpunkt des Eisprungs berechnet und damit die fruchtbaren Tage einer Frau identifiziert.",
    keywords: "eisprungrechner, fruchtbare tage, datum schätzung, online eisprung, familienplanung, zyklus tracking, kostenloser ovulations tool, fenster berechnung"
  }
,
  es: {
    title: "Calculadora de la Ovulación – Controla tu Fertilidad y Ciclo Menstrual",
    description: "Utiliza nuestra calculadora de la ovulación para predecir tus días fértiles, seguir tu ciclo menstrual y planificar tu salud reproductiva de manera sencilla y precisa.",
    keywords: "calculadora, ovulación, controla, fertilidad, ciclo, menstrual, utiliza, nuestra, predecir, días, fértiles, seguir, planificar, salud, reproductiva"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && ovulationcalculatorMeta[langHeader as keyof typeof ovulationcalculatorMeta]
      ? langHeader
      : "en";

  const meta = ovulationcalculatorMeta[language as keyof typeof ovulationcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('ovulation-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('ovulation-calculator', 'en'),
        'en': getCanonicalUrl('ovulation-calculator', 'en'),
        'es': getCanonicalUrl('ovulation-calculator', 'es'),
        'pt-BR': getCanonicalUrl('ovulation-calculator', 'br'),
        'pl': getCanonicalUrl('ovulation-calculator', 'pl'),
        'de': getCanonicalUrl('ovulation-calculator', 'de'),
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

export default async function OvulationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language = langHeader || 'en';

  // Only add schema for German version
  const jsonLdSchema = language === 'de' ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Eisprungrechner",
        "description": "Ein Eisprungrechner ist ein hilfreiches Online-Tool, das den Zeitpunkt des Eisprungs berechnet und damit die fruchtbaren Tage einer Frau identifiziert.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "softwareVersion": "5.2.1",
        "url": "https://www.thesmartcalculator.com/de/gesundheit/eisprungrechner",
        "image": "https://cdn.sanity.io/images/f0wclefz/production/c206eff7e579f5a144deeb1478a03085d91ed96c-832x914.png",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "ratingCount": "4300",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Simon Stephen"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Wie kann ich meine fruchtbaren Tage berechnen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mit einem fruchtbare Tage Rechner, der den Zyklus analysiert, lassen sich die fruchtbaren Tage berechnen. Online-Rechner oder Apps sind dabei die einfachsten Tools."
            }
          },
          {
            "@type": "Question",
            "name": "Ist ein Eisprungrechner zuverlässig?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Genauigkeit hängt von der Regelmäßigkeit Ihres Zyklus ab. Mit zusätzlichen Tests wie Ovulationstests oder Temperaturmessungen wird der Eisprung genauer vorhergesagt."
            }
          },
          {
            "@type": "Question",
            "name": "Kann man Eisprungrechner für Verhütung nutzen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, Eisprungrechner Verhütung kann helfen, fruchtbare und unfruchtbare Tage zu erkennen, sollte aber bei unregelmäßigen Zyklen nicht als alleiniges Verhütungsmittel verwendet werden"
            }
          },
          {
            "@type": "Question",
            "name": "Funktioniert ein Eisprungrechner bei unregelmäßigen Zyklen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, viele Eisprungrechner unregelmäßiger Zyklus verwenden Algorithmen, die Durchschnittswerte über mehrere Zyklen berechnen, um die fruchtbaren Tage zu schätzen"
            }
          }
        ]
      }
    ]
  } : null;

  return <>
    {children}
    {jsonLdSchema && (
      <Script
        id="ovulation-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    )}
  </>;
}
