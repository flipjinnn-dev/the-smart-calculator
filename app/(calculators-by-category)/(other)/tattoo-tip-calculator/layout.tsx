import Script from "next/script";

import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "tattoo-tip-calculator";

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
          name: "Tattoo Tip Calculator",
          item: "https://www.thesmartcalculator.com/tattoo-tip-calculator/",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Tattoo Tip Calculator",
      description:
        "Use our free tattoo tip calculator to instantly find the perfect tip for your tattoo artist. Enter your tattoo cost, choose a percentage, and get quick accurate results with no guesswork.",
      applicationCategory: "CalculatorApplication",
      operatingSystem: "Any",
      url: "https://www.thesmartcalculator.com/tattoo-tip-calculator/",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.3",
        ratingCount: "1500",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: "Aiden Asher",
        url: "https://www.thesmartcalculator.com/creator/aiden-asher",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much are you supposed to tip on a tattoo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You are supposed to tip between 15% and 25% of your total tattoo cost. The industry standard sits at 20%. For exceptional work, detailed custom designs, or long sessions, tipping 25% or more is both appropriate and appreciated by professional tattoo artists.",
          },
        },
        {
          "@type": "Question",
          name: "How much do you tip on a tattoo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most clients tip 20% as a general rule. On a $200 tattoo, that equals a $40 tip. If your artist went above and beyond — touched up errors, accommodated your schedule, or produced exceptional art — tip 25% without hesitation.",
          },
        },
        {
          "@type": "Question",
          name: "What is a normal tip for a tattoo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A normal tip for a tattoo is 20% of the total cost. This is the widely accepted baseline across most countries and tattoo studios. Some clients tip a flat amount for very small tattoos, but percentage-based tipping is more respectful of the artist's time and expertise.",
          },
        },
        {
          "@type": "Question",
          name: "How much do you tip for a small tattoo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For a small tattoo priced at $50–$100, tip at least $10–$20 (20%). Even for quick sessions, your artist prepared the stencil, set up equipment, and used professional-grade ink and needles. A minimum $10 tip on small work is considered polite and professional.",
          },
        },
        {
          "@type": "Question",
          name: "How much should I tip on a $500 tattoo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On a $500 tattoo, a 20% tip equals $100, making your total $600. If the session was particularly long, the design was highly detailed, or your artist gave exceptional aftercare advice, consider tipping $125 (25%).",
          },
        },
        {
          "@type": "Question",
          name: "How much do you tip for a $50 tattoo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For a $50 tattoo, tip $10 at 20%. This is the minimum respectful amount for professional tattoo work. Some clients tip a flat $15–$20 on small tattoos to better reflect the artist's preparation time, which is often longer than the actual tattoo session.",
          },
        },
        {
          "@type": "Question",
          name: "How much to tip on a $130 tattoo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On a $130 tattoo, a 20% tip equals $26, bringing your total to $156. If you were fully satisfied with the design, placement, and experience, rounding up to $30 (about 23%) is a generous and well-received gesture.",
          },
        },
      ],
    },
  ],
};

export default function TattooTipCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="tattoo-tip-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
