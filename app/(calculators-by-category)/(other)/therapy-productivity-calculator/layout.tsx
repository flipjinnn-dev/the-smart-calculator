import type { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.thesmartcalculator.com";
  const canonicalUrl = `${baseUrl}/therapy-productivity-calculator`;

  return {
    title: "Productivity Calculator – Therapy Productivity Calculator",
    description: "Use our free Therapy Productivity Calculator to track therapist efficiency, measure patient care time, and improve clinic workflow easily.",
    keywords: "therapy productivity calculator, therapist productivity, patient care time calculator, clinic productivity, therapy efficiency calculator, PT productivity, OT productivity",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Productivity Calculator – Therapy Productivity Calculator",
      description: "Use our free Therapy Productivity Calculator to track therapist efficiency, measure patient care time, and improve clinic workflow easily.",
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Therapy Productivity Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Productivity Calculator – Therapy Productivity Calculator",
      description: "Use our free Therapy Productivity Calculator to track therapist efficiency, measure patient care time, and improve clinic workflow easily.",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TherapyProductivityCalculatorLayout({ children }: { children: React.ReactNode }) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Therapy Productivity Calculator",
    "url": "https://www.thesmartcalculator.com/therapy-productivity-calculator",
    "description": "Use our free Therapy Productivity Calculator to track therapist efficiency, measure patient care time, and improve clinic workflow easily.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Therapy Productivity Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate therapy productivity percentage",
          "Track billable vs non-billable time",
          "Support for clock-in/clock-out time tracking",
          "Optional unpaid break time deduction",
          "Reverse calculation from productivity target",
          "Works for PT, OT, PTA & rehab clinics"
        ],
        "url": "https://www.thesmartcalculator.com/therapy-productivity-calculator"
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Therapy Productivity",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Clock-In and Clock-Out Times",
            "text": "Input your clock-in time and clock-out time to define total working hours."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Break Time (Optional)",
            "text": "Enter any unpaid break time in minutes to exclude from total work time."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter Patient Care Time",
            "text": "Input the total minutes spent in direct patient care (billable time)."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Results",
            "text": "View your therapy productivity percentage, total work time, and step-by-step calculation breakdown."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What factors affect therapy productivity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Patient complexity, documentation time, no-shows, and clinic workflows."
            }
          },
          {
            "@type": "Question",
            "name": "How can therapists improve productivity?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Better scheduling, reminder systems, delegation, and technology use."
            }
          },
          {
            "@type": "Question",
            "name": "Is higher productivity always better?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Extremely high productivity may reduce care quality or cause burnout."
            }
          },
          {
            "@type": "Question",
            "name": "Can this calculator handle multiple therapists?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Calculate individual productivity or compare team performance."
            }
          },
          {
            "@type": "Question",
            "name": "Does the calculator account for lunch or unpaid breaks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can include or exclude breaks for accurate results."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="therapy-productivity-calculator-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
