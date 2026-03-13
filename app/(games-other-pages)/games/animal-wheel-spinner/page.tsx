import { Metadata } from 'next';
import Script from 'next/script';
import AnimalWheelClient from './animal-wheel-client';

export const metadata: Metadata = {
  title: 'Animal Wheel Spinner: Fun & Random Animal Generator',
  description: 'Spin the animal wheel online or toy version to pick random animals. Perfect for games, learning, or fun activities for kids and adults.',
  keywords: 'animal wheel spinner, animal spin wheel, random animal generator wheel, animal spinner online, animal wheel spinner online, animal spin wheel game, farm animal wheel spinner, pet wheel spinner, cute animal wheel spinner, animal generator wheel, spinning animal wheel, animal wheel spinner toy',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/animal-wheel-spinner',
    languages: {
      'x-default': 'https://www.thesmartcalculator.com/games/animal-wheel-spinner',
      'en': 'https://www.thesmartcalculator.com/games/animal-wheel-spinner',
    }
  },
  openGraph: {
    title: 'Animal Wheel Spinner: Fun & Random Animal Generator',
    description: 'Spin the animal wheel online or toy version to pick random animals. Perfect for games, learning, or fun activities for kids and adults.',
    url: 'https://www.thesmartcalculator.com/games/animal-wheel-spinner',
    type: 'website',
    siteName: 'The Smart Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Animal Wheel Spinner: Fun & Random Animal Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animal Wheel Spinner: Fun & Random Animal Generator',
    description: 'Spin the animal wheel online or toy version to pick random animals. Perfect for games, learning, or fun activities for kids and adults.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Animal Wheel Spinner',
  description: 'Spin the animal wheel online or toy version to pick random animals. Perfect for games, learning, or fun activities for kids and adults.',
  url: 'https://www.thesmartcalculator.com/games/animal-wheel-spinner',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1450',
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
      name: 'Animal Wheel Spinner',
      item: 'https://www.thesmartcalculator.com/games/animal-wheel-spinner',
    },
  ],
};

export default function AnimalWheelPage() {
  return (
    <>
      <Script
        id="structured-data-animal-wheel"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <AnimalWheelClient />
    </>
  );
}
