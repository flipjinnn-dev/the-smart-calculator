"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Package, Calculator, RotateCcw, Ruler, Square, Cable as Cube, Weight } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
export default function SizeToWeightRectangularCuboidCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('size-to-weight-rectangular-cuboid-calculator', language, "calculator-ui");

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
    "centimeters_cm_0": "",
    "millimeters_mm_1": "",
    "meters_m_2": "",
    "inches_in_3": "",
    "feet_ft_4": "",
    "centimeters_cm_5": "",
    "millimeters_mm_6": "",
    "meters_m_7": "",
    "inches_in_8": "",
    "feet_ft_9": "",
    "centimeters_cm_10": "",
    "millimeters_mm_11": "",
    "meters_m_12": "",
    "inches_in_13": "",
    "feet_ft_14": "",
    "material_presets_15": "",
    "select_material_optional_16": "",
    "kgm_17": "",
    "calculate_18": "",
    "reset_19": "",
    "results_20": "",
    "input_values_converted_to_cm_21": "",
    "length_22": "",
    "cm_23": "",
    "width_24": "",
    "cm_25": "",
    "height_26": "",
    "cm_27": "",
    "density_28": "",
    "kgm_29": "",
    "volume_cm_30": "",
    "cubic_centimeters_31": "",
    "volume_m_32": "",
    "cubic_meters_33": "",
    "weight_34": "",
    "kilograms_35": "",
    "stepbystep_calculation_36": "",
    "step_1_37": "",
    "step_2_38": "",
    "step_3_39": "",
    "enter_dimensions_and_density_to_see_40": "",
    "weight_calculation_41": "",
    "and_stepbystep_results_42": "",
    "understanding_cuboid_weight_calculation_43": "",
    "formulas_used_44": "",
    "v_45": "",
    "cm_46": "",
    "l_w_h_volume_in_cubic_centimeters_47": "",
    "v_48": "",
    "m_49": "",
    "v_50": "",
    "cm_51": "",
    "k_1000000_volume_in_cubic_meters_52": "",
    "weight_v_53": "",
    "m_54": "",
    "weight_in_kilograms_55": "",
    "common_material_densities_56": "",
    "wood_57": "",
    "k_400800_kgm_58": "",
    "aluminum_59": "",
    "k_2700_kgm_60": "",
    "steel_61": "",
    "k_7850_kgm_62": "",
    "concrete_63": "",
    "k_2400_kgm_64": "",
    "plastic_pvc_65": "",
    "k_1400_kgm_66": "",
    "glass_67": "",
    "k_2500_kgm_68": "",
    "copper_69": "",
    "k_8960_kgm_70": "",
    "water_71": "",
    "k_1000_kgm_72": "",
    "example_calculation_73": "",
    "given_74": "",
    "length_50_cm_width_40_cm_height_30_cm_density_800__75": "",
    "solution_76": "",
    "volume_cm_50_40_30_60000_cm_77": "",
    "volume_m_60000_1000000_006_m_78": "",
    "weight_006_800_48_kg_79": "",
    "applications_80": "",
    "engineering_81": "",
    "calculate_requirements_and_structural_loads_82": "",
    "manufacturing_83": "",
    "estimate_product_weights_for_shipping_and_handling_84": "",
    "construction_85": "",
    "determine_concrete_steel_and_material_quantities_86": "",
    "packaging_87": "",
    "calculate_weights_and_costs_88": "",
    "design_89": "",
    "optimize_material_usage_and_weight_distribution_90": "",
    "dimensions_material_0": "",
    "enter_length_width_height_and_material_density_to__1": "",
    "length_l_2": "",
    "centimeters_cm_3": "",
    "millimeters_mm_4": "",
    "meters_m_5": "",
    "inches_in_6": "",
    "feet_ft_7": "",
    "width_w_8": "",
    "centimeters_cm_9": "",
    "millimeters_mm_10": "",
    "meters_m_11": "",
    "inches_in_12": "",
    "feet_ft_13": "",
    "height_h_14": "",
    "centimeters_cm_15": "",
    "millimeters_mm_16": "",
    "meters_m_17": "",
    "inches_in_18": "",
    "feet_ft_19": "",
    "material_density_20": "",
    "material_presets_21": "",
    "select_material_optional_22": "",
    "kgm_23": "",
    "calculate_24": "",
    "reset_25": "",
    "results_26": "",
    "input_values_converted_to_cm_27": "",
    "length_28": "",
    "cm_29": "",
    "width_30": "",
    "cm_31": "",
    "height_32": "",
    "cm_33": "",
    "density_34": "",
    "kgm_35": "",
    "volume_cm_36": "",
    "cubic_centimeters_37": "",
    "volume_m_38": "",
    "cubic_meters_39": "",
    "weight_40": "",
    "kilograms_41": "",
    "stepbystep_calculation_42": "",
    "step_1_43": "",
    "step_2_44": "",
    "step_3_45": "",
    "enter_dimensions_and_density_to_see_46": "",
    "weight_calculation_47": "",
    "and_stepbystep_results_48": "",
    "understanding_cuboid_weight_calculation_49": "",
    "formulas_used_50": "",
    "v_51": "",
    "cm_52": "",
    "l_w_h_volume_in_cubic_centimeters_53": "",
    "v_54": "",
    "m_55": "",
    "v_56": "",
    "cm_57": "",
    "k_1000000_volume_in_cubic_meters_58": "",
    "weight_v_59": "",
    "m_60": "",
    "weight_in_kilograms_61": "",
    "common_material_densities_62": "",
    "wood_63": "",
    "k_400800_kgm_64": "",
    "aluminum_65": "",
    "k_2700_kgm_66": "",
    "steel_67": "",
    "k_7850_kgm_68": "",
    "concrete_69": "",
    "k_2400_kgm_70": "",
    "plastic_pvc_71": "",
    "k_1400_kgm_72": "",
    "glass_73": "",
    "k_2500_kgm_74": "",
    "copper_75": "",
    "k_8960_kgm_76": "",
    "water_77": "",
    "k_1000_kgm_78": "",
    "example_calculation_79": "",
    "given_80": "",
    "length_50_cm_width_40_cm_height_30_cm_density_800__81": "",
    "solution_82": "",
    "volume_cm_50_40_30_60000_cm_83": "",
    "volume_m_60000_1000000_006_m_84": "",
    "weight_006_800_48_kg_85": "",
    "applications_86": "",
    "engineering_87": "",
    "calculate_requirements_and_structural_loads_88": "",
    "manufacturing_89": "",
    "estimate_product_weights_for_shipping_and_handling_90": "",
    "construction_91": "",
    "determine_concrete_steel_and_material_quantities_92": "",
    "packaging_93": "",
    "calculate_weights_and_costs_94": "",
    "design_95": "",
    "optimize_material_usage_and_weight_distribution_96": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Input states
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [density, setDensity] = useState<string>("");

  // Unit selection states
  const [lengthUnit, setLengthUnit] = useState<string>("cm");
  const [widthUnit, setWidthUnit] = useState<string>("cm");
  const [heightUnit, setHeightUnit] = useState<string>("cm");

  // Material presets (density in kg/m³)
  const materialPresets = {
    custom: {
      name: "Custom",
      density: ""
    },
    wood_pine: {
      name: "Pine Wood",
      density: "500"
    },
    wood_oak: {
      name: "Oak Wood",
      density: "750"
    },
    aluminum: {
      name: "Aluminum",
      density: "2700"
    },
    steel: {
      name: "Steel",
      density: "7850"
    },
    concrete: {
      name: "Concrete",
      density: "2400"
    },
    plastic_pvc: {
      name: "PVC Plastic",
      density: "1400"
    },
    glass: {
      name: "Glass",
      density: "2500"
    },
    copper: {
      name: "Copper",
      density: "8960"
    },
    water: {
      name: "Water",
      density: "1000"
    }
  };

  // Unit conversion functions to centimeters
  const convertToCm = (value: number, unit: string): number => {
    switch (unit) {
      case "cm":
        return value;
      case "mm":
        return value / 10;
      case "m":
        return value * 100;
      case "in":
        return value * 2.54;
      case "ft":
        return value * 30.48;
      default:
        return value;
    }
  };
  const getUnitLabel = (unit: string): string => {
    switch (unit) {
      case "cm":
        return "centimeters";
      case "mm":
        return "millimeters";
      case "m":
        return "meters";
      case "in":
        return "inches";
      case "ft":
        return "feet";
      default:
        return unit;
    }
  };

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0;
  };

  // Handle material preset selection
  const handleMaterialChange = (materialKey: string) => {
    const material = materialPresets[materialKey as keyof typeof materialPresets];
    setDensity(material.density);
  };

  // Calculate
  const calculateResults = () => {
    const lengthValue = getNumericValue(length);
    const widthValue = getNumericValue(width);
    const heightValue = getNumericValue(height);
    const densityValue = getNumericValue(density);

    // Convert all dimensions to centimeters
    const L = convertToCm(lengthValue, lengthUnit);
    const W = convertToCm(widthValue, widthUnit);
    const H = convertToCm(heightValue, heightUnit);

    // Step 1: Calculate in cubic centimeters
    const volumeCm3 = L * W * H;

    // Step 2: Convert volume to cubic meters
    const volumeM3 = volumeCm3 / 1000000;

    // Step 3: Calculate in kilograms
    const weight = volumeM3 * densityValue;
    const newResult = {
      originalLength: lengthValue,
      originalWidth: widthValue,
      originalHeight: heightValue,
      originalDensity: densityValue,
      lengthUnit,
      widthUnit,
      heightUnit,
      length: L,
      width: W,
      height: H,
      density: densityValue,
      volumeCm3,
      volumeM3,
      weight,
      steps: {
        step1: `Volume (cm³) = ${L.toFixed(2)} cm × ${W.toFixed(2)} cm × ${H.toFixed(2)} cm = ${volumeCm3.toLocaleString()} cm³`,
        step2: `Volume (m³) = ${volumeCm3.toLocaleString()} cm³ ÷ 1,000,000 = ${volumeM3.toFixed(6)} m³`,
        step3: `Weight = ${volumeM3.toFixed(6)} m³ × ${densityValue} kg/m³ = ${weight.toFixed(2)} kg`
      }
    };
    setResult(newResult);
    setShowResult(true);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };

  // Reset function
  const resetCalculator = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setDensity("");
    setLengthUnit("cm");
    setWidthUnit("cm");
    setHeightUnit("cm");
    setResult(null);
    setShowResult(false);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Package className="w-8 h-8 text-white" />
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
                      <Package className="w-6 h-6 text-teal-600" />
                      <span>{contentData.dimensions_material_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_length_width_height_and_material_density_to__1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.length_l_2}</Label>
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Ruler className="h-5 w-5 text-teal-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm" type="number" step="0.1" min="0" value={length} onChange={e => setLength(e.target.value)} placeholder="0" />
                            </div>
                            <select value={lengthUnit} onChange={e => setLengthUnit(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-teal-200 bg-white text-sm">
                              <option value="cm">{contentData.centimeters_cm_3}</option>
                              <option value="mm">{contentData.millimeters_mm_4}</option>
                              <option value="m">{contentData.meters_m_5}</option>
                              <option value="in">{contentData.inches_in_6}</option>
                              <option value="ft">{contentData.feet_ft_7}</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.width_w_8}</Label>
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Square className="h-5 w-5 text-teal-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm" type="number" step="0.1" min="0" value={width} onChange={e => setWidth(e.target.value)} placeholder="0" />
                            </div>
                            <select value={widthUnit} onChange={e => setWidthUnit(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-teal-200 bg-white text-sm">
                              <option value="cm">{contentData.centimeters_cm_9}</option>
                              <option value="mm">{contentData.millimeters_mm_10}</option>
                              <option value="m">{contentData.meters_m_11}</option>
                              <option value="in">{contentData.inches_in_12}</option>
                              <option value="ft">{contentData.feet_ft_13}</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.height_h_14}</Label>
                          <div className="space-y-2">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Cube className="h-5 w-5 text-teal-500" />
                              </div>
                              <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm" type="number" step="0.1" min="0" value={height} onChange={e => setHeight(e.target.value)} placeholder="0" />
                            </div>
                            <select value={heightUnit} onChange={e => setHeightUnit(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-teal-200 bg-white text-sm">
                              <option value="cm">{contentData.centimeters_cm_15}</option>
                              <option value="mm">{contentData.millimeters_mm_16}</option>
                              <option value="m">{contentData.meters_m_17}</option>
                              <option value="in">{contentData.inches_in_18}</option>
                              <option value="ft">{contentData.feet_ft_19}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.material_density_20}</Label>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs text-gray-600 mb-2 block">{contentData.material_presets_21}</Label>
                            <select onChange={e => handleMaterialChange(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-teal-400 focus:ring-teal-200 bg-white text-sm">
                              <option value="custom">{contentData.select_material_optional_22}</option>
                              {Object.entries(materialPresets).map(([key, material]) => <option key={key} value={key}>
                                  {material.name} {material.density && `(${material.density} kg/m³)`}
                                </option>)}
                            </select>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Weight className="h-5 w-5 text-teal-500" />
                            </div>
                            <Input className="pl-10 h-12 rounded-xl border-gray-200 focus:border-teal-400 focus:ring-teal-200 shadow-sm" type="number" step="0.1" min="0" value={density} onChange={e => setDensity(e.target.value)} placeholder="Enter density in kg/m³" />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-sm text-gray-500">{contentData.kgm_23}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button onClick={calculateResults} className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                          <Calculator className="w-5 h-5 mr-2" />{contentData.calculate_24}</Button>
                        <Button onClick={resetCalculator} variant="outline" className="h-14 px-6 text-lg font-semibold border-teal-300 text-teal-600 hover:bg-teal-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent">
                          <RotateCcw className="w-5 h-5 mr-2" />{contentData.reset_25}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-50 sticky top-24 h-fit">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center mb-3 shadow-lg">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">{contentData.results_26}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="w-full space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-white p-4 rounded-lg border border-teal-200">
                            <p className="text-sm text-teal-700 font-medium">{contentData.input_values_converted_to_cm_27}</p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>{contentData.length_28}{result.originalLength} {result.lengthUnit} = {result.length.toFixed(2)}{contentData.cm_29}</p>
                              <p>{contentData.width_30}{result.originalWidth} {result.widthUnit} = {result.width.toFixed(2)}{contentData.cm_31}</p>
                              <p>{contentData.height_32}{result.originalHeight} {result.heightUnit} = {result.height.toFixed(2)}{contentData.cm_33}</p>
                              <p>{contentData.density_34}{result.originalDensity}{contentData.kgm_35}</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-teal-200">
                            <p className="text-sm text-teal-700 font-medium">{contentData.volume_cm_36}</p>
                            <p className="text-2xl font-bold text-teal-900">{result.volumeCm3.toLocaleString()}</p>
                            <p className="text-sm text-teal-600">{contentData.cubic_centimeters_37}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-teal-200">
                            <p className="text-sm text-teal-700 font-medium">{contentData.volume_m_38}</p>
                            <p className="text-xl font-bold text-teal-900">{result.volumeM3.toFixed(6)}</p>
                            <p className="text-sm text-teal-600">{contentData.cubic_meters_39}</p>
                          </div>
                          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-4 rounded-lg border border-teal-300">
                            <p className="text-sm text-teal-700 font-medium">{contentData.weight_40}</p>
                            <p className="text-3xl font-bold text-teal-900">{result.weight.toFixed(2)}</p>
                            <p className="text-sm text-teal-600">{contentData.kilograms_41}</p>
                          </div>
                        </div>

                        {/* Step-by-step Calculation */}
                        <div className="bg-white p-4 rounded-lg border border-teal-200">
                          <h4 className="font-semibold text-gray-800 mb-3">{contentData.stepbystep_calculation_42}</h4>
                          <div className="text-sm space-y-2 text-gray-700">
                            <div className="p-2 bg-gray-50 rounded">
                              <strong>{contentData.step_1_43}</strong> {result.steps.step1}
                            </div>
                            <div className="p-2 bg-gray-50 rounded">
                              <strong>{contentData.step_2_44}</strong> {result.steps.step2}
                            </div>
                            <div className="p-2 bg-teal-50 rounded border border-teal-200">
                              <strong>{contentData.step_3_45}</strong> {result.steps.step3}
                            </div>
                          </div>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Package className="w-8 h-8 text-teal-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_dimensions_and_density_to_see_46}{" "}
                          <span className="font-semibold text-teal-600">{contentData.weight_calculation_47}</span>{contentData.and_stepbystep_results_48}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-teal-50 to-cyan-50 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center mr-3 shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-teal-700 tracking-tight">{contentData.understanding_cuboid_weight_calculation_49}</CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.formulas_used_50}</h3>
                    <div className="bg-white p-4 rounded-lg border border-teal-200 space-y-2">
                      <p className="text-gray-700">{contentData.v_51}<sub>{contentData.cm_52}</sub>{contentData.l_w_h_volume_in_cubic_centimeters_53}</p>
                      <p className="text-gray-700">{contentData.v_54}<sub>{contentData.m_55}</sub>{contentData.v_56}<sub>{contentData.cm_57}</sub>{contentData.k_1000000_volume_in_cubic_meters_58}</p>
                      <p className="text-gray-700">{contentData.weight_v_59}<sub>{contentData.m_60}</sub>{contentData.weight_in_kilograms_61}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.common_material_densities_62}</h3>
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <p>
                            <strong>{contentData.wood_63}</strong>{contentData.k_400800_kgm_64}</p>
                          <p>
                            <strong>{contentData.aluminum_65}</strong>{contentData.k_2700_kgm_66}</p>
                          <p>
                            <strong>{contentData.steel_67}</strong>{contentData.k_7850_kgm_68}</p>
                          <p>
                            <strong>{contentData.concrete_69}</strong>{contentData.k_2400_kgm_70}</p>
                        </div>
                        <div>
                          <p>
                            <strong>{contentData.plastic_pvc_71}</strong>{contentData.k_1400_kgm_72}</p>
                          <p>
                            <strong>{contentData.glass_73}</strong>{contentData.k_2500_kgm_74}</p>
                          <p>
                            <strong>{contentData.copper_75}</strong>{contentData.k_8960_kgm_76}</p>
                          <p>
                            <strong>{contentData.water_77}</strong>{contentData.k_1000_kgm_78}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.example_calculation_79}</h3>
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{contentData.given_80}</strong>{contentData.length_50_cm_width_40_cm_height_30_cm_density_800__81}</p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>{contentData.solution_82}</strong>
                      </p>
                      <div className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded space-y-1">
                        <p>{contentData.volume_cm_50_40_30_60000_cm_83}</p>
                        <p>{contentData.volume_m_60000_1000000_006_m_84}</p>
                        <p>{contentData.weight_006_800_48_kg_85}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.applications_86}</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>{contentData.engineering_87}</strong>{contentData.calculate_requirements_and_structural_loads_88}</li>
                      <li>
                        <strong>{contentData.manufacturing_89}</strong>{contentData.estimate_product_weights_for_shipping_and_handling_90}</li>
                      <li>
                        <strong>{contentData.construction_91}</strong>{contentData.determine_concrete_steel_and_material_quantities_92}</li>
                      <li>
                        <strong>{contentData.packaging_93}</strong>{contentData.calculate_weights_and_costs_94}</li>
                      <li>
                        <strong>{contentData.design_95}</strong>{contentData.optimize_material_usage_and_weight_distribution_96}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <SimilarCalculators calculators={[{
          calculatorName: "Square Feet to Cubic Yards Calculator",
          calculatorHref: "/construction/square-feet-to-cubic-yards-calculator",
          calculatorDescription: "Convert square feet to cubic yards for concrete, soil, and other materials in construction and landscaping projects"
        }, {
          calculatorName: "Cubic Yard Calculator",
          calculatorHref: "/construction/cubic-yard-calculator",
          calculatorDescription: "Calculate cubic yards for concrete, soil, and other materials with precise measurements for construction and landscaping projects"
        }, {
          calculatorName: "Board Foot Calculator",
          calculatorHref: "/construction/board-foot-calculator",
          calculatorDescription: "Calculate board feet for lumber and building materials with precise measurements for woodworking and construction projects"
        }
        ]} 
        color="blue" 
        title="Related Financial Calculators" />
        </main>
      </div>
    </>;
}