"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ChefHat, Scale, Utensils } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
export default function ButterCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('butter-calculator', language, "calculator-ui");

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
    "loading_0": "",
    "butter_conversions_1": "",
    "choose_your_input_measurement_to_convert_to_all_ot_2": "",
    "what_unit_would_you_like_to_convert_from_3": "",
    "sticks_4": "",
    "cups_5": "",
    "tablespoons_6": "",
    "grams_7": "",
    "number_of_sticks_8": "",
    "formula_9": "",
    "k_1_stick_cup_8_tbsp_24_tsp_113g_10": "",
    "number_of_cups_11": "",
    "formula_12": "",
    "k_1_cup_2_sticks_16_tbsp_48_tsp_226g_13": "",
    "number_of_tablespoons_14": "",
    "formula_15": "",
    "k_1_tbsp_0125_sticks_00625_cups_3_tsp_141g_16": "",
    "weight_in_grams_17": "",
    "formula_18": "",
    "k_1g_000885_sticks_000442_cups_0071_tbsp_19": "",
    "convert_butter_20": "",
    "conversions_21": "",
    "equals_22": "",
    "sticks_23": "",
    "cups_24": "",
    "tbsp_25": "",
    "tsp_26": "",
    "grams_27": "",
    "perfect_for_your_cooking_and_baking_needs_28": "",
    "enter_a_value_and_click_29": "",
    "convert_butter_30": "",
    "to_see_all_conversions_31": "",
    "how_to_use_this_calculator_32": "",
    "k_1_33": "",
    "select_the_unit_you_want_to_convert_from_sticks_cu_34": "",
    "k_2_35": "",
    "enter_the_amount_you_have_in_your_recipe_36": "",
    "k_3_37": "",
    "click_38": "",
    "convert_butter_39": "",
    "to_see_all_equivalent_measurements_40": "",
    "k_4_41": "",
    "use_the_converted_measurements_in_your_cooking_and_42": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [tab, setTab] = useState("sticks");
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  // Input states for all tabs
  const [sticks, setSticks] = useState(1);
  const [cups, setCups] = useState(0.5);
  const [tablespoons, setTablespoons] = useState(8);
  const [teaspoons, setTeaspoons] = useState(24);
  const [grams, setGrams] = useState(113);

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">{contentData.loading_0}</div>;
  }

  // Show error if content failed to load
  if (contentError) {
    console.error('Error loading content:', contentError);
  }
  const calculateFromSticks = () => {
    if (isNaN(sticks) || sticks < 0) {
      alert("Please enter a valid positive number for sticks");
      return;
    }
    const resultCups = sticks * 0.5;
    const resultTbsp = sticks * 8;
    const resultTsp = sticks * 24;
    const resultGrams = sticks * 113;
    setResult({
      input: sticks,
      inputUnit: "sticks",
      cups: resultCups,
      tablespoons: resultTbsp,
      teaspoons: resultTsp,
      grams: resultGrams,
      formula: "1 stick = ½ cup = 8 tbsp = 24 tsp = 113g"
    });
    setShowResult(true);
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  const calculateFromCups = () => {
    if (isNaN(cups) || cups < 0) {
      alert("Please enter a valid positive number for cups");
      return;
    }
    const resultSticks = cups * 2;
    const resultTbsp = cups * 16;
    const resultTsp = cups * 48;
    const resultGrams = cups * 226;
    setResult({
      input: cups,
      inputUnit: "cups",
      sticks: resultSticks,
      tablespoons: resultTbsp,
      teaspoons: resultTsp,
      grams: resultGrams,
      formula: "1 cup = 2 sticks = 16 tbsp = 48 tsp = 226g"
    });
    setShowResult(true);
  };
  const calculateFromTablespoons = () => {
    if (isNaN(tablespoons) || tablespoons < 0) {
      alert("Please enter a valid positive number for tablespoons");
      return;
    }
    const resultSticks = tablespoons * 0.125;
    const resultCups = tablespoons * 0.0625;
    const resultTsp = tablespoons * 3;
    const resultGrams = tablespoons * 14.1;
    setResult({
      input: tablespoons,
      inputUnit: "tablespoons",
      sticks: resultSticks,
      cups: resultCups,
      teaspoons: resultTsp,
      grams: resultGrams,
      formula: "1 tbsp = 0.125 sticks = 0.0625 cups = 3 tsp = 14.1g"
    });
    setShowResult(true);
  };
  const calculateFromGrams = () => {
    if (isNaN(grams) || grams < 0) {
      alert("Please enter a valid positive number for grams");
      return;
    }
    const resultSticks = grams / 113;
    const resultCups = grams / 226;
    const resultTbsp = grams / 14.1;
    const resultTsp = resultTbsp * 3;
    setResult({
      input: grams,
      inputUnit: "grams",
      sticks: resultSticks,
      cups: resultCups,
      tablespoons: resultTbsp,
      teaspoons: resultTsp,
      formula: "1g = 0.00885 sticks = 0.00442 cups = 0.071 tbsp"
    });
    setShowResult(true);
  };
  const handleCalculate = () => {
    switch (tab) {
      case "sticks":
        calculateFromSticks();
        break;
      case "cups":
        calculateFromCups();
        break;
      case "tablespoons":
        calculateFromTablespoons();
        break;
      case "grams":
        calculateFromGrams();
        break;
    }
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form (left) */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <ChefHat className="w-6 h-6 text-amber-600" />
                      <span>{contentData.butter_conversions_1}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{contentData.choose_your_input_measurement_to_convert_to_all_ot_2}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Label className="text-base font-semibold mb-3 block">{contentData.what_unit_would_you_like_to_convert_from_3}</Label>
                      <Tabs value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="bg-gradient-to-r from-amber-50 to-orange-50 grid grid-cols-2 lg:grid-cols-4 gap-1 mb-6 h-auto p-2 rounded-xl border border-amber-200 shadow-sm">
                          <TabsTrigger value="sticks" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:shadow-md">{contentData.sticks_4}</TabsTrigger>
                          <TabsTrigger value="cups" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:shadow-md">{contentData.cups_5}</TabsTrigger>
                          <TabsTrigger value="tablespoons" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:shadow-md">{contentData.tablespoons_6}</TabsTrigger>
                          <TabsTrigger value="grams" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-2 text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:shadow-md">{contentData.grams_7}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="sticks">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.number_of_sticks_8}</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Utensils className="h-5 w-5 text-amber-500" />
                                </div>
                                <Input className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-200 shadow-sm" type="number" step="0.25" min="0" value={sticks} onChange={e => setSticks(Number(e.target.value))} />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-sm text-gray-700">
                              <strong>{contentData.formula_9}</strong>{contentData.k_1_stick_cup_8_tbsp_24_tsp_113g_10}</p>
                          </div>
                        </TabsContent>

                        <TabsContent value="cups">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.number_of_cups_11}</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Scale className="h-5 w-5 text-amber-500" />
                                </div>
                                <Input className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-200 shadow-sm" type="number" step="0.125" min="0" value={cups} onChange={e => setCups(Number(e.target.value))} />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-sm text-gray-700">
                              <strong>{contentData.formula_12}</strong>{contentData.k_1_cup_2_sticks_16_tbsp_48_tsp_226g_13}</p>
                          </div>
                        </TabsContent>

                        <TabsContent value="tablespoons">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.number_of_tablespoons_14}</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Utensils className="h-5 w-5 text-amber-500" />
                                </div>
                                <Input className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-200 shadow-sm" type="number" step="0.5" min="0" value={tablespoons} onChange={e => setTablespoons(Number(e.target.value))} />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-sm text-gray-700">
                              <strong>{contentData.formula_15}</strong>{contentData.k_1_tbsp_0125_sticks_00625_cups_3_tsp_141g_16}</p>
                          </div>
                        </TabsContent>

                        <TabsContent value="grams">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                              <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.weight_in_grams_17}</Label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Scale className="h-5 w-5 text-amber-500" />
                                </div>
                                <Input className="w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-amber-400 focus:ring-amber-200 shadow-sm" type="number" step="1" min="0" value={grams} onChange={e => setGrams(Number(e.target.value))} />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-sm text-gray-700">
                              <strong>{contentData.formula_18}</strong>{contentData.k_1g_000885_sticks_000442_cups_0071_tbsp_19}</p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <Button onClick={() => {
                    handleCalculate();
                    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
                  }} className="w-full h-12 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">{contentData.convert_butter_20}</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card (right side) */}
              <div className="">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-3 shadow-lg">
                      <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-amber-700 tracking-tight">{contentData.conversions_21}</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? <div className="text-center space-y-3">
                        <p className="text-lg text-gray-600 mb-4 font-medium">
                          {result.input} {result.inputUnit}{contentData.equals_22}</p>
                        <div className="space-y-2">
                          {result.sticks && <p className="text-2xl font-bold text-amber-900">{result.sticks.toFixed(2)}{contentData.sticks_23}</p>}
                          {result.cups && <p className="text-2xl font-bold text-amber-900">{result.cups.toFixed(2)}{contentData.cups_24}</p>}
                          {result.tablespoons && <p className="text-2xl font-bold text-amber-900">{result.tablespoons.toFixed(1)}{contentData.tbsp_25}</p>}
                          {result.teaspoons && <p className="text-2xl font-bold text-amber-900">{result.teaspoons.toFixed(0)}{contentData.tsp_26}</p>}
                          {result.grams && <p className="text-2xl font-bold text-amber-900">{result.grams.toFixed(0)}{contentData.grams_27}</p>}
                        </div>
                        <div className="mt-4 text-sm text-gray-500">{contentData.perfect_for_your_cooking_and_baking_needs_28}</div>
                      </div> : <div className="flex flex-col items-center justify-center">
                        <ChefHat className="w-8 h-8 text-amber-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">{contentData.enter_a_value_and_click_29}<span className="font-semibold text-amber-600">{contentData.convert_butter_30}</span>{" "}{contentData.to_see_all_conversions_31}</p>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* How to use section */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col justify-center items-start p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mr-3 shadow-lg">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-amber-700 tracking-tight mb-2 text-left">{contentData.how_to_use_this_calculator_32}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start justify-center">
                  <ul className="list-none w-full max-w-md mx-0 text-gray-700 space-y-4 text-base text-left">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold">{contentData.k_1_33}</span>
                      <span>{contentData.select_the_unit_you_want_to_convert_from_sticks_cu_34}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold">{contentData.k_2_35}</span>
                      <span>{contentData.enter_the_amount_you_have_in_your_recipe_36}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold">{contentData.k_3_37}</span>
                      <span>{contentData.click_38}<span className="font-semibold text-amber-600">{contentData.convert_butter_39}</span>{contentData.to_see_all_equivalent_measurements_40}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold">{contentData.k_4_41}</span>
                      <span>{contentData.use_the_converted_measurements_in_your_cooking_and_42}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

      </div>
    </>;
}