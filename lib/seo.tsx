"use client"
import { useEffect } from "react"

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

  useEffect(() => {
    // ------- Title -------
    document.title = title

    // ------- Meta helper -------
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      if (!content) return
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      )
      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }
      tag.setAttribute("content", content)
    }

    // ------- Basic Meta -------
    setMeta("name", "description", description)
    if (keywords) setMeta("name", "keywords", keywords)
    setMeta("name", "robots", robots)

    // ------- Canonical -------
    let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']")
    if (!link) {
      link = document.createElement("link")
      link.rel = "canonical"
      document.head.appendChild(link)
    }
    link.href = fullUrl

    // ------- Open Graph -------
    setMeta("property", "og:title", title)
    setMeta("property", "og:description", description)
    setMeta("property", "og:type", "website")
    setMeta("property", "og:url", fullUrl)
    setMeta("property", "og:image", image)

    // ------- Twitter -------
    setMeta("name", "twitter:card", "summary_large_image")
    setMeta("name", "twitter:title", title)
    setMeta("name", "twitter:description", description)
    setMeta("name", "twitter:image", image)
  }, [title, description, slug, keywords, image, robots])

  return null
}
