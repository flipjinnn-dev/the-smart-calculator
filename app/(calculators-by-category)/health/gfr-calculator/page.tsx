"use client"
import { useState, useRef } from "react"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import Head from "next/head"
import { Calculator, RotateCcw, Activity, AlertTriangle } from "lucide-react"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function GFRCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [patientType, setPatientType] = useState("adult")

  // Input states
  const [age, setAge] = useState("")
  const [sex, setSex] = useState("")
  const [serumCreatinine, setSerumCreatinine] = useState("")
  const [formula, setFormula] = useState("ckd-epi")

  const [height, setHeight] = useState("")
  const [heightUnit, setHeightUnit] = useState("cm")

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!age) {
      newErrors.age = "Please enter age"
    } else {
      const ageNum = Number.parseFloat(age)
      if (isNaN(ageNum)) {
        newErrors.age = "Please enter a valid age"
      } else if (patientType === "adult" && ageNum < 18) {
        newErrors.age = "Age must be 18 or older for adult calculations"
      } else if (patientType === "child" && (ageNum < 0 || ageNum >= 18)) {
        newErrors.age = "Age must be 0-17 years for pediatric calculations"
      } else if (ageNum > 120) {
        newErrors.age = "Please enter a valid age"
      }
    }

    if (!sex) {
      newErrors.sex = "Please select sex"
    }

    if (!serumCreatinine) {
      newErrors.serumCreatinine = "Please enter serum creatinine level"
    } else {
      const scrNum = Number.parseFloat(serumCreatinine)
      if (isNaN(scrNum) || scrNum <= 0) {
        newErrors.serumCreatinine = "Please enter a valid creatinine level"
      } else if (scrNum > 20) {
        newErrors.serumCreatinine = "Creatinine level seems unusually high"
      }
    }

    if (patientType === "child") {
      if (!height) {
        newErrors.height = "Please enter height for pediatric calculations"
      } else {
        const heightNum = Number.parseFloat(height)
        if (isNaN(heightNum) || heightNum <= 0) {
          newErrors.height = "Please enter a valid height"
        } else if (heightUnit === "cm" && (heightNum < 30 || heightNum > 200)) {
          newErrors.height = "Height should be between 30-200 cm"
        } else if (heightUnit === "inches" && (heightNum < 12 || heightNum > 80)) {
          newErrors.height = "Height should be between 12-80 inches"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getCKDStage = (egfr: number) => {
    if (egfr >= 90) return { stage: "G1", description: "Normal", color: "text-green-700 bg-green-50 border-green-200" }
    if (egfr >= 60)
      return { stage: "G2", description: "Mildly decreased", color: "text-yellow-700 bg-yellow-50 border-yellow-200" }
    if (egfr >= 45)
      return {
        stage: "G3a",
        description: "Mild-moderate decrease",
        color: "text-orange-700 bg-orange-50 border-orange-200",
      }
    if (egfr >= 30)
      return { stage: "G3b", description: "Moderate-severe decrease", color: "text-red-700 bg-red-50 border-red-200" }
    if (egfr >= 15)
      return { stage: "G4", description: "Severe decrease", color: "text-red-800 bg-red-100 border-red-300" }
    return { stage: "G5", description: "Kidney failure", color: "text-red-900 bg-red-200 border-red-400" }
  }

  const calculateSchwartz = (age: number, sex: string, scr: number, heightCm: number) => {
    let k: number

    if (age < 1) {
      k = 0.45 // Full-term infants & children up to 1 year
    } else if (age <= 13) {
      k = 0.55 // Children (1–13 years)
    } else if (age <= 18 && sex === "female") {
      k = 0.55 // Adolescent females (13–18 years)
    } else {
      k = 0.7 // Adolescent males (13–18 years)
    }

    const egfr = (k * heightCm) / scr
    return Math.round(egfr * 10) / 10
  }

  const calculateMDRD = (age: number, sex: string, scr: number) => {
    // MDRD (IDMS-traceable, 4-variable): eGFR = 175 × (SCr ^ -1.154) × (Age ^ -0.203) × (0.742 if female)
    let egfr = 175 * Math.pow(scr, -1.154) * Math.pow(age, -0.203)
    if (sex === "female") {
      egfr *= 0.742
    }
    return Math.round(egfr * 10) / 10
  }

  const calculateCKDEPI = (age: number, sex: string, scr: number) => {
    // CKD-EPI (2021, race-free): eGFR = 142 × min(SCr/k, 1)^α × max(SCr/k, 1)^-1.200 × 0.9938^Age × (1.012 if female)
    const k = sex === "female" ? 0.7 : 0.9
    const alpha = sex === "female" ? -0.241 : -0.302

    const scrOverK = scr / k
    const minTerm = Math.pow(Math.min(scrOverK, 1), alpha)
    const maxTerm = Math.pow(Math.max(scrOverK, 1), -1.2)
    const ageTerm = Math.pow(0.9938, age)

    let egfr = 142 * minTerm * maxTerm * ageTerm
    if (sex === "female") {
      egfr *= 1.012
    }

    return Math.round(egfr * 10) / 10
  }

  const calculateGFR = () => {
    if (!validateInputs()) return

    try {
      const ageNum = Number.parseFloat(age)
      const scrNum = Number.parseFloat(serumCreatinine)

      let egfr: number
      let formulaUsed: string

      if (patientType === "child") {
        const heightNum = Number.parseFloat(height)
        const heightCm = heightUnit === "inches" ? heightNum * 2.54 : heightNum
        egfr = calculateSchwartz(ageNum, sex, scrNum, heightCm)
        formulaUsed = "Schwartz Formula (Pediatric)"
      } else {
        if (formula === "mdrd") {
          egfr = calculateMDRD(ageNum, sex, scrNum)
          formulaUsed = "MDRD (IDMS-traceable)"
        } else {
          egfr = calculateCKDEPI(ageNum, sex, scrNum)
          formulaUsed = "CKD-EPI 2021 (race-free)"
        }
      }

      const ckdStage = getCKDStage(egfr)

      const results = {
        age: ageNum,
        sex,
        serumCreatinine: scrNum,
        egfr,
        formulaUsed,
        ckdStage,
        patientType,
        ...(patientType === "child" && { height: height + " " + heightUnit }),
      }

      setResult(results)
      setShowResult(true)
      scrollToRef(resultsRef as React.RefObject<HTMLElement>)
    } catch (error) {
      setErrors({ general: "Error calculating GFR. Please check your inputs and try again." })
    }
  }

  const resetCalculator = () => {
    setAge("")
    setSex("")
    setSerumCreatinine("")
    setFormula("ckd-epi")
    setHeight("")
    setHeightUnit("cm")
    setPatientType("adult")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <Head>
        <title>GFR Calculator - Glomerular Filtration Rate & Kidney Function Test - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate estimated GFR (eGFR) using MDRD, CKD-EPI, and Schwartz formulas. Professional kidney function calculator for adults and children."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
                  <p className="text-sm text-gray-500">GFR Calculator</p>
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
              <span className="text-gray-400">›</span>
              <Link href="/health" className="text-gray-500 hover:text-blue-600">
                Health
              </Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900 font-medium">GFR Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">GFR Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your estimated Glomerular Filtration Rate (eGFR) to assess kidney function for adults and
                children using clinically validated formulas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>Kidney Function Assessment</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter patient information to calculate estimated GFR and CKD stage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>
                    )}

                    <div className="space-y-6 mb-8">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Patient Type *</Label>
                        <RadioGroup value={patientType} onValueChange={setPatientType} className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="adult" id="adult" />
                            <Label htmlFor="adult" className="text-sm cursor-pointer">
                              <span className="font-medium">Adult</span> - Ages 18+ (MDRD, CKD-EPI formulas)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="child" id="child" />
                            <Label htmlFor="child" className="text-sm cursor-pointer">
                              <span className="font-medium">Child</span> - Ages 0-17 (Schwartz formula)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Age */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Age ({patientType === "adult" ? "≥18 years" : "0-17 years"}) *
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calculator className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`}
                            type="number"
                            placeholder={patientType === "adult" ? "Enter age (≥18)" : "Enter age (0-17)"}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min={patientType === "adult" ? "18" : "0"}
                            max={patientType === "adult" ? "120" : "17"}
                          />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                      </div>

                      {/* Sex */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">Sex *</Label>
                        <Select value={sex} onValueChange={setSex}>
                          <SelectTrigger className={`h-12 ${errors.sex ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.sex && <p className="text-red-600 text-xs mt-1">{errors.sex}</p>}
                      </div>

                      {patientType === "child" && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height *</Label>
                          <div className="flex space-x-2">
                            <div className="flex-1 relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calculator className="h-5 w-5 text-green-500" />
                              </div>
                              <Input
                                className={`h-12 pl-10 ${errors.height ? "border-red-300" : ""}`}
                                type="number"
                                placeholder="Enter height"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                min="1"
                                step="0.1"
                              />
                            </div>
                            <Select value={heightUnit} onValueChange={setHeightUnit}>
                              <SelectTrigger className="w-24 h-12">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cm">cm</SelectItem>
                                <SelectItem value="inches">in</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.height && <p className="text-red-600 text-xs mt-1">{errors.height}</p>}
                          <p className="text-xs text-gray-500 mt-1">Required for Schwartz formula calculation</p>
                        </div>
                      )}

                      {/* Serum Creatinine */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Serum Creatinine (mg/dL) *
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Activity className="h-5 w-5 text-green-500" />
                          </div>
                          <Input
                            className={`h-12 pl-10 ${errors.serumCreatinine ? "border-red-300" : ""}`}
                            type="number"
                            placeholder="Enter creatinine level"
                            value={serumCreatinine}
                            onChange={(e) => setSerumCreatinine(e.target.value)}
                            min="0.1"
                            max="20"
                            step="0.1"
                          />
                        </div>
                        {errors.serumCreatinine && (
                          <p className="text-red-600 text-xs mt-1">{errors.serumCreatinine}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {patientType === "adult"
                            ? "Normal range: 0.6-1.2 mg/dL (varies by lab)"
                            : "Pediatric ranges vary by age"}
                        </p>
                      </div>

                      {patientType === "adult" && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Formula Choice</Label>
                          <RadioGroup value={formula} onValueChange={setFormula} className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="ckd-epi" id="ckd-epi" />
                              <Label htmlFor="ckd-epi" className="text-sm cursor-pointer">
                                <span className="font-medium">CKD-EPI 2021 (race-free)</span> - Default, most current
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mdrd" id="mdrd" />
                              <Label htmlFor="mdrd" className="text-sm cursor-pointer">
                                <span className="font-medium">MDRD (IDMS-traceable)</span> - Traditional formula
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateGFR}
                        className="h-12 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold shadow-lg"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate GFR
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
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
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-green-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mb-3 shadow-lg">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">eGFR Result</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-blue-200">
                          <p className="text-2xl font-bold text-blue-900 mb-2">{result.egfr}</p>
                          <p className="text-sm font-medium text-gray-600 mb-2">mL/min/1.73 m²</p>
                          <div
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${result.ckdStage.color}`}
                          >
                            {result.ckdStage.stage}: {result.ckdStage.description}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Activity className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter patient information to calculate eGFR.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <span>GFR Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-4 text-lg">Estimated GFR</h4>
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-blue-900">{result.egfr}</p>
                            <p className="text-sm text-gray-600">mL/min/1.73 m²</p>
                          </div>
                          <div className="text-center">
                            <div
                              className={`inline-block px-4 py-2 rounded-lg text-sm font-medium border ${result.ckdStage.color}`}
                            >
                              Stage {result.ckdStage.stage}: {result.ckdStage.description}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-4 text-lg">Calculation Details</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">Formula Used:</span>
                            <p className="font-semibold text-green-700">{result.formulaUsed}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Patient Type:</span>
                            <p className="font-semibold text-green-700 capitalize">{result.patientType}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Age:</span>
                            <p className="font-semibold text-green-700">{result.age} years</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Sex:</span>
                            <p className="font-semibold text-green-700 capitalize">{result.sex}</p>
                          </div>
                          {result.height && (
                            <div>
                              <span className="text-gray-600">Height:</span>
                              <p className="font-semibold text-green-700">{result.height}</p>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Serum Creatinine:</span>
                            <p className="font-semibold text-green-700">{result.serumCreatinine} mg/dL</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medical Disclaimer */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">Important Medical Notice</h4>
                          <p className="text-sm text-yellow-700">
                            Results are estimates for screening purposes only. Consult a healthcare provider for medical
                            advice, diagnosis, or treatment decisions. eGFR may be less accurate in certain populations.
                            {result.patientType === "child" &&
                              " Pediatric GFR calculations require clinical correlation."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-green-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mr-3 shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">
                    Understanding GFR & CKD Stages
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">CKD Stages</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>G1:</strong> ≥90
                            </span>
                            <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-xs">Normal</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>G2:</strong> 60-89
                            </span>
                            <span className="text-yellow-700 bg-yellow-50 px-2 py-1 rounded text-xs">
                              Mildly decreased
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>G3a:</strong> 45-59
                            </span>
                            <span className="text-orange-700 bg-orange-50 px-2 py-1 rounded text-xs">
                              Mild-moderate
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>G3b:</strong> 30-44
                            </span>
                            <span className="text-red-700 bg-red-50 px-2 py-1 rounded text-xs">Moderate-severe</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>G4:</strong> 15-29
                            </span>
                            <span className="text-red-800 bg-red-100 px-2 py-1 rounded text-xs">Severe</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>G5:</strong> &lt;15
                            </span>
                            <span className="text-red-900 bg-red-200 px-2 py-1 rounded text-xs">Kidney failure</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Formula Comparison</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong className="text-blue-700">CKD-EPI 2021:</strong>
                            <p className="text-gray-700">Most current, race-free formula recommended by guidelines</p>
                          </div>
                          <div>
                            <strong className="text-blue-700">MDRD:</strong>
                            <p className="text-gray-700">Traditional formula, may underestimate at higher GFR levels</p>
                          </div>
                          <div>
                            <strong className="text-blue-700">Schwartz Formula:</strong>
                            <p className="text-gray-700">Pediatric formula for children aged 0-17 years</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Clinical Significance</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>Normal GFR:</strong> 90-120 mL/min/1.73 m² in healthy adults
                          </li>
                          <li>
                            <strong>CKD diagnosis:</strong> GFR &lt;60 for ≥3 months
                          </li>
                          <li>
                            <strong>Referral to nephrology:</strong> Usually at GFR &lt;30
                          </li>
                          <li>
                            <strong>Dialysis consideration:</strong> GFR &lt;15 or symptomatic
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">Limitations</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>Less accurate in extremes of age, body size, or muscle mass</li>
                          <li>May be inaccurate in acute kidney injury</li>
                          <li>Requires stable creatinine levels</li>
                          <li>Consider cystatin C-based equations for better accuracy</li>
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
