import type { Metadata } from "next";
import Script from "next/script";

const angleWeightCalculatorMeta = {
  title: "Angle Weight Calculator in KG – Steel & MS",
  description: "Use our angle weight calculator to find steel, MS, SS, and aluminum angle weight in kg. Includes formula, chart, and online calculator.",
  keywords: "angle weight calculator, steel angle weight calculator, ms angle weight calculator, angle weight calculation formula, equal angle weight calculator, unequal angle weight calculator, angle weight chart, angle bar weight calculator, ss angle weight calculator, aluminum angle weight calculator, angle iron weight calculator, l angle weight calculator, angle section weight calculator, angle weight calculator in kg, angle weight calculator online, angle weight calculator excel, angle weight chart pdf"
};

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = 'https://www.thesmartcalculator.com/construction/angle-weight-calculator';

  return {
    title: {
      default: angleWeightCalculatorMeta.title,
      template: '%s | The Smart Calculator'
    },
    description: angleWeightCalculatorMeta.description,
    keywords: angleWeightCalculatorMeta.keywords,
    authors: [{ name: 'The Smart Calculator' }],
    creator: 'The Smart Calculator',
    publisher: 'The Smart Calculator',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://www.thesmartcalculator.com'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: angleWeightCalculatorMeta.title,
      description: angleWeightCalculatorMeta.description,
      url: canonicalUrl,
      siteName: 'The Smart Calculator',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: angleWeightCalculatorMeta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: angleWeightCalculatorMeta.title,
      description: angleWeightCalculatorMeta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function AngleWeightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an angle weight calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An angle weight calculator is a tool used to determine the weight of L-shaped metal sections based on their dimensions, length, and material density.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do you calculate angle weight?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The angle weight calculation formula is: Weight = Cross-section Area × Length × Density. For steel: Weight/m = (A + B − T) × T × 0.00785'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the weight of a 50×50×6 angle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 50×50×6 mm equal angle weighs approximately 4.43 kg per meter.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I download an angle weight chart PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many engineering websites and steel manufacturers provide angle weight chart PDF files containing standard size tables.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is there an angle weight calculator in Excel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many engineers use an angle weight calculator Excel spreadsheet to automatically calculate weight for multiple angle sizes.'
        }
      },
      {
        '@type': 'Question',
        name: 'What materials can be calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most calculators support Mild Steel, Stainless Steel, and Aluminum. This allows use as a steel angle weight calculator, ss angle weight calculator, or aluminum angle weight calculator.'
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="json-ld-angle-weight-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
