"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, X, Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { calculators } from "@/lib/calculator-data"

const popularCalculators = calculators.filter((calc) => calc.popular)

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCalculators, setFilteredCalculators] = useState(popularCalculators)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCalculators(popularCalculators)
    } else {
      const filtered = calculators.filter(
        (calc) =>
          calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          calc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          calc.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredCalculators(filtered)
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const firstMatch = filteredCalculators[0]
      if (firstMatch) {
        window.location.href = firstMatch.href
      }
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "financial":
        return "text-green-600"
      case "health":
        return "text-red-500"
      case "physics":
        return "text-purple-600"
      case "real-estate":
        return "text-orange-600"
      case "construction":
        return "text-amber-600"
      case "maths":
        return "text-blue-600"
      case "food":
        return "text-pink-600"
      case "sports":
        return "text-indigo-600"
      case "other":
        return "text-gray-600"
      default:
        return "text-blue-600"
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      {!isOpen ? (
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-3 hover:bg-gray-100 transition-all duration-300 px-6 py-3 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md bg-white"
          >
            <Search className="w-5 h-5 text-gray-500" />
            <span className="hidden md:inline text-gray-500 font-medium text-base">Search calculators...</span>
            <div className="hidden md:flex items-center space-x-1 ml-4 px-2 py-1 bg-gray-100 rounded-lg">
              <span className="text-xs text-gray-400 font-medium">⌘</span>
              <span className="text-xs text-gray-400 font-medium">K</span>
            </div>
          </Button>
        </div>
      ) : (
        <div className="relative">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 w-64 md:w-96 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-2xl shadow-lg text-base font-medium"
                autoFocus
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsOpen(false)
                setSearchQuery("")
              }}
              className="hover:bg-gray-100 rounded-2xl p-3"
            >
              <X className="w-5 h-5" />
            </Button>
          </form>

          {isOpen && (
            <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-2xl border-0 rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {searchQuery.trim() === "" && (
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                      <p className="text-sm font-bold text-gray-700">Popular Calculators</p>
                    </div>
                  )}

                  {filteredCalculators.length > 0 ? (
                    filteredCalculators.map((calc) => (
                      <Link
                        key={calc.id}
                        href={calc.href}
                        onClick={() => {
                          setIsOpen(false)
                          setSearchQuery("")
                        }}
                      >
                        <div className="flex items-center space-x-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0">
                          <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center`}>
                            <Calculator className={`w-5 h-5 ${getCategoryColor(calc.category)}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-base">{calc.name}</p>
                            <p className="text-sm text-gray-500">{calc.category}</p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{calc.description}</p>
                          </div>
                          <Search className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-6 py-12 text-center">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">No calculators found</p>
                      <p className="text-sm text-gray-400 mt-2">Try searching for different terms</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
