import type { Metadata } from "next"
import Head from "next/head"
import Link from "next/link"
import {
  Calculator,
  TrendingUp,
  Home,
  Bike,
  Heart,
  Sparkles,
  Shield,
  Rocket,
  Atom,
  MoreHorizontal,
  Beef,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Logo from "@/components/logo"
import SearchBar from "@/components/search-bar"
import { getCalculatorCount } from "@/lib/calculator-data"

export const metadata: Metadata = {
  title: "Smart Calculator - Free Online Calculators for Every Need",
  description:
    "Access hundreds of free online calculators for finance, health, math, physics, and more. Fast, accurate, and easy-to-use calculation tools.",
  keywords: "calculator, online calculator, financial calculator, health calculator, math calculator, free tools",
  openGraph: {
    title: "Smart Calculator - Free Online Calculators",
    description: "Access hundreds of free online calculators for every need",
    type: "website",
    url: "https://www.thesmartcalculator.com/",
  },
  alternates: {
    canonical: "https://www.thesmartcalculator.com/",
  },
}

const categories = [
  {
    id: "financial",
    name: "Financial",
    description: "Loan, mortgage, investment, and tax calculators",
    icon: TrendingUp,
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    calculators: getCalculatorCount("financial"),
    href: "/financial",
  },
  {
    id: "health",
    name: "Health & Fitness",
    description: "BMI, calorie, nutrition, and medical calculators",
    icon: Heart,
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    calculators: getCalculatorCount("health"),
    href: "/health",
  },
  {
    id: "maths",
    name: "Maths",
    description: "Algebra, geometry, statistics, and advanced maths",
    icon: Calculator,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    calculators: getCalculatorCount("maths"),
    href: "/maths",
  },
  {
    id: "physics",
    name: "Physics",
    description: "Force, energy, motion, and physics calculations",
    icon: Atom,
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    calculators: getCalculatorCount("physics"),
    href: "/physics",
  },
  {
    id: "construction",
    name: "Construction",
    description: "Property, rent, and construction calculations",
    icon: Home,
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    calculators: getCalculatorCount("construction"),
    href: "/construction",
  },
  {
    id: "food",
    name: "Food",
    description: "Nutrition, calorie, and meal planning calculators",
    icon: Beef,
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    calculators: getCalculatorCount("food"),
    href: "/food",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Fitness, exercise, and sports-related calculators",
    icon: Bike,
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    calculators: getCalculatorCount("sports"),
    href: "/sports",
  },
  {
    id: "other",
    name: "Other",
    description: "Miscellaneous calculators that don't fit into other categories",
    icon: MoreHorizontal,
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50",
    textColor: "text-pink-600",
    calculators: getCalculatorCount("other"),
    href: "/other-calculators",
  },
]

const popularCalculators = [
  {
    name: "Mortgage Calculator",
    category: "Financial",
    href: "/financial/mortgage-calculator",
    description: "Calculate monthly payments and total interest for your home loan",
    color: "bg-gradient-to-r from-green-400 to-green-600",
  },
  {
    name: "BMI Calculator",
    category: "Health",
    href: "/health/bmi-calculator",
    description: "Calculate your Body Mass Index and understand your weight status",
    color: "bg-gradient-to-r from-red-400 to-red-600",
  },
  {
    name: "Loan Calculator",
    category: "Financial",
    href: "/financial/loan-calculator",
    description: "Calculate loan payments and schedules for any type of loan",
    color: "bg-gradient-to-r from-green-400 to-green-600",
  },
  {
    name: "Percentage Calculator",
    category: "Maths",
    href: "/maths/percentage-calculator",
    description: "Calculate percentages, ratios, and percentage changes easily",
    color: "bg-gradient-to-r from-blue-400 to-blue-600",
  },
  {
    name: "Compound Interest",
    category: "Financial",
    href: "/financial/compound-interest-calculator",
    description: "Calculate investment growth over time with compound interest",
    color: "bg-gradient-to-r from-green-400 to-green-600",
  },
  {
    name: "Calorie Calculator",
    category: "Health",
    href: "/health/calorie-calculator",
    description: "Calculate daily calorie needs based on your lifestyle and goals",
    color: "bg-gradient-to-r from-red-400 to-red-600",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Smart Calculator",
  description: "Free online calculators for finance, health, math, physics, and more",
  url: "https://www.thesmartcalculator.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.thesmartcalculator.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "Smart Calculator",
    logo: {
      "@type": "ImageObject",
      url: "https://www.thesmartcalculator.com/logo.png",
    },
  },
}

export default function HomePage() {
  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-red-500 bg-clip-text text-transparent">
                    Smart Calculators
                  </p>
                  <p className="text-sm text-gray-500">Free Online Calculators</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50/80 via-blue-50/80 to-red-50/80 overflow-hidden">
          <div className="absolute hidden md:block inset-0 overflow-hidden h-[300px] md:h-[60vh] opacity-[0.5]">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-full blur-xl"></div>
            <div className="absolute top-32 left-32 w-24 h-24 bg-gradient-to-br from-blue-400/40 to-blue-600/40 rounded-full blur-lg"></div>
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-gradient-to-br from-red-400/25 mb-[82px] to-red-600/25 rounded-full blur-2xl"></div>
            <div className="absolute bottom-32 right-40 w-32 h-32 bg-gradient-to-br from-green-400/30 to-blue-500/30 rounded-full blur-xl"></div>

            <div className="absolute top-20 right-20 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded transform rotate-45 opacity-60"></div>
            <div className="absolute bottom-40 left-40 w-4 h-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 left-20 w-8 h-8 border-2 border-green-400/40 rounded transform rotate-12"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center md:grid md:grid-cols-2 md:gap-20 md:items-center md:min-h-[500px] md:text-left space-y-10 md:space-y-0">
              {/* Left side - Hero text */}
              <div className="space-y-6 md:space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Your life in{" "}
                  <span className="bg-gradient-to-r from-green-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
                    90+ free
                  </span>
                  <br />
                  calculators
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-md md:max-w-lg mx-auto md:mx-0">
                  <span className="hidden md:inline">
                    From financial planning to health tracking, discover powerful calculation tools that make complex
                    math simple and accessible.
                  </span>
                </p>
              </div>

              {/* Right side - Search bar */}
              <div className="flex justify-center md:justify-end items-center">
                <div className="w-full max-w-md md:max-w-lg px-4 md:px-0">
                  <div className="bg-white/90 md:bg-white/95 backdrop-blur-sm md:backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg md:shadow-2xl border border-white/20 md:border-white/30 hover:shadow-3xl transition-all duration-300">
                    <div className="hidden md:block mb-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Find your calculator</h2>
                      <p className="text-sm text-gray-600">Search from hundreds of free tools</p>
                    </div>
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white mt-16 -mb-16 rounded-t-3xl shadow-xl">
            <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Calculator Categories</h2>
                  <p className="text-lg hidden md:block text-gray-600">
                    Explore our comprehensive collection of specialized calculators
                  </p>
                </div>

                <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-1 md:sm:grid-cols-2 md:lg:grid-cols-3 md:xl:grid-cols-4 md:gap-8">
                  {categories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <Link key={category.id} href={category.href} className="block md:h-full">
                        {/* Mobile List Layout */}
                        <div className="flex md:hidden items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                                {category.name}
                              </h3>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">{category.calculators} calculators</span>
                          </div>
                        </div>

                        {/* Desktop Card Layout */}
                        <Card className="hidden md:block h-full hover:shadow-xl transition-all duration-200 cursor-pointer group border border-gray-200 rounded-2xl p-8 hover:-translate-y-1 bg-white">
                          <div className="text-center space-y-6">
                            <div className="relative">
                              <div
                                className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}
                              >
                                <IconComponent className="w-8 h-8 text-white" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                                {category.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                              <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
                                <span className="text-sm font-semibold text-gray-700">
                                  {category.calculators} calculators
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Popular Calculators */}
        <section className="py-12 md:py-20 px-2 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Most Popular Calculators</h2>
              <p className="text-base md:text-xl text-gray-600">Our most frequently used calculation tools</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 animate-stagger">
              {popularCalculators.map((calc, index) => (
                <Link key={index} href={calc.href}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg overflow-hidden h-full flex flex-col">
                    <div className={`h-2 ${calc.color}`}></div>
                    <CardContent className="p-5 md:p-8 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors">
                          {calc.name}
                        </h3>
                        <p className="text-gray-600 mb-2 md:mb-4 leading-relaxed text-sm md:text-base">
                          {calc.description}
                        </p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {calc.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-100 mt-4 md:mt-6">
                        <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                          Calculate Now
                        </span>
                        <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 px-2 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Why Choose Smart Calculator?
              </h2>
              <p className="text-base md:text-xl text-gray-600">Fast, accurate, and completely free to use</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  title: "Lightning Fast",
                  description: "Get instant results with our optimized calculation engines",
                  icon: Rocket,
                  color: "from-blue-400 to-blue-600",
                  bgColor: "bg-blue-50",
                },
                {
                  title: "100% Accurate",
                  description: "All calculators are verified by experts and mathematically precise",
                  icon: Shield,
                  color: "from-green-400 to-green-600",
                  bgColor: "bg-green-50",
                },
                {
                  title: "Always Free",
                  description: "Complete access to all calculators with no hidden charges ever",
                  icon: Sparkles,
                  color: "from-purple-400 to-purple-600",
                  bgColor: "bg-purple-50",
                },
              ].map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card
                    key={index}
                    className="text-center p-6 md:p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
