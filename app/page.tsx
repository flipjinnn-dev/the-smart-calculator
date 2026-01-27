import { headers } from "next/headers";
import HomeClient from "./home-client";
import { loadHomepageContent } from "@/lib/loadHomepageContent";
import { getAllAuthors } from "@/lib/sanity/client";
import type { Metadata } from "next";
import Head from "next/head";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  const baseUrl = "https://www.thesmartcalculator.com";
  const canonical = language === "en" ? baseUrl : `${baseUrl}/${language}`;
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
      url: canonical,
    },
    alternates: {
      canonical: canonical,
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
  "@graph": [
    {
      "@type": "Organization",
      "name": "thesmartcalculator",
      "alternateName": "free online calculators",
      "url": "https://www.thesmartcalculator.com/",
      "logo": "https://www.thesmartcalculator.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 614-596-2581",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": ["US","DE","BR","PL","ES","GB","MX","CA","AU","AT","150","145","151","154","039","155","142","002","VI","CH","PK"],
        "availableLanguage": ["en","es","German","Polish","Portuguese"]
      },
      "sameAs": [
        "https://x.com/SmartCalculat0r",
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.linkedin.com/company/smart-calculator/",
        "https://www.pinterest.com/thesmartcalculators/"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "free online calculators",
      "description": "We provide 100+ free online calculators that are expert-verified and easy to use. Our calculators cover multiple categories including financial, health, sports, physics, construction, food, maths, and more, helping you get fast and accurate results anytime. No signup required — just simple, reliable calculations all in one place.",
      "operatingSystem": "Windows, macOS, Linux, Android, iOS",
      "applicationCategory": "Online Calculator",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "downloadUrl": "https://www.thesmartcalculator.com/",
      "author": {
        "@type": "Person",
        "name": "thesmartcalculator"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "15746"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem","position": 1,"name": "Smart Calculator","item": "https://www.thesmartcalculator.com/"},
        {"@type": "ListItem","position": 2,"name": "Financial Calculators","item": "https://www.thesmartcalculator.com/financial"},
        {"@type": "ListItem","position": 3,"name": "Health & Fitness Calculators","item": "https://www.thesmartcalculator.com/health"},
        {"@type": "ListItem","position": 4,"name": "Mathematics Calculators","item": "https://www.thesmartcalculator.com/maths"},
        {"@type": "ListItem","position": 5,"name": "Physics Calculators","item": "https://www.thesmartcalculator.com/physics"},
        {"@type": "ListItem","position": 6,"name": "Construction Calculators","item": "https://www.thesmartcalculator.com/construction"},
        {"@type": "ListItem","position": 7,"name": "Food & Nutrition Calculators","item": "https://www.thesmartcalculator.com/food"},
        {"@type": "ListItem","position": 8,"name": "Sports & Performance Calculators","item": "https://www.thesmartcalculator.com/sports"},
        {"@type": "ListItem","position": 9,"name": "Other calculators","item": "https://www.thesmartcalculator.com/other-calculators"}
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question","name": "What is an online calculator?","acceptedAnswer":{"@type": "Answer","text":"An online calculator is a browser-based tool that helps you perform quick calculations like finance, health, math, and conversions without downloading any app."}},
        {"@type": "Question","name": "Are these online calculators free to use?","acceptedAnswer":{"@type": "Answer","text":"Yes. All calculators on our website are 100% free with no sign-ups, no hidden fees, and no premium plans."}},
        {"@type": "Question","name": "How accurate are the calculator results?","acceptedAnswer":{"@type": "Answer","text":"Our tools use expert-verified formulas and updated data sources to deliver accurate and reliable results. Still, results may vary slightly based on user inputs"}},
        {"@type": "Question","name": "Do you store any personal data or calculations?","acceptedAnswer":{"@type": "Answer","text":"No. We respect user privacy. Your inputs and calculations are not stored, tracked, or shared."}},
        {"@type": "Question","name": "What makes your website the best place for online calculators?","acceptedAnswer":{"@type": "Answer","text":"We offer fast, accurate, user-friendly, mobile-optimized, and expert-verified calculators, making us the best source for free online calculations."}},
        {"@type": "Question","name": "Can I use these calculators for school or professional work?","acceptedAnswer":{"@type": "Answer","text":"Absolutely. Students, teachers, and professionals use our tools daily for assignments, planning, research, and quick mathematical or financial checks."}},
        {"@type": "Question","name": "Do your calculators work on mobile devices?","acceptedAnswer":{"@type": "Answer","text":"Yes. All calculators are optimized for mobile, tablet, and desktop, ensuring smooth performance on any device."}},
        {"@type": "Question","name": "How often are the calculators updated?","acceptedAnswer":{"@type": "Answer","text":"We regularly update formulas, user interfaces, and features to maintain accuracy, speed, and reliability across all tools."}},
        {"@type": "Question","name": "Can I request a new calculator to be added?","acceptedAnswer":{"@type": "Answer","text":"Yes! You can contact us anytime to request a new calculator or suggest improvements. We welcome user feedback."}},
        {"@type": "Question","name": "Are these calculators suitable for professional financial or medical decisions?","acceptedAnswer":{"@type": "Answer","text":"Our calculators provide general guidance and accurate estimates, but they should not replace professional advice for legal, medical, or financial decisions."}}
      ]
    }
  ]
};
  return (
    <>
      <Head>
        <meta name="x-language" content={language} />
      </Head>
      <Script 
      id="schema-org" 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
      <HomeClient content={content} language={language} authors={authors} />
    </>
  );
}
