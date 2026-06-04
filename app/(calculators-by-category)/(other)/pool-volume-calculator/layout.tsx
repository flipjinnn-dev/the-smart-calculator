import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "pool-volume-calculator";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

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
          name: "Pool Volume Calculator",
          item: "https://www.thesmartcalculator.com/pool-volume-calculator",
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "Pool Volume Calculator",
      description:
        "Free pool volume calculator to find swimming pool capacity in gallons, litres, or m³. Works for rectangular, round, oval, and kidney-shaped pools instantly.",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Windows, macOS, Android, iOS",
      url: "https://www.thesmartcalculator.com/pool-volume-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.2",
        ratingCount: "1200",
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
          name: "How do I calculate pool volume in gallons?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Multiply Length × Width × Average Depth (in feet) × 7.48 to get US gallons. For a 12 × 24 ft pool with 5 ft average depth: 12 × 24 × 5 × 7.48 = 10,771 gallons. Use the pool volume calculator above to skip the manual math — enter your dimensions and get your result instantly.",
          },
        },
        {
          "@type": "Question",
          name: "How many gallons of water does an average swimming pool hold?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A standard residential inground pool holds between 10,000 and 25,000 US gallons depending on size and shape. Above-ground pools typically hold 1,500 to 5,000 gallons. Use the swimming pool volume calculator for your exact pool size — the average range varies too widely to rely on for chemical dosing.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use a round pool volume calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Select Round or Circle in the circle pool volume calculator, enter your pool's full diameter (not radius) in the width field, and enter your pool depth. The round pool volume calculator converts diameter to radius automatically and applies the π × r² × depth formula.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate pool volume in litres or m³?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter all pool dimensions in metres and select the litres or m³ output mode in the pool volume calculator m3 settings. The calculator multiplies your m³ result × 1,000 to display litres. You can also enter dimensions in feet and use the conversion: 1 cubic foot = 28.32 litres.",
          },
        },
        {
          "@type": "Question",
          name: "What is the formula for kidney-shaped pool volume?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use: (Wider Width + Narrower Width) × Length × 0.45 × Average Depth × 7.48 for US gallons. The pool volume calculator kidney applies the 0.45 correction factor automatically for the curved shape. Without this factor, the volume of pool calculator would overestimate water capacity by around 12%.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate above-ground pool volume?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Select Round in the water calculator for pool, enter the pool's full diameter in the width field, and enter the water depth — not the wall height. Water depth is typically 6 inches less than wall height. For an 18 ft diameter, 4 ft deep pool: π × 9² × 4 × 7.48 = 7,640 gallons.",
          },
        },
        {
          "@type": "Question",
          name: "Why does my pool volume result differ from my pool builder's estimate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pool builders use rounded estimates and often exclude steps, ledges, and tanning shelves. The pool fill calculator uses precise geometric formulas. A 3 to 7% difference is completely normal. Always use the calculator result — not the builder's rough figure — when dosing pool chemicals. The wrong volume means the wrong chemical dose.",
          },
        },
      ],
    },
  ],
};

export default function PoolVolumeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {children}
    </>
  );
}
