"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, TrendingUp, DollarSign, FileText, HelpCircle, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import SimilarCalculators from "@/components/similar-calculators"
import annuityData from "@/app/content/annuity-calculator.json"

interface AnnuityResults {
  endBalance: number
  totalAdditions: number
  interestEarned: number
  monthlySchedule: Array<{
    month: number
    startingBalance: number
    interestEarned: number
    monthlyAddition: number
    annualAddition: number
    endingBalance: number
  }>
}

export default function AnnuityCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Input states
  const [startingPrincipal, setStartingPrincipal] = useState("10000")
  const [annualAddition, setAnnualAddition] = useState("2000")
  const [monthlyAddition, setMonthlyAddition] = useState("100")
  const [annualGrowthRate, setAnnualGrowthRate] = useState("5")
  const [years, setYears] = useState("10")
  const [isAnnuityDue, setIsAnnuityDue] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)

  const [results, setResults] = useState<AnnuityResults | null>(null)

  // Calculation function based on the provided formulas
  const calculateAnnuity = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const P0 = Number.parseFloat(startingPrincipal) || 0
    const A_annual = Number.parseFloat(annualAddition) || 0
    const A_monthly = Number.parseFloat(monthlyAddition) || 0
    const r = (Number.parseFloat(annualGrowthRate) || 0) / 100
    const n = Number.parseFloat(years) || 0
    const due = isAnnuityDue

    const eps = 1e-12

    // A) Future value of starting principal
    const FV_principal = P0 * Math.pow(1 + r, n)

    // B) Annual additions
    let FV_annual: number
    if (Math.abs(r) < eps) {
      FV_annual = A_annual * n
    } else {
      FV_annual = (A_annual * (Math.pow(1 + r, n) - 1)) / r
      if (due) FV_annual *= 1 + r
    }

    // C) Monthly additions
    const N = Math.round(12 * n)
    const r_m = Math.pow(1 + r, 1 / 12) - 1
    let FV_monthly: number
    if (Math.abs(r_m) < eps) {
      FV_monthly = A_monthly * N
    } else {
      FV_monthly = (A_monthly * (Math.pow(1 + r_m, N) - 1)) / r_m
      if (due) FV_monthly *= 1 + r_m
    }

    // D) Total end balance
    const endBalance = FV_principal + FV_annual + FV_monthly

    // E) Totals & interest earned (competitor style)
    const totalAdditions_competitorStyle = A_annual * n + A_monthly * 12 * n
    const interestEarned = endBalance - P0 - totalAdditions_competitorStyle

    // Generate monthly schedule
    const monthlySchedule: Array<{
      month: number
      startingBalance: number
      interestEarned: number
      monthlyAddition: number
      annualAddition: number
      endingBalance: number
    }> = []

    let balance = P0
    for (let k = 1; k <= N; k++) {
      let startingBalance = balance
      let monthlyAdd = 0
      let annualAdd = 0

      // Handle beginning-of-period deposits (annuity due)
      if (due) {
        monthlyAdd = A_monthly
        startingBalance += monthlyAdd

        // Annual addition at beginning of year (month 1, 13, 25, etc.)
        if ((k - 1) % 12 === 0) {
          annualAdd = A_annual
          startingBalance += annualAdd
        }
      }

      // Calculate interest on starting balance
      const monthlyInterest = startingBalance * r_m

      // Handle end-of-period deposits (ordinary annuity)
      if (!due) {
        monthlyAdd = A_monthly

        // Annual addition at end of year (month 12, 24, 36, etc.)
        if (k % 12 === 0) {
          annualAdd = A_annual
        }
      }

      const endingBalance = startingBalance + monthlyInterest + (due ? 0 : monthlyAdd + annualAdd)

      monthlySchedule.push({
        month: k,
        startingBalance: due ? balance : startingBalance,
        interestEarned: monthlyInterest,
        monthlyAddition: monthlyAdd,
        annualAddition: annualAdd,
        endingBalance,
      })

      balance = endingBalance
    }

    setResults({
      endBalance,
      totalAdditions: totalAdditions_competitorStyle,
      interestEarned,
      monthlySchedule,
    })
  }

  const downloadCSV = () => {
    if (!results) return

    const headers = [
      "Month",
      "Starting Balance",
      "Interest Earned",
      "Monthly Addition",
      "Annual Addition",
      "Ending Balance",
    ]
    const csvContent = [
      headers.join(","),
      ...results.monthlySchedule.map((row) =>
        [
          row.month,
          row.startingBalance.toFixed(2),
          row.interestEarned.toFixed(2),
          row.monthlyAddition.toFixed(2),
          row.annualAddition.toFixed(2),
          row.endingBalance.toFixed(2),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "annuity-schedule.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <SEO
        title="Annuity Calculator — Future Value of Deposits (Annuity Due & Ordinary)"
        description="Calculate the future value of a starting principal plus annual and monthly additions. Supports annuity due (beginning-of-period) or ordinary (end-of-period), monthly schedule, totals, and interest earned."
        keywords="annuity calculator, future value calculator, retirement planning, investment calculator, compound interest"
        slug="/financial/annuity-calculator"
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
                  <p className="text-sm text-gray-500">Annuity Calculator</p>
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
              <span className="text-gray-900 font-medium">Annuity Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Annuity Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate the future value of regular deposits with compound interest. Supports both annuity due and
                ordinary annuity calculations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Calculator Inputs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Starting Principal */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Starting Principal</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">Initial Investment Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={startingPrincipal}
                          onChange={(e) => setStartingPrincipal(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          placeholder="10000"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Additions */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Regular Additions</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Annual Addition</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={annualAddition}
                            onChange={(e) => setAnnualAddition(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            placeholder="2000"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Monthly Addition</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={monthlyAddition}
                            onChange={(e) => setMonthlyAddition(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            placeholder="100"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Annuity Due Toggle */}
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="space-y-1">
                        <Label className="text-base font-semibold text-gray-900">
                          Add at each period's beginning (Annuity Due)
                        </Label>
                        <p className="text-sm text-gray-600">
                          When enabled, deposits are made at the beginning of each period and earn interest immediately.
                        </p>
                      </div>
                      <Switch checked={isAnnuityDue} onCheckedChange={setIsAnnuityDue} className="ml-4" />
                    </div>
                  </div>

                  <Separator />

                  {/* Growth Parameters */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Growth Parameters</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Annual Growth Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={annualGrowthRate}
                          onChange={(e) => setAnnualGrowthRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                          placeholder="5"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">After Years</Label>
                        <Input
                          type="number"
                          value={years}
                          onChange={(e) => setYears(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                          placeholder="10"
                        />
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Monthly deposits use monthly compounding; annual deposits use annual
                        compounding.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={calculateAnnuity}
                    className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Annuity
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Results</CardTitle>
                  <CardDescription className="text-base">End Balance, Total Additions, Interest Earned</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Summary */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">Final Balance After {years} Years:</p>
                        <p className="text-4xl font-bold mb-2 text-green-700">
                          $
                          {results.endBalance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-sm text-green-600">
                          Based on {annualGrowthRate}% annual growth rate with {isAnnuityDue ? "beginning" : "end"}
                          -of-period deposits
                        </p>
                      </div>

                      {/* Breakdown */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="font-medium text-gray-700">Starting Principal</span>
                          <span className="font-bold text-gray-600">
                            $
                            {Number.parseFloat(startingPrincipal || "0").toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="font-medium text-gray-700">Total Additions</span>
                          <span className="font-bold text-blue-600">
                            $
                            {results.totalAdditions.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <span className="font-medium text-gray-700">Interest Earned</span>
                          <span className="font-bold text-purple-600">
                            $
                            {results.interestEarned.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">Interest Percentage</span>
                          <span className="font-bold text-orange-600">
                            {results.totalAdditions > 0
                              ? (
                                  (results.interestEarned /
                                    (Number.parseFloat(startingPrincipal || "0") + results.totalAdditions)) *
                                  100
                                ).toFixed(1)
                              : "0.0"}
                            %
                          </span>
                        </div>
                      </div>

                      {/* Schedule Toggle */}
                      <div className="space-y-4">
                        <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" className="w-full">
                          {showSchedule ? "Hide" : "Show"} Monthly Schedule
                        </Button>

                        {showSchedule && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h3 className="font-bold text-lg text-gray-900">Accumulation Schedule</h3>
                              <Button onClick={downloadCSV} variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                CSV
                              </Button>
                            </div>

                            <div className="max-h-96 overflow-y-auto border rounded-lg">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-50 sticky top-0">
                                  <tr>
                                    <th className="p-2 text-left">Month</th>
                                    <th className="p-2 text-right">Starting</th>
                                    <th className="p-2 text-right">Interest</th>
                                    <th className="p-2 text-right">Monthly Add</th>
                                    <th className="p-2 text-right">Annual Add</th>
                                    <th className="p-2 text-right">Ending</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {results.monthlySchedule.map((row) => (
                                    <tr key={row.month} className="border-t">
                                      <td className="p-2">{row.month}</td>
                                      <td className="p-2 text-right">${row.startingBalance.toFixed(0)}</td>
                                      <td className="p-2 text-right">${row.interestEarned.toFixed(0)}</td>
                                      <td className="p-2 text-right">${row.monthlyAddition.toFixed(0)}</td>
                                      <td className="p-2 text-right">${row.annualAddition.toFixed(0)}</td>
                                      <td className="p-2 text-right font-medium">${row.endingBalance.toFixed(0)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your annuity information to see your results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Finance Calculator",
                  calculatorHref: "/financial/finance-calculator",
                  calculatorDescription: "Calculate time value of money for investment and loan scenarios"
                },
                {
                  calculatorName: "Credit Card Payoff Calculator", 
                  calculatorHref: "/financial/credit-card-payoff-calculator",
                  calculatorDescription: "Create optimal debt payoff strategy using avalanche method"
                },
                {
                  calculatorName: "Annuity Payout Calculator",
                  calculatorHref: "/financial/annuity-payout-calculator",
                  calculatorDescription: "Calculate periodic withdrawals and payout duration from annuities"
                }
              ]}
              color="green"
              title="Related Financial Calculators"
            />

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Formulas & Notes</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Future Value of Starting Principal</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">FV_principal = P₀ × (1 + r)ⁿ</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Annual Additions (Ordinary)</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        FV_annual = A_annual × [(1 + r)ⁿ - 1] / r
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Annual Additions (Annuity Due)</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        FV_annual_due = FV_annual × (1 + r)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Monthly Additions</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        r_m = (1 + r)^(1/12) - 1<br />
                        FV_monthly = A_monthly × [(1 + r_m)^N - 1] / r_m
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              <CalculatorGuide data={annuityData} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
