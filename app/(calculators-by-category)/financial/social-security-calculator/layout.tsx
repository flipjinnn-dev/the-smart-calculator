import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for social-security-calculator
const socialsecuritycalculatorMeta = {
  en: {
    title: "Social Security Calculator Benefit Estimate Tool",
    description: "Estimate future Social Security benefits quickly using our Social Security Calculator to plan retirement income.",
    keywords: "social security calculator, benefits estimate, earnings history, online social, retirement tool, social planning, free security tool, benefit calculation"
  },
  br: {
    title: "Simulador da Previdência",
    description: "Use o Simulador de Previdência para calcular sua aposentadoria, ver valores e planejar seu futuro financeiro. Comece agora e saiba quanto você pode economizar!",
    keywords: "simulador previdência, estimativa benefícios, história ganhos, online social, ferramenta aposentadoria, planejamento social, gratuita ferramenta segurança, cálculo benefício"
  },
  pl: {
    title: "Kalkulator ZUS Online – Oblicz Składki i Koszty ZUS",
    description: "Użyj kalkulatora ZUS online, aby łatwo obliczyć składki, koszty i wynagrodzenie brutto-netto. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator zus, estymacja korzyści, historia zarobków, online zus, narzędzie emerytura, planowanie social, darmowe narzędzie zus, obliczenia korzyści"
  },
  de: {
    title: "Sozialversicherungsrechner – Beiträge online berechnen",
    description: "Mit dem Sozialversicherungsrechner ermitteln Sie Ihre Beiträge zu Kranken-, Pflege-, Renten- und Arbeitslosenversicherung online — präzise & kostenlos.",
    keywords: "sozialversicherungsrechner, leistungen schätzung, einkommensgeschichte, online social, renten tool, sozial planung, kostenloser sicherheit tool, leistung berechnung"
  }
,
  es: {
    title: "Calculadora de seguridad social: Estima tus beneficios hoy",
    description: "Calcula fácilmente tus beneficios de seguridad social. Planifica tu jubilación, conoce tus ingresos futuros y toma decisiones financieras inteligentes hoy.",
    keywords: "calculadora, seguridad, social, estima, beneficios, calcula, fácilmente, planifica, jubilación, conoce, ingresos, futuros, toma, decisiones, financieras"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && socialsecuritycalculatorMeta[langHeader as keyof typeof socialsecuritycalculatorMeta]
      ? langHeader
      : "en";

  const meta = socialsecuritycalculatorMeta[language as keyof typeof socialsecuritycalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('social-security-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('social-security-calculator', 'en'),
        'en': getCanonicalUrl('social-security-calculator', 'en'),
        'es': getCanonicalUrl('social-security-calculator', 'es'),
        'pt-BR': getCanonicalUrl('social-security-calculator', 'br'),
        'pl': getCanonicalUrl('social-security-calculator', 'pl'),
        'de': getCanonicalUrl('social-security-calculator', 'de'),
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

export default async function SocialSecurityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
