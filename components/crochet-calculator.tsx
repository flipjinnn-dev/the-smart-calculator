"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Scissors, DollarSign, Clock, TrendingUp, Minus, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CrochetCalculator() {
  // Yarn Calculator State
  const [projectWidth, setProjectWidth] = useState<string>("")
  const [projectLength, setProjectLength] = useState<string>("")
  const [yarnWeight, setYarnWeight] = useState<string>("worsted")
  const [stitchType, setStitchType] = useState<string>("single")
  const [stitchesPer4, setStitchesPer4] = useState<string>("14")
  const [rowsPer4, setRowsPer4] = useState<string>("16")

  // Increase/Decrease Calculator State
  const [currentStitches, setCurrentStitches] = useState<string>("")
  const [increaseCount, setIncreaseCount] = useState<string>("")
  const [decreaseCount, setDecreaseCount] = useState<string>("")

  // Pricing Calculator State
  const [materialCost, setMaterialCost] = useState<string>("")
  const [hoursWorked, setHoursWorked] = useState<string>("")
  const [hourlyRate, setHourlyRate] = useState<string>("20")
  const [overheadPercent, setOverheadPercent] = useState<string>("10")
  const [profitMargin, setProfitMargin] = useState<string>("15")

  // Time Calculator State
  const [totalStitches, setTotalStitches] = useState<string>("")
  const [stitchesPerMinute, setStitchesPerMinute] = useState<string>("30")

  const [yarnResult, setYarnResult] = useState<null | {
    totalYardage: number
    skeinsNeeded: number
    stitchCount: number
    rowCount: number
  }>(null)

  const [increaseResult, setIncreaseResult] = useState<null | {
    interval: number
    newStitchCount: number
    instruction: string
  }>(null)

  const [decreaseResult, setDecreaseResult] = useState<null | {
    interval: number
    newStitchCount: number
    instruction: string
  }>(null)

  const [pricingResult, setPricingResult] = useState<null | {
    materialCost: number
    labourCost: number
    overhead: number
    subtotal: number
    profit: number
    sellingPrice: number
  }>(null)

  const [timeResult, setTimeResult] = useState<null | {
    hours: number
    minutes: number
  }>(null)

  const calculateYarn = () => {
    const width = parseFloat(projectWidth)
    const length = parseFloat(projectLength)
    const stitches = parseFloat(stitchesPer4)
    const rows = parseFloat(rowsPer4)

    if (!width || !length || !stitches || !rows) {
      alert("Please enter all measurements")
      return
    }

    // Calculate stitch and row counts
    const stitchCount = Math.round((width / 4) * stitches)
    const rowCount = Math.round((length / 4) * rows)

    // Yarn multipliers based on stitch type
    const multipliers: { [key: string]: number } = {
      single: 1.5,
      half: 1.3,
      double: 1.2,
      treble: 1.1
    }

    const multiplier = multipliers[stitchType] || 1.5

    // Calculate yardage (width × multiplier × rows, convert inches to yards)
    const totalYardage = Math.round((width * multiplier * rowCount) / 36 * 1.15) // 15% buffer

    // Average yardage per skein based on yarn weight
    const yardagePerSkein: { [key: string]: number } = {
      lace: 900,
      fingering: 500,
      sport: 300,
      worsted: 200,
      bulky: 125,
      super: 75
    }

    const skeinYardage = yardagePerSkein[yarnWeight] || 200
    const skeinsNeeded = Math.ceil(totalYardage / skeinYardage)

    setYarnResult({
      totalYardage,
      skeinsNeeded,
      stitchCount,
      rowCount
    })
  }

  const calculateIncrease = () => {
    const stitches = parseFloat(currentStitches)
    const increases = parseFloat(increaseCount)

    if (!stitches || !increases) {
      alert("Please enter stitch count and increase amount")
      return
    }

    const interval = Math.floor(stitches / increases)
    const newStitchCount = stitches + increases

    setIncreaseResult({
      interval,
      newStitchCount,
      instruction: `Work 1 stitch, then increase every ${interval}th stitch`
    })
  }

  const calculateDecrease = () => {
    const stitches = parseFloat(currentStitches)
    const decreases = parseFloat(decreaseCount)

    if (!stitches || !decreases) {
      alert("Please enter stitch count and decrease amount")
      return
    }

    const interval = Math.floor(stitches / decreases)
    const newStitchCount = stitches - decreases

    setDecreaseResult({
      interval,
      newStitchCount,
      instruction: `Decrease every ${interval}th stitch`
    })
  }

  const calculatePricing = () => {
    const materials = parseFloat(materialCost)
    const hours = parseFloat(hoursWorked)
    const rate = parseFloat(hourlyRate)
    const overhead = parseFloat(overheadPercent)
    const profit = parseFloat(profitMargin)

    if (!materials || !hours || !rate) {
      alert("Please enter material cost, hours, and hourly rate")
      return
    }

    const labourCost = hours * rate
    const subtotal = materials + labourCost
    const overheadAmount = (subtotal * overhead) / 100
    const subtotalWithOverhead = subtotal + overheadAmount
    const profitAmount = (subtotalWithOverhead * profit) / 100
    const sellingPrice = subtotalWithOverhead + profitAmount

    setPricingResult({
      materialCost: materials,
      labourCost,
      overhead: overheadAmount,
      subtotal: subtotalWithOverhead,
      profit: profitAmount,
      sellingPrice
    })
  }

  const calculateTime = () => {
    const stitches = parseFloat(totalStitches)
    const speed = parseFloat(stitchesPerMinute)

    if (!stitches || !speed) {
      alert("Please enter total stitches and your speed")
      return
    }

    const totalMinutes = stitches / speed
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.round(totalMinutes % 60)

    setTimeResult({ hours, minutes })
  }

  return (
    <Tabs defaultValue="yarn" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 h-auto p-2">
        <TabsTrigger value="yarn" className="text-xs md:text-sm">Yarn Calculator</TabsTrigger>
        <TabsTrigger value="increase" className="text-xs md:text-sm">Increase</TabsTrigger>
        <TabsTrigger value="decrease" className="text-xs md:text-sm">Decrease</TabsTrigger>
        <TabsTrigger value="pricing" className="text-xs md:text-sm">Pricing</TabsTrigger>
        <TabsTrigger value="time" className="text-xs md:text-sm">Time</TabsTrigger>
      </TabsList>

      {/* Yarn Calculator */}
      <TabsContent value="yarn" className="space-y-6 mt-6">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Scissors className="w-5 h-5 text-pink-600" />
            Yarn Amount Calculator
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="width">Project Width (inches)</Label>
              <Input
                id="width"
                type="number"
                value={projectWidth}
                onChange={(e) => setProjectWidth(e.target.value)}
                placeholder="e.g., 50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Project Length (inches)</Label>
              <Input
                id="length"
                type="number"
                value={projectLength}
                onChange={(e) => setProjectLength(e.target.value)}
                placeholder="e.g., 60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yarn-weight">Yarn Weight</Label>
              <select
                id="yarn-weight"
                value={yarnWeight}
                onChange={(e) => setYarnWeight(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md"
              >
                <option value="lace">Lace / Thread</option>
                <option value="fingering">Fingering / Sock</option>
                <option value="sport">Sport / DK</option>
                <option value="worsted">Worsted</option>
                <option value="bulky">Bulky</option>
                <option value="super">Super Bulky</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stitch-type">Stitch Type</Label>
              <select
                id="stitch-type"
                value={stitchType}
                onChange={(e) => setStitchType(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md"
              >
                <option value="single">Single Crochet</option>
                <option value="half">Half Double Crochet</option>
                <option value="double">Double Crochet</option>
                <option value="treble">Treble Crochet</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stitches-per-4">Stitches per 4 inches</Label>
              <Input
                id="stitches-per-4"
                type="number"
                value={stitchesPer4}
                onChange={(e) => setStitchesPer4(e.target.value)}
                placeholder="e.g., 14"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rows-per-4">Rows per 4 inches</Label>
              <Input
                id="rows-per-4"
                type="number"
                value={rowsPer4}
                onChange={(e) => setRowsPer4(e.target.value)}
                placeholder="e.g., 16"
              />
            </div>
          </div>

          <Button onClick={calculateYarn} className="w-full bg-pink-600 hover:bg-pink-700">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Yarn Needed
          </Button>

          {yarnResult && (
            <div className="mt-6 p-5 bg-white rounded-lg border-2 border-pink-300">
              <h4 className="font-bold text-lg mb-3">Results:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600">Total Yardage Needed:</p>
                  <p className="text-2xl font-bold text-pink-600">{yarnResult.totalYardage} yards</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Skeins Needed:</p>
                  <p className="text-2xl font-bold text-pink-600">{yarnResult.skeinsNeeded} skeins</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Stitch Count:</p>
                  <p className="text-lg font-semibold">{yarnResult.stitchCount} stitches</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Row Count:</p>
                  <p className="text-lg font-semibold">{yarnResult.rowCount} rows</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">* Includes 15% safety buffer. Always buy from same dye lot!</p>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Increase Calculator */}
      <TabsContent value="increase" className="space-y-6 mt-6">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-2 border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-600" />
            Increase Calculator
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="current-stitches-inc">Current Stitch Count</Label>
              <Input
                id="current-stitches-inc"
                type="number"
                value={currentStitches}
                onChange={(e) => setCurrentStitches(e.target.value)}
                placeholder="e.g., 48"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="increase-count">Number of Increases</Label>
              <Input
                id="increase-count"
                type="number"
                value={increaseCount}
                onChange={(e) => setIncreaseCount(e.target.value)}
                placeholder="e.g., 6"
              />
            </div>
          </div>

          <Button onClick={calculateIncrease} className="w-full bg-green-600 hover:bg-green-700">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Increases
          </Button>

          {increaseResult && (
            <div className="mt-6 p-5 bg-white rounded-lg border-2 border-green-300">
              <h4 className="font-bold text-lg mb-3">Results:</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Increase Interval:</p>
                  <p className="text-2xl font-bold text-green-600">Every {increaseResult.interval}th stitch</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Stitch Count:</p>
                  <p className="text-2xl font-bold text-green-600">{increaseResult.newStitchCount} stitches</p>
                </div>
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-600">
                  <p className="text-sm font-semibold">Instruction:</p>
                  <p className="text-gray-700">{increaseResult.instruction}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Decrease Calculator */}
      <TabsContent value="decrease" className="space-y-6 mt-6">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Minus className="w-5 h-5 text-orange-600" />
            Decrease Calculator
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="current-stitches-dec">Current Stitch Count</Label>
              <Input
                id="current-stitches-dec"
                type="number"
                value={currentStitches}
                onChange={(e) => setCurrentStitches(e.target.value)}
                placeholder="e.g., 60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="decrease-count">Number of Decreases</Label>
              <Input
                id="decrease-count"
                type="number"
                value={decreaseCount}
                onChange={(e) => setDecreaseCount(e.target.value)}
                placeholder="e.g., 10"
              />
            </div>
          </div>

          <Button onClick={calculateDecrease} className="w-full bg-orange-600 hover:bg-orange-700">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Decreases
          </Button>

          {decreaseResult && (
            <div className="mt-6 p-5 bg-white rounded-lg border-2 border-orange-300">
              <h4 className="font-bold text-lg mb-3">Results:</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Decrease Interval:</p>
                  <p className="text-2xl font-bold text-orange-600">Every {decreaseResult.interval}th stitch</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Stitch Count:</p>
                  <p className="text-2xl font-bold text-orange-600">{decreaseResult.newStitchCount} stitches</p>
                </div>
                <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-600">
                  <p className="text-sm font-semibold">Instruction:</p>
                  <p className="text-gray-700">{decreaseResult.instruction}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Pricing Calculator */}
      <TabsContent value="pricing" className="space-y-6 mt-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Pricing Calculator
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="material-cost">Material Cost ($)</Label>
              <Input
                id="material-cost"
                type="number"
                value={materialCost}
                onChange={(e) => setMaterialCost(e.target.value)}
                placeholder="e.g., 30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours-worked">Hours Worked</Label>
              <Input
                id="hours-worked"
                type="number"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
                placeholder="e.g., 25"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
              <Input
                id="hourly-rate"
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="e.g., 20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overhead">Overhead (%)</Label>
              <Input
                id="overhead"
                type="number"
                value={overheadPercent}
                onChange={(e) => setOverheadPercent(e.target.value)}
                placeholder="e.g., 10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profit-margin">Profit Margin (%)</Label>
              <Input
                id="profit-margin"
                type="number"
                value={profitMargin}
                onChange={(e) => setProfitMargin(e.target.value)}
                placeholder="e.g., 15"
              />
            </div>
          </div>

          <Button onClick={calculatePricing} className="w-full bg-blue-600 hover:bg-blue-700">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Selling Price
          </Button>

          {pricingResult && (
            <div className="mt-6 p-5 bg-white rounded-lg border-2 border-blue-300">
              <h4 className="font-bold text-lg mb-4">Pricing Breakdown:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Material Cost:</span>
                  <span className="font-semibold">${pricingResult.materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Labour Cost:</span>
                  <span className="font-semibold">${pricingResult.labourCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overhead:</span>
                  <span className="font-semibold">${pricingResult.overhead.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${pricingResult.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit:</span>
                  <span className="font-semibold">${pricingResult.profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t-2 pt-2">
                  <span className="text-lg font-bold">Selling Price:</span>
                  <span className="text-2xl font-bold text-blue-600">${pricingResult.sellingPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Time Calculator */}
      <TabsContent value="time" className="space-y-6 mt-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Time Calculator
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="total-stitches">Total Stitch Count</Label>
              <Input
                id="total-stitches"
                type="number"
                value={totalStitches}
                onChange={(e) => setTotalStitches(e.target.value)}
                placeholder="e.g., 42000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stitches-per-min">Stitches per Minute</Label>
              <Input
                id="stitches-per-min"
                type="number"
                value={stitchesPerMinute}
                onChange={(e) => setStitchesPerMinute(e.target.value)}
                placeholder="e.g., 30"
              />
              <p className="text-xs text-gray-500">Beginner: 15-25, Intermediate: 30-45, Advanced: 50-70</p>
            </div>
          </div>

          <Button onClick={calculateTime} className="w-full bg-purple-600 hover:bg-purple-700">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Time
          </Button>

          {timeResult && (
            <div className="mt-6 p-5 bg-white rounded-lg border-2 border-purple-300">
              <h4 className="font-bold text-lg mb-3">Estimated Time:</h4>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-600">
                  {timeResult.hours}h {timeResult.minutes}m
                </p>
                <p className="text-sm text-gray-500 mt-2">Based on your crocheting speed</p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
