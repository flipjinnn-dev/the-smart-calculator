// lib/SEO.tsx
import { getCalculatorMeta } from "@/lib/getCalculatorMeta";

interface SEOProps {
  title?: string;
  description?: string;
  slug?: string;
  keywords?: string;
  image?: string;
  robots?: string;
  calculatorId?: string;
  language?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  image = "https://www.thesmartcalculator.com/og-default.png",
  robots = "index,follow",
  slug,
  calculatorId,
  language = "en",
}: SEOProps) {
  // If calculatorId is provided, use metadata from the centralized file
  let metaTitle = title;
  let metaDescription = description;
  let metaSlug = slug;
  let metaKeywords = keywords;

  if (calculatorId) {
    const meta = getCalculatorMeta(calculatorId, language);
    if (meta) {
      metaTitle = meta.title;
      metaDescription = meta.description;
      metaSlug = meta.slug;
      metaKeywords = meta.keywords;
    }
  }

  // If we still don't have required data, return null or use defaults
  if (!metaTitle || !metaDescription || !metaSlug) {
    console.warn("SEO component missing required props");
    return null;
  }

  const fullUrl = `https://www.thesmartcalculator.com${metaSlug}`;

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
    </>
  );
}