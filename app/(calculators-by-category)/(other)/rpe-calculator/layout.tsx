import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for rpe-calculator
const rpecalculatorMeta = {
  en: {
    title: "RPE Calculator – Training Intensity Online | TheSmartCalculator",
    description: "Use the RPE Calculator to determine training intensity based on perceived exertion. Accurate, free online tool for fitness, strength, and endurance planning.",
    keywords: "rpe calculator, training intensity, perceived exertion, fitness tool, online rpe, strength calculator, endurance planning, free rpe tool"
  },
  br: {
    title: "Calculadora RPE – Intensidade Treino Online | TheSmartCalculator",
    description: "Use a Calculadora RPE para calcular intensidade de treino com base em esforço percebido. Ferramenta precisa e gratuita online para fitness e planejamento de força.",
    keywords: "calculadora rpe, intensidade treino, esforço percebido, ferramenta fitness online, força calculadora, planejamento endurance, gratuita rpe"
  },
  pl: {
    title: "Kalkulator RPE – Intensywność Treningu Online | TheSmartCalculator",
    description: "Użyj kalkulatora RPE online, aby obliczyć intensywność treningu na podstawie postrzeganego wysiłku. Dokładne, darmowe narzędzie do fitness i planowania wytrzymałości.",
    keywords: "kalkulator rpe, intensywność treningu, postrzegany wysiłek, narzędzie fitness, online rpe, siła kalkulator, planowanie endurance"
  },
  de: {
    title: "RPE Rechner – Trainingsintensität Berechnen | TheSmartCalculator",
    description: "Berechne mit dem RPE Rechner deine Trainingsintensität nach dem RPE-System. Ideal für Fitness, Krafttraining & Ausdauer – schnell & kostenlos online!",
    keywords: "rpe rechner, trainingsintensität berechnen, rpe system, fitness tool, krafttraining, ausdauer rechner, kostenloser online tool"
  },
  es: {
    title: "Calculadora RPE – Evalúa tu Esfuerzo Físico Fácil y Rápido",
    description: "Calcula tu RPE (Percepción del Esfuerzo) al instante y optimiza tu entrenamiento. ¡Mejora tus rutinas y alcanza tus metas ahora mismo!",
    keywords: "calculadora, evalúa, esfuerzo, físico, fácil, rápido, calcula, percepción, instante, optimiza, entrenamiento, mejora, rutinas, alcanza, metas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && rpecalculatorMeta[langHeader as keyof typeof rpecalculatorMeta]
      ? langHeader
      : "en";

  const meta = rpecalculatorMeta[language as keyof typeof rpecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('rpe-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('rpe-calculator', 'en'),
        'pt-BR': getCanonicalUrl('rpe-calculator', 'br'),
        'pl': getCanonicalUrl('rpe-calculator', 'pl'),
        'de': getCanonicalUrl('rpe-calculator', 'de'),
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

export default async function RpeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "RPE Calculator",
    "url": "https://www.thesmartcalculator.com/rpe-calculator",
    "description": "Free RPE Calculator to estimate workout intensity, 1-rep max, and recommended training loads based on weight, reps, and perceived exertion.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "RPE Calculator",
        "applicationCategory": "FitnessApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Estimate 1-rep max from weight, reps, and RPE",
          "Recommend training loads for target intensity",
          "Supports autoregulated workouts",
          "Mobile-friendly and free to use",
          "Safe for progressive training and injury prevention"
        ],
        "url": "https://www.thesmartcalculator.com/rpe-calculator"
      },
      {
        "@type": "HowTo",
        "name": "RPE Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "RPE Calculator",
            "text": "Input the weight used for your set in kg or lbs."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "RPE Calculator",
            "text": "Input the number of repetitions completed."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "RPE Calculator",
            "text": "Choose a number representing perceived effort (1–10)."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "RPE Calculator",
            "text": "View your estimated 1RM and recommended loads instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an RPE Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It estimates strength and workout intensity using weight, reps, and perceived exertion."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the RPE Calculator is completely free to use online."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it works directly in any browser on desktop or mobile."
            }
          },
          {
            "@type": "Question",
            "name": "Can it calculate 1RM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides an estimated one-rep max based on your inputs."
            }
          },
          {
            "@type": "Question",
            "name": "Can it plan workout intensity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it recommends training loads for target RPE levels."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for beginners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, beginners and advanced lifters can use it safely."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It provides reliable estimates if the weight, reps, and RPE inputs are accurate."
            }
          },
          {
            "@type": "Question",
            "name": "Can it help prevent injury?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by avoiding unnecessary max lifts and promoting controlled progression."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support kg and lbs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can enter weights in both kilograms and pounds."
            }
          },
          {
            "@type": "Question",
            "name": "Can coaches use it for clients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it’s ideal for trainers to monitor and plan client workouts."
            }
          }
        ]
      }
    ]
  }
  return <>
    <Script
      id="rpe-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
    {children}
  </>;
}
