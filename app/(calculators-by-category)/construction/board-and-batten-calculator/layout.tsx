import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board and Batten Calculator - Estimate Boards, Battens & Spacing",
  description: "Quickly calculate boards, battens, spacing, and siding materials for your wall project with our easy Board and Batten Calculator.",
  keywords: [
    "board and batten calculator",
    "board and batten siding calculator",
    "board and batten wall calculator",
    "board and batten spacing calculator",
    "board and batten material calculator",
    "DIY board and batten calculator",
    "board and batten estimator",
    "board and batten layout calculator",
    "farmhouse siding calculator",
    "vertical siding calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/board-and-batten-calculator",
    languages: {
      'x-default': "https://www.thesmartcalculator.com/construction/board-and-batten-calculator",
      'en': "https://www.thesmartcalculator.com/construction/board-and-batten-calculator",
    }
  },
  openGraph: {
    title: "Board and Batten Calculator - Estimate Boards, Battens & Spacing",
    description: "Quickly calculate boards, battens, spacing, and siding materials for your wall project with our easy Board and Batten Calculator.",
    type: "website",
    url: "https://www.thesmartcalculator.com/construction/board-and-batten-calculator",
    siteName: "Smart Calculator",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Board and Batten Calculator - Estimate Boards, Battens & Spacing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Board and Batten Calculator - Estimate Boards, Battens & Spacing",
    description: "Quickly calculate boards, battens, spacing, and siding materials for your wall project with our easy Board and Batten Calculator."
  }
};

export default function BoardAndBattenCalculatorLayout({
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
                "name": "What is board and batten siding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Board and batten siding is a wall siding method where wide vertical boards are installed first, and narrow battens are placed over the seams between the boards. This creates a layered, textured appearance commonly used in farmhouse and barn-style architecture."
                }
              },
              {
                "@type": "Question",
                "name": "How do you calculate board and batten spacing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To calculate board and batten spacing, divide the wall width by the combined width of the board and the desired spacing. The result determines how many boards will fit across the wall."
                }
              },
              {
                "@type": "Question",
                "name": "How to calculate board and batten wall materials?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To estimate materials: Measure wall width and height, determine board width, choose spacing between boards, divide wall width by board width + spacing. This calculation provides the number of boards and battens needed."
                }
              },
              {
                "@type": "Question",
                "name": "How many battens do I need?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In most board and batten layouts, the number of battens equals the number of boards minus one, because battens cover the seams between boards."
                }
              },
              {
                "@type": "Question",
                "name": "Is board and batten the same as wainscoting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Wainscoting usually covers the lower portion of a wall, while board and batten can cover an entire wall or exterior siding."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
