"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, RotateCcw } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface SquareRootCurveResults {
  originalGrade: number;
  curvedGrade: number;
  improvement: number;
  steps: {
    step: string;
    calculation: string;
    result: string;
  }[];
}

export default function SquareRootCurveCalculator() {
  const { content: contentData, loading: isLoading, error: contentError } = useCalculatorContent("square-root-curve-calculator", "en", "calculator-ui");
  const { content: guideData } = useCalculatorContent("square-root-curve-calculator", "en", "calculator-guide");
  const pathname = usePathname();

  const [grade, setGrade] = useState("");
  const [results, setResults] = useState<SquareRootCurveResults | null>(null);
  const [error, setError] = useState("");

  const scrollToResults = useMobileScroll();
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculateCurvedGrade = () => {
    scrollToResults(resultsRef as React.RefObject<HTMLElement>);
    setError("");

    const gradeValue = parseFloat(grade);

    if (!grade || isNaN(gradeValue)) {
      setError(contentData.error_invalid_grade || "Please enter a valid grade");
      return;
    }

    if (gradeValue < 0 || gradeValue > 100) {
      setError(contentData.error_grade_range || "Grade must be between 0 and 100");
      return;
    }

    // Square Root Curve Formula: SRG = √(G) × 10
    const squareRoot = Math.sqrt(gradeValue);
    const curvedGrade = squareRoot * 10;
    const improvement = curvedGrade - gradeValue;

    const steps = [
      {
        step: contentData.step_1 || "Step 1: Identify the original grade",
        calculation: `G = ${gradeValue}%`,
        result: `${gradeValue}%`
      },
      {
        step: contentData.step_2 || "Step 2: Calculate the square root of the grade",
        calculation: `√(${gradeValue})`,
        result: squareRoot.toFixed(4)
      },
      {
        step: contentData.step_3 || "Step 3: Multiply by 10",
        calculation: `${squareRoot.toFixed(4)} × 10`,
        result: curvedGrade.toFixed(2)
      },
      {
        step: contentData.step_4 || "Step 4: Calculate improvement",
        calculation: `${curvedGrade.toFixed(2)} - ${gradeValue}`,
        result: `+${improvement.toFixed(2)}%`
      }
    ];

    setResults({
      originalGrade: gradeValue,
      curvedGrade: parseFloat(curvedGrade.toFixed(2)),
      improvement: parseFloat(improvement.toFixed(2)),
      steps
    });
  };

  const handleClear = () => {
    setGrade("");
    setResults(null);
    setError("");
  };

  if (isLoading || !contentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (contentError) {
    return <div>Error: {contentError}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-lg">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              {contentData.title || "Square Root Curve Calculator"}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {contentData.description || "Convert grades using the square root grading curve method"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <Card className="shadow-2xl border-2 border-purple-100 pt-0 hover:shadow-purple-100 transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calculator className="h-6 w-6" />
                {contentData.input_section_title || "Calculate Curved Grade"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {contentData.input_section_description || "Enter the original grade percentage"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Grade Input */}
              <div className="space-y-2">
                <Label htmlFor="grade" className="flex items-center gap-2 text-base font-semibold">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  {contentData.label_grade || "Original Grade (%)"}
                </Label>
                <Input
                  id="grade"
                  type="number"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder={contentData.placeholder_grade || "Enter grade (0-100)"}
                  min="0"
                  max="100"
                  step="0.01"
                  className="text-lg"
                />
                <p className="text-sm text-gray-500">
                  {contentData.grade_hint || "Enter a grade between 0 and 100"}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateCurvedGrade}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  {contentData.button_calculate || "Calculate"}
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {contentData.button_clear || "Clear"}
                </Button>
              </div>

              {/* Formula Display */}
              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">
                  {contentData.formula_title || "Square Root Curve Formula"}
                </h3>
                <div className="text-center py-3">
                  <code className="text-lg font-mono text-purple-700">
                    SRG = √(G) × 10
                  </code>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>SRG:</strong> {contentData.formula_srg || "Square Root Curve Grade"}</p>
                  <p><strong>G:</strong> {contentData.formula_g || "Original Grade Percentage"}</p>
                  <p><strong>√:</strong> {contentData.formula_sqrt || "Square Root"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div ref={resultsRef}>
            <Card className="shadow-2xl border-2 pt-0 border-purple-100 sticky top-4 hover:shadow-purple-100 transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-6 w-6" />
                  {contentData.results_title || "Curved Grade Results"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {results ? (
                  <div className="space-y-6">
                    {/* Main Results */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-300">
                        <div className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                          {contentData.result_original || "Original Grade"}
                        </div>
                        <div className="text-4xl font-bold text-gray-700">
                          {results.originalGrade}%
                        </div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-300 shadow-inner">
                        <div className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                          {contentData.result_curved || "Curved Grade"}
                        </div>
                        <div className="text-4xl font-bold text-purple-600">
                          {results.curvedGrade}%
                        </div>
                      </div>
                    </div>

                    {/* Improvement */}
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
                      <div className="text-sm font-medium text-gray-600 mb-1">
                        {contentData.result_improvement || "Grade Improvement"}
                      </div>
                      <div className="text-3xl font-bold text-green-600">
                        +{results.improvement}%
                      </div>
                    </div>

                    {/* Step-by-Step Solution */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <div className="h-1 w-8 bg-purple-600 rounded"></div>
                        {contentData.steps_title || "Step-by-Step Solution"}
                      </h3>
                      <div className="space-y-3">
                        {results.steps.map((step, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200"
                          >
                            <div className="font-semibold text-purple-900 mb-2">
                              {step.step}
                            </div>
                            <div className="text-sm text-gray-700 mb-1">
                              <strong>{contentData.calculation_label || "Calculation"}:</strong> {step.calculation}
                            </div>
                            <div className="text-sm font-semibold text-purple-700">
                              <strong>{contentData.result_label || "Result"}:</strong> {step.result}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Info Note */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 rounded-lg shadow-sm">
                      <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          <strong className="text-blue-800">{contentData.note_title || "Note"}:</strong> {contentData.note_text || "The square root curve method is commonly used by professors to adjust grades when exams are unexpectedly difficult. This method benefits lower grades more than higher grades."}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {contentData.empty_state || "Enter a grade and click Calculate to see the curved grade"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Guide Section */}
        {guideData && (
          <div className="mt-12">
            
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="square-root-curve-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          </div>
        )}

        {/* Similar Calculators */}
        <div className="mt-12">
          <SimilarCalculators calculators={[{
            calculatorName: "Age Calculator",
            calculatorHref: "/age-calculator",
            calculatorDescription: "Calculate age in years, months, and days"
          }, {
            calculatorName: "GPA Calculator",
            calculatorHref: "/gpa-calculator",
            calculatorDescription: "Calculate your Grade Point Average"
          }, {
            calculatorName: "Percentage Calculator",
            calculatorHref: "/percentage-calculator",
            calculatorDescription: "Calculate percentages and percentage changes"
          }]} />
        </div>
      </div>
    </div>
  );
}
