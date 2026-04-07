"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"

export default function HomeInspectionCostCalculator() {
  const [squareFootage, setSquareFootage] = useState<string>("2000")
  const [homeAge, setHomeAge] = useState<string>("10-30")
  const [foundationType, setFoundationType] = useState<string>("slab")
  const [hvacSystems, setHvacSystems] = useState<string>("1")
  const [zipCode, setZipCode] = useState<string>("")
  const [addOns, setAddOns] = useState({
    radon: false,
    mold: false,
    sewer: false,
    thermal: false,
    pool: false,
  })
  const [result, setResult] = useState<{
    baseInspection: number
    addOnsTotal: number
    total: number
  } | null>(null)

  const calculateCost = () => {
    const sqft = parseFloat(squareFootage) || 0
    const hvac = parseInt(hvacSystems) || 1
    
    // Base rate calculation by square footage
    let baseCost = 0
    if (sqft < 1000) {
      baseCost = 280
    } else if (sqft < 1500) {
      baseCost = 330
    } else if (sqft < 2000) {
      baseCost = 370
    } else if (sqft < 2500) {
      baseCost = 420
    } else if (sqft < 3000) {
      baseCost = 470
    } else if (sqft < 4000) {
      baseCost = 560
    } else if (sqft < 5000) {
      baseCost = 675
    } else {
      baseCost = 750 + ((sqft - 5000) * 0.12)
    }

    // Age surcharge
    let ageSurcharge = 0
    if (homeAge === "30-50") {
      ageSurcharge = 40
    } else if (homeAge === "50-70") {
      ageSurcharge = 70
    } else if (homeAge === "70+") {
      ageSurcharge = 100
    }

    // Foundation type
    let foundationCost = 0
    if (foundationType === "crawlspace") {
      foundationCost = 75
    } else if (foundationType === "basement") {
      foundationCost = 30
    }

    // Additional HVAC systems
    const additionalHVAC = (hvac - 1) * 35

    // Regional adjustment (simplified - based on first digit of zip)
    let regionalMultiplier = 1.0
    if (zipCode) {
      const firstDigit = parseInt(zipCode.charAt(0))
      if ([0, 1, 2].includes(firstDigit)) {
        regionalMultiplier = 1.25 // Northeast
      } else if ([9].includes(firstDigit)) {
        regionalMultiplier = 1.35 // West Coast
      } else if ([3, 5].includes(firstDigit)) {
        regionalMultiplier = 1.05 // Southeast
      } else if ([8].includes(firstDigit)) {
        regionalMultiplier = 1.15 // Mountain West
      }
    }

    const baseInspectionCost = Math.round(
      (baseCost + ageSurcharge + foundationCost + additionalHVAC) * regionalMultiplier
    )

    // Add-on services
    let addOnsTotal = 0
    if (addOns.radon) addOnsTotal += 150
    if (addOns.mold) addOnsTotal += 400
    if (addOns.sewer) addOnsTotal += 200
    if (addOns.thermal) addOnsTotal += 225
    if (addOns.pool) addOnsTotal += 175

    setResult({
      baseInspection: baseInspectionCost,
      addOnsTotal: addOnsTotal,
      total: baseInspectionCost + addOnsTotal,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="squareFootage" className="text-base font-semibold text-gray-900">
            Square Footage
          </Label>
          <Input
            id="squareFootage"
            type="number"
            value={squareFootage}
            onChange={(e) => setSquareFootage(e.target.value)}
            placeholder="2000"
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="homeAge" className="text-base font-semibold text-gray-900">
            Home Age
          </Label>
          <Select value={homeAge} onValueChange={setHomeAge}>
            <SelectTrigger id="homeAge" className="text-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-10">0-10 years</SelectItem>
              <SelectItem value="10-30">10-30 years</SelectItem>
              <SelectItem value="30-50">30-50 years</SelectItem>
              <SelectItem value="50-70">50-70 years</SelectItem>
              <SelectItem value="70+">70+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="foundationType" className="text-base font-semibold text-gray-900">
            Foundation Type
          </Label>
          <Select value={foundationType} onValueChange={setFoundationType}>
            <SelectTrigger id="foundationType" className="text-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slab">Slab</SelectItem>
              <SelectItem value="crawlspace">Crawlspace</SelectItem>
              <SelectItem value="basement">Basement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hvacSystems" className="text-base font-semibold text-gray-900">
            Number of HVAC Systems
          </Label>
          <Select value={hvacSystems} onValueChange={setHvacSystems}>
            <SelectTrigger id="hvacSystems" className="text-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 system</SelectItem>
              <SelectItem value="2">2 systems</SelectItem>
              <SelectItem value="3">3 systems</SelectItem>
              <SelectItem value="4">4+ systems</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode" className="text-base font-semibold text-gray-900">
            ZIP Code (Optional)
          </Label>
          <Input
            id="zipCode"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="12345"
            maxLength={5}
            className="text-lg"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-900">Add-On Services (Optional)</Label>
        <div className="grid md:grid-cols-2 gap-3">
          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={addOns.radon}
              onChange={(e) => setAddOns({ ...addOns, radon: e.target.checked })}
              className="w-5 h-5"
            />
            <span className="text-gray-900">Radon Testing (+$150)</span>
          </label>
          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={addOns.mold}
              onChange={(e) => setAddOns({ ...addOns, mold: e.target.checked })}
              className="w-5 h-5"
            />
            <span className="text-gray-900">Mold Inspection (+$400)</span>
          </label>
          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={addOns.sewer}
              onChange={(e) => setAddOns({ ...addOns, sewer: e.target.checked })}
              className="w-5 h-5"
            />
            <span className="text-gray-900">Sewer Scope (+$200)</span>
          </label>
          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={addOns.thermal}
              onChange={(e) => setAddOns({ ...addOns, thermal: e.target.checked })}
              className="w-5 h-5"
            />
            <span className="text-gray-900">Thermal Imaging (+$225)</span>
          </label>
          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={addOns.pool}
              onChange={(e) => setAddOns({ ...addOns, pool: e.target.checked })}
              className="w-5 h-5"
            />
            <span className="text-gray-900">Pool Inspection (+$175)</span>
          </label>
        </div>
      </div>

      <Button onClick={calculateCost} size="lg" className="w-full text-lg font-semibold">
        <Calculator className="w-5 h-5 mr-2" />
        Calculate Inspection Cost
      </Button>

      {result && (
        <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Estimated Cost</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
              <span className="text-lg text-gray-700">Base Inspection:</span>
              <span className="text-2xl font-bold text-gray-900">${result.baseInspection}</span>
            </div>
            {result.addOnsTotal > 0 && (
              <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
                <span className="text-lg text-gray-700">Add-On Services:</span>
                <span className="text-2xl font-bold text-gray-900">${result.addOnsTotal}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-bold text-gray-900">Total Estimated Cost:</span>
              <span className="text-4xl font-bold text-blue-600">${result.total}</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-600 leading-relaxed">
            This estimate is based on industry averages and regional pricing data. Actual quotes may vary by ±10-15%. 
            Contact 2-3 ASHI or InterNACHI-certified inspectors in your area for final pricing.
          </p>
        </div>
      )}
    </div>
  )
}
