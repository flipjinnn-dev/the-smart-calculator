"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

import { Heart, Calculator, RotateCcw, Activity, Scale, Ruler, User } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;
export default function BmrCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('bmr-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('bmr-calculator', language, "calculator-guide");

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
    "bmr_calculation_0": "",
    "enter_your_details_to_calculate_your_basal_metabol_1": "",
    "bmr_formula_2": "",
    "mifflinst_jeor_recommended_3": "",
    "revised_harrisbenedict_4": "",
    "katchmcardle_requires_body_fat_5": "",
    "unit_system_6": "",
    "metric_kg_cm_7": "",
    "us_lbs_ftin_8": "",
    "age_years_9": "",
    "age_range_1580_years_10": "",
    "gender_11": "",
    "male_12": "",
    "female_13": "",
    "height_cm_14": "",
    "height_in_centimeters_15": "",
    "height_ftin_16": "",
    "feet_and_inches_17": "",
    "weight_18": "",
    "weight_in_19": "",
    "body_fat_percentage_20": "",
    "required_for_katchmcardle_formula_use_dexa_scan_or_21": "",
    "result_unit_22": "",
    "kcalday_23": "",
    "kjday_24": "",
    "calculate_25": "",
    "reset_26": "",
    "bmr_result_27": "",
    "day_28": "",
    "basal_metabolic_rate_29": "",
    "day_30": "",
    "sedentary_no_exercise_31": "",
    "day_32": "",
    "moderately_active_33": "",
    "enter_your_details_and_click_calculate_see_your_bm_34": "",
    "bmr_daily_calorie_needs_35": "",
    "day_36": "",
    "your_basal_metabolic_rate_37": "",
    "this_is_the_number_of_calories_your_body_burns_at__38": "",
    "sedentary_39": "",
    "day_40": "",
    "little_or_no_exercise_41": "",
    "lightly_active_42": "",
    "day_43": "",
    "light_exercise_13_daysweek_44": "",
    "moderately_active_45": "",
    "day_46": "",
    "moderate_exercise_35_daysweek_47": "",
    "very_active_48": "",
    "day_49": "",
    "hard_exercise_67_daysweek_50": "",
    "extra_active_51": "",
    "day_52": "",
    "very_hard_exercise_physical_job_53": "",
    "calculation_details_54": "",
    "formula_used_55": "",
    "lean_body_mass_56": "",
    "kg_57": "",
    "base_bmr_58": "",
    "kcalday_59": "",
    "input_summary_60": "",
    "age_61": "",
    "years_62": "",
    "gender_63": "",
    "height_64": "",
    "cm_65": "",
    "weight_66": "",
    "kg_67": "",
    "body_fat_68": "",
    "formula_used_69": "",
    "bmr_370_216_lbm_where_lbm_1_body_fat_100_weight_70": "",
    "understanding_bmr_71": "",
    "bmr_formulas_72": "",
    "mifflinst_jeor_73": "",
    "most_accurate_for_general_population_74": "",
    "harrisbenedict_75": "",
    "older_formula_still_widely_used_76": "",
    "katchmcardle_77": "",
    "best_for_lean_individuals_with_known_body_fat_78": "",
    "activity_levels_79": "",
    "sedentary_80": "",
    "desk_job_no_exercise_bmr_12_81": "",
    "lightly_active_82": "",
    "light_exercise_13_daysweek_bmr_1375_83": "",
    "moderately_active_84": "",
    "moderate_exercise_35_daysweek_bmr_155_85": "",
    "very_active_86": "",
    "hard_exercise_67_daysweek_bmr_1725_87": "",
    "extra_active_88": "",
    "very_hard_exercise_physical_job_bmr_19_89": "",
    "example_calculation_90": "",
    "k_28yearold_male_175_cm_70_kg_91": "",
    "bmr_10_70_625_175_5_28_5_92": "",
    "bmr_700_109375_140_5_93": "",
    "bmr_1659_kcalday_94": "",
    "moderately_active_1659_155_95": "",
    "k_2571_kcalday_96": "",
    "important_notes_97": "",
    "bmr_decreases_with_age_and_increases_with_muscle_m_98": "",
    "these_are_estimates_individual_metabolism_varies_99": "",
    "for_weight_loss_create_a_moderate_calorie_deficit_100": "",
    "consult_healthcare_providers_for_personalized_advi_101": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [bodyFat, setBodyFat] = useState([15]);

  // Settings
  const [units, setUnits] = useState("metric"); // metric or us
  const [formula, setFormula] = useState("mifflin"); // mifflin, harris, katch
  const [resultUnit, setResultUnit] = useState("kcal"); // kcal or kj

  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};

    // Age validation
    if (!age || isNaN(Number(age))) {
      newErrors.age = "Age is required and must be a number";
    } else if (Number(age) < 15 || Number(age) > 80) {
      newErrors.age = "Age must be between 15 and 80 years";
    }

    // Gender validation
    if (!gender) {
      newErrors.gender = "Gender is required";
    }

    // Height validation
    if (units === "metric") {
      if (!heightCm || isNaN(Number(heightCm))) {
        newErrors.height = "Height is required and must be a number";
      } else if (Number(heightCm) < 100 || Number(heightCm) > 250) {
        newErrors.height = "Height must be between 100-250 cm";
      }
    } else {
      if (!heightFeet || isNaN(Number(heightFeet))) {
        newErrors.heightFeet = "Feet is required and must be a number";
      } else if (Number(heightFeet) < 3 || Number(heightFeet) > 8) {
        newErrors.heightFeet = "Feet must be between 3-8";
      }
      if (!heightInches || isNaN(Number(heightInches))) {
        newErrors.heightInches = "Inches is required and must be a number";
      } else if (Number(heightInches) < 0 || Number(heightInches) >= 12) {
        newErrors.heightInches = "Inches must be between 0-11";
      }
    }

    // Weight validation
    if (units === "metric") {
      if (!weightKg || isNaN(Number(weightKg))) {
        newErrors.weight = "Weight is required and must be a number";
      } else if (Number(weightKg) < 30 || Number(weightKg) > 300) {
        newErrors.weight = "Weight must be between 30-300 kg";
      }
    } else {
      if (!weightLbs || isNaN(Number(weightLbs))) {
        newErrors.weight = "Weight is required and must be a number";
      } else if (Number(weightLbs) < 66 || Number(weightLbs) > 660) {
        newErrors.weight = "Weight must be between 66-660 lbs";
      }
    }

    // Body fat validation for Katch-McArdle
    if (formula === "katch") {
      if (bodyFat[0] < 5 || bodyFat[0] > 50) {
        newErrors.bodyFat = "Body fat percentage must be between 5-50%";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateBMR = () => {
    if (!validateInputs()) return;
    try {
      // Convert inputs to metric
      const ageVal = Number(age);
      const genderVal = gender;
      let heightCmVal: number;
      if (units === "metric") {
        heightCmVal = Number(heightCm);
      } else {
        heightCmVal = (Number(heightFeet) * 12 + Number(heightInches)) * 2.54;
      }
      let weightKgVal: number;
      if (units === "metric") {
        weightKgVal = Number(weightKg);
      } else {
        weightKgVal = Number(weightLbs) * 0.453592;
      }
      let bmr: number;

      // Calculate based on selected formula
      if (formula === "mifflin") {
        // Mifflin-St Jeor Equation
        if (genderVal === "male") {
          bmr = 10 * weightKgVal + 6.25 * heightCmVal - 5 * ageVal + 5;
        } else {
          bmr = 10 * weightKgVal + 6.25 * heightCmVal - 5 * ageVal - 161;
        }
      } else if (formula === "harris") {
        // Revised Harris-Benedict Equation
        if (genderVal === "male") {
          bmr = 66.5 + 13.75 * weightKgVal + 5.003 * heightCmVal - 6.75 * ageVal;
        } else {
          bmr = 655.1 + 9.563 * weightKgVal + 1.85 * heightCmVal - 4.676 * ageVal;
        }
      } else if (formula === "katch") {
        // Katch-McArdle Formula
        const lbm = (1 - bodyFat[0] / 100) * weightKgVal;
        bmr = 370 + 21.6 * lbm;
      } else {
        throw new Error("Invalid formula selected");
      }

      // Calculate levels
      const activityLevels = {
        sedentary: bmr * 1.2,
        lightlyActive: bmr * 1.375,
        moderatelyActive: bmr * 1.55,
        veryActive: bmr * 1.725,
        extraActive: bmr * 1.9
      };

      // Convert to kJ if needed
      const bmrResult = resultUnit === "kj" ? bmr * 4.184 : bmr;
      const activityLevelsResult = Object.fromEntries(Object.entries(activityLevels).map(([key, value]) => [key, resultUnit === "kj" ? value * 4.184 : value]));
      setResult({
        bmr: bmrResult,
        activityLevels: activityLevelsResult,
        inputs: {
          age: ageVal,
          gender: genderVal,
          height: heightCmVal,
          weight: weightKgVal,
          bodyFat: bodyFat[0],
          formula,
          units,
          resultUnit
        },
        calculations: {
          baseBmr: bmr,
          lbm: formula === "katch" ? (1 - bodyFat[0] / 100) * weightKgVal : null
        }
      });
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating BMR. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setAge("");
    setGender("");
    setHeightCm("");
    setHeightFeet("");
    setHeightInches("");
    setWeightKg("");
    setWeightLbs("");
    setBodyFat([15]);
    setUnits("metric");
    setFormula("mifflin");
    setResultUnit("kcal");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>{contentData.bmr_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_details_to_calculate_your_basal_metabol_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    {/* Formula and Units Selection */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.bmr_formula_2}</Label>
                          <Select value={formula} onValueChange={setFormula}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mifflin">{contentData.mifflinst_jeor_recommended_3}</SelectItem>
                              <SelectItem value="harris">{contentData.revised_harrisbenedict_4}</SelectItem>
                              <SelectItem value="katch">{contentData.katchmcardle_requires_body_fat_5}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.unit_system_6}</Label>
                          <Select value={units} onValueChange={setUnits}>
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="metric">{contentData.metric_kg_cm_7}</SelectItem>
                              <SelectItem value="us">{contentData.us_lbs_ftin_8}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Age Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.age_years_9}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-green-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`} type="text" placeholder="28" value={age} onChange={e => setAge(e.target.value)} />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.age_range_1580_years_10}</p>
                      </div>

                      {/* Gender Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.gender_11}</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className={`h-12 ${errors.gender ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">{contentData.male_12}</SelectItem>
                            <SelectItem value="female">{contentData.female_13}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
                      </div>

                      {/* Height Input */}
                      {units === "metric" ? <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_cm_14}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Ruler className="h-5 w-5 text-green-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.height ? "border-red-300" : ""}`} type="text" placeholder="175" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
                          </div>
                          {errors.height && <p className="text-red-600 text-xs mt-1">{errors.height}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.height_in_centimeters_15}</p>
                        </div> : <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_ftin_16}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-green-500" />
                              </div>
                              <Input className={`h-12 pl-10 ${errors.heightFeet ? "border-red-300" : ""}`} type="text" placeholder="5" value={heightFeet} onChange={e => setHeightFeet(e.target.value)} />
                            </div>
                            <div className="relative flex-1">
                              <Input className={`h-12 ${errors.heightInches ? "border-red-300" : ""}`} type="text" placeholder="9" value={heightInches} onChange={e => setHeightInches(e.target.value)} />
                            </div>
                          </div>
                          {(errors.heightFeet || errors.heightInches) && <p className="text-red-600 text-xs mt-1">{errors.heightFeet || errors.heightInches}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.feet_and_inches_17}</p>
                        </div>}

                      {/* Weight Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.weight_18}{units === "metric" ? "kg" : "lbs"})
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Scale className="h-5 w-5 text-green-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.weight ? "border-red-300" : ""}`} type="text" placeholder={units === "metric" ? "70" : "154"} value={units === "metric" ? weightKg : weightLbs} onChange={e => units === "metric" ? setWeightKg(e.target.value) : setWeightLbs(e.target.value)} />
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.weight_in_19}{units === "metric" ? "kilograms" : "pounds"}
                        </p>
                      </div>

                      {/* Body Fat Input - only for Katch-McArdle */}
                      {formula === "katch" && <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.body_fat_percentage_20}{bodyFat[0]}%
                          </Label>
                          <div className="px-3">
                            <Slider value={bodyFat} onValueChange={setBodyFat} max={50} min={5} step={0.5} className="w-full" />
                          </div>
                          {errors.bodyFat && <p className="text-red-600 text-xs mt-1">{errors.bodyFat}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.required_for_katchmcardle_formula_use_dexa_scan_or_21}</p>
                        </div>}
                    </div>

                    {/* Result Unit Toggle */}
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium text-gray-700">{contentData.result_unit_22}</Label>
                        <div className="flex items-center space-x-4">
                          <span className={`text-sm ${resultUnit === "kcal" ? "font-semibold text-green-600" : "text-gray-500"}`}>{contentData.kcalday_23}</span>
                          <Switch checked={resultUnit === "kj"} onCheckedChange={checked => setResultUnit(checked ? "kj" : "kcal")} />
                          <span className={`text-sm ${resultUnit === "kj" ? "font-semibold text-green-600" : "text-gray-500"}`}>{contentData.kjday_24}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateBMR} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800">{contentData.calculate_25}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_26}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-teal-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-teal-700 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.bmr_result_27}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-lg font-bold text-green-900">
                            {Math.round(result.bmr).toLocaleString()} {resultUnit}{contentData.day_28}</p>
                          <p className="text-gray-600 text-sm">{contentData.basal_metabolic_rate_29}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-lg font-bold text-green-900">
                            {Math.round(result.activityLevels.sedentary).toLocaleString()} {resultUnit}{contentData.day_30}</p>
                          <p className="text-gray-600 text-sm">{contentData.sedentary_no_exercise_31}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-lg font-bold text-green-900">
                            {Math.round(result.activityLevels.moderatelyActive).toLocaleString()} {resultUnit}{contentData.day_32}</p>
                          <p className="text-gray-600 text-sm">{contentData.moderately_active_33}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_details_and_click_calculate_see_your_bm_34}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-green-600" />
                      <span>{contentData.bmr_daily_calorie_needs_35}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* BMR Result */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-green-700 mb-2">
                          {Math.round(result.bmr).toLocaleString()} {resultUnit}{contentData.day_36}</h3>
                        <p className="text-gray-600 mb-4">{contentData.your_basal_metabolic_rate_37}</p>
                        <p className="text-sm text-gray-700">{contentData.this_is_the_number_of_calories_your_body_burns_at__38}</p>
                      </div>
                    </div>

                    {/* Activity Levels */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">{contentData.sedentary_39}</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.sedentary).toLocaleString()} {resultUnit}{contentData.day_40}</p>
                        <p className="text-xs text-gray-500 mt-1">{contentData.little_or_no_exercise_41}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">{contentData.lightly_active_42}</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.lightlyActive).toLocaleString()} {resultUnit}{contentData.day_43}</p>
                        <p className="text-xs text-gray-500 mt-1">{contentData.light_exercise_13_daysweek_44}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">{contentData.moderately_active_45}</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.moderatelyActive).toLocaleString()} {resultUnit}{contentData.day_46}</p>
                        <p className="text-xs text-gray-500 mt-1">{contentData.moderate_exercise_35_daysweek_47}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">{contentData.very_active_48}</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.veryActive).toLocaleString()} {resultUnit}{contentData.day_49}</p>
                        <p className="text-xs text-gray-500 mt-1">{contentData.hard_exercise_67_daysweek_50}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">{contentData.extra_active_51}</h4>
                        <p className="text-lg font-bold text-green-600">
                          {Math.round(result.activityLevels.extraActive).toLocaleString()} {resultUnit}{contentData.day_52}</p>
                        <p className="text-xs text-gray-500 mt-1">{contentData.very_hard_exercise_physical_job_53}</p>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-green-700 mb-6">{contentData.calculation_details_54}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-700 mb-3">{contentData.formula_used_55}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>
                                {result.inputs.formula === "mifflin" && "Mifflin-St Jeor Equation"}
                                {result.inputs.formula === "harris" && "Revised Harris-Benedict"}
                                {result.inputs.formula === "katch" && "Katch-McArdle Formula"}
                              </strong>
                            </p>
                            {result.inputs.formula === "katch" && result.calculations.lbm && <p>{contentData.lean_body_mass_56}{result.calculations.lbm.toFixed(1)}{contentData.kg_57}</p>}
                            <p>{contentData.base_bmr_58}{Math.round(result.calculations.baseBmr)}{contentData.kcalday_59}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                          <h4 className="font-semibold text-teal-700 mb-3">{contentData.input_summary_60}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.age_61}</strong> {result.inputs.age}{contentData.years_62}</p>
                            <p>
                              <strong>{contentData.gender_63}</strong> {result.inputs.gender}
                            </p>
                            <p>
                              <strong>{contentData.height_64}</strong> {result.inputs.height.toFixed(1)}{contentData.cm_65}</p>
                            <p>
                              <strong>{contentData.weight_66}</strong> {result.inputs.weight.toFixed(1)}{contentData.kg_67}</p>
                            {result.inputs.formula === "katch" && <p>
                                <strong>{contentData.body_fat_68}</strong> {result.inputs.bodyFat}%
                              </p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Formula Display */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">{contentData.formula_used_69}</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        {result.inputs.formula === "mifflin" && <div className="font-mono text-xs bg-white p-2 rounded border">
                            {result.inputs.gender === "male" ? "BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5" : "BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161"}
                          </div>}
                        {result.inputs.formula === "harris" && <div className="font-mono text-xs bg-white p-2 rounded border">
                            {result.inputs.gender === "male" ? "BMR = 66.5 + (13.75 × weight_kg) + (5.003 × height_cm) - (6.75 × age)" : "BMR = 655.1 + (9.563 × weight_kg) + (1.850 × height_cm) - (4.676 × age)"}
                          </div>}
                        {result.inputs.formula === "katch" && <div className="font-mono text-xs bg-white p-2 rounded border">{contentData.bmr_370_216_lbm_where_lbm_1_body_fat_100_weight_70}</div>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-teal-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-teal-700 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.understanding_bmr_71}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.bmr_formulas_72}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.mifflinst_jeor_73}</strong>{contentData.most_accurate_for_general_population_74}</li>
                          <li>
                            <strong>{contentData.harrisbenedict_75}</strong>{contentData.older_formula_still_widely_used_76}</li>
                          <li>
                            <strong>{contentData.katchmcardle_77}</strong>{contentData.best_for_lean_individuals_with_known_body_fat_78}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.activity_levels_79}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.sedentary_80}</strong>{contentData.desk_job_no_exercise_bmr_12_81}</li>
                          <li>
                            <strong>{contentData.lightly_active_82}</strong>{contentData.light_exercise_13_daysweek_bmr_1375_83}</li>
                          <li>
                            <strong>{contentData.moderately_active_84}</strong>{contentData.moderate_exercise_35_daysweek_bmr_155_85}</li>
                          <li>
                            <strong>{contentData.very_active_86}</strong>{contentData.hard_exercise_67_daysweek_bmr_1725_87}</li>
                          <li>
                            <strong>{contentData.extra_active_88}</strong>{contentData.very_hard_exercise_physical_job_bmr_19_89}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.example_calculation_90}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.k_28yearold_male_175_cm_70_kg_91}</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>{contentData.bmr_10_70_625_175_5_28_5_92}</p>
                          <p>{contentData.bmr_700_109375_140_5_93}</p>
                          <p>
                            <strong>{contentData.bmr_1659_kcalday_94}</strong>
                          </p>
                          <p>{contentData.moderately_active_1659_155_95}<strong>{contentData.k_2571_kcalday_96}</strong>
                          </p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.important_notes_97}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.bmr_decreases_with_age_and_increases_with_muscle_m_98}</li>
                          <li>{contentData.these_are_estimates_individual_metabolism_varies_99}</li>
                          <li>{contentData.for_weight_loss_create_a_moderate_calorie_deficit_100}</li>
                          <li>{contentData.consult_healthcare_providers_for_personalized_advi_101}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
<SimilarCalculators calculators={[{
          calculatorName: "Calories Burned Calculator",
          calculatorHref: "/health/calories-burned-calculator",
        }, {
          calculatorName: "Protein Intake Calculator",
          calculatorHref: "/health/protein-calculator",
        }, {
          calculatorName: "TDEE Calculator",
          calculatorHref: "/health/tdee-calculator",
        }
        ]} 
        color="green" 
        title="Related Health Calculators" />
          {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="bmr-calculator"
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