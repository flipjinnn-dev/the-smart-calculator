"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Target, Zap, Activity, AlertCircle, ToggleLeft } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
export default function ArrowSpeedCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('arrow-speed-calculator', language, "calculator-ui");

  const { content: guideContent } = useCalculatorContent('arrow-speed-calculator', language, "calculator-guide");
  const guideData = guideContent || { color: 'green', sections: [], faq: [] };

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
    "bow_arrow_specifications_0": "",
    "enter_your_bow_and_arrow_specifications_to_calcula_1": "",
    "bow_ibo_rating_2": "",
    "fps_3": "",
    "ms_4": "",
    "draw_length_5": "",
    "in_6": "",
    "cm_7": "",
    "peak_draw_weight_8": "",
    "lb_9": "",
    "kg_10": "",
    "arrow_weight_grains_11": "",
    "extra_string_weight_grains_optional_12": "",
    "ibo_standard_13": "",
    "based_on_30_draw_length_70_lb_draw_weight_and_350__14": "",
    "results_are_estimates_based_on_industrystandard_ib_15": "",
    "calculate_performance_16": "",
    "arrow_performance_17": "",
    "fps_18": "",
    "ms_19": "",
    "joules_20": "",
    "enter_your_bow_specs_and_click_21": "",
    "calculate_22": "",
    "to_see_arrow_performance_23": "",
    "detailed_performance_metrics_24": "",
    "arrow_speed_25": "",
    "fps_26": "",
    "ms_27": "",
    "momentum_28": "",
    "ns_29": "",
    "kinetic_energy_30": "",
    "joules_31": "",
    "understanding_arrow_speed_ibo_ratings_32": "",
    "ibo_rating_explained_33": "",
    "ibo_international_bowhunting_organization_rating_i_34": "",
    "performance_factors_35": "",
    "draw_length_10_fps_per_inch_change_36": "",
    "draw_weight_2_fps_per_pound_change_37": "",
    "arrow_weight_1_fps_per_3_grains_38": "",
    "string_accessories_1_fps_per_3_grains_39": "",
    "sample_calculation_40": "",
    "example_41": "",
    "ibo_rating_320_fps_42": "",
    "draw_length_29_1_from_baseline_43": "",
    "draw_weight_60_lb_10_lb_from_baseline_44": "",
    "arrow_weight_400_gr_50_gr_from_baseline_45": "",
    "result_320_10_20_167_273_fps_46": "",
    "momentum_and_kinetic_energy_are_calculated_using_p_47": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [iboRating, setIboRating] = useState("");
  const [drawLength, setDrawLength] = useState("");
  const [drawWeight, setDrawWeight] = useState("");
  const [arrowWeight, setArrowWeight] = useState("");
  const [stringWeight, setStringWeight] = useState("");

  // Unit toggle states
  const [iboUnit, setIboUnit] = useState<"fps" | "m/s">("fps"); // fps or m/s
  const [lengthUnit, setLengthUnit] = useState<"in" | "cm">("in"); // inches or cm
  const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb"); // pounds or kg

  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!iboRating || Number.parseFloat(iboRating) <= 0) {
      newErrors.iboRating = "Please enter a valid IBO rating";
    }
    if (!drawLength || Number.parseFloat(drawLength) <= 0) {
      newErrors.drawLength = "Please enter a valid draw length";
    }
    if (!drawWeight || Number.parseFloat(drawWeight) <= 0) {
      newErrors.drawWeight = "Please enter a valid draw weight";
    }
    if (!arrowWeight || Number.parseFloat(arrowWeight) <= 0) {
      newErrors.arrowWeight = "Please enter a valid arrow weight";
    }
    if (stringWeight && Number.parseFloat(stringWeight) < 0) {
      newErrors.stringWeight = "String weight cannot be negative";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateArrowSpeed = () => {
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    if (!validateInputs()) {
      return;
    }

    // Convert all inputs to standard units (fps, inches, pounds, grains)
    let iboFps = Number.parseFloat(iboRating);
    if (iboUnit === "m/s") {
      iboFps = iboFps / 0.3048; // Convert m/s to fps
    }
    let drawLengthIn = Number.parseFloat(drawLength);
    if (lengthUnit === "cm") {
      drawLengthIn = drawLengthIn / 2.54; // Convert cm to inches
    }
    let drawWeightLb = Number.parseFloat(drawWeight);
    if (weightUnit === "kg") {
      drawWeightLb = drawWeightLb * 2.2046; // Convert kg to pounds
    }
    const arrowWeightGr = Number.parseFloat(arrowWeight);
    const stringWeightGr = Number.parseFloat(stringWeight) || 0;

    // IBO-based speed calculation
    // Baseline: 30" draw length, 70 lb draw weight, 350 gr arrow
    // Adjustments: ±10 fps per 1" draw length, ±2 fps per lb draw weight,
    // ∓1 fps per 3 grains arrow weight, ∓1 fps per 3 grains string weight
    const speedFps = iboFps + 10 * (drawLengthIn - 30) + 2 * (drawWeightLb - 70) - (arrowWeightGr - 350) / 3 - stringWeightGr / 3;

    // Convert to m/s
    const speedMs = speedFps * 0.3048;

    // Calculate mass in kg
    const arrowMassKg = arrowWeightGr * 6.479891e-5;

    // Calculate (p = m * v)
    const momentumNs = arrowMassKg * speedMs;

    // Calculate energy (KE = 1/2 * m * v²)
    const kineticEnergyJ = 0.5 * arrowMassKg * speedMs * speedMs;
    setResult({
      speedFps: Math.max(0, speedFps),
      speedMs: Math.max(0, speedMs),
      momentumNs,
      kineticEnergyJ,
      arrowMassKg,
      // Input values for display
      iboRating: iboFps,
      drawLength: drawLengthIn,
      drawWeight: drawWeightLb,
      arrowWeight: arrowWeightGr,
      stringWeight: stringWeightGr
    });
    setShowResult(true);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form (left) */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Target className="w-6 h-6 text-slate-600" />
                    <span>{contentData.bow_arrow_specifications_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_your_bow_and_arrow_specifications_to_calcula_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* IBO Rating */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium text-gray-700">{contentData.bow_ibo_rating_2}</Label>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${iboUnit === "fps" ? "text-slate-600 font-medium" : "text-gray-400"}`}>{contentData.fps_3}</span>
                          <Switch checked={iboUnit === "m/s"} onCheckedChange={checked => setIboUnit(checked ? "m/s" : "fps")} className="data-[state=checked]:bg-slate-600" />
                          <span className={`text-xs ${iboUnit === "m/s" ? "text-slate-600 font-medium" : "text-gray-400"}`}>{contentData.ms_4}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Zap className="h-5 w-5 text-slate-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${errors.iboRating ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" placeholder={`Enter IBO rating in ${iboUnit}`} value={iboRating} onChange={e => {
                          setIboRating(e.target.value);
                          if (errors.iboRating) {
                            setErrors(prev => ({
                              ...prev,
                              iboRating: ""
                            }));
                          }
                        }} />
                      </div>
                      {errors.iboRating && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.iboRating}</span>
                      </div>}
                    </div>

                    {/* Draw Length */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium text-gray-700">{contentData.draw_length_5}</Label>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${lengthUnit === "in" ? "text-slate-600 font-medium" : "text-gray-400"}`}>{contentData.in_6}</span>
                          <Switch checked={lengthUnit === "cm"} onCheckedChange={checked => setLengthUnit(checked ? "cm" : "in")} className="data-[state=checked]:bg-slate-600" />
                          <span className={`text-xs ${lengthUnit === "cm" ? "text-slate-600 font-medium" : "text-gray-400"}`}>{contentData.cm_7}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <ToggleLeft className="h-5 w-5 text-slate-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${errors.drawLength ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" placeholder={`Enter draw length in ${lengthUnit}`} value={drawLength} onChange={e => {
                          setDrawLength(e.target.value);
                          if (errors.drawLength) {
                            setErrors(prev => ({
                              ...prev,
                              drawLength: ""
                            }));
                          }
                        }} />
                      </div>
                      {errors.drawLength && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.drawLength}</span>
                      </div>}
                    </div>

                    {/* Draw Weight */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium text-gray-700">{contentData.peak_draw_weight_8}</Label>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${weightUnit === "lb" ? "text-slate-600 font-medium" : "text-gray-400"}`}>{contentData.lb_9}</span>
                          <Switch checked={weightUnit === "kg"} onCheckedChange={checked => setWeightUnit(checked ? "kg" : "lb")} className="data-[state=checked]:bg-slate-600" />
                          <span className={`text-xs ${weightUnit === "kg" ? "text-slate-600 font-medium" : "text-gray-400"}`}>{contentData.kg_10}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Activity className="h-5 w-5 text-slate-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${errors.drawWeight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" placeholder={`Enter draw weight in ${weightUnit}`} value={drawWeight} onChange={e => {
                          setDrawWeight(e.target.value);
                          if (errors.drawWeight) {
                            setErrors(prev => ({
                              ...prev,
                              drawWeight: ""
                            }));
                          }
                        }} />
                      </div>
                      {errors.drawWeight && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.drawWeight}</span>
                      </div>}
                    </div>

                    {/* Arrow Weight */}
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.arrow_weight_grains_11}</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Target className="h-5 w-5 text-slate-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${errors.arrowWeight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" placeholder="Enter arrow weight in grains" value={arrowWeight} onChange={e => {
                          setArrowWeight(e.target.value);
                          if (errors.arrowWeight) {
                            setErrors(prev => ({
                              ...prev,
                              arrowWeight: ""
                            }));
                          }
                        }} />
                      </div>
                      {errors.arrowWeight && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.arrowWeight}</span>
                      </div>}
                    </div>

                    {/* String Weight (Optional) */}
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.extra_string_weight_grains_optional_12}</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Activity className="h-5 w-5 text-slate-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-slate-400 focus:ring-slate-200 shadow-sm ${errors.stringWeight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" placeholder="Enter extra string weight (optional)" value={stringWeight} onChange={e => {
                          setStringWeight(e.target.value);
                          if (errors.stringWeight) {
                            setErrors(prev => ({
                              ...prev,
                              stringWeight: ""
                            }));
                          }
                        }} />
                      </div>
                      {errors.stringWeight && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.stringWeight}</span>
                      </div>}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-sm text-gray-700">
                      <strong>{contentData.ibo_standard_13}</strong>{contentData.based_on_30_draw_length_70_lb_draw_weight_and_350__14}</p>
                    <p className="text-xs text-gray-600 mt-1">{contentData.results_are_estimates_based_on_industrystandard_ib_15}</p>
                  </div>

                  <Button onClick={calculateArrowSpeed} className="w-full h-12 text-lg bg-gradient-to-r from-slate-600 to-blue-700 hover:from-slate-700 hover:to-blue-800">{contentData.calculate_performance_16}</Button>
                </CardContent>
              </Card>
            </div>

            {/* Result Card (right side) */}
            <div className="">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-blue-100 h-full flex flex-col justify-center items-center p-8">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-600 to-blue-700 flex items-center justify-center mb-3 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-700 tracking-tight">{contentData.arrow_performance_17}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center space-y-4">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <p className="text-2xl font-bold text-slate-900">{result.speedFps?.toFixed(1)}</p>
                        <p className="text-gray-600">{contentData.fps_18}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <p className="text-2xl font-bold text-slate-900">{result.speedMs?.toFixed(1)}</p>
                        <p className="text-gray-600">{contentData.ms_19}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <p className="text-lg font-bold text-slate-900">{result.kineticEnergyJ?.toFixed(1)}</p>
                        <p className="text-gray-600">{contentData.joules_20}</p>
                      </div>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Target className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_your_bow_specs_and_click_21}<span className="font-semibold text-slate-600">{contentData.calculate_22}</span>{" "}{contentData.to_see_arrow_performance_23}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Results Section */}
          {showResult && result && <div className="mt-8">
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Zap className="w-6 h-6 text-slate-600" />
                  <span>{contentData.detailed_performance_metrics_24}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">{contentData.arrow_speed_25}</h3>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{result.speedFps?.toFixed(1)}{contentData.fps_26}</p>
                    <p className="text-xl text-slate-600">{result.speedMs?.toFixed(1)}{contentData.ms_27}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">{contentData.momentum_28}</h3>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{result.momentumNs?.toFixed(3)}</p>
                    <p className="text-xl text-slate-600">{contentData.ns_29}</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">{contentData.kinetic_energy_30}</h3>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{result.kineticEnergyJ?.toFixed(1)}</p>
                    <p className="text-xl text-slate-600">{contentData.joules_31}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}

          {/* Educational Content */}
          <div className="mt-12">
            <CalculatorGuide data={guideData} />
          </div>
        </div>
      </main>
    </div>
  </>
}