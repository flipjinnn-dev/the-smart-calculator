"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Heart, Calendar } from "lucide-react"
import Logo from "@/components/logo"

export default function OvulationCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [lastPeriodDate, setLastPeriodDate] = useState("")
  const [cycleLength, setCycleLength] = useState("")

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

  const calculateOvulation = () => {
    if (!validateInputs()) return

    try {
      const lmpDate = new Date(lastPeriodDate)
      const cycleLengthNum = Number.parseInt(cycleLength)

      // Core calculations
      const ovulationDay = cycleLengthNum - 14
      const ovulationDate = new Date(lmpDate)
      ovulationDate.setDate(lmpDate.getDate() + ovulationDay - 1)

      // Ovulation window (2 days before to 2 days after)
      const ovulationWindowStart = new Date(ovulationDate)
      ovulationWindowStart.setDate(ovulationDate.getDate() - 2)
      const ovulationWindowEnd = new Date(ovulationDate)
      ovulationWindowEnd.setDate(ovulationDate.getDate() + 2)

      // Intercourse window (5 days before to 2 days after ovulation)
      const intercourseWindowStart = new Date(ovulationDate)
      intercourseWindowStart.setDate(ovulationDate.getDate() - 5)
      const intercourseWindowEnd = new Date(ovulationDate)
      intercourseWindowEnd.setDate(ovulationDate.getDate() + 2)

      // Pregnancy test date (7 days after ovulation)
      const pregnancyTestDate = new Date(ovulationDate)
      pregnancyTestDate.setDate(ovulationDate.getDate() + 7)

      // Next period start date
      const nextPeriodDate = new Date(lmpDate)
      nextPeriodDate.setDate(lmpDate.getDate() + cycleLengthNum)

      // Due date if pregnant (280 days from LMP)
      const dueDateIfPregnant = new Date(lmpDate)
      dueDateIfPregnant.setDate(lmpDate.getDate() + 280)

      // Calculate next 6 cycles
      const futureCycles = []
      for (let i = 1; i <= 6; i++) {
        const cycleStartDate = new Date(lmpDate)
        cycleStartDate.setDate(lmpDate.getDate() + cycleLengthNum * i)

        const cycleOvulationDate = new Date(cycleStartDate)
        cycleOvulationDate.setDate(cycleStartDate.getDate() + ovulationDay - 1)

        const cycleOvulationWindowStart = new Date(cycleOvulationDate)
        cycleOvulationWindowStart.setDate(cycleOvulationDate.getDate() - 2)
        const cycleOvulationWindowEnd = new Date(cycleOvulationDate)
        cycleOvulationWindowEnd.setDate(cycleOvulationDate.getDate() + 2)

        const cycleIntercourseWindowStart = new Date(cycleOvulationDate)
        cycleIntercourseWindowStart.setDate(cycleOvulationDate.getDate() - 5)
        const cycleIntercourseWindowEnd = new Date(cycleOvulationDate)
        cycleIntercourseWindowEnd.setDate(cycleOvulationDate.getDate() + 2)

        const cycleNextPeriodDate = new Date(cycleStartDate)
        cycleNextPeriodDate.setDate(cycleStartDate.getDate() + cycleLengthNum)

        const cycleDueDateIfPregnant = new Date(cycleStartDate)
        cycleDueDateIfPregnant.setDate(cycleStartDate.getDate() + 280)

        futureCycles.push({
          cycleNumber: i + 1,
          cycleStart: cycleStartDate,
          ovulationDate: cycleOvulationDate,
          ovulationWindow: `${formatDate(cycleOvulationWindowStart)} - ${formatDate(cycleOvulationWindowEnd)}`,
          intercourseWindow: `${formatDate(cycleIntercourseWindowStart)} - ${formatDate(cycleIntercourseWindowEnd)}`,
          nextPeriodDate: cycleNextPeriodDate,
          dueDateIfPregnant: cycleDueDateIfPregnant,
        })
      }

      const results = {
        lmpDate,
        cycleLength: cycleLengthNum,
        ovulationDate,
        ovulationWindow: `${formatDate(ovulationWindowStart)} - ${formatDate(ovulationWindowEnd)}`,
        intercourseWindow: `${formatDate(intercourseWindowStart)} - ${formatDate(intercourseWindowEnd)}`,
        pregnancyTestDate,
        nextPeriodDate,
        dueDateIfPregnant,
        futureCycles,
      }

      setResult(results)
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating ovulation dates. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setLastPeriodDate("")
    setCycleLength("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  // Generate cycle length options (22-44 days)
  const cycleLengthOptions = []
  for (let i = 22; i <= 44; i++) {
    cycleLengthOptions.push(i)
  }

  return (
    <>
      <Head>
        <title>Ovulation Calculator - Fertility & Ovulation Tracker - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate your ovulation dates, fertile window, and pregnancy test dates. Professional ovulation calculator for family planning and fertility tracking."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Ovulation Calculator</p>
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
              <span className="text-gray-400">/</span>
              <Link href="/health" className="text-gray-500 hover:text-pink-600">
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Ovulation Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ovulation Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your ovulation dates, fertile window, and optimal conception times. Track your menstrual cycle
                and plan for pregnancy with accurate fertility predictions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-pink-600" />
                      <span>Ovulation Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your menstrual cycle details to calculate ovulation dates
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
                          First Day of Your Last Period *
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
                          Average Length of Cycle *
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
                        <p className="text-xs text-gray-500 mt-1">
                          Average menstrual cycle length ranges from 22 to 44 days (28 days is typical)
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateOvulation}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                      >
                        Calculate Ovulation
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">Fertility Window</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-pink-200">
                          <p className="text-lg font-bold text-pink-900 mb-2">{formatDate(result.ovulationDate)}</p>
                          <p className="text-sm font-medium text-gray-600 mb-2">Most Probable Ovulation</p>
                          <p className="text-xs text-gray-500">Fertile window: {result.ovulationWindow}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-pink-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your cycle details to calculate your fertile window.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calendar className="w-6 h-6 text-pink-600" />
                      <span>Your Ovulation Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-700 mb-4 text-lg">Current Cycle</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">Most Probable Ovulation Date:</span>
                            <p className="font-semibold text-pink-700">{formatDate(result.ovulationDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Ovulation Window:</span>
                            <p className="font-semibold text-pink-700">{result.ovulationWindow}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Best Intercourse Window:</span>
                            <p className="font-semibold text-pink-700">{result.intercourseWindow}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-4 text-lg">Important Dates</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">Pregnancy Test Date:</span>
                            <p className="font-semibold text-blue-700">{formatDate(result.pregnancyTestDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Next Period Start:</span>
                            <p className="font-semibold text-blue-700">{formatDate(result.nextPeriodDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Due Date (if pregnant):</span>
                            <p className="font-semibold text-blue-700">{formatDate(result.dueDateIfPregnant)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Future Cycles Table */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-700 mb-4 text-lg">Next 6 Cycles Forecast</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-purple-200">
                              <th className="text-left py-2 px-2 text-purple-700">Cycle</th>
                              <th className="text-left py-2 px-2 text-purple-700">Cycle Start</th>
                              <th className="text-left py-2 px-2 text-purple-700">Ovulation Date</th>
                              <th className="text-left py-2 px-2 text-purple-700">Fertile Window</th>
                              <th className="text-left py-2 px-2 text-purple-700">Next Period</th>
                              <th className="text-left py-2 px-2 text-purple-700">Due Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.futureCycles.map((cycle: any, index: number) => (
                              <tr key={index} className="border-b border-purple-100">
                                <td className="py-2 px-2 font-medium">{cycle.cycleNumber}</td>
                                <td className="py-2 px-2">{formatDate(cycle.cycleStart)}</td>
                                <td className="py-2 px-2 font-semibold text-pink-700">
                                  {formatDate(cycle.ovulationDate)}
                                </td>
                                <td className="py-2 px-2 text-xs">{cycle.ovulationWindow}</td>
                                <td className="py-2 px-2">{formatDate(cycle.nextPeriodDate)}</td>
                                <td className="py-2 px-2">{formatDate(cycle.dueDateIfPregnant)}</td>
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
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">
                    Understanding Ovulation
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">How It Works</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Ovulation typically occurs 14 days before your next period</li>
                          <li>The egg survives for about 12-24 hours after ovulation</li>
                          <li>Sperm can survive in the reproductive tract for up to 5 days</li>
                          <li>The fertile window is approximately 6 days long</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-700 mb-3">Best Times for Conception</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Highest probability:</strong> 1-2 days before ovulation
                          </li>
                          <li>
                            <strong>Good probability:</strong> Day of ovulation
                          </li>
                          <li>
                            <strong>Lower probability:</strong> 3-5 days before ovulation
                          </li>
                          <li>
                            <strong>Very low:</strong> After ovulation day
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-rose-700 mb-3">Signs of Ovulation</h3>
                      <div className="bg-white p-4 rounded-lg border border-rose-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Changes in cervical mucus (clear, stretchy)</li>
                          <li>Slight increase in basal body temperature</li>
                          <li>Mild pelvic or abdominal pain</li>
                          <li>Breast tenderness</li>
                          <li>Increased libido</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-rose-700 mb-3">Important Notes</h3>
                      <div className="bg-white p-4 rounded-lg border border-rose-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>This calculator provides estimates based on average cycles</li>
                          <li>Actual ovulation can vary by 1-2 days</li>
                          <li>Stress, illness, and lifestyle can affect timing</li>
                          <li>Consult healthcare providers for fertility concerns</li>
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
