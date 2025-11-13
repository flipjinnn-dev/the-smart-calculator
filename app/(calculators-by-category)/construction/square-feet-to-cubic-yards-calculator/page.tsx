"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Calculator, RotateCcw, Square, Ruler } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SimilarCalculators from "@/components/similar-calculators";
export default function SquareFeetToCubicYardsCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('square-feet-to-cubic-yards-calculator', language, "calculator-ui");

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
    "area_depth_inputs_0": "",
    "enter_area_and_depth_measurements_to_calculate_vol_1": "",
    "area_2": "",
    "ft_3": "",
    "in_4": "",
    "yd_5": "",
    "m_6": "",
    "cm_7": "",
    "depth_8": "",
    "in_9": "",
    "ft_10": "",
    "yd_11": "",
    "cm_12": "",
    "m_13": "",
    "calculate_14": "",
    "reset_15": "",
    "results_16": "",
    "input_values_converted_17": "",
    "area_18": "",
    "ft_19": "",
    "depth_20": "",
    "inches_21": "",
    "volume_22": "",
    "cubic_yards_yd_23": "",
    "stepbystep_calculation_24": "",
    "step_1_25": "",
    "step_2_26": "",
    "step_3_27": "",
    "direct_formula_28": "",
    "enter_area_and_depth_to_see_29": "",
    "volume_calculation_30": "",
    "in_cubic_yards_31": "",
    "understanding_square_feet_to_cubic_yards_conversio_32": "",
    "formulas_used_33": "",
    "step_1_34": "",
    "convert_depth_to_feet_depthft_depthin_12_35": "",
    "step_2_36": "",
    "calculate_feet_cubicft_areaft_depthft_37": "",
    "step_3_38": "",
    "convert_to_cubic_yards_cubicyd_cubicft_27_39": "",
    "direct_formula_40": "",
    "cubicyd_areaft_depthin_324_41": "",
    "example_calculation_42": "",
    "given_43": "",
    "area_100_ft_depth_6_inches_44": "",
    "solution_45": "",
    "step_1_6_inches_12_05_feet_46": "",
    "step_2_100_ft_05_ft_50_ft_47": "",
    "step_3_50_ft_27_185_yd_48": "",
    "direct_100_6_324_185_yd_49": "",
    "common_applications_50": "",
    "concrete_51": "",
    "calculate_needed_for_slabs_driveways_and_foundatio_52": "",
    "landscaping_53": "",
    "estimate_mulch_soil_or_gravel_for_garden_beds_54": "",
    "construction_55": "",
    "determine_material_quantities_for_excavation_proje_56": "",
    "paving_57": "",
    "calculate_or_paving_material_requirements_58": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Input states
  const [area, setArea] = useState<string>("");
  const [depth, setDepth] = useState<string>("");

  // Unit selection states
  const [areaUnit, setAreaUnit] = useState<string>("sqft");
  const [depthUnit, setDepthUnit] = useState<string>("in");

  // Unit conversion functions
  const convertAreaToSqft = (value: number, unit: string): number => {
    switch (unit) {
      case "sqft":
        return value;
      case "sqin":
        return value / 144;
      case "sqyd":
        return value * 9;
      case "sqm":
        return value * 10.764;
      case "sqcm":
        return value / 929.03;
      default:
        return value;
    }
  };
  const convertDepthToInches = (value: number, unit: string): number => {
    switch (unit) {
      case "in":
        return value;
      case "ft":
        return value * 12;
      case "yd":
        return value * 36;
      case "cm":
        return value / 2.54;
      case "m":
        return value * 39.37;
      default:
        return value;
    }
  };

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0;
  };

  // Calculate
  const calculateResults = () => {
    const areaValue = getNumericValue(area);
    const depthValue = getNumericValue(depth);

    // Convert to standard units (square feet and inches)
    const areaInSqft = convertAreaToSqft(areaValue, areaUnit);
    const depthInInches = convertDepthToInches(depthValue, depthUnit);

    // Step 1: Convert depth from inches to feet
    const depthInFeet = depthInInches / 12;

    // Step 2: Calculate feet
    const cubicFeet = areaInSqft * depthInFeet;

    // Step 3: Convert cubic feet to cubic yards
    const cubicYards = cubicFeet / 27;

    // Direct formula: cubic_yd = (area * depth) / 324
    const directCubicYards = areaInSqft * depthInInches / 324;
    const newResult = {
      originalArea: areaValue,
      originalDepth: depthValue,
      areaUnit,
      depthUnit,
      areaInSqft,
      depthInInches,
      depthInFeet,
      cubicFeet,
      cubicYards,
      directCubicYards,
      steps: {
        step1: `Convert depth: ${depthInInches.toFixed(2)} inches ÷ 12 = ${depthInFeet.toFixed(4)} feet`,
        step2: `Calculate feet: ${areaInSqft.toFixed(2)} ft² × ${depthInFeet.toFixed(4)} ft = ${cubicFeet.toFixed(4)} ft³`,
        step3: `Convert to cubic yards: ${cubicFeet.toFixed(4)} ft³ ÷ 27 = ${cubicYards.toFixed(2)} yd³`,
        direct: `Direct formula: (${areaInSqft.toFixed(2)} × ${depthInInches.toFixed(2)}) ÷ 324 = ${directCubicYards.toFixed(2)} yd³`
      }
    };
    setResult(newResult);
    setShowResult(true);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };

  // Reset function
  const resetCalculator = () => {
    setArea("");
    setDepth("");
    setAreaUnit("sqft");
    setDepthUnit("in");
    setResult(null);
    setShowResult(false);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-orange-600" />
                      <span>{contentData.area_depth_inputs_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_area_and_depth_measurements_to_calculate_vol_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.area_2}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Square className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" type="number" step="0.1" min="0" value={area} onChange={e => setArea(e.target.value)} placeholder="0" />
                            </div>
                            <Select value={areaUnit} onValueChange={setAreaUnit}>
                              <SelectTrigger className="w-20 h-12 border-2 focus:border-orange-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sqft">{contentData.ft_3}</SelectItem>
                                <SelectItem value="sqin">{contentData.in_4}</SelectItem>
                                <SelectItem value="sqyd">{contentData.yd_5}</SelectItem>
                                <SelectItem value="sqm">{contentData.m_6}</SelectItem>
                                <SelectItem value="sqcm">{contentData.cm_7}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.depth_8}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-orange-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" type="number" step="0.1" min="0" value={depth} onChange={e => setDepth(e.target.value)} placeholder="0" />
                            </div>
                            <Select value={depthUnit} onValueChange={setDepthUnit}>
                              <SelectTrigger className="w-16 h-12 border-2 focus:border-orange-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="in">{contentData.in_9}</SelectItem>
                                <SelectItem value="ft">{contentData.ft_10}</SelectItem>
                                <SelectItem value="yd">{contentData.yd_11}</SelectItem>
                                <SelectItem value="cm">{contentData.cm_12}</SelectItem>
                                <SelectItem value="m">{contentData.m_13}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button onClick={calculateResults} className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                          <Calculator className="w-5 h-5 mr-2" />{contentData.calculate_14}</Button>
                        <Button onClick={resetCalculator} variant="outline" className="h-14 px-6 text-lg font-semibold border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent">
                          <RotateCcw className="w-5 h-5 mr-2" />{contentData.reset_15}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-50 sticky top-24 h-fit">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center mb-3 shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.results_16}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="w-full space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <p className="text-sm text-orange-700 font-medium">{contentData.input_values_converted_17}</p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>{contentData.area_18}{result.originalArea} {result.areaUnit} = {result.areaInSqft.toFixed(2)}{contentData.ft_19}</p>
                              <p>{contentData.depth_20}{result.originalDepth} {result.depthUnit} = {result.depthInInches.toFixed(2)}{" "}{contentData.inches_21}</p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border border-orange-300">
                            <p className="text-sm text-orange-700 font-medium">{contentData.volume_22}</p>
                            <p className="text-3xl font-bold text-orange-900">{result.cubicYards.toFixed(2)}</p>
                            <p className="text-sm text-orange-600">{contentData.cubic_yards_yd_23}</p>
                          </div>
                        </div>

                        {/* Step-by-step Calculation */}
                        <div className="bg-white p-4 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-gray-800 mb-3">{contentData.stepbystep_calculation_24}</h4>
                          <div className="text-sm space-y-2 text-gray-700">
                            <div className="p-2 bg-gray-50 rounded">
                              <strong>{contentData.step_1_25}</strong> {result.steps.step1}
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <strong>{contentData.step_2_26}</strong> {result.steps.step2}
                            </div>
                            <div className="p-2 bg-orange-50 rounded border border-orange-200">
                              <strong>{contentData.step_3_27}</strong> {result.steps.step3}
                            </div>
                            <div className="p-2 bg-amber-50 rounded border border-amber-200">
                              <strong>{contentData.direct_formula_28}</strong> {result.steps.direct}
                            </div>
                          </div>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Calculator className="w-8 h-8 text-orange-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_area_and_depth_to_see_29}{" "}
                          <span className="font-semibold text-orange-600">{contentData.volume_calculation_30}</span>{contentData.in_cubic_yards_31}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>
<SimilarCalculators calculators={[{
          calculatorName: "Gallons per Square Foot Calculator",
          calculatorHref: "/construction/gallons-per-square-foot-calculator",
          calculatorDescription: "CCalculate the number of gallons needed per square foot for painting or flooring"
        }, {
          calculatorName: "Board Foot Calculator",
          calculatorHref: "/construction/board-foot-calculator",
          calculatorDescription: "Calculate board feet for lumber and building materials with precise measurements for woodworking and construction projects"
        }, {
          calculatorName: "Cubic Yard Calculator",
          calculatorHref: "/construction/cubic-yard-calculator",
          calculatorDescription: "Calculate cubic yards for concrete, soil, and other materials with precise measurements for construction and landscaping projects"
        }
        ]} 
        color="orange" 
        title="Related C onstruction Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-50 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center mr-3 shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.understanding_square_feet_to_cubic_yards_conversio_32}</CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.formulas_used_33}</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200 space-y-2">
                      <p className="text-gray-700">
                        <strong>{contentData.step_1_34}</strong>{contentData.convert_depth_to_feet_depthft_depthin_12_35}</p>
                      <p className="text-gray-700">
                        <strong>{contentData.step_2_36}</strong>{contentData.calculate_feet_cubicft_areaft_depthft_37}</p>
                      <p className="text-gray-700">
                        <strong>{contentData.step_3_38}</strong>{contentData.convert_to_cubic_yards_cubicyd_cubicft_27_39}</p>
                      <p className="text-gray-700">
                        <strong>{contentData.direct_formula_40}</strong>{contentData.cubicyd_areaft_depthin_324_41}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.example_calculation_42}</h3>
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{contentData.given_43}</strong>{contentData.area_100_ft_depth_6_inches_44}</p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{contentData.solution_45}</strong>
                      </p>
                      <div className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded space-y-1">
                        <p>{contentData.step_1_6_inches_12_05_feet_46}</p>
                        <p>{contentData.step_2_100_ft_05_ft_50_ft_47}</p>
                        <p>{contentData.step_3_50_ft_27_185_yd_48}</p>
                        <p>{contentData.direct_100_6_324_185_yd_49}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.common_applications_50}</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>{contentData.concrete_51}</strong>{contentData.calculate_needed_for_slabs_driveways_and_foundatio_52}</li>
                      <li>
                        <strong>{contentData.landscaping_53}</strong>{contentData.estimate_mulch_soil_or_gravel_for_garden_beds_54}</li>
                      <li>
                        <strong>{contentData.construction_55}</strong>{contentData.determine_material_quantities_for_excavation_proje_56}</li>
                      <li>
                        <strong>{contentData.paving_57}</strong>{contentData.calculate_or_paving_material_requirements_58}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>;
}