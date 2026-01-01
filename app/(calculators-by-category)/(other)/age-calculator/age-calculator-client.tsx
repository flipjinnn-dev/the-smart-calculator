"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, AlertCircle } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface AgeCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function AgeCalculatorClient({ content, guideContent }: AgeCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
"calculator-guide"                   // Content type  
    const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    dateOfBirth?: string;
    targetDate?: string;
  }>({});

  // Input states
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);

          const validateInputs = () => {
    const newErrors: {
      dateOfBirth?: string;
      targetDate?: string;
    } = {};
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Please enter your date of birth";
    }
    if (!targetDate) {
      newErrors.targetDate = "Please enter the target date";
    }
    if (dateOfBirth && targetDate) {
      const birthDate = new Date(dateOfBirth);
      const target = new Date(targetDate);
      if (birthDate > target) {
        newErrors.targetDate = "Target date must be after date of birth";
      }

      // Check if birth date is not in the future
      const today = new Date();
      if (birthDate > today) {
        newErrors.dateOfBirth = "Date of birth cannot be in the future";
      }

      // Check if dates are valid
      if (isNaN(birthDate.getTime())) {
        newErrors.dateOfBirth = "Please enter a valid date";
      }
      if (isNaN(target.getTime())) {
        newErrors.targetDate = "Please enter a valid date";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const calculateAge = () => {
    if (!validateInputs()) {
      return;
    }
    const birthDate = new Date(dateOfBirth);
    const target = new Date(targetDate);

    // Calculate difference in milliseconds
    const totalMs = target.getTime() - birthDate.getTime();
    const totalSeconds = Math.floor(totalMs / 1000);

    // Calculate, months, days using precise calendar arithmetic
    let years = target.getFullYear() - birthDate.getFullYear();
    let months = target.getMonth() - birthDate.getMonth();
    let days = target.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate time components
    const remainingMs = totalMs - years * 365.25 * 24 * 60 * 60 * 1000 - months * 30.44 * 24 * 60 * 60 * 1000 - days * 24 * 60 * 60 * 1000;
    const remainingSeconds = Math.floor(remainingMs / 1000);
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor(remainingSeconds % 3600 / 60);
    const seconds = remainingSeconds % 60;

    // Calculate units for display
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(totalMs / (1000 * 60));
    setResult({
      years,
      months,
      days,
      weeks: totalWeeks,
      hours,
      minutes,
      seconds,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      birthDate: birthDate.toLocaleDateString(),
      targetDate: target.toLocaleDateString()
    });
    setShowResult(true);
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form (left) */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    <span>{contentData.age_calculation_1}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.enter_your_birth_date_and_target_date_to_calculate_2}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.date_of_birth_3}</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-purple-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.dateOfBirth ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="date" value={dateOfBirth} onChange={e => {
                          setDateOfBirth(e.target.value);
                          if (errors.dateOfBirth) {
                            setErrors(prev => ({
                              ...prev,
                              dateOfBirth: undefined
                            }));
                          }
                        }} />
                      </div>
                      {errors.dateOfBirth && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.dateOfBirth}</span>
                      </div>}
                    </div>
                    <div className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">{contentData.target_date_4}</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-purple-500" />
                        </div>
                        <Input className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.targetDate ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`} type="date" value={targetDate} onChange={e => {
                          setTargetDate(e.target.value);
                          if (errors.targetDate) {
                            setErrors(prev => ({
                              ...prev,
                              targetDate: undefined
                            }));
                          }
                        }} />
                      </div>
                      {errors.targetDate && <div className="flex items-center mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{errors.targetDate}</span>
                      </div>}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-700">
                      <strong>{contentData.how_it_works_5}</strong>{contentData.the_calculator_uses_precise_calendar_arithmetic_to_6}</p>
                    <p className="text-xs text-gray-600 mt-1">{contentData.results_include_both_exact_age_breakdown_and_total_7}</p>
                  </div>

                  <Button onClick={calculateAge} className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">{contentData.calculate_8}</Button>
                </CardContent>
              </Card>
            </div>

            {/* Result Card (right side) */}
            <div className="">
              <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 h-full flex flex-col justify-center items-center p-8">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mb-3 shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.your_age_9}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? <div className="text-center space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white p-3 rounded-lg border border-purple-200">
                        <p className="text-2xl font-bold text-purple-900">{result.years}</p>
                        <p className="text-gray-600">{contentData.years_10}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-purple-200">
                        <p className="text-2xl font-bold text-purple-900">{result.months}</p>
                        <p className="text-gray-600">{contentData.months_11}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-purple-200">
                        <p className="text-2xl font-bold text-purple-900">{result.totalWeeks}</p>
                        <p className="text-gray-600">{contentData.weeks_12}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-purple-200">
                        <p className="text-2xl font-bold text-purple-900">{result.totalDays}</p>
                        <p className="text-gray-600">{contentData.days_13}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                      <p className="text-xs text-gray-600">{contentData.from_14}{result.birthDate}{contentData.to_15}{result.targetDate}
                      </p>
                    </div>
                  </div> : <div className="flex flex-col items-center justify-center">
                    <Calendar className="w-8 h-8 text-purple-300 mb-2" />
                    <p className="text-gray-500 text-center text-base">{contentData.enter_your_dates_and_click_16}<span className="font-semibold text-purple-600">{contentData.calculate_17}</span>{contentData.to_see_your_exact_age_18}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Results Section */}
          {showResult && result && <div className="mt-8">
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <span>{contentData.detailed_age_breakdown_19}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                    <p className="text-2xl md:text-3xl font-bold text-purple-900">{result.years}</p>
                    <p className="text-sm text-gray-600 mt-1">{contentData.years_20}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                    <p className="text-2xl md:text-3xl font-bold text-purple-900">{result.months}</p>
                    <p className="text-sm text-gray-600 mt-1">{contentData.months_21}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                    <p className="text-2xl md:text-3xl font-bold text-purple-900">{result.totalWeeks}</p>
                    <p className="text-sm text-gray-600 mt-1">{contentData.weeks_22}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                    <p className="text-2xl md:text-3xl font-bold text-purple-900">{result.totalDays}</p>
                    <p className="text-sm text-gray-600 mt-1">{contentData.days_23}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-900 break-all">
                      {result.totalHours.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{contentData.hours_24}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-900 break-all">
                      {result.totalMinutes.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{contentData.minutes_25}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                    <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-900 break-all leading-tight">
                      {result.totalSeconds.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{contentData.seconds_26}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="age-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Height Calculator",
            calculatorHref: "/height-calculator",
            calculatorDescription: "Convert height between different units such as centimeters, meters, feet, and inches for medical, fitness, and general use"
          },
          ]}
            color="purple"
            title="Related Other Calculators" />
          {/* Educational Content */}
          <div className="mt-12">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 p-8">
              <CardHeader className="w-full flex flex-row items-center justify-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mr-3 shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-purple-700 tracking-tight">{contentData.understanding_age_calculation_27}</CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.how_age_is_calculated_28}</h3>
                    <p className="text-gray-700 mb-4">{contentData.age_calculation_involves_precise_calendar_arithmet_29}</p>
                    <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.key_features_30}</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>{contentData.handles_leap_years_automatically_31}</li>
                      <li>{contentData.accounts_for_months_with_different_day_counts_32}</li>
                      <li>{contentData.provides_both_exact_breakdown_and_total_units_33}</li>
                      <li>{contentData.uses_western_age_counting_system_34}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-700 mb-3">{contentData.sample_calculation_35}</h3>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <p className="text-gray-700 mb-2">
                        <strong>{contentData.example_36}</strong>
                      </p>
                      <p className="text-gray-700">{contentData.birth_date_january_1_2000_37}</p>
                      <p className="text-gray-700">{contentData.target_date_august_22_2025_38}</p>
                      <p className="text-gray-700 font-semibold">{contentData.result_25_years_7_months_21_days_39}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{contentData.the_calculator_also_provides_the_total_time_in_wee_40}</p>
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
