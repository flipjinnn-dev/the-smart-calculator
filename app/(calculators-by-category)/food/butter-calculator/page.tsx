"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Head from "next/head"
import { ChefHat, Scale, Utensils } from "lucide-react"

export default function ButterCalculator() {
  const [tab, setTab] = useState("sticks")
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  // Input states for all tabs
  const [sticks, setSticks] = useState(1)
  const [cups, setCups] = useState(0.5)
  const [tablespoons, setTablespoons] = useState(8)
  const [teaspoons, setTeaspoons] = useState(24)
  const [grams, setGrams] = useState(113)

  const calculateFromSticks = () => {
    if (isNaN(sticks) || sticks < 0) {
      alert("Please enter a valid positive number for sticks")
      return
    }

    const resultCups = sticks * 0.5
    const resultTbsp = sticks * 8
    const resultTsp = sticks * 24
    const resultGrams = sticks * 113

    setResult({
      input: sticks,
      inputUnit: "sticks",
      cups: resultCups,
      tablespoons: resultTbsp,
      teaspoons: resultTsp,
      grams: resultGrams,
      formula: "1 stick = ½ cup = 8 tbsp = 24 tsp = 113g",
    })
    setShowResult(true)
  }

  const calculateFromCups = () => {
    if (isNaN(cups) || cups < 0) {
      alert("Please enter a valid positive number for cups")
      return
    }

    const resultSticks = cups * 2
    const resultTbsp = cups * 16
    const resultTsp = cups * 48
    const resultGrams = cups * 226

    setResult({
      input: cups,
      inputUnit: "cups",
      sticks: resultSticks,
      tablespoons: resultTbsp,
      teaspoons: resultTsp,
      grams: resultGrams,
      formula: "1 cup = 2 sticks = 16 tbsp = 48 tsp = 226g",
    })
    setShowResult(true)
  }

  const calculateFromTablespoons = () => {
    if (isNaN(tablespoons) || tablespoons < 0) {
      alert("Please enter a valid positive number for tablespoons")
      return
    }

    const resultSticks = tablespoons * 0.125
    const resultCups = tablespoons * 0.0625
    const resultTsp = tablespoons * 3
    const resultGrams = tablespoons * 14.1

    setResult({
      input: tablespoons,
      inputUnit: "tablespoons",
      sticks: resultSticks,
      cups: resultCups,
      teaspoons: resultTsp,
      grams: resultGrams,
      formula: "1 tbsp = 0.125 sticks = 0.0625 cups = 3 tsp = 14.1g",
    })
    setShowResult(true)
  }

  const calculateFromGrams = () => {
    if (isNaN(grams) || grams < 0) {
      alert("Please enter a valid positive number for grams")
      return
    }

    const resultSticks = grams / 113
    const resultCups = grams / 226
    const resultTbsp = grams / 14.1
    const resultTsp = resultTbsp * 3

    setResult({
      input: grams,
      inputUnit: "grams",
      sticks: resultSticks,
      cups: resultCups,
      tablespoons: resultTbsp,
      teaspoons: resultTsp,
      formula: "1g = 0.00885 sticks = 0.00442 cups = 0.071 tbsp",
    })
    setShowResult(true)
  }

  const handleCalculate = () => {
    switch (tab) {
      case "sticks":
        calculateFromSticks()
        break
      case "cups":
        calculateFromCups()
        break
      case "tablespoons":
        calculateFromTablespoons()
        break
      case "grams":
        calculateFromGrams()
        break
    }
  }

  return (
    <>
      <Head>
        <title>Butter Conversion Calculator - Smart Calculator</title>
        <meta
          name="description"
          content="Convert butter measurements between sticks, cups, tablespoons, teaspoons, and grams with precise cooking conversions."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
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
                  <p className="text-sm text-gray-500">Butter Conversion Calculator</p>
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
              <Link href="/food" className="text-gray-500 hover:text-blue-600">
                Food
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Butter Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Butter Conversion Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Convert butter measurements between sticks, cups, tablespoons, teaspoons, and grams for perfect cooking
                and baking results.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <ChefHat className="w-6 h-6 text-amber-600" />
                      <span>Butter Conversions</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Choose your input measurement to convert to all other units
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Label className="text-base font-semibold mb-3 block">
                        What unit would you like to convert from?
                      </Label>
                      <Tabs value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="bg-gradient-to-r from-amber-50 to-orange-50 grid grid-cols-2 lg:grid-cols-4 gap-1 mb-6 h-auto p-2 rounded-xl border border-amber-200 shadow-sm">
                          <TabsTrigger
                            value="sticks"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:shadow-md"
                          >
                            Sticks
                          </TabsTrigger>
                          <TabsTrigger
                            value="cups"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:shadow-md"
                          >
                            Cups
                          </TabsTrigger>
                          <TabsTrigger
                            value="tablespoons"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:shadow-md"
                          >
                            Tablespoons
                          </TabsTrigger>
                          <TabsTrigger
                            value="grams"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:shadow-md"
                          >
                            Grams
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="sticks">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Number of Sticks</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Utensils className="h-5 w-5 text-amber-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-200 shadow-sm"
                                  type="number"
                                  step="0.25"
                                  min="0"
                                  value={sticks}
                                  onChange={(e) => setSticks(Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formula:</strong> 1 stick = ½ cup = 8 tbsp = 24 tsp = 113g
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="cups">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Number of Cups</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Scale className="h-5 w-5 text-amber-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-200 shadow-sm"
                                  type="number"
                                  step="0.125"
                                  min="0"
                                  value={cups}
                                  onChange={(e) => setCups(Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formula:</strong> 1 cup = 2 sticks = 16 tbsp = 48 tsp = 226g
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="tablespoons">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                Number of Tablespoons
                              </Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Utensils className="h-5 w-5 text-amber-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-200 shadow-sm"
                                  type="number"
                                  step="0.5"
                                  min="0"
                                  value={tablespoons}
                                  onChange={(e) => setTablespoons(Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formula:</strong> 1 tbsp = 0.125 sticks = 0.0625 cups = 3 tsp = 14.1g
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="grams">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">Weight in Grams</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Scale className="h-5 w-5 text-amber-500" />
                                </div>
                                <Input
                                  className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-200 shadow-sm"
                                  type="number"
                                  step="1"
                                  min="0"
                                  value={grams}
                                  onChange={(e) => setGrams(Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-sm text-gray-700">
                              <strong>Formula:</strong> 1g = 0.00885 sticks = 0.00442 cups = 0.071 tbsp
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <Button
                      onClick={handleCalculate}
                      className="w-full h-12 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      Convert Butter
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-3 shadow-lg">
                      <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-amber-700 tracking-tight">Conversions</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-3">
                        <p className="text-lg text-gray-600 mb-4 font-medium">
                          {result.input} {result.inputUnit} equals:
                        </p>
                        <div className="space-y-2">
                          {result.sticks && (
                            <p className="text-2xl font-bold text-amber-900">{result.sticks.toFixed(2)} sticks</p>
                          )}
                          {result.cups && (
                            <p className="text-2xl font-bold text-amber-900">{result.cups.toFixed(2)} cups</p>
                          )}
                          {result.tablespoons && (
                            <p className="text-2xl font-bold text-amber-900">{result.tablespoons.toFixed(1)} tbsp</p>
                          )}
                          {result.teaspoons && (
                            <p className="text-2xl font-bold text-amber-900">{result.teaspoons.toFixed(0)} tsp</p>
                          )}
                          {result.grams && (
                            <p className="text-2xl font-bold text-amber-900">{result.grams.toFixed(0)} grams</p>
                          )}
                        </div>
                        <div className="mt-4 text-sm text-gray-500">Perfect for your cooking and baking needs!</div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <ChefHat className="w-8 h-8 text-amber-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter a value and click <span className="font-semibold text-amber-600">Convert Butter</span>{" "}
                          to see all conversions.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* How to use section */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col justify-center items-start p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mr-3 shadow-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-amber-700 tracking-tight mb-2 text-left">
                    How to use this calculator?
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start justify-center">
                  <ul className="list-none w-full max-w-md mx-0 text-gray-700 space-y-4 text-base text-left">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold">
                        1
                      </span>
                      <span>Select the unit you want to convert from (sticks, cups, tablespoons, or grams).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold">
                        2
                      </span>
                      <span>Enter the amount you have in your recipe.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold">
                        3
                      </span>
                      <span>
                        Click <span className="font-semibold text-amber-600">Convert Butter</span> to see all equivalent
                        measurements.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold">
                        4
                      </span>
                      <span>Use the converted measurements in your cooking and baking!</span>
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
