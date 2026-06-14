import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

import Script from "next/script";

const CALCULATOR_ID = "ski-size-calculator";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.thesmartcalculator.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Ski Size Calculator — Find Your Perfect Ski Length",
          item: "https://www.thesmartcalculator.com/ski-size-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Ski Size Calculator — Find Your Perfect Ski Length",
      description:
        "Use our free ski size calculator to find your perfect ski length by height, weight, and skill level. Get instant results for all ski types and ability levels.",
      applicationCategory: "SportsApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/ski-size-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.3",
        ratingCount: "1334",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "The Smart Calculator",
        url: "https://www.thesmartcalculator.com/",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What size skis do I need for my height?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your ski length should fall between your chin and the top of your head when you stand the ski upright next to you. For most adults, this equals your height in cm minus 10–20 cm. A 175 cm skier at intermediate level needs approximately 155–165 cm skis. Use the ski length calculator cm tool above for your exact recommendation.",
          },
        },
        {
          "@type": "Question",
          name: "What does a ski width calculator tell me?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A ski width calculator tells you the ideal waist width of your ski in millimeters. Narrow skis (65–80 mm) suit groomed hard-pack and slalom. Medium skis (85–95 mm) work for all mountain terrain. Wide skis (100 mm and above) suit powder and deep off-piste snow. Width affects float, edge grip, and overall ski performance.",
          },
        },
        {
          "@type": "Question",
          name: "What ski length should a beginner choose?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Beginner skiers should choose skis that reach roughly their chin height — about 15–20 cm shorter than the ski height calculator result for an advanced skier of the same height. Shorter ski length for beginners makes turning easier, reduces fatigue, and builds confidence faster on the mountain.",
          },
        },
        {
          "@type": "Question",
          name: "Is women's ski sizing different from men's?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A women's ski size calculator uses the same height and weight formula, but women's specific skis come with softer flex, lighter weight, and forward-shifted binding placement to match a woman's lower centre of gravity. The ski length calculator result stays the same — the difference is in ski construction and flex rating, not the length range itself.",
          },
        },
        {
          "@type": "Question",
          name: "What is a slalom ski length calculator used for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A slalom ski length calculator gives you the correct length for racing and high-performance carved turns. Slalom skis run significantly shorter than all mountain skis — typically 5–15 cm shorter than your standard alpine ski length calculator result — because short, stiff skis turn faster between gates at racing speeds.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate is the ski length calculator in cm?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This ski length calculator cm tool is accurate to within ±5 cm of a professional shop recommendation. It uses the same height-based formula and multi-factor adjustment system that certified ski boot fitters apply in person. For the most precise result, enter your exact barefoot height, current weight, honest skill level, and your intended ski type.",
          },
        },
        {
          "@type": "Question",
          name: "Can this calculator work as a snow ski size calculator for all ages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. This snow ski size calculator covers adults, women, men, and junior skiers. Select Adult for ages 18 and above. Select Junior for children under 18 — the youth formula applies a smaller base multiplier and narrower length range suitable for developing skiers. The ski sizing calculator automatically adjusts every output based on the age group you select.",
          },
        },
      ],
    },
  ],
};


export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function SkiSizeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="ski-size-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
