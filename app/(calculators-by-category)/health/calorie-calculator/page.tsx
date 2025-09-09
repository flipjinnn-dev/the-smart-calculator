"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Calculator, Heart, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Logo from "@/components/logo"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import SEO from "@/lib/seo"

export default function CalorieCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activity, setActivity] = useState("")
  const [results, setResults] = useState<{
    bmr: number
    maintenance: number
    weightLoss: number
    weightGain: number
  } | null>(null)

  const calculateCalories = () => {
    const ageNum = Number.parseFloat(age)
    const heightNum = Number.parseFloat(height)
    const weightNum = Number.parseFloat(weight)
    const activityNum = Number.parseFloat(activity)

    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);



    if (!ageNum || !heightNum || !weightNum || !activityNum || !gender) return

    // Mifflin-St Jeor Equation
    let bmr = 0
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
    }

    const maintenance = bmr * activityNum
    const weightLoss = maintenance - 500 // 1 lb per week
    const weightGain = maintenance + 500 // 1 lb per week

    setResults({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(weightLoss),
      weightGain: Math.round(weightGain),
    })
  }

  return (
    <>
<SEO
  title="Calorie Calculator – Daily Calorie Needs Tracker"
  description="Find out how many calories you need daily. Use our free calorie calculator to plan weight loss, gain, or maintenance."
  keywords="calorie calculator, daily calorie intake calculator, weight management"
  slug="/health/calorie-calculator"
/>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Calorie Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/health" className="text-gray-500 hover:text-blue-600">
                Health
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Calorie Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Calorie Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your daily calorie needs based on your personal information and activity level.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Form */}
              <Card className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-red-600" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription className="text-base">Enter your details to calculate calorie needs</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="age" className="text-base font-semibold">
                        Age
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="30"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="h-12 text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="gender" className="text-base font-semibold">
                        Gender
                      </Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="height" className="text-base font-semibold">
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="170"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="h-12 text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="weight" className="text-base font-semibold">
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="h-12 text-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="activity" className="flex items-center space-x-2 text-base font-semibold">
                      <Activity className="w-4 h-4" />
                      <span>Activity Level</span>
                    </Label>
                    <Select value={activity} onValueChange={setActivity}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.2">Sedentary (little/no exercise)</SelectItem>
                        <SelectItem value="1.375">Light (light exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="1.55">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="1.725">Active (hard exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="1.9">Very Active (very hard exercise, physical job)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={calculateCalories}
                    className="w-full h-12 text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg"
                  >
                    Calculate Calories
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-xl border-0 pt-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="text-2xl">Your Calorie Needs</CardTitle>
                  <CardDescription className="text-base">
                    Daily calorie requirements for different goals
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {results ? (
                    <div className="space-y-8">
                      <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                        <p className="text-lg text-gray-600 mb-3">Maintenance Calories</p>
                        <p className="text-5xl font-bold text-blue-600 mb-4">{results.maintenance.toLocaleString()}</p>
                        <p className="text-gray-600">Calories to maintain current weight</p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">Weight Loss (1 lb/week)</p>
                          <p className="text-2xl font-bold text-green-600">
                            {results.weightLoss.toLocaleString()} calories
                          </p>
                        </div>
                        <div className="text-center p-6 bg-orange-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">Weight Gain (1 lb/week)</p>
                          <p className="text-2xl font-bold text-orange-600">
                            {results.weightGain.toLocaleString()} calories
                          </p>
                        </div>
                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">Basal Metabolic Rate (BMR)</p>
                          <p className="text-2xl font-bold text-gray-900">{results.bmr.toLocaleString()} calories</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-gray-500">
                      <Heart className="w-16 h-16 mx-auto mb-6 opacity-50" />
                      <p className="text-lg">Enter your information to calculate calorie needs</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>


      </div>
    </>
  )
}
