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

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [time, setTime] = useState("")
  const [compound, setCompound] = useState("12")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [results, setResults] = useState<{
    finalAmount: number
    totalInterest: number
    totalContributions: number
  } | null>(null)

  const calculateCompoundInterest = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(rate) / 100
    const t = Number.parseFloat(time)
    const n = Number.parseFloat(compound)
    const pmt = Number.parseFloat(monthlyContribution || "0")

    if (p <= 0 || r <= 0 || t <= 0 || n <= 0) return

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const compoundAmount = p * Math.pow(1 + r / n, n * t)

    // Future value of annuity for monthly contributions
    const monthlyRate = r / 12
    const months = t * 12
    let annuityAmount = 0

    if (pmt > 0 && monthlyRate > 0) {
      annuityAmount = pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    } else if (pmt > 0) {
      annuityAmount = pmt * months
    }

    const finalAmount = compoundAmount + annuityAmount
    const totalContributions = p + pmt * months
    const totalInterest = finalAmount - totalContributions

    setResults({
      finalAmount,
      totalInterest,
      totalContributions,
    })
  }

  return (
    <>
      <Head>
        <title>Compound Interest Calculator - Calculate Investment Growth | Smart Calculator</title>
        <meta
          name="description"
          content="Free compound interest calculator to calculate investment growth over time with regular contributions. See how your money grows with compound interest."
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
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
                  <p className="text-sm text-gray-500">Compound Interest Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/category/financial" className="text-gray-500 hover:text-blue-600">
                Financial
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Compound Interest Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Compound Interest Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate how your investments grow over time with compound interest and regular contributions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Form */}
              <Card className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>Investment Details</span>
                  </CardTitle>
                  <CardDescription className="text-base">Enter your investment information</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="principal" className="flex items-center space-x-2 text-base font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>Initial Investment</span>
                    </Label>
                    <Input
                      id="principal"
                      type="number"
                      placeholder="10000"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="monthlyContribution"
                      className="flex items-center space-x-2 text-base font-semibold"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Monthly Contribution</span>
                    </Label>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      placeholder="500"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="rate" className="flex items-center space-x-2 text-base font-semibold">
                      <Percent className="w-4 h-4" />
                      <span>Annual Interest Rate (%)</span>
                    </Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.01"
                      placeholder="7"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="time" className="flex items-center space-x-2 text-base font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>Investment Period (years)</span>
                    </Label>
                    <Input
                      id="time"
                      type="number"
                      placeholder="10"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="compound" className="text-base font-semibold">
                      Compound Frequency
                    </Label>
                    <Select value={compound} onValueChange={setCompound}>
                      <SelectTrigger className="h-12">
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

                  <Button
                    onClick={calculateCompoundInterest}
                    className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
                  >
                    Calculate Growth
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-2xl">Investment Growth</CardTitle>
                  <CardDescription className="text-base">Your investment projection</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {results ? (
                    <div className="space-y-8">
                      <div className="text-center p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
                        <p className="text-lg text-gray-600 mb-3">Final Amount</p>
                        <p className="text-5xl font-bold text-green-600 mb-4">
                          $
                          {results.finalAmount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="text-center p-6 bg-blue-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">Total Interest Earned</p>
                          <p className="text-2xl font-bold text-blue-600">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">Total Contributions</p>
                          <p className="text-2xl font-bold text-gray-900">
                            $
                            {results.totalContributions.toLocaleString("en-US", {
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
                      <p className="text-lg">Enter investment details to see growth projection</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
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
