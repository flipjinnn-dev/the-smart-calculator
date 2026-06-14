import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

import Script from "next/script";

const CALCULATOR_ID = "strength-level-calculator";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.thesmartcalculator.com/health/strength-level-calculator#breadcrumb",
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
          name: "Health Calculators",
          item: "https://www.thesmartcalculator.com/health/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Strength Level Calculator",
          item: "https://www.thesmartcalculator.com/health/strength-level-calculator",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.thesmartcalculator.com/health/strength-level-calculator#webpage",
      url: "https://www.thesmartcalculator.com/health/strength-level-calculator",
      name: "Strength Level Calculator",
      description:
        "Calculate your one rep max (1RM), compare lifting strength standards, and discover whether your bench press, squat, or deadlift falls into Beginner, Novice, Intermediate, Advanced, or Elite level.",
      inLanguage: "en",
      isPartOf: {
        "@id": "https://www.thesmartcalculator.com/#website",
      },
      breadcrumb: {
        "@id": "https://www.thesmartcalculator.com/health/strength-level-calculator#breadcrumb",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.thesmartcalculator.com/#website",
      url: "https://www.thesmartcalculator.com/",
      name: "The Smart Calculator",
      publisher: {
        "@id": "https://www.thesmartcalculator.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      name: "The Smart Calculator",
      url: "https://www.thesmartcalculator.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.thesmartcalculator.com/logo.png",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.thesmartcalculator.com/health/strength-level-calculator#webapplication",
      name: "Strength Level Calculator",
      url: "https://www.thesmartcalculator.com/health/strength-level-calculator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web Browser",
      browserRequirements: "Requires JavaScript",
      description:
        "Free online strength level calculator that estimates your one rep max (1RM), compares lifting strength standards, and analyzes your bench press, squat, deadlift, and overall gym performance.",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1234",
        bestRating: "5",
        worstRating: "1",
      },
      creator: {
        "@id": "https://www.thesmartcalculator.com/#organization",
      },
      featureList: [
        "Strength level calculator",
        "One rep max calculator",
        "Bench press strength calculator",
        "Squat strength calculator",
        "Deadlift strength calculator",
        "Bodyweight strength calculator",
        "Powerlifting strength standards",
        "Relative strength calculator",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.thesmartcalculator.com/health/strength-level-calculator#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the strength level calculator accurate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, within reasonable margins. The calculator uses the Epley formula for 1RM estimation, which carries a ±5% margin of error. For the most accurate result, use rep ranges of 3–8. If you want maximum precision, test your actual 1RM in a gym under proper conditions.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this as a bench press strength calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Simply select Bench Press from the lift options, enter your bodyweight, then input your weight and reps. The calculator estimates your 1RM and instantly compares it against bodyweight-adjusted bench press strength standards.",
          },
        },
        {
          "@type": "Question",
          name: "Does the calculator work for women?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The calculator applies separate female strength standards that account for differences in muscle mass and hormonal profile. Female lifters are compared only against female norms, giving you a fair and accurate strength level result.",
          },
        },
        {
          "@type": "Question",
          name: "How often should I recalculate my strength level?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recalculate every 4–6 weeks. This timeframe aligns with standard training blocks and gives your body enough time to make measurable strength gains. Testing too frequently can be misleading due to daily performance variation.",
          },
        },
        {
          "@type": "Question",
          name: "What is a good strength level for a beginner?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Reaching the Novice level within your first 6 months of training is a solid and realistic goal. Most lifters who train consistently 3 times per week can achieve Novice on squat and deadlift within that window.",
          },
        },
        {
          "@type": "Question",
          name: "Is this calculator useful for powerlifting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It compares your squat, bench press, and deadlift numbers against strength standards used by competitive powerlifting federations. You can use it to assess where you stand before entering your first competition.",
          },
        },
        {
          "@type": "Question",
          name: "What lifts does the calculator support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The calculator currently supports Bench Press, Squat, Deadlift, Overhead Press, Leg Press, and Barbell Row. Testing all lifts gives you a complete overall strength profile rather than a single lift snapshot.",
          },
        },
        {
          "@type": "Question",
          name: "Does bodyweight affect my strength level result?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, bodyweight plays a major role. The calculator uses relative strength, meaning your 1RM is measured against your bodyweight. A 100 kg bench press means something different for a 60 kg lifter versus a 100 kg lifter.",
          },
        },
      ],
    },
  ],
};


export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function StrengthLevelCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="strength-level-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
