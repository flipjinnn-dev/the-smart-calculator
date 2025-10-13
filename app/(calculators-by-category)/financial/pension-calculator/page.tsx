"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, PiggyBank, DollarSign, Users, FileText, HelpCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"
import CalculatorGuide from "@/components/calculator-guide"
import SimilarCalculators from "@/components/similar-calculators"
import pensionData from "@/app/content/pension-calculator.json"

export default function PensionCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  // Option 1: Lump Sum vs Monthly Pension
  const [retirementAge1, setRetirementAge1] = useState("65")
  const [lumpSum, setLumpSum] = useState("500000")
  const [monthlyPension1, setMonthlyPension1] = useState("2500")
  const [investmentReturn1, setInvestmentReturn1] = useState("6")
  const [cola1, setCola1] = useState("2")
  const [lifeExpectancy1, setLifeExpectancy1] = useState("85")

  // Option 2: Single Life vs Joint Survivor
  const [retirementAge2, setRetirementAge2] = useState("65")
  const [yourLifeExpectancy, setYourLifeExpectancy] = useState("85")
  const [spouseAge, setSpouseAge] = useState("62")
  const [spouseLifeExpectancy, setSpouseLifeExpectancy] = useState("87")
  const [singleLifePension, setSingleLifePension] = useState("3000")
  const [jointSurvivorPension, setJointSurvivorPension] = useState("2700")
  const [survivorBenefitRatio, setSurvivorBenefitRatio] = useState("50")
  const [investmentReturn2, setInvestmentReturn2] = useState("6")
  const [cola2, setCola2] = useState("2")

  // Option 3: Work Longer Comparison
  const [currentAge, setCurrentAge] = useState("60")
  const [retirementAge3A, setRetirementAge3A] = useState("62")
  const [monthlyPension3A, setMonthlyPension3A] = useState("2200")
  const [retirementAge3B, setRetirementAge3B] = useState("67")
  const [monthlyPension3B, setMonthlyPension3B] = useState("3200")
  const [lifeExpectancy3, setLifeExpectancy3] = useState("85")
  const [investmentReturn3, setInvestmentReturn3] = useState("6")
  const [cola3, setCola3] = useState("2")

  const [results, setResults] = useState<{
    option1: {
      pvPension: number;
      pvLumpSum: number;
      better: string;
      breakevenAge: number | null;
      competitorText: string;
      chartData: { age: number; lumpSum: number; pension: number }[];
    };
    option2: { pvSingle: number; pvJoint: number; better: string };
    option3: { pvOptionA: number; pvOptionB: number; better: string };
  } | null>(null)

  // Helper function to calculate present value of pension stream
  const calculatePensionPV = (
    monthlyPayment: number,
    years: number,
    annualReturn: number,
    annualCOLA: number,
    startDelay = 0,
  ) => {
    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1 / 12) - 1
    const monthlyCOLA = Math.pow(1 + annualCOLA / 100, 1 / 12) - 1
    const totalMonths = years * 12

    let pv = 0
    for (let t = 1; t <= totalMonths; t++) {
      const adjustedPayment = monthlyPayment * Math.pow(1 + monthlyCOLA, t - 1)
      const discountFactor = Math.pow(1 + monthlyReturn, t - 1 + startDelay * 12)
      pv += adjustedPayment / discountFactor
    }

    return pv
  }

  // Helper function for joint survivor calculation
  const calculateJointSurvivorPV = (
    jointPayment: number,
    retirementAge: number,
    yourLife: number,
    spouseAge: number,
    spouseLife: number,
    survivorRatio: number,
    annualReturn: number,
    annualCOLA: number,
  ) => {
    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1 / 12) - 1
    const monthlyCOLA = Math.pow(1 + annualCOLA / 100, 1 / 12) - 1

    const yourDeathAge = yourLife
    const spouseDeathAge = spouseLife
    const spouseAgeAtYourRetirement = spouseAge
    const spouseAgeAtYourDeath = spouseAgeAtYourRetirement + (yourDeathAge - retirementAge)

    let pv = 0

    // Phase 1: Both alive (retirement to your death)
    const bothAliveYears = yourDeathAge - retirementAge
    const bothAliveMonths = bothAliveYears * 12

    for (let t = 1; t <= bothAliveMonths; t++) {
      const adjustedPayment = jointPayment * Math.pow(1 + monthlyCOLA, t - 1)
      const discountFactor = Math.pow(1 + monthlyReturn, t - 1)
      pv += adjustedPayment / discountFactor
    }

    // Phase 2: Spouse survives (your death to spouse death)
    if (spouseAgeAtYourDeath < spouseDeathAge) {
      const survivorYears = spouseDeathAge - spouseAgeAtYourDeath
      const survivorMonths = survivorYears * 12
      const survivorPayment = jointPayment * (survivorRatio / 100)

      for (let t = 1; t <= survivorMonths; t++) {
        const monthsSinceRetirement = bothAliveMonths + t
        const adjustedPayment = survivorPayment * Math.pow(1 + monthlyCOLA, monthsSinceRetirement - 1)
        const discountFactor = Math.pow(1 + monthlyReturn, monthsSinceRetirement - 1)
        pv += adjustedPayment / discountFactor
      }
    }

    return pv
  }

  const calculatePension = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    // Option 1: Lump Sum vs Monthly Pension (Competitor style)
    const R = Number.parseFloat(retirementAge1)
    const L = Number.parseFloat(lumpSum)
    const PMT = Number.parseFloat(monthlyPension1)
    const r = Number.parseFloat(investmentReturn1) / 100
    const c = Number.parseFloat(cola1) / 100
    const minAge = R + 5
    const maxAge = R + 40
    let breakevenAge: number | null = null
    let lastDiff = null
    const chartData: { age: number; lumpSum: number; pension: number }[] = []
    for (let age = minAge; age <= maxAge; age++) {
      const t = age - R
      // Lump sum future value
      const FV_lump = L * Math.pow(1 + r, t)
      // Pension future value (sum of each payment compounded forward)
      let FV_pension = 0
      for (let k = 1; k <= t * 12; k++) {
        const PMT_k = PMT * Math.pow(1 + c / 12, k - 1)
        FV_pension += PMT_k * Math.pow(1 + r / 12, t * 12 - k)
      }
      chartData.push({ age, lumpSum: FV_lump, pension: FV_pension })
      const diff = FV_pension - FV_lump
      if (lastDiff !== null && lastDiff < 0 && diff >= 0 && breakevenAge === null) {
        // Interpolate for more accurate breakeven
        const interp = age - 1 + (-lastDiff) / (diff - lastDiff)
        breakevenAge = Math.round(interp)
      }
      lastDiff = diff
    }
    // Calculate PVs for user input life expectancy
    const pensionYears1 = Number.parseFloat(lifeExpectancy1) - R
    const pvPension = calculatePensionPV(PMT, pensionYears1, r * 100, c * 100)
    const pvLumpSum = L
    const better1 = pvPension > pvLumpSum ? "Monthly Pension" : "Lump Sum"
    // Competitor-style result text
    let competitorText = ""
    if (breakevenAge) {
      competitorText = `With investment return of ${(r * 100).toFixed(1)}% per year, if you can live up to age ${breakevenAge} or older, monthly pension is better. Otherwise, lump sum is better.`
    } else {
      competitorText = `With investment return of ${(r * 100).toFixed(1)}% per year, monthly pension is always ${better1 === "Monthly Pension" ? "better" : "worse"} than lump sum in the range analyzed.`
    }

    // Option 2: Single Life vs Joint Survivor
    const singleYears = Number.parseFloat(yourLifeExpectancy) - Number.parseFloat(retirementAge2)
    const pvSingle = calculatePensionPV(
      Number.parseFloat(singleLifePension),
      singleYears,
      Number.parseFloat(investmentReturn2),
      Number.parseFloat(cola2),
    )

    const pvJoint = calculateJointSurvivorPV(
      Number.parseFloat(jointSurvivorPension),
      Number.parseFloat(retirementAge2),
      Number.parseFloat(yourLifeExpectancy),
      Number.parseFloat(spouseAge),
      Number.parseFloat(spouseLifeExpectancy),
      Number.parseFloat(survivorBenefitRatio),
      Number.parseFloat(investmentReturn2),
      Number.parseFloat(cola2),
    )
    const better2 = pvSingle > pvJoint ? "Single Life" : "Joint & Survivor"

    // Option 3: Work Longer Comparison
    const yearsA = Number.parseFloat(lifeExpectancy3) - Number.parseFloat(retirementAge3A)
    const yearsB = Number.parseFloat(lifeExpectancy3) - Number.parseFloat(retirementAge3B)
    const delayA = Number.parseFloat(retirementAge3A) - Number.parseFloat(currentAge)
    const delayB = Number.parseFloat(retirementAge3B) - Number.parseFloat(currentAge)

    const pvOptionA = calculatePensionPV(
      Number.parseFloat(monthlyPension3A),
      yearsA,
      Number.parseFloat(investmentReturn3),
      Number.parseFloat(cola3),
      delayA,
    )

    const pvOptionB = calculatePensionPV(
      Number.parseFloat(monthlyPension3B),
      yearsB,
      Number.parseFloat(investmentReturn3),
      Number.parseFloat(cola3),
      delayB,
    )

    const better3 = pvOptionA > pvOptionB ? `Retire at ${retirementAge3A}` : `Retire at ${retirementAge3B}`

    setResults({
      option1: {
        pvPension,
        pvLumpSum,
        better: better1,
        breakevenAge,
        competitorText,
        chartData,
      },
      option2: { pvSingle, pvJoint, better: better2 },
      option3: { pvOptionA, pvOptionB, better: better3 },
    })
  }

  return (
    <TooltipProvider>
      <SEO
        title="Pension Calculator — Compare Lump Sum, Monthly, Single Life, Joint Survivor, or Working Longer"
        description="Compare pension options: lump sum vs monthly payments, single life vs joint survivor benefits, and working longer scenarios. Make informed retirement decisions."
        keywords="pension calculator, lump sum vs monthly pension, joint survivor pension, retirement planning, pension comparison"
        slug="/retirement/pension-calculator"
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
                  <p className="text-sm text-gray-500">Pension Calculator</p>
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
                Financial Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Pension Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <PiggyBank className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pension Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Compare lump sum vs monthly pension, single vs joint survivor, or retiring at different ages.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <span>Pension Options</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Tabs defaultValue="lump-sum" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="lump-sum">Lump Sum vs Monthly</TabsTrigger>
                      <TabsTrigger value="survivor">Single vs Joint</TabsTrigger>
                      <TabsTrigger value="work-longer">Work Longer</TabsTrigger>
                    </TabsList>

                    {/* Option 1: Lump Sum vs Monthly Pension */}
                    <TabsContent value="lump-sum" className="space-y-6">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-gray-900">Lump Sum vs Monthly Pension</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Retirement Age</Label>
                            <Input
                              type="number"
                              value={retirementAge1}
                              onChange={(e) => setRetirementAge1(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">
                              Life Expectancy
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 h-4 ml-1 inline text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Expected age at death for calculation purposes</p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Input
                              type="number"
                              value={lifeExpectancy1}
                              onChange={(e) => setLifeExpectancy1(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Lump Sum Payment ($)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                type="number"
                                value={lumpSum}
                                onChange={(e) => setLumpSum(e.target.value)}
                                className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Monthly Pension ($)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                type="number"
                                value={monthlyPension1}
                                onChange={(e) => setMonthlyPension1(e.target.value)}
                                className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">
                              Annual Investment Return (%)
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 h-4 ml-1 inline text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Expected annual return on lump sum investment</p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={investmentReturn1}
                              onChange={(e) => setInvestmentReturn1(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">
                              Annual COLA (%)
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 h-4 ml-1 inline text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Cost of Living Adjustment - annual pension increase</p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={cola1}
                              onChange={(e) => setCola1(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Option 2: Single Life vs Joint Survivor */}
                    <TabsContent value="survivor" className="space-y-6">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <Users className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-gray-900">Single Life vs Joint & Survivor</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Retirement Age</Label>
                            <Input
                              type="number"
                              value={retirementAge2}
                              onChange={(e) => setRetirementAge2(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Your Life Expectancy</Label>
                            <Input
                              type="number"
                              value={yourLifeExpectancy}
                              onChange={(e) => setYourLifeExpectancy(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Spouse's Age at Retirement</Label>
                            <Input
                              type="number"
                              value={spouseAge}
                              onChange={(e) => setSpouseAge(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Spouse's Life Expectancy</Label>
                            <Input
                              type="number"
                              value={spouseLifeExpectancy}
                              onChange={(e) => setSpouseLifeExpectancy(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">
                              Monthly Pension (Single Life) ($)
                            </Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                type="number"
                                value={singleLifePension}
                                onChange={(e) => setSingleLifePension(e.target.value)}
                                className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">
                              Monthly Pension (Joint Survivor) ($)
                            </Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                type="number"
                                value={jointSurvivorPension}
                                onChange={(e) => setJointSurvivorPension(e.target.value)}
                                className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">
                              Survivor Benefit Ratio (%)
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 h-4 ml-1 inline text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Percentage of pension spouse receives after your death</p>
                                </TooltipContent>
                              </Tooltip>
                            </Label>
                            <Input
                              type="number"
                              value={survivorBenefitRatio}
                              onChange={(e) => setSurvivorBenefitRatio(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">
                              Annual Investment Return (%)
                            </Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={investmentReturn2}
                              onChange={(e) => setInvestmentReturn2(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Annual COLA (%)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={cola2}
                              onChange={(e) => setCola2(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Option 3: Work Longer Comparison */}
                    <TabsContent value="work-longer" className="space-y-6">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-gray-900">Work Longer Option Comparison</h3>
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
                            <Label className="text-base font-semibold text-gray-900">Life Expectancy</Label>
                            <Input
                              type="number"
                              value={lifeExpectancy3}
                              onChange={(e) => setLifeExpectancy3(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="col-span-2">
                            <Separator />
                            <h4 className="text-md font-semibold text-gray-800 mt-4 mb-3">Option A: Retire Earlier</h4>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Retirement Age A</Label>
                            <Input
                              type="number"
                              value={retirementAge3A}
                              onChange={(e) => setRetirementAge3A(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Monthly Pension A ($)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                type="number"
                                value={monthlyPension3A}
                                onChange={(e) => setMonthlyPension3A(e.target.value)}
                                className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div className="col-span-2">
                            <h4 className="text-md font-semibold text-gray-800 mt-4 mb-3">Option B: Work Longer</h4>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Retirement Age B</Label>
                            <Input
                              type="number"
                              value={retirementAge3B}
                              onChange={(e) => setRetirementAge3B(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Monthly Pension B ($)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                type="number"
                                value={monthlyPension3B}
                                onChange={(e) => setMonthlyPension3B(e.target.value)}
                                className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">
                              Annual Investment Return (%)
                            </Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={investmentReturn3}
                              onChange={(e) => setInvestmentReturn3(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-base font-semibold text-gray-900">Annual COLA (%)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={cola3}
                              onChange={(e) => setCola3(e.target.value)}
                              className="h-12 text-lg border-2 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button
                    onClick={calculatePension}
                    className="w-full h-14 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl font-bold mt-8"
                  >
                    Calculate Pension Options
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Pension Results</CardTitle>
                  <CardDescription className="text-base">Compare your pension options</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-8">
                      {/* Option 1 Results */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Lump Sum vs Monthly Pension</h3>
                        <div className="bg-blue-50 p-3 rounded-lg text-base text-blue-900 font-medium">
                          {results.option1.competitorText}
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          <div
                            className={`p-4 rounded-lg border-2 ${
                              results.option1.better === "Monthly Pension"
                                ? "bg-green-100 border-green-300"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Monthly Pension (PV)</span>
                              <span className="font-bold text-lg">
                                ${results.option1.pvPension.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`p-4 rounded-lg border-2 ${
                              results.option1.better === "Lump Sum"
                                ? "bg-green-100 border-green-300"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Lump Sum</span>
                              <span className="font-bold text-lg">
                                ${results.option1.pvLumpSum.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">
                            Better Choice: <span className="font-bold">{results.option1.better}</span>
                          </p>
                        </div>
                        {/* Chart placeholder: You can add a chart here using results.option1.chartData */}
                      </div>

                      <Separator />

                      {/* Option 2 Results */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Single Life vs Joint & Survivor</h3>
                        <div className="grid grid-cols-1 gap-3">
                          <div
                            className={`p-4 rounded-lg border-2 ${
                              results.option2.better === "Single Life"
                                ? "bg-green-100 border-green-300"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Single Life (PV)</span>
                              <span className="font-bold text-lg">
                                ${results.option2.pvSingle.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`p-4 rounded-lg border-2 ${
                              results.option2.better === "Joint & Survivor"
                                ? "bg-green-100 border-green-300"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Joint & Survivor (PV)</span>
                              <span className="font-bold text-lg">
                                ${results.option2.pvJoint.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">
                            Better Choice: <span className="font-bold">{results.option2.better}</span>
                          </p>
                        </div>
                      </div>

                      <Separator />

                      {/* Option 3 Results */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Work Longer Comparison</h3>
                        <div className="grid grid-cols-1 gap-3">
                          <div
                            className={`p-4 rounded-lg border-2 ${
                              results.option3.better.includes(retirementAge3A)
                                ? "bg-green-100 border-green-300"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Retire at {retirementAge3A} (PV)</span>
                              <span className="font-bold text-lg">
                                ${results.option3.pvOptionA.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`p-4 rounded-lg border-2 ${
                              results.option3.better.includes(retirementAge3B)
                                ? "bg-green-100 border-green-300"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Retire at {retirementAge3B} (PV)</span>
                              <span className="font-bold text-lg">
                                ${results.option3.pvOptionB.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">
                            Better Choice: <span className="font-bold">{results.option3.better}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <PiggyBank className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter your pension information to see your results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators 
                calculators={[
                  {
                    calculatorName: "Time Value of Money Calculator",
                    calculatorHref: "/financial/finance-calculator",
                    calculatorDescription: "Calculate present and future values, analyze investment returns, and make informed financial decisions."
                  },
                  {
                    calculatorName: "Salary Calculator",
                    calculatorHref: "/financial/salary-calculator",
                    calculatorDescription: "Convert between different pay periods and calculate your salary breakdown across various timeframes."
                  },
                  {
                    calculatorName: "Payment Calculator",
                    calculatorHref: "/financial/payment-calculator",
                    calculatorDescription: "Calculate monthly payments for loans, mortgages, and other financing options."
                  }
                ]}
                color="blue"
                title="Related Financial Calculators"
              />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Formulas */}
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">Calculation Methodology</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Present Value Calculation</h3>
                      <p className="text-gray-700 mb-2">
                        All pension streams are converted to present value using the formula:
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                        PV = Σ [PMT × (1 + COLA)^(t-1)] / (1 + r)^(t-1)
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Joint Survivor Calculation</h3>
                      <p className="text-gray-700">
                        Accounts for two phases: payments while both spouses are alive, then survivor benefits until the
                        surviving spouse's death.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Work Longer Analysis</h3>
                      <p className="text-gray-700">
                        Compares present values accounting for delayed retirement and different pension amounts,
                        discounted back to today.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Guide */}
              <CalculatorGuide data={pensionData} />
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}
