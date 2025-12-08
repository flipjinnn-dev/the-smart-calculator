"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Calculator, Ruler, Package, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
interface BoardFootResults {
  boardFeetPerPiece: number;
  totalBoardFeet: number;
  totalCost?: number;
  cubicInches: number;
  cubicFeet: number;
}
export default function BoardFootCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('board-foot-calculator', language, 'calculator-ui');
  const { content: guideContent } = useCalculatorContent(
    'board-foot-calculator',  // Calculator name
    language,                            // Current language (en/ur etc)
    "calculator-guide"                   // Content type
  );
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };

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
    "loading_0": "",
    "in_1": "",
    "in_2": "",
    "ft_3": "",
    "in_4": "",
    "bf_5": "",
    "bf_6": "",
    "bf_7": "",
    "in_8": "",
    "volume_cubic_feet_9": "",
    "ft_10": "",
    "total_cost_11": "",
    "pkr_12": "",
    "save_this_calculation_13": "",
    "a_board_foot_is_a_unit_of_measurement_for_lumber_v_14": "",
    "calculation_formulas_15": "",
    "length_in_feet_16": "",
    "bf_lengthft_widthin_thicknessin_12_17": "",
    "length_in_inches_18": "",
    "bf_thicknessin_widthin_lengthin_144_19": "",
    "key_conversions_20": "",
    "k_1_board_foot_21": "",
    "k_144_cubic_inches_22": "",
    "k_1_board_foot_23": "",
    "k_112_cubic_foot_24": "",
    "total_bf_25": "",
    "number_of_pieces_bf_per_piece_26": "",
    "total_cost_27": "",
    "total_bf_price_per_bf_28": "",
    "example_29": "",
    "a_2_6_8_board_8_6_2_12_8_board_feet_for_10_pieces__30": "",
    "price_per_board_foot_optional_5": "",
    "pkrbf_6": "",
    "cost_per_board_foot_for_total_price_calculation_7": "",
    "bf_8": "",
    "bf_9": "",
    "bf_10": "",
    "in_11": "",
    "volume_cubic_feet_12": "",
    "ft_13": "",
    "total_cost_14": "",
    "pkr_15": "",
    "save_this_calculation_16": "",
    "a_board_foot_is_a_unit_of_measurement_for_lumber_v_17": "",
    "calculation_formulas_18": "",
    "length_in_feet_19": "",
    "bf_lengthft_widthin_thicknessin_12_20": "",
    "length_in_inches_21": "",
    "bf_thicknessin_widthin_lengthin_144_22": "",
    "key_conversions_23": "",
    "k_1_board_foot_24": "",
    "k_144_cubic_inches_25": "",
    "k_1_board_foot_26": "",
    "k_112_cubic_foot_27": "",
    "total_bf_28": "",
    "number_of_pieces_bf_per_piece_29": "",
    "total_cost_30": "",
    "total_bf_price_per_bf_31": "",
    "example_32": "",
    "a_2_6_8_board_8_6_2_12_8_board_feet_for_10_pieces__33": ""
  };
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [pieces, setPieces] = useState("1");
  const [thickness, setThickness] = useState("1");
  const [width, setWidth] = useState("6");
  const [length, setLength] = useState("8");
  const [lengthUnit, setLengthUnit] = useState("feet");
  const [pricePerBF, setPricePerBF] = useState("");
  const [results, setResults] = useState<BoardFootResults | null>(null);

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">{contentData.loading_0}</div>;
  }

  // Show error if content failed to load
  if (contentError) {
    console.error('Error loading content:', contentError);
  }
  const calculateBoardFeet = () => {
    const numPieces = Number.parseFloat(pieces);
    const thicknessIn = Number.parseFloat(thickness);
    const widthIn = Number.parseFloat(width);
    const lengthValue = Number.parseFloat(length);
    const price = pricePerBF ? Number.parseFloat(pricePerBF) : null;

    // Validation
    if (!numPieces || numPieces <= 0 || !thicknessIn || thicknessIn <= 0 || !widthIn || widthIn <= 0 || !lengthValue || lengthValue <= 0) {
      return;
    }
    let boardFeetPerPiece = 0;
    if (lengthUnit === "feet") {
      // Formula: BF = (Length_ft × Width_in × Thickness_in) / 12
      boardFeetPerPiece = lengthValue * widthIn * thicknessIn / 12;
    } else {
      // Formula: BF = (Thickness_in × Width_in × Length_in) / 144
      boardFeetPerPiece = thicknessIn * widthIn * lengthValue / 144;
    }
    const totalBoardFeet = numPieces * boardFeetPerPiece;
    const cubicInches = totalBoardFeet * 144; // 1 board foot = 144 cubic inches
    const cubicFeet = totalBoardFeet / 12; // 1 board foot = 1/12 cubic foot

    const calculationResults: BoardFootResults = {
      boardFeetPerPiece: Math.round(boardFeetPerPiece * 1000) / 1000,
      totalBoardFeet: Math.round(totalBoardFeet * 1000) / 1000,
      cubicInches: Math.round(cubicInches * 100) / 100,
      cubicFeet: Math.round(cubicFeet * 1000) / 1000
    };
    if (price && price > 0) {
      calculationResults.totalCost = Math.round(totalBoardFeet * price * 100) / 100;
    }
    setResults(calculationResults);

    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 pt-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-amber-600" />
                    <span>{contentData.pageTitle}</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {contentData.messages?.enterInformation || 'Enter lumber dimensions to calculate board feet and cost'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.form?.labels?.quantity || 'Number of Pieces'}</Label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" placeholder="1" value={pieces} onChange={e => setPieces(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-amber-500" min="1" step="1" />
                      </div>
                      <p className="text-sm text-gray-500">{contentData.tooltips?.quantity || 'Quantity of lumber pieces'}</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.form?.labels?.thickness || 'Thickness'}</Label>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" placeholder={contentData.form?.placeholders?.thickness || '1'} value={thickness} onChange={e => setThickness(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-amber-500" min="0.25" step="0.25" />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{contentData.in_1}</span>
                      </div>
                      <p className="text-sm text-gray-500">{contentData.tooltips?.thickness || 'Lumber thickness'}</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.form?.labels?.width || 'Width'}</Label>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" placeholder={contentData.form?.placeholders?.width || '6'} value={width} onChange={e => setWidth(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-amber-500" min="0.5" step="0.5" />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{contentData.in_2}</span>
                      </div>
                      <p className="text-sm text-gray-500">{contentData.tooltips?.width || 'Lumber width'}</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.form?.labels?.length || 'Length'}</Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input type="number" placeholder={contentData.form?.placeholders?.length || '8'} value={length} onChange={e => setLength(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-amber-500" min="0.5" step="0.5" />
                        </div>
                        <Select value={lengthUnit} onValueChange={setLengthUnit}>
                          <SelectTrigger className="w-24 h-12 border-2 focus:border-amber-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="feet">{contentData.ft_3}</SelectItem>
                            <SelectItem value="inches">{contentData.in_4}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-sm text-gray-500">{contentData.tooltips?.length || 'Lumber length'}</p>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.price_per_board_foot_optional_5}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" placeholder="5.50" value={pricePerBF} onChange={e => setPricePerBF(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-amber-500" min="0" step="0.01" />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">{contentData.pkrbf_6}</span>
                      </div>
                      <p className="text-sm text-gray-500">{contentData.cost_per_board_foot_for_total_price_calculation_7}</p>
                    </div>
                  </div>

                  <Button onClick={calculateBoardFeet} className="w-full h-14 text-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-xl font-bold">
                    {contentData.form?.buttons?.calculate || 'Calculate Board Feet'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.results?.boardFootResultsTitle || 'Results'}</CardTitle>
                  <CardDescription className="text-base">{contentData.messages?.resultMessage || 'Board foot calculations'}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                    {/* Main Result */}
                    <div className="text-center p-6 bg-gradient-to-r from-amber-50 to-orange-100 rounded-2xl border-2 border-amber-200">
                      <p className="text-lg text-gray-600 mb-2">{contentData.results?.totalBoardFeet || 'Total Board Feet'}</p>
                      <p className="text-4xl font-bold text-amber-700 mb-2">{results.totalBoardFeet}</p>
                      <p className="text-sm text-gray-600">{contentData.bf_8}</p>
                    </div>

                    {/* Detailed Results */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-gray-900">{contentData.results?.boardFootResultsTitle || 'Detailed Results'}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <span className="font-medium text-gray-700">{contentData.results?.boardFeet || 'Board feet per piece'}:</span>
                          <span className="font-bold text-amber-600">{results.boardFeetPerPiece}{contentData.bf_9}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">{contentData.results?.totalBoardFeet || 'Total board feet'}:</span>
                          <span className="font-bold text-orange-600">{results.totalBoardFeet}{contentData.bf_10}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <span className="font-medium text-gray-700">{contentData.results?.volume || 'Volume'}:</span>
                          <span className="font-bold text-yellow-600">{results.cubicInches}{contentData.in_11}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                          <span className="font-medium text-gray-700">{contentData.volume_cubic_feet_12}</span>
                          <span className="font-bold text-red-600">{results.cubicFeet}{contentData.ft_13}</span>
                        </div>
                        {results.totalCost && <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-gray-700">{contentData.total_cost_14}</span>
                          <span className="font-bold text-green-600">{contentData.pkr_15}{results.totalCost}</span>
                        </div>}
                      </div>
                    </div>

                    {/* Save Button */}
                    <Button className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white font-bold">{contentData.save_this_calculation_16}</Button>
                  </div> : <div className="text-center py-12 text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">{contentData.messages?.enterInformation || 'Enter lumber dimensions to calculate board feet'}</p>
                  </div>}
                </CardContent>
              </Card>
            </div>
          </div>
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "Square Feet to Cubic Yards Calculator",
            calculatorHref: "/construction/square-feet-to-cubic-yards-calculator",
            calculatorDescription: "Convert square feet to cubic yards for concrete, soil, and other materials in construction and landscaping projects"
          }, {
            calculatorName: "Size to Weight Calculator",
            calculatorHref: "/construction/size-to-weight-rectangular-cuboid-calculator",
            calculatorDescription: "Calculate the weight of a rectangular cuboid given its dimensions and material density for shipping, construction, and engineering applications"
          }, {
            calculatorName: "Cubic Yard Calculator",
            calculatorHref: "/construction/cubic-yard-calculator",
            calculatorDescription: "Calculate cubic yards for concrete, soil, and other materials with precise measurements for construction and landscaping projects"
          }
          ]}
            color="orange"
            title="Related Contruction Calculators" />
          {/* Information Section */}
          <section className="mt-16">
            <Card className="shadow-2xl border-0 pt-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-amber-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="text-2xl">{contentData.educational?.boardFootInfo || 'About Board Foot Calculator'}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 prose max-w-none">
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{contentData.a_board_foot_is_a_unit_of_measurement_for_lumber_v_17}</p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">{contentData.calculation_formulas_18}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <h4 className="font-bold text-amber-800 mb-2">{contentData.length_in_feet_19}</h4>
                      <p className="text-sm text-gray-700">{contentData.bf_lengthft_widthin_thicknessin_12_20}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-bold text-orange-800 mb-2">{contentData.length_in_inches_21}</h4>
                      <p className="text-sm text-gray-700">{contentData.bf_thicknessin_widthin_lengthin_144_22}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900">{contentData.key_conversions_23}</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>{contentData.k_1_board_foot_24}</strong>{contentData.k_144_cubic_inches_25}</p>
                      <p>
                        <strong>{contentData.k_1_board_foot_26}</strong>{contentData.k_112_cubic_foot_27}</p>
                      <p>
                        <strong>{contentData.total_bf_28}</strong>{contentData.number_of_pieces_bf_per_piece_29}</p>
                      <p>
                        <strong>{contentData.total_cost_30}</strong>{contentData.total_bf_price_per_bf_31}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                  <p className="text-gray-700 font-medium">
                    <strong>{contentData.example_32}</strong>{contentData.a_2_6_8_board_8_6_2_12_8_board_feet_for_10_pieces__33}</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

    </div>
  </>;
}