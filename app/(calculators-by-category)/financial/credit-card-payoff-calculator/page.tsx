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
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import SimilarCalculators from "@/components/similar-calculators"
import creditPayoffData from "@/app/content/credit-card-payoff-calculator.json"

interface CreditCard {
  id: number
  name: string
  balance: number
  minPayment: number
  apr: number
}

interface PaymentScheduleEntry {
  month: number
  cards: {
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

export default function DebtAvalancheCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const [monthlyBudget, setMonthlyBudget] = useState("1000")
  const [cards, setCards] = useState<CreditCard[]>([
    { id: 1, name: "Card 1", balance: 5000, minPayment: 100, apr: 18.99 },
    { id: 2, name: "Card 2", balance: 3000, minPayment: 75, apr: 24.99 },
  ])

  const [results, setResults] = useState<{
    payoffTime: number
    totalInterest: number
    totalPaid: number
    schedule: PaymentScheduleEntry[]
  } | null>(null)

  const addCard = () => {
    const newId = Math.max(...cards.map((c) => c.id)) + 1
    setCards([...cards, { id: newId, name: `Card ${newId}`, balance: 0, minPayment: 0, apr: 0 }])
  }

  const removeCard = (id: number) => {
    if (cards.length > 1) {
      setCards(cards.filter((c) => c.id !== id))
    }
  }

  const updateCard = (id: number, field: keyof CreditCard, value: string | number) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  const calculateDebtAvalanche = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const budget = Number.parseFloat(monthlyBudget)
    const totalMinPayments = cards.reduce((sum, card) => sum + card.minPayment, 0)

    // Validation
    if (budget < totalMinPayments) {
      alert("Budget too small to cover minimum payments")
      return
    }

    // Initialize working balances
    let workingCards = cards
      .map((card) => ({
        ...card,
        currentBalance: card.balance,
      }))
      .filter((card) => card.balance > 0)

    const schedule: PaymentScheduleEntry[] = []
    let month = 0
    let totalInterestPaid = 0

    while (workingCards.some((card) => card.currentBalance > 0) && month < 600) {
      // 50 year max
      month++
      const monthEntry: PaymentScheduleEntry = {
        month,
        cards: [],
        totalInterest: 0,
        totalPayment: 0,
      }

      // Step 1: Apply interest to all cards
      workingCards.forEach((card) => {
        if (card.currentBalance > 0) {
          const monthlyRate = card.apr / 100 / 12
          const interestCharged = card.currentBalance * monthlyRate
          card.currentBalance += interestCharged
          totalInterestPaid += interestCharged
          monthEntry.totalInterest += interestCharged
        }
      })

      // Step 2: Make minimum payments
      let remainingBudget = budget
      workingCards.forEach((card) => {
        if (card.currentBalance > 0) {
          const payment = Math.min(card.minPayment, card.currentBalance)
          card.currentBalance -= payment
          remainingBudget -= payment
        }
      })

      // Step 3: Apply extra payment to highest APR card
      if (remainingBudget > 0) {
        // Sort by APR descending, then by balance ascending (tiebreaker)
        const sortedCards = workingCards
          .filter((card) => card.currentBalance > 0)
          .sort((a, b) => {
            if (b.apr !== a.apr) return b.apr - a.apr
            return a.currentBalance - b.currentBalance
          })

        if (sortedCards.length > 0) {
          const targetCard = sortedCards[0]
          const extraPayment = Math.min(remainingBudget, targetCard.currentBalance)
          targetCard.currentBalance -= extraPayment
          remainingBudget -= extraPayment
        }
      }

      // Record this month's activity
      cards.forEach((originalCard) => {
        const workingCard = workingCards.find((c) => c.id === originalCard.id)
        if (workingCard) {
          const beginningBalance =
            workingCard.currentBalance +
            (workingCard.currentBalance > 0 ? Math.min(workingCard.minPayment, workingCard.currentBalance) : 0) +
            (remainingBudget > 0 &&
            workingCards
              .filter((c) => c.currentBalance > 0)
              .sort((a, b) => {
                if (b.apr !== a.apr) return b.apr - a.apr
                return a.currentBalance - b.currentBalance
              })[0]?.id === workingCard.id
              ? Math.min(budget - cards.reduce((sum, c) => sum + c.minPayment, 0), workingCard.currentBalance)
              : 0) -
            (originalCard.balance > 0 ? originalCard.balance * (originalCard.apr / 100 / 12) : 0)

          const interestCharged = originalCard.balance > 0 ? originalCard.balance * (originalCard.apr / 100 / 12) : 0
          const totalPayment =
            Math.min(workingCard.minPayment, originalCard.balance) +
            (remainingBudget > 0 &&
            workingCards
              .filter((c) => c.currentBalance > 0)
              .sort((a, b) => {
                if (b.apr !== a.apr) return b.apr - a.apr
                return a.currentBalance - b.currentBalance
              })[0]?.id === workingCard.id
              ? Math.min(budget - cards.reduce((sum, c) => sum + c.minPayment, 0), workingCard.currentBalance)
              : 0)

          monthEntry.cards.push({
            id: workingCard.id,
            name: workingCard.name,
            beginningBalance: originalCard.balance,
            interestCharged,
            paymentMade: totalPayment,
            principalPaid: totalPayment - interestCharged,
            endingBalance: Math.max(0, workingCard.currentBalance),
          })

          monthEntry.totalPayment += totalPayment
        }
      })

      schedule.push(monthEntry)

      // Update original balances for next iteration
      workingCards.forEach((workingCard) => {
        const originalCard = cards.find((c) => c.id === workingCard.id)
        if (originalCard) {
          originalCard.balance = Math.max(0, workingCard.currentBalance)
        }
      })

      // Remove paid off cards
      workingCards = workingCards.filter((card) => card.currentBalance > 0.01)
    }

    const totalPrincipal = cards.reduce((sum, card) => sum + card.balance, 0)
    const totalPaid = totalPrincipal + totalInterestPaid

    setResults({
      payoffTime: month,
      totalInterest: totalInterestPaid,
      totalPaid,
      schedule,
    })
  }

  const downloadCSV = () => {
    if (!results) return

    const headers = [
      "Month",
      "Card Name",
      "Beginning Balance",
      "Interest Charged",
      "Payment Made",
      "Principal Paid",
      "Ending Balance",
    ]
    const csvContent = [
      headers.join(","),
      ...results.schedule.flatMap((entry) =>
        entry.cards.map((card) =>
          [
            entry.month,
            `"${card.name}"`,
            card.beginningBalance.toFixed(2),
            card.interestCharged.toFixed(2),
            card.paymentMade.toFixed(2),
            card.principalPaid.toFixed(2),
            card.endingBalance.toFixed(2),
          ].join(","),
        ),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "debt-avalanche-schedule.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <SEO
        title="Credit Card Payoff Calculator – Debt Avalanche Strategy"
        description="Free Credit Card Payoff Calculator using the debt avalanche method. Enter balances, interest rates, and budget to estimate payoff time, interest saved, and repayment schedule."
        keywords="credit card payoff calculator, debt avalanche, minimum payments, debt repayment schedule, interest savings"
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
                  <p className="text-sm text-gray-500">Debt Avalanche Calculator</p>
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
              <span className="text-gray-900 font-medium">Credit Card Payoff Calculator</span>
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Credit Card Payoff Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Use the debt avalanche method to pay off your credit cards faster and save on interest.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-red-600" />
                    <span>Debt Avalanche Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Monthly Budget */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Monthly Payment Budget</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">
                        Total Monthly Budget for All Credit Card Payments
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={monthlyBudget}
                          onChange={(e) => setMonthlyBudget(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-red-500"
                          placeholder="1000"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Credit Cards */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <CreditCardIcon className="w-5 h-5 text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Credit Cards</h3>
                      </div>
                      <Button
                        onClick={addCard}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Card
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {cards.map((card, index) => (
                        <Card key={card.id} className="border-2 border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-gray-900">Card {index + 1}</h4>
                              {cards.length > 1 && (
                                <Button
                                  onClick={() => removeCard(card.id)}
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
                                <Label className="text-sm font-medium text-gray-700">Card Name</Label>
                                <Input
                                  value={card.name}
                                  onChange={(e) => updateCard(card.id, "name", e.target.value)}
                                  className="h-10 border-2 focus:border-red-500"
                                  placeholder="Card Name"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Current Balance</Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input
                                    type="number"
                                    value={card.balance}
                                    onChange={(e) =>
                                      updateCard(card.id, "balance", Number.parseFloat(e.target.value) || 0)
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
                                    value={card.minPayment}
                                    onChange={(e) =>
                                      updateCard(card.id, "minPayment", Number.parseFloat(e.target.value) || 0)
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
                                  value={card.apr}
                                  onChange={(e) => updateCard(card.id, "apr", Number.parseFloat(e.target.value) || 0)}
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
                    onClick={calculateDebtAvalanche}
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
                                <TableHead>Card</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Interest</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Remaining</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {results.schedule.slice(0, 24).flatMap((entry) =>
                                entry.cards.map((card, cardIndex) => (
                                  <TableRow key={`${entry.month}-${card.id}`}>
                                    {cardIndex === 0 && (
                                      <TableCell rowSpan={entry.cards.length} className="font-medium">
                                        {entry.month}
                                      </TableCell>
                                    )}
                                    <TableCell className="font-medium">{card.name}</TableCell>
                                    <TableCell>${card.beginningBalance.toFixed(0)}</TableCell>
                                    <TableCell>${card.interestCharged.toFixed(2)}</TableCell>
                                    <TableCell>${card.paymentMade.toFixed(2)}</TableCell>
                                    <TableCell>${card.endingBalance.toFixed(0)}</TableCell>
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
                      <p className="text-lg">Enter your credit card information to see your payoff strategy</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Credit Card Calculator",
                  calculatorHref: "/financial/credit-card-calculator",
                  calculatorDescription: "Calculate monthly payments and payoff time for credit card balances"
                },
                {
                  calculatorName: "Interest Calculator", 
                  calculatorHref: "/financial/interest-calculator",
                  calculatorDescription: "Calculate simple and compound interest for loans and investments"
                },
                {
                  calculatorName: "Payment Calculator",
                  calculatorHref: "/financial/payment-calculator",
                  calculatorDescription: "Calculate loan payments for various types of financing scenarios"
                }
              ]}
              color="red"
              title="Related Financial Calculators"
            />

            {/* Educational Content */}
            <div className="mt-12 space-y-8 p-0">
              {/* Formulas */}
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Formulas Behind the Avalanche Method</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Monthly Interest Calculation</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">Interest = Balance × (APR ÷ 12)</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. Minimum Payment Application</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        New Balance = (Balance + Interest) - Min Payment
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Extra Payment Allocation</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        Extra = Budget - Σ(Min Payments)
                      </p>
                      <p className="text-gray-700 mt-2">Extra payment goes to the card with the highest APR</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">4. Payoff Priority</h3>
                      <p className="text-gray-700">
                        Cards are prioritized by APR (highest first), with balance as a tiebreaker (lowest first)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example Scenarios */}
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Example Scenarios</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold mb-2 text-blue-800">Scenario 1: Two Cards</h3>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Card A: $5,000 at 18.99% APR, $100 minimum</li>
                        <li>• Card B: $3,000 at 24.99% APR, $75 minimum</li>
                        <li>• Monthly Budget: $400</li>
                        <li>• Strategy: Pay minimums ($175), put extra $225 toward Card B (higher APR)</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold mb-2 text-green-800">Scenario 2: Multiple Cards</h3>
                      <ul className="text-green-700 space-y-1">
                        <li>• Card A: $8,000 at 15.99% APR, $160 minimum</li>
                        <li>• Card B: $4,000 at 22.99% APR, $80 minimum</li>
                        <li>• Card C: $2,000 at 19.99% APR, $50 minimum</li>
                        <li>• Monthly Budget: $500</li>
                        <li>• Strategy: Pay minimums ($290), put extra $210 toward Card B (highest APR)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Guide */}
              <CalculatorGuide data={creditPayoffData} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
