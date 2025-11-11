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
import { Calculator, RotateCcw, Scale, Ruler, User } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
;
export default function IdealWeightCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('ideal-weight-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('ideal-weight-calculator', language, "calculator-guide");

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
    "ideal_weight_calculation_0": "",
    "enter_your_details_to_calculate_your_ideal_weight__1": "",
    "unit_system_2": "",
    "metric_kg_cm_3": "",
    "us_lbs_ftin_4": "",
    "age_years_5": "",
    "age_range_280_years_6": "",
    "gender_7": "",
    "male_8": "",
    "female_9": "",
    "height_cm_10": "",
    "height_in_centimeters_11": "",
    "height_ftin_12": "",
    "feet_and_inches_13": "",
    "calculate_weight_14": "",
    "reset_15": "",
    "ideal_weight_16": "",
    "kg_17": "",
    "lbs_18": "",
    "devine_formula_19": "",
    "kg_20": "",
    "healthy_bmi_range_21": "",
    "enter_your_details_and_click_calculate_see_your_id_22": "",
    "ideal_weight_results_23": "",
    "formulabased_ideal_weights_24": "",
    "formula_25": "",
    "weight_kg_26": "",
    "weight_lbs_27": "",
    "notes_28": "",
    "hamwi_1964_29": "",
    "oldest_drug_dosage_origins_30": "",
    "devine_1974_31": "",
    "still_used_in_medical_settings_32": "",
    "robinson_1983_33": "",
    "slightly_lighter_estimate_34": "",
    "miller_1983_35": "",
    "balanced_estimate_36": "",
    "bmibased_healthy_weight_range_37": "",
    "kg_38": "",
    "lbs_39": "",
    "based_on_who_bmi_range_of_18525_kgm_this_range_pro_40": "",
    "calculation_details_41": "",
    "input_summary_42": "",
    "age_43": "",
    "years_44": "",
    "gender_45": "",
    "height_46": "",
    "cm_47": "",
    "inches_48": "",
    "inches_over_5_ft_49": "",
    "inches_50": "",
    "formula_examples_51": "",
    "devine_52": "",
    "bmi_range_53": "",
    "k_18525_54": "",
    "understanding_ideal_weight_55": "",
    "formula_comparison_56": "",
    "hamwi_57": "",
    "oldest_formula_originally_for_drug_dosing_58": "",
    "devine_59": "",
    "most_commonly_used_in_medical_practice_60": "",
    "robinson_61": "",
    "tends_to_give_slightly_lower_weights_62": "",
    "miller_63": "",
    "more_recent_balanced_approach_64": "",
    "example_calculation_65": "",
    "female_56_16764_cm_66": "",
    "hamwi_455_22_6_67": "",
    "k_587_kg_1295_lb_68": "",
    "devine_455_23_6_69": "",
    "k_593_kg_1307_lb_70": "",
    "bmi_range_71": "",
    "k_519701_kg_11451545_lb_72": "",
    "important_considerations_73": "",
    "formulas_dont_account_for_body_composition_74": "",
    "athletes_may_weigh_more_due_to_muscle_mass_75": "",
    "bmi_range_provides_more_flexibility_76": "",
    "individual_health_factors_are_important_77": "",
    "when_to_use_each_method_78": "",
    "formulas_79": "",
    "quick_estimates_medical_dosing_80": "",
    "bmi_range_81": "",
    "general_health_guidelines_82": "",
    "professional_assessment_83": "",
    "body_composition_analysis_84": "",
    "personal_goals_85": "",
    "consider_fitness_and_health_status_86": ""
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
  const [gender, setGender] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");

  // Settings
  const [units, setUnits] = useState("metric"); // metric or us

  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};

    // Age validation
    if (!age || isNaN(Number(age))) {
      newErrors.age = "Age is required and must be a number";
    } else if (Number(age) < 2 || Number(age) > 80) {
      newErrors.age = "Age must be between 2 and 80 years";
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateIdealWeight = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
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

      // Convert height to inches for formula calculations
      const heightInchesTotal = heightCmVal / 2.54;
      const inchesOver5Ft = heightInchesTotal - 60; // 5 feet = 60 inches

      // Calculate weights using different formulas (all in kg)
      let hamwi: number, devine: number, robinson: number, miller: number;
      if (genderVal === "male") {
        hamwi = 48.0 + 2.7 * inchesOver5Ft;
        devine = 50.0 + 2.3 * inchesOver5Ft;
        robinson = 52.0 + 1.9 * inchesOver5Ft;
        miller = 56.2 + 1.41 * inchesOver5Ft;
      } else {
        hamwi = 45.5 + 2.2 * inchesOver5Ft;
        devine = 45.5 + 2.3 * inchesOver5Ft;
        robinson = 49.0 + 1.7 * inchesOver5Ft;
        miller = 53.1 + 1.36 * inchesOver5Ft;
      }

      // Calculate-based healthy weight range
      const heightM = heightCmVal / 100;
      const bmiLowerBound = 18.5 * (heightM * heightM);
      const bmiUpperBound = 25.0 * (heightM * heightM);
      setResult({
        formulas: {
          hamwi: {
            kg: hamwi,
            lbs: hamwi * 2.20462
          },
          devine: {
            kg: devine,
            lbs: devine * 2.20462
          },
          robinson: {
            kg: robinson,
            lbs: robinson * 2.20462
          },
          miller: {
            kg: miller,
            lbs: miller * 2.20462
          }
        },
        bmiRange: {
          lower: {
            kg: bmiLowerBound,
            lbs: bmiLowerBound * 2.20462
          },
          upper: {
            kg: bmiUpperBound,
            lbs: bmiUpperBound * 2.20462
          }
        },
        inputs: {
          age: ageVal,
          gender: genderVal,
          height: heightCmVal,
          units
        },
        calculations: {
          heightInches: heightInchesTotal,
          inchesOver5Ft: inchesOver5Ft,
          heightM: heightM
        }
      });
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating ideal weight. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setAge("");
    setGender("");
    setHeightCm("");
    setHeightFeet("");
    setHeightInches("");
    setUnits("metric");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>{contentData.ideal_weight_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_details_to_calculate_your_ideal_weight__1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    {/* Units Selection */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
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
                      {/* Age Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.age_years_5}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`} type="text" placeholder="30" value={age} onChange={e => setAge(e.target.value)} />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        <p className="text-xs text-gray-500 mt-1">{contentData.age_range_280_years_6}</p>
                      </div>

                      {/* Gender Input */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.gender_7}</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className={`h-12 ${errors.gender ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">{contentData.male_8}</SelectItem>
                            <SelectItem value="female">{contentData.female_9}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
                      </div>

                      {/* Height Input */}
                      {units === "metric" ? <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_cm_10}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Ruler className="h-5 w-5 text-blue-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.height ? "border-red-300" : ""}`} type="text" placeholder="175" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
                          </div>
                          {errors.height && <p className="text-red-600 text-xs mt-1">{errors.height}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.height_in_centimeters_11}</p>
                        </div> : <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_ftin_12}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-blue-500" />
                              </div>
                              <Input className={`h-12 pl-10 ${errors.heightFeet ? "border-red-300" : ""}`} type="text" placeholder="5" value={heightFeet} onChange={e => setHeightFeet(e.target.value)} />
                            </div>
                            <div className="relative flex-1">
                              <Input className={`h-12 ${errors.heightInches ? "border-red-300" : ""}`} type="text" placeholder="6" value={heightInches} onChange={e => setHeightInches(e.target.value)} />
                            </div>
                          </div>
                          {(errors.heightFeet || errors.heightInches) && <p className="text-red-600 text-xs mt-1">{errors.heightFeet || errors.heightInches}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.feet_and_inches_13}</p>
                        </div>}
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateIdealWeight} className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800">{contentData.calculate_weight_14}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_15}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-cyan-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 flex items-center justify-center mb-3 shadow-lg">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.ideal_weight_16}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-lg font-bold text-blue-900">
                            {Math.round(result.formulas.devine.kg)}{contentData.kg_17}{Math.round(result.formulas.devine.lbs)}{contentData.lbs_18}</p>
                          <p className="text-gray-600 text-sm">{contentData.devine_formula_19}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-lg font-bold text-blue-900">
                            {Math.round(result.bmiRange.lower.kg)}-{Math.round(result.bmiRange.upper.kg)}{contentData.kg_20}</p>
                          <p className="text-gray-600 text-sm">{contentData.healthy_bmi_range_21}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Scale className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_details_and_click_calculate_see_your_id_22}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Scale className="w-6 h-6 text-blue-600" />
                      <span>{contentData.ideal_weight_results_23}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Formula Results Table */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-4">{contentData.formulabased_ideal_weights_24}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-blue-200 rounded-lg">
                          <thead>
                            <tr className="bg-gradient-to-r from-blue-50 to-cyan-50">
                              <th className="border border-blue-200 p-3 text-left font-semibold text-blue-700">{contentData.formula_25}</th>
                              <th className="border border-blue-200 p-3 text-center font-semibold text-blue-700">{contentData.weight_kg_26}</th>
                              <th className="border border-blue-200 p-3 text-center font-semibold text-blue-700">{contentData.weight_lbs_27}</th>
                              <th className="border border-blue-200 p-3 text-left font-semibold text-blue-700">{contentData.notes_28}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-blue-200 p-3 font-medium">{contentData.hamwi_1964_29}</td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.hamwi.kg.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.hamwi.lbs.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-sm text-gray-600">{contentData.oldest_drug_dosage_origins_30}</td>
                            </tr>
                            <tr className="bg-blue-25">
                              <td className="border border-blue-200 p-3 font-medium">{contentData.devine_1974_31}</td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.devine.kg.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.devine.lbs.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-sm text-gray-600">{contentData.still_used_in_medical_settings_32}</td>
                            </tr>
                            <tr>
                              <td className="border border-blue-200 p-3 font-medium">{contentData.robinson_1983_33}</td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.robinson.kg.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.robinson.lbs.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-sm text-gray-600">{contentData.slightly_lighter_estimate_34}</td>
                            </tr>
                            <tr className="bg-blue-25">
                              <td className="border border-blue-200 p-3 font-medium">{contentData.miller_1983_35}</td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.miller.kg.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-center">
                                {result.formulas.miller.lbs.toFixed(1)}
                              </td>
                              <td className="border border-blue-200 p-3 text-sm text-gray-600">{contentData.balanced_estimate_36}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* BMI Range */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                      <h3 className="text-xl font-semibold text-blue-700 mb-4">{contentData.bmibased_healthy_weight_range_37}</h3>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-700 mb-2">
                          {result.bmiRange.lower.kg.toFixed(1)} - {result.bmiRange.upper.kg.toFixed(1)}{contentData.kg_38}</p>
                        <p className="text-lg text-gray-600 mb-4">
                          ({result.bmiRange.lower.lbs.toFixed(1)} - {result.bmiRange.upper.lbs.toFixed(1)}{contentData.lbs_39}</p>
                        <p className="text-sm text-gray-700">{contentData.based_on_who_bmi_range_of_18525_kgm_this_range_pro_40}</p>
                      </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-blue-700 mb-6">{contentData.calculation_details_41}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-700 mb-3">{contentData.input_summary_42}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.age_43}</strong> {result.inputs.age}{contentData.years_44}</p>
                            <p>
                              <strong>{contentData.gender_45}</strong> {result.inputs.gender}
                            </p>
                            <p>
                              <strong>{contentData.height_46}</strong> {result.inputs.height.toFixed(1)}{contentData.cm_47}{result.calculations.heightInches.toFixed(1)}{contentData.inches_48}</p>
                            <p>
                              <strong>{contentData.inches_over_5_ft_49}</strong> {result.calculations.inchesOver5Ft.toFixed(1)}{contentData.inches_50}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                          <h4 className="font-semibold text-cyan-700 mb-3">{contentData.formula_examples_51}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.devine_52}{result.inputs.gender}):</strong>
                            </p>
                            <p className="font-mono text-xs">
                              {result.inputs.gender === "male" ? `50.0 + (2.3 × ${result.calculations.inchesOver5Ft.toFixed(1)})` : `45.5 + (2.3 × ${result.calculations.inchesOver5Ft.toFixed(1)})`}
                            </p>
                            <p>
                              <strong>{contentData.bmi_range_53}</strong>
                            </p>
                            <p className="font-mono text-xs">{contentData.k_18525_54}{result.calculations.heightM.toFixed(2)})²</p>
                          </div>
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 flex items-center justify-center mr-3 shadow-lg">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.understanding_ideal_weight_55}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.formula_comparison_56}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.hamwi_57}</strong>{contentData.oldest_formula_originally_for_drug_dosing_58}</li>
                          <li>
                            <strong>{contentData.devine_59}</strong>{contentData.most_commonly_used_in_medical_practice_60}</li>
                          <li>
                            <strong>{contentData.robinson_61}</strong>{contentData.tends_to_give_slightly_lower_weights_62}</li>
                          <li>
                            <strong>{contentData.miller_63}</strong>{contentData.more_recent_balanced_approach_64}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.example_calculation_65}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.female_56_16764_cm_66}</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>{contentData.hamwi_455_22_6_67}<strong>{contentData.k_587_kg_1295_lb_68}</strong>
                          </p>
                          <p>{contentData.devine_455_23_6_69}<strong>{contentData.k_593_kg_1307_lb_70}</strong>
                          </p>
                          <p>{contentData.bmi_range_71}<strong>{contentData.k_519701_kg_11451545_lb_72}</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.important_considerations_73}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.formulas_dont_account_for_body_composition_74}</li>
                          <li>{contentData.athletes_may_weigh_more_due_to_muscle_mass_75}</li>
                          <li>{contentData.bmi_range_provides_more_flexibility_76}</li>
                          <li>{contentData.individual_health_factors_are_important_77}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.when_to_use_each_method_78}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.formulas_79}</strong>{contentData.quick_estimates_medical_dosing_80}</li>
                          <li>
                            <strong>{contentData.bmi_range_81}</strong>{contentData.general_health_guidelines_82}</li>
                          <li>
                            <strong>{contentData.professional_assessment_83}</strong>{contentData.body_composition_analysis_84}</li>
                          <li>
                            <strong>{contentData.personal_goals_85}</strong>{contentData.consider_fitness_and_health_status_86}</li>
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