"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Calculator, RotateCcw, Shield, Activity, Target, TrendingUp } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;
export default function ArmyBodyFatCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('army-body-fat-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('army-body-fat-calculator', language, "calculator-guide");

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
    "visual_comparison_0": "",
    "k_0_1": "",
    "standard_2": "",
    "your_result_3": "",
    "army_standard_4": "",
    "calculate_fat_percentage_using_the_us_armys_june_2_5": "",
    "body_fat_calculation_6": "",
    "enter_your_measurements_for_army_body_fat_assessme_7": "",
    "body_fat_8": "",
    "enter_your_measurements_to_calculate_army_body_fat_9": "",
    "your_army_body_fat_results_10": "",
    "assessment_results_11": "",
    "your_body_fat_12": "",
    "army_standard_13": "",
    "calculation_details_14": "",
    "formula_used_15": "",
    "standards_applied_16": "",
    "age_group_17": "",
    "years_18": "",
    "gender_19": "",
    "max_allowed_20": "",
    "ar_6009_2023_21": "",
    "standards_22": "",
    "army_body_fat_standards_23": "",
    "ar_6009_standards_2023_24": "",
    "age_group_25": "",
    "male_max_26": "",
    "female_max_27": "",
    "k_1720_years_28": "",
    "k_20_29": "",
    "k_30_30": "",
    "k_2127_years_31": "",
    "k_22_32": "",
    "k_32_33": "",
    "k_2839_years_34": "",
    "k_24_35": "",
    "k_34_36": "",
    "k_40_years_37": "",
    "k_26_38": "",
    "k_36_39": "",
    "june_2023_updates_40": "",
    "singlesite_tape_test_abdomen_only_41": "",
    "simplified_measurement_process_42": "",
    "reduced_measurement_errors_43": "",
    "consistent_with_medical_standards_44": "",
    "acft_exemption_45": "",
    "soldiers_may_be_exempt_from_body_fat_assessment_if_46": "",
    "k_540_total_acft_score_47": "",
    "k_80_points_48": "",
    "in_each_event_49": "",
    "no_medical_limitations_50": "",
    "measurement_guidelines_51": "",
    "measure_at_the_navel_horizontal_52": "",
    "normal_breathing_not_sucked_in_53": "",
    "tape_snug_but_not_compressing_skin_54": "",
    "round_to_nearest_05_inch_55": "",
    "take_3_measurements_use_middle_value_56": "",
    "gender_8": "",
    "male_9": "",
    "female_10": "",
    "age_years_11": "",
    "weight_lbs_12": "",
    "abdominal_circumference_inches_13": "",
    "measured_at_the_navel_horizontal_14": "",
    "calculate_fat_15": "",
    "reset_16": "",
    "body_fat_17": "",
    "enter_your_measurements_to_calculate_army_body_fat_18": "",
    "your_army_body_fat_results_19": "",
    "assessment_results_20": "",
    "your_body_fat_21": "",
    "army_standard_22": "",
    "calculation_details_23": "",
    "formula_used_24": "",
    "standards_applied_25": "",
    "age_group_26": "",
    "years_27": "",
    "gender_28": "",
    "max_allowed_29": "",
    "ar_6009_2023_30": "",
    "standards_31": "",
    "army_body_fat_standards_32": "",
    "ar_6009_standards_2023_33": "",
    "age_group_34": "",
    "male_max_35": "",
    "female_max_36": "",
    "k_1720_years_37": "",
    "k_20_38": "",
    "k_30_39": "",
    "k_2127_years_40": "",
    "k_22_41": "",
    "k_32_42": "",
    "k_2839_years_43": "",
    "k_24_44": "",
    "k_34_45": "",
    "k_40_years_46": "",
    "k_26_47": "",
    "k_36_48": "",
    "june_2023_updates_49": "",
    "singlesite_tape_test_abdomen_only_50": "",
    "simplified_measurement_process_51": "",
    "reduced_measurement_errors_52": "",
    "consistent_with_medical_standards_53": "",
    "acft_exemption_54": "",
    "soldiers_may_be_exempt_from_body_fat_assessment_if_55": "",
    "k_540_total_acft_score_56": "",
    "k_80_points_57": "",
    "in_each_event_58": "",
    "no_medical_limitations_59": "",
    "measurement_guidelines_60": "",
    "measure_at_the_navel_horizontal_61": "",
    "normal_breathing_not_sucked_in_62": "",
    "tape_snug_but_not_compressing_skin_63": "",
    "round_to_nearest_05_inch_64": "",
    "take_3_measurements_use_middle_value_65": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [abdomen, setAbdomen] = useState("");

  // Army standards by age group and gender
  const armyStandards = {
    male: {
      "17-20": 20,
      "21-27": 22,
      "28-39": 24,
      "40+": 26
    },
    female: {
      "17-20": 30,
      "21-27": 32,
      "28-39": 34,
      "40+": 36
    }
  };
  const getAgeGroup = (age: number): string => {
    if (age >= 17 && age <= 20) return "17-20";
    if (age >= 21 && age <= 27) return "21-27";
    if (age >= 28 && age <= 39) return "28-39";
    if (age >= 40) return "40+";
    return "17-20"; // default
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const ageNum = Number.parseInt(age);
    const weightNum = Number.parseFloat(weight);
    const abdomenNum = Number.parseFloat(abdomen);
    if (!age || ageNum < 17 || ageNum > 65) {
      newErrors.age = "Age must be between 17 and 65 years";
    }
    if (!weight || weightNum <= 0 || weightNum > 500) {
      newErrors.weight = "Weight must be between 1 and 500 lbs";
    }
    if (!abdomen || abdomenNum <= 0 || abdomenNum > 60) {
      newErrors.abdomen = "Abdominal circumference must be between 1 and 60 inches";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateBodyFat = () => {
    if (!validateInputs()) return;
    try {
      const ageNum = Number.parseInt(age);
      const weightNum = Number.parseFloat(weight);
      const abdomenNum = Number.parseFloat(abdomen);
      let bodyFatPercentage = 0;

      // Apply gender-specific formulas
      if (gender === "male") {
        // Male formula: %BF = -26.97 - (0.12 × Weight[lbs]) + (1.99 × Abdomen[in])
        bodyFatPercentage = -26.97 - 0.12 * weightNum + 1.99 * abdomenNum;
      } else {
        // Female formula: %BF = -9.15 - (0.015 × Weight[lbs]) + (1.27 × Abdomen[in])
        bodyFatPercentage = -9.15 - 0.015 * weightNum + 1.27 * abdomenNum;
      }

      // Round to 1 decimal place
      bodyFatPercentage = Math.round(bodyFatPercentage * 10) / 10;

      // Get age group and standard
      const ageGroup = getAgeGroup(ageNum);
      const maxAllowed = armyStandards[gender as keyof typeof armyStandards][ageGroup as keyof typeof armyStandards.male];
      const withinStandard = bodyFatPercentage <= maxAllowed;
      const difference = bodyFatPercentage - maxAllowed;
      setResult({
        bodyFatPercentage,
        maxAllowed,
        withinStandard,
        difference,
        ageGroup,
        gender,
        inputs: {
          age: ageNum,
          weight: weightNum,
          abdomen: abdomenNum
        },
        calculations: {
          formula: gender === "male" ? `-26.97 - (0.12 × ${weightNum}) + (1.99 × ${abdomenNum})` : `-9.15 - (0.015 × ${weightNum}) + (1.27 × ${abdomenNum})`,
          step1: gender === "male" ? -26.97 - 0.12 * weightNum : -9.15 - 0.015 * weightNum,
          step2: gender === "male" ? 1.99 * abdomenNum : 1.27 * abdomenNum
        }
      });
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating body fat. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setGender("male");
    setAge("");
    setWeight("");
    setAbdomen("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const BodyFatGraph = ({
    result
  }: {
    result: any;
  }) => {
    const percentage = result.bodyFatPercentage / result.maxAllowed * 100;
    const barWidth = Math.min(percentage, 120); // Cap at 120% for display

    return <div className="bg-white p-6 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-700 mb-4">{contentData.visual_comparison_0}</h4>
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div className={`h-8 rounded-full transition-all duration-500 ${result.withinStandard ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-red-500 to-red-600"}`} style={{
              width: `${Math.min(barWidth, 100)}%`
            }} />
              {/* Standard line marker */}
              <div className="absolute top-0 right-0 w-1 h-8 bg-gray-600 rounded-r-full" />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>{contentData.k_0_1}</span>
              <span>{contentData.standard_2}{result.maxAllowed}%</span>
            </div>
          </div>

          {/* Values */}
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{result.bodyFatPercentage}%</p>
              <p className="text-sm text-gray-600">{contentData.your_result_3}</p>
            </div>
            <div className="text-center">
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
              <p className="text-sm text-gray-600">{contentData.army_standard_4}</p>
            </div>
          </div>
        </div>
      </div>;
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.calculate_fat_percentage_using_the_us_armys_june_2_5}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>{contentData.body_fat_calculation_6}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_measurements_for_army_body_fat_assessme_7}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      {/* Gender Selection */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.gender_8}</Label>
                        <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="cursor-pointer">{contentData.male_9}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="cursor-pointer">{contentData.female_10}</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Age Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.age_years_11}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Activity className="h-5 w-5 text-green-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`} type="number" placeholder="25" value={age} onChange={e => setAge(e.target.value)} />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                      </div>

                      {/* Weight Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.weight_lbs_12}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="h-5 w-5 text-green-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.weight ? "border-red-300" : ""}`} type="number" placeholder="180" value={weight} onChange={e => setWeight(e.target.value)} />
                        </div>
                        {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                      </div>

                      {/* Abdominal Circumference Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.abdominal_circumference_inches_13}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.abdomen ? "border-red-300" : ""}`} type="number" step="0.1" placeholder="36.0" value={abdomen} onChange={e => setAbdomen(e.target.value)} />
                        </div>
                        {errors.abdomen && <p className="text-red-600 text-xs mt-1">{errors.abdomen}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.measured_at_the_navel_horizontal_14}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateBodyFat} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800">{contentData.calculate_fat_15}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_16}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center mb-3 shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.body_fat_17}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-3xl font-bold text-green-900">{result.bodyFatPercentage}%</p>
                          <p className={`text-sm font-medium ${result.withinStandard ? "text-green-600" : "text-red-600"}`}>
                            {result.withinStandard ? "✅ Within Standard" : "❌ Exceeds Standard"}
                          </p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Shield className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_measurements_to_calculate_army_body_fat_18}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Shield className="w-6 h-6 text-green-600" />
                      <span>{contentData.your_army_body_fat_results_19}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Main Results */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <h3 className="text-xl font-semibold text-green-700 mb-4">{contentData.assessment_results_20}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-green-700 mb-1">{result.bodyFatPercentage}%</p>
                          <p className="text-sm text-gray-600">{contentData.your_body_fat_21}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-700 mb-1">{result.maxAllowed}%</p>
                          <p className="text-sm text-gray-600">{contentData.army_standard_22}</p>
                        </div>
                        <div>
                          <p className={`text-2xl font-bold mb-1 ${result.withinStandard ? "text-green-600" : "text-red-600"}`}>
                            {result.withinStandard ? "✅ PASS" : "❌ FAIL"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {result.withinStandard ? "Within Standard" : `${result.difference.toFixed(1)}% over limit`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <BodyFatGraph result={result} />
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-green-700 mb-6">{contentData.calculation_details_23}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-700 mb-3">{contentData.formula_used_24}{result.gender === "male" ? "Male" : "Female"})
                          </h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p className="font-mono bg-white p-2 rounded border">{result.calculations.formula}</p>
                            <p>
                              = {result.calculations.step1.toFixed(2)} + {result.calculations.step2.toFixed(2)}
                            </p>
                            <p>
                              = <strong>{result.bodyFatPercentage}%</strong>
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <h4 className="font-semibold text-emerald-700 mb-3">{contentData.standards_applied_25}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.age_group_26}</strong> {result.ageGroup}{contentData.years_27}</p>
                            <p>
                              <strong>{contentData.gender_28}</strong> {result.gender === "male" ? "Male" : "Female"}
                            </p>
                            <p>
                              <strong>{contentData.max_allowed_29}</strong> {result.maxAllowed}%
                            </p>
                            <p>
                              <strong>{contentData.ar_6009_2023_30}</strong>{contentData.standards_31}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "Lean Body Mass Calculator",
          calculatorHref: "/health/lean-body-mass-calculator",
        }, {
          calculatorName: "Body Fat Calculator",
          calculatorHref: "/health/body-fat-calculator",
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center mr-3 shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.army_body_fat_standards_32}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.ar_6009_standards_2023_33}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{contentData.age_group_34}</th>
                              <th className="text-center py-2">{contentData.male_max_35}</th>
                              <th className="text-center py-2">{contentData.female_max_36}</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">{contentData.k_1720_years_37}</td>
                              <td className="text-center">{contentData.k_20_38}</td>
                              <td className="text-center">{contentData.k_30_39}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.k_2127_years_40}</td>
                              <td className="text-center">{contentData.k_22_41}</td>
                              <td className="text-center">{contentData.k_32_42}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.k_2839_years_43}</td>
                              <td className="text-center">{contentData.k_24_44}</td>
                              <td className="text-center">{contentData.k_34_45}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.k_40_years_46}</td>
                              <td className="text-center">{contentData.k_26_47}</td>
                              <td className="text-center">{contentData.k_36_48}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.june_2023_updates_49}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.singlesite_tape_test_abdomen_only_50}</li>
                          <li>{contentData.simplified_measurement_process_51}</li>
                          <li>{contentData.reduced_measurement_errors_52}</li>
                          <li>{contentData.consistent_with_medical_standards_53}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.acft_exemption_54}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <p className="text-sm text-gray-700 mb-2">{contentData.soldiers_may_be_exempt_from_body_fat_assessment_if_55}</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.k_540_total_acft_score_56}</strong>
                          </li>
                          <li>
                            <strong>{contentData.k_80_points_57}</strong>{contentData.in_each_event_58}</li>
                          <li>{contentData.no_medical_limitations_59}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.measurement_guidelines_60}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.measure_at_the_navel_horizontal_61}</li>
                          <li>{contentData.normal_breathing_not_sucked_in_62}</li>
                          <li>{contentData.tape_snug_but_not_compressing_skin_63}</li>
                          <li>{contentData.round_to_nearest_05_inch_64}</li>
                          <li>{contentData.take_3_measurements_use_middle_value_65}</li>
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
            entityId="army-body-fat-calculator"
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