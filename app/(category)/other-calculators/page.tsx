import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { ArrowLeft, Calculator,MoreHorizontal  } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data"

export const metadata: Metadata = {
  title: "Other Calculators - Smart Calculator",
  description:
    "Free Other calculators including loan payments, investment analysis, and expense tracking tools. Make informed business decisions.",
  keywords: "other calculator, loan payment calculator, investment analysis calculator, expense tracking calculator",
    alternates: {
      canonical: "https://www.thesmartcalculator.com/other-calculators",
  },
}

// Get calculators dynamically
const otherCalculators = getCalculatorsByCategory("other")
const popularOtherCalculators = getPopularCalculatorsByCategory("other")

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Other Calculators",
  description: "Free other calculators for loan payments, investment analysis, and expense tracking",
  url: "https://www.thesmartcalculator.com/other",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: otherCalculators.map((calc, index) => ({
      "@type": "SoftwareApplication",
      position: index + 1,
      name: calc.name,
      description: calc.description,
      url: `https://www.thesmartcalculator.com${calc.href}`,
      applicationCategory: "FinanceApplication",
    })),
  },
}

export default function OtherCategoryPage() {
  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-800 transition-colors">
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-600">Other Calculators</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-3 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Other Calculators</span>
            </div>
          </div>
        </nav>

        {/* Hero section with orange-amber theme and business-specific content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl from-gray-400 to-gray-600 bg-gradient-to-br flex items-center justify-center">
                <MoreHorizontal className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Other Calculators</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Make informed decisions with our comprehensive collection of calculators. From loan payments
              and investment analysis to expense tracking.
            </p>
            <Link href="/">
              <Button variant="outline" className="mb-8 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Other Calculators</h2>
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
