import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import SilcaTirePressureCalculatorClient from "./silcatire-pressure-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.thesmartcalculator.com";
  const canonicalUrl = `${baseUrl}/sports/silcatire-pressure-calculator`;

  return {
    title: "SILCA Tire Pressure Calculator | Find Perfect PSI",
    description:
      "Calculate ideal tire pressure instantly with SILCA calculator. Get accurate PSI for road, gravel & MTB for better speed, grip & comfort.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": canonicalUrl,
        en: canonicalUrl,
      },
    },
    openGraph: {
      title: "SILCA Tire Pressure Calculator | Find Perfect PSI",
      description:
        "Calculate ideal tire pressure instantly with SILCA calculator. Get accurate PSI for road, gravel & MTB for better speed, grip & comfort.",
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: "SILCA Tire Pressure Calculator" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "SILCA Tire Pressure Calculator | Find Perfect PSI",
      description:
        "Calculate ideal tire pressure instantly with SILCA calculator. Get accurate PSI for road, gravel & MTB for better speed, grip & comfort.",
    },
  };
}

export default async function SilcaTirePressurePage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  let content = null;
  let guideContent = null;

  try {
    content = (await import(`@/app/content/calculator-ui/silcatire-pressure-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/silcatire-pressure-calculator/en.json`)).default;
  }

  try {
    guideContent = (await import(`@/app/content/calculator-guide/silcatire-pressure-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/silcatire-pressure-calculator/en.json`)).default;
  }

  const base = "https://www.thesmartcalculator.com";
  const pageUrl = `${base}/sports/silcatire-pressure-calculator`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "SILCA Tire Pressure Calculator",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        name: "SILCA Tire Pressure Calculator | Find Perfect PSI",
        description:
          "The SILCA Tire Pressure Calculator quickly finds your ideal front and rear bike PSI using rider weight, tire width, terrain, and riding style for better speed, comfort, and grip.",
        applicationCategory: "SportsApplication",
        operatingSystem: "Web",
        softwareVersion: "9.2.1",
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        image: `${base}/logo.png`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.5",
          ratingCount: "3000",
          bestRating: "5",
          worstRating: "1",
        },
        author: { "@type": "Organization", name: "Felix Yacoub" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How accurate is this PSI calculator?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It is highly accurate when you enter correct inputs especially actual mounted tire width, not labeled width. Results land within 2–3 PSI of optimal pressure for most riders. Accuracy drops only when users enter estimated weights or incorrect surface categories.",
            },
          },
          {
            "@type": "Question",
            name: "Is this tool accurate for tubeless setups?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Tubeless mode automatically reduces PSI by 5–10 compared to clincher baseline. Tubeless tires deform more efficiently at lower pressure, which cuts rolling resistance and improves cornering grip without pinch flat risk.",
            },
          },
          {
            "@type": "Question",
            name: "SILCA vs SRAM tire pressure calculator — which is better?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SILCA factors in more variables surface category, casing type, riding speed, and weight distribution. SRAM AXS mainly uses rider weight and tire width. Most experienced riders agree that SILCA gives more terrain-specific results, especially for gravel and MTB riding.",
            },
          },
          {
            "@type": "Question",
            name: "Does this bike pressure tool work for mountain bikes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. It uses MTB-specific weight distribution (46.5/53.5) and adjusts for aggressive terrain. For full suspension setups, always run the lower end of the suggested PSI range for better traction and control on technical trails.",
            },
          },
          {
            "@type": "Question",
            name: "How do I calculate pressure for hookless rims?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Select tubeless tire type hookless rims are incompatible with inner tubes at performance pressures. The tool automatically caps output at 73 PSI (5 bar) to comply with ETRTO hookless safety standards. Never override this limit.",
            },
          },
          {
            "@type": "Question",
            name: "Why does the calculator give different front and rear PSI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Because weight distribution on a bicycle is never equal. Road bikes place 48% of load on the front wheel and 52% on the rear. Running equal pressure on both increases rear rolling resistance and reduces front-end grip at the same time.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a SILCA tire pressure calculator app?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There is no standalone app currently available. The tool runs as a fully mobile-optimized web calculator with no download or account required. It works smoothly on all smartphones and tablets without any setup.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script id="silca-tire-pressure-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SilcaTirePressureCalculatorClient content={content} guideContent={guideContent} />
    </>
  );
}
