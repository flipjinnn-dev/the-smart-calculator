"use client";

import { useMemo, useState } from "react";
import { Calculator, Percent, TrendingDown, TrendingUp, Minus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from "@/components/rating-profile-section";

interface Props {
  content: any;
  guideContent: any;
}

export default function PercentageDecreaseCalculatorClient({
  content,
  guideContent,
}: Props) {
  const [originalValue, setOriginalValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const result = useMemo(() => {
    const original = Number(originalValue);
    const current = Number(newValue);

    if (!Number.isFinite(original) || !Number.isFinite(current) || original <= 0) {
      return null;
    }

    const decreaseAmount = original - current;
    const percentDecrease = (decreaseAmount / original) * 100;

    return {
      original,
      current,
      decreaseAmount,
      percentDecrease,
      absolutePercentChange: Math.abs(percentDecrease),
      hasDecrease: percentDecrease > 0,
      hasIncrease: percentDecrease < 0,
      noChange: percentDecrease === 0,
    };
  }, [originalValue, newValue]);

  const resetFields = () => {
    setOriginalValue("");
    setNewValue("");
  };

  const applyExample = (original: number, current: number) => {
    setOriginalValue(String(original));
    setNewValue(String(current));
  };

  const formatNumber = (value: number) =>
    value.toLocaleString("en-US", { maximumFractionDigits: 2 });

  const progressWidth = result
    ? Math.min(Math.max(result.absolutePercentChange, 0), 100)
    : 0;

  const formTitle =
    content?.form?.title || "Find % Decrease Between Two Numbers";

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {content?.pageTitle || "Percentage Decrease Calculator"}
          </h1>
          {content?.pageDescription?.trim() ? (
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {content.pageDescription}
            </p>
          ) : null}
        </div>

        <div className="mb-12">
          <Card className="border-2 border-purple-200 shadow-xl">
            <CardHeader className="py-4 md:py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardTitle className="text-lg sm:text-xl md:text-3xl leading-snug flex items-center gap-2 md:gap-3">
                <Calculator className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
                {formTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-200">
                  <div className="mb-6">
                    <Label
                      htmlFor="pct-original"
                      className="text-base font-semibold mb-2 block"
                    >
                      {content?.form?.labels?.originalValue || "Original Value"}
                    </Label>
                    <Input
                      id="pct-original"
                      type="number"
                      step="any"
                      value={originalValue}
                      onChange={(e) => setOriginalValue(e.target.value)}
                      placeholder={
                        content?.form?.placeholders?.originalValue || "e.g. 250"
                      }
                      className="text-lg py-5 border-2 border-purple-300 focus:border-purple-500"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      The starting value before the change (must be greater than 0).
                    </p>
                  </div>

                  <div className="mb-6">
                    <Label
                      htmlFor="pct-new"
                      className="text-base font-semibold mb-2 block"
                    >
                      {content?.form?.labels?.newValue || "New Value"}
                    </Label>
                    <Input
                      id="pct-new"
                      type="number"
                      step="any"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder={
                        content?.form?.placeholders?.newValue || "e.g. 200"
                      }
                      className="text-lg py-5 border-2 border-purple-300 focus:border-purple-500"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      The value after the change — results update as you type.
                    </p>
                  </div>

                  <div className="mb-6 p-4 bg-white rounded-lg border-2 border-gray-200">
                    <p className="text-base font-semibold text-gray-900">
                      How to read the result
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      If the new value is lower than the original, you get a{" "}
                      <strong>percentage decrease</strong>. If it is higher, the
                      tool shows a <strong>percentage increase</strong> instead.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="button"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
                    >
                      <Percent className="w-5 h-5 mr-2 shrink-0" />
                      {content?.form?.buttons?.calculated || "Live Calculation"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetFields}
                      className="px-8 py-6 border-2 border-gray-300 hover:bg-gray-100 sm:shrink-0"
                    >
                      <Trash2 className="w-5 h-5 mr-2 shrink-0" />
                      {content?.form?.buttons?.reset || "Reset"}
                    </Button>
                  </div>

                  {result ? (
                    <div className="mt-6 space-y-4">
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg border-2 border-green-400 shadow-md">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          Results Summary
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">
                              Result Type
                            </p>
                            <p className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              {result.hasDecrease && (
                                <TrendingDown className="w-5 h-5 text-red-600 shrink-0" />
                              )}
                              {result.hasIncrease && (
                                <TrendingUp className="w-5 h-5 text-green-600 shrink-0" />
                              )}
                              {result.noChange && (
                                <Minus className="w-5 h-5 text-gray-600 shrink-0" />
                              )}
                              {result.hasDecrease && "Decrease"}
                              {result.hasIncrease && "Increase"}
                              {result.noChange && "No Change"}
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">
                              {content?.results?.percentDecrease ||
                                "Percent Change"}
                            </p>
                            <p
                              className={`text-3xl font-bold ${
                                result.hasIncrease
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {result.absolutePercentChange.toFixed(2)}%
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">
                              {content?.results?.decreaseAmount || "Difference"}
                            </p>
                            <p className="text-3xl font-bold text-blue-700">
                              {formatNumber(Math.abs(result.decreaseAmount))}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-lg border-2 border-gray-300 shadow-md">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-700">
                              Change Visual
                            </p>
                            <p className="text-xs text-gray-500">
                              {progressWidth.toFixed(2)}%
                            </p>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                result.hasIncrease
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${progressWidth}%` }}
                            />
                          </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-sm font-semibold mb-2">
                            {content?.results?.formulaTitle || "Formula"}
                          </p>
                          <p className="text-sm text-gray-700">
                            % Change = ((Original - New) / Original) × 100
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            = (({formatNumber(result.original)} -{" "}
                            {formatNumber(result.current)}) /{" "}
                            {formatNumber(result.original)}) × 100 ={" "}
                            <span
                              className={`font-semibold ${
                                result.hasIncrease
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {result.percentDecrease.toFixed(2)}%
                            </span>
                          </p>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mt-4">
                          <p className="text-sm font-semibold mb-2">
                            Step-by-Step
                          </p>
                          <ol className="space-y-1 text-sm text-gray-700 list-decimal pl-5">
                            <li>
                              Difference = Original − New ={" "}
                              {formatNumber(result.original)} −{" "}
                              {formatNumber(result.current)} ={" "}
                              {formatNumber(result.decreaseAmount)}
                            </li>
                            <li>
                              Divide by original ={" "}
                              {formatNumber(result.decreaseAmount)} /{" "}
                              {formatNumber(result.original)} ={" "}
                              {(result.decreaseAmount / result.original).toFixed(
                                4
                              )}
                            </li>
                            <li>
                              Multiply by 100 ={" "}
                              {result.percentDecrease.toFixed(2)}%
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-6 text-sm text-gray-600">
                      {content?.messages?.empty ||
                        "Enter both values (original must be greater than 0) to see percentage decrease."}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Quick example
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <strong>Original:</strong> 250 → <strong>New:</strong> 200
                      (20% decrease)
                    </p>
                    <p>
                      <strong>Original:</strong> 100 → <strong>New:</strong>{" "}
                      115 (15% increase)
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 border-blue-300 bg-white hover:bg-blue-50"
                      onClick={() => applyExample(250, 200)}
                    >
                      Try 250 → 200
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-2 border-blue-300 bg-white hover:bg-blue-50"
                      onClick={() => applyExample(100, 115)}
                    >
                      Try 100 → 115
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12 border-2 border-purple-100 shadow-lg bg-white">
          <CardContent className="pt-6 pb-6 px-6 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-3">
              Formula
            </p>
            <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50/80 to-blue-50/40 px-4 py-3.5 sm:px-5 border-l-4 border-l-purple-500 font-mono text-[13px] sm:text-[15px] font-medium text-gray-900 leading-relaxed shadow-sm">
              {content?.formula ||
                "Percentage Decrease = ((Original Value - New Value) / Original Value) x 100"}
            </div>
            <p className="text-[15px] text-gray-600 mt-4 leading-relaxed">
              {content?.formulaDescription ||
                "Subtract the new value from the original value, divide by the original value, and multiply by 100."}
            </p>
          </CardContent>
        </Card>

        <div className="mt-10">
          <RatingProfileSection
            entityId="percentage-decrease-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
        </div>

        <div className="mt-10">
          <CalculatorGuide
            data={guideContent || { color: "purple", sections: [], faq: [] }}
            layout="article"
          />
        </div>

        <div className="mt-10">
          <SimilarCalculators
            calculators={[
              {
                calculatorName: "Percentage Calculator",
                calculatorHref: "/maths/percentage-calculator",
                calculatorDescription: "Solve general percentage questions quickly",
              },
              {
                calculatorName: "Reverse Percentage Calculator",
                calculatorHref: "/maths/reverse-percentage-calculator",
                calculatorDescription: "Find original value before percentage change",
              },
            ]}
            color="purple"
            title="Related Math Calculators"
          />
        </div>
      </div>
    </div>
  );
}
