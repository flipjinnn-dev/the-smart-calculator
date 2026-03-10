import type { Metadata } from "next";
import Script from "next/script";

const inflectionPointCalculatorMeta = {
  title: "Inflection Point Calculator – Find Curve Inflections",
  description: "Use an inflection point calculator to find where a function changes concavity. Solve calculus problems online with steps and graphs.",
  keywords: "inflection point calculator, concavity calculator, point of inflection, calculus calculator, second derivative, curve analysis, inflection points and concavity calculator, critical and inflection point calculator"
};

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = 'https://www.thesmartcalculator.com/maths/inflection-point-calculator';

  return {
    title: {
      absolute: inflectionPointCalculatorMeta.title,
    },
    description: inflectionPointCalculatorMeta.description,
    keywords: inflectionPointCalculatorMeta.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: inflectionPointCalculatorMeta.title,
      description: inflectionPointCalculatorMeta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: inflectionPointCalculatorMeta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: inflectionPointCalculatorMeta.title,
      description: inflectionPointCalculatorMeta.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function InflectionPointCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Inflection Point Calculator - Find Points of Inflection with Steps",
    "url": "https://www.thesmartcalculator.com/maths/inflection-point-calculator",
    "description": "Use an inflection point calculator to find where a function changes concavity. Solve calculus problems online with steps and graphs.",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/logo.png"
      }
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an inflection point in calculus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An inflection point is a point on a curve where the concavity changes from upward to downward or vice versa, usually where the second derivative equals zero and changes sign."
          }
        },
        {
          "@type": "Question",
          "name": "How to calculate inflection point manually?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Find the second derivative, solve f''(x)=0, check sign change, and compute the corresponding y-value."
          }
        },
        {
          "@type": "Question",
          "name": "What is the best inflection point calculator online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Popular tools include Wolfram Alpha, Symbolab, and Mathway. These provide accurate results and step-by-step explanations."
          }
        },
        {
          "@type": "Question",
          "name": "Can Excel calculate inflection points?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Microsoft Excel can approximate inflection points using numerical derivatives and charts, though it is less precise than symbolic math tools."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between critical point and inflection point?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Critical points occur where f'(x)=0 (max or min), while inflection points occur where f''(x)=0 (concavity change)."
          }
        }
      ]
    }
  };

  return <>
    {children}
    <Script
      id="inflection-point-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
