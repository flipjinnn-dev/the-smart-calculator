import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "uif-calculator";


export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

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
