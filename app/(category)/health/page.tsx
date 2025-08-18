import type { Metadata } from "next"
import Head from "next/head"
import Link from "next/link"
import { ArrowLeft, Calculator, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

export const metadata: Metadata = {
  title: "Health & Fitness Calculators - Smart Calculator",
  description:
    "Free health and fitness calculators including BMI, calorie, body fat, and medical calculators. Calculate your health metrics with ease.",
  keywords: "health calculator, BMI calculator, calorie calculator, fitness calculator, body fat calculator",
}

const healthCalculators = [
  {
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your weight status",
    href: "/health/bmi-calculator",
    popular: true,
  },
  {
    name: "Calorie Calculator",
    description: "Calculate your daily calorie needs based on activity level",
    href: "/health/calorie-calculator",
    popular: true,
  },
  {
    name: "Body Fat Calculator",
    description: "Calculate your body fat percentage using various methods",
    href: "/health/body-fat-calculator",
    popular: true,
  },
  {
    name: "Ideal Weight Calculator",
    description: "Calculate your ideal weight based on height and body frame",
    href: "/health/ideal-weight-calculator",
  },
  {
    name: "Heart Rate Calculator",
    description: "Calculate target heart rate zones for exercise",
    href: "/health/heart-rate-calculator",
  },
  {
    name: "Pregnancy Calculator",
    description: "Calculate due date and pregnancy milestones",
    href: "/health/pregnancy-calculator",
  },
  {
    name: "Pregnancy Conception Calculator",
    description: "Estimate conception date and pregnancy milestones based on due date, last period, or ultrasound date.",
    href: "/health/pregnancy-conception-calculator",
    popular: true,
  },
  {
    name: "Water Intake Calculator",
    description: "Calculate daily water intake requirements",
    href: "/health/water-intake-calculator",
  },
  {
    name: "Sleep Calculator",
    description: "Calculate optimal bedtime and wake-up times",
    href: "/health/sleep-calculator",
  },
  {
    name: "Macro Calculator",
    description: "Calculate macronutrient requirements for your goals",
    href: "/health/macro-calculator",
  },
  {
    name: "Blood Pressure Calculator",
    description: "Understand your blood pressure readings",
    href: "/health/blood-pressure-calculator",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Health & Fitness Calculators",
  description: "Free health and fitness calculators for BMI, calories, body fat, and more",
  url: "https://www.thesmartcalculator.com/health",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: healthCalculators.map((calc, index) => ({
      "@type": "SoftwareApplication",
      position: index + 1,
      name: calc.name,
      description: calc.description,
      url: `https://www.thesmartcalculator.com${calc.href}`,
      applicationCategory: "HealthApplication",
    })),
  },
}

export default function HealthCategoryPage() {
  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Health & Fitness Calculators</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Health & Fitness Calculators</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 via-pink-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Health & Fitness Calculators</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your health with our comprehensive collection of health and fitness calculators. From BMI
              and calorie calculations to specialized medical tools.
            </p>
            <Link href="/">
              <Button variant="outline" className="mb-8 bg-white hover:bg-gray-50 border-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </div>
        </section>

        {/* Popular Calculators */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Most Popular Health Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-stagger">
              {healthCalculators
                .filter((calc) => calc.popular)
                .map((calc, index) => (
                  <Link key={index} href={calc.href}>
                    <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-0 shadow-lg hover-lift">
                      <div className="h-2 bg-gradient-to-r from-red-400 to-red-600"></div>
                      <CardHeader className="p-8">
                        <div className="flex items-center space-x-3 mb-4">
                          <Heart className="w-6 h-6 text-red-500" />
                          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                            {calc.name}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-gray-600 text-base leading-relaxed">
                          {calc.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-8 pb-8">
                        <div className="flex items-center justify-between">
                          <span className="text-red-600 font-semibold group-hover:translate-x-1 transition-transform">
                            Calculate Now
                          </span>
                          <span className="text-red-600 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* All Calculators */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">All Health & Fitness Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {healthCalculators.map((calc, index) => (
                <Link key={index} href={calc.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white border-0 shadow-md hover-lift">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <Calculator className="w-6 h-6 text-gray-400 mt-1 group-hover:text-red-500 transition-colors flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                            {calc.name}
                          </h3>
                          <p className="text-gray-600 text-base leading-relaxed">{calc.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <Logo />
                  <span className="text-2xl font-bold">Smart Calculator</span>
                </div>
                <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                  Your go-to destination for free, accurate, and easy-to-use online calculators. Trusted by millions of
                  users worldwide.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-lg">Popular Categories</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <Link
                      href="/financial"
                      className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      Financial Calculators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/health"
                      className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      Health & Fitness
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/math"
                      className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      Math Calculators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/physics"
                      className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      Physics Calculators
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-lg">More Categories</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <Link
                      href="/business"
                      className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      Business Tools
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/real-estate"
                      className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      Real Estate
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/automotive"
                      className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      Automotive
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/education"
                      className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      Education
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 Smart Calculator. All rights reserved.</p>
                <div className="flex space-x-6 text-gray-400">
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
