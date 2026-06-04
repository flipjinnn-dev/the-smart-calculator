import Script from "next/script";

import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "nm-to-ft-lbs-converter";

export const dynamic = "force-static";

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
          name: "Nm to Ft-Lbs Converter",
          item: "https://www.thesmartcalculator.com/nm-to-ft-lbs-converter",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Nm to Ft-Lbs Converter — The Smart Calculator",
      description:
        "Convert Newton Meters (Nm) to Foot-Pounds (ft-lbs) instantly with our free torque unit converter. Perfect for automotive repair, engine specs, and torque wrench settings.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Windows, macOS, Android, iOS",
      softwareVersion: "9.2.1",
      url: "https://www.thesmartcalculator.com/nm-to-ft-lbs-converter",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.4",
        ratingCount: "1249",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "Aiden Asher",
        url: "https://www.thesmartcalculator.com/",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I convert 100 Nm to ft-lbs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Multiply 100 by 0.7376. The answer is 73.76 ft-lbs. This is the standard lug nut torque specification for most passenger cars worldwide.",
          },
        },
        {
          "@type": "Question",
          name: "What is 200 Nm in ft-lbs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "200 Nm equals 147.51 ft-lbs. You commonly see this torque value on heavy-duty SUV wheel bolts and larger engine accessory mounts.",
          },
        },
        {
          "@type": "Question",
          name: "How much is 300 Nm in ft-lbs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "300 Nm converts to 221.27 ft-lbs. Large petrol and diesel engine cylinder head bolts frequently carry this torque specification.",
          },
        },
        {
          "@type": "Question",
          name: "What is 400 Nm and 500 Nm in ft-lbs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "400 Nm equals 295.02 ft-lbs and 500 Nm equals 368.78 ft-lbs. These high-torque values appear on flywheel bolts, differential pinion nuts, and heavy truck wheel fasteners.",
          },
        },
        {
          "@type": "Question",
          name: "How do I convert 1000 Nm to ft-lbs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "1000 Nm equals 737.56 ft-lbs. This extreme torque level applies to semi-truck drive axles, crane mounting bolts, and large industrial machinery fasteners.",
          },
        },
        {
          "@type": "Question",
          name: "What is the exact Nm to ft-lbs conversion formula?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The formula is ft-lbs = Nm × 0.737562. For reverse conversion use Nm = ft-lbs × 1.355818. These constants are internationally standardized and apply to all engineering torque calculator applications.",
          },
        },
        {
          "@type": "Question",
          name: "Is a Newton Meter bigger than a foot-pound?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. One Nm equals 0.7376 ft-lbs, which means a Newton Meter is approximately 35 percent larger than a foot-pound. When you convert Nm to ft-lbs, your result always decreases. If your number goes up, you have reversed the formula — correct it immediately before applying torque.",
          },
        },
      ],
    },
  ],
};

export default function NmToFtLbsConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="nm-to-ft-lbs-converter-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
