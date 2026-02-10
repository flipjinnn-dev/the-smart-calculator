import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for ip-subnet-calculator
const ipsubnetcalculatorMeta = {
  en: {
    title: "IP Subnet Calculator Network Calculator",
    description: "Determine network ranges instantly using our IP Subnet Calculator for IT and networking.",
    keywords: "ip subnet calculator, subnet tool, ip mask, network addresses, online subnet, configure networks, free ip calculator, admin tool"
  },
  br: {
    title: "Calculadora de Sub-rede IP",
    description: "Use a Calculadora de Sub-rede IP para calcular e planejar sub-redes rapidamente. Ideal para profissionais de TI e estudantes de redes. Teste grátis agora!",
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
  },
  es: {
    title: "Calculadora de Subnet – Calcula Redes IP Fácil y Rápido",
    description: "Calcula tus subnets al instante con nuestra herramienta precisa. ¡Optimiza tus redes IP y simplifica la planificación de tus direcciones ahora mismo!",
    keywords: "calculadora, subnet, calcula, redes, fácil, rápido, subnets, instante, nuestra, herramienta, precisa, optimiza, simplifica, planificación, direcciones"
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
        'x-default': getCanonicalUrl('ip-subnet-calculator', 'en'),
        'en': getCanonicalUrl('ip-subnet-calculator', 'en'),
        'es': getCanonicalUrl('ip-subnet-calculator', 'es'),
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

export default async function IpSubnetCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "IP Subnet Calculator",
    "url": "https://www.thesmartcalculator.com/ip-subnet-calculator",
    "description": "Free online IP Subnet Calculator to calculate network, broadcast, host ranges, and usable IPs for IPv4 addresses.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "IP Subnet Calculator",
        "applicationCategory": "NetworkCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Accurate network, broadcast, and host range calculation",
          "Supports subnet masks and CIDR notation",
          "Instant results",
          "Mobile-friendly and free",
          "Ideal for education and professional use"
        ],
        "url": "https://www.thesmartcalculator.com/ip-subnet-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Network Configuration",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Network Configuration",
            "text": "Input a valid IPv4 address, e.g., 192.168.1.0."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Network Configuration",
            "text": "Provide the subnet mask (e.g., 255.255.255.0) or CIDR notation (e.g., /24)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Network Configuration",
            "text": "Get instant results for network address, broadcast address, host range, and usable hosts."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Network Configuration",
            "text": "Use the output for network planning, troubleshooting, or learning subnetting."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an IP Subnet Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An online tool to calculate network, broadcast, host ranges, and usable IPs."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, completely free to use."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need software to use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it works directly in any web browser."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support CIDR notation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, both subnet masks and CIDR notation (e.g., /24, /26) are supported."
            }
          },
          {
            "@type": "Question",
            "name": "Who can use this tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Network engineers, IT professionals, students, and anyone working with IP networks."
            }
          },
          {
            "@type": "Question",
            "name": "Is it accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it calculates all subnet values based on standard networking formulas."
            }
          },
          {
            "@type": "Question",
            "name": "Can it help learn subnetting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is ideal for students and beginners practicing subnetting."
            }
          },
          {
            "@type": "Question",
            "name": "Does it work for IPv6?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This tool is primarily for IPv4 addresses."
            }
          },
          {
            "@type": "Question",
            "name": "Can it help troubleshoot networks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by providing network, broadcast, and host ranges to avoid IP conflicts."
            }
          },
          {
            "@type": "Question",
            "name": "Is it mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on desktops, tablets, and smartphones."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="ip-subnet-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
