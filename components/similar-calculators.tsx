"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SimilarCalculatorsProps, ColorVariants, CalculatorColor, SimilarCalculator, SimilarCalculatorId } from "@/types/similar-calculators"
import { getLocalizedCalculatorData, getLocalizedCalculatorHref, detectLanguage } from "@/lib/language-utils"

// Color mapping for different calculator categories
const getColorVariants = (color: CalculatorColor): ColorVariants => {
  const colorMap: Record<CalculatorColor, ColorVariants> = {
    green: {
      icon: "text-green-500",
      border: "border-l-green-500",
      hover: "group-hover:text-green-600",
      gradient: "from-green-50 to-emerald-50"
    },
    blue: {
      icon: "text-blue-500",
      border: "border-l-blue-500", 
      hover: "group-hover:text-blue-600",
      gradient: "from-blue-50 to-indigo-50"
    },
    red: {
      icon: "text-red-500",
      border: "border-l-red-500",
      hover: "group-hover:text-red-600", 
      gradient: "from-red-50 to-pink-50"
    },
    orange: {
      icon: "text-orange-500",
      border: "border-l-orange-500",
      hover: "group-hover:text-orange-600",
      gradient: "from-orange-50 to-amber-50"
    },
    purple: {
      icon: "text-purple-500", 
      border: "border-l-purple-500",
      hover: "group-hover:text-purple-600",
      gradient: "from-purple-50 to-violet-50"
    },
    gray: {
      icon: "text-gray-500",
      border: "border-l-gray-500",
      hover: "group-hover:text-gray-600", 
      gradient: "from-gray-50 to-slate-50"
    },
    pink: {
      icon: "text-pink-500",
      border: "border-l-pink-500",
      hover: "group-hover:text-pink-600",
      gradient: "from-pink-50 to-rose-50"
    },
    yellow: {
      icon: "text-yellow-500",
      border: "border-l-yellow-500", 
      hover: "group-hover:text-yellow-600",
      gradient: "from-yellow-50 to-amber-50"
    },
    teal: {
      icon: "text-teal-500",
      border: "border-l-teal-500",
      hover: "group-hover:text-teal-600", 
      gradient: "from-teal-50 to-cyan-50"
    }
  }

  return colorMap[color] || colorMap.blue
}

export default function SimilarCalculators({ 
  calculators, 
  color = "blue", 
  title = "Similar Calculators",
  className = "",
  language
}: SimilarCalculatorsProps) {
  const pathname = usePathname()
  
  // Detect language from URL or use provided language
  const currentLanguage = useMemo(() => {
    if (language) return language
    return detectLanguage(pathname)
  }, [pathname, language])

  // Helper function to extract calculator ID from href
  const extractCalculatorIdFromHref = (href: string): string | null => {
    // Remove leading slash and language prefix
    const cleanHref = href.replace(/^\/(en|br|pl|de)\//, '/').replace(/^\//, '')
    
    // Extract calculator name from path (e.g., "financial/mortgage-calculator" -> "mortgage-calculator")
    const parts = cleanHref.split('/')
    const calculatorName = parts[parts.length - 1]
    
    return calculatorName || null
  }

  // Transform calculators to localized format
  const localizedCalculators = useMemo(() => {
    return calculators.map((calc) => {
      // Check if it's a calculator ID object
      if (typeof calc === 'object' && 'id' in calc) {
        const calcId = (calc as SimilarCalculatorId).id
        const localizedData = getLocalizedCalculatorData(calcId, currentLanguage)
        const localizedHref = getLocalizedCalculatorHref(calcId, currentLanguage)
        
        return {
          calculatorName: localizedData.name,
          calculatorHref: localizedHref,
          calculatorDescription: localizedData.description
        } as SimilarCalculator
      }
      
      // Check if it's old format with hardcoded English data
      const oldFormatCalc = calc as SimilarCalculator
      if (oldFormatCalc.calculatorHref) {
        // Extract calculator ID from href
        const extractedId = extractCalculatorIdFromHref(oldFormatCalc.calculatorHref)
        
        if (extractedId) {
          // Always try to localize, even for 'en' to ensure consistent URLs
          try {
            const localizedData = getLocalizedCalculatorData(extractedId, currentLanguage)
            const localizedHref = getLocalizedCalculatorHref(extractedId, currentLanguage)
            
            // If we got valid localized data, use it
            if (localizedData.name && localizedHref && localizedHref !== '/') {
              return {
                calculatorName: localizedData.name,
                calculatorHref: localizedHref,
                calculatorDescription: localizedData.description
              } as SimilarCalculator
            }
          } catch (error) {
            console.error(`Error localizing calculator: ${extractedId}`, error)
          }
        }
      }
      
      // Fallback: return as-is (old hardcoded format)
      return oldFormatCalc
    })
  }, [calculators, currentLanguage, pathname])

  // Don't render if no calculators provided
  if (!localizedCalculators || localizedCalculators.length === 0) {
    return null
  }

  const colors = getColorVariants(color)

  return (
    <section className={`w-full max-w-7xl mx-auto px-4 py-8 ${className}`}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className={`px-6 py-6 border-b border-gray-200 bg-gradient-to-r ${colors.gradient}`}>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">Explore these related calculation tools</p>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="px-6 py-8">
          <div className={`grid gap-6 ${
            localizedCalculators.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
            localizedCalculators.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          } animate-fade-in`}>
            {localizedCalculators.map((calc, index) => (
              <Link key={index} href={calc.calculatorHref}>
                <Card className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${colors.border} hover-lift`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Calculator className={`w-6 h-6 ${colors.icon}`} />
                      <CardTitle className={`text-lg font-semibold text-gray-900 ${colors.hover} transition-colors`}>
                        {calc.calculatorName}
                      </CardTitle>
                    </div>
                    {calc.calculatorDescription && (
                      <CardDescription className="text-gray-600 mt-2">
                        {calc.calculatorDescription}
                      </CardDescription>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}