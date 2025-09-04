"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { GraduationCap, Calculator, Plus, Trash2, RotateCcw, BookOpen } from "lucide-react"
import Logo from "@/components/logo"
import SEO from "@/lib/seo"

interface Course {
  id: string
  name: string
  credits: string
  grade: string
  gradeFormat: "letter" | "percentage" | "points"
}

interface Semester {
  id: string
  name: string
  courses: Course[]
}

export default function GPACalculator() {
  const [result, setResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Semester and course management
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: "1",
      name: "Current Semester",
      courses: [{ id: "1", name: "", credits: "", grade: "", gradeFormat: "letter" }],
    },
  ])

  // Prior GPA settings
  const [includePriorGPA, setIncludePriorGPA] = useState(false)
  const [priorGPA, setPriorGPA] = useState("")
  const [priorCredits, setPriorCredits] = useState("")

  // GPA Planning
  const [showPlanning, setShowPlanning] = useState(false)
  const [targetGPA, setTargetGPA] = useState("")
  const [additionalCredits, setAdditionalCredits] = useState("")

  // Grade conversion functions
  const convertLetterToPoints = (letter: string): number => {
    const gradeMap: { [key: string]: number } = {
      "A+": 4.3,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      "D-": 0.7,
      F: 0.0,
    }
    return gradeMap[letter] || 0
  }

  const convertPercentageToPoints = (percentage: number): number => {
    if (percentage >= 97) return 4.3
    if (percentage >= 93) return 4.0
    if (percentage >= 90) return 3.7
    if (percentage >= 87) return 3.3
    if (percentage >= 83) return 3.0
    if (percentage >= 80) return 2.7
    if (percentage >= 77) return 2.3
    if (percentage >= 73) return 2.0
    if (percentage >= 70) return 1.7
    if (percentage >= 67) return 1.3
    if (percentage >= 65) return 1.0
    if (percentage >= 60) return 0.7
    return 0.0
  }

  const getGradePoints = (course: Course): number => {
    if (!course.grade) return 0

    switch (course.gradeFormat) {
      case "letter":
        return convertLetterToPoints(course.grade)
      case "percentage":
        return convertPercentageToPoints(Number.parseFloat(course.grade))
      case "points":
        return Math.min(4.3, Math.max(0, Number.parseFloat(course.grade)))
      default:
        return 0
    }
  }

  const addCourse = (semesterId: string) => {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              courses: [
                ...semester.courses,
                {
                  id: Date.now().toString(),
                  name: "",
                  credits: "",
                  grade: "",
                  gradeFormat: "letter",
                },
              ],
            }
          : semester,
      ),
    )
  }

  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              courses: semester.courses.filter((course) => course.id !== courseId),
            }
          : semester,
      ),
    )
  }

  const updateCourse = (semesterId: string, courseId: string, field: keyof Course, value: string) => {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              courses: semester.courses.map((course) =>
                course.id === courseId ? { ...course, [field]: value } : course,
              ),
            }
          : semester,
      ),
    )
  }

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      courses: [{ id: Date.now().toString(), name: "", credits: "", grade: "", gradeFormat: "letter" }],
    }
    setSemesters((prev) => [...prev, newSemester])
  }

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {}

    // Validate courses
    semesters.forEach((semester) => {
      semester.courses.forEach((course) => {
        if (course.credits && course.grade) {
          const credits = Number.parseFloat(course.credits)
          if (credits <= 0 || credits > 20) {
            newErrors[`credits_${course.id}`] = "Credits must be between 0.1 and 20"
          }

          if (course.gradeFormat === "percentage") {
            const percentage = Number.parseFloat(course.grade)
            if (percentage < 0 || percentage > 100) {
              newErrors[`grade_${course.id}`] = "Percentage must be between 0 and 100"
            }
          } else if (course.gradeFormat === "points") {
            const points = Number.parseFloat(course.grade)
            if (points < 0 || points > 4.3) {
              newErrors[`grade_${course.id}`] = "Grade points must be between 0 and 4.3"
            }
          }
        }
      })
    })

    // Validate prior GPA
    if (includePriorGPA) {
      if (!priorGPA || Number.parseFloat(priorGPA) < 0 || Number.parseFloat(priorGPA) > 4.3) {
        newErrors.priorGPA = "Prior GPA must be between 0.0 and 4.3"
      }
      if (!priorCredits || Number.parseFloat(priorCredits) <= 0) {
        newErrors.priorCredits = "Prior credits must be greater than 0"
      }
    }

    // Validate planning inputs
    if (showPlanning) {
      if (!targetGPA || Number.parseFloat(targetGPA) < 0 || Number.parseFloat(targetGPA) > 4.3) {
        newErrors.targetGPA = "Target GPA must be between 0.0 and 4.3"
      }
      if (!additionalCredits || Number.parseFloat(additionalCredits) <= 0) {
        newErrors.additionalCredits = "Additional credits must be greater than 0"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  interface CourseResult {
  name: string;
  credits: number;
  grade: string;
  gradeFormat: string;
  gradePoints: number;
  courseGP: number;
}

  const calculateGPA = () => {
    if (!validateInputs()) return

    const semesterResults = semesters.map((semester) => {
      let totalGradePoints = 0
      let totalCredits = 0
      const courseResults: CourseResult[] = []

      semester.courses.forEach((course) => {
        if (course.credits && course.grade) {
          const credits = Number.parseFloat(course.credits)
          const gradePoints = getGradePoints(course)
          const courseGP = credits * gradePoints

          totalGradePoints += courseGP
          totalCredits += credits

          courseResults.push({
            name: course.name || "Unnamed Course",
            credits,
            grade: course.grade,
            gradeFormat: course.gradeFormat,
            gradePoints,
            courseGP,
          })
        }
      })

      const semesterGPA = totalCredits > 0 ? totalGradePoints / totalCredits : 0

      return {
        name: semester.name,
        courses: courseResults,
        totalCredits,
        totalGradePoints,
        semesterGPA,
      }
    })

    // Calculate cumulative GPA
    let cumulativeTotalGP = 0
    let cumulativeTotalCredits = 0

    semesterResults.forEach((semester) => {
      cumulativeTotalGP += semester.totalGradePoints
      cumulativeTotalCredits += semester.totalCredits
    })

    // Include prior GPA if specified
    if (includePriorGPA && priorGPA && priorCredits) {
      const priorGP = Number.parseFloat(priorGPA) * Number.parseFloat(priorCredits)
      cumulativeTotalGP += priorGP
      cumulativeTotalCredits += Number.parseFloat(priorCredits)
    }

    const cumulativeGPA = cumulativeTotalCredits > 0 ? cumulativeTotalGP / cumulativeTotalCredits : 0

    // Calculate required GPA for planning
    let requiredGPA = null
    if (showPlanning && targetGPA && additionalCredits) {
      const target = Number.parseFloat(targetGPA)
      const additional = Number.parseFloat(additionalCredits)
      const currentGP = cumulativeGPA * cumulativeTotalCredits

      requiredGPA = (target * (cumulativeTotalCredits + additional) - currentGP) / additional
    }

    setResult({
      semesters: semesterResults,
      cumulativeGPA,
      cumulativeTotalCredits,
      cumulativeTotalGP,
      requiredGPA,
      includedPriorGPA: includePriorGPA,
      priorGPA: includePriorGPA ? Number.parseFloat(priorGPA) : null,
      priorCredits: includePriorGPA ? Number.parseFloat(priorCredits) : null,
    })
    setShowResult(true)
  }

  const resetCalculator = () => {
    setSemesters([
      {
        id: "1",
        name: "Current Semester",
        courses: [{ id: "1", name: "", credits: "", grade: "", gradeFormat: "letter" }],
      },
    ])
    setPriorGPA("")
    setPriorCredits("")
    setTargetGPA("")
    setAdditionalCredits("")
    setResult(null)
    setShowResult(false)
    setErrors({})
  }

  return (
    <>
      <SEO
        title="GPA Calculator – Calculate Your Grade Point Average"
        description="Calculate GPA quickly and accurately. Use our free GPA calculator to track academic performance and improve grades."
        slug="/gpa-calculator"
        keywords="GPA calculator, calculate GPA, grade point average, academic performance"
        type="SoftwareApplication"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">GPA Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/other-calculators" className="text-gray-500 hover:text-blue-600">
                Other
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">GPA Calculator</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">GPA Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate your semester GPA, cumulative GPA, and plan future grades to reach your target. Supports
                letter grades, percentages, and direct point values with multiple semesters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                      <span>Course & Grade Information</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Add your courses, credits, and grades for GPA calculation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Prior GPA Toggle */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Include Prior GPA</Label>
                          <p className="text-xs text-gray-600 mt-1">
                            Include previous semester grades in cumulative calculation
                          </p>
                        </div>
                        <Switch
                          checked={includePriorGPA}
                          onCheckedChange={setIncludePriorGPA}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>

                      {includePriorGPA && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Prior GPA</Label>
                            <Input
                              className={`h-10 ${errors.priorGPA ? "border-red-300" : ""}`}
                              type="number"
                              step="0.01"
                              min="0"
                              max="4.3"
                              placeholder="3.50"
                              value={priorGPA}
                              onChange={(e) => setPriorGPA(e.target.value)}
                            />
                            {errors.priorGPA && <p className="text-red-600 text-xs mt-1">{errors.priorGPA}</p>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Prior Credits</Label>
                            <Input
                              className={`h-10 ${errors.priorCredits ? "border-red-300" : ""}`}
                              type="number"
                              step="0.5"
                              min="0.1"
                              placeholder="30"
                              value={priorCredits}
                              onChange={(e) => setPriorCredits(e.target.value)}
                            />
                            {errors.priorCredits && <p className="text-red-600 text-xs mt-1">{errors.priorCredits}</p>}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Semesters */}
                    {semesters.map((semester, semesterIndex) => (
                      <div key={semester.id} className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-blue-700">{semester.name}</h3>
                          <Button
                            onClick={addSemester}
                            variant="outline"
                            size="sm"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Semester
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {semester.courses.map((course, courseIndex) => (
                            <div
                              key={course.id}
                              className="grid grid-cols-12 gap-3 items-end p-4 bg-gray-50 rounded-lg"
                            >
                              <div className="col-span-4">
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Course Name</Label>
                                <Input
                                  className="h-10"
                                  placeholder="e.g., Math 101"
                                  value={course.name}
                                  onChange={(e) => updateCourse(semester.id, course.id, "name", e.target.value)}
                                />
                              </div>
                              <div className="col-span-2">
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Credits</Label>
                                <Input
                                  className={`h-10 ${errors[`credits_${course.id}`] ? "border-red-300" : ""}`}
                                  type="number"
                                  step="0.5"
                                  min="0.1"
                                  max="20"
                                  placeholder="3"
                                  value={course.credits}
                                  onChange={(e) => updateCourse(semester.id, course.id, "credits", e.target.value)}
                                />
                                {errors[`credits_${course.id}`] && (
                                  <p className="text-red-600 text-xs mt-1">{errors[`credits_${course.id}`]}</p>
                                )}
                              </div>
                              <div className="col-span-2">
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Format</Label>
                                <Select
                                  value={course.gradeFormat}
                                  onValueChange={(value: "letter" | "percentage" | "points") =>
                                    updateCourse(semester.id, course.id, "gradeFormat", value)
                                  }
                                >
                                  <SelectTrigger className="h-10">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="letter">Letter</SelectItem>
                                    <SelectItem value="percentage">%</SelectItem>
                                    <SelectItem value="points">Points</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-3">
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Grade</Label>
                                {course.gradeFormat === "letter" ? (
                                  <Select
                                    value={course.grade}
                                    onValueChange={(value) => updateCourse(semester.id, course.id, "grade", value)}
                                  >
                                    <SelectTrigger
                                      className={`h-10 ${errors[`grade_${course.id}`] ? "border-red-300" : ""}`}
                                    >
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="A+">A+ (4.3)</SelectItem>
                                      <SelectItem value="A">A (4.0)</SelectItem>
                                      <SelectItem value="A-">A- (3.7)</SelectItem>
                                      <SelectItem value="B+">B+ (3.3)</SelectItem>
                                      <SelectItem value="B">B (3.0)</SelectItem>
                                      <SelectItem value="B-">B- (2.7)</SelectItem>
                                      <SelectItem value="C+">C+ (2.3)</SelectItem>
                                      <SelectItem value="C">C (2.0)</SelectItem>
                                      <SelectItem value="C-">C- (1.7)</SelectItem>
                                      <SelectItem value="D+">D+ (1.3)</SelectItem>
                                      <SelectItem value="D">D (1.0)</SelectItem>
                                      <SelectItem value="D-">D- (0.7)</SelectItem>
                                      <SelectItem value="F">F (0.0)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input
                                    className={`h-10 ${errors[`grade_${course.id}`] ? "border-red-300" : ""}`}
                                    type="number"
                                    step={course.gradeFormat === "percentage" ? "1" : "0.01"}
                                    min="0"
                                    max={course.gradeFormat === "percentage" ? "100" : "4.3"}
                                    placeholder={course.gradeFormat === "percentage" ? "85" : "3.5"}
                                    value={course.grade}
                                    onChange={(e) => updateCourse(semester.id, course.id, "grade", e.target.value)}
                                  />
                                )}
                                {errors[`grade_${course.id}`] && (
                                  <p className="text-red-600 text-xs mt-1">{errors[`grade_${course.id}`]}</p>
                                )}
                              </div>
                              <div className="col-span-1">
                                {semester.courses.length > 1 && (
                                  <Button
                                    onClick={() => removeCourse(semester.id, course.id)}
                                    variant="outline"
                                    size="sm"
                                    className="h-10 w-10 p-0 border-red-300 text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-center mb-6">
                      <Button
                        onClick={() => addCourse(semesters[semesters.length - 1].id)}
                        variant="outline"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Course
                      </Button>
                    </div>

                    {/* GPA Planning */}
                    <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">GPA Planning Tool</Label>
                          <p className="text-xs text-gray-600 mt-1">Calculate required GPA for future courses</p>
                        </div>
                        <Switch
                          checked={showPlanning}
                          onCheckedChange={setShowPlanning}
                          className="data-[state=checked]:bg-indigo-600"
                        />
                      </div>

                      {showPlanning && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Target GPA</Label>
                            <Input
                              className={`h-10 ${errors.targetGPA ? "border-red-300" : ""}`}
                              type="number"
                              step="0.01"
                              min="0"
                              max="4.3"
                              placeholder="3.75"
                              value={targetGPA}
                              onChange={(e) => setTargetGPA(e.target.value)}
                            />
                            {errors.targetGPA && <p className="text-red-600 text-xs mt-1">{errors.targetGPA}</p>}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Additional Credits</Label>
                            <Input
                              className={`h-10 ${errors.additionalCredits ? "border-red-300" : ""}`}
                              type="number"
                              step="0.5"
                              min="0.1"
                              placeholder="15"
                              value={additionalCredits}
                              onChange={(e) => setAdditionalCredits(e.target.value)}
                            />
                            {errors.additionalCredits && (
                              <p className="text-red-600 text-xs mt-1">{errors.additionalCredits}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={calculateGPA}
                        className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                      >
                        Calculate GPA
                      </Button>
                      <Button
                        onClick={resetCalculator}
                        variant="outline"
                        className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Result Card */}
              <div className="hidden lg:block">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 h-full flex flex-col justify-center items-center p-8">
                  <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mb-3 shadow-lg">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Your GPA</CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center">
                    {showResult && result ? (
                      <div className="text-center space-y-4">
                        <div className="bg-white p-6 rounded-lg border border-blue-200">
                          <p className="text-4xl font-bold text-blue-900">{result.cumulativeGPA.toFixed(2)}</p>
                          <p className="text-gray-600 mt-2">Cumulative GPA</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <p className="text-lg font-semibold text-blue-700">
                            {result.cumulativeTotalCredits} Total Credits
                          </p>
                        </div>
                        {result.cumulativeGPA >= 3.5 && (
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <p className="text-green-700 font-medium text-sm">🎉 Dean's List Eligible!</p>
                          </div>
                        )}
                        {result.cumulativeGPA < 2.0 && (
                          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                            <p className="text-red-700 font-medium text-sm">⚠️ Academic Probation Range</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-blue-300 mb-2" />
                        <p className="text-gray-500 text-center text-base">
                          Add your courses and click <span className="font-semibold text-blue-600">Calculate</span> to
                          see your GPA.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Results */}
            {showResult && result && (
              <div className="mt-8">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <span>Detailed GPA Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Semester Results */}
                    {result.semesters.map((semester: any, index: number) => (
                      <div key={index} className="mb-6">
                        <h3 className="text-lg font-semibold text-blue-700 mb-3">{semester.name}</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2">Course</th>
                                <th className="text-center py-2">Credits</th>
                                <th className="text-center py-2">Grade</th>
                                <th className="text-center py-2">Points</th>
                                <th className="text-center py-2">Grade Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {semester.courses.map((course: any, courseIndex: number) => (
                                <tr key={courseIndex} className="border-b border-gray-100">
                                  <td className="py-2">{course.name}</td>
                                  <td className="text-center py-2">{course.credits}</td>
                                  <td className="text-center py-2">{course.grade}</td>
                                  <td className="text-center py-2">{course.gradePoints.toFixed(2)}</td>
                                  <td className="text-center py-2">{course.courseGP.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-blue-700 font-medium">
                            Semester GPA: {semester.semesterGPA.toFixed(2)}({semester.totalCredits} credits,{" "}
                            {semester.totalGradePoints.toFixed(2)} grade points)
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Cumulative Summary */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Cumulative Summary:</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>
                          <strong>Total Credits:</strong> {result.cumulativeTotalCredits}
                        </p>
                        <p>
                          <strong>Total Grade Points:</strong> {result.cumulativeTotalGP.toFixed(2)}
                        </p>
                        <p>
                          <strong>Cumulative GPA:</strong> {result.cumulativeGPA.toFixed(2)}
                        </p>
                        {result.includedPriorGPA && (
                          <p>
                            <strong>Includes Prior GPA:</strong> {result.priorGPA} ({result.priorCredits} credits)
                          </p>
                        )}
                      </div>
                    </div>

                    {/* GPA Planning Results */}
                    {result.requiredGPA !== null && (
                      <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <h4 className="font-semibold text-indigo-700 mb-2">GPA Planning:</h4>
                        <div className="text-gray-700">
                          {result.requiredGPA > 4.3 ? (
                            <p className="text-red-600 font-medium">
                              Target GPA of {Number.parseFloat(targetGPA).toFixed(2)} is not achievable with{" "}
                              {additionalCredits} additional credits.
                            </p>
                          ) : result.requiredGPA < 0 ? (
                            <p className="text-green-600 font-medium">
                              You've already exceeded your target GPA of {Number.parseFloat(targetGPA).toFixed(2)}!
                            </p>
                          ) : (
                            <p>
                              <strong>Required GPA for next {additionalCredits} credits:</strong>{" "}
                              {result.requiredGPA.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-3 shadow-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">Understanding GPA</CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Grade Scale (4.3 System)</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <strong>A+ = 4.3</strong>
                          </div>
                          <div>
                            <strong>B+ = 3.3</strong>
                          </div>
                          <div>A = 4.0</div>
                          <div>B = 3.0</div>
                          <div>A- = 3.7</div>
                          <div>B- = 2.7</div>
                          <div>
                            <strong>C+ = 2.3</strong>
                          </div>
                          <div>
                            <strong>D+ = 1.3</strong>
                          </div>
                          <div>C = 2.0</div>
                          <div>D = 1.0</div>
                          <div>C- = 1.7</div>
                          <div>D- = 0.7</div>
                          <div className="col-span-2">
                            <strong>F = 0.0</strong>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">GPA Ranges</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        <li>
                          <strong>4.0+:</strong> Summa Cum Laude
                        </li>
                        <li>
                          <strong>3.7-3.99:</strong> Magna Cum Laude
                        </li>
                        <li>
                          <strong>3.5-3.69:</strong> Cum Laude / Dean's List
                        </li>
                        <li>
                          <strong>3.0-3.49:</strong> Good Standing
                        </li>
                        <li>
                          <strong>2.0-2.99:</strong> Satisfactory
                        </li>
                        <li>
                          <strong>Below 2.0:</strong> Academic Probation
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 mb-3">Sample Calculation</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                        <p className="text-gray-700 mb-2">
                          <strong>Example Courses:</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>Math (4 credits): A+ → 4 × 4.3 = 17.2</p>
                          <p>Physics (2 credits): B → 2 × 3.0 = 6.0</p>
                          <p>English (3 credits): A → 3 × 4.0 = 12.0</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-gray-700 mb-2">
                          <strong>Calculation:</strong>
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>Total Credits = 9</p>
                          <p>Total Grade Points = 35.2</p>
                          <p>
                            <strong>GPA = 35.2 ÷ 9 = 3.91</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
