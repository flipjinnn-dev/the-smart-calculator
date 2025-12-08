import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for board-foot-calculator
const boardfootcalculatorMeta = {
  en: {
    title: "Board Foot Calculator – Lumber Materials Online | TheSmartCalculator",
    description: "Use the Board Foot Calculator to compute board feet for lumber and materials. Accurate, free online tool for construction, woodworking, and cost estimation.",
    keywords: "board foot calculator, lumber tool, materials calculation, online board, construction estimator, woodworking calculator, free foot tool, cost materials"
  },
  br: {
    title: "Calculadora Metros Cúbicos – Calcule Volume de Materiais",
    description: "Use a Calculadora de Metros Cúbicos para medir volumes de construção e materiais. Ferramenta rápida e precisa para obras e projetos online.",
    keywords: "calculadora metros cúbicos, volume construção, materiais medir, ferramenta obras online, projetos calculadora, precisa rápida, estimativas volume"
  },
  pl: {
    title: "Kalkulator Stóp Deski – Drewno Online | TheSmartCalculator",
    description: "Użyj kalkulatora stóp deski online, aby obliczyć stopy deski dla drewna i materiałów. Dokładne, darmowe narzędzie do budowy, stolarki i szacunku kosztów.",
    keywords: "kalkulator stóp deski, drewno tool, materiały obliczenia, online stopy, budowa estymacja, stolarka kalkulator, darmowy tool"
  },
  de: {
    title: "Brettfuß Rechner – Holz Materialien Online | TheSmartCalculator",
    description: "Berechne mit dem Brettfuß Rechner Brettfüße für Holz und Materialien. Präzises, kostenloses Tool für Bau, Holzarbeit und Kosten-Schätzung.",
    keywords: "brettfuß rechner, holz tool, materialien berechnung, online brett, bau schätzung, holzarbeit calculator, kostenloser tool"
  },
  es: {
    title: "Calculadora de Pies Tablares – Madera Online | TheSmartCalculator",
    description: "Use la Calculadora de Pies Tablares para calcular madera y materiales. Herramienta online precisa y gratuita para construcción y carpintería.",
    keywords: "calculadora pies tablares, herramienta madera, cálculo materiales, tabla online, estimador construcción, calculadora carpintería"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && boardfootcalculatorMeta[langHeader as keyof typeof boardfootcalculatorMeta]
      ? langHeader
      : "en";

  const meta = boardfootcalculatorMeta[language as keyof typeof boardfootcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('board-foot-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('board-foot-calculator', 'en'),
        'pt-BR': getCanonicalUrl('board-foot-calculator', 'br'),
        'pl': getCanonicalUrl('board-foot-calculator', 'pl'),
        'de': getCanonicalUrl('board-foot-calculator', 'de'),
        'es': getCanonicalUrl('board-foot-calculator', 'es'),
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

export default async function BoardFootCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Board Foot Calculator",
    "url": "https://www.thesmartcalculator.com/construction/board-foot-calculator",
    "description": "Free online Board Foot Calculator to measure lumber volume in board feet, calculate total cost, and plan woodworking or construction projects accurately.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Board Foot Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Board Feet Calculation",
          "Supports Multiple Boards",
          "Length in Inches or Feet",
          "Total Cost Estimation",
          "Mobile-Friendly Interface"
        ],
        "url": "https://www.thesmartcalculator.com/construction/board-foot-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Board Foot Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Number of Boards",
            "text": "Specify the total number of identical boards you want to calculate."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Board Foot Calculator",
            "text": "Enter thickness (inches), width (inches), and length (feet or inches)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Board Foot Calculator",
            "text": "Add price per board foot to calculate total cost."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Board Foot Calculator",
            "text": "Click the calculate button to get board feet per piece, total board feet, and total cost instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Board Foot Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is an online tool to calculate the volume of lumber in board feet quickly and accurately."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate board feet manually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the formula: Board Feet = (Thickness × Width × Length) ÷ 12 (length in feet) or ÷144 (length in inches)."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate multiple boards at once?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator allows you to enter the number of boards to get total board feet."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate the total cost of lumber?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by entering the price per board foot, the calculator shows the total cost."
            }
          },
          {
            "@type": "Question",
            "name": "Is it mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on all devices including smartphones, tablets, and desktops."
            }
          },
          {
            "@type": "Question",
            "name": "Does it account for wood waste?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it calculates theoretical board feet; extra material may be needed for cutting waste."
            }
          },
          {
            "@type": "Question",
            "name": "Can I enter dimensions in inches and feet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator supports both units for length."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Woodworkers, DIY enthusiasts, construction professionals, and lumber buyers can all benefit."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is completely free and requires no downloads."
            }
          },
          {
            "@type": "Question",
            "name": "Is board foot a standard measurement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, board foot is a standard unit of lumber volume commonly used in the US and Canada."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="board-foot-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
