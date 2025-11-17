"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Calculator, RotateCcw, Activity, Target, TrendingUp, Zap, Heart } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
export default function LeanBodyMassCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('lean-body-mass-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('lean-body-mass-calculator', language, "calculator-guide");

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
    "lbm_calculation_0": "",
    "enter_your_details_to_calculate_lean_body_mass_1": "",
    "unit_system_2": "",
    "us_ftin_lbs_3": "",
    "metric_cm_kg_4": "",
    "age_years_5": "",
    "gender_6": "",
    "male_7": "",
    "female_8": "",
    "height_9": "",
    "ft_10": "",
    "in_11": "",
    "height_cm_12": "",
    "weight_13": "",
    "body_fat_percentage_optional_14": "",
    "if_known_provides_the_most_accurate_lbm_calculatio_15": "",
    "calculate_16": "",
    "reset_17": "",
    "lean_body_mass_18": "",
    "kg_19": "",
    "enter_your_details_to_calculate_lean_body_mass_20": "",
    "your_lean_body_mass_results_21": "",
    "lbm_calculation_methods_22": "",
    "method_23": "",
    "result_kg_24": "",
    "result_lbs_25": "",
    "accuracy_26": "",
    "summary_27": "",
    "recommended_lbm_28": "",
    "value_29": "",
    "kg_30": "",
    "lbs_31": "",
    "method_32": "",
    "estimated_body_fat_33": "",
    "input_summary_34": "",
    "age_35": "",
    "years_36": "",
    "gender_37": "",
    "height_38": "",
    "cm_39": "",
    "weight_40": "",
    "kg_41": "",
    "body_fat_42": "",
    "about_lean_body_mass_43": "",
    "what_is_lbm_44": "",
    "lean_body_mass_45": "",
    "total_body_weight_minus_fat_mass_46": "",
    "includes_47": "",
    "muscles_organs_bones_and_water_48": "",
    "uses_49": "",
    "medication_dosing_sports_nutrition_health_tracking_50": "",
    "difference_51": "",
    "slightly_higher_than_fatfree_mass_52": "",
    "formula_accuracy_53": "",
    "body_fat_method_54": "",
    "most_accurate_when_bf_is_known_55": "",
    "peters_formula_56": "",
    "recommended_for_children_14_years_57": "",
    "boer_formula_58": "",
    "good_for_general_adult_population_59": "",
    "hume_formula_60": "",
    "preferred_for_clinical_applications_61": "",
    "james_formula_62": "",
    "moderate_accuracy_for_adults_63": "",
    "clinical_applications_64": "",
    "medication_dosing_65": "",
    "more_accurate_than_total_body_weight_66": "",
    "nutritional_assessment_67": "",
    "protein_and_calorie_requirements_68": "",
    "athletic_performance_69": "",
    "training_and_recovery_optimization_70": "",
    "health_monitoring_71": "",
    "tracking_muscle_mass_changes_72": "",
    "typical_lbm_ranges_73": "",
    "category_74": "",
    "male_75": "",
    "female_76": "",
    "athletes_77": "",
    "k_8595_78": "",
    "k_7585_79": "",
    "fit_adults_80": "",
    "k_8090_81": "",
    "k_7080_82": "",
    "average_adults_83": "",
    "k_7585_84": "",
    "k_6575_85": ""
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
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [unitSystem, setUnitSystem] = useState("us"); // us or metric

  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const ageNum = Number.parseInt(age);
    if (!age || ageNum < 1 || ageNum > 100) {
      newErrors.age = "Age must be between 1 and 100 years";
    }
    if (unitSystem === "us") {
      const ftNum = Number.parseInt(heightFt);
      const inNum = Number.parseInt(heightIn);
      const weightNum = Number.parseFloat(weightLbs);
      if (!heightFt || ftNum < 1 || ftNum > 8) {
        newErrors.heightFt = "Height must be between 1-8 feet";
      }
      if (!heightIn || inNum < 0 || inNum > 11) {
        newErrors.heightIn = "Inches must be between 0-11";
      }
      if (!weightLbs || weightNum <= 0 || weightNum > 1000) {
        newErrors.weightLbs = "Weight must be between 1-1000 lbs";
      }
    } else {
      const heightNum = Number.parseFloat(heightCm);
      const weightNum = Number.parseFloat(weightKg);
      if (!heightCm || heightNum < 50 || heightNum > 250) {
        newErrors.heightCm = "Height must be between 50-250 cm";
      }
      if (!weightKg || weightNum <= 0 || weightNum > 500) {
        newErrors.weightKg = "Weight must be between 1-500 kg";
      }
    }
    if (bodyFat && (Number.parseFloat(bodyFat) <= 0 || Number.parseFloat(bodyFat) >= 60)) {
      newErrors.bodyFat = "Body fat percentage must be between 1-59%";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateLBM = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
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
      const heightMeters = heightCmNum / 100;
      const results: any = {
        inputs: {
          age: ageNum,
          gender,
          height: heightCmNum,
          weight: weightKgNum,
          bodyFat: bodyFat ? Number.parseFloat(bodyFat) : null
        },
        methods: []
      };

      // Body Fat % Method (if provided)
      if (bodyFat) {
        const bodyFatNum = Number.parseFloat(bodyFat);
        const lbmBodyFat = weightKgNum * (1 - bodyFatNum / 100);
        results.methods.push({
          name: "Body Fat % Method",
          formula: "LBM = Weight × (1 - BF%/100)",
          result: Math.round(lbmBodyFat * 10) / 10,
          accuracy: "Most Accurate (with BF%)",
          recommended: true
        });
      }

      // Age-based formula selection
      if (ageNum <= 14) {
        // Peters Formula for children
        const eECV = 0.0215 * Math.pow(weightKgNum, 0.6469) * Math.pow(heightCmNum, 0.7236);
        const lbmPeters = 3.8 * eECV;
        results.methods.push({
          name: "Peters Formula",
          formula: "eLBM = 3.8 × (0.0215 × W^0.6469 × H^0.7236)",
          result: Math.round(lbmPeters * 10) / 10,
          accuracy: "Recommended for ≤14 years",
          recommended: true
        });
      } else {
        // Adult formulas (Boer, James, Hume)

        // Boer Formula
        let lbmBoer = 0;
        if (gender === "male") {
          lbmBoer = 0.407 * weightKgNum + 0.267 * heightCmNum - 19.2;
        } else {
          lbmBoer = 0.252 * weightKgNum + 0.473 * heightCmNum - 48.3;
        }
        results.methods.push({
          name: "Boer Formula",
          formula: gender === "male" ? "LBM = 0.407×W + 0.267×H - 19.2" : "LBM = 0.252×W + 0.473×H - 48.3",
          result: Math.round(lbmBoer * 10) / 10,
          accuracy: "Good for general population",
          recommended: false
        });

        // James Formula
        let lbmJames = 0;
        if (gender === "male") {
          lbmJames = 1.1 * weightKgNum - 128 * Math.pow(weightKgNum / heightMeters, 2);
        } else {
          lbmJames = 1.07 * weightKgNum - 148 * Math.pow(weightKgNum / heightMeters, 2);
        }
        results.methods.push({
          name: "James Formula",
          formula: gender === "male" ? "LBM = 1.10×W - 128×(W/H)²" : "LBM = 1.07×W - 148×(W/H)²",
          result: Math.round(lbmJames * 10) / 10,
          accuracy: "Moderate accuracy",
          recommended: false
        });

        // Hume Formula
        let lbmHume = 0;
        if (gender === "male") {
          lbmHume = 0.3281 * weightKgNum + 0.33929 * heightCmNum - 29.5336;
        } else {
          lbmHume = 0.29569 * weightKgNum + 0.41813 * heightCmNum - 43.2933;
        }
        results.methods.push({
          name: "Hume Formula",
          formula: gender === "male" ? "LBM = 0.328×W + 0.339×H - 29.5" : "LBM = 0.296×W + 0.418×H - 43.3",
          result: Math.round(lbmHume * 10) / 10,
          accuracy: "Good for clinical use",
          recommended: false
        });
      }

      // Calculate of formula-based methods (excluding body fat method)
      const formulaMethods = results.methods.filter((m: any) => m.name !== "Body Fat % Method");
      const averageLBM = formulaMethods.reduce((sum: number, method: any) => sum + method.result, 0) / formulaMethods.length;
      results.averageLBM = Math.round(averageLBM * 10) / 10;

      // Calculate fat percentage from LBM (if not provided)
      if (!bodyFat && results.averageLBM) {
        const estimatedBodyFat = (weightKgNum - results.averageLBM) / weightKgNum * 100;
        results.estimatedBodyFat = Math.round(estimatedBodyFat * 10) / 10;
      }
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating lean body mass. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setAge("");
    setGender("male");
    setHeightFt("");
    setHeightIn("");
    setHeightCm("");
    setWeightLbs("");
    setWeightKg("");
    setBodyFat("");
    setUnitSystem("us");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-slate-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
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
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>{contentData.lbm_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_details_to_calculate_lean_body_mass_1}</CardDescription>
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

                      {/* Body Fat Percentage (Optional) */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.body_fat_percentage_optional_14}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Zap className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.bodyFat ? "border-red-300" : ""}`} type="number" step="0.1" placeholder="15.0" value={bodyFat} onChange={e => setBodyFat(e.target.value)} />
                        </div>
                        {errors.bodyFat && <p className="text-red-600 text-xs mt-1">{errors.bodyFat}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.if_known_provides_the_most_accurate_lbm_calculatio_15}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateLBM} className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700">{contentData.calculate_16}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_17}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-slate-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-slate-600 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.lean_body_mass_18}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-3xl font-bold text-blue-900">
                            {result.methods.find((m: any) => m.recommended)?.result || result.averageLBM}{contentData.kg_19}</p>
                          <p className="text-sm font-medium text-slate-600">
                            {result.methods.find((m: any) => m.recommended)?.accuracy || "Formula Average"}
                          </p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Heart className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_details_to_calculate_lean_body_mass_20}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Heart className="w-6 h-6 text-blue-600" />
                      <span>{contentData.your_lean_body_mass_results_21}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Results Table */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-4">{contentData.lbm_calculation_methods_22}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 rounded-lg">
                          <thead>
                            <tr className="bg-blue-50">
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-700">{contentData.method_23}</th>
                              <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-blue-700">{contentData.result_kg_24}</th>
                              <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-blue-700">{contentData.result_lbs_25}</th>
                              <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-700">{contentData.accuracy_26}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.methods.map((method: any, index: number) => <tr key={index} className={method.recommended ? "bg-green-50" : ""}>
                                <td className="border border-gray-200 px-4 py-3">
                                  <div>
                                    <p className="font-medium text-gray-900">{method.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{method.formula}</p>
                                  </div>
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-center font-semibold text-blue-700">
                                  {method.result}
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-center font-semibold text-slate-700">
                                  {Math.round(method.result * 2.20462 * 10) / 10}
                                </td>
                                <td className="border border-gray-200 px-4 py-3">
                                  <span className={method.recommended ? "text-green-700 font-medium" : "text-gray-600"}>
                                    {method.accuracy}
                                  </span>
                                </td>
                              </tr>)}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-6">{contentData.summary_27}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-700 mb-3">{contentData.recommended_lbm_28}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.value_29}</strong>{" "}
                              {result.methods.find((m: any) => m.recommended)?.result || result.averageLBM}{contentData.kg_30}{Math.round((result.methods.find((m: any) => m.recommended)?.result || result.averageLBM) * 2.20462 * 10) / 10}{contentData.lbs_31}</p>
                            <p>
                              <strong>{contentData.method_32}</strong>{" "}
                              {result.methods.find((m: any) => m.recommended)?.name || "Formula Average"}
                            </p>
                            {result.estimatedBodyFat && <p>
                                <strong>{contentData.estimated_body_fat_33}</strong> {result.estimatedBodyFat}%
                              </p>}
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <h4 className="font-semibold text-slate-700 mb-3">{contentData.input_summary_34}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.age_35}</strong> {result.inputs.age}{contentData.years_36}</p>
                            <p>
                              <strong>{contentData.gender_37}</strong> {result.inputs.gender === "male" ? "Male" : "Female"}
                            </p>
                            <p>
                              <strong>{contentData.height_38}</strong> {Math.round(result.inputs.height)}{contentData.cm_39}</p>
                            <p>
                              <strong>{contentData.weight_40}</strong> {Math.round(result.inputs.weight * 10) / 10}{contentData.kg_41}</p>
                            {result.inputs.bodyFat && <p>
                                <strong>{contentData.body_fat_42}</strong> {result.inputs.bodyFat}%
                              </p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "BMI Calculator",
          calculatorHref: "/health/bmi-calculator",
        }, {
          calculatorName: "Body Fat Calculator",
          calculatorHref: "/health/body-fat-calculator",
        }, {
          calculatorName: "Army Body Fat Calculator",
          calculatorHref: "/health/army-body-fat-calculator",
        }
        ]} 
        color="blue" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-slate-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-slate-600 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.about_lean_body_mass_43}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.what_is_lbm_44}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.lean_body_mass_45}</strong>{contentData.total_body_weight_minus_fat_mass_46}</li>
                          <li>
                            <strong>{contentData.includes_47}</strong>{contentData.muscles_organs_bones_and_water_48}</li>
                          <li>
                            <strong>{contentData.uses_49}</strong>{contentData.medication_dosing_sports_nutrition_health_tracking_50}</li>
                          <li>
                            <strong>{contentData.difference_51}</strong>{contentData.slightly_higher_than_fatfree_mass_52}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.formula_accuracy_53}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.body_fat_method_54}</strong>{contentData.most_accurate_when_bf_is_known_55}</li>
                          <li>
                            <strong>{contentData.peters_formula_56}</strong>{contentData.recommended_for_children_14_years_57}</li>
                          <li>
                            <strong>{contentData.boer_formula_58}</strong>{contentData.good_for_general_adult_population_59}</li>
                          <li>
                            <strong>{contentData.hume_formula_60}</strong>{contentData.preferred_for_clinical_applications_61}</li>
                          <li>
                            <strong>{contentData.james_formula_62}</strong>{contentData.moderate_accuracy_for_adults_63}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-3">{contentData.clinical_applications_64}</h3>
                      <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.medication_dosing_65}</strong>{contentData.more_accurate_than_total_body_weight_66}</li>
                          <li>
                            <strong>{contentData.nutritional_assessment_67}</strong>{contentData.protein_and_calorie_requirements_68}</li>
                          <li>
                            <strong>{contentData.athletic_performance_69}</strong>{contentData.training_and_recovery_optimization_70}</li>
                          <li>
                            <strong>{contentData.health_monitoring_71}</strong>{contentData.tracking_muscle_mass_changes_72}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-700 mb-3">{contentData.typical_lbm_ranges_73}</h3>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{contentData.category_74}</th>
                              <th className="text-center py-2">{contentData.male_75}</th>
                              <th className="text-center py-2">{contentData.female_76}</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">{contentData.athletes_77}</td>
                              <td className="text-center">{contentData.k_8595_78}</td>
                              <td className="text-center">{contentData.k_7585_79}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.fit_adults_80}</td>
                              <td className="text-center">{contentData.k_8090_81}</td>
                              <td className="text-center">{contentData.k_7080_82}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.average_adults_83}</td>
                              <td className="text-center">{contentData.k_7585_84}</td>
                              <td className="text-center">{contentData.k_6575_85}</td>
                            </tr>
                          </tbody>
                        </table>
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