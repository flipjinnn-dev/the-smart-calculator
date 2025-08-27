"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Head from "next/head"
import { Trophy, Calculator, Target, AlertCircle, Activity, RotateCcw, HelpCircle, BarChart3 } from "lucide-react"
import Logo from "@/components/logo"

export default function FIPCalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [decimalPrecision, setDecimalPrecision] = useState("2")
  const [advancedMode, setAdvancedMode] = useState(false)

  // Input states
  const [homeRuns, setHomeRuns] = useState("")
  const [walks, setWalks] = useState("")
  const [hitByPitch, setHitByPitch] = useState("")
  const [strikeouts, setStrikeouts] = useState("")
  const [inningsPitched, setInningsPitched] = useState("")
  const [fipConstant, setFipConstant] = useState("3.214")

  // Advanced mode league stats
  const [leagueERA, setLeagueERA] = useState("")
  const [leagueHR, setLeagueHR] = useState("")
  const [leagueBB, setLeagueBB] = useState("")
  const [leagueHBP, setLeagueHBP] = useState("")
  const [leagueK, setLeagueK] = useState("")
  const [leagueIP, setLeagueIP] = useState("")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!homeRuns || Number.parseInt(homeRuns) < 0 || !Number.isInteger(Number.parseFloat(homeRuns))) {
      newErrors.homeRuns = "Please enter a valid number of home runs (≥ 0, whole number)"
    }

    if (!walks || Number.parseInt(walks) < 0 || !Number.isInteger(Number.parseFloat(walks))) {
      newErrors.walks = "Please enter a valid number of walks (≥ 0, whole number)"
    }

    if (!hitByPitch || Number.parseInt(hitByPitch) < 0 || !Number.isInteger(Number.parseFloat(hitByPitch))) {
      newErrors.hitByPitch = "Please enter a valid number of hit by pitch (≥ 0, whole number)"
    }

    if (!strikeouts || Number.parseInt(strikeouts) < 0 || !Number.isInteger(Number.parseFloat(strikeouts))) {
      newErrors.strikeouts = "Please enter a valid number of strikeouts (≥ 0, whole number)"
    }

    if (!inningsPitched || Number.parseFloat(inningsPitched) <= 0) {
      newErrors.inningsPitched = "Please enter a valid number of innings pitched (> 0)"
    }

    if (!fipConstant || Number.parseFloat(fipConstant) <= 0) {
      newErrors.fipConstant = "Please enter a valid FIP constant (> 0)"
    }

    // Advanced mode validation
    if (advancedMode) {
      if (!leagueERA || Number.parseFloat(leagueERA) <= 0) {
        newErrors.leagueERA = "Please enter a valid league ERA (> 0)"
      }
      if (!leagueHR || Number.parseInt(leagueHR) < 0) {
        newErrors.leagueHR = "Please enter a valid league HR (≥ 0)"
      }
      if (!leagueBB || Number.parseInt(leagueBB) < 0) {
        newErrors.leagueBB = "Please enter a valid league BB (≥ 0)"
      }
      if (!leagueHBP || Number.parseInt(leagueHBP) < 0) {
        newErrors.leagueHBP = "Please enter a valid league HBP (≥ 0)"
      }
      if (!leagueK || Number.parseInt(leagueK) < 0) {
        newErrors.leagueK = "Please enter a valid league K (≥ 0)"
      }
      if (!leagueIP || Number.parseFloat(leagueIP) <= 0) {
        newErrors.leagueIP = "Please enter a valid league IP (> 0)"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateFIP = () => {
    if (!validateInputs()) return

    const hr = Number.parseInt(homeRuns)
    const bb = Number.parseInt(walks)
    const hbp = Number.parseInt(hitByPitch)
    const k = Number.parseInt(strikeouts)
    const ip = Number.parseFloat(inningsPitched)
    let cfip = Number.parseFloat(fipConstant)

    // Calculate custom cFIP if in advanced mode
    if (advancedMode) {
      const lERA = Number.parseFloat(leagueERA)
      const lHR = Number.parseInt(leagueHR)
      const lBB = Number.parseInt(leagueBB)
      const lHBP = Number.parseInt(leagueHBP)
      const lK = Number.parseInt(leagueK)
      const lIP = Number.parseFloat(leagueIP)

      cfip = lERA - (13 * lHR + 3 * (lBB + lHBP) - 2 * lK) / lIP
    }

    // Calculate FIP components
    const hrComponent = 13 * hr
    const walkHbpComponent = 3 * (bb + hbp)
    const strikeoutComponent = -2 * k
    const numerator = hrComponent + walkHbpComponent + strikeoutComponent

    // Calculate FIP
    const fip = numerator / ip + cfip

    // Determine performance level
    let performanceLevel = ""
    if (fip <= 3.2) {
      performanceLevel = "Excellent"
    } else if (fip <= 3.75) {
      performanceLevel = "Above Average"
    } else if (fip <= 4.2) {
      performanceLevel = "Average"
    } else if (fip <= 4.75) {
      performanceLevel = "Below Average"
    } else {
      performanceLevel = "Poor"
    }

    setResult({
      homeRuns: hr,
      walks: bb,
      hitByPitch: hbp,
      strikeouts: k,
      inningsPitched: ip,
      fipConstant: cfip,
      hrComponent: hrComponent,
      walkHbpComponent: walkHbpComponent,
      strikeoutComponent: strikeoutComponent,
      numerator: numerator,
      fip: fip,
      performanceLevel: performanceLevel,
      customCFIP: advancedMode,
    })
    setShowResult(true)
  }

  const resetCalculator = () => {
    setHomeRuns("")
    setWalks("")
    setHitByPitch("")
    setStrikeouts("")
    setInningsPitched("")
    setFipConstant("3.214")
    setLeagueERA("")
    setLeagueHR("")
    setLeagueBB("")
    setLeagueHBP("")
    setLeagueK("")
    setLeagueIP("")
    setResult(null)
    setShowResult(false)
    setErrors({})
    setAdvancedMode(false)
  }

  const precision = Number.parseInt(decimalPrecision)

  return (
    <>
      <Head>
        <title>FIP Calculator - Fielding Independent Pitching - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate Fielding Independent Pitching (FIP) for baseball pitchers. Evaluate pitcher performance independent of fielding using sabermetric analysis."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">FIP Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-purple-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/sports" className="text-gray-500 hover:text-purple-600">
                Sports
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">FIP Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">FIP Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate Fielding Independent Pitching (FIP) to evaluate pitcher performance independent of fielding
                support. FIP focuses on outcomes pitchers can directly control: home runs, walks, hit batters, and
                strikeouts.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-purple-600" />
                      <span>Pitching Statistics</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter pitching statistics to calculate Fielding Independent Pitching (FIP)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Home Runs */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center">
                          Home Runs Allowed (HR)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Home runs allowed by the pitcher
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                              errors.homeRuns ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter home runs"
                            value={homeRuns}
                            onChange={(e) => {
                              setHomeRuns(e.target.value)
                              if (errors.homeRuns) setErrors((prev) => ({ ...prev, homeRuns: "" }))
                            }}
                          />
                        </div>
                        {errors.homeRuns && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.homeRuns}</span>
                          </div>
                        )}
                      </div>

                      {/* Walks */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center">
                          Walks (BB)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Base on balls issued by the pitcher
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calculator className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                              errors.walks ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter walks"
                            value={walks}
                            onChange={(e) => {
                              setWalks(e.target.value)
                              if (errors.walks) setErrors((prev) => ({ ...prev, walks: "" }))
                            }}
                          />
                        </div>
                        {errors.walks && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.walks}</span>
                          </div>
                        )}
                      </div>

                      {/* Hit By Pitch */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center">
                          Hit By Pitch (HBP)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Batters hit by pitch
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AlertCircle className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                              errors.hitByPitch ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter HBP"
                            value={hitByPitch}
                            onChange={(e) => {
                              setHitByPitch(e.target.value)
                              if (errors.hitByPitch) setErrors((prev) => ({ ...prev, hitByPitch: "" }))
                            }}
                          />
                        </div>
                        {errors.hitByPitch && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.hitByPitch}</span>
                          </div>
                        )}
                      </div>

                      {/* Strikeouts */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center">
                          Strikeouts (K)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Strikeouts recorded by the pitcher
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Trophy className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                              errors.strikeouts ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter strikeouts"
                            value={strikeouts}
                            onChange={(e) => {
                              setStrikeouts(e.target.value)
                              if (errors.strikeouts) setErrors((prev) => ({ ...prev, strikeouts: "" }))
                            }}
                          />
                        </div>
                        {errors.strikeouts && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.strikeouts}</span>
                          </div>
                        )}
                      </div>

                      {/* Innings Pitched */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center">
                          Innings Pitched (IP)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Total innings pitched (e.g., 145.2)
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BarChart3 className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                              errors.inningsPitched ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="0.1"
                            min="0"
                            placeholder="Enter innings pitched"
                            value={inningsPitched}
                            onChange={(e) => {
                              setInningsPitched(e.target.value)
                              if (errors.inningsPitched) setErrors((prev) => ({ ...prev, inningsPitched: "" }))
                            }}
                          />
                        </div>
                        {errors.inningsPitched && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.inningsPitched}</span>
                          </div>
                        )}
                      </div>

                      {/* FIP Constant */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center">
                          FIP Constant (cFIP)
                          <div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              Scaling constant (~3.1-3.2)
                            </div>
                          </div>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calculator className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input
                            className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${
                              errors.fipConstant ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""
                            }`}
                            type="number"
                            step="0.001"
                            min="0"
                            placeholder="Enter FIP constant"
                            value={fipConstant}
                            onChange={(e) => {
                              setFipConstant(e.target.value)
                              if (errors.fipConstant) setErrors((prev) => ({ ...prev, fipConstant: "" }))
                            }}
                            disabled={advancedMode}
                          />
                        </div>
                        {errors.fipConstant && (
                          <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.fipConstant}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Decimal Precision */}
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Decimal Precision</Label>
                        <Select value={decimalPrecision} onValueChange={setDecimalPrecision}>
                          <SelectTrigger className="w-full h-12 border-purple-300 focus:border-purple-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 decimal place</SelectItem>
                            <SelectItem value="2">2 decimal places</SelectItem>
                            <SelectItem value="3">3 decimal places</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Advanced Mode Toggle */}
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Advanced Mode</Label>
                            <p className="text-xs text-gray-600 mt-1">Calculate custom cFIP from league stats</p>
                          </div>
                          <Switch
                            checked={advancedMode}
                            onCheckedChange={setAdvancedMode}
                            className="data-[state=checked]:bg-purple-600"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Advanced Mode League Stats */}
                    {advancedMode && (
                      <div className="mb-6 p-6 bg-purple-50 rounded-lg border border-purple-200">
                        <h3 className="text-lg font-semibold text-purple-700 mb-4">League Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">League ERA</Label>
                            <Input
                              className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${
                                errors.leagueERA ? "border-red-300 focus:border-red-400" : ""
                              }`}
                              type="number"
                              step="0.01"
                              placeholder="4.50"
                              value={leagueERA}
                              onChange={(e) => {
                                setLeagueERA(e.target.value)
                                if (errors.leagueERA) setErrors((prev) => ({ ...prev, leagueERA: "" }))
                              }}
                            />
                            {errors.leagueERA && <span className="text-xs text-red-600 mt-1">{errors.leagueERA}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">League HR</Label>
                            <Input
                              className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${
                                errors.leagueHR ? "border-red-300 focus:border-red-400" : ""
                              }`}
                              type="number"
                              step="1"
                              placeholder="5000"
                              value={leagueHR}
                              onChange={(e) => {
                                setLeagueHR(e.target.value)
                                if (errors.leagueHR) setErrors((prev) => ({ ...prev, leagueHR: "" }))
                              }}
                            />
                            {errors.leagueHR && <span className="text-xs text-red-600 mt-1">{errors.leagueHR}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">League BB</Label>
                            <Input
                              className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${
                                errors.leagueBB ? "border-red-300 focus:border-red-400" : ""
                              }`}
                              type="number"
                              step="1"
                              placeholder="8000"
                              value={leagueBB}
                              onChange={(e) => {
                                setLeagueBB(e.target.value)
                                if (errors.leagueBB) setErrors((prev) => ({ ...prev, leagueBB: "" }))
                              }}
                            />
                            {errors.leagueBB && <span className="text-xs text-red-600 mt-1">{errors.leagueBB}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">League HBP</Label>
                            <Input
                              className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${
                                errors.leagueHBP ? "border-red-300 focus:border-red-400" : ""
                              }`}
                              type="number"
                              step="1"
                              placeholder="1500"
                              value={leagueHBP}
                              onChange={(e) => {
                                setLeagueHBP(e.target.value)
                                if (errors.leagueHBP) setErrors((prev) => ({ ...prev, leagueHBP: "" }))
                              }}
                            />
                            {errors.leagueHBP && <span className="text-xs text-red-600 mt-1">{errors.leagueHBP}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">League K</Label>
                            <Input
                              className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${
                                errors.leagueK ? "border-red-300 focus:border-red-400" : ""
                              }`}
                              type="number"
                              step="1"
                              placeholder="22000"
                              value={leagueK}
                              onChange={(e) => {
                                setLeagueK(e.target.value)
                                if (errors.leagueK) setErrors((prev) => ({ ...prev, leagueK: "" }))
                              }}
                            />
                            {errors.leagueK && <span className="text-xs text-red-600 mt-1">{errors.leagueK}</span>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">League IP</Label>
                            <Input
                              className={`w-full h-10 rounded-lg border-purple-300 focus:border-purple-500 ${
                                errors.leagueIP ? "border-red-300 focus:border-red-400" : ""
                              }`}
                              type="number"
                              step="0.1"
                              placeholder="43000"
                              value={leagueIP}
                              onChange={(e) => {
                                setLeagueIP(e.target.value)
                                if (errors.leagueIP) setErrors((prev) => ({ ...prev, leagueIP: "" }))
                              }}
                            />
                            {errors.leagueIP && <span className="text-xs text-red-600 mt-1">{errors.leagueIP}</span>}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-700">
                        <strong>Formula:</strong> FIP = (13×HR + 3×(BB+HBP) - 2×K) ÷ IP + cFIP
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Lower FIP indicates better pitcher performance</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateFIP}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800"
                      >
                        Calculate FIP
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mb-3 shadow-lg">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">FIP Results</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="bg-white p-4 rounded-lg border border-purple-200">
                            <p className="text-3xl font-bold text-purple-900">{result.fip?.toFixed(precision)}</p>
                            <p className="text-gray-600">FIP</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-sm font-bold text-purple-900">{result.performanceLevel}</p>
                            <p className="text-gray-600">Performance</p>
                          </div>
                          {result.customCFIP && (
                            <div className="bg-white p-3 rounded-lg border border-purple-200">
                              <p className="text-lg font-bold text-purple-900">{result.fipConstant?.toFixed(3)}</p>
                              <p className="text-gray-600">Custom cFIP</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <BarChart3 className="w-8 h-8 text-purple-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter pitching statistics and click{" "}
                          <span className="font-semibold text-purple-600">Calculate</span> to see FIP.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <span>Detailed FIP Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">FIP</h3>
                        <p className="text-3xl font-bold text-purple-900 mb-1">{result.fip?.toFixed(precision)}</p>
                        <p className="text-sm text-purple-600">{result.performanceLevel}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">HR Component</h3>
                        <p className="text-2xl font-bold text-purple-900 mb-1">{result.hrComponent}</p>
                        <p className="text-sm text-purple-600">13 × {result.homeRuns}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">BB+HBP Component</h3>
                        <p className="text-2xl font-bold text-purple-900 mb-1">{result.walkHbpComponent}</p>
                        <p className="text-sm text-purple-600">
                          3 × ({result.walks}+{result.hitByPitch})
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">K Component</h3>
                        <p className="text-2xl font-bold text-purple-900 mb-1">{result.strikeoutComponent}</p>
                        <p className="text-sm text-purple-600">-2 × {result.strikeouts}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-700 mb-2">Calculation Steps:</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>Step 1:</strong> Numerator = 13×{result.homeRuns} + 3×({result.walks}+
                          {result.hitByPitch}) - 2×{result.strikeouts} = {result.numerator}
                        </p>
                        <p>
                          <strong>Step 2:</strong> Divide by IP = {result.numerator} ÷ {result.inningsPitched} ={" "}
                          {(result.numerator / result.inningsPitched).toFixed(3)}
                        </p>
                        <p>
                          <strong>Step 3:</strong> Add cFIP = {(result.numerator / result.inningsPitched).toFixed(3)} +{" "}
                          {result.fipConstant?.toFixed(3)} = {result.fip?.toFixed(precision)}
                        </p>
                        {result.customCFIP && (
                          <p className="text-purple-600">
                            <strong>Note:</strong> Custom cFIP calculated from league statistics
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mr-3 shadow-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">Understanding FIP</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">What is FIP?</h3>
                      <p className="text-gray-700 mb-4">
                        Fielding Independent Pitching (FIP) evaluates a pitcher's performance based only on outcomes
                        they can directly control: home runs, walks, hit batters, and strikeouts. It removes the
                        influence of fielding and luck.
                      </p>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">FIP vs ERA Comparison</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>FIP ≈ ERA: Neutral defense/luck</li>
                        <li>FIP &lt; ERA: Defense may have hurt pitcher</li>
                        <li>FIP &gt; ERA: Defense may have helped pitcher</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Example:</strong> Pitcher Statistics
                        </p>
                        <p className="text-gray-700">HR: 21, BB: 55, HBP: 13</p>
                        <p className="text-gray-700">K: 235, IP: 145, cFIP: 3.214</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Calculation:</strong>
                        </p>
                        <p className="text-gray-700">Numerator = 13×21 + 3×(55+13) - 2×235 = 7</p>
                        <p className="text-gray-700">FIP = 7 ÷ 145 + 3.214</p>
                        <p className="text-gray-700 font-semibold">FIP = 3.26</p>
                      </div>
                      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-sm text-amber-800">
                          <strong>Note:</strong> Average FIP is typically around 4.20, varying by season and league.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_720-8sE77EX08xKuB6AvLTisdyhRT3j1X2.png"
                  alt="Smart Calculator Logo"
                  className="w-12 h-12"
                />
                <span className="text-2xl font-bold">Smart Calculator</span>
              </div>
              <p className="text-gray-400">&copy; 2025 Smart Calculator. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
