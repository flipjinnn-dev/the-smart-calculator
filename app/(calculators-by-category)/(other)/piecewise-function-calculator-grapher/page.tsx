"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { FenceIcon as Function, AlertCircle, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import SEO from "@/lib/seo"
import Logo from "@/components/logo"

// Mathematical expression evaluator
const evaluateExpression = (expression: string, x: number): number => {
  try {
    // Replace mathematical functions and constants
    const expr = expression
      .replace(/x/g, x.toString())
      .replace(/\^/g, "**")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/exp\(/g, "Math.exp(")
      .replace(/abs\(/g, "Math.abs(")
      .replace(/pi/g, "Math.PI")
      .replace(/e/g, "Math.E")

    const result = eval(expr)
    return isFinite(result) ? result : Number.NaN
  } catch (error) {
    return Number.NaN
  }
}

// Domain parser for inequalities
const parseDomain = (
  domainStr: string,
): { type: string; min?: number; max?: number; value?: number; includeMin?: boolean; includeMax?: boolean } => {
  const domain = domainStr.trim()

  // Handle exact value: x = a
  if (domain.includes("=")) {
    const match = domain.match(/x\s*=\s*(-?\d*\.?\d+)/)
    if (match) {
      return { type: "exact", value: Number.parseFloat(match[1]) }
    }
  }

  // Handle intervals: a ≤ x < b, a < x ≤ b, etc.
  const intervalMatch = domain.match(/(-?\d*\.?\d+)\s*([<≤])\s*x\s*([<≤])\s*(-?\d*\.?\d+)/)
  if (intervalMatch) {
    return {
      type: "interval",
      min: Number.parseFloat(intervalMatch[1]),
      max: Number.parseFloat(intervalMatch[4]),
      includeMin: intervalMatch[2] === "≤",
      includeMax: intervalMatch[3] === "≤",
    }
  }

  // Handle single-sided: x < a, x ≤ a, x > a, x ≥ a
  const singleMatch = domain.match(/x\s*([<>≤≥])\s*(-?\d*\.?\d+)/)
  if (singleMatch) {
    const value = Number.parseFloat(singleMatch[2])
    const operator = singleMatch[1]

    if (operator === "<") {
      return { type: "interval", max: value, includeMax: false }
    } else if (operator === "≤") {
      return { type: "interval", max: value, includeMax: true }
    } else if (operator === ">") {
      return { type: "interval", min: value, includeMin: false }
    } else if (operator === "≥") {
      return { type: "interval", min: value, includeMin: true }
    }
  }

  return { type: "invalid" }
}

// Check if x is in domain
const isInDomain = (x: number, domain: any): boolean => {
  if (domain.type === "exact") {
    return Math.abs(x - domain.value!) < 1e-10
  } else if (domain.type === "interval") {
    let inRange = true

    if (domain.min !== undefined) {
      inRange = inRange && (domain.includeMin ? x >= domain.min : x > domain.min)
    }
    if (domain.max !== undefined) {
      inRange = inRange && (domain.includeMax ? x <= domain.max : x < domain.max)
    }

    return inRange
  }

  return false
}

interface PiecewisePiece {
  id: string
  expression: string
  domain: string
  color: string
}

export default function PiecewiseFunctionCalculator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pieces, setPieces] = useState<PiecewisePiece[]>([
    { id: "1", expression: "x**2", domain: "-2 ≤ x < 0", color: "#ef4444" },
    { id: "2", expression: "sin(x)", domain: "0 ≤ x ≤ 3", color: "#3b82f6" },
    { id: "3", expression: "1/(x-2)", domain: "3 < x ≤ 5", color: "#10b981" },
  ])

  const [viewWindow, setViewWindow] = useState({
    minX: -3,
    maxX: 6,
    minY: -2,
    maxY: 4,
  })

  // Zoom and pan handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { minX, maxX, minY, maxY } = viewWindow;
      const zoomIntensity = 0.1;
      const mouseX = e.offsetX / canvas.width;
      const mouseY = 1 - e.offsetY / canvas.height;
      const xRange = maxX - minX;
      const yRange = maxY - minY;
      const wheel = e.deltaY < 0 ? 1 - zoomIntensity : 1 + zoomIntensity;
      const newXRange = xRange * wheel;
      const newYRange = yRange * wheel;
      const newMinX = minX + (xRange - newXRange) * mouseX;
      const newMaxX = newMinX + newXRange;
      const newMinY = minY + (yRange - newYRange) * mouseY;
      const newMaxY = newMinY + newYRange;
      setViewWindow({ minX: newMinX, maxX: newMaxX, minY: newMinY, maxY: newMaxY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const handleMouseUp = () => {
      isDragging = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const { minX, maxX, minY, maxY } = viewWindow;
      const xRange = maxX - minX;
      const yRange = maxY - minY;
      const moveX = -dx / canvas.width * xRange;
      const moveY = dy / canvas.height * yRange;
      setViewWindow({ minX: minX + moveX, maxX: maxX + moveX, minY: minY + moveY, maxY: maxY + moveY });
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [viewWindow]);

  const [graphOptions, setGraphOptions] = useState({
    showGrid: true,
    showAxis: true,
    labelAxis: true,
    showGraph: true,
  })

  const [error, setError] = useState("")
  const [evaluationPoints, setEvaluationPoints] = useState<any[]>([])

  const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"]

  const addPiece = () => {
    const newId = (pieces.length + 1).toString()
    const newColor = colors[pieces.length % colors.length]
    setPieces(prev => {
      const updated = [
        ...prev,
        {
          id: newId,
          expression: "x",
          domain: "x > 0",
          color: newColor,
        },
      ];
      setTimeout(() => plotFunction(), 0);
      return updated;
    });
  }

  const removePiece = (id: string) => {
    if (pieces.length > 1) {
      setPieces(prev => {
        const updated = prev.filter((p) => p.id !== id);
        setTimeout(() => plotFunction(), 0);
        return updated;
      });
    }
  }

  const updatePiece = (id: string, field: keyof PiecewisePiece, value: string) => {
    setPieces(prev => {
      const updated = prev.map((p) => (p.id === id ? { ...p, [field]: value } : p));
      setTimeout(() => plotFunction(), 0);
      return updated;
    });
  }

  const plotFunction = () => {
    setError("")

    if (!canvasRef.current || !graphOptions.showGraph) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const { minX, maxX, minY, maxY } = viewWindow
    const width = canvas.width
    const height = canvas.height

    // Transform functions
    const toCanvasX = (x: number) => ((x - minX) / (maxX - minX)) * width
    const toCanvasY = (y: number) => height - ((y - minY) / (maxY - minY)) * height

    // Draw grid and axis labels
    if (graphOptions.showGrid) {
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 1

      const gridStepX = (maxX - minX) / 10
      const gridStepY = (maxY - minY) / 10

      ctx.font = "12px Arial";
      ctx.fillStyle = "#6b7280";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      for (let x = minX; x <= maxX + 1e-8; x += gridStepX) {
        const canvasX = toCanvasX(x)
        ctx.beginPath()
        ctx.moveTo(canvasX, 0)
        ctx.lineTo(canvasX, height)
        ctx.stroke()
        // Draw x-axis label
        if (graphOptions.labelAxis) {
          ctx.fillText(x.toFixed(2), canvasX, height - 18)
        }
      }

      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (let y = minY; y <= maxY + 1e-8; y += gridStepY) {
        const canvasY = toCanvasY(y)
        ctx.beginPath()
        ctx.moveTo(0, canvasY)
        ctx.lineTo(width, canvasY)
        ctx.stroke()
        // Draw y-axis label
        if (graphOptions.labelAxis) {
          ctx.fillText(y.toFixed(2), 36, canvasY)
        }
      }
    }

    // Draw axes
    if (graphOptions.showAxis) {
      ctx.strokeStyle = "#374151"
      ctx.lineWidth = 2

      // X-axis
      if (minY <= 0 && maxY >= 0) {
        const y0 = toCanvasY(0)
        ctx.beginPath()
        ctx.moveTo(0, y0)
        ctx.lineTo(width, y0)
        ctx.stroke()
      }

      // Y-axis
      if (minX <= 0 && maxX >= 0) {
        const x0 = toCanvasX(0)
        ctx.beginPath()
        ctx.moveTo(x0, 0)
        ctx.lineTo(x0, height)
        ctx.stroke()
      }
    }

    // Parse domains and validate
    const parsedPieces = pieces.map((piece) => ({
      ...piece,
      parsedDomain: parseDomain(piece.domain),
    }))

    // Check for invalid domains
    const invalidPieces = parsedPieces.filter((p) => p.parsedDomain.type === "invalid")
    if (invalidPieces.length > 0) {
      setError(`Invalid domain syntax in piece(s): ${invalidPieces.map((p) => p.id).join(", ")}`)
      return
    }

    // Sample and plot each piece
    const samplePoints = Math.max(400, width)
    const dx = (maxX - minX) / (samplePoints - 1)
    const evalPoints: any[] = []

    for (let i = 0; i < samplePoints; i++) {
      const x = minX + i * dx

      // Find which piece applies to this x
      for (const piece of parsedPieces) {
        if (isInDomain(x, piece.parsedDomain)) {
          const y = evaluateExpression(piece.expression, x)

          if (isFinite(y) && y >= minY && y <= maxY) {
            evalPoints.push({ x, y, pieceId: piece.id, color: piece.color })
          }
          break // First piece wins for overlapping domains
        }
      }
    }

    // Group consecutive points by piece and plot
    let currentPiece = null
    let currentPath: any[] = []

    const drawPath = (points: any[], color: string) => {
      if (points.length < 2) return

      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.beginPath()

      for (let i = 0; i < points.length; i++) {
        const canvasX = toCanvasX(points[i].x)
        const canvasY = toCanvasY(points[i].y)

        if (i === 0) {
          ctx.moveTo(canvasX, canvasY)
        } else {
          ctx.lineTo(canvasX, canvasY)
        }
      }

      ctx.stroke()
    }

    for (const point of evalPoints) {
      if (point.pieceId !== currentPiece) {
        // Draw previous path
        if (currentPath.length > 0) {
          drawPath(currentPath, currentPath[0].color)
        }

        // Start new path
        currentPiece = point.pieceId
        currentPath = [point]
      } else {
        currentPath.push(point)
      }
    }

    // Draw final path
    if (currentPath.length > 0) {
      drawPath(currentPath, currentPath[0].color)
    }

    // Draw endpoint markers
    for (const piece of parsedPieces) {
      const domain = piece.parsedDomain

      if (domain.type === "exact" && domain.value !== undefined) {
        const x = domain.value
        const y = evaluateExpression(piece.expression, x)

        if (isFinite(y) && x >= minX && x <= maxX && y >= minY && y <= maxY) {
          const canvasX = toCanvasX(x)
          const canvasY = toCanvasY(y)

          ctx.fillStyle = piece.color
          ctx.beginPath()
          ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI)
          ctx.fill()
        }
      } else if (domain.type === "interval") {
        // Draw endpoint markers for intervals
        if (domain.min !== undefined) {
          const x = domain.min
          const y = evaluateExpression(piece.expression, x)

          if (isFinite(y) && x >= minX && x <= maxX && y >= minY && y <= maxY) {
            const canvasX = toCanvasX(x)
            const canvasY = toCanvasY(y)

            ctx.strokeStyle = piece.color
            ctx.lineWidth = 2

            if (domain.includeMin) {
              ctx.fillStyle = piece.color
              ctx.beginPath()
              ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI)
              ctx.fill()
            } else {
              ctx.beginPath()
              ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI)
              ctx.stroke()
            }
          }
        }

        if (domain.max !== undefined) {
          const x = domain.max
          const y = evaluateExpression(piece.expression, x)

          if (isFinite(y) && x >= minX && x <= maxX && y >= minY && y <= maxY) {
            const canvasX = toCanvasX(x)
            const canvasY = toCanvasY(y)

            ctx.strokeStyle = piece.color
            ctx.lineWidth = 2

            if (domain.includeMax) {
              ctx.fillStyle = piece.color
              ctx.beginPath()
              ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI)
              ctx.fill()
            } else {
              ctx.beginPath()
              ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI)
              ctx.stroke()
            }
          }
        }
      }
    }

    setEvaluationPoints(evalPoints.slice(0, 20)) // Show first 20 points in table
  }

  const clearGraph = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
    setEvaluationPoints([])
    setError("")
  }

  const runExample = () => {
    setPieces([
      { id: "1", expression: "x**2", domain: "-2 ≤ x < 0", color: "#ef4444" },
      { id: "2", expression: "sin(x)", domain: "0 ≤ x ≤ 3", color: "#3b82f6" },
      { id: "3", expression: "1/(x-2)", domain: "3 < x ≤ 5", color: "#10b981" },
    ])
    setViewWindow({ minX: -3, maxX: 6, minY: -2, maxY: 4 })
    setTimeout(() => plotFunction(), 100)
  }

  useEffect(() => {
    if (graphOptions.showGraph) {
      plotFunction()
    }
  }, [pieces, viewWindow, graphOptions])

  return (
    <>
      <SEO
        title="Piecewise Function Calculator & Grapher – Plot Functions by Interval"
        description="Define multiple function expressions with domain intervals, visualize them on an interactive graph, and handle open/closed endpoints, discontinuities, and asymptotes with precision."
        slug="/piecewise-function-calculator-grapher"
        keywords="piecewise function calculator, piecewise function grapher, plot piecewise functions, graph piecewise functions, piecewise function plotter, piecewise function visualization, piecewise function intervals, piecewise function discontinuities, piecewise function asymptotes, interactive piecewise graph"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Piecewise Function Calculator</p>
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
               Other Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Piecewise Function Calculator</span>
            </div>
          </div>
        </nav>

        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Function className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Piecewise Function Calculator & Grapher – Plot Functions by Interval
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Define multiple function expressions with domain intervals, visualize them on an interactive graph, and
                handle open/closed endpoints, discontinuities, and asymptotes with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Input Form */}
              <div>
                <Card className="shadow-2xl p-0 border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <Function className="w-6 h-6 text-blue-600" />
                      <span>Piecewise Function Definition</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Define each piece of your piecewise function with expressions and domains
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {error && (
                      <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-6">
                      {/* Function Pieces */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <Label className="text-lg font-semibold text-gray-900">Function Pieces</Label>
                          <Button onClick={addPiece} size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Piece
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {pieces.map((piece, index) => (
                            <div key={piece.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-medium text-gray-700">Piece {index + 1}</span>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="color"
                                    value={piece.color}
                                    onChange={(e) => updatePiece(piece.id, "color", e.target.value)}
                                    className="w-8 h-8 rounded border border-gray-300"
                                  />
                                  {pieces.length > 1 && (
                                    <Button
                                      onClick={() => removePiece(piece.id)}
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Expression f(x)
                                  </Label>
                                  <Input
                                    value={piece.expression}
                                    onChange={(e) => updatePiece(piece.id, "expression", e.target.value)}
                                    placeholder="x**2 + 1"
                                    className="font-mono"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700 mb-1 block">Domain</Label>
                                  <Input
                                    value={piece.domain}
                                    onChange={(e) => updatePiece(piece.id, "domain", e.target.value)}
                                    placeholder="0 ≤ x < 1"
                                    className="font-mono"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* View Window */}
                      <div>
                        <Label className="text-lg font-semibold text-gray-900 mb-3 block">View Window</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <Label className="text-sm text-gray-700">Min X</Label>
                            <Input
                              type="number"
                              value={viewWindow.minX}
                              onChange={(e) => setViewWindow({ ...viewWindow, minX: Number(e.target.value) })}
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-700">Max X</Label>
                            <Input
                              type="number"
                              value={viewWindow.maxX}
                              onChange={(e) => setViewWindow({ ...viewWindow, maxX: Number(e.target.value) })}
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-700">Min Y</Label>
                            <Input
                              type="number"
                              value={viewWindow.minY}
                              onChange={(e) => setViewWindow({ ...viewWindow, minY: Number(e.target.value) })}
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-700">Max Y</Label>
                            <Input
                              type="number"
                              value={viewWindow.maxY}
                              onChange={(e) => setViewWindow({ ...viewWindow, maxY: Number(e.target.value) })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Graph Options */}
                      <div>
                        <Label className="text-lg font-semibold text-gray-900 mb-3 block">Graph Options</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showGrid"
                              checked={graphOptions.showGrid}
                              onCheckedChange={(checked) => setGraphOptions({ ...graphOptions, showGrid: !!checked })}
                            />
                            <Label htmlFor="showGrid" className="text-sm">
                              Show Grid
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showAxis"
                              checked={graphOptions.showAxis}
                              onCheckedChange={(checked) => setGraphOptions({ ...graphOptions, showAxis: !!checked })}
                            />
                            <Label htmlFor="showAxis" className="text-sm">
                              Show Axis
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="labelAxis"
                              checked={graphOptions.labelAxis}
                              onCheckedChange={(checked) => setGraphOptions({ ...graphOptions, labelAxis: !!checked })}
                            />
                            <Label htmlFor="labelAxis" className="text-sm">
                              Label Axis
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showGraph"
                              checked={graphOptions.showGraph}
                              onCheckedChange={(checked) => setGraphOptions({ ...graphOptions, showGraph: !!checked })}
                            />
                            <Label htmlFor="showGraph" className="text-sm">
                              Show Graph
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={plotFunction}
                          className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          Plot Function
                        </Button>
                        <Button
                          onClick={clearGraph}
                          variant="outline"
                          className="h-12 px-6 border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          Clear
                        </Button>
                        <Button
                          onClick={runExample}
                          variant="outline"
                          className="h-12 px-6 border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                        >
                          Example
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Graph and Results */}
              <div className="space-y-6">
                {/* Graph Canvas */}
                <Card className="shadow-2xl border-0 p-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b px-6 py-4">
                    <CardTitle className="text-xl font-bold text-blue-700">Interactive Graph</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Toolbar */}
                    <div className="flex items-center gap-2 mb-4">
                      <Button size="sm" variant="outline" onClick={() => setViewWindow(v => ({
                        minX: v.minX + (v.maxX-v.minX)*0.1/2,
                        maxX: v.maxX - (v.maxX-v.minX)*0.1/2,
                        minY: v.minY + (v.maxY-v.minY)*0.1/2,
                        maxY: v.maxY - (v.maxY-v.minY)*0.1/2,
                      }))}>Zoom In</Button>
                      <Button size="sm" variant="outline" onClick={() => setViewWindow(v => ({
                        minX: v.minX - (v.maxX-v.minX)*0.1/2,
                        maxX: v.maxX + (v.maxX-v.minX)*0.1/2,
                        minY: v.minY - (v.maxY-v.minY)*0.1/2,
                        maxY: v.maxY + (v.maxY-v.minY)*0.1/2,
                      }))}>Zoom Out</Button>
                      <Button size="sm" variant="outline" onClick={() => setViewWindow({ minX: -3, maxX: 6, minY: -2, maxY: 4 })}>Reset View</Button>
                    </div>
                    <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 rounded-2xl shadow-inner p-2">
                      <canvas
                        ref={canvasRef}
                        width={500}
                        height={400}
                        className="w-full h-auto rounded-xl border-2 border-blue-300 shadow-lg transition-all duration-200"
                        style={{ background: 'white', cursor: 'grab' }}
                        onMouseMove={e => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.nativeEvent.offsetX / 500) * (viewWindow.maxX - viewWindow.minX)) + viewWindow.minX;
                          const y = viewWindow.maxY - ((e.nativeEvent.offsetY / 400) * (viewWindow.maxY - viewWindow.minY));
                          const tooltip = document.getElementById('graph-tooltip');
                          if (tooltip) {
                            tooltip.style.display = 'block';
                            tooltip.style.left = `${e.nativeEvent.offsetX + 20}px`;
                            tooltip.style.top = `${e.nativeEvent.offsetY + 10}px`;
                            tooltip.innerText = `x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`;
                          }
                        }}
                        onMouseLeave={() => {
                          const tooltip = document.getElementById('graph-tooltip');
                          if (tooltip) tooltip.style.display = 'none';
                        }}
                      />
                      <div id="graph-tooltip" style={{ position: 'absolute', pointerEvents: 'none', zIndex: 10, display: 'none', background: 'rgba(30,41,59,0.95)', color: 'white', fontSize: '12px', borderRadius: '6px', padding: '4px 8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
                    </div>
                    {/* Legend */}
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Legend</h4>
                      <div className="space-y-2">
                        {pieces.map((piece, index) => (
                          <div key={piece.id} className="flex items-center space-x-3 text-sm">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: piece.color }} />
                            <span className="font-mono">{piece.expression}</span>
                            <span className="text-gray-500">for {piece.domain}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Evaluation Points Table */}
                {evaluationPoints.length > 0 && (
                  <Card className="shadow-xl border-0 p-0 bg-white">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b px-6 py-4">
                      <CardTitle className="text-lg font-bold text-blue-700">Sample Evaluation Points</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>x</TableHead>
                              <TableHead>f(x)</TableHead>
                              <TableHead>Piece</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {evaluationPoints.map((point, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-mono">{point.x.toFixed(3)}</TableCell>
                                <TableCell className="font-mono">{point.y.toFixed(3)}</TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded" style={{ backgroundColor: point.color }} />
                                    <span>Piece {point.pieceId}</span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* What is a Piecewise Function */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">What is a Piecewise Function?</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    A piecewise function is a function that is defined by different expressions over different intervals
                    of its domain. Each "piece" of the function applies to a specific range of input values, allowing
                    for complex behaviors like discontinuities, different growth rates, and varied mathematical
                    relationships.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Piecewise functions are commonly used to model real-world situations where different rules apply
                    under different conditions, such as tax brackets, shipping costs, or physical phenomena with
                    distinct phases.
                  </p>
                </CardContent>
              </Card>

              {/* How to Use */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">How to Use the Calculator</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li>Define each piece by entering a mathematical expression (use x as the variable)</li>
                    <li>Specify the domain for each piece using inequality notation (&lt;=, &lt;, &gt;, &gt;=)</li>
                    <li>Choose colors for each piece to distinguish them on the graph</li>
                    <li>Set the viewing window by adjusting Min/Max X and Y values</li>
                    <li>Configure graph options (grid, axes, labels)</li>
                    <li>Click "Plot Function" to visualize your piecewise function</li>
                    <li>Use "Example" to load a sample piecewise function</li>
                  </ol>
                </CardContent>
              </Card>

              {/* Formula & Rules */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Piecewise Function Formula & Rules</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                    <div className="text-center text-lg font-mono mb-4">
                      f(x) = &#123;
                      <br />
                      &nbsp;&nbsp;f₁(x), &nbsp;&nbsp;if domain 1<br />
                      &nbsp;&nbsp;f₂(x), &nbsp;&nbsp;if domain 2<br />
                      &nbsp;&nbsp;⋮
                      <br />
                      &nbsp;&nbsp;fₙ(x), &nbsp;&nbsp;if domain n<br />
                      &#125;
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-2">Domain Notation:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          <strong>Closed interval:</strong> a &lt;= x &lt;= b (includes endpoints)
                        </li>
                        <li>
                          <strong>Open interval:</strong> a &lt; x &lt; b (excludes endpoints)
                        </li>
                        <li>
                          <strong>Half-open:</strong> a &lt;= x &lt; b or a &lt; x &lt;= b
                        </li>
                        <li>
                          <strong>Unbounded:</strong> x &gt; a, x &lt;= b, etc.
                        </li>
                        <li>
                          <strong>Point domain:</strong> x = a (single point)
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Endpoint Behavior:</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          <strong>Filled circle:</strong> Point is included (&lt;=, &gt;=, =)
                        </li>
                        <li>
                          <strong>Open circle:</strong> Point is excluded (&lt;, &gt;)
                        </li>
                        <li>
                          <strong>Discontinuities:</strong> Gaps where no piece is defined
                        </li>
                        <li>
                          <strong>Asymptotes:</strong> Vertical lines where function approaches ±∞
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Example</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <strong>Example piecewise function:</strong>
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                      f(x) = &#123;
                      <br />
                      &nbsp;&nbsp;x², &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for -2 &lt;= x &lt; 0 (red)
                      <br />
                      &nbsp;&nbsp;sin(x), &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for 0 &lt;= x &lt;= 3 (blue)
                      <br />
                      &nbsp;&nbsp;1/(x-2), &nbsp;&nbsp;for 3 &lt; x &lt;= 5 (green)
                      <br />
                      &#125;
                    </div>

                    <div>
                      <p className="font-semibold mb-2">Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
                        <li>Parse domain intervals and check for validity</li>
                        <li>Plot each expression in its specified color within its domain</li>
                        <li>Show filled circles at included endpoints, open circles at excluded endpoints</li>
                        <li>Handle discontinuity at x=2 for the third piece (vertical asymptote)</li>
                        <li>Display graph with legend showing expression → domain mapping</li>
                      </ol>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800">
                        <strong>Output:</strong> Interactive graph showing three distinct pieces with proper endpoint
                        markers, plus a table of sample evaluation points demonstrating which piece applies at different
                        x-values.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="px-8 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">FAQ</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">What is a piecewise function?</h3>
                      <p className="text-gray-700">
                        A piecewise function is a function defined by multiple sub-functions, each applying to a
                        specific interval of the domain. It allows for different mathematical behaviors across different
                        ranges of input values.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">How do you graph piecewise functions?</h3>
                      <p className="text-gray-700">
                        Graph each piece separately within its specified domain, paying careful attention to endpoint
                        inclusion/exclusion. Use filled circles for included endpoints and open circles for excluded
                        endpoints. Connect continuous pieces and leave gaps for discontinuities.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        What's the difference between open and closed intervals?
                      </h3>
                      <p className="text-gray-700">
                        Closed intervals (&lt;=, &gt;=) include their endpoints, shown with filled circles. Open
                        intervals (&lt;, &gt;) exclude their endpoints, shown with open circles. Half-open intervals
                        include one endpoint but not the other.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Can piecewise functions be discontinuous?</h3>
                      <p className="text-gray-700">
                        Yes, piecewise functions can have discontinuities where pieces don't connect, have different
                        values at boundaries, or where no piece is defined. They can also have vertical asymptotes where
                        function values approach infinity.
                      </p>
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
