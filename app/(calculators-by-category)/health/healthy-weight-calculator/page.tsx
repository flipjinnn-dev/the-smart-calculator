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
import { Calculator, RotateCcw, Activity, Target, Heart, Scale } from "lucide-react";
import CalculatorGuide from "@/components/calculator-guide";
;
export default function HealthyWeightCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('healthy-weight-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('healthy-weight-calculator', language, "calculator-guide");

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
    "weight_range_calculation_0": "",
    "enter_your_height_to_calculate_your_healthy_weight_1": "",
    "unit_system_2": "",
    "us_ftin_3": "",
    "metric_cm_4": "",
    "height_5": "",
    "ft_6": "",
    "in_7": "",
    "height_cm_8": "",
    "age_requirement_9": "",
    "this_calculator_is_intended_for_adults_18_years_an_10": "",
    "calculate_11": "",
    "reset_12": "",
    "healthy_weight_13": "",
    "kg_14": "",
    "lbs_15": "",
    "for_height_16": "",
    "enter_your_height_to_see_your_healthy_weight_range_17": "",
    "your_healthy_weight_range_18": "",
    "for_height_19": "",
    "cm_20": "",
    "lbs_21": "",
    "kg_22": "",
    "this_calculator_uses_the_standard_bmi_range_23": "",
    "for_adults_24": "",
    "calculation_steps_25": "",
    "step_1_height_conversion_26": "",
    "height_27": "",
    "height_in_meters_28": "",
    "m_29": "",
    "step_2_bmi_calculation_30": "",
    "lower_limit_bmi_185_31": "",
    "kg_32": "",
    "upper_limit_bmi_250_33": "",
    "kg_34": "",
    "formula_bmi_height_35": "",
    "about_healthy_weight_36": "",
    "bmibased_calculation_37": "",
    "based_on_bmi_range_38": "",
    "k_185_250_kgm_39": "",
    "formula_40": "",
    "weight_bmi_height_41": "",
    "standard_42": "",
    "world_health_organization_guidelines_43": "",
    "age_group_44": "",
    "adults_18_years_and_older_45": "",
    "important_notes_46": "",
    "general_guideline_47": "",
    "not_personalized_medical_advice_48": "",
    "limitations_49": "",
    "doesnt_account_for_muscle_mass_50": "",
    "special_populations_51": "",
    "may_not_apply_to_athletes_52": "",
    "consultation_53": "",
    "speak_with_healthcare_provider_54": "",
    "bmi_categories_55": "",
    "bmi_range_56": "",
    "category_57": "",
    "below_185_58": "",
    "underweight_59": "",
    "k_185_249_60": "",
    "normal_weight_61": "",
    "k_250_299_62": "",
    "overweight_63": "",
    "k_300_and_above_64": "",
    "obese_65": "",
    "factors_not_considered_66": "",
    "body_composition_67": "",
    "muscle_vs_fat_ratio_68": "",
    "bone_density_69": "",
    "individual_skeletal_differences_70": "",
    "age_71": "",
    "metabolism_and_body_changes_72": "",
    "ethnicity_73": "",
    "different_body_type_variations_74": "",
    "health_conditions_75": "",
    "medical_considerations_76": ""
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
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [unitSystem, setUnitSystem] = useState("us"); // us or metric

  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (unitSystem === "us") {
      const ftNum = Number.parseInt(heightFt);
      const inNum = Number.parseInt(heightIn);
      if (!heightFt || ftNum < 1 || ftNum > 8) {
        newErrors.heightFt = "Height must be between 1-8 feet";
      }
      if (!heightIn || inNum < 0 || inNum > 11) {
        newErrors.heightIn = "Inches must be between 0-11";
      }
    } else {
      const heightNum = Number.parseFloat(heightCm);
      if (!heightCm || heightNum < 50 || heightNum > 250) {
        newErrors.heightCm = "Height must be between 50-250 cm";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateHealthyWeight = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) return;
    try {
      let heightCmNum = 0;

      // Convert to metric for calculations
      if (unitSystem === "us") {
        const ftNum = Number.parseInt(heightFt);
        const inNum = Number.parseInt(heightIn);
        heightCmNum = (ftNum * 12 + inNum) * 2.54;
      } else {
        heightCmNum = Number.parseFloat(heightCm);
      }
      const heightMeters = heightCmNum / 100;

      // Calculate weight range using BMI 18.5-25
      const minWeightKg = 18.5 * (heightMeters * heightMeters);
      const maxWeightKg = 25 * (heightMeters * heightMeters);

      // Convert to pounds
      const minWeightLbs = minWeightKg * 2.20462;
      const maxWeightLbs = maxWeightKg * 2.20462;
      const results = {
        heightCm: heightCmNum,
        heightDisplay: unitSystem === "us" ? `${heightFt}'${heightIn}"` : `${heightCm} cm`,
        minWeightKg: Math.round(minWeightKg * 10) / 10,
        maxWeightKg: Math.round(maxWeightKg * 10) / 10,
        minWeightLbs: Math.round(minWeightLbs * 10) / 10,
        maxWeightLbs: Math.round(maxWeightLbs * 10) / 10,
        bmiRange: "18.5 - 25.0"
      };
      setResult(results);
      setShowResult(true);
    } catch (error) {
      setErrors({
        general: "Error calculating healthy weight. Please check your inputs and try again."
      });
    }
  };
  const resetCalculator = () => {
    setHeightFt("");
    setHeightIn("");
    setHeightCm("");
    setUnitSystem("us");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
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
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-green-600" />
                      <span>{contentData.weight_range_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_height_to_calculate_your_healthy_weight_1}</CardDescription>
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
                            <Label htmlFor="us" className="cursor-pointer">{contentData.us_ftin_3}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="metric" id="metric" />
                            <Label htmlFor="metric" className="cursor-pointer">{contentData.metric_cm_4}</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Height */}
                      {unitSystem === "us" ? <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_5}</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                              <Input className={`h-12 ${errors.heightFt ? "border-red-300" : ""}`} type="number" placeholder="5" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.ft_6}</span>
                            </div>
                            <div className="relative">
                              <Input className={`h-12 ${errors.heightIn ? "border-red-300" : ""}`} type="number" placeholder="8" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">{contentData.in_7}</span>
                            </div>
                          </div>
                          {(errors.heightFt || errors.heightIn) && <p className="text-red-600 text-xs mt-1">{errors.heightFt || errors.heightIn}</p>}
                        </div> : <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.height_cm_8}</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Target className="h-5 w-5 text-green-500" />
                            </div>
                            <Input className={`h-12 pl-10 ${errors.heightCm ? "border-red-300" : ""}`} type="number" placeholder="175" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
                          </div>
                          {errors.heightCm && <p className="text-red-600 text-xs mt-1">{errors.heightCm}</p>}
                        </div>}

                      {/* Age Note */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Activity className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-800">{contentData.age_requirement_9}</p>
                            <p className="text-sm text-green-700">{contentData.this_calculator_is_intended_for_adults_18_years_an_10}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateHealthyWeight} className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">{contentData.calculate_11}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_12}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mb-3 shadow-lg">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.healthy_weight_13}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-lg font-bold text-green-900 mb-1">
                            {result.minWeightKg} - {result.maxWeightKg}{contentData.kg_14}</p>
                          <p className="text-lg font-bold text-emerald-900">
                            {result.minWeightLbs} - {result.maxWeightLbs}{contentData.lbs_15}</p>
                          <p className="text-sm font-medium text-gray-600 mt-2">{contentData.for_height_16}{result.heightDisplay}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Scale className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_your_height_to_see_your_healthy_weight_range_17}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Scale className="w-6 h-6 text-green-600" />
                      <span>{contentData.your_healthy_weight_range_18}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                        <h3 className="text-2xl font-bold text-green-700 mb-2">{contentData.for_height_19}{result.heightDisplay} ({Math.round(result.heightCm)}{contentData.cm_20}</h3>
                        <div className="text-3xl font-bold text-green-900 mb-2">
                          {result.minWeightLbs} – {result.maxWeightLbs}{contentData.lbs_21}</div>
                        <div className="text-xl font-semibold text-emerald-700">
                          ({result.minWeightKg} – {result.maxWeightKg}{contentData.kg_22}</div>
                        <p className="text-sm text-gray-600 mt-3">{contentData.this_calculator_uses_the_standard_bmi_range_23}{result.bmiRange}{contentData.for_adults_24}</p>
                      </div>
                    </div>

                    {/* Calculation Steps */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-xl font-semibold text-green-700 mb-6">{contentData.calculation_steps_25}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-700 mb-3">{contentData.step_1_height_conversion_26}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>{contentData.height_27}{result.heightDisplay}</p>
                            <p>{contentData.height_in_meters_28}{(result.heightCm / 100).toFixed(2)}{contentData.m_29}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <h4 className="font-semibold text-emerald-700 mb-3">{contentData.step_2_bmi_calculation_30}</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>{contentData.lower_limit_bmi_185_31}{result.minWeightKg}{contentData.kg_32}</p>
                            <p>{contentData.upper_limit_bmi_250_33}{result.maxWeightKg}{contentData.kg_34}</p>
                            <p className="text-xs text-gray-500 mt-2">{contentData.formula_bmi_height_35}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.about_healthy_weight_36}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.bmibased_calculation_37}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.based_on_bmi_range_38}</strong>{contentData.k_185_250_kgm_39}</li>
                          <li>
                            <strong>{contentData.formula_40}</strong>{contentData.weight_bmi_height_41}</li>
                          <li>
                            <strong>{contentData.standard_42}</strong>{contentData.world_health_organization_guidelines_43}</li>
                          <li>
                            <strong>{contentData.age_group_44}</strong>{contentData.adults_18_years_and_older_45}</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-green-700 mb-3">{contentData.important_notes_46}</h3>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.general_guideline_47}</strong>{contentData.not_personalized_medical_advice_48}</li>
                          <li>
                            <strong>{contentData.limitations_49}</strong>{contentData.doesnt_account_for_muscle_mass_50}</li>
                          <li>
                            <strong>{contentData.special_populations_51}</strong>{contentData.may_not_apply_to_athletes_52}</li>
                          <li>
                            <strong>{contentData.consultation_53}</strong>{contentData.speak_with_healthcare_provider_54}</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.bmi_categories_55}</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200 mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">{contentData.bmi_range_56}</th>
                              <th className="text-left py-2">{contentData.category_57}</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            <tr>
                              <td className="py-1">{contentData.below_185_58}</td>
                              <td className="text-blue-600">{contentData.underweight_59}</td>
                            </tr>
                            <tr className="bg-green-50">
                              <td className="py-1">{contentData.k_185_249_60}</td>
                              <td className="text-green-600 font-medium">{contentData.normal_weight_61}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.k_250_299_62}</td>
                              <td className="text-orange-600">{contentData.overweight_63}</td>
                            </tr>
                            <tr>
                              <td className="py-1">{contentData.k_300_and_above_64}</td>
                              <td className="text-red-600">{contentData.obese_65}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg font-semibold text-emerald-700 mb-3">{contentData.factors_not_considered_66}</h3>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                          <li>
                            <strong>{contentData.body_composition_67}</strong>{contentData.muscle_vs_fat_ratio_68}</li>
                          <li>
                            <strong>{contentData.bone_density_69}</strong>{contentData.individual_skeletal_differences_70}</li>
                          <li>
                            <strong>{contentData.age_71}</strong>{contentData.metabolism_and_body_changes_72}</li>
                          <li>
                            <strong>{contentData.ethnicity_73}</strong>{contentData.different_body_type_variations_74}</li>
                          <li>
                            <strong>{contentData.health_conditions_75}</strong>{contentData.medical_considerations_76}</li>
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