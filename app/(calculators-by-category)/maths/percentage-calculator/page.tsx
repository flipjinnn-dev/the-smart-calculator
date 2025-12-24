"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';
export default function PercentageCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('percentage-calculator', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'percentage-calculator',
    language,
    "calculator-guide"
  )

  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  }
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
    "percentage_calculations_1": "",
    "choose_the_type_of_percentage_calculation_you_need_2": "",
    "of_3": "",
    "what_is_4": "",
    "increase_5": "",
    "decrease_6": "",
    "percentage_7": "",
    "of_number_8": "",
    "calculate_9": "",
    "number_10": "",
    "of_total_11": "",
    "calculate_12": "",
    "original_number_13": "",
    "increase_14": "",
    "calculate_15": "",
    "original_number_16": "",
    "decrease_17": "",
    "calculate_18": "",
    "result_19": "",
    "calculated_value_20": "",
    "you_can_copy_or_use_this_value_as_needed_21": "",
    "enter_values_and_click_22": "",
    "calculate_23": "",
    "to_see_result_24": "",
    "how_to_use_this_calculator_25": "",
    "k_1_26": "",
    "select_the_type_of_percentage_calculation_you_need_27": "",
    "k_2_28": "",
    "enter_your_values_in_the_input_fields_29": "",
    "k_3_30": "",
    "click_31": "",
    "calculate_32": "",
    "to_see_the_result_instantly_33": "",
    "k_4_34": "",
    "switch_between_tabs_for_different_percentage_opera_35": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [tab, setTab] = useState("of");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<number | null>(null);

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">{contentData.loading_0}</div>;
  }

  // Show error if content failed to load
  if (contentError) {
    console.error('Error loading content:', contentError);
  }
  function calculate() {
    const num1 = Number.parseFloat(value1);
    const num2 = Number.parseFloat(value2);
    if (isNaN(num1) || isNaN(num2)) {
      setResult(null);
      return;
    }
    let res = 0;
    switch (tab) {
      case "of":
        res = num1 / 100 * num2;
        break;
      case "is":
        res = num1 / num2 * 100;
        break;
      case "increase":
        res = num1 + num1 * num2 / 100;
        break;
      case "decrease":
        res = num1 - num1 * num2 / 100;
        break;
    }
    setResult(res);
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  }
  return <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Percent className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form (left) */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Percent className="w-6 h-6 text-blue-600" />
                    <span>{contentData.percentage_calculations_1}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.choose_the_type_of_percentage_calculation_you_need_2}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <Button variant={tab === "of" ? "default" : "outline"} className="flex-1" onClick={() => setTab("of")}>{contentData.of_3}</Button>
                    <Button variant={tab === "is" ? "default" : "outline"} className="flex-1" onClick={() => setTab("is")}>{contentData.what_is_4}</Button>
                    <Button variant={tab === "increase" ? "default" : "outline"} className="flex-1" onClick={() => setTab("increase")}>{contentData.increase_5}</Button>
                    <Button variant={tab === "decrease" ? "default" : "outline"} className="flex-1" onClick={() => setTab("decrease")}>{contentData.decrease_6}</Button>
                  </div>
                  {/* Input fields and labels */}
                  {tab === "of" && <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{contentData.percentage_7}</Label>
                        <Input type="number" placeholder="25" value={value1} onChange={e => setValue1(e.target.value)} className="h-12 text-lg" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{contentData.of_number_8}</Label>
                        <Input type="number" placeholder="200" value={value2} onChange={e => setValue2(e.target.value)} className="h-12 text-lg" />
                      </div>
                    </div>
                    <Button onClick={calculate} className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-blue-600">{contentData.calculate_9}</Button>
                  </div>}
                  {tab === "is" && <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{contentData.number_10}</Label>
                        <Input type="number" placeholder="50" value={value1} onChange={e => setValue1(e.target.value)} className="h-12 text-lg" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{contentData.of_total_11}</Label>
                        <Input type="number" placeholder="200" value={value2} onChange={e => setValue2(e.target.value)} className="h-12 text-lg" />
                      </div>
                    </div>
                    <Button onClick={calculate} className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-blue-600">{contentData.calculate_12}</Button>
                  </div>}
                  {tab === "increase" && <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{contentData.original_number_13}</Label>
                        <Input type="number" placeholder="100" value={value1} onChange={e => setValue1(e.target.value)} className="h-12 text-lg" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{contentData.increase_14}</Label>
                        <Input type="number" placeholder="20" value={value2} onChange={e => setValue2(e.target.value)} className="h-12 text-lg" />
                      </div>
                    </div>
                    <Button onClick={calculate} className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-green-600">{contentData.calculate_15}</Button>
                  </div>}
                  {tab === "decrease" && <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{contentData.original_number_16}</Label>
                        <Input type="number" placeholder="100" value={value1} onChange={e => setValue1(e.target.value)} className="h-12 text-lg" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{contentData.decrease_17}</Label>
                        <Input type="number" placeholder="15" value={value2} onChange={e => setValue2(e.target.value)} className="h-12 text-lg" />
                      </div>
                    </div>
                    <Button onClick={calculate} className="w-full h-12 text-lg bg-gradient-to-r from-red-500 to-red-600">{contentData.calculate_18}</Button>
                  </div>}
                </CardContent>
              </Card>
            </div>
            {/* Result Card (right side) */}
            <div className="">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-blue-200 h-full flex flex-col justify-center items-center p-8">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-3 shadow-lg">
                    <Percent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.result_19}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {result !== null ? <div className="text-center">
                    <p className="text-lg text-gray-600 mb-2 font-medium">{contentData.calculated_value_20}</p>
                    <p className="text-5xl font-extrabold text-blue-900 mb-2 drop-shadow-lg">
                      {result.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">{contentData.you_can_copy_or_use_this_value_as_needed_21}</div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Percent className="w-8 h-8 text-blue-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_values_and_click_22}<span className="font-semibold text-blue-600">{contentData.calculate_23}</span>{contentData.to_see_result_24}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>
          {/* How to use section below both cards */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col justify-center items-start p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mr-3 shadow-lg">
                  <Percent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight mb-2 text-left">{contentData.how_to_use_this_calculator_25}</CardTitle>
              </CardHeader>
              <CardContent className="w-full flex flex-col items-start justify-center">
                <ul className="list-none w-full max-w-md mx-0 text-gray-700 space-y-4 text-base text-left">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">{contentData.k_1_26}</span>
                    <span>{contentData.select_the_type_of_percentage_calculation_you_need_27}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">{contentData.k_2_28}</span>
                    <span>{contentData.enter_your_values_in_the_input_fields_29}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">{contentData.k_3_30}</span>
                    <span>{contentData.click_31}<span className="font-semibold text-blue-600">{contentData.calculate_32}</span>{contentData.to_see_the_result_instantly_33}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 font-bold">{contentData.k_4_34}</span>
                    <span>{contentData.switch_between_tabs_for_different_percentage_opera_35}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="percentage-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
        <SimilarCalculators calculators={[{
          calculatorName: "Percent Error Calculator",
          calculatorHref: "/maths/percent-error-calculator",
          calculatorDescription: "Calculate loan payments and schedules for any type of loan"
        }, {
          calculatorName: "Scientific Calculator",
          calculatorHref: "/maths/scientific-calculator",
          calculatorDescription: "Calculate car loan payments and total cost"
        }
        ]}
          color="blue"
          title="Related Math Calculators" />
      </main>

    </div>
  </>;
}