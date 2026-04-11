"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Droplet, Thermometer, Beaker } from "lucide-react"

export default function WaterPotentialCalculator() {
  const [calculationMode, setCalculationMode] = useState<string>("osmotic")
  
  // Osmotic potential inputs
  const [ionisationConstant, setIonisationConstant] = useState<string>("1")
  const [concentration, setConcentration] = useState<string>("")
  const [temperature, setTemperature] = useState<string>("25")
  const [pressurePotential, setPressurePotential] = useState<string>("0")
  
  const [result, setResult] = useState<{
    osmoticPotential: number
    totalWaterPotential: number
    temperatureK: number
  } | null>(null)

  const R = 0.00831 // Gas constant in L·MPa/mol·K

  const calculateWaterPotential = () => {
    const i = parseFloat(ionisationConstant)
    const C = parseFloat(concentration)
    const tempC = parseFloat(temperature)
    const psiP = parseFloat(pressurePotential)

    if (!C || !tempC) {
      alert("Please enter concentration and temperature")
      return
    }

    // Convert temperature to Kelvin
    const T = tempC + 273

    // Calculate osmotic potential: ψs = −iCRT
    const psiS = -1 * i * C * R * T

    // Calculate total water potential: ψ = ψs + ψp
    const psi = psiS + psiP

    setResult({
      osmoticPotential: Math.round(psiS * 1000) / 1000,
      totalWaterPotential: Math.round(psi * 1000) / 1000,
      temperatureK: Math.round(T * 10) / 10,
    })
  }

  const resetCalculator = () => {
    setIonisationConstant("1")
    setConcentration("")
    setTemperature("25")
    setPressurePotential("0")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Ionisation Constant */}
      <div className="space-y-3">
        <Label htmlFor="ionisation" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Beaker className="w-5 h-5 text-blue-600" />
          Ionisation Constant (i) <span className="text-red-600">*</span>
        </Label>
        <Select value={ionisationConstant} onValueChange={setIonisationConstant}>
          <SelectTrigger id="ionisation" className="text-lg h-14 border-2 border-gray-300 hover:border-blue-500 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1" className="text-base py-3">Sucrose (i = 1) - Non-ionic</SelectItem>
            <SelectItem value="2" className="text-base py-3">NaCl (i ≈ 2) - Dissociates into 2 ions</SelectItem>
            <SelectItem value="3" className="text-base py-3">CaCl₂ (i ≈ 3) - Dissociates into 3 ions</SelectItem>
            <SelectItem value="1.8" className="text-base py-3">NaCl (i = 1.8) - Realistic value</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-600">
          Sucrose does not ionize (i = 1). Ionic compounds like NaCl dissociate (i ≈ 2).
        </p>
      </div>

      {/* Concentration */}
      <div className="space-y-3">
        <Label htmlFor="concentration" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Droplet className="w-5 h-5 text-cyan-600" />
          Molar Concentration (C) <span className="text-red-600">*</span>
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="concentration"
            type="number"
            value={concentration}
            onChange={(e) => setConcentration(e.target.value)}
            placeholder="e.g., 0.15"
            className="text-lg h-12 border-2 border-gray-300 focus:border-cyan-500"
            min="0"
            step="0.01"
          />
          <span className="text-gray-700 font-semibold whitespace-nowrap">mol/L (M)</span>
        </div>
        <p className="text-sm text-gray-600">
          Enter the molarity of the solution (e.g., 0.15 M, 0.3 M, 0.4 M).
        </p>
      </div>

      {/* Temperature */}
      <div className="space-y-3">
        <Label htmlFor="temperature" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-orange-600" />
          Temperature <span className="text-red-600">*</span>
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="temperature"
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="e.g., 25"
            className="text-lg h-12 border-2 border-gray-300 focus:border-orange-500"
            step="0.1"
          />
          <span className="text-gray-700 font-semibold whitespace-nowrap">°C</span>
        </div>
        <p className="text-sm text-gray-600">
          Standard room temperature is 25°C. Will be converted to Kelvin (K = °C + 273).
        </p>
      </div>

      {/* Pressure Potential */}
      <div className="space-y-3">
        <Label htmlFor="pressure" className="text-lg font-bold text-gray-900">
          Pressure Potential (ψp)
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="pressure"
            type="number"
            value={pressurePotential}
            onChange={(e) => setPressurePotential(e.target.value)}
            placeholder="e.g., 0"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
            step="0.01"
          />
          <span className="text-gray-700 font-semibold whitespace-nowrap">MPa</span>
        </div>
        <p className="text-sm text-gray-600">
          For open containers (beakers), ψp = 0. For turgid cells, ψp &gt; 0. For xylem tension, ψp &lt; 0.
        </p>
      </div>

      {/* Formula Display */}
      <div className="p-5 bg-purple-50 border-2 border-purple-300 rounded-xl">
        <h4 className="font-bold text-gray-900 mb-3">Formulas Used:</h4>
        <div className="space-y-2 font-mono text-sm text-gray-800">
          <p><strong>Osmotic Potential:</strong> ψs = −iCRT</p>
          <p><strong>Total Water Potential:</strong> ψ = ψs + ψp</p>
          <p className="text-xs text-gray-600 mt-3">
            Where R = 0.00831 L·MPa/mol·K (gas constant)
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={calculateWaterPotential}
          size="lg"
          className="flex-1 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Water Potential
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
        <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Droplet className="w-7 h-7 text-blue-600" />
            Calculation Results
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border-2 border-purple-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Osmotic Potential (ψs)</div>
              <div className="text-4xl font-bold text-purple-600">{result.osmoticPotential} MPa</div>
              <div className="text-xs text-gray-500 mt-2">Always ≤ 0 (negative or zero)</div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Total Water Potential (ψ)</div>
              <div className="text-4xl font-bold text-blue-600">{result.totalWaterPotential} MPa</div>
              <div className="text-xs text-gray-500 mt-2">ψ = ψs + ψp</div>
            </div>
          </div>

          {/* Calculation Details */}
          <div className="bg-white border-2 border-blue-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Calculation Details:</h4>
            <div className="space-y-2 text-gray-700">
              <p>• <strong>Ionisation constant (i):</strong> {ionisationConstant}</p>
              <p>• <strong>Concentration (C):</strong> {concentration} mol/L</p>
              <p>• <strong>Temperature:</strong> {temperature}°C = {result.temperatureK} K</p>
              <p>• <strong>Gas constant (R):</strong> 0.00831 L·MPa/mol·K</p>
              <p>• <strong>Pressure potential (ψp):</strong> {pressurePotential} MPa</p>
            </div>
          </div>

          {/* Interpretation */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-2">💡 Interpretation:</h4>
            <div className="text-sm text-gray-700 space-y-2">
              {result.totalWaterPotential === 0 && (
                <p>This is <strong>pure water</strong> at standard conditions (ψ = 0 MPa).</p>
              )}
              {result.totalWaterPotential < 0 && (
                <p>Water will move <strong>from regions with higher (less negative) ψ into this solution</strong>.</p>
              )}
              {result.totalWaterPotential > 0 && (
                <p>Positive water potential indicates <strong>pressure is applied</strong> (e.g., turgor pressure in cells).</p>
              )}
              <p className="mt-3">
                <strong>Direction of water movement:</strong> Water always moves from higher ψ (less negative) to lower ψ (more negative).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
