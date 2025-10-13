"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, DollarSign, TrendingDown, HelpCircle, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import SimilarCalculators from "@/components/similar-calculators"
import annuityPayoutData from "@/app/content/annuity-payout-calculator.json"

interface PayoutScheduleEntry {
  period: number
  beginningBalance: number
  interestEarned: number
  payment: number
  endingBalance: number
}

export default function AnnuityPayoutCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Input states
  const [startingPrincipal, setStartingPrincipal] = useState("500000")
  const [annualRate, setAnnualRate] = useState("5")
  const [payoutYears, setPayoutYears] = useState("20")
  const [payoutFrequency, setPayoutFrequency] = useState("12")
  const [paymentAmount, setPaymentAmount] = useState("3000")
  const [calculationMode, setCalculationMode] = useState("fixedLength")

  const [results, setResults] = useState<{
    paymentPerPeriod?: number
    totalPayments: number
    totalInterest: number
    durationYears?: number
    durationMonths?: number
    schedule: PayoutScheduleEntry[]
  } | null>(null)

  const getFrequencyLabel = (freq: string) => {
    const labels: { [key: string]: string } = {
      "1": "Annually",
      "2": "Semiannually",
      "4": "Quarterly",
      "12": "Monthly",
      "24": "Semimonthly",
      "26": "Biweekly",
    }
    return labels[freq] || "Monthly"
  }

  const calculatePayout = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const P = Number.parseFloat(startingPrincipal)
    const r_annual = Number.parseFloat(annualRate) / 100
    const m = Number.parseFloat(payoutFrequency)
    const r_p = r_annual / m // periodic rate

    if (calculationMode === "fixedLength") {
      // Mode A: Fixed Length - calculate PMT
      const n = Number.parseFloat(payoutYears)
      const N = n * m // total number of payments

      let PMT: number
      if (r_p === 0) {
        // Special case: no interest
        PMT = P / N
      } else {
        // Standard annuity payout formula
        PMT = (P * r_p) / (1 - Math.pow(1 + r_p, -N))
      }

      const totalPayments = PMT * N
      const totalInterest = totalPayments - P

      // Generate payout schedule
      const schedule: PayoutScheduleEntry[] = []
      let balance = P

      for (let period = 1; period <= N && balance > 0.01; period++) {
        const interestEarned = balance * r_p
        const payment = Math.min(PMT, balance + interestEarned)
        const endingBalance = Math.max(0, balance + interestEarned - payment)

        schedule.push({
          period,
          beginningBalance: balance,
          interestEarned,
          payment,
          endingBalance,
        })

        balance = endingBalance
      }

      setResults({
        paymentPerPeriod: PMT,
        totalPayments,
        totalInterest,
        schedule,
      })
    } else {
      // Mode B: Fixed Payment Amount - calculate duration
      const PMT = Number.parseFloat(paymentAmount)

      if (PMT <= P * r_p) {
        // Payment is too small - fund will never deplete
        setResults({
          totalPayments: 0,
          totalInterest: 0,
          durationYears: 0,
          durationMonths: 0,
          schedule: [],
        })
        return
      }

      let N: number
      if (r_p === 0) {
        // Special case: no interest
        N = P / PMT
      } else {
        // Calculate number of payments until depletion
        N = Math.log(PMT / (PMT - P * r_p)) / Math.log(1 + r_p)
      }

      const durationYears = Math.floor(N / m)
      const durationMonths = Math.round((N / m - durationYears) * 12)
      const totalPayments = PMT * N
      const totalInterest = totalPayments - P

      // Generate payout schedule
      const schedule: PayoutScheduleEntry[] = []
      let balance = P

      for (let period = 1; balance > 0.01; period++) {
        const interestEarned = balance * r_p
        const payment = Math.min(PMT, balance + interestEarned)
        const endingBalance = Math.max(0, balance + interestEarned - payment)

        schedule.push({
          period,
          beginningBalance: balance,
          interestEarned,
          payment,
          endingBalance,
        })

        balance = endingBalance
      }

      setResults({
        totalPayments,
        totalInterest,
        durationYears,
        durationMonths,
        schedule,
      })
    }
  }

  const downloadSchedule = () => {
    if (!results?.schedule.length) return

    const headers = ["Period", "Beginning Balance", "Interest Earned", "Payment", "Ending Balance"]
    const csvContent = [
      headers.join(","),
      ...results.schedule.map((row) =>
        [
          row.period,
          row.beginningBalance.toFixed(2),
          row.interestEarned.toFixed(2),
          row.payment.toFixed(2),
          row.endingBalance.toFixed(2),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "annuity-payout-schedule.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <SEO
        title="Annuity Payout Calculator – Estimate Payments & Fund Duration"
        description="Free Annuity Payout Calculator. Calculate periodic withdrawals, payout duration, total interest earned, and see detailed schedules."
        keywords="annuity payout calculator, annuity payments, retirement calculator, payout schedule, withdrawal calculator"
        slug="/financial/annuity-payout-calculator"
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
                  <p className="text-sm text-gray-500">Annuity Payout Calculator</p>
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
              <span className="text-gray-900 font-medium">Annuity Payout Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Annuity Payout Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate periodic withdrawals from your annuity, determine payout duration, and see detailed
                amortization schedules.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Payout Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Calculation Mode */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-900">Calculation Mode</Label>
                    <Tabs value={calculationMode} onValueChange={setCalculationMode} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="fixedLength">Fixed Length</TabsTrigger>
                        <TabsTrigger value="fixedPayment">Fixed Payment</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <Separator />

                  {/* Basic Inputs */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Annuity Details</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Starting Principal</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={startingPrincipal}
                            onChange={(e) => setStartingPrincipal(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Annual Interest Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={annualRate}
                          onChange={(e) => setAnnualRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Payout Frequency</Label>
                        <Select value={payoutFrequency} onValueChange={setPayoutFrequency}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Annually</SelectItem>
                            <SelectItem value="2">Semiannually</SelectItem>
                            <SelectItem value="4">Quarterly</SelectItem>
                            <SelectItem value="12">Monthly</SelectItem>
                            <SelectItem value="24">Semimonthly</SelectItem>
                            <SelectItem value="26">Biweekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {calculationMode === "fixedLength" ? (
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Years to Payout</Label>
                          <Input
                            type="number"
                            value={payoutYears}
                            onChange={(e) => setPayoutYears(e.target.value)}
                            className="h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Payment Amount</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={calculatePayout}
                    className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Payout
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Payout Results</CardTitle>
                  <CardDescription className="text-base">Your annuity payout breakdown</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Main Result */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        {calculationMode === "fixedLength" ? (
                          <>
                            <p className="text-lg mb-2 font-semibold text-green-800">Your Payment Per Period:</p>
                            <p className="text-4xl font-bold mb-2 text-green-700">
                              $
                              {results.paymentPerPeriod?.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </p>
                            <p className="text-sm text-green-600">
                              {getFrequencyLabel(payoutFrequency)} for {payoutYears} years
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-lg mb-2 font-semibold text-green-800">Your Fund Will Last:</p>
                            <p className="text-4xl font-bold mb-2 text-green-700">
                              {results.durationYears} Years {results.durationMonths} Months
                            </p>
                            <p className="text-sm text-green-600">
                              With ${Number.parseFloat(paymentAmount).toLocaleString()}{" "}
                              {getFrequencyLabel(payoutFrequency).toLowerCase()} payments
                            </p>
                          </>
                        )}
                      </div>

                      {/* Summary Stats */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="font-medium text-gray-700">Starting Principal</span>
                          <span className="font-bold text-blue-600">
                            $
                            {Number.parseFloat(startingPrincipal).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <span className="font-medium text-gray-700">Total Payments</span>
                          <span className="font-bold text-purple-600">
                            $
                            {results.totalPayments.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">Total Interest Earned</span>
                          <span className="font-bold text-orange-600">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Download Schedule */}
                      {results.schedule.length > 0 && (
                        <Button
                          onClick={downloadSchedule}
                          variant="outline"
                          className="w-full h-12 border-2 border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Payout Schedule (CSV)
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <TrendingDown className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your annuity details to see payout results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Payout Schedule Table */}
            {results?.schedule.length && (
              <Card className="shadow-2xl border-0 p-0 bg-white mt-8">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Amortization Schedule</CardTitle>
                  <CardDescription className="text-base">
                    Detailed breakdown of each payment period (showing first 12 periods)
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Period</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                            Beginning Balance
                          </th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Interest Earned</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Payment</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Ending Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {results.schedule.slice(0, 12).map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{row.period}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                              $
                              {row.beginningBalance.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                              $
                              {row.interestEarned.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                              $
                              {row.payment.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 text-right">
                              $
                              {row.endingBalance.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {results.schedule.length > 12 && (
                    <div className="px-6 py-4 bg-gray-50 border-t text-center text-sm text-gray-600">
                      Showing first 12 periods of {results.schedule.length} total periods. Download CSV for complete
                      schedule.
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Similar Calculators Section */}
            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Annuity Calculator",
                  calculatorHref: "/financial/annuity-calculator",
                  calculatorDescription: "Calculate annuity values, payments, and accumulation periods"
                },
                {
                  calculatorName: "Savings Calculator", 
                  calculatorHref: "/financial/savings-calculator",
                  calculatorDescription: "Track savings growth and plan for financial goals over time"
                },
                {
                  calculatorName: "401(k) Calculator Suite",
                  calculatorHref: "/financial/401k-calculator",
                  calculatorDescription: "Comprehensive 401(k) planning with retirement projections and optimization"
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
                  <CardTitle className="text-2xl">Calculation Formula</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Fixed Length Mode</h3>
                      <p className="text-gray-700 mb-2">
                        Calculate payment amount given principal, rate, and duration:
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                        PMT = P × r_p / (1 - (1 + r_p)^(-N))
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Where: P = Principal, r_p = Periodic Rate, N = Total Payments
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Fixed Payment Mode</h3>
                      <p className="text-gray-700 mb-2">
                        Calculate duration given principal, rate, and payment amount:
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                        N = ln(PMT / (PMT - P × r_p)) / ln(1 + r_p)
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Where: PMT = Payment Amount, P = Principal, r_p = Periodic Rate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <CalculatorGuide data={annuityPayoutData} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
