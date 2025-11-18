"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Calculator, RotateCcw, Droplets, User, Target } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
export default function FatIntakeCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('fat-intake-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('fat-intake-calculator', language, "calculator-guide");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "form": "",
    "results": "",
    "educational": "",
    "messages": "",
    "disclaimer": "",
    "seekHelp": "",
    "errors": "",
    "tooltips": "",
    "fat_calculation_0": "",
    "enter_your_details_to_calculate_your_optimal_daily_1": "",
    "age_years_2": "",
    "gender_3": "",
    "male_4": "",
    "female_5": "",
    "height_6": "",
    "metric_7": "",
    "us_8": "",
    "cm_9": "",
    "ft_10": "",
    "in_11": "",
    "weight_12": "",
    "metric_13": "",
    "us_14": "",
    "kg_15": "",
    "lbs_16": "",
    "activity_level_17": "",
    "sedentary_littleno_exercise_18": "",
    "light_13week_19": "",
    "moderate_45week_20": "",
    "active_daily_or_intense_34week_21": "",
    "very_active_intense_67week_22": "",
    "extra_active_very_intense_or_physical_job_23": "",
    "bmr_formula_24": "",
    "mifflinst_jeor_default_25": "",
    "katchmcardle_if_body_fat_known_26": "",
    "body_fat_27": "",
    "calculate_intake_28": "",
    "reset_29": "",
    "daily_fat_range_30": "",
    "g_31": "",
    "per_day_32": "",
    "maintenance_33": "",
    "enter_your_details_to_calculate_your_optimal_daily_34": "",
    "fat_intake_results_35": "",
    "goal_36": "",
    "daily_calories_37": "",
    "fat_range_2035_38": "",
    "sat_fat_limit_10_39": "",
    "sat_fat_limit_7_40": "",
    "kcal_41": "",
    "g_42": "",
    "g_43": "",
    "g_44": "",
    "calculation_details_45": "",
    "bmr_formula_46": "",
    "bmr_47": "",
    "kcalday_48": "",
    "activity_level_49": "",
    "tdee_maintenance_50": "",
    "kcalday_51": "",
    "your_profile_52": "",
    "age_53": "",
    "years_54": "",
    "gender_55": "",
    "height_56": "",
    "weight_57": "",
    "important_notes_58": "",
    "fat_provides_9_kcal_per_gram_59": "",
    "healthy_range_2035_of_daily_calories_60": "",
    "saturated_fat_should_be_kept_below_10_or_7_for_hea_61": "",
    "individual_needs_may_vary_depending_on_health_cond_62": "",
    "focus_on_healthy_fats_from_nuts_seeds_fish_and_oli_63": "",
    "about_fat_requirements_64": "",
    "types_of_dietary_fat_65": "",
    "monounsaturated_66": "",
    "olive_oil_avocados_nuts_67": "",
    "polyunsaturated_68": "",
    "fish_walnuts_flaxseeds_69": "",
    "saturated_70": "",
    "meat_dairy_coconut_oil_limit_71": "",
    "trans_fats_72": "",
    "processed_foods_avoid_73": "",
    "health_benefits_74": "",
    "essential_for_vitamin_absorption_a_d_e_k_75": "",
    "supports_brain_and_nervous_system_function_76": "",
    "provides_essential_fatty_acids_77": "",
    "helps_maintain_healthy_skin_and_hair_78": "",
    "healthy_fat_sources_79": "",
    "food_80": "",
    "fat100g_81": "",
    "olive_oil_82": "",
    "k_100g_83": "",
    "avocado_84": "",
    "k_15g_85": "",
    "almonds_86": "",
    "k_49g_87": "",
    "salmon_88": "",
    "k_13g_89": "",
    "walnuts_90": "",
    "k_65g_91": "",
    "guidelines_92": "",
    "choose_unsaturated_fats_over_saturated_93": "",
    "include_omega3_fatty_acids_regularly_94": "",
    "limit_processed_and_fried_foods_95": "",
    "read_nutrition_labels_carefully_96": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
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
  const [bodyFat, setBodyFat] = useState("");
  const [formula, setFormula] = useState("mifflin"); // mifflin, katch

  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const ageNum = Number.parseInt(age);
    if (!age || ageNum < 18 || ageNum > 80) {
      newErrors.age = "Please enter a valid age (18-80)";
    }

    // Height validation
    if (heightUnit === "metric") {
      const heightCmNum = Number.parseFloat(heightCm);
      if (!heightCm || heightCmNum < 100 || heightCmNum > 250) {
        newErrors.height = "Please enter a valid height (100-250 cm)";
      }
    } else {
      const heightFtNum = Number.parseInt(heightFt);
      const heightInNum = Number.parseInt(heightIn);
      if (!heightFt || heightFtNum < 3 || heightFtNum > 8) {
        newErrors.heightFt = "Please enter valid feet (3-8)";
      }
      if (!heightIn || heightInNum < 0 || heightInNum > 11) {
        newErrors.heightIn = "Please enter valid inches (0-11)";
      }
    }

    // Weight validation
    if (weightUnit === "metric") {
      const weightKgNum = Number.parseFloat(weightKg);
      if (!weightKg || weightKgNum < 30 || weightKgNum > 300) {
        newErrors.weight = "Please enter a valid weight (30-300 kg)";
      }
    } else {
      const weightLbsNum = Number.parseFloat(weightLbs);
      if (!weightLbs || weightLbsNum < 66 || weightLbsNum > 660) {
        newErrors.weight = "Please enter a valid weight (66-660 lbs)";
      }
    }
    if (!activityLevel) {
      newErrors.activityLevel = "Please select an activity level";
    }

    // Body fat validation (optional)
    if (bodyFat && formula === "katch") {
      const bodyFatNum = Number.parseFloat(bodyFat);
      if (bodyFatNum < 5 || bodyFatNum > 50) {
        newErrors.bodyFat = "Please enter a valid body fat percentage (5-50%)";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateFatIntake = () => {
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

      // Convert height to cm
      let heightInCm = 0;
      if (heightUnit === "metric") {
        heightInCm = Number.parseFloat(heightCm);
      } else {
        const ft = Number.parseInt(heightFt);
        const inches = Number.parseInt(heightIn);
        heightInCm = (ft * 12 + inches) * 2.54;
      }
      const ageNum = Number.parseInt(age);

      // Calculate
      let bmr = 0;
      if (formula === "mifflin") {
        // Mifflin-St Jeor
        if (gender === "male") {
          bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum + 5;
        } else {
          bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageNum - 161;
        }
      } else {
        // Katch-McArdle (requires body fat %)
        const bodyFatPercent = Number.parseFloat(bodyFat) / 100;
        const lbm = weightInKg * (1 - bodyFatPercent);
        bmr = 370 + 21.6 * lbm;
      }

      // Get activity multiplier
      let activityMultiplier = 1.2;
      let activityDescription = "";
      switch (activityLevel) {
        case "sedentary":
          activityMultiplier = 1.2;
          activityDescription = "Sedentary (little/no exercise)";
          break;
        case "light":
          activityMultiplier = 1.375;
          activityDescription = "Light (1-3×/week)";
          break;
        case "moderate":
          activityMultiplier = 1.55;
          activityDescription = "Moderate (4-5×/week)";
          break;
        case "active":
          activityMultiplier = 1.725;
          activityDescription = "Active (daily or intense 3-4×/week)";
          break;
        case "very_active":
          activityMultiplier = 1.9;
          activityDescription = "Very Active (intense 6-7×/week)";
          break;
        case "extra_active":
          activityMultiplier = 2.0;
          activityDescription = "Extra Active (very intense or physical job)";
          break;
      }

      // Calculate (maintenance calories)
      const tdee = Math.round(bmr * activityMultiplier);

      // Create calorie targets
      const calorieTargets = [{
        goal: "Lose 1 kg/week",
        calories: tdee - 1000
      }, {
        goal: "Lose 0.5 kg/week",
        calories: tdee - 500
      }, {
        goal: "Maintain weight",
        calories: tdee
      }, {
        goal: "Gain 0.5 kg/week",
        calories: tdee + 500
      }, {
        goal: "Gain 1 kg/week",
        calories: tdee + 1000
      }];

      // Calculate intake for each target
      const fatResults = calorieTargets.map(target => {
        const fatMinGrams = Math.round(target.calories * 0.2 / 9); // 20% of calories
        const fatMaxGrams = Math.round(target.calories * 0.35 / 9); // 35% of calories
        const satFatLimit10 = Math.round(target.calories * 0.1 / 9); // 10% limit
        const satFatLimit7 = Math.round(target.calories * 0.07 / 9); // 7% limit

        return {
          ...target,
          fatMinGrams,
          fatMaxGrams,
          satFatLimit10,
          satFatLimit7
        };
      });
      const results = {
        age: ageNum,
        gender: gender,
        weight: weightInKg,
        weightDisplay: weightUnit === "metric" ? `${weightKg} kg` : `${weightLbs} lbs`,
        height: heightInCm,
        heightDisplay: heightUnit === "metric" ? `${heightCm} cm` : `${heightFt}'${heightIn}"`,
        activityLevel: activityDescription,
        formula: formula === "mifflin" ? "Mifflin-St Jeor" : "Katch-McArdle",
        bmr: Math.round(bmr),
        tdee,
        fatResults
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating fat intake. Please check your inputs and try again."
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
    setBodyFat("");
    setFormula("mifflin");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-orange-600" />
                      <span>{contentData.fat_calculation_0}</span>
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
                              <User className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`} type="number" placeholder="30" value={age} onChange={e => setAge(e.target.value)} min="18" max="80" />
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
                            <button type="button" onClick={() => setHeightUnit("metric")} className={`px-3 py-1 text-xs rounded ${heightUnit === "metric" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.metric_7}</button>
                            <button type="button" onClick={() => setHeightUnit("us")} className={`px-3 py-1 text-xs rounded ${heightUnit === "us" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.us_8}</button>
                          </div>
                        </div>

                        {heightUnit === "metric" ? <div className="relative">
                            <Input className={`h-12 ${errors.height ? "border-red-300" : ""}`} type="number" placeholder="175" value={heightCm} onChange={e => setHeightCm(e.target.value)} min="100" max="250" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.cm_9}</span>
                          </div> : <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                              <Input className={`h-12 ${errors.heightFt ? "border-red-300" : ""}`} type="number" placeholder="5" value={heightFt} onChange={e => setHeightFt(e.target.value)} min="3" max="8" />
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
                            <button type="button" onClick={() => setWeightUnit("metric")} className={`px-3 py-1 text-xs rounded ${weightUnit === "metric" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.metric_13}</button>
                            <button type="button" onClick={() => setWeightUnit("us")} className={`px-3 py-1 text-xs rounded ${weightUnit === "us" ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.us_14}</button>
                          </div>
                        </div>

                        <div className="relative">
                          {weightUnit === "metric" ? <>
                              <Input className={`h-12 ${errors.weight ? "border-red-300" : ""}`} type="number" placeholder="70" value={weightKg} onChange={e => setWeightKg(e.target.value)} min="30" max="300" step="0.1" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.kg_15}</span>
                            </> : <>
                              <Input className={`h-12 ${errors.weight ? "border-red-300" : ""}`} type="number" placeholder="154" value={weightLbs} onChange={e => setWeightLbs(e.target.value)} min="66" max="660" step="0.1" />
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
                            <SelectItem value="sedentary">{contentData.sedentary_littleno_exercise_18}</SelectItem>
                            <SelectItem value="light">{contentData.light_13week_19}</SelectItem>
                            <SelectItem value="moderate">{contentData.moderate_45week_20}</SelectItem>
                            <SelectItem value="active">{contentData.active_daily_or_intense_34week_21}</SelectItem>
                            <SelectItem value="very_active">{contentData.very_active_intense_67week_22}</SelectItem>
                            <SelectItem value="extra_active">{contentData.extra_active_very_intense_or_physical_job_23}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.activityLevel && <p className="text-red-600 text-xs mt-1">{errors.activityLevel}</p>}
                      </div>

                      {/* Formula Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.bmr_formula_24}</Label>
                        <RadioGroup value={formula} onValueChange={setFormula} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mifflin" id="mifflin" />
                            <Label htmlFor="mifflin" className="cursor-pointer">{contentData.mifflinst_jeor_default_25}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="katch" id="katch" />
                            <Label htmlFor="katch" className="cursor-pointer">{contentData.katchmcardle_if_body_fat_known_26}</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Body Fat % (conditional) */}
                      {formula === "katch" && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.body_fat_27}</Label>
                          <div className="relative">
                            <Input className={`h-12 ${errors.bodyFat ? "border-red-300" : ""}`} type="number" placeholder="15" value={bodyFat} onChange={e => setBodyFat(e.target.value)} min="5" max="50" step="0.1" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                              %
                            </span>
                          </div>
                          {errors.bodyFat && <p className="text-red-600 text-xs mt-1">{errors.bodyFat}</p>}
                        </div>}
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateFatIntake} className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">{contentData.calculate_intake_28}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_29}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center mb-3 shadow-lg">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.daily_fat_range_30}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-orange-200">
                          <p className="text-2xl font-bold text-orange-900 mb-2">
                            {result.fatResults[2].fatMinGrams}-{result.fatResults[2].fatMaxGrams}{contentData.g_31}</p>
                          <p className="text-sm font-medium text-gray-600">{contentData.per_day_32}</p>
                          <p className="text-sm text-gray-500 mt-2">{contentData.maintenance_33}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Droplets className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_details_to_calculate_your_optimal_daily_34}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Target className="w-6 h-6 text-orange-600" />
                      <span>{contentData.fat_intake_results_35}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Results Table */}
                    <div className="overflow-x-auto mb-8">
                      <table className="w-full border-collapse border border-orange-200 rounded-lg">
                        <thead>
                          <tr className="bg-gradient-to-r from-orange-50 to-amber-50">
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">{contentData.goal_36}</th>
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">{contentData.daily_calories_37}</th>
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">{contentData.fat_range_2035_38}</th>
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">{contentData.sat_fat_limit_10_39}</th>
                            <th className="border border-orange-200 p-3 text-left font-semibold text-orange-700">{contentData.sat_fat_limit_7_40}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.fatResults.map((row: any, index: number) => <tr key={index} className={index === 2 ? "bg-orange-50" : ""}>
                              <td className="border border-orange-200 p-3 font-medium">{row.goal}</td>
                              <td className="border border-orange-200 p-3">{row.calories}{contentData.kcal_41}</td>
                              <td className="border border-orange-200 p-3 font-semibold text-orange-700">
                                {row.fatMinGrams}-{row.fatMaxGrams}{contentData.g_42}</td>
                              <td className="border border-orange-200 p-3">&lt;{row.satFatLimit10}{contentData.g_43}</td>
                              <td className="border border-orange-200 p-3">&lt;{row.satFatLimit7}{contentData.g_44}</td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>

                    {/* Calculation Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-orange-700 mb-3">{contentData.calculation_details_45}</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>{contentData.bmr_formula_46}</strong> {result.formula}
                          </p>
                          <p>
                            <strong>{contentData.bmr_47}</strong> {result.bmr}{contentData.kcalday_48}</p>
                          <p>
                            <strong>{contentData.activity_level_49}</strong> {result.activityLevel}
                          </p>
                          <p>
                            <strong>{contentData.tdee_maintenance_50}</strong> {result.tdee}{contentData.kcalday_51}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <h4 className="font-semibold text-amber-700 mb-3">{contentData.your_profile_52}</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>{contentData.age_53}</strong> {result.age}{contentData.years_54}</p>
                          <p>
                            <strong>{contentData.gender_55}</strong> {result.gender}
                          </p>
                          <p>
                            <strong>{contentData.height_56}</strong> {result.heightDisplay}
                          </p>
                          <p>
                            <strong>{contentData.weight_57}</strong> {result.weightDisplay}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-6 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-700 mb-3">{contentData.important_notes_58}</h4>
                      <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                        <li>{contentData.fat_provides_9_kcal_per_gram_59}</li>
                        <li>{contentData.healthy_range_2035_of_daily_calories_60}</li>
                        <li>{contentData.saturated_fat_should_be_kept_below_10_or_7_for_hea_61}</li>
                        <li>{contentData.individual_needs_may_vary_depending_on_health_cond_62}</li>
                        <li>{contentData.focus_on_healthy_fats_from_nuts_seeds_fish_and_oli_63}</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "U.S. Army Body Fat Calculator",
          calculatorHref: "/health/army-body-fat-calculator",
        }, {
          calculatorName: "Lean Body Mass Calculator",
          calculatorHref: "/health/lean-body-mass-calculator",
        }, {
          calculatorName: "Overweight Calculator",
          calculatorHref: "/health/overweight-calculator",
        }
        ]} 
        color="orange" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center mr-3 shadow-lg">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.about_fat_requirements_64}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.types_of_dietary_fat_65}</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.monounsaturated_66}</strong>{contentData.olive_oil_avocados_nuts_67}</li>
                          <li>
                            <strong>{contentData.polyunsaturated_68}</strong>{contentData.fish_walnuts_flaxseeds_69}</li>
                          <li>
                            <strong>{contentData.saturated_70}</strong>{contentData.meat_dairy_coconut_oil_limit_71}</li>
                          <li>
                            <strong>{contentData.trans_fats_72}</strong>{contentData.processed_foods_avoid_73}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-orange-700 mb-3">{contentData.health_benefits_74}</h3>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.essential_for_vitamin_absorption_a_d_e_k_75}</li>
                          <li>{contentData.supports_brain_and_nervous_system_function_76}</li>
                          <li>{contentData.provides_essential_fatty_acids_77}</li>
                          <li>{contentData.helps_maintain_healthy_skin_and_hair_78}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-amber-700 mb-3">{contentData.healthy_fat_sources_79}</h3>
                      <div className="bg-white p-4 rounded-lg border border-amber-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{contentData.food_80}</th>
                              <th className="text-left py-2">{contentData.fat100g_81}</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">{contentData.olive_oil_82}</td>
                              <td>{contentData.k_100g_83}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.avocado_84}</td>
                              <td>{contentData.k_15g_85}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.almonds_86}</td>
                              <td>{contentData.k_49g_87}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.salmon_88}</td>
                              <td>{contentData.k_13g_89}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.walnuts_90}</td>
                              <td>{contentData.k_65g_91}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-amber-700 mb-3">{contentData.guidelines_92}</h3>
                      <div className="bg-white p-4 rounded-lg border border-amber-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.choose_unsaturated_fats_over_saturated_93}</li>
                          <li>{contentData.include_omega3_fatty_acids_regularly_94}</li>
                          <li>{contentData.limit_processed_and_fried_foods_95}</li>
                          <li>{contentData.read_nutrition_labels_carefully_96}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

           {/* How to Use Section */}
          <div className="mt-8">
              <CalculatorGuide data={guideData} />
          </div>
        </main>
      </div>
    </>;
}