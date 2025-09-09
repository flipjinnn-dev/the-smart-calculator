// lib/SEO.tsx
"use client"

import { useEffect } from "react"
import Script from "next/script"
import Head from "next/head"

type SEOProps = {
  title: string
  description: string
  slug: string // e.g. "/time-calculator"
  keywords?: string
  type?: "SoftwareApplication" | "CollectionPage" | "WebPage"
}

export default function SEO({
  title,
  description,
  slug,
  keywords,
  type = "SoftwareApplication",
}: SEOProps) {
  const fullUrl = `https://www.thesmartcalculator.com${slug}`

  // ✅ JSON-LD object
  let jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": type,
    name: title.replace(/ –.*/, ""),
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

  // ✅ Client-side fallback (for hydration/update)
  useEffect(() => {
    if (title) document.title = title

    const setMeta = (name: string, content: string) => {
      if (!content) return
      let tag = document.querySelector(`meta[name='${name}']`)
      if (tag) {
        tag.setAttribute("content", content)
      } else {
        tag = document.createElement("meta")
        tag.setAttribute("name", name)
        tag.setAttribute("content", content)
        document.head.appendChild(tag)
      }
    }

    setMeta("description", description)
    if (keywords) setMeta("keywords", keywords)

    let canonical = document.querySelector("link[rel='canonical']")
    if (canonical) {
      canonical.setAttribute("href", fullUrl)
    } else {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      canonical.setAttribute("href", fullUrl)
      document.head.appendChild(canonical)
    }
  }, [title, description, keywords, fullUrl])

  return (
    <>
      {/* ✅ Server-side inject (SEO friendly) */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={fullUrl} />
      </Head>

      {/* ✅ JSON-LD */}
      <Script
        id={`${slug}-jsonld`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
