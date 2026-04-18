"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Home } from "lucide-react"

export default function GarageConversionCalculator() {
  const [garageLength, setGarageLength] = useState<string>("")
  const [garageWidth, setGarageWidth] = useState<string>("")
  const [garageType, setGarageType] = useState<string>("single-integral")
  const [specLevel, setSpecLevel] = useState<string>("mid-range")
  const [conversionPurpose, setConversionPurpose] = useState<string>("bedroom")
  const [region, setRegion] = useState<string>("midlands")
  
  const [result, setResult] = useState<null | {
    floorArea: number
    baseCost: number
    fixedCosts: number
    roomSpecificCosts: number
    regionalMultiplier: number
    subtotal: number
    contingency: number
    totalCost: number
    costPerSqM: number
    breakdown: {
      insulation: number
      flooring: number
      plastering: number
      electrics: number
      windowsDoors: number
      heating: number
      garageRemoval: number
    }
  }>(null)

  const calculateCost = () => {
    const length = parseFloat(garageLength)
    const width = parseFloat(garageWidth)

    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
      alert("Please enter valid garage dimensions")
      return
    }

    // Calculate floor area
    const floorArea = length * width

    // Cost per m² based on specification level
    const costPerSqMRates: { [key: string]: number } = {
      "basic": 500,
      "mid-range": 750,
      "high-spec": 1200
    }

    const baseRate = costPerSqMRates[specLevel] || 750

    // Regional multipliers
    const regionalMultipliers: { [key: string]: number } = {
      "london": 1.35,
      "south-east": 1.20,
      "east-england": 1.10,
      "south-west": 1.05,
      "midlands": 1.00,
      "yorkshire": 0.95,
      "north-west": 0.95,
      "north-east": 0.90,
      "scotland": 0.95,
      "wales": 0.90,
      "northern-ireland": 0.85
    }

    const regionalMultiplier = regionalMultipliers[region] || 1.00

    // Base cost
    const baseCost = floorArea * baseRate * regionalMultiplier

    // Fixed costs
    let fixedCosts = 0
    if (garageType === "single-detached" || garageType === "double-detached") {
      fixedCosts += 300 // Planning permission
    }
    fixedCosts += 300 // Building regulations
    fixedCosts += 450 // Structural engineer (average)

    // Room-specific costs
    let roomSpecificCosts = 0
    if (conversionPurpose === "bathroom") {
      roomSpecificCosts += 5000
    } else if (conversionPurpose === "kitchen") {
      roomSpecificCosts += 10000
    } else if (conversionPurpose === "adu") {
      roomSpecificCosts += 15000
    } else if (conversionPurpose === "gym") {
      roomSpecificCosts += 2000
    }

    // Detailed breakdown
    const breakdown = {
      insulation: floorArea * 150,
      flooring: floorArea * 80,
      plastering: floorArea * 50,
      electrics: specLevel === "high-spec" ? 3000 : (specLevel === "mid-range" ? 1500 : 1000),
      windowsDoors: specLevel === "high-spec" ? 3500 : (specLevel === "mid-range" ? 2000 : 1500),
      heating: specLevel === "high-spec" ? 1500 : (specLevel === "mid-range" ? 1000 : 800),
      garageRemoval: 2500
    }

    const subtotal = baseCost + fixedCosts + roomSpecificCosts
    const contingency = subtotal * 0.125 // 12.5% contingency
    const totalCost = subtotal + contingency

    setResult({
      floorArea,
      baseCost,
      fixedCosts,
      roomSpecificCosts,
      regionalMultiplier,
      subtotal,
      contingency,
      totalCost,
      costPerSqM: totalCost / floorArea,
      breakdown
    })
  }

  const reset = () => {
    setGarageLength("")
    setGarageWidth("")
    setGarageType("single-integral")
    setSpecLevel("mid-range")
    setConversionPurpose("bedroom")
    setRegion("midlands")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-blue-600" />
          Garage Conversion Cost Calculator
        </h3>

        {/* Garage Dimensions */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Garage Dimensions (metres)</Label>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length (m)</Label>
              <Input
                id="length"
                type="number"
                step="0.1"
                min="0"
                value={garageLength}
                onChange={(e) => setGarageLength(e.target.value)}
                placeholder="e.g., 5.5"
                className="border-2 border-blue-300 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width (m)</Label>
              <Input
                id="width"
                type="number"
                step="0.1"
                min="0"
                value={garageWidth}
                onChange={(e) => setGarageWidth(e.target.value)}
                placeholder="e.g., 3.0"
                className="border-2 border-blue-300 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Garage Type */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Garage Type</Label>
          <select
            value={garageType}
            onChange={(e) => setGarageType(e.target.value)}
            className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="single-integral">Single Integral (attached, shares wall)</option>
            <option value="single-attached">Single Attached</option>
            <option value="single-detached">Single Detached</option>
            <option value="double-integral">Double Integral</option>
            <option value="double-detached">Double Detached</option>
          </select>
        </div>

        {/* Specification Level */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Specification Level</Label>
          <select
            value={specLevel}
            onChange={(e) => setSpecLevel(e.target.value)}
            className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="basic">Basic (£400-£600/m²)</option>
            <option value="mid-range">Mid-Range (£600-£900/m²)</option>
            <option value="high-spec">High-Spec (£900-£1,500/m²)</option>
          </select>
        </div>

        {/* Conversion Purpose */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Conversion Purpose</Label>
          <select
            value={conversionPurpose}
            onChange={(e) => setConversionPurpose(e.target.value)}
            className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="bedroom">Bedroom / Home Office</option>
            <option value="gym">Gym / Hobby Room</option>
            <option value="bathroom">Bathroom</option>
            <option value="kitchen">Kitchen Extension</option>
            <option value="adu">ADU / Annexe (Self-Contained)</option>
          </select>
        </div>

        {/* Region */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">UK Region</Label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="london">London (+35%)</option>
            <option value="south-east">South East (+20%)</option>
            <option value="east-england">East of England (+10%)</option>
            <option value="south-west">South West (+5%)</option>
            <option value="midlands">Midlands (baseline)</option>
            <option value="yorkshire">Yorkshire (-5%)</option>
            <option value="north-west">North West (-5%)</option>
            <option value="north-east">North East (-10%)</option>
            <option value="scotland">Scotland (-5%)</option>
            <option value="wales">Wales (-10%)</option>
            <option value="northern-ireland">Northern Ireland (-15%)</option>
          </select>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={calculateCost}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Cost
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
            {/* Total Cost */}
            <div className="bg-white p-6 rounded-lg border-2 border-blue-300 shadow-md">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">Estimated Total Cost</p>
                <p className="text-6xl font-bold text-blue-600">
                  £{result.totalCost.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {result.floorArea.toFixed(1)} m² @ £{result.costPerSqM.toFixed(0)}/m²
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="border-t-2 border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base conversion cost:</span>
                  <span className="font-semibold">£{result.baseCost.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fixed costs (permits, engineer):</span>
                  <span className="font-semibold">£{result.fixedCosts.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>
                {result.roomSpecificCosts > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Room-specific costs:</span>
                    <span className="font-semibold">£{result.roomSpecificCosts.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Regional adjustment:</span>
                  <span className="font-semibold">×{result.regionalMultiplier.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">£{result.subtotal.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Contingency (12.5%):</span>
                  <span className="font-semibold">£{result.contingency.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2 text-sm">Detailed Cost Breakdown:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insulation:</span>
                    <span className="font-semibold">£{result.breakdown.insulation.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flooring:</span>
                    <span className="font-semibold">£{result.breakdown.flooring.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plastering:</span>
                    <span className="font-semibold">£{result.breakdown.plastering.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Electrics:</span>
                    <span className="font-semibold">£{result.breakdown.electrics.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Windows/Doors:</span>
                    <span className="font-semibold">£{result.breakdown.windowsDoors.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Heating:</span>
                    <span className="font-semibold">£{result.breakdown.heating.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-gray-600">Garage Door Removal:</span>
                    <span className="font-semibold">£{result.breakdown.garageRemoval.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> This is an estimate only. Actual costs vary based on specific site conditions, contractor rates, and material choices. Always get at least 3 detailed quotes from local builders.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
