"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Heart, Calendar, User, Sparkles, AlertCircle, Moon, Star} from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

interface TwinFlameCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function TwinFlameCalculatorClient({ content, guideContent }: TwinFlameCalculatorClientProps) {
  const contentData = content || {};

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState<{
    yourName?: string;
    partnerName?: string;
    yourBirthDate?: string;
    partnerBirthDate?: string;
  }>({});

  // Input states
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [yourBirthDate, setYourBirthDate] = useState("");
  const [partnerBirthDate, setPartnerBirthDate] = useState("");
  const [calculationType, setCalculationType] = useState<"numerology" | "birthchart" | "lunar">("numerology");

  const validateInputs = () => {
    const newErrors: {
      yourName?: string;
      partnerName?: string;
      yourBirthDate?: string;
      partnerBirthDate?: string;
    } = {};

    if (!yourName.trim()) {
      newErrors.yourName = "Please enter your name";
    }
    if (!partnerName.trim()) {
      newErrors.partnerName = "Please enter partner's name";
    }
    if (!yourBirthDate) {
      newErrors.yourBirthDate = "Please enter your birth date";
    }
    if (!partnerBirthDate) {
      newErrors.partnerBirthDate = "Please enter partner's birth date";
    }

    if (yourBirthDate && partnerBirthDate) {
      const yourDate = new Date(yourBirthDate);
      const partnerDate = new Date(partnerBirthDate);
      const today = new Date();

      if (yourDate > today) {
        newErrors.yourBirthDate = "Birth date cannot be in the future";
      }
      if (partnerDate > today) {
        newErrors.partnerBirthDate = "Birth date cannot be in the future";
      }
      if (isNaN(yourDate.getTime())) {
        newErrors.yourBirthDate = "Please enter a valid date";
      }
      if (isNaN(partnerDate.getTime())) {
        newErrors.partnerBirthDate = "Please enter a valid date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate life path number from date
  const calculateLifePathNumber = (dateString: string): number => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let sum = day + month + year;
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }

    return sum;
  };

  // Calculate name number using numerology
  const calculateNameNumber = (name: string): number => {
    const letterValues: { [key: string]: number } = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };

    let sum = 0;
    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let char of cleanName) {
      sum += letterValues[char] || 0;
    }

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }

    return sum;
  };

  // Get zodiac sign from date
  const getZodiacSign = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
  };

  // Get moon phase from date
  const getMoonPhase = (dateString: string): string => {
    const date = new Date(dateString);
    const knownNewMoon = new Date('2000-01-06');
    const lunarCycle = 29.53058867;
    
    const daysSinceKnownNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const phase = (daysSinceKnownNewMoon % lunarCycle) / lunarCycle;

    if (phase < 0.0625 || phase >= 0.9375) return "New Moon";
    if (phase < 0.1875) return "Waxing Crescent";
    if (phase < 0.3125) return "First Quarter";
    if (phase < 0.4375) return "Waxing Gibbous";
    if (phase < 0.5625) return "Full Moon";
    if (phase < 0.6875) return "Waning Gibbous";
    if (phase < 0.8125) return "Last Quarter";
    return "Waning Crescent";
  };

  // Calculate compatibility score
  const calculateCompatibility = (yourNum: number, partnerNum: number): number => {
    const diff = Math.abs(yourNum - partnerNum);
    
    if (yourNum === partnerNum) return 100;
    if ([11, 22, 33].includes(yourNum) && [11, 22, 33].includes(partnerNum)) return 95;
    if (diff === 0) return 100;
    if (diff === 1 || diff === 2) return 85;
    if (diff === 3 || diff === 4) return 70;
    if (diff === 5 || diff === 6) return 55;
    return 40;
  };

  // Determine relationship type
  const getRelationshipType = (score: number): string => {
    if (score >= 90) return "Twin Flame";
    if (score >= 75) return "Soulmate";
    if (score >= 60) return "Strong Connection";
    return "Karmic Partner";
  };

  const calculateTwinFlame = () => {
    if (!validateInputs()) {
      return;
    }

    const yourLifePath = calculateLifePathNumber(yourBirthDate);
    const partnerLifePath = calculateLifePathNumber(partnerBirthDate);
    const yourNameNum = calculateNameNumber(yourName);
    const partnerNameNum = calculateNameNumber(partnerName);
    const yourZodiac = getZodiacSign(yourBirthDate);
    const partnerZodiac = getZodiacSign(partnerBirthDate);
    const yourMoonPhase = getMoonPhase(yourBirthDate);
    const partnerMoonPhase = getMoonPhase(partnerBirthDate);

    // Calculate different compatibility scores
    const lifePathCompatibility = calculateCompatibility(yourLifePath, partnerLifePath);
    const nameCompatibility = calculateCompatibility(yourNameNum, partnerNameNum);
    const zodiacCompatibility = yourZodiac === partnerZodiac ? 100 : 
      (["Aries-Leo", "Leo-Aries", "Taurus-Virgo", "Virgo-Taurus", "Gemini-Libra", "Libra-Gemini", 
        "Cancer-Scorpio", "Scorpio-Cancer", "Leo-Sagittarius", "Sagittarius-Leo", "Virgo-Capricorn", 
        "Capricorn-Virgo", "Libra-Aquarius", "Aquarius-Libra", "Scorpio-Pisces", "Pisces-Scorpio"].includes(`${yourZodiac}-${partnerZodiac}`) ? 85 : 60);
    const lunarCompatibility = yourMoonPhase === partnerMoonPhase ? 100 : 70;

    // Overall compatibility based on calculation type
    let overallScore = 0;
    if (calculationType === "numerology") {
      overallScore = Math.round((lifePathCompatibility * 0.6 + nameCompatibility * 0.4));
    } else if (calculationType === "birthchart") {
      overallScore = Math.round((lifePathCompatibility * 0.4 + zodiacCompatibility * 0.6));
    } else {
      overallScore = Math.round((lifePathCompatibility * 0.3 + lunarCompatibility * 0.7));
    }

    const relationshipType = getRelationshipType(overallScore);

    setResult({
      yourLifePath,
      partnerLifePath,
      yourNameNum,
      partnerNameNum,
      yourZodiac,
      partnerZodiac,
      yourMoonPhase,
      partnerMoonPhase,
      lifePathCompatibility,
      nameCompatibility,
      zodiacCompatibility,
      lunarCompatibility,
      overallScore,
      relationshipType,
      isMasterNumber: [11, 22, 33].includes(yourLifePath) || [11, 22, 33].includes(partnerLifePath),
      matchingNumbers: yourLifePath === partnerLifePath,
      matchingZodiac: yourZodiac === partnerZodiac,
      matchingMoonPhase: yourMoonPhase === partnerMoonPhase
    });

    setShowResult(true);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Twin Flame Calculator (Free): Numerology, Birth Chart & Compatibility Guide
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-0 bg-white p-0">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Sparkles className="w-6 h-6 text-pink-600" />
                      <span>Twin Flame Compatibility Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your details and your partner's details to calculate spiritual compatibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <Tabs value={calculationType} onValueChange={(v) => setCalculationType(v as any)} className="mb-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="numerology">Numerology</TabsTrigger>
                        <TabsTrigger value="birthchart">Birth Chart</TabsTrigger>
                        <TabsTrigger value="lunar">Lunar Phase</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <div className="space-y-6">
                      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2 text-pink-600" />
                          Your Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Your Name</Label>
                            <Input
                              className={`w-full h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200 shadow-sm ${errors.yourName ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                              type="text"
                              placeholder="Enter your full name"
                              value={yourName}
                              onChange={(e) => {
                                setYourName(e.target.value);
                                if (errors.yourName) {
                                  setErrors(prev => ({ ...prev, yourName: undefined }));
                                }
                              }}
                            />
                            {errors.yourName && (
                              <div className="flex items-center mt-2 text-red-600">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">{errors.yourName}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Your Birth Date</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-pink-500" />
                              </div>
                              <Input
                                className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-pink-400 focus:ring-pink-200 shadow-sm ${errors.yourBirthDate ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                                type="date"
                                value={yourBirthDate}
                                onChange={(e) => {
                                  setYourBirthDate(e.target.value);
                                  if (errors.yourBirthDate) {
                                    setErrors(prev => ({ ...prev, yourBirthDate: undefined }));
                                  }
                                }}
                              />
                            </div>
                            {errors.yourBirthDate && (
                              <div className="flex items-center mt-2 text-red-600">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">{errors.yourBirthDate}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Heart className="w-5 h-5 mr-2 text-purple-600" />
                          Partner's Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Partner's Name</Label>
                            <Input
                              className={`w-full h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.partnerName ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                              type="text"
                              placeholder="Enter partner's full name"
                              value={partnerName}
                              onChange={(e) => {
                                setPartnerName(e.target.value);
                                if (errors.partnerName) {
                                  setErrors(prev => ({ ...prev, partnerName: undefined }));
                                }
                              }}
                            />
                            {errors.partnerName && (
                              <div className="flex items-center mt-2 text-red-600">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">{errors.partnerName}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Partner's Birth Date</Label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-purple-500" />
                              </div>
                              <Input
                                className={`w-full pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm ${errors.partnerBirthDate ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`}
                                type="date"
                                value={partnerBirthDate}
                                onChange={(e) => {
                                  setPartnerBirthDate(e.target.value);
                                  if (errors.partnerBirthDate) {
                                    setErrors(prev => ({ ...prev, partnerBirthDate: undefined }));
                                  }
                                }}
                              />
                            </div>
                            {errors.partnerBirthDate && (
                              <div className="flex items-center mt-2 text-red-600">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">{errors.partnerBirthDate}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={calculateTwinFlame}
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Calculate Twin Flame Compatibility
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-pink-50 to-purple-50 sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Star className="w-5 h-5 text-pink-600" />
                      <span>About Twin Flame Calculator</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-gray-700">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Numerology Method</h4>
                      <p>Calculates life path numbers and name vibrations to determine spiritual alignment.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Birth Chart Method</h4>
                      <p>Analyzes zodiac compatibility and astrological connections between partners.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Lunar Phase Method</h4>
                      <p>Compares moon phases at birth to reveal emotional and intuitive harmony.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {showResult && result && (
              <div ref={resultsRef} className="mt-8">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-50 to-purple-50">
                  <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 border-b">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Heart className="w-6 h-6 text-pink-600" />
                      <span>Your Twin Flame Compatibility Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block">
                        <div className="relative">
                          <svg className="w-48 h-48 transform -rotate-90">
                            <circle
                              cx="96"
                              cy="96"
                              r="88"
                              stroke="#e5e7eb"
                              strokeWidth="12"
                              fill="none"
                            />
                            <circle
                              cx="96"
                              cy="96"
                              r="88"
                              stroke="url(#gradient)"
                              strokeWidth="12"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 88}`}
                              strokeDashoffset={`${2 * Math.PI * 88 * (1 - result.overallScore / 100)}`}
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ec4899" />
                                <stop offset="100%" stopColor="#9333ea" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                              {result.overallScore}%
                            </span>
                            <span className="text-sm text-gray-600 mt-1">Compatibility</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{result.relationshipType}</h3>
                        <p className="text-gray-600">
                          {result.relationshipType === "Twin Flame" && "You share an extraordinary spiritual connection!"}
                          {result.relationshipType === "Soulmate" && "You have a deep and harmonious bond!"}
                          {result.relationshipType === "Strong Connection" && "You share meaningful spiritual alignment!"}
                          {result.relationshipType === "Karmic Partner" && "This connection offers valuable lessons and growth!"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white p-6 rounded-xl shadow-md">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2 text-pink-600" />
                          {yourName}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Life Path Number:</span>
                            <span className="font-semibold text-gray-900">{result.yourLifePath}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name Number:</span>
                            <span className="font-semibold text-gray-900">{result.yourNameNum}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Zodiac Sign:</span>
                            <span className="font-semibold text-gray-900">{result.yourZodiac}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Moon Phase:</span>
                            <span className="font-semibold text-gray-900">{result.yourMoonPhase}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-md">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Heart className="w-5 h-5 mr-2 text-purple-600" />
                          {partnerName}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Life Path Number:</span>
                            <span className="font-semibold text-gray-900">{result.partnerLifePath}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name Number:</span>
                            <span className="font-semibold text-gray-900">{result.partnerNameNum}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Zodiac Sign:</span>
                            <span className="font-semibold text-gray-900">{result.partnerZodiac}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Moon Phase:</span>
                            <span className="font-semibold text-gray-900">{result.partnerMoonPhase}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                      <h4 className="font-semibold text-gray-900 mb-4">Detailed Compatibility Analysis</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Life Path Compatibility</span>
                            <span className="text-sm font-semibold text-gray-900">{result.lifePathCompatibility}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${result.lifePathCompatibility}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Name Vibration Compatibility</span>
                            <span className="text-sm font-semibold text-gray-900">{result.nameCompatibility}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${result.nameCompatibility}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Zodiac Compatibility</span>
                            <span className="text-sm font-semibold text-gray-900">{result.zodiacCompatibility}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${result.zodiacCompatibility}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Lunar Phase Compatibility</span>
                            <span className="text-sm font-semibold text-gray-900">{result.lunarCompatibility}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${result.lunarCompatibility}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {(result.isMasterNumber || result.matchingNumbers || result.matchingZodiac || result.matchingMoonPhase) && (
                      <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-xl border-2 border-pink-300">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 text-pink-600" />
                          Special Spiritual Indicators
                        </h4>
                        <div className="space-y-2 text-sm">
                          {result.isMasterNumber && (
                            <div className="flex items-center text-gray-700">
                              <Star className="w-4 h-4 mr-2 text-yellow-500" />
                              <span>Master Number Connection Detected (11, 22, or 33)</span>
                            </div>
                          )}
                          {result.matchingNumbers && (
                            <div className="flex items-center text-gray-700">
                              <Star className="w-4 h-4 mr-2 text-yellow-500" />
                              <span>Matching Life Path Numbers - Mirror Soul Energy</span>
                            </div>
                          )}
                          {result.matchingZodiac && (
                            <div className="flex items-center text-gray-700">
                              <Star className="w-4 h-4 mr-2 text-yellow-500" />
                              <span>Same Zodiac Sign - Shared Elemental Energy</span>
                            </div>
                          )}
                          {result.matchingMoonPhase && (
                            <div className="flex items-center text-gray-700">
                              <Moon className="w-4 h-4 mr-2 text-blue-500" />
                              <span>Matching Moon Phase - Emotional Synchronicity</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>

        {/* Comprehensive Guide Content Section */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                A twin flame calculator is an online tool that analyzes information like date of birth, name, numerology numbers, birth charts, and lunar phases to estimate spiritual compatibility between two people. Popular versions include a twin flame calculator free, twin flame calculator by date of birth, twin flame birth chart calculator, and twin flame compatibility calculator. These tools combine ideas from numerology, astrology, and spiritual symbolism to evaluate whether a connection may resemble a twin flame, soulmate, or karmic relationship.
              </p>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Twin Flame Calculator – Complete Guide</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                The idea of a twin flame has fascinated spiritual seekers for decades. Many people believe a twin flame is the other half of your soul, someone who mirrors your deepest traits, emotions, and spiritual path.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Today, modern spiritual tools such as the twin flame calculator make it easier to explore this concept. These calculators use different systems—numerology, astrology, birth charts, and moon phases—to measure energetic compatibility between two individuals.
              </p>
              <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                Whether you're searching for your twin flame or simply curious about spiritual compatibility, this guide explains how twin flame calculators work, the different types available, and how to interpret results.
              </p>

              {/* What Is a Twin Flame */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-pink-600" />
                  What Is a Twin Flame?
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  A twin flame is believed to be a soul connection where two individuals share the same spiritual essence. Unlike soulmates, twin flames are often described as mirror souls who challenge each other's growth.
                </p>
                <p className="text-gray-700 mb-4 font-semibold">Common characteristics of twin flame relationships include:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Deep emotional and spiritual connection</li>
                  <li>Strong attraction and synchronicity</li>
                  <li>Personal growth and transformation</li>
                  <li>Intense challenges or separation phases</li>
                </ul>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  Because of the complexity of these relationships, people often use tools like a twin flame test calculator or twin flame relationship calculator to gain insights.
                </p>
              </div>

              {/* What Is a Twin Flame Calculator */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 mr-3 text-purple-600" />
                  What Is a Twin Flame Calculator?
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  A twin flame calculator is an online compatibility tool designed to estimate the likelihood that two people share a twin flame connection.
                </p>
                <p className="text-gray-700 mb-4 font-semibold">Most calculators analyze data such as:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Date of birth</li>
                  <li>Full names</li>
                  <li>Numerology life path numbers</li>
                  <li>Zodiac compatibility</li>
                  <li>Birth chart alignment</li>
                  <li>Moon phase matches</li>
                </ul>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  For example, a twin flame calculator by date of birth calculates numerology numbers to determine spiritual alignment.
                </p>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  Similarly, a twin flame name calculator evaluates the vibrational energy of names using numerology methods.
                </p>
              </div>

              {/* Types of Twin Flame Calculators */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Types of Twin Flame Calculators</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Different calculators analyze compatibility using different spiritual frameworks.</p>
                
                <div className="space-y-6">
                  {/* Type 1 */}
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">1. Twin Flame Calculator Free</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      A twin flame calculator free allows users to quickly test compatibility without registration or payment.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">Typical inputs include:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>Your name</li>
                      <li>Partner's name</li>
                      <li>Your birth date</li>
                      <li>Partner's birth date</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      The tool then generates a compatibility score or spiritual match percentage. <Link href="/"><b>Free calculators</b></Link> are popular because they provide instant insights into potential spiritual relationships.
                    </p>
                  </div>

                  {/* Type 2 */}
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">2. Twin Flame Calculator by Date of Birth</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      The twin flame calculator by date of birth is one of the most accurate methods because it uses numerology life path calculations.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">It analyzes:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>Life Path Numbers</li>
                      <li>Destiny Numbers</li>
                      <li>Personal Year Cycles</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      These numbers help determine whether two people share aligned spiritual missions. This method is closely related to the twin flame life path calculator.
                    </p>
                  </div>

                  {/* Type 3 */}
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">3. Twin Flame Compatibility Calculator</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      A twin flame compatibility calculator evaluates how well two energies align.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">It may combine several factors:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>Numerology compatibility</li>
                      <li>Zodiac compatibility</li>
                      <li>Birth chart aspects</li>
                      <li>Moon phase alignment</li>
                    </ul>
                    <p className="text-gray-700 mb-2 font-semibold">These calculators often generate results like:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Twin Flame Match</li>
                      <li>Soulmate Connection</li>
                      <li>Karmic Partner</li>
                    </ul>
                  </div>

                  {/* Type 4 */}
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">4. Twin Flame Birth Chart Calculator</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      The twin flame birth chart calculator uses astrology to analyze planetary placements at birth.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">Key elements examined include:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>Sun sign compatibility</li>
                      <li>Moon sign compatibility</li>
                      <li>Venus and Mars placements</li>
                      <li>Synastry aspects</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      Because birth charts reflect personality and emotional patterns, this tool is often considered more advanced than simple numerology calculators.
                    </p>
                  </div>

                  {/* Type 5 */}
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5. Twin Flame Synastry Calculator</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      A twin flame synastry calculator compares two astrological charts to see how planets interact between partners.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">Synastry focuses on planetary aspects like:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>Conjunctions</li>
                      <li>Trines</li>
                      <li>Oppositions</li>
                      <li>Squares</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      These aspects reveal relationship dynamics, attraction, and karmic lessons. Many astrologers consider synastry one of the most reliable twin flame compatibility methods.
                    </p>
                  </div>

                  {/* Type 6 */}
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">6. Twin Flame Moon Phase Calculator</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      The twin flame moon phase calculator examines the lunar phase on each person's birth date. The idea comes from astrology and lunar symbolism.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">Matching moon phases may indicate:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>Emotional harmony</li>
                      <li>Spiritual synchronicity</li>
                      <li>Intuitive connection</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      Some tools also function as a twin flame lunar match calculator, comparing the exact lunar phase at birth.
                    </p>
                  </div>

                  {/* Type 7 */}
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7. Twin Flame Name Calculator</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      A twin flame name calculator uses numerology to convert letters into numbers. Each letter corresponds to a numerical value.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">For example:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>A = 1</li>
                      <li>B = 2</li>
                      <li>C = 3</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      By adding these numbers together, the calculator determines name vibration compatibility. This method helps reveal whether two names share harmonious spiritual frequencies.
                    </p>
                  </div>

                  {/* Type 8 */}
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8. Twin Flame Birthday Calculator</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      A twin flame birthday calculator compares two birth dates to determine compatibility patterns.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">It looks for patterns like:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>Matching numerology numbers</li>
                      <li>Shared life path energy</li>
                      <li>Complementary destiny numbers</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      Many people prefer this tool because birthdays carry strong numerological significance.
                    </p>
                  </div>

                  {/* Type 9 */}
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">9. Twin Flame Soulmate Calculator</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      Sometimes users want to know if their connection is a twin flame or a soulmate.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">A twin flame soulmate calculator compares spiritual compatibility levels to determine:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>Twin Flame</li>
                      <li>Soulmate</li>
                      <li>Karmic Partner</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      This helps clarify relationship dynamics.
                    </p>
                  </div>

                  {/* Type 10 */}
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">10. Karmic Soulmate Twin Flame Calculator</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      A karmic soulmate twin flame calculator analyzes deeper spiritual patterns.
                    </p>
                    <p className="text-gray-700 mb-2 font-semibold">It evaluates whether a relationship represents:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-3">
                      <li>Twin flame growth</li>
                      <li>Soulmate harmony</li>
                      <li>Karmic lessons</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      Karmic relationships often appear intense but are meant for spiritual learning rather than lifelong partnership.
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Calculate Twin Flame Numerology */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Twin Flame Numerology</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Many calculators rely on numerology calculations. Here is the basic process.</p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-l-4 border-pink-500">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Step 1: Convert Birth Date to Life Path Number</h4>
                    <p className="text-gray-700 mb-2 font-semibold">Example:</p>
                    <p className="text-gray-700 mb-2">Birth date: 14 June 1992</p>
                    <p className="text-gray-700 mb-2 font-semibold">Calculation:</p>
                    <p className="text-gray-700 mb-1">1 + 4 + 6 + 1 + 9 + 9 + 2 = 32</p>
                    <p className="text-gray-700 mb-1">3 + 2 = 5</p>
                    <p className="text-gray-900 font-bold mt-3">Life Path Number = 5</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Step 2: Calculate Partner's Life Path</h4>
                    <p className="text-gray-700 mb-2">Birth date: 22 March 1993</p>
                    <p className="text-gray-700 mb-1">2 + 2 + 3 + 1 + 9 + 9 + 3 = 29</p>
                    <p className="text-gray-700 mb-1">2 + 9 = 11</p>
                    <p className="text-gray-900 font-bold mt-3">Life Path Number = 11</p>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-l-4 border-pink-500">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Step 3: Compare Numbers</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">Certain combinations indicate stronger spiritual alignment.</p>
                    <p className="text-gray-700 mb-2 font-semibold">Examples:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>11 and 22 → Master number connection</li>
                      <li>Same numbers → Mirroring energy</li>
                      <li>Complementary numbers → Balanced growth</li>
                    </ul>
                    <p className="text-gray-700 mt-3 leading-relaxed">This is how a twin flame life path calculator works.</p>
                  </div>
                </div>
              </div>

              {/* Signs You May Have Found Your Twin Flame */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Signs You May Have Found Your Twin Flame</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Even with a twin flame test calculator, spiritual signs remain important. Common indicators include:</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-pink-50 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-pink-600" />
                      Instant Recognition
                    </h4>
                    <p className="text-gray-700 leading-relaxed">Many people report feeling like they have known their twin flame forever.</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-purple-600" />
                      Emotional Mirroring
                    </h4>
                    <p className="text-gray-700 leading-relaxed">Twin flames often reflect each other's strengths and weaknesses.</p>
                  </div>
                  <div className="bg-pink-50 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-pink-600" />
                      Spiritual Awakening
                    </h4>
                    <p className="text-gray-700 leading-relaxed">Meeting a twin flame may trigger deep personal growth or life transformation.</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-purple-600" />
                      Intense Connection
                    </h4>
                    <p className="text-gray-700 leading-relaxed">The bond is often stronger than typical romantic attraction.</p>
                  </div>
                </div>
              </div>

              {/* Twin Flame vs Soulmate vs Karmic Partner */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Twin Flame vs Soulmate vs Karmic Partner</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Understanding these differences is important when using a twin flame relationship calculator.</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-pink-100 to-purple-100">
                        <th className="border border-gray-300 px-6 py-3 text-left font-bold text-gray-900">Connection Type</th>
                        <th className="border border-gray-300 px-6 py-3 text-left font-bold text-gray-900">Characteristics</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">Twin Flame</td>
                        <td className="border border-gray-300 px-6 py-4 text-gray-700">Mirror soul, intense growth</td>
                      </tr>
                      <tr className="bg-pink-50">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">Soulmate</td>
                        <td className="border border-gray-300 px-6 py-4 text-gray-700">Harmonious emotional connection</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">Karmic Partner</td>
                        <td className="border border-gray-300 px-6 py-4 text-gray-700">Lessons and personal development</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 mt-4 leading-relaxed">Many calculators attempt to classify the connection based on compatibility patterns.</p>
              </div>

              {/* Are Twin Flame Calculators Accurate */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Are Twin Flame Calculators Accurate?</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Twin flame calculators should be used as guidance rather than absolute truth.
                </p>
                <p className="text-gray-700 mb-2 font-semibold">They are based on symbolic systems like:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                  <li>Numerology</li>
                  <li>Astrology</li>
                  <li>Spiritual interpretation</li>
                </ul>
                <p className="text-gray-700 mb-2 leading-relaxed">
                  While these systems can reveal patterns, human relationships are complex.
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold">
                  A calculator result should be viewed as insight rather than prediction.
                </p>
              </div>

              {/* How to Use */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Use a Twin Flame Calculator</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Using a calculator is simple.</p>
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li className="font-semibold">Enter your full name</li>
                    <li className="font-semibold">Enter your date of birth</li>
                    <li className="font-semibold">Enter your partner's details</li>
                    <li className="font-semibold">Click calculate</li>
                    <li className="font-semibold">Review compatibility results</li>
                  </ol>
                  
                  <p className="text-gray-700 mt-6 mb-2 font-semibold">Advanced tools may also ask for:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>Birth time</li>
                    <li>Birth location</li>
                    <li>Zodiac sign</li>
                  </ul>
                  <p className="text-gray-700 mt-4 leading-relaxed">
                    These inputs allow deeper analysis in twin flame synastry calculators and birth chart calculators.
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Using a Twin Flame Calculator</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">Many people use these tools for personal insight.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 bg-pink-50 p-4 rounded-lg">
                    <Sparkles className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Understanding spiritual compatibility</p>
                  </div>
                  <div className="flex items-start space-x-3 bg-purple-50 p-4 rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Exploring numerology connections</p>
                  </div>
                  <div className="flex items-start space-x-3 bg-pink-50 p-4 rounded-lg">
                    <Sparkles className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Discovering relationship patterns</p>
                  </div>
                  <div className="flex items-start space-x-3 bg-purple-50 p-4 rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Learning about astrology</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-6 leading-relaxed">
                  A twin flame compatibility calculator can also encourage self-reflection and emotional awareness.
                </p>
              </div>

              {/* Expert Insight */}
              <div className="mb-12 bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-xl border-2 border-pink-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Insight: Spiritual Compatibility Tools</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">Modern twin flame calculators combine multiple spiritual disciplines:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                  <li>Numerology</li>
                  <li>Astrology</li>
                  <li>Synastry analysis</li>
                  <li>Lunar phase compatibility</li>
                  <li>Name vibration analysis</li>
                </ul>
                <p className="text-gray-700 font-semibold leading-relaxed">
                  Using several systems together improves compatibility interpretation accuracy.
                </p>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Summary</h3>
                <p className="text-lg leading-relaxed">
                  A twin flame calculator is a spiritual compatibility tool that analyzes names, birth dates, numerology numbers, birth charts, and lunar phases to estimate the likelihood of a twin flame connection.
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem value="faq-1" className="bg-pink-50 rounded-lg px-6 border border-pink-200">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-pink-600">
                      What is the best twin flame calculator?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      The best tools combine numerology, astrology, and lunar analysis, such as a twin flame birth chart calculator or twin flame synastry calculator. These provide deeper insights than simple name-based tools.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-2" className="bg-purple-50 rounded-lg px-6 border border-purple-200">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600">
                      Is there a twin flame calculator free online?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      Yes. Many websites offer a twin flame calculator free where you can check compatibility using names or birth dates.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-3" className="bg-pink-50 rounded-lg px-6 border border-pink-200">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-pink-600">
                      Can a twin flame calculator predict love?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      No calculator can guarantee romantic outcomes. These tools provide symbolic compatibility insights, not predictions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-4" className="bg-purple-50 rounded-lg px-6 border border-purple-200">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600">
                      What is the difference between soulmate and twin flame?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      A soulmate connection is usually harmonious and supportive, while a twin flame relationship is often intense and transformative.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-5" className="bg-pink-50 rounded-lg px-6 border border-pink-200">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-pink-600">
                      How accurate is twin flame numerology?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      Numerology can reveal meaningful patterns, but accuracy depends on interpretation and personal belief systems.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-6" className="bg-purple-50 rounded-lg px-6 border border-purple-200">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600">
                      Can two people share the same twin flame numbers?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      Yes. Many twin flame connections show matching life path numbers or master numbers.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SimilarCalculators
              calculators={[
                { id: "age-calculator" },
                { id: "time-calculator" },
                { id: "height-calculator" }
              ]}
              color="pink"
              title="Related Calculators"
              language="en"
            />
          </div>
        </div>
      </div>
    </>
  );
}
