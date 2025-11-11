import { NextResponse } from 'next/server';
import { calculatorsMeta } from '@/meta/calculators';
import { getCategoryCanonicalUrl } from '@/lib/url-utils';

export async function GET() {
  const baseUrl = 'https://www.thesmartcalculator.com';
  const lastMod = new Date().toISOString();

  const urls: Array<{ loc: string; priority: number; changefreq: string }> = [];

  // Homepage
  urls.push({
    loc: baseUrl,
    priority: 1.0,
    changefreq: 'daily',
  });

  // Static pages
  const staticPages = [
    { path: '/about-us', priority: 0.7 },
    { path: '/contact-us', priority: 0.7 },
    { path: '/privacy-policy', priority: 0.5 },
    { path: '/terms-and-conditions', priority: 0.5 },
  ];

  staticPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      priority: page.priority,
      changefreq: 'monthly',
    });
  });

  // Category pages - Using dynamic function
  const categories = ['financial', 'health', 'construction', 'food', 'sports', 'maths', 'physics', 'other'];

  categories.forEach(categoryId => {
    try {
      const categoryUrl = getCategoryCanonicalUrl(categoryId, 'en');
      urls.push({
        loc: categoryUrl,
        priority: 0.8,
        changefreq: 'weekly',
      });
    } catch (error) {
      console.warn(`Failed to generate category URL for ${categoryId}`);
    }
  });

  // All calculators (English URLs from metadata)
  Object.entries(calculatorsMeta).forEach(([calculatorId, meta]) => {
    if (meta.en) {
      urls.push({
        loc: `${baseUrl}${meta.en.slug}`,
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
