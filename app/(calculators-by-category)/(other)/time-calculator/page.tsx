"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import Head from "next/head"
import { Clock, Calculator, Plus, Minus, AlertCircle, Timer } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function TimeCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states for Time A
  const [timeADays, setTimeADays] = useState("")
  const [timeAHours, setTimeAHours] = useState("")
  const [timeAMinutes, setTimeAMinutes] = useState("")
  const [timeASeconds, setTimeASeconds] = useState("")

  // Input states for Time B
  const [timeBDays, setTimeBDays] = useState("")
  const [timeBHours, setTimeBHours] = useState("")
  const [timeBMinutes, setTimeBMinutes] = useState("")
  const [timeBSeconds, setTimeBSeconds] = useState("")

  // Operation selection
  const [operation, setOperation] = useState("add")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    // Validate Time A inputs
    const aDays = Number.parseFloat(timeADays || "0")
    const aHours = Number.parseFloat(timeAHours || "0")
    const aMinutes = Number.parseFloat(timeAMinutes || "0")
    const aSeconds = Number.parseFloat(timeASeconds || "0")

    if (aDays < 0 || aHours < 0 || aMinutes < 0 || aSeconds < 0) {
      newErrors.timeA = "Time A values must be non-negative"
    }

    // Validate Time B inputs
    const bDays = Number.parseFloat(timeBDays || "0")
    const bHours = Number.parseFloat(timeBHours || "0")
    const bMinutes = Number.parseFloat(timeBMinutes || "0")
    const bSeconds = Number.parseFloat(timeBSeconds || "0")

    if (bDays < 0 || bHours < 0 || bMinutes < 0 || bSeconds < 0) {
      newErrors.timeB = "Time B values must be non-negative"
    }

    // Check if at least one time has values
    const timeATotal = aDays + aHours + aMinutes + aSeconds
    const timeBTotal = bDays + bHours + bMinutes + bSeconds

    if (timeATotal === 0 && timeBTotal === 0) {
      newErrors.general = "Please enter at least one time value"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateTime = () => {
    if (!validateInputs()) return

    // Convert Time A to seconds
    const aDays = Number.parseFloat(timeADays || "0")
    const aHours = Number.parseFloat(timeAHours || "0")
    const aMinutes = Number.parseFloat(timeAMinutes || "0")
    const aSeconds = Number.parseFloat(timeASeconds || "0")
    const timeAInSeconds = aDays * 86400 + aHours * 3600 + aMinutes * 60 + aSeconds

    // Convert Time B to seconds
    const bDays = Number.parseFloat(timeBDays || "0")
    const bHours = Number.parseFloat(timeBHours || "0")
    const bMinutes = Number.parseFloat(timeBMinutes || "0")
    const bSeconds = Number.parseFloat(timeBSeconds || "0")
    const timeBInSeconds = bDays * 86400 + bHours * 3600 + bMinutes * 60 + bSeconds

    // Perform operation
    let resultInSeconds = 0
    if (operation === "add") {
      resultInSeconds = timeAInSeconds + timeBInSeconds
    } else {
      resultInSeconds = Math.abs(timeAInSeconds - timeBInSeconds)
    }

    // Convert result back to days, hours, minutes, seconds
    const resultDays = Math.floor(resultInSeconds / 86400)
    const resultHours = Math.floor((resultInSeconds % 86400) / 3600)
    const resultMinutes = Math.floor((resultInSeconds % 3600) / 60)
    const finalSeconds = resultInSeconds % 60

    setResult({
      timeA: { days: aDays, hours: aHours, minutes: aMinutes, seconds: aSeconds, totalSeconds: timeAInSeconds },
      timeB: { days: bDays, hours: bHours, minutes: bMinutes, seconds: bSeconds, totalSeconds: timeBInSeconds },
      operation: operation,
      result: {
        days: resultDays,
        hours: resultHours,
        minutes: resultMinutes,
        seconds: Math.round(finalSeconds),
        totalSeconds: resultInSeconds,
      },
    })
    setShowResult(true)
  // Scroll to results
  scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  return (
    <>
      <Head>
        <title>Time Calculator - Addition & Subtraction - Smart Calculator</title>
        <meta
          name="description"
          content="Add or subtract time values with days, hours, minutes, and seconds. Precise time calculations with detailed breakdowns."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_720-8sE77EX08xKuB6AvLTisdyhRT3j1X2.png"
                  alt="Smart Calculator Logo"
                  className="w-12 h-12"
                />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Time Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/other-calculators" className="text-gray-500 hover:text-blue-600">
                Other
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Time Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Time Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Add or subtract time values with precision. Calculate time differences and sums using days, hours,
                minutes, and seconds with detailed breakdowns.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Timer className="w-6 h-6 text-gray-600" />
                      <span>Time Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter two time values and select an operation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <Label className="text-sm font-medium text-gray-700 mb-4 block">Operation</Label>
                      <RadioGroup value={operation} onValueChange={setOperation} className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="add" id="add" />
                          <Label htmlFor="add" className="flex items-center space-x-2 cursor-pointer">
                            <Plus className="w-4 h-4 text-green-600" />
                            <span>Addition</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="subtract" id="subtract" />
                          <Label htmlFor="subtract" className="flex items-center space-x-2 cursor-pointer">
                            <Minus className="w-4 h-4 text-red-600" />
                            <span>Subtraction</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mb-8">
                      <Label className="text-lg font-semibold text-gray-700 mb-4 block">Time A</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">Days</Label>
                          <Input
                            className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${
                              errors.timeA ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={timeADays}
                            onChange={(e) => {
                              setTimeADays(e.target.value)
                              if (errors.timeA) setErrors((prev) => ({ ...prev, timeA: "" }))
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">Hours</Label>
                          <Input
                            className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${
                              errors.timeA ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={timeAHours}
                            onChange={(e) => {
                              setTimeAHours(e.target.value)
                              if (errors.timeA) setErrors((prev) => ({ ...prev, timeA: "" }))
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">Minutes</Label>
                          <Input
                            className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${
                              errors.timeA ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={timeAMinutes}
                            onChange={(e) => {
                              setTimeAMinutes(e.target.value)
                              if (errors.timeA) setErrors((prev) => ({ ...prev, timeA: "" }))
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">Seconds</Label>
                          <Input
                            className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${
                              errors.timeA ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={timeASeconds}
                            onChange={(e) => {
                              setTimeASeconds(e.target.value)
                              if (errors.timeA) setErrors((prev) => ({ ...prev, timeA: "" }))
                            }}
                          />
                        </div>
                      </div>
                      {errors.timeA && (
                        <div className="flex items-center mt-2 text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{errors.timeA}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-8">
                      <Label className="text-lg font-semibold text-gray-700 mb-4 block">Time B</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">Days</Label>
                          <Input
                            className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${
                              errors.timeB ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={timeBDays}
                            onChange={(e) => {
                              setTimeBDays(e.target.value)
                              if (errors.timeB) setErrors((prev) => ({ ...prev, timeB: "" }))
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">Hours</Label>
                          <Input
                            className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${
                              errors.timeB ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={timeBHours}
                            onChange={(e) => {
                              setTimeBHours(e.target.value)
                              if (errors.timeB) setErrors((prev) => ({ ...prev, timeB: "" }))
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">Minutes</Label>
                          <Input
                            className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${
                              errors.timeB ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={timeBMinutes}
                            onChange={(e) => {
                              setTimeBMinutes(e.target.value)
                              if (errors.timeB) setErrors((prev) => ({ ...prev, timeB: "" }))
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600 mb-2 block">Seconds</Label>
                          <Input
                            className={`h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-200 shadow-sm ${
                              errors.timeB ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={timeBSeconds}
                            onChange={(e) => {
                              setTimeBSeconds(e.target.value)
                              if (errors.timeB) setErrors((prev) => ({ ...prev, timeB: "" }))
                            }}
                          />
                        </div>
                      </div>
                      {errors.timeB && (
                        <div className="flex items-center mt-2 text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{errors.timeB}</span>
                        </div>
                      )}
                    </div>

                    {errors.general && (
                      <div className="flex items-center mb-6 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.general}</span>
                      </div>
                    )}

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700">
                        <strong>Formula:</strong> Convert each time to seconds, perform operation, then convert back
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        1 day = 86,400 seconds | 1 hour = 3,600 seconds | 1 minute = 60 seconds
                      </p>
                    </div>

                    <Button
                      onClick={calculateTime}
                      className="w-full h-12 text-lg bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800"
                    >
                      Calculate Time
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-gray-50 to-slate-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-slate-700 flex items-center justify-center mb-3 shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-700 tracking-tight">Time Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">{result.result.days}</p>
                            <p className="text-gray-600">Days</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">{result.result.hours}</p>
                            <p className="text-gray-600">Hours</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">{result.result.minutes}</p>
                            <p className="text-gray-600">Minutes</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-2xl font-bold text-gray-900">{result.result.seconds}</p>
                            <p className="text-gray-600">Seconds</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Clock className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter time values and click <span className="font-semibold text-gray-600">Calculate</span> to
                          see results.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-gray-600" />
                      <span>Detailed Time Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Days</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{result.result.days}</p>
                        <p className="text-sm text-gray-600">d</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Timer className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Hours</h3>
                        <p className="text-2xl font-bold text-gray-900 mb-1">{result.result.hours}</p>
                        <p className="text-sm text-gray-600">h</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Minutes</h3>
                        <p className="text-2xl font-bold text-gray-900 mb-1">{result.result.minutes}</p>
                        <p className="text-sm text-gray-600">m</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Seconds</h3>
                        <p className="text-2xl font-bold text-gray-900 mb-1">{result.result.seconds}</p>
                        <p className="text-sm text-gray-600">s</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Calculation Steps:</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>Step 1:</strong> Time A = {result.timeA.totalSeconds?.toLocaleString()} seconds
                        </p>
                        <p>
                          <strong>Step 2:</strong> Time B = {result.timeB.totalSeconds?.toLocaleString()} seconds
                        </p>
                        <p>
                          <strong>Step 3:</strong> {result.operation === "add" ? "Addition" : "Subtraction"} ={" "}
                          {result.result.totalSeconds?.toLocaleString()} seconds
                        </p>
                        <p>
                          <strong>Step 4:</strong> Convert back = {result.result.days}d {result.result.hours}h{" "}
                          {result.result.minutes}m {result.result.seconds}s
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-50 to-slate-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-slate-700 flex items-center justify-center mr-3 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-700 tracking-tight">
                    Understanding Time Calculations
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">How It Works</h3>
                      <p className="text-gray-700 mb-4">
                        Time calculations involve converting time units to a common base (seconds), performing the
                        operation, then converting back to readable format.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Conversion Factors</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>1 day = 86,400 seconds</li>
                        <li>1 hour = 3,600 seconds</li>
                        <li>1 minute = 60 seconds</li>
                        <li>1 second = 1 second</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Example:</strong> Addition
                        </p>
                        <p className="text-gray-700">Time A: 1d 2h 30m 20s</p>
                        <p className="text-gray-700">Time B: 0d 5h 45m 40s</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Steps:</strong>
                        </p>
                        <p className="text-gray-700">A = 95,420 seconds</p>
                        <p className="text-gray-700">B = 20,740 seconds</p>
                        <p className="text-gray-700">Sum = 116,160 seconds</p>
                        <p className="text-gray-700 font-semibold">Result = 1d 8h 16m 0s</p>
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
