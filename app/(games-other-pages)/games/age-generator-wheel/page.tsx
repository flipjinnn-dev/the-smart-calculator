import { Metadata } from 'next';
import Script from 'next/script';
import AgeGeneratorWheelClient from './age-generator-wheel-client';

export const metadata: Metadata = {
  title: 'Age Generator Wheel – Spin Random Age Picker',
  description: 'Use the Age Generator Wheel to spin and get a random age instantly. Customize age range, enjoy fair results, and play online free.',
  keywords: 'age generator wheel, age calculator wheel, age random wheel, wheel of age generator, age generator spin the wheel, age number wheel, age wheel picker, age range wheel, generator wheel number, random age generator, age picker, spin the wheel age',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/age-generator-wheel',
    languages: {
      'x-default': 'https://www.thesmartcalculator.com/games/age-generator-wheel',
      'en': 'https://www.thesmartcalculator.com/games/age-generator-wheel',
    }
  },
  openGraph: {
    title: 'Age Generator Wheel – Spin Random Age Picker',
    description: 'Use the Age Generator Wheel to spin and get a random age instantly. Customize age range, enjoy fair results, and play online free.',
    url: 'https://www.thesmartcalculator.com/games/age-generator-wheel',
    type: 'website',
    siteName: 'The Smart Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Generator Wheel – Spin Random Age Picker',
    description: 'Use the Age Generator Wheel to spin and get a random age instantly. Customize age range, enjoy fair results, and play online free.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Age Generator Wheel',
  description: 'Use the Age Generator Wheel to spin and get a random age instantly. Customize age range, enjoy fair results, and play online free.',
  url: 'https://www.thesmartcalculator.com/games/age-generator-wheel',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '980',
  },
};

const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.thesmartcalculator.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Games',
      item: 'https://www.thesmartcalculator.com/games',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Age Generator Wheel',
      item: 'https://www.thesmartcalculator.com/games/age-generator-wheel',
    },
  ],
};

export default function AgeGeneratorWheelPage() {
  return (
    <>
      <Script
        id="structured-data-age-generator-wheel"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <AgeGeneratorWheelClient />
    </>
  );
}
