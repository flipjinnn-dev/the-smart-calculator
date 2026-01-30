import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for simpsons-rule-calculator
const simpsonsrulecalculatorMeta = {
  en: {
    title: "Simpson's Rule Calculator – Integrals Online | TheSmartCalculator",
    description: "Use the Simpson's Rule Calculator to calculate definite integrals using Simpson's Rule. Accurate, free online tool for math and engineering approximations.",
    keywords: "simpsons rule calculator, definite integrals, approximation tool, online simpson, math integrals, engineering approximation, free rule tool, integral calculation"
  },
  br: {
    title: "Calculadora Regra Simpson – Integrais Online | TheSmartCalculator",
    description: "Use a Calculadora Regra Simpson para calcular integrais definidas usando a Regra de Simpson. Ferramenta precisa e gratuita para matemática e engenharia.",
    keywords: "calculadora regra simpson, integrais definidas, ferramenta aproximação, online simpson, integrais matemática, aproximação engenharia, gratuita ferramenta regra, cálculo integral"
  },
  pl: {
    title: "Kalkulator Reguły Simpson – Całki Online | TheSmartCalculator",
    description: "Użyj kalkulatora reguły Simpson online, aby obliczyć całki oznaczone za pomocą Reguły Simpson. Dokładne, darmowe narzędzie do matematyki i inżynierii.",
    keywords: "kalkulator reguły simpson, całki oznaczone, narzędzie aproximacji, online simpson, całki matematyka, aproximacja inżynieria, darmowe narzędzie reguła, obliczenia całki"
  },
  de: {
    title: "Simpson's Rule Calculator – Integrals Online | TheSmartCalcula",
    description: "Berechne mit dem Simpsons Regel Rechner definite Integrale mit Simpsons Regel. Präzises, kostenloses Tool für Math und Ingenieur Approximationen.",
    keywords: "simpsons regel rechner, definite integrale, approximation tool, online simpson, math integrale, ingenieur approximation, kostenloser regel tool, integral berechnung"
  }
,
  es: {
    title: "Calculadora de la Regla de Simpson – Integra Fácil y Rápido",
    description: "Resuelve integrales con la regla de Simpson de forma rápida y precisa. Ideal para cálculo e ingeniería. ¡Ingresa los datos y obtén el resultado al instante!",
    keywords: "calculadora, regla, simpson, integra, fácil, rápido, resuelve, integrales, forma, rápida, precisa, ideal, cálculo, ingeniería, ingresa"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && simpsonsrulecalculatorMeta[langHeader as keyof typeof simpsonsrulecalculatorMeta]
      ? langHeader
      : "en";

  const meta = simpsonsrulecalculatorMeta[language as keyof typeof simpsonsrulecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('simpsons-rule-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('simpsons-rule-calculator', 'en'),
        'en': getCanonicalUrl('simpsons-rule-calculator', 'en'),
        'es': getCanonicalUrl('simpsons-rule-calculator', 'es'),
        'pt-BR': getCanonicalUrl('simpsons-rule-calculator', 'br'),
        'pl': getCanonicalUrl('simpsons-rule-calculator', 'pl'),
        'de': getCanonicalUrl('simpsons-rule-calculator', 'de'),
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

export default async function SimpsonsRuleCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Simpson's Rule Calculator",
    "url": "https://www.thesmartcalculator.com/maths/simpsons-rule-calculator",
    "description": "Use our Simpson's Rule Calculator to approximate definite integrals quickly and accurately. Step-by-step guidance, examples, and key features included.",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/logo.png"
      }
    },
    "mainEntity": [
      {
        "@type": "HowTo",
        "name": "How to Use the Simpson's Rule Calculator",
        "description": "Step-by-step instructions for using the Simpson Rule Calculator to calculate definite integrals.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Enter the function",
            "text": "Input the function you want to integrate, for example, f(x) = x^2 + 3x."
          },
          {
            "@type": "HowToStep",
            "name": "Set the limits",
            "text": "Specify the lower and upper limits of integration."
          },
          {
            "@type": "HowToStep",
            "name": "Choose number of intervals",
            "text": "Select an even number of intervals (n) for Simpson's Rule."
          },
          {
            "@type": "HowToStep",
            "name": "Calculate",
            "text": "Click 'Calculate' to get the approximate value of the integral."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Simpson's Rule?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simpson's Rule is a numerical method for approximating definite integrals."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is Simpson's Rule?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is highly accurate for smooth functions and improves as the number of intervals increases."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use the calculator for any function?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works with polynomial, trigonometric, exponential, and logarithmic functions."
            }
          },
          {
            "@type": "Question",
            "name": "Why must the number of intervals be even?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simpson's Rule requires pairs of intervals to apply the formula correctly."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our Simpson's Rule Calculator is completely free to use."
            }
          },
          {
            "@type": "Question",
            "name": "Does it show step-by-step solutions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator can show intermediate steps for better understanding."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for large intervals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, but increasing intervals improves accuracy."
            }
          },
          {
            "@type": "Question",
            "name": "Is it mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on both mobile and desktop devices."
            }
          },
          {
            "@type": "Question",
            "name": "Can it replace manual calculation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it saves time and reduces errors in manual calculations."
            }
          },
          {
            "@type": "Question",
            "name": "Where is Simpson's Rule applied?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is applied in mathematics, physics, engineering, finance, and scientific research."
            }
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Simpson's Rule Calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "url": "https://www.thesmartcalculator.com/maths/simpsons-rule-calculator",
        "description": "A free online calculator to approximate definite integrals using Simpson's Rule. Ideal for students, researchers, and engineers.",
        "featureList": "Accurate calculations, Step-by-step solutions, Polynomial/trig/exponential/log functions support, Mobile-friendly, Free to use"
      }
    ]
  }
  return <>
    {children}
    <Script
      id="simpsons-rule-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
