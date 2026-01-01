"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Calculator, RotateCcw, Zap, User, Target } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface ProteinCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function ProteinCalculatorClient({ content, guideContent }: ProteinCalculatorClientProps) {
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
  const [heightUnit, setHeightUnit] = useState("metric"); // metric, us
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightUnit, setWeightUnit] = useState("metric"); // metric, us
  const [weightKg, setWeightKg] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const ageNum = Number.parseInt(age);
    if (!age || ageNum < 1 || ageNum > 120) {
      newErrors.age = "Please enter a valid age (1-120)";
    }

    // Height validation
    if (heightUnit === "metric") {
      const heightCmNum = Number.parseFloat(heightCm);
      if (!heightCm || heightCmNum < 50 || heightCmNum > 250) {
        newErrors.height = "Please enter a valid height (50-250 cm)";
      }
    } else {
      const heightFtNum = Number.parseInt(heightFt);
      const heightInNum = Number.parseInt(heightIn);
      if (!heightFt || heightFtNum < 2 || heightFtNum > 8) {
        newErrors.heightFt = "Please enter valid feet (2-8)";
      }
      if (!heightIn || heightInNum < 0 || heightInNum > 11) {
        newErrors.heightIn = "Please enter valid inches (0-11)";
      }
    }

    // Weight validation
    if (weightUnit === "metric") {
      const weightKgNum = Number.parseFloat(weightKg);
      if (!weightKg || weightKgNum < 20 || weightKgNum > 300) {
        newErrors.weight = "Please enter a valid weight (20-300 kg)";
      }
    } else {
      const weightLbsNum = Number.parseFloat(weightLbs);
      if (!weightLbs || weightLbsNum < 44 || weightLbsNum > 660) {
        newErrors.weight = "Please enter a valid weight (44-660 lbs)";
      }
    }
    if (!activityLevel) {
      newErrors.activityLevel = "Please select an activity level";
    }
    if (!goal) {
      newErrors.goal = "Please select a goal";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateProteinIntake = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    try {
      // Convert weight to kg
      let weightInKg = 0;
      if (weightUnit === "metric") {
        weightInKg = Number.parseFloat(weightKg);
      } else {
        weightInKg = Number.parseFloat(weightLbs) * 0.4536;
      }

      // Convert height to cm for BMI calculation (optional future use)
      let heightInCm = 0;
      if (heightUnit === "metric") {
        heightInCm = Number.parseFloat(heightCm);
      } else {
        const ft = Number.parseInt(heightFt);
        const inches = Number.parseInt(heightIn);
        heightInCm = (ft * 12 + inches) * 2.54;
      }

      // Get protein multiplier range based on activity level
      let minMultiplier = 0,
        maxMultiplier = 0;
      let activityDescription = "";
      switch (activityLevel) {
        case "sedentary":
          minMultiplier = 0.8;
          maxMultiplier = 0.8;
          activityDescription = "Sedentary (little or no exercise)";
          break;
        case "light":
          minMultiplier = 1.0;
          maxMultiplier = 1.2;
          activityDescription = "Light exercise (1-3 days/week)";
          break;
        case "moderate":
          minMultiplier = 1.2;
          maxMultiplier = 1.6;
          activityDescription = "Moderate exercise (3-5 days/week)";
          break;
        case "heavy":
          minMultiplier = 1.6;
          maxMultiplier = 2.2;
          activityDescription = "Heavy exercise (6-7 days/week)";
          break;
        case "very_heavy":
          minMultiplier = 2.0;
          maxMultiplier = 2.5;
          activityDescription = "Very heavy exercise (twice/day or physical job)";
          break;
      }

      // Adjust for goal
      let finalMultiplier = 0;
      let goalDescription = "";
      let adviceNote = "";
      switch (goal) {
        case "maintenance":
          finalMultiplier = (minMultiplier + maxMultiplier) / 2; // Use midpoint
          goalDescription = "Maintenance";
          adviceNote = "Maintain current muscle mass and support daily activities. Spread protein intake throughout the day.";
          break;
        case "fat_loss":
          finalMultiplier = maxMultiplier; // Use upper end
          goalDescription = "Fat Loss";
          adviceNote = "Higher protein helps preserve muscle during calorie deficit and increases satiety. Consider eating protein with each meal.";
          break;
        case "muscle_gain":
          finalMultiplier = Math.min(maxMultiplier * 1.1, 2.5); // Use maximum or slightly higher, cap at 2.5
          goalDescription = "Muscle Gain";
          adviceNote = "Optimal protein for muscle building. Combine with resistance training and adequate calories for best results.";
          break;
      }

      // Calculate requirement
      const proteinGrams = Math.round(weightInKg * finalMultiplier);
      const proteinRange = {
        min: Math.round(weightInKg * minMultiplier),
        max: Math.round(weightInKg * maxMultiplier)
      };

      // Calculate from protein (optional)
      const caloriesFromProtein = proteinGrams * 4;
      const estimatedTotalCalories = weightInKg * 24 * 1.2; // Rough BMR estimate
      const proteinPercentage = Math.round(caloriesFromProtein / estimatedTotalCalories * 100);
      const results = {
        age: Number.parseInt(age),
        gender: gender,
        weight: weightInKg,
        weightDisplay: weightUnit === "metric" ? `${weightKg} kg` : `${weightLbs} lbs`,
        height: heightInCm,
        heightDisplay: heightUnit === "metric" ? `${heightCm} cm` : `${heightFt}'${heightIn}"`,
        activityLevel: activityDescription,
        goal: goalDescription,
        proteinGrams,
        proteinRange,
        multiplier: finalMultiplier,
        caloriesFromProtein,
        proteinPercentage,
        adviceNote
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating protein intake. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setAge("");
    setGender("male");
    setHeightUnit("metric");
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setWeightUnit("metric");
    setWeightKg("");
    setWeightLbs("");
    setActivityLevel("");
    setGoal("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>{contentData.protein_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_details_to_calculate_your_optimal_daily_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Age and Gender */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.age_years_2}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-green-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`} type="number" placeholder="30" value={age} onChange={e => setAge(e.target.value)} min="1" max="120" />
                          </div>
                          {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.gender_3}</Label>
                          <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-6">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male" className="cursor-pointer">{contentData.male_4}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female" className="cursor-pointer">{contentData.female_5}</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      {/* Height */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium text-gray-700">{contentData.height_6}</Label>
                          <div className="flex space-x-2">
                            <button type="button" onClick={() => setHeightUnit("metric")} className={`px-3 py-1 text-xs rounded ${heightUnit === "metric" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.metric_7}</button>
                            <button type="button" onClick={() => setHeightUnit("us")} className={`px-3 py-1 text-xs rounded ${heightUnit === "us" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.us_8}</button>
                          </div>
                        </div>

                        {heightUnit === "metric" ? <div className="relative">
                            <Input className={`h-12 ${errors.height ? "border-red-300" : ""}`} type="number" placeholder="175" value={heightCm} onChange={e => setHeightCm(e.target.value)} min="50" max="250" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.cm_9}</span>
                          </div> : <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                              <Input className={`h-12 ${errors.heightFt ? "border-red-300" : ""}`} type="number" placeholder="5" value={heightFt} onChange={e => setHeightFt(e.target.value)} min="2" max="8" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.ft_10}</span>
                            </div>
                            <div className="relative">
                              <Input className={`h-12 ${errors.heightIn ? "border-red-300" : ""}`} type="number" placeholder="9" value={heightIn} onChange={e => setHeightIn(e.target.value)} min="0" max="11" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.in_11}</span>
                            </div>
                          </div>}
                        {(errors.height || errors.heightFt || errors.heightIn) && <p className="text-red-600 text-xs mt-1">
                            {errors.height || errors.heightFt || errors.heightIn}
                          </p>}
                      </div>

                      {/* Weight */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium text-gray-700">{contentData.weight_12}</Label>
                          <div className="flex space-x-2">
                            <button type="button" onClick={() => setWeightUnit("metric")} className={`px-3 py-1 text-xs rounded ${weightUnit === "metric" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.metric_13}</button>
                            <button type="button" onClick={() => setWeightUnit("us")} className={`px-3 py-1 text-xs rounded ${weightUnit === "us" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.us_14}</button>
                          </div>
                        </div>

                        <div className="relative">
                          {weightUnit === "metric" ? <>
                              <Input className={`h-12 ${errors.weight ? "border-red-300" : ""}`} type="number" placeholder="70" value={weightKg} onChange={e => setWeightKg(e.target.value)} min="20" max="300" step="0.1" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.kg_15}</span>
                            </> : <>
                              <Input className={`h-12 ${errors.weight ? "border-red-300" : ""}`} type="number" placeholder="154" value={weightLbs} onChange={e => setWeightLbs(e.target.value)} min="44" max="660" step="0.1" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.lbs_16}</span>
                            </>}
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                      </div>

                      {/* Activity Level */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.activity_level_17}</Label>
                        <Select value={activityLevel} onValueChange={setActivityLevel}>
                          <SelectTrigger className={`h-12 ${errors.activityLevel ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your activity level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">{contentData.sedentary_little_or_no_exercise_18}</SelectItem>
                            <SelectItem value="light">{contentData.light_exercise_13_daysweek_19}</SelectItem>
                            <SelectItem value="moderate">{contentData.moderate_exercise_35_daysweek_20}</SelectItem>
                            <SelectItem value="heavy">{contentData.heavy_exercise_67_daysweek_21}</SelectItem>
                            <SelectItem value="very_heavy">{contentData.very_heavy_exercise_twiceday_or_physical_job_22}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.activityLevel && <p className="text-red-600 text-xs mt-1">{errors.activityLevel}</p>}
                      </div>

                      {/* Goal */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.goal_23}</Label>
                        <Select value={goal} onValueChange={setGoal}>
                          <SelectTrigger className={`h-12 ${errors.goal ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select your fitness goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">{contentData.maintenance_maintain_current_weightmuscle_24}</SelectItem>
                            <SelectItem value="fat_loss">{contentData.fat_loss_lose_weight_while_preserving_muscle_25}</SelectItem>
                            <SelectItem value="muscle_gain">{contentData.muscle_gain_build_muscle_mass_26}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.goal && <p className="text-red-600 text-xs mt-1">{errors.goal}</p>}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateProteinIntake} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">{contentData.calculate_27}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_28}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mb-3 shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.daily_protein_29}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-green-200">
                          <p className="text-3xl font-bold text-green-900 mb-2">{result.proteinGrams}{contentData.g_30}</p>
                          <p className="text-sm font-medium text-gray-600">{contentData.per_day_31}</p>
                          <p className="text-sm text-gray-500 mt-2">{result.goal}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Zap className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_details_to_calculate_your_optimal_daily_32}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Target className="w-6 h-6 text-green-600" />
                      <span>{contentData.protein_intake_results_33}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                        <h3 className="text-3xl font-bold text-green-700 mb-2">{result.proteinGrams}{contentData.g_per_day_34}</h3>
                        <p className="text-lg text-gray-600 mb-4">{contentData.recommended_daily_protein_intake_35}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">{contentData.weight_36}</p>
                            <p className="font-semibold text-gray-700">{result.weightDisplay}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">{contentData.activity_37}</p>
                            <p className="font-semibold text-gray-700">{result.activityLevel.split(" ")[0]}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">{contentData.goal_38}</p>
                            <p className="font-semibold text-gray-700">{result.goal}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">{contentData.multiplier_39}</p>
                            <p className="font-semibold text-gray-700">{result.multiplier.toFixed(1)}{contentData.gkg_40}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-3">{contentData.calculation_breakdown_41}</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>{contentData.body_weight_42}</strong> {result.weight.toFixed(1)}{contentData.kg_43}</p>
                          <p>
                            <strong>{contentData.protein_multiplier_44}</strong> {result.multiplier.toFixed(1)}{contentData.gkg_45}</p>
                          <p>
                            <strong>{contentData.daily_protein_46}</strong> {result.weight.toFixed(1)} × {result.multiplier.toFixed(1)}{" "}
                            = {result.proteinGrams}{contentData.g_47}</p>
                          <p>
                            <strong>{contentData.activity_range_48}</strong> {result.proteinRange.min}-{result.proteinRange.max}{contentData.g_49}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <h4 className="font-semibold text-emerald-700 mb-3">{contentData.nutritional_info_50}</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>{contentData.calories_from_protein_51}</strong> {result.caloriesFromProtein}{contentData.kcal_52}</p>
                          <p>
                            <strong>{contentData.estimated_of_total_calories_53}</strong> ~{result.proteinPercentage}%
                          </p>
                          <p>
                            <strong>{contentData.protein_per_meal_3_meals_54}</strong> ~{Math.round(result.proteinGrams / 3)}{contentData.g_55}</p>
                          <p>
                            <strong>{contentData.protein_per_meal_4_meals_56}</strong> ~{Math.round(result.proteinGrams / 4)}{contentData.g_57}</p>
                        </div>
                      </div>
                    </div>

                    {/* Advice Note */}
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-3">{contentData.personalized_advice_58}</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{result.adviceNote}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "Healthy Weight Calculator",
          calculatorHref: "/health/healthy-weight-calculator",
        }, {
          calculatorName: "TDEE Calculator",
          calculatorHref: "/health/tdee-calculator",
        }, {
          calculatorName: "Body Type & WHR Calculator",
          calculatorHref: "/health/body-type-calculator",
        }
        ]} 
        color="green" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.about_protein_requirements_59}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.protein_multipliers_by_activity_60}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.sedentary_61}</strong>{contentData.k_08_gkg_basic_maintenance_62}</li>
                          <li>
                            <strong>{contentData.light_exercise_63}</strong>{contentData.k_1012_gkg_recreational_activity_64}</li>
                          <li>
                            <strong>{contentData.moderate_exercise_65}</strong>{contentData.k_1216_gkg_regular_training_66}</li>
                          <li>
                            <strong>{contentData.heavy_exercise_67}</strong>{contentData.k_1622_gkg_intense_training_68}</li>
                          <li>
                            <strong>{contentData.very_heavyathletes_69}</strong>{contentData.k_2025_gkg_elite_performance_70}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.goal_adjustments_71}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.maintenance_72}</strong>{contentData.midpoint_of_activity_range_73}</li>
                          <li>
                            <strong>{contentData.fat_loss_74}</strong>{contentData.upper_end_to_preserve_muscle_75}</li>
                          <li>
                            <strong>{contentData.muscle_gain_76}</strong>{contentData.maximum_intake_for_growth_77}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.highquality_protein_sources_78}</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{contentData.food_79}</th>
                              <th className="text-left py-2">{contentData.protein100g_80}</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">{contentData.chicken_breast_81}</td>
                              <td>{contentData.k_31g_82}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.greek_yogurt_83}</td>
                              <td>{contentData.k_10g_84}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.eggs_85}</td>
                              <td>{contentData.k_13g_86}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.salmon_87}</td>
                              <td>{contentData.k_25g_88}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.lentils_89}</td>
                              <td>{contentData.k_9g_90}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.important_notes_91}</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.spread_protein_intake_throughout_the_day_92}</li>
                          <li>{contentData.combine_with_resistance_training_for_muscle_gain_93}</li>
                          <li>{contentData.individual_needs_may_vary_based_on_genetics_94}</li>
                          <li>{contentData.consult_a_nutritionist_for_personalized_advice_95}</li>
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
            entityId="protein-calculator"
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
