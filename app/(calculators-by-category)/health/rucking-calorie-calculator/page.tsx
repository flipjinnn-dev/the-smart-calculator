"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Calculator, RotateCcw, Backpack, Clock, Weight, Flame, TrendingUp } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

// Terrain factors for Pandolf equation
const terrainFactors: { [key: string]: number } = {
  "flat-pavement": 1.0,
  "gravel": 1.2,
  "trail": 1.5,
  "sand": 1.8
};

export default function RuckingCalorieCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('rucking-calorie-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('rucking-calorie-calculator', language, "calculator-guide");

  const contentData = content || {
    "pageTitle": "Rucking Calorie Calculator",
    "pageDescription": "Calculate calories burned during weighted walks (rucking) using the Pandolf equation"
  };

  const guideData = guideContent || { color: 'purple', sections: [], faq: [] };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [bodyWeight, setBodyWeight] = useState("");
  const [bodyWeightUnit, setBodyWeightUnit] = useState("kg");
  const [ruckWeight, setRuckWeight] = useState("");
  const [ruckWeightUnit, setRuckWeightUnit] = useState("kg");
  const [paceValue, setPaceValue] = useState("");
  const [paceUnit, setPaceUnit] = useState("min-mile");
  const [durationValue, setDurationValue] = useState("");
  const [durationUnit, setDurationUnit] = useState("minutes");
  const [terrain, setTerrain] = useState("flat-pavement");
  const [grade, setGrade] = useState("");

  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    
    const bodyWeightNum = Number.parseFloat(bodyWeight);
    if (!bodyWeight || bodyWeightNum <= 0 || bodyWeightNum > 500) {
      newErrors.bodyWeight = "Please enter a valid body weight (1-500)";
    }

    const ruckWeightNum = Number.parseFloat(ruckWeight);
    if (!ruckWeight || ruckWeightNum < 0 || ruckWeightNum > 200) {
      newErrors.ruckWeight = "Please enter a valid ruck weight (0-200)";
    }

    const paceNum = Number.parseFloat(paceValue);
    if (!paceValue || paceNum <= 0) {
      newErrors.pace = "Please enter a valid pace";
    } else if (paceUnit === "min-mile" && (paceNum < 10 || paceNum > 30)) {
      newErrors.pace = "Pace should be between 10-30 min/mile";
    } else if (paceUnit === "km-h" && (paceNum < 2 || paceNum > 8)) {
      newErrors.pace = "Pace should be between 2-8 km/h";
    }

    const durationNum = Number.parseFloat(durationValue);
    if (!durationValue || durationNum <= 0 || durationNum > 24) {
      newErrors.duration = "Please enter a valid duration";
    }

    const gradeNum = Number.parseFloat(grade);
    if (grade && (gradeNum < -50 || gradeNum > 50)) {
      newErrors.grade = "Grade should be between -50% and 50%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCalories = () => {
    if (!validateInputs()) return;
    
    try {
      // Convert all inputs to metric
      let W = Number.parseFloat(bodyWeight);
      if (bodyWeightUnit === "lbs") {
        W = W * 0.453592;
      }

      let L = Number.parseFloat(ruckWeight);
      if (ruckWeightUnit === "lbs") {
        L = L * 0.453592;
      }

      // Convert pace to m/s
      let v = 0;
      if (paceUnit === "min-mile") {
        const minPerMile = Number.parseFloat(paceValue);
        const milesPerHour = 60 / minPerMile;
        const metersPerSecond = (milesPerHour * 1609.34) / 3600;
        v = metersPerSecond;
      } else {
        const kmPerHour = Number.parseFloat(paceValue);
        v = (kmPerHour * 1000) / 3600;
      }

      // Convert duration to hours
      let durationHours = Number.parseFloat(durationValue);
      if (durationUnit === "minutes") {
        durationHours = durationHours / 60;
      }

      // Get terrain factor
      const terrainFactor = terrainFactors[terrain];

      // Get grade (default to 0 if not provided)
      const gradePercent = grade ? Number.parseFloat(grade) : 0;
      const gradeDecimal = gradePercent / 100;

      // Calculate load ratio
      const loadRatio = L / W;

      // Pandolf Equation:
      // M = 1.5*W + 2.0*(W+L)*(L/W)^2 + terrainFactor*(W+L)*(1.5*v^2 + 0.35*v*grade)
      const M = 1.5 * W + 
                2.0 * (W + L) * Math.pow(loadRatio, 2) + 
                terrainFactor * (W + L) * (1.5 * Math.pow(v, 2) + 0.35 * v * gradeDecimal);

      // Convert M (watts) to calories per hour
      // 1 watt = 0.000239006 kcal/second
      // calories/hour = M * 0.000239006 * 3600
      const caloriesPerHour = M * 0.000239006 * 3600;
      
      // Total calories burned
      const totalCalories = caloriesPerHour * durationHours;

      // Calculate baseline walking (no load, flat terrain)
      const baselineM = 1.5 * W + terrainFactor * W * (1.5 * Math.pow(v, 2));
      const baselineCaloriesPerHour = baselineM * 0.000239006 * 3600;
      const baselineTotal = baselineCaloriesPerHour * durationHours;

      // Calculate calories added by ruck weight
      const ruckAddedM = 2.0 * (W + L) * Math.pow(loadRatio, 2) + terrainFactor * L * (1.5 * Math.pow(v, 2));
      const ruckAddedCaloriesPerHour = ruckAddedM * 0.000239006 * 3600;
      const ruckAddedTotal = ruckAddedCaloriesPerHour * durationHours;

      // Calculate grade effect
      const gradeEffectM = terrainFactor * (W + L) * 0.35 * v * gradeDecimal;
      const gradeEffectCaloriesPerHour = gradeEffectM * 0.000239006 * 3600;
      const gradeEffectTotal = gradeEffectCaloriesPerHour * durationHours;

      // Convert pace for display
      let paceDisplay = "";
      let paceImperial = "";
      let paceMetric = "";
      
      if (paceUnit === "min-mile") {
        paceDisplay = `${paceValue} min/mile`;
        paceImperial = `${paceValue} min/mile`;
        const kmh = (60 / Number.parseFloat(paceValue)) * 1.60934;
        paceMetric = `${kmh.toFixed(2)} km/h`;
      } else {
        paceDisplay = `${paceValue} km/h`;
        paceMetric = `${paceValue} km/h`;
        const milesPerHour = Number.parseFloat(paceValue) / 1.60934;
        const minPerMile = 60 / milesPerHour;
        paceImperial = `${minPerMile.toFixed(2)} min/mile`;
      }

      const results = {
        totalCalories: Math.round(totalCalories),
        caloriesPerHour: Math.round(caloriesPerHour),
        bodyWeight: bodyWeightUnit === "kg" ? `${bodyWeight} kg` : `${bodyWeight} lbs`,
        bodyWeightKg: Math.round(W * 100) / 100,
        bodyWeightLbs: Math.round(W * 2.20462 * 100) / 100,
        ruckWeight: ruckWeightUnit === "kg" ? `${ruckWeight} kg` : `${ruckWeight} lbs`,
        ruckWeightKg: Math.round(L * 100) / 100,
        ruckWeightLbs: Math.round(L * 2.20462 * 100) / 100,
        loadRatio: Math.round(loadRatio * 100),
        pace: paceDisplay,
        paceImperial,
        paceMetric,
        paceMs: Math.round(v * 100) / 100,
        duration: durationUnit === "minutes" ? `${durationValue} min` : `${durationValue} hrs`,
        durationHours: Math.round(durationHours * 100) / 100,
        terrain: terrain.replace('-', ' '),
        terrainFactor,
        grade: gradePercent,
        metabolicRate: Math.round(M),
        baselineCalories: Math.round(baselineTotal),
        ruckAddedCalories: Math.round(ruckAddedTotal),
        gradeEffectCalories: Math.round(gradeEffectTotal)
      };

      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating calories. Please check your inputs and try again."
      });
    }
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };

  const resetCalculator = () => {
    setBodyWeight("");
    setBodyWeightUnit("kg");
    setRuckWeight("");
    setRuckWeightUnit("kg");
    setPaceValue("");
    setPaceUnit("min-mile");
    setDurationValue("");
    setDurationUnit("minutes");
    setTerrain("flat-pavement");
    setGrade("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };

  return <>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Backpack className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle || "Rucking Calorie Calculator"}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription || "Calculate calories burned during weighted walks using the Pandolf equation"}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-purple-600" />
                    <span>{contentData.calculator_inputs || "Calculator Inputs"}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_your_details || "Enter your body weight, ruck weight, pace, and duration"}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>}

                  <div className="space-y-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.body_weight || "Body Weight"}</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Weight className="h-5 w-5 text-purple-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.bodyWeight ? "border-red-300" : ""}`} type="number" placeholder="70" value={bodyWeight} onChange={e => setBodyWeight(e.target.value)} />
                          </div>
                          <RadioGroup value={bodyWeightUnit} onValueChange={setBodyWeightUnit} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="kg" id="body-kg" />
                              <Label htmlFor="body-kg" className="cursor-pointer">{contentData.kg || "kg"}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="lbs" id="body-lbs" />
                              <Label htmlFor="body-lbs" className="cursor-pointer">{contentData.lbs || "lbs"}</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        {errors.bodyWeight && <p className="text-red-600 text-xs mt-1">{errors.bodyWeight}</p>}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.ruck_weight || "Ruck/Pack Weight"}</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Backpack className="h-5 w-5 text-purple-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.ruckWeight ? "border-red-300" : ""}`} type="number" placeholder="20" value={ruckWeight} onChange={e => setRuckWeight(e.target.value)} />
                          </div>
                          <RadioGroup value={ruckWeightUnit} onValueChange={setRuckWeightUnit} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="kg" id="ruck-kg" />
                              <Label htmlFor="ruck-kg" className="cursor-pointer">{contentData.kg || "kg"}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="lbs" id="ruck-lbs" />
                              <Label htmlFor="ruck-lbs" className="cursor-pointer">{contentData.lbs || "lbs"}</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        {errors.ruckWeight && <p className="text-red-600 text-xs mt-1">{errors.ruckWeight}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.pace || "Pace"}</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <Input className={`h-12 ${errors.pace ? "border-red-300" : ""}`} type="number" step="0.1" placeholder={paceUnit === "min-mile" ? "15" : "5"} value={paceValue} onChange={e => setPaceValue(e.target.value)} />
                          </div>
                          <Select value={paceUnit} onValueChange={setPaceUnit}>
                            <SelectTrigger className="w-32 h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="min-mile">{contentData.min_mile || "min/mile"}</SelectItem>
                              <SelectItem value="km-h">{contentData.km_h || "km/h"}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.pace && <p className="text-red-600 text-xs mt-1">{errors.pace}</p>}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.duration || "Duration"}</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Clock className="h-5 w-5 text-purple-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.duration ? "border-red-300" : ""}`} type="number" step="0.1" placeholder="60" value={durationValue} onChange={e => setDurationValue(e.target.value)} />
                          </div>
                          <Select value={durationUnit} onValueChange={setDurationUnit}>
                            <SelectTrigger className="w-32 h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="minutes">{contentData.minutes || "minutes"}</SelectItem>
                              <SelectItem value="hours">{contentData.hours || "hours"}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.duration && <p className="text-red-600 text-xs mt-1">{errors.duration}</p>}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.terrain_type || "Terrain Type"}</Label>
                      <Select value={terrain} onValueChange={setTerrain}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flat-pavement">{contentData.flat_pavement || "Flat Pavement"} (1.0x)</SelectItem>
                          <SelectItem value="gravel">{contentData.gravel || "Gravel"} (1.2x)</SelectItem>
                          <SelectItem value="trail">{contentData.trail || "Trail"} (1.5x)</SelectItem>
                          <SelectItem value="sand">{contentData.sand || "Sand"} (1.8x)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.grade_optional || "Grade/Slope (Optional)"}</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <TrendingUp className="h-5 w-5 text-purple-500" />
                        </div>
                        <Input className={`h-12 pl-10 ${errors.grade ? "border-red-300" : ""}`} type="number" step="0.1" placeholder="0" value={grade} onChange={e => setGrade(e.target.value)} />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                      </div>
                      {errors.grade && <p className="text-red-600 text-xs mt-1">{errors.grade}</p>}
                      <p className="text-xs text-gray-500 mt-1">{contentData.grade_hint || "Positive for uphill, negative for downhill"}</p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={calculateCalories} className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">{contentData.calculate || "Calculate"}</Button>
                    <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent">
                      <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset || "Reset"}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:block">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-blue-100 h-full flex flex-col justify-center items-center p-8">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-3 shadow-lg">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.calories_burned || "Calories Burned"}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center space-y-3 w-full">
                    <div className="bg-white p-6 rounded-lg border border-purple-200">
                      <p className="text-3xl font-bold text-purple-900 mb-2">{result.totalCalories} {contentData.kcal || "kcal"}</p>
                      <p className="text-sm font-medium text-gray-600">{contentData.total_calories || "Total Calories"}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {result.caloriesPerHour} {contentData.kcal_hr || "kcal/hr"}
                      </p>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Backpack className="w-8 h-8 text-purple-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_details_to_calculate || "Enter your details to calculate calories burned"}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {showResult && result && <div className="mt-8">
            <Card ref={resultsRef} className="shadow-2xl border-0 bg-white p-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Flame className="w-6 h-6 text-purple-600" />
                  <span>{contentData.detailed_results || "Detailed Results"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
                    <h3 className="text-xl font-bold text-purple-700 mb-4">{contentData.calories_summary || "Calories Summary"}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{contentData.total_burned || "Total Burned"}:</span>
                        <span className="text-2xl font-bold text-purple-900">{result.totalCalories} {contentData.kcal || "kcal"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{contentData.per_hour || "Per Hour"}:</span>
                        <span className="text-lg font-semibold text-purple-700">{result.caloriesPerHour} {contentData.kcal_hr || "kcal/hr"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{contentData.metabolic_rate || "Metabolic Rate"}:</span>
                        <span className="text-lg font-semibold text-purple-700">{result.metabolicRate} {contentData.watts || "watts"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-700 mb-4">{contentData.input_summary || "Input Summary"}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{contentData.body_weight || "Body Weight"}:</span>
                        <span className="font-semibold text-gray-700">{result.bodyWeightKg} kg / {result.bodyWeightLbs} lbs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{contentData.ruck_weight || "Ruck Weight"}:</span>
                        <span className="font-semibold text-gray-700">{result.ruckWeightKg} kg / {result.ruckWeightLbs} lbs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{contentData.load_ratio || "Load Ratio"}:</span>
                        <span className="font-semibold text-gray-700">{result.loadRatio}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{contentData.pace || "Pace"}:</span>
                        <span className="font-semibold text-gray-700">{result.paceImperial} / {result.paceMetric}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{contentData.duration || "Duration"}:</span>
                        <span className="font-semibold text-gray-700">{result.durationHours} {contentData.hours || "hours"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{contentData.terrain || "Terrain"}:</span>
                        <span className="font-semibold text-gray-700 capitalize">{result.terrain}</span>
                      </div>
                      {result.grade !== 0 && <div className="flex justify-between">
                        <span className="text-gray-600">{contentData.grade || "Grade"}:</span>
                        <span className="font-semibold text-gray-700">{result.grade}%</span>
                      </div>}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-semibold text-purple-700 mb-6">{contentData.calorie_breakdown || "Calorie Breakdown"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">{contentData.baseline_walking || "Baseline Walking"}</h4>
                      <p className="text-2xl font-bold text-green-900">{result.baselineCalories} {contentData.kcal || "kcal"}</p>
                      <p className="text-xs text-gray-600 mt-1">{contentData.baseline_desc || "Calories from walking without load"}</p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-700 mb-2">{contentData.ruck_weight_added || "Load & Movement Cost"}</h4>
                      <p className="text-2xl font-bold text-orange-900">+{result.ruckAddedCalories} {contentData.kcal || "kcal"}</p>
                      <p className="text-xs text-gray-600 mt-1">{contentData.ruck_desc || "Additional metabolic cost from load carriage and movement inefficiency"}</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">{contentData.terrain_grade_effect || "Terrain & Grade"}</h4>
                      <p className="text-2xl font-bold text-blue-900">{result.gradeEffectCalories >= 0 ? '+' : ''}{result.gradeEffectCalories} {contentData.kcal || "kcal"}</p>
                      <p className="text-xs text-gray-600 mt-1">{contentData.terrain_desc || "Effect of terrain and slope"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-3">{contentData.pandolf_equation || "Pandolf Equation"}</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-mono text-xs bg-white p-3 rounded border">
                      M = 1.5W + 2.0(W+L)(L/W)² + η(W+L)(1.5v² + 0.35vG)
                    </p>
                    <p className="text-xs text-gray-600">
                      {contentData.where || "Where"}: W = {contentData.body_weight_text || "body weight"}, L = {contentData.load_text || "load"}, v = {contentData.velocity_text || "velocity"}, G = {contentData.grade_text || "grade"}, η = {contentData.terrain_factor_text || "terrain factor"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}

          <SimilarCalculators calculators={[{
            calculatorName: "Calories Burned Calculator",
            calculatorHref: "/health/calories-burned-calculator",
            calculatorDescription: "Estimate calories burned during various physical activities"
          }, {
            calculatorName: "BMR Calculator",
            calculatorHref: "/health/bmr-calculator",
            calculatorDescription: "Calculate your Basal Metabolic Rate"
          }, {
            calculatorName: "TDEE Calculator",
            calculatorHref: "/health/tdee-calculator",
            calculatorDescription: "Calculate Total Daily Energy Expenditure"
          }]} color="purple" title="Related Health Calculators" />

        </div>

        
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="rucking-calorie-calculator"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <div className="mt-8">
          <CalculatorGuide data={guideData} />
        </div>
      </main>
    </div>
  </>;
}
