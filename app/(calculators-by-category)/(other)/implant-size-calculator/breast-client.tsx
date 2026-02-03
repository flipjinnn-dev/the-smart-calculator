"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertCircle, Heart, Ruler, Scale } from "lucide-react"
import { RatingProfileSection } from "@/components/rating-profile-section"

interface CalculatorProps {
  content: any
  guideContent: any
}

// Cup size mappings
const cupSizes = ["AA", "A", "B", "C", "D", "DD", "DDD/E", "F", "G", "H", "I", "J"]
const cupSizeToNumber: { [key: string]: number } = {
  "AA": 0,
  "A": 1,
  "B": 2,
  "C": 3,
  "D": 4,
  "DD": 5,
  "DDD/E": 6,
  "F": 7,
  "G": 8,
  "H": 9,
  "I": 10,
  "J": 11
}

export default function BreastImplantSizeCalculatorClient({ content, guideContent }: CalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("imperial")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [chestWidth, setChestWidth] = useState("")
  const [currentCupSize, setCurrentCupSize] = useState("B")
  const [desiredCupSize, setDesiredCupSize] = useState("D")
  const [skinElasticity, setSkinElasticity] = useState("average")
  const [lifestyle, setLifestyle] = useState("moderate")
  const [implantProfile, setImplantProfile] = useState("moderate")
  const [implantShape, setImplantShape] = useState("round")
  const [result, setResult] = useState<any>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    if (!height || parseFloat(height) <= 0) {
      newErrors.height = content?.errors?.height || "Please enter a valid height"
    }

    if (!weight || parseFloat(weight) <= 0) {
      newErrors.weight = content?.errors?.weight || "Please enter a valid weight"
    }

    if (!chestWidth || parseFloat(chestWidth) <= 0) {
      newErrors.chestWidth = content?.errors?.chestWidth || "Please enter a valid chest width"
    }

    if (!currentCupSize) {
      newErrors.currentCupSize = content?.errors?.currentCupSize || "Please select your current cup size"
    }

    if (!desiredCupSize) {
      newErrors.desiredCupSize = content?.errors?.desiredCupSize || "Please select your desired cup size"
    }

    // Check if desired is greater than current
    if (currentCupSize && desiredCupSize) {
      if (cupSizeToNumber[desiredCupSize] <= cupSizeToNumber[currentCupSize]) {
        newErrors.desiredCupSize = content?.errors?.desiredTooSmall || "Desired cup size must be larger than current cup size"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateImplantSize = () => {
    if (!validateInputs()) {
      return
    }

    // Convert to metric if needed
    let heightCm = parseFloat(height)
    let weightKg = parseFloat(weight)
    let chestWidthCm = parseFloat(chestWidth)

    if (unitSystem === "imperial") {
      heightCm = heightCm * 2.54 // inches to cm
      weightKg = weightKg * 0.453592 // lbs to kg
      chestWidthCm = chestWidthCm * 2.54 // inches to cm
    }

    // Calculate cup size difference
    const currentCupNum = cupSizeToNumber[currentCupSize]
    const desiredCupNum = cupSizeToNumber[desiredCupSize]
    const cupIncrease = desiredCupNum - currentCupNum

    // Base cc per cup size increase (approximate)
    // Modified based on body frame
    let ccPerCup = 175 // base value

    // Adjust based on chest width (frame size)
    if (chestWidthCm < 28) {
      ccPerCup = 150 // petite frame
    } else if (chestWidthCm >= 28 && chestWidthCm < 32) {
      ccPerCup = 175 // average frame
    } else if (chestWidthCm >= 32 && chestWidthCm < 36) {
      ccPerCup = 200 // larger frame
    } else {
      ccPerCup = 225 // very large frame
    }

    // Calculate base implant volume
    let baseVolume = cupIncrease * ccPerCup

    // Adjust for skin elasticity
    let elasticityFactor = 1.0
    if (skinElasticity === "tight") {
      elasticityFactor = 0.9 // Need smaller implant for tight skin
    } else if (skinElasticity === "loose") {
      elasticityFactor = 1.1 // Can accommodate larger implant
    }

    // Adjust for lifestyle
    let lifestyleFactor = 1.0
    if (lifestyle === "active") {
      lifestyleFactor = 0.95 // May prefer slightly smaller for activity
    } else if (lifestyle === "sedentary") {
      lifestyleFactor = 1.0 // No adjustment
    }

    // Adjust for implant profile
    let profileFactor = 1.0
    if (implantProfile === "low") {
      profileFactor = 1.15 // Need more volume for low profile
    } else if (implantProfile === "high") {
      profileFactor = 0.9 // Less volume needed for high profile
    } else if (implantProfile === "ultra-high") {
      profileFactor = 0.85 // Even less volume for ultra-high profile
    }

    // Apply all factors
    let calculatedVolume = baseVolume * elasticityFactor * lifestyleFactor * profileFactor

    // Round to nearest 25cc
    calculatedVolume = Math.round(calculatedVolume / 25) * 25

    // Create volume range (±50cc)
    const minVolume = Math.max(100, calculatedVolume - 50)
    const maxVolume = calculatedVolume + 50

    // Calculate implant dimensions based on volume
    // Approximate formulas based on typical implant geometries
    let diameter = 0
    let projection = 0

    if (implantProfile === "low") {
      diameter = Math.pow((calculatedVolume * 0.8), 0.33) * 2.5
      projection = calculatedVolume / (diameter * diameter * 0.7)
    } else if (implantProfile === "moderate") {
      diameter = Math.pow((calculatedVolume * 0.75), 0.33) * 2.4
      projection = calculatedVolume / (diameter * diameter * 0.6)
    } else if (implantProfile === "high") {
      diameter = Math.pow((calculatedVolume * 0.7), 0.33) * 2.3
      projection = calculatedVolume / (diameter * diameter * 0.5)
    } else {
      diameter = Math.pow((calculatedVolume * 0.65), 0.33) * 2.2
      projection = calculatedVolume / (diameter * diameter * 0.45)
    }

    // Calculate BMI for additional context
    const bmi = weightKg / Math.pow(heightCm / 100, 2)

    // Generate guidance based on inputs
    let guidance = []

    if (cupIncrease >= 3) {
      guidance.push(content?.guidance?.largeIncrease || "You're looking for a significant size increase. Consider gradual augmentation or consult about tissue expansion.")
    }

    if (skinElasticity === "tight" && cupIncrease >= 2) {
      guidance.push(content?.guidance?.tightSkin || "With tight skin elasticity, achieving larger sizes may require staged procedures for optimal results.")
    }

    if (lifestyle === "active" && calculatedVolume > 400) {
      guidance.push(content?.guidance?.activeLifestyle || "For an active lifestyle, consider how larger implants may affect physical activities and sports.")
    }

    if (chestWidthCm < 30 && calculatedVolume > 350) {
      guidance.push(content?.guidance?.petiteFrame || "Your petite frame may be better suited for moderate-sized implants for natural proportions.")
    }

    if (implantProfile === "high" || implantProfile === "ultra-high") {
      guidance.push(content?.guidance?.highProfile || "High-profile implants provide more forward projection with less width, ideal for narrower chest walls.")
    }

    setResult({
      volumeRange: `${minVolume}–${maxVolume} cc`,
      recommendedVolume: `${calculatedVolume} cc`,
      currentCup: currentCupSize,
      desiredCup: desiredCupSize,
      cupIncrease: cupIncrease,
      diameter: diameter.toFixed(1),
      projection: projection.toFixed(1),
      implantProfile: implantProfile,
      implantShape: implantShape,
      bmi: bmi.toFixed(1),
      guidance: guidance
    })
  }

  const resetForm = () => {
    setHeight("")
    setWeight("")
    setChestWidth("")
    setCurrentCupSize("B")
    setDesiredCupSize("D")
    setSkinElasticity("average")
    setLifestyle("moderate")
    setImplantProfile("moderate")
    setImplantShape("round")
    setResult(null)
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {content?.pageTitle || "Breast Implant Size Calculator"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content?.pageDescription || "Calculate your ideal breast implant size based on body measurements and aesthetic goals"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-pink-600" />
                  {content?.form?.title || "Calculate Your Implant Size"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Unit System Toggle */}
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                  <Button
                    variant={unitSystem === "imperial" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setUnitSystem("imperial")}
                    className={unitSystem === "imperial" ? "bg-pink-600 hover:bg-pink-700" : ""}
                  >
                    {content?.form?.unitSystems?.imperial || "Imperial (in, lbs)"}
                  </Button>
                  <Button
                    variant={unitSystem === "metric" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setUnitSystem("metric")}
                    className={unitSystem === "metric" ? "bg-pink-600 hover:bg-pink-700" : ""}
                  >
                    {content?.form?.unitSystems?.metric || "Metric (cm, kg)"}
                  </Button>
                </div>

                {/* Basic Measurements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="height" className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-pink-600" />
                      {content?.form?.labels?.height || "Height"} ({unitSystem === "metric" ? "cm" : "in"})
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={content?.form?.placeholders?.height || "Enter height"}
                      className={errors.height ? "border-red-500" : ""}
                    />
                    {errors.height && <p className="text-sm text-red-500 mt-1">{errors.height}</p>}
                  </div>

                  <div>
                    <Label htmlFor="weight">
                      {content?.form?.labels?.weight || "Weight"} ({unitSystem === "metric" ? "kg" : "lbs"})
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={content?.form?.placeholders?.weight || "Enter weight"}
                      className={errors.weight ? "border-red-500" : ""}
                    />
                    {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight}</p>}
                  </div>

                  <div>
                    <Label htmlFor="chestWidth">
                      {content?.form?.labels?.chestWidth || "Chest Width"} ({unitSystem === "metric" ? "cm" : "in"})
                    </Label>
                    <Input
                      id="chestWidth"
                      type="number"
                      value={chestWidth}
                      onChange={(e) => setChestWidth(e.target.value)}
                      placeholder={content?.form?.placeholders?.chestWidth || "Enter chest width"}
                      className={errors.chestWidth ? "border-red-500" : ""}
                    />
                    {errors.chestWidth && <p className="text-sm text-red-500 mt-1">{errors.chestWidth}</p>}
                  </div>
                </div>

                {/* Cup Sizes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentCup">{content?.form?.labels?.currentCupSize || "Current Cup Size"}</Label>
                    <Select value={currentCupSize} onValueChange={setCurrentCupSize}>
                      <SelectTrigger className={errors.currentCupSize ? "border-red-500" : ""}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cupSizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.currentCupSize && <p className="text-sm text-red-500 mt-1">{errors.currentCupSize}</p>}
                  </div>

                  <div>
                    <Label htmlFor="desiredCup">{content?.form?.labels?.desiredCupSize || "Desired Cup Size"}</Label>
                    <Select value={desiredCupSize} onValueChange={setDesiredCupSize}>
                      <SelectTrigger className={errors.desiredCupSize ? "border-red-500" : ""}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cupSizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.desiredCupSize && <p className="text-sm text-red-500 mt-1">{errors.desiredCupSize}</p>}
                  </div>
                </div>

                {/* Physical Characteristics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{content?.form?.labels?.skinElasticity || "Skin Elasticity"}</Label>
                    <Select value={skinElasticity} onValueChange={setSkinElasticity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tight">{content?.form?.skinElasticity?.tight || "Tight"}</SelectItem>
                        <SelectItem value="average">{content?.form?.skinElasticity?.average || "Average"}</SelectItem>
                        <SelectItem value="loose">{content?.form?.skinElasticity?.loose || "Loose"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{content?.form?.labels?.lifestyle || "Lifestyle"}</Label>
                    <Select value={lifestyle} onValueChange={setLifestyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">{content?.form?.lifestyle?.active || "Active/Athletic"}</SelectItem>
                        <SelectItem value="moderate">{content?.form?.lifestyle?.moderate || "Moderate"}</SelectItem>
                        <SelectItem value="sedentary">{content?.form?.lifestyle?.sedentary || "Sedentary"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Implant Characteristics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{content?.form?.labels?.implantProfile || "Implant Profile"}</Label>
                    <Select value={implantProfile} onValueChange={setImplantProfile}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{content?.form?.implantProfile?.low || "Low Profile"}</SelectItem>
                        <SelectItem value="moderate">{content?.form?.implantProfile?.moderate || "Moderate Profile"}</SelectItem>
                        <SelectItem value="high">{content?.form?.implantProfile?.high || "High Profile"}</SelectItem>
                        <SelectItem value="ultra-high">{content?.form?.implantProfile?.ultraHigh || "Ultra High Profile"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{content?.form?.labels?.implantShape || "Implant Shape"}</Label>
                    <Select value={implantShape} onValueChange={setImplantShape}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="round">{content?.form?.implantShape?.round || "Round"}</SelectItem>
                        <SelectItem value="teardrop">{content?.form?.implantShape?.teardrop || "Teardrop"}</SelectItem>
                        <SelectItem value="anatomical">{content?.form?.implantShape?.anatomical || "Anatomical"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={calculateImplantSize}
                    className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                  >
                    {content?.form?.buttons?.calculate || "Calculate Implant Size"}
                  </Button>
                  <Button onClick={resetForm} variant="outline">
                    {content?.form?.buttons?.reset || "Reset"}
                  </Button>
                </div>

                {/* Disclaimer */}
                <Alert className="bg-pink-50 border-pink-200">
                  <AlertCircle className="h-4 w-4 text-pink-600" />
                  <AlertDescription className="text-sm text-pink-800">
                    {content?.messages?.disclaimer || "This calculator provides estimates only. Always consult with a board-certified plastic surgeon for personalized recommendations."}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {result ? (
              <Card className="shadow-xl border-0 bg-gradient-to-br from-pink-50 to-purple-50 sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-pink-600" />
                    {content?.results?.title || "Your Results"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Volume Range */}
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{content?.results?.recommendedVolume || "Recommended Volume"}</p>
                    <p className="text-3xl font-bold text-pink-600">{result.recommendedVolume}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {content?.results?.range || "Range"}: {result.volumeRange}
                    </p>
                  </div>

                  {/* Cup Size Change */}
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">{content?.results?.cupSizeChange || "Cup Size Change"}</p>
                    <p className="text-2xl font-semibold">
                      {result.currentCup} → {result.desiredCup}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      +{result.cupIncrease} {result.cupIncrease === 1 ? "cup size" : "cup sizes"}
                    </p>
                  </div>

                  {/* Implant Dimensions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">{content?.results?.diameter || "Diameter"}</p>
                      <p className="text-xl font-semibold text-purple-600">{result.diameter} cm</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">{content?.results?.projection || "Projection"}</p>
                      <p className="text-xl font-semibold text-purple-600">{result.projection} cm</p>
                    </div>
                  </div>

                  {/* Implant Details */}
                  <div className="p-4 bg-white rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{content?.results?.profile || "Profile"}:</span>
                      <span className="font-medium capitalize">{result.implantProfile}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{content?.results?.shape || "Shape"}:</span>
                      <span className="font-medium capitalize">{result.implantShape}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">BMI:</span>
                      <span className="font-medium">{result.bmi}</span>
                    </div>
                  </div>

                  {/* Guidance */}
                  {result.guidance && result.guidance.length > 0 && (
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <p className="text-sm font-semibold text-pink-800 mb-2">
                        {content?.results?.professionalGuidance || "Professional Guidance"}
                      </p>
                      <ul className="space-y-2">
                        {result.guidance.map((item: string, index: number) => (
                          <li key={index} className="text-xs text-pink-700 flex gap-2">
                            <span className="text-pink-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-50 to-gray-100 sticky top-4">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500">
                    {content?.messages?.enterInformation || "Enter your measurements to see personalized recommendations"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {/* Comprehensive Educational Guide */}
        <div className="mt-12 space-y-8">
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Breast Implant Size Calculator: Your Ultimate Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none space-y-8">
              {/* Summary */}
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-pink-900 mb-3">Concise Summary</h3>
                <p className="text-gray-700">
                  A breast implant size calculator helps estimate the ideal implant size for your body, desired cup size, and proportions. Using factors like chest width, current breast volume, and desired augmentation, these calculators provide a visual and numerical guide. Popular tools include breast implant bra size calculators, cup size calculators, and visual simulators. Implant sizes are measured in cubic centimeters (cc) and range typically from 125cc to 800cc depending on goals and anatomy.
                </p>
              </div>

              {/* Implant Volume Reference Chart */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Implant Volume Reference Chart</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                    <thead className="bg-gradient-to-r from-pink-600 to-purple-600">
                      <tr>
                        <th className="px-6 py-3 text-left text-white font-semibold">Implant Volume (cc)</th>
                        <th className="px-6 py-3 text-left text-white font-semibold">Approximate Cup Size Increase</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-6 py-3">150-200 cc</td><td className="px-6 py-3">0.5 – 1 cup size</td></tr>
                      <tr className="bg-gray-50"><td className="px-6 py-3">250-300 cc</td><td className="px-6 py-3">1 – 1.5 cup sizes</td></tr>
                      <tr><td className="px-6 py-3">300-350 cc</td><td className="px-6 py-3">1.5 – 2 cup sizes</td></tr>
                      <tr className="bg-gray-50"><td className="px-6 py-3">400-450 cc</td><td className="px-6 py-3">2 – 2.5 cup sizes</td></tr>
                      <tr><td className="px-6 py-3">500-600 cc</td><td className="px-6 py-3">2.5 – 3 cup sizes</td></tr>
                      <tr className="bg-gray-50"><td className="px-6 py-3">650-800 cc</td><td className="px-6 py-3">3+ cup sizes</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* What is Breast Augmentation */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What is Breast Augmentation?</h3>
                <p className="text-gray-700 mb-3">Breast augmentation is a cosmetic procedure that uses implants to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Increase breast volume (e.g., going from an A cup to a C cup)</li>
                  <li>Restore breast volume lost after pregnancy or weight changes</li>
                  <li>Improve breast symmetry and shape</li>
                </ul>
                <p className="text-gray-700 mt-3">The ultimate goal is aesthetic harmony, ensuring your breasts complement your body frame, chest width, and natural proportions.</p>
              </div>

              {/* Understanding Breast Implant Sizing */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Breast Implant Sizing</h3>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Why Implant Volume Matters</h4>
                <p className="text-gray-700 mb-3">Implant size is measured in cubic centimeters (cc), which is far more accurate than bra cup sizing. Cup sizes vary between brands and countries, but cc provides a standardized measurement surgeons rely on.</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                  <li>150–200cc → ~1 cup increase</li>
                  <li>250–300cc → ~1.5 cup increase</li>
                  <li>350–400cc → ~2 cup increase</li>
                </ul>
                <p className="text-gray-700 font-semibold">Important:</p>
                <p className="text-gray-700">The same implant volume will look different on different body frames. For example, a 350cc implant on a petite 32-inch band may appear as a D cup, while on a 38-inch band, it may look like a C cup.</p>
              </div>

              {/* Breast Implant Size Comparison Chart */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Breast Implant Size Comparison Chart</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow mb-4">
                    <thead className="bg-gradient-to-r from-pink-600 to-purple-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-white font-semibold">Implant Volume (cc)</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Profile</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Approx. Cup Size Increase</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Appearance / Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-4 py-3">100–150 cc</td><td className="px-4 py-3">Mini</td><td className="px-4 py-3">A → Small B</td><td className="px-4 py-3">Subtle, natural increase</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3">150–250 cc</td><td className="px-4 py-3">Demi</td><td className="px-4 py-3">A → B</td><td className="px-4 py-3">Moderate, natural look</td></tr>
                      <tr><td className="px-4 py-3">250–350 cc</td><td className="px-4 py-3">Demi / Full</td><td className="px-4 py-3">B → C</td><td className="px-4 py-3">Noticeable fullness</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3">350–450 cc</td><td className="px-4 py-3">Full</td><td className="px-4 py-3">C → D</td><td className="px-4 py-3">Fuller, more projection</td></tr>
                      <tr><td className="px-4 py-3">450–550 cc</td><td className="px-4 py-3">Full / Corsé</td><td className="px-4 py-3">D → DD</td><td className="px-4 py-3">Large, very full</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3">550–700+ cc</td><td className="px-4 py-3">Corsé</td><td className="px-4 py-3">DD → E+</td><td className="px-4 py-3">Very large, dramatic projection</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Breast Implant Cup Size Chart */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Breast Implant Cup Size Chart</h3>
                <img src="/images/breast-implant-cup-size-chart.jpeg" alt="Breast Implant Cup Size Chart" className="w-full rounded-lg shadow-lg mb-4" />
                <p className="text-gray-700">Volume to Cup Size Guide showing the relationship between desired results and implant volumes needed.</p>
              </div>

              {/* Breast Implant Size Calculator Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Breast Implant Size Calculator</h3>
                <p className="text-gray-700 mb-3">A breast implant calculator simplifies your size selection by converting your desired cup size into cc volume. Most calculators consider:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Current band and cup size</li>
                  <li>Desired cup size</li>
                  <li>Chest width and frame</li>
                  <li>Existing breast tissue</li>
                </ul>
                <p className="text-gray-700 mt-3 font-semibold">Pro Tip:</p>
                <p className="text-gray-700">Use a breast implant bra size calculator or breast implant cup size calculator for preliminary planning, but always consult a certified surgeon for final recommendations.</p>
              </div>

              {/* Breast Enlargement Size Chart */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Breast Enlargement Size Chart</h3>
                <img src="/images/breast-enlargement-size-chart.jpeg" alt="Breast Enlargement Size Chart" className="w-full rounded-lg shadow-lg mb-4" />
                <p className="text-gray-700">Visual comparison showing breast sizes from A cup through H cup on different body frames, demonstrating how the same cup size appears different based on individual anatomy.</p>
              </div>

              {/* Implant Volume, Diameter, and Profile */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Implant Volume, Diameter, and Profile</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                    <thead className="bg-gradient-to-r from-pink-600 to-purple-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-white font-semibold">Feature</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">What It Means</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Surgical Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-4 py-3 font-medium">Volume (cc)</td><td className="px-4 py-3">Total implant size</td><td className="px-4 py-3">Determines cup increase</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">Diameter (mm/cm)</td><td className="px-4 py-3">Implant width across the chest</td><td className="px-4 py-3">Must match your breast base width</td></tr>
                      <tr><td className="px-4 py-3 font-medium">Projection/Profile</td><td className="px-4 py-3">How far implant protrudes from chest</td><td className="px-4 py-3">Low, Moderate, High profiles affect shape</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3 font-medium">Shape</td><td className="px-4 py-3">Round vs Teardrop</td><td className="px-4 py-3">Round gives upper fullness; teardrop mimics natural slope</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 mb-2 font-semibold">Example:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                  <li>350cc, 12cm diameter, moderate profile → balanced, natural enhancement</li>
                  <li>350cc, 12cm diameter, high profile → more forward projection</li>
                </ul>
                <p className="text-gray-700">Matching implant diameter to your chest base width is critical. Too wide → implants may extend to armpits; too narrow → unnatural look.</p>
              </div>

              {/* Breast Implant Types */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Breast Implant Types</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                    <thead className="bg-gradient-to-r from-pink-600 to-purple-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-white font-semibold">Implant Type</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Fill Material</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Weight</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Pros</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Cons</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium">Silicone</td>
                        <td className="px-4 py-3">Cohesive gel</td>
                        <td className="px-4 py-3">0.8 lbs / 350cc</td>
                        <td className="px-4 py-3">Natural feel, less visible rippling</td>
                        <td className="px-4 py-3">Slightly heavier, larger incision</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">Saline</td>
                        <td className="px-4 py-3">Sterile salt water</td>
                        <td className="px-4 py-3">0.77 lbs / 350cc</td>
                        <td className="px-4 py-3">Can adjust volume during surgery, smaller incision</td>
                        <td className="px-4 py-3">Less natural feel, more prone to rippling</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700">Advanced options like Motiva implants offer new-generation silicone gels that mimic natural breast movement.</p>
              </div>

              {/* Silicone Implant Size Chart */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Silicone Implant Size Chart</h3>
                <img src="/images/silicone-size-chart.jpeg" alt="Silicone Implant Size Chart" className="w-full rounded-lg shadow-lg mb-4" />
                <p className="text-gray-700">This chart shows silicone implant volumes across different profiles: Moderate (low projection), Moderate Plus (medium projection), High (increased projection), and Ultra High (maximum projection). Each profile affects the final appearance and projection from the chest wall.</p>
              </div>

              {/* Implant Placement Options */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Implant Placement Options</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                    <thead className="bg-gradient-to-r from-pink-600 to-purple-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-white font-semibold">Placement</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Location</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Benefits</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Considerations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium">Subglandular</td>
                        <td className="px-4 py-3">Above muscle, below breast tissue</td>
                        <td className="px-4 py-3">Faster recovery, easier surgery</td>
                        <td className="px-4 py-3">May show rippling if tissue is thin</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium">Submuscular/Dual-plane</td>
                        <td className="px-4 py-3">Partially under chest muscle</td>
                        <td className="px-4 py-3">More natural slope, reduced rippling</td>
                        <td className="px-4 py-3">Longer recovery, may affect muscle movement</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Choosing the Right Implant Size */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Choosing the Right Implant Size</h3>
                <p className="text-gray-700 mb-3 font-semibold">Factors to Consider:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Body Frame and Chest Width</strong> – Taller or wider-chested individuals can often support larger implants.</li>
                  <li><strong>Existing Breast Tissue</strong> – Less tissue may require smaller implants or submuscular placement.</li>
                  <li><strong>Skin Elasticity</strong> – Determines how well the skin stretches to accommodate volume.</li>
                  <li><strong>Lifestyle & Activity</strong> – Athletes or physically active people may prefer smaller or moderate-profile implants.</li>
                  <li><strong>Aesthetic Goals</strong> – Subtle vs dramatic enhancement. Bring photos of results you like.</li>
                </ul>
              </div>

              {/* Breast Implant Size Chart CC */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Breast Implant Size Chart CC to Approximate Cup Increase</h3>
                <img src="/images/breast-implant-cc-chart.jpeg" alt="Breast Implant Size Chart CC" className="w-full rounded-lg shadow-lg mb-4" />
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                    <thead className="bg-gradient-to-r from-pink-600 to-purple-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-white font-semibold">Implant Volume (cc)</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Approximate Cup Increase</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-4 py-3">100–150</td><td className="px-4 py-3">~0.5 cup</td><td className="px-4 py-3">Very subtle enhancement</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3">150–200</td><td className="px-4 py-3">~1 cup</td><td className="px-4 py-3">Natural-looking increase</td></tr>
                      <tr><td className="px-4 py-3">250–300</td><td className="px-4 py-3">~1.5 cups</td><td className="px-4 py-3">Moderate enhancement</td></tr>
                      <tr className="bg-gray-50"><td className="px-4 py-3">350–400</td><td className="px-4 py-3">~2 cups</td><td className="px-4 py-3">Noticeable, full effect</td></tr>
                      <tr><td className="px-4 py-3">450–500</td><td className="px-4 py-3">~2.5–3 cups</td><td className="px-4 py-3">Dramatic change, only suitable for larger frames</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700">This chart is a guideline. Final results depend on chest width, tissue, and implant placement.</p>
              </div>

              {/* Breast Implant Size Visualizers & Simulators */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Breast Implant Size Visualizers & Simulators</h3>
                <p className="text-gray-700 mb-3">Modern clinics use 3D simulation software to visualize implants:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Compare sizes (e.g., 300cc vs 400cc)</li>
                  <li>See different profiles (low, moderate, high)</li>
                  <li>Preview results from multiple angles</li>
                </ul>
                <p className="text-gray-700 mt-3">This tool improves confidence and communication between patient and surgeon.</p>
              </div>

              {/* Breast Implant Size Chart Motiva */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Breast Implant Size Chart Motiva</h3>
                <img src="/images/motiva.jpeg" alt="Breast Implant Size Chart Motiva" className="w-full rounded-lg shadow-lg mb-4" />
                <p className="text-gray-700 mb-3">Motiva breast implants are measured in cubic centimeters (cc), which indicates the volume of the implant. However, the final appearance depends not only on cc but also on the implant profile (Mini, Demi, Full, Corsé) and base width, which must match your natural breast/chest size.</p>
                <p className="text-gray-700 mb-3 font-semibold">Points:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                  <li><strong>Volume (cc):</strong> 100–700+ cc; measures silicone inside implant.</li>
                  <li><strong>Profiles:</strong>
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Mini → low projection, subtle</li>
                      <li>Demi → moderate, natural</li>
                      <li>Full → higher, fuller look</li>
                      <li>Corsé → maximum projection, dramatic</li>
                    </ul>
                  </li>
                  <li><strong>Base width:</strong> Should match your breast/chest width for natural fit.</li>
                  <li><strong>Appearance by cc (approx.):</strong>
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>100–250 cc → small increase (A→B)</li>
                      <li>250–350 cc → moderate increase (B→C)</li>
                      <li>350–450 cc → noticeable (C→D)</li>
                      <li>450–550 cc → large (D→DD)</li>
                      <li>550–700+ cc → very large (DD→E+)</li>
                    </ul>
                  </li>
                  <li><strong>Important:</strong> Same cc looks different on different people due to chest width, tissue thickness, and implant profile.</li>
                  <li><strong>Tip:</strong> Surgeons use sizers to try different sizes/profiles before surgery.</li>
                </ul>
              </div>

              {/* Breast Implant Post-Operative Care */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Breast Implant Post-Operative Care</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Wear surgical bras 24/7 for first weeks</li>
                  <li>Avoid lifting heavy objects or intense exercise</li>
                  <li>Expect "drop and fluff" process: 3–6 months for implants to settle</li>
                  <li>Professional bra fitting after healing is essential</li>
                  <li>Monitor implant health over years; consider potential replacement</li>
                </ul>
              </div>

              {/* Common Questions About Implant Sizing */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Questions About Implant Sizing</h3>
                <div className="space-y-4">
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="font-semibold text-pink-900 mb-2">Q1: What is the most common breast implant size?</p>
                    <p className="text-gray-700">Typically 300–400cc for an average frame (1.5–2 cup increase)</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-semibold text-purple-900 mb-2">Q2: Can I breastfeed after implants?</p>
                    <p className="text-gray-700">Yes, especially with inframammary (under-breast) incisions</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="font-semibold text-pink-900 mb-2">Q3: How long does it take for implants to settle?</p>
                    <p className="text-gray-700">3–6 months for final position and softness</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-semibold text-purple-900 mb-2">Q4: How do I choose between small and large implants?</p>
                    <p className="text-gray-700">Balance aesthetic goals, lifestyle, and body frame. Smaller implants → natural look, larger → more dramatic.</p>
                  </div>
                </div>
              </div>

              {/* Expert Insights */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Insights</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Dr. Anca Breahna (UK)</strong> – Emphasizes natural, proportional results tailored to anatomy</li>
                  <li><strong>Dr. Craig Rubinstein (Melbourne)</strong> – Advocate of 3D imaging and implant width matching</li>
                  <li><strong>Dr. Juan Carlos</strong> – Breast reconstruction specialist highlighting natural slope and contour</li>
                </ul>
                <p className="text-gray-700 mt-3">Modern aesthetic surgery combines technical expertise, visualization, and patient-first planning.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Section */}
        <div className="mt-12">
          <RatingProfileSection
            entityId="breast-implant-size-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
        </div>
      </div>
    </div>
  )
}
