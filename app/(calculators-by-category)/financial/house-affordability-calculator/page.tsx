"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Home, DollarSign, Users, FileText, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import houseAffordabilityData from "@/app/content/house-affordability-calculator.json"

export default function HouseAffordabilityCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Calculation Mode
  const [calculationMode, setCalculationMode] = useState("income") // "income" or "budget"

  // Mode A: Income & DTI Inputs
  const [annualIncome, setAnnualIncome] = useState("100000")
  const [monthlyDebts, setMonthlyDebts] = useState("500")
  const [frontEndRatio, setFrontEndRatio] = useState("28")
  const [backEndRatio, setBackEndRatio] = useState("36")

  // Mode B: Fixed Budget Input
  const [monthlyBudget, setMonthlyBudget] = useState("2500")

  // Common Inputs
  const [downPaymentPercent, setDownPaymentPercent] = useState("20")
  const [mortgageRate, setMortgageRate] = useState("6.0")
  const [loanTerm, setLoanTerm] = useState("30")
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.2")
  const [insuranceRate, setInsuranceRate] = useState("0.5")
  const [hoaRate, setHoaRate] = useState("0.3")

  const [results, setResults] = useState<{
    maxHousePrice: number
    monthlyPayment: number
    monthlyMortgage: number
    monthlyPropertyTax: number
    monthlyInsurance: number
    monthlyHOA: number
    totalMonthlyHousing: number
    downPaymentAmount: number
    loanAmount: number
    housingBudgetUsed: number
  } | null>(null)

  // Binary search to find maximum house price
  const findMaxHousePrice = (maxHousingBudget: number): number => {
    let low = 50000
    let high = 2000000
    let maxPrice = 0

    const rMonthly = Number.parseFloat(mortgageRate) / 100 / 12
    const N = Number.parseFloat(loanTerm) * 12
    const dpPercent = Number.parseFloat(downPaymentPercent) / 100
    const propTaxRate = Number.parseFloat(propertyTaxRate) / 100
    const insRate = Number.parseFloat(insuranceRate) / 100
    const hoaRatePercent = Number.parseFloat(hoaRate) / 100

    while (high - low > 1) {
      const midPrice = (low + high) / 2
      const loanAmount = midPrice * (1 - dpPercent)

      // Calculate monthly mortgage payment
      let monthlyMortgage = 0
      if (rMonthly > 0) {
        monthlyMortgage = (loanAmount * rMonthly * Math.pow(1 + rMonthly, N)) / (Math.pow(1 + rMonthly, N) - 1)
      } else {
        monthlyMortgage = loanAmount / N
      }

      // Calculate other monthly costs
      const monthlyPropertyTax = (midPrice * propTaxRate) / 12
      const monthlyInsurance = (midPrice * insRate) / 12
      const monthlyHOA = (midPrice * hoaRatePercent) / 12

      const totalHousingCost = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyHOA

      if (totalHousingCost <= maxHousingBudget) {
        maxPrice = midPrice
        low = midPrice
      } else {
        high = midPrice
      }
    }

    return maxPrice
  }

  const calculateAffordability = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    let maxHousingBudget = 0

    if (calculationMode === "income") {
      // Mode A: Based on Income & DTI
      const monthlyIncome = Number.parseFloat(annualIncome) / 12
      const monthlyDebt = Number.parseFloat(monthlyDebts)
      const frontRatio = Number.parseFloat(frontEndRatio) / 100
      const backRatio = Number.parseFloat(backEndRatio) / 100

      const frontMax = monthlyIncome * frontRatio
      const backMax = monthlyIncome * backRatio - monthlyDebt

      maxHousingBudget = Math.min(frontMax, backMax)
    } else {
      // Mode B: Fixed Monthly Budget
      maxHousingBudget = Number.parseFloat(monthlyBudget)
    }

    // Find maximum house price using binary search
    const maxPrice = findMaxHousePrice(maxHousingBudget)

    // Calculate final breakdown
    const dpPercent = Number.parseFloat(downPaymentPercent) / 100
    const rMonthly = Number.parseFloat(mortgageRate) / 100 / 12
    const N = Number.parseFloat(loanTerm) * 12
    const propTaxRate = Number.parseFloat(propertyTaxRate) / 100
    const insRate = Number.parseFloat(insuranceRate) / 100
    const hoaRatePercent = Number.parseFloat(hoaRate) / 100

    const downPaymentAmount = maxPrice * dpPercent
    const loanAmount = maxPrice * (1 - dpPercent)

    // Calculate monthly mortgage payment
    let monthlyMortgage = 0
    if (rMonthly > 0) {
      monthlyMortgage = (loanAmount * rMonthly * Math.pow(1 + rMonthly, N)) / (Math.pow(1 + rMonthly, N) - 1)
    } else {
      monthlyMortgage = loanAmount / N
    }

    const monthlyPropertyTax = (maxPrice * propTaxRate) / 12
    const monthlyInsurance = (maxPrice * insRate) / 12
    const monthlyHOA = (maxPrice * hoaRatePercent) / 12
    const totalMonthlyHousing = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + monthlyHOA

    setResults({
      maxHousePrice: maxPrice,
      monthlyPayment: totalMonthlyHousing,
      monthlyMortgage,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyHOA,
      totalMonthlyHousing,
      downPaymentAmount,
      loanAmount,
      housingBudgetUsed: maxHousingBudget,
    })
  }

  return (
    <>
      <SEO
        title="House Affordability Calculator – How Much House Can I Afford?"
        description="Free house affordability calculator that helps estimate how much home you can afford based on income, debts, down payment, loan term, mortgage rate, property tax, and insurance."
        keywords="house affordability calculator, home affordability, mortgage calculator, how much house can I afford, home buying calculator"
        slug="/financial/house-affordability-calculator"
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
                  <p className="text-sm text-gray-500">House Affordability Calculator</p>
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
              <span className="text-gray-900 font-medium">House Affordability Calculator</span>
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">House Affordability Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Determine how much house you can afford based on your income, debts, and financial situation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Affordability Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Calculation Mode */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Calculation Method</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">How would you like to calculate?</Label>
                      <Select value={calculationMode} onValueChange={setCalculationMode}>
                        <SelectTrigger className="h-12 border-2 focus:border-green-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Based on Income & Debt-to-Income Ratios</SelectItem>
                          <SelectItem value="budget">Based on Fixed Monthly Budget</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Mode A: Income & DTI */}
                  {calculationMode === "income" && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Income & Debt Information</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Annual Gross Income</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              value={annualIncome}
                              onChange={(e) => setAnnualIncome(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Monthly Debt Payments</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              value={monthlyDebts}
                              onChange={(e) => setMonthlyDebts(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Front-End Ratio (%)</Label>
                          <Input
                            type="number"
                            value={frontEndRatio}
                            onChange={(e) => setFrontEndRatio(e.target.value)}
                            className="h-12 text-lg border-2 focus:border-green-500"
                          />
                          <p className="text-xs text-gray-500">Housing costs as % of gross income (typically 28%)</p>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Back-End Ratio (%)</Label>
                          <Input
                            type="number"
                            value={backEndRatio}
                            onChange={(e) => setBackEndRatio(e.target.value)}
                            className="h-12 text-lg border-2 focus:border-green-500"
                          />
                          <p className="text-xs text-gray-500">Total debt as % of gross income (typically 36%)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode B: Fixed Budget */}
                  {calculationMode === "budget" && (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Monthly Housing Budget</h3>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Maximum Monthly Housing Payment</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={monthlyBudget}
                            onChange={(e) => setMonthlyBudget(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                        <p className="text-xs text-gray-500">Include mortgage, taxes, insurance, and HOA fees</p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Loan Details */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Loan & Property Details</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Down Payment (%)</Label>
                        <Input
                          type="number"
                          value={downPaymentPercent}
                          onChange={(e) => setDownPaymentPercent(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Mortgage Interest Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={mortgageRate}
                          onChange={(e) => setMortgageRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Loan Term (years)</Label>
                        <Select value={loanTerm} onValueChange={setLoanTerm}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 years</SelectItem>
                            <SelectItem value="20">20 years</SelectItem>
                            <SelectItem value="25">25 years</SelectItem>
                            <SelectItem value="30">30 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Property Tax Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={propertyTaxRate}
                          onChange={(e) => setPropertyTaxRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Home Insurance Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={insuranceRate}
                          onChange={(e) => setInsuranceRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">HOA Fee Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={hoaRate}
                          onChange={(e) => setHoaRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={calculateAffordability}
                    className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Affordability
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Affordability Results</CardTitle>
                  <CardDescription className="text-base">How much house you can afford</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Maximum House Price */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">Maximum House Price:</p>
                        <p className="text-4xl font-bold mb-2 text-green-700">
                          $
                          {results.maxHousePrice.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>

                      {/* Monthly Payment Breakdown */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">Monthly Payment Breakdown</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">Principal & Interest</span>
                            <span className="font-bold text-blue-600">
                              $
                              {results.monthlyMortgage.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">Property Tax</span>
                            <span className="font-bold text-purple-600">
                              $
                              {results.monthlyPropertyTax.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">Home Insurance</span>
                            <span className="font-bold text-orange-600">
                              $
                              {results.monthlyInsurance.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <span className="font-medium text-gray-700">HOA Fees</span>
                            <span className="font-bold text-yellow-600">
                              $
                              {results.monthlyHOA.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-medium text-gray-700">Total Monthly Payment</span>
                            <span className="font-bold text-gray-900">
                              $
                              {results.totalMonthlyHousing.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Purchase Details */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">Purchase Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                            <span className="font-medium text-gray-700">Down Payment Required</span>
                            <span className="font-bold text-indigo-600">
                              $
                              {results.downPaymentAmount.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg border border-pink-200">
                            <span className="font-medium text-gray-700">Loan Amount</span>
                            <span className="font-bold text-pink-600">
                              $
                              {results.loanAmount.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Budget Info */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 mb-2">
                          <strong>Housing Budget Used:</strong> $
                          {results.housingBudgetUsed.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-xs text-blue-600">
                          This calculation assumes {Number.parseFloat(downPaymentPercent)}% down payment and{" "}
                          {mortgageRate}% interest rate
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your information to see how much house you can afford</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How Much House Can I Afford */}
              <Card className="shadow-2xl p-0 border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How Much House Can I Afford?</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                      Determining how much house you can afford depends on several key factors including your income,
                      existing debts, down payment, and the current mortgage rates. Lenders typically use two main
                      ratios to evaluate your affordability:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>Front-End Ratio (28% Rule):</strong> Your total housing costs should not exceed 28% of
                        your gross monthly income
                      </li>
                      <li>
                        <strong>Back-End Ratio (36% Rule):</strong> Your total debt payments should not exceed 36% of
                        your gross monthly income
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Formulas & Logic */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">House Affordability Formulas & Logic</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Monthly Income Calculation</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        Monthly Income = Annual Income ÷ 12
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. DTI Ratio Limits</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        Front-End Max = Monthly Income × Front-End Ratio
                        <br />
                        Back-End Max = (Monthly Income × Back-End Ratio) - Monthly Debts
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Housing Budget</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        Max Housing Budget = min(Front-End Max, Back-End Max)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">4. Monthly Mortgage Payment</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        M = L × [r(1+r)^n] / [(1+r)^n - 1]
                        <br />
                        Where: L = Loan Amount, r = Monthly Rate, n = Number of Payments
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">5. Total Housing Cost</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        Total = Mortgage + Property Tax + Insurance + HOA
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example Calculations */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Example Calculations</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold mb-3 text-green-800">Example 1: Income-Based Calculation</h3>
                      <div className="text-gray-700 space-y-2">
                        <p>
                          <strong>Scenario:</strong> $100,000 annual income, $500 monthly debts, 30-year mortgage at 6%,
                          20% down payment
                        </p>
                        <p>
                          <strong>Calculation:</strong> Monthly income = $8,333, Front-end max = $2,333, Back-end max =
                          $2,500
                        </p>
                        <p>
                          <strong>Result:</strong> Max housing budget = $2,333, Affordable house ≈ $420,000
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold mb-3 text-blue-800">Example 2: Budget-Based Calculation</h3>
                      <div className="text-gray-700 space-y-2">
                        <p>
                          <strong>Scenario:</strong> Fixed budget of $2,500/month, same loan parameters as above
                        </p>
                        <p>
                          <strong>Calculation:</strong> Housing budget = $2,500 (user-defined)
                        </p>
                        <p>
                          <strong>Result:</strong> Affordable house ≈ $390,000
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to use */}
              <CalculatorGuide data={houseAffordabilityData} />

            </div>
          </div>
        </main>
      </div>
    </>
  )
}
