import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { LanguageFooter } from "@/components/language-footer"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/header"
import BackToTop from "@/components/back-to-top"
import { SessionProvider } from "@/components/providers/session-provider"
import { Toaster } from "sonner"
import { headers } from "next/headers"
import { InternalLinksSection } from "@/components/internal-links-section"
import "./globals.css"
import "katex/dist/katex.min.css"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

// Define metadata for all languages
const homepageMeta = {
  en: {
    title: "Smart Calculator - Free Online Calculators for Every Need",
    description: "Access hundreds of free online calculators for finance, health, math, physics, and more. Fast, accurate, and easy-to-use calculation tools.",
    keywords: "calculator, online calculator, financial calculator, health calculator, math calculator, free tools"
  },
  br: {
    title: "Smart Calculator - Calculadoras Online Gratuitas para Todas as Necessidades",
    description: "Acesse centenas de calculadoras online gratuitas para finanças, saúde, matemática, física e muito mais. Ferramentas de cálculo rápidas, precisas e fáceis de usar.",
    keywords: "calculadora, calculadora online, calculadora financeira, calculadora de saúde, calculadora matemática, ferramentas gratuitas"
  },
  pl: {
    title: "Smart Calculator - Darmowe Kalkulatory Online do Wszystkich Potrzeb",
    description: "Skorzystaj z setek darmowych kalkulatorów online do finansów, zdrowia, matematyki, fizyki i nie tylko. Szybkie, dokładne i łatwe w użyciu narzędzia do obliczeń.",
    keywords: "kalkulator, kalkulator online, kalkulator finansowy, kalkulator zdrowia, kalkulator matematyczny, darmowe narzędzia"
  },
  de: {
    title: "Smart Calculator - Kostenlose Online-Rechner für jeden Bedarf",
    description: "Greifen Sie auf Hunderte von kostenlosen Online-Rechnern für finanziell, Gesundheit, mathe, Physik und mehr zu. Schnelle, genaue und benutzerfreundliche Berechnungstools.",
    keywords: "Rechner, Online-Rechner, Finanzrechner, Gesundheitsrechner, matherechner, kostenlose Tools"
  },
  es: {
    title: "Smart Calculator - Calculadoras Online Gratuitas para Todas tus Necesidades",
    description: "Accede a cientos de calculadoras online gratuitas para finanzas, salud, matemáticas, física y más. Herramientas de cálculo rápidas, precisas y fáciles de usar.",
    keywords: "calculadora, calculadora online, calculadora financiera, calculadora de salud, calculadora matemática, herramientas gratuitas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  // Get language from headers
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language = langHeader && homepageMeta[langHeader as keyof typeof homepageMeta]
    ? langHeader
    : "en";

  // Get metadata for the current language
  const meta = homepageMeta[language as keyof typeof homepageMeta] || homepageMeta.en;

  return {
    metadataBase: new URL("https://www.thesmartcalculator.com"),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "The Smart Calculator Team" }],
    creator: "Smart Calculator",
    publisher: "Smart Calculator",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: '/manifest.json',
    icons: {
      icon: '/logo.png',
    },
    alternates: {
      languages: {
        'x-default': 'https://www.thesmartcalculator.com',
        'en': 'https://www.thesmartcalculator.com',
        'pt-BR': 'https://www.thesmartcalculator.com/br',
        'pl': 'https://www.thesmartcalculator.com/pl',
        'de': 'https://www.thesmartcalculator.com/de',
        'es': 'https://www.thesmartcalculator.com/es',
      }
    },
    openGraph: {
      type: "website",
      locale: language === "br" ? "pt_BR" : language === "de" ? "de_DE" : language === "pl" ? "pl_PL" : language === "es" ? "es_ES" : "en_US",
      url: language === "en" ? "https://www.thesmartcalculator.com" : `https://www.thesmartcalculator.com/${language}`,
      siteName: "Smart Calculator",
      title: meta.title,
      description: meta.description,
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "RehqhdOImhqlzUM1_EWsYdmed39YNrO6MQyARIW9rK4",
    },
    generator: "Smart Calculator",
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get language from headers for dynamic lang attribute
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language = langHeader && homepageMeta[langHeader as keyof typeof homepageMeta]
    ? langHeader
    : "en";
  
  // Map language codes to proper HTML lang attributes
  const htmlLang = language === "br" ? "pt-BR" : language;

  return (
    <html lang={htmlLang}>
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          <main>
            {children}
          </main>

          {/* ✅ Google Analytics - Deferred */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-18W2MEF31Q"
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-18W2MEF31Q', {
                page_path: window.location.pathname,
              });
            `}
          </Script>

          {/* ✅ Microsoft Clarity - Deferred */}
          <Script id="microsoft-clarity" strategy="lazyOnload">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "t4gsw89qux");
            `}
          </Script>

          {/* ✅ Google AdSense - Deferred */}
          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5433267523341571"
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />

          {/* ✅ DMCA Badge Helper */}
          <Script
            src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"
            strategy="lazyOnload"
          />

          {/* ✅ Vercel tools */}
          <SpeedInsights />
          <Analytics />

          <BackToTop />
          <InternalLinksSection language={language} />
          <LanguageFooter />
          <Toaster position="top-center" richColors />
        </SessionProvider>
      </body>
    </html>
  )
}