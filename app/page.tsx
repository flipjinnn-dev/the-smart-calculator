import { headers } from "next/headers";
import HomeClient from "./home-client";
import { loadHomepageContent } from "@/lib/loadHomepageContent";
import { getAllAuthors } from "@/lib/sanity/client";
import Script from "next/script";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  const { content } = await loadHomepageContent(language);

  const contentData = content || {
    meta: {
      title: "",
      description: "",
      keywords: ""
    }
  };

  return {
    title: contentData.meta.title || "Smart Calculator - Free Online Calculators for Every Need",
    description: contentData.meta.description || "Access hundreds of free online calculators for finance, health, math, physics, and more. Fast, accurate, and easy-to-use calculation tools.",
    keywords: contentData.meta.keywords || "calculator, online calculator, financial calculator, health calculator, math calculator, free tools",
    openGraph: {
      title: contentData.meta.title || "Smart Calculator - Free Online Calculators for Every Need",
      description: contentData.meta.description || "Access hundreds of free online calculators for finance, health, math, physics, and more. Fast, accurate, and easy-to-use calculation tools.",
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
  const authors = await getAllAuthors();

  const jsonLd = {
  "@context": "https://schema.org",
  "@type": [
    "SoftwareApplication",
    "WebApplication"
  ],
  "name": "the smart calculator",
  "description": "Smart calculator provides solutions for a wide range of problems, from finance and business to health. It’s so fast and easy you won’t want to do the math again!",
  "url": "https://www.thesmartcalculator.com",
  "operatingSystem": "Web",
  "applicationCategory": "Calculators",
  "applicationSubCategory": "Software Calculators",
  "inLanguage": "en-US",
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "Online Only"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.thesmartcalculator.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Smart Calculator sp. z o.o.",
    "url": "https://www.thesmartcalculator.com",
    "brand": "Smart Calculator",
    "publishingPrinciples": "https://www.thesmartcalculator.com/about-us",
    "sameAs": [
      "https://www.pinterest.com/thesmartcalculators/",
      "https://x.com/SmartCalculat0r",
      "https://www.instagram.com/thesmartcalculators/",
      "https://www.youtube.com/@TheSmartCalculators",
      "https://www.linkedin.com/company/smart-calculator/"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3457 Hodson Pickett Trail High Point",
      "addressLocality": "Hodson Pickett Trail",
      "addressRegion": "North Carolina",
      "postalCode": "27260",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "feedback",
      "email": "thesmartcalculators@gmail.com"
    },
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.thesmartcalculator.com/logo.png",
      "width": 713,
      "height": 720
    }
  },
  "hasPart": [
    {
      "@type": "WebPage",
      "name": "business Calculators",
      "url": "https://www.thesmartcalculator.com/business"
    },
    {
      "@type": "WebPage",
      "name": "software Calculators",
      "url": "https://www.thesmartcalculator.com/software"
    },
    {
      "@type": "WebPage",
      "name": "other calculators",
      "url": "https://www.thesmartcalculator.com/other-calculators"
    },
    {
      "@type": "WebPage",
      "name": "construction Calculators",
      "url": "https://www.thesmartcalculator.com/construction"
    },
    {
      "@type": "WebPage",
      "name": "food Calculators",
      "url": "https://www.thesmartcalculator.com/food"
    },
    {
      "@type": "WebPage",
      "name": "sports Calculators",
      "url": "https://www.thesmartcalculator.com/sports"
    },
    {
      "@type": "WebPage",
      "name": "games",
      "url": "https://www.thesmartcalculator.com/games"
    },
    {
      "@type": "WebPage",
      "name": "physics Calculators",
      "url": "https://www.thesmartcalculator.com/physics"
    },
    {
      "@type": "WebPage",
      "name": "maths Calculators",
      "url": "https://www.thesmartcalculator.com/maths"
    },
    {
      "@type": "WebPage",
      "name": "Health and Fitness Calculators",
      "url": "https://www.thesmartcalculator.com/health"
    },
    {
      "@type": "WebPage",
      "name": "Online Financial Calculators",
      "url": "https://www.thesmartcalculator.com/financial"
    }
  ],
  "_extractedType": "SoftwareApplication"
}
  return (
    <>
      <Script 
      id="schema-org" 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
      <HomeClient content={content} language={language} authors={authors} />
    </>
  );
}
