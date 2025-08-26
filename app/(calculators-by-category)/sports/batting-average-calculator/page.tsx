"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Head from "next/head"
import { Trophy, Target, Activity } from "lucide-react"
import { useMobileScroll } from "@/hooks/useMobileScroll"

export default function BattingAverageCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [tab, setTab] = useState("basic")
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  // Input states for basic calculation
  const [runsScored, setRunsScored] = useState(315)
  const [timesOut, setTimesOut] = useState(3)

  // Input states for advanced calculation
  const [advancedRuns, setAdvancedRuns] = useState(315)
  const [inningsPlayed, setInningsPlayed] = useState(5)
  const [notOuts, setNotOuts] = useState(2)

  const calculateBasicAverage = () => {
    if (isNaN(runsScored) || runsScored < 0) {
      alert("Please enter a valid positive number for runs scored")
      return
    }
    if (isNaN(timesOut) || timesOut <= 0) {
      alert("Please enter a valid positive number for times out (must be greater than 0)")
      return
    }

    const battingAverage = runsScored / timesOut

    setResult({
      type: "basic",
      runsScored,
      timesOut,
      battingAverage,
      formula: `Batting Average = ${runsScored} ÷ ${timesOut} = ${battingAverage.toFixed(2)}`,
      explanation: `With ${runsScored} runs scored and ${timesOut} dismissals, the batting average is ${battingAverage.toFixed(2)}.`,
    })
    setShowResult(true)
  }

  const calculateAdvancedAverage = () => {
    if (isNaN(advancedRuns) || advancedRuns < 0) {
      alert("Please enter a valid positive number for runs scored")
      return
    }
    if (isNaN(inningsPlayed) || inningsPlayed <= 0) {
      alert("Please enter a valid positive number for innings played")
      return
    }
    if (isNaN(notOuts) || notOuts < 0) {
      alert("Please enter a valid number for not outs (0 or positive)")
      return
    }
    if (notOuts >= inningsPlayed) {
      alert("Not outs cannot be greater than or equal to innings played")
      return
    }

    const calculatedTimesOut = inningsPlayed - notOuts
    if (calculatedTimesOut <= 0) {
      alert("Times out must be greater than 0 (innings played - not outs)")
      return
    }

    const battingAverage = advancedRuns / calculatedTimesOut

    setResult({
      type: "advanced",
      runsScored: advancedRuns,
      inningsPlayed,
      notOuts,
      timesOut: calculatedTimesOut,
      battingAverage,
      formula: `Times Out = ${inningsPlayed} - ${notOuts} = ${calculatedTimesOut}; Batting Average = ${advancedRuns} ÷ ${calculatedTimesOut} = ${battingAverage.toFixed(2)}`,
      explanation: `With ${advancedRuns} runs in ${inningsPlayed} innings (${notOuts} not out), the batting average is ${battingAverage.toFixed(2)}.`,
    })
    setShowResult(true)
  }

  const handleCalculate = () => {
    switch (tab) {
      case "basic":
        calculateBasicAverage()
        break
      case "advanced":
        calculateAdvancedAverage()
        break
    }
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  }

  return (
    <>
      <Head>
        <title>Batting Average Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Calculate cricket batting average with runs scored and dismissals. Includes basic and advanced calculations with innings and not outs."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_720-8sE77EX08xKuB6AvLTisdyhRT3j1X2.png"
                  alt="Smart Calculator Logo"
                  className="w-12 h-12"
                />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Batting Average Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/sports" className="text-gray-500 hover:text-blue-600">
                Sports
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Batting Average Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Batting Average Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate cricket batting average using runs scored and dismissals. Perfect for tracking player
                performance and statistics.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Trophy className="w-6 h-6 text-green-600" />
                      <span>Batting Average Calculation</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Choose between basic or advanced calculation methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Label className="text-base font-semibold mb-3 block">
                        What calculation method would you like to use?
                      </Label>
                      <Tabs value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="bg-gradient-to-r from-green-50 to-emerald-50 grid grid-cols-2 gap-1 mb-6 h-auto p-2 rounded-xl border border-green-200 shadow-sm">
                          <TabsTrigger
                            value="basic"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 hover:shadow-md"
                          >
                            Basic Calculation
                          </TabsTrigger>
                          <TabsTrigger
                            value="advanced"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 hover:shadow-md"
                          >
                            Advanced Calculation
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Runs Scored</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Target className="h-5 w-5 text-green-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                                  type="number"
                                  min="0"
                                  value={runsScored}
                                  onChange={(e) => setRunsScored(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Times Out</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Activity className="h-5 w-5 text-green-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                                  type="number"
                                  min="1"
                                  value={timesOut}
                                  onChange={(e) => setTimesOut(Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formula:</strong> Batting Average = Runs Scored ÷ Times Out
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              Example: 315 runs ÷ 3 dismissals = 105.00 average
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="advanced">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Runs Scored</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Target className="h-5 w-5 text-green-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                                  type="number"
                                  min="0"
                                  value={advancedRuns}
                                  onChange={(e) => setAdvancedRuns(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Innings Played</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Activity className="h-5 w-5 text-green-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                                  type="number"
                                  min="1"
                                  value={inningsPlayed}
                                  onChange={(e) => setInningsPlayed(Number(e.target.value))}
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Not Outs</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Trophy className="h-5 w-5 text-green-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
                                  type="number"
                                  min="0"
                                  value={notOuts}
                                  onChange={(e) => setNotOuts(Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formula:</strong> Times Out = Innings Played - Not Outs
                              <br />
                              Batting Average = Runs Scored ÷ Times Out
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              Not out innings don't count as dismissals, which can increase your average
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      Calculate Batting Average
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-3 shadow-lg">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">Batting Average</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3">
                        <div className="space-y-2">
                          <p className="text-4xl font-bold text-green-900">{result.battingAverage.toFixed(2)}</p>
                          <p className="text-lg text-gray-600">Batting Average</p>
                        </div>
                        <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                          <p className="text-sm text-gray-700 font-medium">{result.formula}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">{result.explanation}</div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Trophy className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter your cricket statistics and click{" "}
                          <span className="font-semibold text-green-600">Calculate</span> to see your batting average.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Definition and Context section */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">
                    Understanding Batting Average
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Definition</h3>
                      <p className="text-gray-700 mb-4">
                        Batting average in cricket is a statistic that measures a batsman's performance. It represents
                        the average number of runs scored per dismissal.
                      </p>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Key Points</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Higher averages indicate better batting performance</li>
                        <li>Not out innings are not counted as dismissals</li>
                        <li>A good batting average varies by level of cricket</li>
                        <li>Professional averages above 40 are considered excellent</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Example:</strong>
                        </p>
                        <p className="text-gray-700">Runs scored: 315</p>
                        <p className="text-gray-700">Times out: 3</p>
                        <p className="text-gray-700 font-semibold">Batting average: 315 ÷ 3 = 105.00</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        This would be an exceptional batting average, indicating the player scores an average of 105
                        runs before getting out.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

      </div>
    </>
  )
}
