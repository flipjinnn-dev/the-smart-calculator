import Script from "next/script";

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
          name: "Maths",
          item: "https://www.thesmartcalculator.com/maths",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Simplifying Radicals Calculator",
          item: "https://www.thesmartcalculator.com/maths/simplifying-radicals-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Simplifying Radicals Calculator",
      description:
        "Use Simplifying Radicals Calculator to simplify square, cube, and nth roots instantly with steps. Get exact radical form using prime factorization.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/maths/simplifying-radicals-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: "The Smart Calculator",
        url: "https://www.thesmartcalculator.com/",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I simplify radicals using prime factorization?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Write the radicand as a product of prime numbers. Group the primes into sets of n, where n is the root order. Each complete group moves outside the radical.",
          },
        },
        {
          "@type": "Question",
          name: "What is simplest radical form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A radical is in simplest form when no perfect nth-power factor remains under the root and no fraction appears under the radical sign.",
          },
        },
        {
          "@type": "Question",
          name: "Can I simplify cube roots and higher-order roots?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Set the root order to 3 for cube roots or any integer of 2 or above for nth roots.",
          },
        },
      ],
    },
  ],
};

export default function SimplifyingRadicalsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="simplifying-radicals-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
