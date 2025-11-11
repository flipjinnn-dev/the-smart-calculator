"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import categoriesMeta from "@/meta/categories.js"
import { calculators } from "@/lib/calculator-data"

interface BreadcrumbItem {
  name: string
  href: string
}

// Define the structure of categoriesMeta
interface CategoryMeta {
  [key: string]: {
    [lang: string]: {
      name: string
      slug: string
      description: string
    }
  }
}

export default function DynamicBreadcrumb() {
  const pathname = usePathname()
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    if (!pathname) return

    // Extract language from pathname
    const langMatch = pathname.match(/^\/(br|pl|de)/)
    const language = langMatch ? langMatch[1] : "en"

    // Parse the pathname to create breadcrumb items
    const pathSegments = pathname.split("/").filter(segment => segment !== "")
    
    // If we're on the homepage, no breadcrumb needed
    if (pathSegments.length === 0 || (pathSegments.length === 1 && langMatch)) {
      setBreadcrumbItems([])
      return
    }

    const items: BreadcrumbItem[] = [
      {
        name: "Home",
        href: language === "en" ? "/" : `/${language}/`
      }
    ]

    // Handle different path structures
    if (langMatch) {
      // We have a language prefix
      const lang = langMatch[1]
      if (pathSegments.length >= 2) {
        const categorySlug = pathSegments[1]
        // Find the category by slug
        const categoryKey = Object.keys(categoriesMeta).find(key => {
          const category = (categoriesMeta as CategoryMeta)[key];
          return category[lang]?.slug === categorySlug || category.en?.slug === categorySlug;
        })
        
        if (categoryKey) {
          const category = (categoriesMeta as CategoryMeta)[categoryKey];
          items.push({
            name: category[lang]?.name || category.en?.name || categorySlug,
            href: language === "en" ? `/${categoryKey}` : `/${lang}/${categorySlug}`
          })
          
          // If we have a calculator slug
          if (pathSegments.length >= 3) {
            const calculatorSlug = pathSegments[2]
            // Find the calculator by href
            const calculator = calculators.find(calc => 
              calc.href === `/${categoryKey}/${calculatorSlug}` || 
              calc.href === `/${categoryKey}/${calculatorSlug.replace("-calculator", "")}`
            )
            
            if (calculator) {
              items.push({
                name: calculator.name,
                href: pathname
              })
            } else {
              // Fallback to just showing the slug
              items.push({
                name: calculatorSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                href: pathname
              })
            }
          }
        } else {
          // Handle category not found - just show the slug
          items.push({
            name: categorySlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            href: language === "en" ? `/${categorySlug}` : `/${lang}/${categorySlug}`
          })
          
          // If we have a calculator slug
          if (pathSegments.length >= 3) {
            const calculatorSlug = pathSegments[2]
            items.push({
              name: calculatorSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
              href: pathname
            })
          }
        }
      }
    } else {
      // English paths (no language prefix)
      if (pathSegments.length >= 1) {
        const categorySlug = pathSegments[0]
        // Find the category by slug
        const categoryKey = Object.keys(categoriesMeta).find(key => {
          const category = (categoriesMeta as CategoryMeta)[key];
          return category.en?.slug === categorySlug;
        })
        
        if (categoryKey) {
          const category = (categoriesMeta as CategoryMeta)[categoryKey];
          items.push({
            name: category.en?.name || categorySlug,
            href: `/${categoryKey}`
          })
          
          // If we have a calculator slug
          if (pathSegments.length >= 2) {
            const calculatorSlug = pathSegments[1]
            // Find the calculator by href
            const calculator = calculators.find(calc => 
              calc.href === `/${categoryKey}/${calculatorSlug}` || 
              calc.href === `/${categoryKey}/${calculatorSlug.replace("-calculator", "")}`
            )
            
            if (calculator) {
              items.push({
                name: calculator.name,
                href: pathname
              })
            } else {
              // Fallback to just showing the slug
              items.push({
                name: calculatorSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                href: pathname
              })
            }
          }
        } else {
          // Handle category not found - just show the slug
          items.push({
            name: categorySlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            href: `/${categorySlug}`
          })
          
          // If we have a calculator slug
          if (pathSegments.length >= 2) {
            const calculatorSlug = pathSegments[1]
            items.push({
              name: calculatorSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
              href: pathname
            })
          }
        }
      }
    }

    setBreadcrumbItems(items)
  }, [pathname])

  // Don't render if we're on the homepage or have no items
  if (breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <div className="bg-gray-50 border-b px-4 py-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.href}>
                <BreadcrumbItem>
                  {index === breadcrumbItems.length - 1 ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}