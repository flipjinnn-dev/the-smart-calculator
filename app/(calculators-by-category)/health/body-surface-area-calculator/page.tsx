"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Activity, Calculator, User, Scale, Ruler, AlertCircle, RotateCcw, HelpCircle } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";

export default function BodySurfaceAreaCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('body-surface-area-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('body-surface-area-calculator', language, "calculator-guide");

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
    "patient_information_0": "",
    "enter_patient_details_to_calculate_body_surface_ar_1": "",
    "gender_2": "",
    "male_3": "",
    "female_4": "",
    "weight_5": "",
    "patients_body_weight_6": "",
    "kg_7": "",
    "lbs_8": "",
    "g_9": "",
    "height_10": "",
    "patients_height_11": "",
    "cm_12": "",
    "ftin_13": "",
    "bsa_formulas_14": "",
    "this_calculator_uses_7_major_formulas_including_du_15": "",
    "calculate_16": "",
    "reset_17": "",
    "bsa_results_18": "",
    "m_19": "",
    "average_bsa_20": "",
    "kg_21": "",
    "weight_22": "",
    "cm_23": "",
    "height_24": "",
    "enter_patient_information_and_click_25": "",
    "calculate_26": "",
    "to_see_bsa_results_27": "",
    "bsa_formula_comparison_28": "",
    "formula_29": "",
    "bsa_m_30": "",
    "method_31": "",
    "du_bois_32": "",
    "most_widely_used_33": "",
    "mosteller_34": "",
    "simplified_formula_35": "",
    "haycock_36": "",
    "pediatric_preferred_37": "",
    "gehan_george_38": "",
    "clinical_studies_39": "",
    "boyd_40": "",
    "weightdependent_41": "",
    "fujimoto_42": "",
    "asian_populations_43": "",
    "takahira_44": "",
    "modified_du_bois_45": "",
    "average_46": "",
    "all_formulas_47": "",
    "patient_information_48": "",
    "gender_49": "",
    "weight_50": "",
    "kg_51": "",
    "height_52": "",
    "cm_53": "",
    "average_bsa_54": "",
    "m_55": "",
    "clinical_note_56": "",
    "bsa_values_are_normalized_to_m_these_formulas_are__57": "",
    "understanding_body_surface_area_58": "",
    "what_is_bsa_59": "",
    "body_surface_area_bsa_is_a_measurement_of_the_tota_60": "",
    "clinical_applications_61": "",
    "chemotherapy_dosing_62": "",
    "cardiac_index_calculations_63": "",
    "burn_assessment_64": "",
    "renal_clearance_studies_65": "",
    "metabolic_rate_calculations_66": "",
    "formula_comparison_67": "",
    "most_common_68": "",
    "du_bois_formula_69": "",
    "bsa_0007184_w0425_h0725_70": "",
    "simplified_71": "",
    "mosteller_formula_72": "",
    "bsa_w_h_3600_73": "",
    "note_74": "",
    "normal_adult_bsa_ranges_from_15_to_20_m_average_ad_75": ""
  };
  const guideData = guideContent || { color: 'teal', sections: [], faq: [] };
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [height, setHeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  // Unit conversion functions
  const convertWeightToKg = (weight: number, unit: string): number => {
    switch (unit) {
      case "lbs":
        return weight * 0.453592;
      case "grams":
        return weight / 1000;
      default:
        return weight;
      // kg
    }
  };
  const convertHeightToCm = (height: number, unit: string, feet?: number, inches?: number): number => {
    if (unit === "ft-in" && feet !== undefined && inches !== undefined) {
      return (feet * 12 + inches) * 2.54;
    }
    return height; // cm
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!gender) {
      newErrors.gender = "Please select gender";
    }
    if (!weight || Number.parseFloat(weight) <= 0) {
      newErrors.weight = "Please enter a valid weight (> 0)";
    }
    if (heightUnit === "cm") {
      if (!height || Number.parseFloat(height) <= 0) {
        newErrors.height = "Please enter a valid height (> 0)";
      }
    } else {
      if (!heightFeet || Number.parseFloat(heightFeet) < 0) {
        newErrors.heightFeet = "Please enter valid feet";
      }
      if (!heightInches || Number.parseFloat(heightInches) < 0 || Number.parseFloat(heightInches) >= 12) {
        newErrors.heightInches = "Please enter valid inches (0-11)";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateBSA = () => {
    if (!validateInputs()) return;
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);

    // Convert inputs to standard units (kg, cm)
    const weightKg = convertWeightToKg(Number.parseFloat(weight), weightUnit);
    const heightCm = heightUnit === "cm" ? Number.parseFloat(height) : convertHeightToCm(0, "ft-in", Number.parseFloat(heightFeet), Number.parseFloat(heightInches));

    // Calculate using all 7 formulas
    const formulas = {
      duBois: 0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725),
      mosteller: Math.sqrt(weightKg * heightCm / 3600),
      haycock: 0.024265 * Math.pow(weightKg, 0.5378) * Math.pow(heightCm, 0.3964),
      gehanGeorge: 0.0235 * Math.pow(weightKg, 0.51456) * Math.pow(heightCm, 0.42246),
      boyd: 0.0333 * Math.pow(weightKg, 0.6157 - 0.0188 * Math.log10(weightKg)) * Math.pow(heightCm, 0.3),
      fujimoto: 0.008883 * Math.pow(weightKg, 0.444) * Math.pow(heightCm, 0.663),
      takahira: 0.007241 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725)
    };

    // Calculate BSA
    const bsaValues = Object.values(formulas);
    const averageBSA = bsaValues.reduce((sum, val) => sum + val, 0) / bsaValues.length;
    setResult({
      weightKg,
      heightCm,
      formulas,
      averageBSA,
      gender
    });
    setShowResult(true);
  };
  const resetCalculator = () => {
    setGender("");
    setWeight("");
    setHeight("");
    setHeightFeet("");
    setHeightInches("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <User className="w-6 h-6 text-teal-600" />
                      <span>{contentData.patient_information_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_patient_details_to_calculate_body_surface_ar_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Gender Selection */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.gender_2}</Label>
                      <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" className="text-teal-600" />
                          <Label htmlFor="male" className="cursor-pointer">{contentData.male_3}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" className="text-teal-600" />
                          <Label htmlFor="female" className="cursor-pointer">{contentData.female_4}</Label>
                        </div>
                      </RadioGroup>
                      {errors.gender && <div className="flex items-center mt-2 text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{errors.gender}</span>
                        </div>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Weight */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">{contentData.weight_5}<div className="relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.patients_body_weight_6}</div>
                          </div>
                        </Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Scale className="h-5 w-5 text-teal-500" />
                            </div>
                            <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${errors.weight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" min="0" placeholder="Enter weight" value={weight} onChange={e => {
                            setWeight(e.target.value);
                            if (errors.weight) setErrors(prev => ({
                              ...prev,
                              weight: ""
                            }));
                          }} />
                          </div>
                          <Select value={weightUnit} onValueChange={setWeightUnit}>
                            <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-teal-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">{contentData.kg_7}</SelectItem>
                              <SelectItem value="lbs">{contentData.lbs_8}</SelectItem>
                              <SelectItem value="grams">{contentData.g_9}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.weight && <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.weight}</span>
                          </div>}
                      </div>

                      {/* Height */}
                      <div className="relative">
                        <Label className="text-sm font-medium text-gray-700 mb-3 block md:flex items-center">{contentData.height_10}<div className="relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.patients_height_11}</div>
                          </div>
                        </Label>
                        <div className="flex space-x-2 mb-2">
                          <Select value={heightUnit} onValueChange={setHeightUnit}>
                            <SelectTrigger className="w-24 h-12 rounded-xl border-gray-200 focus:border-teal-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cm">{contentData.cm_12}</SelectItem>
                              <SelectItem value="ft-in">{contentData.ftin_13}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {heightUnit === "cm" ? <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Ruler className="h-5 w-5 text-teal-500" />
                            </div>
                            <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" min="0" placeholder="Enter height in cm" value={height} onChange={e => {
                          setHeight(e.target.value);
                          if (errors.height) setErrors(prev => ({
                            ...prev,
                            height: ""
                          }));
                        }} />
                          </div> : <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <Input className={`w-full h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${errors.heightFeet ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" placeholder="Feet" value={heightFeet} onChange={e => {
                            setHeightFeet(e.target.value);
                            if (errors.heightFeet) setErrors(prev => ({
                              ...prev,
                              heightFeet: ""
                            }));
                          }} />
                            </div>
                            <div className="relative flex-1">
                              <Input className={`w-full h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm ${errors.heightInches ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" min="0" max="11" placeholder="Inches" value={heightInches} onChange={e => {
                            setHeightInches(e.target.value);
                            if (errors.heightInches) setErrors(prev => ({
                              ...prev,
                              heightInches: ""
                            }));
                          }} />
                            </div>
                          </div>}
                        {(errors.height || errors.heightFeet || errors.heightInches) && <div className="flex items-center mt-2 text-red-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.height || errors.heightFeet || errors.heightInches}</span>
                          </div>}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <p className="text-sm text-gray-700">
                        <strong>{contentData.bsa_formulas_14}</strong>{contentData.this_calculator_uses_7_major_formulas_including_du_15}</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateBSA} className="flex-1 h-12 text-lg bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800">{contentData.calculate_16}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-teal-300 text-teal-700 hover:bg-teal-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_17}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-100 h-full">
                  <CardHeader className="w-full text-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">{contentData.bsa_results_18}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full text-center">
                    {showResult && result ? <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-teal-200">
                          <p className="text-3xl font-bold text-teal-900">{result.averageBSA?.toFixed(3)}{contentData.m_19}</p>
                          <p className="text-gray-600">{contentData.average_bsa_20}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-teal-200">
                          <p className="text-lg font-bold text-teal-900">{result.weightKg?.toFixed(1)}{contentData.kg_21}</p>
                          <p className="text-gray-600">{contentData.weight_22}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-teal-200">
                          <p className="text-lg font-bold text-teal-900">{result.heightCm?.toFixed(1)}{contentData.cm_23}</p>
                          <p className="text-gray-600">{contentData.height_24}</p>
                        </div>
                      </div> : <div className="text-center">
                        <Activity className="w-8 h-8 text-teal-300 mb-2 mx-auto" />
                        <p className="text-gray-500 text-base">{contentData.enter_patient_information_and_click_25}{" "}
                          <span className="font-semibold text-teal-600">{contentData.calculate_26}</span>{contentData.to_see_bsa_results_27}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-teal-600" />
                      <span>{contentData.bsa_formula_comparison_28}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-teal-200">
                            <th className="text-left py-3 px-4 font-semibold text-teal-700">{contentData.formula_29}</th>
                            <th className="text-right py-3 px-4 font-semibold text-teal-700">{contentData.bsa_m_30}</th>
                            <th className="text-left py-3 px-4 font-semibold text-teal-700">{contentData.method_31}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">{contentData.du_bois_32}</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.duBois.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{contentData.most_widely_used_33}</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">{contentData.mosteller_34}</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.mosteller.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{contentData.simplified_formula_35}</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">{contentData.haycock_36}</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.haycock.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{contentData.pediatric_preferred_37}</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">{contentData.gehan_george_38}</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.gehanGeorge.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{contentData.clinical_studies_39}</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">{contentData.boyd_40}</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.boyd.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{contentData.weightdependent_41}</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">{contentData.fujimoto_42}</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.fujimoto.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{contentData.asian_populations_43}</td>
                          </tr>
                          <tr className="border-b border-gray-100 hover:bg-teal-50">
                            <td className="py-3 px-4 font-medium">{contentData.takahira_44}</td>
                            <td className="py-3 px-4 text-right font-mono">{result.formulas.takahira.toFixed(4)}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{contentData.modified_du_bois_45}</td>
                          </tr>
                          <tr className="bg-teal-50 border-t-2 border-teal-200">
                            <td className="py-3 px-4 font-bold text-teal-700">{contentData.average_46}</td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-teal-700">
                              {result.averageBSA.toFixed(4)}
                            </td>
                            <td className="py-3 px-4 text-sm font-medium text-teal-600">{contentData.all_formulas_47}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-700 mb-2">{contentData.patient_information_48}</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>{contentData.gender_49}</strong> {result.gender}
                        </p>
                        <p>
                          <strong>{contentData.weight_50}</strong> {result.weightKg.toFixed(1)}{contentData.kg_51}</p>
                        <p>
                          <strong>{contentData.height_52}</strong> {result.heightCm.toFixed(1)}{contentData.cm_53}</p>
                        <p>
                          <strong>{contentData.average_bsa_54}</strong> {result.averageBSA.toFixed(3)}{contentData.m_55}</p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-800">
                        <strong>{contentData.clinical_note_56}</strong>{contentData.bsa_values_are_normalized_to_m_these_formulas_are__57}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 flex items-center justify-center mr-3 shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">{contentData.understanding_body_surface_area_58}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">{contentData.what_is_bsa_59}</h3>
                      <p className="text-gray-700 mb-4">{contentData.body_surface_area_bsa_is_a_measurement_of_the_tota_60}</p>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">{contentData.clinical_applications_61}</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>{contentData.chemotherapy_dosing_62}</li>
                        <li>{contentData.cardiac_index_calculations_63}</li>
                        <li>{contentData.burn_assessment_64}</li>
                        <li>{contentData.renal_clearance_studies_65}</li>
                        <li>{contentData.metabolic_rate_calculations_66}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">{contentData.formula_comparison_67}</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.most_common_68}</strong>{contentData.du_bois_formula_69}</p>
                        <p className="text-gray-700 text-sm font-mono">{contentData.bsa_0007184_w0425_h0725_70}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-teal-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.simplified_71}</strong>{contentData.mosteller_formula_72}</p>
                        <p className="text-gray-700 text-sm font-mono">{contentData.bsa_w_h_3600_73}</p>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>{contentData.note_74}</strong>{contentData.normal_adult_bsa_ranges_from_15_to_20_m_average_ad_75}</p>
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