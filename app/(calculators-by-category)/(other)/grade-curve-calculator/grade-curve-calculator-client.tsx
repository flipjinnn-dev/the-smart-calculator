"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Calculator, TrendingUp, AlertCircle, BarChart3, Plus, Trash2 } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
import Image from "next/image";

interface GradeCurveCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function GradeCurveCalculatorClient({ content, guideContent }: GradeCurveCalculatorClientProps) {
  const contentData = content || {};
  
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [scores, setScores] = useState<string[]>(["", "", "", "", ""]);
  const [method, setMethod] = useState<string>("linear");
  const [targetMean, setTargetMean] = useState<string>("75");
  const [targetStdDev, setTargetStdDev] = useState<string>("12");

  const addScore = () => {
    if (scores.length < 30) {
      setScores([...scores, ""]);
    }
  };

  const removeScore = (index: number) => {
    if (scores.length > 1) {
      const newScores = scores.filter((_, i) => i !== index);
      setScores(newScores);
    }
  };

  const updateScore = (index: number, value: string) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
    if (errors[`score${index}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`score${index}`];
        return newErrors;
      });
    }
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    
    const validScores = scores.filter(s => s.trim() !== "");
    
    if (validScores.length < 2) {
      newErrors.general = "Please enter at least 2 scores";
    }

    validScores.forEach((score, index) => {
      const num = parseFloat(score);
      if (isNaN(num) || num < 0 || num > 100) {
        newErrors[`score${index}`] = "Score must be between 0 and 100";
      }
    });

    if (method === "bell" || method === "bellcurve") {
      const mean = parseFloat(targetMean);
      const stdDev = parseFloat(targetStdDev);
      
      if (isNaN(mean) || mean < 0 || mean > 100) {
        newErrors.targetMean = "Mean must be between 0 and 100";
      }
      
      if (isNaN(stdDev) || stdDev <= 0) {
        newErrors.targetStdDev = "Standard deviation must be greater than 0";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMean = (values: number[]) => {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  };

  const calculateStdDev = (values: number[], mean: number) => {
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  };

  const calculateCurve = () => {
    if (!validateInputs()) return;

    const validScores = scores
      .filter(s => s.trim() !== "")
      .map(s => parseFloat(s))
      .sort((a, b) => b - a);

    const originalMean = calculateMean(validScores);
    const originalStdDev = calculateStdDev(validScores, originalMean);
    const maxScore = Math.max(...validScores);
    const minScore = Math.min(...validScores);

    let curvedScores: number[] = [];
    let methodDescription = "";

    switch (method) {
      case "linear":
        const addPoints = 100 - maxScore;
        curvedScores = validScores.map(score => Math.min(100, score + addPoints));
        methodDescription = `Linear Rescaling: Added ${addPoints.toFixed(2)} points to all scores`;
        break;

      case "ratio":
        const scaleFactor = 100 / maxScore;
        curvedScores = validScores.map(score => Math.min(100, score * scaleFactor));
        methodDescription = `Ratio Scaling: Multiplied all scores by ${scaleFactor.toFixed(4)}`;
        break;

      case "bell":
      case "bellcurve":
        const newMean = parseFloat(targetMean);
        const newStdDev = parseFloat(targetStdDev);
        curvedScores = validScores.map(score => {
          const zScore = (score - originalMean) / originalStdDev;
          const newScore = newMean + (zScore * newStdDev);
          return Math.max(0, Math.min(100, newScore));
        });
        methodDescription = `Bell Curve: Redistributed to mean=${newMean}, σ=${newStdDev}`;
        break;

      case "sqrt":
        const K = 10;
        curvedScores = validScores.map(score => Math.min(100, Math.sqrt(score) * K));
        methodDescription = `Square Root Method: Applied √(score) × ${K}`;
        break;

      default:
        curvedScores = validScores;
    }

    const curvedMean = calculateMean(curvedScores);
    const curvedStdDev = calculateStdDev(curvedScores, curvedMean);

    const gradeDistribution = assignLetterGrades(curvedScores);

    setResult({
      originalScores: validScores,
      curvedScores: curvedScores,
      originalMean: originalMean.toFixed(2),
      originalStdDev: originalStdDev.toFixed(2),
      curvedMean: curvedMean.toFixed(2),
      curvedStdDev: curvedStdDev.toFixed(2),
      maxOriginal: maxScore.toFixed(2),
      minOriginal: minScore.toFixed(2),
      maxCurved: Math.max(...curvedScores).toFixed(2),
      minCurved: Math.min(...curvedScores).toFixed(2),
      methodDescription,
      gradeDistribution,
      improvement: (curvedMean - originalMean).toFixed(2)
    });

    setShowResult(true);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };

  const assignLetterGrades = (scores: number[]) => {
    const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    
    scores.forEach(score => {
      if (score >= 90) grades.A++;
      else if (score >= 80) grades.B++;
      else if (score >= 70) grades.C++;
      else if (score >= 60) grades.D++;
      else grades.F++;
    });

    return grades;
  };

  const resetCalculator = () => {
    setScores(["", "", "", "", ""]);
    setMethod("linear");
    setTargetMean("75");
    setTargetStdDev("12");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Grade Curve Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Adjust student scores using different curving methods to reflect relative class performance
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>Enter Student Scores</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Input scores (0-100) and select a curving method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Curving Method
                      </Label>
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linear">Linear Rescaling (Add Points)</SelectItem>
                          <SelectItem value="ratio">Ratio Scaling (Multiply)</SelectItem>
                          <SelectItem value="bell">Bell Curve (Normal Distribution)</SelectItem>
                          <SelectItem value="sqrt">Square Root Method</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(method === "bell" || method === "bellcurve") && (
                      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Target Mean (μ)
                          </Label>
                          <Input
                            type="number"
                            value={targetMean}
                            onChange={(e) => setTargetMean(e.target.value)}
                            className={`h-10 rounded-lg ${errors.targetMean ? "border-red-300" : ""}`}
                            placeholder="75"
                          />
                          {errors.targetMean && (
                            <p className="text-xs text-red-600 mt-1">{errors.targetMean}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Target Std Dev (σ)
                          </Label>
                          <Input
                            type="number"
                            value={targetStdDev}
                            onChange={(e) => setTargetStdDev(e.target.value)}
                            className={`h-10 rounded-lg ${errors.targetStdDev ? "border-red-300" : ""}`}
                            placeholder="12"
                          />
                          {errors.targetStdDev && (
                            <p className="text-xs text-red-600 mt-1">{errors.targetStdDev}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Student Scores (up to 30)
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                        {scores.map((score, index) => (
                          <div key={index} className="relative">
                            <Input
                              type="number"
                              value={score}
                              onChange={(e) => updateScore(index, e.target.value)}
                              className={`h-10 rounded-lg pr-8 ${errors[`score${index}`] ? "border-red-300" : ""}`}
                              placeholder={`Score ${index + 1}`}
                              min="0"
                              max="100"
                            />
                            {scores.length > 1 && (
                              <button
                                onClick={() => removeScore(index)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {scores.length < 30 && (
                        <Button
                          onClick={addScore}
                          variant="outline"
                          className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Score
                        </Button>
                      )}
                    </div>

                    {errors.general && (
                      <div className="flex items-center mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <span className="text-sm text-red-600">{errors.general}</span>
                      </div>
                    )}

                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">
                        <strong>How it works:</strong> The calculator applies your selected curving method to adjust scores. 
                        Linear adds points to make the highest score 100%, Ratio multiplies all scores proportionally, 
                        Bell Curve redistributes using statistics, and Square Root emphasizes lower scores.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={calculateCurve}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                      >
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculate Curve
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6"
                      >
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="">
                <Card
                  ref={resultsRef}
                  className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 h-full flex flex-col justify-center items-center p-8"
                >
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-3 shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">
                      Curve Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4 w-full">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-sm text-gray-600 mb-1">Average Improvement</p>
                          <p className="text-3xl font-bold text-blue-900">
                            +{result.improvement} pts
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded-lg border border-blue-200">
                            <p className="text-xs text-gray-600">Original Mean</p>
                            <p className="text-xl font-bold text-gray-900">{result.originalMean}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-blue-200">
                            <p className="text-xs text-gray-600">Curved Mean</p>
                            <p className="text-xl font-bold text-blue-900">{result.curvedMean}</p>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-600 mb-2">Grade Distribution</p>
                          <div className="flex justify-around text-xs">
                            <div>
                              <p className="font-bold text-green-600">A: {result.gradeDistribution.A}</p>
                            </div>
                            <div>
                              <p className="font-bold text-blue-600">B: {result.gradeDistribution.B}</p>
                            </div>
                            <div>
                              <p className="font-bold text-yellow-600">C: {result.gradeDistribution.C}</p>
                            </div>
                            <div>
                              <p className="font-bold text-orange-600">D: {result.gradeDistribution.D}</p>
                            </div>
                            <div>
                              <p className="font-bold text-red-600">F: {result.gradeDistribution.F}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <BarChart3 className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Enter scores and click <span className="font-semibold text-blue-600">Calculate Curve</span> to see results
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div className="mt-8 space-y-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                      <span>Detailed Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-semibold text-blue-900">{result.methodDescription}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Original Mean</p>
                        <p className="text-2xl font-bold text-gray-900">{result.originalMean}</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <p className="text-xs text-gray-600 mb-1">Curved Mean</p>
                        <p className="text-2xl font-bold text-blue-900">{result.curvedMean}</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Original Std Dev</p>
                        <p className="text-2xl font-bold text-gray-900">{result.originalStdDev}</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <p className="text-xs text-gray-600 mb-1">Curved Std Dev</p>
                        <p className="text-2xl font-bold text-blue-900">{result.curvedStdDev}</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                            <th className="border border-blue-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Student #
                            </th>
                            <th className="border border-blue-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Original Score
                            </th>
                            <th className="border border-blue-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Curved Score
                            </th>
                            <th className="border border-blue-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Change
                            </th>
                            <th className="border border-blue-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                              Grade
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.originalScores.map((originalScore: number, index: number) => {
                            const curvedScore = result.curvedScores[index];
                            const change = curvedScore - originalScore;
                            const grade = curvedScore >= 90 ? 'A' : curvedScore >= 80 ? 'B' : curvedScore >= 70 ? 'C' : curvedScore >= 60 ? 'D' : 'F';
                            const gradeColor = grade === 'A' ? 'text-green-600' : grade === 'B' ? 'text-blue-600' : grade === 'C' ? 'text-yellow-600' : grade === 'D' ? 'text-orange-600' : 'text-red-600';
                            
                            return (
                              <tr key={index} className="hover:bg-blue-50">
                                <td className="border border-gray-200 px-4 py-3 text-sm">
                                  Student {index + 1}
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-sm font-medium">
                                  {originalScore.toFixed(2)}
                                </td>
                                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-blue-900">
                                  {curvedScore.toFixed(2)}
                                </td>
                                <td className={`border border-gray-200 px-4 py-3 text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {change >= 0 ? '+' : ''}{change.toFixed(2)}
                                </td>
                                <td className={`border border-gray-200 px-4 py-3 text-sm font-bold ${gradeColor}`}>
                                  {grade}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                  <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">
                      Grade Distribution Visualization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="w-full">
                    <div className="bg-white p-6 rounded-lg border border-blue-200">
                      <div className="relative w-full max-w-2xl mx-auto">
                        <Image
                          src="/images/bell-grade-curve-distribution.png"
                          alt="Bell Curve Grade Distribution"
                          width={800}
                          height={400}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-4 text-center">
                        Standard bell curve distribution showing typical grade percentages
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <RatingProfileSection
              entityId="grade-curve-calculator"
              entityType="calculator"
              creatorSlug="aiden-asher"
              initialRatingTotal={0}
              initialRatingCount={0}
            />

            <SimilarCalculators
              calculators={[
                {
                  calculatorName: "GPA Calculator",
                  calculatorHref: "/gpa-calculator",
                  calculatorDescription: "Calculate your Grade Point Average (GPA) for semester or cumulative performance tracking"
                },
              ]}
              color="blue"
              title="Related Other Calculators"
            />

            <div className="mt-12 space-y-8">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-3xl">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                    <span>Grade Curve Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A grade curve calculator helps teachers and students assign letter grades fairly by using statistical methods such as the bell curve or fixed percentage distributions. Using input values like the mean, standard deviation, highest, and lowest scores, it distributes grades according to a curve so that the majority of students receive average grades (C), while fewer students get high (A, B) or low (D, F) grades.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-3xl text-blue-700">What is a Grade Curve Calculator?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    A grade curve calculator, also known as a <strong>grading curve calculator</strong>, <strong>grading bell curve calculator</strong>, or <strong>curve grading calculator</strong>, is a tool designed to assign letter grades based on student performance relative to the rest of the class.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Unlike absolute grading, which assigns grades strictly based on raw scores, grading on a curve adjusts grades so that the distribution reflects typical performance patterns, often a bell-shaped curve.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-lg text-gray-900 mb-3">Entities:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Bell Curve</strong> – statistical model for normal distribution</li>
                      <li><strong>Mean (μ)</strong> – average score of the class</li>
                      <li><strong>Standard Deviation (σ)</strong> – measures score dispersion</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-3xl">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                    <span>Why Use a Grade Curve Calculator?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Using a grading on a curve calculator helps educators and students by:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6 text-lg">
                    <li>Normalizing grades for difficult exams</li>
                    <li>Ensuring fairness when tests are unusually easy or hard</li>
                    <li>Identifying top and bottom performers</li>
                    <li>Reducing mass failures in challenging courses</li>
                  </ul>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    For students, it clarifies their standing in the class relative to peers. For teachers, it simplifies the complex calculations of grade distribution.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-3xl text-blue-700">Types of Grade Curve Calculators</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">1. Bell Curve (Normal Distribution)</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      The bell curve grade calculator is the most statistically accurate method. It distributes grades based on mean and standard deviation, assigning grades according to how far scores deviate from the class average.
                    </p>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                      <h4 className="font-bold text-lg text-gray-900 mb-3">Typical Percentile Distribution:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-blue-100">
                              <th className="border border-blue-300 px-4 py-2 text-left">Grade</th>
                              <th className="border border-blue-300 px-4 py-2 text-left">Percentile Range</th>
                              <th className="border border-blue-300 px-4 py-2 text-left">Z-Score Approximation</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-blue-200 px-4 py-2 font-bold text-green-700">A</td>
                              <td className="border border-blue-200 px-4 py-2">Top 2%</td>
                              <td className="border border-blue-200 px-4 py-2">z ≥ +2.05</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="border border-blue-200 px-4 py-2 font-bold text-blue-700">B</td>
                              <td className="border border-blue-200 px-4 py-2">84–98%</td>
                              <td className="border border-blue-200 px-4 py-2">+1 ≤ z &lt; +2</td>
                            </tr>
                            <tr>
                              <td className="border border-blue-200 px-4 py-2 font-bold text-yellow-700">C</td>
                              <td className="border border-blue-200 px-4 py-2">16–84%</td>
                              <td className="border border-blue-200 px-4 py-2">−1 ≤ z &lt; +1</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="border border-blue-200 px-4 py-2 font-bold text-orange-700">D</td>
                              <td className="border border-blue-200 px-4 py-2">2–16%</td>
                              <td className="border border-blue-200 px-4 py-2">−2 ≤ z &lt; −1</td>
                            </tr>
                            <tr>
                              <td className="border border-blue-200 px-4 py-2 font-bold text-red-700">F</td>
                              <td className="border border-blue-200 px-4 py-2">Bottom 2%</td>
                              <td className="border border-blue-200 px-4 py-2">z ≤ −2.05</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-lg text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li><strong>Input:</strong> Total students, mean (μ), standard deviation (σ)</li>
                        <li><strong>Output:</strong> Letter grades, percentile ranges, approximate z-scores</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">2. Fixed Range / Classic Curve</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      The grade curve calculator based on average or fixed approximation method uses the highest and lowest scores to create grade bands. This is less precise but faster when mean and standard deviation are unknown.
                    </p>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-lg text-gray-900 mb-3">Default Percentage Bands:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-blue-100">
                              <th className="border border-blue-300 px-4 py-2 text-left">Grade</th>
                              <th className="border border-blue-300 px-4 py-2 text-left">% of Students</th>
                              <th className="border border-blue-300 px-4 py-2 text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-blue-200 px-4 py-2 font-bold text-green-700">A</td>
                              <td className="border border-blue-200 px-4 py-2">2%</td>
                              <td className="border border-blue-200 px-4 py-2">Top performers</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="border border-blue-200 px-4 py-2 font-bold text-blue-700">B</td>
                              <td className="border border-blue-200 px-4 py-2">14%</td>
                              <td className="border border-blue-200 px-4 py-2">Above average</td>
                            </tr>
                            <tr>
                              <td className="border border-blue-200 px-4 py-2 font-bold text-yellow-700">C</td>
                              <td className="border border-blue-200 px-4 py-2">68%</td>
                              <td className="border border-blue-200 px-4 py-2">Average students</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="border border-blue-200 px-4 py-2 font-bold text-orange-700">D</td>
                              <td className="border border-blue-200 px-4 py-2">14%</td>
                              <td className="border border-blue-200 px-4 py-2">Below average</td>
                            </tr>
                            <tr>
                              <td className="border border-blue-200 px-4 py-2 font-bold text-red-700">F</td>
                              <td className="border border-blue-200 px-4 py-2">2%</td>
                              <td className="border border-blue-200 px-4 py-2">Lowest performers</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-3xl">
                    <Calculator className="w-8 h-8 text-blue-600" />
                    <span>How the Grade Curve Calculator Works</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Whether using a grading curve calculator online or an offline tool, the workflow is similar:
                  </p>

                  <div className="mb-6">
                    <h4 className="font-bold text-xl text-blue-700 mb-3">Inputs Needed:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                      <li>Total Test Population (N)</li>
                      <li>Mean Score (μ) – for bell curve</li>
                      <li>Standard Deviation (σ) – for bell curve</li>
                      <li>Highest and Lowest Score – for fixed range method</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-xl text-blue-700 mb-4">Grade Assignment Formula:</h4>
                    
                    <div className="mb-4">
                      <p className="font-semibold text-gray-900 mb-2">For Bell Curve:</p>
                      <p className="font-mono text-lg text-gray-800 bg-white p-3 rounded border border-blue-200">z = (x − μ) / σ</p>
                      <p className="text-gray-700 mt-2">Assign grades based on z-score ranges.</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-2">For Fixed Range:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Compute score range: Highest Score − Lowest Score</li>
                        <li>Split scores into percentage bands</li>
                        <li>Assign grades according to bands</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-3xl text-blue-700">Step-by-Step Example Using a Bell Curve</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Suppose a physics test has 100 students, mean 30, and standard deviation 8. Using a bell curve grade calculator with mean and standard deviation, grades are assigned as:
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-100">
                            <th className="border border-blue-300 px-4 py-2 text-left">Grade</th>
                            <th className="border border-blue-300 px-4 py-2 text-left">% of Students</th>
                            <th className="border border-blue-300 px-4 py-2 text-left">Number of Students</th>
                            <th className="border border-blue-300 px-4 py-2 text-left">Score Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-blue-200 px-4 py-2 font-bold text-green-700">A</td>
                            <td className="border border-blue-200 px-4 py-2">2%</td>
                            <td className="border border-blue-200 px-4 py-2">2</td>
                            <td className="border border-blue-200 px-4 py-2">≥ 46</td>
                          </tr>
                          <tr className="bg-blue-50">
                            <td className="border border-blue-200 px-4 py-2 font-bold text-blue-700">B</td>
                            <td className="border border-blue-200 px-4 py-2">14%</td>
                            <td className="border border-blue-200 px-4 py-2">14</td>
                            <td className="border border-blue-200 px-4 py-2">38–46</td>
                          </tr>
                          <tr>
                            <td className="border border-blue-200 px-4 py-2 font-bold text-yellow-700">C</td>
                            <td className="border border-blue-200 px-4 py-2">68%</td>
                            <td className="border border-blue-200 px-4 py-2">68</td>
                            <td className="border border-blue-200 px-4 py-2">22–38</td>
                          </tr>
                          <tr className="bg-blue-50">
                            <td className="border border-blue-200 px-4 py-2 font-bold text-orange-700">D</td>
                            <td className="border border-blue-200 px-4 py-2">14%</td>
                            <td className="border border-blue-200 px-4 py-2">14</td>
                            <td className="border border-blue-200 px-4 py-2">14–22</td>
                          </tr>
                          <tr>
                            <td className="border border-blue-200 px-4 py-2 font-bold text-red-700">F</td>
                            <td className="border border-blue-200 px-4 py-2">2%</td>
                            <td className="border border-blue-200 px-4 py-2">2</td>
                            <td className="border border-blue-200 px-4 py-2">≤ 14</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-8 py-6">
                  <CardTitle className="text-3xl">Step-by-Step Example Using a Fixed Range</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Highest score: 50, Lowest score: 10, Total students: 100
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-100">
                            <th className="border border-blue-300 px-4 py-2 text-left">Grade</th>
                            <th className="border border-blue-300 px-4 py-2 text-left">% of Students</th>
                            <th className="border border-blue-300 px-4 py-2 text-left">Number of Students</th>
                            <th className="border border-blue-300 px-4 py-2 text-left">Score Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-blue-200 px-4 py-2 font-bold text-green-700">A</td>
                            <td className="border border-blue-200 px-4 py-2">2%</td>
                            <td className="border border-blue-200 px-4 py-2">2</td>
                            <td className="border border-blue-200 px-4 py-2">49.2–50</td>
                          </tr>
                          <tr className="bg-blue-50">
                            <td className="border border-blue-200 px-4 py-2 font-bold text-blue-700">B</td>
                            <td className="border border-blue-200 px-4 py-2">14%</td>
                            <td className="border border-blue-200 px-4 py-2">14</td>
                            <td className="border border-blue-200 px-4 py-2">43.6–49.2</td>
                          </tr>
                          <tr>
                            <td className="border border-blue-200 px-4 py-2 font-bold text-yellow-700">C</td>
                            <td className="border border-blue-200 px-4 py-2">68%</td>
                            <td className="border border-blue-200 px-4 py-2">68</td>
                            <td className="border border-blue-200 px-4 py-2">16.4–43.6</td>
                          </tr>
                          <tr className="bg-blue-50">
                            <td className="border border-blue-200 px-4 py-2 font-bold text-orange-700">D</td>
                            <td className="border border-blue-200 px-4 py-2">14%</td>
                            <td className="border border-blue-200 px-4 py-2">14</td>
                            <td className="border border-blue-200 px-4 py-2">10.8–16.4</td>
                          </tr>
                          <tr>
                            <td className="border border-blue-200 px-4 py-2 font-bold text-red-700">F</td>
                            <td className="border border-blue-200 px-4 py-2">2%</td>
                            <td className="border border-blue-200 px-4 py-2">2</td>
                            <td className="border border-blue-200 px-4 py-2">10–10.8</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-3xl text-blue-700">
                    <BarChart3 className="w-8 h-8" />
                    <span>Grade Curve Tables and Visualizations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="bg-white p-6 rounded-lg border border-blue-200">
                    <div className="relative w-full max-w-3xl mx-auto">
                      <Image
                        src="/images/bell-grade-curve-distribution.png"
                        alt="Bell Curve Grade Distribution"
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-4 text-center">
                      Visual representation of bell curve grade distribution showing typical percentile ranges
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-8 py-6">
                  <CardTitle className="text-3xl">Pros and Cons of Curve Grading</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-green-700 mb-4">Pros:</h3>
                      <ul className="space-y-3 text-gray-700 text-lg">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">•</span>
                          <span>Fair distribution in difficult exams</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">•</span>
                          <span>Recognizes top performers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">•</span>
                          <span>Reduces mass failures</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">•</span>
                          <span>Provides motivational structure</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-red-700 mb-4">Cons:</h3>
                      <ul className="space-y-3 text-gray-700 text-lg">
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2 mt-1">•</span>
                          <span>Top performers may feel penalized</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2 mt-1">•</span>
                          <span>Lack of transparency for students with same grade</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2 mt-1">•</span>
                          <span>Encourages competition over collaboration</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-3xl text-blue-700">Common FAQs</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Q1: What is the difference between absolute grading and grade curving?</h3>
                    <p className="text-gray-700 text-lg">Absolute grading assigns grades based on fixed score thresholds. Curve grading adjusts grades relative to class performance.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Q2: Can I use a grade curve calculator for small classes?</h3>
                    <p className="text-gray-700 text-lg">It's less effective for small classes (&lt;10 students) because statistical patterns may not be meaningful.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Q3: Is grade curving fair?</h3>
                    <p className="text-gray-700 text-lg">Fairness depends on the test context. It's fair in challenging exams but may penalize top performers in easier tests.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Q4: What is the formula for curving grades?</h3>
                    <p className="text-gray-700 text-lg">For bell curve: z = (x - μ)/σ. For fixed range, divide score range into percentage bands and assign grades accordingly.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Q5: Are there online tools for curve grading?</h3>
                    <p className="text-gray-700 text-lg">Yes, a grading curve calculator online can compute both bell curve and fixed range distributions instantly.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-8 py-6">
                  <CardTitle className="text-3xl">Conclusion</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    A grade curve calculator is an essential tool for educators and students to understand, visualize, and assign grades fairly. Using either a bell curve grade calculator or fixed approximation method, it ensures grades reflect student performance accurately and provides insights into class performance.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Whether you need a <strong>grade calculator with curve</strong>, <strong>grading on a bell curve calculator</strong>, or <strong>bell curve grade distribution</strong>, using a calculator simplifies grading, ensures fairness, and saves time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
