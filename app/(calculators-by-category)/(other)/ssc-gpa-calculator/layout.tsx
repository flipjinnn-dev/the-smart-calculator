import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

import Script from "next/script";

const CALCULATOR_ID = "ssc-gpa-calculator";


export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function SscGpaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SSC GPA Calculator",
    "url": "https://www.thesmartcalculator.com/ssc-gpa-calculator",
    "description": "Free online SSC GPA Calculator to compute Grade Point Average based on Bangladesh SSC grading system with instant results.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "SSC GPA Calculator",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Bangladesh SSC GPA calculation",
          "Automatic grade to grade point conversion",
          "Optional subject bonus calculation",
          "GPA to percentage conversion",
          "GPA to marks conversion",
          "Instant accurate results",
          "Mobile-friendly interface"
        ],
        "url": "https://www.thesmartcalculator.com/ssc-gpa-calculator"
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate SSC GPA",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Subject Marks",
            "text": "Input marks or select grades for all 9 mandatory subjects (Bangla, English, Math, Religion, IT, BGS, Physics, Chemistry, Biology)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Add Optional Subject",
            "text": "Enter marks for optional subject if applicable (Agriculture, Home Economics, etc.)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Calculate GPA",
            "text": "Click Calculate to get your SSC GPA based on the official Bangladesh grading system."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Results",
            "text": "See your GPA (0.00 to 5.00 scale), equivalent percentage, and grade breakdown."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an SSC GPA calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An SSC GPA calculator is a digital tool used to compute Grade Point Average based on SSC grading rules, converting marks to grade points and calculating the final GPA on a 5.00 scale."
            }
          },
          {
            "@type": "Question",
            "name": "How to calculate SSC GPA manually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Convert marks to grade points using the grading scale, add all grade points, adjust optional subject points (minus 2), then divide by 9 main subjects to get the final GPA."
            }
          },
          {
            "@type": "Question",
            "name": "What is the SSC GPA calculation system?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The SSC GPA calculation system uses a 5.00 scale where A+ (80-100%) = 5.0, A (70-79%) = 4.0, A- (60-69%) = 3.5, B (50-59%) = 3.0, C (40-49%) = 2.0, D (33-39%) = 1.0, and F (0-32%) = 0.0."
            }
          },
          {
            "@type": "Question",
            "name": "How does an SSC GPA to percentage calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It multiplies GPA by 20 (in Bangladesh format) to convert GPA into percentage. For example, 4.60 GPA × 20 = 92%."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate SSC GPA with marks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, use an SSC GPA calculator with marks to automatically convert marks into grade points and calculate your final GPA."
            }
          },
          {
            "@type": "Question",
            "name": "What is the highest SSC GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In Bangladesh SSC system, the highest GPA is 5.00, achieved by scoring A+ (80-100%) in all subjects."
            }
          },
          {
            "@type": "Question",
            "name": "Is SSC GPA different from middle school GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. A middle school GPA calculator typically uses a 4.0 scale and may not include credits, while SSC follows national exam rules with a 5.00 scale."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I get F in one subject?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If you receive F grade in any mandatory subject, your overall SSC GPA becomes 0.00 regardless of other grades."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {children}
      <Script
        id="ssc-gpa-calculator-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
