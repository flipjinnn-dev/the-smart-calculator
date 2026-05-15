import type { Author } from '@/lib/sanity/client';

/**
 * Shown on the homepage when Sanity returns no authors (e.g. local dev without CMS).
 * Slugs match production creator URLs — see public/llms.txt.
 */
export const HOMEPAGE_FALLBACK_AUTHORS: Author[] = [
  {
    _id: 'fallback-george-charles',
    name: 'George Charles',
    slug: 'george-charles',
    tagline: 'George Charles – Software, Web & IT Expert',
    calculatorCount: 1,
  },
  {
    _id: 'fallback-andres-montoya',
    name: 'Andrés Montoya',
    slug: 'andres-montoya',
    tagline: 'Business Strategy & Growth Expert',
    postCount: 1,
  },
  {
    _id: 'fallback-realynn-reed',
    name: 'Realynn Reed',
    slug: 'realynn-reed',
    tagline: 'Realynn Reed Physics Expert',
    postCount: 1,
  },
  {
    _id: 'fallback-felix-yacoub',
    name: 'Felix Yacoub',
    slug: 'felix-yacoub',
    tagline: 'Felix Yacoub Mathematics Expert',
    postCount: 1,
  },
  {
    _id: 'fallback-antonio-ares',
    name: 'Antonio Ares',
    slug: 'antonio-ares',
    tagline: 'Antonio Ares – Sports & Performance Consultant',
    postCount: 1,
  },
  {
    _id: 'fallback-simon-stephen',
    name: 'Simon Stephen',
    slug: 'simon-stephen',
    tagline: 'Simon Stephen Health & Fitness Expert',
    postCount: 2,
  },
  {
    _id: 'fallback-aiden-asher',
    name: 'Aiden Asher',
    slug: 'aiden-asher',
    tagline: 'Aiden Asher – Specialist, Useful Calculators',
    postCount: 1,
  },
  {
    _id: 'fallback-neo-nicholas',
    name: 'Neo Nicholas',
    slug: 'neo-nicholas',
    tagline: 'Neo Nicholas Financial Accounting Expert',
    postCount: 2,
  },
  {
    _id: 'fallback-hudson-hale',
    name: 'Hudson Hale',
    slug: 'hudson-hale',
    tagline: 'Hudson Hale | Construction Calculator Expert',
    postCount: 1,
  },
  {
    _id: 'fallback-jessica-adam',
    name: 'Jessica Adam',
    slug: 'jessica-adam',
    tagline: 'Chef Jessica Adam | Food & Nutrition Expert',
    postCount: 1,
  },
];
