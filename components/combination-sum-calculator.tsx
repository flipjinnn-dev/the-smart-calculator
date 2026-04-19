"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, Trash2, AlertCircle } from "lucide-react"

export default function CombinationSumCalculator() {
  const [candidates, setCandidates] = useState<string>("2, 3, 6, 7")
  const [target, setTarget] = useState<string>("7")
  const [allowReuse, setAllowReuse] = useState<boolean>(true)
  
  const [result, setResult] = useState<null | {
    combinations: number[][]
    count: number
    processingTime: number
  }>(null)

  const findCombinationSum = () => {
    const startTime = performance.now()
    
    // Parse candidates
    const nums = candidates
      .split(/[\s,]+/)
      .map(n => n.trim())
      .filter(n => n !== '')
      .map(n => parseInt(n))
      .filter(n => !isNaN(n) && n > 0)

    if (nums.length === 0) {
      alert("Please enter valid candidate numbers")
      return
    }

    const targetNum = parseInt(target)
    if (isNaN(targetNum) || targetNum <= 0) {
      alert("Please enter a valid target sum")
      return
    }

    // Sort candidates for optimization
    const sortedNums = [...new Set(nums)].sort((a, b) => a - b)

    const combinations: number[][] = []

    if (allowReuse) {
      // Type 1: Numbers can be reused (Combination Sum I)
      const backtrack = (start: number, current: number[], sum: number) => {
        if (sum === targetNum) {
          combinations.push([...current])
          return
        }
        if (sum > targetNum) return

        for (let i = start; i < sortedNums.length; i++) {
          current.push(sortedNums[i])
          backtrack(i, current, sum + sortedNums[i]) // i not i+1, allows reuse
          current.pop()
        }
      }

      backtrack(0, [], 0)
    } else {
      // Type 2: Each number used once (Combination Sum II)
      const backtrack = (start: number, current: number[], sum: number) => {
        if (sum === targetNum) {
          combinations.push([...current])
          return
        }
        if (sum > targetNum) return

        for (let i = start; i < sortedNums.length; i++) {
          // Skip duplicates
          if (i > start && sortedNums[i] === sortedNums[i - 1]) continue
          
          current.push(sortedNums[i])
          backtrack(i + 1, current, sum + sortedNums[i]) // i+1, no reuse
          current.pop()
        }
      }

      backtrack(0, [], 0)
    }

    const endTime = performance.now()
    const processingTime = endTime - startTime

    // Limit display to 1000 combinations
    if (combinations.length > 1000) {
      alert(`Found ${combinations.length} combinations! Showing first 1000 only.`)
    }

    setResult({
      combinations: combinations.slice(0, 1000),
      count: combinations.length,
      processingTime
    })
  }

  const reset = () => {
    setCandidates("2, 3, 6, 7")
    setTarget("7")
    setAllowReuse(true)
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-600" />
          Combination Sum Calculator
        </h3>

        {/* Candidate Numbers Input */}
        <div className="mb-6">
          <Label htmlFor="candidates" className="text-base font-semibold mb-2 block">
            Candidate Numbers (comma or space separated)
          </Label>
          <Textarea
            id="candidates"
            value={candidates}
            onChange={(e) => setCandidates(e.target.value)}
            placeholder="e.g., 2, 3, 6, 7 or 2 3 6 7"
            className="text-lg py-3 border-2 border-purple-300 focus:border-purple-500 min-h-[100px]"
          />
          <p className="text-sm text-gray-600 mt-2">
            Enter positive integers separated by commas, spaces, or line breaks
          </p>
        </div>

        {/* Target Sum Input */}
        <div className="mb-6">
          <Label htmlFor="target" className="text-base font-semibold mb-2 block">
            Target Sum
          </Label>
          <Input
            id="target"
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="e.g., 7"
            className="text-lg py-5 border-2 border-purple-300 focus:border-purple-500"
          />
        </div>

        {/* Allow Reuse Checkbox */}
        <div className="mb-6 p-4 bg-white rounded-lg border-2 border-gray-200">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="allowReuse"
              checked={allowReuse}
              onChange={(e) => {
                setAllowReuse(e.target.checked)
                setResult(null)
              }}
              className="mt-1 w-5 h-5 text-purple-600"
            />
            <div>
              <Label htmlFor="allowReuse" className="text-base font-semibold cursor-pointer">
                Allow Number Reuse (Type 1)
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                {allowReuse 
                  ? "Each number can be used multiple times. Example: {2, 2, 3} is valid."
                  : "Each number can only be used once. Example: {2, 2, 3} is NOT valid if you only have one '2'."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={findCombinationSum}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Find Combinations
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="px-8 py-6 border-2 border-gray-300 hover:bg-gray-100"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            {/* Summary */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg border-2 border-green-400 shadow-md">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Results Summary</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Combinations Found:</p>
                  <p className="text-3xl font-bold text-green-700">{result.count}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Processing Time:</p>
                  <p className="text-3xl font-bold text-blue-700">{result.processingTime.toFixed(2)}ms</p>
                </div>
              </div>

              {result.count > 1000 && (
                <div className="mt-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Found {result.count} combinations. Displaying first 1000 only.
                  </p>
                </div>
              )}
            </div>

            {/* Combinations List */}
            {result.combinations.length > 0 ? (
              <div className="bg-white p-6 rounded-lg border-2 border-gray-300 shadow-md">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Valid Combinations ({result.combinations.length} shown)
                </h4>
                
                <div className="max-h-[500px] overflow-y-auto space-y-2">
                  {result.combinations.map((combo, index) => (
                    <div 
                      key={index}
                      className="bg-purple-50 p-3 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-600 bg-white px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                          <span className="font-mono text-lg text-gray-900">
                            {'{' + combo.join(', ') + '}'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Sum: <span className="font-bold text-purple-700">{combo.reduce((a, b) => a + b, 0)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <p className="text-lg font-semibold text-red-800">
                  No combinations found that sum to {target}
                </p>
                <p className="text-sm text-red-600 mt-2">
                  Try adjusting your candidate numbers or target sum
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Example Section */}
      <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
        <h4 className="text-lg font-bold text-gray-900 mb-3">💡 Quick Example</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Candidates:</strong> 2, 3, 6, 7</p>
          <p><strong>Target:</strong> 7</p>
          <p><strong>With Reuse:</strong> {'{2, 2, 3}'}, {'{7}'}</p>
          <p><strong>Without Reuse:</strong> {'{7}'} only</p>
        </div>
      </div>
    </div>
  )
}
