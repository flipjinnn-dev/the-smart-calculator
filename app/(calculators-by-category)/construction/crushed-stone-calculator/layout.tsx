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
          name: "Crushed Stone Calculator",
          item: "https://www.thesmartcalculator.com/construction/crushed-stone-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Crushed Stone Calculator – The Smart Calculator",
      description:
        "Calculate how much crushed stone you need by entering area dimensions and depth. Instantly get cubic yards and US tons with 10% waste included.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Windows, macOS, Linux, Android, iOS",
      softwareVersion: "9.2.1",
      url: "https://www.thesmartcalculator.com/construction/crushed-stone-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.1",
        ratingCount: "1245",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "Hudson Hale",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much crushed stone do I need?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Multiply area by depth in feet, divide by 27 for cubic yards, multiply by 1.5 for tons, add 10% waste. A 20x10 ft area at 4 inches = 2.5 cubic yards or 3.7 tons.",
          },
        },
        {
          "@type": "Question",
          name: "How to calculate how much crushed stone I need manually?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Formula: (L x W x D / 12) / 27 = cubic yards. Multiply by 1.10 for waste, then by 1.5 for tons. Example: 10x8 ft at 4 inches = 1.09 cu yd = 1.63 tons.",
          },
        },
        {
          "@type": "Question",
          name: "How to calculate yards of crushed stone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "(Length x Width x Depth in feet) / 27. A 15x12 ft area at 3 inches = (15 x 12 x 0.25) / 27 = 1.67 cu yd. Add 10% waste = 1.83 cu yd.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate crushed stone for a driveway?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Measure length and width in feet. Use 4 to 6 inch depth for a new driveway, 2 inches for a top-up. A 20x20 ft driveway at 4 inches = 5 cu yd or 7.5 tons.",
          },
        },
        {
          "@type": "Question",
          name: "How to calculate crushed stone for a patio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter patio dimensions and 3 inch depth. A 12x10 ft patio = 1.1 cu yd or 1.7 tons including waste.",
          },
        },
        {
          "@type": "Question",
          name: "How many tons in a cubic yard of crushed stone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "1 cubic yard = 1.5 US tons = 3,000 lbs. Multiply cubic yards by 1.5 for tons. Divide tons by 1.5 for cubic yards.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between 3/4 inch and 3/8 inch crushed stone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "3/4 inch stone drains fast and compacts strong, making it ideal for driveways, bases, and drainage. 3/8 inch is finer and smoother, best for patios, walkways, and decorative surfaces.",
          },
        },
      ],
    },
  ],
};

export default function CrushedStoneCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {children}
    </>
  );
}
