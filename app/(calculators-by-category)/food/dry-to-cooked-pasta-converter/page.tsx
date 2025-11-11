"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

import { Calculator, RotateCcw, ChefHat, Wheat } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function DryToCookedPastaConverterCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('dry-to-cooked-pasta-converter', language, "calculator-ui");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "type_of_pasta_2": "",
    "shortshaped_pasta_3": "",
    "longshaped_pasta_4": "",
    "specific_pasta_type_5": "",
    "penne_6": "",
    "macaroni_7": "",
    "fusilli_8": "",
    "rigatoni_9": "",
    "farfalle_bowtie_10": "",
    "rotini_11": "",
    "shells_conchiglie_12": "",
    "elbow_13": "",
    "spaghetti_14": "",
    "linguine_15": "",
    "fettuccine_16": "",
    "angel_hair_17": "",
    "pappardelle_18": "",
    "tagliatelle_19": "",
    "bucatini_20": "",
    "cooking_preference_21": "",
    "al_dente_22": "",
    "normal_23": "",
    "soft_24": "",
    "dry_volume_25": "",
    "cups_26": "",
    "ml_27": "",
    "l_28": "",
    "fl_oz_29": "",
    "pints_30": "",
    "tbsp_31": "",
    "tsp_32": "",
    "expansion_ratio_33": "",
    "x_34": "",
    "k_15x_firmer_35": "",
    "k_20x_softer_36": "",
    "dry_bundle_circumference_37": "",
    "in_38": "",
    "cm_39": "",
    "mm_40": "",
    "tip_25_bundle_1_cup_cooked_spaghetti_41": "",
    "calculate_42": "",
    "reset_43": "",
    "results_44": "",
    "pasta_type_45": "",
    "shaped_cooking_46": "",
    "ratio_47": "",
    "x_48": "",
    "dry_volume_49": "",
    "cooked_volume_50": "",
    "bundle_circumference_51": "",
    "cooked_volume_52": "",
    "cups_53": "",
    "additional_conversions_54": "",
    "cups_55": "",
    "pints_56": "",
    "liters_57": "",
    "formula_used_58": "",
    "short_pasta_59": "",
    "cooked_volume_dry_volume_expansion_ratio_60": "",
    "long_pasta_61": "",
    "cooked_volume_circumference_25_ratio_62": "",
    "k_25_63": "",
    "note_values_are_estimates_exact_yield_varies_by_pa_64": "",
    "select_pasta_type_and_enter_measurements_to_see_co_65": "",
    "understanding_pasta_conversion_66": "",
    "expansion_ratios_67": "",
    "short_pasta_68": "",
    "typically_expands_152x_when_cooked_default_19x_69": "",
    "long_pasta_70": "",
    "k_25_dry_bundle_1_cup_cooked_pasta_71": "",
    "cooking_preference_72": "",
    "al_dente_uses_lower_ratios_soft_uses_higher_ratios_73": "",
    "example_calculations_74": "",
    "short_pasta_example_75": "",
    "k_1_cup_dry_penne_19_19_cups_cooked_penne_76": "",
    "long_pasta_example_77": "",
    "k_25_dry_spaghetti_bundle_1_cup_cooked_spaghetti_78": "",
    "practical_tips_79": "",
    "recipe_planning_80": "",
    "use_these_conversions_to_determine_how_much_dry_pa_81": "",
    "portion_control_82": "",
    "k_1_cup_cooked_pasta_1_serving_for_most_dishes_83": "",
    "meal_prep_84": "",
    "calculate_cooking_amounts_for_weekly_meal_preparat_85": "",
    "leftover_management_86": "",
    "convert_cooked_pasta_back_to_dry_equivalents_for_s_87": "",
    "pasta_conversion_calculator_0": "",
    "select_pasta_type_enter_measurements_and_get_accur_1": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [pastaType, setPastaType] = useState<string>("short");
  const [specificPastaType, setSpecificPastaType] = useState<string>("penne");
  const [cookingPreference, setCookingPreference] = useState<string>("normal");
  const [expansionRatio, setExpansionRatio] = useState<number[]>([1.9]);
  const [dryVolume, setDryVolume] = useState<string>("");
  const [volumeUnit, setVolumeUnit] = useState<string>("cups");
  const [bundleCircumference, setBundleCircumference] = useState<string>("");
  const [circumferenceUnit, setCircumferenceUnit] = useState<string>("inches");
  const validateInputs = (): boolean => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (pastaType === "short") {
      const volumeValue = getNumericValue(dryVolume);
      if (volumeValue <= 0) {
        newErrors.dryVolume = "Please enter a valid dry volume";
      }
    } else {
      const circumferenceValue = getNumericValue(bundleCircumference);
      if (circumferenceValue <= 0) {
        newErrors.bundleCircumference = "Please enter a valid bundle circumference";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0;
  };

  // Convert volume units to cups for standardization
  const convertToCups = (value: number, unit: string): number => {
    switch (unit) {
      case "cups":
        return value;
      case "ml":
        return value / 236.588;
      // 1 cup = 236.588 ml
      case "cm3":
        return value / 236.588;
      // 1 cup = 236.588 cm³
      case "l":
        return value * 4.22675;
      // 1 liter = 4.22675 cups
      case "pints":
        return value * 2;
      // 1 pint = 2 cups
      case "fl-oz":
        return value / 8;
      // 1 cup = 8 fl oz
      case "tbsp":
        return value / 16;
      // 1 cup = 16 tbsp
      case "tsp":
        return value / 48;
      // 1 cup = 48 tsp
      default:
        return value;
    }
  };

  // Convert cups back to desired unit
  const convertFromCups = (value: number, unit: string): number => {
    switch (unit) {
      case "cups":
        return value;
      case "ml":
        return value * 236.588;
      case "cm3":
        return value * 236.588;
      case "l":
        return value / 4.22675;
      case "pints":
        return value / 2;
      case "fl-oz":
        return value * 8;
      case "tbsp":
        return value * 16;
      case "tsp":
        return value * 48;
      default:
        return value;
    }
  };

  // Convert circumference units to inches for standardization
  const convertToInches = (value: number, unit: string): number => {
    switch (unit) {
      case "inches":
        return value;
      case "cm":
        return value / 2.54;
      // 1 inch = 2.54 cm
      case "mm":
        return value / 25.4;
      // 1 inch = 25.4 mm
      default:
        return value;
    }
  };
  const calculateResults = () => {
    if (!validateInputs()) {
      return;
    }
    let cookedVolumeCups = 0;
    let ratio = expansionRatio[0];

    // Adjust ratio based on cooking preference
    if (cookingPreference === "al-dente") {
      ratio = Math.max(1.5, ratio - 0.2);
    } else if (cookingPreference === "soft") {
      ratio = Math.min(2.0, ratio + 0.2);
    }
    if (pastaType === "short") {
      const dryVolumeCups = convertToCups(getNumericValue(dryVolume), volumeUnit);
      cookedVolumeCups = dryVolumeCups * ratio;
    } else {
      const circumferenceInches = convertToInches(getNumericValue(bundleCircumference), circumferenceUnit);
      cookedVolumeCups = circumferenceInches / 2.5 * ratio;
    }
    const cookedVolumeOriginalUnit = pastaType === "short" ? convertFromCups(cookedVolumeCups, volumeUnit) : cookedVolumeCups;
    const newResult = {
      pastaType,
      specificPastaType,
      cookingPreference,
      expansionRatio: ratio,
      dryVolume: getNumericValue(dryVolume),
      volumeUnit,
      bundleCircumference: getNumericValue(bundleCircumference),
      circumferenceUnit,
      cookedVolumeCups,
      cookedVolumeOriginalUnit,
      cookedVolumePints: cookedVolumeCups / 2,
      cookedVolumeLiters: cookedVolumeCups * 0.236588
    };
    setResult(newResult);
    setShowResult(true);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  const resetCalculator = () => {
    setPastaType("short");
    setSpecificPastaType("penne");
    setCookingPreference("normal");
    setExpansionRatio([1.9]);
    setDryVolume("");
    setVolumeUnit("cups");
    setBundleCircumference("");
    setCircumferenceUnit("inches");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Wheat className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Wheat className="w-6 h-6 text-green-600" />
                      <span>{contentData.pasta_conversion_calculator_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.select_pasta_type_enter_measurements_and_get_accur_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      <div>
                        <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.type_of_pasta_2}</Label>
                        <RadioGroup value={pastaType} onValueChange={setPastaType} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="short" id="short" />
                            <Label htmlFor="short" className="text-sm font-medium">{contentData.shortshaped_pasta_3}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="long" id="long" />
                            <Label htmlFor="long" className="text-sm font-medium">{contentData.longshaped_pasta_4}</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.specific_pasta_type_5}</Label>
                        <Select value={specificPastaType} onValueChange={setSpecificPastaType}>
                          <SelectTrigger className="w-full h-12 border-2 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {pastaType === "short" ? <>
                                <SelectItem value="penne">{contentData.penne_6}</SelectItem>
                                <SelectItem value="macaroni">{contentData.macaroni_7}</SelectItem>
                                <SelectItem value="fusilli">{contentData.fusilli_8}</SelectItem>
                                <SelectItem value="rigatoni">{contentData.rigatoni_9}</SelectItem>
                                <SelectItem value="farfalle">{contentData.farfalle_bowtie_10}</SelectItem>
                                <SelectItem value="rotini">{contentData.rotini_11}</SelectItem>
                                <SelectItem value="shells">{contentData.shells_conchiglie_12}</SelectItem>
                                <SelectItem value="elbow">{contentData.elbow_13}</SelectItem>
                              </> : <>
                                <SelectItem value="spaghetti">{contentData.spaghetti_14}</SelectItem>
                                <SelectItem value="linguine">{contentData.linguine_15}</SelectItem>
                                <SelectItem value="fettuccine">{contentData.fettuccine_16}</SelectItem>
                                <SelectItem value="angel-hair">{contentData.angel_hair_17}</SelectItem>
                                <SelectItem value="pappardelle">{contentData.pappardelle_18}</SelectItem>
                                <SelectItem value="tagliatelle">{contentData.tagliatelle_19}</SelectItem>
                                <SelectItem value="bucatini">{contentData.bucatini_20}</SelectItem>
                              </>}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.cooking_preference_21}</Label>
                        <RadioGroup value={cookingPreference} onValueChange={setCookingPreference} className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="al-dente" id="al-dente" />
                            <Label htmlFor="al-dente" className="text-sm font-medium">{contentData.al_dente_22}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="normal" />
                            <Label htmlFor="normal" className="text-sm font-medium">{contentData.normal_23}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="soft" id="soft" />
                            <Label htmlFor="soft" className="text-sm font-medium">{contentData.soft_24}</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {pastaType === "short" ? <div className="space-y-6">
                          <div>
                            <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.dry_volume_25}</Label>
                            <div className="flex space-x-2">
                              <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Wheat className="h-5 w-5 text-green-500" />
                                </div>
                                <Input className={`pl-10 h-12 rounded-xl border-green-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${errors.dryVolume ? "border-red-500" : ""}`} type="number" step="0.1" min="0" value={dryVolume} onChange={e => {
                              setDryVolume(e.target.value);
                              setErrors({
                                ...errors,
                                dryVolume: ""
                              });
                            }} placeholder="1.0" />
                              </div>
                              <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                                <SelectTrigger className="w-20 h-12 border-2 focus:border-green-500">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cups">{contentData.cups_26}</SelectItem>
                                  <SelectItem value="ml">{contentData.ml_27}</SelectItem>
                                  <SelectItem value="l">{contentData.l_28}</SelectItem>
                                  <SelectItem value="fl-oz">{contentData.fl_oz_29}</SelectItem>
                                  <SelectItem value="pints">{contentData.pints_30}</SelectItem>
                                  <SelectItem value="tbsp">{contentData.tbsp_31}</SelectItem>
                                  <SelectItem value="tsp">{contentData.tsp_32}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {errors.dryVolume && <p className="text-red-500 text-xs mt-1">{errors.dryVolume}</p>}
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.expansion_ratio_33}{expansionRatio[0].toFixed(1)}{contentData.x_34}</Label>
                            <Slider value={expansionRatio} onValueChange={setExpansionRatio} max={2.0} min={1.5} step={0.1} className="w-full" />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>{contentData.k_15x_firmer_35}</span>
                              <span>{contentData.k_20x_softer_36}</span>
                            </div>
                          </div>
                        </div> : <div>
                          <Label className="text-sm font-medium text-green-800 mb-3 block">{contentData.dry_bundle_circumference_37}</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Wheat className="h-5 w-5 text-green-500" />
                              </div>
                              <Input className={`pl-10 h-12 rounded-xl border-green-200 focus:border-green-400 focus:ring-green-200 shadow-sm ${errors.bundleCircumference ? "border-red-500" : ""}`} type="number" step="0.1" min="0" value={bundleCircumference} onChange={e => {
                            setBundleCircumference(e.target.value);
                            setErrors({
                              ...errors,
                              bundleCircumference: ""
                            });
                          }} placeholder="2.5" />
                            </div>
                            <Select value={circumferenceUnit} onValueChange={setCircumferenceUnit}>
                              <SelectTrigger className="w-20 h-12 border-2 focus:border-green-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="inches">{contentData.in_38}</SelectItem>
                                <SelectItem value="cm">{contentData.cm_39}</SelectItem>
                                <SelectItem value="mm">{contentData.mm_40}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.bundleCircumference && <p className="text-red-500 text-xs mt-1">{errors.bundleCircumference}</p>}
                          <p className="text-xs text-gray-500 mt-1">{contentData.tip_25_bundle_1_cup_cooked_spaghetti_41}</p>
                        </div>}

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button onClick={calculateResults} className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                          <Calculator className="w-5 h-5 mr-2" />{contentData.calculate_42}</Button>
                        <Button onClick={resetCalculator} variant="outline" className="h-14 px-6 text-lg font-semibold border-green-300 text-green-600 hover:bg-green-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent">
                          <RotateCcw className="w-5 h-5 mr-2" />{contentData.reset_43}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-1">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-teal-50 sticky top-24 h-fit">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg">
                      <Wheat className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.results_44}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="w-full space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-sm text-green-700 font-medium">{contentData.pasta_type_45}</p>
                          <p className="text-lg font-semibold text-gray-800 capitalize">{result.specificPastaType}</p>
                          <p className="text-sm text-gray-600">
                            {result.pastaType}{contentData.shaped_cooking_46}{result.cookingPreference}{contentData.ratio_47}{" "}
                            {result.expansionRatio.toFixed(1)}{contentData.x_48}</p>
                        </div>

                        {result.pastaType === "short" ? <>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <p className="text-sm text-green-700 font-medium">{contentData.dry_volume_49}</p>
                              <p className="text-lg font-semibold text-gray-800">
                                {result.dryVolume} {result.volumeUnit}
                              </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg border border-green-300">
                              <p className="text-sm text-green-700 font-medium">{contentData.cooked_volume_50}</p>
                              <p className="text-3xl font-bold text-green-900">
                                {result.cookedVolumeOriginalUnit.toFixed(1)}
                              </p>
                              <p className="text-sm text-green-600">{result.volumeUnit}</p>
                            </div>
                          </> : <>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                              <p className="text-sm text-green-700 font-medium">{contentData.bundle_circumference_51}</p>
                              <p className="text-lg font-semibold text-gray-800">
                                {result.bundleCircumference} {result.circumferenceUnit}
                              </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg border border-green-300">
                              <p className="text-sm text-green-700 font-medium">{contentData.cooked_volume_52}</p>
                              <p className="text-3xl font-bold text-green-900">{result.cookedVolumeCups.toFixed(1)}</p>
                              <p className="text-sm text-green-600">{contentData.cups_53}</p>
                            </div>
                          </>}

                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-gray-800 mb-3">{contentData.additional_conversions_54}</h4>
                          <div className="text-sm space-y-1 text-gray-700">
                            <p>• {result.cookedVolumeCups.toFixed(1)}{contentData.cups_55}</p>
                            <p>• {result.cookedVolumePints.toFixed(1)}{contentData.pints_56}</p>
                            <p>• {result.cookedVolumeLiters.toFixed(1)}{contentData.liters_57}</p>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-gray-800 mb-3">{contentData.formula_used_58}</h4>
                          <div className="text-sm space-y-2 text-gray-700">
                            {result.pastaType === "short" ? <div className="p-2 bg-green-50 rounded border border-green-200">
                                <strong>{contentData.short_pasta_59}</strong>
                                <br />{contentData.cooked_volume_dry_volume_expansion_ratio_60}<br />
                                {result.cookedVolumeOriginalUnit.toFixed(1)} = {result.dryVolume} ×{" "}
                                {result.expansionRatio.toFixed(1)}
                              </div> : <div className="p-2 bg-green-50 rounded border border-green-200">
                                <strong>{contentData.long_pasta_61}</strong>
                                <br />{contentData.cooked_volume_circumference_25_ratio_62}<br />
                                {result.cookedVolumeCups.toFixed(1)} = ({result.bundleCircumference}{contentData.k_25_63}{" "}
                                {result.expansionRatio.toFixed(1)}
                              </div>}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <p className="text-xs text-gray-600 italic">{contentData.note_values_are_estimates_exact_yield_varies_by_pa_64}</p>
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <Wheat className="w-8 h-8 text-green-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.select_pasta_type_and_enter_measurements_to_see_co_65}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-teal-50 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center mr-3 shadow-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight">{contentData.understanding_pasta_conversion_66}</CardTitle>
                </CardHeader>
                <CardContent className="w-full space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.expansion_ratios_67}</h3>
                    <div className="bg-white p-4 rounded-lg border border-green-200 space-y-2">
                      <p className="text-gray-700">
                        <strong>{contentData.short_pasta_68}</strong>{contentData.typically_expands_152x_when_cooked_default_19x_69}</p>
                      <p className="text-gray-700">
                        <strong>{contentData.long_pasta_70}</strong>{contentData.k_25_dry_bundle_1_cup_cooked_pasta_71}</p>
                      <p className="text-gray-700">
                        <strong>{contentData.cooking_preference_72}</strong>{contentData.al_dente_uses_lower_ratios_soft_uses_higher_ratios_73}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.example_calculations_74}</h3>
                    <div className="bg-white p-4 rounded-lg border border-green-200 space-y-3">
                      <div>
                        <p className="text-gray-700 font-medium">{contentData.short_pasta_example_75}</p>
                        <p className="text-sm text-gray-600">{contentData.k_1_cup_dry_penne_19_19_cups_cooked_penne_76}</p>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">{contentData.long_pasta_example_77}</p>
                        <p className="text-sm text-gray-600">{contentData.k_25_dry_spaghetti_bundle_1_cup_cooked_spaghetti_78}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.practical_tips_79}</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>
                        <strong>{contentData.recipe_planning_80}</strong>{contentData.use_these_conversions_to_determine_how_much_dry_pa_81}</li>
                      <li>
                        <strong>{contentData.portion_control_82}</strong>{contentData.k_1_cup_cooked_pasta_1_serving_for_most_dishes_83}</li>
                      <li>
                        <strong>{contentData.meal_prep_84}</strong>{contentData.calculate_cooking_amounts_for_weekly_meal_preparat_85}</li>
                      <li>
                        <strong>{contentData.leftover_management_86}</strong>{contentData.convert_cooked_pasta_back_to_dry_equivalents_for_s_87}</li>
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