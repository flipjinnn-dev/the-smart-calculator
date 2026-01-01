"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';
export default function RandomNumberGenerator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const { content, loading, error: contentError } = useCalculatorContent('random-number-generator', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'random-number-generator',
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
    pageTitle: "Random Number Generator",
    pageDescription: "Calculate with our free online calculator",
    form: {
      labels: {},
      placeholders: {},
      buttons: {
        calculate: "Calculate",
        reset: "Reset"
      }
    },
    results: {}
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(1);
  const [allowRepeat, setAllowRepeat] = useState<boolean>(true);
  const [result, setResult] = useState<number[] | null>(null);
  const [error, setError] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isNaN(min) || isNaN(max) || isNaN(quantity)) {
      setError("Please enter valid numbers.");
      setResult(null);
      return;
    }
    if (min > max) {
      setError("Minimum value cannot be greater than maximum value.");
      setResult(null);
      return;
    }
    if (quantity < 1) {
      setError("Quantity must be at least 1.");
      setResult(null);
      return;
    }
    if (!allowRepeat && quantity > max - min + 1) {
      setError("Quantity exceeds the range without repeats.");
      setResult(null);
      return;
    }
    let numbers: number[] = [];
    if (allowRepeat) {
      for (let i = 0; i < quantity; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    } else {
      const pool = Array.from({
        length: max - min + 1
      }, (_, i) => min + i);
      for (let i = 0; i < quantity; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        numbers.push(pool[idx]);
        pool.splice(idx, 1);
      }
    }
    setResult(numbers);
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calculator className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.random_number_generator_2}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.generate_random_numbers_in_a_custom_range_with_or__3}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Generator Form */}
            <div className="col-span-1">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-white rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-900">{contentData.random_number_generator_4}</span>
                  </CardTitle>
                  <CardDescription className="text-base text-gray-700">{contentData.set_your_range_and_options_5}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label className="block mb-1 text-gray-900">{contentData.minimum_value_6}</Label>
                      <Input type="number" value={min} onChange={e => setMin(Number(e.target.value))} required />
                    </div>
                    <div>
                      <Label className="block mb-1 text-gray-900">{contentData.maximum_value_7}</Label>
                      <Input type="number" value={max} onChange={e => setMax(Number(e.target.value))} required />
                    </div>
                    <div>
                      <Label className="block mb-1 text-gray-900">{contentData.how_many_numbers_8}</Label>
                      <Input type="number" value={quantity} min={1} onChange={e => setQuantity(Number(e.target.value))} required />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="repeat" checked={allowRepeat} onChange={e => setAllowRepeat(e.target.checked)} />
                      <Label htmlFor="repeat" className="text-gray-900">{contentData.allow_repeats_9}</Label>
                    </div>
                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800">{contentData.generate_10}</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            {/* Right: Results */}
            <div className="col-span-1 flex items-stretch">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-green-200 flex flex-col w-full h-full">
                <div className="flex flex-1 flex-col justify-center items-center h-full py-12">
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mb-4 shadow-lg">
                      <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-700 tracking-tight mb-4 text-center">{contentData.result_11}</div>
                    {result !== null ? <div className="text-3xl font-bold mb-2 text-center w-full bg-gradient-to-l from-green-700 to-green-300 bg-clip-text text-transparent">
                      {result.join(", ")}
                    </div> : <div className="text-green-700 text-center text-base">{contentData.set_your_range_and_click_12}<span className="font-semibold text-green-900">{contentData.generate_13}</span>{contentData.to_see_random_numbers_14}</div>}
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="random-number-generator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Percent Error Calculator",
            calculatorHref: "/maths/percent-error-calculator",
            calculatorDescription: "Calculate the percent error between a measured value and an actual value instantly."
          }, {
            calculatorName: "Critical Point Calculator",
            calculatorHref: "/maths/critical-point-calculator",
            calculatorDescription: "Find critical points of single-variable or multivariable functions by solving f′(x)=0 or ∂f/∂x=0 and ∂f/∂y=0. Identify where derivatives are zero or undefined."
          },
          ]}
            color="green"
            title="Related Financial Calculators" />
          {/* How to use section below both cards */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-green-200 flex flex-col justify-center items-start p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mr-3 shadow-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-700 tracking-tight mb-2 text-left">{contentData.how_to_use_this_generator_15}</CardTitle>
              </CardHeader>
              <CardContent className="w-full flex flex-col items-start justify-center">
                <ul className="list-none w-full max-w-md mx-0 text-green-900 space-y-4 text-base text-left">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold">{contentData.k_1_16}</span>
                    <span>{contentData.enter_the_minimum_and_maximum_values_for_your_rang_17}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold">{contentData.k_2_18}</span>
                    <span>{contentData.enter_how_many_random_numbers_you_want_to_generate_19}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold">{contentData.k_3_20}</span>
                    <span>{contentData.choose_whether_to_allow_repeats_or_not_21}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold">{contentData.k_4_22}</span>
                    <span>{contentData.click_23}<span className="font-semibold text-green-900">{contentData.generate_24}</span>{contentData.to_see_your_random_numbers_instantly_25}</span>
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