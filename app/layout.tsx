import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { LanguageFooter } from "@/components/language-footer"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/header"
import BackToTop from "@/components/back-to-top"
import { headers } from "next/headers"
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

  const baseUrl = "https://www.thesmartcalculator.com";
  const canonicalUrl = language !== "en" ? `${baseUrl}/${language}` : baseUrl;

  return {
    metadataBase: new URL(baseUrl),
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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': baseUrl,
        'pt-BR': `${baseUrl}/br`,
        'pl': `${baseUrl}/pl`,
        'de': `${baseUrl}/de`,
        'es': `${baseUrl}/es`,
      }
    },
    openGraph: {
      type: "website",
      locale: language === "br" ? "pt_BR" : language === "de" ? "de_DE" : language === "pl" ? "pl_PL" : language === "es" ? "es_ES" : "en_US",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Basic Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

        {/* Favicon & App Icons */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
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
        
        {/* ✅ Vercel tools */}
        <SpeedInsights />
        <Analytics />

        <BackToTop />
        <LanguageFooter />
      </body>
    </html>
  )
}