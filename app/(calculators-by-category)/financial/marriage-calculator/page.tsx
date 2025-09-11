"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Heart, DollarSign, Users, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

// 2025 Tax brackets
const TAX_BRACKETS_2025 = {
  single: [
    { min: 0, max: 11300, rate: 0.1 },
    { min: 11300, max: 45850, rate: 0.12 },
    { min: 45850, max: 98000, rate: 0.22 },
    { min: 98000, max: 186850, rate: 0.24 },
    { min: 186850, max: 237300, rate: 0.32 },
    { min: 237300, max: 593450, rate: 0.35 },
    { min: 593450, max: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  marriedJoint: [
    { min: 0, max: 22600, rate: 0.1 },
    { min: 22600, max: 91700, rate: 0.12 },
    { min: 91700, max: 196000, rate: 0.22 },
    { min: 196000, max: 373700, rate: 0.24 },
    { min: 373700, max: 474600, rate: 0.32 },
    { min: 474600, max: 712050, rate: 0.35 },
    { min: 712050, max: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
}

const STANDARD_DEDUCTIONS_2025 = {
  single: 14600,
  marriedJoint: 29200,
}

const SS_WAGE_BASE_2025 = 168600

const CAPITAL_GAINS_THRESHOLDS_2025 = {
  single: {
    tier1: 40000,
    tier2: 80000,
  },
  marriedJoint: {
    tier1: 80000,
    tier2: 160000,
  },
}

export default function MarriageTaxCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Unified input state for both spouses and shared fields
  const [inputs, setInputs] = useState({
    spouse1: {
      salary: "65000",
      businessIncome: "0",
      interest: "0",
      dividends: "0",
      rental: "0",
      royalty: "0",
      passive: "0",
      shortTermGain: "0",
      longTermGain: "0",
      qualifiedDividends: "0",
      retirement: "10000",
      filingStatus: "single",
      dependents: "0",
      itemizedDeductions: "0",
      useStandardDeduction: true,
      selfEmployed: false,
    },
    spouse2: {
      salary: "45000",
      businessIncome: "0",
      interest: "0",
      dividends: "0",
      rental: "0",
      royalty: "0",
      passive: "0",
      shortTermGain: "0",
      longTermGain: "0",
      qualifiedDividends: "0",
      retirement: "6000",
      filingStatus: "single",
      dependents: "0",
      itemizedDeductions: "0",
      useStandardDeduction: true,
      selfEmployed: false,
    },
    stateTaxRate: "5",
    taxYear: "2025",
  })

  type ResultType = {
    spouse1: {
      income: number
      retirement: number
      deduction: number
      taxableIncome: number
      federalTax: number
      marginalRate: number
      ssTax: number
      medicareTax: number
      stateTax: number
      takeHome: number
    }
    spouse2: {
      income: number
      retirement: number
      deduction: number
      taxableIncome: number
      federalTax: number
      marginalRate: number
      ssTax: number
      medicareTax: number
      stateTax: number
      takeHome: number
    }
    combined: {
      income: number
      federalTax: number
      ssTax: number
      medicareTax: number
      stateTax: number
      retirement: number
      takeHome: number
    }
    joint: {
      jointIncome: number
      jointRetirement: number
      jointDeduction: number
      jointTaxable: number
      federalTax: number
      marginalRate: number
      ssTax: number
      medicareTax: number
      stateTax: number
      takeHome: number
    }
    penaltyOrBenefit: number
    penaltyPercentage: number
  }

  const [results, setResults] = useState<ResultType | null>(null)

  const calculateSocialSecurityTax = (income: number) => {
    return Math.min(income, SS_WAGE_BASE_2025) * 0.062
  }

  const calculateMedicareTax = (income: number) => {
    return income * 0.0145
  }

  const calculateStateTax = (income: number, rate: number) => {
    return income * (rate / 100)
  }

  // Calculate tax for given income and brackets, and return both total tax and marginal rate
  const calculateTaxFromBrackets = (taxableIncome: number, brackets: any[]) => {
    let tax = 0
    let remainingIncome = taxableIncome
    let marginalRate = 0
    for (const bracket of brackets) {
      if (remainingIncome <= 0) break
      const taxableAtBracket = Math.min(remainingIncome, bracket.max - bracket.min)
      tax += taxableAtBracket * bracket.rate
      if (taxableAtBracket > 0) {
        marginalRate = bracket.rate
      }
      remainingIncome -= taxableAtBracket
    }
    return { tax, marginalRate }
  }

  // Calculate preferential tax on qualified dividends and LTCG
  const calculatePreferentialTax = (ordinaryTaxable: number, preferentialIncome: number, filingStatus: string) => {
    if (preferentialIncome <= 0) return 0

    const thresholds = CAPITAL_GAINS_THRESHOLDS_2025[filingStatus as keyof typeof CAPITAL_GAINS_THRESHOLDS_2025]
    const totalIncome = ordinaryTaxable + preferentialIncome

    // Calculate portions at each rate
    const at0Percent = Math.max(0, Math.min(preferentialIncome, thresholds.tier1 - ordinaryTaxable))
    const at15Percent = Math.max(
      0,
      Math.min(preferentialIncome - at0Percent, thresholds.tier2 - Math.max(ordinaryTaxable, thresholds.tier1)),
    )
    const at20Percent = Math.max(0, preferentialIncome - at0Percent - at15Percent)

    return at0Percent * 0 + at15Percent * 0.15 + at20Percent * 0.2
  }

  // Calculate self-employment tax
  const calculateSelfEmploymentTax = (businessIncome: number) => {
    if (businessIncome <= 0) return 0
    const seIncome = businessIncome * 0.9235
    const ssTaxableWageBase = SS_WAGE_BASE_2025
    return Math.min(seIncome, ssTaxableWageBase) * 0.124 + seIncome * 0.029
  }

  // Competitor-style: federal tax on (income - deduction - retirement), payroll/state on gross income
  const calculateIndividualTax = (
    income: number,
    retirement: number,
    itemizedDeductions: number,
    useStandardDeduction: boolean
  ) => {
    // Step 1: Deduction
    const standardDeduction = STANDARD_DEDUCTIONS_2025.single
    const deduction = useStandardDeduction ? standardDeduction : Math.max(standardDeduction, itemizedDeductions)
    // Step 2: Taxable income (income - deduction - retirement)
    const taxableIncome = Math.max(0, income - deduction - retirement)
    // Step 3: Federal tax
    const { tax: federalTax, marginalRate } = calculateTaxFromBrackets(taxableIncome, TAX_BRACKETS_2025.single)
    // Step 4: Payroll taxes (on gross income)
    const ssTax = calculateSocialSecurityTax(income)
    const medicareTax = calculateMedicareTax(income)
    // Step 5: State tax (on gross income)
  const stateTax = calculateStateTax(income, Number.parseFloat(inputs.stateTaxRate))
    // Step 6: Take home
    const takeHome = income - retirement - federalTax - ssTax - medicareTax - stateTax
    return {
      income,
      retirement,
      deduction,
      taxableIncome,
      federalTax,
      marginalRate,
      ssTax,
      medicareTax,
      stateTax,
      takeHome,
    }
  }

  // Competitor-style: joint federal tax on (income1+income2 - deduction - retirement1 - retirement2), payroll/state on gross joint income
  const calculateJointTax = (
    income1: number,
    income2: number,
    retirement1: number,
    retirement2: number,
    itemizedDeductions1: number,
    itemizedDeductions2: number,
    useStandardDeduction1: boolean,
    useStandardDeduction2: boolean
  ) => {
    const jointIncome = income1 + income2
    const jointRetirement = retirement1 + retirement2
    const standardDeduction = STANDARD_DEDUCTIONS_2025.marriedJoint
    const jointItemized = (useStandardDeduction1 ? 0 : itemizedDeductions1) + (useStandardDeduction2 ? 0 : itemizedDeductions2)
    const jointDeduction = Math.max(standardDeduction, jointItemized)
    const jointTaxable = Math.max(0, jointIncome - jointDeduction - jointRetirement)
    const { tax: federalTax, marginalRate } = calculateTaxFromBrackets(jointTaxable, TAX_BRACKETS_2025.marriedJoint)
    const ssTax = calculateSocialSecurityTax(income1) + calculateSocialSecurityTax(income2)
    const medicareTax = calculateMedicareTax(income1) + calculateMedicareTax(income2)
  const stateTax = calculateStateTax(jointIncome, Number.parseFloat(inputs.stateTaxRate))
    const takeHome = jointIncome - jointRetirement - federalTax - ssTax - medicareTax - stateTax
    return {
      jointIncome,
      jointRetirement,
      jointDeduction,
      jointTaxable,
      federalTax,
      marginalRate,
      ssTax,
      medicareTax,
      stateTax,
      takeHome,
    }
  }

  const calculateMarriageTax = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)
  const w1 = Number.parseFloat(inputs.spouse1.salary)
  const w2 = Number.parseFloat(inputs.spouse2.salary)
  const r1 = Number.parseFloat(inputs.spouse1.retirement)
  const r2 = Number.parseFloat(inputs.spouse2.retirement)
  const d1 = Number.parseFloat(inputs.spouse1.itemizedDeductions)
  const d2 = Number.parseFloat(inputs.spouse2.itemizedDeductions)
  // Individual
  const spouse1Result = calculateIndividualTax(w1, r1, d1, inputs.spouse1.useStandardDeduction)
  const spouse2Result = calculateIndividualTax(w2, r2, d2, inputs.spouse2.useStandardDeduction)
  // Joint
  const jointResult = calculateJointTax(w1, w2, r1, r2, d1, d2, inputs.spouse1.useStandardDeduction, inputs.spouse2.useStandardDeduction)
    // Penalty/Benefit
    const totalIndividualFederalTax = spouse1Result.federalTax + spouse2Result.federalTax
    const penaltyOrBenefit = totalIndividualFederalTax - jointResult.federalTax
    const penaltyPercentage = (penaltyOrBenefit / jointResult.jointIncome) * 100
    setResults({
      spouse1: spouse1Result,
      spouse2: spouse2Result,
      combined: {
        income: spouse1Result.income + spouse2Result.income,
        federalTax: totalIndividualFederalTax,
        ssTax: spouse1Result.ssTax + spouse2Result.ssTax,
        medicareTax: spouse1Result.medicareTax + spouse2Result.medicareTax,
        stateTax: spouse1Result.stateTax + spouse2Result.stateTax,
        retirement: spouse1Result.retirement + spouse2Result.retirement,
        takeHome: spouse1Result.takeHome + spouse2Result.takeHome,
      },
      joint: jointResult,
      penaltyOrBenefit,
      penaltyPercentage,
    })
  }

  return (
    <>
      <SEO
        title="Marriage Tax Calculator 2025 – Marriage Penalty or Benefit Calculator"
        description="Calculate whether marriage will result in a tax penalty or benefit. Compare taxes filing individually vs married filing jointly for 2025."
        keywords="marriage tax calculator, marriage penalty, marriage tax benefit, married filing jointly, tax calculator 2025"
        slug="/financial/marriage-tax-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Marriage Tax Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-pink-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/financial" className="text-gray-500 hover:text-pink-600">
                Financial Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Marriage Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Marriage Tax Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                This calculator compares the taxes each spouse pays while filing individually versus as a married couple
                filing jointly. It shows whether marriage leads to a tax penalty or tax benefit.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-pink-600" />
                    <span>Marriage Tax Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900">State + City Tax Rate (%)</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={inputs.stateTaxRate}
                        onChange={e => setInputs(i => ({ ...i, stateTaxRate: e.target.value }))}
                        className="h-12 text-lg border-2 focus:border-pink-500"
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Spouse 1 */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-pink-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Spouse 1 Income</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Salary / Business Income</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse1.salary}
                            onChange={e => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, salary: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Interest + Dividend Income</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse1.interest}
                            onChange={e => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, interest: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Passive Income</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse1.passive}
                            onChange={e => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, passive: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Short-Term Capital Gains</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse1.shortTermGain}
                            onChange={e => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, shortTermGain: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Long-Term Capital Gains</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse1.longTermGain}
                            onChange={e => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, longTermGain: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Qualified Dividends</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse1.qualifiedDividends}
                            onChange={e => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, qualifiedDividends: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-base font-semibold text-gray-900">401K, IRA... Savings</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse1.retirement}
                            onChange={e => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, retirement: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>
                    </div>


                          // Updated tax calculation functions
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="standard1"
                          checked={inputs.spouse1.useStandardDeduction}
                          onCheckedChange={val => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, useStandardDeduction: val === true } }))}
                        />
                        <Label htmlFor="standard1" className="text-base font-semibold text-gray-900">
                          Use Standard Deduction ($14,600)
                        </Label>
                      </div>

                      {!inputs.spouse1.useStandardDeduction && (
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Itemized Deductions</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              value={inputs.spouse1.itemizedDeductions}
                              onChange={e => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, itemizedDeductions: e.target.value } }))}
                              className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox id="se1" checked={inputs.spouse1.selfEmployed} onCheckedChange={val => setInputs(i => ({ ...i, spouse1: { ...i.spouse1, selfEmployed: val === true } }))} />
                        <Label htmlFor="se1" className="text-base font-semibold text-gray-900">
                          Self-employed?
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Spouse 2 */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-pink-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Spouse 2 Income</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Salary / Business Income</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse2.salary}
                            onChange={e => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, salary: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Interest + Dividend Income</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse2.interest}
                            onChange={e => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, interest: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Passive Income</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse2.passive}
                            onChange={e => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, passive: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Short-Term Capital Gains</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse2.shortTermGain}
                            onChange={e => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, shortTermGain: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Long-Term Capital Gains</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse2.longTermGain}
                            onChange={e => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, longTermGain: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Qualified Dividends</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse2.qualifiedDividends}
                            onChange={e => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, qualifiedDividends: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-base font-semibold text-gray-900">401K, IRA... Savings</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={inputs.spouse2.retirement}
                            onChange={e => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, retirement: e.target.value } }))}
                            className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="standard2"
                          checked={inputs.spouse2.useStandardDeduction}
                          onCheckedChange={val => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, useStandardDeduction: val === true } }))}
                        />
                        <Label htmlFor="standard2" className="text-base font-semibold text-gray-900">
                          Use Standard Deduction ($14,600)
                        </Label>
                      </div>

                      {!inputs.spouse2.useStandardDeduction && (
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">Itemized Deductions</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              value={inputs.spouse2.itemizedDeductions}
                              onChange={e => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, itemizedDeductions: e.target.value } }))}
                              className="pl-10 h-12 text-lg border-2 focus:border-pink-500"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox id="se2" checked={inputs.spouse2.selfEmployed} onCheckedChange={val => setInputs(i => ({ ...i, spouse2: { ...i.spouse2, selfEmployed: val === true } }))} />
                        <Label htmlFor="se2" className="text-base font-semibold text-gray-900">
                          Self-employed?
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={calculateMarriageTax}
                    className="w-full h-14 text-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Marriage Tax Impact
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Marriage Tax Results</CardTitle>
                  <CardDescription className="text-base">Tax penalty or benefit analysis</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Marriage Penalty/Benefit */}
                      <div
                        className={`text-center p-6 rounded-2xl border-2 ${
                          results.penaltyOrBenefit >= 0
                            ? "bg-gradient-to-r from-green-100 to-green-200 border-green-300"
                            : "bg-gradient-to-r from-red-100 to-red-200 border-red-300"
                        }`}
                      >
                        <p
                          className={`text-lg mb-2 font-semibold ${
                            results.penaltyOrBenefit >= 0 ? "text-green-800" : "text-red-800"
                          }`}
                        >
                          {results.penaltyOrBenefit >= 0 ? "Marriage Tax Benefit:" : "Marriage Tax Penalty:"}
                        </p>
                        <p
                          className={`text-4xl font-bold mb-2 ${
                            results.penaltyOrBenefit >= 0 ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          $
                          {Math.abs(results.penaltyOrBenefit).toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </p>
                        <p className={`text-lg ${results.penaltyOrBenefit >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {Math.abs(results.penaltyPercentage).toFixed(2)}% of total income
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">Detailed Tax Breakdown</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Category</th>
                                <th className="text-right py-2">Spouse 1</th>
                                <th className="text-right py-2">Spouse 2</th>
                                <th className="text-right py-2">Combined (Not Married)</th>
                                <th className="text-right py-2">Joint (Married)</th>
                              </tr>
                            </thead>
                            <tbody className="space-y-1">
                              <tr className="border-b">
                                <td className="py-2 font-medium">Income</td>
                                <td className="text-right py-2">${results.spouse1.income.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.income.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.income.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.jointIncome.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">Federal Tax</td>
                                <td className="text-right py-2">${results.spouse1.federalTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.federalTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.federalTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.federalTax.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">Marginal Rate</td>
                                <td className="text-right py-2">{(results.spouse1.marginalRate * 100).toFixed(0)}%</td>
                                <td className="text-right py-2">{(results.spouse2.marginalRate * 100).toFixed(0)}%</td>
                                <td className="text-right py-2">-</td>
                                <td className="text-right py-2">{(results.joint.marginalRate * 100).toFixed(0)}%</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">Social Security Tax</td>
                                <td className="text-right py-2">${results.spouse1.ssTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.ssTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.ssTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.ssTax.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">Medicare Tax</td>
                                <td className="text-right py-2">${results.spouse1.medicareTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.medicareTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.medicareTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.medicareTax.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">State+City Tax</td>
                                <td className="text-right py-2">${results.spouse1.stateTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.stateTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.stateTax.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.stateTax.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 font-medium">401k, IRA...</td>
                                <td className="text-right py-2">${results.spouse1.retirement.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.spouse2.retirement.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.combined.retirement.toLocaleString("en-US")}</td>
                                <td className="text-right py-2">${results.joint.jointRetirement.toLocaleString("en-US")}</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="py-2 font-bold">Final Take Home</td>
                                <td className="text-right py-2 font-bold">${results.spouse1.takeHome.toLocaleString("en-US")}</td>
                                <td className="text-right py-2 font-bold">${results.spouse2.takeHome.toLocaleString("en-US")}</td>
                                <td className="text-right py-2 font-bold">${results.combined.takeHome.toLocaleString("en-US")}</td>
                                <td className="text-right py-2 font-bold">${results.joint.takeHome.toLocaleString("en-US")}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter both spouses' information to see your marriage tax impact</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Formulas */}
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Formulas & Calculation Details</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">1. Individual Income Calculation</h3>
                      <p className="text-gray-700 mb-2">
                        Total Income = Wages + Interest + Passive + STCG + LTCG + Qualified Dividends
                      </p>
                      <p className="text-gray-700">
                        Taxable Income = Total Income - Deductions - Self-Employment Tax Deduction
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2. Joint Income Calculation</h3>
                      <p className="text-gray-700 mb-2">Joint Income = Spouse 1 Total Income + Spouse 2 Total Income</p>
                      <p className="text-gray-700">
                        Joint Taxable = Joint Income - Joint Deductions - Combined SE Tax Deduction
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3. Marriage Penalty/Benefit</h3>
                      <p className="text-gray-700 mb-2">
                        Penalty/Benefit = (Individual Tax 1 + Individual Tax 2) - Joint Tax
                      </p>
                      <p className="text-gray-700">
                        Positive result = Marriage Benefit | Negative result = Marriage Penalty
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">4. Percentage Impact</h3>
                      <p className="text-gray-700">Marriage Impact % = (Penalty or Benefit ÷ Joint Income) × 100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-pink-600" />
                        What causes a marriage penalty?
                      </h3>
                      <p className="text-gray-700">
                        Marriage penalties typically occur when both spouses have similar high incomes, pushing them
                        into higher tax brackets when filing jointly compared to filing separately.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-pink-600" />
                        What causes a marriage benefit?
                      </h3>
                      <p className="text-gray-700">
                        Marriage benefits often occur when spouses have significantly different incomes, allowing the
                        higher earner's income to be partially taxed at the lower earner's lower rates.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-pink-600" />
                        Should we file jointly or separately?
                      </h3>
                      <p className="text-gray-700">
                        Most couples benefit from filing jointly, but this calculator helps you determine the optimal
                        strategy. Consider other factors like eligibility for certain credits and deductions.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-pink-600" />
                        How accurate are these calculations?
                      </h3>
                      <p className="text-gray-700">
                        This calculator provides estimates based on 2025 tax brackets and standard deductions. Actual
                        taxes may vary based on additional factors like AMT, phase-outs, and specific credits.
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
