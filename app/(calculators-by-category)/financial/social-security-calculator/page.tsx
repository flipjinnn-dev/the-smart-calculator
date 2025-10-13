"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Shield, DollarSign, TrendingUp, FileText, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import SimilarCalculators from "@/components/similar-calculators"
import socialSecurityData from "@/app/content/social-security-calculator.json"

// Full Retirement Age table based on birth year
const FRA_TABLE: { [key: string]: number } = {
  "1937": 65.0,
  "1938": 65.17, // 65 and 2 months
  "1939": 65.33, // 65 and 4 months
  "1940": 65.5,  // 65 and 6 months
  "1941": 65.67, // 65 and 8 months
  "1942": 65.83, // 65 and 10 months
  "1943": 66.0,
  "1944": 66.0,
  "1945": 66.0,
  "1946": 66.0,
  "1947": 66.0,
  "1948": 66.0,
  "1949": 66.0,
  "1950": 66.0,
  "1951": 66.0,
  "1952": 66.0,
  "1953": 66.0,
  "1954": 66.0,
  "1955": 66.17, // 66 and 2 months
  "1956": 66.33, // 66 and 4 months
  "1957": 66.5,  // 66 and 6 months
  "1958": 66.67, // 66 and 8 months
  "1959": 66.83, // 66 and 10 months
  "1960": 67.0,
}

export default function SocialSecurityCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()


  // Input states (with validation)
  const [birthYear, setBirthYear] = useState("1960")
  const [claimingAges, setClaimingAges] = useState<number[]>([62, 67, 70])
  const [lifeExpectancy, setLifeExpectancy] = useState("85")
  const [monthlyBenefitAtFRA, setMonthlyBenefitAtFRA] = useState("2500")
  const [colaRate, setColaRate] = useState("2.5")
  const [investmentReturn, setInvestmentReturn] = useState("7.0")
  const [showInflatedDollars, setShowInflatedDollars] = useState(false)

  // Clamp and validate input values to match calculator.net
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val))

  // Clamp birth year to 1900 - current year
  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 1900
    val = clamp(val, 1900, new Date().getFullYear())
    setBirthYear(val.toString())
  }

  // Clamp life expectancy (minimum 62, max 120)
  const handleLifeExpectancyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 62
    val = clamp(val, 62, 120)
    setLifeExpectancy(val.toString())
  }

  // Clamp monthly benefit (minimum 1, max 20000)
  const handleMonthlyBenefitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 1
    val = clamp(val, 1, 20000)
    setMonthlyBenefitAtFRA(val.toString())
  }

  // Clamp COLA (0-10%)
  const handleColaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0
    val = clamp(val, 0, 10)
    setColaRate(val.toString())
  }

  // Clamp investment return (0-15%)
  const handleInvestmentReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0
    val = clamp(val, 0, 15)
    setInvestmentReturn(val.toString())
  }

  // Results state
  const [results, setResults] = useState<{
    claimingAge: number
    monthlyBenefit: number
    lifetimeBenefits: number
    presentValue: number
    adjustmentFactor: number
  }[] | null>(null)


  // Calculate Full Retirement Age (FRA) in years and months, matching SSA rules
  const getFullRetirementAge = (year: string): { years: number, months: number, decimal: number } => {
    const y = parseInt(year)
    if (y <= 1937) return { years: 65, months: 0, decimal: 65.0 }
    if (y >= 1960) return { years: 67, months: 0, decimal: 67.0 }
    // 1938-1942: add 2 months per year
    if (y >= 1938 && y <= 1942) {
      const addMonths = (y - 1937) * 2
      return { years: 65, months: addMonths, decimal: 65 + addMonths / 12 }
    }
    // 1943-1954: 66
    if (y >= 1943 && y <= 1954) return { years: 66, months: 0, decimal: 66.0 }
    // 1955-1959: add 2 months per year
    if (y >= 1955 && y <= 1959) {
      const addMonths = (y - 1954) * 2
      return { years: 66, months: addMonths, decimal: 66 + addMonths / 12 }
    }
    // fallback
    return { years: 67, months: 0, decimal: 67.0 }
  }

  // Calculate adjustment factor for claiming before/after FRA (SSA/Calculator.net logic)
  // Early: 5/9 of 1% per month for first 36 months, 5/12 of 1% for additional months
  // Late: 2/3 of 1% per month (8% per year)
  const getAdjustmentFactor = (claimAge: number, fraDecimal: number): number => {
    const monthsDiff = Math.round((claimAge - fraDecimal) * 12)
    if (monthsDiff === 0) return 1.0
    if (monthsDiff < 0) {
      // Early claiming
      const monthsEarly = -monthsDiff
      let reduction = 0
      if (monthsEarly <= 36) {
        reduction = monthsEarly * (5/9) * 0.01
      } else {
        reduction = 36 * (5/9) * 0.01 + (monthsEarly - 36) * (5/12) * 0.01
      }
      return 1 - reduction
    } else {
      // Delayed credits
      return 1 + monthsDiff * (2/3) * 0.01
    }
  }

  // Calculate present value of benefits (Calculator.net logic: monthly compounding, COLA, discounting)
  const calculatePresentValue = (
    monthlyBenefit: number,
    claimAge: number,
    lifeExp: number,
    cola: number,
    investReturn: number
  ): number => {
    let pv = 0
    const monthlyReturn = investReturn / 100 / 12
    const monthlyCola = cola / 100 / 12
    const totalMonths = Math.round((lifeExp - claimAge) * 12)
    for (let month = 0; month < totalMonths; month++) {
      // Each month, benefit increases by COLA, discount by investment return
      const benefitAtMonth = monthlyBenefit * Math.pow(1 + monthlyCola, month)
      const discountedBenefit = benefitAtMonth / Math.pow(1 + monthlyReturn, month)
      pv += discountedBenefit
    }
    return pv
  }

  const calculateBenefits = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const fra = getFullRetirementAge(birthYear)
    const baseBenefit = parseFloat(monthlyBenefitAtFRA)
    const lifeExp = parseFloat(lifeExpectancy)
    const cola = parseFloat(colaRate)
    const investReturn = parseFloat(investmentReturn)

    const calculatedResults = claimingAges.map(age => {
      const adjustmentFactor = getAdjustmentFactor(age, fraObj.decimal)
      const monthlyBenefit = baseBenefit * adjustmentFactor
      // Calculate lifetime benefits (undiscounted)
      const yearsReceiving = lifeExp - age
      let lifetimeBenefits = 0
      for (let year = 0; year < yearsReceiving; year++) {
        const benefitThisYear = monthlyBenefit * 12 * Math.pow(1 + cola/100, year)
        lifetimeBenefits += benefitThisYear
      }
      // Calculate present value
      const presentValue = calculatePresentValue(monthlyBenefit, age, lifeExp, cola, investReturn)
      return {
        claimingAge: age,
        monthlyBenefit,
        lifetimeBenefits,
        presentValue,
        adjustmentFactor
      }
    })

    setResults(calculatedResults)
  }

  // Handle claiming age selection
  const handleClaimingAgeChange = (age: number, checked: boolean) => {
    if (checked) {
      setClaimingAges([...claimingAges, age].sort((a, b) => a - b))
    } else {
      setClaimingAges(claimingAges.filter(a => a !== age))
    }
  }


  const fraObj = getFullRetirementAge(birthYear)
  const fra = fraObj.decimal
  const bestOption = results ? results.reduce((best, current) => 
    current.presentValue > best.presentValue ? current : best
  ) : null

  return (
    <>
      <SEO
        title="Social Security Calculator – Compare Retirement Claiming Ages and Optimize Benefits"
        description="Estimate your Social Security retirement benefits and compare claiming ages (62, full retirement age, 70) to see which strategy maximizes your lifetime income."
        keywords="social security calculator, retirement benefits, claiming age, social security optimization, retirement planning"
        slug="/financial/social-security-calculator"
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
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Social Security Calculator</p>
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
                Financial Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Social Security Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Social Security Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Estimate your Social Security retirement benefits and compare claiming ages (62, full retirement age, 70) to see which strategy maximizes your lifetime income.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>Social Security Inputs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Birth Year</Label>
                        <Input
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          value={birthYear}
                          onChange={handleBirthYearChange}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">
                          Full Retirement Age
                          <span className="ml-2 text-sm text-blue-600 font-normal">
                            (Auto-calculated: {fraObj.years} years{fraObj.months ? `, ${fraObj.months} months` : ""})
                          </span>
                        </Label>
                        <Input
                          value={`${fraObj.years} years${fraObj.months ? ", " + fraObj.months + " months" : ""}`}
                          disabled
                          className="h-12 text-lg border-2 bg-gray-50"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Life Expectancy (Years)</Label>
                        <Input
                          type="number"
                          value={lifeExpectancy}
                          onChange={handleLifeExpectancyChange}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Monthly Benefit at FRA</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={monthlyBenefitAtFRA}
                            onChange={handleMonthlyBenefitChange}
                            className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Claiming Ages */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Claiming Ages to Compare</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[62, 63, 64, 65, 66, 67, 68, 69, 70].map(age => (
                        <div key={age} className="flex items-center space-x-2">
                          <Checkbox
                            id={`age-${age}`}
                            checked={claimingAges.includes(age)}
                            onCheckedChange={(checked) => handleClaimingAgeChange(age, checked as boolean)}
                          />
                          <Label htmlFor={`age-${age}`} className="text-sm font-medium">
                            Age {age}
                            {age === Math.floor(fra) && (
                              <span className="ml-1 text-xs text-blue-600">(FRA)</span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Economic Assumptions */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Economic Assumptions</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Annual COLA (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={colaRate}
                          onChange={handleColaChange}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Investment Return (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={investmentReturn}
                          onChange={handleInvestmentReturnChange}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inflated-dollars"
                        checked={showInflatedDollars}
                        onCheckedChange={(checked) => setShowInflatedDollars(checked as boolean)}
                      />
                      <Label htmlFor="inflated-dollars" className="text-sm font-medium">
                        Show in Future Inflated Dollars (vs Today's Dollars)
                      </Label>
                    </div>
                  </div>

                  <Button
                    onClick={calculateBenefits}
                    disabled={claimingAges.length === 0}
                    className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Benefits
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Benefit Comparison</CardTitle>
                  <CardDescription className="text-base">Compare claiming strategies</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Best Strategy Highlight */}
                      {bestOption && (
                        <div className="bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300 p-6 rounded-2xl text-center">
                          <p className="text-lg mb-2 font-semibold text-green-800">
                            Optimal Strategy:
                          </p>
                          <p className="text-3xl font-bold mb-2 text-green-700">
                            Claim at Age {bestOption.claimingAge}
                          </p>
                          <p className="text-sm text-green-600">
                            Highest present value: ${bestOption.presentValue.toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                      )}

                      {/* Comparison Table */}
                      <div className="space-y-4">
                        <h3 className="font-bold text-lg text-gray-900">Detailed Comparison</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-200 p-3 text-left font-semibold">Claim Age</th>
                                <th className="border border-gray-200 p-3 text-left font-semibold">Monthly Benefit</th>
                                <th className="border border-gray-200 p-3 text-left font-semibold">Lifetime Benefits</th>
                                <th className="border border-gray-200 p-3 text-left font-semibold">Present Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.map((result, index) => (
                                <tr 
                                  key={result.claimingAge}
                                  className={`${
                                    bestOption && result.claimingAge === bestOption.claimingAge
                                      ? 'bg-green-50 border-green-200'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <td className="border border-gray-200 p-3 font-medium">
                                    Age {result.claimingAge}
                                    {bestOption && result.claimingAge === bestOption.claimingAge && (
                                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                        BEST
                                      </span>
                                    )}
                                  </td>
                                  <td className="border border-gray-200 p-3">
                                    ${result.monthlyBenefit.toLocaleString('en-US', {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                    <div className="text-xs text-gray-500">
                                      {((result.adjustmentFactor - 1) * 100).toFixed(1)}% vs FRA
                                    </div>
                                  </td>
                                  <td className="border border-gray-200 p-3">
                                    ${result.lifetimeBenefits.toLocaleString('en-US', {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                  </td>
                                  <td className="border border-gray-200 p-3 font-semibold">
                                    ${result.presentValue.toLocaleString('en-US', {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Key Insights */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">Key Insights:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Present values assume {investmentReturn}% annual investment return</li>
                          <li>• Benefits increase by {colaRate}% annually after claiming</li>
                          <li>• Early claiming reduces benefits permanently</li>
                          <li>• Delayed retirement credits add 8% per year after FRA</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Select claiming ages and calculate to see your results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators 
                calculators={[
                  {
                    calculatorName: "Savings Calculator",
                    calculatorHref: "/financial/savings-calculator",
                    calculatorDescription: "Calculate how your savings grow over time with compound interest and regular contributions."
                  },
                  {
                    calculatorName: "Investment Calculator",
                    calculatorHref: "/financial/investment-calculator",
                    calculatorDescription: "Plan your investment strategy and see how your portfolio can grow over time."
                  },
                  {
                    calculatorName: "Retirement Calculator",
                    calculatorHref: "/financial/retirement-calculator",
                    calculatorDescription: "Calculate how much you need to save for retirement and plan your financial future."
                  }
                ]}
                color="blue"
                title="Related Financial Calculators"
              />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How It Works */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How Social Security Benefits Work</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Primary Insurance Amount (PIA)</h3>
                      <p className="text-gray-700 mb-2">
                        Your PIA is calculated from your Average Indexed Monthly Earnings (AIME) using bend points:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        {"PIA = 0.90 × AIME≤$1,226 + 0.32 × (AIME$1,226-$7,391) + 0.15 × (AIME>$7,391)"}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. Claiming Age Adjustments</h3>
                      <p className="text-gray-700">
                        Benefits are reduced for early claiming (before FRA) and increased for delayed claiming (after FRA up to age 70).
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Present Value Analysis</h3>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        {"PV = Σ [Benefit_t × (1+COLA)^t] / (1+r)^t"}
                      </div>
                      <p className="text-gray-700 mt-2">
                        Where r = investment return rate, accounting for the opportunity cost of claiming later.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                          What is Full Retirement Age (FRA)?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          Full Retirement Age is when you can claim 100% of your Social Security benefit. It ranges from 65 to 67 depending on your birth year. For those born in 1960 or later, FRA is 67.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                          How much do I lose by claiming early at 62?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          Claiming at 62 reduces your benefit by about 25-30% permanently, depending on your FRA. The reduction is 5/9 of 1% for each month before FRA (up to 36 months), then 5/12 of 1% for each additional month.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                          What are delayed retirement credits?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          For each year you delay claiming past FRA (up to age 70), you earn delayed retirement credits worth 8% per year. This means waiting until 70 can increase your benefit by 24-32% compared to claiming at FRA.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                          What is the breakeven age?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          The breakeven age is when the total benefits received from claiming later equals those from claiming earlier. Generally, if you live past your early 80s, delaying benefits pays off in total dollars received.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                          How does COLA affect my benefits?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          Cost-of-Living Adjustments (COLA) are applied annually to protect against inflation. The adjustment applies to your benefit amount at the time of the increase, regardless of when you claimed. Historical COLA averages about 2-3% annually.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Calculator Guide */}
              <CalculatorGuide data={socialSecurityData} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
