import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power-to-Weight Ratio Calculator - Calculate Acceleration & Efficiency",
  description: "Calculate acceleration & efficiency of cars, bikes, F1 cars, or cyclists with our Power-to-Weight Ratio Calculator. Compare performance instantly!",
  keywords: [
    "power-to-weight ratio calculator",
    "power to weight ratio",
    "car power-to-weight ratio",
    "cycling power-to-weight ratio",
    "F1 car power-to-weight ratio",
    "motorcycle power-to-weight ratio",
    "hp/lb calculator",
    "kW/kg calculator",
    "vehicle performance calculator",
    "acceleration calculator"
  ],
  alternates: {
    canonical: "/physics/power-to-weight-ratio-calculator"
  },
  openGraph: {
    title: "Power-to-Weight Ratio Calculator - Calculate Acceleration & Efficiency",
    description: "Calculate acceleration & efficiency of cars, bikes, F1 cars, or cyclists with our Power-to-Weight Ratio Calculator. Compare performance instantly!",
    type: "website",
    url: "/physics/power-to-weight-ratio-calculator"
  },
  twitter: {
    card: "summary_large_image",
    title: "Power-to-Weight Ratio Calculator - Calculate Acceleration & Efficiency",
    description: "Calculate acceleration & efficiency of cars, bikes, F1 cars, or cyclists with our Power-to-Weight Ratio Calculator. Compare performance instantly!"
  }
};

export default function PowerToWeightRatioCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How to calculate power-to-weight ratio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use the formula: PWR = Power Output ÷ Weight or Mass. Choose consistent units (hp/lb or kW/kg)."
                }
              },
              {
                "@type": "Question",
                "name": "Is a higher power-to-weight ratio better?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, a higher PWR indicates better acceleration and speed potential. However, stability and vehicle control should also be considered."
                }
              },
              {
                "@type": "Question",
                "name": "How to calculate car power-to-weight ratio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Find the vehicle's peak power (hp or kW), determine curb weight (lb or kg), divide power by weight to get PWR."
                }
              },
              {
                "@type": "Question",
                "name": "How to calculate power-to-weight ratio for motorcycles?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Obtain engine power, check motorcycle weight, divide power by weight. Higher ratio equals faster acceleration."
                }
              },
              {
                "@type": "Question",
                "name": "How to calculate cycling power-to-weight ratio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Measure watts via a power meter, divide by body weight in kg. Use PWR to assess climbing/sprinting efficiency."
                }
              },
              {
                "@type": "Question",
                "name": "How to calculate power-to-weight ratio per ton?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Convert weight into tons (1 ton = 1,000 kg or 2,204 lb), then divide power by total tons."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
