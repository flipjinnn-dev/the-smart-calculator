"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Timer, Activity, Zap, Clock } from "lucide-react"
import Logo from "@/components/logo"

export default function RunningPaceCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Input states
  const [timeInput, setTimeInput] = useState("")
  const [distanceInput, setDistanceInput] = useState("")
  const [distanceUnit, setDistanceUnit] = useState("miles")
  const [outputUnit, setOutputUnit] = useState("min_per_mile")

  // Race presets
  const racePresets = {
    "5k": { distance: 5, unit: "km" },
    "10k": { distance: 10, unit: "km" },
    half_marathon: { distance: 13.1, unit: "miles" },
    marathon: { distance: 26.2, unit: "miles" },
    "1500m": { distance: 1500, unit: "meters" },
    "1_mile": { distance: 1, unit: "miles" },
    "3000m": { distance: 3000, unit: "meters" },
    "5000m": { distance: 5000, unit: "meters" },
  }

  const parseTimeInput = (input: string): number => {
    if (!input.trim()) return 0

    // Handle flexible formats like "5:3" → "00:05:03"
    const parts = input.split(":").map((p) => p.trim())

    if (parts.length === 1) {
      // Just seconds
      return Number.parseInt(parts[0]) || 0
    } else if (parts.length === 2) {
      // mm:ss format
      const minutes = Number.parseInt(parts[0]) || 0
      const seconds = Number.parseInt(parts[1]) || 0
      return minutes * 60 + seconds
    } else if (parts.length === 3) {
      // hh:mm:ss format
      const hours = Number.parseInt(parts[0]) || 0
      const minutes = Number.parseInt(parts[1]) || 0
      const seconds = Number.parseInt(parts[2]) || 0
      return hours * 3600 + minutes * 60 + seconds
    }

    return 0
  }

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }
  }

  const convertDistance = (distance: number, fromUnit: string, toUnit: string): number => {
    // Convert to meters first
    let meters = distance
    switch (fromUnit) {
      case "miles":
        meters = distance * 1609.34
        break
      case "km":
        meters = distance * 1000
        break
      case "yards":
        meters = distance * 0.9144
        break
      case "meters":
        meters = distance
        break
    }

    // Convert from meters to target unit
    switch (toUnit) {
      case "miles":
        return meters / 1609.34
      case "km":
        return meters / 1000
      case "yards":
        return meters / 0.9144
      case "meters":
        return meters
      default:
        return meters
    }
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    const timeSeconds = parseTimeInput(timeInput)
    const distance = Number.parseFloat(distanceInput)

    // Check if we have at least 2 inputs
    const hasTime = timeSeconds > 0
    const hasDistance = distance > 0

    if (!hasTime && !hasDistance) {
      newErrors.general = "Please enter at least time and distance to calculate pace"
      setErrors(newErrors)
      return false
    }

    if (hasTime && timeSeconds <= 0) {
      newErrors.time = "Time must be greater than 0"
    }

    if (hasDistance && distance <= 0) {
      newErrors.distance = "Distance must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculatePace = () => {
    if (!validateInputs()) return

    try {
      const timeSeconds = parseTimeInput(timeInput)
      const distance = Number.parseFloat(distanceInput)

      // Convert distance to standard unit (miles for pace calculations)
      const distanceInMiles = convertDistance(distance, distanceUnit, "miles")
      const distanceInKm = convertDistance(distance, distanceUnit, "km")

      // Calculate pace in seconds per mile
      const paceSecondsPerMile = timeSeconds / distanceInMiles
      const paceSecondsPerKm = timeSeconds / distanceInKm

      // Calculate speed
      const speedMph = (distanceInMiles / timeSeconds) * 3600
      const speedKmh = (distanceInKm / timeSeconds) * 3600

      // Format results based on output unit
      let primaryResult = ""
      let secondaryResults: { [key: string]: string } = {}

      switch (outputUnit) {
        case "min_per_mile":
          primaryResult = formatTime(paceSecondsPerMile)
          secondaryResults = {
            "Pace per km": formatTime(paceSecondsPerKm),
            "Speed (mph)": speedMph.toFixed(2),
            "Speed (km/h)": speedKmh.toFixed(2),
          }
          break
        case "min_per_km":
          primaryResult = formatTime(paceSecondsPerKm)
          secondaryResults = {
            "Pace per mile": formatTime(paceSecondsPerMile),
            "Speed (mph)": speedMph.toFixed(2),
            "Speed (km/h)": speedKmh.toFixed(2),
          }
          break
        case "mph":
          primaryResult = speedMph.toFixed(2)
          secondaryResults = {
            "Pace per mile": formatTime(paceSecondsPerMile),
            "Pace per km": formatTime(paceSecondsPerKm),
            "Speed (km/h)": speedKmh.toFixed(2),
          }
          break
        case "kmh":
          primaryResult = speedKmh.toFixed(2)
          secondaryResults = {
            "Pace per mile": formatTime(paceSecondsPerMile),
            "Pace per km": formatTime(paceSecondsPerKm),
            "Speed (mph)": speedMph.toFixed(2),
          }
          break
      }

      setResult({
        primaryResult,
        secondaryResults,
        outputUnit,
        inputs: {
          time: timeInput,
          distance: distanceInput,
          distanceUnit,
          totalSeconds: timeSeconds,
          distanceValue: distance,
        },
        calculations: {
          paceSecondsPerMile,
          paceSecondsPerKm,
          speedMph,
          speedKmh,
          distanceInMiles,
          distanceInKm,
        },
      })
      setShowResult(true)
    } catch (error) {
      setErrors({ general: "Error calculating pace. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setTimeInput("")
    setDistanceInput("")
    setDistanceUnit("miles")
    setOutputUnit("min_per_mile")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  const handleRacePreset = (preset: string) => {
    const race = racePresets[preset as keyof typeof racePresets]
    if (race) {
      setDistanceInput(race.distance.toString())
      setDistanceUnit(race.unit)
    }
  }

  const getOutputUnitLabel = (unit: string) => {
    switch (unit) {
      case "min_per_mile":
        return "min/mile"
      case "min_per_km":
        return "min/km"
      case "mph":
        return "mph"
      case "kmh":
        return "km/h"
      default:
        return unit
    }
  }

  return (
    <>
      <Head>
        <title>Running Pace Calculator - Health & Fitness Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate running pace, time, or distance with flexible time formats and multiple units. Perfect for runners and athletes."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Running Pace Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-orange-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/health" className="text-gray-500 hover:text-orange-600">
                Health & Fitness
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Running Pace Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Running Pace Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate running pace, time, or distance with flexible time formats and multiple units. Perfect for
                training and race planning.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-orange-600" />
                      <span>Pace Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter time and distance to calculate your running pace
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      {/* Time Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Time (hh:mm:ss or flexible format)
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Timer className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.time ? "border-red-300" : ""}`}
                            type="text"
                            placeholder="25:30 or 1:25:30"
                            value={timeInput}
                            onChange={(e) => setTimeInput(e.target.value)}
                          />
                        </div>
                        {errors.time && <p className="text-red-600 text-xs mt-1">{errors.time}</p>}
                        <p className="text-xs text-gray-500 mt-1">Examples: 5:30, 25:45, 1:30:00</p>
                      </div>

                      {/* Distance Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Distance</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Activity className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input
                              className={`h-12 pl-10 ${errors.distance ? "border-red-300" : ""}`}
                              type="text"
                              placeholder="5.0"
                              value={distanceInput}
                              onChange={(e) => setDistanceInput(e.target.value)}
                            />
                          </div>
                          <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                            <SelectTrigger className="w-32 h-12 border-2 focus:border-orange-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="miles">miles</SelectItem>
                              <SelectItem value="km">km</SelectItem>
                              <SelectItem value="meters">meters</SelectItem>
                              <SelectItem value="yards">yards</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.distance && <p className="text-red-600 text-xs mt-1">{errors.distance}</p>}
                      </div>

                      {/* Race Presets */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Race Presets (Optional)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {Object.entries(racePresets).map(([key, race]) => (
                            <Button
                              key={key}
                              variant="outline"
                              size="sm"
                              onClick={() => handleRacePreset(key)}
                              className="text-xs border-orange-300 text-orange-700 hover:bg-orange-50"
                            >
                              {key.replace("_", " ").toUpperCase()}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Output Unit Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Output Format</Label>
                        <Select value={outputUnit} onValueChange={setOutputUnit}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="min_per_mile">Pace (min/mile)</SelectItem>
                            <SelectItem value="min_per_km">Pace (min/km)</SelectItem>
                            <SelectItem value="mph">Speed (mph)</SelectItem>
                            <SelectItem value="kmh">Speed (km/h)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculatePace}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800"
                      >
                        Calculate Pace
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mb-3 shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">Your Pace</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-orange-200">
                          <p className="text-2xl font-bold text-orange-900">{result.primaryResult}</p>
                          <p className="text-gray-600 text-sm">{getOutputUnitLabel(result.outputUnit)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Activity className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your time and distance to calculate your running pace.
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
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-orange-600" />
                      <span>Your Running Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Main Results */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                      <h3 className="text-xl font-semibold text-orange-700 mb-4">Primary Result</h3>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-orange-700 mb-2">{result.primaryResult}</p>
                        <p className="text-lg text-gray-600">{getOutputUnitLabel(result.outputUnit)}</p>
                      </div>
                    </div>

                    {/* Secondary Results */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-orange-700 mb-4">All Formats</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(result.secondaryResults).map(([label, value]) => (
                          <div key={label} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <p className="text-lg font-bold text-orange-700">{result.secondaryResults.value}</p>
                            <p className="text-sm text-gray-600">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-orange-700 mb-6">Calculation Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-orange-700 mb-3">Input Summary</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Time:</strong> {result.inputs.time} ({formatTime(result.inputs.totalSeconds)})
                            </p>
                            <p>
                              <strong>Distance:</strong> {result.inputs.distance} {result.inputs.distanceUnit}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <h4 className="font-semibold text-amber-700 mb-3">Conversions</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>Distance:</strong> {result.calculations.distanceInMiles.toFixed(2)} miles
                            </p>
                            <p>
                              <strong>Distance:</strong> {result.calculations.distanceInKm.toFixed(2)} km
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-700 flex items-center justify-center mr-3 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">
                    Understanding Running Pace
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Pace vs Speed</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Pace:</strong> Time per unit distance (min/mile, min/km)
                          </li>
                          <li>
                            <strong>Speed:</strong> Distance per unit time (mph, km/h)
                          </li>
                          <li>Faster pace = lower time per mile</li>
                          <li>Higher speed = more distance per hour</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Example Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-gray-700 mb-2">
                          <strong>5K in 25:00</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>Distance: 5 km = 3.11 miles</p>
                          <p>
                            Pace: 25:00 ÷ 5 = <strong>5:00 min/km</strong>
                          </p>
                          <p>
                            Pace: 25:00 ÷ 3.11 = <strong>8:02 min/mile</strong>
                          </p>
                          <p>
                            Speed: <strong>7.5 mph</strong> or <strong>12 km/h</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Training Zones</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Easy Run:</strong> 1-2 min/mile slower than 5K pace
                          </li>
                          <li>
                            <strong>Tempo:</strong> 15-30 sec/mile slower than 5K pace
                          </li>
                          <li>
                            <strong>Interval:</strong> 5K pace or faster
                          </li>
                          <li>
                            <strong>Long Run:</strong> 30-90 sec/mile slower than 5K pace
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-orange-700 mb-3">Common Race Paces</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>
                            <strong>5K:</strong> 6:00-10:00 min/mile (recreational)
                          </p>
                          <p>
                            <strong>10K:</strong> 6:30-10:30 min/mile
                          </p>
                          <p>
                            <strong>Half Marathon:</strong> 7:00-11:00 min/mile
                          </p>
                          <p>
                            <strong>Marathon:</strong> 7:30-12:00 min/mile
                          </p>
                        </div>
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
