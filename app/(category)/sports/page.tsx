import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { ArrowLeft, GraduationCap, Calculator, Bike, } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data"

export const metadata: Metadata = {
  title: "Sports Calculators - Smart Calculator",
  description:
    "Free sports calculators including BMI, calorie burn, and training pace tools. Make informed fitness decisions.",
  keywords: "sports calculator, BMI calculator, calorie burn calculator, training pace calculator",
}

// Get calculators dynamically
const sportsCalculators = getCalculatorsByCategory("sports")
const popularSportsCalculators = getPopularCalculatorsByCategory("sports")

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Sports Calculators",
  description: "Free sports calculators for BMI, calorie burn, and training pace",
  url: "https://www.thesmartcalculator.com/sports",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: sportsCalculators.map((calc, index) => ({
      "@type": "SoftwareApplication",
      position: index + 1,
      name: calc.name,
      description: calc.description,
      url: `https://www.thesmartcalculator.com${calc.href}`,
      applicationCategory: "FinanceApplication",
    })),
  },
}

export default function EducationCategoryPage() {
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
                  <p className="text-sm text-gray-600">Sports Calculators</p>
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
              <span className="text-gray-900 font-medium">Sports Calculators</span>
            </div>
          </div>
        </nav>

        {/* Hero section with orange-amber theme and education-specific content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl from-blue-400 to-cyan-500 bg-gradient-to-br flex items-center justify-center">
                <Bike className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Sports Calculators</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Make informed sports decisions with our comprehensive collection of calculators. From BMI
              calculations and calorie burn estimations to training pace analysis.
            </p>
            <Link href="/">
              <Button variant="outline" className="mb-8 bg-transparent cursor-pointer">
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
              {popularSportsCalculators.map((calc, index) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-l-4 border-l-blue-500 hover-lift">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Calculator className="w-6 h-6 text-blue-600" />
                        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Sports Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {sportsCalculators.map((calc, index) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Calculator className="w-5 h-5 text-gray-400 mt-1 group-hover:text-blue-500 transition-colors" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
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
