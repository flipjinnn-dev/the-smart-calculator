"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Calculator, RotateCcw, Apple, Activity, Target, TrendingUp, Zap } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;

interface CarbohydrateCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function CarbohydrateCalculatorClient({ content, guideContent }: CarbohydrateCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [bmrFormula, setBmrFormula] = useState("mifflin");
  const [bodyFat, setBodyFat] = useState("");
  const [unitSystem, setUnitSystem] = useState("us"); // us or metric

  const activityLevels = [{
    value: "sedentary",
    label: "Sedentary",
    multiplier: 1.2,
    description: "Little/no exercise"
  }, {
    value: "light",
    label: "Light",
    multiplier: 1.375,
    description: "Light exercise 1-3×/week"
  }, {
    value: "moderate",
    label: "Moderate",
    multiplier: 1.55,
    description: "Moderate exercise 4-5×/week"
  }, {
    value: "active",
    label: "Active",
    multiplier: 1.725,
    description: "Heavy exercise daily or 3-4× intense"
  }, {
    value: "very_active",
    label: "Very Active",
    multiplier: 1.9,
    description: "Very heavy exercise 6-7×/week"
  }, {
    value: "extra_active",
    label: "Extra Active",
    multiplier: 2.0,
    description: "Very intense exercise/physical job"
  }];
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const ageNum = Number.parseInt(age);
    if (!age || ageNum < 18 || ageNum > 80) {
      newErrors.age = "Age must be between 18 and 80 years";
    }
    if (unitSystem === "us") {
      const ftNum = Number.parseInt(heightFt);
      const inNum = Number.parseInt(heightIn);
      const weightNum = Number.parseFloat(weightLbs);
      if (!heightFt || ftNum < 3 || ftNum > 8) {
        newErrors.heightFt = "Height must be between 3-8 feet";
      }
      if (!heightIn || inNum < 0 || inNum > 11) {
        newErrors.heightIn = "Inches must be between 0-11";
      }
      if (!weightLbs || weightNum <= 0 || weightNum > 500) {
        newErrors.weightLbs = "Weight must be between 1-500 lbs";
      }
    } else {
      const heightNum = Number.parseFloat(heightCm);
      const weightNum = Number.parseFloat(weightKg);
      if (!heightCm || heightNum < 100 || heightNum > 250) {
        newErrors.heightCm = "Height must be between 100-250 cm";
      }
      if (!weightKg || weightNum <= 0 || weightNum > 200) {
        newErrors.weightKg = "Weight must be between 1-200 kg";
      }
    }
    if (!activityLevel) {
      newErrors.activityLevel = "Please select an activity level";
    }
    if (bmrFormula === "katch" && (!bodyFat || Number.parseFloat(bodyFat) <= 0 || Number.parseFloat(bodyFat) >= 50)) {
      newErrors.bodyFat = "Body fat percentage must be between 1-49%";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateCarbohydrates = () => {
    if (!validateInputs()) return;
    try {
      const ageNum = Number.parseInt(age);
      let heightCmNum = 0;
      let weightKgNum = 0;

      // Convert to metric for calculations
      if (unitSystem === "us") {
        const ftNum = Number.parseInt(heightFt);
        const inNum = Number.parseInt(heightIn);
        heightCmNum = (ftNum * 12 + inNum) * 2.54;
        weightKgNum = Number.parseFloat(weightLbs) * 0.453592;
      } else {
        heightCmNum = Number.parseFloat(heightCm);
        weightKgNum = Number.parseFloat(weightKg);
      }

      // Calculate
      let bmr = 0;
      if (bmrFormula === "mifflin") {
        // Mifflin-St Jeor
        if (gender === "male") {
          bmr = 10 * weightKgNum + 6.25 * heightCmNum - 5 * ageNum + 5;
        } else {
          bmr = 10 * weightKgNum + 6.25 * heightCmNum - 5 * ageNum - 161;
        }
      } else {
        // Katch-McArdle
        const bodyFatNum = Number.parseFloat(bodyFat);
        const leanBodyMass = weightKgNum * (1 - bodyFatNum / 100);
        bmr = 370 + 21.6 * leanBodyMass;
      }

      // Calculate
      const activityData = activityLevels.find(level => level.value === activityLevel);
      const tdee = bmr * (activityData?.multiplier || 1.2);

      // Calculate recommendations
      const carbsPercentage = {
        sedentary: 45,
        // 45-50% for sedentary
        light: 50,
        // 50-55% for light activity
        moderate: 55,
        // 55-60% for moderate activity
        active: 60,
        // 60-65% for active
        very_active: 65,
        // 65-70% for very active
        extra_active: 70 // 70% for extra active
      };
      const carbPercentage = carbsPercentage[activityLevel as keyof typeof carbsPercentage] || 50;
      const carbCalories = tdee * carbPercentage / 100;
      const carbGrams = carbCalories / 4; // 4 calories per gram of carbs

      // Calculate
      const carbGramsMin = carbGrams * 0.9;
      const carbGramsMax = carbGrams * 1.1;
      const carbGramsPerKg = carbGrams / weightKgNum;
      setResult({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        carbGrams: Math.round(carbGrams),
        carbGramsMin: Math.round(carbGramsMin),
        carbGramsMax: Math.round(carbGramsMax),
        carbGramsPerKg: Math.round(carbGramsPerKg * 10) / 10,
        carbCalories: Math.round(carbCalories),
        carbPercentage,
        activityLevel: activityData?.label || "",
        bmrFormula,
        inputs: {
          age: ageNum,
          gender,
          height: heightCmNum,
          weight: weightKgNum,
          bodyFat: bmrFormula === "katch" ? Number.parseFloat(bodyFat) : null
        }
      });
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating carbohydrates. Please check your inputs and try again."
      });
    }
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  const resetCalculator = () => {
    setAge("");
    setGender("male");
    setHeightFt("");
    setHeightIn("");
    setHeightCm("");
    setWeightLbs("");
    setWeightKg("");
    setActivityLevel("");
    setBmrFormula("mifflin");
    setBodyFat("");
    setUnitSystem("us");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Apple className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>{contentData.carbohydrate_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_details_to_calculate_daily_carbohydrate_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Unit System Toggle */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.unit_system_2}</Label>
                        <RadioGroup value={unitSystem} onValueChange={setUnitSystem} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="us" id="us" />
                            <Label htmlFor="us" className="cursor-pointer">{contentData.us_ftin_lbs_3}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="metric" id="metric" />
                            <Label htmlFor="metric" className="cursor-pointer">{contentData.metric_cm_kg_4}</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Age and Gender */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.age_years_5}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Activity className="h-5 w-5 text-blue-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`} type="number" placeholder="25" value={age} onChange={e => setAge(e.target.value)} />
                          </div>
                          {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.gender_6}</Label>
                          <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-6">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male" className="cursor-pointer">{contentData.male_7}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female" className="cursor-pointer">{contentData.female_8}</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      {/* Height */}
                      {unitSystem === "us" ? <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_9}</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                              <Input className={`h-12 ${errors.heightFt ? "border-red-300" : ""}`} type="number" placeholder="5" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.ft_10}</span>
                            </div>
                            <div className="relative">
                              <Input className={`h-12 ${errors.heightIn ? "border-red-300" : ""}`} type="number" placeholder="8" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.in_11}</span>
                            </div>
                          </div>
                          {(errors.heightFt || errors.heightIn) && <p className="text-red-600 text-xs mt-1">{errors.heightFt || errors.heightIn}</p>}
                        </div> : <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_cm_12}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Target className="h-5 w-5 text-blue-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.heightCm ? "border-red-300" : ""}`} type="number" placeholder="175" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
                          </div>
                          {errors.heightCm && <p className="text-red-600 text-xs mt-1">{errors.heightCm}</p>}
                        </div>}

                      {/* Weight */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.weight_13}{unitSystem === "us" ? "lbs" : "kg"})
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${unitSystem === "us" ? errors.weightLbs ? "border-red-300" : "" : errors.weightKg ? "border-red-300" : ""}`} type="number" placeholder={unitSystem === "us" ? "180" : "80"} value={unitSystem === "us" ? weightLbs : weightKg} onChange={e => unitSystem === "us" ? setWeightLbs(e.target.value) : setWeightKg(e.target.value)} />
                        </div>
                        {(errors.weightLbs || errors.weightKg) && <p className="text-red-600 text-xs mt-1">{errors.weightLbs || errors.weightKg}</p>}
                      </div>

                      {/* Activity Level */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.activity_level_14}</Label>
                        <Select value={activityLevel} onValueChange={setActivityLevel}>
                          <SelectTrigger className={`h-12 ${errors.activityLevel ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your activity level" />
                          </SelectTrigger>
                          <SelectContent>
                            {activityLevels.map(level => <SelectItem key={level.value} value={level.value}>
                                <div>
                                  <div className="font-medium">{level.label}</div>
                                  <div className="text-xs text-gray-500">{level.description}</div>
                                </div>
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        {errors.activityLevel && <p className="text-red-600 text-xs mt-1">{errors.activityLevel}</p>}
                      </div>

                      {/* BMR Formula */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.bmr_formula_15}</Label>
                        <RadioGroup value={bmrFormula} onValueChange={setBmrFormula} className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mifflin" id="mifflin" />
                            <Label htmlFor="mifflin" className="cursor-pointer">
                              <div>
                                <div className="font-medium">{contentData.mifflinst_jeor_recommended_16}</div>
                                <div className="text-xs text-gray-500">{contentData.most_accurate_for_general_population_17}</div>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="katch" id="katch" />
                            <Label htmlFor="katch" className="cursor-pointer">
                              <div>
                                <div className="font-medium">{contentData.katchmcardle_18}</div>
                                <div className="text-xs text-gray-500">{contentData.more_accurate_if_body_fat_is_known_19}</div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>

                        {/* Body Fat Input for Katch-McArdle */}
                        {bmrFormula === "katch" && <div className="mt-4">
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.body_fat_percentage_20}</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Zap className="h-5 w-5 text-blue-500" />
                              </div>
                              <Input className={`h-12 pl-10 ${errors.bodyFat ? "border-red-300" : ""}`} type="number" step="0.1" placeholder="15.0" value={bodyFat} onChange={e => setBodyFat(e.target.value)} />
                            </div>
                            {errors.bodyFat && <p className="text-red-600 text-xs mt-1">{errors.bodyFat}</p>}
                          </div>}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateCarbohydrates} className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">{contentData.calculate_21}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_22}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-green-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center mb-3 shadow-lg">
                      <Apple className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.daily_carbs_23}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-3xl font-bold text-blue-900">{result.carbGrams}{contentData.g_24}</p>
                          <p className="text-sm font-medium text-green-600">
                            {result.carbGramsPerKg}{contentData.g_per_kg_body_weight_25}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Apple className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_details_to_calculate_daily_carbohydrate_26}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Apple className="w-6 h-6 text-blue-600" />
                      <span>{contentData.your_carbohydrate_requirements_27}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Main Results */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                      <h3 className="text-xl font-semibold text-blue-700 mb-4">{contentData.daily_carbohydrate_needs_28}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-blue-700 mb-1">{result.carbGrams}{contentData.g_29}</p>
                          <p className="text-sm text-gray-600">{contentData.target_carbs_30}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-700 mb-1">{result.carbGramsPerKg}{contentData.gkg_31}</p>
                          <p className="text-sm text-gray-600">{contentData.per_body_weight_32}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-teal-700 mb-1">{result.carbCalories}</p>
                          <p className="text-sm text-gray-600">{contentData.carb_calories_33}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-700 mb-1">{result.carbPercentage}%</p>
                          <p className="text-sm text-gray-600">{contentData.of_total_calories_34}</p>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">{contentData.range_35}{" "}
                          <strong>
                            {result.carbGramsMin}{contentData.g_36}{result.carbGramsMax}{contentData.g_37}</strong>{" "}{contentData.per_day_38}</p>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-6">{contentData.calculation_details_39}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-700 mb-3">{contentData.metabolic_calculations_40}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.bmr_41}</strong> {result.bmr}{contentData.caloriesday_42}</p>
                            <p>
                              <strong>{contentData.tdee_43}</strong> {result.tdee}{contentData.caloriesday_44}</p>
                            <p>
                              <strong>{contentData.activity_level_45}</strong> {result.activityLevel}
                            </p>
                            <p>
                              <strong>{contentData.formula_used_46}</strong>{" "}
                              {result.bmrFormula === "mifflin" ? "Mifflin-St Jeor" : "Katch-McArdle"}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-700 mb-3">{contentData.carbohydrate_breakdown_47}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.carb_calories_48}</strong> {result.carbCalories} ({result.carbPercentage}{contentData.of_tdee_49}</p>
                            <p>
                              <strong>{contentData.carb_grams_50}</strong> {result.carbGrams}{contentData.g_4_calg_51}</p>
                            <p>
                              <strong>{contentData.per_kg_body_weight_52}</strong> {result.carbGramsPerKg}{contentData.gkg_53}</p>
                            <p>
                              <strong>{contentData.recommended_range_54}</strong> {result.carbGramsMin}{contentData.g_55}{result.carbGramsMax}{contentData.g_56}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "Protein Intake Calculator",
          calculatorHref: "/health/protein-calculator",
        }, {
          calculatorName: "TDEE Calculator",
          calculatorHref: "/health/tdee-calculator",
        }, {
          calculatorName: "Fat Intake Calculator",
          calculatorHref: "/health/fat-intake-calculator",
        }
        ]} 
        color="green" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-green-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center mr-3 shadow-lg">
                    <Apple className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.carbohydrate_guidelines_57}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.carbohydrate_recommendations_58}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{contentData.activity_level_59}</th>
                              <th className="text-center py-2">{contentData.of_calories_60}</th>
                              <th className="text-center py-2">{contentData.gkg_body_weight_61}</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">{contentData.sedentary_62}</td>
                              <td className="text-center">{contentData.k_4550_63}</td>
                              <td className="text-center">{contentData.k_35gkg_64}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.light_activity_65}</td>
                              <td className="text-center">{contentData.k_5055_66}</td>
                              <td className="text-center">{contentData.k_57gkg_67}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.moderate_activity_68}</td>
                              <td className="text-center">{contentData.k_5560_69}</td>
                              <td className="text-center">{contentData.k_68gkg_70}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.high_activity_71}</td>
                              <td className="text-center">{contentData.k_6070_72}</td>
                              <td className="text-center">{contentData.k_812gkg_73}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.bmr_formulas_74}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <div className="space-y-3 text-sm text-gray-700">
                          <div>
                            <p className="font-medium">{contentData.mifflinst_jeor_recommended_75}</p>
                            <p className="text-xs">{contentData.most_accurate_for_general_population_accounts_for__76}</p>
                          </div>
                          <div>
                            <p className="font-medium">{contentData.katchmcardle_77}</p>
                            <p className="text-xs">{contentData.more_accurate_when_body_fat_percentage_is_known_ba_78}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.carbohydrate_types_79}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.complex_carbs_80}</strong>{contentData.whole_grains_vegetables_legumes_81}</li>
                          <li>
                            <strong>{contentData.simple_carbs_82}</strong>{contentData.fruits_dairy_refined_sugars_83}</li>
                          <li>
                            <strong>{contentData.fiber_84}</strong>{contentData.k_2535g_daily_for_digestive_health_85}</li>
                          <li>
                            <strong>{contentData.timing_86}</strong>{contentData.prepost_workout_for_performance_87}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.activity_multipliers_88}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.sedentary_89}</strong>{contentData.k_12x_bmr_desk_job_no_exercise_90}</li>
                          <li>
                            <strong>{contentData.light_91}</strong>{contentData.k_1375x_bmr_light_exercise_13week_92}</li>
                          <li>
                            <strong>{contentData.moderate_93}</strong>{contentData.k_155x_bmr_moderate_exercise_45week_94}</li>
                          <li>
                            <strong>{contentData.active_95}</strong>{contentData.k_1725x_bmr_heavy_exercise_daily_96}</li>
                          <li>
                            <strong>{contentData.very_active_97}</strong>{contentData.k_19x_bmr_very_heavy_exercise_98}</li>
                          <li>
                            <strong>{contentData.extra_active_99}</strong>{contentData.k_20x_bmr_physical_job_exercise_100}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

           {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="carbohydrate-calculator"
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
