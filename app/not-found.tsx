import Link from "next/link"
import { Home, Calculator, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/logo"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo />
              <div>
                <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  Smart Calculator
                </Link>
                <p className="text-sm text-gray-600">Page Not Found</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full mb-6">
              <Calculator className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Calculator Not Found</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Oops! The calculator you're looking for doesn't exist or has been moved. Let's help you find what you
              need.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="text-lg px-8 py-3">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/category/financial">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                <Search className="w-5 h-5 mr-2" />
                Browse Calculators
              </Button>
            </Link>
          </div>

          {/* Popular Calculators */}
          <section className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Calculators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Mortgage Calculator", href: "/calculator/mortgage", category: "Financial" },
                { name: "BMI Calculator", href: "/calculator/bmi", category: "Health" },
                { name: "Loan Calculator", href: "/calculator/loan", category: "Financial" },
                { name: "Percentage Calculator", href: "/calculator/percentage", category: "Math" },
                { name: "Compound Interest", href: "/calculator/compound-interest", category: "Financial" },
                { name: "Calorie Calculator", href: "/calculator/calorie", category: "Health" },
              ].map((calc, index) => (
                <Link key={index} href={calc.href}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {calc.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">{calc.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-blue-600 text-sm font-medium">Calculate now →</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Help Section */}
          <section className="mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Can't find the calculator you're looking for?</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We're constantly adding new calculators. If you need a specific calculation tool, let us know and
                  we'll consider adding it to our collection.
                </p>
                <Link href="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Logo />
              <span className="text-xl font-bold">Smart Calculator</span>
            </div>
            <p className="text-gray-400">&copy; 2024 Smart Calculator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
