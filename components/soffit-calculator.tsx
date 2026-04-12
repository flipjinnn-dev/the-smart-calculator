"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, RotateCcw, Ruler, Home, DollarSign, Wind } from "lucide-react"

export default function SoffitCalculator() {
  const [eaveLength, setEaveLength] = useState<string>("")
  const [overhangWidth, setOverhangWidth] = useState<string>("")
  const [wasteFactor, setWasteFactor] = useState<string>("10")
  const [panelSize, setPanelSize] = useState<string>("12")
  const [materialType, setMaterialType] = useState<string>("vinyl")
  const [atticFloorArea, setAtticFloorArea] = useState<string>("")
  const [ventNFA, setVentNFA] = useState<string>("50")
  const [materialCost, setMaterialCost] = useState<string>("2")
  const [laborCost, setLaborCost] = useState<string>("7")
  const [result, setResult] = useState<{
    soffitArea: number
    adjustedArea: number
    panelsNeeded: number
    requiredNFA: number
    ventsNeeded: number
    ventSpacing: number
    fasciaLength: number
    jChannelLength: number
    totalMaterialCost: number
    totalLaborCost: number
    totalProjectCost: number
  } | null>(null)

  const calculateSoffit = () => {
    const eave = parseFloat(eaveLength)
    const overhang = parseFloat(overhangWidth)
    const waste = parseFloat(wasteFactor) / 100
    const panel = parseFloat(panelSize)
    const attic = parseFloat(atticFloorArea)
    const nfa = parseFloat(ventNFA)
    const matCost = parseFloat(materialCost)
    const labCost = parseFloat(laborCost)

    if (!eave || eave <= 0 || !overhang || overhang <= 0) {
      alert("Please enter valid eave length and overhang width")
      return
    }

    // Step 1: Calculate Soffit Area
    const soffitArea = eave * overhang

    // Step 2: Apply Waste Factor
    const adjustedArea = soffitArea * (1 + waste)

    // Step 3: Calculate Panels Needed
    const panelCoverage = panel // 12" = 12 sq ft, 16" = 16 sq ft
    const panelsNeeded = Math.ceil(adjustedArea / panelCoverage)

    // Step 4: Calculate Ventilation (if attic area provided)
    let requiredNFA = 0
    let ventsNeeded = 0
    let ventSpacing = 0
    
    if (attic && attic > 0) {
      // Using 1/150 rule (convert to sq inches)
      requiredNFA = (attic / 150) * 144 // Convert sq ft to sq inches
      ventsNeeded = Math.ceil(requiredNFA / nfa)
      ventSpacing = eave / ventsNeeded
    }

    // Step 5: Calculate Fascia & J-Channel
    const fasciaLength = eave
    const jChannelLength = eave * 2 // Simplified (both sides)

    // Step 6: Calculate Costs
    const totalMaterialCost = adjustedArea * matCost
    const totalLaborCost = adjustedArea * labCost
    const totalProjectCost = totalMaterialCost + totalLaborCost

    setResult({
      soffitArea: Math.round(soffitArea * 100) / 100,
      adjustedArea: Math.round(adjustedArea * 100) / 100,
      panelsNeeded,
      requiredNFA: Math.round(requiredNFA),
      ventsNeeded,
      ventSpacing: Math.round(ventSpacing * 10) / 10,
      fasciaLength: Math.round(fasciaLength),
      jChannelLength: Math.round(jChannelLength),
      totalMaterialCost: Math.round(totalMaterialCost),
      totalLaborCost: Math.round(totalLaborCost),
      totalProjectCost: Math.round(totalProjectCost)
    })
  }

  const resetCalculator = () => {
    setEaveLength("")
    setOverhangWidth("")
    setWasteFactor("10")
    setPanelSize("12")
    setMaterialType("vinyl")
    setAtticFloorArea("")
    setVentNFA("50")
    setMaterialCost("2")
    setLaborCost("7")
    setResult(null)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
        <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Calculator className="w-8 h-8" />
          Soffit Calculator
        </CardTitle>
        <p className="text-blue-100 mt-2">
          Calculate soffit area, vents, fascia & cost instantly
        </p>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        {/* Basic Measurements */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="eaveLength" className="text-base font-semibold flex items-center gap-2">
              <Ruler className="w-5 h-5 text-blue-600" />
              Total Eave Length (feet)
            </Label>
            <Input
              id="eaveLength"
              type="number"
              placeholder="e.g., 180"
              value={eaveLength}
              onChange={(e) => setEaveLength(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="0"
              step="0.1"
            />
            <p className="text-sm text-gray-600">Sum of all eave sections</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overhangWidth" className="text-base font-semibold flex items-center gap-2">
              <Ruler className="w-5 h-5 text-green-600" />
              Overhang Width (feet)
            </Label>
            <Input
              id="overhangWidth"
              type="number"
              placeholder="e.g., 1.5"
              value={overhangWidth}
              onChange={(e) => setOverhangWidth(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="0"
              step="0.1"
            />
            <p className="text-sm text-gray-600">Wall to fascia edge (e.g., 18" = 1.5 ft)</p>
          </div>
        </div>

        {/* Panel & Material Settings */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="panelSize" className="text-base font-semibold">
              Panel Size
            </Label>
            <select
              id="panelSize"
              value={panelSize}
              onChange={(e) => setPanelSize(e.target.value)}
              className="w-full text-lg border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="12">12-inch wide (Triple 3) - 12 sq ft coverage</option>
              <option value="16">16-inch wide (Quad 4) - 16 sq ft coverage</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="materialType" className="text-base font-semibold">
              Material Type
            </Label>
            <select
              id="materialType"
              value={materialType}
              onChange={(e) => {
                const type = e.target.value
                setMaterialType(type)
                // Auto-adjust material cost based on type
                if (type === "vinyl") setMaterialCost("2")
                else if (type === "aluminum") setMaterialCost("3.5")
                else if (type === "metal") setMaterialCost("5")
                else if (type === "wood") setMaterialCost("4")
              }}
              className="w-full text-lg border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="vinyl">Vinyl ($1–$3/sq ft)</option>
              <option value="aluminum">Aluminum ($2–$5/sq ft)</option>
              <option value="metal">Metal/Steel ($3–$7/sq ft)</option>
              <option value="wood">Wood ($2.50–$6/sq ft)</option>
            </select>
          </div>
        </div>

        {/* Waste Factor */}
        <div className="space-y-2">
          <Label htmlFor="wasteFactor" className="text-base font-semibold">
            Waste Factor (%)
          </Label>
          <Input
            id="wasteFactor"
            type="number"
            placeholder="e.g., 10"
            value={wasteFactor}
            onChange={(e) => setWasteFactor(e.target.value)}
            className="text-lg border-2 border-gray-300 focus:border-blue-500"
            min="0"
            max="30"
            step="1"
          />
          <p className="text-sm text-gray-600">Simple: 5%, Standard: 10%, Complex: 15-20%</p>
        </div>

        {/* Ventilation Section */}
        <div className="border-t-2 border-gray-200 pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Wind className="w-6 h-6 text-purple-600" />
            Ventilation Requirements (Optional)
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="atticFloorArea" className="text-base font-semibold flex items-center gap-2">
                <Home className="w-5 h-5 text-orange-600" />
                Attic Floor Area (sq ft)
              </Label>
              <Input
                id="atticFloorArea"
                type="number"
                placeholder="e.g., 1200"
                value={atticFloorArea}
                onChange={(e) => setAtticFloorArea(e.target.value)}
                className="text-lg border-2 border-gray-300 focus:border-blue-500"
                min="0"
                step="1"
              />
              <p className="text-sm text-gray-600">For vent calculation (1/150 rule)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ventNFA" className="text-base font-semibold">
                NFA Per Vent (sq inches)
              </Label>
              <Input
                id="ventNFA"
                type="number"
                placeholder="e.g., 50"
                value={ventNFA}
                onChange={(e) => setVentNFA(e.target.value)}
                className="text-lg border-2 border-gray-300 focus:border-blue-500"
                min="0"
                step="1"
              />
              <p className="text-sm text-gray-600">Standard: 50-75 sq in per vent</p>
            </div>
          </div>
        </div>

        {/* Cost Inputs */}
        <div className="border-t-2 border-gray-200 pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            Cost Estimation
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="materialCost" className="text-base font-semibold">
                Material Cost ($/sq ft)
              </Label>
              <Input
                id="materialCost"
                type="number"
                placeholder="e.g., 2"
                value={materialCost}
                onChange={(e) => setMaterialCost(e.target.value)}
                className="text-lg border-2 border-gray-300 focus:border-blue-500"
                min="0"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="laborCost" className="text-base font-semibold">
                Labor Cost ($/sq ft)
              </Label>
              <Input
                id="laborCost"
                type="number"
                placeholder="e.g., 7"
                value={laborCost}
                onChange={(e) => setLaborCost(e.target.value)}
                className="text-lg border-2 border-gray-300 focus:border-blue-500"
                min="0"
                step="0.1"
              />
              <p className="text-sm text-gray-600">Typical: $4–$12/sq ft</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={calculateSoffit}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Soffit
          </Button>
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="px-6 py-6 border-2 border-gray-300 hover:bg-gray-100"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Results</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <div className="text-sm text-gray-600 mb-1">Soffit Area</div>
                <div className="text-3xl font-bold text-blue-600">
                  {result.soffitArea.toLocaleString()} sq ft
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <div className="text-sm text-gray-600 mb-1">Adjusted Area (with waste)</div>
                <div className="text-3xl font-bold text-purple-600">
                  {result.adjustedArea.toLocaleString()} sq ft
                </div>
                <div className="text-xs text-gray-500 mt-1">+{wasteFactor}% waste factor</div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                <div className="text-sm text-gray-600 mb-1">Panels Needed</div>
                <div className="text-3xl font-bold text-orange-600">
                  {result.panelsNeeded} panels
                </div>
                <div className="text-xs text-gray-500 mt-1">{panelSize}" wide panels</div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500">
                <div className="text-sm text-gray-600 mb-1">Fascia Length</div>
                <div className="text-3xl font-bold text-teal-600">
                  {result.fasciaLength} ft
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-pink-500">
                <div className="text-sm text-gray-600 mb-1">J-Channel Length</div>
                <div className="text-3xl font-bold text-pink-600">
                  {result.jChannelLength} ft
                </div>
              </div>

              {result.ventsNeeded > 0 && (
                <>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                    <div className="text-sm text-gray-600 mb-1">Vents Needed</div>
                    <div className="text-3xl font-bold text-indigo-600">
                      {result.ventsNeeded} vents
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Required NFA: {result.requiredNFA} sq in</div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-l-4 border-cyan-500">
                    <div className="text-sm text-gray-600 mb-1">Vent Spacing</div>
                    <div className="text-3xl font-bold text-cyan-600">
                      {result.ventSpacing} ft
                    </div>
                    <div className="text-xs text-gray-500 mt-1">1 vent every {result.ventSpacing} feet</div>
                  </div>
                </>
              )}

              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 md:col-span-2">
                <div className="text-sm text-gray-600 mb-1">Total Project Cost</div>
                <div className="text-4xl font-bold text-green-600">
                  ${result.totalProjectCost.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Material: ${result.totalMaterialCost.toLocaleString()} + Labor: ${result.totalLaborCost.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg mt-4">
              <p className="text-sm text-gray-800">
                <strong>Note:</strong> Always order in full carton quantities. Round up panels to nearest carton (typically 2-5 panels per carton). Balance soffit vents with ridge vents at 50/50 ratio for optimal airflow.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
