import { Metadata } from "next";
import { headers } from "next/headers";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

const paverBaseCalculatorMeta = {
  en: {
    title: "Paver Base Calculator",
    description: "Estimate the required base material for paving using our Paver Base Calculator for landscaping and construction projects.",
    keywords: "paver base calculator, gravel calculator, sand calculator, patio base, walkway base, driveway base, paving materials, crushed stone calculator, base depth calculator, construction calculator, paver installation, compacted gravel"
  },
  br: {
    title: "Calcular Base de Pavimento",
    description: "Use a calculadora para calcular a base de pavimento com precisão. Planeje sua obra e simule a quantidade de material necessária agora mesmo!",
    keywords: "calculadora de base para pavimentos, calculadora de brita, calculadora de areia, base de pátio, base de caminho, base de entrada, materiais de pavimentação, calculadora de pedra britada, calculadora de profundidade de base, instalação de pavimentos"
  },
  pl: {
    title: "Kalkulator Podłoża Pod Kostkę – Oszacuj Ilość Żwiru i Piasku na Tarasy, Chodniki i Podjazdy",
    description: "Skorzystaj z naszego Kalkulatora Podłoża Pod Kostkę, aby szybko oszacować ilość żwiru i piasku potrzebną do Twojego tarasu, chodnika lub podjazdu. Zaplanuj projekt z odpowiednią głębokością bazy dla trwałych efektów.",
    keywords: "kalkulator podłoża pod kostkę, kalkulator żwiru, kalkulator piasku, podłoże tarasu, podłoże chodnika, podłoże podjazdu, materiały brukarskie, kalkulator kruszywa, kalkulator głębokości podłoża, instalacja kostki brukowej"
  },
  de: {
    title: "Pflasterunterbau-Rechner – Schotter & Sand für Terrassen, Wege & Einfahrten berechnen",
    description: "Verwenden Sie unseren Pflasterunterbau-Rechner, um schnell die benötigte Menge an Schotter und Sand für Ihre Terrasse, Ihren Weg oder Ihre Einfahrt zu schätzen. Planen Sie Ihr Projekt mit der richtigen Basistiefe für langlebige Ergebnisse.",
    keywords: "pflasterunterbau rechner, schotter rechner, sand rechner, terrassenunterbau, wegeunterbau, einfahrtsunterbau, pflastermaterialien, kies rechner, basistiefe rechner, pflasterverlegung, verdichteter schotter"
  },
  es: {
    title: "Calculadora de Base para Pavimentos – Estima Grava y Arena para Patios, Caminos y Entradas",
    description: "Usa nuestra Calculadora de Base para Pavimentos para estimar rápidamente la cantidad de grava y arena necesaria para tu patio, camino o entrada. Planifica tu proyecto con la profundidad adecuada para resultados duraderos.",
    keywords: "calculadora de base para pavimentos, calculadora de grava, calculadora de arena, base de patio, base de camino, base de entrada, materiales de pavimentación, calculadora de piedra triturada, calculadora de profundidad de base, instalación de pavimentos"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && paverBaseCalculatorMeta[langHeader as keyof typeof paverBaseCalculatorMeta]
      ? langHeader
      : "en";

  const meta = paverBaseCalculatorMeta[language as keyof typeof paverBaseCalculatorMeta];

  const canonicalUrl = getCanonicalUrl('paver-base-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('paver-base-calculator', 'en'),
        'en': getCanonicalUrl('paver-base-calculator', 'en'),
        'es': getCanonicalUrl('paver-base-calculator', 'es'),
        'pt-BR': getCanonicalUrl('paver-base-calculator', 'br'),
        'pl': getCanonicalUrl('paver-base-calculator', 'pl'),
        'de': getCanonicalUrl('paver-base-calculator', 'de'),
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

export default async function PaverBaseCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language = langHeader || "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Paver Base Calculator",
        "description": "Planning a paver patio, walkway, or driveway? A strong and properly layered base is key to making your project last for years. Our Paver Base Calculator helps you estimate the amount of gravel and sand needed so you can plan and buy the right quantities upfront.",
        "operatingSystem": "Web",
        "applicationCategory": "UtilityApplication",
        "url": getCanonicalUrl('paver-base-calculator', language),
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Organization",
          "name": "The Smart Calculator"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": { "@type": "UseAction" },
          "userInteractionCount": 1000
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a paver base and why is it important?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A paver base is a layer of compacted gravel topped with sand that supports your pavers. It prevents sinking, shifting, and cracking, ensuring your patio, walkway, or driveway lasts for years."
            }
          },
          {
            "@type": "Question",
            "name": "How deep should the gravel base be?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For typical patios, a 4–6 inch compacted gravel layer is recommended. For driveways or heavy-use areas, use 6–8 inches."
            }
          },
          {
            "@type": "Question",
            "name": "How thick should the sand layer be?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 1-inch layer of sand is usually enough to level and stabilize your pavers."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate the amount of gravel and sand I need?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Measure the length and width of your area, then multiply by the depth of gravel and sand. Convert the result to cubic yards (or cubic meters for metric) to get the materials needed."
            }
          },
          {
            "@type": "Question",
            "name": "Why do I need extra gravel for compaction?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Compacting gravel reduces its volume. Adding ~20% extra ensures your base reaches the correct depth after compaction."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use the calculator for driveways?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Just increase the gravel depth to 6–8 inches for heavy-duty areas like driveways. Sand depth remains about 1 inch."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to measure in feet or inches?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can use either, but make sure to convert inches to feet or centimeters to meters when calculating cubic yards or meters."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this calculator for square or rectangular areas only?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, this calculator works best for square or rectangular projects. For irregular shapes, break the area into smaller rectangles and add the results."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It gives a good estimate for planning and purchasing materials. Always buy slightly more gravel and sand to account for compaction and minor measurement errors."
            }
          },
          {
            "@type": "Question",
            "name": "Can this calculator be used internationally?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! You can enter measurements in feet/inches or centimeters/meters and get results in cubic yards or cubic meters."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="paver-base-calculator-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
