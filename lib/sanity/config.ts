import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== '00000000' &&
  Boolean(process.env.NEXT_PUBLIC_SANITY_DATASET);

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Disable CDN to always fetch fresh data
  token: process.env.SANITY_API_TOKEN, // Optional: for draft content
};

const fallbackSanityConfig = {
  projectId: '00000000',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
};

export const client = createClient(
  isSanityConfigured ? sanityConfig : fallbackSanityConfig
);

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
