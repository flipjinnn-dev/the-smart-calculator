"use client"

import { useCalculatorContent } from "@/hooks/useCalculatorContent"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Clock, Ruler } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"


export default function VelocityCalculatorCalculator() {
  const pathname = usePathname()
  const language = pathname.split('/')[1] || 'en'
  const { content, loading, error: contentError } = useCalculatorContent('velocity-calculator', language)
  
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [tab, setTab] = useState("simple")
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  // Input states for all tabs
  const [distance, setDistance] = useState(100)
  const [time, setTime] = useState(5)
  const [initialVelocity, setInitialVelocity] = useState(0)
  const [finalVelocity, setFinalVelocity] = useState(20)
  const [acceleration, setAcceleration] = useState(3)
  const [displacement, setDisplacement] = useState(50)

  // Weighted average inputs
  const [segments, setSegments] = useState([
    { velocity: 10, time: 2 },
    { velocity: 20, time: 3 },
  ])

  // Use content or fallback to defaults (after all hooks)
  const contentData = content || {
    pageTitle: "Velocity Calculator Calculator",
    pageDescription: "Calculate calculator with our free online calculator",
    form: {
      labels: {},
      placeholders: {},
      buttons: {
        calculate: "Calculate",
        reset: "Reset"
      }
    },
    results: {}
  }

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Show error if content failed to load
  if (contentError) {
    console.error('Error loading content:', contentError);
  }

  const addSegment = () => {
    setSegments([...segments, { velocity: 0, time: 0 }])
  }

  const removeSegment = (index: number) => {
    if (segments.length > 1) {
      setSegments(segments.filter((_, i) => i !== index))
    }
  }

  const updateSegment = (index: number, field: "velocity" | "time", value: number) => {
    const newSegments = [...segments]
    newSegments[index][field] = value
    setSegments(newSegments)
  }

  const calculateSimpleVelocity = () => {
    if (time <= 0) {
      alert("Time must be greater than 0")
      return
    }
    if (isNaN(distance) || isNaN(time)) {
      alert("Please enter valid numbers")
      return
    }

    // v = distance / time
    const velocity = distance / time

    setResult({
      velocity: velocity,
      distance: distance,
      time: time,
      formula: "v = d / t",
    })
    setShowResult(true)
  }

  const calculateAcceleratedVelocity = () => {
    if (isNaN(initialVelocity) || isNaN(acceleration) || isNaN(time)) {
      alert("Please enter valid numbers")
      return
    }
    if (time < 0) {
      alert("Time cannot be negative")
      return
    }

    // v_final = v_initial + a * t
    const finalVel = initialVelocity + acceleration * time

    setResult({
      finalVelocity: finalVel,
      initialVelocity: initialVelocity,
      acceleration: acceleration,
      time: time,
      formula: "v_f = v_i + a × t",
    })
    setShowResult(true)
  }

  const calculateWeightedAverage = () => {
    const validSegments = segments.filter((seg) => !isNaN(seg.velocity) && !isNaN(seg.time) && seg.time > 0)

    if (validSegments.length === 0) {
      alert("Please enter valid segments with time greater than 0")
      return
    }

    // v_avg = (v1*t1 + v2*t2 + ...) / (t1 + t2 + ...)
    const totalWeightedVelocity = validSegments.reduce((sum, seg) => sum + seg.velocity * seg.time, 0)
    const totalTime = validSegments.reduce((sum, seg) => sum + seg.time, 0)
    const avgVelocity = totalTime > 0 ? totalWeightedVelocity / totalTime : 0

    setResult({
      averageVelocity: avgVelocity,
      segments: validSegments,
      totalTime: totalTime,
      formula: "v_avg = Σ(v_i × t_i) / Σt_i",
    })
    setShowResult(true)
  }

  const calculateAlternateFormulas = () => {
    if (time <= 0) {
      alert("Time must be greater than 0")
      return
    }
    if (isNaN(displacement) || isNaN(initialVelocity) || isNaN(acceleration) || isNaN(time)) {
      alert("Please enter valid numbers")
      return
    }

    // Given s, u, t: v = 2(s/t) - u
    const velocityFromSUT = 2 * (displacement / time) - initialVelocity

    // Given s, a, t: v = s/t + at/2
    const velocityFromSAT = displacement / time + (acceleration * time) / 2

    setResult({
      velocityFromSUT: velocityFromSUT,
      velocityFromSAT: velocityFromSAT,
      displacement: displacement,
      initialVelocity: initialVelocity,
      acceleration: acceleration,
      time: time,
      formulaSUT: "v = 2(s/t) - u",
      formulaSAT: "v = s/t + at/2",
    })
    setShowResult(true)
  }

  const handleCalculate = () => {
    switch (tab) {
      case "simple":
        calculateSimpleVelocity()
        break
      case "acceleration":
        calculateAcceleratedVelocity()
        break
      case "weighted":
        calculateWeightedAverage()
        break
      case "alternate":
        calculateAlternateFormulas()
        break
    }
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

  }

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Zap className="w-6 h-6 text-yellow-600" />
                      <span>Velocity Calculations</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Choose the type of velocity calculation you need
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Label className="text-base font-semibold mb-3 block">What would you like to calculate?</Label>
                      <Tabs value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="bg-gradient-to-r from-yellow-50 to-amber-50 grid grid-cols-2 lg:grid-cols-4 gap-1 mb-6 h-auto p-2 rounded-xl border border-yellow-200 shadow-sm">
                          <TabsTrigger
                            value="simple"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-amber-100 hover:shadow-md"
                          >
                            Simple Velocity
                          </TabsTrigger>
                          <TabsTrigger
                            value="acceleration"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-amber-100 hover:shadow-md"
                          >
                            With Acceleration
                          </TabsTrigger>
                          <TabsTrigger
                            value="weighted"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-amber-100 hover:shadow-md"
                          >
                            Weighted Average
                          </TabsTrigger>
                          <TabsTrigger
                            value="alternate"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-amber-100 hover:shadow-md"
                          >
                            Alternate Forms
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="simple">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Distance (m)</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Ruler className="h-5 w-5 text-yellow-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 shadow-sm"
                                  type="number"
                                  value={distance}
                                  onChange={(e) => setDistance(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Time (s)</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Clock className="h-5 w-5 text-yellow-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 shadow-sm"
                                  type="number"
                                  value={time}
                                  onChange={(e) => setTime(Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formula:</strong> v = distance / time
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="acceleration">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                Initial Velocity (m/s)
                              </Label>
                              <Input
                                className="w-full h-12 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 shadow-sm"
                                type="number"
                                value={initialVelocity}
                                onChange={(e) => setInitialVelocity(Number(e.target.value))}
                              />
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                Acceleration (m/s²)
                              </Label>
                              <Input
                                className="w-full h-12 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 shadow-sm"
                                type="number"
                                value={acceleration}
                                onChange={(e) => setAcceleration(Number(e.target.value))}
                              />
                            </div>
                            <div className="relative col-span-2">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Time (s)</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Clock className="h-5 w-5 text-yellow-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 shadow-sm"
                                  type="number"
                                  value={time}
                                  onChange={(e) => setTime(Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formula:</strong> v_final = v_initial + a × t
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="weighted">
                          <div className="space-y-4">
                            <Label className="text-sm font-medium text-gray-700 block">Velocity Segments</Label>
                            {segments.map((segment, index) => (
                              <div key={index} className="grid grid-cols-3 gap-2 items-end">
                                <div>
                                  <Label className="text-xs text-gray-700">Velocity (m/s)</Label>
                                  <Input
                                    className="h-10 rounded-lg border-gray-200 focus:border-yellow-400 focus:ring-yellow-200"
                                    type="number"
                                    value={segment.velocity}
                                    onChange={(e) => updateSegment(index, "velocity", Number(e.target.value))}
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-700">Time (s)</Label>
                                  <Input
                                    className="h-10 rounded-lg border-gray-200 focus:border-yellow-400 focus:ring-yellow-200"
                                    type="number"
                                    value={segment.time}
                                    onChange={(e) => updateSegment(index, "time", Number(e.target.value))}
                                  />
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeSegment(index)}
                                  disabled={segments.length === 1}
                                  className="h-10 border-gray-200 text-gray-700 hover:bg-yellow-50"
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={addSegment}
                              className="w-full border-gray-200 text-gray-700 hover:bg-yellow-50 bg-transparent"
                            >
                              Add Segment
                            </Button>
                          </div>
                          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formula:</strong> v_avg = Σ(v_i × t_i) / Σt_i
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="alternate">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Displacement (m)</Label>
                              <Input
                                className="w-full h-12 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 shadow-sm"
                                type="number"
                                value={displacement}
                                onChange={(e) => setDisplacement(Number(e.target.value))}
                              />
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                Initial Velocity (m/s)
                              </Label>
                              <Input
                                className="w-full h-12 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 shadow-sm"
                                type="number"
                                value={initialVelocity}
                                onChange={(e) => setInitialVelocity(Number(e.target.value))}
                              />
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                Acceleration (m/s²)
                              </Label>
                              <Input
                                className="w-full h-12 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 shadow-sm"
                                type="number"
                                value={acceleration}
                                onChange={(e) => setAcceleration(Number(e.target.value))}
                              />
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Time (s)</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Clock className="h-5 w-5 text-yellow-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-yellow-400 focus:ring-yellow-200 shadow-sm"
                                  type="number"
                                  value={time}
                                  onChange={(e) => setTime(Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formulas:</strong>
                              <br />v = 2(s/t) - u<br />v = s/t + at/2
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      className="w-full h-12 text-lg bg-gradient-to-r from-yellow-500 to-yellow-600"
                    >
                      Calculate
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br  h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center mb-3 shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-yellow-700 tracking-tight">Result</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center">
                        <p className="text-lg text-gray-600 mb-2 font-medium">Calculated Value</p>
                        {tab === "simple" && (
                          <p className="text-5xl font-extrabold text-yellow-900 mb-2 drop-shadow-lg">
                            {result.velocity ? result.velocity.toFixed(2) : "0.00"} m/s
                          </p>
                        )}
                        {tab === "acceleration" && (
                          <p className="text-5xl font-extrabold text-yellow-900 mb-2 drop-shadow-lg">
                            {result.finalVelocity ? result.finalVelocity.toFixed(2) : "0.00"} m/s
                          </p>
                        )}
                        {tab === "weighted" && (
                          <p className="text-5xl font-extrabold text-yellow-900 mb-2 drop-shadow-lg">
                            {result.averageVelocity ? result.averageVelocity.toFixed(2) : "0.00"} m/s
                          </p>
                        )}
                        {tab === "alternate" && (
                          <div className="space-y-2">
                            <p className="text-3xl font-extrabold text-yellow-900 drop-shadow-lg">
                              {result.velocityFromSUT ? result.velocityFromSUT.toFixed(2) : "0.00"} m/s
                            </p>
                            <p className="text-3xl font-extrabold text-yellow-900 drop-shadow-lg">
                              {result.velocityFromSAT ? result.velocityFromSAT.toFixed(2) : "0.00"} m/s
                            </p>
                          </div>
                        )}
                        <div className="mt-2 text-sm text-gray-500">You can copy or use this value as needed.</div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Zap className="w-8 h-8 text-yellow-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter values and click <span className="font-semibold text-yellow-600">Calculate</span> to see
                          result.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* How to use section below both cards */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br flex flex-col justify-center items-start p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mr-3 shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-yellow-700 tracking-tight mb-2 text-left">
                    How to use this calculator?
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start justify-center">
                  <ul className="list-none w-full max-w-md mx-0 text-gray-700 space-y-4 text-base text-left">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-700 font-bold">
                        1
                      </span>
                      <span>Select the type of velocity calculation you need.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-700 font-bold">
                        2
                      </span>
                      <span>Enter your values in the input fields.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-700 font-bold">
                        3
                      </span>
                      <span>
                        Click <span className="font-semibold text-yellow-600">Calculate</span> to see the result
                        instantly.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-200 text-yellow-700 font-bold">
                        4
                      </span>
                      <span>Switch between tabs for different velocity operations.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

      </div>
    </>
  )
}
