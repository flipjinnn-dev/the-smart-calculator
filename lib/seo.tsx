// lib/SEO.tsx
import Head from "next/head"

type SEOProps = {
  title: string
  description: string
  slug: string
  keywords?: string
  type?: "SoftwareApplication" | "CollectionPage" | "WebPage"
  image?: string
  robots?: string
}

export default function SEO({
  title,
  description,
  slug,
  keywords,
  type = "SoftwareApplication",
  image = "https://www.thesmartcalculator.com/og-default.png",
  robots = "index,follow",
}: SEOProps) {
  const fullUrl = `https://www.thesmartcalculator.com${slug}`

  // ✅ JSON-LD schema (structured data)
  let jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": type,
    name: title.replace(/ –.*/, ""), // "Mortgage Calculator – Estimate..." -> "Mortgage Calculator"
    description,
    url: fullUrl,
  }

  if (type === "SoftwareApplication") {
    jsonLd = {
      ...jsonLd,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      publisher: {
        "@type": "Organization",
        name: "Smart Calculator",
        url: "https://www.thesmartcalculator.com",
        logo: "https://www.thesmartcalculator.com/logo.png",
        sameAs: [
          "https://www.instagram.com/thesmartcalculators",
          "https://x.com/SmartCalculat0r",
        ],
      },
    }
  } else if (type === "CollectionPage") {
    jsonLd = {
      ...jsonLd,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [],
      },
    }
  } else if (type === "WebPage") {
    jsonLd = {
      ...jsonLd,
      publisher: {
        "@type": "Organization",
        name: "Smart Calculator",
        url: "https://www.thesmartcalculator.com",
        logo: "https://www.thesmartcalculator.com/logo.png",
      },
    }
  }

  return (
    <Head>
      {/* ✅ Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={fullUrl} />

      {/* ✅ Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />

      {/* ✅ Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}
