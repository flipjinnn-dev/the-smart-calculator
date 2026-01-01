"use client";

import { useState, useEffect, useRef } from "react";

import { Calculator, Heart, User, Ruler, Weight, Activity, Target, Utensils, Calendar, Scale } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Macro Calculator",
  description: "Calculate daily macronutrient needs based on your goals, activity level, and body composition using accurate BMR formulas.",
  url: "https://www.thesmartcalculator.com/health/macro-calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: ["Macronutrient calculation", "BMR estimation using Mifflin-St Jeor", "Activity level adjustments", "Goal-based calorie modifications", "Multiple unit systems", "Macro ratio presets"]
};
interface MacroResults {
  calories: number;
  kilojoules: number;
  protein: number;
  proteinRange: [number, number];
  carbs: number;
  carbRange: [number, number];
  fat: number;
  fatRange: [number, number];
  sugar: number;
  saturatedFat: number;
  bmr: number;
  tdee: number;
}

interface MacroCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function MacroCalculatorClient({ content, guideContent }: MacroCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [unitSystem, setUnitSystem] = useState<"us" | "metric" | "other">("metric");
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [heightCm, setHeightCm] = useState("178");
  const [weightLbs, setWeightLbs] = useState("165");
  const [weightKg, setWeightKg] = useState("75");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [bmrFormula, setBmrFormula] = useState("mifflin");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [results, setResults] = useState<MacroResults | null>(null);

  // 1. Macro Presets
  const macroPresets = {
    balanced: {
      label: "Balanced",
      protein: 30,
      carbs: 40,
      fat: 30
    },
    lowFat: {
      label: "Low Fat",
      protein: 40,
      carbs: 40,
      fat: 20
    },
    lowCarb: {
      label: "Low Carb",
      protein: 40,
      carbs: 20,
      fat: 40
    },
    highProtein: {
      label: "High Protein",
      protein: 40,
      carbs: 30,
      fat: 30
    }
  };
  const macroPresetKeys = ["balanced", "lowFat", "lowCarb", "highProtein"] as (keyof typeof macroPresets)[];

  // 2. State for selected preset and custom plan
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof macroPresets | "custom">("balanced");
  const [customMacros, setCustomMacros] = useState({
    protein: 25,
    carbs: 50,
    fat: 25
  });
  const [customError, setCustomError] = useState("");
  const [allResults, setAllResults] = useState<any>(null);

  // Auto-calculate on page load with default values
useEffect(() => {
    if (age && gender && heightCm && weightKg) {
      // Small delay to ensure all state is set
      setTimeout(() => {
        calculateAllMacros();
      }, 100);
    }
  }, []);

          // Removed the useEffect that recalculates on every input change

  const activityLevels = {
    bmr: {
      label: "Basal Metabolic Rate (BMR)",
      multiplier: 1.0
    },
    sedentary: {
      label: "Sedentary: little or no exercise",
      multiplier: 1.2
    },
    light: {
      label: "Light: exercise 1-3 times/week",
      multiplier: 1.375
    },
    moderate: {
      label: "Moderate: exercise 4-5 times/week",
      multiplier: 1.55
    },
    active: {
      label: "Active: daily exercise or intense exercise 3-4 times/week",
      multiplier: 1.725
    },
    veryActive: {
      label: "Very Active: intense exercise 6-7 times/week",
      multiplier: 1.9
    },
    extraActive: {
      label: "Extra Active: very intense exercise daily, or physical job",
      multiplier: 2.2
    }
  };
  const goals = {
    maintain: {
      label: "Maintain weight",
      adjustment: 0
    },
    mildLoss: {
      label: "Mild weight loss of 0.5 lb (0.25 kg) per week",
      adjustment: -250
    },
    weightLoss: {
      label: "Weight loss of 1 lb (0.5 kg) per week",
      adjustment: -500
    },
    extremeLoss: {
      label: "Extreme weight loss of 2 lb (1 kg) per week",
      adjustment: -1000
    },
    mildGain: {
      label: "Mild weight gain of 0.5 lb (0.25 kg) per week",
      adjustment: 250
    },
    weightGain: {
      label: "Weight gain of 1 lb (0.5 kg) per week",
      adjustment: 500
    },
    extremeGain: {
      label: "Extreme weight gain of 2 lb (1 kg) per week",
      adjustment: 1000
    }
  };

  // 3. Calculation logic for all presets and custom
const calculateAllMacros = () => {
    // Convert to metric for calculations
    const weightKgValue = unitSystem === "us" ? Number.parseFloat(weightLbs) * 0.453592 : Number.parseFloat(weightKg);
    const heightCmValue = unitSystem === "us" ? (Number.parseFloat(heightFeet) * 12 + Number.parseFloat(heightInches)) * 2.54 : Number.parseFloat(heightCm);
    const ageNum = Number.parseFloat(age);

    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (weightKgValue <= 0 || heightCmValue <= 0 || ageNum <= 0) return;
    let bmr: number;
    if (bmrFormula === "mifflin") {
      // Mifflin-St Jeor Equation
      if (gender === "male") {
        bmr = 10 * weightKgValue + 6.25 * heightCmValue - 5 * ageNum + 5;
      } else {
        bmr = 10 * weightKgValue + 6.25 * heightCmValue - 5 * ageNum - 161;
      }
    } else {
      // Katch-McArdle Formula (requires body fat percentage)
      const bodyFat = Number.parseFloat(bodyFatPercentage) || 15; // default 15% if not provided
      const leanBodyMass = weightKgValue * (1 - bodyFat / 100);
      bmr = 370 + 21.6 * leanBodyMass;
    }

    // Calculate
    const tdee = bmr * activityLevels[activity as keyof typeof activityLevels].multiplier;

    // Adjust for goal
    const targetCalories = tdee + goals[goal as keyof typeof goals].adjustment;

    // Helper to calculate macro results for a given ratio
    function getMacroResult(ratios: {
      protein: number;
      carbs: number;
      fat: number;
    }) {
      const proteinCalories = targetCalories * ratios.protein;
      const carbCalories = targetCalories * ratios.carbs;
      const fatCalories = targetCalories * ratios.fat;
      const proteinGrams = proteinCalories / 4;
      const carbGrams = carbCalories / 4;
      const fatGrams = fatCalories / 9;
      const proteinRange: [number, number] = [Math.round(proteinGrams * 0.9), Math.round(proteinGrams * 1.1)];
      const carbRange: [number, number] = [Math.round(carbGrams * 0.9), Math.round(carbGrams * 1.1)];
      const fatRange: [number, number] = [Math.round(fatGrams * 0.9), Math.round(fatGrams * 1.1)];
      const sugarLimit = Math.round(targetCalories * 0.1 / 4); // 10% of calories from sugar
      const saturatedFatLimit = Math.round(targetCalories * 0.1 / 9); // 10% of calories from saturated fat
      return {
        calories: Math.round(targetCalories),
        kilojoules: Math.round(targetCalories * 4.184),
        protein: Math.round(proteinGrams),
        proteinRange,
        carbs: Math.round(carbGrams),
        carbRange,
        fat: Math.round(fatGrams),
        fatRange,
        sugar: sugarLimit,
        saturatedFat: saturatedFatLimit,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee)
      };
    }

    // Calculate all presets
    const resultsObj: any = {};
    for (const key of macroPresetKeys) {
      resultsObj[key] = getMacroResult(macroPresets[key]);
    }
    // Custom plan
    const total = customMacros.protein + customMacros.carbs + customMacros.fat;
    if (total !== 100) {
      setCustomError("Protein + Carbs + Fat must equal 100%.");
      resultsObj.custom = null;
    } else {
      setCustomError("");
      resultsObj.custom = getMacroResult({
        protein: customMacros.protein / 100,
        carbs: customMacros.carbs / 100,
        fat: customMacros.fat / 100
      });
    }
    setAllResults(resultsObj);
    // Set the main results to the selected tab for backward compatibility
    setResults(resultsObj[selectedPreset] || null);
  };
  const getWeightUnit = () => unitSystem === "us" ? "lbs" : "kg";
  const getHeightUnit = () => unitSystem === "us" ? "ft/in" : "cm";
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>{contentData.macro_calculator_1}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.modify_the_values_and_click_the_calculate_button_t_2}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Unit System Selection */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">{contentData.unit_system_3}</Label>
                      <Tabs value={unitSystem} onValueChange={value => setUnitSystem(value as "us" | "metric" | "other")} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="us">{contentData.us_units_4}</TabsTrigger>
                          <TabsTrigger value="metric">{contentData.metric_units_5}</TabsTrigger>
                          <TabsTrigger value="other">{contentData.other_units_6}</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.age_7}</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" placeholder="25" value={age} onChange={e => setAge(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" min="18" max="80" />
                        </div>
                        <p className="text-sm text-gray-500">{contentData.ages_18_80_8}</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.gender_9}</Label>
                        <RadioGroup value={gender} onValueChange={value => setGender(value as "male" | "female")}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">{contentData.male_10}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">{contentData.female_11}</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.height_12}</Label>
                        {unitSystem === "us" ? <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <Input type="number" placeholder="5" value={heightFeet} onChange={e => setHeightFeet(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" min="1" max="8" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{contentData.feet_13}</span>
                            </div>
                            <div className="relative flex-1">
                              <Input type="number" placeholder="10" value={heightInches} onChange={e => setHeightInches(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" min="0" max="11" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{contentData.inches_14}</span>
                            </div>
                          </div> : <div className="relative">
                            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" placeholder="178" value={heightCm} onChange={e => setHeightCm(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" min="100" max="250" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{contentData.cm_15}</span>
                          </div>}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.weight_16}</Label>
                        <div className="relative">
                          <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" placeholder="75" value={unitSystem === "us" ? weightLbs : weightKg} onChange={e => {
                          if (unitSystem === "us") {
                            setWeightLbs(e.target.value);
                          } else {
                            setWeightKg(e.target.value);
                          }
                        }} className="pl-10 h-12 text-lg border-2 focus:border-green-500" min="30" max="500" />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {getWeightUnit()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Level and Goal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.activity_17}</Label>
                        <Select value={activity} onValueChange={setActivity}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(activityLevels).map(([key, level]) => <SelectItem key={key} value={key}>
                                {level.label}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-900">{contentData.your_goal_18}</Label>
                        <Select value={goal} onValueChange={setGoal}>
                          <SelectTrigger className="h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(goals).map(([key, goalItem]) => <SelectItem key={key} value={key}>
                                {goalItem.label}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* BMR Formula Selection */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold text-gray-900 mb-4 block">{contentData.bmr_estimation_formula_19}</Label>
                      <div className="flex space-x-4">
                        <RadioGroup value={bmrFormula} onValueChange={setBmrFormula}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mifflin" id="mifflin" />
                            <Label htmlFor="mifflin">{contentData.mifflin_st_jeor_20}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="katch" id="katch" />
                            <Label htmlFor="katch">{contentData.katchmcardle_21}</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      {bmrFormula === "katch" && <div className="mt-4">
                          <Label className="text-sm font-medium text-gray-700">{contentData.body_fat_percentage_22}</Label>
                          <Input type="number" placeholder="15" value={bodyFatPercentage} onChange={e => setBodyFatPercentage(e.target.value)} className="mt-2 h-10 border-2 focus:border-green-500" min="5" max="50" />
                        </div>}
                    </div>

                    <Button onClick={calculateAllMacros} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold">{contentData.calculate_23}</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white sticky top-24 pt-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="text-2xl">{contentData.macro_results_24}</CardTitle>
                    <CardDescription className="text-base">{contentData.your_daily_macronutrient_breakdown_25}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {allResults ? <Tabs value={selectedPreset} onValueChange={v => setSelectedPreset(v as keyof typeof macroPresets | "custom")} className="mb-8">
                        <TabsList className="grid grid-rows-2 grid-cols-3 gap-2 justify-center w-full mb-2 bg-white" style={{
                      minHeight: 110
                    }}>
                          <TabsTrigger value="balanced" className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-green-100 transition-all flex items-center justify-center">{contentData.balanced_26}</TabsTrigger>
                          <TabsTrigger value="lowFat" className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-green-100 transition-all flex items-center justify-center">{contentData.low_fat_27}</TabsTrigger>
                          <TabsTrigger value="lowCarb" className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-green-100 transition-all flex items-center justify-center">{contentData.low_carb_28}</TabsTrigger>
                          <TabsTrigger value="highProtein" className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-green-100 transition-all flex items-center justify-center">{contentData.high_protein_29}</TabsTrigger>
                          <TabsTrigger value="custom" className="h-12 px-4 rounded-lg text-base font-semibold shadow-sm bg-gray-100 hover:bg-blue-100 transition-all flex items-center justify-center col-span-2">{contentData.create_your_own_30}</TabsTrigger>
                        </TabsList>
                        {/* Tab Content - must be inside <Tabs> */}
                        {macroPresetKeys.map(key => <TabsContent key={key} value={key} className={selectedPreset === key ? "block" : "hidden"}>
                            {allResults[key] && <div className="space-y-6">
                                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200 mt-2 mb-4 shadow-lg">
                                    <p className="text-lg text-gray-600 mb-2">{contentData.daily_calories_31}</p>
                                    <p className="text-4xl font-bold text-green-600 mb-2">{allResults[key].calories}</p>
                                    <p className="text-sm text-gray-500">{contentData.or_32}{allResults[key].kilojoules}{contentData.kjday_33}</p>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h3 className="font-bold text-lg text-gray-900">{contentData.macronutrients_34}</h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                      <span className="font-medium text-gray-700">{contentData.protein_35}</span>
                                      <span className="font-bold text-blue-600">{allResults[key].protein}{contentData.g_36}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                      <span className="font-medium text-gray-700">{contentData.carbohydrates_37}</span>
                                      <span className="font-bold text-green-600">{allResults[key].carbs}{contentData.g_38}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                      <span className="font-medium text-gray-700">{contentData.fat_39}</span>
                                      <span className="font-bold text-purple-600">{allResults[key].fat}{contentData.g_40}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h3 className="font-bold text-lg text-gray-900">{contentData.macro_ranges_41}</h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                                      <span className="font-medium text-gray-700">{contentData.protein_range_42}</span>
                                      <span className="font-bold text-orange-600">{allResults[key].proteinRange[0]}-{allResults[key].proteinRange[1]}{contentData.g_43}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                      <span className="font-medium text-gray-700">{contentData.carb_range_44}</span>
                                      <span className="font-bold text-yellow-600">{allResults[key].carbRange[0]}-{allResults[key].carbRange[1]}{contentData.g_45}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                      <span className="font-medium text-gray-700">{contentData.fat_range_46}</span>
                                      <span className="font-bold text-red-600">{allResults[key].fatRange[0]}-{allResults[key].fatRange[1]}{contentData.g_47}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <h3 className="font-bold text-lg text-gray-900">{contentData.daily_limits_48}</h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                      <span className="font-medium text-gray-700">{contentData.sugar_49}</span>
                                      <span className="font-bold text-indigo-600">&lt;{allResults[key].sugar}{contentData.g_50}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                                      <span className="font-medium text-gray-700">{contentData.saturated_fat_51}</span>
                                      <span className="font-bold text-teal-600">&lt;{allResults[key].saturatedFat}{contentData.g_52}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4 pt-4 border-t">
                                  <h3 className="font-bold text-lg text-gray-900">{contentData.metabolic_info_53}</h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                      <span className="font-medium text-gray-700">{contentData.bmr_54}</span>
                                      <span className="font-bold text-gray-600">{allResults[key].bmr}{contentData.calories_55}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                      <span className="font-medium text-gray-700">{contentData.tdee_56}</span>
                                      <span className="font-bold text-gray-600">{allResults[key].tdee}{contentData.calories_57}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold mt-4">{contentData.save_this_calculation_58}</Button>
                              </div>}
                          </TabsContent>)}
                        <TabsContent value="custom" className={selectedPreset === "custom" ? "block" : "hidden"}>
                          <div className="mt-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-center">
                            <div className="flex flex-col items-center">
                              <Label>{contentData.protein_59}</Label>
                              <Input type="number" min={0} max={100} value={customMacros.protein} onChange={e => setCustomMacros({
                            ...customMacros,
                            protein: Number(e.target.value)
                          })} className="w-24" />
                            </div>
                            <div className="flex flex-col items-center">
                              <Label>{contentData.carbs_60}</Label>
                              <Input type="number" min={0} max={100} value={customMacros.carbs} onChange={e => setCustomMacros({
                            ...customMacros,
                            carbs: Number(e.target.value)
                          })} className="w-24" />
                            </div>
                            <div className="flex flex-col items-center">
                              <Label>{contentData.fat_61}</Label>
                              <Input type="number" min={0} max={100} value={customMacros.fat} onChange={e => setCustomMacros({
                            ...customMacros,
                            fat: Number(e.target.value)
                          })} className="w-24" />
                            </div>
                          </div>
                          {customError && <div className="text-red-600 font-semibold mb-2">{customError}</div>}
                          {allResults.custom && !customError && <div className="space-y-6">
                              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                                <p className="text-lg text-gray-600 mb-2">{contentData.daily_calories_62}</p>
                                <p className="text-4xl font-bold text-green-600 mb-2">{allResults.custom.calories}</p>
                                <p className="text-sm text-gray-500">{contentData.or_63}{allResults.custom.kilojoules}{contentData.kjday_64}</p>
                              </div>
                              <div className="space-y-4">
                                <h3 className="font-bold text-lg text-gray-900">{contentData.macronutrients_65}</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <span className="font-medium text-gray-700">{contentData.protein_66}</span>
                                    <span className="font-bold text-blue-600">{allResults.custom.protein}{contentData.g_67}</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                    <span className="font-medium text-gray-700">{contentData.carbohydrates_68}</span>
                                    <span className="font-bold text-green-600">{allResults.custom.carbs}{contentData.g_69}</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                    <span className="font-medium text-gray-700">{contentData.fat_70}</span>
                                    <span className="font-bold text-purple-600">{allResults.custom.fat}{contentData.g_71}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h3 className="font-bold text-lg text-gray-900">{contentData.macro_ranges_72}</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <span className="font-medium text-gray-700">{contentData.protein_range_73}</span>
                                    <span className="font-bold text-orange-600">{allResults.custom.proteinRange[0]}-{allResults.custom.proteinRange[1]}{contentData.g_74}</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <span className="font-medium text-gray-700">{contentData.carb_range_75}</span>
                                    <span className="font-bold text-yellow-600">{allResults.custom.carbRange[0]}-{allResults.custom.carbRange[1]}{contentData.g_76}</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                    <span className="font-medium text-gray-700">{contentData.fat_range_77}</span>
                                    <span className="font-bold text-red-600">{allResults.custom.fatRange[0]}-{allResults.custom.fatRange[1]}{contentData.g_78}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h3 className="font-bold text-lg text-gray-900">{contentData.daily_limits_79}</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                    <span className="font-medium text-gray-700">{contentData.sugar_80}</span>
                                    <span className="font-bold text-indigo-600">&lt;{allResults.custom.sugar}{contentData.g_81}</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                                    <span className="font-medium text-gray-700">{contentData.saturated_fat_82}</span>
                                    <span className="font-bold text-teal-600">&lt;{allResults.custom.saturatedFat}{contentData.g_83}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4 pt-4 border-t">
                                <h3 className="font-bold text-lg text-gray-900">{contentData.metabolic_info_84}</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <span className="font-medium text-gray-700">{contentData.bmr_85}</span>
                                    <span className="font-bold text-gray-600">{allResults.custom.bmr}{contentData.calories_86}</span>
                                  </div>
                                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <span className="font-medium text-gray-700">{contentData.tdee_87}</span>
                                    <span className="font-bold text-gray-600">{allResults.custom.tdee}{contentData.calories_88}</span>
                                  </div>
                                </div>
                              </div>
                              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold mt-4">{contentData.save_this_calculation_89}</Button>
                            </div>}
                        </TabsContent>
                      </Tabs> : <div className="text-center py-12 text-gray-500">
                        <Utensils className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">{contentData.enter_your_details_and_click_calculate_to_see_your_90}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>
<SimilarCalculators calculators={[{
          calculatorName: "TDEE Calculator",
          calculatorHref: "/health/tdee-calculator",
        }, {
          calculatorName: "BMR Calculator",
          calculatorHref: "/health/bmr-calculator",
        }, {
          calculatorName: "Protein Intake Calculator",
          calculatorHref: "/health/protein-calculator",
        }
        ]} 
        color="green" 
        title="Related Health Calculators" />
            {/* Information Section */}
            <section className="mt-16">
              <Card className="shadow-2xl border-0 bg-white pt-0">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.what_are_macronutrients_macros_91}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 prose max-w-none">
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{contentData.in_the_context_of_health_and_fitness_macronutrient_92}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">{contentData.protein_93}</h3>
                      <p className="text-gray-600">{contentData.proteins_are_organic_compounds_comprised_of_amino__94}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">{contentData.carbohydrates_carbs_95}</h3>
                      <p className="text-gray-600">{contentData.carbohydrates_often_referred_to_as_simply_carbs_ar_96}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">{contentData.fat_97}</h3>
                      <p className="text-gray-600">{contentData.fats_are_molecules_that_are_comprised_primarily_of_98}</p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 font-medium">
                      <strong>{contentData.important_99}</strong>{contentData.the_results_above_are_a_guideline_for_more_typical_100}</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="macro-calculator"
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
