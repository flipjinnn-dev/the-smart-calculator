import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for interest-calculator
const interestcalculatorMeta = {
  en: {
    title: "Interest Calculator: Loans, Savings & Investments Tool",
    description: "Use our online interest calculator to compute loans, savings, mortgages, and investments. Calculate APR, APY, and compound interest easily and accurately.",
    keywords: "interest calculator, investment growth, interest calculation, buying power, online interest, inflation adjustment, financial projection, free interest tool"
  },
  br: {
    title: "Calculadora de Juros Grátis",
    description: "Use a calculadora de juros online grátis para calcular rendimentos e crescimento do seu dinheiro. Planeje seus investimentos de forma simples e rápida!",
    keywords: "calculadora juros, crescimento investimento, cálculo juros, poder compra, online juros, ajuste inflação, projeção financeira, gratuita ferramenta juros"
  },
  pl: {
    title: "Kalkulator Odsetek – Oblicz Odsetki od Kwoty Online",
    description: "Użyj kalkulatora odsetek online, aby obliczyć odsetki od kwoty, kredytu lub zaległości. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator odsetek, wzrost inwestycji, obliczenia odsetek, siła nabywcza, online odsetki, dostosowanie inflacji, prognoza finansowa, darmowe narzędzie odsetki"
  },
  de: {
    title: "Zinsrechner – Zinsen & Laufzeit online ermitteln",
    description: "Mit dem Zinsrechner berechnen Sie Zinssatz, Laufzeit, Anfangs- und Endkapital genau – nutzen Sie den Zinsrechner für Ihre Finanz- oder Anlageplanung.",
    keywords: "zinsrechner, investitionswachstum, zinsberechnung, kaufkraft, online zins, inflationsanpassung, finanzprojektion, kostenloser zins tool"
  }
,
  es: {
    title: "Cálculo de Intereses – Calcula Interés, Tasa y Tiempo",
    description: "Utiliza nuestra herramienta de cálculo de intereses para estimar el interés generado, analizar la tasa de interés y planificar el tiempo de tus inversiones o préstamos de manera precisa.",
    keywords: "cálculo, intereses, calcula, interés, tasa, tiempo, utiliza, nuestra, herramienta, estimar, generado, analizar, planificar, inversiones, préstamos"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && interestcalculatorMeta[langHeader as keyof typeof interestcalculatorMeta]
      ? langHeader
      : "en";

  const meta = interestcalculatorMeta[language as keyof typeof interestcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('interest-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('interest-calculator', 'en'),
        'en': getCanonicalUrl('interest-calculator', 'en'),
        'es': getCanonicalUrl('interest-calculator', 'es'),
        'pt-BR': getCanonicalUrl('interest-calculator', 'br'),
        'pl': getCanonicalUrl('interest-calculator', 'pl'),
        'de': getCanonicalUrl('interest-calculator', 'de'),
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

export default async function InterestCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "online interest calculator",
        "description": "Interest Calculator: Loans, Savings & Investments Tool",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "softwareVersion": "2.3.1",
        "url": "https://www.thesmartcalculator.com/financial/interest-calculator",
        "image": "https://cdn.sanity.io/images/f0wclefz/production/237b4add8e6cdfc2a0bd1d48d42ce6aebd994b49-1113x1292.png",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "ratingCount": "2700",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Neo Nicholas"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between APR and APY?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "APR (Annual Percentage Rate) reflects interest without compounding.\n\nAPY (Annual Percentage Yield) accounts for compound interest, showing true growth or cost."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use an interest calculator for daily compounding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, select interest calculator compounded daily to see daily growth effects on loans or savings."
            }
          },
          {
            "@type": "Question",
            "name": "How do extra payments affect my loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Making extra payments reduces principal faster, lowering total interest. Use interest calculator with extra payments to visualize impact."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a calculator for monthly interest?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, interest calculator monthly breaks down payments or earnings per month for accurate planning."
            }
          },
          {
            "@type": "Question",
            "name": "Can an interest calculator handle multiple loans?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Advanced calculators allow for multiple loans or mixed investments, providing a combined overview."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
