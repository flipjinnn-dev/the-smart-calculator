"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Calculator, AlertTriangle, Activity, RotateCcw, HelpCircle, Apple } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';


interface WeightWatchersPointsCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function WeightWatchersPointsCalculatorClient({ content, guideContent }: WeightWatchersPointsCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [calories, setCalories] = useState("");
  const [saturatedFat, setSaturatedFat] = useState("");
  const [sugar, setSugar] = useState("");
  const [protein, setProtein] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!calories || Number.parseFloat(calories) < 0) {
      newErrors.calories = "Please enter valid calories (≥0)";
    }
    if (!saturatedFat || Number.parseFloat(saturatedFat) < 0) {
      newErrors.saturatedFat = "Please enter valid saturated fat (≥0)";
    }
    if (!sugar || Number.parseFloat(sugar) < 0) {
      newErrors.sugar = "Please enter valid sugar (≥0)";
    }
    if (!protein || Number.parseFloat(protein) < 0) {
      newErrors.protein = "Please enter valid protein (≥0)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculatePoints = () => {
    if (!validateInputs()) return;
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const caloriesValue = Number.parseFloat(calories);
    const saturatedFatValue = Number.parseFloat(saturatedFat);
    const sugarValue = Number.parseFloat(sugar);
    const proteinValue = Number.parseFloat(protein);

    // Weight Watchers SmartPoints Formula (2015-2021)
    const rawPoints = 0.0305 * caloriesValue + 0.275 * saturatedFatValue + 0.12 * sugarValue - 0.098 * proteinValue;
    const smartPoints = Math.round(rawPoints);

    // Ensure minimum of 0 points
    const finalPoints = Math.max(0, smartPoints);

    // Calculate for display
    const caloriesContribution = 0.0305 * caloriesValue;
    const saturatedFatContribution = 0.275 * saturatedFatValue;
    const sugarContribution = 0.12 * sugarValue;
    const proteinContribution = 0.098 * proteinValue;
    setResult({
      smartPoints: finalPoints,
      rawPoints: rawPoints,
      breakdown: {
        calories: caloriesContribution,
        saturatedFat: saturatedFatContribution,
        sugar: sugarContribution,
        protein: proteinContribution
      },
      inputs: {
        calories: caloriesValue,
        saturatedFat: saturatedFatValue,
        sugar: sugarValue,
        protein: proteinValue
      }
    });
    setShowResult(true);
  };
  const resetCalculator = () => {
    setCalories("");
    setSaturatedFat("");
    setSugar("");
    setProtein("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  return <>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Apple className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-purple-600" />
                      <span>{contentData.smartpoints_calculation_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_nutritional_information_to_calculate_weight__1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      {/* Calories */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.calories_kcal_2}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.total_calories_in_the_food_item_3}</div>
                          </div>
                        </Label>
                        <Input className={`h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.calories ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Enter calories" value={calories} onChange={e => {
                        setCalories(e.target.value);
                        if (errors.calories) setErrors(prev => ({
                          ...prev,
                          calories: ""
                        }));
                      }} />
                        {errors.calories && <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.calories}</span>
                          </div>}
                      </div>

                      {/* Saturated Fat */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.saturated_fat_grams_4}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.saturated_fat_content_in_grams_5}</div>
                          </div>
                        </Label>
                        <Input className={`h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.saturatedFat ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" min="0" placeholder="Enter saturated fat" value={saturatedFat} onChange={e => {
                        setSaturatedFat(e.target.value);
                        if (errors.saturatedFat) setErrors(prev => ({
                          ...prev,
                          saturatedFat: ""
                        }));
                      }} />
                        {errors.saturatedFat && <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.saturatedFat}</span>
                          </div>}
                      </div>

                      {/* Sugar */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.sugar_grams_6}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.total_sugar_content_in_grams_7}</div>
                          </div>
                        </Label>
                        <Input className={`h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.sugar ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" min="0" placeholder="Enter sugar" value={sugar} onChange={e => {
                        setSugar(e.target.value);
                        if (errors.sugar) setErrors(prev => ({
                          ...prev,
                          sugar: ""
                        }));
                      }} />
                        {errors.sugar && <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.sugar}</span>
                          </div>}
                      </div>

                      {/* Protein */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.protein_grams_8}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.protein_content_in_grams_reduces_points_9}</div>
                          </div>
                        </Label>
                        <Input className={`h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.protein ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" min="0" placeholder="Enter protein" value={protein} onChange={e => {
                        setProtein(e.target.value);
                        if (errors.protein) setErrors(prev => ({
                          ...prev,
                          protein: ""
                        }));
                      }} />
                        {errors.protein && <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.protein}</span>
                          </div>}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-700">
                        <strong>{contentData.smartpoints_formula_20152021_10}</strong>{contentData.points_00305_calories_0275_saturated_fat_012_sugar_11}</p>
                      <p className="text-xs text-gray-600 mt-1">{contentData.result_is_rounded_to_the_nearest_whole_number_12}</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculatePoints} className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800">{contentData.calculate_13}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_14}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-indigo-100 h-full">
                  <CardHeader className="w-full text-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Apple className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.smartpoints_15}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full text-center">
                    {showResult && result ? <div className="space-y-4">
                        <div className="bg-white p-6 rounded-lg border-2 border-purple-400">
                          <p className="text-4xl font-bold text-purple-900">{result.smartPoints}</p>
                          <p className="text-purple-600">{contentData.points_16}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600">{contentData.weight_watchers_17}</p>
                          <p className="text-sm text-gray-600">{contentData.smartpoints_value_18}</p>
                        </div>
                      </div> : <div className="text-center">
                        <Apple className="w-8 h-8 text-purple-300 mb-2 mx-auto" />
                        <p className="text-gray-500 text-base">{contentData.enter_nutritional_information_then_click_19}{" "}
                          <span className="font-semibold text-purple-600">{contentData.calculate_20}</span>{contentData.to_see_smartpoints_21}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <span>{contentData.smartpoints_calculation_breakdown_22}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-400">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Apple className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-800 mb-2">{contentData.smartpoints_value_23}</h3>
                        <p className="text-4xl font-bold text-purple-900 mb-1">{result.smartPoints}</p>
                        <p className="text-sm text-purple-700">{contentData.points_24}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2">{contentData.raw_calculation_25}</h3>
                        <p className="text-2xl font-bold text-indigo-900 mb-1">{result.rawPoints.toFixed(2)}</p>
                        <p className="text-sm text-indigo-600">{contentData.before_rounding_26}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">{contentData.calculation_breakdown_27}</h4>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>{contentData.calories_28}{result.inputs.calories}{contentData.k_00305_29}</span>
                              <span className="font-medium">+{result.breakdown.calories.toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{contentData.saturated_fat_30}{result.inputs.saturatedFat}{contentData.g_0275_31}</span>
                              <span className="font-medium">+{result.breakdown.saturatedFat.toFixed(3)}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>{contentData.sugar_32}{result.inputs.sugar}{contentData.g_012_33}</span>
                              <span className="font-medium">+{result.breakdown.sugar.toFixed(3)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{contentData.protein_34}{result.inputs.protein}{contentData.g_0098_35}</span>
                              <span className="font-medium text-green-600">-{result.breakdown.protein.toFixed(3)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-300 mt-3 pt-3">
                          <div className="flex justify-between font-semibold">
                            <span>{contentData.total_raw_points_36}</span>
                            <span>{result.rawPoints.toFixed(3)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-purple-700">
                            <span>{contentData.final_smartpoints_rounded_37}</span>
                            <span>{result.smartPoints}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "Overweight Calculator",
          calculatorHref: "/health/overweight-calculator",
        }, {
          calculatorName: "Ideal Weight Calculator",
          calculatorHref: "/health/ideal-weight-calculator",
        }, {
          calculatorName: "Healthy Weight Calculator",
          calculatorHref: "/health/healthy-weight-calculator",
        }
        ]} 
        color="purple" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center mr-3 shadow-lg">
                    <Apple className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.understanding_weight_watchers_smartpoints_38}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.smartpoints_formula_20152021_39}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <div className="space-y-2 text-gray-700">
                          <div className="flex justify-between">
                            <span>{contentData.calories_40}</span>
                            <span className="font-medium">{contentData.k_00305_41}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{contentData.saturated_fat_42}</span>
                            <span className="font-medium">{contentData.k_0275_43}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{contentData.sugar_44}</span>
                            <span className="font-medium">{contentData.k_012_45}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{contentData.protein_46}</span>
                            <span className="font-medium text-green-600">{contentData.k_0098_47}</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.historical_context_48}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>
                            <strong>{contentData.before_2010_49}</strong>{contentData.original_points_calories_fat_fiber_50}</li>
                          <li>
                            <strong>{contentData.k_20102015_51}</strong>{contentData.pointsplus_protein_carbs_fat_fiber_52}</li>
                          <li>
                            <strong>{contentData.k_20152021_53}</strong>{contentData.smartpoints_this_calculator_54}</li>
                          <li>
                            <strong>{contentData.k_2022_55}</strong>{contentData.updated_formulas_with_more_factors_56}</li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.key_features_57}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>{contentData.protein_reduces_points_encourages_protein_intake_58}</li>
                          <li>{contentData.sugar_and_saturated_fat_increase_points_59}</li>
                          <li>{contentData.calories_form_the_base_calculation_60}</li>
                          <li>{contentData.result_is_rounded_to_nearest_whole_number_61}</li>
                          <li>{contentData.minimum_value_is_0_points_62}</li>
                        </ul>
                      </div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.usage_tips_63}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          <li>{contentData.use_nutrition_labels_for_accurate_values_64}</li>
                          <li>{contentData.track_all_ingredients_in_recipes_65}</li>
                          <li>{contentData.consider_portion_sizes_when_calculating_66}</li>
                          <li>{contentData.zeropoint_foods_dont_need_calculation_67}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-purple-100 rounded-lg border border-purple-300">
                    <div className="flex items-start space-x-2">
                      <Apple className="w-5 h-5 text-purple-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-1">{contentData.note_about_weight_watchers_68}</h4>
                        <p className="text-sm text-purple-700">{contentData.this_calculator_uses_the_smartpoints_formula_from__69}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How to Use Section */}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="weight-watchers-points-calculator"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <div className="mt-8">
            <CalculatorGuide data={guideData} />
          </div>

        </main>
      </div>
    </>;

}
