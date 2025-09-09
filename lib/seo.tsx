// lib/SEO.tsx
export default function SEO({
  title,
  description,
  keywords,
  image = "https://www.thesmartcalculator.com/og-default.png",
  robots = "index,follow",
  slug,
}: {
  title: string
  description: string
  slug: string
  keywords?: string
  image?: string
  robots?: string
}) {
  const fullUrl = `https://www.thesmartcalculator.com${slug}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}
