import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UIF Calculator South Africa Payout Tools",
  description: "Use this UIF calculator to estimate unemployment and maternity payouts in South Africa. Calculate UIF contributions, deductions, and benefits online.",
  keywords: [
    "UIF calculator",
    "UIF calculator South Africa",
    "UIF benefits calculator",
    "UIF unemployment calculator",
    "UIF maternity calculator",
    "UIF deduction calculator",
    "UIF contribution calculator",
    "UIF calculator online",
    "UIF payout calculator",
    "UIF maternity leave calculator South Africa"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/uif-calculator",
    languages: {
      'x-default': "https://www.thesmartcalculator.com/uif-calculator",
      'en': "https://www.thesmartcalculator.com/uif-calculator",
    }
  },
  openGraph: {
    title: "UIF Calculator South Africa Payout Tools",
    description: "Use this UIF calculator to estimate unemployment and maternity payouts in South Africa. Calculate UIF contributions, deductions, and benefits online.",
    type: "website",
    url: "https://www.thesmartcalculator.com/uif-calculator",
    siteName: "Smart Calculator",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "UIF Calculator South Africa Payout Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UIF Calculator South Africa Payout Tools",
    description: "Use this UIF calculator to estimate unemployment and maternity payouts in South Africa. Calculate UIF contributions, deductions, and benefits online."
  }
};

export default function UIFCalculatorLayout({
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
                "name": "What is a UIF calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A UIF calculator estimates how much money you may receive from the Unemployment Insurance Fund if you become unemployed or take maternity leave."
                }
              },
              {
                "@type": "Question",
                "name": "How do you calculate UIF benefits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UIF benefits are calculated using: Daily income, Income Replacement Rate, and Contribution credits. A UIF benefits calculator automatically performs this calculation."
                }
              },
              {
                "@type": "Question",
                "name": "How to calculate how much UIF I will get?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multiply your salary by approximately 38%–60%, depending on your income level. A UIF calculator South Africa provides a more accurate estimate."
                }
              },
              {
                "@type": "Question",
                "name": "What is UIF calculated on?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UIF is calculated based on: Monthly salary, UIF contribution history, Income replacement rate, and Credit days."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a UIF calculator for maternity leave?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. A UIF calculator for maternity leave estimates payments during maternity leave based on your salary and UIF contributions."
                }
              },
              {
                "@type": "Question",
                "name": "What is a UIF deduction calculator South Africa?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A UIF deduction calculator South Africa estimates monthly deductions from your salary and your employer's contribution."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a UIF calculator online South Africa?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Many websites offer a UIF calculator online South Africa where you can enter your salary to estimate benefits instantly."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
