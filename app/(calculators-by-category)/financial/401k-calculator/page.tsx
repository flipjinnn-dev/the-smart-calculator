"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, TrendingUp, DollarSign, PiggyBank, HelpCircle, AlertTriangle, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

export default function FourOhOneKCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  const [activeTab, setActiveTab] = useState("retirement")

  // Retirement Calculator States
  const [currentAge, setCurrentAge] = useState("30")
  const [retirementAge, setRetirementAge] = useState("65")
  const [lifeExpectancy, setLifeExpectancy] = useState("85")
  const [currentSalary, setCurrentSalary] = useState("60000")
  const [currentBalance, setCurrentBalance] = useState("50000")
  const [employeeContributionRate, setEmployeeContributionRate] = useState("6")
  const [employerMatchRate, setEmployerMatchRate] = useState("50")
  const [employerMatchLimit, setEmployerMatchLimit] = useState("6")
  const [salaryGrowthRate, setSalaryGrowthRate] = useState("3")
  const [annualReturn, setAnnualReturn] = useState("7")
  const [inflationRate, setInflationRate] = useState("2.5")

  const [earlyWithdrawalAmount, setEarlyWithdrawalAmount] = useState("10000")
  const [federalTaxRate, setFederalTaxRate] = useState("25")
  const [stateTaxRate, setStateTaxRate] = useState("5")
  const [localTaxRate, setLocalTaxRate] = useState("0")
  const [isEmployed, setIsEmployed] = useState(false)
  const [hasDisability, setHasDisability] = useState(false)
  const [hasOtherExemptions, setHasOtherExemptions] = useState(false)

  const [optimizerAge, setOptimizerAge] = useState("30")
  const [optimizerSalary, setOptimizerSalary] = useState("75000")
  const [match1Rate, setMatch1Rate] = useState("50")
  const [match1Limit, setMatch1Limit] = useState("3")
  const [match2Rate, setMatch2Rate] = useState("20")
  const [match2Limit, setMatch2Limit] = useState("6")

  // Results States
  const [retirementResults, setRetirementResults] = useState<any>(null)
  const [earlyWithdrawalResults, setEarlyWithdrawalResults] = useState<any>(null)
  const [optimizerResults, setOptimizerResults] = useState<any>(null)

  const calculateRetirement = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const age = Number.parseFloat(currentAge)
    const R = Number.parseFloat(retirementAge)
    const S0 = Number.parseFloat(currentSalary)
    const B0 = Number.parseFloat(currentBalance)
    const c = Number.parseFloat(employeeContributionRate) / 100
    const m = Number.parseFloat(employerMatchRate) / 100
    const mlimit = Number.parseFloat(employerMatchLimit) / 100
    const g = Number.parseFloat(salaryGrowthRate) / 100
    const r = Number.parseFloat(annualReturn) / 100
    const i = Number.parseFloat(inflationRate) / 100
    const n = R - age

    let totalEmployeeContributions = 0
    let totalEmployerContributions = 0
    const yearlyBreakdown = []

    // Calculate using exact competitor formula: BR = B0 × (1+r)^n + Σ(Et + Mt) × (1+r)^(n-t)
    let futureValueOfContributions = 0

    for (let t = 1; t <= n; t++) {
      // Salary progression: St = S0 × (1+g)^(t−1)
      const St = S0 * Math.pow(1 + g, t - 1)

      // Employee contribution: Et = c × St
      const Et = Math.min(c * St, 23000) // 2024 limit

      // Employer match calculation with exact formula
      let Mt = 0
      if (c <= mlimit) {
        Mt = m * St
      } else {
        Mt = m * (mlimit * St)
      }
      Mt = Math.min(Mt, 69000 - Et) // Total contribution limit

      // Future value of this year's contributions: (Et + Mt) × (1+r)^(n-t)
      futureValueOfContributions += (Et + Mt) * Math.pow(1 + r, n - t)

      totalEmployeeContributions += Et
      totalEmployerContributions += Mt

      if (t > n - 10) {
        // Last 10 years for display
        yearlyBreakdown.push({
          year: new Date().getFullYear() + t - 1,
          age: Math.round(age + t - 1),
          salary: Math.round(St),
          employeeContribution: Math.round(Et),
          employerContribution: Math.round(Mt),
          balance: Math.round(B0 * Math.pow(1 + r, t) + futureValueOfContributions * Math.pow(1 + r, t - n)),
        })
      }
    }

    // Final balance: BR = B0 × (1+r)^n + futureValueOfContributions
    const retirementBalance = B0 * Math.pow(1 + r, n) + futureValueOfContributions
    const totalContributions = totalEmployeeContributions + totalEmployerContributions
    const totalGrowth = retirementBalance - B0 - totalContributions

    // Real value (today's dollars): RealValue = BR / (1+i)^n
    const inflationAdjustedBalance = retirementBalance / Math.pow(1 + i, n)

    setRetirementResults({
      retirementBalance,
      inflationAdjustedBalance,
      totalContributions,
      totalEmployeeContributions,
      totalEmployerContributions,
      totalGrowth,
      yearlyBreakdown,
    })
  }

  const calculateEarlyWithdrawal = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const withdrawalAmt = Number.parseFloat(earlyWithdrawalAmount)
    const fedTaxRate = Number.parseFloat(federalTaxRate) / 100
    const stateRate = Number.parseFloat(stateTaxRate) / 100
    const localRate = Number.parseFloat(localTaxRate) / 100

    // Determine if 10% penalty applies
    let penaltyRate = 0.1
    if (hasDisability || hasOtherExemptions) {
      penaltyRate = 0
    }

    const penalty = withdrawalAmt * penaltyRate
    const federalTax = withdrawalAmt * fedTaxRate
    const stateTax = withdrawalAmt * stateRate
    const localTax = withdrawalAmt * localRate
    const totalTaxes = federalTax + stateTax + localTax
    const netAmount = withdrawalAmt - penalty - totalTaxes

    setEarlyWithdrawalResults({
      grossAmount: withdrawalAmt,
      penalty,
      federalTax,
      stateTax,
      localTax,
      totalTaxes,
      netAmount,
      effectiveRate: ((penalty + totalTaxes) / withdrawalAmt) * 100,
    })
  }

  const calculateOptimizer = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const salary = Number.parseFloat(optimizerSalary)
    const match1 = Number.parseFloat(match1Rate) / 100
    const limit1 = Number.parseFloat(match1Limit) / 100
    const match2 = Number.parseFloat(match2Rate) / 100
    const limit2 = Number.parseFloat(match2Limit) / 100

    const contributionLevels = []
    const maxContributionRate = Math.min(23000 / salary, 1) // Don't exceed IRS limit

    // Calculate match at different contribution levels
    for (let rate = 0; rate <= maxContributionRate; rate += 0.005) {
      // 0.5% increments
      let employerMatch = 0

      // First tier match
      if (rate <= limit1) {
        employerMatch += match1 * rate * salary
      } else {
        employerMatch += match1 * limit1 * salary
      }

      // Second tier match (if applicable)
      if (rate > limit1 && rate <= limit2) {
        employerMatch += match2 * (rate - limit1) * salary
      } else if (rate > limit2) {
        employerMatch += match2 * (limit2 - limit1) * salary
      }

      const employeeContribution = rate * salary
      const totalContribution = employeeContribution + employerMatch

      contributionLevels.push({
        contributionRate: rate * 100,
        employeeContribution,
        employerMatch,
        totalContribution,
        effectiveMatch: employeeContribution > 0 ? (employerMatch / employeeContribution) * 100 : 0,
      })
    }

    // Find optimal range
    const maxMatch = Math.max(...contributionLevels.map((level) => level.employerMatch))
    const optimalLevels = contributionLevels.filter((level) => level.employerMatch >= maxMatch * 0.99)
    const minOptimalRate = Math.min(...optimalLevels.map((level) => level.contributionRate))
    const maxOptimalRate = Math.max(...optimalLevels.map((level) => level.contributionRate))

    setOptimizerResults({
      contributionLevels: contributionLevels.filter((_, index) => index % 4 === 0), // Show every 2%
      maxEmployerMatch: maxMatch,
      optimalRateMin: minOptimalRate,
      optimalRateMax: maxOptimalRate,
      recommendedRate: limit2 * 100, // Generally recommend contributing up to full match
    })
  }

  return (
    <>
      <SEO
        title="401(k) Calculator – Retirement Savings & Investment Planner"
        description="Free 401(k) calculator suite with retirement planning, early withdrawal costs, and employer match optimization. Plan your retirement strategy."
        keywords="401k calculator, retirement calculator, 401k savings, employer match calculator, retirement planning, early withdrawal"
        slug="/financial/401k-calculator"
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
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">401(k) Calculator Suite</p>
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
              <span className="text-gray-900 font-medium">401(k) Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center py-16 ">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <Calculator className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
                401(k) Calculator Suite
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Comprehensive 401(k) planning tools for retirement savings, early withdrawal analysis, and employer
                match optimization
              </p>
            </div>

            {/* Calculator Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>401(k) Calculator</span>
                    </CardTitle>
                    <CardDescription>
                      Choose your calculation type and get accurate retirement planning insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                      <Label className="text-base font-semibold text-gray-900">Type of Calculation</Label>
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={() => setActiveTab("retirement")}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                            activeTab === "retirement"
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          <TrendingUp className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-semibold">Retirement Planning</div>
                            <div className="text-sm opacity-75">Calculate long-term 401(k) growth and projections</div>
                          </div>
                        </button>
                        <button
                          onClick={() => setActiveTab("withdrawal")}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                            activeTab === "withdrawal"
                              ? "border-orange-500 bg-orange-50 text-orange-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          <AlertTriangle className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-semibold">Early Withdrawal Costs</div>
                            <div className="text-sm opacity-75">Calculate penalties and taxes on early withdrawals</div>
                          </div>
                        </button>
                        <button
                          onClick={() => setActiveTab("optimizer")}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                            activeTab === "optimizer"
                              ? "border-green-500 bg-green-50 text-green-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          <Target className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-semibold">Maximize Employer Match</div>
                            <div className="text-sm opacity-75">
                              Find optimal contribution rate for maximum matching
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {activeTab === "retirement" && (
                      <>
                        {/* Basic Information */}
                        <div className="space-y-6">
                          <div className="flex items-center space-x-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">Current Age</Label>
                              <Input
                                type="number"
                                value={currentAge}
                                onChange={(e) => setCurrentAge(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-blue-500"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">Retirement Age</Label>
                              <Input
                                type="number"
                                value={retirementAge}
                                onChange={(e) => setRetirementAge(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-blue-500"
                              />
                            </div>

                            <div className="space-y-3 sm:col-span-2">
                              <Label className="text-base font-semibold text-gray-900">Current Annual Salary</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                  type="number"
                                  value={currentSalary}
                                  onChange={(e) => setCurrentSalary(e.target.value)}
                                  className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                                />
                              </div>
                            </div>

                            <div className="space-y-3 sm:col-span-2">
                              <Label className="text-base font-semibold text-gray-900">Current 401(k) Balance</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                  type="number"
                                  value={currentBalance}
                                  onChange={(e) => setCurrentBalance(e.target.value)}
                                  className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Contribution Settings */}
                        <div className="space-y-6">
                          <div className="flex items-center space-x-2 mb-4">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Contribution Settings</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">
                                Employee Contribution Rate (%)
                              </Label>
                              <Input
                                type="number"
                                value={employeeContributionRate}
                                onChange={(e) => setEmployeeContributionRate(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-blue-500"
                                step="0.1"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">Employer Match Rate (%)</Label>
                              <Input
                                type="number"
                                value={employerMatchRate}
                                onChange={(e) => setEmployerMatchRate(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-blue-500"
                                step="0.1"
                              />
                            </div>

                            <div className="space-y-3 sm:col-span-2">
                              <Label className="text-base font-semibold text-gray-900">
                                Employer Match Limit (% of salary eligible)
                              </Label>
                              <Input
                                type="number"
                                value={employerMatchLimit}
                                onChange={(e) => setEmployerMatchLimit(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-blue-500"
                                step="0.1"
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Growth Assumptions */}
                        <div className="space-y-6">
                          <div className="flex items-center space-x-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Growth Assumptions</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">Annual Salary Growth (%)</Label>
                              <Input
                                type="number"
                                value={salaryGrowthRate}
                                onChange={(e) => setSalaryGrowthRate(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-blue-500"
                                step="0.1"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">
                                Expected Annual Return (%)
                              </Label>
                              <Input
                                type="number"
                                value={annualReturn}
                                onChange={(e) => setAnnualReturn(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-blue-500"
                                step="0.1"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">
                                Expected Inflation Rate (%)
                              </Label>
                              <Input
                                type="number"
                                value={inflationRate}
                                onChange={(e) => setInflationRate(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-blue-500"
                                step="0.1"
                              />
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={calculateRetirement}
                          className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-12"
                        >
                          Calculate Retirement Projection
                        </Button>
                      </>
                    )}

                    {activeTab === "withdrawal" && (
                      <>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Early Withdrawal Amount</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                type="number"
                                value={earlyWithdrawalAmount}
                                onChange={(e) => setEarlyWithdrawalAmount(e.target.value)}
                                className="pl-10 h-12 text-lg border-2 focus:border-orange-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">
                                Federal Income Tax Rate (%)
                              </Label>
                              <Input
                                type="number"
                                value={federalTaxRate}
                                onChange={(e) => setFederalTaxRate(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-orange-500"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">State Income Tax Rate (%)</Label>
                              <Input
                                type="number"
                                value={stateTaxRate}
                                onChange={(e) => setStateTaxRate(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-orange-500"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">Local/City Tax Rate (%)</Label>
                              <Input
                                type="number"
                                value={localTaxRate}
                                onChange={(e) => setLocalTaxRate(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-orange-500"
                              />
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Penalty Exemptions</h3>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="employed"
                                checked={isEmployed}
                                onCheckedChange={(val) => setIsEmployed(val === true)}
                              />
                              <Label htmlFor="employed">Are you employed?</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="disability"
                                checked={hasDisability}
                                onCheckedChange={(val) => setHasDisability(val === true)}
                              />
                              <Label htmlFor="disability">Do you have a qualifying disability?</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="exemptions"
                                checked={hasOtherExemptions}
                                onCheckedChange={(val) => setHasOtherExemptions(val === true)}
                              />
                              <Label htmlFor="exemptions">Do you qualify for other penalty exemptions?</Label>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={calculateEarlyWithdrawal}
                          className="w-full h-14 text-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-xl font-bold"
                        >
                          Calculate Early Withdrawal Cost
                        </Button>
                      </>
                    )}

                    {activeTab === "optimizer" && (
                      <>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">Current Age</Label>
                              <Input
                                type="number"
                                value={optimizerAge}
                                onChange={(e) => setOptimizerAge(e.target.value)}
                                className="h-12 text-lg border-2 focus:border-green-500"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label className="text-base font-semibold text-gray-900">Current Annual Salary</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                  type="number"
                                  value={optimizerSalary}
                                  onChange={(e) => setOptimizerSalary(e.target.value)}
                                  className="pl-10 h-12 text-lg border-2 focus:border-green-500"
                                />
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Employer Match Structure</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <Label className="text-base font-semibold text-gray-900">Employer Match 1 (%)</Label>
                                <Input
                                  type="number"
                                  value={match1Rate}
                                  onChange={(e) => setMatch1Rate(e.target.value)}
                                  className="h-12 text-lg border-2 focus:border-green-500"
                                />
                              </div>

                              <div className="space-y-3">
                                <Label className="text-base font-semibold text-gray-900">Match 1 Limit (%)</Label>
                                <Input
                                  type="number"
                                  value={match1Limit}
                                  onChange={(e) => setMatch1Limit(e.target.value)}
                                  className="h-12 text-lg border-2 focus:border-green-500"
                                />
                              </div>

                              <div className="space-y-3">
                                <Label className="text-base font-semibold text-gray-900">Employer Match 2 (%)</Label>
                                <Input
                                  type="number"
                                  value={match2Rate}
                                  onChange={(e) => setMatch2Rate(e.target.value)}
                                  className="h-12 text-lg border-2 focus:border-green-500"
                                />
                              </div>

                              <div className="space-y-3">
                                <Label className="text-base font-semibold text-gray-900">Match 2 Limit (%)</Label>
                                <Input
                                  type="number"
                                  value={match2Limit}
                                  onChange={(e) => setMatch2Limit(e.target.value)}
                                  className="h-12 text-lg border-2 focus:border-green-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={calculateOptimizer}
                          className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-xl font-bold"
                        >
                          Optimize Employer Match
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Results Panel - Always visible on the right */}
                <div className="lg:sticky lg:top-8 lg:self-start">
                  {activeTab === "retirement" && (
                    <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                        <CardTitle className="text-2xl">Retirement Projection</CardTitle>
                        <CardDescription className="text-base">Your 401(k) growth forecast</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        {retirementResults ? (
                          <div className="space-y-6">
                            {/* Main Results */}
                            <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-green-100 border-blue-300">
                              <p className="text-lg mb-2 font-semibold text-blue-800">
                                Projected Balance at Retirement:
                              </p>
                              <p className="text-4xl font-bold mb-2 text-blue-700">
                                $
                                {retirementResults.retirementBalance.toLocaleString("en-US", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}
                              </p>
                              <p className="text-sm text-blue-600">
                                Real Value (Today's Dollars): $
                                {retirementResults.inflationAdjustedBalance.toLocaleString("en-US", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}
                              </p>
                            </div>

                            {/* Contribution Breakdown */}
                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">Contribution Breakdown</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                  <span className="font-medium text-gray-700">Your Contributions</span>
                                  <span className="font-bold text-green-600">
                                    $
                                    {retirementResults.totalEmployeeContributions.toLocaleString("en-US", {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <span className="font-medium text-gray-700">Employer Match</span>
                                  <span className="font-bold text-blue-600">
                                    $
                                    {retirementResults.totalEmployerContributions.toLocaleString("en-US", {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                  <span className="font-medium text-gray-700">Investment Growth</span>
                                  <span className="font-bold text-purple-600">
                                    $
                                    {retirementResults.totalGrowth.toLocaleString("en-US", {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Yearly Breakdown */}
                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">Final Years Projection</h3>
                              <div className="space-y-2 max-h-64 overflow-y-auto">
                                {retirementResults.yearlyBreakdown.map((year: any) => (
                                  <div key={year.year} className="p-3 bg-gray-50 rounded-lg border">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium text-gray-700">
                                        {year.year} (Age {year.age})
                                      </span>
                                      <span className="font-bold text-gray-900">${year.balance.toLocaleString()}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 flex justify-between">
                                      <span>Salary: ${year.salary.toLocaleString()}</span>
                                      <span>
                                        Contributions: $
                                        {(year.employeeContribution + year.employerContribution).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <PiggyBank className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Enter your information to see your 401(k) projection</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {activeTab === "withdrawal" && (
                    <Card className="shadow-2xl p-0 border-0 pt-0 bg-white">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg border-b px-8 py-6">
                        <CardTitle className="text-2xl">Withdrawal Impact</CardTitle>
                        <CardDescription className="text-base">Penalties and taxes breakdown</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        {earlyWithdrawalResults ? (
                          <div className="space-y-6">
                            <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-orange-100 to-red-100 border-orange-300">
                              <p className="text-lg mb-2 font-semibold text-orange-800">Net Amount You'll Receive:</p>
                              <p className="text-4xl font-bold mb-2 text-orange-700">
                                ${earlyWithdrawalResults.netAmount.toLocaleString()}
                              </p>
                              <p className="text-sm text-orange-600">
                                Effective Cost: {earlyWithdrawalResults.effectiveRate.toFixed(1)}%
                              </p>
                            </div>

                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">Cost Breakdown</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                  <span className="font-medium text-gray-700">Gross Withdrawal</span>
                                  <span className="font-bold text-green-600">
                                    ${earlyWithdrawalResults.grossAmount.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                  <span className="font-medium text-gray-700">Early Withdrawal Penalty (10%)</span>
                                  <span className="font-bold text-red-600">
                                    -${earlyWithdrawalResults.penalty.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                  <span className="font-medium text-gray-700">Federal Income Tax</span>
                                  <span className="font-bold text-red-600">
                                    -${earlyWithdrawalResults.federalTax.toLocaleString()}
                                  </span>
                                </div>
                                {earlyWithdrawalResults.stateTax > 0 && (
                                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                    <span className="font-medium text-gray-700">State Income Tax</span>
                                    <span className="font-bold text-red-600">
                                      -${earlyWithdrawalResults.stateTax.toLocaleString()}
                                    </span>
                                  </div>
                                )}
                                {earlyWithdrawalResults.localTax > 0 && (
                                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                    <span className="font-medium text-gray-700">Local/City Tax</span>
                                    <span className="font-bold text-red-600">
                                      -${earlyWithdrawalResults.localTax.toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Enter withdrawal details to see cost breakdown</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {activeTab === "optimizer" && (
                    <Card className="shadow-2xl border-0 p-0 bg-white">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                        <CardTitle className="text-2xl">Optimization Results</CardTitle>
                        <CardDescription className="text-base">Recommended contribution strategy</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        {optimizerResults ? (
                          <div className="space-y-6">
                            <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-blue-100 border-green-300">
                              <p className="text-lg mb-2 font-semibold text-green-800">
                                Recommended Contribution Rate:
                              </p>
                              <p className="text-4xl font-bold mb-2 text-green-700">
                                {optimizerResults.recommendedRate.toFixed(1)}%
                              </p>
                              <p className="text-sm text-green-600">
                                Maximum Employer Match: ${optimizerResults.maxEmployerMatch.toLocaleString()}
                              </p>
                            </div>

                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">Optimal Range</h3>
                              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-gray-700 mb-2">
                                  Contribute between <strong>{optimizerResults.optimalRateMin.toFixed(1)}%</strong> and{" "}
                                  <strong>{optimizerResults.optimalRateMax.toFixed(1)}%</strong> to maximize employer
                                  matching.
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h3 className="font-bold text-lg text-gray-900">Contribution Analysis</h3>
                              <div className="space-y-2 max-h-64 overflow-y-auto">
                                {optimizerResults.contributionLevels.slice(0, 15).map((level: any, index: number) => (
                                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium text-gray-700">
                                        {level.contributionRate.toFixed(1)}% Contribution
                                      </span>
                                      <span className="font-bold text-gray-900">
                                        ${level.employerMatch.toLocaleString()} Match
                                      </span>
                                    </div>
                                    <div className="text-xs text-gray-600 flex justify-between">
                                      <span>Your: ${level.employeeContribution.toLocaleString()}</span>
                                      <span>Total: ${level.totalContribution.toLocaleString()}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Enter your details to optimize employer matching</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How to Use */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How to Use the 401(k) Calculator</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <ol className="space-y-4 text-gray-700">
                      <li>
                        <strong>Enter Basic Information:</strong> Input your current age, planned retirement age,
                        current salary, and existing 401(k) balance
                      </li>
                      <li>
                        <strong>Set Contribution Rates:</strong> Enter your contribution percentage and your employer's
                        matching policy
                      </li>
                      <li>
                        <strong>Adjust Growth Assumptions:</strong> Set expected salary growth, investment returns, and
                        inflation rates
                      </li>
                      <li>
                        <strong>Review Projections:</strong> See your estimated retirement balance in both nominal and
                        inflation-adjusted dollars
                      </li>
                      <li>
                        <strong>Consider Early Withdrawal:</strong> Optionally calculate the impact of early withdrawals
                        with penalties and taxes
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Formulas & Calculation Logic</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Salary Progression</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        Salary(t) = Current Salary × (1 + Growth Rate)^(t-1)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. Employee Contribution</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        Employee Contribution = Contribution Rate × Salary (capped at $23,000 for 2024)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Employer Match</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        If Employee Rate ≤ Match Limit: Match = Match Rate × Salary
                        <br />
                        Else: Match = Match Rate × (Match Limit × Salary)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">4. Balance Growth</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        New Balance = (Previous Balance + Contributions) × (1 + Return Rate)
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">5. Early Withdrawal Penalty</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">
                        Net Amount = Withdrawal × (1 - Penalty Rate) × (1 - Tax Rates)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        What are the 2024 401(k) contribution limits?
                      </h3>
                      <p className="text-gray-700">
                        For 2024, the employee contribution limit is $23,000. If you're 50 or older, you can contribute
                        an additional $7,500 catch-up contribution. The total contribution limit (employee + employer)
                        is $69,000.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        How does employer matching work?
                      </h3>
                      <p className="text-gray-700">
                        Employer matching is typically a percentage of your salary, up to a certain limit. For example,
                        "50% match up to 6%" means your employer contributes 50 cents for every dollar you contribute,
                        up to 6% of your salary.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        What happens if I withdraw early?
                      </h3>
                      <p className="text-gray-700">
                        Withdrawals before age 59½ typically incur a 10% penalty plus regular income taxes. Some
                        exceptions exist for hardships, first-time home purchases, or higher education expenses.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        How accurate are these projections?
                      </h3>
                      <p className="text-gray-700">
                        These are estimates based on your inputs. Actual returns will vary due to market conditions,
                        changes in salary, contribution rates, and other factors. Use this as a planning tool, not a
                        guarantee.
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
