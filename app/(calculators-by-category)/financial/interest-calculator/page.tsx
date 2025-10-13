"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SimilarCalculators from "@/components/similar-calculators"
import { Calculator, DollarSign, Percent, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import Logo from "@/components/logo"
import CalculatorGuide from "@/components/calculator-guide"
import interestData from "@/app/content/interest-calculator.json"
import SEO from "@/lib/seo"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function InterestCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [initialInvestment, setInitialInvestment] = useState("")
  const [annualContribution, setAnnualContribution] = useState("")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [contributionTiming, setContributionTiming] = useState("beginning")
  const [interestRate, setInterestRate] = useState("")
  const [compound, setCompound] = useState("1")
  const [years, setYears] = useState("")
  const [months, setMonths] = useState("")
  const [taxRate, setTaxRate] = useState("")
  const [inflationRate, setInflationRate] = useState("")
  const [results, setResults] = useState<any>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    // Initial investment validation
    const initialInv = Number.parseFloat(initialInvestment)
    if (!initialInvestment || isNaN(initialInv) || initialInv < 0) {
      newErrors.initialInvestment = "Please enter a valid initial investment amount (≥ 0)"
    }

    // Annual contribution validation
    const annualCont = Number.parseFloat(annualContribution)
    if (annualContribution && (isNaN(annualCont) || annualCont < 0)) {
      newErrors.annualContribution = "Annual contribution must be ≥ 0"
    }

    // Monthly contribution validation
    const monthlyCont = Number.parseFloat(monthlyContribution)
    if (monthlyContribution && (isNaN(monthlyCont) || monthlyCont < 0)) {
      newErrors.monthlyContribution = "Monthly contribution must be ≥ 0"
    }

    // Interest rate validation
    const rate = Number.parseFloat(interestRate)
    if (!interestRate || isNaN(rate) || rate < 0 || rate > 100) {
      newErrors.interestRate = "Please enter a valid interest rate (0-100%)"
    }

    // Years validation
    const yearsNum = Number.parseInt(years)
    const monthsNum = Number.parseInt(months) || 0
    if ((!years || isNaN(yearsNum) || yearsNum < 0) && monthsNum === 0) {
      newErrors.years = "Please enter a valid investment period"
    }

    // Months validation
    if (months && (isNaN(monthsNum) || monthsNum < 0 || monthsNum > 11)) {
      newErrors.months = "Months must be between 0-11"
    }

    // Tax rate validation
    const taxRateNum = Number.parseFloat(taxRate)
    if (taxRate && (isNaN(taxRateNum) || taxRateNum < 0 || taxRateNum > 100)) {
      newErrors.taxRate = "Tax rate must be between 0-100%"
    }

    // Inflation rate validation
    const inflationRateNum = Number.parseFloat(inflationRate)
    if (inflationRate && (isNaN(inflationRateNum) || inflationRateNum < 0 || inflationRateNum > 100)) {
      newErrors.inflationRate = "Inflation rate must be between 0-100%"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateInterest = () => {
  // Scroll to results
  scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    // Clear previous errors
    setErrors({})

    // Validate inputs
    if (!validateInputs()) {
      return
    }

    const P = Number.parseFloat(initialInvestment) || 0
    const annualCont = Number.parseFloat(annualContribution) || 0
    const monthlyCont = Number.parseFloat(monthlyContribution) || 0
    const r = (Number.parseFloat(interestRate) || 0) / 100
    const n = Number.parseInt(compound)
    const t = (Number.parseInt(years) || 0) + (Number.parseInt(months) || 0) / 12
    const tax = (Number.parseFloat(taxRate) || 0) / 100
    const inflation = (Number.parseFloat(inflationRate) || 0) / 100

    // Calculate total contributions
    const totalAnnualCont = annualCont * t
    const totalMonthlyCont = monthlyCont * t * 12
    const totalContributions = P + totalAnnualCont + totalMonthlyCont

    // Calculate future value
    let FV = P * Math.pow(1 + r / n, n * t)
    // Add annual contributions
    if (annualCont > 0) {
      const factor = contributionTiming === "beginning" ? 1 + r / n : 1
      FV += (annualCont * factor * (Math.pow(1 + r / n, n * t) - 1)) / (r / n)
    }
    // Add monthly contributions
    if (monthlyCont > 0) {
      const m = 12
      const monthlyRate = r / m
      const monthsTotal = t * 12
      const factor = contributionTiming === "beginning" ? 1 + monthlyRate : 1
      FV += (monthlyCont * factor * (Math.pow(1 + monthlyRate, monthsTotal) - 1)) / monthlyRate
    }

    // Interest earned
    const totalInterest = FV - totalContributions
    // Interest of initial investment
    const interestInitial = P * (Math.pow(1 + r / n, n * t) - 1)
    // Interest of contributions
    const interestContributions = totalInterest - interestInitial
    // After-tax
    const afterTax = FV - totalInterest * tax
    // After inflation
    const afterInflation = FV / Math.pow(1 + inflation, t)

    setResults({
      endingBalance: FV,
      totalPrincipal: P,
      totalContributions: totalContributions,
      totalInterest: totalInterest,
      interestInitial: interestInitial,
      interestContributions: interestContributions,
      afterInflation: afterInflation,
    })

    if (window.innerWidth <= 768 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }

  return (
    <>
<SEO
  title="Interest Calculator – Quick & Accurate Results"
  description="Calculate interest on savings, loans, or investments instantly. Use our free interest calculator to plan better and maximize financial growth."
  keywords="interest calculator, loan interest calculator, savings interest calculator, investment interest calculator"
  slug="/financial/interest-calculator"
/>
      <div className="min-h-screen bg-white">
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
                  <p className="text-sm text-gray-500">Interest Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>
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
              <span className="text-gray-900 font-medium">Interest Calculator</span>
            </div>
          </div>
        </nav>
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Interest Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your investment growth, interest, and buying power after inflation.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-md border-0 min-h-0 pt-0 main-card">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg py-4 px-4">
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <Calculator className="w-5 h-5 text-green-600" />
                    <span>Investment Details</span>
                  </CardTitle>
                  <CardDescription className="text-sm">Enter your investment info</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="initialInvestment" className="flex items-center space-x-2 text-sm font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span>Initial investment</span>
                      </Label>
                      <Input
                        id="initialInvestment"
                        type="number"
                        placeholder="20000"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        className={`h-10 text-base ${errors.initialInvestment ? "border-red-500" : ""}`}
                      />
                      {errors.initialInvestment && (
                        <p className="text-xs text-red-500 mt-1">{errors.initialInvestment}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="annualContribution" className="flex items-center space-x-2 text-sm font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span>Annual contribution</span>
                      </Label>
                      <Input
                        id="annualContribution"
                        type="number"
                        placeholder="5000"
                        value={annualContribution}
                        onChange={(e) => setAnnualContribution(e.target.value)}
                        className={`h-10 text-base ${errors.annualContribution ? "border-red-500" : ""}`}
                      />
                      {errors.annualContribution && (
                        <p className="text-xs text-red-500 mt-1">{errors.annualContribution}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="monthlyContribution"
                        className="flex items-center space-x-2 text-sm font-semibold"
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Monthly contribution</span>
                      </Label>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        placeholder="0"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        className={`h-10 text-base ${errors.monthlyContribution ? "border-red-500" : ""}`}
                      />
                      {errors.monthlyContribution && (
                        <p className="text-xs text-red-500 mt-1">{errors.monthlyContribution}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contributionTiming" className="text-sm font-semibold">
                        Contribute at the
                      </Label>
                      <Select value={contributionTiming} onValueChange={setContributionTiming}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginning">Beginning</SelectItem>
                          <SelectItem value="end">End</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-xs text-gray-500">of each compounding period</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interestRate" className="flex items-center space-x-2 text-sm font-semibold">
                        <Percent className="w-4 h-4" />
                        <span>Interest rate (%)</span>
                      </Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        placeholder="5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className={`h-10 text-base ${errors.interestRate ? "border-red-500" : ""}`}
                      />
                      {errors.interestRate && <p className="text-xs text-red-500 mt-1">{errors.interestRate}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compound" className="text-sm font-semibold">
                        Compound
                      </Label>
                      <Select value={compound} onValueChange={setCompound}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Annually</SelectItem>
                          <SelectItem value="4">Quarterly</SelectItem>
                          <SelectItem value="12">Monthly</SelectItem>
                          <SelectItem value="365">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="years" className="flex items-center space-x-2 text-sm font-semibold">
                        <Calendar className="w-4 h-4" />
                        <span>Years</span>
                      </Label>
                      <Input
                        id="years"
                        type="number"
                        placeholder="5"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className={`h-10 text-base ${errors.years ? "border-red-500" : ""}`}
                      />
                      {errors.years && <p className="text-xs text-red-500 mt-1">{errors.years}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="months" className="flex items-center space-x-2 text-sm font-semibold">
                        <Calendar className="w-4 h-4" />
                        <span>Months</span>
                      </Label>
                      <Input
                        id="months"
                        type="number"
                        placeholder="0"
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                        className={`h-10 text-base ${errors.months ? "border-red-500" : ""}`}
                      />
                      {errors.months && <p className="text-xs text-red-500 mt-1">{errors.months}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRate" className="flex items-center space-x-2 text-sm font-semibold">
                        <Percent className="w-4 h-4" />
                        <span>Tax rate (%)</span>
                      </Label>
                      <Input
                        id="taxRate"
                        type="number"
                        step="0.01"
                        placeholder="0"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        className={`h-10 text-base ${errors.taxRate ? "border-red-500" : ""}`}
                      />
                      {errors.taxRate && <p className="text-xs text-red-500 mt-1">{errors.taxRate}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inflationRate" className="flex items-center space-x-2 text-sm font-semibold">
                        <Percent className="w-4 h-4" />
                        <span>Inflation rate (%)</span>
                      </Label>
                      <Input
                        id="inflationRate"
                        type="number"
                        step="0.01"
                        placeholder="3"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(e.target.value)}
                        className={`h-10 text-base ${errors.inflationRate ? "border-red-500" : ""}`}
                      />
                      {errors.inflationRate && <p className="text-xs text-red-500 mt-1">{errors.inflationRate}</p>}
                    </div>
                  </div>
                  <Button
                    onClick={calculateInterest}
                    className="w-full h-10 text-base bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow mt-4"
                  >
                    Calculate
                  </Button>
                </CardContent>
              </Card>
              <Card ref={resultsRef} className="shadow-md border-0 min-h-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg py-4 px-4">
                  <CardTitle className="text-xl">Results</CardTitle>
                  <CardDescription className="text-sm">Investment summary</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  {results ? (
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                        <p className="text-base text-gray-600 mb-1">Ending balance</p>
                        <p className="text-3xl font-bold text-green-600 mb-2">
                          $
                          {results.endingBalance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Total principal</p>
                          <p className="text-lg font-bold text-blue-600">
                            $
                            {results.totalPrincipal.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Total contributions</p>
                          <p className="text-lg font-bold text-gray-900">
                            $
                            {results.totalContributions.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Total interest</p>
                          <p className="text-lg font-bold text-green-700">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Interest of initial investment</p>
                          <p className="text-lg font-bold text-yellow-600">
                            $
                            {results.interestInitial.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Interest of the contributions</p>
                          <p className="text-lg font-bold text-purple-700">
                            $
                            {results.interestContributions.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-pink-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Buying power after inflation</p>
                          <p className="text-lg font-bold text-pink-700">
                            $
                            {results.afterInflation.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-gray-500">
                      <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-50" />
                      <p className="text-lg">Enter investment details to see results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        <SimilarCalculators
        calculators={[
          {
            calculatorName: "Compound Interest Calculator",
            calculatorHref: "/financial/compound-interest-calculator",
            calculatorDescription: "Calculate compound interest with various compounding frequencies"
          },
          {
            calculatorName: "Interest Calculator",
            calculatorHref: "/financial/interest-calculator",
            calculatorDescription: "Calculate simple and compound interest on investments"
          },
          {
            calculatorName: "Time Value of Money Calculator",
            calculatorHref: "/financial/finance-calculator",
            calculatorDescription: "Calculate present and future value of money with time"
          }
        ]}
        color="green"
        title="Related Financial Calculators"
      />
          {/* How to Use Section */}
          <div className="mt-8">
              <CalculatorGuide data={interestData} />
          </div>
        </main>
      </div>



      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <AlertCircle className="w-6 h-6 text-green-600" />
          <AlertDescription className="ml-4">
            This calculator is for educational purposes only and should not be used as financial advice.
          </AlertDescription>
        </div>
      </div>

    </>
  )
}
