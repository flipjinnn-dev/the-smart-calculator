"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, CreditCardIcon, DollarSign, TrendingDown, HelpCircle, Plus, Trash2, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

interface Debt {
  id: number
  name: string
  balance: number
  minPayment: number
  apr: number
}

interface PaymentScheduleEntry {
  month: number
  debts: {
    id: number
    name: string
    beginningBalance: number
    interestCharged: number
    paymentMade: number
    principalPaid: number
    endingBalance: number
  }[]
  totalInterest: number
  totalPayment: number
}

export default function DebtPayoffCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const [extraMonthly, setExtraMonthly] = useState("0")
  const [extraAnnual, setExtraAnnual] = useState("0")
  const [oneTimeAmount, setOneTimeAmount] = useState("0")
  const [oneTimeMonth, setOneTimeMonth] = useState("1")
  const [fixedTotalMode, setFixedTotalMode] = useState(true)

  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: "Credit Card 1", balance: 5000, minPayment: 100, apr: 18.99 },
    { id: 2, name: "Credit Card 2", balance: 3000, minPayment: 75, apr: 24.99 },
  ])

  const [results, setResults] = useState<{
    payoffTime: number
    totalInterest: number
    totalPaid: number
    totalPrincipal: number
    schedule: PaymentScheduleEntry[]
    payoffOrder: string[]
  } | null>(null)

  const addDebt = () => {
    const newId = Math.max(...debts.map((d) => d.id)) + 1
    setDebts([...debts, { id: newId, name: `Debt ${newId}`, balance: 0, minPayment: 0, apr: 0 }])
  }

  const removeDebt = (id: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter((d) => d.id !== id))
    }
  }

  const updateDebt = (id: number, field: keyof Debt, value: string | number) => {
    setDebts(debts.map((d) => (d.id === id ? { ...d, [field]: value } : d)))
  }

  const calculateDebtPayoff = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const extraMonthlyAmount = Number.parseFloat(extraMonthly) || 0
    const extraAnnualAmount = Number.parseFloat(extraAnnual) || 0
    const oneTimePayment = Number.parseFloat(oneTimeAmount) || 0
    const oneTimePaymentMonth = Number.parseInt(oneTimeMonth) || 1

    // Initialize working debts with current balances
    let workingDebts = debts
      .filter((debt) => debt.balance > 0)
      .map((debt) => ({
        ...debt,
        currentBalance: debt.balance,
        isActive: true,
      }))

    if (workingDebts.length === 0) {
      alert("Please add debts with positive balances")
      return
    }

    const schedule: PaymentScheduleEntry[] = []
    const payoffOrder: string[] = []
    let month = 0
    let totalInterestPaid = 0
    const totalMinPayments = workingDebts.reduce((sum, debt) => sum + debt.minPayment, 0)
    let availableForReallocation = 0

    while (workingDebts.some((debt) => debt.currentBalance > 0.01) && month < 600) {
      month++

      const monthEntry: PaymentScheduleEntry = {
        month,
        debts: [],
        totalInterest: 0,
        totalPayment: 0,
      }

      // Step 1: Apply interest to all active debts
      workingDebts.forEach((debt) => {
        if (debt.currentBalance > 0) {
          const monthlyRate = debt.apr / 100 / 12
          const interestCharged = debt.currentBalance * monthlyRate
          debt.currentBalance += interestCharged
          totalInterestPaid += interestCharged
          monthEntry.totalInterest += interestCharged
        }
      })

      // Step 2: Calculate available extra payments for this month
      let monthlyExtra = extraMonthlyAmount

      // Add annual extra payment (1/12 each month)
      if (extraAnnualAmount > 0) {
        monthlyExtra += extraAnnualAmount / 12
      }

      // Add one-time payment if this is the specified month
      if (month === oneTimePaymentMonth && oneTimePayment > 0) {
        monthlyExtra += oneTimePayment
      }

      // Add any reallocated payments from paid-off debts
      monthlyExtra += availableForReallocation

      // Step 3: Make minimum payments first
      workingDebts.forEach((debt) => {
        if (debt.currentBalance > 0) {
          const payment = Math.min(debt.minPayment, debt.currentBalance)
          debt.currentBalance = Math.max(0, debt.currentBalance - payment)
          monthEntry.totalPayment += payment
        }
      })

      // Step 4: Apply extra payments using avalanche method (highest APR first)
      if (monthlyExtra > 0) {
        // Sort debts by APR (descending), then by balance (ascending) for tiebreaker
        const sortedDebts = workingDebts
          .filter((debt) => debt.currentBalance > 0)
          .sort((a, b) => {
            if (b.apr !== a.apr) return b.apr - a.apr
            return a.currentBalance - b.currentBalance
          })

        let remainingExtra = monthlyExtra

        for (const debt of sortedDebts) {
          if (remainingExtra <= 0 || debt.currentBalance <= 0) break

          const extraPayment = Math.min(remainingExtra, debt.currentBalance)
          debt.currentBalance = Math.max(0, debt.currentBalance - extraPayment)
          remainingExtra -= extraPayment
          monthEntry.totalPayment += extraPayment
        }
      }

      // Step 5: Record this month's activity and track payoffs
      let newlyPaidOffAmount = 0

      debts.forEach((originalDebt) => {
        const workingDebt = workingDebts.find((d) => d.id === originalDebt.id)
        if (workingDebt) {
          const beginningBalance = workingDebt.currentBalance + monthEntry.totalPayment - monthEntry.totalInterest
          const interestCharged = beginningBalance * (originalDebt.apr / 100 / 12)
          const totalPaymentForDebt = Math.min(
            workingDebt.minPayment + (monthlyExtra > 0 ? Math.min(monthlyExtra, beginningBalance) : 0),
            beginningBalance + interestCharged,
          )

          // Check if debt was just paid off
          if (beginningBalance > 0 && workingDebt.currentBalance <= 0.01 && !payoffOrder.includes(workingDebt.name)) {
            payoffOrder.push(workingDebt.name)
            if (fixedTotalMode) {
              newlyPaidOffAmount += workingDebt.minPayment
            }
          }

          monthEntry.debts.push({
            id: workingDebt.id,
            name: workingDebt.name,
            beginningBalance: Math.max(0, beginningBalance),
            interestCharged: beginningBalance > 0 ? interestCharged : 0,
            paymentMade: beginningBalance > 0 ? totalPaymentForDebt : 0,
            principalPaid: Math.max(0, totalPaymentForDebt - interestCharged),
            endingBalance: Math.max(0, workingDebt.currentBalance),
          })
        }
      })

      // Step 6: Handle reallocation for fixed total mode
      if (fixedTotalMode && newlyPaidOffAmount > 0) {
        availableForReallocation += newlyPaidOffAmount
      }

      schedule.push(monthEntry)

      // Remove paid off debts
      workingDebts = workingDebts.filter((debt) => debt.currentBalance > 0.01)
    }

    const totalPrincipal = debts.reduce((sum, debt) => sum + debt.balance, 0)
    const totalPaid = totalPrincipal + totalInterestPaid

    setResults({
      payoffTime: month,
      totalInterest: totalInterestPaid,
      totalPaid,
      totalPrincipal,
      schedule,
      payoffOrder,
    })
  }

  const downloadCSV = () => {
    if (!results) return

    const headers = [
      "Month",
      "Debt Name",
      "Beginning Balance",
      "Interest Charged",
      "Payment Made",
      "Principal Paid",
      "Ending Balance",
    ]
    const csvContent = [
      headers.join(","),
      ...results.schedule.flatMap((entry) =>
        entry.debts.map((debt) =>
          [
            entry.month,
            `"${debt.name}"`,
            debt.beginningBalance.toFixed(2),
            debt.interestCharged.toFixed(2),
            debt.paymentMade.toFixed(2),
            debt.principalPaid.toFixed(2),
            debt.endingBalance.toFixed(2),
          ].join(","),
        ),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "debt-payoff-schedule.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <SEO
        title="Debt Payoff Calculator – Avalanche Method with Extra Payments"
        description="Free Debt Payoff Calculator using the avalanche method. Enter multiple debts, balances, APRs, and extra payments to estimate payoff time, interest saved, and repayment schedule."
        keywords="debt payoff calculator, avalanche method, extra payments, repayment schedule, debt repayment strategy, total interest saved"
        slug="/debt-avalanche-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Debt Payoff Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-red-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/financial" className="text-gray-500 hover:text-red-600">
                Financial Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Debt Payoff Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCardIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Debt Payoff Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Use the debt avalanche method to pay off your debts faster and save on interest with extra payments.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-red-600" />
                    <span>Debt Payoff Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Extra Payments Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Extra Payments</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Extra Monthly Payment</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={extraMonthly}
                            onChange={(e) => setExtraMonthly(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-red-500"
                            placeholder="200"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Extra Annual Payment</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={extraAnnual}
                            onChange={(e) => setExtraAnnual(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-red-500"
                            placeholder="1200"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">One-Time Extra Payment</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={oneTimeAmount}
                            onChange={(e) => setOneTimeAmount(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-red-500"
                            placeholder="500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Apply One-Time in Month</Label>
                        <Input
                          type="number"
                          min="1"
                          value={oneTimeMonth}
                          onChange={(e) => setOneTimeMonth(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-red-500"
                          placeholder="1"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-semibold text-gray-900">Fixed Total Amount Mode</Label>
                        <p className="text-sm text-gray-600">
                          Reallocate payments from paid-off debts to remaining debts
                        </p>
                      </div>
                      <Switch checked={fixedTotalMode} onCheckedChange={setFixedTotalMode} />
                    </div>
                  </div>

                  <Separator />

                  {/* Debts Section */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <CreditCardIcon className="w-5 h-5 text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Your Debts</h3>
                      </div>
                      <Button
                        onClick={addDebt}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Debt
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {debts.map((debt, index) => (
                        <Card key={debt.id} className="border-2 border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-gray-900">Debt {index + 1}</h4>
                              {debts.length > 1 && (
                                <Button
                                  onClick={() => removeDebt(debt.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Debt Name</Label>
                                <Input
                                  value={debt.name}
                                  onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                                  className="h-10 border-2 focus:border-red-500"
                                  placeholder="Credit Card 1"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Current Balance</Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input
                                    type="number"
                                    value={debt.balance}
                                    onChange={(e) =>
                                      updateDebt(debt.id, "balance", Number.parseFloat(e.target.value) || 0)
                                    }
                                    className="pl-9 h-10 border-2 focus:border-red-500"
                                    placeholder="5000"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Minimum Payment</Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input
                                    type="number"
                                    value={debt.minPayment}
                                    onChange={(e) =>
                                      updateDebt(debt.id, "minPayment", Number.parseFloat(e.target.value) || 0)
                                    }
                                    className="pl-9 h-10 border-2 focus:border-red-500"
                                    placeholder="100"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">APR (%)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={debt.apr}
                                  onChange={(e) => updateDebt(debt.id, "apr", Number.parseFloat(e.target.value) || 0)}
                                  className="h-10 border-2 focus:border-red-500"
                                  placeholder="18.99"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={calculateDebtPayoff}
                    className="w-full h-14 text-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Payoff Strategy
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Payoff Results</CardTitle>
                  <CardDescription className="text-base">Your debt avalanche strategy</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                          <p className="text-sm mb-1 font-semibold text-green-800">Payoff Time:</p>
                          <p className="text-2xl font-bold text-green-700">
                            {Math.floor(results.payoffTime / 12)}y {results.payoffTime % 12}m
                          </p>
                        </div>

                        <div className="text-center p-4 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300">
                          <p className="text-sm mb-1 font-semibold text-blue-800">Total Interest:</p>
                          <p className="text-2xl font-bold text-blue-700">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="text-center p-4 rounded-2xl border-2 bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300">
                        <p className="text-sm mb-1 font-semibold text-purple-800">Total Amount Paid:</p>
                        <p className="text-3xl font-bold text-purple-700">
                          $
                          {results.totalPaid.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      {results.payoffOrder.length > 0 && (
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <h3 className="font-semibold text-yellow-800 mb-2">Payoff Order (Avalanche Method):</h3>
                          <ol className="text-yellow-700 space-y-1">
                            {results.payoffOrder.map((debtName, index) => (
                              <li key={index}>
                                {index + 1}. {debtName}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Payment Schedule */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-gray-900">Payment Schedule</h3>
                          <Button
                            onClick={downloadCSV}
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download CSV
                          </Button>
                        </div>

                        <div className="max-h-96 overflow-y-auto border rounded-lg">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead>Debt</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Interest</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Remaining</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {results.schedule.slice(0, 24).flatMap((entry) =>
                                entry.debts.map((debt, debtIndex) => (
                                  <TableRow key={`${entry.month}-${debt.id}`}>
                                    {debtIndex === 0 && (
                                      <TableCell rowSpan={entry.debts.length} className="font-medium">
                                        {entry.month}
                                      </TableCell>
                                    )}
                                    <TableCell className="font-medium">{debt.name}</TableCell>
                                    <TableCell>${debt.beginningBalance.toFixed(0)}</TableCell>
                                    <TableCell>${debt.interestCharged.toFixed(2)}</TableCell>
                                    <TableCell>${debt.paymentMade.toFixed(2)}</TableCell>
                                    <TableCell>${debt.endingBalance.toFixed(0)}</TableCell>
                                  </TableRow>
                                )),
                              )}
                            </TableBody>
                          </Table>
                        </div>
                        {results.schedule.length > 24 && (
                          <p className="text-sm text-gray-500 text-center">
                            Showing first 24 months. Download CSV for complete schedule.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <TrendingDown className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your debt information to see your payoff strategy</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How the Debt Avalanche Works */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How the Debt Avalanche Works</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                      The debt avalanche method is a mathematically optimal debt repayment strategy that minimizes the
                      total interest you'll pay over time.
                    </p>
                    <ol className="space-y-3 text-gray-700">
                      <li>
                        <strong>List all debts</strong> with their balances, minimum payments, and APRs
                      </li>
                      <li>
                        <strong>Make minimum payments</strong> on all debts to avoid penalties
                      </li>
                      <li>
                        <strong>Apply extra payments</strong> to the debt with the highest interest rate first
                      </li>
                      <li>
                        <strong>Once paid off</strong>, redirect all payments to the next highest-rate debt
                      </li>
                      <li>
                        <strong>Repeat</strong> until all debts are eliminated
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Inputs You Provide */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Inputs You Provide</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">For Each Debt:</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          • Current balance (B<sub>i</sub>)
                        </li>
                        <li>
                          • Minimum monthly payment (m<sub>i</sub>)
                        </li>
                        <li>
                          • Annual APR (r<sub>i</sub>)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Optional Extra Payments:</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          • Extra per month (E<sub>monthly</sub>)
                        </li>
                        <li>
                          • Extra per year (E<sub>annual</sub>)
                        </li>
                        <li>
                          • One-time extra payment (E<sub>one-time</sub>)
                        </li>
                        <li>• Fixed total amount mode (Yes/No)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Formulas and Calculation Logic */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Formulas and Calculation Logic</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Interest Accrual</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-3 rounded">
                        I<sub>i</sub>(k) = B<sub>i</sub>(k-1) × (r<sub>i</sub> ÷ 12)
                      </p>
                      <p className="text-sm text-gray-600 mt-2">Monthly interest = Previous balance × Monthly rate</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. Balance After Interest</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-3 rounded">
                        B̃<sub>i</sub>(k) = B<sub>i</sub>(k-1) + I<sub>i</sub>(k)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Payment Application</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-3 rounded">
                        B<sub>i</sub>(k) = max(0, B̃<sub>i</sub>(k) - P<sub>i</sub>(k))
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        New balance = max(0, Balance after interest - Payment)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">4. Avalanche Priority</h3>
                      <p className="text-gray-700">
                        Extra payments are applied to debts in order of highest APR first, with balance as tiebreaker
                        (lowest first).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example Debt Payoff Schedule */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Example Debt Payoff Schedule</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold mb-2 text-blue-800">Example Scenario:</h3>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Credit Card A: $5,000 at 18.99% APR, $100 minimum</li>
                        <li>• Credit Card B: $3,000 at 24.99% APR, $75 minimum</li>
                        <li>• Extra monthly payment: $200</li>
                        <li>• Fixed total mode: Yes</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold mb-2 text-green-800">Strategy Result:</h3>
                      <ul className="text-green-700 space-y-1">
                        <li>• Pay minimums: $175 total</li>
                        <li>• Apply extra $200 to Card B (higher APR)</li>
                        <li>• Card B paid off first in ~11 months</li>
                        <li>• Reallocate Card B's $275 payment to Card A</li>
                        <li>• Total payoff time: ~18 months</li>
                        <li>• Interest saved vs. minimum payments: ~$2,400</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">FAQs</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-red-600" />
                        What is the debt avalanche method?
                      </h3>
                      <p className="text-gray-700">
                        The debt avalanche method prioritizes paying off debts with the highest interest rates first
                        while making minimum payments on all other debts. This mathematically optimal approach minimizes
                        total interest paid over the life of your debts.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-red-600" />
                        Should I use avalanche or snowball?
                      </h3>
                      <p className="text-gray-700">
                        Debt avalanche saves more money on interest compared to debt snowball (paying smallest balances
                        first). However, debt snowball may provide more psychological motivation through quick wins.
                        Choose avalanche for maximum savings, snowball for motivation.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-red-600" />
                        How do extra payments affect my debt payoff?
                      </h3>
                      <p className="text-gray-700">
                        Extra payments dramatically reduce payoff time and interest costs. Even an extra $50/month can
                        save thousands in interest and years of payments. The calculator shows exactly how much time and
                        money you'll save with different extra payment amounts.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-red-600" />
                        What is "Fixed Total Amount" mode?
                      </h3>
                      <p className="text-gray-700">
                        When enabled, payments from paid-off debts are automatically reallocated to remaining debts,
                        maintaining your total monthly payment amount. This accelerates payoff of remaining debts. When
                        disabled, your total payments decrease as debts are eliminated.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
