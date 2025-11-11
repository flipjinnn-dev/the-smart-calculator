import Link from "next/link"
import { Home, Calculator, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

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
                { name: "Mortgage Calculator", href: "/financial/mortgage-calculator", category: "Financial" },
                { name: "BMI Calculator", href: "/health/bmi-calculator", category: "Health" },
                { name: "Loan Calculator", href: "/financial/loan-calculator", category: "Financial" },
                { name: "Percentage Calculator", href: "/maths/percentage-calculator", category: "Maths" },
                { name: "Compound Interest", href: "/financial/compound-interest-calculator", category: "Financial" },
                { name: "Calorie Calculator", href: "/health/calorie-calculator", category: "Health" },
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
    </div>
  )
}
