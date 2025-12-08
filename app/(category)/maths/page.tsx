"use client"

import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowLeft, Calculator, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data"
import { useCategoryContent } from "@/hooks/useCategoryContent"

// Define fallback content
const fallbackContent = {
  name: "Maths",
  description: "Free math calculators for algebra, geometry, statistics, and advanced mathematics. Solve complex problems with ease.",
  slug: "maths"
}

export default function MathsCategoryPage() {
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
    const langMatch = path.match(/^\/(br|pl|de|es)/);
    const detectedLanguage = langMatch ? langMatch[1] : "en";
    setLanguage(detectedLanguage);
  }, []);

  const { content, loading, error } = useCategoryContent("maths", language);
  
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

  const mathsCalculators = getCalculatorsByCategory("maths", language)
  const popularMathsCalculators = getPopularCalculatorsByCategory("maths", language)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: contentData.name,
    description: contentData.description,
    url: `https://www.thesmartcalculator.com/${contentData.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: mathsCalculators.map((calc, index) => ({
        "@type": "SoftwareApplication",
        position: index + 1,
        name: calc.name,
        description: calc.description,
        url: `https://www.thesmartcalculator.com${calc.href}`,
        applicationCategory: "MathApplication",
      })),
    },
  }

  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Removed duplicated breadcrumb nav - now using shared header component */}
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.name}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {contentData.description}
              </p>
            </div>

            {/* Most Popular */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Most Popular</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {popularMathsCalculators.map((calc, index) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-l-4 border-l-blue-500 hover-lift">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Calculator className="w-6 h-6 text-blue-500" />
                        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {calc.name}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-600">{calc.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            {/* All Math Calculators */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All {contentData.name} Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mathsCalculators.map((calc, index) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group hover-lift border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Calculator className="w-5 h-5 text-gray-400 mt-1 group-hover:text-blue-500 transition-colors" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
        </main>
        
      </div>
    </>
  )
}