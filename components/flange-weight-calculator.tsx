"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Settings, Weight } from "lucide-react"

export default function FlangeWeightCalculator() {
  const [flangeType, setFlangeType] = useState<string>("blind")
  const [material, setMaterial] = useState<string>("carbon-steel")
  const [unit, setUnit] = useState<string>("mm")
  
  // Dimensions
  const [outerDiameter, setOuterDiameter] = useState<string>("")
  const [innerDiameter, setInnerDiameter] = useState<string>("")
  const [thickness, setThickness] = useState<string>("")
  
  const [result, setResult] = useState<{
    weightKg: number
    weightLbs: number
    volume: number
  } | null>(null)

  // Material densities in kg/m³
  const materialDensities: { [key: string]: number } = {
    "carbon-steel": 7850,
    "stainless-steel": 8000,
    "mild-steel": 7850,
    "alloy-steel": 7850,
  }

  const calculateWeight = () => {
    const od = parseFloat(outerDiameter)
    const id = parseFloat(innerDiameter)
    const t = parseFloat(thickness)

    if (!od || !t) {
      alert("Please enter valid dimensions")
      return
    }

    // Convert to meters based on unit
    let odMeters = od
    let idMeters = id || 0
    let tMeters = t

    if (unit === "mm") {
      odMeters = od / 1000
      idMeters = (id || 0) / 1000
      tMeters = t / 1000
    } else if (unit === "cm") {
      odMeters = od / 100
      idMeters = (id || 0) / 100
      tMeters = t / 100
    } else if (unit === "inch") {
      odMeters = od * 0.0254
      idMeters = (id || 0) * 0.0254
      tMeters = t * 0.0254
    }

    // Calculate volume using formula: π × (OD² − ID²) / 4 × Thickness
    const volume = Math.PI * ((odMeters * odMeters) - (idMeters * idMeters)) / 4 * tMeters

    // Get material density
    const density = materialDensities[material]

    // Calculate weight in kg
    const weightKg = volume * density

    // Convert to pounds (1 kg = 2.20462 lbs)
    const weightLbs = weightKg * 2.20462

    setResult({
      weightKg: Math.round(weightKg * 100) / 100,
      weightLbs: Math.round(weightLbs * 100) / 100,
      volume: Math.round(volume * 1000000) / 1000000, // in m³
    })
  }

  const resetCalculator = () => {
    setOuterDiameter("")
    setInnerDiameter("")
    setThickness("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Flange Type Selector */}
      <div className="space-y-3">
        <Label htmlFor="flangeType" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-orange-600" />
          Flange Type
        </Label>
        <Select value={flangeType} onValueChange={setFlangeType}>
          <SelectTrigger id="flangeType" className="text-lg h-14 border-2 border-gray-300 hover:border-orange-500 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blind" className="text-base py-3">🔴 Blind Flange</SelectItem>
            <SelectItem value="weld-neck" className="text-base py-3">🔧 Weld Neck Flange</SelectItem>
            <SelectItem value="slip-on" className="text-base py-3">⚙️ Slip-On Flange</SelectItem>
            <SelectItem value="raised-face" className="text-base py-3">📐 Raised Face Flange</SelectItem>
            <SelectItem value="ring-type" className="text-base py-3">⭕ Ring Type Flange</SelectItem>
            <SelectItem value="reducing" className="text-base py-3">🔽 Reducing Flange</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Material Selector */}
      <div className="space-y-3">
        <Label htmlFor="material" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Weight className="w-5 h-5 text-orange-600" />
          Material Type
        </Label>
        <Select value={material} onValueChange={setMaterial}>
          <SelectTrigger id="material" className="text-lg h-14 border-2 border-gray-300 hover:border-orange-500 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="carbon-steel" className="text-base py-3">Carbon Steel (7850 kg/m³)</SelectItem>
            <SelectItem value="stainless-steel" className="text-base py-3">Stainless Steel (8000 kg/m³)</SelectItem>
            <SelectItem value="mild-steel" className="text-base py-3">Mild Steel (7850 kg/m³)</SelectItem>
            <SelectItem value="alloy-steel" className="text-base py-3">Alloy Steel (7850 kg/m³)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Unit Selector */}
      <div className="space-y-3">
        <Label htmlFor="unit" className="text-lg font-bold text-gray-900">
          Measurement Unit
        </Label>
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger id="unit" className="text-lg h-14 border-2 border-gray-300 hover:border-orange-500 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mm" className="text-base py-3">Millimeters (mm)</SelectItem>
            <SelectItem value="cm" className="text-base py-3">Centimeters (cm)</SelectItem>
            <SelectItem value="m" className="text-base py-3">Meters (m)</SelectItem>
            <SelectItem value="inch" className="text-base py-3">Inches (in)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dimensions Input */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Flange Dimensions</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label htmlFor="outerDiameter" className="text-base font-bold text-gray-900">
              Outer Diameter (OD) <span className="text-red-600">*</span>
            </Label>
            <Input
              id="outerDiameter"
              type="number"
              value={outerDiameter}
              onChange={(e) => setOuterDiameter(e.target.value)}
              placeholder={`Enter OD in ${unit}`}
              className="text-lg h-12 border-2 border-gray-300 focus:border-orange-500"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="innerDiameter" className="text-base font-bold text-gray-900">
              Inner Diameter (ID)
            </Label>
            <Input
              id="innerDiameter"
              type="number"
              value={innerDiameter}
              onChange={(e) => setInnerDiameter(e.target.value)}
              placeholder={`Enter ID in ${unit}`}
              className="text-lg h-12 border-2 border-gray-300 focus:border-orange-500"
              min="0"
              step="0.01"
            />
            <p className="text-xs text-gray-600">Leave blank for blind flange</p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="thickness" className="text-base font-bold text-gray-900">
              Thickness <span className="text-red-600">*</span>
            </Label>
            <Input
              id="thickness"
              type="number"
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              placeholder={`Enter thickness in ${unit}`}
              className="text-lg h-12 border-2 border-gray-300 focus:border-orange-500"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Formula Display */}
      <div className="p-5 bg-blue-50 border-2 border-blue-300 rounded-xl">
        <h4 className="font-bold text-gray-900 mb-2">Formula Used:</h4>
        <p className="text-gray-800 font-mono text-sm">
          Weight (kg) = π × (OD² − ID²) / 4 × Thickness × Density
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Where density for {material.replace("-", " ")} = {materialDensities[material]} kg/m³
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={calculateWeight}
          size="lg"
          className="flex-1 text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Weight
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

      {/* Results */}
      {result && (
        <div className="mt-8 p-8 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Weight className="w-7 h-7 text-orange-600" />
            Calculation Results
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border-2 border-orange-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Weight in Kilograms</div>
              <div className="text-4xl font-bold text-orange-600">{result.weightKg} kg</div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-orange-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Weight in Pounds</div>
              <div className="text-4xl font-bold text-orange-600">{result.weightLbs} lbs</div>
            </div>
          </div>

          <div className="mt-6 p-5 bg-white border-2 border-orange-200 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-3">Calculation Details:</h4>
            <div className="space-y-2 text-gray-700">
              <p>• <strong>Flange Type:</strong> {flangeType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</p>
              <p>• <strong>Material:</strong> {material.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</p>
              <p>• <strong>Density:</strong> {materialDensities[material]} kg/m³</p>
              <p>• <strong>Volume:</strong> {result.volume} m³</p>
              <p>• <strong>Outer Diameter:</strong> {outerDiameter} {unit}</p>
              <p>• <strong>Inner Diameter:</strong> {innerDiameter || "N/A (Blind Flange)"} {innerDiameter ? unit : ""}</p>
              <p>• <strong>Thickness:</strong> {thickness} {unit}</p>
            </div>
          </div>

          <div className="mt-6 p-5 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>💡 Note:</strong> This calculation is based on standard formulas and material densities. For critical applications, always verify with manufacturer specifications and engineering standards like ASME B16.5 or ASME B16.47.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
