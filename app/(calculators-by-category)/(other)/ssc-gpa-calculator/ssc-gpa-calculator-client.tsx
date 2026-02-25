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

export default function SscGpaCalculatorClient() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SSC GPA Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your Secondary School Certificate GPA instantly using the official Bangladesh grading system
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
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

        <Card className="shadow-xl mb-12 pt-2">
          <CardHeader className="bg-gradient-to-r py-4 from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl">SSC GPA Calculator – Complete Guide</CardTitle>
          </CardHeader>
          <CardContent className="p-8 prose max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Is SSC and Why GPA Matters?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The <strong>Secondary School Certificate (SSC)</strong> is a public examination conducted in several countries such as Bangladesh, India, and Pakistan. In Bangladesh, SSC exams are administered by education boards under the Ministry of Education.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your SSC GPA plays a critical role in:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>College admissions</li>
              <li>Scholarship eligibility</li>
              <li>Academic stream selection (Science, Commerce, Humanities)</li>
              <li>Merit-based opportunities</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-8">
              Understanding the SSC GPA calculation system ensures transparency and accuracy in evaluating your academic performance.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Calculate SSC GPA (Step-by-Step)</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Step 1: Convert Marks to Grade Points</h3>
              <p className="text-gray-700">Use the official grading table to convert each subject's marks into grade points.</p>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Step 2: Add All Grade Points</h3>
              <p className="text-gray-700">Sum up the grade points of all 9 mandatory subjects.</p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-3">Step 3: Adjust Optional Subject</h3>
              <p className="text-gray-700">If you have an optional subject, subtract 2 from its grade point (minimum 0) and add to total.</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
              <h3 className="text-xl font-bold text-green-900 mb-3">Step 4: Divide by 9</h3>
              <p className="text-gray-700 mb-4">Divide the total points by 9 (number of main subjects) to get your final GPA.</p>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300 text-center">
                <div className="text-2xl font-bold text-gray-800">
                  GPA = (Total Grade Points + Optional Bonus) ÷ 9
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Example Calculation</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 mb-8">
              <h3 className="text-xl font-bold mb-4">Sample Student Results:</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-gray-700 mb-2">Main Subjects:</div>
                  <ul className="space-y-1 text-sm">
                    <li>Bangla: A (4.0)</li>
                    <li>English: A- (3.5)</li>
                    <li>Math: A+ (5.0)</li>
                    <li>Religion: A (4.0)</li>
                    <li>IT: A (4.0)</li>
                    <li>BGS: B (3.0)</li>
                    <li>Physics: A- (3.5)</li>
                    <li>Chemistry: B (3.0)</li>
                    <li>Biology: A (4.0)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-gray-700 mb-2">Optional Subject:</div>
                  <p className="text-sm">Agriculture: A+ (5.0)</p>
                  <p className="text-sm mt-2">Adjusted: 5.0 - 2.0 = <strong>3.0</strong></p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">Calculation:</p>
                <p className="text-sm">Total Main Points: 4.0 + 3.5 + 5.0 + 4.0 + 4.0 + 3.0 + 3.5 + 3.0 + 4.0 = <strong>34.0</strong></p>
                <p className="text-sm">Optional Bonus: <strong>3.0</strong></p>
                <p className="text-sm">Total: 34.0 + 3.0 = <strong>37.0</strong></p>
                <p className="text-sm mt-2">GPA = 37.0 ÷ 9 = <strong className="text-2xl text-blue-600">4.11</strong></p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">SSC GPA to Percentage Calculator</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Many colleges ask for percentage instead of GPA. The conversion formula is simple:
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300 mb-6 text-center">
              <div className="text-3xl font-bold text-purple-800 mb-2">
                Percentage = GPA × 20
              </div>
              <p className="text-gray-600 mt-3">Example: 4.60 GPA × 20 = <strong>92%</strong></p>
              <p className="text-sm text-gray-500 mt-2">This formula is widely used in Bangladesh SSC systems.</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Rules to Remember</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Alert className="border-red-300 bg-red-50">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>F Grade Rule:</strong> If you get F in any mandatory subject, your final GPA = 0.00
                </AlertDescription>
              </Alert>
              <Alert className="border-blue-300 bg-blue-50">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Optional Subject:</strong> Maximum contribution is grade point minus 2 (minimum 0)
                </AlertDescription>
              </Alert>
              <Alert className="border-green-300 bg-green-50">
                <AlertCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Division Factor:</strong> Always divide by 9 main subjects, not total subjects
                </AlertDescription>
              </Alert>
              <Alert className="border-purple-300 bg-purple-50">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                <AlertDescription className="text-purple-800">
                  <strong>GPA Scale:</strong> Bangladesh SSC uses 5.00 scale (not 4.0 like some systems)
                </AlertDescription>
              </Alert>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">GPA Score Interpretation</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border-2 border-gray-300">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">GPA Range</th>
                    <th className="border border-gray-300 p-3 text-left">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-bold">5.00</td>
                    <td className="border border-gray-300 p-3">Excellent (Top Score)</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-3 font-bold">4.00–4.99</td>
                    <td className="border border-gray-300 p-3">Very Good</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="border border-gray-300 p-3 font-bold">3.50–3.99</td>
                    <td className="border border-gray-300 p-3">Good</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border border-gray-300 p-3 font-bold">3.00–3.49</td>
                    <td className="border border-gray-300 p-3">Average</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 p-3 font-bold">2.00–2.99</td>
                    <td className="border border-gray-300 p-3">Passed</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 p-3 font-bold">1.00–1.99</td>
                    <td className="border border-gray-300 p-3">Needs Improvement</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 p-3 font-bold">0.00</td>
                    <td className="border border-gray-300 p-3">Failed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Middle School GPA vs SSC GPA</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Many students confuse middle school GPA with SSC GPA. Here's the key difference:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border-2 border-gray-300">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">Feature</th>
                    <th className="border border-gray-300 p-3 text-left">Middle School GPA</th>
                    <th className="border border-gray-300 p-3 text-left">SSC GPA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Scale</td>
                    <td className="border border-gray-300 p-3">Often 4.0</td>
                    <td className="border border-gray-300 p-3">Often 5.0</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Credits</td>
                    <td className="border border-gray-300 p-3">Sometimes none</td>
                    <td className="border border-gray-300 p-3">Usually fixed subjects</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Weighting</td>
                    <td className="border border-gray-300 p-3">Rare</td>
                    <td className="border border-gray-300 p-3">Optional subject bonus</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">National Exam?</td>
                    <td className="border border-gray-300 p-3">No</td>
                    <td className="border border-gray-300 p-3">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed mb-8">
              A <strong>middle school GPA calculator</strong> typically averages grades without national board rules, while SSC follows strict examination board regulations.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Expert Tips for Improving SSC GPA</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-blue-900 mb-2">✓ Focus on high-credit subjects</h3>
                <p className="text-sm text-gray-700">Prioritize subjects that carry more weight in your board</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <h3 className="font-bold text-green-900 mb-2">✓ Aim for 80+ to secure A+</h3>
                <p className="text-sm text-gray-700">Getting A+ (5.0) in multiple subjects significantly boosts GPA</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <h3 className="font-bold text-purple-900 mb-2">✓ Improve weakest subject first</h3>
                <p className="text-sm text-gray-700">Avoid F grades at all costs - they result in 0.00 GPA</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
                <h3 className="font-bold text-indigo-900 mb-2">✓ Track expected GPA before exams</h3>
                <p className="text-sm text-gray-700">Use this calculator to plan your target scores</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4 mb-8">
              <details className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <summary className="font-bold text-gray-900 cursor-pointer">What is an SSC GPA calculator?</summary>
                <p className="mt-3 text-gray-700">An SSC GPA calculator is a digital or manual tool used to compute GPA based on SSC grading rules, converting marks to grade points and calculating the final GPA on a 5.00 scale.</p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <summary className="font-bold text-gray-900 cursor-pointer">How to calculate SSC GPA manually?</summary>
                <p className="mt-3 text-gray-700">Convert marks to grade points using the grading scale, sum them, adjust optional subject points (minus 2), then divide by 9 main subjects.</p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <summary className="font-bold text-gray-900 cursor-pointer">What is the SSC GPA calculation system?</summary>
                <p className="mt-3 text-gray-700">Most SSC systems use a 5.00 GPA scale with grade points assigned based on percentage ranges: A+ (80-100) = 5.0, A (70-79) = 4.0, A- (60-69) = 3.5, B (50-59) = 3.0, C (40-49) = 2.0, D (33-39) = 1.0, F (0-32) = 0.0.</p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <summary className="font-bold text-gray-900 cursor-pointer">Is SSC GPA different from middle school GPA?</summary>
                <p className="mt-3 text-gray-700">Yes. A middle school GPA calculator typically uses a 4.0 scale and may not include credits, while SSC follows national exam rules with a 5.00 scale and specific subject requirements.</p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <summary className="font-bold text-gray-900 cursor-pointer">How does an SSC GPA to percentage calculator work?</summary>
                <p className="mt-3 text-gray-700">It multiplies GPA by 20 (in Bangladesh format) to convert GPA into percentage. For example, 4.60 GPA × 20 = 92%.</p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <summary className="font-bold text-gray-900 cursor-pointer">Can I calculate SSC GPA with marks?</summary>
                <p className="mt-3 text-gray-700">Yes. Use an SSC GPA calculator with marks to automatically convert marks into grade points and calculate your final GPA instantly.</p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <summary className="font-bold text-gray-900 cursor-pointer">What is the highest SSC GPA?</summary>
                <p className="mt-3 text-gray-700">In Bangladesh SSC system, the highest GPA is 5.00, achieved by scoring A+ (80-100%) in all subjects.</p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <summary className="font-bold text-gray-900 cursor-pointer">What happens if I get F in one subject?</summary>
                <p className="mt-3 text-gray-700">If you receive F grade in any mandatory subject, your overall SSC GPA becomes 0.00 regardless of other grades.</p>
              </details>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Should Use an SSC GPA Calculator?</h2>
            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
              <li><strong>SSC students</strong> - Track academic performance and plan target scores</li>
              <li><strong>Parents</strong> - Monitor children's academic progress</li>
              <li><strong>Teachers</strong> - Evaluate student performance quickly</li>
              <li><strong>Academic counselors</strong> - Guide students on college admissions</li>
              <li><strong>Admission consultants</strong> - Assess eligibility for programs</li>
            </ul>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">Final Summary</h2>
              <p className="text-lg leading-relaxed">
                An <strong>SSC GPA calculator</strong> is an essential academic tool for accurately computing GPA under the official SSC grading framework. Whether you need an <strong>SSC GPA calculator online</strong>, an <strong>SSC GPA to percentage calculator</strong>, an <strong>SSC GPA to marks calculator</strong>, or want to understand <strong>how to calculate SSC GPA</strong> manually, mastering the <strong>SSC GPA calculation system</strong> ensures better academic planning and result analysis.
              </p>
            </div>
          </CardContent>
        </Card>

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
    </div>
  );
}
