"use client"
import Script from "next/script"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowLeft, Calculator, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data"
import { useCategoryContent } from "@/hooks/useCategoryContent"

// Define fallback content
const fallbackContent = {
  name: "Other",
  description: "Free calculators for various other purposes that don't fit into specific categories. Find tools for everyday calculations.",
  slug: "other-calculators"
}

export default function OtherCalculatorsCategoryPage() {
  // Detect language from URL path or headers
  const [language, setLanguage] = useState("en");
  
  useEffect(() => {
    // First try to get language from headers (set by middleware)
    const headerLanguage = document.head.querySelector('meta[name="x-language"]')?.getAttribute('content');
    if (headerLanguage) {
      setLanguage(headerLanguage);
      return;
    }
    
    // Fallback to URL path detection
    const path = window.location.pathname;
    const langMatch = path.match(/^\/(br|pl|de)/);
    const detectedLanguage = langMatch ? langMatch[1] : "en";
    setLanguage(detectedLanguage);
  }, []);

  const { content, loading, error } = useCategoryContent("other", language);
  
  // Use content or fallback to defaults
  const contentData = content || fallbackContent;

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Show error if content failed to load
  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error loading content: {error}</div>;
  }

  const otherCalculators = getCalculatorsByCategory("other", language)
  const popularOtherCalculators = getPopularCalculatorsByCategory("other", language)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: contentData.name,
    description: contentData.description,
    url: `https://www.thesmartcalculator.com/${contentData.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: otherCalculators.map((calc, index) => ({
        "@type": "SoftwareApplication",
        position: index + 1,
        name: calc.name,
        description: calc.description,
        url: `https://www.thesmartcalculator.com${calc.href}`,
        applicationCategory: "SoftwareApplication",
      })),
    },
  }

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

        {/* Hero section with orange-amber theme and business-specific content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl from-gray-400 to-gray-600 bg-gradient-to-br flex items-center justify-center">
                <MoreHorizontal className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{contentData.name}</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {contentData.description}
            </p>
          </div>
        </section>

        {/* Popular calculators section with orange theme */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Popular</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-stagger">
              {popularOtherCalculators.map((calc, index) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-l-4 border-l-gray-500 hover-lift">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Calculator className="w-6 h-6 text-gray-500" />
                        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                          {calc.name}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-600">{calc.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All calculators section with orange theme */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All {contentData.name} Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {otherCalculators.map((calc, index) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Calculator className="w-5 h-5 text-gray-400 mt-1 group-hover:text-gray-500 transition-colors" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                            {calc.name}
                          </h3>
                          <p className="text-sm text-gray-600">{calc.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

    
      </div>
    </>
  )
}