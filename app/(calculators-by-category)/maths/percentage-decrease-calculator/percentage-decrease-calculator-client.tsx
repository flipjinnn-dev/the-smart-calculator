"use client";

import { useMemo, useState } from "react";
import { Calculator, Percent, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-4">
            <TrendingDown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            {content?.pageTitle || "Percentage Decrease Calculator"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content?.pageDescription ||
              "Find the percentage decrease between two numbers with formula and steps."}
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-red-600" />
              {content?.form?.title || "Calculate Percentage Decrease"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  {content?.form?.labels?.originalValue || "Original Value"}
                </p>
                <Input
                  type="number"
                  step="any"
                  value={originalValue}
                  onChange={(e) => setOriginalValue(e.target.value)}
                  placeholder={content?.form?.placeholders?.originalValue || "e.g. 250"}
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  {content?.form?.labels?.newValue || "New Value"}
                </p>
                <Input
                  type="number"
                  step="any"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder={content?.form?.placeholders?.newValue || "e.g. 200"}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-red-600 text-white hover:bg-red-700 hover:text-white" type="button">
                <Percent className="w-4 h-4 mr-2" />
                {content?.form?.buttons?.calculated || "Live Calculation"}
              </Button>
              <Button variant="outline" type="button" onClick={resetFields}>
                {content?.form?.buttons?.reset || "Reset"}
              </Button>
            </div>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6">
                {result ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500">Result Type</p>
                        <p className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          {result.hasDecrease && <TrendingDown className="w-4 h-4 text-red-600" />}
                          {result.hasIncrease && <TrendingUp className="w-4 h-4 text-green-600" />}
                          {result.noChange && <Minus className="w-4 h-4 text-gray-600" />}
                          {result.hasDecrease && "Decrease"}
                          {result.hasIncrease && "Increase"}
                          {result.noChange && "No Change"}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500">
                          {content?.results?.percentDecrease || "Percent Change"}
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            result.hasIncrease ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {result.absolutePercentChange.toFixed(2)}%
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500">
                          {content?.results?.decreaseAmount || "Difference"}
                        </p>
                        <p className="text-2xl font-bold text-orange-600">
                          {formatNumber(Math.abs(result.decreaseAmount))}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-700">Change Visual</p>
                        <p className="text-xs text-gray-500">{progressWidth.toFixed(2)}%</p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            result.hasIncrease ? "bg-green-500" : "bg-red-500"
                          }`}
                          style={{ width: `${progressWidth}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-semibold mb-2">
                        {content?.results?.formulaTitle || "Formula"}
                      </p>
                      <p className="text-sm text-gray-700">
                        % Decrease = ((Original - New) / Original) x 100
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        = (({formatNumber(result.original)} - {formatNumber(result.current)}) /{" "}
                        {formatNumber(result.original)}) x 100 ={" "}
                        <span
                          className={`font-semibold ${
                            result.hasIncrease ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {result.percentDecrease.toFixed(2)}%
                        </span>
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-semibold mb-2">Step-by-Step</p>
                      <ol className="space-y-1 text-sm text-gray-700 list-decimal pl-5">
                        <li>
                          Difference = Original - New = {formatNumber(result.original)} -{" "}
                          {formatNumber(result.current)} = {formatNumber(result.decreaseAmount)}
                        </li>
                        <li>
                          Divide by original = {formatNumber(result.decreaseAmount)} /{" "}
                          {formatNumber(result.original)} ={" "}
                          {(result.decreaseAmount / result.original).toFixed(4)}
                        </li>
                        <li>
                          Multiply by 100 = {result.percentDecrease.toFixed(2)}%
                        </li>
                      </ol>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    {content?.messages?.empty ||
                      "Enter both values (original must be greater than 0) to see percentage decrease."}
                  </p>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Card className="border-0 shadow-md bg-white">
            <CardContent className="pt-6">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Category</p>
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-red-600" />
                {content?.category || "Math"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {content?.categoryDescription ||
                  "Calculate percentage decrease between two numbers instantly."}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white">
            <CardContent className="pt-6">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Formula</p>
              <p className="text-sm font-semibold text-gray-900">
                {content?.formula ||
                  "Percentage Decrease = ((Original Value - New Value) / Original Value) x 100"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {content?.formulaDescription ||
                  "Subtract the new value from the original value, divide by the original value, and multiply by 100."}
              </p>
            </CardContent>
          </Card>
        </div>

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
          <CalculatorGuide data={guideContent || { color: "red", sections: [], faq: [] }} />
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
            color="red"
            title="Related Math Calculators"
          />
        </div>
      </div>
    </div>
  );
}
