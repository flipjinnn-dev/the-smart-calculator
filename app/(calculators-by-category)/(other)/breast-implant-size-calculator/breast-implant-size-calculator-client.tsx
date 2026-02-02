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
import CalculatorGuide from "@/components/calculator-guide"
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

        {/* Educational Guide */}
        {guideContent && (
          <div className="mt-12">
            <CalculatorGuide data={guideContent} />
          </div>
        )}

        {/* Rating Section */}
        <div className="mt-12">
          <RatingProfileSection 
            entityId="breast-implant-size-calculator"
            entityType="calculator"
            creatorSlug="zahan-munshi"
          />
        </div>
      </div>
    </div>
  )
}
