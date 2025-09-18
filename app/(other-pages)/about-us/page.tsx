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
    alternates: {
      canonical: "https://www.thesmartcalculator.com/about-us",
    },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Smart Calculator",
  description:
    "Learn about Smart Calculator, the leading platform for free online calculators across finance, health, math, and everyday use.",
  url: "https://www.thesmartcalculator.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Smart Calculator",
    url: "https://www.thesmartcalculator.com",
    logo: "https://www.thesmartcalculator.com/logo.png", // apna actual logo URL lagao
    sameAs: ["https://x.com/SmartCalculat0r", "https://www.instagram.com/thesmartcalculators/"],
  },
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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">About Us</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              At The Smart Calculator, our mission is simple: to make everyday calculations faster, easier, and more
              accurate for everyone. We are a dedicated team of IT professionals, math enthusiasts, and content creators
              who believe that knowledge should be accessible through smart, user-friendly tools.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Since our launch, we've grown into a trusted platform offering a modern collection of free online
              calculators across multiple categories including finance, health, fitness, math, conversions, and more.
              Whether you need to crunch numbers for a mortgage, track your BMI, or solve complex equations, we provide
              accurate, reliable results in seconds.
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
                <div className="text-5xl font-bold text-blue-600 mb-4">100+</div>
                <p className="text-xl font-semibold text-gray-900 mb-2">Calculators</p>
                <p className="text-gray-600">Comprehensive calculation tools</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-4">1M+</div>
                <p className="text-xl font-semibold text-gray-900 mb-2">Users</p>
                <p className="text-gray-600">People trust our platform</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-4">5M+</div>
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

        {/* Built for Accuracy & Trust Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for Accuracy & Trust</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Every calculator on our site is developed in-house, using the latest formulas, equations, and verified
                data sources. Our financial tools are reviewed by professional advisors, our health-related calculators
                are checked by medical experts, and our math-based tools follow universally recognized principles. When
                formulas differ, we provide results from multiple methods so you can compare outcomes with full
                transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Technology That Works for You</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We design with the user first. Our calculators are fully optimized for mobile devices, tablets, and
                desktops ensuring you get a seamless experience whether you're at home, at work, or on the go. We
                leverage modern web technology to keep the interface fast, lightweight, and accessible for everyone,
                everywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
              <p className="text-xl text-gray-600 mb-12">
                The Smart Calculator is built for 2025 standards and beyond combining trust, simplicity, and innovation
                to give you the best online calculation experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">Free & Always Accessible</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Every tool is available at no cost.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">Expert Verified</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Reviewed by financial advisors, health professionals, and domain experts.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">User-Centric Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Clean, intuitive layouts built for ease of use.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-red-400 to-red-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">Constantly Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We adapt to new data, formulas, and user requests to keep our tools relevant.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know about The Smart Calculator</p>
            </div>

            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Q1: What is The Smart Calculator?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    The Smart Calculator is a free online platform that offers calculators for finance, health, fitness,
                    math, conversions, and more. Our mission is to make everyday calculations faster, easier, and more
                    accurate.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q2: Are the calculators on The Smart Calculator free to use?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Yes! Every calculator is 100% free and always accessible without any subscription or hidden charges.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q3: How accurate are your online calculators?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    All our calculators are developed using the latest formulas, verified data sources, and expert
                    reviews. Financial tools are checked by advisors, health calculators by medical professionals, and
                    math tools by experts to ensure accuracy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q4: Can I use The Smart Calculator on my phone or tablet?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Absolutely. Our calculators are fully optimized for mobile devices, tablets, and desktops, giving
                    you a seamless experience anywhere, anytime.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q5: What types of calculators are available on The Smart Calculator?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    We provide a wide range of tools including Financial, Health & Fitness, Maths, Physics, Food, and
                    more.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q6: How often are your calculators updated?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    We constantly update our tools with the latest formulas, data, and user feedback to ensure accurate
                    and reliable results.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q7: Why should I choose The Smart Calculator over other online tools?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Unlike many free tools online, our calculators are expert-verified, user-friendly, fast, and
                    transparent. We even provide results from multiple methods when formulas differ, so you can compare
                    outcomes easily.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q8: Do I need to create an account to use The Smart Calculator?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    No registration is required. You can use all calculators instantly without logging in or sharing
                    personal details.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q9: Is The Smart Calculator suitable for professionals?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Yes. Our tools are trusted by students, professionals, financial advisors, and health experts who
                    rely on accurate calculations daily.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q10: How can I request a new calculator on your website?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    We welcome user feedback! You can contact us through our website to suggest a new calculator or
                    improvement, and our team will review and update accordingly.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Q11: Can I link to The Smart Calculator from my website?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Yes! You're welcome to link to any calculator or page on our site. Many educators, bloggers, and
                    businesses link to us as a reliable resource for their readers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Q12: Do you provide an API?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    Currently, we do not provide a public API. However, we are exploring options to make select
                    calculators available through API access in the future. Stay tuned for updates.
                  </p>
                </CardContent>
              </Card>
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
