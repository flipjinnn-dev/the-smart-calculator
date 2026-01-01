import { headers } from "next/headers";
import HomeClient from "./home-client";
import { loadHomepageContent } from "@/lib/loadHomepageContent";
import type { Metadata } from "next";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadHomepageContent(language);
  const contentData = content || {
    meta: {
      title: "Smart Calculator - Free Online Calculators for Every Need",
      description: "Access hundreds of free online calculators for finance, health, math, physics, and more. Fast, accurate, and easy-to-use calculation tools.",
      keywords: "calculator, online calculator, financial calculator, health calculator, math calculator, free tools"
    }
  };

  return {
    title: contentData.meta.title,
    description: contentData.meta.description,
    keywords: contentData.meta.keywords,
    openGraph: {
      title: contentData.meta.title,
      description: contentData.meta.description,
      type: "website",
      url: "https://www.thesmartcalculator.com/",
    },
    alternates: {
      canonical: "https://www.thesmartcalculator.com/",
    },
  };
}

export default async function HomePage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadHomepageContent(language);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Online Calculators - Best Online Calculator Tools",
    url: "https://www.thesmartcalculator.com/",
    description: "Access free online calculators for finance, health, math, conversions, and daily tools. Fast, accurate, mobile-friendly, and expert-verified calculators.",
    inLanguage: language,
    isPartOf: {
      "@type": "WebSite",
      name: "thesmartcalculator",
      url: "https://www.thesmartcalculator.com/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.thesmartcalculator.com/search?q={search_term}",
        "query-input": "required name=search_term"
      }
    },
    publisher: {
      "@type": "Organization",
      name: "thesmartcalculator",
      url: "https://www.thesmartcalculator.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.thesmartcalculator.com/logo.png"
      },
      sameAs: [
        "https://www.pinterest.com/thesmartcalculators/",
        "https://x.com/SmartCalculat0r",
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.youtube.com/@TheSmartCalculators"
      ]
    },
    mainEntity: {
      "@type": "FAQPage",
      name: "Online Calculator FAQs",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an online calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An online calculator is a web-based tool that helps you perform quick calculations like finance, health, math, and conversions without installing any app."
          }
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="x-language" content={language} />
      </Head>
      <HomeClient content={content} language={language} />
    </>
  );
}
