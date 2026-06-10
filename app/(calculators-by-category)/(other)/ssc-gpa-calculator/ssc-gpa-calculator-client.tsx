"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Calculator, RotateCcw, BookOpen, TrendingUp, Award, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface Subject {
  name: string;
  marks: string;
  grade: string;
  gradePoint: number;
}

const GRADING_SCALE = [
  { min: 80, max: 100, grade: "A+", point: 5.0 },
  { min: 70, max: 79, grade: "A", point: 4.0 },
  { min: 60, max: 69, grade: "A-", point: 3.5 },
  { min: 50, max: 59, grade: "B", point: 3.0 },
  { min: 40, max: 49, grade: "C", point: 2.0 },
  { min: 33, max: 39, grade: "D", point: 1.0 },
  { min: 0, max: 32, grade: "F", point: 0.0 },
];

const MAIN_SUBJECTS = [
  "Bangla",
  "English",
  "Mathematics",
  "Religion",
  "ICT",
  "Bangladesh & Global Studies",
  "Physics",
  "Chemistry",
  "Biology"
];

interface SscGpaCalculatorClientProps {
  content?: any;
  guideContent?: CalculatorGuideData;
}

export default function SscGpaCalculatorClient({
  content,
  guideContent,
}: SscGpaCalculatorClientProps) {
  const guideData = guideContent || { color: "blue", sections: [], faq: [] };
  const contentData = content || {};
  const [inputMode, setInputMode] = useState<"marks" | "grades">("marks");
  const [subjects, setSubjects] = useState<Subject[]>(
    MAIN_SUBJECTS.map(name => ({
      name,
      marks: "",
      grade: "",
      gradePoint: 0
    }))
  );
  const [optionalSubject, setOptionalSubject] = useState<Subject>({
    name: "Optional Subject",
    marks: "",
    grade: "",
    gradePoint: 0
  });
  const [hasOptional, setHasOptional] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const marksToGradePoint = (marks: number): { grade: string; point: number } => {
    const scale = GRADING_SCALE.find(s => marks >= s.min && marks <= s.max);
    return scale ? { grade: scale.grade, point: scale.point } : { grade: "F", point: 0.0 };
  };

  const gradeToPoint = (grade: string): number => {
    const scale = GRADING_SCALE.find(s => s.grade === grade);
    return scale ? scale.point : 0.0;
  };

  const handleMarksChange = (index: number, value: string, isOptional = false) => {
    const marks = parseFloat(value) || 0;
    const { grade, point } = marksToGradePoint(marks);

    if (isOptional) {
      setOptionalSubject({
        ...optionalSubject,
        marks: value,
        grade,
        gradePoint: point
      });
    } else {
      const newSubjects = [...subjects];
      newSubjects[index] = {
        ...newSubjects[index],
        marks: value,
        grade,
        gradePoint: point
      };
      setSubjects(newSubjects);
    }
  };

  const handleGradeChange = (index: number, grade: string, isOptional = false) => {
    const point = gradeToPoint(grade);

    if (isOptional) {
      setOptionalSubject({
        ...optionalSubject,
        grade,
        gradePoint: point
      });
    } else {
      const newSubjects = [...subjects];
      newSubjects[index] = {
        ...newSubjects[index],
        grade,
        gradePoint: point
      };
      setSubjects(newSubjects);
    }
  };

  const calculateGPA = () => {
    const hasFailed = subjects.some(s => s.gradePoint === 0 && (inputMode === "marks" ? s.marks !== "" : s.grade !== ""));
    
    if (hasFailed) {
      setResult({
        gpa: 0.0,
        percentage: 0,
        status: "Failed",
        message: "F grade in any mandatory subject results in 0.00 GPA",
        breakdown: subjects
      });
      setShowResult(true);
      return;
    }

    let totalPoints = subjects.reduce((sum, s) => sum + s.gradePoint, 0);
    
    if (hasOptional && optionalSubject.gradePoint > 0) {
      const adjustedOptionalPoint = Math.max(0, optionalSubject.gradePoint - 2);
      totalPoints += adjustedOptionalPoint;
    }

    const gpa = parseFloat((totalPoints / 9).toFixed(2));
    const percentage = parseFloat((gpa * 20).toFixed(2));
    
    let status = "";
    if (gpa === 5.0) status = "Excellent (Top Score)";
    else if (gpa >= 4.0) status = "Very Good";
    else if (gpa >= 3.5) status = "Good";
    else if (gpa >= 3.0) status = "Average";
    else if (gpa >= 2.0) status = "Passed";
    else if (gpa >= 1.0) status = "Needs Improvement";
    else status = "Failed";

    setResult({
      gpa,
      percentage,
      status,
      totalPoints,
      breakdown: subjects,
      optionalContribution: hasOptional ? Math.max(0, optionalSubject.gradePoint - 2) : 0
    });
    setShowResult(true);
  };

  const resetCalculator = () => {
    setSubjects(MAIN_SUBJECTS.map(name => ({
      name,
      marks: "",
      grade: "",
      gradePoint: 0
    })));
    setOptionalSubject({
      name: "Optional Subject",
      marks: "",
      grade: "",
      gradePoint: 0
    });
    setHasOptional(false);
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {contentData.pageTitle || "SSC GPA Calculator"}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {contentData.pageDescriptionBefore ?? ""}
            {contentData.pageDescriptionBold ? (
              <strong className="font-semibold text-gray-900">{contentData.pageDescriptionBold}</strong>
            ) : null}
            {contentData.pageDescriptionAfter ?? contentData.pageDescription ?? "Calculate SSC GPA using the official Bangladesh grading scale with marks or letter grades."}
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <Card className="shadow-xl border-2 pt-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r py-4 from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Calculator className="w-6 h-6" />
                  Calculate Your SSC GPA
                </CardTitle>
                <CardDescription className="text-blue-50">
                  Enter your marks or select grades for all subjects
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 block">Input Mode</Label>
                  <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "marks" | "grades")} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="marks">Enter Marks</TabsTrigger>
                      <TabsTrigger value="grades">Select Grades</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Main Subjects (9 Required)
                  </h3>
                  
                  {subjects.map((subject, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <Label className="font-medium text-gray-700">{subject.name}</Label>
                      </div>
                      
                      {inputMode === "marks" ? (
                        <div>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={subject.marks}
                            onChange={(e) => handleMarksChange(index, e.target.value)}
                            placeholder="Enter marks (0-100)"
                            className="border-blue-200 focus:border-blue-500"
                          />
                        </div>
                      ) : (
                        <div>
                          <Select value={subject.grade} onValueChange={(v) => handleGradeChange(index, v)}>
                            <SelectTrigger className="border-blue-200 focus:border-blue-500">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADING_SCALE.map((scale) => (
                                <SelectItem key={scale.grade} value={scale.grade}>
                                  {scale.grade} ({scale.point.toFixed(1)})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        {subject.gradePoint > 0 && (
                          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            {subject.grade} - {subject.gradePoint.toFixed(1)} points
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="hasOptional"
                      checked={hasOptional}
                      onChange={(e) => setHasOptional(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor="hasOptional" className="font-semibold text-gray-800 cursor-pointer">
                      Include Optional Subject (Agriculture, Home Economics, etc.)
                    </Label>
                  </div>

                  {hasOptional && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                      <div className="flex items-center">
                        <Label className="font-medium text-gray-700">Optional Subject</Label>
                      </div>
                      
                      {inputMode === "marks" ? (
                        <div>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={optionalSubject.marks}
                            onChange={(e) => handleMarksChange(0, e.target.value, true)}
                            placeholder="Enter marks (0-100)"
                            className="border-indigo-300 focus:border-indigo-500"
                          />
                        </div>
                      ) : (
                        <div>
                          <Select value={optionalSubject.grade} onValueChange={(v) => handleGradeChange(0, v, true)}>
                            <SelectTrigger className="border-indigo-300 focus:border-indigo-500">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADING_SCALE.map((scale) => (
                                <SelectItem key={scale.grade} value={scale.grade}>
                                  {scale.grade} ({scale.point.toFixed(1)})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        {optionalSubject.gradePoint > 0 && (
                          <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                            {optionalSubject.grade} - {Math.max(0, optionalSubject.gradePoint - 2).toFixed(1)} bonus points
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={calculateGPA}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold shadow-lg"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate GPA
                  </Button>
                  <Button
                    onClick={resetCalculator}
                    variant="outline"
                    className="px-6 py-6 border-2 border-gray-300 hover:bg-gray-100"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-xl border-2 pt-2 border-blue-100 sticky top-4">
              <CardHeader className="bg-gradient-to-r py-8 from-indigo-600 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  SSC Grading Scale
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {GRADING_SCALE.map((scale) => (
                    <div
                      key={scale.grade}
                      className={`p-3 rounded-lg border-2 ${
                        scale.grade === "A+" ? "bg-green-50 border-green-300" :
                        scale.grade === "F" ? "bg-red-50 border-red-300" :
                        "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-lg">{scale.grade}</div>
                          <div className="text-sm text-gray-600">{scale.min}–{scale.max}%</div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {scale.point.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Alert className="mt-4 border-amber-300 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-sm text-amber-800">
                    <strong>Important:</strong> F grade in any mandatory subject results in 0.00 GPA
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>

        {showResult && result && (
          <Card className="shadow-2xl border-4 pt-2 border-blue-200 mb-12">
            <CardHeader className="bg-gradient-to-r py-6 from-green-600 to-emerald-600 text-white">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="w-6 h-6" />
                Your SSC GPA Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-300">
                  <div className="text-sm font-semibold text-blue-600 mb-2">Final GPA</div>
                  <div className="text-5xl font-bold text-blue-700">{result.gpa.toFixed(2)}</div>
                  <div className="text-sm text-gray-600 mt-2">out of 5.00</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-300">
                  <div className="text-sm font-semibold text-purple-600 mb-2">Percentage</div>
                  <div className="text-5xl font-bold text-purple-700">{result.percentage}%</div>
                  <div className="text-sm text-gray-600 mt-2">equivalent</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-300">
                  <div className="text-sm font-semibold text-green-600 mb-2">Status</div>
                  <div className="text-2xl font-bold text-green-700 mt-4">{result.status}</div>
                </div>
              </div>

              {result.message && (
                <Alert className="mb-6 border-red-300 bg-red-50">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <AlertDescription className="text-red-800 font-semibold">
                    {result.message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Calculation Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-semibold">Total Main Subject Points:</span>
                    <span className="font-bold text-blue-600">{result.totalPoints?.toFixed(2) || subjects.reduce((sum, s) => sum + s.gradePoint, 0).toFixed(2)}</span>
                  </div>
                  {hasOptional && result.optionalContribution > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-300">
                      <span className="font-semibold">Optional Subject Contribution:</span>
                      <span className="font-bold text-indigo-600">+{result.optionalContribution.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-semibold">Division Factor:</span>
                    <span className="font-bold">9 subjects</span>
                  </div>
                  <div className="flex justify-between py-3 bg-blue-100 px-3 rounded mt-2">
                    <span className="font-bold text-lg">Final GPA:</span>
                    <span className="font-bold text-2xl text-blue-700">{result.gpa.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

          <CalculatorGuide data={guideData} layout="article" />

                    <RatingProfileSection
          entityId="ssc-gpa-calculator"
          entityType="calculator"
          creatorSlug="aiden-asher"
        />
        
        <SimilarCalculators
          calculators={[
            { id: "gpa-calculator" },
            { id: "grade-curve-calculator" },
            { id: "age-calculator" },
            { id: "time-calculator" },
            { id: "height-calculator" },
            { id: "bmi-calculator" },
          ]}
          color="blue"
          title="Similar Calculators"
        />
        </div>
      </main>
    </div>
  );
}
