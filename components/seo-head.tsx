import Head from "next/head"

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  jsonLd?: object
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = "/og-image.png",
  jsonLd,
}: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </Head>
  )
}
