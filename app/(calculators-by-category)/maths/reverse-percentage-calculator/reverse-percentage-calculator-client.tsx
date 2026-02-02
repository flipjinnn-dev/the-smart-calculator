"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, AlertCircle, TrendingUp, TrendingDown, Percent, RotateCcw } from "lucide-react"
import CalculatorGuide from "@/components/calculator-guide"
import { RatingProfileSection } from "@/components/rating-profile-section"

interface CalculatorProps {
  content: any
  guideContent: any
}

type CalculationType = "percentage-of" | "increase" | "decrease"

export default function ReversePercentageCalculatorClient({ content, guideContent }: CalculatorProps) {
  const [finalValue, setFinalValue] = useState("")
  const [percentage, setPercentage] = useState("")
  const [calculationType, setCalculationType] = useState<CalculationType>("percentage-of")
  const [result, setResult] = useState<any>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!finalValue || isNaN(parseFloat(finalValue))) {
      newErrors.finalValue = content?.errors?.finalValue || "Please enter a valid final value"
    }

    if (!percentage || isNaN(parseFloat(percentage)) || parseFloat(percentage) <= 0) {
      newErrors.percentage = content?.errors?.percentage || "Please enter a valid percentage (greater than 0)"
    }

    if (calculationType === "decrease" && parseFloat(percentage) >= 100) {
      newErrors.percentage = content?.errors?.decreaseTooLarge || "For decrease, percentage must be less than 100%"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateReverse = () => {
    if (!validateInputs()) {
      return
    }

    const F = parseFloat(finalValue)
    const P = parseFloat(percentage)

    let originalValue = 0
    let formula = ""
    let explanation = ""
    let steps: string[] = []

    switch (calculationType) {
      case "percentage-of":
        // O = F / (P/100)
        originalValue = F / (P / 100)
        formula = `O = F ÷ (P/100) = ${F} ÷ ${(P / 100).toFixed(4)} = ${originalValue.toFixed(2)}`
        explanation = content?.explanations?.percentageOf || `${P}% of the original value equals ${F}, so the original value is ${originalValue.toFixed(2)}`
        steps = [
          content?.steps?.step1PercentageOf || `Given: ${P}% of original = ${F}`,
          content?.steps?.step2PercentageOf || `Convert percentage to decimal: ${P}% = ${(P / 100).toFixed(4)}`,
          content?.steps?.step3PercentageOf || `Divide final value by decimal: ${F} ÷ ${(P / 100).toFixed(4)} = ${originalValue.toFixed(2)}`,
          content?.steps?.step4PercentageOf || `Original value = ${originalValue.toFixed(2)}`
        ]
        break

      case "increase":
        // O = F / (1 + P/100)
        originalValue = F / (1 + (P / 100))
        formula = `O = F ÷ (1 + P/100) = ${F} ÷ ${(1 + P / 100).toFixed(4)} = ${originalValue.toFixed(2)}`
        explanation = content?.explanations?.increase || `After a ${P}% increase, the value became ${F}. The original value was ${originalValue.toFixed(2)}`
        steps = [
          content?.steps?.step1Increase || `Given: After ${P}% increase, value = ${F}`,
          content?.steps?.step2Increase || `Convert to decimal: ${P}% = ${(P / 100).toFixed(4)}`,
          content?.steps?.step3Increase || `Calculate multiplier: 1 + ${(P / 100).toFixed(4)} = ${(1 + P / 100).toFixed(4)}`,
          content?.steps?.step4Increase || `Divide final by multiplier: ${F} ÷ ${(1 + P / 100).toFixed(4)} = ${originalValue.toFixed(2)}`,
          content?.steps?.step5Increase || `Original value = ${originalValue.toFixed(2)}`
        ]
        break

      case "decrease":
        // O = F / (1 - P/100)
        originalValue = F / (1 - (P / 100))
        formula = `O = F ÷ (1 - P/100) = ${F} ÷ ${(1 - P / 100).toFixed(4)} = ${originalValue.toFixed(2)}`
        explanation = content?.explanations?.decrease || `After a ${P}% decrease, the value became ${F}. The original value was ${originalValue.toFixed(2)}`
        steps = [
          content?.steps?.step1Decrease || `Given: After ${P}% decrease, value = ${F}`,
          content?.steps?.step2Decrease || `Convert to decimal: ${P}% = ${(P / 100).toFixed(4)}`,
          content?.steps?.step3Decrease || `Calculate multiplier: 1 - ${(P / 100).toFixed(4)} = ${(1 - P / 100).toFixed(4)}`,
          content?.steps?.step4Decrease || `Divide final by multiplier: ${F} ÷ ${(1 - P / 100).toFixed(4)} = ${originalValue.toFixed(2)}`,
          content?.steps?.step5Decrease || `Original value = ${originalValue.toFixed(2)}`
        ]
        break
    }

    // Calculate the actual change amount
    const changeAmount = Math.abs(F - originalValue)
    const changePercentage = P

    setResult({
      originalValue: originalValue.toFixed(2),
      finalValue: F.toFixed(2),
      percentage: P,
      changeAmount: changeAmount.toFixed(2),
      calculationType,
      formula,
      explanation,
      steps
    })
  }

  const resetForm = () => {
    setFinalValue("")
    setPercentage("")
    setCalculationType("percentage-of")
    setResult(null)
    setErrors({})
  }

  const getCalculationTypeIcon = () => {
    switch (calculationType) {
      case "increase":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "decrease":
        return <TrendingDown className="w-5 h-5 text-red-600" />
      default:
        return <Percent className="w-5 h-5 text-blue-600" />
    }
  }

  const getCalculationTypeColor = () => {
    switch (calculationType) {
      case "increase":
        return "from-green-500 to-emerald-600"
      case "decrease":
        return "from-red-500 to-rose-600"
      default:
        return "from-blue-500 to-purple-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {content?.pageTitle || "Reverse Percentage Calculator"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content?.pageDescription || "Find the original value before a percentage increase, decrease, or when given a percentage of the original"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getCalculationTypeIcon()}
                  {content?.form?.title || "Calculate Original Value"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calculation Type */}
                <div>
                  <Label htmlFor="calculationType">{content?.form?.labels?.calculationType || "Calculation Type"}</Label>
                  <Select value={calculationType} onValueChange={(value: CalculationType) => setCalculationType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage-of">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4" />
                          <span>{content?.form?.calculationTypes?.percentageOf || "Percentage of Original (e.g., 70% of X = 210)"}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="increase">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>{content?.form?.calculationTypes?.increase || "After Percentage Increase (e.g., +20% = $120)"}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="decrease">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4" />
                          <span>{content?.form?.calculationTypes?.decrease || "After Percentage Decrease (e.g., -20% = $80)"}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="finalValue">
                      {content?.form?.labels?.finalValue || "Final Value (F)"}
                    </Label>
                    <Input
                      id="finalValue"
                      type="number"
                      step="0.01"
                      value={finalValue}
                      onChange={(e) => setFinalValue(e.target.value)}
                      placeholder={content?.form?.placeholders?.finalValue || "Enter final value"}
                      className={errors.finalValue ? "border-red-500" : ""}
                    />
                    {errors.finalValue && <p className="text-sm text-red-500 mt-1">{errors.finalValue}</p>}
                  </div>

                  <div>
                    <Label htmlFor="percentage">
                      {content?.form?.labels?.percentage || "Percentage (P)"}
                    </Label>
                    <Input
                      id="percentage"
                      type="number"
                      step="0.01"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder={content?.form?.placeholders?.percentage || "Enter percentage"}
                      className={errors.percentage ? "border-red-500" : ""}
                    />
                    {errors.percentage && <p className="text-sm text-red-500 mt-1">{errors.percentage}</p>}
                  </div>
                </div>

                {/* Description based on type */}
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-sm text-blue-800">
                    {calculationType === "percentage-of" && (content?.form?.descriptions?.percentageOf || "Find the original when you know a percentage of it equals the final value")}
                    {calculationType === "increase" && (content?.form?.descriptions?.increase || "Find the original value before a percentage increase was applied")}
                    {calculationType === "decrease" && (content?.form?.descriptions?.decrease || "Find the original value before a percentage decrease was applied")}
                  </AlertDescription>
                </Alert>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={calculateReverse}
                    className={`flex-1 bg-gradient-to-r ${getCalculationTypeColor()} hover:opacity-90 transition-opacity`}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    {content?.form?.buttons?.calculate || "Calculate Original Value"}
                  </Button>
                  <Button onClick={resetForm} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {content?.form?.buttons?.reset || "Reset"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {result ? (
              <Card className={`shadow-xl border-0 bg-gradient-to-br ${
                result.calculationType === "increase" ? "from-green-50 to-emerald-50" :
                result.calculationType === "decrease" ? "from-red-50 to-rose-50" :
                "from-blue-50 to-purple-50"
              } sticky top-4`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCalculationTypeIcon()}
                    {content?.results?.title || "Original Value"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Original Value */}
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{content?.results?.originalValue || "Original Value"}</p>
                    <p className={`text-3xl font-bold ${
                      result.calculationType === "increase" ? "text-green-600" :
                      result.calculationType === "decrease" ? "text-red-600" :
                      "text-blue-600"
                    }`}>
                      {result.originalValue}
                    </p>
                  </div>

                  {/* Calculation Summary */}
                  <div className="p-4 bg-white rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{content?.results?.finalValue || "Final Value"}:</span>
                      <span className="font-semibold">{result.finalValue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{content?.results?.percentage || "Percentage"}:</span>
                      <span className="font-semibold">{result.percentage}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{content?.results?.changeAmount || "Change Amount"}:</span>
                      <span className="font-semibold">{result.changeAmount}</span>
                    </div>
                  </div>

                  {/* Formula */}
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">{content?.results?.formula || "Formula Used"}</p>
                    <p className="text-xs font-mono text-gray-600 break-all">{result.formula}</p>
                  </div>

                  {/* Explanation */}
                  <div className={`p-4 rounded-lg ${
                    result.calculationType === "increase" ? "bg-green-50" :
                    result.calculationType === "decrease" ? "bg-red-50" :
                    "bg-blue-50"
                  }`}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">{content?.results?.explanation || "Explanation"}</p>
                    <p className="text-xs text-gray-700">{result.explanation}</p>
                  </div>

                  {/* Step-by-Step */}
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-3">{content?.results?.steps || "Step-by-Step Solution"}</p>
                    <ol className="space-y-2">
                      {result.steps.map((step: string, index: number) => (
                        <li key={index} className="text-xs text-gray-700 flex gap-2">
                          <span className="font-semibold text-blue-600">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-50 to-gray-100 sticky top-4">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500">
                    {content?.messages?.enterInformation || "Enter the final value and percentage to calculate the original value"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {/* Rating Section */}
        <div className="mt-12">
          <RatingProfileSection 
            entityId="reverse-percentage-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
        </div>
        {/* Educational Guide */}
        {guideContent && (
          <div className="mt-12">
            <CalculatorGuide data={guideContent} />
          </div>
        )}
      </div>
    </div>
  )
}
