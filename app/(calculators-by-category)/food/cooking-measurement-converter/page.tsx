"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CalculatorGuide from "@/components/calculator-guide";
import { Calculator, RotateCcw, Scale, Droplets, ChefHat } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SimilarCalculators from "@/components/similar-calculators";
const ingredients = [{
  name: "Water",
  density: 1000
}, {
  name: "Flour (all-purpose)",
  density: 593
}, {
  name: "Sugar (granulated)",
  density: 845
}, {
  name: "Salt",
  density: 1217
}, {
  name: "Milk (whole)",
  density: 1030
}, {
  name: "Oil (vegetable)",
  density: 920
}, {
  name: "Honey",
  density: 1420
}, {
  name: "Butter",
  density: 911
}, {
  name: "Rice (uncooked)",
  density: 753
}, {
  name: "Oats (rolled)",
  density: 432
}, {
  name: "Cocoa powder",
  density: 641
}, {
  name: "Baking powder",
  density: 1520
}, {
  name: "Custom",
  density: 1000
}];
export default function CookingMeasurementConverterCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('cooking-measurement-converter', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'cooking-measurement-converter',  // Calculator name
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
    "ingredient_measurements_0": "",
    "select_an_ingredient_and_enter_either_weight_or_vo_1": "",
    "select_ingredient_2": "",
    "density_3": "",
    "kgm_4": "",
    "gcm_5": "",
    "gml_6": "",
    "lbft_7": "",
    "weight_optional_8": "",
    "g_9": "",
    "dag_10": "",
    "kg_11": "",
    "oz_12": "",
    "lb_13": "",
    "volume_optional_14": "",
    "ml_15": "",
    "l_16": "",
    "cups_17": "",
    "tbsp_18": "",
    "tsp_19": "",
    "fl_oz_20": "",
    "convert_21": "",
    "reset_22": "",
    "results_23": "",
    "ingredient_24": "",
    "density_25": "",
    "kgm_26": "",
    "input_weight_27": "",
    "kg_28": "",
    "equivalent_volume_29": "",
    "all_volume_conversions_30": "",
    "ml_31": "",
    "l_32": "",
    "cups_33": "",
    "tbsp_34": "",
    "tsp_35": "",
    "fl_oz_36": "",
    "input_volume_37": "",
    "m_38": "",
    "equivalent_weight_39": "",
    "all_weight_conversions_40": "",
    "g_41": "",
    "dag_42": "",
    "kg_43": "",
    "oz_44": "",
    "lb_45": "",
    "formula_used_46": "",
    "volume_weight_density_47": "",
    "v_48": "",
    "kg_49": "",
    "kgm_50": "",
    "m_51": "",
    "weight_volume_density_52": "",
    "w_53": "",
    "m_54": "",
    "kgm_55": "",
    "kg_56": "",
    "select_an_ingredient_and_enter_either_57": "",
    "weight_or_volume_58": "",
    "to_see_conversion_results_59": "",
    "understanding_cooking_measurement_conversion_60": "",
    "core_formulas_61": "",
    "weight_to_volume_62": "",
    "volume_weight_density_63": "",
    "volume_to_weight_64": "",
    "weight_volume_density_65": "",
    "density_66": "",
    "mass_per_unit_volume_kgm_67": "",
    "common_ingredient_densities_68": "",
    "water_69": "",
    "k_1000_kgm_70": "",
    "flour_71": "",
    "k_593_kgm_72": "",
    "sugar_73": "",
    "k_845_kgm_74": "",
    "salt_75": "",
    "k_1217_kgm_76": "",
    "milk_77": "",
    "k_1030_kgm_78": "",
    "oil_79": "",
    "k_920_kgm_80": "",
    "honey_81": "",
    "k_1420_kgm_82": "",
    "butter_83": "",
    "k_911_kgm_84": "",
    "practical_applications_85": "",
    "recipe_scaling_86": "",
    "convert_between_weight_and_volume_measurements_whe_87": "",
    "international_recipes_88": "",
    "convert_between_metric_and_us_customary_units_89": "",
    "precision_baking_90": "",
    "use_weight_measurements_for_more_accurate_results_91": "",
    "ingredient_substitution_92": "",
    "calculate_amounts_when_substituting_ingredients_93": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [selectedIngredient, setSelectedIngredient] = useState<string>("Water");
  const [density, setDensity] = useState<string>("1000");
  const [densityUnit, setDensityUnit] = useState<string>("kg/m³");
  const [weight, setWeight] = useState<string>("");
  const [volume, setVolume] = useState<string>("");

  // Unit selection states
  const [weightUnit, setWeightUnit] = useState<string>("g");
  const [volumeUnit, setVolumeUnit] = useState<string>("ml");
  const convertDensityToKgM3 = (value: number, unit: string): number => {
    switch (unit) {
      case "kg/m³":
        return value;
      case "g/cm³":
        return value * 1000;
      case "g/ml":
        return value * 1000;
      case "lb/ft³":
        return value * 16.0185;
      default:
        return value;
    }
  };
  const handleIngredientChange = (ingredientName: string) => {
    setSelectedIngredient(ingredientName);
    const ingredient = ingredients.find(ing => ing.name === ingredientName);
    if (ingredient) {
      setDensity(ingredient.density.toString());
    }
    setErrors({});
  };
  const handleDensityUnitChange = (newUnit: string) => {
    const currentDensityValue = getNumericValue(density);
    const densityInKgM3 = convertDensityToKgM3(currentDensityValue, densityUnit);
    let newDensityValue = densityInKgM3;
    switch (newUnit) {
      case "kg/m³":
        newDensityValue = densityInKgM3;
        break;
      case "g/cm³":
        newDensityValue = densityInKgM3 / 1000;
        break;
      case "g/ml":
        newDensityValue = densityInKgM3 / 1000;
        break;
      case "lb/ft³":
        newDensityValue = densityInKgM3 / 16.0185;
        break;
    }
    setDensity(newDensityValue.toFixed(3));
    setDensityUnit(newUnit);
  };
  const validateInputs = (): boolean => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const densityValue = getNumericValue(density);
    const weightValue = getNumericValue(weight);
    const volumeValue = getNumericValue(volume);
    if (densityValue <= 0) {
      newErrors.density = "Density must be greater than 0";
    }
    if (weightValue < 0) {
      newErrors.weight = "Weight cannot be negative";
    }
    if (volumeValue < 0) {
      newErrors.volume = "Volume cannot be negative";
    }
    if (weightValue === 0 && volumeValue === 0) {
      newErrors.general = "Please enter either weight or volume";
    }
    if (weightValue > 0 && volumeValue > 0) {
      newErrors.general = "Please enter either weight OR volume, not both";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0;
  };

  // Weight unit conversion to kg
  const convertWeightToKg = (value: number, unit: string): number => {
    switch (unit) {
      case "g":
        return value / 1000;
      case "dag":
        return value * 0.01;
      case "kg":
        return value;
      case "oz":
        return value * 0.0283495;
      case "lb":
        return value * 0.453592;
      default:
        return value;
    }
  };

  // Volume unit conversion to m³
  const convertVolumeToM3 = (value: number, unit: string): number => {
    switch (unit) {
      case "ml":
        return value / 1000000;
      case "L":
        return value / 1000;
      case "cups":
        return value * 236.588 / 1000000;
      case "tbsp":
        return value * 14.7868 / 1000000;
      case "tsp":
        return value * 4.92892 / 1000000;
      case "fl oz":
        return value * 29.5735 / 1000000;
      default:
        return value;
    }
  };

  // Convert from kg to weight units
  const convertKgToWeight = (value: number, unit: string): number => {
    switch (unit) {
      case "g":
        return value * 1000;
      case "dag":
        return value * 100;
      case "kg":
        return value;
      case "oz":
        return value / 0.0283495;
      case "lb":
        return value / 0.453592;
      default:
        return value;
    }
  };

  // Convert from m³ to volume units
  const convertM3ToVolume = (value: number, unit: string): number => {
    switch (unit) {
      case "ml":
        return value * 1000000;
      case "L":
        return value * 1000;
      case "cups":
        return value * 1000000 / 236.588;
      case "tbsp":
        return value * 1000000 / 14.7868;
      case "tsp":
        return value * 1000000 / 4.92892;
      case "fl oz":
        return value * 1000000 / 29.5735;
      default:
        return value;
    }
  };
  const calculateResults = () => {
    if (!validateInputs()) {
      return;
    }
    const densityValue = convertDensityToKgM3(getNumericValue(density), densityUnit);
    const weightValue = getNumericValue(weight);
    const volumeValue = getNumericValue(volume);
    let calculationMode = "";
    let calculatedWeight = 0;
    let calculatedVolume = 0;
    let weightInKg = 0;
    let volumeInM3 = 0;

    // Auto-detect calculation mode
    if (weightValue > 0 && volumeValue === 0) {
      // Weight to Volume
      calculationMode = "weight-to-volume";
      weightInKg = convertWeightToKg(weightValue, weightUnit);
      volumeInM3 = weightInKg / densityValue;
      calculatedVolume = convertM3ToVolume(volumeInM3, volumeUnit);
    } else if (volumeValue > 0 && weightValue === 0) {
      // Volume to Weight
      calculationMode = "volume-to-weight";
      volumeInM3 = convertVolumeToM3(volumeValue, volumeUnit);
      weightInKg = volumeInM3 * densityValue;
      calculatedWeight = convertKgToWeight(weightInKg, weightUnit);
    }
    const newResult = {
      calculationMode,
      ingredient: selectedIngredient,
      density: densityValue,
      densityUnit,
      originalWeight: weightValue,
      originalVolume: volumeValue,
      weightUnit,
      volumeUnit,
      weightInKg,
      volumeInM3,
      calculatedWeight,
      calculatedVolume,
      // All possible conversions for display
      weightConversions: calculationMode === "volume-to-weight" ? {
        g: convertKgToWeight(weightInKg, "g"),
        dag: convertKgToWeight(weightInKg, "dag"),
        kg: convertKgToWeight(weightInKg, "kg"),
        oz: convertKgToWeight(weightInKg, "oz"),
        lb: convertKgToWeight(weightInKg, "lb")
      } : null,
      volumeConversions: calculationMode === "weight-to-volume" ? {
        ml: convertM3ToVolume(volumeInM3, "ml"),
        L: convertM3ToVolume(volumeInM3, "L"),
        cups: convertM3ToVolume(volumeInM3, "cups"),
        tbsp: convertM3ToVolume(volumeInM3, "tbsp"),
        tsp: convertM3ToVolume(volumeInM3, "tsp"),
        "fl oz": convertM3ToVolume(volumeInM3, "fl oz")
      } : null
    };
    setResult(newResult);
    setShowResult(true);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  const resetCalculator = () => {
    setSelectedIngredient("Water");
    setDensity("1000");
    setDensityUnit("kg/m³");
    setWeight("");
    setVolume("");
    setWeightUnit("g");
    setVolumeUnit("ml");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <ChefHat className="w-6 h-6 text-red-600" />
                    <span>{contentData.ingredient_measurements_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.select_an_ingredient_and_enter_either_weight_or_vo_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {errors.general && <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm font-medium">{errors.general}</p>
                    </div>}

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-red-800 mb-3 block">{contentData.select_ingredient_2}</Label>
                        <Select value={selectedIngredient} onValueChange={handleIngredientChange}>
                          <SelectTrigger className="h-12 border-red-200 focus:border-red-400 focus:ring-red-200 shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ingredients.map(ingredient => <SelectItem key={ingredient.name} value={ingredient.name}>
                              {ingredient.name}
                            </SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-red-800 mb-3 block">{contentData.density_3}</Label>
                        <div className="flex space-x-2">
                          <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Scale className="h-5 w-5 text-red-500" />
                            </div>
                            <Input className={`pl-10 h-12 rounded-xl border-red-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${errors.density ? "border-red-500" : ""}`} type="number" step="0.001" min="0" value={density} onChange={e => {
                              setDensity(e.target.value);
                              if (selectedIngredient !== "Custom") {
                                setSelectedIngredient("Custom");
                              }
                              setErrors({
                                ...errors,
                                density: ""
                              });
                            }} placeholder="1000" />
                          </div>
                          <Select value={densityUnit} onValueChange={handleDensityUnitChange}>
                            <SelectTrigger className="w-24 h-12 border-2 focus:border-red-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg/m³">{contentData.kgm_4}</SelectItem>
                              <SelectItem value="g/cm³">{contentData.gcm_5}</SelectItem>
                              <SelectItem value="g/ml">{contentData.gml_6}</SelectItem>
                              <SelectItem value="lb/ft³">{contentData.lbft_7}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.density && <p className="text-red-500 text-xs mt-1">{errors.density}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-red-800 mb-3 block">{contentData.weight_optional_8}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Scale className="h-5 w-5 text-red-500" />
                              </div>
                              <Input className={`pl-10 h-12 rounded-xl border-red-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${errors.weight ? "border-red-500" : ""}`} type="number" step="0.1" min="0" value={weight} onChange={e => {
                                setWeight(e.target.value);
                                setErrors({
                                  ...errors,
                                  weight: "",
                                  general: ""
                                });
                              }} placeholder="0" />
                            </div>
                            <Select value={weightUnit} onValueChange={setWeightUnit}>
                              <SelectTrigger className="w-16 h-12 border-2 focus:border-red-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="g">{contentData.g_9}</SelectItem>
                                <SelectItem value="dag">{contentData.dag_10}</SelectItem>
                                <SelectItem value="kg">{contentData.kg_11}</SelectItem>
                                <SelectItem value="oz">{contentData.oz_12}</SelectItem>
                                <SelectItem value="lb">{contentData.lb_13}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-red-800 mb-3 block">{contentData.volume_optional_14}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Droplets className="h-5 w-5 text-red-500" />
                              </div>
                              <Input className={`pl-10 h-12 rounded-xl border-red-200 focus:border-red-400 focus:ring-red-200 shadow-sm ${errors.volume ? "border-red-500" : ""}`} type="number" step="0.1" min="0" value={volume} onChange={e => {
                                setVolume(e.target.value);
                                setErrors({
                                  ...errors,
                                  volume: "",
                                  general: ""
                                });
                              }} placeholder="0" />
                            </div>
                            <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                              <SelectTrigger className="w-20 h-12 border-2 focus:border-red-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ml">{contentData.ml_15}</SelectItem>
                                <SelectItem value="L">{contentData.l_16}</SelectItem>
                                <SelectItem value="cups">{contentData.cups_17}</SelectItem>
                                <SelectItem value="tbsp">{contentData.tbsp_18}</SelectItem>
                                <SelectItem value="tsp">{contentData.tsp_19}</SelectItem>
                                <SelectItem value="fl oz">{contentData.fl_oz_20}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.volume && <p className="text-red-500 text-xs mt-1">{errors.volume}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Button onClick={calculateResults} className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Calculator className="w-5 h-5 mr-2" />{contentData.convert_21}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-14 px-6 text-lg font-semibold border-red-300 text-red-600 hover:bg-red-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent">
                        <RotateCcw className="w-5 h-5 mr-2" />{contentData.reset_22}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-red-50 to-pink-50 sticky top-24 h-fit">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mb-3 shadow-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-red-700 tracking-tight">{contentData.results_23}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="w-full space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <p className="text-sm text-red-700 font-medium">{contentData.ingredient_24}</p>
                      <p className="text-lg font-semibold text-gray-800">{result.ingredient}</p>
                      <p className="text-sm text-gray-600">{contentData.density_25}{result.density.toFixed(2)}{contentData.kgm_26}</p>
                    </div>

                    {/* ... existing result display code ... */}
                    {result.calculationMode === "weight-to-volume" && <>
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <p className="text-sm text-red-700 font-medium">{contentData.input_weight_27}</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {result.originalWeight} {result.weightUnit} = {result.weightInKg.toFixed(4)}{contentData.kg_28}</p>
                      </div>

                      <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg border border-red-300">
                        <p className="text-sm text-red-700 font-medium">{contentData.equivalent_volume_29}</p>
                        <p className="text-3xl font-bold text-red-900">{result.calculatedVolume.toFixed(2)}</p>
                        <p className="text-sm text-red-600">{result.volumeUnit}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-gray-800 mb-2">{contentData.all_volume_conversions_30}</h4>
                        <div className="text-sm space-y-1 text-gray-700">
                          <p>{result.volumeConversions.ml.toFixed(2)}{contentData.ml_31}</p>
                          <p>{result.volumeConversions.L.toFixed(4)}{contentData.l_32}</p>
                          <p>{result.volumeConversions.cups.toFixed(3)}{contentData.cups_33}</p>
                          <p>{result.volumeConversions.tbsp.toFixed(2)}{contentData.tbsp_34}</p>
                          <p>{result.volumeConversions.tsp.toFixed(2)}{contentData.tsp_35}</p>
                          <p>{result.volumeConversions["fl oz"].toFixed(3)}{contentData.fl_oz_36}</p>
                        </div>
                      </div>
                    </>}

                    {result.calculationMode === "volume-to-weight" && <>
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <p className="text-sm text-red-700 font-medium">{contentData.input_volume_37}</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {result.originalVolume} {result.volumeUnit} = {result.volumeInM3.toFixed(8)}{contentData.m_38}</p>
                      </div>

                      <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg border border-red-300">
                        <p className="text-sm text-red-700 font-medium">{contentData.equivalent_weight_39}</p>
                        <p className="text-3xl font-bold text-red-900">{result.calculatedWeight.toFixed(2)}</p>
                        <p className="text-sm text-red-600">{result.weightUnit}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-gray-800 mb-2">{contentData.all_weight_conversions_40}</h4>
                        <div className="text-sm space-y-1 text-gray-700">
                          <p>{result.weightConversions.g.toFixed(2)}{contentData.g_41}</p>
                          <p>{result.weightConversions.dag.toFixed(3)}{contentData.dag_42}</p>
                          <p>{result.weightConversions.kg.toFixed(4)}{contentData.kg_43}</p>
                          <p>{result.weightConversions.oz.toFixed(3)}{contentData.oz_44}</p>
                          <p>{result.weightConversions.lb.toFixed(4)}{contentData.lb_45}</p>
                        </div>
                      </div>
                    </>}

                    {/* Step-by-step Calculation */}
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-gray-800 mb-3">{contentData.formula_used_46}</h4>
                      <div className="text-sm space-y-2 text-gray-700">
                        {result.calculationMode === "weight-to-volume" ? <div className="p-2 bg-red-50 rounded border border-red-200">
                          <strong>{contentData.volume_weight_density_47}</strong>
                          <br />{contentData.v_48}{result.weightInKg.toFixed(4)}{contentData.kg_49}{result.density.toFixed(2)}{contentData.kgm_50}{" "}
                          {result.volumeInM3.toFixed(8)}{contentData.m_51}</div> : <div className="p-2 bg-red-50 rounded border border-red-200">
                          <strong>{contentData.weight_volume_density_52}</strong>
                          <br />{contentData.w_53}{result.volumeInM3.toFixed(8)}{contentData.m_54}{result.density.toFixed(2)}{contentData.kgm_55}{" "}
                          {result.weightInKg.toFixed(4)}{contentData.kg_56}</div>}
                      </div>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <ChefHat className="w-8 h-8 text-red-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.select_an_ingredient_and_enter_either_57}{" "}
                      <span className="font-semibold text-red-600">{contentData.weight_or_volume_58}</span>{contentData.to_see_conversion_results_59}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Dry to Cooked Pasta Converter",
            calculatorHref: "/food/dry-to-cooked-pasta-converter",
            calculatorDescription: "Select pasta type, enter measurements, and get accurate cooked pasta equivalents"
          },
          ]}
            color="pink"
            title="Related Food Calculators" />
          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-red-50 to-pink-50 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mr-3 shadow-lg">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-red-700 tracking-tight">{contentData.understanding_cooking_measurement_conversion_60}</CardTitle>
              </CardHeader>
              <CardContent className="w-full space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.core_formulas_61}</h3>
                  <div className="bg-white p-4 rounded-lg border border-red-200 space-y-2">
                    <p className="text-gray-700">
                      <strong>{contentData.weight_to_volume_62}</strong>{contentData.volume_weight_density_63}</p>
                    <p className="text-gray-700">
                      <strong>{contentData.volume_to_weight_64}</strong>{contentData.weight_volume_density_65}</p>
                    <p className="text-gray-700">
                      <strong>{contentData.density_66}</strong>{contentData.mass_per_unit_volume_kgm_67}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.common_ingredient_densities_68}</h3>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <p>
                          <strong>{contentData.water_69}</strong>{contentData.k_1000_kgm_70}</p>
                        <p>
                          <strong>{contentData.flour_71}</strong>{contentData.k_593_kgm_72}</p>
                        <p>
                          <strong>{contentData.sugar_73}</strong>{contentData.k_845_kgm_74}</p>
                        <p>
                          <strong>{contentData.salt_75}</strong>{contentData.k_1217_kgm_76}</p>
                      </div>
                      <div>
                        <p>
                          <strong>{contentData.milk_77}</strong>{contentData.k_1030_kgm_78}</p>
                        <p>
                          <strong>{contentData.oil_79}</strong>{contentData.k_920_kgm_80}</p>
                        <p>
                          <strong>{contentData.honey_81}</strong>{contentData.k_1420_kgm_82}</p>
                        <p>
                          <strong>{contentData.butter_83}</strong>{contentData.k_911_kgm_84}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.practical_applications_85}</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>
                      <strong>{contentData.recipe_scaling_86}</strong>{contentData.convert_between_weight_and_volume_measurements_whe_87}</li>
                    <li>
                      <strong>{contentData.international_recipes_88}</strong>{contentData.convert_between_metric_and_us_customary_units_89}</li>
                    <li>
                      <strong>{contentData.precision_baking_90}</strong>{contentData.use_weight_measurements_for_more_accurate_results_91}</li>
                    <li>
                      <strong>{contentData.ingredient_substitution_92}</strong>{contentData.calculate_amounts_when_substituting_ingredients_93}</li>
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