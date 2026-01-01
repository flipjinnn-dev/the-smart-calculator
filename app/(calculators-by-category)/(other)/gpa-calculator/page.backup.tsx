"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { GraduationCap, Calculator, Plus, Trash2, RotateCcw, BookOpen } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';
interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
  gradeFormat: "letter" | "percentage" | "points";
}
interface Semester {
  id: string;
  name: string;
  courses: Course[];
}
export default function GpaCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('gpa-calculator', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'gpa-calculator',
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
    "include_prior_gpa_0": "",
    "include_previous_semester_grades_in_cumulative_cal_1": "",
    "prior_gpa_2": "",
    "prior_credits_3": "",
    "add_semester_4": "",
    "course_name_5": "",
    "credits_6": "",
    "format_7": "",
    "letter_8": "",
    "points_9": "",
    "grade_10": "",
    "a_43_11": "",
    "a_40_12": "",
    "a_37_13": "",
    "b_33_14": "",
    "b_30_15": "",
    "b_27_16": "",
    "c_23_17": "",
    "c_20_18": "",
    "c_17_19": "",
    "d_13_20": "",
    "d_10_21": "",
    "d_07_22": "",
    "f_00_23": "",
    "add_course_24": "",
    "gpa_planning_tool_25": "",
    "calculate_gpa_for_future_courses_26": "",
    "target_gpa_27": "",
    "additional_credits_28": "",
    "calculate_29": "",
    "reset_30": "",
    "your_gpa_31": "",
    "cumulative_gpa_32": "",
    "total_credits_33": "",
    "deans_list_eligible_34": "",
    "academic_probation_range_35": "",
    "add_your_courses_and_click_36": "",
    "calculate_37": "",
    "to_see_your_gpa_38": "",
    "detailed_gpa_breakdown_39": "",
    "course_40": "",
    "credits_41": "",
    "grade_42": "",
    "points_43": "",
    "grade_points_44": "",
    "semester_gpa_45": "",
    "credits_46": "",
    "grade_points_47": "",
    "cumulative_summary_48": "",
    "total_credits_49": "",
    "total_grade_points_50": "",
    "cumulative_gpa_51": "",
    "includes_prior_gpa_52": "",
    "credits_53": "",
    "gpa_planning_54": "",
    "target_gpa_of_55": "",
    "is_not_achievable_with_56": "",
    "additional_credits_57": "",
    "youve_already_exceeded_your_target_gpa_of_58": "",
    "required_gpa_for_next_59": "",
    "credits_60": "",
    "understanding_gpa_61": "",
    "grade_scale_43_system_62": "",
    "a_43_63": "",
    "b_33_64": "",
    "a_40_65": "",
    "b_30_66": "",
    "a_37_67": "",
    "b_27_68": "",
    "c_23_69": "",
    "d_13_70": "",
    "c_20_71": "",
    "d_10_72": "",
    "c_17_73": "",
    "d_07_74": "",
    "f_00_75": "",
    "gpa_ranges_76": "",
    "k_40_77": "",
    "summa_cum_laude_78": "",
    "k_37399_79": "",
    "magna_cum_laude_80": "",
    "k_35369_81": "",
    "cum_laude_deans_list_82": "",
    "k_30349_83": "",
    "good_standing_84": "",
    "k_20299_85": "",
    "satisfactory_86": "",
    "below_20_87": "",
    "academic_probation_88": "",
    "sample_calculation_89": "",
    "example_courses_90": "",
    "math_4_credits_a_4_43_172_91": "",
    "physics_2_credits_b_2_30_60_92": "",
    "english_3_credits_a_3_40_120_93": "",
    "calculation_94": "",
    "total_credits_9_95": "",
    "total_grade_points_352_96": "",
    "gpa_352_9_391_97": "",
    "course_grade_information_0": "",
    "add_your_courses_credits_and_grades_for_gpa_calcul_1": "",
    "include_prior_gpa_2": "",
    "include_previous_semester_grades_in_cumulative_cal_3": "",
    "prior_gpa_4": "",
    "prior_credits_5": "",
    "add_semester_6": "",
    "course_name_7": "",
    "credits_8": "",
    "format_9": "",
    "letter_10": "",
    "points_11": "",
    "grade_12": "",
    "a_43_13": "",
    "a_40_14": "",
    "a_37_15": "",
    "b_33_16": "",
    "b_30_17": "",
    "b_27_18": "",
    "c_23_19": "",
    "c_20_20": "",
    "c_17_21": "",
    "d_13_22": "",
    "d_10_23": "",
    "d_07_24": "",
    "f_00_25": "",
    "add_course_26": "",
    "gpa_planning_tool_27": "",
    "calculate_gpa_for_future_courses_28": "",
    "target_gpa_29": "",
    "additional_credits_30": "",
    "calculate_31": "",
    "reset_32": "",
    "your_gpa_33": "",
    "cumulative_gpa_34": "",
    "total_credits_35": "",
    "deans_list_eligible_36": "",
    "academic_probation_range_37": "",
    "add_your_courses_and_click_38": "",
    "calculate_39": "",
    "to_see_your_gpa_40": "",
    "detailed_gpa_breakdown_41": "",
    "course_42": "",
    "credits_43": "",
    "grade_44": "",
    "points_45": "",
    "grade_points_46": "",
    "semester_gpa_47": "",
    "credits_48": "",
    "grade_points_49": "",
    "cumulative_summary_50": "",
    "total_credits_51": "",
    "total_grade_points_52": "",
    "cumulative_gpa_53": "",
    "includes_prior_gpa_54": "",
    "credits_55": "",
    "gpa_planning_56": "",
    "target_gpa_of_57": "",
    "is_not_achievable_with_58": "",
    "additional_credits_59": "",
    "youve_already_exceeded_your_target_gpa_of_60": "",
    "required_gpa_for_next_61": "",
    "credits_62": "",
    "understanding_gpa_63": "",
    "grade_scale_43_system_64": "",
    "a_43_65": "",
    "b_33_66": "",
    "a_40_67": "",
    "b_30_68": "",
    "a_37_69": "",
    "b_27_70": "",
    "c_23_71": "",
    "d_13_72": "",
    "c_20_73": "",
    "d_10_74": "",
    "c_17_75": "",
    "d_07_76": "",
    "f_00_77": "",
    "gpa_ranges_78": "",
    "k_40_79": "",
    "summa_cum_laude_80": "",
    "k_37399_81": "",
    "magna_cum_laude_82": "",
    "k_35369_83": "",
    "cum_laude_deans_list_84": "",
    "k_30349_85": "",
    "good_standing_86": "",
    "k_20299_87": "",
    "satisfactory_88": "",
    "below_20_89": "",
    "academic_probation_90": "",
    "sample_calculation_91": "",
    "example_courses_92": "",
    "math_4_credits_a_4_43_172_93": "",
    "physics_2_credits_b_2_30_60_94": "",
    "english_3_credits_a_3_40_120_95": "",
    "calculation_96": "",
    "total_credits_9_97": "",
    "total_grade_points_352_98": "",
    "gpa_352_9_391_99": ""
  };
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Semester and course management
  const [semesters, setSemesters] = useState<Semester[]>([{
    id: "1",
    name: "Current Semester",
    courses: [{
      id: "1",
      name: "",
      credits: "",
      grade: "",
      gradeFormat: "letter"
    }]
  }]);

  // Prior GPA settings
  const [includePriorGPA, setIncludePriorGPA] = useState(false);
  const [priorGPA, setPriorGPA] = useState("");
  const [priorCredits, setPriorCredits] = useState("");

  // GPA Planning
  const [showPlanning, setShowPlanning] = useState(false);
  const [targetGPA, setTargetGPA] = useState("");
  const [additionalCredits, setAdditionalCredits] = useState("");

  // Grade conversion functions
  const convertLetterToPoints = (letter: string): number => {
    const gradeMap: {
      [key: string]: number;
    } = {
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
      F: 0.0
    };
    return gradeMap[letter] || 0;
  };
  const convertPercentageToPoints = (percentage: number): number => {
    if (percentage >= 97) return 4.3;
    if (percentage >= 93) return 4.0;
    if (percentage >= 90) return 3.7;
    if (percentage >= 87) return 3.3;
    if (percentage >= 83) return 3.0;
    if (percentage >= 80) return 2.7;
    if (percentage >= 77) return 2.3;
    if (percentage >= 73) return 2.0;
    if (percentage >= 70) return 1.7;
    if (percentage >= 67) return 1.3;
    if (percentage >= 65) return 1.0;
    if (percentage >= 60) return 0.7;
    return 0.0;
  };
  const getGradePoints = (course: Course): number => {
    if (!course.grade) return 0;
    switch (course.gradeFormat) {
      case "letter":
        return convertLetterToPoints(course.grade);
      case "percentage":
        return convertPercentageToPoints(Number.parseFloat(course.grade));
      case "points":
        return Math.min(4.3, Math.max(0, Number.parseFloat(course.grade)));
      default:
        return 0;
    }
  };
  const addCourse = (semesterId: string) => {
    setSemesters(prev => prev.map(semester => semester.id === semesterId ? {
      ...semester,
      courses: [...semester.courses, {
        id: Date.now().toString(),
        name: "",
        credits: "",
        grade: "",
        gradeFormat: "letter"
      }]
    } : semester));
  };
  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters(prev => prev.map(semester => semester.id === semesterId ? {
      ...semester,
      courses: semester.courses.filter(course => course.id !== courseId)
    } : semester));
  };
  const updateCourse = (semesterId: string, courseId: string, field: keyof Course, value: string) => {
    setSemesters(prev => prev.map(semester => semester.id === semesterId ? {
      ...semester,
      courses: semester.courses.map(course => course.id === courseId ? {
        ...course,
        [field]: value
      } : course)
    } : semester));
  };
  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      courses: [{
        id: Date.now().toString(),
        name: "",
        credits: "",
        grade: "",
        gradeFormat: "letter"
      }]
    };
    setSemesters(prev => [...prev, newSemester]);
  };
  const validateInputs = () => {
    const newErrors: {
      [key: string]: string;
    } = {};

    // Validate courses
    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        if (course.credits && course.grade) {
          const credits = Number.parseFloat(course.credits);
          if (credits <= 0 || credits > 20) {
            newErrors[`credits_${course.id}`] = "Credits must be between 0.1 and 20";
          }
          if (course.gradeFormat === "percentage") {
            const percentage = Number.parseFloat(course.grade);
            if (percentage < 0 || percentage > 100) {
              newErrors[`grade_${course.id}`] = "Percentage must be between 0 and 100";
            }
          } else if (course.gradeFormat === "points") {
            const points = Number.parseFloat(course.grade);
            if (points < 0 || points > 4.3) {
              newErrors[`grade_${course.id}`] = "Grade points must be between 0 and 4.3";
            }
          }
        }
      });
    });

    // Validate prior GPA
    if (includePriorGPA) {
      if (!priorGPA || Number.parseFloat(priorGPA) < 0 || Number.parseFloat(priorGPA) > 4.3) {
        newErrors.priorGPA = "Prior GPA must be between 0.0 and 4.3";
      }
      if (!priorCredits || Number.parseFloat(priorCredits) <= 0) {
        newErrors.priorCredits = "Prior credits must be greater than 0";
      }
    }

    // Validate planning inputs
    if (showPlanning) {
      if (!targetGPA || Number.parseFloat(targetGPA) < 0 || Number.parseFloat(targetGPA) > 4.3) {
        newErrors.targetGPA = "Target GPA must be between 0.0 and 4.3";
      }
      if (!additionalCredits || Number.parseFloat(additionalCredits) <= 0) {
        newErrors.additionalCredits = "Additional credits must be greater than 0";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  interface CourseResult {
    name: string;
    credits: number;
    grade: string;
    gradeFormat: string;
    gradePoints: number;
    courseGP: number;
  }
  const calculateGPA = () => {
    const resultsRefElement = resultsRef.current;
    if (resultsRefElement) {
      resultsRefElement.scrollIntoView({
        behavior: "smooth"
      });
    }
    if (!validateInputs()) return;
    const semesterResults = semesters.map(semester => {
      let totalGradePoints = 0;
      let totalCredits = 0;
      const courseResults: CourseResult[] = [];
      semester.courses.forEach(course => {
        if (course.credits && course.grade) {
          const credits = Number.parseFloat(course.credits);
          const gradePoints = getGradePoints(course);
          const courseGP = credits * gradePoints;
          totalGradePoints += courseGP;
          totalCredits += credits;
          courseResults.push({
            name: course.name || "Unnamed Course",
            credits,
            grade: course.grade,
            gradeFormat: course.gradeFormat,
            gradePoints,
            courseGP
          });
        }
      });
      const semesterGPA = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
      return {
        name: semester.name,
        courses: courseResults,
        totalCredits,
        totalGradePoints,
        semesterGPA
      };
    });

    // Calculate GPA
    let cumulativeTotalGP = 0;
    let cumulativeTotalCredits = 0;
    semesterResults.forEach(semester => {
      cumulativeTotalGP += semester.totalGradePoints;
      cumulativeTotalCredits += semester.totalCredits;
    });

    // Include prior GPA if specified
    if (includePriorGPA && priorGPA && priorCredits) {
      const priorGP = Number.parseFloat(priorGPA) * Number.parseFloat(priorCredits);
      cumulativeTotalGP += priorGP;
      cumulativeTotalCredits += Number.parseFloat(priorCredits);
    }
    const cumulativeGPA = cumulativeTotalCredits > 0 ? cumulativeTotalGP / cumulativeTotalCredits : 0;

    // Calculate GPA for planning
    let requiredGPA = null;
    if (showPlanning && targetGPA && additionalCredits) {
      const target = Number.parseFloat(targetGPA);
      const additional = Number.parseFloat(additionalCredits);
      const currentGP = cumulativeGPA * cumulativeTotalCredits;
      requiredGPA = (target * (cumulativeTotalCredits + additional) - currentGP) / additional;
    }
    setResult({
      semesters: semesterResults,
      cumulativeGPA,
      cumulativeTotalCredits,
      cumulativeTotalGP,
      requiredGPA,
      includedPriorGPA: includePriorGPA,
      priorGPA: includePriorGPA ? Number.parseFloat(priorGPA) : null,
      priorCredits: includePriorGPA ? Number.parseFloat(priorCredits) : null
    });
    setShowResult(true);
  };
  const resetCalculator = () => {
    setSemesters([{
      id: "1",
      name: "Current Semester",
      courses: [{
        id: "1",
        name: "",
        credits: "",
        grade: "",
        gradeFormat: "letter"
      }]
    }]);
    setPriorGPA("");
    setPriorCredits("");
    setTargetGPA("");
    setAdditionalCredits("");
    setResult(null);
    setShowResult(false);
    setErrors({});
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  return <>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <span>{contentData.course_grade_information_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.add_your_courses_credits_and_grades_for_gpa_calcul_1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Prior GPA Toggle */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">{contentData.include_prior_gpa_2}</Label>
                        <p className="text-xs text-gray-600 mt-1">{contentData.include_previous_semester_grades_in_cumulative_cal_3}</p>
                      </div>
                      <Switch checked={includePriorGPA} onCheckedChange={setIncludePriorGPA} className="data-[state=checked]:bg-blue-600" />
                    </div>

                    {includePriorGPA && <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.prior_gpa_4}</Label>
                        <Input className={`h-10 ${errors.priorGPA ? "border-red-300" : ""}`} type="number" step="0.01" min="0" max="4.3" placeholder="3.50" value={priorGPA} onChange={e => setPriorGPA(e.target.value)} />
                        {errors.priorGPA && <p className="text-red-600 text-xs mt-1">{errors.priorGPA}</p>}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.prior_credits_5}</Label>
                        <Input className={`h-10 ${errors.priorCredits ? "border-red-300" : ""}`} type="number" step="0.5" min="0.1" placeholder="30" value={priorCredits} onChange={e => setPriorCredits(e.target.value)} />
                        {errors.priorCredits && <p className="text-red-600 text-xs mt-1">{errors.priorCredits}</p>}
                      </div>
                    </div>}
                  </div>

                  {/* Semesters */}
                  {semesters.map((semester, semesterIndex) => <div key={semester.id} className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-blue-700">{semester.name}</h3>
                      <Button onClick={addSemester} variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                        <Plus className="w-4 h-4 mr-1" />{contentData.add_semester_6}</Button>
                    </div>

                    <div className="space-y-4">
                      {semester.courses.map((course, courseIndex) => <div key={course.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end p-4 bg-gray-50 rounded-lg">
                        <div className="sm:col-span-2 lg:col-span-4">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.course_name_7}</Label>
                          <Input className="h-10" placeholder="e.g., Math 101" value={course.name} onChange={e => updateCourse(semester.id, course.id, "name", e.target.value)} />
                        </div>
                        <div className="lg:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.credits_8}</Label>
                          <Input className={`h-10 ${errors[`credits_${course.id}`] ? "border-red-300" : ""}`} type="number" step="0.5" min="0.1" max="20" placeholder="3" value={course.credits} onChange={e => updateCourse(semester.id, course.id, "credits", e.target.value)} />
                          {errors[`credits_${course.id}`] && <p className="text-red-600 text-xs mt-1">{errors[`credits_${course.id}`]}</p>}
                        </div>
                        <div className="lg:col-span-2">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.format_9}</Label>
                          <Select value={course.gradeFormat} onValueChange={(value: "letter" | "percentage" | "points") => updateCourse(semester.id, course.id, "gradeFormat", value)}>
                            <SelectTrigger className="h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="letter">{contentData.letter_10}</SelectItem>
                              <SelectItem value="percentage">%</SelectItem>
                              <SelectItem value="points">{contentData.points_11}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="lg:col-span-3">
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.grade_12}</Label>
                          {course.gradeFormat === "letter" ? <Select value={course.grade} onValueChange={value => updateCourse(semester.id, course.id, "grade", value)}>
                            <SelectTrigger className={`h-10 ${errors[`grade_${course.id}`] ? "border-red-300" : ""}`}>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">{contentData.a_43_13}</SelectItem>
                              <SelectItem value="A">{contentData.a_40_14}</SelectItem>
                              <SelectItem value="A-">{contentData.a_37_15}</SelectItem>
                              <SelectItem value="B+">{contentData.b_33_16}</SelectItem>
                              <SelectItem value="B">{contentData.b_30_17}</SelectItem>
                              <SelectItem value="B-">{contentData.b_27_18}</SelectItem>
                              <SelectItem value="C+">{contentData.c_23_19}</SelectItem>
                              <SelectItem value="C">{contentData.c_20_20}</SelectItem>
                              <SelectItem value="C-">{contentData.c_17_21}</SelectItem>
                              <SelectItem value="D+">{contentData.d_13_22}</SelectItem>
                              <SelectItem value="D">{contentData.d_10_23}</SelectItem>
                              <SelectItem value="D-">{contentData.d_07_24}</SelectItem>
                              <SelectItem value="F">{contentData.f_00_25}</SelectItem>
                            </SelectContent>
                          </Select> : <Input className={`h-10 ${errors[`grade_${course.id}`] ? "border-red-300" : ""}`} type="number" step={course.gradeFormat === "percentage" ? "1" : "0.01"} min="0" max={course.gradeFormat === "percentage" ? "100" : "4.3"} placeholder={course.gradeFormat === "percentage" ? "85" : "3.5"} value={course.grade} onChange={e => updateCourse(semester.id, course.id, "grade", e.target.value)} />}
                          {errors[`grade_${course.id}`] && <p className="text-red-600 text-xs mt-1">{errors[`grade_${course.id}`]}</p>}
                        </div>
                        <div className="lg:col-span-1 flex justify-end">
                          {semester.courses.length > 1 && <Button onClick={() => removeCourse(semester.id, course.id)} variant="outline" size="sm" className="h-10 w-10 p-0 border-red-300 text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>}
                        </div>
                      </div>)}
                    </div>
                  </div>)}

                  <div className="flex justify-center mb-6">
                    <Button onClick={() => addCourse(semesters[semesters.length - 1].id)} variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />{contentData.add_course_26}</Button>
                  </div>

                  {/* GPA Planning */}
                  <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">{contentData.gpa_planning_tool_27}</Label>
                        <p className="text-xs text-gray-600 mt-1">{contentData.calculate_gpa_for_future_courses_28}</p>
                      </div>
                      <Switch checked={showPlanning} onCheckedChange={setShowPlanning} className="data-[state=checked]:bg-indigo-600" />
                    </div>

                    {showPlanning && <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.target_gpa_29}</Label>
                        <Input className={`h-10 ${errors.targetGPA ? "border-red-300" : ""}`} type="number" step="0.01" min="0" max="4.3" placeholder="3.75" value={targetGPA} onChange={e => setTargetGPA(e.target.value)} />
                        {errors.targetGPA && <p className="text-red-600 text-xs mt-1">{errors.targetGPA}</p>}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">{contentData.additional_credits_30}</Label>
                        <Input className={`h-10 ${errors.additionalCredits ? "border-red-300" : ""}`} type="number" step="0.5" min="0.1" placeholder="15" value={additionalCredits} onChange={e => setAdditionalCredits(e.target.value)} />
                        {errors.additionalCredits && <p className="text-red-600 text-xs mt-1">{errors.additionalCredits}</p>}
                      </div>
                    </div>}
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={calculateGPA} className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">{contentData.calculate_31}</Button>
                    <Button onClick={resetCalculator} variant="outline" className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
                      <RotateCcw className="w-4 h-4 mr-2" />{contentData.reset_32}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Result Card */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-6 lg:p-8">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mb-3 shadow-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.your_gpa_33}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center space-y-4">
                    <div className="bg-white p-6 rounded-lg border border-blue-200">
                      <p className="text-4xl font-bold text-blue-900">{result.cumulativeGPA.toFixed(2)}</p>
                      <p className="text-gray-600 mt-2">{contentData.cumulative_gpa_34}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <p className="text-lg font-semibold text-blue-700">
                        {result.cumulativeTotalCredits}{contentData.total_credits_35}</p>
                    </div>
                    {result.cumulativeGPA >= 3.5 && <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-green-700 font-medium text-sm">{contentData.deans_list_eligible_36}</p>
                    </div>}
                    {result.cumulativeGPA < 2.0 && <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="text-red-700 font-medium text-sm">{contentData.academic_probation_range_37}</p>
                    </div>}
                  </div> : <div className="flex flex-col items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-blue-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.add_your_courses_and_click_38}<span className="font-semibold text-blue-600">{contentData.calculate_39}</span>{contentData.to_see_your_gpa_40}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Results */}
          {showResult && result && <div ref={resultsRef} className="mt-8">
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  <span>{contentData.detailed_gpa_breakdown_41}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {/* Semester Results */}
                {result.semesters.map((semester: any, index: number) => <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">{semester.name}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2">{contentData.course_42}</th>
                          <th className="text-center py-2">{contentData.credits_43}</th>
                          <th className="text-center py-2">{contentData.grade_44}</th>
                          <th className="text-center py-2">{contentData.points_45}</th>
                          <th className="text-center py-2">{contentData.grade_points_46}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.courses.map((course: any, courseIndex: number) => <tr key={courseIndex} className="border-b border-gray-100">
                          <td className="py-2">{course.name}</td>
                          <td className="text-center py-2">{course.credits}</td>
                          <td className="text-center py-2">{course.grade}</td>
                          <td className="text-center py-2">{course.gradePoints.toFixed(2)}</td>
                          <td className="text-center py-2">{course.courseGP.toFixed(2)}</td>
                        </tr>)}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-700 font-medium">{contentData.semester_gpa_47}{semester.semesterGPA.toFixed(2)}({semester.totalCredits}{contentData.credits_48}{" "}
                      {semester.totalGradePoints.toFixed(2)}{contentData.grade_points_49}</p>
                  </div>
                </div>)}

                {/* Cumulative Summary */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2">{contentData.cumulative_summary_50}</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>
                      <strong>{contentData.total_credits_51}</strong> {result.cumulativeTotalCredits}
                    </p>
                    <p>
                      <strong>{contentData.total_grade_points_52}</strong> {result.cumulativeTotalGP.toFixed(2)}
                    </p>
                    <p>
                      <strong>{contentData.cumulative_gpa_53}</strong> {result.cumulativeGPA.toFixed(2)}
                    </p>
                    {result.includedPriorGPA && <p>
                      <strong>{contentData.includes_prior_gpa_54}</strong> {result.priorGPA} ({result.priorCredits}{contentData.credits_55}</p>}
                  </div>
                </div>

                {/* GPA Planning Results */}
                {result.requiredGPA !== null && <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-700 mb-2">{contentData.gpa_planning_56}</h4>
                  <div className="text-gray-700">
                    {result.requiredGPA > 4.3 ? <p className="text-red-600 font-medium">{contentData.target_gpa_of_57}{Number.parseFloat(targetGPA).toFixed(2)}{contentData.is_not_achievable_with_58}{" "}
                      {additionalCredits}{contentData.additional_credits_59}</p> : result.requiredGPA < 0 ? <p className="text-green-600 font-medium">{contentData.youve_already_exceeded_your_target_gpa_of_60}{Number.parseFloat(targetGPA).toFixed(2)}!
                      </p> : <p>
                      <strong>{contentData.required_gpa_for_next_61}{additionalCredits}{contentData.credits_62}</strong>{" "}
                      {result.requiredGPA.toFixed(2)}
                    </p>}
                  </div>
                </div>}
              </CardContent>
            </Card>
          </div>}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="gpa-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Piecewise Function Calculator",
            calculatorHref: "/piecewise-function-calculator-grapher",
            calculatorDescription: "Define each piece of your piecewise function with expressions and domains"
          },
          ]}
            color="blue"
            title="Related Other Calculators" />
          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-3 shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-700 tracking-tight">{contentData.understanding_gpa_63}</CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.grade_scale_43_system_64}</h3>
                    <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <strong>{contentData.a_43_65}</strong>
                        </div>
                        <div>
                          <strong>{contentData.b_33_66}</strong>
                        </div>
                        <div>{contentData.a_40_67}</div>
                        <div>{contentData.b_30_68}</div>
                        <div>{contentData.a_37_69}</div>
                        <div>{contentData.b_27_70}</div>
                        <div>
                          <strong>{contentData.c_23_71}</strong>
                        </div>
                        <div>
                          <strong>{contentData.d_13_72}</strong>
                        </div>
                        <div>{contentData.c_20_73}</div>
                        <div>{contentData.d_10_74}</div>
                        <div>{contentData.c_17_75}</div>
                        <div>{contentData.d_07_76}</div>
                        <div className="col-span-2">
                          <strong>{contentData.f_00_77}</strong>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.gpa_ranges_78}</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>
                        <strong>{contentData.k_40_79}</strong>{contentData.summa_cum_laude_80}</li>
                      <li>
                        <strong>{contentData.k_37399_81}</strong>{contentData.magna_cum_laude_82}</li>
                      <li>
                        <strong>{contentData.k_35369_83}</strong>{contentData.cum_laude_deans_list_84}</li>
                      <li>
                        <strong>{contentData.k_30349_85}</strong>{contentData.good_standing_86}</li>
                      <li>
                        <strong>{contentData.k_20299_87}</strong>{contentData.satisfactory_88}</li>
                      <li>
                        <strong>{contentData.below_20_89}</strong>{contentData.academic_probation_90}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">{contentData.sample_calculation_91}</h3>
                    <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.example_courses_92}</strong>
                      </p>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>{contentData.math_4_credits_a_4_43_172_93}</p>
                        <p>{contentData.physics_2_credits_b_2_30_60_94}</p>
                        <p>{contentData.english_3_credits_a_3_40_120_95}</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.calculation_96}</strong>
                      </p>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>{contentData.total_credits_9_97}</p>
                        <p>{contentData.total_grade_points_352_98}</p>
                        <p>
                          <strong>{contentData.gpa_352_9_391_99}</strong>
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
  </>;
}