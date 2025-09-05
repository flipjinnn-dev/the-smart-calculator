import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { Calculator, Users, Target, Award, Heart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"

export const metadata: Metadata = {
  title: "About Smart Calculator - Free Online Calculator Platform",
  description:
    "Learn about Smart Calculator, the leading platform for free online calculators. Our mission is to provide accurate, fast, and easy-to-use calculation tools for everyone.",
  keywords: "about smart calculator, online calculator platform, free calculators, calculation tools",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Smart Calculator",
  description: "Learn about Smart Calculator, the leading platform for free online calculators across finance, health, math, and everyday use.",
  url: "https://www.thesmartcalculator.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Smart Calculator",
    url: "https://www.thesmartcalculator.com",
    logo: "https://www.thesmartcalculator.com/logo.png", // apna actual logo URL lagao
    sameAs: [
      "https://x.com/SmartCalculat0r", 
      "https://www.instagram.com/thesmartcalculators/"
    ]
  }
}

export default function AboutPage() {
  return (
    <>
      <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">About Us</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Home
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Calculator className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">About Smart Calculator</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to make calculations simple, accessible, and free for everyone. Smart Calculator
              provides hundreds of accurate calculation tools to help you make informed decisions.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To democratize access to powerful calculation tools and help people make better financial, health, and
                life decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Card className="text-center border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Accuracy First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Every calculator is built with precision and tested thoroughly to ensure you get accurate results
                    every time.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">User-Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Simple, intuitive interfaces that anyone can use, regardless of their technical background or
                    expertise.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Always Free</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    All our calculators are completely free to use with no hidden fees, subscriptions, or limitations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Trusted by Millions</h2>
              <p className="text-xl text-gray-600">
                Join millions of users who trust Smart Calculator for their daily calculations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-4">200+</div>
                <p className="text-xl font-semibold text-gray-900 mb-2">Calculators</p>
                <p className="text-gray-600">Comprehensive calculation tools</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-4">10M+</div>
                <p className="text-xl font-semibold text-gray-900 mb-2">Users</p>
                <p className="text-gray-600">People trust our platform</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-4">50M+</div>
                <p className="text-xl font-semibold text-gray-900 mb-2">Calculations</p>
                <p className="text-gray-600">Performed monthly</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-4">99.9%</div>
                <p className="text-xl font-semibold text-gray-900 mb-2">Uptime</p>
                <p className="text-gray-600">Reliable service</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Smart Calculator?</h2>
              <p className="text-xl text-gray-600">We're committed to providing the best calculation experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our calculators are optimized for speed, giving you instant results without any delays or loading
                    times.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Scientifically Accurate</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    All formulas are verified by experts and based on established scientific and mathematical
                    principles.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile Optimized</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Perfect experience on any device - desktop, tablet, or mobile. Calculate anywhere, anytime.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy Focused</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    We don't store your calculations or personal data. Your privacy and security are our top priorities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Start Calculating?</h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join millions of users who trust Smart Calculator for accurate, fast, and free calculations.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              Explore Calculators
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}
