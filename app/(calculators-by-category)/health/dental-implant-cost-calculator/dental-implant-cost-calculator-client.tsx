"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, DollarSign, TrendingDown, Info, Sparkles, Heart } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RatingProfileSection } from '@/components/rating-profile-section';
import Image from "next/image";

interface ImplantType {
  name: string;
  priceEGP: number;
  priceUSD: number;
  description: string;
}

const implantTypes: ImplantType[] = [
  {
    name: "American / Korean Implants",
    priceEGP: 20000,
    priceUSD: 400,
    description: "Standard quality implants with proven reliability"
  },
  {
    name: "Premium Straumann Implants",
    priceEGP: 35000,
    priceUSD: 700,
    description: "Premium Swiss-made implants with superior quality"
  }
];

interface CalculationResults {
  totalCostEGP: number;
  totalCostUSD: number;
  implantType: string;
  numberOfImplants: number;
  pricePerImplant: number;
  internationalComparison: {
    europe: number;
    saudi: number;
    uae: number;
  };
  averageSavings: number;
}

export default function DentalImplantCostCalculatorClient() {
  const [selectedImplantType, setSelectedImplantType] = useState<ImplantType>(implantTypes[0]);
  const [numberOfImplants, setNumberOfImplants] = useState("");
  const [currency, setCurrency] = useState<"EGP" | "USD">("USD");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [error, setError] = useState("");

  const scrollToResults = useMobileScroll();
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculateCost = () => {
    scrollToResults(resultsRef as React.RefObject<HTMLElement>);
    setError("");

    const implants = parseFloat(numberOfImplants);
    if (isNaN(implants) || implants <= 0 || implants > 32) {
      setError("Please enter a valid number of implants (1-32)");
      return;
    }

    const totalCostEGP = implants * selectedImplantType.priceEGP;
    const totalCostUSD = implants * selectedImplantType.priceUSD;

    const internationalComparison = {
      europe: totalCostUSD * 2.5,
      saudi: totalCostUSD * 2.0,
      uae: totalCostUSD * 2.2,
    };

    const averageSavings = ((internationalComparison.europe + internationalComparison.saudi + internationalComparison.uae) / 3 - totalCostUSD) / ((internationalComparison.europe + internationalComparison.saudi + internationalComparison.uae) / 3) * 100;

    setResults({
      totalCostEGP,
      totalCostUSD,
      implantType: selectedImplantType.name,
      numberOfImplants: implants,
      pricePerImplant: currency === "USD" ? selectedImplantType.priceUSD : selectedImplantType.priceEGP,
      internationalComparison,
      averageSavings
    });
  };

  const resetCalculator = () => {
    setSelectedImplantType(implantTypes[0]);
    setNumberOfImplants("");
    setCurrency("USD");
    setResults(null);
    setError("");
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-lg">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-800 bg-clip-text text-transparent">
            Dental Implant Cost Calculator
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Calculate dental implant costs for single tooth, multiple teeth, or full mouth implants. Get instant estimates with international price comparison.
        </p>
      </div>

      {/* Introduction Section */}
      <section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          The average cost of a dental implant per tooth in the U.S. ranges from <strong>$3,000 to $6,000</strong> including the implant, abutment, and crown. Use our calculator to estimate your total cost based on implant type and quantity.
        </p>
        <div className="bg-white p-6 rounded-xl border-2 border-blue-500 mb-4">
          <p className="text-center text-2xl font-semibold text-gray-900">
            Total Cost = <span className="text-blue-600">Number of Implants</span> × <span className="text-purple-600">Price per Implant</span>
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-blue-600 mb-1">American/Korean Implants</p>
            <p>$400 USD (20,000 EGP) per implant</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-purple-600 mb-1">Premium Straumann</p>
            <p>$700 USD (35,000 EGP) per implant</p>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <Card className="shadow-2xl border-2 pt-0 border-blue-100 hover:shadow-blue-100 transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-6 w-6" />
              Calculate Your Implant Cost
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your treatment details for instant cost estimate
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Implant Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="implantType" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Select Implant Type
              </Label>
              <Select
                value={selectedImplantType.name}
                onValueChange={(value) => {
                  const type = implantTypes.find(t => t.name === value);
                  if (type) setSelectedImplantType(type);
                }}
              >
                <SelectTrigger id="implantType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {implantTypes.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700 mb-1">
                  <strong>{selectedImplantType.name}</strong>
                </p>
                <p className="text-xs text-gray-600 mb-2">{selectedImplantType.description}</p>
                <p className="text-sm font-semibold text-blue-700">
                  {selectedImplantType.priceEGP.toLocaleString()} EGP / ${selectedImplantType.priceUSD.toLocaleString()} USD per implant
                </p>
              </div>
            </div>

            {/* Number of Implants */}
            <div className="space-y-2">
              <Label htmlFor="numberOfImplants" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                Number of Implants
              </Label>
              <Input
                id="numberOfImplants"
                type="number"
                value={numberOfImplants}
                onChange={(e) => setNumberOfImplants(e.target.value)}
                placeholder="Enter number (1-32)"
                step="1"
                min="1"
                max="32"
              />
              <p className="text-xs text-gray-500">
                Enter the number of dental implants needed (1-32 teeth)
              </p>
            </div>

            {/* Currency Selection */}
            <div className="space-y-2">
              <Label htmlFor="currency" className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-blue-600" />
                Display Currency
              </Label>
              <Select value={currency} onValueChange={(value: "EGP" | "USD") => setCurrency(value)}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EGP">EGP (E£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button onClick={calculateCost} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Cost
              </Button>
              <Button onClick={resetCalculator} variant="outline">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div ref={resultsRef}>
          {results && (
            <Card className="shadow-2xl border-2 pt-0 border-green-100">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b px-8 py-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <DollarSign className="h-6 w-6" />
                  Your Cost Estimate
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Based on {results.numberOfImplants} {results.implantType}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Total Cost at Professors Dental Clinic
                    </p>
                    <p className="text-5xl font-bold text-green-600">
                      {currency === "USD" ? `$${results.totalCostUSD.toLocaleString()}` : `E£${results.totalCostEGP.toLocaleString()}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {currency === "USD" 
                        ? `(E£${results.totalCostEGP.toLocaleString()} EGP)` 
                        : `($${results.totalCostUSD.toLocaleString()} USD)`}
                    </p>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Cost Breakdown
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Number of Implants:</span>
                      <span className="font-semibold text-gray-900">{results.numberOfImplants}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Price per Implant:</span>
                      <span className="font-semibold text-gray-900">
                        {currency === "USD" ? `$${selectedImplantType.priceUSD}` : `E£${selectedImplantType.priceEGP}`}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-gray-800 font-semibold">Total Cost:</span>
                      <span className="font-bold text-green-700">
                        {currency === "USD" ? `$${results.totalCostUSD.toLocaleString()}` : `E£${results.totalCostEGP.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* International Comparison */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    International Price Comparison
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-gray-700 font-medium">Europe:</span>
                      <span className="font-semibold text-red-700">${results.internationalComparison.europe.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <span className="text-gray-700 font-medium">Saudi Arabia:</span>
                      <span className="font-semibold text-orange-700">${results.internationalComparison.saudi.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <span className="text-gray-700 font-medium">UAE:</span>
                      <span className="font-semibold text-yellow-700">${results.internationalComparison.uae.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-teal-100 p-5 rounded-xl border-2 border-green-300">
                  <p className="text-center text-green-800 font-bold text-lg">
                    💰 You save approximately {results.averageSavings.toFixed(0)}% compared to international markets!
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This calculator provides estimates only. Final costs may vary based on individual treatment needs, bone grafting requirements, and additional procedures.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Similar Calculators and Rating Profile Section - Right after calculator */}
      <div className="mt-16">
        <SimilarCalculators calculators={[{
          calculatorName: "BMI Calculator",
          calculatorHref: "/health/bmi-calculator",
          calculatorDescription: "Calculate your Body Mass Index (BMI) to determine if you are underweight, normal weight, overweight, or obese"
        },
        ]}
          color="purple"
          title="Related Other Calculators" />
        
        <div className="mt-8">
          <RatingProfileSection
            entityId="dental-implant-cost-calculator"
            entityType="calculator"
            creatorSlug="simon-stephen"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
        </div>
      </div>
    </div>
  );
}
