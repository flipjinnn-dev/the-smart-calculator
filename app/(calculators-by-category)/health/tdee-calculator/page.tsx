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
import { Calculator, RotateCcw, Zap, User, Activity } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
;
export default function TdeeCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('tdee-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('tdee-calculator', language, "calculator-guide");

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
    "tdee_calculation_0": "",
    "enter_your_details_to_calculate_your_total_daily_e_1": "",
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
    "sedentary_littleno_exercise_12_18": "",
    "light_exercise_13week_1375_19": "",
    "moderate_exercise_45week_155_20": "",
    "active_daily_or_intense_34week_1725_21": "",
    "very_active_intense_67week_19_22": "",
    "extra_active_very_intense_daily_physical_job_20_23": "",
    "bmr_formula_24": "",
    "mifflinst_jeor_default_25": "",
    "katchmcardle_if_body_fat_available_26": "",
    "body_fat_27": "",
    "result_unit_28": "",
    "calories_29": "",
    "kilojoules_30": "",
    "calculate_31": "",
    "reset_32": "",
    "daily_energy_33": "",
    "tdee_34": "",
    "enter_your_details_to_calculate_your_total_daily_e_35": "",
    "comprehensive_nutrition_results_36": "",
    "daily_protein_requirement_37": "",
    "g_38": "",
    "percentage_of_total_calories_from_protein_39": "",
    "the_estimated_tdee_maintenance_energy_40": "",
    "caloriesday_41": "",
    "bmr_42": "",
    "caloriesday_43": "",
    "bmi_score_44": "",
    "kgm_45": "",
    "healthy_bmi_range_185_25_kgm_46": "",
    "energy_intake_to_lose_weight_47": "",
    "mild_weight_loss_025_kgweek_48": "",
    "k_90_caloriesday_49": "",
    "weight_loss_05_kgweek_50": "",
    "k_81_caloriesday_51": "",
    "extreme_weight_loss_1_kgweek_52": "",
    "k_61_caloriesday_53": "",
    "energy_intake_to_gain_weight_54": "",
    "mild_weight_gain_025_kgweek_55": "",
    "k_110_caloriesday_56": "",
    "weight_gain_05_kgweek_57": "",
    "k_119_caloriesday_58": "",
    "fast_weight_gain_1_kgweek_59": "",
    "k_139_caloriesday_60": "",
    "understanding_your_comprehensive_results_61": "",
    "protein_requirements_62": "",
    "sedentary_08_gkg_body_weight_63": "",
    "lightmoderate_1016_gkg_64": "",
    "heavy_training_1622_gkg_65": "",
    "athletesmuscle_gain_up_to_25_gkg_66": "",
    "weight_management_67": "",
    "safe_weight_loss_02505_kg_per_week_68": "",
    "extreme_loss_1_kgweek_requires_medical_supervision_69": "",
    "gradual_weight_gain_prevents_excess_fat_accumulati_70": "",
    "monitor_progress_and_adjust_as_needed_71": "",
    "about_tdee_72": "",
    "bmr_formulas_73": "",
    "mifflinst_jeor_recommended_74": "",
    "men_bmr_10weight_625height_5age_5_75": "",
    "women_bmr_10weight_625height_5age_161_76": "",
    "katchmcardle_77": "",
    "bmr_370_216_lean_body_mass_78": "",
    "more_accurate_if_body_fat_is_known_79": "",
    "activity_multipliers_80": "",
    "k_12_81": "",
    "sedentary_desk_job_no_exercise_82": "",
    "k_1375_83": "",
    "light_exercise_13week_84": "",
    "k_155_85": "",
    "moderate_exercise_45week_86": "",
    "k_1725_87": "",
    "active_daily_exercise_or_intense_34week_88": "",
    "k_19_89": "",
    "very_active_intense_exercise_67week_90": "",
    "k_20_91": "",
    "extra_active_very_intense_daily_physical_job_92": "",
    "using_your_tdee_93": "",
    "weight_loss_94": "",
    "eat_300500_calories_below_tdee_95": "",
    "weight_maintenance_96": "",
    "eat_at_your_tdee_97": "",
    "weight_gain_98": "",
    "eat_300500_calories_above_tdee_99": "",
    "muscle_building_100": "",
    "eat_200300_calories_above_tdee_101": "",
    "important_notes_102": "",
    "tdee_is_an_estimate_monitor_and_adjust_based_on_re_103": "",
    "muscle_mass_significantly_affects_metabolic_rate_104": "",
    "age_genetics_and_hormones_influence_actual_needs_105": "",
    "recalculate_as_weight_and_activity_levels_change_106": ""
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
  const [resultUnit, setResultUnit] = useState("calories"); // calories, kilojoules

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
  const calculateTDEE = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    try {
      // Convert weight to kg
      let weightInKg = 0;
      if (weightUnit === "metric") {
        weightInKg = Number.parseFloat(weightKg);
      } else {
        weightInKg = Number.parseFloat(weightLbs) * 0.453592;
      }

      // Convert height to cm
      let heightInCm = 0;
      if (heightUnit === "metric") {
        heightInCm = Number.parseFloat(heightCm);
      } else {
        const ft = Number.parseInt(heightFt);
        const inches = Number.parseInt(heightIn);
        heightInCm = ft * 30.48 + inches * 2.54;
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

      // Get activity multiplier and protein requirement
      let activityMultiplier = 1.2;
      let activityDescription = "";
      let proteinPerKg = 0.8; // Default protein requirement

      switch (activityLevel) {
        case "sedentary":
          activityMultiplier = 1.2;
          activityDescription = "Sedentary (little/no exercise)";
          proteinPerKg = 0.8;
          break;
        case "light":
          activityMultiplier = 1.375;
          activityDescription = "Light (exercise 1-3×/week)";
          proteinPerKg = 1.0;
          break;
        case "moderate":
          activityMultiplier = 1.55;
          activityDescription = "Moderate (exercise 4-5×/week)";
          proteinPerKg = 1.6;
          break;
        case "active":
          activityMultiplier = 1.725;
          activityDescription = "Active (daily or intense 3-4×/week)";
          proteinPerKg = 1.6;
          break;
        case "very_active":
          activityMultiplier = 1.9;
          activityDescription = "Very Active (intense 6-7×/week)";
          proteinPerKg = 2.2;
          break;
        case "extra_active":
          activityMultiplier = 2.0;
          activityDescription = "Extra Active (very intense exercise daily / physical job)";
          proteinPerKg = 2.5;
          break;
      }

      // Calculate
      const tdeeCalories = Math.round(bmr * activityMultiplier);
      const tdeeKilojoules = Math.round(tdeeCalories * 4.184);
      const proteinGrams = Math.round(weightInKg * proteinPerKg);
      const proteinCalories = proteinGrams * 4;
      const proteinPercentage = Math.round(proteinCalories / tdeeCalories * 100);
      const heightInM = heightInCm / 100;
      const bmi = Number.parseFloat((weightInKg / (heightInM * heightInM)).toFixed(1));
      let bmiCategory = "";
      if (bmi < 18.5) {
        bmiCategory = "Underweight";
      } else if (bmi < 25) {
        bmiCategory = "Normal";
      } else if (bmi < 30) {
        bmiCategory = "Overweight";
      } else {
        bmiCategory = "Obese";
      }
      const calorieGoals = {
        mildWeightLoss: Math.round(tdeeCalories * 0.9),
        weightLoss: Math.round(tdeeCalories * 0.81),
        extremeWeightLoss: Math.round(tdeeCalories * 0.61),
        mildWeightGain: Math.round(tdeeCalories * 1.1),
        weightGain: Math.round(tdeeCalories * 1.19),
        fastWeightGain: Math.round(tdeeCalories * 1.39)
      };
      const results = {
        age: ageNum,
        gender: gender,
        weight: weightInKg,
        weightDisplay: weightUnit === "metric" ? `${weightKg} kg` : `${weightLbs} lbs`,
        height: heightInCm,
        heightDisplay: heightUnit === "metric" ? `${heightCm} cm` : `${heightFt}'${heightIn}"`,
        activityLevel: activityDescription,
        activityMultiplier,
        formula: formula === "mifflin" ? "Mifflin-St Jeor" : "Katch-McArdle",
        bmr: Math.round(bmr),
        tdeeCalories,
        tdeeKilojoules,
        resultUnit,
        proteinGrams,
        proteinPercentage,
        bmi,
        bmiCategory,
        calorieGoals
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating TDEE. Please check your inputs and try again."
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
    setResultUnit("calories");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>{contentData.tdee_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_details_to_calculate_your_total_daily_e_1}</CardDescription>
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
                              <User className="h-5 w-5 text-blue-500" />
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
                            <button type="button" onClick={() => setHeightUnit("metric")} className={`px-3 py-1 text-xs rounded ${heightUnit === "metric" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.metric_7}</button>
                            <button type="button" onClick={() => setHeightUnit("us")} className={`px-3 py-1 text-xs rounded ${heightUnit === "us" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.us_8}</button>
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
                            <button type="button" onClick={() => setWeightUnit("metric")} className={`px-3 py-1 text-xs rounded ${weightUnit === "metric" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.metric_13}</button>
                            <button type="button" onClick={() => setWeightUnit("us")} className={`px-3 py-1 text-xs rounded ${weightUnit === "us" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>{contentData.us_14}</button>
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
                            <SelectItem value="sedentary">{contentData.sedentary_littleno_exercise_12_18}</SelectItem>
                            <SelectItem value="light">{contentData.light_exercise_13week_1375_19}</SelectItem>
                            <SelectItem value="moderate">{contentData.moderate_exercise_45week_155_20}</SelectItem>
                            <SelectItem value="active">{contentData.active_daily_or_intense_34week_1725_21}</SelectItem>
                            <SelectItem value="very_active">{contentData.very_active_intense_67week_19_22}</SelectItem>
                            <SelectItem value="extra_active">{contentData.extra_active_very_intense_daily_physical_job_20_23}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.activityLevel && <p className="text-red-600 text-xs mt-1">{errors.activityLevel}</p>}
                      </div>

                      {/* BMR Formula Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.bmr_formula_24}</Label>
                        <RadioGroup value={formula} onValueChange={setFormula} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mifflin" id="mifflin" />
                            <Label htmlFor="mifflin" className="cursor-pointer">{contentData.mifflinst_jeor_default_25}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="katch" id="katch" />
                            <Label htmlFor="katch" className="cursor-pointer">{contentData.katchmcardle_if_body_fat_available_26}</Label>
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

                      {/* Result Unit */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.result_unit_28}</Label>
                        <RadioGroup value={resultUnit} onValueChange={setResultUnit} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="calories" id="calories" />
                            <Label htmlFor="calories" className="cursor-pointer">{contentData.calories_29}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="kilojoules" id="kilojoules" />
                            <Label htmlFor="kilojoules" className="cursor-pointer">{contentData.kilojoules_30}</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateTDEE} className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">{contentData.calculate_31}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_32}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-cyan-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-3 shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.daily_energy_33}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-blue-200">
                          <p className="text-2xl font-bold text-blue-900 mb-2">
                            {resultUnit === "calories" ? `${result.tdeeCalories}` : `${result.tdeeKilojoules}`}
                          </p>
                          <p className="text-sm font-medium text-gray-600">
                            {resultUnit === "calories" ? "kcal/day" : "kJ/day"}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">{contentData.tdee_34}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Zap className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_details_to_calculate_your_total_daily_e_35}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <span>{contentData.comprehensive_nutrition_results_36}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200 mb-6">
                      <div className="space-y-4 text-gray-800">
                        <div>
                          <p className="text-lg font-semibold text-blue-700 mb-2">{contentData.daily_protein_requirement_37}{result.proteinGrams}{contentData.g_38}</p>
                          <p className="text-sm text-gray-600">{contentData.percentage_of_total_calories_from_protein_39}{result.proteinPercentage}%
                          </p>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-lg font-semibold text-blue-700 mb-2">{contentData.the_estimated_tdee_maintenance_energy_40}{result.tdeeCalories.toLocaleString()}{contentData.caloriesday_41}</p>
                          <p className="text-sm text-gray-600">{contentData.bmr_42}{result.bmr.toLocaleString()}{contentData.caloriesday_43}</p>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-lg font-semibold text-blue-700 mb-2">{contentData.bmi_score_44}{result.bmi}{contentData.kgm_45}{result.bmiCategory})
                          </p>
                          <p className="text-sm text-gray-600">{contentData.healthy_bmi_range_185_25_kgm_46}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-700 mb-4 text-lg">{contentData.energy_intake_to_lose_weight_47}</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">{contentData.mild_weight_loss_025_kgweek_48}</span>
                            <span className="font-semibold text-red-700">
                              {result.calorieGoals.mildWeightLoss.toLocaleString()}{contentData.k_90_caloriesday_49}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">{contentData.weight_loss_05_kgweek_50}</span>
                            <span className="font-semibold text-red-700">
                              {result.calorieGoals.weightLoss.toLocaleString()}{contentData.k_81_caloriesday_51}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">{contentData.extreme_weight_loss_1_kgweek_52}</span>
                            <span className="font-semibold text-red-700">
                              {result.calorieGoals.extremeWeightLoss.toLocaleString()}{contentData.k_61_caloriesday_53}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-4 text-lg">{contentData.energy_intake_to_gain_weight_54}</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">{contentData.mild_weight_gain_025_kgweek_55}</span>
                            <span className="font-semibold text-green-700">
                              {result.calorieGoals.mildWeightGain.toLocaleString()}{contentData.k_110_caloriesday_56}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">{contentData.weight_gain_05_kgweek_57}</span>
                            <span className="font-semibold text-green-700">
                              {result.calorieGoals.weightGain.toLocaleString()}{contentData.k_119_caloriesday_58}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">{contentData.fast_weight_gain_1_kgweek_59}</span>
                            <span className="font-semibold text-green-700">
                              {result.calorieGoals.fastWeightGain.toLocaleString()}{contentData.k_139_caloriesday_60}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg border border-blue-200 mt-6">
                      <h4 className="font-semibold text-blue-700 mb-3">{contentData.understanding_your_comprehensive_results_61}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                        <div>
                          <p className="mb-2">
                            <strong>{contentData.protein_requirements_62}</strong>
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>{contentData.sedentary_08_gkg_body_weight_63}</li>
                            <li>{contentData.lightmoderate_1016_gkg_64}</li>
                            <li>{contentData.heavy_training_1622_gkg_65}</li>
                            <li>{contentData.athletesmuscle_gain_up_to_25_gkg_66}</li>
                          </ul>
                        </div>
                        <div>
                          <p className="mb-2">
                            <strong>{contentData.weight_management_67}</strong>
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>{contentData.safe_weight_loss_02505_kg_per_week_68}</li>
                            <li>{contentData.extreme_loss_1_kgweek_requires_medical_supervision_69}</li>
                            <li>{contentData.gradual_weight_gain_prevents_excess_fat_accumulati_70}</li>
                            <li>{contentData.monitor_progress_and_adjust_as_needed_71}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mr-3 shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.about_tdee_72}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.bmr_formulas_73}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>{contentData.mifflinst_jeor_recommended_74}</strong>
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                          <li>{contentData.men_bmr_10weight_625height_5age_5_75}</li>
                          <li>{contentData.women_bmr_10weight_625height_5age_161_76}</li>
                        </ul>
                        <p className="text-sm text-gray-700 mt-2 mb-2">
                          <strong>{contentData.katchmcardle_77}</strong>
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                          <li>{contentData.bmr_370_216_lean_body_mass_78}</li>
                          <li>{contentData.more_accurate_if_body_fat_is_known_79}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.activity_multipliers_80}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.k_12_81}</strong>{contentData.sedentary_desk_job_no_exercise_82}</li>
                          <li>
                            <strong>{contentData.k_1375_83}</strong>{contentData.light_exercise_13week_84}</li>
                          <li>
                            <strong>{contentData.k_155_85}</strong>{contentData.moderate_exercise_45week_86}</li>
                          <li>
                            <strong>{contentData.k_1725_87}</strong>{contentData.active_daily_exercise_or_intense_34week_88}</li>
                          <li>
                            <strong>{contentData.k_19_89}</strong>{contentData.very_active_intense_exercise_67week_90}</li>
                          <li>
                            <strong>{contentData.k_20_91}</strong>{contentData.extra_active_very_intense_daily_physical_job_92}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-700 mb-3">{contentData.using_your_tdee_93}</h3>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.weight_loss_94}</strong>{contentData.eat_300500_calories_below_tdee_95}</li>
                          <li>
                            <strong>{contentData.weight_maintenance_96}</strong>{contentData.eat_at_your_tdee_97}</li>
                          <li>
                            <strong>{contentData.weight_gain_98}</strong>{contentData.eat_300500_calories_above_tdee_99}</li>
                          <li>
                            <strong>{contentData.muscle_building_100}</strong>{contentData.eat_200300_calories_above_tdee_101}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-cyan-700 mb-3">{contentData.important_notes_102}</h3>
                      <div className="bg-white p-4 rounded-lg border border-cyan-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.tdee_is_an_estimate_monitor_and_adjust_based_on_re_103}</li>
                          <li>{contentData.muscle_mass_significantly_affects_metabolic_rate_104}</li>
                          <li>{contentData.age_genetics_and_hormones_influence_actual_needs_105}</li>
                          <li>{contentData.recalculate_as_weight_and_activity_levels_change_106}</li>
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