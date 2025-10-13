"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, DollarSign, Clock, HelpCircle } from "lucide-react"
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
import SimilarCalculators from "@/components/similar-calculators"
import salaryCalculator from "@/app/content/salary-calculator.json"

type PayFrequency = "hourly" | "daily" | "weekly" | "biweekly" | "semimonthly" | "monthly" | "quarterly" | "yearly"

interface SalaryResults {
  unadjustedAnnual: number
  adjustedAnnual: number
  conversions: {
    hourly: { unadjusted: number; adjusted: number }
    daily: { unadjusted: number; adjusted: number }
    weekly: { unadjusted: number; adjusted: number }
    biweekly: { unadjusted: number; adjusted: number }
    semimonthly: { unadjusted: number; adjusted: number }
    monthly: { unadjusted: number; adjusted: number }
    quarterly: { unadjusted: number; adjusted: number }
    yearly: { unadjusted: number; adjusted: number }
  }
  workingDaysAdjusted: number
}

export default function SalaryCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Input states
  const [salaryAmount, setSalaryAmount] = useState("50000")
  const [frequency, setFrequency] = useState<PayFrequency>("yearly")
  const [hoursPerWeek, setHoursPerWeek] = useState("40")
  const [daysPerWeek, setDaysPerWeek] = useState("5")
  const [holidaysPerYear, setHolidaysPerYear] = useState("10")
  const [vacationDays, setVacationDays] = useState("15")

  const [results, setResults] = useState<SalaryResults | null>(null)

  const calculateSalary = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const rate = Number.parseFloat(salaryAmount)
    const hrsPerWeek = Number.parseFloat(hoursPerWeek)
    const daysPerWeekNum = Number.parseFloat(daysPerWeek)
    const holidays = Number.parseFloat(holidaysPerYear)
    const vacation = Number.parseFloat(vacationDays)

    // Constants
    const daysInYear = 260 // 52 weeks × 5 days
    const workingDaysAdjusted = daysInYear - (holidays + vacation)

    // Step 1: Calculate Annual Unadjusted Salary
    let unadjustedAnnual: number
    switch (frequency) {
      case "hourly":
        unadjustedAnnual = rate * hrsPerWeek * 52
        break
      case "daily":
        unadjustedAnnual = rate * daysInYear
        break
      case "weekly":
        unadjustedAnnual = rate * 52
        break
      case "biweekly":
        unadjustedAnnual = rate * 26
        break
      case "semimonthly":
        unadjustedAnnual = rate * 24
        break
      case "monthly":
        unadjustedAnnual = rate * 12
        break
      case "quarterly":
        unadjustedAnnual = rate * 4
        break
      case "yearly":
        unadjustedAnnual = rate
        break
      default:
        unadjustedAnnual = rate
    }

    // Step 2: Calculate Annual Adjusted Salary
    const adjustedAnnual = unadjustedAnnual * (workingDaysAdjusted / daysInYear)

    // Step 3: Convert to Other Frequencies
    const conversions = {
      hourly: {
        unadjusted: unadjustedAnnual / (daysPerWeekNum * hrsPerWeek * 52),
        adjusted: adjustedAnnual / (daysPerWeekNum * hrsPerWeek * 52),
      },
      daily: {
        unadjusted: unadjustedAnnual / daysInYear,
        adjusted: adjustedAnnual / workingDaysAdjusted,
      },
      weekly: {
        unadjusted: unadjustedAnnual / 52,
        adjusted: adjustedAnnual / 52,
      },
      biweekly: {
        unadjusted: unadjustedAnnual / 26,
        adjusted: adjustedAnnual / 26,
      },
      semimonthly: {
        unadjusted: unadjustedAnnual / 24,
        adjusted: adjustedAnnual / 24,
      },
      monthly: {
        unadjusted: unadjustedAnnual / 12,
        adjusted: adjustedAnnual / 12,
      },
      quarterly: {
        unadjusted: unadjustedAnnual / 4,
        adjusted: adjustedAnnual / 4,
      },
      yearly: {
        unadjusted: unadjustedAnnual,
        adjusted: adjustedAnnual,
      },
    }

    setResults({
      unadjustedAnnual,
      adjustedAnnual,
      conversions,
      workingDaysAdjusted,
    })
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const getFrequencyLabel = (freq: string) => {
    const labels: Record<string, string> = {
      hourly: "Hourly",
      daily: "Daily",
      weekly: "Weekly",
      biweekly: "Bi-weekly",
      semimonthly: "Semi-monthly",
      monthly: "Monthly",
      quarterly: "Quarterly",
      yearly: "Yearly",
    }
    return labels[freq] || freq
  }

  return (
    <>
      <SEO
        title="Salary Calculator – Convert Hourly, Weekly, Monthly & Annual Pay"
        description="Free salary calculator to convert between hourly, daily, weekly, monthly, and annual pay rates. Calculate adjusted salary with holidays and vacation days."
        keywords="salary calculator, hourly to annual, pay converter, wage calculator, salary conversion, annual salary calculator"
        slug="/salary-calculator"
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
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Salary Calculator</p>
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
              <span className="text-gray-900 font-medium">Salary Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Salary Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Convert between hourly, daily, weekly, monthly, and annual salary with adjustments for holidays and
                vacation days.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>Salary Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Salary Input */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Salary Information</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Salary Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={salaryAmount}
                            onChange={(e) => setSalaryAmount(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            placeholder="50000"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Pay Frequency</Label>
                        <Select value={frequency} onValueChange={(value: PayFrequency) => setFrequency(value)}>
                          <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                            <SelectItem value="semimonthly">Semi-monthly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Work Schedule */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Work Schedule</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(frequency === "hourly" || frequency === "daily") && (
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Hours per Week</Label>
                          <Input
                            type="number"
                            value={hoursPerWeek}
                            onChange={(e) => setHoursPerWeek(e.target.value)}
                            className="h-12 text-lg border-2 focus:border-blue-500"
                            placeholder="40"
                          />
                        </div>
                      )}

                      {frequency === "daily" && (
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Days per Week</Label>
                          <Input
                            type="number"
                            value={daysPerWeek}
                            onChange={(e) => setDaysPerWeek(e.target.value)}
                            className="h-12 text-lg border-2 focus:border-blue-500"
                            placeholder="5"
                          />
                        </div>
                      )}

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Holidays per Year</Label>
                        <Input
                          type="number"
                          value={holidaysPerYear}
                          onChange={(e) => setHolidaysPerYear(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="10"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Vacation Days per Year</Label>
                        <Input
                          type="number"
                          value={vacationDays}
                          onChange={(e) => setVacationDays(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="15"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={calculateSalary}
                    className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Salary
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Salary Results</CardTitle>
                  <CardDescription className="text-base">Your salary breakdown and conversions</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Annual Salary Comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300">
                          <p className="text-lg mb-2 font-semibold text-blue-800">Unadjusted Annual</p>
                          <p className="text-3xl font-bold text-blue-700">{formatCurrency(results.unadjustedAnnual)}</p>
                          <p className="text-sm text-blue-600 mt-1">260 working days</p>
                        </div>
                        <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                          <p className="text-lg mb-2 font-semibold text-green-800">Adjusted Annual</p>
                          <p className="text-3xl font-bold text-green-700">{formatCurrency(results.adjustedAnnual)}</p>
                          <p className="text-sm text-green-600 mt-1">{results.workingDaysAdjusted} working days</p>
                        </div>
                      </div>

                      {/* Conversion Table */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">Pay Period Conversions</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b-2 border-gray-200">
                                <th className="text-left py-2 font-semibold text-gray-900">Period</th>
                                <th className="text-right py-2 font-semibold text-blue-600">Unadjusted</th>
                                <th className="text-right py-2 font-semibold text-green-600">Adjusted</th>
                              </tr>
                            </thead>
                            <tbody className="space-y-1">
                              {Object.entries(results.conversions).map(([period, values]) => (
                                <tr key={period} className="border-b border-gray-100">
                                  <td className="py-3 font-medium text-gray-700">{getFrequencyLabel(period)}</td>
                                  <td className="py-3 text-right text-blue-600 font-semibold">
                                    {formatCurrency(values.unadjusted)}
                                  </td>
                                  <td className="py-3 text-right text-green-600 font-semibold">
                                    {formatCurrency(values.adjusted)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Assumptions */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Assumptions Used:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 52 working weeks per year</li>
                          <li>• 5 working days per week = 260 total days</li>
                          <li>
                            • Holidays + vacation days:{" "}
                            {Number.parseFloat(holidaysPerYear) + Number.parseFloat(vacationDays)} days
                          </li>
                          <li>• Adjusted calculation removes non-working days</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your salary information to see conversions</p>
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
                    calculatorName: "Investment Calculator",
                    calculatorHref: "/financial/investment-calculator",
                    calculatorDescription: "Plan your investment strategy and see how your portfolio can grow over time."
                  },
                  {
                    calculatorName: "Time Value of Money Calculator",
                    calculatorHref: "/financial/finance-calculator",
                    calculatorDescription: "Calculate present and future values, analyze investment returns, and make informed financial decisions."
                  },
                  {
                    calculatorName: "Savings Calculator",
                    calculatorHref: "/financial/savings-calculator",
                    calculatorDescription: "Calculate how your savings grow over time with compound interest and regular contributions."
                  }
                ]}
                color="blue"
                title="Related Financial Calculators"
              />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">

              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Formulas & Logic</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Annual Salary Conversion</h3>
                      <ul className="text-gray-700 space-y-1 ml-4">
                        <li>
                          • <strong>Hourly:</strong> Rate × Hours/Week × 52 weeks
                        </li>
                        <li>
                          • <strong>Daily:</strong> Rate × 260 days
                        </li>
                        <li>
                          • <strong>Weekly:</strong> Rate × 52 weeks
                        </li>
                        <li>
                          • <strong>Bi-weekly:</strong> Rate × 26 periods
                        </li>
                        <li>
                          • <strong>Semi-monthly:</strong> Rate × 24 periods
                        </li>
                        <li>
                          • <strong>Monthly:</strong> Rate × 12 months
                        </li>
                        <li>
                          • <strong>Quarterly:</strong> Rate × 4 quarters
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Adjusted Salary</h3>
                      <p className="text-gray-700">
                        Adjusted Annual = Unadjusted Annual × (Working Days After Time Off ÷ 260)
                      </p>
                      <p className="text-gray-700 mt-2">Working Days = 260 - (Holidays + Vacation Days)</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Example Calculation</h3>
                      <p className="text-gray-700">If rate = $25/hour, 40 hours/week, 25 days off:</p>
                      <ul className="text-gray-700 space-y-1 ml-4 mt-2">
                        <li>• Unadjusted Annual = $25 × 40 × 52 = $52,000</li>
                        <li>• Working Days = 260 - 25 = 235 days</li>
                        <li>• Adjusted Annual = $52,000 × (235 ÷ 260) = $47,000</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              <CalculatorGuide data={salaryCalculator}/>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
