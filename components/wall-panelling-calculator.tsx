"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Ruler } from "lucide-react"

export default function WallPanellingCalculator() {
  const [calculatorType, setCalculatorType] = useState<string>("basic")
  
  // Unit states
  const [wallUnit, setWallUnit] = useState<string>("mm")
  const [panelUnit, setPanelUnit] = useState<string>("mm")
  const [spacingUnit, setSpacingUnit] = useState<string>("mm")
  const [heightUnit, setHeightUnit] = useState<string>("mm")
  
  // Basic Panel Calculator
  const [wallHeight, setWallHeight] = useState<string>("2400")
  const [wallWidth, setWallWidth] = useState<string>("3000")
  const [obstructionArea, setObstructionArea] = useState<string>("0")
  const [panelHeight, setPanelHeight] = useState<string>("2440")
  const [panelWidth, setPanelWidth] = useState<string>("1220")
  
  // Spacing Calculator
  const [spacingWallWidth, setSpacingWallWidth] = useState<string>("3000")
  const [edgeMargin, setEdgeMargin] = useState<string>("50")
  const [numberOfBattens, setNumberOfBattens] = useState<string>("4")
  const [battenWidth, setBattenWidth] = useState<string>("50")
  
  // Height Calculator
  const [ceilingHeight, setCeilingHeight] = useState<string>("2400")
  const [heightStyle, setHeightStyle] = useState<string>("classic-dado")
  
  const [result, setResult] = useState<{
    panelsNeeded?: number
    orderQuantity?: number
    netArea?: number
    wasteAllowance?: number
    gapWidth?: number
    numberOfGaps?: number
    recommendedHeight?: number
    heightDescription?: string
  } | null>(null)

  // Unit conversion to mm
  const convertToMm = (value: number, unit: string): number => {
    switch (unit) {
      case "mm": return value
      case "cm": return value * 10
      case "m": return value * 1000
      case "inches": return value * 25.4
      case "feet": return value * 304.8
      default: return value
    }
  }

  // Convert from mm to selected unit
  const convertFromMm = (value: number, unit: string): number => {
    switch (unit) {
      case "mm": return value
      case "cm": return value / 10
      case "m": return value / 1000
      case "inches": return value / 25.4
      case "feet": return value / 304.8
      default: return value
    }
  }

  const calculateBasicPanels = () => {
    // Convert all inputs to mm
    const height = convertToMm(parseFloat(wallHeight) || 0, wallUnit)
    const width = convertToMm(parseFloat(wallWidth) || 0, wallUnit)
    const obstruction = parseFloat(obstructionArea) || 0 // Already in mm²
    const pHeight = convertToMm(parseFloat(panelHeight) || 1, panelUnit)
    const pWidth = convertToMm(parseFloat(panelWidth) || 1, panelUnit)

    // Calculate areas
    const grossArea = height * width
    const netArea = grossArea - obstruction
    const panelArea = pHeight * pWidth

    // Calculate panels needed
    const panelsNeeded = Math.ceil(netArea / panelArea)
    
    // Add 10% waste allowance
    const wasteAllowance = Math.ceil(panelsNeeded * 0.10)
    const orderQuantity = panelsNeeded + wasteAllowance

    setResult({
      panelsNeeded,
      orderQuantity,
      netArea: Math.round(netArea),
      wasteAllowance,
    })
  }

  const calculateSpacing = () => {
    // Convert all inputs to mm
    const wallW = convertToMm(parseFloat(spacingWallWidth) || 0, spacingUnit)
    const margin = convertToMm(parseFloat(edgeMargin) || 0, spacingUnit)
    const battens = parseInt(numberOfBattens) || 1
    const bWidth = convertToMm(parseFloat(battenWidth) || 0, spacingUnit)

    // Calculate available space
    const availableSpace = wallW - (2 * margin)
    
    // Calculate total batten width
    const totalBattenWidth = battens * bWidth
    
    // Calculate gap width
    const numberOfGaps = battens + 1
    const gapWidthMm = (availableSpace - totalBattenWidth) / numberOfGaps
    
    // Convert back to selected unit
    const gapWidth = convertFromMm(gapWidthMm, spacingUnit)

    setResult({
      gapWidth: Math.round(gapWidth * 10) / 10,
      numberOfGaps,
    })
  }

  const calculateHeight = () => {
    // Convert ceiling height to mm
    const ceilingMm = convertToMm(parseFloat(ceilingHeight) || 0, heightUnit)
    let recommendedHeightMm = 0
    let heightDescription = ""

    switch (heightStyle) {
      case "classic-dado":
        recommendedHeightMm = Math.round(ceilingMm / 3)
        heightDescription = "Classic dado rail (one-third height)"
        break
      case "modern-half":
        recommendedHeightMm = 1100 // Always 1100mm
        heightDescription = "Modern half-wall panelling"
        break
      case "two-thirds":
        recommendedHeightMm = Math.round(ceilingMm * 0.66)
        heightDescription = "Two-thirds panel height"
        break
      case "full-height":
        recommendedHeightMm = ceilingMm - 300 // 300mm below ceiling
        heightDescription = "Full height to coving"
        break
      default:
        recommendedHeightMm = Math.round(ceilingMm / 3)
        heightDescription = "Classic dado rail"
    }
    
    // Convert back to selected unit
    const recommendedHeight = Math.round(convertFromMm(recommendedHeightMm, heightUnit))

    setResult({
      recommendedHeight,
      heightDescription,
    })
  }

  const handleCalculate = () => {
    if (calculatorType === "basic") {
      calculateBasicPanels()
    } else if (calculatorType === "spacing") {
      calculateSpacing()
    } else if (calculatorType === "height") {
      calculateHeight()
    }
  }

  return (
    <div className="space-y-6">
      {/* Calculator Type Selector */}
      <div className="space-y-2">
        <Label htmlFor="calculatorType" className="text-base font-semibold text-gray-900">
          Calculator Type
        </Label>
        <Select value={calculatorType} onValueChange={(value) => { setCalculatorType(value); setResult(null); }}>
          <SelectTrigger id="calculatorType" className="text-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic Panel Calculator</SelectItem>
            <SelectItem value="spacing">Spacing Calculator (Shaker/Box)</SelectItem>
            <SelectItem value="height">Height Calculator (Dado/Rail)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Basic Panel Calculator */}
      {calculatorType === "basic" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="wallHeight" className="text-base font-semibold text-gray-900">
                Wall Height
              </Label>
              <div className="flex gap-2">
                <Input
                  id="wallHeight"
                  type="number"
                  value={wallHeight}
                  onChange={(e) => setWallHeight(e.target.value)}
                  placeholder="2400"
                  className="text-lg flex-1"
                />
                <Select value={wallUnit} onValueChange={setWallUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">mm</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="inches">in</SelectItem>
                    <SelectItem value="feet">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallWidth" className="text-base font-semibold text-gray-900">
                Wall Width
              </Label>
              <div className="flex gap-2">
                <Input
                  id="wallWidth"
                  type="number"
                  value={wallWidth}
                  onChange={(e) => setWallWidth(e.target.value)}
                  placeholder="3000"
                  className="text-lg flex-1"
                />
                <Select value={wallUnit} onValueChange={setWallUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">mm</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="inches">in</SelectItem>
                    <SelectItem value="feet">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="obstructionArea" className="text-base font-semibold text-gray-900">
                Total Obstruction Area (mm²)
              </Label>
              <Input
                id="obstructionArea"
                type="number"
                value={obstructionArea}
                onChange={(e) => setObstructionArea(e.target.value)}
                placeholder="0"
                className="text-lg"
              />
              <p className="text-sm text-gray-500">Doors, windows, radiators (height × width)</p>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold text-gray-900">
                Panel Dimensions
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={panelHeight}
                  onChange={(e) => setPanelHeight(e.target.value)}
                  placeholder="Height"
                  className="text-lg flex-1"
                />
                <Input
                  type="number"
                  value={panelWidth}
                  onChange={(e) => setPanelWidth(e.target.value)}
                  placeholder="Width"
                  className="text-lg flex-1"
                />
                <Select value={panelUnit} onValueChange={setPanelUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">mm</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="inches">in</SelectItem>
                    <SelectItem value="feet">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-500">Standard MDF: 2440 × 1220mm</p>
            </div>
          </div>
        </div>
      )}

      {/* Spacing Calculator */}
      {calculatorType === "spacing" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="spacingWallWidth" className="text-base font-semibold text-gray-900">
                Wall Width
              </Label>
              <div className="flex gap-2">
                <Input
                  id="spacingWallWidth"
                  type="number"
                  value={spacingWallWidth}
                  onChange={(e) => setSpacingWallWidth(e.target.value)}
                  placeholder="3000"
                  className="text-lg flex-1"
                />
                <Select value={spacingUnit} onValueChange={setSpacingUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">mm</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="inches">in</SelectItem>
                    <SelectItem value="feet">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edgeMargin" className="text-base font-semibold text-gray-900">
                Edge Margin
              </Label>
              <div className="flex gap-2">
                <Input
                  id="edgeMargin"
                  type="number"
                  value={edgeMargin}
                  onChange={(e) => setEdgeMargin(e.target.value)}
                  placeholder="50"
                  className="text-lg flex-1"
                />
                <Select value={spacingUnit} onValueChange={setSpacingUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">mm</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="inches">in</SelectItem>
                    <SelectItem value="feet">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-500">Margin on each side</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfBattens" className="text-base font-semibold text-gray-900">
                Number of Battens
              </Label>
              <Input
                id="numberOfBattens"
                type="number"
                value={numberOfBattens}
                onChange={(e) => setNumberOfBattens(e.target.value)}
                placeholder="4"
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="battenWidth" className="text-base font-semibold text-gray-900">
                Batten Width
              </Label>
              <div className="flex gap-2">
                <Input
                  id="battenWidth"
                  type="number"
                  value={battenWidth}
                  onChange={(e) => setBattenWidth(e.target.value)}
                  placeholder="50"
                  className="text-lg flex-1"
                />
                <Select value={spacingUnit} onValueChange={setSpacingUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">mm</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="inches">in</SelectItem>
                    <SelectItem value="feet">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-500">Typical: 45-70mm</p>
            </div>
          </div>
        </div>
      )}

      {/* Height Calculator */}
      {calculatorType === "height" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ceilingHeight" className="text-base font-semibold text-gray-900">
                Ceiling Height
              </Label>
              <div className="flex gap-2">
                <Input
                  id="ceilingHeight"
                  type="number"
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(e.target.value)}
                  placeholder="2400"
                  className="text-lg flex-1"
                />
                <Select value={heightUnit} onValueChange={setHeightUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">mm</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="inches">in</SelectItem>
                    <SelectItem value="feet">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="heightStyle" className="text-base font-semibold text-gray-900">
                Panelling Style
              </Label>
              <Select value={heightStyle} onValueChange={setHeightStyle}>
                <SelectTrigger id="heightStyle" className="text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic-dado">Classic Dado (1/3 height)</SelectItem>
                  <SelectItem value="modern-half">Modern Half-Wall (1100mm)</SelectItem>
                  <SelectItem value="two-thirds">Two-Thirds Panel</SelectItem>
                  <SelectItem value="full-height">Full Height to Coving</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <Button onClick={handleCalculate} size="lg" className="w-full text-lg font-semibold">
        <Calculator className="w-5 h-5 mr-2" />
        Calculate
      </Button>

      {/* Results */}
      {result && (
        <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Ruler className="w-7 h-7 text-blue-600" />
            Your Results
          </h3>
          
          {calculatorType === "basic" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
                <span className="text-lg text-gray-700">Net Wall Area:</span>
                <span className="text-2xl font-bold text-gray-900">{result.netArea?.toLocaleString()} mm²</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
                <span className="text-lg text-gray-700">Panels Needed:</span>
                <span className="text-2xl font-bold text-gray-900">{result.panelsNeeded} panels</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
                <span className="text-lg text-gray-700">Waste Allowance (10%):</span>
                <span className="text-2xl font-bold text-orange-600">+{result.wasteAllowance} panels</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900">Total Order Quantity:</span>
                <span className="text-4xl font-bold text-blue-600">{result.orderQuantity} panels</span>
              </div>
            </div>
          )}

          {calculatorType === "spacing" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
                <span className="text-lg text-gray-700">Number of Gaps:</span>
                <span className="text-2xl font-bold text-gray-900">{result.numberOfGaps} gaps</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900">Equal Gap Width:</span>
                <span className="text-4xl font-bold text-blue-600">{result.gapWidth} {spacingUnit}</span>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Each gap between battens should be <strong>{result.gapWidth}{spacingUnit}</strong> wide for equal spacing. 
                Adjust the number of battens if this gap feels too wide or too narrow.
              </p>
            </div>
          )}

          {calculatorType === "height" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-blue-200">
                <span className="text-lg text-gray-700">Style:</span>
                <span className="text-lg font-semibold text-gray-900">{result.heightDescription}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900">Recommended Height:</span>
                <span className="text-4xl font-bold text-blue-600">{result.recommendedHeight} {heightUnit}</span>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Install your dado rail or top moulding at <strong>{result.recommendedHeight}{heightUnit}</strong> from the floor 
                for the {result.heightDescription?.toLowerCase()} look.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
