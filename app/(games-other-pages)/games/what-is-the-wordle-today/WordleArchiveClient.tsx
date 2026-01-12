"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Script from "next/script"
import { ArrowLeft, Search, Trophy, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { WordleHistoryItem } from "@/lib/games/wordle-data"

const BATCH_SIZE = 30
const DEBOUNCE_DELAY = 300 // ms

interface WordleArchiveClientProps {
    initialHistory: WordleHistoryItem[]
}

export default function WordleArchiveClient({ initialHistory }: WordleArchiveClientProps) {
    // Use initialHistory directly for initial state to support SSR/SEO
    const [allItems] = useState<WordleHistoryItem[]>(initialHistory)
    const [displayedItems, setDisplayedItems] = useState<WordleHistoryItem[]>(initialHistory.slice(0, BATCH_SIZE))
    const [filteredItems, setFilteredItems] = useState<WordleHistoryItem[]>(initialHistory)
    const [searchQuery, setSearchQuery] = useState("")
    const [displayLimit, setDisplayLimit] = useState(BATCH_SIZE)
    const loaderRef = useRef<HTMLDivElement>(null)
    const searchTimeout = useRef<NodeJS.Timeout | null>(null)

    // Handle Search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current)
        }

        searchTimeout.current = setTimeout(() => {
            if (!query) {
                setFilteredItems(allItems)
                setDisplayLimit(BATCH_SIZE)
                return
            }

            const lowercaseQuery = query.toLowerCase()
            const filtered = allItems.filter(item =>
                item.number.toString().includes(lowercaseQuery) ||
                item.word.toLowerCase().includes(lowercaseQuery) ||
                item.date.toLowerCase().includes(lowercaseQuery)
            )

            setFilteredItems(filtered)
            setDisplayLimit(BATCH_SIZE)
        }, DEBOUNCE_DELAY)
    }

    // Update displayed items when filter or limit changes
    useEffect(() => {
        setDisplayedItems(filteredItems.slice(0, displayLimit))
    }, [displayLimit, filteredItems])

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && displayedItems.length < filteredItems.length) {
                    setDisplayLimit(prev => prev + BATCH_SIZE)
                }
            },
            { threshold: 0.1, rootMargin: '200px' }
        )

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => observer.disconnect()
    }, [displayedItems.length, filteredItems.length])

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Wordle History Archive",
        description: "Browse the complete archive of past Wordle puzzles and solutions.",
        url: "https://www.thesmartcalculator.com/games/what-is-the-wordle-today",
        hasPart: initialHistory.slice(0, 10).map(item => ({
            "@type": "Game",
            "name": `Wordle #${item.number}`,
            "datePublished": item.date,
            "description": `Wordle solution for ${item.date} was ${item.word.toUpperCase()}`
        }))
    }

    return (
        <>
            <Script id="wordle-archive-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="min-h-screen selection:bg-emerald-500/30" style={{ backgroundColor: '#09090b', color: '#ffffff' }}>
                {/* Background Ambience */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                        <Link href="/games">
                            <Button variant="ghost" size="sm" className="hover:text-white -ml-2" style={{ color: '#a1a1aa' }}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Games
                            </Button>
                        </Link>
                        <Link href="/games/wordle">
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_25px_rgba(5,150,105,0.5)] transition-all">
                                <Trophy className="mr-2 h-4 w-4" />
                                Play Today's Wordle
                            </Button>
                        </Link>
                    </div>

                    <div className="text-center mb-16 relative">
                        <div className="inline-flex justify-center mb-6">
                            <div
                                className="p-4 rounded-2xl border shadow-xl backdrop-blur-sm"
                                style={{ backgroundColor: 'rgba(24, 24, 27, 0.5)', borderColor: '#27272a' }}
                            >
                                <History className="w-10 h-10 text-emerald-500" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight" style={{ color: '#ffffff' }}>
                            Wordle Archive
                        </h1>
                        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#a1a1aa' }}>
                            Explore the complete history of Wordle solutions. Search by date, puzzle number, or find that one word that got away.
                        </p>
                    </div>

                    {/* Search Section */}
                    <Card
                        className="mb-12 border-0 shadow-2xl overflow-hidden"
                        style={{ backgroundColor: 'rgba(24, 24, 27, 0.5)', borderColor: '#27272a' }}
                    >
                        <CardContent className="p-8">
                            <div className="relative max-w-2xl mx-auto">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#71717a' }} />
                                <Input
                                    type="text"
                                    placeholder="Search puzzle #, date, or answer..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="pl-12 h-14 text-lg focus-visible:ring-emerald-500/50 rounded-xl transition-all"
                                    style={{
                                        backgroundColor: 'rgba(9, 9, 11, 0.5)',
                                        borderColor: '#3f3f46',
                                        color: '#ffffff'
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4 max-w-2xl mx-auto px-1">
                                <p className="text-sm font-medium" style={{ color: '#71717a' }}>
                                    Showing <span className="text-emerald-500">{displayedItems.length}</span> of {filteredItems.length} puzzles
                                </p>
                                {searchQuery && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSearchQuery('')
                                            setFilteredItems(allItems)
                                            setDisplayLimit(BATCH_SIZE)
                                        }}
                                        className="hover:text-white"
                                        style={{ color: '#a1a1aa' }}
                                    >
                                        Clear Search
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {displayedItems.map((item) => (
                            <div
                                key={item.number}
                                className="group relative rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    backgroundColor: 'rgba(24, 24, 27, 0.4)',
                                    border: '1px solid rgba(39, 39, 42, 0.5)'
                                }}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: '#71717a' }}>
                                            #{item.number}
                                        </div>
                                        <div className="text-sm font-medium" style={{ color: '#d4d4d8' }}>
                                            {item.date}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-emerald-500 tracking-wider">
                                            {item.word.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {displayedItems.length < filteredItems.length && (
                        <div ref={loaderRef} className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-emerald-500/30 border-t-emerald-500"></div>
                        </div>
                    )}

                    {filteredItems.length === 0 && (
                        <div
                            className="text-center py-24 rounded-2xl border border-dashed"
                            style={{ backgroundColor: 'rgba(24, 24, 27, 0.3)', borderColor: '#27272a' }}
                        >
                            <p className="text-lg" style={{ color: '#71717a' }}>No puzzles found matching your search.</p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSearchQuery('')
                                    setFilteredItems(allItems)
                                    setDisplayLimit(BATCH_SIZE)
                                }}
                                className="text-emerald-500 hover:text-emerald-400 mt-2"
                            >
                                Clear search filters
                            </Button>
                        </div>
                    )}


                    {displayedItems.length >= filteredItems.length && filteredItems.length > 0 && (
                        <div className="text-center py-12 font-medium" style={{ color: '#a1a1aa' }}>
                            You've reached the beginning of time! 🦕
                        </div>
                    )}

                    <div className="mt-20 border-t pt-12" style={{ borderColor: '#27272a' }}>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-8 text-center">About the Archive</h2>
                            <div className="grid md:grid-cols-3 gap-8 text-sm" style={{ color: '#a1a1aa' }}>
                                <div className="space-y-3">
                                    <h3 className="text-emerald-500 font-semibold uppercase tracking-wider text-xs">Explore</h3>
                                    <p>Browse the complete catalog of daily puzzles since launch. A perfect resource for pattern hunters and statistics enthusiasts.</p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-emerald-500 font-semibold uppercase tracking-wider text-xs">Search</h3>
                                    <p>Remember a tricky word but forgot the date? Use our fast search to find any puzzle by number, date, or solution.</p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-emerald-500 font-semibold uppercase tracking-wider text-xs">Practice</h3>
                                    <p>Use past answers to practice your opening words and strategies for tomorrow's challenge.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
