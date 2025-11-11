import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for ip-subnet-calculator
const ipsubnetcalculatorMeta = {
  en: {
    title: "IP Subnet Calculator – Configure Networks Online | TheSmartCal",
    description: "Use the IP Subnet Calculator to compute masks, addresses, and subnets. Accurate, free online tool for network admins to plan and configure IP networks efficiently.",
    keywords: "ip subnet calculator, subnet tool, ip mask, network addresses, online subnet, configure networks, free ip calculator, admin tool"
  },
  br: {
    title: "Calculadora de Sub-rede IP – Configurar Redes | TheSmartCalculator",
    description: "Use a Calculadora de Sub-rede IP para calcular máscaras, endereços e sub-redes. Ferramenta rápida e precisa para administradores de redes e TI em planejamento.",
    keywords: "calculadora sub-rede ip, calcular máscaras, endereços sub-redes, ferramenta redes online, admin ti calculadora, planejamento ip, gratuita sub-rede"
  },
  pl: {
    title: "Kalkulator Podsieci IP – Oblicz Sieć Online | TheSmartCalculator",
    description: "Użyj kalkulatora podsieci IP online, aby obliczyć adresy sieci, maski i zakres hostów. Proste, szybkie i darmowe narzędzie dla sieciowców i adminów.",
    keywords: "kalkulator podsieci ip, obliczyć sieć, maski zakres, narzędzie podsieci online, admin sieci, darmowy kalkulator ip, hosty obliczenia"
  },
  de: {
    title: "IP-Subnetzrechner – Subnetze Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem IP-Subnetzrechner Subnetze, Netzmasken & IP-Bereiche. Schnell, genau & kostenlos – ideal für IT, Netzwerke & Studium in Konfiguration.",
    keywords: "ip-subnetzrechner, subnetze berechnen, netzmasken tool, ip-bereiche, online it rechner, netzwerke studium, kostenloser subnetz tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && ipsubnetcalculatorMeta[langHeader as keyof typeof ipsubnetcalculatorMeta]
      ? langHeader
      : "en";

  const meta = ipsubnetcalculatorMeta[language as keyof typeof ipsubnetcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('ip-subnet-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('ip-subnet-calculator', 'en'),
        'pt-BR': getCanonicalUrl('ip-subnet-calculator', 'br'),
        'pl': getCanonicalUrl('ip-subnet-calculator', 'pl'),
        'de': getCanonicalUrl('ip-subnet-calculator', 'de'),
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

export default async function IpSubnetCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
