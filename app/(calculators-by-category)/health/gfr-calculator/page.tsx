"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Calculator, RotateCcw, Activity, AlertTriangle } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;
export default function GfrCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('gfr-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('gfr-calculator', language, "calculator-guide");

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
    "kidney_function_assessment_0": "",
    "enter_patient_information_to_calculate_estimated_g_1": "",
    "patient_type_2": "",
    "adult_3": "",
    "ages_18_mdrd_ckdepi_formulas_4": "",
    "child_5": "",
    "ages_017_schwartz_formula_6": "",
    "age_7": "",
    "sex_8": "",
    "male_9": "",
    "female_10": "",
    "height_11": "",
    "cm_12": "",
    "in_13": "",
    "required_for_schwartz_formula_calculation_14": "",
    "serum_creatinine_mgdl_15": "",
    "formula_choice_16": "",
    "ckdepi_2021_racefree_17": "",
    "default_most_current_18": "",
    "mdrd_idmstraceable_19": "",
    "traditional_formula_20": "",
    "calculate_21": "",
    "reset_22": "",
    "egfr_result_23": "",
    "mlmin173_m_24": "",
    "enter_patient_information_to_calculate_egfr_25": "",
    "gfr_results_26": "",
    "estimated_gfr_27": "",
    "mlmin173_m_28": "",
    "stage_29": "",
    "calculation_details_30": "",
    "formula_used_31": "",
    "patient_type_32": "",
    "age_33": "",
    "years_34": "",
    "sex_35": "",
    "height_36": "",
    "serum_creatinine_37": "",
    "mgdl_38": "",
    "important_medical_notice_39": "",
    "results_are_estimates_for_screening_purposes_only__40": "",
    "understanding_gfr_ckd_stages_41": "",
    "ckd_stages_42": "",
    "g1_43": "",
    "k_90_44": "",
    "normal_45": "",
    "g2_46": "",
    "k_6089_47": "",
    "mildly_decreased_48": "",
    "g3a_49": "",
    "k_4559_50": "",
    "mildmoderate_51": "",
    "g3b_52": "",
    "k_3044_53": "",
    "moderatesevere_54": "",
    "g4_55": "",
    "k_1529_56": "",
    "severe_57": "",
    "g5_58": "",
    "k_15_59": "",
    "kidney_failure_60": "",
    "formula_comparison_61": "",
    "ckdepi_2021_62": "",
    "most_current_racefree_formula_recommended_by_guide_63": "",
    "mdrd_64": "",
    "traditional_formula_may_underestimate_at_higher_gf_65": "",
    "schwartz_formula_66": "",
    "pediatric_formula_for_children_aged_017_years_67": "",
    "clinical_significance_68": "",
    "normal_gfr_69": "",
    "k_90120_mlmin173_m_in_healthy_adults_70": "",
    "ckd_diagnosis_71": "",
    "gfr_60_for_3_months_72": "",
    "referral_to_nephrology_73": "",
    "usually_at_gfr_30_74": "",
    "dialysis_consideration_75": "",
    "gfr_15_or_symptomatic_76": "",
    "limitations_77": "",
    "less_accurate_in_extremes_of_age_body_size_or_musc_78": "",
    "may_be_inaccurate_in_acute_kidney_injury_79": "",
    "requires_stable_creatinine_levels_80": "",
    "consider_cystatin_cbased_equations_for_better_accu_81": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [patientType, setPatientType] = useState("adult");

  // Input states
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [serumCreatinine, setSerumCreatinine] = useState("");
  const [formula, setFormula] = useState("ckd-epi");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!age) {
      newErrors.age = "Please enter age";
    } else {
      const ageNum = Number.parseFloat(age);
      if (isNaN(ageNum)) {
        newErrors.age = "Please enter a valid age";
      } else if (patientType === "adult" && ageNum < 18) {
        newErrors.age = "Age must be 18 or older for adult calculations";
      } else if (patientType === "child" && (ageNum < 0 || ageNum >= 18)) {
        newErrors.age = "Age must be 0-17 years for pediatric calculations";
      } else if (ageNum > 120) {
        newErrors.age = "Please enter a valid age";
      }
    }
    if (!sex) {
      newErrors.sex = "Please select sex";
    }
    if (!serumCreatinine) {
      newErrors.serumCreatinine = "Please enter serum creatinine level";
    } else {
      const scrNum = Number.parseFloat(serumCreatinine);
      if (isNaN(scrNum) || scrNum <= 0) {
        newErrors.serumCreatinine = "Please enter a valid creatinine level";
      } else if (scrNum > 20) {
        newErrors.serumCreatinine = "Creatinine level seems unusually high";
      }
    }
    if (patientType === "child") {
      if (!height) {
        newErrors.height = "Please enter height for pediatric calculations";
      } else {
        const heightNum = Number.parseFloat(height);
        if (isNaN(heightNum) || heightNum <= 0) {
          newErrors.height = "Please enter a valid height";
        } else if (heightUnit === "cm" && (heightNum < 30 || heightNum > 200)) {
          newErrors.height = "Height should be between 30-200 cm";
        } else if (heightUnit === "inches" && (heightNum < 12 || heightNum > 80)) {
          newErrors.height = "Height should be between 12-80 inches";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const getCKDStage = (egfr: number) => {
    if (egfr >= 90) return {
      stage: "G1",
      description: "Normal",
      color: "text-green-700 bg-green-50 border-green-200"
    };
    if (egfr >= 60) return {
      stage: "G2",
      description: "Mildly decreased",
      color: "text-yellow-700 bg-yellow-50 border-yellow-200"
    };
    if (egfr >= 45) return {
      stage: "G3a",
      description: "Mild-moderate decrease",
      color: "text-orange-700 bg-orange-50 border-orange-200"
    };
    if (egfr >= 30) return {
      stage: "G3b",
      description: "Moderate-severe decrease",
      color: "text-red-700 bg-red-50 border-red-200"
    };
    if (egfr >= 15) return {
      stage: "G4",
      description: "Severe decrease",
      color: "text-red-800 bg-red-100 border-red-300"
    };
    return {
      stage: "G5",
      description: "Kidney failure",
      color: "text-red-900 bg-red-200 border-red-400"
    };
  };
  const calculateSchwartz = (age: number, sex: string, scr: number, heightCm: number) => {
    let k: number;
    if (age < 1) {
      k = 0.45; // Full-term infants & children up to 1 year
    } else if (age <= 13) {
      k = 0.55; // Children (1–13 years)
    } else if (age <= 18 && sex === "female") {
      k = 0.55; // Adolescent females (13–18 years)
    } else {
      k = 0.7; // Adolescent males (13–18 years)
    }
    const egfr = k * heightCm / scr;
    return Math.round(egfr * 10) / 10;
  };
  const calculateMDRD = (age: number, sex: string, scr: number) => {
    // MDRD (IDMS-traceable, 4-variable): eGFR = 175 × (SCr ^ -1.154) × (Age ^ -0.203) × (0.742 if female)
    let egfr = 175 * Math.pow(scr, -1.154) * Math.pow(age, -0.203);
    if (sex === "female") {
      egfr *= 0.742;
    }
    return Math.round(egfr * 10) / 10;
  };
  const calculateCKDEPI = (age: number, sex: string, scr: number) => {
    // CKD-EPI (2021, race-free): eGFR = 142 × min(SCr/k, 1)^α × max(SCr/k, 1)^-1.200 × 0.9938^Age × (1.012 if female)
    const k = sex === "female" ? 0.7 : 0.9;
    const alpha = sex === "female" ? -0.241 : -0.302;
    const scrOverK = scr / k;
    const minTerm = Math.pow(Math.min(scrOverK, 1), alpha);
    const maxTerm = Math.pow(Math.max(scrOverK, 1), -1.2);
    const ageTerm = Math.pow(0.9938, age);
    let egfr = 142 * minTerm * maxTerm * ageTerm;
    if (sex === "female") {
      egfr *= 1.012;
    }
    return Math.round(egfr * 10) / 10;
  };
  const calculateGFR = () => {
    if (!validateInputs()) return;
    try {
      const ageNum = Number.parseFloat(age);
      const scrNum = Number.parseFloat(serumCreatinine);
      let egfr: number;
      let formulaUsed: string;
      if (patientType === "child") {
        const heightNum = Number.parseFloat(height);
        const heightCm = heightUnit === "inches" ? heightNum * 2.54 : heightNum;
        egfr = calculateSchwartz(ageNum, sex, scrNum, heightCm);
        formulaUsed = "Schwartz Formula (Pediatric)";
      } else {
        if (formula === "mdrd") {
          egfr = calculateMDRD(ageNum, sex, scrNum);
          formulaUsed = "MDRD (IDMS-traceable)";
        } else {
          egfr = calculateCKDEPI(ageNum, sex, scrNum);
          formulaUsed = "CKD-EPI 2021 (race-free)";
        }
      }
      const ckdStage = getCKDStage(egfr);
      const results = {
        age: ageNum,
        sex,
        serumCreatinine: scrNum,
        egfr,
        formulaUsed,
        ckdStage,
        patientType,
        ...(patientType === "child" && {
          height: height + " " + heightUnit
        })
      };
      setResult(results);
      setShowResult(true);
      scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    } catch (error) {
      setErrors({
        general: "Error calculating GFR. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setAge("");
    setSex("");
    setSerumCreatinine("");
    setFormula("ckd-epi");
    setHeight("");
    setHeightUnit("cm");
    setPatientType("adult");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>{contentData.kidney_function_assessment_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_patient_information_to_calculate_estimated_g_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{errors.general}</p>
                      </div>}

                    <div className="space-y-6 mb-8">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.patient_type_2}</Label>
                        <RadioGroup value={patientType} onValueChange={setPatientType} className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="adult" id="adult" />
                            <Label htmlFor="adult" className="text-sm cursor-pointer">
                              <span className="font-medium">{contentData.adult_3}</span>{contentData.ages_18_mdrd_ckdepi_formulas_4}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="child" id="child" />
                            <Label htmlFor="child" className="text-sm cursor-pointer">
                              <span className="font-medium">{contentData.child_5}</span>{contentData.ages_017_schwartz_formula_6}</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Age */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.age_7}{patientType === "adult" ? "≥18 years" : "0-17 years"}) *
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calculator className="h-5 w-5 text-blue-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.age ? "border-red-300" : ""}`} type="number" placeholder={patientType === "adult" ? "Enter age (≥18)" : "Enter age (0-17)"} value={age} onChange={e => setAge(e.target.value)} min={patientType === "adult" ? "18" : "0"} max={patientType === "adult" ? "120" : "17"} />
                        </div>
                        {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                      </div>

                      {/* Sex */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.sex_8}</Label>
                        <Select value={sex} onValueChange={setSex}>
                          <SelectTrigger className={`h-12 ${errors.sex ? "border-red-300" : ""}`}>
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">{contentData.male_9}</SelectItem>
                            <SelectItem value="female">{contentData.female_10}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.sex && <p className="text-red-600 text-xs mt-1">{errors.sex}</p>}
                      </div>

                      {patientType === "child" && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_11}</Label>
                          <div className="flex space-x-2">
                            <div className="flex-1 relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calculator className="h-5 w-5 text-green-500" />
                              </div>
                              <Input className={`h-12 pl-10 ${errors.height ? "border-red-300" : ""}`} type="number" placeholder="Enter height" value={height} onChange={e => setHeight(e.target.value)} min="1" step="0.1" />
                            </div>
                            <Select value={heightUnit} onValueChange={setHeightUnit}>
                              <SelectTrigger className="w-24 h-12">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cm">{contentData.cm_12}</SelectItem>
                                <SelectItem value="inches">{contentData.in_13}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.height && <p className="text-red-600 text-xs mt-1">{errors.height}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.required_for_schwartz_formula_calculation_14}</p>
                        </div>}

                      {/* Serum Creatinine */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.serum_creatinine_mgdl_15}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Activity className="h-5 w-5 text-green-500" />
                          </div>
                          <Input className={`h-12 pl-10 ${errors.serumCreatinine ? "border-red-300" : ""}`} type="number" placeholder="Enter creatinine level" value={serumCreatinine} onChange={e => setSerumCreatinine(e.target.value)} min="0.1" max="20" step="0.1" />
                        </div>
                        {errors.serumCreatinine && <p className="text-red-600 text-xs mt-1">{errors.serumCreatinine}</p>}
                        <p className="text-xs text-gray-500 mt-1">
                          {patientType === "adult" ? "Normal range: 0.6-1.2 mg/dL (varies by lab)" : "Pediatric ranges vary by age"}
                        </p>
                      </div>

                      {patientType === "adult" && <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.formula_choice_16}</Label>
                          <RadioGroup value={formula} onValueChange={setFormula} className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="ckd-epi" id="ckd-epi" />
                              <Label htmlFor="ckd-epi" className="text-sm cursor-pointer">
                                <span className="font-medium">{contentData.ckdepi_2021_racefree_17}</span>{contentData.default_most_current_18}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mdrd" id="mdrd" />
                              <Label htmlFor="mdrd" className="text-sm cursor-pointer">
                                <span className="font-medium">{contentData.mdrd_idmstraceable_19}</span>{contentData.traditional_formula_20}</Label>
                            </div>
                          </RadioGroup>
                        </div>}
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateGFR} className="h-12 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold shadow-lg">
                        <Calculator className="w-4 h-4 mr-2" />{contentData.calculate_21}</Button>
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mb-3 shadow-lg">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.egfr_result_23}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-blue-200">
                          <p className="text-2xl font-bold text-blue-900 mb-2">{result.egfr}</p>
                          <p className="text-sm font-medium text-gray-600 mb-2">{contentData.mlmin173_m_24}</p>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${result.ckdStage.color}`}>
                            {result.ckdStage.stage}: {result.ckdStage.description}
                          </div>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Activity className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_patient_information_to_calculate_egfr_25}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <span>{contentData.gfr_results_26}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-4 text-lg">{contentData.estimated_gfr_27}</h4>
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-blue-900">{result.egfr}</p>
                            <p className="text-sm text-gray-600">{contentData.mlmin173_m_28}</p>
                          </div>
                          <div className="text-center">
                            <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium border ${result.ckdStage.color}`}>{contentData.stage_29}{result.ckdStage.stage}: {result.ckdStage.description}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-4 text-lg">{contentData.calculation_details_30}</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600">{contentData.formula_used_31}</span>
                            <p className="font-semibold text-green-700">{result.formulaUsed}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.patient_type_32}</span>
                            <p className="font-semibold text-green-700 capitalize">{result.patientType}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.age_33}</span>
                            <p className="font-semibold text-green-700">{result.age}{contentData.years_34}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{contentData.sex_35}</span>
                            <p className="font-semibold text-green-700 capitalize">{result.sex}</p>
                          </div>
                          {result.height && <div>
                              <span className="text-gray-600">{contentData.height_36}</span>
                              <p className="font-semibold text-green-700">{result.height}</p>
                            </div>}
                          <div>
                            <span className="text-gray-600">{contentData.serum_creatinine_37}</span>
                            <p className="font-semibold text-green-700">{result.serumCreatinine}{contentData.mgdl_38}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medical Disclaimer */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">{contentData.important_medical_notice_39}</h4>
                          <p className="text-sm text-yellow-700">{contentData.results_are_estimates_for_screening_purposes_only__40}{result.patientType === "child" && " Pediatric GFR calculations require clinical correlation."}
                          </p>
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
          calculatorName: "Overweight Calculator",
          calculatorHref: "/health/overweight-calculator",
        }, {
          calculatorName: "Anorexic BMI Calculator",
          calculatorHref: "/health/anorexic-bmi-calculator",
        }
        ]} 
        color="green" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-green-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mr-3 shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.understanding_gfr_ckd_stages_41}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.ckd_stages_42}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>{contentData.g1_43}</strong>{contentData.k_90_44}</span>
                            <span className="text-green-700 bg-green-50 px-2 py-1 rounded text-xs">{contentData.normal_45}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>{contentData.g2_46}</strong>{contentData.k_6089_47}</span>
                            <span className="text-yellow-700 bg-yellow-50 px-2 py-1 rounded text-xs">{contentData.mildly_decreased_48}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>{contentData.g3a_49}</strong>{contentData.k_4559_50}</span>
                            <span className="text-orange-700 bg-orange-50 px-2 py-1 rounded text-xs">{contentData.mildmoderate_51}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>{contentData.g3b_52}</strong>{contentData.k_3044_53}</span>
                            <span className="text-red-700 bg-red-50 px-2 py-1 rounded text-xs">{contentData.moderatesevere_54}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>{contentData.g4_55}</strong>{contentData.k_1529_56}</span>
                            <span className="text-red-800 bg-red-100 px-2 py-1 rounded text-xs">{contentData.severe_57}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span>
                              <strong>{contentData.g5_58}</strong>{contentData.k_15_59}</span>
                            <span className="text-red-900 bg-red-200 px-2 py-1 rounded text-xs">{contentData.kidney_failure_60}</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.formula_comparison_61}</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong className="text-blue-700">{contentData.ckdepi_2021_62}</strong>
                            <p className="text-gray-700">{contentData.most_current_racefree_formula_recommended_by_guide_63}</p>
                          </div>
                          <div>
                            <strong className="text-blue-700">{contentData.mdrd_64}</strong>
                            <p className="text-gray-700">{contentData.traditional_formula_may_underestimate_at_higher_gf_65}</p>
                          </div>
                          <div>
                            <strong className="text-blue-700">{contentData.schwartz_formula_66}</strong>
                            <p className="text-gray-700">{contentData.pediatric_formula_for_children_aged_017_years_67}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.clinical_significance_68}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.normal_gfr_69}</strong>{contentData.k_90120_mlmin173_m_in_healthy_adults_70}</li>
                          <li>
                            <strong>{contentData.ckd_diagnosis_71}</strong>{contentData.gfr_60_for_3_months_72}</li>
                          <li>
                            <strong>{contentData.referral_to_nephrology_73}</strong>{contentData.usually_at_gfr_30_74}</li>
                          <li>
                            <strong>{contentData.dialysis_consideration_75}</strong>{contentData.gfr_15_or_symptomatic_76}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.limitations_77}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.less_accurate_in_extremes_of_age_body_size_or_musc_78}</li>
                          <li>{contentData.may_be_inaccurate_in_acute_kidney_injury_79}</li>
                          <li>{contentData.requires_stable_creatinine_levels_80}</li>
                          <li>{contentData.consider_cystatin_cbased_equations_for_better_accu_81}</li>
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
            entityId="gfr-calculator"
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