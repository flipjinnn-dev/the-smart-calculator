import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for one-rep-max-calculator
const onerepmaxcalculatorMeta = {
  en: {
    title: "One Rep Max Calculator – Strength Online | TheSmartCalculator",
    description: "Use the One Rep Max Calculator to estimate one-rep max for strength training. Accurate, free online tool based on weight and reps for workout planning.",
    keywords: "one rep max calculator, 1rep max, strength estimation, online rep tool, weight reps, workout planning, free max tool, training strength"
  },
  br: {
    title: "Calculadora One Rep Max – Força Online | TheSmartCalculator",
    description: "Use a Calculadora One Rep Max para estimar max para treinamento de força. Ferramenta precisa baseada em peso e reps para planejamento de treino.",
    keywords: "calculadora one rep max, max 1rep, estimativa força, ferramenta online rep, peso reps, planejamento treino, gratuita max tool, força treinamento"
  },
  pl: {
    title: "One Rep Max Calculator – Strength Online | TheSmartCalculator",
    description: "Użyj kalkulatora jednego powtórzenia max online, aby oszacować max do treningu siłowego. Dokładne, darmowe narzędzie na podstawie wagi i powtórzeń do planowania.",
    keywords: "kalkulator jednego powtórzenia max, max 1rep, estymacja siły, narzędzie online rep, waga reps, planowanie trening, darmowe max narzędzie, siła trening, 1RM Rechner – Maximalkraft Berechnen Online | TheSmartCalculator"
  },
  de: {
    title: "One Rep Max Calculator – Strength Online | TheSmartCalculator",
    description: "1rm rechner, 1rep max, kraft schätzung, online rep tool, gewicht reps, workout planung, kostenloser max tool, training kraft",
    keywords: "one rep max rechner, 1rep max, strength estimation, online rep tool, weight reps, workout planning, kostenlos max tool, training strength"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && onerepmaxcalculatorMeta[langHeader as keyof typeof onerepmaxcalculatorMeta]
      ? langHeader
      : "en";

  const meta = onerepmaxcalculatorMeta[language as keyof typeof onerepmaxcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('one-rep-max-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }one-rep-max-calculator`,
      languages: {
        'en': getCanonicalUrl('one-rep-max-calculator', 'en'),
        'pt-BR': getCanonicalUrl('one-rep-max-calculator', 'br'),
        'pl': getCanonicalUrl('one-rep-max-calculator', 'pl'),
        'de': getCanonicalUrl('one-rep-max-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }one-rep-max-calculator`,
    },
  };
}

export default async function OneRepMaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.thesmartcalculator.com/health/one-rep-max-calculator#webpage",
        "url": "https://www.thesmartcalculator.com/health/one-rep-max-calculator",
        "name": "One-Rep Max Calculator",
        "description": "Free One-Rep Max (1RM) Calculator — estimate your max lift using Epley, Brzycki, or Lombardi formulas. Includes training percentages, safety tips, and examples.",
        "inLanguage": "en",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.thesmartcalculator.com/#website",
          "url": "https://www.thesmartcalculator.com/",
          "name": "Smart Calculator"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.thesmartcalculator.com/assets/images/one-rep-max.png"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Smart Calculator",
          "url": "https://www.thesmartcalculator.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.thesmartcalculator.com/assets/images/logo.png"
          }
        },
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": "One-Rep Max Calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "url": "https://www.thesmartcalculator.com/health/one-rep-max-calculator",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "softwareVersion": "1.0",
          "featureList": [
            "Epley formula",
            "Brzycki formula",
            "Lombardi formula",
            "Unit conversion (kg/lbs)",
            "Training percentage chart"
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a One-Rep Max (1RM)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A one-rep max (1RM) is the maximum amount of weight you can lift for a single repetition of a given exercise, such as bench press, squat, or deadlift."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate my One-Rep Max safely?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Instead of attempting a true max lift, perform 3–10 reps at a submaximal weight and use a calculator with formulas like Epley or Brzycki for a safer estimate."
            }
          },
          {
            "@type": "Question",
            "name": "Which One-Rep Max formula is most accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Epley works best for 3–10 reps, Brzycki is conservative for moderate reps, and Lombardi is effective across a wide range of reps. Accuracy depends on the exercise and rep range."
            }
          },
          {
            "@type": "Question",
            "name": "Can beginners use a One-Rep Max calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, beginners can use a 1RM calculator to estimate strength without lifting dangerously heavy loads. Always prioritize proper form and safety."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="one-rep-max-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
