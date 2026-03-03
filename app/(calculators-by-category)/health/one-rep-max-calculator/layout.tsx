import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for one-rep-max-calculator
const onerepmaxcalculatorMeta = {
  en: {
    title: "One Rep Max Calculator: The Ultimate Guide for Strength Training",
    description: "A one rep max calculator is a tool that estimates the maximum weight you can lift for a single repetition of an exercise, such as the bench press, squat, or deadlift.",
    keywords: "one rep max calculator, 1rep max, strength estimation, online rep tool, weight reps, workout planning, free max tool, training strength"
  },
  br: {
    title: "Calculadora de 1RM",
    description: "Use a calculadora de 1RM para calcular sua repetição máxima em exercícios. Planeje seus treinos e descubra seu 1RM agora mesmo!",
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
,
  es: {
    title: "Calculadora de 1 Repetición Máxima – Calcula tu Fuerza",
    description: "Calcula tu repetición máxima al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y alcanza tus metas de fuerza ahora mismo",
    keywords: "calculadora, repetición, máxima, calcula, fuerza, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, alcanza, metas, ahora, mismo"
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
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('one-rep-max-calculator', 'en'),
        'en': getCanonicalUrl('one-rep-max-calculator', 'en'),
        'es': getCanonicalUrl('one-rep-max-calculator', 'es'),
        'pt-BR': getCanonicalUrl('one-rep-max-calculator', 'br'),
        'pl': getCanonicalUrl('one-rep-max-calculator', 'pl'),
        'de': getCanonicalUrl('one-rep-max-calculator', 'de'),
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

export default async function OneRepMaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "one rep max calculator",
        "description": "A one rep max calculator is a tool that estimates the maximum weight you can lift for a single repetition of an exercise, such as the bench press, squat, or deadlift.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "softwareVersion": "3.2.1",
        "url": "https://www.thesmartcalculator.com/health/one-rep-max-calculator",
        "image": "https://cdn.sanity.io/images/f0wclefz/production/c206eff7e579f5a144deeb1478a03085d91ed96c-832x914.png",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "ratingCount": "1500",
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
            "name": "Is one rep max calculator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A: Most calculators provide reliable estimates, especially with 1–10 reps. For heavy lifts like the deadlift, accuracy improves using multiple sets."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use one rep max calculator for dumbbells?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A: Yes, one rep max calculator dumbbell works for unilateral lifts like dumbbell bench press and curls."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate one rep max for beginners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A: Start with manageable weights for 5–10 reps and apply formulas like Epley or Brzycki for a safe estimate."
            }
          },
          {
            "@type": "Question",
            "name": "Are there online one rep max calculators?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, options like 1 rep max calculator online and one rep max calculator app provide quick calculations and progress tracking."
            }
          },
          {
            "@type": "Question",
            "name": "Can women use the same formulas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Use one rep max calculator women to tailor percentages for strength programs."
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
