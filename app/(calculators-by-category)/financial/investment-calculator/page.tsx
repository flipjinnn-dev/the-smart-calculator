"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie } from "recharts"
import Logo from "@/components/logo"
import Link from "next/link"
import { Calculator, TrendingUp, DollarSign, Percent, Calendar } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import investmentData from "@/app/content/investment-calculator.json"

export default function InvestmentCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [tab, setTab] = useState("end")
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  // Input states for all tabs
  const [PV, setPV] = useState(1000)
  const [PMT, setPMT] = useState(100)
  const [r, setR] = useState(7)
  const [t, setT] = useState(10)
  const [f, setF] = useState(12)
  const [FV, setFV] = useState(25000)

  const calculateEndAmount = () => {
    const rDecimal = r / 100
    const m = f // compound frequency
    const contributionFreq = 12 // monthly contributions
    const N = contributionFreq * t

    // Growth factor over T years
    const G = Math.pow(1 + rDecimal / m, m * t)

    // Effective rate per contribution period
    const j = Math.pow(1 + rDecimal / m, m / contributionFreq) - 1

    // Future Value calculation (end-of-period contributions, γ = 1)
    const fvOfPv = PV * G
    const fvOfAnnuity = PMT * ((Math.pow(1 + j, N) - 1) / j)

    const endAmount = fvOfPv + fvOfAnnuity
    const totalContributions = PV + PMT * N
    const totalInterest = endAmount - totalContributions

    setResult({
      FV: endAmount,
      totalContrib: totalContributions,
      totalInterest: totalInterest,
      startingAmount: PV,
      contributions: PMT * N,
    })
    setShowResult(true)
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  const calculateContribution = () => {
    const rDecimal = r / 100
    const m = f // compound frequency
    const contributionFreq = 12 // monthly contributions
    const N = contributionFreq * t

    // Growth factor over T years
    const G = Math.pow(1 + rDecimal / m, m * t)

    // Effective rate per contribution period
    const j = Math.pow(1 + rDecimal / m, m / contributionFreq) - 1

    // Required PMT calculation
    const fvOfPv = PV * G
    const requiredPMT = (FV - fvOfPv) / ((Math.pow(1 + j, N) - 1) / j)

    const totalContributions = PV + requiredPMT * N
    const totalInterest = FV - totalContributions

    setResult({
      PMT: Math.max(0, requiredPMT),
      FV: FV,
      totalContrib: totalContributions,
      totalInterest: totalInterest,
      startingAmount: PV,
      contributions: requiredPMT * N,
    })
    setShowResult(true)
  }

  const calculateStartingAmount = () => {
    const rDecimal = r / 100
    const m = f // compound frequency
    const contributionFreq = 12 // monthly contributions
    const N = contributionFreq * t

    // Growth factor over T years
    const G = Math.pow(1 + rDecimal / m, m * t)

    // Effective rate per contribution period
    const j = Math.pow(1 + rDecimal / m, m / contributionFreq) - 1

    // Required PV calculation
    const fvOfAnnuity = PMT * ((Math.pow(1 + j, N) - 1) / j)
    const requiredPV = (FV - fvOfAnnuity) / G

    const totalContributions = requiredPV + PMT * N
    const totalInterest = FV - totalContributions

    setResult({
      PV: Math.max(0, requiredPV),
      FV: FV,
      totalContrib: totalContributions,
      totalInterest: totalInterest,
      startingAmount: requiredPV,
      contributions: PMT * N,
    })
    setShowResult(true)
  }

  const calculateLength = () => {
    const rDecimal = r / 100
    const m = f // compound frequency
    const contributionFreq = 12 // monthly contributions

    // Special case: PMT = 0 (lump sum only)
    if (PMT === 0) {
      const years = Math.log(FV / PV) / (m * Math.log(1 + rDecimal / m))
      setResult({ years: Math.max(0, years) })
      setShowResult(true)
      return
    }

    // General case: use numerical method
    let T_guess = 1
    const tolerance = 0.0001
    const maxIterations = 100

    for (let i = 0; i < maxIterations; i++) {
      const N = contributionFreq * T_guess
      const G = Math.pow(1 + rDecimal / m, m * T_guess)
      const j = Math.pow(1 + rDecimal / m, m / contributionFreq) - 1

      const calculatedFV = PV * G + PMT * ((Math.pow(1 + j, N) - 1) / j)
      const error = calculatedFV - FV

      if (Math.abs(error) < tolerance) {
        setResult({ years: Math.max(0, T_guess) })
        setShowResult(true)
        return
      }

      // Simple adjustment
      T_guess = T_guess * (FV / calculatedFV)
      T_guess = Math.max(0.1, Math.min(100, T_guess)) // bounds
    }

    setResult({ years: T_guess })
    setShowResult(true)
  }

  const calculateRate = () => {
    const contributionFreq = 12 // monthly contributions
    const N = contributionFreq * t
    const m = f // compound frequency

    // Newton-Raphson method for rate calculation
    let rGuess = 0.06 // 6% initial guess
    const tolerance = 0.000001
    const maxIterations = 100

    for (let i = 0; i < maxIterations; i++) {
      const G = Math.pow(1 + rGuess / m, m * t)
      const j = Math.pow(1 + rGuess / m, m / contributionFreq) - 1

      const fvCalc = PV * G + PMT * ((Math.pow(1 + j, N) - 1) / j)
      const error = fvCalc - FV

      if (Math.abs(error) < tolerance) {
        const annualRate = rGuess * 100
        setResult({ rate: Math.max(0, annualRate) })
        setShowResult(true)
        return
      }

      // Numerical derivative approximation
      const delta = 0.0001
      const rPlus = rGuess + delta
      const GPlus = Math.pow(1 + rPlus / m, m * t)
      const jPlus = Math.pow(1 + rPlus / m, m / contributionFreq) - 1
      const fvPlus = PV * GPlus + PMT * ((Math.pow(1 + jPlus, N) - 1) / jPlus)

      const derivative = (fvPlus - fvCalc) / delta

      if (Math.abs(derivative) > 0.0001) {
        rGuess = rGuess - error / derivative
        rGuess = Math.max(-0.999, Math.min(1.0, rGuess)) // bounds
      } else {
        break
      }
    }

    const annualRate = rGuess * 100
    setResult({ rate: Math.max(0, annualRate) })
    setShowResult(true)
  }

  const handleCalculate = () => {
    switch (tab) {
      case "end":
        calculateEndAmount()
        break
      case "pmt":
        calculateContribution()
        break
      case "pv":
        calculateStartingAmount()
        break
      case "years":
        calculateLength()
        break
      case "rate":
        calculateRate()
        break
    }
  }

  const generateSchedule = () => {
    const schedule = []
    const monthlyRate = r / 100 / f
    const totalPeriods = Math.min(t * f, 120) // Limit to 10 years for display

    let balance = result?.startingAmount ?? PV

    for (let period = 1; period <= totalPeriods; period++) {
      const interest = balance * monthlyRate
      const deposit = period === 1 ? (result?.startingAmount ?? PV) : (result?.PMT ?? PMT)
      balance = balance + interest + (period === 1 ? 0 : deposit)

      schedule.push({
        period,
        deposit: period === 1 ? deposit : PMT,
        interest,
        balance,
      })
    }

    return schedule
  }

  return (
    <>
<SEO
  title="Investment Calculator – Plan Returns Easily"
  description="Estimate your investment growth with our free calculator. Calculate returns, compound interest, and future value for smarter financial planning."
  keywords="investment calculator, returns calculator, compound interest calculator, future value calculator"
  slug="/financial/investment-calculator"
/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        {/* Header - Updated to use blue theme consistently */}
        <header className="bg-white shadow-md border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500 font-medium">Investment Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb - Updated to use blue theme consistently */}
        <nav className="bg-white/50 backdrop-blur-sm border-b px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center"
              >
                <span>Home</span>
              </Link>
              <span className="text-gray-400 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <Link href="/financial" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Financial
              </Link>
              <span className="text-gray-400 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-blue-600 font-medium">Investment Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content - matching retirement calculator layout */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 ring-4 ring-blue-100">
                  <TrendingUp className="w-10 h-10 text-white drop-shadow-md" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Investment Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate investment returns, required contributions, and plan your financial growth with precision.
              </p>
              <div className="flex justify-center mt-4">
                <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left: Calculator Card - Updated to use blue theme consistently */}
              <div>
                <Card className="shadow-xl border-0 min-h-0 rounded-xl pt-0 overflow-hidden hover:shadow-blue-100/50 transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-t-xl py-5 px-6 border-b border-blue-100/50">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calculator className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-blue-800 font-semibold">Investment Details</span>
                    </CardTitle>
                    <CardDescription className="text-sm mt-2 text-blue-700/70">
                      Enter your investment information below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 bg-white">
                    <div className="mb-6">
                      <Label className="text-sm font-semibold mb-3 block text-blue-800">
                        What would you like to calculate?
                      </Label>
                      <Tabs value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="bg-gradient-to-r from-blue-50 to-indigo-50 w-full h-auto p-1 rounded-xl border border-blue-200 shadow-sm">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 w-full">
                            <TabsTrigger
                              value="end"
                              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-md whitespace-nowrap"
                            >
                              End Amount
                            </TabsTrigger>
                            <TabsTrigger
                              value="pmt"
                              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-md whitespace-nowrap"
                            >
                              Contribution
                            </TabsTrigger>
                            <TabsTrigger
                              value="pv"
                              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-md whitespace-nowrap"
                            >
                              Starting Amount
                            </TabsTrigger>
                            <TabsTrigger
                              value="years"
                              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-md whitespace-nowrap"
                            >
                              Length
                            </TabsTrigger>
                            <TabsTrigger
                              value="rate"
                              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2.5 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-md whitespace-nowrap"
                            >
                              Return Rate
                            </TabsTrigger>
                          </div>
                        </TabsList>

                        <TabsContent value="end">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Starting Amount ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={PV}
                                  onChange={(e) => setPV(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Regular Contribution ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={PMT}
                                  onChange={(e) => setPMT(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Annual Return Rate (%)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Percent className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  step="0.1"
                                  value={r}
                                  onChange={(e) => setR(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Investment Length (years)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Calendar className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={t}
                                  onChange={(e) => setT(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">Compound Frequency</Label>
                              <select
                                className="w-full mt-1 border border-blue-200 rounded-xl h-12 px-4 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 shadow-sm appearance-none bg-white pr-10 text-gray-700"
                                value={f}
                                onChange={(e) => setF(Number(e.target.value))}
                              >
                                <option value={1}>Annually</option>
                                <option value={2}>Semi-annually</option>
                                <option value={4}>Quarterly</option>
                                <option value={12}>Monthly</option>
                                <option value={24}>Semi-monthly</option>
                                <option value={26}>Bi-weekly</option>
                                <option value={52}>Weekly</option>
                                <option value={365}>Daily</option>
                              </select>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Similar structure for other tabs... */}
                        <TabsContent value="pmt">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Starting Amount ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={PV}
                                  onChange={(e) => setPV(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Target End Amount ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={FV}
                                  onChange={(e) => setFV(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Annual Return Rate (%)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Percent className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  step="0.1"
                                  value={r}
                                  onChange={(e) => setR(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Investment Length (years)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Calendar className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={t}
                                  onChange={(e) => setT(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">Compound Frequency</Label>
                              <select
                                className="w-full mt-1 border border-blue-200 rounded-xl h-12 px-4 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 shadow-sm appearance-none bg-white pr-10 text-gray-700"
                                value={f}
                                onChange={(e) => setF(Number(e.target.value))}
                              >
                                <option value={1}>Annually</option>
                                <option value={2}>Semi-annually</option>
                                <option value={4}>Quarterly</option>
                                <option value={12}>Monthly</option>
                                <option value={24}>Semi-monthly</option>
                                <option value={26}>Bi-weekly</option>
                                <option value={52}>Weekly</option>
                                <option value={365}>Daily</option>
                              </select>
                            </div>
                          </div>
                        </TabsContent>

                        {/* Continue with other tabs following same pattern... */}
                        <TabsContent value="pv">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Regular Contribution ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={PMT}
                                  onChange={(e) => setPMT(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Target End Amount ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={FV}
                                  onChange={(e) => setFV(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Annual Return Rate (%)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Percent className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  step="0.1"
                                  value={r}
                                  onChange={(e) => setR(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Investment Length (years)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Calendar className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={t}
                                  onChange={(e) => setT(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">Compound Frequency</Label>
                              <select
                                className="w-full mt-1 border border-blue-200 rounded-xl h-12 px-4 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 shadow-sm appearance-none bg-white pr-10 text-gray-700"
                                value={f}
                                onChange={(e) => setF(Number(e.target.value))}
                              >
                                <option value={1}>Annually</option>
                                <option value={2}>Semi-annually</option>
                                <option value={4}>Quarterly</option>
                                <option value={12}>Monthly</option>
                                <option value={24}>Semi-monthly</option>
                                <option value={26}>Bi-weekly</option>
                                <option value={52}>Weekly</option>
                                <option value={365}>Daily</option>
                              </select>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="years">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Starting Amount ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={PV}
                                  onChange={(e) => setPV(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Regular Contribution ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={PMT}
                                  onChange={(e) => setPMT(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Target End Amount ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={FV}
                                  onChange={(e) => setFV(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Annual Return Rate (%)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Percent className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  step="0.1"
                                  value={r}
                                  onChange={(e) => setR(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Investment Length (years)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Calendar className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={t}
                                  onChange={(e) => setT(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">Compound Frequency</Label>
                              <select
                                className="w-full mt-1 border border-blue-200 rounded-xl h-12 px-4 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 shadow-sm appearance-none bg-white pr-10 text-gray-700"
                                value={f}
                                onChange={(e) => setF(Number(e.target.value))}
                              >
                                <option value={1}>Annually</option>
                                <option value={2}>Semi-annually</option>
                                <option value={4}>Quarterly</option>
                                <option value={12}>Monthly</option>
                                <option value={24}>Semi-monthly</option>
                                <option value={26}>Bi-weekly</option>
                                <option value={52}>Weekly</option>
                                <option value={365}>Daily</option>
                              </select>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="rate">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Starting Amount ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={PV}
                                  onChange={(e) => setPV(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Regular Contribution ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={PMT}
                                  onChange={(e) => setPMT(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Target End Amount ($)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={FV}
                                  onChange={(e) => setFV(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">
                                Investment Length (years)
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Calendar className="h-5 w-5 text-blue-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-300 shadow-sm"
                                  type="number"
                                  value={t}
                                  onChange={(e) => setT(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Label className="text-sm font-medium text-blue-800 mb-3 block">Compound Frequency</Label>
                              <select
                                className="w-full mt-1 border border-blue-200 rounded-xl h-12 px-4 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 shadow-sm appearance-none bg-white pr-10 text-gray-700"
                                value={f}
                                onChange={(e) => setF(Number(e.target.value))}
                              >
                                <option value={1}>Annually</option>
                                <option value={2}>Semi-annually</option>
                                <option value={4}>Quarterly</option>
                                <option value={12}>Monthly</option>
                                <option value={24}>Semi-monthly</option>
                                <option value={26}>Bi-weekly</option>
                                <option value={52}>Weekly</option>
                                <option value={365}>Daily</option>
                              </select>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Updated button styling to match blue theme */}
                    <Button
                      onClick={() => {
                          handleCalculate()
                          scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                        }}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate Investment
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Results Card - Updated to use blue theme consistently */}
              <div>
                <Card ref={resultsRef} className="shadow-xl border-0 pt-0 min-h-0 rounded-xl overflow-hidden hover:shadow-blue-100/50 transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-t-xl py-5 px-6 border-b border-blue-100/50">
                    <CardTitle className="flex items-center space-x-3 text-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-blue-800 font-semibold">Your Investment Results</span>
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700">
                      See your investment calculation results here
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="min-h-[200px] space-y-6">
                      {showResult && result ? (
                        <div className="space-y-6">
                          {/* Main Result Summary - Updated to blue theme */}
                          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-md">
                            {tab === "end" && result.FV !== undefined && (
                              <div className="text-center">
                                <h3 className="text-xl font-bold text-blue-800 mb-3">End Balance</h3>
                                <p className="text-4xl font-bold text-blue-600">
                                  ${result.FV.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                              </div>
                            )}
                            {tab === "pmt" && result.PMT !== undefined && (
                              <div className="text-center">
                                <h3 className="text-xl font-bold text-blue-800 mb-3">Required Contribution</h3>
                                <p className="text-4xl font-bold text-blue-600">
                                  ${result.PMT.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                                <p className="text-sm text-blue-700 mt-2">
                                  per {f === 12 ? "month" : f === 1 ? "year" : "period"}
                                </p>
                              </div>
                            )}
                            {tab === "pv" && result.PV !== undefined && (
                              <div className="text-center">
                                <h3 className="text-xl font-bold text-blue-800 mb-3">Required Starting Amount</h3>
                                <p className="text-4xl font-bold text-blue-600">
                                  ${result.PV.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                              </div>
                            )}
                            {tab === "years" && result.years !== undefined && (
                              <div className="text-center">
                                <h3 className="text-xl font-bold text-blue-800 mb-3">Investment Length</h3>
                                <p className="text-4xl font-bold text-blue-600">
                                  {result.years.toLocaleString(undefined, { maximumFractionDigits: 2 })} years
                                </p>
                              </div>
                            )}
                            {tab === "rate" && result.rate !== undefined && (
                              <div className="text-center">
                                <h3 className="text-xl font-bold text-blue-800 mb-3">Required Return Rate</h3>
                                <p className="text-4xl font-bold text-blue-600">
                                  {result.rate.toLocaleString(undefined, { maximumFractionDigits: 3 })}%
                                </p>
                                <p className="text-sm text-blue-700 mt-2">annually</p>
                              </div>
                            )}
                          </div>

                          {/* Breakdown */}
                          {(result.totalContrib !== undefined || result.totalInterest !== undefined) && (
                            <div>
                              <h4 className="font-semibold text-blue-800 mb-3">Investment Breakdown</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                                  <span className="text-blue-700 block text-sm">End Balance</span>
                                  <span className="font-bold text-lg text-blue-800">
                                    ${(result.FV ?? FV).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                                  <span className="text-blue-700 block text-sm">Starting Amount</span>
                                  <span className="font-bold text-lg text-blue-800">
                                    $
                                    {(result.startingAmount ?? result.PV ?? PV).toLocaleString(undefined, {
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                </div>
                                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                                  <span className="text-blue-700 block text-sm">Total Contributions</span>
                                  <span className="font-bold text-lg text-blue-800">
                                    $
                                    {(result.contributions ?? PMT * f * t).toLocaleString(undefined, {
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                </div>
                                <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                                  <span className="text-blue-700 block text-sm">Total Interest</span>
                                  <span className="font-bold text-lg text-indigo-600">
                                    $
                                    {(result.totalInterest ?? 0).toLocaleString(undefined, {
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Pie Chart */}
                          {result.totalContrib !== undefined && (
                            <div>
                              <h4 className="font-semibold text-blue-800 mb-3">Investment Composition</h4>
                              <div className="h-64">
                                {/* Updated chart colors to match blue theme */}
                                <ChartContainer
                                  config={{
                                    principal: { label: "Principal", color: "#3b82f6" },
                                    interest: { label: "Interest", color: "#6366f1" },
                                  }}
                                  className="h-full w-full"
                                >
                                  <PieChart>
                                    <Pie
                                      data={[
                                        { name: "Principal", value: result.totalContrib, fill: "#3b82f6" },
                                        { name: "Interest", value: result.totalInterest, fill: "#6366f1" },
                                      ]}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={80}
                                      dataKey="value"
                                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                  </PieChart>
                                </ChartContainer>
                              </div>
                            </div>
                          )}

                          {/* Accumulation Schedule */}
                          {(tab === "end" || tab === "pmt" || tab === "pv") && (
                            <div>
                              <h4 className="font-semibold text-blue-800 mb-3">Accumulation Schedule</h4>
                              <div className="max-h-64 overflow-y-auto border border-blue-200 rounded-lg">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="bg-blue-50">
                                      <TableHead className="text-xs font-semibold text-blue-800">Period</TableHead>
                                      <TableHead className="text-xs font-semibold text-blue-800">Deposit</TableHead>
                                      <TableHead className="text-xs font-semibold text-blue-800">Interest</TableHead>
                                      <TableHead className="text-xs font-semibold text-blue-800">Balance</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {generateSchedule().map((row, index) => (
                                      <TableRow key={index} className="hover:bg-blue-50">
                                        <TableCell className="text-xs">{row.period}</TableCell>
                                        <TableCell className="text-xs">
                                          ${row.deposit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell className="text-xs">
                                          ${row.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell className="text-xs font-medium">
                                          ${row.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-inner">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md border border-blue-100">
                              <Calculator className="w-8 h-8 text-blue-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-700">
                              Select a calculation type and fill in your details to see investment results
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Guide */}
          <CalculatorGuide data={investmentData} />
        </main>


      </div>
    </>
  )
}