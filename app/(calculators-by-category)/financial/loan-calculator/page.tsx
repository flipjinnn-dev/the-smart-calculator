"use client"

import { useRef, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Calculator, DollarSign, Percent, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import CalculatorGuide from "@/components/calculator-guide"
import loanData from "@/app/content/loan-calculator.json"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Loan Calculator",
  description: "Calculate loan payments, total interest, and payment schedules for any loan",
  url: "https://smartcalculator.com/calculator/loan",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

export default function LoanCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [results, setResults] = useState<{
    monthlyPayment: number
    totalInterest: number
    totalPayment: number
  } | null>(null)

  const calculateLoan = () => {
    const principal = Number.parseFloat(loanAmount)
    const monthlyRate = Number.parseFloat(interestRate) / 100 / 12
    const numberOfPayments = Number.parseFloat(loanTerm) * 12

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) return

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - principal

    setResults({
      monthlyPayment,
      totalInterest,
      totalPayment,
    })
   // Scroll to results
  scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  return (
    <>
      <Head>
        <title>Loan Calculator – Calculate Payments Fast</title>
        <meta
          name="description"
          content="Estimate loan payments, interest, and total cost instantly. Use our free loan calculator to compare options and make smarter borrowing decisions."
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

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
                  <p className="text-sm text-gray-500">Loan Calculator</p>
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
              <Link href="/financial" className="text-gray-500 hover:text-blue-600">
                Financial
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Loan Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Loan Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your monthly loan payments, total interest, and see how different loan terms affect your
                payments.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Form */}
              <Card className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Loan Details</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    Enter your loan information to calculate payments
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="loanAmount" className="flex items-center space-x-2 text-base font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>Loan Amount</span>
                    </Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="25000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="interestRate" className="flex items-center space-x-2 text-base font-semibold">
                      <Percent className="w-4 h-4" />
                      <span>Annual Interest Rate (%)</span>
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      placeholder="5.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="loanTerm" className="flex items-center space-x-2 text-base font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>Loan Term (years)</span>
                    </Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      placeholder="5"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <Button
                    onClick={() => {
                          calculateLoan()
                          scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                        }}
                    className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
                  >
                    Calculate Loan
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-2xl">Calculation Results</CardTitle>
                  <CardDescription className="text-base">Your loan payment breakdown</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {results ? (
                    <div className="space-y-8">
                      <div className="text-center p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
                        <p className="text-lg text-gray-600 mb-3">Monthly Payment</p>
                        <p className="text-5xl font-bold text-green-600 mb-4">
                          $
                          {results.monthlyPayment.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">Total Interest</p>
                          <p className="text-2xl font-bold text-gray-900">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">Total Payment</p>
                          <p className="text-2xl font-bold text-gray-900">
                            $
                            {results.totalPayment.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-gray-500">
                      <Calculator className="w-16 h-16 mx-auto mb-6 opacity-50" />
                      <p className="text-lg">Enter loan details to see your calculation</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8">
              <CalculatorGuide data={loanData} />
            </div>
        </main>


      </div>
    </>
  )
}
