"use client"

import type React from "react"

import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Home, DollarSign, FileText, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

export default function RentAffordabilityCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Form inputs
  const [incomeType, setIncomeType] = useState("annual")
  const [income, setIncome] = useState("60000")
  const [monthlyDebts, setMonthlyDebts] = useState("500")
  const [frontEndRatio, setFrontEndRatio] = useState("30")
  const [backEndRatio, setBackEndRatio] = useState("40")

  const [results, setResults] = useState<{
    monthlyIncome: number
    frontEndLimit: number
    backEndLimit: number
    maxAffordableRent: number
    limitingFactor: string
  } | null>(null)

  const calculateRent = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    // Step 1: Convert income to monthly
    const incomeValue = Number.parseFloat(income)
    const monthlyIncome = incomeType === "annual" ? incomeValue / 12 : incomeValue

    // Step 2: Front-end limit calculation
    const frontRatio = Number.parseFloat(frontEndRatio) / 100
    const frontEndLimit = frontRatio * monthlyIncome

    // Step 3: Back-end limit calculation
    const backRatio = Number.parseFloat(backEndRatio) / 100
    const debts = Number.parseFloat(monthlyDebts)
    const backEndLimit = backRatio * monthlyIncome - debts

    // Step 4: Maximum affordable rent
    const maxAffordableRent = Math.max(0, Math.min(frontEndLimit, backEndLimit))

    // Determine limiting factor
    let limitingFactor = ""
    if (frontEndLimit <= backEndLimit) {
      limitingFactor = "Front-end ratio"
    } else {
      limitingFactor = "Back-end ratio"
    }

    if (maxAffordableRent === 0) {
      limitingFactor = "Debt-to-income too high"
    }

    setResults({
      monthlyIncome,
      frontEndLimit,
      backEndLimit,
      maxAffordableRent,
      limitingFactor,
    })
  }

  return (
    <>
      <SEO
        title="Rent Affordability Calculator – How Much Rent Can I Afford?"
        description="Calculate the maximum rent you can afford based on your income, debts, and standard financial ratios. Free rent affordability calculator with detailed breakdown."
        keywords="rent affordability calculator, how much rent can I afford, rental budget calculator, apartment affordability"
        slug="/financial/rent-affordability-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Rent Affordability Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-green-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/financial" className="text-gray-500 hover:text-green-600">
                Financial Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Rent Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Home className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Rent Affordability Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Estimate the maximum rent you can afford based on your income, debts, and standard financial ratios.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Rent Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Income Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Income Information</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Income Type</Label>
                        <Select value={incomeType} onValueChange={setIncomeType}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="annual">Annual Income</SelectItem>
                            <SelectItem value="monthly">Monthly Income</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">
                          {incomeType === "annual" ? "Annual Gross Income" : "Monthly Gross Income"}
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            placeholder={incomeType === "annual" ? "60000" : "5000"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Debt Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Debt Information</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">Other Monthly Debt Payments</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={monthlyDebts}
                          onChange={(e) => setMonthlyDebts(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          placeholder="500"
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        Include credit cards, car loans, student loans, and other monthly debt payments
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Financial Ratios */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calculator className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Financial Ratios</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Front-end Ratio (%)</Label>
                        <Input
                          type="number"
                          value={frontEndRatio}
                          onChange={(e) => setFrontEndRatio(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                          placeholder="30"
                        />
                        <p className="text-sm text-gray-600">Percentage of income for housing (typically 28-30%)</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Back-end Ratio (%)</Label>
                        <Input
                          type="number"
                          value={backEndRatio}
                          onChange={(e) => setBackEndRatio(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                          placeholder="40"
                        />
                        <p className="text-sm text-gray-600">Percentage of income for all debts (typically 36-40%)</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={calculateRent}
                    className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Affordable Rent
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Rent Affordability Results</CardTitle>
                  <CardDescription className="text-base">Your maximum affordable rent breakdown</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Maximum Affordable Rent */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">Maximum Affordable Rent:</p>
                        <p className="text-4xl font-bold mb-2 text-green-700">
                          $
                          {results.maxAffordableRent.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-sm text-green-600">per month</p>
                      </div>

                      {/* Breakdown */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">Calculation Breakdown</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">Monthly Income</span>
                            <span className="font-bold text-blue-600">
                              $
                              {results.monthlyIncome.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">Front-end Limit ({frontEndRatio}%)</span>
                            <span className="font-bold text-purple-600">
                              $
                              {results.frontEndLimit.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">Back-end Limit ({backEndRatio}%)</span>
                            <span className="font-bold text-orange-600">
                              $
                              {results.backEndLimit.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-medium text-gray-700">Limiting Factor</span>
                            <span className="font-bold text-gray-900">{results.limitingFactor}</span>
                          </div>
                        </div>
                      </div>

                      {/* Guidelines */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 mb-2">
                          <strong>Financial Guidelines:</strong>
                        </p>
                        <ul className="text-xs text-blue-600 space-y-1">
                          <li>• Housing costs should not exceed {frontEndRatio}% of gross income</li>
                          <li>• Total debt payments should not exceed {backEndRatio}% of gross income</li>
                          <li>• Consider additional costs like utilities, insurance, and maintenance</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your income and debt information to see your results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Example Calculation */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Example Calculation</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Sample Scenario:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Inputs:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Annual income: $60,000</li>
                          <li>• Monthly debts: $500</li>
                          <li>• Front-end ratio: 30%</li>
                          <li>• Back-end ratio: 40%</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Calculation:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Monthly income: $60,000 ÷ 12 = $5,000</li>
                          <li>• Front-end limit: $5,000 × 30% = $1,500</li>
                          <li>• Back-end limit: $5,000 × 40% - $500 = $1,500</li>
                          <li>
                            • <strong>Maximum rent: $1,500</strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Formulas & Calculation Details</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Monthly Income Conversion</h3>
                      <p className="text-gray-700 mb-2">If annual income: Monthly Income = Annual Income ÷ 12</p>
                      <p className="text-gray-700">If monthly income: Monthly Income = Monthly Income (as entered)</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. Front-end Ratio Limit</h3>
                      <p className="text-gray-700">Rent (Front-end) = Front-end Ratio × Monthly Income</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Back-end Ratio Limit</h3>
                      <p className="text-gray-700">
                        Rent (Back-end) = (Back-end Ratio × Monthly Income) - Monthly Debts
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">4. Maximum Affordable Rent</h3>
                      <p className="text-gray-700">Maximum Rent = min(Front-end Limit, Back-end Limit)</p>
                      <p className="text-sm text-gray-600 mt-1">
                        If the result is negative, the affordable rent is set to $0
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                        What is the front-end ratio?
                      </h3>
                      <p className="text-gray-700">
                        The front-end ratio is the percentage of your gross monthly income that goes toward housing
                        costs. Lenders typically prefer this to be no more than 28-30%.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                        What is the back-end ratio?
                      </h3>
                      <p className="text-gray-700">
                        The back-end ratio is the percentage of your gross monthly income that goes toward all debt
                        payments, including housing. Lenders typically prefer this to be no more than 36-40%.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                        Should I include utilities in my rent budget?
                      </h3>
                      <p className="text-gray-700">
                        This calculator shows the maximum rent payment only. You should budget separately for utilities,
                        renter's insurance, parking, and other housing-related expenses.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
                        What debts should I include in monthly debt payments?
                      </h3>
                      <p className="text-gray-700">
                        Include all recurring monthly debt payments such as credit cards, car loans, student loans,
                        personal loans, and other installment debts. Do not include utilities or insurance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
