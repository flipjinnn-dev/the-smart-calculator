"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Thermometer, AlertCircle } from "lucide-react"

export default function LMTDCalculator() {
  const [flowType, setFlowType] = useState<string>("counterflow")
  
  // Temperature inputs
  const [hotInlet, setHotInlet] = useState<string>("120")
  const [hotOutlet, setHotOutlet] = useState<string>("60")
  const [coldInlet, setColdInlet] = useState<string>("25")
  const [coldOutlet, setColdOutlet] = useState<string>("45")
  
  const [result, setResult] = useState<null | {
    deltaT1: number
    deltaT2: number
    lmtd: number
    correctionFactor: number
    correctedLMTD: number
    R: number
    P: number
    warning: string | null
  }>(null)

  const calculateLMTD = () => {
    const Th_in = parseFloat(hotInlet)
    const Th_out = parseFloat(hotOutlet)
    const Tc_in = parseFloat(coldInlet)
    const Tc_out = parseFloat(coldOutlet)

    if (isNaN(Th_in) || isNaN(Th_out) || isNaN(Tc_in) || isNaN(Tc_out)) {
      alert("Please enter valid temperatures")
      return
    }

    // Validate temperature logic
    if (Th_in <= Th_out) {
      alert("Hot fluid inlet temperature must be greater than outlet temperature")
      return
    }

    if (Tc_out <= Tc_in) {
      alert("Cold fluid outlet temperature must be greater than inlet temperature")
      return
    }

    let deltaT1 = 0
    let deltaT2 = 0
    let warning: string | null = null

    // Calculate terminal temperature differences based on flow type
    if (flowType === "counterflow") {
      deltaT1 = Th_in - Tc_out
      deltaT2 = Th_out - Tc_in
    } else if (flowType === "parallel") {
      deltaT1 = Th_in - Tc_in
      deltaT2 = Th_out - Tc_out
      
      // Check for temperature cross in parallel flow
      if (Tc_out > Th_out) {
        warning = "Temperature cross detected! Cold outlet exceeds hot outlet - thermodynamically impossible in parallel flow."
      }
    }

    if (deltaT1 <= 0 || deltaT2 <= 0) {
      alert("Invalid temperature configuration. Check your inlet and outlet temperatures.")
      return
    }

    // Calculate LMTD
    let lmtd = 0
    if (Math.abs(deltaT1 - deltaT2) < 0.001) {
      // Special case: when ΔT₁ = ΔT₂
      lmtd = deltaT1
    } else {
      lmtd = (deltaT1 - deltaT2) / Math.log(deltaT1 / deltaT2)
    }

    // Calculate R and P parameters for correction factor
    const R = (Th_in - Th_out) / (Tc_out - Tc_in)
    const P = (Tc_out - Tc_in) / (Th_in - Tc_in)

    // Calculate correction factor F
    let F = 1.0 // Default for pure counterflow/parallel flow

    if (flowType === "shell-tube-1-2") {
      // 1-2 shell and tube correction factor formula
      const S = Math.sqrt(R * R + 1) / (R - 1)
      const numerator = Math.log((1 - P) / (1 - P * R))
      const denominator = Math.log((2 - P * (R + 1 - S)) / (2 - P * (R + 1 + S)))
      F = (S * numerator) / denominator

      if (F < 0.75) {
        warning = "Warning: Correction factor F < 0.75. Consider redesigning with multiple shells in series."
      }
    } else if (flowType === "crossflow") {
      // Simplified cross-flow correction factor (both fluids unmixed)
      F = 0.9 // Typical approximation for cross-flow
    }

    const correctedLMTD = F * lmtd

    setResult({
      deltaT1,
      deltaT2,
      lmtd,
      correctionFactor: F,
      correctedLMTD,
      R,
      P,
      warning
    })
  }

  const reset = () => {
    setHotInlet("120")
    setHotOutlet("60")
    setColdInlet("25")
    setColdOutlet("45")
    setFlowType("counterflow")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-red-600" />
          LMTD Calculator
        </h3>

        {/* Flow Type Selection */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Heat Exchanger Type</Label>
          <select
            value={flowType}
            onChange={(e) => {
              setFlowType(e.target.value)
              setResult(null)
            }}
            className="w-full p-3 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
          >
            <option value="counterflow">Counterflow (Counter-current)</option>
            <option value="parallel">Parallel Flow (Co-current)</option>
            <option value="shell-tube-1-2">Shell & Tube (1-2 Pass)</option>
            <option value="crossflow">Cross Flow</option>
          </select>
        </div>

        {/* Hot Fluid Temperatures */}
        <div className="mb-6 p-4 bg-red-100 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-3">Hot Fluid Temperatures</h4>
          
          <div className="mb-4">
            <Label htmlFor="hot-inlet" className="text-base font-semibold mb-2 block">
              Hot Inlet Temperature (°C)
            </Label>
            <Input
              id="hot-inlet"
              type="number"
              step="0.1"
              value={hotInlet}
              onChange={(e) => setHotInlet(e.target.value)}
              placeholder="e.g., 120"
              className="text-lg py-5 border-2 border-red-300 focus:border-red-500"
            />
          </div>

          <div>
            <Label htmlFor="hot-outlet" className="text-base font-semibold mb-2 block">
              Hot Outlet Temperature (°C)
            </Label>
            <Input
              id="hot-outlet"
              type="number"
              step="0.1"
              value={hotOutlet}
              onChange={(e) => setHotOutlet(e.target.value)}
              placeholder="e.g., 60"
              className="text-lg py-5 border-2 border-red-300 focus:border-red-500"
            />
          </div>
        </div>

        {/* Cold Fluid Temperatures */}
        <div className="mb-6 p-4 bg-blue-100 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-3">Cold Fluid Temperatures</h4>
          
          <div className="mb-4">
            <Label htmlFor="cold-inlet" className="text-base font-semibold mb-2 block">
              Cold Inlet Temperature (°C)
            </Label>
            <Input
              id="cold-inlet"
              type="number"
              step="0.1"
              value={coldInlet}
              onChange={(e) => setColdInlet(e.target.value)}
              placeholder="e.g., 25"
              className="text-lg py-5 border-2 border-blue-300 focus:border-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="cold-outlet" className="text-base font-semibold mb-2 block">
              Cold Outlet Temperature (°C)
            </Label>
            <Input
              id="cold-outlet"
              type="number"
              step="0.1"
              value={coldOutlet}
              onChange={(e) => setColdOutlet(e.target.value)}
              placeholder="e.g., 45"
              className="text-lg py-5 border-2 border-blue-300 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={calculateLMTD}
            className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate LMTD
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
            {/* Warning Message */}
            {result.warning && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800 font-semibold">{result.warning}</p>
              </div>
            )}

            {/* Terminal Temperature Differences */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-300 shadow-md">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Terminal Temperature Differences</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">ΔT₁ (End 1)</p>
                  <p className="text-2xl font-bold text-red-700">{result.deltaT1.toFixed(2)}°C</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">ΔT₂ (End 2)</p>
                  <p className="text-2xl font-bold text-blue-700">{result.deltaT2.toFixed(2)}°C</p>
                </div>
              </div>
            </div>

            {/* LMTD Results */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-lg border-2 border-orange-300 shadow-md">
              <h4 className="text-xl font-bold text-gray-900 mb-4">LMTD Results</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold text-gray-900">Raw LMTD:</span>
                  <span className="text-xl font-bold text-orange-700">{result.lmtd.toFixed(2)}°C</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold text-gray-900">Correction Factor (F):</span>
                  <span className="text-xl font-bold text-purple-700">{result.correctionFactor.toFixed(3)}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-400">
                  <span className="font-bold text-gray-900">Corrected LMTD:</span>
                  <span className="text-2xl font-bold text-green-700">{result.correctedLMTD.toFixed(2)}°C</span>
                </div>
              </div>
            </div>

            {/* R and P Parameters */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-300 shadow-md">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Dimensionless Parameters</h4>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">R Parameter:</p>
                  <p className="text-lg font-bold text-purple-700">{result.R.toFixed(3)}</p>
                  <p className="text-xs text-gray-500 mt-1">Hot/Cold temp change ratio</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded">
                  <p className="text-gray-600 mb-1">P Parameter:</p>
                  <p className="text-lg font-bold text-indigo-700">{result.P.toFixed(3)}</p>
                  <p className="text-xs text-gray-500 mt-1">Thermal effectiveness</p>
                </div>
              </div>
            </div>

            {/* Formula Display */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
              <p className="text-sm text-gray-700 text-center font-mono">
                LMTD = (ΔT₁ - ΔT₂) / ln(ΔT₁ / ΔT₂)
              </p>
              <p className="text-sm text-gray-700 text-center font-mono mt-2">
                Corrected LMTD = F × LMTD
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
