"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Droplets, Info } from "lucide-react"

export default function AquariumSubstrateCalculator() {
  const [units, setUnits] = useState<string>("imperial")
  const [length, setLength] = useState<string>("")
  const [width, setWidth] = useState<string>("")
  const [depth, setDepth] = useState<string>("")
  const [substrateType, setSubstrateType] = useState<string>("gravel")
  const [result, setResult] = useState<null | {
    volumeLiters: number
    volumeGallons: number
    weightKg: number
    weightLbs: number
    bagsNeeded: number
    estimatedCost: number
    depthCategory: string
  }>(null)

  const substrateTypes = {
    gravel: { 
      name: "Aquarium Gravel", 
      densityKgPerLiter: 1.6,
      bagSizeLiters: 10,
      costPerBag: 15,
      description: "Medium-density gravel (2-5mm)"
    },
    sand: { 
      name: "Aquarium Sand", 
      densityKgPerLiter: 1.4,
      bagSizeLiters: 10,
      costPerBag: 12,
      description: "Fine sand (0.5-2mm)"
    },
    aquasoil: { 
      name: "Aquasoil/Plant Substrate", 
      densityKgPerLiter: 0.9,
      bagSizeLiters: 9,
      costPerBag: 35,
      description: "Nutrient-rich soil for planted tanks"
    },
    "ada-amazonia": {
      name: "ADA Aqua Soil Amazonia",
      densityKgPerLiter: 0.85,
      bagSizeLiters: 9,
      costPerBag: 53,
      description: "Premium planted tank substrate"
    },
    "fluval-stratum": {
      name: "Fluval Plant Stratum",
      densityKgPerLiter: 0.75,
      bagSizeLiters: 8,
      costPerBag: 28,
      description: "Volcanic soil for plants"
    },
    "seachem-flourite": {
      name: "Seachem Flourite",
      densityKgPerLiter: 1.3,
      bagSizeLiters: 7,
      costPerBag: 23,
      description: "Clay-based planted substrate"
    }
  }

  const calculateSubstrate = () => {
    const lengthNum = parseFloat(length)
    const widthNum = parseFloat(width)
    const depthNum = parseFloat(depth)

    if (!lengthNum || !widthNum || !depthNum || lengthNum <= 0 || widthNum <= 0 || depthNum <= 0) {
      alert("Please enter valid positive numbers for all dimensions")
      return
    }

    // Convert to cm if imperial
    let lengthCm = lengthNum
    let widthCm = widthNum
    let depthCm = depthNum

    if (units === "imperial") {
      lengthCm = lengthNum * 2.54
      widthCm = widthNum * 2.54
      depthCm = depthNum * 2.54
    }

    // Calculate volume in cubic cm, then convert to liters
    const volumeCubicCm = lengthCm * widthCm * depthCm
    const volumeLiters = volumeCubicCm / 1000
    const volumeGallons = volumeLiters * 0.264172

    // Get substrate properties
    const substrate = substrateTypes[substrateType as keyof typeof substrateTypes]
    const weightKg = volumeLiters * substrate.densityKgPerLiter
    const weightLbs = weightKg * 2.20462

    // Calculate bags needed (add 10% buffer)
    const volumeWithBuffer = volumeLiters * 1.1
    const bagsNeeded = Math.ceil(volumeWithBuffer / substrate.bagSizeLiters)
    const estimatedCost = bagsNeeded * substrate.costPerBag

    // Determine depth category
    let depthCategory = ""
    if (depthCm < 5) {
      depthCategory = "Very Shallow - May not be sufficient for most setups"
    } else if (depthCm >= 5 && depthCm < 7.5) {
      depthCategory = "Shallow - Good for fish-only tanks"
    } else if (depthCm >= 7.5 && depthCm < 12.5) {
      depthCategory = "Ideal - Perfect for most planted and fish tanks"
    } else {
      depthCategory = "Deep - Excellent for heavily planted aquariums"
    }

    setResult({
      volumeLiters: Math.round(volumeLiters * 10) / 10,
      volumeGallons: Math.round(volumeGallons * 10) / 10,
      weightKg: Math.round(weightKg * 10) / 10,
      weightLbs: Math.round(weightLbs * 10) / 10,
      bagsNeeded,
      estimatedCost,
      depthCategory
    })
  }

  const resetCalculator = () => {
    setLength("")
    setWidth("")
    setDepth("")
    setSubstrateType("gravel")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Units Selection */}
        <div className="space-y-2">
          <Label htmlFor="units" className="text-base font-semibold flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            Measurement Units
          </Label>
          <Select value={units} onValueChange={setUnits}>
            <SelectTrigger id="units" className="border-2 border-gray-300 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="imperial">Imperial (inches)</SelectItem>
              <SelectItem value="metric">Metric (cm)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Substrate Type */}
        <div className="space-y-2">
          <Label htmlFor="substrate-type" className="text-base font-semibold flex items-center gap-2">
            <Droplets className="w-4 h-4 text-green-600" />
            Substrate Type
          </Label>
          <Select value={substrateType} onValueChange={setSubstrateType}>
            <SelectTrigger id="substrate-type" className="border-2 border-gray-300 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(substrateTypes).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600 italic">
            {substrateTypes[substrateType as keyof typeof substrateTypes].description}
          </p>
        </div>

        {/* Tank Length */}
        <div className="space-y-2">
          <Label htmlFor="length" className="text-base font-semibold">
            Tank Length ({units === "imperial" ? "inches" : "cm"})
          </Label>
          <Input
            id="length"
            type="number"
            step="0.1"
            min="0"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder={units === "imperial" ? "e.g., 48" : "e.g., 122"}
            className="border-2 border-gray-300 focus:border-blue-500"
          />
        </div>

        {/* Tank Width */}
        <div className="space-y-2">
          <Label htmlFor="width" className="text-base font-semibold">
            Tank Width ({units === "imperial" ? "inches" : "cm"})
          </Label>
          <Input
            id="width"
            type="number"
            step="0.1"
            min="0"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder={units === "imperial" ? "e.g., 18" : "e.g., 46"}
            className="border-2 border-gray-300 focus:border-blue-500"
          />
        </div>

        {/* Desired Depth */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="depth" className="text-base font-semibold">
            Desired Substrate Depth ({units === "imperial" ? "inches" : "cm"})
          </Label>
          <Input
            id="depth"
            type="number"
            step="0.1"
            min="0"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder={units === "imperial" ? "e.g., 3 (2-4 inches typical)" : "e.g., 7.5 (5-10 cm typical)"}
            className="border-2 border-gray-300 focus:border-blue-500"
          />
          <p className="text-sm text-gray-600 flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
            <span>Recommended: 1-2 inches (2.5-5 cm) for fish-only tanks, 2-4 inches (5-10 cm) for planted tanks</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button 
          onClick={calculateSubstrate}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Substrate Needed
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
        <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Droplets className="w-6 h-6 text-green-600" />
            Your Substrate Requirements
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Volume */}
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 font-medium mb-1">Substrate Volume Needed</p>
              <p className="text-3xl font-bold text-blue-600">{result.volumeLiters} L</p>
              <p className="text-sm text-gray-500 mt-1">({result.volumeGallons} gallons)</p>
            </div>

            {/* Weight */}
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
              <p className="text-sm text-gray-600 font-medium mb-1">Approximate Weight</p>
              <p className="text-3xl font-bold text-purple-600">{result.weightKg} kg</p>
              <p className="text-sm text-gray-500 mt-1">({result.weightLbs} lbs)</p>
            </div>

            {/* Bags Needed */}
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
              <p className="text-sm text-gray-600 font-medium mb-1">Bags to Purchase</p>
              <p className="text-3xl font-bold text-green-600">{result.bagsNeeded}</p>
              <p className="text-sm text-gray-500 mt-1">
                ({substrateTypes[substrateType as keyof typeof substrateTypes].bagSizeLiters}L bags, includes 10% buffer)
              </p>
            </div>

            {/* Estimated Cost */}
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-orange-500">
              <p className="text-sm text-gray-600 font-medium mb-1">Estimated Cost</p>
              <p className="text-3xl font-bold text-orange-600">${result.estimatedCost}</p>
              <p className="text-sm text-gray-500 mt-1">
                (${substrateTypes[substrateType as keyof typeof substrateTypes].costPerBag} per bag)
              </p>
            </div>
          </div>

          {/* Depth Assessment */}
          <div className="mt-6 p-4 bg-white rounded-lg border-2 border-blue-200">
            <p className="text-sm font-semibold text-gray-700 mb-1">Depth Assessment:</p>
            <p className="text-base text-gray-900">{result.depthCategory}</p>
          </div>

          {/* Pro Tips */}
          <div className="mt-6 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-600">
            <p className="text-sm font-semibold text-blue-900 mb-2">💡 Pro Tips:</p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Rinse all substrates thoroughly before adding to your tank</li>
              <li>For planted tanks, consider creating a slope (2" front, 4-5" back)</li>
              <li>Add substrate slowly to avoid scratching the tank bottom</li>
              <li>The 10% buffer accounts for settling and slopes</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
