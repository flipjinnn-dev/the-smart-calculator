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
          name: "Electricity Bill Calculator",
          item: "https://www.thesmartcalculator.com/electricity-bill-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Electricity Bill Calculator",
      description:
        "An electricity bill calculator estimates your monthly electricity cost using appliance wattage, daily usage hours, and local kWh rate. Based on U.S. Energy Information Administration (EIA) standards, it helps users calculate electricity bills accurately and reduce utility costs.",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      softwareVersion: "9.2.1",
      url: "https://www.thesmartcalculator.com/electricity-bill-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        ratingCount: "1500",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "Aiden Asher",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I calculate my electricity bill from a meter reading?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Subtract your previous meter reading from your current reading to get total kWh consumed. Multiply by your electricity rate per kWh to get your bill.",
          },
        },
        {
          "@type": "Question",
          name: "What is the average monthly electricity bill in the US?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The average US household uses about 877 kWh per month, resulting in a bill of around $137–$150 depending on state and usage.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate electricity cost by kWh?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Multiply total kWh usage by your electricity rate. Example: 500 kWh × $0.1611 = $80.55.",
          },
        },
        {
          "@type": "Question",
          name: "What uses the most electricity in a home?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Heating and cooling systems use the most electricity, followed by water heaters, refrigerators, and laundry appliances.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this calculator for commercial electricity bills?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can enter commercial equipment usage and rates to estimate business electricity costs accurately.",
          },
        },
        {
          "@type": "Question",
          name: "How do I lower my monthly electric bill?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use LED lighting, energy-efficient appliances, smart thermostats, and reduce standby power consumption to lower bills.",
          },
        },
        {
          "@type": "Question",
          name: "Is this electricity bill calculator free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, this calculator is completely free and does not require any registration.",
          },
        },
      ],
    },
  ],
};

export default function ElectricityBillCalculatorLayout({
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
