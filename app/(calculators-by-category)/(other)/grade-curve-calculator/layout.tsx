import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

const gradeCurveCalculatorMeta = {
  en: {
    title: "Grade Curve Calculator Free Online",
    description: "Use our Grade Curve Calculator to assign A-F grades fairly with bell curve or fixed range. Step-by-step examples make grading simple and accurate.",
    keywords: "grade curve calculator, grading curve calculator, bell curve grade calculator, curve grading calculator, grading on a curve calculator, grade calculator with curve, bell curve grading calculator, normal distribution grading"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && gradeCurveCalculatorMeta[langHeader as keyof typeof gradeCurveCalculatorMeta]
      ? langHeader
      : "en";

  const meta = gradeCurveCalculatorMeta[language as keyof typeof gradeCurveCalculatorMeta];

  const canonicalUrl = getCanonicalUrl('grade-curve-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('grade-curve-calculator', 'en'),
        'en': getCanonicalUrl('grade-curve-calculator', 'en'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function GradeCurveCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Grade Curve Calculator",
    "url": "https://www.thesmartcalculator.com/grade-curve-calculator",
    "description": "A grade curve calculator helps teachers and students assign letter grades fairly by using statistical methods such as the bell curve or fixed percentage distributions.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Grade Curve Calculator",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Linear rescaling method",
          "Ratio scaling method",
          "Bell curve (normal distribution) method",
          "Square root curving method",
          "Grade distribution visualization",
          "Statistical analysis with mean and standard deviation",
          "Support for up to 30 student scores",
          "Instant curved grade calculation"
        ],
        "url": "https://www.thesmartcalculator.com/grade-curve-calculator"
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Grade Curve Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Student Scores",
            "text": "Input your list of student scores (0-100) into the calculator. You can add up to 30 scores."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Curving Method",
            "text": "Choose from Linear Rescaling, Ratio Scaling, Bell Curve, or Square Root method based on your grading needs."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Parameters (Optional)",
            "text": "For bell curve method, optionally set target mean and standard deviation values."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate Curved Grades",
            "text": "Click 'Calculate Curve' to instantly see curved scores, grade distribution, and statistical analysis."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Review Results",
            "text": "View detailed results including individual score changes, letter grades, and overall class statistics."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between absolute grading and grade curving?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolute grading assigns grades based on fixed score thresholds. Curve grading adjusts grades relative to class performance."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use a grade curve calculator for small classes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It's less effective for small classes (<10 students) because statistical patterns may not be meaningful."
            }
          },
          {
            "@type": "Question",
            "name": "Is grade curving fair?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fairness depends on the test context. It's fair in challenging exams but may penalize top performers in easier tests."
            }
          },
          {
            "@type": "Question",
            "name": "What is the formula for curving grades?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For bell curve: z = (x - μ)/σ. For fixed range, divide score range into percentage bands and assign grades accordingly."
            }
          },
          {
            "@type": "Question",
            "name": "Which curving method should I use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Linear rescaling is simplest. Ratio scaling preserves proportions. Bell curve creates normal distribution. Square root helps lower scores more."
            }
          },
          {
            "@type": "Question",
            "name": "How does the bell curve method work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The bell curve method uses z-scores to standardize all scores, then redistributes them according to a new mean and standard deviation."
            }
          },
          {
            "@type": "Question",
            "name": "Can curved scores exceed 100?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In this calculator, curved scores are capped at 100 to maintain the standard grading scale."
            }
          },
          {
            "@type": "Question",
            "name": "What is a z-score in grade curving?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A z-score measures how many standard deviations a score is from the mean. It standardizes scores for redistribution."
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
        id="grade-curve-calculator-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
