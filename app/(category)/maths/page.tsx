import type { Metadata } from "next"
import Head from "next/head"
import Link from "next/link"
import { Calculator, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data"

export const metadata: Metadata = {
  title: "Math Calculators - Smart Calculator",
  description:
    "Free math calculators including percentage, fraction, algebra, geometry, statistics, and probability calculators. Calculate your math problems with ease.",
  keywords: "math calculator, percentage calculator, fraction calculator, algebra calculator, geometry calculator, statistics calculator, probability calculator",
}

const mathCalculators = getCalculatorsByCategory("maths")
const popularMathCalculators = getPopularCalculatorsByCategory("maths")


export default function MathCategoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Math Calculators",
    description: "Free math calculators for percentage, fraction, algebra, geometry, statistics, and probability",
    url: "https://www.thesmartcalculator.com/maths",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: mathCalculators.map((calc, index) => ({
        "@type": "SoftwareApplication",
        position: index + 1,
        name: calc.name,
        description: calc.description,
        url: `https://www.thesmartcalculator.com${calc.href}`,
        applicationCategory: "MathApplication",
      })),
    },
  }
  const allCalculators = mathCalculators

  return (
    <>
      <Head>
        <title>Math Calculators - Smart Calculator</title>
        <meta name="description" content="Free math calculators including percentage, fraction, algebra, geometry, statistics, and probability calculators." />
        <meta name="keywords" content="math calculator, percentage calculator, fraction calculator, algebra calculator, geometry calculator, statistics calculator, probability calculator" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Math Calculators</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Math</span>
            </div>
          </div>
        </nav>
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Math Calculators</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Free math calculators for percentage, fraction, algebra, geometry, statistics, and probability. Solve your math problems quickly and easily.
              </p>
            </div>

            {/* Most Popular */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Most Popular</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {popularMathCalculators.map(calc => (
                <Link key={calc.name} href={calc.href}>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All Math Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCalculators.map(calc => (
                <Link key={calc.name} href={calc.href}>
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
