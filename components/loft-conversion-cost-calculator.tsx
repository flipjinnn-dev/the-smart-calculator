"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Home, TrendingUp, Info } from "lucide-react"

export default function LoftConversionCostCalculator() {
  const [conversionType, setConversionType] = useState<string>("velux")
  const [floorArea, setFloorArea] = useState<string>("")
  const [location, setLocation] = useState<string>("england")
  const [finishLevel, setFinishLevel] = useState<string>("mid-range")
  const [includeEnSuite, setIncludeEnSuite] = useState<string>("no")
  const [includeStaircase, setIncludeStaircase] = useState<string>("yes")
  const [result, setResult] = useState<null | {
    lowEstimate: number
    midEstimate: number
    highEstimate: number
    costPerSqm: { low: number; high: number }
    buildTime: string
    breakdown: {
      structural: number
      roofing: number
      windows: number
      insulation: number
      electrics: number
      plumbing: number
      bathroom: number
      staircase: number
      finishes: number
      contingency: number
    }
  }>(null)

  const conversionTypes = {
    velux: { name: "Velux (Rooflight)", baseMin: 920, baseMax: 1600, weeks: "4-6 weeks" },
    dormer: { name: "Dormer", baseMin: 1500, baseMax: 2000, weeks: "8-12 weeks" },
    "hip-to-gable": { name: "Hip-to-Gable", baseMin: 1800, baseMax: 2200, weeks: "10-14 weeks" },
    mansard: { name: "Mansard", baseMin: 1900, baseMax: 2600, weeks: "10-14 weeks" },
    "l-shaped": { name: "L-Shaped Dormer", baseMin: 1700, baseMax: 2300, weeks: "10-14 weeks" },
  }

  const locationMultipliers = {
    england: { name: "England (Non-London)", multiplier: 1.0 },
    london: { name: "London/South East", multiplier: 1.25 },
    midlands: { name: "Midlands", multiplier: 0.95 },
    north: { name: "North England", multiplier: 0.90 },
    scotland: { name: "Scotland", multiplier: 0.92 },
    wales: { name: "Wales", multiplier: 0.93 },
  }

  const finishMultipliers = {
    basic: { name: "Basic (Shell Only)", multiplier: 0.65 },
    "mid-range": { name: "Mid-Range (Standard Fit-Out)", multiplier: 1.0 },
    "high-end": { name: "High-End (Premium Finishes)", multiplier: 1.35 },
  }

  const calculateCost = () => {
    const areaNum = parseFloat(floorArea)

    if (!areaNum || areaNum <= 0) {
      alert("Please enter a valid floor area")
      return
    }

    if (areaNum < 10 || areaNum > 100) {
      alert("Floor area should be between 10 m² and 100 m²")
      return
    }

    const typeData = conversionTypes[conversionType as keyof typeof conversionTypes]
    const locMultiplier = locationMultipliers[location as keyof typeof locationMultipliers].multiplier
    const finishMult = finishMultipliers[finishLevel as keyof typeof finishMultipliers].multiplier

    // Base cost per sqm
    let baseLow = typeData.baseMin * locMultiplier * finishMult
    let baseHigh = typeData.baseMax * locMultiplier * finishMult

    // Total base cost
    let lowEstimate = baseLow * areaNum
    let highEstimate = baseHigh * areaNum

    // Add en-suite if selected
    const enSuiteCost = includeEnSuite === "yes" ? 6000 : 0
    
    // Staircase cost (included by default)
    const staircaseCost = includeStaircase === "yes" ? 3500 : 0

    // Calculate breakdown (approximate percentages)
    const midTotal = (lowEstimate + highEstimate) / 2
    const breakdown = {
      structural: Math.round(midTotal * 0.20),
      roofing: Math.round(midTotal * 0.18),
      windows: Math.round(midTotal * 0.12),
      insulation: Math.round(midTotal * 0.08),
      electrics: Math.round(midTotal * 0.10),
      plumbing: Math.round(midTotal * 0.08),
      bathroom: enSuiteCost,
      staircase: staircaseCost,
      finishes: Math.round(midTotal * 0.14),
      contingency: Math.round(midTotal * 0.10),
    }

    lowEstimate += enSuiteCost + staircaseCost
    highEstimate += enSuiteCost + staircaseCost

    const midEstimate = (lowEstimate + highEstimate) / 2

    setResult({
      lowEstimate,
      midEstimate,
      highEstimate,
      costPerSqm: {
        low: Math.round(baseLow),
        high: Math.round(baseHigh),
      },
      buildTime: typeData.weeks,
      breakdown,
    })
  }

  const resetCalculator = () => {
    setConversionType("velux")
    setFloorArea("")
    setLocation("england")
    setFinishLevel("mid-range")
    setIncludeEnSuite("no")
    setIncludeStaircase("yes")
    setResult(null)
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="space-y-6 bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="w-7 h-7 text-blue-600" />
          Calculate Your Loft Conversion Cost
        </h3>

        {/* Conversion Type */}
        <div className="space-y-3">
          <Label htmlFor="conversionType" className="text-lg font-bold text-gray-900">
            Conversion Type <span className="text-red-600">*</span>
          </Label>
          <Select value={conversionType} onValueChange={setConversionType}>
            <SelectTrigger className="text-lg h-12 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(conversionTypes).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600">
            Choose the type of loft conversion you want
          </p>
        </div>

        {/* Floor Area */}
        <div className="space-y-3">
          <Label htmlFor="floorArea" className="text-lg font-bold text-gray-900">
            Floor Area (m²) <span className="text-red-600">*</span>
          </Label>
          <Input
            id="floorArea"
            type="number"
            value={floorArea}
            onChange={(e) => setFloorArea(e.target.value)}
            placeholder="e.g., 30"
            min="10"
            max="100"
            step="1"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
          />
          <p className="text-sm text-gray-600">
            Typical loft conversions are 20-40 m²
          </p>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label htmlFor="location" className="text-lg font-bold text-gray-900">
            UK Location
          </Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="text-lg h-12 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(locationMultipliers).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Finish Level */}
        <div className="space-y-3">
          <Label htmlFor="finishLevel" className="text-lg font-bold text-gray-900">
            Finish Level
          </Label>
          <Select value={finishLevel} onValueChange={setFinishLevel}>
            <SelectTrigger className="text-lg h-12 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(finishMultipliers).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* En-Suite Bathroom */}
        <div className="space-y-3">
          <Label htmlFor="includeEnSuite" className="text-lg font-bold text-gray-900">
            Include En-Suite Bathroom?
          </Label>
          <Select value={includeEnSuite} onValueChange={setIncludeEnSuite}>
            <SelectTrigger className="text-lg h-12 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes (+£6,000)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Staircase */}
        <div className="space-y-3">
          <Label htmlFor="includeStaircase" className="text-lg font-bold text-gray-900">
            Include New Staircase?
          </Label>
          <Select value={includeStaircase} onValueChange={setIncludeStaircase}>
            <SelectTrigger className="text-lg h-12 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes (+£3,500)</SelectItem>
              <SelectItem value="no">No (Using Existing)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={calculateCost}
            size="lg"
            className="flex-1 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Cost
          </Button>
          <Button
            onClick={resetCalculator}
            size="lg"
            variant="outline"
            className="text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Estimate Card */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Your Estimated Cost Range</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-sm opacity-90 mb-2">Low Estimate</div>
                <div className="text-3xl font-bold">£{result.lowEstimate.toLocaleString()}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border-2 border-white/50">
                <div className="text-sm opacity-90 mb-2">Mid Estimate</div>
                <div className="text-4xl font-bold">£{result.midEstimate.toLocaleString()}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-sm opacity-90 mb-2">High Estimate</div>
                <div className="text-3xl font-bold">£{result.highEstimate.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg">
                <strong>Cost per m²:</strong> £{result.costPerSqm.low.toLocaleString()} - £{result.costPerSqm.high.toLocaleString()}
              </p>
              <p className="text-lg mt-2">
                <strong>Build Time:</strong> {result.buildTime}
              </p>
            </div>
          </div>

          {/* Cost Breakdown Card */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-blue-600" />
              Cost Breakdown
            </h4>
            <div className="space-y-3 text-gray-700">
              {[
                { label: "Structural Work", value: result.breakdown.structural },
                { label: "Roofing & Dormers", value: result.breakdown.roofing },
                { label: "Windows & Rooflights", value: result.breakdown.windows },
                { label: "Insulation", value: result.breakdown.insulation },
                { label: "Electrics & Lighting", value: result.breakdown.electrics },
                { label: "Plumbing & Heating", value: result.breakdown.plumbing },
                ...(result.breakdown.bathroom > 0 ? [{ label: "En-Suite Bathroom", value: result.breakdown.bathroom }] : []),
                ...(result.breakdown.staircase > 0 ? [{ label: "Staircase", value: result.breakdown.staircase }] : []),
                { label: "Finishes & Decoration", value: result.breakdown.finishes },
                { label: "Contingency (10%)", value: result.breakdown.contingency },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">{item.label}:</span>
                  <span className="text-lg font-bold text-blue-600">£{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Information */}
          <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-start gap-4">
            <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Expected ROI:</strong> A loft conversion typically adds <strong>20-24% to your property value</strong>. Most homeowners recover 60-100% of their investment, with high-demand areas often achieving full ROI or more.
              </p>
            </div>
          </div>

          {/* Important Notes */}
          <div className="p-6 bg-orange-50 border-2 border-orange-200 rounded-xl flex items-start gap-4">
            <Info className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Important:</strong> These estimates include VAT at 20% and are based on 2026 UK market data. Actual costs may vary based on specific site conditions, material choices, and contractor rates. Always obtain 3 detailed quotes from local specialists.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
