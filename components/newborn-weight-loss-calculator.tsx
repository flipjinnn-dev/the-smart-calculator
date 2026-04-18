"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Baby, AlertTriangle, CheckCircle } from "lucide-react"

export default function NewbornWeightLossCalculator() {
  const [unit, setUnit] = useState<string>("kg")
  
  // Kilogram inputs
  const [birthWeightKg, setBirthWeightKg] = useState<string>("")
  const [currentWeightKg, setCurrentWeightKg] = useState<string>("")
  
  // Pounds and ounces inputs
  const [birthWeightLbs, setBirthWeightLbs] = useState<string>("")
  const [birthWeightOz, setBirthWeightOz] = useState<string>("")
  const [currentWeightLbs, setCurrentWeightLbs] = useState<string>("")
  const [currentWeightOz, setCurrentWeightOz] = useState<string>("")
  
  // Decimal pounds inputs
  const [birthWeightDecimal, setBirthWeightDecimal] = useState<string>("")
  const [currentWeightDecimal, setCurrentWeightDecimal] = useState<string>("")
  
  const [result, setResult] = useState<null | {
    weightLossPercentage: number
    weightLoss: number
    status: string
    statusColor: string
    recommendation: string
  }>(null)

  const calculateWeightLoss = () => {
    let birthWeight = 0
    let currentWeight = 0
    let unitLabel = ""

    if (unit === "kg") {
      birthWeight = parseFloat(birthWeightKg)
      currentWeight = parseFloat(currentWeightKg)
      unitLabel = "kg"
    } else if (unit === "lbs-oz") {
      const birthLbs = parseFloat(birthWeightLbs) || 0
      const birthOz = parseFloat(birthWeightOz) || 0
      const currentLbs = parseFloat(currentWeightLbs) || 0
      const currentOz = parseFloat(currentWeightOz) || 0
      
      birthWeight = (birthLbs * 16) + birthOz
      currentWeight = (currentLbs * 16) + currentOz
      unitLabel = "oz"
    } else if (unit === "lbs-decimal") {
      birthWeight = parseFloat(birthWeightDecimal)
      currentWeight = parseFloat(currentWeightDecimal)
      unitLabel = "lbs"
    }

    if (isNaN(birthWeight) || isNaN(currentWeight) || birthWeight <= 0 || currentWeight < 0) {
      alert("Please enter valid weights")
      return
    }

    if (currentWeight > birthWeight) {
      alert("Current weight cannot be greater than birth weight")
      return
    }

    // Calculate weight loss percentage
    const weightLoss = birthWeight - currentWeight
    const weightLossPercentage = (weightLoss / birthWeight) * 100

    // Determine status and recommendation
    let status = ""
    let statusColor = ""
    let recommendation = ""

    if (weightLossPercentage >= 0 && weightLossPercentage <= 3) {
      status = "Minimal Loss"
      statusColor = "text-green-600"
      recommendation = "Normal, usually seen in formula-fed babies"
    } else if (weightLossPercentage > 3 && weightLossPercentage <= 7) {
      status = "Moderate Loss"
      statusColor = "text-blue-600"
      recommendation = "Normal, monitor feeding frequency"
    } else if (weightLossPercentage > 7 && weightLossPercentage <= 10) {
      status = "Expected Range"
      statusColor = "text-yellow-600"
      recommendation = "Normal, support feeding, monitor daily"
    } else if (weightLossPercentage > 10 && weightLossPercentage <= 12) {
      status = "Borderline High"
      statusColor = "text-orange-600"
      recommendation = "Contact your pediatrician, increase feeding support"
    } else {
      status = "Excessive Loss"
      statusColor = "text-red-600"
      recommendation = "Seek medical attention promptly"
    }

    setResult({
      weightLossPercentage,
      weightLoss,
      status,
      statusColor,
      recommendation
    })
  }

  const reset = () => {
    setBirthWeightKg("")
    setCurrentWeightKg("")
    setBirthWeightLbs("")
    setBirthWeightOz("")
    setCurrentWeightLbs("")
    setCurrentWeightOz("")
    setBirthWeightDecimal("")
    setCurrentWeightDecimal("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-6 rounded-xl border-2 border-pink-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Baby className="w-5 h-5 text-pink-600" />
          Newborn Weight Loss Calculator
        </h3>

        {/* Unit Selector */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Select Unit</Label>
          <select
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value)
              setResult(null)
            }}
            className="w-full p-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:border-pink-500"
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="lbs-oz">Pounds and Ounces (lbs & oz)</option>
            <option value="lbs-decimal">Pounds (Decimal)</option>
          </select>
        </div>

        {/* Kilogram Inputs */}
        {unit === "kg" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="birth-kg" className="text-base font-semibold mb-2 block">
                Birth Weight (kg)
              </Label>
              <Input
                id="birth-kg"
                type="number"
                step="0.01"
                min="0"
                value={birthWeightKg}
                onChange={(e) => setBirthWeightKg(e.target.value)}
                placeholder="e.g., 3.4"
                className="text-lg py-5 border-2 border-pink-300 focus:border-pink-500"
              />
            </div>
            <div>
              <Label htmlFor="current-kg" className="text-base font-semibold mb-2 block">
                Current Weight (kg)
              </Label>
              <Input
                id="current-kg"
                type="number"
                step="0.01"
                min="0"
                value={currentWeightKg}
                onChange={(e) => setCurrentWeightKg(e.target.value)}
                placeholder="e.g., 3.1"
                className="text-lg py-5 border-2 border-pink-300 focus:border-pink-500"
              />
            </div>
          </div>
        )}

        {/* Pounds and Ounces Inputs */}
        {unit === "lbs-oz" && (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">Birth Weight</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birth-lbs" className="text-sm mb-1 block">Pounds</Label>
                  <Input
                    id="birth-lbs"
                    type="number"
                    step="1"
                    min="0"
                    value={birthWeightLbs}
                    onChange={(e) => setBirthWeightLbs(e.target.value)}
                    placeholder="e.g., 7"
                    className="border-2 border-pink-300 focus:border-pink-500"
                  />
                </div>
                <div>
                  <Label htmlFor="birth-oz" className="text-sm mb-1 block">Ounces</Label>
                  <Input
                    id="birth-oz"
                    type="number"
                    step="1"
                    min="0"
                    max="15"
                    value={birthWeightOz}
                    onChange={(e) => setBirthWeightOz(e.target.value)}
                    placeholder="e.g., 8"
                    className="border-2 border-pink-300 focus:border-pink-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">Current Weight</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="current-lbs" className="text-sm mb-1 block">Pounds</Label>
                  <Input
                    id="current-lbs"
                    type="number"
                    step="1"
                    min="0"
                    value={currentWeightLbs}
                    onChange={(e) => setCurrentWeightLbs(e.target.value)}
                    placeholder="e.g., 6"
                    className="border-2 border-pink-300 focus:border-pink-500"
                  />
                </div>
                <div>
                  <Label htmlFor="current-oz" className="text-sm mb-1 block">Ounces</Label>
                  <Input
                    id="current-oz"
                    type="number"
                    step="1"
                    min="0"
                    max="15"
                    value={currentWeightOz}
                    onChange={(e) => setCurrentWeightOz(e.target.value)}
                    placeholder="e.g., 14"
                    className="border-2 border-pink-300 focus:border-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Decimal Pounds Inputs */}
        {unit === "lbs-decimal" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="birth-decimal" className="text-base font-semibold mb-2 block">
                Birth Weight (lbs)
              </Label>
              <Input
                id="birth-decimal"
                type="number"
                step="0.1"
                min="0"
                value={birthWeightDecimal}
                onChange={(e) => setBirthWeightDecimal(e.target.value)}
                placeholder="e.g., 7.5"
                className="text-lg py-5 border-2 border-pink-300 focus:border-pink-500"
              />
            </div>
            <div>
              <Label htmlFor="current-decimal" className="text-base font-semibold mb-2 block">
                Current Weight (lbs)
              </Label>
              <Input
                id="current-decimal"
                type="number"
                step="0.1"
                min="0"
                value={currentWeightDecimal}
                onChange={(e) => setCurrentWeightDecimal(e.target.value)}
                placeholder="e.g., 6.9"
                className="text-lg py-5 border-2 border-pink-300 focus:border-pink-500"
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <Button
            onClick={calculateWeightLoss}
            className="flex-1 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Weight Loss
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="px-8 py-6 border-2 border-gray-300 hover:bg-gray-100"
          >
            Reset
          </Button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            {/* Weight Loss Percentage */}
            <div className="bg-white p-6 rounded-lg border-2 border-pink-300 shadow-md">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">Weight Loss Percentage</p>
                <p className={`text-6xl font-bold ${result.statusColor}`}>
                  {result.weightLossPercentage.toFixed(2)}%
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {result.weightLoss.toFixed(2)} {unit === "lbs-oz" ? "oz" : unit === "lbs-decimal" ? "lbs" : "kg"} lost
                </p>
              </div>

              {/* Status */}
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {result.weightLossPercentage <= 10 ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  )}
                  <p className={`text-xl font-bold ${result.statusColor}`}>{result.status}</p>
                </div>
                <p className="text-center text-gray-700">{result.recommendation}</p>
              </div>
            </div>

            {/* Warning for excessive loss */}
            {result.weightLossPercentage > 10 && (
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-red-900 mb-1">Important Notice</p>
                    <p className="text-sm text-red-800">
                      Your baby has lost more than 10% of their birth weight. Please contact your pediatrician immediately for evaluation and feeding support.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Normal range info */}
            {result.weightLossPercentage <= 10 && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-gray-700">
                  <strong>Good news:</strong> This weight loss is within the normal range for newborns. Continue monitoring feeding and diaper output. Most babies regain birth weight by 10–14 days.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Formula Display */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700 text-center">
          <strong>Formula:</strong> Weight Loss % = [(Birth Weight − Current Weight) ÷ Birth Weight] × 100
        </p>
      </div>
    </div>
  )
}
