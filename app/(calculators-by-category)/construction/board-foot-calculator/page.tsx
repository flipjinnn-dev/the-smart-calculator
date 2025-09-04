"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Ruler, Package, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"


interface BoardFootResults {
  boardFeetPerPiece: number
  totalBoardFeet: number
  totalCost?: number
  cubicInches: number
  cubicFeet: number
}

export default function BoardFootCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [pieces, setPieces] = useState("1")
  const [thickness, setThickness] = useState("1")
  const [width, setWidth] = useState("6")
  const [length, setLength] = useState("8")
  const [lengthUnit, setLengthUnit] = useState("feet")
  const [pricePerBF, setPricePerBF] = useState("")
  const [results, setResults] = useState<BoardFootResults | null>(null)

  const calculateBoardFeet = () => {
    const numPieces = Number.parseFloat(pieces)
    const thicknessIn = Number.parseFloat(thickness)
    const widthIn = Number.parseFloat(width)
    const lengthValue = Number.parseFloat(length)
    const price = pricePerBF ? Number.parseFloat(pricePerBF) : null

    // Validation
    if (
      !numPieces ||
      numPieces <= 0 ||
      !thicknessIn ||
      thicknessIn <= 0 ||
      !widthIn ||
      widthIn <= 0 ||
      !lengthValue ||
      lengthValue <= 0
    ) {
      return
    }

    let boardFeetPerPiece = 0

    if (lengthUnit === "feet") {
      // Formula: BF = (Length_ft × Width_in × Thickness_in) / 12
      boardFeetPerPiece = (lengthValue * widthIn * thicknessIn) / 12
    } else {
      // Formula: BF = (Thickness_in × Width_in × Length_in) / 144
      boardFeetPerPiece = (thicknessIn * widthIn * lengthValue) / 144
    }

    const totalBoardFeet = numPieces * boardFeetPerPiece
    const cubicInches = totalBoardFeet * 144 // 1 board foot = 144 cubic inches
    const cubicFeet = totalBoardFeet / 12 // 1 board foot = 1/12 cubic foot

    const calculationResults: BoardFootResults = {
      boardFeetPerPiece: Math.round(boardFeetPerPiece * 1000) / 1000,
      totalBoardFeet: Math.round(totalBoardFeet * 1000) / 1000,
      cubicInches: Math.round(cubicInches * 100) / 100,
      cubicFeet: Math.round(cubicFeet * 1000) / 1000,
    }

    if (price && price > 0) {
      calculationResults.totalCost = Math.round(totalBoardFeet * price * 100) / 100
    }

    setResults(calculationResults)

    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  return (
    <>
      <SEO
      title={"Board Foot Calculator – Lumber Measurement Tool"}
      description={"Calculate board feet of lumber easily. Use our free board foot calculator for accurate wood measurement in construction and carpentry."}
      keywords={"board foot calculator, lumber calculator, wood volume, construction calculator, board feet"}
      slug="/construction/board-foot-calculator"
      />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Board Foot Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>


        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/construction" className="text-gray-500 hover:text-blue-600">
                Construction
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Board Foot Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Board Foot Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate board feet for lumber and wood projects with accurate volume measurements and cost estimates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 pt-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-amber-600" />
                      <span>Board Foot Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter lumber dimensions to calculate board feet and cost
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Number of Pieces</Label>
                        <div className="relative">
                          <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="1"
                            value={pieces}
                            onChange={(e) => setPieces(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-amber-500"
                            min="1"
                            step="1"
                          />
                        </div>
                        <p className="text-sm text-gray-500">Quantity of lumber pieces</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Thickness (inches)</Label>
                        <div className="relative">
                          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="1"
                            value={thickness}
                            onChange={(e) => setThickness(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-amber-500"
                            min="0.25"
                            step="0.25"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">in</span>
                        </div>
                        <p className="text-sm text-gray-500">Lumber thickness in inches</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Width (inches)</Label>
                        <div className="relative">
                          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="6"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-amber-500"
                            min="0.5"
                            step="0.5"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">in</span>
                        </div>
                        <p className="text-sm text-gray-500">Lumber width in inches</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Length</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="8"
                              value={length}
                              onChange={(e) => setLength(e.target.value)}
                              className="pl-10 h-12 text-lg border-2 focus:border-amber-500"
                              min="0.5"
                              step="0.5"
                            />
                          </div>
                          <Select value={lengthUnit} onValueChange={setLengthUnit}>
                            <SelectTrigger className="w-24 h-12 border-2 focus:border-amber-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="feet">ft</SelectItem>
                              <SelectItem value="inches">in</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-sm text-gray-500">Lumber length in feet or inches</p>
                      </div>

                      <div className="md:col-span-2 space-y-3">
                        <Label className="text-base font-semibold text-gray-900">Price per Board Foot (Optional)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="5.50"
                            value={pricePerBF}
                            onChange={(e) => setPricePerBF(e.target.value)}
                            className="pl-10 h-12 text-lg border-2 focus:border-amber-500"
                            min="0"
                            step="0.01"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            PKR/BF
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Cost per board foot for total price calculation</p>
                      </div>
                    </div>

                    <Button
                      onClick={calculateBoardFeet}
                      className="w-full h-14 text-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-xl font-bold"
                    >
                      Calculate Board Feet
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">Results</CardTitle>
                    <CardDescription className="text-base">Board foot calculations</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {results ? (
                      <div className="space-y-6">
                        {/* Main Result */}
                        <div className="text-center p-6 bg-gradient-to-r from-amber-50 to-orange-100 rounded-2xl border-2 border-amber-200">
                          <p className="text-lg text-gray-600 mb-2">Total Board Feet</p>
                          <p className="text-4xl font-bold text-amber-700 mb-2">{results.totalBoardFeet}</p>
                          <p className="text-sm text-gray-600">BF</p>
                        </div>

                        {/* Detailed Results */}
                        <div className="space-y-4">
                          <h3 className="font-bold text-lg text-gray-900">Detailed Results</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                              <span className="font-medium text-gray-700">Board feet per piece:</span>
                              <span className="font-bold text-amber-600">{results.boardFeetPerPiece} BF</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <span className="font-medium text-gray-700">Total board feet:</span>
                              <span className="font-bold text-orange-600">{results.totalBoardFeet} BF</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                              <span className="font-medium text-gray-700">Volume (cubic inches):</span>
                              <span className="font-bold text-yellow-600">{results.cubicInches} in³</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                              <span className="font-medium text-gray-700">Volume (cubic feet):</span>
                              <span className="font-bold text-red-600">{results.cubicFeet} ft³</span>
                            </div>
                            {results.totalCost && (
                              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                <span className="font-medium text-gray-700">Total cost:</span>
                                <span className="font-bold text-green-600">PKR {results.totalCost}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Save Button */}
                        <Button className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white font-bold">
                          Save This Calculation
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Enter lumber dimensions to calculate board feet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Information Section */}
            <section className="mt-16">
              <Card className="shadow-2xl border-0 pt-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">About Board Foot Calculator</CardTitle>
                </CardHeader>
                <CardContent className="p-8 prose max-w-none">
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    A board foot is a unit of measurement for lumber volume. One board foot equals 144 cubic inches or
                    1/12 cubic foot. It's calculated by multiplying thickness (inches) × width (inches) × length (feet)
                    ÷ 12.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">Calculation Formulas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <h4 className="font-bold text-amber-800 mb-2">Length in Feet</h4>
                        <p className="text-sm text-gray-700">BF = (Length_ft × Width_in × Thickness_in) ÷ 12</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-bold text-orange-800 mb-2">Length in Inches</h4>
                        <p className="text-sm text-gray-700">BF = (Thickness_in × Width_in × Length_in) ÷ 144</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900">Key Conversions</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>1 Board Foot =</strong> 144 cubic inches
                        </p>
                        <p>
                          <strong>1 Board Foot =</strong> 1/12 cubic foot
                        </p>
                        <p>
                          <strong>Total BF =</strong> Number of pieces × BF per piece
                        </p>
                        <p>
                          <strong>Total Cost =</strong> Total BF × Price per BF
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                    <p className="text-gray-700 font-medium">
                      <strong>Example:</strong> A 2" × 6" × 8' board = (8 × 6 × 2) ÷ 12 = 8 board feet. For 10 pieces,
                      total = 80 board feet.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>


      </div>
    </>
  )
}
