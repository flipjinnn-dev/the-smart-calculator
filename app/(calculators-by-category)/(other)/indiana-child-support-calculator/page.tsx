"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Users, DollarSign, Calendar, HelpCircle, Download, Printer } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

interface ChildSupportResults {
  combinedIncome: number
  basicObligation: number
  totalObligation: number
  parentAShare: number
  parentBShare: number
  parentASupport: number
  parentBSupport: number
  weeklyPayment: number
  payingParent: string
  receivingParent: string
  parentingTimeCredit: number
}

// Indiana Child Support Guideline Table (simplified version)
const INDIANA_GUIDELINE_TABLE: Record<number, Record<number, number>> = {
  1: {
    100: 23,
    200: 46,
    300: 69,
    400: 92,
    500: 115,
    600: 138,
    700: 161,
    800: 184,
    900: 207,
    1000: 230,
    1200: 276,
    1400: 322,
    1600: 368,
    1800: 414,
    2000: 460,
  },
  2: {
    100: 37,
    200: 74,
    300: 111,
    400: 148,
    500: 185,
    600: 222,
    700: 259,
    800: 296,
    900: 333,
    1000: 370,
    1200: 444,
    1400: 518,
    1600: 592,
    1800: 666,
    2000: 740,
  },
  3: {
    100: 43,
    200: 86,
    300: 129,
    400: 172,
    500: 215,
    600: 258,
    700: 301,
    800: 344,
    900: 387,
    1000: 430,
    1200: 516,
    1400: 602,
    1600: 688,
    1800: 774,
    2000: 860,
  },
  4: {
    100: 49,
    200: 98,
    300: 147,
    400: 196,
    500: 245,
    600: 294,
    700: 343,
    800: 392,
    900: 441,
    1000: 490,
    1200: 588,
    1400: 686,
    1600: 784,
    1800: 882,
    2000: 980,
  },
  5: {
    100: 55,
    200: 110,
    300: 165,
    400: 220,
    500: 275,
    600: 330,
    700: 385,
    800: 440,
    900: 495,
    1000: 550,
    1200: 660,
    1400: 770,
    1600: 880,
    1800: 990,
    2000: 1100,
  },
}

export default function IndianaChildSupportCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Input states
  const [numberOfChildren, setNumberOfChildren] = useState("1")
  const [parentAIncome, setParentAIncome] = useState("800")
  const [parentBIncome, setParentBIncome] = useState("600")
  const [parentAPriorSupport, setParentAPriorSupport] = useState("0")
  const [parentBPriorSupport, setParentBPriorSupport] = useState("0")
  const [parentAOvernights, setParentAOvernights] = useState("261") // default: 261 (custodial)
  const [parentBOvernights, setParentBOvernights] = useState("104") // default: 104 (noncustodial)
  const [parentAChildCare, setParentAChildCare] = useState("0")
  const [parentBChildCare, setParentBChildCare] = useState("100")
  const [parentAHealthIns, setParentAHealthIns] = useState("0")
  const [parentBHealthIns, setParentBHealthIns] = useState("50")
  const [parentAEducation, setParentAEducation] = useState("0")
  const [parentBEducation, setParentBEducation] = useState("0")
  const [otherExpenses, setOtherExpenses] = useState("0")
  const [custodialParent, setCustodialParent] = useState("parent-a")

  const [results, setResults] = useState<ChildSupportResults | null>(null)

  const calculateChildSupport = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    const numChildren = Number.parseInt(numberOfChildren)
    // Subtract prior support obligations from each parent's income
    const incomeA = Number.parseFloat(parentAIncome) - Number.parseFloat(parentAPriorSupport)
    const incomeB = Number.parseFloat(parentBIncome) - Number.parseFloat(parentBPriorSupport)
    const overnightsA = Number.parseFloat(parentAOvernights)
    const overnightsB = Number.parseFloat(parentBOvernights)
    const childCareA = Number.parseFloat(parentAChildCare)
    const childCareB = Number.parseFloat(parentBChildCare)
    const healthInsA = Number.parseFloat(parentAHealthIns)
    const healthInsB = Number.parseFloat(parentBHealthIns)
    const educationA = Number.parseFloat(parentAEducation)
    const educationB = Number.parseFloat(parentBEducation)
    const otherExp = Number.parseFloat(otherExpenses)

    // Step 1: Calculate Combined Adjusted Gross Income
    const combinedIncome = incomeA + incomeB

    // Step 2: Basic Child Support Obligation from guideline table
    const basicObligation = getBasicObligation(combinedIncome, numChildren)

    // Step 3: Add additional expenses (sum both parents' child care, health insurance, education, and other)
    const totalChildCare = childCareA + childCareB
    const totalHealthIns = healthInsA + healthInsB
    const totalEducation = educationA + educationB
    const totalObligation = basicObligation + totalChildCare + totalHealthIns + totalEducation + otherExp

    // Step 4: Calculate each parent's income share
    const parentAShare = incomeA / combinedIncome
    const parentBShare = incomeB / combinedIncome

    // Step 5: Calculate each parent's support portion
    const parentASupport = totalObligation * parentAShare
    const parentBSupport = totalObligation * parentBShare

    // Step 6: Apply parenting time credit (for each parent)
    // Indiana typically applies credit to the noncustodial parent
    // We'll use Parent B as noncustodial by default, but base on overnights
    // The parent with fewer overnights is noncustodial
    let noncustodialParent = "parent-b"
    let noncustodialSupport = parentBSupport
    let payingParent = "Parent B"
    let receivingParent = "Parent A"
    let noncustodialOvernights = overnightsB
    if (overnightsA < overnightsB) {
      noncustodialParent = "parent-a"
      noncustodialSupport = parentASupport
      payingParent = "Parent A"
      receivingParent = "Parent B"
      noncustodialOvernights = overnightsA
    }

    const parentingTimeCredit = calculateParentingTimeCredit(noncustodialOvernights, totalObligation)
    const adjustedSupport = Math.max(0, noncustodialSupport - parentingTimeCredit)
    const weeklyPayment = Math.round(adjustedSupport)

    setResults({
      combinedIncome,
      basicObligation,
      totalObligation,
      parentAShare: parentAShare * 100,
      parentBShare: parentBShare * 100,
      parentASupport,
      parentBSupport,
      weeklyPayment,
      payingParent,
      receivingParent,
      parentingTimeCredit,
    })
  }

  const getBasicObligation = (combinedIncome: number, children: number): number => {
    const table = INDIANA_GUIDELINE_TABLE[children] || INDIANA_GUIDELINE_TABLE[1]

    // Find the closest income bracket
    const incomes = Object.keys(table)
      .map(Number)
      .sort((a, b) => a - b)

    if (combinedIncome <= incomes[0]) {
      return table[incomes[0]]
    }

    if (combinedIncome >= incomes[incomes.length - 1]) {
      // For higher incomes, extrapolate
      const highestIncome = incomes[incomes.length - 1]
      const highestObligation = table[highestIncome]
      const ratio = highestObligation / highestIncome
      return Math.round(combinedIncome * ratio)
    }

    // Interpolate between brackets
    for (let i = 0; i < incomes.length - 1; i++) {
      if (combinedIncome >= incomes[i] && combinedIncome <= incomes[i + 1]) {
        const lowerIncome = incomes[i]
        const upperIncome = incomes[i + 1]
        const lowerObligation = table[lowerIncome]
        const upperObligation = table[upperIncome]

        const ratio = (combinedIncome - lowerIncome) / (upperIncome - lowerIncome)
        return Math.round(lowerObligation + (upperObligation - lowerObligation) * ratio)
      }
    }

    return table[500] // fallback
  }

  const calculateParentingTimeCredit = (overnights: number, totalObligation: number): number => {
    // Indiana parenting time credit applies when noncustodial parent has 128+ overnights
    if (overnights >= 128) {
      const percentage = Math.min(overnights / 365, 0.5) // Max 50% credit
      return totalObligation * percentage * 0.5 // 50% of the proportional share
    }
    return 0
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const printResults = () => {
    if (!results) return;
    const resultsCard = resultsRef.current;
    if (resultsCard) {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Indiana Child Support Results</title>
              <style>
                body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; padding: 2rem; }
                .results-card { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 1rem; box-shadow: 0 2px 8px #0001; padding: 2rem; }
                .results-card h2 { color: #2563eb; }
                .results-card .main { background: linear-gradient(to right, #bbf7d0, #a7f3d0); border: 2px solid #86efac; border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem; text-align: center; }
                .results-card .main .amount { font-size: 2.5rem; font-weight: bold; color: #15803d; }
                .results-card .main .desc { color: #166534; }
                .results-card .breakdown { margin-bottom: 1.5rem; }
                .results-card .breakdown div { display: flex; justify-content: space-between; padding: 0.5rem 0; }
                .results-card .shares { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
                .results-card .share { flex: 1; background: #f1f5f9; border-radius: 0.5rem; padding: 1rem; text-align: center; }
                .results-card .credit { background: #fef9c3; border: 1px solid #fde68a; border-radius: 0.5rem; padding: 0.75rem; margin-bottom: 1.5rem; text-align: right; }
                .results-card .disclaimer { background: #fef9c3; border: 1px solid #fde68a; border-radius: 0.5rem; padding: 0.75rem; font-size: 0.95rem; color: #92400e; }
              </style>
            </head>
            <body>
              <div class="results-card">
                <h2>Indiana Child Support Results</h2>
                <div class="main">
                  <div class="amount">${formatCurrency(results.weeklyPayment)}</div>
                  <div class="desc">${results.payingParent} must pay ${results.receivingParent}</div>
                </div>
                <div class="breakdown">
                  <div><span>Combined Adjusted Gross Income</span><span>${formatCurrency(results.combinedIncome)}</span></div>
                  <div><span>Basic Child Support Obligation</span><span>${formatCurrency(results.basicObligation)}</span></div>
                  <div><span>Total Obligation (with additions)</span><span>${formatCurrency(results.totalObligation)}</span></div>
                </div>
                <div class="shares">
                  <div class="share">
                    <div>Parent A Share</div>
                    <div><strong>${results.parentAShare.toFixed(1)}%</strong></div>
                    <div>${formatCurrency(results.parentASupport)}</div>
                  </div>
                  <div class="share">
                    <div>Parent B Share</div>
                    <div><strong>${results.parentBShare.toFixed(1)}%</strong></div>
                    <div>${formatCurrency(results.parentBSupport)}</div>
                  </div>
                </div>
                ${results.parentingTimeCredit > 0 ? `<div class="credit">Parenting Time Credit: -${formatCurrency(results.parentingTimeCredit)}</div>` : ''}
                <div class="disclaimer"><strong>Disclaimer:</strong> This calculator is for educational purposes only. For legal advice, consult a family law attorney.</div>
              </div>
              <script>window.onload = function() { window.print(); }<\/script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  }

  const exportToPDF = () => {
    // Simple implementation - in a real app, you'd use a PDF library
    const printWindow = window.open("", "_blank")
    if (printWindow && results) {
      printWindow.document.write(`
        <html>
          <head><title>Indiana Child Support Calculation</title></head>
          <body>
            <h1>Indiana Child Support Calculation Results</h1>
            <p><strong>Combined Income:</strong> ${formatCurrency(results.combinedIncome)}</p>
            <p><strong>Basic Obligation:</strong> ${formatCurrency(results.basicObligation)}</p>
            <p><strong>Total Obligation:</strong> ${formatCurrency(results.totalObligation)}</p>
            <p><strong>Weekly Payment:</strong> ${formatCurrency(results.weeklyPayment)}</p>
            <p><strong>Payment Direction:</strong> ${results.payingParent} pays ${results.receivingParent}</p>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <>
      <SEO
        title="Indiana Child Support Calculator – Estimate Payments Online"
        description="Free Indiana Child Support Calculator. Estimate weekly child support payments based on income, custody, health insurance, child care, and Indiana parenting time credit guidelines."
        keywords="Indiana child support calculator, child support payments, Indiana guidelines, parenting time credit, custody calculator"
        slug="/family/indiana-child-support-calculator"
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
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Indiana Child Support Calculator</p>
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
              <Link href="/other-calculators" className="text-gray-500 hover:text-blue-600">
               Other Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Indiana Child Support Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
                Indiana Child Support Calculator
              </h1>
              <h2 className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty mb-4">
                Estimate Weekly Payments Under Indiana Guidelines
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty">
                Calculate child support obligations based on Indiana state guidelines, including parenting time credits
                and additional expenses.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt- p-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>Child Support Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Family Information</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Number of Children</Label>
                        <Select value={numberOfChildren} onValueChange={setNumberOfChildren}>
                          <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Child</SelectItem>
                            <SelectItem value="2">2 Children</SelectItem>
                            <SelectItem value="3">3 Children</SelectItem>
                            <SelectItem value="4">4 Children</SelectItem>
                            <SelectItem value="5">5+ Children</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Custodial Parent</Label>
                        <Select value={custodialParent} onValueChange={setCustodialParent}>
                          <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="parent-a">Parent A</SelectItem>
                            <SelectItem value="parent-b">Parent B</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Income Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Weekly Income</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Parent A Weekly Income</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={parentAIncome}
                            onChange={(e) => setParentAIncome(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            placeholder="800"
                          />
                        </div>
                        <Label className="text-base font-semibold text-gray-900 mt-2">Parent A Prior Child/Spousal Support</Label>
                        <Input
                          type="number"
                          value={parentAPriorSupport}
                          onChange={(e) => setParentAPriorSupport(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Parent B Weekly Income</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            value={parentBIncome}
                            onChange={(e) => setParentBIncome(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                            placeholder="600"
                          />
                        </div>
                        <Label className="text-base font-semibold text-gray-900 mt-2">Parent B Prior Child/Spousal Support</Label>
                        <Input
                          type="number"
                          value={parentBPriorSupport}
                          onChange={(e) => setParentBPriorSupport(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Custody & Expenses */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Custody & Expenses</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Parent A Overnights/Year</Label>
                        <Input
                          type="number"
                          value={parentAOvernights}
                          onChange={(e) => setParentAOvernights(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="261"
                        />
                        <Label className="text-base font-semibold text-gray-900 mt-2">Parent A Child Care (Weekly)</Label>
                        <Input
                          type="number"
                          value={parentAChildCare}
                          onChange={(e) => setParentAChildCare(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="0"
                        />
                        <Label className="text-base font-semibold text-gray-900 mt-2">Parent A Health Insurance (Weekly)</Label>
                        <Input
                          type="number"
                          value={parentAHealthIns}
                          onChange={(e) => setParentAHealthIns(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="0"
                        />
                        <Label className="text-base font-semibold text-gray-900 mt-2">Parent A Education Expenses (Weekly)</Label>
                        <Input
                          type="number"
                          value={parentAEducation}
                          onChange={(e) => setParentAEducation(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Parent B Overnights/Year</Label>
                        <Input
                          type="number"
                          value={parentBOvernights}
                          onChange={(e) => setParentBOvernights(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="104"
                        />
                        <Label className="text-base font-semibold text-gray-900 mt-2">Parent B Child Care (Weekly)</Label>
                        <Input
                          type="number"
                          value={parentBChildCare}
                          onChange={(e) => setParentBChildCare(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="100"
                        />
                        <Label className="text-base font-semibold text-gray-900 mt-2">Parent B Health Insurance (Weekly)</Label>
                        <Input
                          type="number"
                          value={parentBHealthIns}
                          onChange={(e) => setParentBHealthIns(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="50"
                        />
                        <Label className="text-base font-semibold text-gray-900 mt-2">Parent B Education Expenses (Weekly)</Label>
                        <Input
                          type="number"
                          value={parentBEducation}
                          onChange={(e) => setParentBEducation(e.target.value)}
                          className="h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="space-y-3 mt-4">
                      <Label className="text-base font-semibold text-gray-900">Other Extraordinary Expenses (Weekly)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          value={otherExpenses}
                          onChange={(e) => setOtherExpenses(e.target.value)}
                          className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={calculateChildSupport}
                    className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-12"
                  >
                    Calculate Child Support
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Child Support Results</CardTitle>
                  <CardDescription className="text-base">Indiana guideline calculation breakdown</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-6">
                      {/* Main Result */}
                      <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                        <p className="text-lg mb-2 font-semibold text-green-800">Weekly Child Support Payment:</p>
                        <p className="text-4xl font-bold mb-2 text-green-700">
                          {formatCurrency(results.weeklyPayment)}
                        </p>
                        <p className="text-base text-green-600">
                          {results.payingParent} must pay {results.receivingParent}
                        </p>
                      </div>

                      {/* Calculation Breakdown */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-900">Calculation Breakdown</h3>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-700">Combined Adjusted Gross Income</span>
                            <span className="font-bold text-blue-600">{formatCurrency(results.combinedIncome)}</span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">Basic Child Support Obligation</span>
                            <span className="font-bold text-purple-600">{formatCurrency(results.basicObligation)}</span>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <span className="font-medium text-gray-700">Total Obligation (with additions)</span>
                            <span className="font-bold text-orange-600">{formatCurrency(results.totalObligation)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg border">
                            <p className="text-sm text-gray-600">Parent A Share</p>
                            <p className="text-lg font-bold text-gray-800">{results.parentAShare.toFixed(1)}%</p>
                            <p className="text-sm text-gray-600">{formatCurrency(results.parentASupport)}</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg border">
                            <p className="text-sm text-gray-600">Parent B Share</p>
                            <p className="text-lg font-bold text-gray-800">{results.parentBShare.toFixed(1)}%</p>
                            <p className="text-sm text-gray-600">{formatCurrency(results.parentBSupport)}</p>
                          </div>
                        </div>

                        {results.parentingTimeCredit > 0 && (
                          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <span className="font-medium text-gray-700">Parenting Time Credit Applied</span>
                            <span className="font-bold text-yellow-600">
                              -{formatCurrency(results.parentingTimeCredit)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Button onClick={printResults} variant="outline" className="flex-1 bg-transparent">
                          <Printer className="w-4 h-4 mr-2" />
                          Print
                        </Button>
                        <Button onClick={exportToPDF} variant="outline" className="flex-1 bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Export PDF
                        </Button>
                      </div>

                      {/* Disclaimer */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Disclaimer:</strong> This calculator is for educational purposes only. For legal
                          advice, consult a family law attorney.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter family information to calculate child support</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Mobile Results Card */}
            <div className="lg:hidden mt-8">
              {results && (
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-6 py-4">
                    <CardTitle className="text-xl">Child Support Results</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center p-6 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300 mb-4">
                      <p className="text-lg mb-2 font-semibold text-green-800">Weekly Payment:</p>
                      <p className="text-3xl font-bold mb-2 text-green-700">{formatCurrency(results.weeklyPayment)}</p>
                      <p className="text-sm text-green-600">
                        {results.payingParent} pays {results.receivingParent}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* How Child Support is Calculated */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">How Child Support is Calculated in Indiana</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <ol className="space-y-4 text-gray-700">
                      <li>
                        <strong>Determine Combined Income:</strong> Add both parents' adjusted gross weekly income
                      </li>
                      <li>
                        <strong>Find Basic Obligation:</strong> Use Indiana Child Support Guidelines table based on
                        combined income and number of children
                      </li>
                      <li>
                        <strong>Add Expenses:</strong> Include child care, health insurance, and extraordinary expenses
                      </li>
                      <li>
                        <strong>Calculate Shares:</strong> Each parent's obligation is proportional to their income
                        share
                      </li>
                      <li>
                        <strong>Apply Credits:</strong> Parenting time credit may reduce the noncustodial parent's
                        obligation
                      </li>
                      <li>
                        <strong>Determine Payment:</strong> The noncustodial parent pays their share to the custodial
                        parent
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Parenting Time Credit Rules */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Indiana Parenting Time Credit Rules</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Indiana provides parenting time credits to noncustodial parents who have significant overnight
                      parenting time:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li>
                        • <strong>128+ overnights per year:</strong> Eligible for parenting time credit
                      </li>
                      <li>
                        • <strong>Credit calculation:</strong> Based on percentage of overnights and total obligation
                      </li>
                      <li>
                        • <strong>Maximum credit:</strong> 50% of the proportional share
                      </li>
                      <li>
                        • <strong>Standard visitation:</strong> Every other weekend (104 overnights) typically doesn't
                        qualify
                      </li>
                    </ul>
                    <p className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <strong>Note:</strong> Extended parenting time arrangements may significantly reduce child support
                      obligations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Indiana Child Support Chart */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Indiana Child Support Chart (Sample)</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left">Combined Weekly Income</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">1 Child</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">2 Children</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">3 Children</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">4 Children</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">5+ Children</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000].map((income) => (
                          <tr key={income}>
                            <td className="border border-gray-300 px-4 py-2 font-medium">${income}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              ${INDIANA_GUIDELINE_TABLE[1][income] || "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              ${INDIANA_GUIDELINE_TABLE[2][income] || "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              ${INDIANA_GUIDELINE_TABLE[3][income] || "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              ${INDIANA_GUIDELINE_TABLE[4][income] || "N/A"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              ${INDIANA_GUIDELINE_TABLE[5][income] || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    This is a simplified version of the Indiana Child Support Guidelines. The complete table includes
                    additional income brackets and specific provisions.
                  </p>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        How accurate is the Indiana calculator?
                      </h3>
                      <p className="text-gray-700">
                        This calculator uses the official Indiana Child Support Guidelines and provides estimates based
                        on the information entered. Actual court orders may vary based on specific circumstances and
                        judicial discretion.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        What expenses count toward child support?
                      </h3>
                      <p className="text-gray-700">
                        Indiana guidelines include basic support plus additional expenses like child care, health
                        insurance premiums for children, and extraordinary medical or educational expenses. Regular
                        clothing, food, and housing are covered by basic support.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        Does overtime count as income in Indiana child support?
                      </h3>
                      <p className="text-gray-700">
                        Yes, overtime income is typically included in gross income calculations. However, if overtime is
                        irregular or voluntary, courts may use discretion in how it's calculated. Consistent overtime
                        over 12+ months is usually included.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        When can child support be modified in Indiana?
                      </h3>
                      <p className="text-gray-700">
                        Child support can be modified when there's a substantial and continuing change in circumstances,
                        such as significant income changes, changes in custody arrangements, or changes in the child's
                        needs. Generally, a 20% change in support amount is considered substantial.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                        What if combined income is very low or very high?
                      </h3>
                      <p className="text-gray-700">
                        For combined income below $100/week, courts have discretion to set appropriate support. For
                        income above the guidelines, courts may extrapolate using the highest income bracket or consider
                        the child's actual needs and the parents' ability to pay.
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
