"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, PiggyBank, DollarSign, TrendingUp, FileText, HelpCircle } from 'lucide-react'
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
import savingsData from "@/app/content/savings-calculator.json"

interface YearlyBreakdown {
  year: number
  startingBalance: number
  annualContribution: number
  monthlyContributions: number
  interestEarned: number
  endingBalance: number
}

export default function SavingsCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Input states
  const [initialDeposit, setInitialDeposit] = useState("10000")
  const [annualContribution, setAnnualContribution] = useState("5000")
  const [annualIncreaseRate, setAnnualIncreaseRate] = useState("3")
  const [monthlyContribution, setMonthlyContribution] = useState("500")
  const [monthlyIncreaseRate, setMonthlyIncreaseRate] = useState("3")
  const [annualInterestRate, setAnnualInterestRate] = useState("7")
  const [yearsToSave, setYearsToSave] = useState("20")
  const [compoundingFrequency, setCompoundingFrequency] = useState("12")
  const [taxRate, setTaxRate] = useState("0")
  const [inflationRate, setInflationRate] = useState("2.5")

  const [results, setResults] = useState<{
    finalBalance: number
    totalContributions: number
    interestEarned: number
    finalBalanceAfterTax: number
    realFinalBalance: number
    yearlyBreakdown: YearlyBreakdown[]
  } | null>(null)

  const calculateSavings = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const P0 = Number.parseFloat(initialDeposit) || 0
    const Cannual = Number.parseFloat(annualContribution) || 0
    const iannualC = Number.parseFloat(annualIncreaseRate) / 100 || 0
    const Cmonthly = Number.parseFloat(monthlyContribution) || 0
    const imonthlyC = Number.parseFloat(monthlyIncreaseRate) / 100 || 0
    const r = Number.parseFloat(annualInterestRate) / 100 || 0
    const n = Number.parseFloat(yearsToSave) || 0
    const m = Number.parseFloat(compoundingFrequency) || 12
    const t = Number.parseFloat(taxRate) / 100 || 0
    const f = Number.parseFloat(inflationRate) / 100 || 0

    // Adjust interest rate for taxes
    const rnet = r * (1 - t)
    const rperiod = rnet / m

    let totalBalance = P0
    let totalContributions = P0
    const yearlyBreakdown: YearlyBreakdown[] = []

    // Calculate year by year for detailed breakdown
    for (let year = 1; year <= n; year++) {
      const startingBalance = totalBalance

      // Annual contribution for this year (with growth)
      const currentAnnualContrib = Cannual * Math.pow(1 + iannualC, year - 1)
      
      // Monthly contribution for this year (with growth)
      const currentMonthlyContrib = Cmonthly * Math.pow(1 + imonthlyC, year - 1)

      // Add annual contribution at beginning of year
      totalBalance += currentAnnualContrib
      totalContributions += currentAnnualContrib

      let yearInterest = 0
      let monthlyContribTotal = 0

      // Calculate monthly compounding with monthly contributions
      for (let month = 1; month <= m; month++) {
        // Add monthly contribution
        totalBalance += currentMonthlyContrib
        totalContributions += currentMonthlyContrib
        monthlyContribTotal += currentMonthlyContrib

        // Apply interest for this period
        const periodInterest = totalBalance * rperiod
        totalBalance += periodInterest
        yearInterest += periodInterest
      }

      yearlyBreakdown.push({
        year,
        startingBalance,
        annualContribution: currentAnnualContrib,
        monthlyContributions: monthlyContribTotal,
        interestEarned: yearInterest,
        endingBalance: totalBalance
      })
    }

    const finalBalance = totalBalance
    const interestEarned = finalBalance - totalContributions

    // Calculate after-tax balance (tax on interest only)
    const finalBalanceAfterTax = totalContributions + (interestEarned * (1 - t))

    // Calculate real value after inflation
    const realFinalBalance = finalBalance / Math.pow(1 + f, n)

    setResults({
      finalBalance,
      totalContributions,
      interestEarned,
      finalBalanceAfterTax,
      realFinalBalance,
      yearlyBreakdown
    })
  }

  const getCompoundingText = (freq: string) => {
    const frequencies: { [key: string]: string } = {
      "1": "Annually",
      "2": "Semi-annually", 
      "4": "Quarterly",
      "12": "Monthly",
      "26": "Biweekly",
      "52": "Weekly",
      "365": "Daily"
    }
    return frequencies[freq] || "Monthly"
  }

  return (
    <>
      <SEO
        title="Savings Calculator – Compound Interest & Growth Calculator"
        description="Calculate how your savings will grow over time with compound interest, regular contributions, and inflation adjustments. Free savings growth calculator."
        keywords="savings calculator, compound interest calculator, savings growth, investment calculator, retirement savings"
        slug="/financial/savings-calculator"
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
                  <p className="text-sm text-gray-500">Savings Calculator</p>
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
              <span className="text-gray-900 font-medium">Savings Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <PiggyBank className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Savings Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Estimate how your savings will grow over time with contributions, compounding interest, inflation, and taxes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Savings Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Initial Investment */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Initial Investment</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">Initial Deposit / Starting Balance</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={initialDeposit}
                          onChange={(e) => setInitialDeposit(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contributions */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Regular Contributions</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Annual Contribution</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={annualContribution}
                            onChange={(e) => setAnnualContribution(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Annual Increase Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={annualIncreaseRate}
                          onChange={(e) => setAnnualIncreaseRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Monthly Contribution</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Monthly Increase Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={monthlyIncreaseRate}
                          onChange={(e) => setMonthlyIncreaseRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Investment Parameters */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Investment Parameters</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Annual Interest Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={annualInterestRate}
                          onChange={(e) => setAnnualInterestRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Number of Years</Label>
                        <Input
                          type="number"
                          value={yearsToSave}
                          onChange={(e) => setYearsToSave(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Compounding Frequency</Label>
                        <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Annually</SelectItem>
                            <SelectItem value="2">Semi-annually</SelectItem>
                            <SelectItem value="4">Quarterly</SelectItem>
                            <SelectItem value="12">Monthly</SelectItem>
                            <SelectItem value="26">Biweekly</SelectItem>
                            <SelectItem value="52">Weekly</SelectItem>
                            <SelectItem value="365">Daily</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Tax Rate on Interest (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={taxRate}
                          onChange={(e) => setTaxRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-base font-semibold text-gray-900">Inflation Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={calculateSavings}
                    className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Savings Growth
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Savings Results</CardTitle>
                  <CardDescription className="text-base">Your savings growth projection</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Final Balance */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">Final Balance:</p>
                        <p className="text-4xl font-bold mb-2 text-green-700">
                          ${results.finalBalance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-sm text-green-600">
                          Compounding {getCompoundingText(compoundingFrequency)} for {yearsToSave} years
                        </p>
                      </div>

                      {/* Summary */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="font-medium text-gray-700">Total Contributions</span>
                          <span className="font-bold text-blue-600">
                            ${results.totalContributions.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <span className="font-medium text-gray-700">Interest Earned</span>
                          <span className="font-bold text-purple-600">
                            ${results.interestEarned.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        {Number.parseFloat(taxRate) > 0 && (
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">After-Tax Balance</span>
                            <span className="font-bold text-orange-600">
                              ${results.finalBalanceAfterTax.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        )}
                        {Number.parseFloat(inflationRate) > 0 && (
                          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <span className="font-medium text-gray-700">Real Value (Inflation-Adjusted)</span>
                            <span className="font-bold text-yellow-600">
                              ${results.realFinalBalance.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Yearly Breakdown */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">Yearly Breakdown</h3>
                        <div className="max-h-64 overflow-y-auto border rounded-lg">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th className="p-2 text-left">Year</th>
                                <th className="p-2 text-right">Contributions</th>
                                <th className="p-2 text-right">Interest</th>
                                <th className="p-2 text-right">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.yearlyBreakdown.map((year) => (
                                <tr key={year.year} className="border-t">
                                  <td className="p-2 font-medium">{year.year}</td>
                                  <td className="p-2 text-right">
                                    ${(year.annualContribution + year.monthlyContributions).toLocaleString("en-US", {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                  </td>
                                  <td className="p-2 text-right">
                                    ${year.interestEarned.toLocaleString("en-US", {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                  </td>
                                  <td className="p-2 text-right font-medium">
                                    ${year.endingBalance.toLocaleString("en-US", {
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
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <PiggyBank className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your savings information to see your growth projection</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Formulas */}
              <Card className="shadow-2xl p-0 border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Formulas & Calculation Details</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Periodic Interest Rate</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        r_period = (annual_rate × (1 - tax_rate)) / compounding_frequency
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. Annual Contributions (with growth)</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        Annual_k = Annual_base × (1 + annual_increase_rate)^(k-1)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Monthly Contributions (with growth)</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        Monthly_k = Monthly_base × (1 + monthly_increase_rate)^(k-1)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">4. Final Balance</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        Balance = Initial × (1 + r_period)^(periods) + Accumulated_Contributions
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">5. Real Value (Inflation-Adjusted)</h3>
                      <p className="text-gray-700 font-mono bg-gray-50 p-2 rounded">
                        Real_Value = Final_Balance / (1 + inflation_rate)^years
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              <CalculatorGuide data={savingsData} />

            </div>
          </div>
        </main>
      </div>
    </>
  )
}
