import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.thesmartcalculator.com';
  const lastMod = new Date().toISOString();

  const languages = [
    { code: 'en', url: `${baseUrl}/sitemap-en.xml` },
    { code: 'de', url: `${baseUrl}/sitemap-de.xml` },
    { code: 'pl', url: `${baseUrl}/sitemap-pl.xml` },
    { code: 'br', url: `${baseUrl}/sitemap-br.xml` },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${languages.map(lang => `  <sitemap>
    <loc>${lang.url}</loc>
    <lastmod>${lastMod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
