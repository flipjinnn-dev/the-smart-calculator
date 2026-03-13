"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Ruler, Layers, Grid3x3, Scale } from "lucide-react";
import SimilarCalculators from "@/components/similar-calculators";

interface ContentData {
  calculatorTitle: string;
  calculatorDescription: string;
  wallWidthLabel: string;
  wallHeightLabel: string;
  boardWidthLabel: string;
  boardSpacingLabel: string;
  doorsWindowsLabel: string;
  unitLabel: string;
  calculateButton: string;
  exampleButton: string;
  resetButton: string;
  resultsTitle: string;
  noResultsYet: string;
}

interface CalculationResult {
  numberOfBoards: number;
  numberOfBattens: number;
  furringStripRows: number;
  numberOfTrims: number;
  totalBoardLength: number;
  totalBattenLength: number;
  totalMaterialLength: number;
  wallArea: number;
  effectiveArea: number;
  unit: string;
}

const defaultContent: ContentData = {
  calculatorTitle: "Board and Batten Calculator",
  calculatorDescription: "Calculate boards, battens, spacing, and siding materials for your wall project",
  wallWidthLabel: "Wall Width",
  wallHeightLabel: "Wall Height",
  boardWidthLabel: "Board Width",
  boardSpacingLabel: "Board Spacing",
  doorsWindowsLabel: "Doors & Windows Area (Optional)",
  unitLabel: "Unit",
  calculateButton: "Calculate Materials",
  exampleButton: "Try Example",
  resetButton: "Reset",
  resultsTitle: "Estimated Materials",
  noResultsYet: "Enter dimensions and click Calculate to see results"
};

export default function BoardAndBattenCalculatorClient({
  content
}: {
  content?: ContentData | null;
}) {
  const contentData = content || defaultContent;

  const [wallWidth, setWallWidth] = useState<string>("500");
  const [wallHeight, setWallHeight] = useState<string>("300");
  const [boardWidth, setBoardWidth] = useState<string>("20");
  const [boardSpacing, setBoardSpacing] = useState<string>("10");
  const [doorsWindows, setDoorsWindows] = useState<string>("0");
  const [unit, setUnit] = useState<string>("cm");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const convertToMeters = (value: number, fromUnit: string): number => {
    switch(fromUnit) {
      case "cm": return value / 100;
      case "m": return value;
      case "ft": return value * 0.3048;
      case "in": return value * 0.0254;
      default: return value;
    }
  };

  const convertFromMeters = (value: number, toUnit: string): number => {
    switch(toUnit) {
      case "cm": return value * 100;
      case "m": return value;
      case "ft": return value / 0.3048;
      case "in": return value / 0.0254;
      default: return value;
    }
  };

  const calculateMaterials = () => {
    setError("");
    
    const width = parseFloat(wallWidth);
    const height = parseFloat(wallHeight);
    const bWidth = parseFloat(boardWidth);
    const spacing = parseFloat(boardSpacing);
    const excluded = parseFloat(doorsWindows) || 0;

    if (isNaN(width) || width <= 0) {
      setError("Please enter a valid wall width (greater than 0)");
      return;
    }

    if (isNaN(height) || height <= 0) {
      setError("Please enter a valid wall height (greater than 0)");
      return;
    }

    if (isNaN(bWidth) || bWidth <= 0) {
      setError("Please enter a valid board width (greater than 0)");
      return;
    }

    if (isNaN(spacing) || spacing < 0) {
      setError("Please enter a valid board spacing (0 or greater)");
      return;
    }

    if (bWidth >= width) {
      setError("Board width must be less than wall width");
      return;
    }

    // Convert all to meters for calculation
    const widthM = convertToMeters(width, unit);
    const heightM = convertToMeters(height, unit);
    const bWidthM = convertToMeters(bWidth, unit);
    const spacingM = convertToMeters(spacing, unit);
    const excludedM = convertToMeters(excluded, unit === "cm" || unit === "m" ? unit : "m");

    // Calculate wall area
    const wallArea = widthM * heightM;
    const effectiveArea = Math.max(0, wallArea - excludedM);

    // Calculate number of boards
    const numberOfBoards = Math.floor(widthM / (bWidthM + spacingM));

    // Calculate number of battens (one less than boards, or equal if covering all gaps)
    const numberOfBattens = Math.max(0, numberOfBoards - 1);

    // Furring strip rows (typically 3-4 horizontal supports)
    const furringStripRows = heightM > 2.4 ? 4 : 3;

    // Number of trims (typically 4 for corners/edges)
    const numberOfTrims = 4;

    // Total material lengths in meters
    const totalBoardLength = numberOfBoards * heightM;
    const totalBattenLength = numberOfBattens * heightM;
    const totalMaterialLength = totalBoardLength + totalBattenLength;

    const calculationResult: CalculationResult = {
      numberOfBoards,
      numberOfBattens,
      furringStripRows,
      numberOfTrims,
      totalBoardLength: convertFromMeters(totalBoardLength, unit),
      totalBattenLength: convertFromMeters(totalBattenLength, unit),
      totalMaterialLength: convertFromMeters(totalMaterialLength, unit),
      wallArea: convertFromMeters(wallArea, unit === "cm" ? "m" : unit),
      effectiveArea: convertFromMeters(effectiveArea, unit === "cm" ? "m" : unit),
      unit
    };

    setResult(calculationResult);
    setShowResult(true);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const runExample = () => {
    setWallWidth("500");
    setWallHeight("300");
    setBoardWidth("20");
    setBoardSpacing("10");
    setDoorsWindows("0");
    setUnit("cm");
    setError("");
  };

  const resetCalculator = () => {
    setWallWidth("");
    setWallHeight("");
    setBoardWidth("");
    setBoardSpacing("");
    setDoorsWindows("0");
    setUnit("cm");
    setResult(null);
    setError("");
    setShowResult(false);
  };

  const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toFixed(decimals);
  };

  const getUnitLabel = (u: string): string => {
    const labels: { [key: string]: string } = {
      "cm": "cm",
      "m": "m",
      "ft": "ft",
      "in": "in"
    };
    return labels[u] || u;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mb-4 shadow-lg">
              <Grid3x3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
              {contentData.calculatorTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {contentData.calculatorDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-2xl pt-0 border-0 bg-white/80 backdrop-blur">
                <CardHeader className="bg-gradient-to-r py-4 from-orange-500 to-amber-500 text-white rounded-t-xl">
                  <CardTitle className="flex items-center text-2xl">
                    <Calculator className="mr-3 h-6 w-6" />
                    Input Measurements
                  </CardTitle>
                  <CardDescription className="text-orange-50">
                    Enter your wall dimensions and board specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="unit" className="text-base font-semibold text-gray-700">
                        {contentData.unitLabel}
                      </Label>
                      <Select value={unit} onValueChange={setUnit}>
                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm">Centimeters (cm)</SelectItem>
                          <SelectItem value="m">Meters (m)</SelectItem>
                          <SelectItem value="ft">Feet (ft)</SelectItem>
                          <SelectItem value="in">Inches (in)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="wallWidth" className="text-base font-semibold text-gray-700">
                        {contentData.wallWidthLabel} ({getUnitLabel(unit)})
                      </Label>
                      <Input 
                        className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" 
                        type="number" 
                        value={wallWidth} 
                        onChange={e => setWallWidth(e.target.value)} 
                        placeholder="500" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wallHeight" className="text-base font-semibold text-gray-700">
                        {contentData.wallHeightLabel} ({getUnitLabel(unit)})
                      </Label>
                      <Input 
                        className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" 
                        type="number" 
                        value={wallHeight} 
                        onChange={e => setWallHeight(e.target.value)} 
                        placeholder="300" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="boardWidth" className="text-base font-semibold text-gray-700">
                        {contentData.boardWidthLabel} ({getUnitLabel(unit)})
                      </Label>
                      <Input 
                        className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" 
                        type="number" 
                        value={boardWidth} 
                        onChange={e => setBoardWidth(e.target.value)} 
                        placeholder="20" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="boardSpacing" className="text-base font-semibold text-gray-700">
                        {contentData.boardSpacingLabel} ({getUnitLabel(unit)})
                      </Label>
                      <Input 
                        className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" 
                        type="number" 
                        value={boardSpacing} 
                        onChange={e => setBoardSpacing(e.target.value)} 
                        placeholder="10" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doorsWindows" className="text-base font-semibold text-gray-700">
                      {contentData.doorsWindowsLabel} ({unit === "cm" || unit === "m" ? "m²" : "sq " + getUnitLabel(unit)})
                    </Label>
                    <Input 
                      className="w-full h-12 rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-200 shadow-sm" 
                      type="number" 
                      value={doorsWindows} 
                      onChange={e => setDoorsWindows(e.target.value)} 
                      placeholder="0" 
                    />
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-700">
                      <strong>Formula:</strong>
                      <br />Number of Boards = Wall Width ÷ (Board Width + Board Spacing)
                      <br />Number of Battens = Number of Boards − 1
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      onClick={calculateMaterials}
                      className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      {contentData.calculateButton}
                    </Button>
                    <Button 
                      onClick={runExample}
                      variant="outline"
                      className="h-12 text-base font-semibold border-2 border-orange-300 text-orange-700 hover:bg-orange-50 rounded-xl transition-all duration-200"
                    >
                      {contentData.exampleButton}
                    </Button>
                    <Button 
                      onClick={resetCalculator}
                      variant="outline"
                      className="h-12 text-base font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
                    >
                      {contentData.resetButton}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {showResult && result && (
                <Card ref={resultsRef} className="shadow-2xl pt-0 border-0 bg-white/80 backdrop-blur mt-8">
                  <CardHeader className="bg-gradient-to-r py-4 from-green-500 to-emerald-500 text-white rounded-t-xl">
                    <CardTitle className="flex items-center text-2xl">
                      <Layers className="mr-3 h-6 w-6" />
                      Material Estimation Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                        <div className="flex items-center mb-2">
                          <Ruler className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-semibold text-blue-900">Number of Boards</h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-700">{result.numberOfBoards}</p>
                        <p className="text-sm text-blue-600 mt-1">Vertical boards required</p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                        <div className="flex items-center mb-2">
                          <Grid3x3 className="w-5 h-5 text-purple-600 mr-2" />
                          <h3 className="font-semibold text-purple-900">Number of Battens</h3>
                        </div>
                        <p className="text-3xl font-bold text-purple-700">{result.numberOfBattens}</p>
                        <p className="text-sm text-purple-600 mt-1">Covering board gaps</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
                        <div className="flex items-center mb-2">
                          <Layers className="w-5 h-5 text-orange-600 mr-2" />
                          <h3 className="font-semibold text-orange-900">Furring Strip Rows</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-700">{result.furringStripRows}</p>
                        <p className="text-sm text-orange-600 mt-1">Horizontal supports</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                        <div className="flex items-center mb-2">
                          <Scale className="w-5 h-5 text-green-600 mr-2" />
                          <h3 className="font-semibold text-green-900">Number of Trims</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-700">{result.numberOfTrims}</p>
                        <p className="text-sm text-green-600 mt-1">Edge finishing pieces</p>
                      </div>
                    </div>

                    <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-2 border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-4 text-lg">Material Lengths</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">Total Board Length:</span>
                          <span className="text-xl font-bold text-gray-900">{formatNumber(result.totalBoardLength)} {getUnitLabel(unit)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">Total Batten Length:</span>
                          <span className="text-xl font-bold text-gray-900">{formatNumber(result.totalBattenLength)} {getUnitLabel(unit)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                          <span className="text-gray-900 font-bold">Total Material Length:</span>
                          <span className="text-2xl font-bold text-orange-600">{formatNumber(result.totalMaterialLength)} {getUnitLabel(unit)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border-2 border-indigo-200">
                      <h3 className="font-bold text-indigo-900 mb-4 text-lg">Wall Area Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-indigo-700 font-medium">Total Wall Area:</span>
                          <span className="text-xl font-bold text-indigo-900">{formatNumber(result.wallArea)} {unit === "cm" || unit === "m" ? "m²" : "sq " + getUnitLabel(unit)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-indigo-700 font-medium">Effective Coverage Area:</span>
                          <span className="text-xl font-bold text-indigo-900">{formatNumber(result.effectiveArea)} {unit === "cm" || unit === "m" ? "m²" : "sq " + getUnitLabel(unit)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="hidden lg:block">
              <Card className="shadow-2xl pt-0 border-0 bg-gradient-to-br from-orange-50 to-amber-100 h-[50%] flex flex-col justify-center items-center p-8 sticky top-24">
                <CardHeader className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center mb-3 shadow-lg">
                    <Grid3x3 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight">{contentData.resultsTitle}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-center justify-center">
                  {showResult && result ? (
                    <div className="text-center w-full space-y-4">
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-orange-800 mb-2">Total Boards</h3>
                        <div className="text-3xl font-bold text-orange-900">
                          {result.numberOfBoards}
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-orange-800 mb-2">Total Battens</h3>
                        <div className="text-3xl font-bold text-orange-900">
                          {result.numberOfBattens}
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <h3 className="font-semibold text-orange-800 mb-2">Total Material</h3>
                        <div className="text-2xl font-bold text-orange-900">
                          {formatNumber(result.totalMaterialLength)} {getUnitLabel(unit)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Ruler className="w-8 h-8 text-orange-300 mb-2" />
                      <p className="text-gray-500 text-center text-base">
                        {contentData.noResultsYet}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto prose prose-lg">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-3">Board and Batten Calculator</h2>
                <p className="text-gray-700 leading-relaxed mb-0">
                  A <strong>board and batten calculator</strong> helps you quickly estimate the materials required for a board and batten wall or siding project. Whether you are designing an interior accent wall, installing exterior wall siding, or planning a farmhouse-style renovation, this tool calculates the number of boards, number of battens, spacing, and required siding materials based on your wall measurements.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                To use the calculator, simply enter the wall width, wall height, board width, and board spacing. The calculator then determines the total number of boards, total number of battens, furring strips, trim pieces, and overall siding material length needed for your project.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                This <strong>board and batten wall calculator</strong> is especially useful for homeowners, contractors, and DIY enthusiasts working on residential houses, barn-style buildings, or farmhouse architecture. By estimating materials in advance, you can reduce waste, plan accurate layouts, and stay within your project budget.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">What Is Board and Batten Siding?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Board and batten siding</strong> is a traditional wall siding technique that uses wide vertical boards with narrow strips called battens placed over the seams. This design creates a distinctive vertical pattern and improves both structural strength and visual appeal.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Historically, board and batten siding was used in barn-style buildings and rural homes, but today it is widely used in modern farmhouse architecture, exterior siding designs, and interior accent walls.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Common board and batten siding materials include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Wood siding</li>
                <li>Vinyl siding</li>
                <li>Fiber cement siding</li>
                <li>Engineered wood panels</li>
                <li>Painted board and batten finishes</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                Because the layout requires accurate spacing and measurements, a <strong>board and batten siding calculator</strong> helps determine the exact number of boards and battens required.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">How the Board and Batten Calculator Works</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The <strong>board and batten material calculator</strong> uses a simple measurement formula to estimate materials based on your wall dimensions and board spacing.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Input Measurements</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The calculator uses the following values:
              </p>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Input</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Wall width</td>
                      <td className="border border-gray-300 px-4 py-2">Total horizontal width of the wall</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Wall height</td>
                      <td className="border border-gray-300 px-4 py-2">Total vertical height of the wall</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Board width</td>
                      <td className="border border-gray-300 px-4 py-2">Width of each board used in the siding</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Board spacing</td>
                      <td className="border border-gray-300 px-4 py-2">Space between boards</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Doors and windows</td>
                      <td className="border border-gray-300 px-4 py-2">Optional areas excluded from calculations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Once these values are entered, the calculator determines the layout structure and material requirements.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Board and Batten Layout Structure</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The layout section of the calculator calculates the number of structural components required to install the siding.
              </p>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Layout Result</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Number of boards</td>
                      <td className="border border-gray-300 px-4 py-2">Total vertical boards required</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Number of battens</td>
                      <td className="border border-gray-300 px-4 py-2">Battens covering spaces between boards</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Rows of furring strip</td>
                      <td className="border border-gray-300 px-4 py-2">Horizontal support strips</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Number of trims</td>
                      <td className="border border-gray-300 px-4 py-2">Edge finishing pieces</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                These values help ensure a balanced <strong>board and batten wall design</strong> with evenly spaced boards and battens.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Board and Batten Calculator Formula</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The <strong>board and batten spacing calculator</strong> works using a basic construction formula.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Step 1: Calculate Wall Area</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
                Wall Area = Wall Width × Wall Height
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-gray-900 font-semibold mb-2">Example:</p>
                <p className="text-gray-700 mb-1">Wall Width = 5 m</p>
                <p className="text-gray-700 mb-1">Wall Height = 3 m</p>
                <p className="text-gray-900 font-semibold mt-2">Wall Area = 15 m²</p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Step 2: Calculate Number of Boards</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
                Number of Boards = Wall Width ÷ (Board Width + Board Spacing)
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-gray-900 font-semibold mb-2">Example:</p>
                <p className="text-gray-700 mb-1">Wall Width = 500 cm</p>
                <p className="text-gray-700 mb-1">Board Width = 20 cm</p>
                <p className="text-gray-700 mb-1">Board Spacing = 10 cm</p>
                <p className="text-gray-900 font-semibold mt-2">Number of Boards = 500 ÷ (20 + 10)</p>
                <p className="text-gray-900 font-semibold">Number of Boards ≈ 16 boards</p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Step 3: Calculate Number of Battens</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Battens typically cover the gaps between boards.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
                Number of Battens = Number of Boards − 1
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-gray-900 font-semibold mb-2">Example:</p>
                <p className="text-gray-700 mb-1">Boards = 16</p>
                <p className="text-gray-900 font-semibold mt-2">Battens = 15</p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Step 4: Total Material Length</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-6 font-mono text-sm">
                Total Material Length = Number of Boards × Wall Height
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                This value helps estimate the required siding material length.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Estimated Results from the Calculator</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                After entering your measurements, the calculator generates the following results:
              </p>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Result</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Explanation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Total number of boards</td>
                      <td className="border border-gray-300 px-4 py-2">Vertical boards required for the wall</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Total number of battens</td>
                      <td className="border border-gray-300 px-4 py-2">Battens covering board gaps</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Required furring strips</td>
                      <td className="border border-gray-300 px-4 py-2">Horizontal supports behind boards</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Trim pieces</td>
                      <td className="border border-gray-300 px-4 py-2">Finishing edges and corners</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Total siding material length</td>
                      <td className="border border-gray-300 px-4 py-2">Overall material required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                This information helps builders accurately estimate <strong>board and batten siding materials</strong> before starting construction.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Understanding Board and Batten Layout</h2>
              <div className="mb-8 bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
                <img 
                  src="/images/daigram-of-batten.png" 
                  alt="Board and Batten Wall Diagram with vertical boards and battens"
                  className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                />
                <p className="text-center text-gray-600 mt-4 text-sm">
                  <strong>Board and Batten Structure:</strong> Vertical boards are installed first, with battens covering the seams. Furring strips provide horizontal support behind the boards.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Board and Batten Wall Design Applications</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A <strong>board and batten wall siding calculator</strong> can be used for many construction and interior design projects.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Residential Houses</h3>
                  <p className="text-gray-700 mb-0">Board and batten siding is widely used on modern homes and farmhouse-style houses because of its vertical texture and durability.</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Farmhouse Architecture</h3>
                  <p className="text-gray-700 mb-0">The design is strongly associated with traditional farmhouses and barns, making it a popular choice for rustic exteriors.</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Interior Accent Walls</h3>
                  <p className="text-gray-700 mb-0">Many homeowners use board and batten panels to create decorative accent walls in living rooms, bedrooms, and entryways.</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Exterior Wall Siding</h3>
                  <p className="text-gray-700 mb-0">It also functions as durable exterior wall siding that protects buildings from weather exposure.</p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Barn-Style Buildings</h3>
                  <p className="text-gray-700 mb-0">Board and batten siding remains a classic choice for barns, storage buildings, and agricultural structures.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Board and Batten Material Types</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Different materials can be used for board and batten siding depending on the project type.
              </p>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Material</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Advantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Wood siding</td>
                      <td className="border border-gray-300 px-4 py-2">Traditional appearance</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Vinyl siding</td>
                      <td className="border border-gray-300 px-4 py-2">Low maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Fiber cement siding</td>
                      <td className="border border-gray-300 px-4 py-2">Durable and weather resistant</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Engineered wood</td>
                      <td className="border border-gray-300 px-4 py-2">Strong and cost-effective</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Painted board and batten</td>
                      <td className="border border-gray-300 px-4 py-2">Decorative interior walls</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Choosing the right siding material improves both durability and visual appeal.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">How to Use the Board and Batten Calculator</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Follow these steps to estimate your materials.
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1</h3>
                  <p className="text-gray-700 mb-0">Measure the wall width and wall height.</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2</h3>
                  <p className="text-gray-700 mb-0">Enter the board width used for siding.</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3</h3>
                  <p className="text-gray-700 mb-0">Enter the board spacing between boards.</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4</h3>
                  <p className="text-gray-700 mb-0">Exclude doors and windows if necessary.</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 5</h3>
                  <p className="text-gray-700 mb-2">Click calculate.</p>
                  <p className="text-gray-700 mb-2">The calculator will instantly estimate:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Number of boards</li>
                    <li>Number of battens</li>
                    <li>Required furring strips</li>
                    <li>Trim pieces</li>
                    <li>Total siding material length</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                This process helps you plan an accurate <strong>DIY board and batten project</strong>.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Board and Batten Spacing Guide</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Proper spacing is important for visual balance and structural stability.
              </p>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Board Width</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Recommended Spacing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">6 inches</td>
                      <td className="border border-gray-300 px-4 py-2">8–12 inches</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">8 inches</td>
                      <td className="border border-gray-300 px-4 py-2">10–16 inches</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">10 inches</td>
                      <td className="border border-gray-300 px-4 py-2">12–18 inches</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Spacing may vary depending on the wall design and aesthetic preference.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Benefits of Using a Board and Batten Calculator</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Using a <strong>board and batten material estimator</strong> provides several advantages.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Accurate Material Estimation</h3>
                  <p className="text-gray-700 mb-0">You can determine exactly how many boards and battens are required.</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Saves Time</h3>
                  <p className="text-gray-700 mb-0">Automatic calculations eliminate manual measuring errors.</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Reduces Waste</h3>
                  <p className="text-gray-700 mb-0">Accurate planning reduces excess siding materials.</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Helps DIY Projects</h3>
                  <p className="text-gray-700 mb-0">Perfect for homeowners planning a DIY board and batten wall calculator project.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Frequently Asked Questions</h2>
              
              <div className="space-y-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">What is board and batten siding?</h3>
                  <p className="text-gray-700 mb-0">Board and batten siding is a wall siding method where wide vertical boards are installed first, and narrow battens are placed over the seams between the boards. This creates a layered, textured appearance commonly used in farmhouse and barn-style architecture.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">How do you calculate board and batten spacing?</h3>
                  <p className="text-gray-700 mb-0">To calculate board and batten spacing, divide the wall width by the combined width of the board and the desired spacing. The result determines how many boards will fit across the wall.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">How to calculate board and batten wall materials?</h3>
                  <p className="text-gray-700 mb-2">To estimate materials:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Measure wall width and height</li>
                    <li>Determine board width</li>
                    <li>Choose spacing between boards</li>
                    <li>Divide wall width by board width + spacing</li>
                  </ul>
                  <p className="text-gray-700 mt-2 mb-0">This calculation provides the number of boards and battens needed.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">How many battens do I need?</h3>
                  <p className="text-gray-700 mb-0">In most board and batten layouts, the number of battens equals the number of boards minus one, because battens cover the seams between boards.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Is board and batten the same as wainscoting?</h3>
                  <p className="text-gray-700 mb-0">No. Wainscoting usually covers the lower portion of a wall, while board and batten can cover an entire wall or exterior siding.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                A <strong>board and batten calculator</strong> is an essential tool for anyone planning a siding project, whether for interior accent walls or exterior farmhouse-style architecture. By accurately estimating the number of boards, battens, furring strips, and trim pieces, you can reduce material waste, save time, and ensure a professional-looking installation. Use this calculator to plan your next DIY or professional board and batten project with confidence.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <SimilarCalculators
              calculators={[
                {
                  calculatorName: "Board Foot Calculator",
                  calculatorHref: "/construction/board-foot-calculator",
                  calculatorDescription: "Calculate board feet for lumber"
                },
                {
                  calculatorName: "Cubic Yard Calculator",
                  calculatorHref: "/construction/cubic-yard-calculator",
                  calculatorDescription: "Calculate cubic yards for materials"
                },
                {
                  calculatorName: "Angle Weight Calculator",
                  calculatorHref: "/construction/angle-weight-calculator",
                  calculatorDescription: "Calculate steel angle weight in kg"
                }
              ]}
              color="orange"
            />
          </div>
        </main>
      </div>
    </>
  );
}
