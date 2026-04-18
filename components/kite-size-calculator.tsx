"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Wind, User, Activity } from "lucide-react"

export default function KiteSizeCalculator() {
  const [weight, setWeight] = useState<string>("")
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg")
  const [windSpeed, setWindSpeed] = useState<string>("")
  const [windUnit, setWindUnit] = useState<"knots" | "ms" | "mph">("knots")
  const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate")
  const [ridingStyle, setRidingStyle] = useState<"freeride" | "freestyle" | "wave" | "bigair" | "foil">("freeride")
  const [boardType, setBoardType] = useState<"twintip" | "directional" | "foil">("twintip")
  
  const [result, setResult] = useState<null | {
    kiteSize: number
    minKiteSize: number
    maxKiteSize: number
    lowWindRange: string
    highWindRange: string
    boardLength: string
    boardWidth: string
    recommendation: string
  }>(null)

  const calculateKiteSize = () => {
    const weightInKg = weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) * 0.453592
    let windInKnots = parseFloat(windSpeed)
    
    if (windUnit === "ms") {
      windInKnots = windInKnots * 1.94384
    } else if (windUnit === "mph") {
      windInKnots = windInKnots * 0.868976
    }

    if (!weightInKg || !windInKnots || weightInKg <= 0 || windInKnots <= 0) {
      alert("Please enter valid weight and wind speed values")
      return
    }

    // Base calculation: weight (kg) ÷ wind (knots) × adjustment factor
    let adjustmentFactor = 2.4 // Default for intermediate twintip
    
    // Adjust based on skill level
    if (skillLevel === "beginner") {
      adjustmentFactor = 2.2
    } else if (skillLevel === "advanced") {
      adjustmentFactor = 2.5
    }
    
    // Adjust based on board type
    if (boardType === "directional") {
      adjustmentFactor *= 0.85 // 15% smaller
    } else if (boardType === "foil") {
      adjustmentFactor *= 0.65 // 35% smaller
    }
    
    // Adjust based on riding style
    if (ridingStyle === "freestyle") {
      adjustmentFactor *= 0.95
    } else if (ridingStyle === "wave") {
      adjustmentFactor *= 0.90
    } else if (ridingStyle === "bigair") {
      adjustmentFactor *= 1.10
    } else if (ridingStyle === "foil") {
      adjustmentFactor *= 0.65
    }

    const baseKiteSize = (weightInKg / windInKnots) * adjustmentFactor
    const kiteSize = Math.round(baseKiteSize)
    const minKiteSize = Math.max(5, kiteSize - 1)
    const maxKiteSize = Math.min(20, kiteSize + 1)

    // Calculate wind ranges
    const lowWindKnots = Math.round((weightInKg / (kiteSize + 2)) * adjustmentFactor * 0.8)
    const highWindKnots = Math.round((weightInKg / (kiteSize - 2)) * adjustmentFactor * 1.2)
    
    const lowWindRange = `${lowWindKnots} knots (${Math.round(lowWindKnots * 0.514)} m/s)`
    const highWindRange = `${highWindKnots} knots (${Math.round(highWindKnots * 0.514)} m/s)`

    // Board size recommendations
    let boardLength = ""
    let boardWidth = ""
    
    if (weightInKg < 60) {
      boardLength = "130-138 cm"
      boardWidth = "38-41 cm"
    } else if (weightInKg < 80) {
      boardLength = "138-145 cm"
      boardWidth = "41-43 cm"
    } else {
      boardLength = "142-150 cm"
      boardWidth = "42-45 cm"
    }

    // Generate recommendation
    let recommendation = ""
    if (windInKnots < 12) {
      recommendation = "Light wind conditions. Consider a larger kite for better performance."
    } else if (windInKnots < 18) {
      recommendation = "Perfect medium wind conditions! This is the sweet spot for most riders."
    } else if (windInKnots < 24) {
      recommendation = "Strong wind - great for jumps and speed. Make sure you're comfortable with this power."
    } else {
      recommendation = "High wind conditions. Only for experienced riders. Stay safe!"
    }

    setResult({
      kiteSize,
      minKiteSize,
      maxKiteSize,
      lowWindRange,
      highWindRange,
      boardLength,
      boardWidth,
      recommendation
    })
  }

  const resetCalculator = () => {
    setWeight("")
    setWindSpeed("")
    setSkillLevel("intermediate")
    setRidingStyle("freeride")
    setBoardType("twintip")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Rider Details */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Rider Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-base font-semibold">
              Rider Weight
            </Label>
            <div className="flex gap-2">
              <Input
                id="weight"
                type="number"
                step="1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 75"
                className="flex-1 border-2 border-gray-300 focus:border-blue-500"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as "kg" | "lbs")}
                className="px-3 py-2 border-2 border-gray-300 rounded-md focus:border-blue-500"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skill-level" className="text-base font-semibold">
              Skill Level
            </Label>
            <select
              id="skill-level"
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value as any)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:border-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wind Conditions */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-2 border-green-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Wind className="w-5 h-5 text-green-600" />
          Wind Conditions
        </h3>
        <div className="space-y-2">
          <Label htmlFor="wind-speed" className="text-base font-semibold">
            Wind Speed
          </Label>
          <div className="flex gap-2">
            <Input
              id="wind-speed"
              type="number"
              step="1"
              min="0"
              value={windSpeed}
              onChange={(e) => setWindSpeed(e.target.value)}
              placeholder="e.g., 15"
              className="flex-1 border-2 border-gray-300 focus:border-green-500"
            />
            <select
              value={windUnit}
              onChange={(e) => setWindUnit(e.target.value as any)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:border-green-500"
            >
              <option value="knots">knots</option>
              <option value="ms">m/s</option>
              <option value="mph">mph</option>
            </select>
          </div>
        </div>
      </div>

      {/* Riding Preferences */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600" />
          Riding Preferences
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="riding-style" className="text-base font-semibold">
              Riding Style
            </Label>
            <select
              id="riding-style"
              value={ridingStyle}
              onChange={(e) => setRidingStyle(e.target.value as any)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:border-purple-500"
            >
              <option value="freeride">Freeride</option>
              <option value="freestyle">Freestyle</option>
              <option value="wave">Wave</option>
              <option value="bigair">Big Air</option>
              <option value="foil">Foil</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="board-type" className="text-base font-semibold">
              Board Type
            </Label>
            <select
              id="board-type"
              value={boardType}
              onChange={(e) => setBoardType(e.target.value as any)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:border-purple-500"
            >
              <option value="twintip">Twintip</option>
              <option value="directional">Directional</option>
              <option value="foil">Hydrofoil</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button 
          onClick={calculateKiteSize}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Kite Size
        </Button>
        <Button 
          onClick={resetCalculator}
          variant="outline"
          className="px-8 py-6 border-2 border-gray-300 hover:bg-gray-100"
        >
          Reset
        </Button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="mt-8 space-y-6">
          {/* Main Result */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Recommended Kite Size</h3>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 font-medium mb-1">Ideal Size</p>
                <p className="text-4xl font-bold text-blue-600">{result.kiteSize} m²</p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-sm text-gray-600 font-medium mb-1">Size Range</p>
                <p className="text-2xl font-bold text-green-600">{result.minKiteSize}-{result.maxKiteSize} m²</p>
                <p className="text-xs text-gray-500 mt-1">Safe range for your conditions</p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
                <p className="text-sm text-gray-600 font-medium mb-1">Board Size</p>
                <p className="text-lg font-bold text-purple-600">{result.boardLength}</p>
                <p className="text-sm text-gray-600">Width: {result.boardWidth}</p>
              </div>
            </div>

            {/* Wind Ranges */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-6">
              <h4 className="font-bold text-lg mb-3">Wind Range for {result.kiteSize} m² Kite</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Low Wind Limit:</p>
                  <p className="text-lg font-semibold text-gray-900">{result.lowWindRange}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">High Wind Limit:</p>
                  <p className="text-lg font-semibold text-gray-900">{result.highWindRange}</p>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-blue-100 rounded-lg border-l-4 border-blue-600">
              <p className="text-sm font-semibold text-blue-900 mb-2">💡 Recommendation:</p>
              <p className="text-sm text-blue-800">{result.recommendation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
