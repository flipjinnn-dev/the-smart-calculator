"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Wine, Calculator, Clock, AlertTriangle, Activity, RotateCcw, HelpCircle, Plus, Minus } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;
interface Drink {
  id: string;
  type: string;
  volume: string;
  volumeUnit: string;
  abv: string;
  quantity: string; // Added quantity field
}
export default function BacCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('bac-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('bac-calculator', language, "calculator-guide");

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
    "personal_information_drinks_0": "",
    "enter_your_information_and_alcohol_consumption_det_1": "",
    "personal_information_2": "",
    "gender_3": "",
    "male_4": "",
    "female_5": "",
    "age_6": "",
    "required_for_watson_body_water_calculation_7": "",
    "body_weight_8": "",
    "your_current_body_weight_9": "",
    "lb_10": "",
    "kg_11": "",
    "g_12": "",
    "height_13": "",
    "required_for_watson_body_water_calculation_14": "",
    "cm_15": "",
    "ft_16": "",
    "in_17": "",
    "time_since_first_drink_18": "",
    "time_elapsed_since_your_first_alcoholic_drink_19": "",
    "alcohol_consumed_20": "",
    "add_drink_21": "",
    "drink_22": "",
    "type_23": "",
    "beer_24": "",
    "wine_25": "",
    "liquor_26": "",
    "other_27": "",
    "quantity_28": "",
    "volume_29": "",
    "oz_30": "",
    "ml_31": "",
    "abv_32": "",
    "metric_widmark_formula_33": "",
    "bac_ag_r_wkg_10_t_34": "",
    "ag_alcohol_grams_r_distribution_ratio_male_068_fem_35": "",
    "calculate_36": "",
    "reset_37": "",
    "bac_results_38": "",
    "bac_39": "",
    "h_40": "",
    "until_sober_41": "",
    "standard_drinks_42": "",
    "enter_your_information_and_drinks_then_click_43": "",
    "calculate_44": "",
    "to_see_bac_45": "",
    "detailed_bac_analysis_46": "",
    "bac_level_47": "",
    "time_until_sober_48": "",
    "hours_49": "",
    "at_0017hour_elimination_50": "",
    "standard_drinks_51": "",
    "total_consumed_52": "",
    "pure_alcohol_53": "",
    "g_54": "",
    "total_grams_55": "",
    "calculation_steps_widmark_formula_56": "",
    "step_1_57": "",
    "total_alcohol_58": "",
    "g_volume_abv_0789_quantity_59": "",
    "step_2_60": "",
    "distribution_ratio_61": "",
    "metric_constant_62": "",
    "step_3_63": "",
    "initial_bac_64": "",
    "g_65": "",
    "kg_10_66": "",
    "step_4_67": "",
    "current_bac_68": "",
    "h_69": "",
    "important_disclaimer_70": "",
    "this_bac_calculator_provides_an_estimate_only_actu_71": "",
    "understanding_blood_alcohol_concentration_72": "",
    "what_is_bac_73": "",
    "blood_alcohol_concentration_bac_measures_the_amoun_74": "",
    "watson_vs_widmark_formula_75": "",
    "watson_uses_age_height_weight_and_gender_for_preci_76": "",
    "widmark_uses_simple_gender_constants_less_accurate_77": "",
    "elimination_rate_0017hour_more_accurate_than_0015_78": "",
    "alcohol_conversion_volume_abv_0789_density_79": "",
    "metric_widmark_formula_80": "",
    "formula_bac_ag_r_wkg_10_t_81": "",
    "distribution_ratios_male_068_female_055_metric_con_82": "",
    "elimination_rate_0017_per_hour_updated_standard_83": "",
    "alcohol_conversion_volumeml_abv_0789_density_84": "",
    "standard_drink_equivalents_85": "",
    "k_1_standard_drink_14g_pure_alcohol_86": "",
    "k_12_oz_beer_5_abv_87": "",
    "k_5_oz_wine_12_abv_88": "",
    "k_15_oz_liquor_40_abv_89": "",
    "elimination_rate_90": "",
    "the_liver_eliminates_alcohol_at_approximately_0017_91": "",
    "safety_note_92": "",
    "this_calculator_is_for_educational_purposes_only_n_93": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Input states
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("lb");
  const [age, setAge] = useState(""); // Added age for Watson formula
  const [height, setHeight] = useState(""); // Added height for Watson formula
  const [heightUnit, setHeightUnit] = useState("cm"); // Added height unit
  const [timeHours, setTimeHours] = useState("");
  const [timeMinutes, setTimeMinutes] = useState("");
  const [drinks, setDrinks] = useState<Drink[]>([{
    id: "1",
    type: "",
    volume: "",
    volumeUnit: "oz",
    abv: "",
    quantity: "1"
  }]); // Added quantity to initial drink

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const addDrink = () => {
    const newDrink: Drink = {
      id: Date.now().toString(),
      type: "",
      volume: "",
      volumeUnit: "oz",
      abv: "",
      quantity: "1" // Added default quantity
    };
    setDrinks([...drinks, newDrink]);
  };
  const removeDrink = (id: string) => {
    if (drinks.length > 1) {
      setDrinks(drinks.filter(drink => drink.id !== id));
    }
  };
  const updateDrink = (id: string, field: keyof Drink, value: string) => {
    setDrinks(prevDrinks => prevDrinks.map(drink => drink.id === id ? {
      ...drink,
      [field]: value
    } : drink));
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!gender) {
      newErrors.gender = "Please select gender";
    }
    if (!weight || Number.parseFloat(weight) <= 0) {
      newErrors.weight = "Please enter a valid weight";
    }
    if (!age || Number.parseFloat(age) <= 0 || Number.parseFloat(age) > 120) {
      newErrors.age = "Please enter a valid age (1-120)";
    }
    if (!height || Number.parseFloat(height) <= 0) {
      newErrors.height = "Please enter a valid height";
    }
    if (!timeHours && !timeMinutes) {
      newErrors.time = "Please enter time since first drink";
    }
    const totalHours = Number.parseFloat(timeHours || "0") + Number.parseFloat(timeMinutes || "0") / 60;
    if (totalHours < 0) {
      newErrors.time = "Time cannot be negative";
    }

    // Validate drinks
    let hasValidDrink = false;
    drinks.forEach((drink, index) => {
      if (drink.type && drink.volume && drink.abv && drink.quantity) {
        hasValidDrink = true;
        if (Number.parseFloat(drink.volume) <= 0) {
          newErrors[`drink_${index}_volume`] = "Volume must be greater than 0";
        }
        if (Number.parseFloat(drink.abv) <= 0 || Number.parseFloat(drink.abv) > 100) {
          newErrors[`drink_${index}_abv`] = "ABV must be between 0 and 100";
        }
        if (Number.parseFloat(drink.quantity) <= 0) {
          newErrors[`drink_${index}_quantity`] = "Quantity must be greater than 0";
        }
      }
    });
    if (!hasValidDrink) {
      newErrors.drinks = "Please add at least one complete drink";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateBAC = () => {
    if (!validateInputs()) return;
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    let weightInKg = Number.parseFloat(weight);
    if (weightUnit === "lb") {
      weightInKg = weightInKg / 2.20462262; // More precise conversion
    } else if (weightUnit === "g") {
      weightInKg = weightInKg / 1000;
    }

    // Calculate alcohol in grams using exact specification formula
    let totalAlcoholGrams = 0;
    drinks.forEach(drink => {
      if (drink.type && drink.volume && drink.abv && drink.quantity) {
        let volumeInMl = Number.parseFloat(drink.volume);
        if (drink.volumeUnit === "oz") {
          volumeInMl = volumeInMl * 29.57352956; // Exact oz to ml conversion
        }
        const abvDecimal = Number.parseFloat(drink.abv) / 100;
        const quantity = Number.parseFloat(drink.quantity);

        // Exact specification: Volume(ml) × ABV% / 100 × 0.789 × quantity
        const alcoholGrams = volumeInMl * abvDecimal * 0.789 * quantity;
        totalAlcoholGrams += alcoholGrams;
      }
    });
    const totalHours = Number.parseFloat(timeHours || "0") + Number.parseFloat(timeMinutes || "0") / 60;

    // Use exact metric Widmark formula from specification
    // BAC(%) = A_g / (r × W_kg × 10) - β × t
    const distributionRatio = gender === "male" ? 0.68 : 0.55; // Metric constants from specification
    const eliminationRate = 0.017; // per hour from specification

    // Calculate using exact formula
    const bac = totalAlcoholGrams / (distributionRatio * weightInKg * 10) - eliminationRate * totalHours;
    const finalBAC = Math.max(0, bac); // BAC cannot be negative

    // Time until sober (when BAC reaches 0)
    const timeUntilSober = finalBAC > 0 ? finalBAC / eliminationRate : 0;

    // Convert grams to standard drinks for display (14g = 1 standard drink)
    const standardDrinks = totalAlcoholGrams / 14;

    // Calculate BAC (at time 0) for display
    const bac0 = totalAlcoholGrams / (distributionRatio * weightInKg * 10);

    // Determine interpretation
    let interpretation = "";
    let warningLevel = "";
    if (finalBAC >= 0.08) {
      interpretation = "Above legal driving limit in most states (0.08%)";
      warningLevel = "danger";
    } else if (finalBAC >= 0.05) {
      interpretation = "Impaired - Do not drive";
      warningLevel = "warning";
    } else if (finalBAC > 0) {
      interpretation = "Below legal limit but still impaired";
      warningLevel = "caution";
    } else {
      interpretation = "No alcohol detected";
      warningLevel = "safe";
    }
    setResult({
      bac: finalBAC,
      bacPercentage: finalBAC * 100,
      // Convert to percentage for display
      interpretation,
      warningLevel,
      timeUntilSober,
      standardDrinks,
      totalAlcoholGrams,
      weightInKg,
      bac0,
      totalHours,
      distributionRatio,
      eliminationRate
    });
    setShowResult(true);
  };
  const resetCalculator = () => {
    setGender("");
    setWeight("");
    setWeightUnit("lb");
    setAge(""); // Reset age
    setHeight(""); // Reset height
    setHeightUnit("cm"); // Reset height unit
    setTimeHours("");
    setTimeMinutes("");
    setDrinks([{
      id: "1",
      type: "",
      volume: "",
      volumeUnit: "oz",
      abv: "",
      quantity: "1"
    }]); // Reset with quantity
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const getDrinkTypeABV = (type: string) => {
    const defaults: {
      [key: string]: string;
    } = {
      beer: "5",
      wine: "12",
      liquor: "40",
      other: ""
    };
    return defaults[type] || "";
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Wine className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Activity className="w-6 h-6 text-purple-600" />
                      <span>{contentData.personal_information_drinks_0}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.enter_your_information_and_alcohol_consumption_det_1}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Personal Information */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{contentData.personal_information_2}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Gender */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.gender_3}</Label>
                          <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-6">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">{contentData.male_4}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">{contentData.female_5}</Label>
                            </div>
                          </RadioGroup>
                          {errors.gender && <div className="flex items-center mt-2 text-red-600">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              <span className="text-sm">{errors.gender}</span>
                            </div>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.age_6}<div className="group relative ml-2">
                              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.required_for_watson_body_water_calculation_7}</div>
                            </div>
                          </Label>
                          <Input className={`h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.age ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="1" max="120" placeholder="Enter age" value={age} onChange={e => {
                          setAge(e.target.value);
                          if (errors.age) setErrors(prev => ({
                            ...prev,
                            age: ""
                          }));
                        }} />
                          {errors.age && <div className="flex items-center mt-2 text-red-600">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              <span className="text-sm">{errors.age}</span>
                            </div>}
                        </div>

                        {/* Weight */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.body_weight_8}<div className="group relative ml-2">
                              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.your_current_body_weight_9}</div>
                            </div>
                          </Label>
                          <div className="flex space-x-2">
                            <Input className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.weight ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" min="0" placeholder="Enter weight" value={weight} onChange={e => {
                            setWeight(e.target.value);
                            if (errors.weight) setErrors(prev => ({
                              ...prev,
                              weight: ""
                            }));
                          }} />
                            <Select value={weightUnit} onValueChange={setWeightUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl border-gray-200 focus:border-purple-400">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="lb">{contentData.lb_10}</SelectItem>
                                <SelectItem value="kg">{contentData.kg_11}</SelectItem>
                                <SelectItem value="g">{contentData.g_12}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.weight && <div className="flex items-center mt-2 text-red-600">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              <span className="text-sm">{errors.weight}</span>
                            </div>}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.height_13}<div className="group relative ml-2">
                              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.required_for_watson_body_water_calculation_14}</div>
                            </div>
                          </Label>
                          <div className="flex space-x-2">
                            <Input className={`flex-1 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.height ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="0.1" min="0" placeholder="Enter height" value={height} onChange={e => {
                            setHeight(e.target.value);
                            if (errors.height) setErrors(prev => ({
                              ...prev,
                              height: ""
                            }));
                          }} />
                            <Select value={heightUnit} onValueChange={setHeightUnit}>
                              <SelectTrigger className="w-20 h-12 rounded-xl border-gray-200 focus:border-purple-400">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cm">{contentData.cm_15}</SelectItem>
                                <SelectItem value="ft">{contentData.ft_16}</SelectItem>
                                <SelectItem value="in">{contentData.in_17}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {errors.height && <div className="flex items-center mt-2 text-red-600">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              <span className="text-sm">{errors.height}</span>
                            </div>}
                        </div>
                      </div>

                      {/* Time Since First Drink */}
                      <div className="mt-6">
                        <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">{contentData.time_since_first_drink_18}<div className="group relative ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help group-hover:text-gray-600" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">{contentData.time_elapsed_since_your_first_alcoholic_drink_19}</div>
                          </div>
                        </Label>
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Clock className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.time ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" placeholder="Hours" value={timeHours} onChange={e => {
                              setTimeHours(e.target.value);
                              if (errors.time) setErrors(prev => ({
                                ...prev,
                                time: ""
                              }));
                            }} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <Input className={`w-full h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.time ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="number" step="1" min="0" max="59" placeholder="Minutes" value={timeMinutes} onChange={e => {
                            setTimeMinutes(e.target.value);
                            if (errors.time) setErrors(prev => ({
                              ...prev,
                              time: ""
                            }));
                          }} />
                          </div>
                        </div>
                        {errors.time && <div className="flex items-center mt-2 text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{errors.time}</span>
                          </div>}
                      </div>
                    </div>

                    {/* Drinks Section */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{contentData.alcohol_consumed_20}</h3>
                        <Button onClick={addDrink} variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent">
                          <Plus className="w-4 h-4 mr-1" />{contentData.add_drink_21}</Button>
                      </div>

                      {drinks.map((drink, index) => <div key={drink.id} className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-purple-700">{contentData.drink_22}{index + 1}</h4>
                            {drinks.length > 1 && <Button onClick={() => removeDrink(drink.id)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Minus className="w-4 h-4" />
                              </Button>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {/* Drink Type */}
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.type_23}</Label>
                              <Select value={drink.type || ""} onValueChange={value => {
                            updateDrink(drink.id, "type", value);
                            // Auto-fill ABV based on drink type
                            const defaultABV = getDrinkTypeABV(value);
                            if (defaultABV) {
                              setTimeout(() => {
                                updateDrink(drink.id, "abv", defaultABV);
                              }, 0);
                            }
                          }}>
                                <SelectTrigger className="h-10 rounded-lg border-gray-200 focus:border-purple-400">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beer">{contentData.beer_24}</SelectItem>
                                  <SelectItem value="wine">{contentData.wine_25}</SelectItem>
                                  <SelectItem value="liquor">{contentData.liquor_26}</SelectItem>
                                  <SelectItem value="other">{contentData.other_27}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.quantity_28}</Label>
                              <Input className="h-10 rounded-lg border-gray-200 focus:border-purple-400 focus:ring-purple-200" type="number" step="0.1" min="0.1" placeholder="1" value={drink.quantity} onChange={e => updateDrink(drink.id, "quantity", e.target.value)} />
                            </div>

                            {/* Volume */}
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.volume_29}</Label>
                              <div className="flex space-x-1">
                                <Input className="flex-1 h-10 rounded-lg border-gray-200 focus:border-purple-400 focus:ring-purple-200" type="number" step="0.1" min="0" placeholder="0" value={drink.volume} onChange={e => updateDrink(drink.id, "volume", e.target.value)} />
                                <Select value={drink.volumeUnit} onValueChange={value => updateDrink(drink.id, "volumeUnit", value)}>
                                  <SelectTrigger className="w-16 h-10 rounded-lg border-gray-200 focus:border-purple-400">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="oz">{contentData.oz_30}</SelectItem>
                                    <SelectItem value="ml">{contentData.ml_31}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {/* ABV */}
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.abv_32}</Label>
                              <Input className="h-10 rounded-lg border-gray-200 focus:border-purple-400 focus:ring-purple-200" type="number" step="0.1" min="0" max="100" placeholder="0" value={drink.abv} onChange={e => updateDrink(drink.id, "abv", e.target.value)} />
                            </div>
                          </div>
                        </div>)}

                      {errors.drinks && <div className="flex items-center mt-2 text-red-600">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{errors.drinks}</span>
                        </div>}
                    </div>

                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-700">
                        <strong>{contentData.metric_widmark_formula_33}</strong>{contentData.bac_ag_r_wkg_10_t_34}</p>
                      <p className="text-xs text-gray-600 mt-1">{contentData.ag_alcohol_grams_r_distribution_ratio_male_068_fem_35}</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={calculateBAC} className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800">{contentData.calculate_36}</Button>
                      <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_37}</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 h-full">
                  <CardHeader className="w-full text-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Wine className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.bac_results_38}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full text-center">
                    {showResult && result ? <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className={`bg-white p-4 rounded-lg border-2 ${result.warningLevel === "danger" ? "border-red-300" : result.warningLevel === "warning" ? "border-yellow-300" : result.warningLevel === "caution" ? "border-orange-300" : "border-green-300"}`}>
                            <p className="text-3xl font-bold text-purple-900">{result.bacPercentage.toFixed(3)}%</p>
                            <p className="text-gray-600">{contentData.bac_39}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-lg font-bold text-purple-900">{result.timeUntilSober.toFixed(1)}{contentData.h_40}</p>
                            <p className="text-gray-600">{contentData.until_sober_41}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-sm font-bold text-purple-900">{result.standardDrinks.toFixed(1)}</p>
                            <p className="text-gray-600">{contentData.standard_drinks_42}</p>
                          </div>
                        </div>
                      </div> : <div className="text-center">
                        <Wine className="w-8 h-8 text-purple-300 mb-2 mx-auto" />
                        <p className="text-gray-500 text-base">{contentData.enter_your_information_and_drinks_then_click_43}{" "}
                          <span className="font-semibold text-purple-600">{contentData.calculate_44}</span>{contentData.to_see_bac_45}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results Section */}
            {showResult && result && <div className="mt-8" ref={resultsRef}>
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-purple-600" />
                      <span>{contentData.detailed_bac_analysis_46}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className={`text-center p-6 rounded-xl border-2 ${result.warningLevel === "danger" ? "bg-gradient-to-br from-red-50 to-red-100 border-red-300" : result.warningLevel === "warning" ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300" : result.warningLevel === "caution" ? "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300" : "bg-gradient-to-br from-green-50 to-green-100 border-green-300"}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${result.warningLevel === "danger" ? "bg-gradient-to-r from-red-600 to-red-700" : result.warningLevel === "warning" ? "bg-gradient-to-r from-yellow-600 to-yellow-700" : result.warningLevel === "caution" ? "bg-gradient-to-r from-orange-600 to-orange-700" : "bg-gradient-to-r from-green-600 to-green-700"}`}>
                          <Wine className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${result.warningLevel === "danger" ? "text-red-700" : result.warningLevel === "warning" ? "text-yellow-700" : result.warningLevel === "caution" ? "text-orange-700" : "text-green-700"}`}>{contentData.bac_level_47}</h3>
                        <p className={`text-3xl font-bold mb-1 ${result.warningLevel === "danger" ? "text-red-900" : result.warningLevel === "warning" ? "text-yellow-900" : result.warningLevel === "caution" ? "text-orange-900" : "text-green-900"}`}>
                          {result.bacPercentage.toFixed(3)}%
                        </p>
                        <p className={`text-sm ${result.warningLevel === "danger" ? "text-red-600" : result.warningLevel === "warning" ? "text-yellow-600" : result.warningLevel === "caution" ? "text-orange-600" : "text-green-600"}`}>
                          {result.interpretation}
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">{contentData.time_until_sober_48}</h3>
                        <p className="text-2xl font-bold text-purple-900 mb-1">
                          {result.timeUntilSober.toFixed(1)}{contentData.hours_49}</p>
                        <p className="text-sm text-purple-600">{contentData.at_0017hour_elimination_50}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">{contentData.standard_drinks_51}</h3>
                        <p className="text-2xl font-bold text-purple-900 mb-1">{result.standardDrinks.toFixed(1)}</p>
                        <p className="text-sm text-purple-600">{contentData.total_consumed_52}</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-purple-700 mb-2">{contentData.pure_alcohol_53}</h3>
                        <p className="text-2xl font-bold text-purple-900 mb-1">
                          {result.totalAlcoholGrams.toFixed(1)}{contentData.g_54}</p>
                        <p className="text-sm text-purple-600">{contentData.total_grams_55}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-700 mb-2">{contentData.calculation_steps_widmark_formula_56}</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>{contentData.step_1_57}</strong>{contentData.total_alcohol_58}{result.totalAlcoholGrams.toFixed(1)}{contentData.g_volume_abv_0789_quantity_59}</p>
                        <p>
                          <strong>{contentData.step_2_60}</strong>{contentData.distribution_ratio_61}{result.distributionRatio} (
                          {gender === "male" ? "male" : "female"}{contentData.metric_constant_62}</p>
                        <p>
                          <strong>{contentData.step_3_63}</strong>{contentData.initial_bac_64}{result.totalAlcoholGrams.toFixed(1)}{contentData.g_65}{result.distributionRatio} × {result.weightInKg.toFixed(1)}{contentData.kg_10_66}{" "}
                          {(result.bac0 * 100).toFixed(3)}%
                        </p>
                        <p>
                          <strong>{contentData.step_4_67}</strong>{contentData.current_bac_68}{(result.bac0 * 100).toFixed(3)}% - (
                          {result.eliminationRate} × {result.totalHours.toFixed(1)}{contentData.h_69}{" "}
                          {result.bacPercentage.toFixed(3)}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-700 mb-1">{contentData.important_disclaimer_70}</h4>
                          <p className="text-sm text-red-600">{contentData.this_bac_calculator_provides_an_estimate_only_actu_71}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
<SimilarCalculators calculators={[{
          calculatorName: "BMI Calculator",
          calculatorHref: "/health/bmi-calculator",
        }, {
          calculatorName: "BMR Calculator",
          calculatorHref: "/health/bmr-calculator",
        }, {
          calculatorName: "TDEE Calculator",
          calculatorHref: "/health/tdee-calculator",
        }
        ]} 
        color="purple" 
        title="Related Health Calculators" />
            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 flex items-center justify-center mr-3 shadow-lg">
                    <Wine className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.understanding_blood_alcohol_concentration_72}</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.what_is_bac_73}</h3>
                      <p className="text-gray-700 mb-4">{contentData.blood_alcohol_concentration_bac_measures_the_amoun_74}</p>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.watson_vs_widmark_formula_75}</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>{contentData.watson_uses_age_height_weight_and_gender_for_preci_76}</li>
                        <li>{contentData.widmark_uses_simple_gender_constants_less_accurate_77}</li>
                        <li>{contentData.elimination_rate_0017hour_more_accurate_than_0015_78}</li>
                        <li>{contentData.alcohol_conversion_volume_abv_0789_density_79}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.metric_widmark_formula_80}</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>{contentData.formula_bac_ag_r_wkg_10_t_81}</li>
                        <li>{contentData.distribution_ratios_male_068_female_055_metric_con_82}</li>
                        <li>{contentData.elimination_rate_0017_per_hour_updated_standard_83}</li>
                        <li>{contentData.alcohol_conversion_volumeml_abv_0789_density_84}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.standard_drink_equivalents_85}</h3>
                      <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.k_1_standard_drink_14g_pure_alcohol_86}</strong>
                        </p>
                        <p className="text-gray-700">{contentData.k_12_oz_beer_5_abv_87}</p>
                        <p className="text-gray-700">{contentData.k_5_oz_wine_12_abv_88}</p>
                        <p className="text-gray-700">{contentData.k_15_oz_liquor_40_abv_89}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="text-gray-700 mb-2">
                          <strong>{contentData.elimination_rate_90}</strong>
                        </p>
                        <p className="text-gray-700">{contentData.the_liver_eliminates_alcohol_at_approximately_0017_91}</p>
                      </div>
                      <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-red-800">
                          <strong>{contentData.safety_note_92}</strong>{contentData.this_calculator_is_for_educational_purposes_only_n_93}</p>
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
            entityId="bac-calculator"
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