"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Calculator, RotateCcw, Heart, AlertTriangle, User } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
export default function BodyTypeCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('body-type-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('body-type-calculator', language, "calculator-guide");

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
    "body_measurements_0": "",
    "enter_your_measurements_to_determine_body_shape_an_1": "",
    "unit_system_2": "",
    "inches_3": "",
    "centimeters_4": "",
    "bust_size_5": "",
    "waist_size_6": "",
    "high_hip_size_7": "",
    "measured_about_7_inches_18_cm_below_waist_8": "",
    "hip_size_9": "",
    "measured_at_the_widest_part_of_hips_10": "",
    "calculate_type_11": "",
    "reset_12": "",
    "body_analysis_13": "",
    "whr_14": "",
    "enter_all_measurements_and_click_calculate_type_to_15": "",
    "body_type_analysis_results_16": "",
    "body_shape_classification_17": "",
    "classification_logic_18": "",
    "waisthip_ratio_whr_19": "",
    "waist_hip_ratio_20": "",
    "women_21": "",
    "k_085_low_risk_085_higher_risk_22": "",
    "men_23": "",
    "k_090_low_risk_090_higher_risk_24": "",
    "your_measurements_25": "",
    "bust_26": "",
    "waist_27": "",
    "high_hip_28": "",
    "hip_29": "",
    "important_notice_30": "",
    "this_tool_is_for_informational_purposes_only_and_n_31": "",
    "understanding_body_types_whr_32": "",
    "body_shape_types_33": "",
    "hourglass_34": "",
    "balanced_bust_and_hips_with_defined_waist_35": "",
    "bottom_hourglass_36": "",
    "slightly_larger_hips_with_defined_waist_37": "",
    "top_hourglass_38": "",
    "slightly_larger_bust_with_defined_waist_39": "",
    "spoon_40": "",
    "fuller_hips_and_thighs_smaller_bust_41": "",
    "triangle_pear_42": "",
    "larger_hips_than_bust_43": "",
    "inverted_triangle_44": "",
    "larger_bust_than_hips_45": "",
    "rectangle_46": "",
    "similar_bust_waist_and_hip_measurements_47": "",
    "health_significance_48": "",
    "whr_health_risks_49": "",
    "higher_whr_indicates_more_abdominal_fat_associated_50": "",
    "body_shape_health_51": "",
    "apple_shapes_higher_whr_may_have_higher_health_ris_52": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Input states
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [highHip, setHighHip] = useState("");
  const [hip, setHip] = useState("");
  const [unit, setUnit] = useState("inches");

  // Convert measurements to inches for calculation
  const convertToInches = (value: string) => {
    const num = Number.parseFloat(value);
    if (isNaN(num)) return 0;
    return unit === "cm" ? num / 2.54 : num;
  };
  const classifyBodyShape = (bustIn: number, waistIn: number, highHipIn: number, hipIn: number) => {
    const bustHipDiff = Math.abs(bustIn - hipIn);
    const hipsBustDiff = hipIn - bustIn;
    const bustWaistDiff = bustIn - waistIn;
    const hipsWaistDiff = hipIn - waistIn;
    const highHipWaistRatio = highHipIn / waistIn;

    // Hourglass
    if (bustHipDiff <= 1 && (bustWaistDiff >= 9 || hipsWaistDiff >= 10) && hipsBustDiff < 3.6) {
      return {
        shape: "Hourglass",
        explanation: `Bust–Hip difference ≤ 1″ (${bustHipDiff.toFixed(1)}″) and significant waist definition`,
        description: "Balanced bust and hips with a defined waist"
      };
    }

    // Bottom Hourglass
    if (hipsBustDiff >= 3.6 && hipsBustDiff < 10 && hipsWaistDiff >= 9 && highHipWaistRatio < 1.193) {
      return {
        shape: "Bottom Hourglass",
        explanation: `Hips–Bust difference ${hipsBustDiff.toFixed(1)}″ and Hips–Waist ≥ 9″`,
        description: "Slightly larger hips than bust with defined waist"
      };
    }

    // Top Hourglass
    if (bustIn - hipIn > 1 && bustIn - hipIn < 10 && bustWaistDiff >= 9) {
      return {
        shape: "Top Hourglass",
        explanation: `Bust–Hips difference ${(bustIn - hipIn).toFixed(1)}″ and Bust–Waist ≥ 9″`,
        description: "Slightly larger bust than hips with defined waist"
      };
    }

    // Spoon
    if (hipsBustDiff > 2 && hipsWaistDiff >= 7 && highHipWaistRatio >= 1.193) {
      return {
        shape: "Spoon",
        explanation: `Hips–Bust difference ${hipsBustDiff.toFixed(1)}″ and High Hip ratio ${highHipWaistRatio.toFixed(3)}`,
        description: "Fuller hips and thighs with smaller bust"
      };
    }

    // Triangle (Pear)
    if (hipsBustDiff >= 3.6 && hipsWaistDiff < 9) {
      return {
        shape: "Triangle",
        explanation: `Hips–Bust difference ${hipsBustDiff.toFixed(1)}″ and Hips–Waist < 9″`,
        description: "Larger hips than bust with less waist definition"
      };
    }

    // Inverted Triangle (Apple)
    if (bustIn - hipIn >= 3.6 && bustWaistDiff < 9) {
      return {
        shape: "Inverted Triangle (Apple)",
        explanation: `Bust–Hips difference ${(bustIn - hipIn).toFixed(1)}″ and Bust–Waist < 9″`,
        description: "Larger bust than hips with less waist definition"
      };
    }

    // Rectangle (Banana)
    return {
      shape: "Rectangle (Banana)",
      explanation: `Balanced measurements with minimal waist definition`,
      description: "Similar bust, waist, and hip measurements"
    };
  };
  const calculateWHR = (waistIn: number, hipIn: number) => {
    if (hipIn === 0) return 0;
    return waistIn / hipIn;
  };
  const getWHRInterpretation = (whr: number, assumedSex = "female") => {
    if (assumedSex === "female") {
      if (whr <= 0.85) {
        return {
          risk: "Low risk",
          color: "text-green-700 bg-green-50 border-green-200"
        };
      } else {
        return {
          risk: "Higher risk",
          color: "text-red-700 bg-red-50 border-red-200"
        };
      }
    } else {
      if (whr <= 0.9) {
        return {
          risk: "Low risk",
          color: "text-green-700 bg-green-50 border-green-200"
        };
      } else {
        return {
          risk: "Higher risk",
          color: "text-red-700 bg-red-50 border-red-200"
        };
      }
    }
  };
  const calculateBodyType = () => {
    if (!bust || !waist || !highHip || !hip) {
      alert("Please fill in all measurement fields");
      return;
    }
    const bustIn = convertToInches(bust);
    const waistIn = convertToInches(waist);
    const highHipIn = convertToInches(highHip);
    const hipIn = convertToInches(hip);
    if (bustIn <= 0 || waistIn <= 0 || highHipIn <= 0 || hipIn <= 0) {
      alert("Please enter valid positive measurements");
      return;
    }
    const bodyShape = classifyBodyShape(bustIn, waistIn, highHipIn, hipIn);
    const whr = calculateWHR(waistIn, hipIn);
    const whrInterpretation = getWHRInterpretation(whr);
    const results = {
      bodyShape,
      whr: whr.toFixed(3),
      whrInterpretation,
      measurements: {
        bust: unit === "cm" ? `${bust} cm` : `${bust}"`,
        waist: unit === "cm" ? `${waist} cm` : `${waist}"`,
        highHip: unit === "cm" ? `${highHip} cm` : `${highHip}"`,
        hip: unit === "cm" ? `${hip} cm` : `${hip}"`
      }
    };
    setResult(results);
    setShowResult(true);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  const resetCalculator = () => {
    setBust("");
    setWaist("");
    setHighHip("");
    setHip("");
    setUnit("inches");
    setResult(null);
    setShowResult(false);
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-pink-600" />
                      <span>{contentData.body_measurements_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_measurements_to_determine_body_shape_an_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6 mb-8">
                      {/* Unit Selector */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.unit_system_2}</Label>
                        <RadioGroup value={unit} onValueChange={setUnit} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inches" id="inches" />
                            <Label htmlFor="inches" className="text-sm cursor-pointer">{contentData.inches_3}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cm" id="cm" />
                            <Label htmlFor="cm" className="text-sm cursor-pointer">{contentData.centimeters_4}</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Bust Size */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.bust_size_5}{unit})</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input className="h-12 pl-10" type="number" placeholder={`Enter bust measurement in ${unit}`} value={bust} onChange={e => setBust(e.target.value)} min="1" step="0.1" />
                        </div>
                      </div>

                      {/* Waist Size */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.waist_size_6}{unit})</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input className="h-12 pl-10" type="number" placeholder={`Enter waist measurement in ${unit}`} value={waist} onChange={e => setWaist(e.target.value)} min="1" step="0.1" />
                        </div>
                      </div>

                      {/* High Hip Size */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.high_hip_size_7}{unit})</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-pink-500" />
                          </div>
                          <Input className="h-12 pl-10" type="number" placeholder={`Enter high hip measurement in ${unit}`} value={highHip} onChange={e => setHighHip(e.target.value)} min="1" step="0.1" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{contentData.measured_about_7_inches_18_cm_below_waist_8}</p>
                      </div>

                      {/* Hip Size */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.hip_size_9}{unit})</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-purple-500" />
                          </div>
                          <Input className="h-12 pl-10" type="number" placeholder={`Enter hip measurement in ${unit}`} value={hip} onChange={e => setHip(e.target.value)} min="1" step="0.1" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{contentData.measured_at_the_widest_part_of_hips_10}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={calculateBodyType} className="flex-1 h-12 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-md font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                        <Calculator className="w-4 h-4 mr-2" />{contentData.calculate_type_11}</button>
                      <button onClick={resetCalculator} className="h-12 px-6 border border-pink-300 text-pink-700 hover:bg-pink-50 bg-transparent rounded-md font-semibold flex items-center">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_12}</button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-purple-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-3 shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">{contentData.body_analysis_13}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3 w-full">
                        <div className="bg-white p-6 rounded-lg border border-pink-200">
                          <p className="text-lg font-bold text-pink-900 mb-2">{result.bodyShape.shape}</p>
                          <p className="text-sm text-gray-600 mb-3">{result.bodyShape.description}</p>
                          <div className="border-t pt-3">
                            <p className="text-sm font-medium text-gray-600 mb-1">{contentData.whr_14}{result.whr}</p>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${result.whrInterpretation.color}`}>
                              {result.whrInterpretation.risk}
                            </div>
                          </div>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <User className="w-8 h-8 text-pink-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_all_measurements_and_click_calculate_type_to_15}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Heart className="w-6 h-6 text-pink-600" />
                      <span>{contentData.body_type_analysis_results_16}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-700 mb-4 text-lg">{contentData.body_shape_classification_17}</h4>
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-pink-900">{result.bodyShape.shape}</p>
                            <p className="text-sm text-gray-600 mt-2">{result.bodyShape.description}</p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <p className="text-xs text-gray-600 mb-1">{contentData.classification_logic_18}</p>
                            <p className="text-sm text-pink-700">{result.bodyShape.explanation}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-700 mb-4 text-lg">{contentData.waisthip_ratio_whr_19}</h4>
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-900">{result.whr}</p>
                            <p className="text-sm text-gray-600">{contentData.waist_hip_ratio_20}</p>
                          </div>
                          <div className="text-center">
                            <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium border ${result.whrInterpretation.color}`}>
                              {result.whrInterpretation.risk}
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded border text-xs text-gray-600">
                            <p>
                              <strong>{contentData.women_21}</strong>{contentData.k_085_low_risk_085_higher_risk_22}</p>
                            <p>
                              <strong>{contentData.men_23}</strong>{contentData.k_090_low_risk_090_higher_risk_24}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border">
                      <h4 className="font-semibold text-gray-700 mb-3">{contentData.your_measurements_25}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">{contentData.bust_26}</span>
                          <p className="font-semibold text-gray-900">{result.measurements.bust}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">{contentData.waist_27}</span>
                          <p className="font-semibold text-gray-900">{result.measurements.waist}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">{contentData.high_hip_28}</span>
                          <p className="font-semibold text-gray-900">{result.measurements.highHip}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">{contentData.hip_29}</span>
                          <p className="font-semibold text-gray-900">{result.measurements.hip}</p>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">{contentData.important_notice_30}</h4>
                          <p className="text-sm text-yellow-700">{contentData.this_tool_is_for_informational_purposes_only_and_n_31}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "Body Surface Area Calculator",
          calculatorHref: "/health/body-surface-area-calculator",
        }, {
          calculatorName: "Body Fat Calculator",
          calculatorHref: "/health/body-fat-calculator",
        }, {
          calculatorName: "U.S. Army Body Fat Calculator",
          calculatorHref: "/health/army-body-fat-calculator",
        }
        ]} 
        color="pink" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-purple-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700 tracking-tight">{contentData.understanding_body_types_whr_32}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 mb-3">{contentData.body_shape_types_33}</h3>
                      <div className="bg-white p-4 rounded-lg border border-pink-200 mb-4">
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>{contentData.hourglass_34}</strong>{contentData.balanced_bust_and_hips_with_defined_waist_35}</div>
                          <div>
                            <strong>{contentData.bottom_hourglass_36}</strong>{contentData.slightly_larger_hips_with_defined_waist_37}</div>
                          <div>
                            <strong>{contentData.top_hourglass_38}</strong>{contentData.slightly_larger_bust_with_defined_waist_39}</div>
                          <div>
                            <strong>{contentData.spoon_40}</strong>{contentData.fuller_hips_and_thighs_smaller_bust_41}</div>
                          <div>
                            <strong>{contentData.triangle_pear_42}</strong>{contentData.larger_hips_than_bust_43}</div>
                          <div>
                            <strong>{contentData.inverted_triangle_44}</strong>{contentData.larger_bust_than_hips_45}</div>
                          <div>
                            <strong>{contentData.rectangle_46}</strong>{contentData.similar_bust_waist_and_hip_measurements_47}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.health_significance_48}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong className="text-purple-700">{contentData.whr_health_risks_49}</strong>
                            <p className="text-gray-700">{contentData.higher_whr_indicates_more_abdominal_fat_associated_50}</p>
                          </div>
                          <div>
                            <strong className="text-purple-700">{contentData.body_shape_health_51}</strong>
                            <p className="text-gray-700">{contentData.apple_shapes_higher_whr_may_have_higher_health_ris_52}</p>
                          </div>
                        </div>
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