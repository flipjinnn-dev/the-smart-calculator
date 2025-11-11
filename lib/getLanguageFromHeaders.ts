import { headers } from 'next/headers';

// Server-side function to get language from headers
export async function getLanguageFromHeaders() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  return language;
}