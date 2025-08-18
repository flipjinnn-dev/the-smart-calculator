"use client"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Calculator, DollarSign, Percent, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"

export default function InterestCalculator() {
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

  const calculateInterest = () => {
    const P = parseFloat(initialInvestment) || 0
    const annualCont = parseFloat(annualContribution) || 0
    const monthlyCont = parseFloat(monthlyContribution) || 0
    const r = (parseFloat(interestRate) || 0) / 100
    const n = parseInt(compound)
    const t = (parseInt(years) || 0) + ((parseInt(months) || 0) / 12)
    const tax = (parseFloat(taxRate) || 0) / 100
    const inflation = (parseFloat(inflationRate) || 0) / 100
    if (P < 0 || r < 0 || n <= 0 || t <= 0) return

    // Calculate total contributions
    const totalAnnualCont = annualCont * t
    const totalMonthlyCont = monthlyCont * t * 12
    const totalContributions = P + totalAnnualCont + totalMonthlyCont

    // Calculate future value
    let FV = P * Math.pow(1 + r / n, n * t)
    // Add annual contributions
    if (annualCont > 0) {
      const factor = contributionTiming === "beginning" ? (1 + r / n) : 1
      FV += annualCont * factor * (Math.pow(1 + r / n, n * t) - 1) / (r / n)
    }
    // Add monthly contributions
    if (monthlyCont > 0) {
      const m = 12
      const monthlyRate = r / m
      const monthsTotal = t * 12
      const factor = contributionTiming === "beginning" ? (1 + monthlyRate) : 1
      FV += monthlyCont * factor * (Math.pow(1 + monthlyRate, monthsTotal) - 1) / monthlyRate
    }

    // Interest earned
    const totalInterest = FV - totalContributions
    // Interest of initial investment
    const interestInitial = P * (Math.pow(1 + r / n, n * t) - 1)
    // Interest of contributions
    const interestContributions = totalInterest - interestInitial
    // After-tax
    const afterTax = FV - (totalInterest * tax)
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
  }

  return (
    <>
      <Head>
        <title>Interest Calculator - Smart Calculator</title>
        <meta name="description" content="Calculate interest, contributions, and future value of your investments with our Interest Calculator." />
      </Head>
      <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Smart Calculator</Link>
                  <p className="text-sm text-gray-500">Interest Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <nav className="bg-gray-50 border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/category/financial" className="text-gray-500 hover:text-blue-600">Financial</Link>
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
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Calculate your investment growth, interest, and buying power after inflation.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-md border-0 min-h-0 pt-0">
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
                      <Input id="initialInvestment" type="number" placeholder="20000" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} className="h-10 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="annualContribution" className="flex items-center space-x-2 text-sm font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span>Annual contribution</span>
                      </Label>
                      <Input id="annualContribution" type="number" placeholder="5000" value={annualContribution} onChange={e => setAnnualContribution(e.target.value)} className="h-10 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyContribution" className="flex items-center space-x-2 text-sm font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span>Monthly contribution</span>
                      </Label>
                      <Input id="monthlyContribution" type="number" placeholder="0" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="h-10 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contributionTiming" className="text-sm font-semibold">Contribute at the</Label>
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
                      <Input id="interestRate" type="number" step="0.01" placeholder="5" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="h-10 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compound" className="text-sm font-semibold">Compound</Label>
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
                      <Input id="years" type="number" placeholder="5" value={years} onChange={e => setYears(e.target.value)} className="h-10 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="months" className="flex items-center space-x-2 text-sm font-semibold">
                        <Calendar className="w-4 h-4" />
                        <span>Months</span>
                      </Label>
                      <Input id="months" type="number" placeholder="0" value={months} onChange={e => setMonths(e.target.value)} className="h-10 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRate" className="flex items-center space-x-2 text-sm font-semibold">
                        <Percent className="w-4 h-4" />
                        <span>Tax rate (%)</span>
                      </Label>
                      <Input id="taxRate" type="number" step="0.01" placeholder="0" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="h-10 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inflationRate" className="flex items-center space-x-2 text-sm font-semibold">
                        <Percent className="w-4 h-4" />
                        <span>Inflation rate (%)</span>
                      </Label>
                      <Input id="inflationRate" type="number" step="0.01" placeholder="3" value={inflationRate} onChange={e => setInflationRate(e.target.value)} className="h-10 text-base" />
                    </div>
                  </div>
                  <Button onClick={calculateInterest} className="w-full h-10 text-base bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow mt-4">Calculate</Button>
                </CardContent>
              </Card>
              <Card className="shadow-md border-0 min-h-0 pt-0">
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
                          ${results.endingBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Total principal</p>
                          <p className="text-lg font-bold text-blue-600">
                            ${results.totalPrincipal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Total contributions</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${results.totalContributions.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Total interest</p>
                          <p className="text-lg font-bold text-green-700">
                            ${results.totalInterest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Interest of initial investment</p>
                          <p className="text-lg font-bold text-yellow-600">
                            ${results.interestInitial.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Interest of the contributions</p>
                          <p className="text-lg font-bold text-purple-700">
                            ${results.interestContributions.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-pink-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Buying power after inflation</p>
                          <p className="text-lg font-bold text-pink-700">
                            ${results.afterInflation.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
          {/* How to Use Section */}
            <div className="max-w-6xl mx-auto mt-10">
              <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-green-50  p-8 shadow flex flex-col items-left">
                <h2 className="text-2xl font-bold text-green-700 mb-2 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-green-500" /> How to Use This Calculator
                </h2>
                <ol className="list-decimal list-inside text-gray-700 text-base space-y-2 mb-2">
                  <li>Enter your <span className="font-semibold text-green-700">Initial investment</span> amount.</li>
                  <li>Fill in your <span className="font-semibold text-green-700">Annual</span> and/or <span className="font-semibold text-green-700">Monthly contribution</span>.</li>
                  <li>Select whether you contribute at the <span className="font-semibold text-green-700">beginning</span> or <span className="font-semibold text-green-700">end</span> of each period.</li>
                  <li>Set your <span className="font-semibold text-green-700">Interest rate</span> and <span className="font-semibold text-green-700">Compounding frequency</span>.</li>
                  <li>Enter the <span className="font-semibold text-green-700">Investment length</span> in years and months.</li>
                  <li>Optionally, add <span className="font-semibold text-green-700">Tax</span> and <span className="font-semibold text-green-700">Inflation</span> rates for more accurate results.</li>
                  <li>Click <span className="font-semibold text-green-700">Calculate</span> to see your investment summary!</li>
                </ol>
                <p className="text-sm text-gray-500 mt-2 text-center">This tool helps you estimate your investment growth, total interest, and buying power after inflation. Adjust the values to plan your financial future smartly!</p>
              </div>
            </div>
        </main>
        <footer className="bg-gray-900 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Logo />
                <span className="text-2xl font-bold">Smart Calculator</span>
              </div>
              <p className="text-gray-400">&copy; 2024 Smart Calculator. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
