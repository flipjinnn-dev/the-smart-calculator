import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Disable CDN to always fetch fresh data
  token: process.env.SANITY_API_TOKEN, // Optional: for draft content
};

export const client = createClient(sanityConfig);

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
