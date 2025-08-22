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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"
import SearchBar from "@/components/search-bar"
import { getCategoryUrl } from "@/lib/routes"
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
    href: "/other",
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
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent">
                    Smart Calculators
                  </h1>
                  <p className="text-sm text-gray-500">Free Online Calculators</p>
                </div>
              </div>
              <SearchBar />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20 mb-8">
                <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-700">Trusted by 10M+ Users Worldwide</span>
              </div>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Smart
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
                Calculators
              </span>
            </h2>

            <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              The most comprehensive collection of{" "}
              <span className="font-semibold text-gray-800">free online calculators</span> for all your needs
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">200+ Calculators</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">100% Free</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Instant Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Calculator Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our comprehensive collection of calculators organized by category
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-stagger">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Link key={category.id} href={category.href}>
                    <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-0 shadow-lg hover-lift">
                      <CardHeader className="pb-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-base leading-relaxed">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-500">
                            {category.calculators} calculators
                          </span>
                          <span className="text-blue-600 text-sm font-bold group-hover:translate-x-2 transition-transform">
                            Explore →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular Calculators */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Most Popular Calculators</h2>
              <p className="text-xl text-gray-600">Our most frequently used calculation tools</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger">
              {popularCalculators.map((calc, index) => (
                <Link key={index} href={calc.href}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg overflow-hidden h-full flex flex-col">
                    <div className={`h-2 ${calc.color}`}></div>
                    <CardContent className="p-8 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {calc.name}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{calc.description}</p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {calc.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Smart Calculator?</h2>
              <p className="text-xl text-gray-600">Fast, accurate, and completely free to use</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </Card>
                )
              })}
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
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                    <span className="text-white font-bold">f</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                    <span className="text-white font-bold">t</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                    <span className="text-white font-bold">in</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-lg">Most Used Categories</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <Link
                      href="/financial"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Financial Calculators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/health"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Health & Fitness
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/math"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Math Calculators
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/physics"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Physics Calculators
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-lg">Company</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 Smart Calculator. All rights reserved.</p>
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
