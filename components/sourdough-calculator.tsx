"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Wheat } from "lucide-react"

export default function SourdoughCalculator() {
  const [calculationMode, setCalculationMode] = useState<string>("dough-weight")
  
  // Inputs
  const [totalDoughWeight, setTotalDoughWeight] = useState<string>("900")
  const [flourWeight, setFlourWeight] = useState<string>("500")
  const [hydrationPercent, setHydrationPercent] = useState<string>("75")
  const [starterPercent, setStarterPercent] = useState<string>("20")
  const [starterHydration, setStarterHydration] = useState<string>("100")
  const [saltPercent, setSaltPercent] = useState<string>("2")
  
  const [result, setResult] = useState<null | {
    totalFlour: number
    totalWater: number
    starter: number
    salt: number
    totalDough: number
    trueHydration: number
    starterFlour: number
    starterWater: number
    additionalFlour: number
    additionalWater: number
  }>(null)

  const calculateRecipe = () => {
    const hydration = parseFloat(hydrationPercent) / 100
    const starterPct = parseFloat(starterPercent) / 100
    const starterHyd = parseFloat(starterHydration) / 100
    const saltPct = parseFloat(saltPercent) / 100

    let totalFlour = 0

    if (calculationMode === "dough-weight") {
      const doughWeight = parseFloat(totalDoughWeight)
      if (isNaN(doughWeight) || doughWeight <= 0) {
        alert("Please enter a valid dough weight")
        return
      }

      // Calculate total flour from dough weight
      // Total dough = flour + water + starter + salt
      // Total dough = flour + (flour × hydration) + (flour × starterPct) + (flour × saltPct)
      // Total dough = flour × (1 + hydration + starterPct + saltPct)
      totalFlour = doughWeight / (1 + hydration + starterPct + saltPct)
    } else {
      totalFlour = parseFloat(flourWeight)
      if (isNaN(totalFlour) || totalFlour <= 0) {
        alert("Please enter a valid flour weight")
        return
      }
    }

    // Calculate ingredients based on baker's percentages
    const totalWater = totalFlour * hydration
    const starter = totalFlour * starterPct
    const salt = totalFlour * saltPct

    // Calculate starter composition
    const starterFlour = starter / (1 + starterHyd)
    const starterWater = starter - starterFlour

    // Calculate additional flour and water (excluding what's in starter)
    const additionalFlour = totalFlour - starterFlour
    const additionalWater = totalWater - starterWater

    // Calculate true hydration (accounting for starter)
    const trueHydration = (totalWater / totalFlour) * 100

    // Calculate total dough weight
    const totalDough = totalFlour + totalWater + starter + salt

    setResult({
      totalFlour,
      totalWater,
      starter,
      salt,
      totalDough,
      trueHydration,
      starterFlour,
      starterWater,
      additionalFlour,
      additionalWater
    })
  }

  const reset = () => {
    setTotalDoughWeight("900")
    setFlourWeight("500")
    setHydrationPercent("75")
    setStarterPercent("20")
    setStarterHydration("100")
    setSaltPercent("2")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Wheat className="w-5 h-5 text-amber-600" />
          Sourdough Calculator
        </h3>

        {/* Calculation Mode */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Calculation Mode</Label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value)
              setResult(null)
            }}
            className="w-full p-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500"
          >
            <option value="dough-weight">Calculate from Total Dough Weight</option>
            <option value="flour-weight">Calculate from Flour Weight</option>
          </select>
        </div>

        {/* Dough Weight or Flour Weight */}
        {calculationMode === "dough-weight" ? (
          <div className="mb-6">
            <Label htmlFor="dough-weight" className="text-base font-semibold mb-2 block">
              Total Dough Weight (g)
            </Label>
            <Input
              id="dough-weight"
              type="number"
              step="1"
              min="0"
              value={totalDoughWeight}
              onChange={(e) => setTotalDoughWeight(e.target.value)}
              placeholder="e.g., 900"
              className="text-lg py-5 border-2 border-amber-300 focus:border-amber-500"
            />
            <p className="text-sm text-gray-600 mt-1">Standard loaf: 850-900g</p>
          </div>
        ) : (
          <div className="mb-6">
            <Label htmlFor="flour-weight" className="text-base font-semibold mb-2 block">
              Total Flour Weight (g)
            </Label>
            <Input
              id="flour-weight"
              type="number"
              step="1"
              min="0"
              value={flourWeight}
              onChange={(e) => setFlourWeight(e.target.value)}
              placeholder="e.g., 500"
              className="text-lg py-5 border-2 border-amber-300 focus:border-amber-500"
            />
          </div>
        )}

        {/* Hydration Percentage */}
        <div className="mb-6">
          <Label htmlFor="hydration" className="text-base font-semibold mb-2 block">
            Hydration (%)
          </Label>
          <Input
            id="hydration"
            type="number"
            step="1"
            min="50"
            max="100"
            value={hydrationPercent}
            onChange={(e) => setHydrationPercent(e.target.value)}
            className="text-lg py-5 border-2 border-amber-300 focus:border-amber-500"
          />
          <p className="text-sm text-gray-600 mt-1">Beginner: 70% | Advanced: 75-80%</p>
        </div>

        {/* Starter Percentage */}
        <div className="mb-6">
          <Label htmlFor="starter-pct" className="text-base font-semibold mb-2 block">
            Starter (% of flour)
          </Label>
          <Input
            id="starter-pct"
            type="number"
            step="1"
            min="5"
            max="50"
            value={starterPercent}
            onChange={(e) => setStarterPercent(e.target.value)}
            className="text-lg py-5 border-2 border-amber-300 focus:border-amber-500"
          />
          <p className="text-sm text-gray-600 mt-1">Typical: 15-25%</p>
        </div>

        {/* Starter Hydration */}
        <div className="mb-6">
          <Label htmlFor="starter-hyd" className="text-base font-semibold mb-2 block">
            Starter Hydration (%)
          </Label>
          <Input
            id="starter-hyd"
            type="number"
            step="1"
            min="50"
            max="150"
            value={starterHydration}
            onChange={(e) => setStarterHydration(e.target.value)}
            className="text-lg py-5 border-2 border-amber-300 focus:border-amber-500"
          />
          <p className="text-sm text-gray-600 mt-1">Standard: 100% (equal flour & water)</p>
        </div>

        {/* Salt Percentage */}
        <div className="mb-6">
          <Label htmlFor="salt-pct" className="text-base font-semibold mb-2 block">
            Salt (% of flour)
          </Label>
          <Input
            id="salt-pct"
            type="number"
            step="0.1"
            min="1"
            max="3"
            value={saltPercent}
            onChange={(e) => setSaltPercent(e.target.value)}
            className="text-lg py-5 border-2 border-amber-300 focus:border-amber-500"
          />
          <p className="text-sm text-gray-600 mt-1">Standard: 2%</p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={calculateRecipe}
            className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Recipe
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
            {/* Recipe Results */}
            <div className="bg-white p-6 rounded-lg border-2 border-amber-300 shadow-md">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Your Sourdough Recipe</h4>
              
              {/* Main Ingredients */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Total Flour:</span>
                  <span className="text-xl font-bold text-amber-700">{result.totalFlour.toFixed(0)}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Total Water:</span>
                  <span className="text-xl font-bold text-blue-700">{result.totalWater.toFixed(0)}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Starter:</span>
                  <span className="text-xl font-bold text-green-700">{result.starter.toFixed(0)}g</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-900">Salt:</span>
                  <span className="text-xl font-bold text-gray-700">{result.salt.toFixed(0)}g</span>
                </div>
              </div>

              {/* Total Dough */}
              <div className="border-t-2 border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Dough Weight:</span>
                  <span className="text-2xl font-bold text-amber-600">{result.totalDough.toFixed(0)}g</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">True Hydration:</span>
                  <span className="text-lg font-semibold text-blue-600">{result.trueHydration.toFixed(1)}%</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="border-t-2 border-gray-200 pt-4">
                <h5 className="font-bold text-gray-900 mb-3">Detailed Breakdown:</h5>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-amber-50 p-2 rounded">
                    <p className="text-gray-600">Flour from starter:</p>
                    <p className="font-semibold text-gray-900">{result.starterFlour.toFixed(0)}g</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-gray-600">Water from starter:</p>
                    <p className="font-semibold text-gray-900">{result.starterWater.toFixed(0)}g</p>
                  </div>
                  <div className="bg-amber-50 p-2 rounded">
                    <p className="text-gray-600">Additional flour:</p>
                    <p className="font-semibold text-gray-900">{result.additionalFlour.toFixed(0)}g</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-gray-600">Additional water:</p>
                    <p className="font-semibold text-gray-900">{result.additionalWater.toFixed(0)}g</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Baker's Percentages */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg border border-amber-300">
              <h5 className="font-bold text-gray-900 mb-2">Baker's Percentages:</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-700">Flour:</span>
                  <span className="font-semibold ml-2">100%</span>
                </div>
                <div>
                  <span className="text-gray-700">Water:</span>
                  <span className="font-semibold ml-2">{hydrationPercent}%</span>
                </div>
                <div>
                  <span className="text-gray-700">Starter:</span>
                  <span className="font-semibold ml-2">{starterPercent}%</span>
                </div>
                <div>
                  <span className="text-gray-700">Salt:</span>
                  <span className="font-semibold ml-2">{saltPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
