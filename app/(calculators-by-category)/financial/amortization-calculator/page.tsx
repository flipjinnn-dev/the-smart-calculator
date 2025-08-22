"use client"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Calculator, DollarSign, Percent, Calendar, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"

interface AmortizationRow {
  payment: number
  principal: number
  interest: number
  balance: number
}

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState("200000")
  const [interestRate, setInterestRate] = useState("6.5")
  const [loanTerm, setLoanTerm] = useState("30")
  const [startDate, setStartDate] = useState("2025-01-01")
  const [results, setResults] = useState<{
    monthlyPayment: number
    totalInterest: number
    totalPayment: number
    schedule: AmortizationRow[]
  } | null>(null)

  const calculateAmortization = () => {
    const principal = Number.parseFloat(loanAmount)
    const monthlyRate = Number.parseFloat(interestRate) / 100 / 12
    const numberOfPayments = Number.parseFloat(loanTerm) * 12

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) return

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const schedule: AmortizationRow[] = []
    let remainingBalance = principal

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance -= principalPayment

      schedule.push({
        payment: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance),
      })
    }

    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - principal

    setResults({
      monthlyPayment,
      totalInterest,
      totalPayment,
      schedule,
    })
  }

  return (
    <>
      <Head>
        <title>Amortization Calculator - Loan Payment Schedule | Smart Calculator</title>
        <meta
          name="description"
          content="Free amortization calculator to create detailed loan payment schedules showing principal and interest breakdown for each payment."
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Amortization Calculator</p>
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
              <Link href="/financial" className="text-gray-500 hover:text-blue-600">
                Financial
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Amortization Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Amortization Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Generate a detailed amortization schedule showing how each payment is split between principal and
                interest.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r py-6 from-indigo-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    <span>Loan Details</span>
                  </CardTitle>
                  <CardDescription className="text-sm">Enter loan information to generate schedule</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount" className="flex items-center space-x-2 text-sm font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>Loan Amount</span>
                    </Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="200000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate" className="flex items-center space-x-2 text-sm font-semibold">
                      <Percent className="w-4 h-4" />
                      <span>Interest Rate (%)</span>
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      placeholder="6.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanTerm" className="flex items-center space-x-2 text-sm font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>Loan Term</span>
                    </Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger className="h-10">
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

                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-semibold">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="h-10"
                    />
                  </div>

                  <Button
                    onClick={calculateAmortization}
                    className="w-full h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg"
                  >
                    Generate Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Results Summary */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r py-6 from-green-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="text-xl">Loan Summary</CardTitle>
                  <CardDescription className="text-sm">Payment overview</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl">
                        <p className="text-sm text-gray-600 mb-2">Monthly Payment</p>
                        <p className="text-3xl font-bold text-indigo-600">
                          $
                          {results.monthlyPayment.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                          <p className="text-lg font-bold text-green-600">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Total Payment</p>
                          <p className="text-lg font-bold text-blue-600">
                            $
                            {results.totalPayment.toLocaleString("en-US", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Enter loan details to see summary</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Amortization Schedule */}
              <Card className="shadow-xl border-0 lg:col-span-1">
                <CardHeader className="bg-gradient-to-r py-6 from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="text-xl">Payment Schedule</CardTitle>
                  <CardDescription className="text-sm">First 12 payments preview</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-4">
                      <div className="max-h-96 overflow-y-auto">
                        <div className="space-y-2">
                          {results.schedule.slice(0, 12).map((row, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-gray-900">Payment #{row.payment}</span>
                                <span className="text-sm font-bold text-indigo-600">
                                  $
                                  {(row.principal + row.interest).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="text-gray-500">Principal: </span>
                                  <span className="font-medium">
                                    $
                                    {row.principal.toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Interest: </span>
                                  <span className="font-medium">
                                    $
                                    {row.interest.toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Balance: $
                                {row.balance.toLocaleString("en-US", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {results.schedule.length > 12 && (
                        <p className="text-xs text-gray-500 text-center">
                          Showing first 12 of {results.schedule.length} payments
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Generate schedule to see payment details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>


      </div>
    </>
  )
}
