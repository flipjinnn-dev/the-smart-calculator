import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for random-number-generator
const randomnumbergeneratorMeta = {
  en: {
    title: "Random Number Generator – Range Online | TheSmartCalculator",
    description: "Use the Random Number Generator to generate random numbers within a specified range. Accurate, free online tool for games, simulations, and testing.",
    keywords: "random number generator, random range, number generator, online random, game tool, simulation random, free random tool, range number"
  },
  br: {
    title: "Generator Números Aleatórios – Intervalo Online | TheSmartCalculator",
    description: "Use o Generator de Números Aleatórios para gerar números aleatórios dentro de um intervalo especificado. Ferramenta precisa e gratuita para jogos, simulações e testes.",
    keywords: "generator números aleatórios, intervalo aleatório, generator número, online aleatório, ferramenta jogo, simulação aleatório, gratuita ferramenta aleatório, número intervalo"
  },
  pl: {
    title: "Generator Liczb Losowych – Zakres Online | TheSmartCalculator",
    description: "Użyj generatora liczb losowych online, aby generować losowe liczby w określonym zakresie. Dokładne, darmowe narzędzie do gier, symulacji i testów.",
    keywords: "generator liczb losowych, zakres losowy, generator liczby, online losowy, narzędzie gra, symulacja losowa, darmowe narzędzie losowe, liczba zakres"
  },
  de: {
    title: "Zufallszahlengenerator – Bereich Online | TheSmartCalculator",
    description: "Erzeuge mit dem Zufallszahlengenerator Zufallszahlen innerhalb eines angegebenen Bereichs. Präzises, kostenloses Tool für Spiele, Simulationen und Tests.",
    keywords: "zufallszahlengenerator, zufallsbereich, zahl generator, online zufall, spiel tool, simulation zufall, kostenloser zufall tool, bereich zahl"
  }
,
  es: {
    title: "Generador de Números Aleatorios – Rápido y Online",
    description: "Genera números aleatorios al instante con nuestro generador online. Ideal para estadísticas, sorteos y simulaciones. ¡Haz clic y obtén números ahora!",
    keywords: "generador, números, aleatorios, rápido, online, genera, instante, nuestro, ideal, estadísticas, sorteos, simulaciones, clic, obtén, ahora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && randomnumbergeneratorMeta[langHeader as keyof typeof randomnumbergeneratorMeta]
      ? langHeader
      : "en";

  const meta = randomnumbergeneratorMeta[language as keyof typeof randomnumbergeneratorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('random-number-generator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }random-number-generator`,
      languages: {
        'en': getCanonicalUrl('random-number-generator', 'en'),
        'pt-BR': getCanonicalUrl('random-number-generator', 'br'),
        'pl': getCanonicalUrl('random-number-generator', 'pl'),
        'de': getCanonicalUrl('random-number-generator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }random-number-generator`,
    },
  };
}

export default async function RandomNumberGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Random Number Generator",
    "url": "https://www.thesmartcalculator.com/maths/random-number-generator",
    "description": "Free online Random Number Generator to instantly generate numbers between any custom range. Ideal for math, statistics, coding, gaming, and everyday use.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Random Number Generator",
        "applicationCategory": "MathCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Instant number generation",
          "Custom range selection",
          "Multiple number output",
          "Uniform random algorithm",
          "Mobile-friendly interface"
        ],
        "url": "https://www.thesmartcalculator.com/maths/random-number-generator"
      },
      {
        "@type": "HowTo",
        "name": "Random Number Generator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Random Number Generator",
            "text": "Input the lowest number in your desired range."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Random Number Generator",
            "text": "Add the highest number in your selected range."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Random Number Generator",
            "text": "Choose how many random numbers you want to generate."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Random Number Generator",
            "text": "Press the generate button to instantly get random numbers."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Random Number Generator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Random Number Generator is an online tool that produces unpredictable numbers within a custom range."
            }
          },
          {
            "@type": "Question",
            "name": "Is the Random Number Generator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the tool is completely free to use on all devices."
            }
          },
          {
            "@type": "Question",
            "name": "Can I generate multiple numbers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can choose the quantity and generate multiple numbers instantly."
            }
          },
          {
            "@type": "Question",
            "name": "Is the output truly random?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The tool uses a pseudo-random algorithm suitable for math tasks, coding, and everyday use."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="random-number-generator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
