import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for random-number-generator
const ruckingCalorieCalculatorMeta = {
  en: {
    title: "Rucking Calorie Calculator – Estimate Calories Burned While Rucking",
    description:"Use our Rucking Calorie Calculator to accurately estimate calories burned during rucks based on body weight, ruck load, pace, terrain, and duration. Perfect for fat loss, endurance, and strength training.",
    keywords: "random number generator, random range, number generator, online random, game tool, simulation random, free random tool, range number"
  },
  br: {
    title: "Calculadora de Calorias para Rucking – Estime Calorias Queimadas Durante o Rucking",
    description: "Use nossa Calculadora de Calorias para Rucking para estimar com precisão as calorias queimadas durante os rucks com base no peso corporal, carga do ruck, ritmo, terreno e duração. Perfeito para perda de gordura, resistência e treino de força.",
    keywords: "calculadora de calorias para rucking, calorias queimadas, rucking, peso corporal, carga do ruck, ritmo, terreno, duração, perda de gordura, resistência, treino de força"
  },
  pl: {
    title: "Kalkulator Kalorii podczas Rucking – Oszacuj Spalone Kalorie",
    description: "Skorzystaj z naszego Kalkulatora Kalorii dla Rucking, aby dokładnie oszacować spalone kalorie podczas rucków w zależności od wagi ciała, obciążenia, tempa, terenu i czasu trwania. Idealne do redukcji tłuszczu, wytrzymałości i treningu siłowego.",
    keywords: "kalkulator kalorii dla rucking, kalorie spalone, rucking, waga ciała, obciążenie, tempo, teren, czas trwania, redukcja tłuszczu, wytrzymałość, trening siłowy"
  },
  de: {
    title: "Rucking Kalorienrechner – Schätzen Sie die verbrannten Kalorien beim Rucking",
    description: "Verwenden Sie unseren Rucking Kalorienrechner, um die während des Ruckings verbrannten Kalorien basierend auf Körpergewicht, Rucksacklast, Tempo, Gelände und Dauer genau zu schätzen. Perfekt für Fettabbau, Ausdauer und Krafttraining.",
    keywords: "rucking kalorienrechner, verbrannten kalorien, rucking, körpergewicht, rucksacklast, tempo, gelände, dauer, fettabbau, ausdauer, krafttraining"
  },
  es: {
    title: "Calculadora de Calorías de Rucking – Estima las Calorías Quemadas al Hacer Rucking",
    description: "Usa nuestra Calculadora de Calorías de Rucking para estimar con precisión las calorías quemadas durante los rucks según el peso corporal, la carga de la mochila, el ritmo, el terreno y la duración. Perfecta para perder grasa, mejorar la resistencia y entrenar fuerza.",
    keywords: "calculadora de calorías de rucking, calorías quemadas, rucking, peso corporal, carga de la mochila, ritmo, terreno, duración, pérdida de grasa, resistencia, entrenamiento de fuerza"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && ruckingCalorieCalculatorMeta[langHeader as keyof typeof ruckingCalorieCalculatorMeta]
      ? langHeader
      : "en";

  const meta = ruckingCalorieCalculatorMeta[language as keyof typeof ruckingCalorieCalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('rucking-calorie-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('rucking-calorie-calculator', 'en'),
        'es': getCanonicalUrl('rucking-calorie-calculator', 'es'),
        'pt-BR': getCanonicalUrl('rucking-calorie-calculator', 'br'),
        'pl': getCanonicalUrl('rucking-calorie-calculator', 'pl'),
        'de': getCanonicalUrl('rucking-calorie-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }rucking-calorie-calculator`,
    },
  };
}

export default async function RuckingCalorieCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
  "@context": "https://schema.org/",
  "@type": "SoftwareApplication",
  "name": "Rucking Calorie Calculator",
  "description": "Use our Rucking Calorie Calculator to accurately estimate calories burned during rucks based on body weight, ruck load, pace, terrain, and duration. Perfect for fat loss, endurance, and strength training.",
  "operatingSystem": "Web",
  "applicationCategory": "Maths",
  "offers": {
    "@type": "Offer",
    "price": "Free",
    "priceCurrency": "USD"
  },
  "downloadUrl": "https://www.thesmartcalculator.com/maths/relative-extrema-calculator",
  "author": {
    "@type": "Person",
    "name": ""
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does rucking differ from walking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rucking includes a weighted backpack, increasing energy expenditure compared to walking without load."
      }
    },
    {
      "@type": "Question",
      "name": "Can this calculator be used for any rucking session?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, it works for outdoor or indoor rucks with adjustable settings."
      }
    },
    {
      "@type": "Question",
      "name": "Why isn’t resting metabolic rate included?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The focus is on calories burned from active rucking; resting energy varies widely among individuals."
      }
    },
    {
      "@type": "Question",
      "name": "What pace should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use your average walking speed. If it varies, the duration input adjusts the estimate."
      }
    },
    {
      "@type": "Question",
      "name": "Does terrain really affect calorie burn?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Hills and uneven surfaces require more effort than flat ground."
      }
    },
    {
      "@type": "Question",
      "name": "Should I increase ruck weight to burn more calories?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Heavier loads increase calorie burn, but always choose weights you can safely manage without compromising posture."
      }
    },
    {
      "@type": "Question",
      "name": "Are the results precise?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Results are estimates based on validated load-adjusted methods, not exact measurements."
      }
    },
    {
      "@type": "Question",
      "name": "Can fitness trackers provide similar estimates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most trackers underestimate rucking calories because they do not fully factor in load carriage."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I ruck for fitness or weight loss?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Frequency depends on your fitness level and recovery; use the calculator to plan volume and intensity."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use this for race or event training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes; it helps plan training intensity and calorie expectations for weighted marches or ruck events."
      }
    },
    {
      "@type": "Question",
      "name": "Which formula is used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Pandolf Equation with terrain and grade corrections – validated by the US military and updated for modern research."
      }
    }
  ]
}

  return <>
    {children}
    <Script
      id="rucking-calorie-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
