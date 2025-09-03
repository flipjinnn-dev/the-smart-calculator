"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Calendar, Heart } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function PeriodCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [lastPeriodDate, setLastPeriodDate] = useState("")
  const [cycleLength, setCycleLength] = useState("28")
  const [periodLength, setPeriodLength] = useState("5")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!lastPeriodDate) {
      newErrors.lastPeriodDate = "Please select the first day of your last period"
    } else {
      const selectedDate = new Date(lastPeriodDate)
      const today = new Date()
      const maxDate = new Date()
      maxDate.setDate(today.getDate() + 30) // Allow up to 30 days in future

      if (selectedDate > maxDate) {
        newErrors.lastPeriodDate = "Date cannot be more than 30 days in the future"
      }
    }

    if (!cycleLength) {
      newErrors.cycleLength = "Please select your average cycle length"
    }

    if (!periodLength) {
      newErrors.periodLength = "Please select your average period length"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculatePeriod = () => {
    if (!validateInputs()) return

    scrollToRef(resultsRef as React.RefObject<HTMLElement>)

    try {
      const lmpDate = new Date(lastPeriodDate)
      const cycleLengthNum = Number.parseInt(cycleLength)
      const periodLengthNum = Number.parseInt(periodLength)

      // Core calculations
      const nextPeriodDate = new Date(lmpDate)
      nextPeriodDate.setDate(lmpDate.getDate() + cycleLengthNum)

      const ovulationDate = new Date(lmpDate)
      ovulationDate.setDate(lmpDate.getDate() + (cycleLengthNum - 14))

      // Fertile Window (Ovulation ± 2 days)
      const fertileWindowStart = new Date(ovulationDate)
      fertileWindowStart.setDate(ovulationDate.getDate() - 2)
      const fertileWindowEnd = new Date(ovulationDate)
      fertileWindowEnd.setDate(ovulationDate.getDate() + 2)

      // Calculate next 6 cycles forecast
      const futureCycles = []
      for (let i = 1; i <= 6; i++) {
        const cycleStartDate = new Date(lmpDate)
        cycleStartDate.setDate(lmpDate.getDate() + cycleLengthNum * i)

        const cycleEndDate = new Date(cycleStartDate)
        cycleEndDate.setDate(cycleStartDate.getDate() + periodLengthNum - 1)

        const cycleOvulationDate = new Date(cycleStartDate)
        cycleOvulationDate.setDate(cycleStartDate.getDate() + (cycleLengthNum - 14))

        const cycleFertileStart = new Date(cycleOvulationDate)
        cycleFertileStart.setDate(cycleOvulationDate.getDate() - 2)
        const cycleFertileEnd = new Date(cycleOvulationDate)
        cycleFertileEnd.setDate(cycleOvulationDate.getDate() + 2)

        futureCycles.push({
          cycleNumber: i + 1,
          periodStart: cycleStartDate,
          periodEnd: cycleEndDate,
          ovulationDate: cycleOvulationDate,
          fertileWindow: `${formatDate(cycleFertileStart)} - ${formatDate(cycleFertileEnd)}`,
          month: cycleStartDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        })
      }

      const results = {
        lmpDate,
        cycleLength: cycleLengthNum,
        periodLength: periodLengthNum,
        nextPeriodDate,
        ovulationDate,
        fertileWindowStart,
        fertileWindowEnd,
        fertileWindow: `${formatDate(fertileWindowStart)} - ${formatDate(fertileWindowEnd)}`,
        futureCycles,
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating period dates. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setLastPeriodDate("")
    setCycleLength("28")
    setPeriodLength("5")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  // Generate cycle length options (22-44 days)
  const cycleLengthOptions = []
  for (let i = 22; i <= 44; i++) {
    cycleLengthOptions.push(i)
  }

  // Generate period length options (3-10 days)
  const periodLengthOptions = []
  for (let i = 3; i <= 10; i++) {
    periodLengthOptions.push(i)
  }

  return (
    <>
      <Head>
        <title>Period Calculator – Track Menstrual Cycle</title>
        <meta
          name="description"
          content="Predict your next period with our free calculator. Track menstrual cycle, fertile days, and ovulation for better planning."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
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
                  <p className="text-sm text-gray-500">Period Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-pink-600">
                Home
              </Link>
              <span className="text-gray-400">›</span>
              <Link href="/health" className="text-gray-500 hover:text-pink-600">
                Health
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900 font-medium">Period Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Period Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Track your menstrual cycle, predict your next period, and calculate your fertile window. Stay informed
                about your reproductive health with accurate cycle predictions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-pink-600" />
                      <span>Period Tracking</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your cycle details to predict your next period and fertile days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      {/* Last Period Date */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          First day of your last period (LMP) *
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.lastPeriodDate ? "border-red-300" : ""}`}
                            type="date"
                            value={lastPeriodDate}
                            onChange={(e) => setLastPeriodDate(e.target.value)}
                          />
                        </div>
                        {errors.lastPeriodDate && <p className="text-red-600 text-xs mt-1">{errors.lastPeriodDate}</p>}
                      </div>

                      {/* Cycle Length */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          Average cycle length (days) *
                        </Label>
                        <Select value={cycleLength} onValueChange={setCycleLength}>
                          <SelectTrigger className={`h-12 ${errors.cycleLength ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your cycle length" />
                          </SelectTrigger>
                          <SelectContent>
                            {cycleLengthOptions.map((days) => (
                              <SelectItem key={days} value={days.toString()}>
                                {days} days
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.cycleLength && <p className="text-red-600 text-xs mt-1">{errors.cycleLength}</p>}
                        <p className="text-xs text-gray-500 mt-1">Default is 28 days. Range: 22-44 days</p>
                      </div>

                      {/* Period Length */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          Average period length (days)
                        </Label>
                        <Select value={periodLength} onValueChange={setPeriodLength}>
                          <SelectTrigger className={`h-12 ${errors.periodLength ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your period length" />
                          </SelectTrigger>
                          <SelectContent>
                            {periodLengthOptions.map((days) => (
                              <SelectItem key={days} value={days.toString()}>
                                {days} days
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.periodLength && <p className="text-red-600 text-xs mt-1">{errors.periodLength}</p>}
                        <p className="text-xs text-gray-500 mt-1">Default is 5 days. Range: 3-10 days</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculatePeriod}
                        className="h-12 px-8 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold shadow-lg"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate Period
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-pink-300 text-pink-700 hover:bg-pink-50 bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-purple-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">Next Period</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-pink-200">
                          <p className="text-lg font-bold text-pink-900 mb-2">{formatDate(result.nextPeriodDate)}</p>
                          <p className="text-sm font-medium text-gray-600 mb-2">Expected Period Start</p>
                          <p className="text-xs text-gray-500">Cycle length: {result.cycleLength} days</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-pink-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your cycle details to predict your next period.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calendar className="w-6 h-6 text-pink-600" />
                      <span>Your Period Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-700 mb-4 text-lg">Current Cycle</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">Next Period Start:</span>
                            <p className="font-semibold text-pink-700">{formatDate(result.nextPeriodDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Estimated Ovulation:</span>
                            <p className="font-semibold text-pink-700">{formatDate(result.ovulationDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Fertile Window:</span>
                            <p className="font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                              {result.fertileWindow}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-700 mb-4 text-lg">Cycle Information</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">Cycle Length:</span>
                            <p className="font-semibold text-purple-700">{result.cycleLength} days</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Period Length:</span>
                            <p className="font-semibold text-purple-700">{result.periodLength} days</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Last Period:</span>
                            <p className="font-semibold text-purple-700">{formatDate(result.lmpDate)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Future Cycles Forecast */}
                    <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-6 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-700 mb-4 text-lg">6-Month Forecast</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-indigo-200">
                              <th className="text-left py-2 px-2 text-indigo-700">Month</th>
                              <th className="text-left py-2 px-2 text-indigo-700">Period Start</th>
                              <th className="text-left py-2 px-2 text-indigo-700">Period End</th>
                              <th className="text-left py-2 px-2 text-indigo-700">Ovulation</th>
                              <th className="text-left py-2 px-2 text-indigo-700">Fertile Window</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.futureCycles.map((cycle: any, index: number) => (
                              <tr key={index} className="border-b border-indigo-100">
                                <td className="py-2 px-2 font-medium">{cycle.month}</td>
                                <td className="py-2 px-2 font-semibold text-pink-700">
                                  {formatDate(cycle.periodStart)}
                                </td>
                                <td className="py-2 px-2 text-pink-600">{formatDate(cycle.periodEnd)}</td>
                                <td className="py-2 px-2 font-semibold text-purple-700">
                                  {formatDate(cycle.ovulationDate)}
                                </td>
                                <td className="py-2 px-2 text-xs bg-green-50 text-green-700 rounded ">
                                  {cycle.fertileWindow}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-purple-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">
                    Understanding Your Cycle
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">Menstrual Cycle Phases</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Menstrual Phase:</strong> Days 1-5 (period bleeding)
                          </li>
                          <li>
                            <strong>Follicular Phase:</strong> Days 1-13 (egg development)
                          </li>
                          <li>
                            <strong>Ovulation:</strong> Around day 14 (egg release)
                          </li>
                          <li>
                            <strong>Luteal Phase:</strong> Days 15-28 (preparation for pregnancy)
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-700 mb-3">Calculation Method</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Next Period:</strong> LMP + Cycle Length
                          </li>
                          <li>
                            <strong>Ovulation:</strong> LMP + (Cycle Length - 14)
                          </li>
                          <li>
                            <strong>Fertile Window:</strong> Ovulation ± 2 days
                          </li>
                          <li>
                            <strong>Forecast:</strong> Repeat for next 6 cycles
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Fertility & Timing</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Most fertile:</strong> 2 days before ovulation
                          </li>
                          <li>
                            <strong>Fertile window:</strong> 5 days total around ovulation
                          </li>
                          <li>
                            <strong>Sperm survival:</strong> Up to 5 days in reproductive tract
                          </li>
                          <li>
                            <strong>Egg survival:</strong> 12-24 hours after ovulation
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>This calculator provides estimates based on average cycles</li>
                          <li>Actual cycles can vary due to stress, illness, or lifestyle</li>
                          <li>Track your cycle for 3+ months for better accuracy</li>
                          <li>Consult healthcare providers for irregular cycles</li>
                        </ul>
                      </div>
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
