"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Ruler, Calculator, RotateCcw, Users, TrendingUp } from "lucide-react";
import SimilarCalculators from "@/components/similar-calculators";
export default function HeightCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('height-calculator', language, "calculator-ui");

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
    "us_ftin_lb_0": "",
    "metric_cm_kg_1": "",
    "childs_information_2": "",
    "age_years_3": "",
    "gender_4": "",
    "male_5": "",
    "female_6": "",
    "height_7": "",
    "ft_8": "",
    "in_9": "",
    "weight_10": "",
    "optional_11": "",
    "parents_heights_12": "",
    "mothers_height_13": "",
    "ft_14": "",
    "in_15": "",
    "fathers_height_16": "",
    "ft_17": "",
    "in_18": "",
    "prediction_method_19": "",
    "autoselect_recommended_20": "",
    "manual_selection_21": "",
    "khamisroche_method_22": "",
    "midparental_height_method_23": "",
    "calculate_24": "",
    "reset_25": "",
    "predicted_height_26": "",
    "khamisroche_method_27": "",
    "midparental_method_28": "",
    "enter_child_and_parent_information_then_click_29": "",
    "calculate_30": "",
    "to_see_predicted_adult_height_31": "",
    "detailed_height_prediction_32": "",
    "khamisroche_method_33": "",
    "predicted_height_34": "",
    "accuracy_range_35": "",
    "range_36": "",
    "based_on_childs_current_age_height_weight_and_pare_37": "",
    "midparental_height_method_38": "",
    "predicted_height_39": "",
    "accuracy_range_40": "",
    "range_41": "",
    "based_only_on_parents_heights_can_be_used_for_any__42": "",
    "input_summary_43": "",
    "child_age_44": "",
    "years_45": "",
    "gender_46": "",
    "current_height_47": "",
    "midparental_48": "",
    "khamisroche_method_49": "",
    "example_boy_8_years_50": "",
    "child_family_information_0": "",
    "enter_childs_current_measurements_and_parents_heig_1": "",
    "unit_system_2": "",
    "us_ftin_lb_3": "",
    "metric_cm_kg_4": "",
    "childs_information_5": "",
    "age_years_6": "",
    "gender_7": "",
    "male_8": "",
    "female_9": "",
    "height_10": "",
    "ft_11": "",
    "in_12": "",
    "weight_13": "",
    "optional_14": "",
    "parents_heights_15": "",
    "mothers_height_16": "",
    "fathers_height_19": "",
    "ft_20": "",
    "in_21": "",
    "prediction_method_22": "",
    "autoselect_recommended_23": "",
    "manual_selection_24": "",
    "khamisroche_method_25": "",
    "midparental_height_method_26": "",
    "calculate_27": "",
    "reset_28": "",
    "predicted_height_29": "",
    "khamisroche_method_30": "",
    "midparental_method_31": "",
    "enter_child_and_parent_information_then_click_32": "",
    "calculate_33": "",
    "to_see_predicted_adult_height_34": "",
    "detailed_height_prediction_35": "",
    "khamisroche_method_36": "",
    "predicted_height_37": "",
    "accuracy_range_38": "",
    "range_39": "",
    "based_on_childs_current_age_height_weight_and_pare_40": "",
    "midparental_height_method_41": "",
    "predicted_height_42": "",
    "accuracy_range_43": "",
    "range_44": "",
    "based_only_on_parents_heights_can_be_used_for_any__45": "",
    "input_summary_46": "",
    "child_age_47": "",
    "years_48": "",
    "gender_49": "",
    "current_height_50": "",
    "midparental_51": "",
    "understanding_height_prediction_52": "",
    "khamisroche_method_53": "",
    "age_range_54": "",
    "best_for_children_4_years_old_55": "",
    "accuracy_56": "",
    "k_21_inches_boys_17_inches_girls_57": "",
    "factors_58": "",
    "childs_age_height_weight_parents_heights_59": "",
    "method_60": "",
    "uses_regression_coefficients_from_longitudinal_stu_61": "",
    "midparental_height_method_62": "",
    "age_range_63": "",
    "can_be_used_for_any_age_64": "",
    "accuracy_65": "",
    "k_4_inches_66": "",
    "factors_67": "",
    "only_parents_heights_68": "",
    "formula_69": "",
    "mother_father_2_25_inches_70": "",
    "sample_calculation_71": "",
    "example_boy_8_years_72": "",
    "current_height_132_cm_weight_32_kg_73": "",
    "mother_160_cm_father_175_cm_74": "",
    "midparental_160_175_2_1675_cm_75": "",
    "khamisroche_76": "",
    "k_178_cm_53_cm_77": "",
    "midparental_78": "",
    "k_1675_65_174_cm_10_cm_79": "",
    "important_notes_80": "",
    "predictions_are_estimates_based_on_statistical_mod_81": "",
    "nutrition_health_and_lifestyle_can_affect_final_he_82": "",
    "genetic_factors_account_for_80_of_height_variation_83": "",
    "environmental_factors_can_influence_growth_pattern_84": ""
  };
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Child information
  const [childAge, setChildAge] = useState("");
  const [childGender, setChildGender] = useState("");
  const [childHeightFt, setChildHeightFt] = useState("");
  const [childHeightIn, setChildHeightIn] = useState("");
  const [childHeightCm, setChildHeightCm] = useState("");
  const [childWeightLb, setChildWeightLb] = useState("");
  const [childWeightKg, setChildWeightKg] = useState("");

  // Parents' heights
  const [motherHeightFt, setMotherHeightFt] = useState("");
  const [motherHeightIn, setMotherHeightIn] = useState("");
  const [motherHeightCm, setMotherHeightCm] = useState("");
  const [fatherHeightFt, setFatherHeightFt] = useState("");
  const [fatherHeightIn, setFatherHeightIn] = useState("");
  const [fatherHeightCm, setFatherHeightCm] = useState("");

  // Settings
  const [unitSystem, setUnitSystem] = useState("us"); // us, metric, other
  const [methodSelection, setMethodSelection] = useState("auto"); // auto, manual
  const [manualMethod, setManualMethod] = useState("khamis"); // khamis, midparental

  // Unit conversion functions
  const convertToInches = (ft: number, inches: number): number => {
    return ft * 12 + inches;
  };
  const convertCmToInches = (cm: number): number => {
    return cm / 2.54;
  };
  const convertInchesToCm = (inches: number): number => {
    return inches * 2.54;
  };
  const convertLbToKg = (lb: number): number => {
    return lb / 2.20462;
  };
  const convertKgToLb = (kg: number): number => {
    return kg * 2.20462;
  };

  // Get child height in cm
  const getChildHeightCm = (): number => {
    if (unitSystem === "metric") {
      return Number.parseFloat(childHeightCm) || 0;
    } else {
      const ft = Number.parseFloat(childHeightFt) || 0;
      const inches = Number.parseFloat(childHeightIn) || 0;
      return convertInchesToCm(convertToInches(ft, inches));
    }
  };

  // Get child weight in kg
  const getChildWeightKg = (): number => {
    if (unitSystem === "metric") {
      return Number.parseFloat(childWeightKg) || 0;
    } else {
      return convertLbToKg(Number.parseFloat(childWeightLb) || 0);
    }
  };

  // Get parent heights in cm
  const getMotherHeightCm = (): number => {
    if (unitSystem === "metric") {
      return Number.parseFloat(motherHeightCm) || 0;
    } else {
      const ft = Number.parseFloat(motherHeightFt) || 0;
      const inches = Number.parseFloat(motherHeightIn) || 0;
      return convertInchesToCm(convertToInches(ft, inches));
    }
  };
  const getFatherHeightCm = (): number => {
    if (unitSystem === "metric") {
      return Number.parseFloat(fatherHeightCm) || 0;
    } else {
      const ft = Number.parseFloat(fatherHeightFt) || 0;
      const inches = Number.parseFloat(fatherHeightIn) || 0;
      return convertInchesToCm(convertToInches(ft, inches));
    }
  };

  // Khamis-Roche Method (simplified coefficients)
  const calculateKhamisRoche = (age: number, gender: string, heightCm: number, weightKg: number, midParentalHeight: number): {
    height: number;
    margin: number;
  } => {
    // Simplified regression coefficients (actual coefficients vary by age and are more complex)
    const coefficients = {
      male: {
        beta: 7.8,
        ah: 0.78,
        aw: 0.32,
        ap: 0.24
      },
      female: {
        beta: 6.1,
        ah: 0.75,
        aw: 0.28,
        ap: 0.26
      }
    };
    const coeff = coefficients[gender as keyof typeof coefficients];
    const predictedHeight = coeff.beta + coeff.ah * heightCm + coeff.aw * weightKg + coeff.ap * midParentalHeight;
    const margin = gender === "male" ? 5.3 : 4.3; // cm

    return {
      height: predictedHeight,
      margin
    };
  };

  // Mid-Parental Height Method
  const calculateMidParental = (gender: string, motherHeight: number, fatherHeight: number): {
    height: number;
    margin: number;
  } => {
    const midParentalHeight = (motherHeight + fatherHeight) / 2;
    const adjustment = gender === "male" ? 6.5 : -6.5; // cm
    const predictedHeight = midParentalHeight + adjustment;
    const margin = 10; // cm

    return {
      height: predictedHeight,
      margin
    };
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};

    // Child age validation
    const age = Number.parseFloat(childAge);
    if (!childAge || age < 0 || age > 18) {
      newErrors.childAge = "Age must be between 0 and 18 years";
    }

    // Child gender validation
    if (!childGender) {
      newErrors.childGender = "Please select child's gender";
    }

    // Child height validation
    const childHeight = getChildHeightCm();
    if (childHeight <= 0 || childHeight > 250) {
      newErrors.childHeight = "Please enter a valid height";
    }

    // Child weight validation (only for Khamis-Roche method)
    const shouldValidateWeight = methodSelection === "auto" ? age >= 4 : manualMethod === "khamis";
    if (shouldValidateWeight) {
      const childWeight = getChildWeightKg();
      if (childWeight <= 0 || childWeight > 200) {
        newErrors.childWeight = "Please enter a valid weight";
      }
    }

    // Parents' heights validation
    const motherHeight = getMotherHeightCm();
    const fatherHeight = getFatherHeightCm();
    if (motherHeight <= 0 || motherHeight > 250) {
      newErrors.motherHeight = "Please enter a valid height for mother";
    }
    if (fatherHeight <= 0 || fatherHeight > 250) {
      newErrors.fatherHeight = "Please enter a valid height for father";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateHeight = () => {
    if (!validateInputs()) return;
    const age = Number.parseFloat(childAge);
    const childHeight = getChildHeightCm();
    const childWeight = getChildWeightKg();
    const motherHeight = getMotherHeightCm();
    const fatherHeight = getFatherHeightCm();
    const midParentalHeight = (motherHeight + fatherHeight) / 2;
    let useKhamisRoche = false;
    let useMidParental = false;

    // Determine which method(s) to use
    if (methodSelection === "auto") {
      if (age >= 4) {
        useKhamisRoche = true;
        useMidParental = true; // Show both for comparison
      } else {
        useMidParental = true;
      }
    } else {
      if (manualMethod === "khamis") {
        useKhamisRoche = true;
      } else {
        useMidParental = true;
      }
    }
    let khamisResult = null;
    let midParentalResult = null;
    if (useKhamisRoche) {
      khamisResult = calculateKhamisRoche(age, childGender, childHeight, childWeight, midParentalHeight);
    }
    if (useMidParental) {
      midParentalResult = calculateMidParental(childGender, motherHeight, fatherHeight);
    }
    setResult({
      khamisRoche: khamisResult,
      midParental: midParentalResult,
      childAge: age,
      childGender,
      childHeight,
      childWeight,
      motherHeight,
      fatherHeight,
      midParentalHeight,
      unitSystem
    });
    setShowResult(true);
  };
  const resetCalculator = () => {
    setChildAge("");
    setChildGender("");
    setChildHeightFt("");
    setChildHeightIn("");
    setChildHeightCm("");
    setChildWeightLb("");
    setChildWeightKg("");
    setMotherHeightFt("");
    setMotherHeightIn("");
    setMotherHeightCm("");
    setFatherHeightFt("");
    setFatherHeightIn("");
    setFatherHeightCm("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const formatheight = (cm: number) => {
    if (unitSystem === "metric") {
      return `${cm.toFixed(1)} cm`;
    } else {
      const totalInches = convertCmToInches(cm);
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      return `${feet}'${inches.toFixed(1)}"`;
    }
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Ruler className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Users className="w-6 h-6 text-teal-600" />
                      <span>{contentData.child_family_information_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_childs_current_measurements_and_parents_heig_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Unit System Selection */}
                    <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.unit_system_2}</Label>
                      <RadioGroup value={unitSystem} onValueChange={setUnitSystem} className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="us" id="us" />
                          <Label htmlFor="us">{contentData.us_ftin_lb_3}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="metric" id="metric" />
                          <Label htmlFor="metric">{contentData.metric_cm_kg_4}</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Child Information */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-teal-700 mb-4">{contentData.childs_information_5}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.age_years_6}</Label>
                          <Input className={`h-12 ${errors.childAge ? "border-red-300" : ""}`} type="number" step="0.1" min="0" max="18" placeholder="8" value={childAge} onChange={e => setChildAge(e.target.value)} />
                          {errors.childAge && <p className="text-red-600 text-xs mt-1">{errors.childAge}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.gender_7}</Label>
                          <Select value={childGender} onValueChange={setChildGender}>
                            <SelectTrigger className={`h-12 ${errors.childGender ? "border-red-300" : ""}`}>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">{contentData.male_8}</SelectItem>
                              <SelectItem value="female">{contentData.female_9}</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.childGender && <p className="text-red-600 text-xs mt-1">{errors.childGender}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_10}</Label>
                          {unitSystem === "metric" ? <Input className={`h-12 ${errors.childHeight ? "border-red-300" : ""}`} type="number" step="0.1" min="0" placeholder="132" value={childHeightCm} onChange={e => setChildHeightCm(e.target.value)} /> : <div className="flex space-x-2">
                              <Input className={`h-12 ${errors.childHeight ? "border-red-300" : ""}`} type="number" min="0" placeholder="4" value={childHeightFt} onChange={e => setChildHeightFt(e.target.value)} />
                              <span className="flex items-center text-gray-500">{contentData.ft_11}</span>
                              <Input className={`h-12 ${errors.childHeight ? "border-red-300" : ""}`} type="number" step="0.1" min="0" max="11.9" placeholder="4" value={childHeightIn} onChange={e => setChildHeightIn(e.target.value)} />
                              <span className="flex items-center text-gray-500">{contentData.in_12}</span>
                            </div>}
                          {errors.childHeight && <p className="text-red-600 text-xs mt-1">{errors.childHeight}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.weight_13}{" "}
                            {Number.parseFloat(childAge) < 4 && methodSelection === "auto" && <span className="text-gray-500">{contentData.optional_14}</span>}
                          </Label>
                          {unitSystem === "metric" ? <Input className={`h-12 ${errors.childWeight ? "border-red-300" : ""}`} type="number" step="0.1" min="0" placeholder="32" value={childWeightKg} onChange={e => setChildWeightKg(e.target.value)} /> : <Input className={`h-12 ${errors.childWeight ? "border-red-300" : ""}`} type="number" step="0.1" min="0" placeholder="70" value={childWeightLb} onChange={e => setChildWeightLb(e.target.value)} />}
                          {errors.childWeight && <p className="text-red-600 text-xs mt-1">{errors.childWeight}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Parents' Heights */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-teal-700 mb-4">{contentData.parents_heights_15}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.mothers_height_16}</Label>
                          {unitSystem === "metric" ? <Input className={`h-12 ${errors.motherHeight ? "border-red-300" : ""}`} type="number" step="0.1" min="0" placeholder="160" value={motherHeightCm} onChange={e => setMotherHeightCm(e.target.value)} /> : <div className="flex space-x-2">
                              <Input className={`h-12 ${errors.motherHeight ? "border-red-300" : ""}`} type="number" min="0" placeholder="5" value={motherHeightFt} onChange={e => setMotherHeightFt(e.target.value)} />
                              <span className="flex items-center text-gray-500">{contentData.ft_17}</span>
                              <Input className={`h-12 ${errors.motherHeight ? "border-red-300" : ""}`} type="number" step="0.1" min="0" max="11.9" placeholder="3" value={motherHeightIn} onChange={e => setMotherHeightIn(e.target.value)} />
                              <span className="flex items-center text-gray-500">{contentData.in_18}</span>
                            </div>}
                          {errors.motherHeight && <p className="text-red-600 text-xs mt-1">{errors.motherHeight}</p>}
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.fathers_height_19}</Label>
                          {unitSystem === "metric" ? <Input className={`h-12 ${errors.fatherHeight ? "border-red-300" : ""}`} type="number" step="0.1" min="0" placeholder="175" value={fatherHeightCm} onChange={e => setFatherHeightCm(e.target.value)} /> : <div className="flex space-x-2">
                              <Input className={`h-12 ${errors.fatherHeight ? "border-red-300" : ""}`} type="number" min="0" placeholder="5" value={fatherHeightFt} onChange={e => setFatherHeightFt(e.target.value)} />
                              <span className="flex items-center text-gray-500">{contentData.ft_20}</span>
                              <Input className={`h-12 ${errors.fatherHeight ? "border-red-300" : ""}`} type="number" step="0.1" min="0" max="11.9" placeholder="9" value={fatherHeightIn} onChange={e => setFatherHeightIn(e.target.value)} />
                              <span className="flex items-center text-gray-500">{contentData.in_21}</span>
                            </div>}
                          {errors.fatherHeight && <p className="text-red-600 text-xs mt-1">{errors.fatherHeight}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Method Selection */}
                    <div className="mb-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.prediction_method_22}</Label>
                      <RadioGroup value={methodSelection} onValueChange={setMethodSelection} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="auto" id="auto" />
                          <Label htmlFor="auto">{contentData.autoselect_recommended_23}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="manual" id="manual" />
                          <Label htmlFor="manual">{contentData.manual_selection_24}</Label>
                        </div>
                      </RadioGroup>

                      {methodSelection === "manual" && <div className="mt-3">
                          <Select value={manualMethod} onValueChange={setManualMethod}>
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="khamis">{contentData.khamisroche_method_25}</SelectItem>
                              <SelectItem value="midparental">{contentData.midparental_height_method_26}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>}
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateHeight} className="flex-1 h-12 text-lg bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800">{contentData.calculate_27}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-teal-300 text-teal-700 hover:bg-teal-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_28}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 flex items-center justify-center mb-3 shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">{contentData.predicted_height_29}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-4">
                        {result.khamisRoche && <div className="bg-white p-6 rounded-lg border border-teal-200">
                            <p className="text-3xl font-bold text-teal-900">
                              {formatheight(result.khamisRoche.height)}
                            </p>
                            <p className="text-gray-600 mt-1">{contentData.khamisroche_method_30}</p>
                            <p className="text-sm text-gray-500 mt-1">±{formatheight(result.khamisRoche.margin)}</p>
                          </div>}
                        {result.midParental && <div className="bg-white p-6 rounded-lg border border-teal-200">
                            <p className="text-3xl font-bold text-teal-900">
                              {formatheight(result.midParental.height)}
                            </p>
                            <p className="text-gray-600 mt-1">{contentData.midparental_method_31}</p>
                            <p className="text-sm text-gray-500 mt-1">±{formatheight(result.midParental.margin)}</p>
                          </div>}
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Ruler className="w-8 h-8 text-teal-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_child_and_parent_information_then_click_32}{" "}
                          <span className="font-semibold text-teal-600">{contentData.calculate_33}</span>{contentData.to_see_predicted_adult_height_34}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results */}
            {showResult && result && <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-teal-600" />
                      <span>{contentData.detailed_height_prediction_35}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {result.khamisRoche && <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                          <h3 className="text-lg font-semibold text-teal-700 mb-3">{contentData.khamisroche_method_36}</h3>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.predicted_height_37}</strong> {formatheight(result.khamisRoche.height)}
                            </p>
                            <p>
                              <strong>{contentData.accuracy_range_38}</strong> ±{formatheight(result.khamisRoche.margin)}
                            </p>
                            <p>
                              <strong>{contentData.range_39}</strong>{" "}
                              {formatheight(result.khamisRoche.height - result.khamisRoche.margin)} -{" "}
                              {formatheight(result.khamisRoche.height + result.khamisRoche.margin)}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">{contentData.based_on_childs_current_age_height_weight_and_pare_40}</p>
                          </div>
                        </div>}

                      {result.midParental && <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                          <h3 className="text-lg font-semibold text-cyan-700 mb-3">{contentData.midparental_height_method_41}</h3>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>
                              <strong>{contentData.predicted_height_42}</strong> {formatheight(result.midParental.height)}
                            </p>
                            <p>
                              <strong>{contentData.accuracy_range_43}</strong> ±{formatheight(result.midParental.margin)}
                            </p>
                            <p>
                              <strong>{contentData.range_44}</strong>{" "}
                              {formatheight(result.midParental.height - result.midParental.margin)} -{" "}
                              {formatheight(result.midParental.height + result.midParental.margin)}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">{contentData.based_only_on_parents_heights_can_be_used_for_any__45}</p>
                          </div>
                        </div>}
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-teal-700 mb-2">{contentData.input_summary_46}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                        <div>
                          <strong>{contentData.child_age_47}</strong> {result.childAge}{contentData.years_48}</div>
                        <div>
                          <strong>{contentData.gender_49}</strong> {result.childGender}
                        </div>
                        <div>
                          <strong>{contentData.current_height_50}</strong> {formatheight(result.childHeight)}
                        </div>
                        <div>
                          <strong>{contentData.midparental_51}</strong> {formatheight(result.midParentalHeight)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "GPA Calculator",
          calculatorHref: "/gpa-calculator",
          calculatorDescription: "Calculate GPA based on course grades and credits with support for both 4.0 scale and letter grades"
        }, {
          calculatorName: "Age Calculator",
          calculatorHref: "/age-calculator",
          calculatorDescription: "Calculate age in years, months, and days based on birth date with precise calculations including leap years"
        },
        ]} 
        color="teal" 
        title="Related Other Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 flex items-center justify-center mr-3 shadow-lg">
                    <Ruler className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">{contentData.understanding_height_prediction_52}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">{contentData.khamisroche_method_53}</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.age_range_54}</strong>{contentData.best_for_children_4_years_old_55}</li>
                          <li>
                            <strong>{contentData.accuracy_56}</strong>{contentData.k_21_inches_boys_17_inches_girls_57}</li>
                          <li>
                            <strong>{contentData.factors_58}</strong>{contentData.childs_age_height_weight_parents_heights_59}</li>
                          <li>
                            <strong>{contentData.method_60}</strong>{contentData.uses_regression_coefficients_from_longitudinal_stu_61}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-teal-700 mb-3">{contentData.midparental_height_method_62}</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.age_range_63}</strong>{contentData.can_be_used_for_any_age_64}</li>
                          <li>
                            <strong>{contentData.accuracy_65}</strong>{contentData.k_4_inches_66}</li>
                          <li>
                            <strong>{contentData.factors_67}</strong>{contentData.only_parents_heights_68}</li>
                          <li>
                            <strong>{contentData.formula_69}</strong>{contentData.mother_father_2_25_inches_70}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-teal-700 mb-3">{contentData.sample_calculation_71}</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.example_boy_8_years_72}</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>{contentData.current_height_132_cm_weight_32_kg_73}</p>
                          <p>{contentData.mother_160_cm_father_175_cm_74}</p>
                          <p>{contentData.midparental_160_175_2_1675_cm_75}</p>
                          <p>
                            <strong>{contentData.khamisroche_76}</strong>{contentData.k_178_cm_53_cm_77}</p>
                          <p>
                            <strong>{contentData.midparental_78}</strong>{contentData.k_1675_65_174_cm_10_cm_79}</p>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-teal-700 mb-3">{contentData.important_notes_80}</h3>
                      <div className="bg-white p-4 rounded-lg border border-teal-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>{contentData.predictions_are_estimates_based_on_statistical_mod_81}</li>
                          <li>{contentData.nutrition_health_and_lifestyle_can_affect_final_he_82}</li>
                          <li>{contentData.genetic_factors_account_for_80_of_height_variation_83}</li>
                          <li>{contentData.environmental_factors_can_influence_growth_pattern_84}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>;
}