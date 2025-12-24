"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Calculator, RotateCcw, Scale, Ruler, Baby, Heart } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
;
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
export default function PregnancyWeightGainCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('pregnancy-weight-gain-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('pregnancy-weight-gain-calculator', language, "calculator-guide");

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
    "weight_gain_calculation_0": "",
    "enter_your_prepregnancy_details_and_optional_curre_1": "",
    "unit_system_2": "",
    "metric_kg_cm_3": "",
    "us_lbs_ftin_4": "",
    "prepregnancy_weight_5": "",
    "height_cm_6": "",
    "height_ftin_7": "",
    "current_weight_8": "",
    "optional_9": "",
    "for_progress_tracking_10": "",
    "gestational_week_11": "",
    "optional_12": "",
    "week_142_for_progress_tracking_13": "",
    "calculate_gain_14": "",
    "reset_15": "",
    "weight_gain_16": "",
    "kg_17": "",
    "total_recommended_18": "",
    "bmi_19": "",
    "enter_your_prepregnancy_details_to_see_recommended_20": "",
    "weight_gain_recommendations_21": "",
    "prepregnancy_assessment_22": "",
    "bmi_23": "",
    "category_24": "",
    "kg_25": "",
    "lbs_26": "",
    "trimester_schedule_27": "",
    "first_trimester_weeks_113_28": "",
    "total_gain_29": "",
    "kg_30": "",
    "lbs_31": "",
    "gradual_weight_gain_focus_on_nutrition_quality_32": "",
    "second_third_trimesters_weeks_1440_33": "",
    "weekly_gain_34": "",
    "kg_35": "",
    "lbs_36": "",
    "steady_weekly_weight_gain_37": "",
    "progress_tracking_week_38": "",
    "kg_39": "",
    "actual_gain_40": "",
    "kg_41": "",
    "expected_gain_42": "",
    "status_43": "",
    "iom_weight_gain_guidelines_44": "",
    "bmi_category_45": "",
    "bmi_range_46": "",
    "total_gain_kg_47": "",
    "total_gain_lbs_48": "",
    "underweight_49": "",
    "k_185_50": "",
    "k_12518_51": "",
    "k_2840_52": "",
    "normal_53": "",
    "k_185249_54": "",
    "k_11516_55": "",
    "k_2535_56": "",
    "overweight_57": "",
    "k_250299_58": "",
    "k_7115_59": "",
    "k_1525_60": "",
    "obese_61": "",
    "k_300_62": "",
    "k_59_63": "",
    "k_1120_64": "",
    "understanding_pregnancy_weight_gain_65": "",
    "iom_guidelines_66": "",
    "based_on_prepregnancy_bmi_category_67": "",
    "accounts_for_maternal_and_fetal_health_68": "",
    "reduces_risk_of_complications_69": "",
    "updated_in_2009_by_institute_of_medicine_70": "",
    "example_calculation_71": "",
    "prepregnancy_130_lbs_55_bmi_216_72": "",
    "category_normal_weight_73": "",
    "total_gain_74": "",
    "k_2535_lbs_11516_kg_75": "",
    "k_1st_trimester_76": "",
    "k_14_lbs_77": "",
    "k_2nd3rd_78": "",
    "k_1_lbweek_79": "",
    "important_factors_80": "",
    "individual_variation_is_normal_81": "",
    "quality_of_nutrition_matters_most_82": "",
    "regular_prenatal_care_is_essential_83": "",
    "multiple_pregnancies_need_different_guidelines_84": "",
    "health_benefits_85": "",
    "reduces_risk_of_gestational_diabetes_86": "",
    "lowers_chance_of_preterm_birth_87": "",
    "supports_healthy_fetal_development_88": "",
    "easier_postpartum_weight_loss_89": ""
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
  const [prePregnancyWeight, setPrePregnancyWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [gestationalWeek, setGestationalWeek] = useState("");

  // Settings
  const [units, setUnits] = useState("metric"); // metric or us

  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};

    // Pre-pregnancy weight validation
    if (!prePregnancyWeight || isNaN(Number(prePregnancyWeight))) {
      newErrors.prePregnancyWeight = "Pre-pregnancy weight is required and must be a number";
    } else {
      const weight = Number(prePregnancyWeight);
      if (units === "metric" && (weight < 30 || weight > 200)) {
        newErrors.prePregnancyWeight = "Weight must be between 30-200 kg";
      } else if (units === "us" && (weight < 66 || weight > 440)) {
        newErrors.prePregnancyWeight = "Weight must be between 66-440 lbs";
      }
    }

    // Height validation
    if (units === "metric") {
      if (!heightCm || isNaN(Number(heightCm))) {
        newErrors.height = "Height is required and must be a number";
      } else if (Number(heightCm) < 120 || Number(heightCm) > 220) {
        newErrors.height = "Height must be between 120-220 cm";
      }
    } else {
      if (!heightFeet || isNaN(Number(heightFeet))) {
        newErrors.heightFeet = "Feet is required and must be a number";
      } else if (Number(heightFeet) < 4 || Number(heightFeet) > 7) {
        newErrors.heightFeet = "Feet must be between 4-7";
      }
      if (!heightInches || isNaN(Number(heightInches))) {
        newErrors.heightInches = "Inches is required and must be a number";
      } else if (Number(heightInches) < 0 || Number(heightInches) >= 12) {
        newErrors.heightInches = "Inches must be between 0-11";
      }
    }

    // Current weight validation (optional)
    if (currentWeight && isNaN(Number(currentWeight))) {
      newErrors.currentWeight = "Current weight must be a number";
    }

    // Gestational week validation (optional)
    if (gestationalWeek && (isNaN(Number(gestationalWeek)) || Number(gestationalWeek) < 1 || Number(gestationalWeek) > 42)) {
      newErrors.gestationalWeek = "Gestational week must be between 1-42";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateWeightGain = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    try {
      // Convert inputs to metric
      let preWeightKg: number;
      let currentWeightKg: number | null = null;
      if (units === "metric") {
        preWeightKg = Number(prePregnancyWeight);
        currentWeightKg = currentWeight ? Number(currentWeight) : null;
      } else {
        preWeightKg = Number(prePregnancyWeight) / 2.20462;
        currentWeightKg = currentWeight ? Number(currentWeight) / 2.20462 : null;
      }
      let heightCmVal: number;
      if (units === "metric") {
        heightCmVal = Number(heightCm);
      } else {
        heightCmVal = (Number(heightFeet) * 12 + Number(heightInches)) * 2.54;
      }

      // Calculate
      const heightM = heightCmVal / 100;
      const bmi = preWeightKg / (heightM * heightM);

      // Determine BMI category and weight gain recommendations
      let category: string;
      let totalGainKg: {
        min: number;
        max: number;
      };
      let weeklyGainKg: number;
      if (bmi < 18.5) {
        category = "Underweight";
        totalGainKg = {
          min: 12.5,
          max: 18
        };
        weeklyGainKg = 0.45;
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal";
        totalGainKg = {
          min: 11.5,
          max: 16
        };
        weeklyGainKg = 0.45;
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = "Overweight";
        totalGainKg = {
          min: 7,
          max: 11.5
        };
        weeklyGainKg = 0.25;
      } else {
        category = "Obese";
        totalGainKg = {
          min: 5,
          max: 9
        };
        weeklyGainKg = 0.25;
      }

      // Convert to lbs
      const totalGainLbs = {
        min: totalGainKg.min * 2.20462,
        max: totalGainKg.max * 2.20462
      };
      const weeklyGainLbs = weeklyGainKg * 2.20462;

      // Calculate breakdown
      const firstTrimesterGain = {
        min: 0.5,
        max: 2
      }; // kg
      const firstTrimesterGainLbs = {
        min: 1,
        max: 4
      }; // lbs

      // Progress tracking if current weight provided
      let progressTracking = null;
      if (currentWeightKg && gestationalWeek) {
        const week = Number(gestationalWeek);
        const actualGainKg = currentWeightKg - preWeightKg;
        const actualGainLbs = actualGainKg * 2.20462;
        let expectedGainKg: number;
        if (week <= 13) {
          // First trimester
          expectedGainKg = week / 13 * ((firstTrimesterGain.min + firstTrimesterGain.max) / 2);
        } else {
          // Second/third trimester
          const weeksAfter13 = week - 13;
          expectedGainKg = (firstTrimesterGain.min + firstTrimesterGain.max) / 2 + weeksAfter13 * weeklyGainKg;
        }
        const expectedGainLbs = expectedGainKg * 2.20462;
        const difference = actualGainKg - expectedGainKg;
        let status: string;
        if (Math.abs(difference) <= 1) {
          status = "On track";
        } else if (difference > 1) {
          status = "Above recommended";
        } else {
          status = "Below recommended";
        }
        progressTracking = {
          week,
          actualGain: {
            kg: actualGainKg,
            lbs: actualGainLbs
          },
          expectedGain: {
            kg: expectedGainKg,
            lbs: expectedGainLbs
          },
          difference: {
            kg: difference,
            lbs: difference * 2.20462
          },
          status
        };
      }
      setResult({
        bmi: bmi,
        category: category,
        totalGain: {
          kg: totalGainKg,
          lbs: totalGainLbs
        },
        weeklyGain: {
          kg: weeklyGainKg,
          lbs: weeklyGainLbs
        },
        firstTrimester: {
          kg: firstTrimesterGain,
          lbs: firstTrimesterGainLbs
        },
        progressTracking,
        inputs: {
          prePregnancyWeight: preWeightKg,
          height: heightCmVal,
          currentWeight: currentWeightKg,
          gestationalWeek: gestationalWeek ? Number(gestationalWeek) : null,
          units
        }
      });
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating weight gain. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setPrePregnancyWeight("");
    setHeightCm("");
    setHeightFeet("");
    setHeightInches("");
    setCurrentWeight("");
    setGestationalWeek("");
    setUnits("metric");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Baby className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-pink-600" />
                      <span>{contentData.weight_gain_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_prepregnancy_details_and_optional_curre_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    {/* Units Selection */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.unit_system_2}</Label>
                        <Select value={units} onValueChange={setUnits}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="metric">{contentData.metric_kg_cm_3}</SelectItem>
                            <SelectItem value="us">{contentData.us_lbs_ftin_4}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Pre-pregnancy Weight */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.prepregnancy_weight_5}{units === "metric" ? "kg" : "lbs"})
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Scale className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.prePregnancyWeight ? "border-red-300" : ""}`} type="text" placeholder={units === "metric" ? "60" : "130"} value={prePregnancyWeight} onChange={e => setPrePregnancyWeight(e.target.value)} />
                        </div>
                        {errors.prePregnancyWeight && <p className="text-red-600 text-xs mt-1">{errors.prePregnancyWeight}</p>}
                      </div>

                      {/* Height Input */}
                      {units === "metric" ? <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_cm_6}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Ruler className="h-5 w-5 text-pink-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.height ? "border-red-300" : ""}`} type="text" placeholder="165" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
                          </div>
                          {errors.height && <p className="text-red-600 text-xs mt-1">{errors.height}</p>}
                        </div> : <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_ftin_7}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-pink-500" />
                              </div>
                              <Input className={`h-12 pl-10 ${errors.heightFeet ? "border-red-300" : ""}`} type="text" placeholder="5" value={heightFeet} onChange={e => setHeightFeet(e.target.value)} />
                            </div>
                            <div className="relative flex-1">
                              <Input className={`h-12 ${errors.heightInches ? "border-red-300" : ""}`} type="text" placeholder="5" value={heightInches} onChange={e => setHeightInches(e.target.value)} />
                            </div>
                          </div>
                          {(errors.heightFeet || errors.heightInches) && <p className="text-red-600 text-xs mt-1">{errors.heightFeet || errors.heightInches}</p>}
                        </div>}

                      {/* Current Weight (Optional) */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.current_weight_8}{units === "metric" ? "kg" : "lbs"}){" "}
                          <span className="text-gray-500">{contentData.optional_9}</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Scale className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.currentWeight ? "border-red-300" : ""}`} type="text" placeholder={units === "metric" ? "65" : "145"} value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} />
                        </div>
                        {errors.currentWeight && <p className="text-red-600 text-xs mt-1">{errors.currentWeight}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.for_progress_tracking_10}</p>
                      </div>

                      {/* Gestational Week (Optional) */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.gestational_week_11}<span className="text-gray-500">{contentData.optional_12}</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Heart className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.gestationalWeek ? "border-red-300" : ""}`} type="text" placeholder="28" value={gestationalWeek} onChange={e => setGestationalWeek(e.target.value)} />
                        </div>
                        {errors.gestationalWeek && <p className="text-red-600 text-xs mt-1">{errors.gestationalWeek}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.week_142_for_progress_tracking_13}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateWeightGain} className="flex-1 h-12 text-lg bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800">{contentData.calculate_gain_14}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-pink-300 text-pink-700 hover:bg-pink-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_15}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-700 flex items-center justify-center mb-3 shadow-lg">
                      <Baby className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">{contentData.weight_gain_16}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-pink-200">
                          <p className="text-lg font-bold text-pink-900">
                            {result.totalGain.kg.min.toFixed(1)}-{result.totalGain.kg.max.toFixed(1)}{contentData.kg_17}</p>
                          <p className="text-gray-600 text-sm">{contentData.total_recommended_18}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-pink-200">
                          <p className="text-lg font-bold text-pink-900">{contentData.bmi_19}{result.bmi.toFixed(1)}</p>
                          <p className="text-gray-600 text-sm">{result.category}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Baby className="w-8 h-8 text-pink-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_prepregnancy_details_to_see_recommended_20}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Baby className="w-6 h-6 text-pink-600" />
                      <span>{contentData.weight_gain_recommendations_21}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* BMI and Category */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                      <h3 className="text-xl font-semibold text-pink-700 mb-4">{contentData.prepregnancy_assessment_22}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-pink-700 mb-2">{contentData.bmi_23}{result.bmi.toFixed(1)}</p>
                          <p className="text-lg text-gray-600">{contentData.category_24}{result.category}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-pink-700 mb-2">
                            {result.totalGain.kg.min.toFixed(1)}-{result.totalGain.kg.max.toFixed(1)}{contentData.kg_25}</p>
                          <p className="text-lg text-gray-600">
                            ({result.totalGain.lbs.min.toFixed(1)}-{result.totalGain.lbs.max.toFixed(1)}{contentData.lbs_26}</p>
                        </div>
                      </div>
                    </div>

                    {/* Weight Gain Schedule */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-pink-700 mb-4">{contentData.trimester_schedule_27}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                          <h4 className="font-semibold text-pink-700 mb-3">{contentData.first_trimester_weeks_113_28}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.total_gain_29}</strong> {result.firstTrimester.kg.min}-{result.firstTrimester.kg.max}{" "}{contentData.kg_30}{result.firstTrimester.lbs.min}-{result.firstTrimester.lbs.max}{contentData.lbs_31}</p>
                            <p className="text-xs text-gray-600">{contentData.gradual_weight_gain_focus_on_nutrition_quality_32}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                          <h4 className="font-semibold text-rose-700 mb-3">{contentData.second_third_trimesters_weeks_1440_33}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.weekly_gain_34}</strong> ~{result.weeklyGain.kg.toFixed(2)}{contentData.kg_35}{result.weeklyGain.lbs.toFixed(1)}{contentData.lbs_36}</p>
                            <p className="text-xs text-gray-600">{contentData.steady_weekly_weight_gain_37}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Tracking */}
                    {result.progressTracking && <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                        <h3 className="text-xl font-semibold text-pink-700 mb-4">{contentData.progress_tracking_week_38}{result.progressTracking.week})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-pink-700">
                              {result.progressTracking.actualGain.kg.toFixed(1)}{contentData.kg_39}</p>
                            <p className="text-sm text-gray-600">{contentData.actual_gain_40}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-pink-700">
                              {result.progressTracking.expectedGain.kg.toFixed(1)}{contentData.kg_41}</p>
                            <p className="text-sm text-gray-600">{contentData.expected_gain_42}</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-lg font-bold ${result.progressTracking.status === "On track" ? "text-green-700" : result.progressTracking.status === "Above recommended" ? "text-orange-700" : "text-blue-700"}`}>
                              {result.progressTracking.status}
                            </p>
                            <p className="text-sm text-gray-600">{contentData.status_43}</p>
                          </div>
                        </div>
                      </div>}

                    {/* IOM Guidelines Table */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-pink-700 mb-6">{contentData.iom_weight_gain_guidelines_44}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-pink-200 rounded-lg">
                          <thead>
                            <tr className="bg-gradient-to-r from-pink-50 to-rose-50">
                              <th className="border border-pink-200 p-3 text-left font-semibold text-pink-700">{contentData.bmi_category_45}</th>
                              <th className="border border-pink-200 p-3 text-center font-semibold text-pink-700">{contentData.bmi_range_46}</th>
                              <th className="border border-pink-200 p-3 text-center font-semibold text-pink-700">{contentData.total_gain_kg_47}</th>
                              <th className="border border-pink-200 p-3 text-center font-semibold text-pink-700">{contentData.total_gain_lbs_48}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={result.category === "Underweight" ? "bg-pink-25" : ""}>
                              <td className="border border-pink-200 p-3 font-medium">{contentData.underweight_49}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_185_50}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_12518_51}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_2840_52}</td>
                            </tr>
                            <tr className={result.category === "Normal" ? "bg-pink-25" : ""}>
                              <td className="border border-pink-200 p-3 font-medium">{contentData.normal_53}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_185249_54}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_11516_55}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_2535_56}</td>
                            </tr>
                            <tr className={result.category === "Overweight" ? "bg-pink-25" : ""}>
                              <td className="border border-pink-200 p-3 font-medium">{contentData.overweight_57}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_250299_58}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_7115_59}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_1525_60}</td>
                            </tr>
                            <tr className={result.category === "Obese" ? "bg-pink-25" : ""}>
                              <td className="border border-pink-200 p-3 font-medium">{contentData.obese_61}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_300_62}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_59_63}</td>
                              <td className="border border-pink-200 p-3 text-center">{contentData.k_1120_64}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-rose-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-rose-700 flex items-center justify-center mr-3 shadow-lg">
                    <Baby className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">{contentData.understanding_pregnancy_weight_gain_65}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">{contentData.iom_guidelines_66}</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.based_on_prepregnancy_bmi_category_67}</li>
                          <li>{contentData.accounts_for_maternal_and_fetal_health_68}</li>
                          <li>{contentData.reduces_risk_of_complications_69}</li>
                          <li>{contentData.updated_in_2009_by_institute_of_medicine_70}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-700 mb-3">{contentData.example_calculation_71}</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.prepregnancy_130_lbs_55_bmi_216_72}</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>{contentData.category_normal_weight_73}</p>
                          <p>{contentData.total_gain_74}<strong>{contentData.k_2535_lbs_11516_kg_75}</strong>
                          </p>
                          <p>{contentData.k_1st_trimester_76}<strong>{contentData.k_14_lbs_77}</strong>
                          </p>
                          <p>{contentData.k_2nd3rd_78}<strong>{contentData.k_1_lbweek_79}</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">{contentData.important_factors_80}</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.individual_variation_is_normal_81}</li>
                          <li>{contentData.quality_of_nutrition_matters_most_82}</li>
                          <li>{contentData.regular_prenatal_care_is_essential_83}</li>
                          <li>{contentData.multiple_pregnancies_need_different_guidelines_84}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-pink-700 mb-3">{contentData.health_benefits_85}</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.reduces_risk_of_gestational_diabetes_86}</li>
                          <li>{contentData.lowers_chance_of_preterm_birth_87}</li>
                          <li>{contentData.supports_healthy_fetal_development_88}</li>
                          <li>{contentData.easier_postpartum_weight_loss_89}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Pregnancy Calculator",
            calculatorHref: "/health/pregnancy-calculator",
            calculatorDescription: "Estimate pregnancy schedule based on due date, last period, ultrasound, conception, or IVF transfer date"
          }, {
            calculatorName: "Pregnancy Conception Calculator",
            calculatorHref: "/health/pregnancy-conception-calculator",
            calculatorDescription: "Estimate conception date and pregnancy milestones based on due date, last period, or ultrasound date"
          }, {
            calculatorName: "Healthy Weight Calculator",
            calculatorHref: "/health/healthy-weight-calculator",
            calculatorDescription: "Calculate healthy weight range based on height and gender"
          }]} color="pink" title="Related Health Calculators" />

          </div>

           {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="pregnancy-weight-gain-calculator"
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