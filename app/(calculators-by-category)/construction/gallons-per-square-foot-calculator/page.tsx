"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Droplets, Calculator, RotateCcw, Ruler, Square, Cable as Cube } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
export default function GallonsPerSquareFootCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('gallons-per-square-foot-calculator', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'gallons-per-square-foot-calculator',  // Calculator name
    language,                            // Current language (en/ur etc)
    "calculator-guide"                   // Content type
  );
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
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
    "dimensions_0": "",
    "enter_length_width_and_height_in_feet_to_calculate_1": "",
    "length_l_2": "",
    "feet_ft_3": "",
    "inches_in_4": "",
    "meters_m_5": "",
    "centimeters_cm_6": "",
    "yards_yd_7": "",
    "width_w_8": "",
    "feet_ft_9": "",
    "inches_in_10": "",
    "meters_m_11": "",
    "centimeters_cm_12": "",
    "yards_yd_13": "",
    "height_h_14": "",
    "feet_ft_15": "",
    "inches_in_16": "",
    "meters_m_17": "",
    "centimeters_cm_18": "",
    "yards_yd_19": "",
    "calculate_20": "",
    "reset_21": "",
    "results_22": "",
    "input_values_converted_to_feet_23": "",
    "length_24": "",
    "ft_25": "",
    "width_26": "",
    "ft_27": "",
    "height_28": "",
    "ft_29": "",
    "area_30": "",
    "ft_31": "",
    "volume_32": "",
    "ft_33": "",
    "gallons_34": "",
    "gallons_per_square_foot_35": "",
    "galft_36": "",
    "stepbystep_calculation_37": "",
    "step_1_38": "",
    "step_2_39": "",
    "step_3_40": "",
    "step_4_41": "",
    "enter_dimensions_to_see_42": "",
    "live_results_43": "",
    "and_stepbystep_calculations_44": "",
    "understanding_gallons_per_square_foot_45": "",
    "formulas_used_46": "",
    "a_l_w_area_in_square_feet_47": "",
    "v_48": "",
    "ft_49": "",
    "a_h_l_w_h_volume_in_cubic_feet_50": "",
    "v_51": "",
    "gal_52": "",
    "v_53": "",
    "ft_54": "",
    "k_748052_volume_in_us_gallons_55": "",
    "g_v_56": "",
    "gal_57": "",
    "a_gallons_per_square_foot_58": "",
    "common_applications_59": "",
    "pool_spa_60": "",
    "calculate_volume_and_chemical_dosing_rates_61": "",
    "tank_design_62": "",
    "determine_liquid_storage_capacity_per_floor_area_63": "",
    "irrigation_64": "",
    "calculate_application_rates_for_landscaping_65": "",
    "construction_66": "",
    "estimate_concrete_paint_or_coating_coverage_67": "",
    "aquaculture_68": "",
    "design_fish_tanks_and_water_systems_69": "",
    "conversion_factor_70": "",
    "k_1_cubic_foot_748052_us_gallons_71": "",
    "this_conversion_factor_is_exact_and_widely_used_in_72": "",
    "example_calculation_73": "",
    "given_74": "",
    "length_10_ft_width_8_ft_height_3_ft_75": "",
    "solution_76": "",
    "area_10_8_80_ft_77": "",
    "volume_80_3_240_ft_78": "",
    "volume_in_gallons_240_748052_179532_gallons_79": "",
    "gallons_per_sq_ft_179532_80_2244_galft_80": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Input states
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  // Unit selection states for each input
  const [lengthUnit, setLengthUnit] = useState<string>("ft");
  const [widthUnit, setWidthUnit] = useState<string>("ft");
  const [heightUnit, setHeightUnit] = useState<string>("ft");

  // Unit conversion functions
  const convertToFeet = (value: number, unit: string): number => {
    switch (unit) {
      case "ft":
        return value;
      case "in":
        return value / 12;
      case "m":
        return value * 3.28084;
      case "cm":
        return value * 0.0328084;
      case "yd":
        return value * 3;
      default:
        return value;
    }
  };
  const getUnitLabel = (unit: string): string => {
    switch (unit) {
      case "ft":
        return "feet";
      case "in":
        return "inches";
      case "m":
        return "meters";
      case "cm":
        return "centimeters";
      case "yd":
        return "yards";
      default:
        return unit;
    }
  };

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0;
  };

  // Calculate
  const calculateResults = () => {
    const lengthValue = getNumericValue(length);
    const widthValue = getNumericValue(width);
    const heightValue = getNumericValue(height);
    const L = convertToFeet(lengthValue, lengthUnit);
    const W = convertToFeet(widthValue, widthUnit);
    const H = convertToFeet(heightValue, heightUnit);

    // Step 1: Calculate in square feet
    const area = L * W;

    // Step 2: Calculate in cubic feet
    const volumeFt3 = area * H;

    // Step 3: Convert cubic feet to US gallons
    const volumeGal = volumeFt3 * 7.48052;

    // Step 4: Calculate per square foot
    const gallonsPerSqft = area > 0 ? volumeGal / area : 0;
    const newResult = {
      originalLength: lengthValue,
      originalWidth: widthValue,
      originalHeight: heightValue,
      lengthUnit,
      widthUnit,
      heightUnit,
      length: L,
      width: W,
      height: H,
      area,
      volumeFt3,
      volumeGal,
      gallonsPerSqft,
      steps: {
        step1: `Area = ${L.toFixed(2)} ft × ${W.toFixed(2)} ft = ${area.toFixed(2)} ft²`,
        step2: `Volume = ${area.toFixed(2)} ft² × ${H.toFixed(2)} ft = ${volumeFt3.toFixed(2)} ft³`,
        step3: `Volume in gallons = ${volumeFt3.toFixed(2)} ft³ × 7.48052 = ${volumeGal.toFixed(2)} gallons`,
        step4: area > 0 ? `Gallons per sq ft = ${volumeGal.toFixed(2)} gallons ÷ ${area.toFixed(2)} ft² = ${gallonsPerSqft.toFixed(2)} gal/ft²` : "Gallons per sq ft = 0 (no area)"
      }
    };
    setResult(newResult);
    setShowResult(true);
  };

  // Reset function
  const resetCalculator = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setLengthUnit("ft");
    setWidthUnit("ft");
    setHeightUnit("ft");
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
                <Droplets className="w-8 h-8 text-white" />
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
                    <Droplets className="w-6 h-6 text-orange-600" />
                    <span>{contentData.dimensions_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_length_width_and_height_in_feet_to_calculate_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.length_l_2}</Label>
                        <div className="space-y-2">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Ruler className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" type="number" step="0.1" min="0" value={length} onChange={e => setLength(e.target.value)} placeholder="0" />
                          </div>
                          <select value={lengthUnit} onChange={e => setLengthUnit(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-orange-200 bg-white text-sm">
                            <option value="ft">{contentData.feet_ft_3}</option>
                            <option value="in">{contentData.inches_in_4}</option>
                            <option value="m">{contentData.meters_m_5}</option>
                            <option value="cm">{contentData.centimeters_cm_6}</option>
                            <option value="yd">{contentData.yards_yd_7}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.width_w_8}</Label>
                        <div className="space-y-2">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Square className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" type="number" step="0.1" min="0" value={width} onChange={e => setWidth(e.target.value)} placeholder="0" />
                          </div>
                          <select value={widthUnit} onChange={e => setWidthUnit(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-orange-200 bg-white text-sm">
                            <option value="ft">{contentData.feet_ft_9}</option>
                            <option value="in">{contentData.inches_in_10}</option>
                            <option value="m">{contentData.meters_m_11}</option>
                            <option value="cm">{contentData.centimeters_cm_12}</option>
                            <option value="yd">{contentData.yards_yd_13}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.height_h_14}</Label>
                        <div className="space-y-2">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Cube className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" type="number" step="0.1" min="0" value={height} onChange={e => setHeight(e.target.value)} placeholder="0" />
                          </div>
                          <select value={heightUnit} onChange={e => setHeightUnit(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-orange-200 bg-white text-sm">
                            <option value="ft">{contentData.feet_ft_15}</option>
                            <option value="in">{contentData.inches_in_16}</option>
                            <option value="m">{contentData.meters_m_17}</option>
                            <option value="cm">{contentData.centimeters_cm_18}</option>
                            <option value="yd">{contentData.yards_yd_19}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Button onClick={calculateResults} className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Calculator className="w-5 h-5 mr-2" />{contentData.calculate_20}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-14 px-6 text-lg font-semibold border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent">
                        <RotateCcw className="w-5 h-5 mr-2" />{contentData.reset_21}</Button>
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
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.results_22}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="w-full space-y-4">
                    {/* Main Results */}
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-700 font-medium">{contentData.input_values_converted_to_feet_23}</p>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{contentData.length_24}{result.originalLength} {result.lengthUnit} = {result.length.toFixed(2)}{contentData.ft_25}</p>
                          <p>{contentData.width_26}{result.originalWidth} {result.widthUnit} = {result.width.toFixed(2)}{contentData.ft_27}</p>
                          <p>{contentData.height_28}{result.originalHeight} {result.heightUnit} = {result.height.toFixed(2)}{contentData.ft_29}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-700 font-medium">{contentData.area_30}</p>
                        <p className="text-2xl font-bold text-orange-900">{result.area.toFixed(2)}{contentData.ft_31}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-700 font-medium">{contentData.volume_32}</p>
                        <p className="text-xl font-bold text-orange-900">{result.volumeFt3.toFixed(2)}{contentData.ft_33}</p>
                        <p className="text-lg font-bold text-orange-900">{result.volumeGal.toFixed(2)}{contentData.gallons_34}</p>
                      </div>
                      <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border border-orange-300">
                        <p className="text-sm text-orange-700 font-medium">{contentData.gallons_per_square_foot_35}</p>
                        <p className="text-3xl font-bold text-orange-900">{result.gallonsPerSqft.toFixed(2)}</p>
                        <p className="text-sm text-orange-600">{contentData.galft_36}</p>
                      </div>
                    </div>
                    {/* Step-by-step Calculation */}
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-gray-800 mb-3">{contentData.stepbystep_calculation_37}</h4>
                      <div className="text-sm space-y-2 text-gray-700">
                        <div className="p-2 bg-gray-50 rounded">
                          <strong>{contentData.step_1_38}</strong> {result.steps.step1}
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <strong>{contentData.step_2_39}</strong> {result.steps.step2}
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <strong>{contentData.step_3_40}</strong> {result.steps.step3}
                        </div>
                        <div className="p-2 bg-orange-50 rounded border border-orange-200">
                          <strong>{contentData.step_4_41}</strong> {result.steps.step4}
                        </div>
                      </div>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Droplets className="w-8 h-8 text-orange-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_dimensions_to_see_42}<span className="font-semibold text-orange-600">{contentData.live_results_43}</span>{" "}{contentData.and_stepbystep_calculations_44}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Calculate Board Feet",
            calculatorHref: "/construction/board-foot-calculator",
            calculatorDescription: "Calculate board feet for lumber and building materials with precise measurements for woodworking and construction projects"
          }, {
            calculatorName: "Cubic Yard Calculator",
            calculatorHref: "/construction/cubic-yard-calculator",
            calculatorDescription: "Calculate cubic yards for concrete, soil, and other materials with precise measurements for construction and landscaping projects"
          }, {
            calculatorName: "Square Feet to Cubic Yards Calculator",
            calculatorHref: "/construction/square-feet-to-cubic-yards-calculator",
            calculatorDescription: "Convert square feet to cubic yards for concrete, soil, and other materials in construction and landscaping projects"
          }
          ]}
            color="orange"
            title="Related Constructionl Calculators" />
          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-50 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center mr-3 shadow-lg">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.understanding_gallons_per_square_foot_45}</CardTitle>
              </CardHeader>
              <CardContent className="w-full space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.formulas_used_46}</h3>
                  <div className="bg-white p-4 rounded-lg border border-orange-200 space-y-2">
                    <p className="text-gray-700">{contentData.a_l_w_area_in_square_feet_47}</p>
                    <p className="text-gray-700">{contentData.v_48}<sub>{contentData.ft_49}</sub>{contentData.a_h_l_w_h_volume_in_cubic_feet_50}</p>
                    <p className="text-gray-700">{contentData.v_51}<sub>{contentData.gal_52}</sub>{contentData.v_53}<sub>{contentData.ft_54}</sub>{contentData.k_748052_volume_in_us_gallons_55}</p>
                    <p className="text-gray-700">{contentData.g_v_56}<sub>{contentData.gal_57}</sub>{contentData.a_gallons_per_square_foot_58}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.common_applications_59}</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>
                      <strong>{contentData.pool_spa_60}</strong>{contentData.calculate_volume_and_chemical_dosing_rates_61}</li>
                    <li>
                      <strong>{contentData.tank_design_62}</strong>{contentData.determine_liquid_storage_capacity_per_floor_area_63}</li>
                    <li>
                      <strong>{contentData.irrigation_64}</strong>{contentData.calculate_application_rates_for_landscaping_65}</li>
                    <li>
                      <strong>{contentData.construction_66}</strong>{contentData.estimate_concrete_paint_or_coating_coverage_67}</li>
                    <li>
                      <strong>{contentData.aquaculture_68}</strong>{contentData.design_fish_tanks_and_water_systems_69}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.conversion_factor_70}</h3>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="text-gray-700 mb-2">
                      <strong>{contentData.k_1_cubic_foot_748052_us_gallons_71}</strong>
                    </p>
                    <p className="text-sm text-gray-600">{contentData.this_conversion_factor_is_exact_and_widely_used_in_72}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.example_calculation_73}</h3>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>{contentData.given_74}</strong>{contentData.length_10_ft_width_8_ft_height_3_ft_75}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>{contentData.solution_76}</strong>
                    </p>
                    <div className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded space-y-1">
                      <p>{contentData.area_10_8_80_ft_77}</p>
                      <p>{contentData.volume_80_3_240_ft_78}</p>
                      <p>{contentData.volume_in_gallons_240_748052_179532_gallons_79}</p>
                      <p>{contentData.gallons_per_sq_ft_179532_80_2244_galft_80}</p>
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