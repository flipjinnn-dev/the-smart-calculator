"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Calculator, Percent, DollarSign, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import interestRateData from "@/app/content/interest-rate-calculator.json"

export default function InterestRateCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const [loanAmount, setLoanAmount] = useState("32000")
  const [loanTermYears, setLoanTermYears] = useState("3")
  const [loanTermMonths, setLoanTermMonths] = useState("0")
  const [monthlyPayment, setMonthlyPayment] = useState("960")

  const [results, setResults] = useState<{
    interestRate: number
    totalPayments: number
    totalInterest: number
  } | null>(null)

  const solveForInterestRate = (principal: number, payment: number, totalMonths: number): number => {
    if (totalMonths === 0 || payment === 0) return 0

    // Initial guess: 5% annual rate
    let monthlyRate = 0.05 / 12
    const tolerance = 1e-10
    const maxIterations = 100

    for (let i = 0; i < maxIterations; i++) {
      if (Math.abs(monthlyRate) < 1e-15) {
        monthlyRate = 1e-10
      }

      // Loan payment formula: PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
      // Rearranged: f(r) = P * [r(1+r)^n] / [(1+r)^n - 1] - PMT = 0
      const onePlusR = 1 + monthlyRate
      const onePlusRN = Math.pow(onePlusR, totalMonths)

      const f = (principal * (monthlyRate * onePlusRN)) / (onePlusRN - 1) - payment

      // Derivative f'(r)
      const numerator = monthlyRate * onePlusRN
      const denominator = onePlusRN - 1

      const dNumerator = onePlusRN + monthlyRate * totalMonths * Math.pow(onePlusR, totalMonths - 1)
      const dDenominator = totalMonths * Math.pow(onePlusR, totalMonths - 1)

      const df = (principal * (dNumerator * denominator - numerator * dDenominator)) / (denominator * denominator)

      if (Math.abs(df) < tolerance) break

      const newRate = monthlyRate - f / df

      if (Math.abs(newRate - monthlyRate) < tolerance) {
        return newRate * 12 * 100 // Convert to annual percentage
      }

      monthlyRate = newRate
    }

    return monthlyRate * 12 * 100 // Convert to annual percentage
  }

  const calculateInterestRate = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const principal = Number.parseFloat(loanAmount) || 0
    const payment = Number.parseFloat(monthlyPayment) || 0
    const years = Number.parseFloat(loanTermYears) || 0
    const months = Number.parseFloat(loanTermMonths) || 0
    const totalMonths = years * 12 + months

    if (principal <= 0 || payment <= 0 || totalMonths <= 0) {
      setResults(null)
      return
    }

    const annualRate = solveForInterestRate(principal, payment, totalMonths)
    const totalOfPayments = payment * totalMonths
    const totalInterestPaid = totalOfPayments - principal

    setResults({
      interestRate: annualRate,
      totalPayments: totalOfPayments,
      totalInterest: totalInterestPaid,
    })
  }

  return (
    <>
      <SEO
        title="Interest Rate Calculator – Find Loan Interest Rates"
        description="Calculate the interest rate on loans with fixed terms and monthly payments. Determine real interest rates when only payment and loan amount are known."
        keywords="interest rate calculator, loan rate calculator, APR calculator, loan interest calculator"
        slug="/financial/interest-rate-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                  <p className="text-sm text-gray-500">Interest Rate Calculator</p>
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
              <Link href="/financial" className="text-gray-500 hover:text-blue-600">
                Financial
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Interest Rate Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Percent className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Interest Rate Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The Interest Rate Calculator determines real interest rates on loans with fixed terms and monthly
                payments. For example, it can calculate interest rates in situations where car dealers only provide
                monthly payment information and total price without including the actual rate on the car loan.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>Interest Rate Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Loan Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Loan Information</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Loan amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            placeholder="32000"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Loan term</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Input
                              type="number"
                              value={loanTermYears}
                              onChange={(e) => setLoanTermYears(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                              placeholder="3"
                            />
                            <Label className="text-sm text-gray-600">years</Label>
                          </div>
                          <div className="space-y-2">
                            <Input
                              type="number"
                              value={loanTermMonths}
                              onChange={(e) => setLoanTermMonths(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                              placeholder="0"
                            />
                            <Label className="text-sm text-gray-600">months</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Monthly payment</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={monthlyPayment}
                            onChange={(e) => setMonthlyPayment(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            placeholder="960"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={calculateInterestRate}
                    className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold"
                  >
                    Calculate Interest Rate
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Results</CardTitle>
                  <CardDescription className="text-base">Your loan interest rate breakdown</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Interest Rate */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300">
                        <p className="text-lg mb-2 font-semibold text-blue-800">Interest rate</p>
                        <p className="text-4xl font-bold mb-2 text-blue-700">{results.interestRate.toFixed(3)}%</p>
                      </div>

                      {/* Payment Summary */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-gray-700">
                            Total of{" "}
                            {(Number.parseFloat(loanTermYears) || 0) * 12 + (Number.parseFloat(loanTermMonths) || 0)}{" "}
                            monthly payments
                          </span>
                          <span className="font-bold text-green-600">
                            $
                            {results.totalPayments.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">Total interest paid</span>
                          <span className="font-bold text-orange-600">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your loan information to calculate the interest rate</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Formulas & Calculation Method</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Loan Payment Formula</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <div className="text-center text-lg font-mono">PMT = P × [r(1+r)^n] / [(1+r)^n - 1]</div>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Where: PMT = Monthly Payment, P = Principal (loan amount), r = Monthly interest rate, n = Number
                        of payments
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Interest Rate Calculation</h3>
                      <p className="text-gray-700">
                        Since the interest rate cannot be solved algebraically from the payment formula, this calculator
                        uses the Newton-Raphson numerical method to iteratively solve for the rate that produces the
                        given payment amount.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Total Interest Calculation</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-2">
                        <div className="text-center text-lg font-mono">
                          Total Interest = (Monthly Payment × Number of Payments) - Loan Amount
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* FAQ */}
              <CalculatorGuide data={interestRateData} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
