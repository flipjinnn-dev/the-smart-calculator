"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Car, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import autoLoanData from "@/app/content/auto-loan-calculator.json"
import SimilarCalculators from "@/components/similar-calculators"

const US_STATES = [
  { value: "AL", label: "Alabama", tax: 4.0 },
  { value: "AK", label: "Alaska", tax: 0.0 },
  { value: "AZ", label: "Arizona", tax: 5.6 },
  { value: "AR", label: "Arkansas", tax: 6.5 },
  { value: "CA", label: "California", tax: 7.25 },
  { value: "CO", label: "Colorado", tax: 2.9 },
  { value: "CT", label: "Connecticut", tax: 6.35 },
  { value: "DE", label: "Delaware", tax: 0.0 },
  { value: "DC", label: "District of Columbia", tax: 6.0 },
  { value: "FL", label: "Florida", tax: 6.0 },
  { value: "GA", label: "Georgia", tax: 4.0 },
  { value: "HI", label: "Hawaii", tax: 4.0 },
  { value: "ID", label: "Idaho", tax: 6.0 },
  { value: "IL", label: "Illinois", tax: 6.25 },
  { value: "IN", label: "Indiana", tax: 7.0 },
  { value: "IA", label: "Iowa", tax: 6.0 },
  { value: "KS", label: "Kansas", tax: 6.5 },
  { value: "KY", label: "Kentucky", tax: 6.0 },
  { value: "LA", label: "Louisiana", tax: 4.45 },
  { value: "ME", label: "Maine", tax: 5.5 },
  { value: "MD", label: "Maryland", tax: 6.0 },
  { value: "MA", label: "Massachusetts", tax: 6.25 },
  { value: "MI", label: "Michigan", tax: 6.0 },
  { value: "MN", label: "Minnesota", tax: 6.875 },
  { value: "MS", label: "Mississippi", tax: 7.0 },
  { value: "MO", label: "Missouri", tax: 4.225 },
  { value: "MT", label: "Montana", tax: 0.0 },
  { value: "NE", label: "Nebraska", tax: 5.5 },
  { value: "NV", label: "Nevada", tax: 6.85 },
  { value: "NH", label: "New Hampshire", tax: 0.0 },
  { value: "NJ", label: "New Jersey", tax: 6.625 },
  { value: "NM", label: "New Mexico", tax: 5.125 },
  { value: "NY", label: "New York", tax: 4.0 },
  { value: "NC", label: "North Carolina", tax: 4.75 },
  { value: "ND", label: "North Dakota", tax: 5.0 },
  { value: "OH", label: "Ohio", tax: 5.75 },
  { value: "OK", label: "Oklahoma", tax: 4.5 },
  { value: "OR", label: "Oregon", tax: 0.0 },
  { value: "PA", label: "Pennsylvania", tax: 6.0 },
  { value: "RI", label: "Rhode Island", tax: 7.0 },
  { value: "SC", label: "South Carolina", tax: 6.0 },
  { value: "SD", label: "South Dakota", tax: 4.5 },
  { value: "TN", label: "Tennessee", tax: 7.0 },
  { value: "TX", label: "Texas", tax: 6.25 },
  { value: "UT", label: "Utah", tax: 5.95 },
  { value: "VT", label: "Vermont", tax: 6.0 },
  { value: "VA", label: "Virginia", tax: 5.3 },
  { value: "WA", label: "Washington", tax: 6.5 },
  { value: "WV", label: "West Virginia", tax: 6.0 },
  { value: "WI", label: "Wisconsin", tax: 5.0 },
  { value: "WY", label: "Wyoming", tax: 4.0 },
]

export default function AutoLoanCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [autoPrice, setAutoPrice] = useState("50000")
  const [loanTerm, setLoanTerm] = useState("60")
  const [interestRate, setInterestRate] = useState("5")
  const [cashIncentives, setCashIncentives] = useState("0")
  const [downPayment, setDownPayment] = useState("10000")
  const [tradeInValue, setTradeInValue] = useState("0")
  const [amountOwed, setAmountOwed] = useState("0")
  const [selectedState, setSelectedState] = useState("CO")
  const [salesTax, setSalesTax] = useState("2.9")
  const [titleFees, setTitleFees] = useState("3400")
  const [includeTaxesInLoan, setIncludeTaxesInLoan] = useState(false)
  const [showAmortization, setShowAmortization] = useState(false)
  const [desiredPayment, setDesiredPayment] = useState("754.85")
  const [maxPrice, setMaxPrice] = useState("")

  const [results, setResults] = useState<{
    monthlyPayment: number
    totalLoanAmount: number
    salesTax: number
    upfrontPayment: number
    totalLoanPayments: number
    totalInterest: number
    totalCost: number
    principalPercent: number
    interestPercent: number
    amortizationSchedule: Array<{
      year: number
      interest: number
      principal: number
      balance: number
    }>
  } | null>(null)

  // Scroll to results
  scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  const handleStateChange = (stateValue: string) => {
    setSelectedState(stateValue)
    const state = US_STATES.find((s) => s.value === stateValue)
    if (state) {
      setSalesTax(state.tax.toString())
    }
  }

  const calculateAutoLoan = () => {
    const price = Number.parseFloat(autoPrice)
    const incentives = Number.parseFloat(cashIncentives)
    const down = Number.parseFloat(downPayment)
    const tradeIn = Number.parseFloat(tradeInValue)
    const owed = Number.parseFloat(amountOwed)
    const tax = (price * Number.parseFloat(salesTax)) / 100
    const fees = Number.parseFloat(titleFees)
    const rate = Number.parseFloat(interestRate) / 100 / 12
    const months = Number.parseFloat(loanTerm)

    // Calculate net trade-in value
    const netTradeIn = tradeIn - owed

    // Calculate upfront payment
    const upfrontPayment = incentives + down + netTradeIn

    // Calculate total loan amount
    let totalLoanAmount
    if (includeTaxesInLoan) {
      totalLoanAmount = price + tax + fees - upfrontPayment
    } else {
      totalLoanAmount = price - upfrontPayment
    }

    if (totalLoanAmount <= 0 || rate <= 0 || months <= 0) return

    // Calculate monthly payment
    const monthlyPayment = (totalLoanAmount * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1)

    const totalLoanPayments = monthlyPayment * months
    const totalInterest = totalLoanPayments - totalLoanAmount
    const totalCost = price + totalInterest + (includeTaxesInLoan ? 0 : tax + fees)

    // Calculate percentages for pie chart
    const principalPercent = Math.round((totalLoanAmount / totalLoanPayments) * 100)
    const interestPercent = 100 - principalPercent

    // Generate annual amortization schedule
    const amortizationSchedule = []
    let balance = totalLoanAmount
    const years = Math.ceil(months / 12)

    for (let year = 1; year <= years; year++) {
      let yearlyInterest = 0
      let yearlyPrincipal = 0
      const paymentsInYear = year === years ? months % 12 || 12 : 12

      for (let month = 1; month <= paymentsInYear; month++) {
        const interestPayment = balance * rate
        const principalPayment = monthlyPayment - interestPayment
        balance -= principalPayment
        yearlyInterest += interestPayment
        yearlyPrincipal += principalPayment
      }

      amortizationSchedule.push({
        year,
        interest: yearlyInterest,
        principal: yearlyPrincipal,
        balance: Math.max(0, balance),
      })
    }

    setResults({
      monthlyPayment,
      totalLoanAmount,
      salesTax: tax,
      upfrontPayment,
      totalLoanPayments,
      totalInterest,
      totalCost,
      principalPercent,
      interestPercent,
      amortizationSchedule,
    })
  }

  return (
    <>
<SEO
  title="Auto Loan Calculator – Car Payment Estimator"
  description="Calculate monthly car loan payments quickly. Use our free auto loan calculator to compare financing options and plan your next vehicle purchase."
  keywords="auto loan calculator, car payment calculator, vehicle finance calculator, car loan estimator"
  slug="/financial/auto-loan-calculator"
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
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Auto Loan Calculator</p>
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
                Financial
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Auto Loan Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Car className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Auto Loan Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your monthly car payments including taxes, fees, and trade-in value.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>Auto Loan Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Tabs defaultValue="total-price" className="mb-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="total-price">Total Price</TabsTrigger>
                      <TabsTrigger value="monthly-payment">Monthly Payment</TabsTrigger>
                    </TabsList>
                    <TabsContent value="total-price" className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Auto Price</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="50,000"
                              value={autoPrice}
                              onChange={(e) => setAutoPrice(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Loan Term</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              value={loanTerm}
                              onChange={(e) => setLoanTerm(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                            <span className="text-gray-500 font-medium">months</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Interest Rate</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              step="0.01"
                              value={interestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                            <span className="text-gray-500 font-medium">%</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Cash Incentives</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="0"
                              value={cashIncentives}
                              onChange={(e) => setCashIncentives(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Down Payment</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="10,000"
                              value={downPayment}
                              onChange={(e) => setDownPayment(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Trade-in Value</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="0"
                              value={tradeInValue}
                              onChange={(e) => setTradeInValue(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Amount Owed on Trade-in</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="0"
                              value={amountOwed}
                              onChange={(e) => setAmountOwed(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Your State</Label>
                          <Select value={selectedState} onValueChange={handleStateChange}>
                            <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                              <SelectValue placeholder="-- Select --" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {US_STATES.map((state) => (
                                <SelectItem key={state.value} value={state.value}>
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Sales Tax</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              step="0.01"
                              value={salesTax}
                              onChange={(e) => setSalesTax(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                            <span className="text-gray-500 font-medium">%</span>
                          </div>
                        </div>

                        <div className="space-y-3 md:col-span-2">
                          <Label className="text-base font-semibold text-gray-900">
                            Title, Registration and Other Fees
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="3,400"
                              value={titleFees}
                              onChange={(e) => setTitleFees(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="includeTaxes"
                              checked={includeTaxesInLoan}
                              onCheckedChange={(checked) => setIncludeTaxesInLoan(!!checked)}
                            />
                            <Label htmlFor="includeTaxes" className="text-base">
                              Include taxes and fees in loan
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          calculateAutoLoan();
                          scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                        }}
                        className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12"
                      >
                        Calculate
                      </Button>
                    </TabsContent>
                    <TabsContent value="monthly-payment" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Monthly Payment</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="754.85"
                              value={desiredPayment}
                              onChange={(e) => setDesiredPayment(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Loan Term</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              value={loanTerm}
                              onChange={(e) => setLoanTerm(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                            <span className="text-gray-500 font-medium">months</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Interest Rate</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              step="0.01"
                              value={interestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                            <span className="text-gray-500 font-medium">%</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Cash Incentives</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="0"
                              value={cashIncentives}
                              onChange={(e) => setCashIncentives(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Down Payment</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="10,000"
                              value={downPayment}
                              onChange={(e) => setDownPayment(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Trade-in Value</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="0"
                              value={tradeInValue}
                              onChange={(e) => setTradeInValue(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Amount Owed on Trade-in</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="0"
                              value={amountOwed}
                              onChange={(e) => setAmountOwed(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Your State</Label>
                          <Select value={selectedState} onValueChange={handleStateChange}>
                            <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                              <SelectValue placeholder="-- Select --" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {US_STATES.map((state) => (
                                <SelectItem key={state.value} value={state.value}>
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Sales Tax</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              step="0.01"
                              value={salesTax}
                              onChange={(e) => setSalesTax(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                            <span className="text-gray-500 font-medium">%</span>
                          </div>
                        </div>

                        <div className="space-y-3 md:col-span-2">
                          <Label className="text-base font-semibold text-gray-900">
                            Title, Registration and Other Fees
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="3,400"
                              value={titleFees}
                              onChange={(e) => setTitleFees(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="includeTaxesMonthly"
                              checked={includeTaxesInLoan}
                              onCheckedChange={(checked) => setIncludeTaxesInLoan(checked as boolean)}
                            />
                            <Label htmlFor="includeTaxesMonthly" className="text-base">
                              Include taxes and fees in loan
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          calculateAutoLoan()
                          scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                        }}
                        className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-12"
                      >
                        Calculate
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Monthly Payment</CardTitle>
                  <CardDescription className="text-base">Your complete loan breakdown</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Monthly Payment */}
                      <div className="text-center p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl border-2 border-green-300">
                        <p className="text-lg text-green-800 mb-2 font-semibold">Monthly Pay:</p>
                        <p className="text-4xl font-bold text-green-700 mb-2">
                          $
                          {results.monthlyPayment.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      {/* Loan Summary */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">Total Loan Amount</span>
                            <span className="font-bold text-blue-600">
                              $
                              {results.totalLoanAmount.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">Sale Tax</span>
                            <span className="font-bold text-orange-600">
                              $
                              {results.salesTax.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">Upfront Payment</span>
                            <span className="font-bold text-purple-600">
                              $
                              {results.upfrontPayment.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <span className="font-medium text-gray-700">Total of {loanTerm} Loan Payments</span>
                            <span className="font-bold text-green-600">
                              $
                              {results.totalLoanPayments.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                            <span className="font-medium text-gray-700">Total Loan Interest</span>
                            <span className="font-bold text-red-600">
                              $
                              {results.totalInterest.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-medium text-gray-700">Total Cost (price, interest, tax, fees)</span>
                            <span className="font-bold text-gray-900">
                              $
                              {results.totalCost.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Loan Breakdown */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">Loan Breakdown</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-sm">{results.principalPercent}% Principal</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="text-sm">{results.interestPercent}% Interest</span>
                          </div>
                        </div>
                      </div>

                      {/* State Tax Info */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <Button size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700">
                          Find Average Tax Rate and Fees in Your State
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Car className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter auto loan details to see your payment breakdown</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Amortization Schedule */}
            {results && (
              <Card className="shadow-2xl border-0 pt-0 bg-white mt-8">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Amortization Schedule</CardTitle>
                  <CardDescription className="text-base">Annual payment breakdown</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Tabs defaultValue="annual" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="annual">Annual Schedule</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly Schedule</TabsTrigger>
                      </TabsList>
                      <TabsContent value="annual" className="mt-6">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b-2 border-gray-200">
                                <th className="text-left p-3 font-bold">Year</th>
                                <th className="text-right p-3 font-bold">Interest</th>
                                <th className="text-right p-3 font-bold">Principal</th>
                                <th className="text-right p-3 font-bold">Ending Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {results.amortizationSchedule.map((payment) => (
                                <tr key={payment.year} className="border-b border-gray-100 hover:bg-gray-50">
                                  <td className="p-3 font-medium">{payment.year}</td>
                                  <td className="text-right p-3">
                                    $
                                    {payment.interest.toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </td>
                                  <td className="text-right p-3">
                                    $
                                    {payment.principal.toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </td>
                                  <td className="text-right p-3">
                                    $
                                    {payment.balance.toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                      <TabsContent value="monthly">
                        <div className="text-center py-8 text-gray-500">
                          <p>Monthly schedule view - Coming soon!</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
      <SimilarCalculators
        calculators={[
          {
            calculatorName: "Loan Calculator",
            calculatorHref: "/financial/loan-calculator",
            calculatorDescription: "Calculate loan payments, interest, and amortization schedules"
          },
          {
            calculatorName: "Payment Calculator",
            calculatorHref: "/financial/payment-calculator",
            calculatorDescription: "Calculate monthly payments for various loan types"
          },
          {
            calculatorName: "Interest Calculator",
            calculatorHref: "/financial/interest-calculator",
            calculatorDescription: "Calculate simple and compound interest on investments"
          }
        ]}
        color="blue"
        title="Related Financial Calculators"
      />
          {/* Calculator Guide */}
          <div className="mx-auto mt-12">
            <CalculatorGuide data={autoLoanData} />
          </div>

        </main>

      </div>



      <div className="max-w-4xl mx-auto p-6 space-y-8">

      </div>
    </>
  )
}
