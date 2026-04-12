"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, RotateCcw, Ruler, Layers, DollarSign } from "lucide-react"

export default function RipRapCalculator() {
  const [shape, setShape] = useState<string>("rectangular")
  const [length, setLength] = useState<string>("")
  const [width, setWidth] = useState<string>("")
  const [radius, setRadius] = useState<string>("")
  const [depth, setDepth] = useState<string>("12")
  const [stoneType, setStoneType] = useState<string>("standard")
  const [pricePerTon, setPricePerTon] = useState<string>("55")
  const [wasteBuffer, setWasteBuffer] = useState<string>("10")
  const [result, setResult] = useState<{
    cubicFeet: number
    cubicYards: number
    tons: number
    totalCost: number
    coveragePerTon: number
  } | null>(null)

  const calculateRipRap = () => {
    const len = parseFloat(length)
    const wid = parseFloat(width)
    const rad = parseFloat(radius)
    const dep = parseFloat(depth) / 12 // Convert inches to feet
    const price = parseFloat(pricePerTon)
    const buffer = parseFloat(wasteBuffer) / 100

    // Stone density in lb/yd³
    const densityMap: { [key: string]: number } = {
      granite: 2700,
      traprock: 2600,
      standard: 2410,
      recycled: 2200
    }
    const density = densityMap[stoneType] || 2410

    let area = 0
    if (shape === "rectangular") {
      if (!len || !wid || len <= 0 || wid <= 0) {
        alert("Please enter valid length and width")
        return
      }
      area = len * wid
    } else if (shape === "circle") {
      if (!rad || rad <= 0) {
        alert("Please enter valid radius")
        return
      }
      area = Math.PI * rad * rad
    }

    if (!dep || dep <= 0) {
      alert("Please enter valid depth")
      return
    }

    // Step 1: Calculate volume in cubic feet
    const volumeCubicFeet = area * dep

    // Step 2: Convert to cubic yards
    const volumeCubicYards = volumeCubicFeet / 27

    // Step 3: Convert to tons
    const volumeTons = (volumeCubicYards * density) / 2000

    // Step 4: Add waste buffer
    const totalTons = volumeTons * (1 + buffer)
    const totalCubicYards = volumeCubicYards * (1 + buffer)

    // Calculate total cost
    const totalCost = totalTons * price

    // Calculate coverage per ton (sq ft per ton at given depth)
    const coveragePerTon = area / volumeTons

    setResult({
      cubicFeet: Math.round(volumeCubicFeet * 100) / 100,
      cubicYards: Math.round(totalCubicYards * 100) / 100,
      tons: Math.round(totalTons * 100) / 100,
      totalCost: Math.round(totalCost),
      coveragePerTon: Math.round(coveragePerTon * 10) / 10
    })
  }

  const resetCalculator = () => {
    setShape("rectangular")
    setLength("")
    setWidth("")
    setRadius("")
    setDepth("12")
    setStoneType("standard")
    setPricePerTon("55")
    setWasteBuffer("10")
    setResult(null)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
        <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Calculator className="w-8 h-8" />
          Rip Rap Calculator
        </CardTitle>
        <p className="text-blue-100 mt-2">
          Calculate tons, cubic yards, coverage & cost instantly
        </p>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="shape" className="text-base font-semibold">
            Project Shape
          </Label>
          <select
            id="shape"
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="w-full text-lg border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="rectangular">Rectangular (Channels, Ditches, Linear Shorelines)</option>
            <option value="circle">Circular (Pond Perimeters, Circular Outfalls)</option>
          </select>
        </div>

        {shape === "rectangular" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="length" className="text-base font-semibold flex items-center gap-2">
                <Ruler className="w-5 h-5 text-blue-600" />
                Length (feet)
              </Label>
              <Input
                id="length"
                type="number"
                placeholder="e.g., 50"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="text-lg border-2 border-gray-300 focus:border-blue-500"
                min="0"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="width" className="text-base font-semibold flex items-center gap-2">
                <Ruler className="w-5 h-5 text-green-600" />
                Width (feet)
              </Label>
              <Input
                id="width"
                type="number"
                placeholder="e.g., 6"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="text-lg border-2 border-gray-300 focus:border-blue-500"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        )}

        {shape === "circle" && (
          <div className="space-y-2">
            <Label htmlFor="radius" className="text-base font-semibold flex items-center gap-2">
              <Ruler className="w-5 h-5 text-purple-600" />
              Radius (feet)
            </Label>
            <Input
              id="radius"
              type="number"
              placeholder="e.g., 10"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="0"
              step="0.1"
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="depth" className="text-base font-semibold flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-600" />
              Layer Depth (inches)
            </Label>
            <Input
              id="depth"
              type="number"
              placeholder="e.g., 12"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="0"
              step="1"
            />
            <p className="text-sm text-gray-600">Standard: 12-18 inches</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stoneType" className="text-base font-semibold">
              Stone Type
            </Label>
            <select
              id="stoneType"
              value={stoneType}
              onChange={(e) => setStoneType(e.target.value)}
              className="w-full text-lg border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="granite">Granite (2,700 lb/yd³)</option>
              <option value="traprock">Trap Rock (2,600 lb/yd³)</option>
              <option value="standard">Standard / Limestone (2,410 lb/yd³)</option>
              <option value="recycled">Recycled Concrete (2,200 lb/yd³)</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pricePerTon" className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Price per Ton ($)
            </Label>
            <Input
              id="pricePerTon"
              type="number"
              placeholder="e.g., 55"
              value={pricePerTon}
              onChange={(e) => setPricePerTon(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="0"
              step="1"
            />
            <p className="text-sm text-gray-600">Typical: $30-$100/ton</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wasteBuffer" className="text-base font-semibold">
              Waste Buffer (%)
            </Label>
            <Input
              id="wasteBuffer"
              type="number"
              placeholder="e.g., 10"
              value={wasteBuffer}
              onChange={(e) => setWasteBuffer(e.target.value)}
              className="text-lg border-2 border-gray-300 focus:border-blue-500"
              min="0"
              max="30"
              step="1"
            />
            <p className="text-sm text-gray-600">Standard: 10%, Complex: 15-20%</p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={calculateRipRap}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Rip Rap
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
                <div className="text-sm text-gray-600 mb-1">Volume (Cubic Feet)</div>
                <div className="text-3xl font-bold text-blue-600">
                  {result.cubicFeet.toLocaleString()} ft³
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <div className="text-sm text-gray-600 mb-1">Volume (Cubic Yards)</div>
                <div className="text-3xl font-bold text-purple-600">
                  {result.cubicYards.toLocaleString()} yd³
                </div>
                <div className="text-xs text-gray-500 mt-1">With {wasteBuffer}% buffer</div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                <div className="text-sm text-gray-600 mb-1">Total Weight (Tons)</div>
                <div className="text-3xl font-bold text-orange-600">
                  {result.tons.toLocaleString()} tons
                </div>
                <div className="text-xs text-gray-500 mt-1">With {wasteBuffer}% buffer</div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <div className="text-sm text-gray-600 mb-1">Estimated Total Cost</div>
                <div className="text-3xl font-bold text-green-600">
                  ${result.totalCost.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Material only</div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500 md:col-span-2">
                <div className="text-sm text-gray-600 mb-1">Coverage per Ton</div>
                <div className="text-3xl font-bold text-teal-600">
                  ~{result.coveragePerTon} sq ft/ton
                </div>
                <div className="text-xs text-gray-500 mt-1">At {depth}" depth</div>
              </div>
            </div>

            <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg mt-4">
              <p className="text-sm text-gray-800">
                <strong>Note:</strong> This estimate is for material only. Add delivery ($20-$100/ton) and installation ($20-$40/ton) costs. Always use geotextile filter fabric beneath rip rap.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
