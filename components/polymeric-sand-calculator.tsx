"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Package, AlertCircle } from "lucide-react"

export default function PolymericSandCalculator() {
  const [length, setLength] = useState<string>("")
  const [width, setWidth] = useState<string>("")
  const [jointWidth, setJointWidth] = useState<string>("0.25")
  const [paverThickness, setPaverThickness] = useState<string>("2.375")
  const [result, setResult] = useState<null | {
    totalArea: number
    coveragePerBag: number
    baseBags: number
    bagsWithBuffer: number
    totalPounds: number
    bufferPercent: number
  }>(null)

  const getCoverageRate = (jointWidthInches: number, thicknessInches: number): number => {
    // Coverage rates based on joint width (sq ft per 50 lb bag)
    if (jointWidthInches <= 0.125) {
      return 87.5 // 75-100 sq ft average
    } else if (jointWidthInches <= 0.25) {
      return 67.5 // 60-75 sq ft average
    } else if (jointWidthInches <= 0.375) {
      return 45 // 30-60 sq ft average
    } else if (jointWidthInches <= 0.5) {
      return 22.5 // 15-30 sq ft average
    } else if (jointWidthInches <= 1) {
      return 11.5 // 8-15 sq ft average
    } else {
      return 6.5 // 5-8 sq ft average
    }
  }

  const calculateSand = () => {
    const lengthNum = parseFloat(length)
    const widthNum = parseFloat(width)
    const jointWidthNum = parseFloat(jointWidth)
    const paverThicknessNum = parseFloat(paverThickness)

    if (!lengthNum || !widthNum || lengthNum <= 0 || widthNum <= 0) {
      alert("Please enter valid length and width values")
      return
    }

    const totalArea = lengthNum * widthNum
    const coveragePerBag = getCoverageRate(jointWidthNum, paverThicknessNum)
    const baseBags = totalArea / coveragePerBag
    
    // Determine buffer percentage based on joint width
    let bufferPercent = 10
    if (jointWidthNum >= 0.5) {
      bufferPercent = 20 // Wide joints need more buffer
    } else if (jointWidthNum >= 0.375) {
      bufferPercent = 15 // Tumbled pavers
    }

    const bagsWithBuffer = Math.ceil(baseBags * (1 + bufferPercent / 100))
    const totalPounds = bagsWithBuffer * 50

    setResult({
      totalArea,
      coveragePerBag,
      baseBags,
      bagsWithBuffer,
      totalPounds,
      bufferPercent,
    })
  }

  const resetCalculator = () => {
    setLength("")
    setWidth("")
    setJointWidth("0.25")
    setPaverThickness("2.375")
    setResult(null)
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="space-y-6 bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="w-7 h-7 text-blue-600" />
          Project Measurements
        </h3>

        {/* Length */}
        <div className="space-y-3">
          <Label htmlFor="length" className="text-lg font-bold text-gray-900">
            Length (feet) <span className="text-red-600">*</span>
          </Label>
          <Input
            id="length"
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="e.g., 20"
            min="0"
            step="0.1"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
          />
        </div>

        {/* Width */}
        <div className="space-y-3">
          <Label htmlFor="width" className="text-lg font-bold text-gray-900">
            Width (feet) <span className="text-red-600">*</span>
          </Label>
          <Input
            id="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="e.g., 15"
            min="0"
            step="0.1"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
          />
        </div>

        {/* Joint Width */}
        <div className="space-y-3">
          <Label htmlFor="jointWidth" className="text-lg font-bold text-gray-900">
            Joint Width (inches)
          </Label>
          <Select value={jointWidth} onValueChange={setJointWidth}>
            <SelectTrigger className="text-lg h-12 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.125">⅛" (3 mm) - Tight joints</SelectItem>
              <SelectItem value="0.25">¼" (6 mm) - Standard pavers</SelectItem>
              <SelectItem value="0.375">⅜" (10 mm) - Tumbled pavers</SelectItem>
              <SelectItem value="0.5">½" (12 mm) - Wide joints</SelectItem>
              <SelectItem value="0.75">¾" - Rustic pavers</SelectItem>
              <SelectItem value="1">1" - Flagstone</SelectItem>
              <SelectItem value="1.5">1.5"+ - Very wide flagstone</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600">
            Measure with a ruler - do not estimate by eye
          </p>
        </div>

        {/* Paver Thickness */}
        <div className="space-y-3">
          <Label htmlFor="paverThickness" className="text-lg font-bold text-gray-900">
            Paver Thickness (inches)
          </Label>
          <Select value={paverThickness} onValueChange={setPaverThickness}>
            <SelectTrigger className="text-lg h-12 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1" - Thin flagstone</SelectItem>
              <SelectItem value="1.5">1.5" - Standard flagstone</SelectItem>
              <SelectItem value="2">2" - Thick flagstone</SelectItem>
              <SelectItem value="2.375">2⅜" (60 mm) - Standard concrete</SelectItem>
              <SelectItem value="3">3" - Thick concrete pavers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={calculateSand}
            size="lg"
            className="flex-1 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Sand Needed
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
          {/* Main Results Card */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Polymeric Sand Required</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <Package className="w-12 h-12 mx-auto mb-3" />
                <div className="text-5xl font-bold mb-2">{result.bagsWithBuffer}</div>
                <div className="text-xl font-semibold">Bags (50 lb)</div>
                <div className="text-sm mt-2 opacity-90">with {result.bufferPercent}% buffer</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-5xl font-bold mb-2">{result.totalPounds}</div>
                <div className="text-xl font-semibold">Total Pounds</div>
                <div className="text-sm mt-2 opacity-90">{result.bagsWithBuffer} bags × 50 lb</div>
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Calculation Breakdown</h4>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Total Area:</span>
                <span className="text-lg font-bold text-blue-600">{result.totalArea.toFixed(1)} sq ft</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Coverage per Bag:</span>
                <span className="text-lg font-bold text-blue-600">{result.coveragePerBag.toFixed(1)} sq ft</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Base Bags Needed:</span>
                <span className="text-lg font-bold text-blue-600">{Math.ceil(result.baseBags)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                <span className="font-semibold">With {result.bufferPercent}% Buffer:</span>
                <span className="text-lg font-bold text-green-600">{result.bagsWithBuffer} bags</span>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="p-6 bg-orange-50 border-2 border-orange-200 rounded-xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Important:</strong> Always verify coverage rates on your specific product label. Brand coverage may vary. This estimate includes a {result.bufferPercent}% buffer for waste and overfill.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
