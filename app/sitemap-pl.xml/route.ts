import { NextResponse } from 'next/server';
import { calculatorsMeta } from '@/meta/calculators';
import { getCategoryCanonicalUrl } from '@/lib/url-utils';
import { getAllGames } from '@/lib/games-data';

export async function GET() {
  const baseUrl = 'https://www.thesmartcalculator.com';
  const lastMod = new Date().toISOString();
  const lang = 'pl';

  const urls: Array<{ loc: string; priority: number; changefreq: string }> = [];

  // Homepage
  urls.push({
    loc: `${baseUrl}/${lang}`,
    priority: 1.0,
    changefreq: 'daily',
  });

  // Static pages (Polish)
  const staticPages = [
    { path: 'o-nas', priority: 0.7 },
    { path: 'kontakt', priority: 0.7 },
    { path: 'polityka-prywatnosci', priority: 0.5 },
    { path: 'warunki', priority: 0.5 },
  ];

  staticPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}/${lang}/${page.path}`,
      priority: page.priority,
      changefreq: 'monthly',
    });
  });

  // Games pages - dynamically from games-data.ts (English only)
  urls.push({
    loc: `${baseUrl}/games`,
    priority: 0.8,
    changefreq: 'weekly',
  });

  const allGames = getAllGames();
  allGames.forEach(game => {
    urls.push({
      loc: `${baseUrl}${game.href}`,
      priority: 0.8,
      changefreq: 'weekly',
    });
  });

  // Category pages (Polish) - Using dynamic function
  const categories = ['financial', 'health', 'construction', 'food', 'sports', 'maths', 'physics', 'other'];

  categories.forEach(categoryId => {
    try {
      const categoryUrl = getCategoryCanonicalUrl(categoryId, lang);
      urls.push({
        loc: categoryUrl,
        priority: 0.8,
        changefreq: 'weekly',
      });
    } catch (error) {
      console.warn(`Failed to generate category URL for ${categoryId}`);
    }
  });

  // All calculators (Polish URLs from metadata with complete paths)
  Object.entries(calculatorsMeta).forEach(([calculatorId, meta]) => {
    if (meta[lang]) {
      urls.push({
        loc: `${baseUrl}${meta[lang].slug}`,
        priority: 0.9,
        changefreq: 'weekly',
      });
    }
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
