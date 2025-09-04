"use client"

import { useEffect } from "react"
import Script from "next/script"

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

  // ✅ JSON-LD object (type ke hisaab se change hoga)
  let jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": type,
    name: title.replace(/ –.*/, ""), // title ka pehla hissa name banega
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
        itemListElement: [], // Agar tum chaho to dynamically calculators pass kar sakte ho
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

  // ✅ Document head me meta tags inject karna
  useEffect(() => {
    if (title) document.title = title

    const setMeta = (name: string, content: string) => {
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
    <Script
      id={`${slug}-jsonld`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
