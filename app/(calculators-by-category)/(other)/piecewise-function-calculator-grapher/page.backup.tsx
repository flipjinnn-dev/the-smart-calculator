"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FenceIcon as Function, AlertCircle, Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';

// mathematical expression evaluator
const evaluateExpression = (expression: string, x: number): number => {
  try {
    // Replace mathematical functions and constants
    const expr = expression.replace(/x/g, x.toString()).replace(/\^/g, "**").replace(/sin\(/g, "Math.sin(").replace(/cos\(/g, "Math.cos(").replace(/tan\(/g, "Math.tan(").replace(/log\(/g, "Math.log10(").replace(/ln\(/g, "Math.log(").replace(/sqrt\(/g, "Math.sqrt(").replace(/exp\(/g, "Math.exp(").replace(/abs\(/g, "Math.abs(").replace(/pi/g, "Math.PI").replace(/e/g, "Math.E");
    const result = eval(expr);
    return isFinite(result) ? result : Number.NaN;
  } catch (error) {
    return Number.NaN;
  }
};

// Domain parser for inequalities
const parseDomain = (domainStr: string): {
  type: string;
  min?: number;
  max?: number;
  value?: number;
  includeMin?: boolean;
  includeMax?: boolean;
} => {
  const domain = domainStr.trim();

  // Handle exact value: x = a
  if (domain.includes("=")) {
    const match = domain.match(/x\s*=\s*(-?\d*\.?\d+)/);
    if (match) {
      return {
        type: "exact",
        value: Number.parseFloat(match[1])
      };
    }
  }

  // Handle intervals: a ≤ x < b, a < x ≤ b, etc.
  const intervalMatch = domain.match(/(-?\d*\.?\d+)\s*([<≤])\s*x\s*([<≤])\s*(-?\d*\.?\d+)/);
  if (intervalMatch) {
    return {
      type: "interval",
      min: Number.parseFloat(intervalMatch[1]),
      max: Number.parseFloat(intervalMatch[4]),
      includeMin: intervalMatch[2] === "≤",
      includeMax: intervalMatch[3] === "≤"
    };
  }

  // Handle single-sided: x < a, x ≤ a, x > a, x ≥ a
  const singleMatch = domain.match(/x\s*([<>≤≥])\s*(-?\d*\.?\d+)/);
  if (singleMatch) {
    const value = Number.parseFloat(singleMatch[2]);
    const operator = singleMatch[1];
    if (operator === "<") {
      return {
        type: "interval",
        max: value,
        includeMax: false
      };
    } else if (operator === "≤") {
      return {
        type: "interval",
        max: value,
        includeMax: true
      };
    } else if (operator === ">") {
      return {
        type: "interval",
        min: value,
        includeMin: false
      };
    } else if (operator === "≥") {
      return {
        type: "interval",
        min: value,
        includeMin: true
      };
    }
  }
  return {
    type: "invalid"
  };
};

// Check if x is in domain
const isInDomain = (x: number, domain: any): boolean => {
  if (domain.type === "exact") {
    return Math.abs(x - domain.value!) < 1e-10;
  } else if (domain.type === "interval") {
    let inRange = true;
    if (domain.min !== undefined) {
      inRange = inRange && (domain.includeMin ? x >= domain.min : x > domain.min);
    }
    if (domain.max !== undefined) {
      inRange = inRange && (domain.includeMax ? x <= domain.max : x < domain.max);
    }
    return inRange;
  }
  return false;
};
interface PiecewisePiece {
  id: string;
  expression: string;
  domain: string;
  color: string;
}
export default function PiecewiseFunctionCalculatorGrapherCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('piecewise-function-calculator-grapher', language, "calculator-ui");
  const { content: guideContent } = useCalculatorContent(
    'piecewise-function-calculator-grapher',  // Calculator name
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
    "function_pieces_2": "",
    "add_piece_3": "",
    "piece_4": "",
    "expression_fx_5": "",
    "domain_6": "",
    "view_window_7": "",
    "min_x_8": "",
    "max_x_9": "",
    "min_y_10": "",
    "max_y_11": "",
    "graph_options_12": "",
    "show_grid_13": "",
    "show_axis_14": "",
    "label_axis_15": "",
    "show_graph_16": "",
    "plot_function_17": "",
    "clear_18": "",
    "example_19": "",
    "interactive_graph_20": "",
    "zoom_in_21": "",
    "zoom_out_22": "",
    "reset_view_23": "",
    "sample_evaluation_points_24": "",
    "x_25": "",
    "fx_26": "",
    "piece_27": "",
    "piece_28": "",
    "what_is_a_piecewise_function_29": "",
    "a_piecewise_function_is_a_function_that_is_defined_30": "",
    "piecewise_functions_are_commonly_used_to_model_rea_31": "",
    "how_to_use_the_calculator_32": "",
    "define_each_piece_by_entering_a_mathematical_expre_33": "",
    "specify_the_domain_for_each_piece_using_inequality_34": "",
    "choose_colors_for_each_piece_to_distinguish_them_o_35": "",
    "set_the_viewing_window_by_adjusting_minmax_x_and_y_36": "",
    "configure_graph_options_grid_axes_labels_37": "",
    "click_plot_function_to_visualize_your_piecewise_fu_38": "",
    "use_example_to_load_a_sample_piecewise_function_39": "",
    "piecewise_function_formula_rules_40": "",
    "fx_41": "",
    "fx_if_domain_1_42": "",
    "fx_if_domain_2_43": "",
    "fx_if_domain_n_44": "",
    "domain_notation_45": "",
    "closed_interval_46": "",
    "a_x_b_includes_endpoints_47": "",
    "open_interval_48": "",
    "a_x_b_excludes_endpoints_49": "",
    "halfopen_50": "",
    "a_x_b_or_a_x_b_51": "",
    "unbounded_52": "",
    "x_a_x_b_etc_53": "",
    "point_domain_54": "",
    "x_a_single_point_55": "",
    "endpoint_behavior_56": "",
    "filled_circle_57": "",
    "point_is_included_58": "",
    "open_circle_59": "",
    "point_is_excluded_60": "",
    "discontinuities_61": "",
    "gaps_where_no_piece_is_defined_62": "",
    "asymptotes_63": "",
    "vertical_lines_where_function_approaches_64": "",
    "example_65": "",
    "example_piecewise_function_66": "",
    "fx_67": "",
    "x_for_2_x_0_red_68": "",
    "sinx_for_0_x_3_blue_69": "",
    "k_1x2_for_3_x_5_green_70": "",
    "steps_71": "",
    "parse_domain_intervals_and_check_for_validity_72": "",
    "plot_each_expression_in_its_specified_color_within_73": "",
    "show_filled_circles_at_included_endpoints_open_cir_74": "",
    "handle_discontinuity_at_x2_for_the_third_piece_ver_75": "",
    "display_graph_with_legend_showing_expression_domai_76": "",
    "output_77": "",
    "interactive_graph_showing_three_distinct_pieces_wi_78": "",
    "faq_79": "",
    "what_is_a_piecewise_function_80": "",
    "a_piecewise_function_is_a_function_defined_by_mult_81": "",
    "how_do_you_graph_piecewise_functions_82": "",
    "graph_each_piece_separately_within_its_specified_d_83": "",
    "whats_the_difference_between_open_and_closed_inter_84": "",
    "closed_intervals_include_their_endpoints_shown_wit_85": "",
    "can_piecewise_functions_be_discontinuous_86": "",
    "yes_piecewise_functions_can_have_discontinuities_w_87": "",
    "piecewise_function_definition_0": "",
    "define_each_piece_of_your_piecewise_function_with__1": ""
  };
  const [pieces, setPieces] = useState<PiecewisePiece[]>([{
    id: "1",
    expression: "x**2",
    domain: "-2 ≤ x < 0",
    color: "#ef4444"
  }, {
    id: "2",
    expression: "sin(x)",
    domain: "0 ≤ x ≤ 3",
    color: "#3b82f6"
  }, {
    id: "3",
    expression: "1/(x-2)",
    domain: "3 < x ≤ 5",
    color: "#10b981"
  }]);
  const [viewWindow, setViewWindow] = useState({
    minX: -3,
    maxX: 6,
    minY: -2,
    maxY: 4
  });

  // Zoom and pan handlers for recharts (simulate by changing viewWindow)
  // Mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const chartDiv = document.getElementById('piecewise-recharts-chart');
      if (!chartDiv || !chartDiv.contains(e.target as Node)) return;
      e.preventDefault();
      const {
        minX,
        maxX,
        minY,
        maxY
      } = viewWindow;
      const zoomIntensity = 0.1;
      const rect = chartDiv.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width;
      const mouseY = 1 - (e.clientY - rect.top) / rect.height;
      const xRange = maxX - minX;
      const yRange = maxY - minY;
      const wheel = e.deltaY < 0 ? 1 - zoomIntensity : 1 + zoomIntensity;
      const newXRange = xRange * wheel;
      const newYRange = yRange * wheel;
      const newMinX = minX + (xRange - newXRange) * mouseX;
      const newMaxX = newMinX + newXRange;
      const newMinY = minY + (yRange - newYRange) * mouseY;
      const newMaxY = newMinY + newYRange;
      setViewWindow({
        minX: newMinX,
        maxX: newMaxX,
        minY: newMinY,
        maxY: newMaxY
      });
    };
    window.addEventListener('wheel', handleWheel, {
      passive: false
    });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [viewWindow]);
  const [graphOptions, setGraphOptions] = useState({
    showGrid: true,
    showAxis: true,
    labelAxis: true,
    showGraph: true
  });
  const [error, setError] = useState("");
  const [evaluationPoints, setEvaluationPoints] = useState<any[]>([]);
  const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"];
  const addPiece = () => {
    const newId = (pieces.length + 1).toString();
    const newColor = colors[pieces.length % colors.length];
    setPieces(prev => {
      const updated = [...prev, {
        id: newId,
        expression: "x",
        domain: "x > 0",
        color: newColor
      }];
      // chart updates automatically
      return updated;
    });
  };
  const removePiece = (id: string) => {
    if (pieces.length > 1) {
      setPieces(prev => {
        const updated = prev.filter(p => p.id !== id);
        // chart updates automatically
        return updated;
      });
    }
  };
  const updatePiece = (id: string, field: keyof PiecewisePiece, value: string) => {
    setPieces(prev => {
      const updated = prev.map(p => p.id === id ? {
        ...p,
        [field]: value
      } : p);
      // chart updates automatically
      return updated;
    });
  };

  // Compute chart data for recharts
  const [chartData, setChartData] = useState<any[]>([]);
  useEffect(() => {
    setError("");
    if (!graphOptions.showGraph) return;
    const {
      minX,
      maxX,
      minY,
      maxY
    } = viewWindow;
    // Parse domains and validate
    const parsedPieces = pieces.map(piece => ({
      ...piece,
      parsedDomain: parseDomain(piece.domain)
    }));
    // Check for invalid domains
    const invalidPieces = parsedPieces.filter(p => p.parsedDomain.type === "invalid");
    if (invalidPieces.length > 0) {
      setError(`Invalid domain syntax in piece(s): ${invalidPieces.map(p => p.id).join(", ")}`);
      setChartData([]);
      setEvaluationPoints([]);
      return;
    }
    // Sample and plot each piece
    const samplePoints = 500;
    const dx = (maxX - minX) / (samplePoints - 1);
    const evalPoints: any[] = [];
    for (let i = 0; i < samplePoints; i++) {
      const x = minX + i * dx;
      let y: number | null = null;
      let color: string | null = null;
      let pieceId: string | null = null;
      for (const piece of parsedPieces) {
        if (isInDomain(x, piece.parsedDomain)) {
          y = evaluateExpression(piece.expression, x);
          color = piece.color;
          pieceId = piece.id;
          break;
        }
      }
      if (y !== null && isFinite(y) && y >= minY && y <= maxY) {
        evalPoints.push({
          x,
          y,
          pieceId,
          color
        });
      } else {
        evalPoints.push({
          x,
          y: null,
          pieceId: null,
          color: null
        });
      }
    }
    setChartData(evalPoints);
    setEvaluationPoints(evalPoints.filter(p => p.y !== null).slice(0, 20));
  }, [pieces, viewWindow, graphOptions]);
  const clearGraph = () => {
    setEvaluationPoints([]);
    setError("");
    setChartData([]);
  };
  const runExample = () => {
    setPieces([{
      id: "1",
      expression: "x**2",
      domain: "-2 ≤ x < 0",
      color: "#ef4444"
    }, {
      id: "2",
      expression: "sin(x)",
      domain: "0 ≤ x ≤ 3",
      color: "#3b82f6"
    }, {
      id: "3",
      expression: "1/(x-2)",
      domain: "3 < x ≤ 5",
      color: "#10b981"
    }]);
    setViewWindow({
      minX: -3,
      maxX: 6,
      minY: -2,
      maxY: 4
    });
    // chart updates automatically
  };

  // chart updates automatically via useEffect above

  return <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Function className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Input Form */}
            <div>
              <Card className="shadow-2xl p-0 border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Function className="w-6 h-6 text-blue-600" />
                    <span>{contentData.piecewise_function_definition_0}</span>
                  </CardTitle>
                  <CardDescription className="text-base">{contentData.define_each_piece_of_your_piecewise_function_with__1}</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {error && <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>}

                  <div className="space-y-6">
                    {/* Function Pieces */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-lg font-semibold text-gray-900">{contentData.function_pieces_2}</Label>
                        <Button onClick={addPiece} size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-4 h-4 mr-1" />{contentData.add_piece_3}</Button>
                      </div>

                      <div className="space-y-4">
                        {pieces.map((piece, index) => <div key={piece.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700">{contentData.piece_4}{index + 1}</span>
                            <div className="flex items-center space-x-2">
                              <input type="color" value={piece.color} onChange={e => updatePiece(piece.id, "color", e.target.value)} className="w-8 h-8 rounded border border-gray-300" />
                              {pieces.length > 1 && <Button onClick={() => removePiece(piece.id)} size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-1 block">{contentData.expression_fx_5}</Label>
                              <Input value={piece.expression} onChange={e => updatePiece(piece.id, "expression", e.target.value)} placeholder="x**2 + 1" className="font-mono" />
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-700 mb-1 block">{contentData.domain_6}</Label>
                              <Input value={piece.domain} onChange={e => updatePiece(piece.id, "domain", e.target.value)} placeholder="0 ≤ x < 1" className="font-mono" />
                            </div>
                          </div>
                        </div>)}
                      </div>
                    </div>

                    {/* View Window */}
                    <div>
                      <Label className="text-lg font-semibold text-gray-900 mb-3 block">{contentData.view_window_7}</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <Label className="text-sm text-gray-700">{contentData.min_x_8}</Label>
                          <Input type="number" value={viewWindow.minX} onChange={e => setViewWindow({
                            ...viewWindow,
                            minX: Number(e.target.value)
                          })} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-700">{contentData.max_x_9}</Label>
                          <Input type="number" value={viewWindow.maxX} onChange={e => setViewWindow({
                            ...viewWindow,
                            maxX: Number(e.target.value)
                          })} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-700">{contentData.min_y_10}</Label>
                          <Input type="number" value={viewWindow.minY} onChange={e => setViewWindow({
                            ...viewWindow,
                            minY: Number(e.target.value)
                          })} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-700">{contentData.max_y_11}</Label>
                          <Input type="number" value={viewWindow.maxY} onChange={e => setViewWindow({
                            ...viewWindow,
                            maxY: Number(e.target.value)
                          })} />
                        </div>
                      </div>
                    </div>

                    {/* Graph Options */}
                    <div>
                      <Label className="text-lg font-semibold text-gray-900 mb-3 block">{contentData.graph_options_12}</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="showGrid" checked={graphOptions.showGrid} onCheckedChange={checked => setGraphOptions({
                            ...graphOptions,
                            showGrid: !!checked
                          })} />
                          <Label htmlFor="showGrid" className="text-sm">{contentData.show_grid_13}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="showAxis" checked={graphOptions.showAxis} onCheckedChange={checked => setGraphOptions({
                            ...graphOptions,
                            showAxis: !!checked
                          })} />
                          <Label htmlFor="showAxis" className="text-sm">{contentData.show_axis_14}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="labelAxis" checked={graphOptions.labelAxis} onCheckedChange={checked => setGraphOptions({
                            ...graphOptions,
                            labelAxis: !!checked
                          })} />
                          <Label htmlFor="labelAxis" className="text-sm">{contentData.label_axis_15}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="showGraph" checked={graphOptions.showGraph} onCheckedChange={checked => setGraphOptions({
                            ...graphOptions,
                            showGraph: !!checked
                          })} />
                          <Label htmlFor="showGraph" className="text-sm">{contentData.show_graph_16}</Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" disabled>{contentData.plot_function_17}</Button>
                      <Button onClick={clearGraph} variant="outline" className="h-12 px-6 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent">{contentData.clear_18}</Button>
                      <Button onClick={runExample} variant="outline" className="h-12 px-6 border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">{contentData.example_19}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Graph and Results */}
            <div className="space-y-6">
              {/* Graph (Recharts) */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b px-6 py-4">
                  <CardTitle className="text-xl font-bold text-blue-700">{contentData.interactive_graph_20}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Toolbar */}
                  <div className="flex items-center gap-2 mb-4">
                    <Button size="sm" variant="outline" onClick={() => setViewWindow(v => ({
                      minX: v.minX + (v.maxX - v.minX) * 0.1 / 2,
                      maxX: v.maxX - (v.maxX - v.minX) * 0.1 / 2,
                      minY: v.minY + (v.maxY - v.minY) * 0.1 / 2,
                      maxY: v.maxY - (v.maxY - v.minY) * 0.1 / 2
                    }))}>{contentData.zoom_in_21}</Button>
                    <Button size="sm" variant="outline" onClick={() => setViewWindow(v => ({
                      minX: v.minX - (v.maxX - v.minX) * 0.1 / 2,
                      maxX: v.maxX + (v.maxX - v.minX) * 0.1 / 2,
                      minY: v.minY - (v.maxY - v.minY) * 0.1 / 2,
                      maxY: v.maxY + (v.maxY - v.minY) * 0.1 / 2
                    }))}>{contentData.zoom_out_22}</Button>
                    <Button size="sm" variant="outline" onClick={() => setViewWindow({
                      minX: -3,
                      maxX: 6,
                      minY: -2,
                      maxY: 4
                    })}>{contentData.reset_view_23}</Button>
                  </div>
                  <div id="piecewise-recharts-chart" className="relative bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 rounded-2xl shadow-inner p-2" style={{
                    height: 400
                  }}>
                    <ChartContainer config={pieces.reduce((acc, piece) => {
                      acc[piece.id] = {
                        label: piece.expression,
                        color: piece.color
                      };
                      return acc;
                    }, {} as any)} className="h-full w-full">
                      <ResponsiveContainer width="100%" height={"100%"}>
                        <LineChart data={chartData} margin={{
                          top: 20,
                          right: 30,
                          left: 40,
                          bottom: 40
                        }}>
                          {graphOptions.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#c7d2fe" />}
                          <XAxis dataKey="x" type="number" domain={[viewWindow.minX, viewWindow.maxX]} tickFormatter={v => v.toFixed(2)} stroke="#2563eb" allowDataOverflow tick={{
                            fontSize: 12
                          }} />
                          <YAxis type="number" domain={[viewWindow.minY, viewWindow.maxY]} tickFormatter={v => v.toFixed(2)} stroke="#2563eb" allowDataOverflow tick={{
                            fontSize: 12
                          }} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          {pieces.map(piece => <Line key={piece.id} type="monotone" dataKey={d => d.pieceId === piece.id ? d.y : null} name={piece.expression + ' for ' + piece.domain} stroke={piece.color} strokeWidth={3} dot={false} isAnimationActive={true} connectNulls={false} />)}
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Evaluation Points Table */}
              {evaluationPoints.length > 0 && <Card className="shadow-xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b px-6 py-4">
                  <CardTitle className="text-lg font-bold text-blue-700">{contentData.sample_evaluation_points_24}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{contentData.x_25}</TableHead>
                          <TableHead>{contentData.fx_26}</TableHead>
                          <TableHead>{contentData.piece_27}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {evaluationPoints.map((point, index) => <TableRow key={index}>
                          <TableCell className="font-mono">{point.x.toFixed(3)}</TableCell>
                          <TableCell className="font-mono">{point.y.toFixed(3)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 rounded" style={{
                                backgroundColor: point.color
                              }} />
                              <span>{contentData.piece_28}{point.pieceId}</span>
                            </div>
                          </TableCell>
                        </TableRow>)}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>}
            </div>
          </div>
          
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="piecewise-function-calculator-grapher"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          <SimilarCalculators calculators={[{
            calculatorName: "GPA Calculator",
            calculatorHref: "/gpa-calculator",
            calculatorDescription: "Calculate GPA based on course grades and credits with support for both 4.0 scale and letter grades"
          }, {
            calculatorName: "IP Subnet Calculator",
            calculatorHref: "/ip-subnet-calculator",
            calculatorDescription: "Enter IPv4 address and subnet mask to calculate subnet details"
          },
          ]}
            color="blue"
            title="Related Other Calculators" />
          {/* Educational Content */}
          <div className="mt-12 space-y-8">
            {/* What is a Piecewise Function */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.what_is_a_piecewise_function_29}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-gray-700 leading-relaxed mb-4">{contentData.a_piecewise_function_is_a_function_that_is_defined_30}</p>
                <p className="text-gray-700 leading-relaxed">{contentData.piecewise_functions_are_commonly_used_to_model_rea_31}</p>
              </CardContent>
            </Card>

            {/* How to Use */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.how_to_use_the_calculator_32}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>{contentData.define_each_piece_by_entering_a_mathematical_expre_33}</li>
                  <li>{contentData.specify_the_domain_for_each_piece_using_inequality_34}</li>
                  <li>{contentData.choose_colors_for_each_piece_to_distinguish_them_o_35}</li>
                  <li>{contentData.set_the_viewing_window_by_adjusting_minmax_x_and_y_36}</li>
                  <li>{contentData.configure_graph_options_grid_axes_labels_37}</li>
                  <li>{contentData.click_plot_function_to_visualize_your_piecewise_fu_38}</li>
                  <li>{contentData.use_example_to_load_a_sample_piecewise_function_39}</li>
                </ol>
              </CardContent>
            </Card>

            {/* Formula & Rules */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.piecewise_function_formula_rules_40}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                  <div className="text-center text-lg font-mono mb-4">{contentData.fx_41}<br />{contentData.fx_if_domain_1_42}<br />{contentData.fx_if_domain_2_43}<br />
                    &nbsp;&nbsp;⋮
                    <br />{contentData.fx_if_domain_n_44}<br />
                    &#125;
                  </div>
                </div>

                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">{contentData.domain_notation_45}</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        <strong>{contentData.closed_interval_46}</strong>{contentData.a_x_b_includes_endpoints_47}</li>
                      <li>
                        <strong>{contentData.open_interval_48}</strong>{contentData.a_x_b_excludes_endpoints_49}</li>
                      <li>
                        <strong>{contentData.halfopen_50}</strong>{contentData.a_x_b_or_a_x_b_51}</li>
                      <li>
                        <strong>{contentData.unbounded_52}</strong>{contentData.x_a_x_b_etc_53}</li>
                      <li>
                        <strong>{contentData.point_domain_54}</strong>{contentData.x_a_single_point_55}</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">{contentData.endpoint_behavior_56}</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        <strong>{contentData.filled_circle_57}</strong>{contentData.point_is_included_58}</li>
                      <li>
                        <strong>{contentData.open_circle_59}</strong>{contentData.point_is_excluded_60}</li>
                      <li>
                        <strong>{contentData.discontinuities_61}</strong>{contentData.gaps_where_no_piece_is_defined_62}</li>
                      <li>
                        <strong>{contentData.asymptotes_63}</strong>{contentData.vertical_lines_where_function_approaches_64}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Example */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.example_65}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>{contentData.example_piecewise_function_66}</strong>
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">{contentData.fx_67}<br />{contentData.x_for_2_x_0_red_68}<br />{contentData.sinx_for_0_x_3_blue_69}<br />{contentData.k_1x2_for_3_x_5_green_70}<br />
                    &#125;
                  </div>

                  <div>
                    <p className="font-semibold mb-2">{contentData.steps_71}</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
                      <li>{contentData.parse_domain_intervals_and_check_for_validity_72}</li>
                      <li>{contentData.plot_each_expression_in_its_specified_color_within_73}</li>
                      <li>{contentData.show_filled_circles_at_included_endpoints_open_cir_74}</li>
                      <li>{contentData.handle_discontinuity_at_x2_for_the_third_piece_ver_75}</li>
                      <li>{contentData.display_graph_with_legend_showing_expression_domai_76}</li>
                    </ol>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800">
                      <strong>{contentData.output_77}</strong>{contentData.interactive_graph_showing_three_distinct_pieces_wi_78}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="px-8 py-6">
                <CardTitle className="text-2xl font-bold text-gray-900">{contentData.faq_79}</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.what_is_a_piecewise_function_80}</h3>
                    <p className="text-gray-700">{contentData.a_piecewise_function_is_a_function_defined_by_mult_81}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.how_do_you_graph_piecewise_functions_82}</h3>
                    <p className="text-gray-700">{contentData.graph_each_piece_separately_within_its_specified_d_83}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.whats_the_difference_between_open_and_closed_inter_84}</h3>
                    <p className="text-gray-700">{contentData.closed_intervals_include_their_endpoints_shown_wit_85}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contentData.can_piecewise_functions_be_discontinuous_86}</h3>
                    <p className="text-gray-700">{contentData.yes_piecewise_functions_can_have_discontinuities_w_87}</p>
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