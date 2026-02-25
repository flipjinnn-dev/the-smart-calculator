import { Metadata } from 'next';
import AestheticWheelClient from './aesthetic-wheel-client';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Aesthetic Wheel: Spin & Discover Your Style',
  description: 'Use the Aesthetic Wheel to spin and discover outfits, themes, colors, names, and creative ideas instantly. Simple, fun, and inspiring.',
  keywords: 'aesthetic wheel, aesthetic spinner, style wheel, outfit picker, aesthetic generator, theme wheel, color palette wheel, aesthetic ideas, grunge aesthetic, soft girl aesthetic, dark academia, cottagecore, y2k aesthetic',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/aesthetic-wheel-spinner',
  },
  openGraph: {
    title: 'Aesthetic Wheel: Spin & Discover Your Style',
    description: 'Use the Aesthetic Wheel to spin and discover outfits, themes, colors, names, and creative ideas instantly. Simple, fun, and inspiring.',
    url: 'https://www.thesmartcalculator.com/games/aesthetic-wheel-spinner',
    type: 'website',
    siteName: 'The Smart Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aesthetic Wheel: Spin & Discover Your Style',
    description: 'Use the Aesthetic Wheel to spin and discover outfits, themes, colors, names, and creative ideas instantly. Simple, fun, and inspiring.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Aesthetic Wheel Spinner',
  description: 'Use the Aesthetic Wheel to spin and discover outfits, themes, colors, names, and creative ideas instantly. Simple, fun, and inspiring.',
  url: 'https://www.thesmartcalculator.com/games/aesthetic-wheel-spinner',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
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
      name: 'Aesthetic Wheel Spinner',
      item: 'https://www.thesmartcalculator.com/games/aesthetic-wheel-spinner',
    },
  ],
};

export default function AestheticWheelPage() {
  return (
    <>
      <Script
        id="structured-data-aesthetic-wheel"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <AestheticWheelClient />
    </>
  );
}
