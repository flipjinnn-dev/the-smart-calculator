import type { Metadata } from "next"
import Head from "next/head"
import Link from "next/link"
import { ArrowLeft, Calculator, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data"

export const metadata: Metadata = {
  title: "Construction Calculators - Smart Calculator",
  description:
    "Free construction calculators including material estimates, cost analysis, and project management tools. Make informed construction decisions.",
  keywords: "construction calculator, material estimator, cost analysis, project management",
}

// Get calculators dynamically
const constructionCalculators = getCalculatorsByCategory("construction")
const popularConstructionCalculators = getPopularCalculatorsByCategory("construction")

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Construction Calculators",
  description: "Free construction calculators for material estimates, cost analysis, and project management.",
  url: "https://www.thesmartcalculator.com/construction",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: constructionCalculators.map((calc, index) => ({
      "@type": "SoftwareApplication",
      position: index + 1,
      name: calc.name,
      description: calc.description,
      url: `https://www.thesmartcalculator.com${calc.href}`,
      applicationCategory: "FinanceApplication",
    })),
  },
}

export default function ConstructionCategoryPage() {
  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors">
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-600">Construction Calculators</p>
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
              <span className="text-gray-900 font-medium">Construction Calculators</span>
            </div>
          </div>
        </nav>

        {/* Hero section with orange-amber theme and construction-specific content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                <Home className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Construction Calculators</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Make informed construction decisions with our comprehensive collection of calculators. From material
              estimates and cost analysis to project management tools.
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
              {popularConstructionCalculators.map((calc, index) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-l-4 border-l-orange-500 hover-lift">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Calculator className="w-6 h-6 text-orange-500" />
                        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Construction Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {constructionCalculators.map((calc, index) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Calculator className="w-5 h-5 text-gray-400 mt-1 group-hover:text-orange-500 transition-colors" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
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
