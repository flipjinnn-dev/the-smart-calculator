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
import CalculatorGuide from "@/components/calculator-guide";
import { Calculator, RotateCcw, Scale, Coffee, ChefHat } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SimilarCalculators from "@/components/similar-calculators";
const ingredients = [{
  name: "All-purpose flour",
  density: 0.593
}, {
  name: "Granulated sugar",
  density: 0.845
}, {
  name: "Brown sugar (packed)",
  density: 0.9
}, {
  name: "Powdered sugar",
  density: 0.56
}, {
  name: "Butter",
  density: 0.911
}, {
  name: "Vegetable oil",
  density: 0.92
}, {
  name: "Milk (whole)",
  density: 1.03
}, {
  name: "Water",
  density: 1.0
}, {
  name: "Honey",
  density: 1.42
}, {
  name: "Rice (uncooked)",
  density: 0.753
}, {
  name: "Oats (rolled)",
  density: 0.432
}, {
  name: "Cocoa powder",
  density: 0.641
}, {
  name: "Salt",
  density: 1.217
}, {
  name: "Baking powder",
  density: 1.52
}, {
  name: "Custom",
  density: 1.0
}];
export default function CupsToPoundsConverterCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('cups-to-pounds-converter', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'cups-to-pounds-converter',  // Calculator name
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
    "conversion_direction_2": "",
    "cups_pounds_3": "",
    "pounds_cups_4": "",
    "select_ingredient_5": "",
    "density_gml_6": "",
    "convert_7": "",
    "reset_8": "",
    "results_9": "",
    "ingredient_10": "",
    "density_11": "",
    "gml_12": "",
    "lbcup_13": "",
    "input_14": "",
    "cups_15": "",
    "equivalent_weight_16": "",
    "pounds_17": "",
    "input_18": "",
    "pounds_19": "",
    "equivalent_volume_20": "",
    "cups_21": "",
    "formula_used_22": "",
    "cups_pounds_23": "",
    "lb_cups_gml_19172_24": "",
    "lb_25": "",
    "k_19172_26": "",
    "pounds_27": "",
    "pounds_cups_28": "",
    "cups_lb_19172_gml_29": "",
    "cups_30": "",
    "k_19172_31": "",
    "cups_32": "",
    "conversion_factor_33": "",
    "k_1_us_cup_236588_ml_34": "",
    "conversion_factor_19172_gml_lbcup_35": "",
    "select_conversion_direction_choose_an_ingredient_a_36": "",
    "understanding_cups_to_pounds_conversion_37": "",
    "core_formulas_38": "",
    "cups_pounds_39": "",
    "lb_cups_gml_19172_40": "",
    "pounds_cups_41": "",
    "cups_lb_19172_gml_42": "",
    "constants_43": "",
    "k_1_us_cup_236588_ml_conversion_factor_19172_44": "",
    "example_calculation_45": "",
    "convert_2_cups_of_allpurpose_flour_to_pounds_46": "",
    "flour_density_0593_gml_47": "",
    "formula_lb_2_0593_19172_48": "",
    "result_lb_1186_19172_062_pounds_49": "",
    "practical_applications_50": "",
    "recipe_scaling_51": "",
    "convert_volume_measurements_to_weight_for_more_acc_52": "",
    "professional_baking_53": "",
    "use_weight_measurements_for_consistent_results_54": "",
    "ingredient_shopping_55": "",
    "calculate_much_to_buy_when_recipes_use_different_u_56": "",
    "nutritional_analysis_57": "",
    "convert_between_volume_and_weight_for_accurate_nut_58": "",
    "cups_pounds_conversion_0": "",
    "select_conversion_direction_choose_an_ingredient_a_1": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [conversionMode, setConversionMode] = useState<string>("cups-to-pounds");
  const [selectedIngredient, setSelectedIngredient] = useState<string>("All-purpose flour");
  const [density, setDensity] = useState<string>("0.593");
  const [cups, setCups] = useState<string>("");
  const [pounds, setPounds] = useState<string>("");
  const handleIngredientChange = (ingredientName: string) => {
    setSelectedIngredient(ingredientName);
    const ingredient = ingredients.find(ing => ing.name === ingredientName);
    if (ingredient) {
      setDensity(ingredient.density.toString());
    }
    setErrors({});
  };
  const validateInputs = (): boolean => {
    const newErrors: {
      [key: string]: string;
    } = {};
    const densityValue = getNumericValue(density);
    const cupsValue = getNumericValue(cups);
    const poundsValue = getNumericValue(pounds);
    if (densityValue <= 0) {
      newErrors.density = "Density must be greater than 0";
    }
    if (conversionMode === "cups-to-pounds") {
      if (cupsValue <= 0) {
        newErrors.cups = "Please enter a valid number of cups";
      }
    } else {
      if (poundsValue <= 0) {
        newErrors.pounds = "Please enter a valid number of pounds";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Convert empty strings to 0 for calculations
  const getNumericValue = (value: string): number => {
    return value === "" ? 0 : Number(value) || 0;
  };
  const calculateResults = () => {
    if (!validateInputs()) {
      return;
    }
    const densityValue = getNumericValue(density); // g/mL
    const cupsValue = getNumericValue(cups);
    const poundsValue = getNumericValue(pounds);
    let calculatedPounds = 0;
    let calculatedCups = 0;
    let densityInLbPerCup = 0;
    densityInLbPerCup = densityValue / 1.9172;
    if (conversionMode === "cups-to-pounds") {
      calculatedPounds = cupsValue * densityValue / 1.9172;
    } else {
      calculatedCups = poundsValue * 1.9172 / densityValue;
    }
    const newResult = {
      conversionMode,
      ingredient: selectedIngredient,
      densityGmL: densityValue,
      densityLbCup: densityInLbPerCup,
      inputCups: cupsValue,
      inputPounds: poundsValue,
      calculatedPounds,
      calculatedCups
    };
    setResult(newResult);
    setShowResult(true);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  const resetCalculator = () => {
    setConversionMode("cups-to-pounds");
    setSelectedIngredient("All-purpose flour");
    setDensity("0.593");
    setCups("");
    setPounds("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Coffee className="w-8 h-8 text-white" />
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
                    <Coffee className="w-6 h-6 text-orange-600" />
                    <span>{contentData.cups_pounds_conversion_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.select_conversion_direction_choose_an_ingredient_a_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div>
                      <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.conversion_direction_2}</Label>
                      <RadioGroup value={conversionMode} onValueChange={setConversionMode} className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cups-to-pounds" id="cups-to-pounds" />
                          <Label htmlFor="cups-to-pounds" className="text-sm font-medium">{contentData.cups_pounds_3}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pounds-to-cups" id="pounds-to-cups" />
                          <Label htmlFor="pounds-to-cups" className="text-sm font-medium">{contentData.pounds_cups_4}</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.select_ingredient_5}</Label>
                        <Select value={selectedIngredient} onValueChange={handleIngredientChange}>
                          <SelectTrigger className="h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm">
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
                        <Label className="text-sm font-medium text-orange-800 mb-3 block">{contentData.density_gml_6}</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Scale className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input className={`pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.density ? "border-red-500" : ""}`} type="number" step="0.001" min="0" value={density} onChange={e => {
                            setDensity(e.target.value);
                            if (selectedIngredient !== "Custom") {
                              setSelectedIngredient("Custom");
                            }
                            setErrors({
                              ...errors,
                              density: ""
                            });
                          }} placeholder="0.593" />
                        </div>
                        {errors.density && <p className="text-red-500 text-xs mt-1">{errors.density}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm font-medium text-orange-800 mb-3 block">
                            {conversionMode === "cups-to-pounds" ? "Cups (Input)" : "Cups (Result)"}
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Coffee className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className={`pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.cups ? "border-red-500" : ""}`} type="number" step="0.1" min="0" value={cups} onChange={e => {
                              setCups(e.target.value);
                              setErrors({
                                ...errors,
                                cups: ""
                              });
                            }} placeholder="0" disabled={conversionMode === "pounds-to-cups"} />
                          </div>
                          {errors.cups && <p className="text-red-500 text-xs mt-1">{errors.cups}</p>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-orange-800 mb-3 block">
                            {conversionMode === "pounds-to-cups" ? "Pounds (Input)" : "Pounds (Result)"}
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Scale className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input className={`pl-10 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm ${errors.pounds ? "border-red-500" : ""}`} type="number" step="0.01" min="0" value={pounds} onChange={e => {
                              setPounds(e.target.value);
                              setErrors({
                                ...errors,
                                pounds: ""
                              });
                            }} placeholder="0" disabled={conversionMode === "cups-to-pounds"} />
                          </div>
                          {errors.pounds && <p className="text-red-500 text-xs mt-1">{errors.pounds}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <Button onClick={calculateResults} className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Calculator className="w-5 h-5 mr-2" />{contentData.convert_7}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-14 px-6 text-lg font-semibold border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent">
                        <RotateCcw className="w-5 h-5 mr-2" />{contentData.reset_8}</Button>
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
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.results_9}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="w-full space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-700 font-medium">{contentData.ingredient_10}</p>
                      <p className="text-lg font-semibold text-gray-800">{result.ingredient}</p>
                      <p className="text-sm text-gray-600">{contentData.density_11}{result.densityGmL.toFixed(3)}{contentData.gml_12}{result.densityLbCup.toFixed(3)}{contentData.lbcup_13}</p>
                    </div>

                    {result.conversionMode === "cups-to-pounds" ? <>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-700 font-medium">{contentData.input_14}</p>
                        <p className="text-lg font-semibold text-gray-800">{result.inputCups}{contentData.cups_15}</p>
                      </div>

                      <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border border-orange-300">
                        <p className="text-sm text-orange-700 font-medium">{contentData.equivalent_weight_16}</p>
                        <p className="text-3xl font-bold text-orange-900">{result.calculatedPounds.toFixed(2)}</p>
                        <p className="text-sm text-orange-600">{contentData.pounds_17}</p>
                      </div>
                    </> : <>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-sm text-orange-700 font-medium">{contentData.input_18}</p>
                        <p className="text-lg font-semibold text-gray-800">{result.inputPounds}{contentData.pounds_19}</p>
                      </div>

                      <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg border border-orange-300">
                        <p className="text-sm text-orange-700 font-medium">{contentData.equivalent_volume_20}</p>
                        <p className="text-3xl font-bold text-orange-900">{result.calculatedCups.toFixed(2)}</p>
                        <p className="text-sm text-orange-600">{contentData.cups_21}</p>
                      </div>
                    </>}

                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-gray-800 mb-3">{contentData.formula_used_22}</h4>
                      <div className="text-sm space-y-2 text-gray-700">
                        {result.conversionMode === "cups-to-pounds" ? <div className="p-2 bg-orange-50 rounded border border-orange-200">
                          <strong>{contentData.cups_pounds_23}</strong>
                          <br />{contentData.lb_cups_gml_19172_24}<br />{contentData.lb_25}{result.inputCups} × {result.densityGmL.toFixed(3)}{contentData.k_19172_26}{" "}
                          {result.calculatedPounds.toFixed(2)}{contentData.pounds_27}</div> : <div className="p-2 bg-orange-50 rounded border border-orange-200">
                          <strong>{contentData.pounds_cups_28}</strong>
                          <br />{contentData.cups_lb_19172_gml_29}<br />{contentData.cups_30}{result.inputPounds}{contentData.k_19172_31}{result.densityGmL.toFixed(3)} ={" "}
                          {result.calculatedCups.toFixed(2)}{contentData.cups_32}</div>}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-gray-800 mb-2">{contentData.conversion_factor_33}</h4>
                      <p className="text-sm text-gray-700">{contentData.k_1_us_cup_236588_ml_34}<br />{contentData.conversion_factor_19172_gml_lbcup_35}</p>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Coffee className="w-8 h-8 text-orange-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.select_conversion_direction_choose_an_ingredient_a_36}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Butter Conversion Calculator",
            calculatorHref: "/food/butter-calculator",
          }, {
            calculatorName: "Cake Pan Calculator",
            calculatorHref: "/food/cake-pan-calculator",
          }, {
            calculatorName: "Cooking Measurement Converter",
            calculatorHref: "/food/cooking-measurement-converter",
          }
          ]}
            color="orange"
            title="Related Food Calculators" />
          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-amber-50 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center mr-3 shadow-lg">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.understanding_cups_to_pounds_conversion_37}</CardTitle>
              </CardHeader>
              <CardContent className="w-full space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.core_formulas_38}</h3>
                  <div className="bg-white p-4 rounded-lg border border-orange-200 space-y-2">
                    <p className="text-gray-700">
                      <strong>{contentData.cups_pounds_39}</strong>{contentData.lb_cups_gml_19172_40}</p>
                    <p className="text-gray-700">
                      <strong>{contentData.pounds_cups_41}</strong>{contentData.cups_lb_19172_gml_42}</p>
                    <p className="text-gray-700">
                      <strong>{contentData.constants_43}</strong>{contentData.k_1_us_cup_236588_ml_conversion_factor_19172_44}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.example_calculation_45}</h3>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="text-gray-700 mb-2">
                      <strong>{contentData.convert_2_cups_of_allpurpose_flour_to_pounds_46}</strong>
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{contentData.flour_density_0593_gml_47}</p>
                      <p>{contentData.formula_lb_2_0593_19172_48}</p>
                      <p>{contentData.result_lb_1186_19172_062_pounds_49}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{contentData.practical_applications_50}</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>
                      <strong>{contentData.recipe_scaling_51}</strong>{contentData.convert_volume_measurements_to_weight_for_more_acc_52}</li>
                    <li>
                      <strong>{contentData.professional_baking_53}</strong>{contentData.use_weight_measurements_for_consistent_results_54}</li>
                    <li>
                      <strong>{contentData.ingredient_shopping_55}</strong>{contentData.calculate_much_to_buy_when_recipes_use_different_u_56}</li>
                    <li>
                      <strong>{contentData.nutritional_analysis_57}</strong>{contentData.convert_between_volume_and_weight_for_accurate_nut_58}</li>
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