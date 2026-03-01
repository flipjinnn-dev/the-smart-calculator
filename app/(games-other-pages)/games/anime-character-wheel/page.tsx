import { Metadata } from 'next';
import Script from 'next/script';
import AnimeCharacterWheelClient from './anime-character-wheel-client';

export const metadata: Metadata = {
  title: 'Anime Character Wheel – Spin Random Anime Picks',
  description: 'Use the anime character wheel to spin random anime characters instantly. Try the anime picker wheel and create your own generator wheel.',
  keywords: 'anime character wheel, random anime character wheel, anime characters spin wheel, anime picker wheel, spinning wheel anime characters, anime character creator wheel, spin the wheel anime characters, wheel of anime characters, anime character spin the wheel, random anime character generator wheel',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/games/anime-character-wheel',
  },
  openGraph: {
    title: 'Anime Character Wheel – Spin Random Anime Picks',
    description: 'Use the anime character wheel to spin random anime characters instantly. Try the anime picker wheel and create your own generator wheel.',
    url: 'https://www.thesmartcalculator.com/games/anime-character-wheel',
    type: 'website',
    siteName: 'The Smart Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anime Character Wheel – Spin Random Anime Picks',
    description: 'Use the anime character wheel to spin random anime characters instantly. Try the anime picker wheel and create your own generator wheel.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Anime Character Wheel',
  description: 'Use the anime character wheel to spin random anime characters instantly. Try the anime picker wheel and create your own generator wheel.',
  url: 'https://www.thesmartcalculator.com/games/anime-character-wheel',
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
    ratingCount: '2150',
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
      name: 'Anime Character Wheel',
      item: 'https://www.thesmartcalculator.com/games/anime-character-wheel',
    },
  ],
};

export default function AnimeCharacterWheelPage() {
  return (
    <>
      <Script
        id="structured-data-anime-character-wheel"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <AnimeCharacterWheelClient />
    </>
  );
}
