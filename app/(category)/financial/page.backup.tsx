"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowLeft, Calculator, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data"
import { useCategoryContent } from "@/hooks/useCategoryContent"

// Define fallback content
const fallbackContent = {
  name: "Financial",
  description: "Free financial calculators including mortgage, loan, investment, tax, and retirement planning tools. Calculate your finances with ease.",
  slug: "financial"
}

export default function FinancialCategoryPage() {
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

  const { content, loading, error } = useCategoryContent("financial", language);
  
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

  const financialCalculators = getCalculatorsByCategory("financial", language)
  const popularFinancialCalculators = getPopularCalculatorsByCategory("financial", language)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{contentData.name}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {contentData.description}
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Popular</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-stagger">
            {popularFinancialCalculators.map((calc, index) => (
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
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All {contentData.name} Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {financialCalculators.map((calc, index) => (
              <Link key={calc.id} href={calc.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group hover-lift">
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
      </section>
    </div>
  )
}