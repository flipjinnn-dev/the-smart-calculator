"use client"

import type { Metadata } from "next"
import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Calculator,
  TrendingUp,
  Home,
  Bike,
  Heart,
  Sparkles,
  Shield,
  Rocket,
  Atom,
  MoreHorizontal,
  Beef,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import SearchBar from "@/components/search-bar"
import { getCalculatorCount, getCalculatorByName, calculators } from "@/lib/calculator-data"
import { getLocalizedCategoryUrl, getLocalizedCalculatorUrl } from "@/lib/url-utils"
import { useHomepageContent } from "@/hooks/useHomepageContent"

// Define category icons mapping
const categoryIcons: Record<string, React.ComponentType<any>> = {
  financial: TrendingUp,
  health: Heart,
  maths: Calculator,
  physics: Atom,
  construction: Home,
  food: Beef,
  sports: Bike,
  other: MoreHorizontal,
}

// Define feature icons mapping
const featureIcons: Record<string, React.ComponentType<any>> = {
  0: Rocket,
  1: Shield,
  2: Sparkles,
}

export default function HomePage() {
  // Detect language from URL path or headers
  const [language, setLanguage] = useState("en");
  
  useEffect(() => {
    // First try to get language from headers (set by middleware)
    const headerLanguage = document.head.querySelector('meta[name="x-language"]')?.getAttribute('content');
    console.log('Header language:', headerLanguage);
    
    if (headerLanguage) {
      setLanguage(headerLanguage);
      return;
    }
    
    // Fallback to URL path detection
    const path = window.location.pathname;
    console.log('Current path:', path);
    const langMatch = path.match(/^\/(br|pl|de)/);
    const detectedLanguage = langMatch ? langMatch[1] : "en";
    console.log('Detected language:', detectedLanguage);
    setLanguage(detectedLanguage);
  }, []);

  const { content, loading, error } = useHomepageContent(language);

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Show error if content failed to load
  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error loading content: {error}</div>;
  }

  // Use content or fallback to defaults
  const contentData = content || {
    meta: {
      title: "",
      description: "",
      keywords: ""
    },
    header: {
      title: "",
      subtitle: ""
    },
    hero: {
      title: "",
      description: ""
    },
    search: {
      title: "",
      placeholder: ""
    },
    categories: {
      title: "",
      description: "",
      financial: {
        name: "",
        description: ""
      },
      health: {
        name: "",
        description: ""
      },
      maths: {
        name: "",
        description: ""
      },
      physics: {
        name: "",
        description: ""
      },
      construction: {
        name: "",
        description: ""
      },
      food: {
        name: "",
        description: ""
      },
      sports: {
        name: "",
        description: ""
      },
      other: {
        name: "",
        description: ""
      }
    },
    popular: {
      title: "",
      description: "",
      calculators: []
    },
    features: {
      title: "",
      description: "",
      items: []
    }
  };

  // Define the fallback calculators with href
  const fallbackCalculators = [
    {
      name: "Mortgage Calculator",
      category: "Financial",
      description: "Calculate monthly payments and total interest for your home loan",
      href: "/financial/mortgage-calculator"
    },
    {
      name: "BMI Calculator",
      category: "Health",
      description: "Calculate your Body Mass Index and understand your weight status",
      href: "/health/bmi-calculator"
    },
    {
      name: "Loan Calculator",
      category: "Financial",
      description: "Calculate loan payments and schedules for any type of loan",
      href: "/financial/loan-calculator"
    },
    {
      name: "Percentage Calculator",
      category: "Maths",
      description: "Calculate percentages, ratios, and percentage changes easily",
      href: "/maths/percentage-calculator"
    },
    {
      name: "Compound Interest Calculator",
      category: "Financial",
      description: "Calculate investment growth over time with compound interest",
      href: "/financial/compound-interest-calculator"
    },
    {
      name: "Calorie Calculator",
      category: "Health",
      description: "Calculate daily calorie needs based on your lifestyle and goals",
      href: "/health/calorie-calculator"
    }
  ];
  
  // Use content data if available, otherwise use fallback
  // For translated content, we match by index position since the order is consistent
  const calculatorsToUse = contentData.popular.calculators.length > 0 
    ? contentData.popular.calculators.map((calc: any, index: number) => {
        // Get the href from the fallback calculators by index position
        const fallbackCalc = fallbackCalculators[index];
        return {
          ...calc,
          href: fallbackCalc ? fallbackCalc.href : "#"
        };
      })
    : fallbackCalculators;

  // Update metadata based on content
  const metadata: Metadata = {
    title: contentData.meta.title || "Smart Calculator - Free Online Calculators for Every Need",
    description: contentData.meta.description || "Access hundreds of free online calculators for finance, health, math, physics, and more. Fast, accurate, and easy-to-use calculation tools.",
    keywords: contentData.meta.keywords || "calculator, online calculator, financial calculator, health calculator, math calculator, free tools",
    openGraph: {
      title: contentData.meta.title || "Smart Calculator - Free Online Calculators for Every Need",
      description: contentData.meta.description || "Access hundreds of free online calculators for finance, health, math, physics, and more. Fast, accurate, and easy-to-use calculation tools.",
      type: "website",
      url: "https://www.thesmartcalculator.com/",
    },
    alternates: {
      canonical: "https://www.thesmartcalculator.com/",
    },
  };

  const categories = [
    {
      id: "financial",
      name: contentData.categories.financial.name || "Financial",
      description: contentData.categories.financial.description || "Loan, mortgage, investment, and tax calculators",
      icon: categoryIcons.financial,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      calculators: getCalculatorCount("financial"),
      href: getLocalizedCategoryUrl("financial", language),
    },
    {
      id: "health",
      name: contentData.categories.health.name || "Health & Fitness",
      description: contentData.categories.health.description || "BMI, calorie, nutrition, and medical calculators",
      icon: categoryIcons.health,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      calculators: getCalculatorCount("health"),
      href: getLocalizedCategoryUrl("health", language),
    },
    {
      id: "maths",
      name: contentData.categories.maths.name || "Maths",
      description: contentData.categories.maths.description || "Algebra, geometry, statistics, and advanced maths",
      icon: categoryIcons.maths,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      calculators: getCalculatorCount("maths"),
      href: getLocalizedCategoryUrl("maths", language),
    },
    {
      id: "physics",
      name: contentData.categories.physics.name || "Physics",
      description: contentData.categories.physics.description || "Force, energy, motion, and physics calculations",
      icon: categoryIcons.physics,
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      calculators: getCalculatorCount("physics"),
      href: getLocalizedCategoryUrl("physics", language),
    },
    {
      id: "construction",
      name: contentData.categories.construction.name || "Construction",
      description: contentData.categories.construction.description || "Property, rent, and construction calculations",
      icon: categoryIcons.construction,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      calculators: getCalculatorCount("construction"),
      href: getLocalizedCategoryUrl("construction", language),
    },
    {
      id: "food",
      name: contentData.categories.food.name || "Food",
      description: contentData.categories.food.description || "Nutrition, calorie, and meal planning calculators",
      icon: categoryIcons.food,
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      calculators: getCalculatorCount("food"),
      href: getLocalizedCategoryUrl("food", language),
    },
    {
      id: "sports",
      name: contentData.categories.sports.name || "Sports",
      description: contentData.categories.sports.description || "Fitness, exercise, and sports-related calculators",
      icon: categoryIcons.sports,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      calculators: getCalculatorCount("sports"),
      href: getLocalizedCategoryUrl("sports", language),
    },
    {
      id: "other",
      name: contentData.categories.other.name || "Other",
      description: contentData.categories.other.description || "Miscellaneous calculators that don't fit into other categories",
      icon: categoryIcons.other,
      color: "from-gray-400 to-gray-600",
      bgColor: "bg-gray-50",
      textColor: "text-pink-600",
      calculators: getCalculatorCount("other"),
      href: getLocalizedCategoryUrl("other", language),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: contentData.meta.title || "Smart Calculator",
    description: contentData.meta.description || "Free online calculators for finance, health, math, physics, and more",
    url: "https://www.thesmartcalculator.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.thesmartcalculator.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Smart Calculator",
      logo: {
        "@type": "ImageObject",
        url: "https://www.thesmartcalculator.com/logo.png",
      },
    },
  };

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="x-language" content={language} />
      </Head>

      <div className="min-h-screen bg-white">
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50/80 via-blue-50/80 to-red-50/80 overflow-hidden">
          <div className="absolute hidden md:block inset-0 overflow-hidden h-[300px] md:h-[60vh] opacity-[0.5]">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-full blur-xl"></div>
            <div className="absolute top-32 left-32 w-24 h-24 bg-gradient-to-br from-blue-400/40 to-blue-600/40 rounded-full blur-lg"></div>
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-gradient-to-br from-red-400/25 mb-[82px] to-red-600/25 rounded-full blur-2xl"></div>
            <div className="absolute bottom-32 right-40 w-32 h-32 bg-gradient-to-br from-green-400/30 to-blue-500/30 rounded-full blur-xl"></div>

            <div className="absolute top-20 right-20 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded transform rotate-45 opacity-60"></div>
            <div className="absolute bottom-40 left-40 w-4 h-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 left-20 w-8 h-8 border-2 border-green-400/40 rounded transform rotate-12"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center md:grid md:grid-cols-2 md:gap-20 md:items-center md:min-h-[500px] md:text-left space-y-10 md:space-y-0">
              {/* Left side - Hero text */}
              <div className="space-y-6 md:space-y-8">
                <h1 
                  className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
                  dangerouslySetInnerHTML={{ __html: contentData.hero.title || "Your life in <span class=\"bg-gradient-to-r from-green-600 via-blue-600 to-red-600 bg-clip-text text-transparent\">90+ free</span> calculators" }}
                >
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-md md:max-w-lg mx-auto md:mx-0">
                  <span className="hidden md:inline">
                    {contentData.hero.description || "From financial planning to health tracking, discover powerful calculation tools that make complex math simple and accessible."}
                  </span>
                </p>
              </div>

              {/* Right side - Search bar */}
              <div className="flex justify-center md:justify-end items-center">
                <div className="w-full max-w-md md:max-w-lg px-4 md:px-0">
                  <div className="bg-white/90 md:bg-white/95 backdrop-blur-sm md:backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg md:shadow-2xl border border-white/20 md:border-white/30 hover:shadow-3xl transition-all duration-300">
                    <div className="hidden md:block mb-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">{contentData.search.title || "Find your calculator"}</h2>
                      <p className="text-sm text-gray-600">{contentData.search.placeholder || "Search from hundreds of free tools"}</p>
                    </div>
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white mt-16 -mb-16 rounded-t-3xl shadow-xl">
            <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{contentData.categories.title || "Calculator Categories"}</h2>
                  <p className="text-lg hidden md:block text-gray-600">
                    {contentData.categories.description || "Explore our comprehensive collection of specialized calculators"}
                  </p>
                </div>

                <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-1 md:sm:grid-cols-2 md:lg:grid-cols-3 md:xl:grid-cols-4 md:gap-8">
                  {categories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <Link key={category.id} href={category.href} className="block md:h-full">
                        {/* Mobile List Layout */}
                        <div className="flex md:hidden items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                                {category.name}
                              </h3>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">{category.calculators} calculators</span>
                          </div>
                        </div>

                        {/* Desktop Card Layout */}
                        <Card className="hidden md:block h-full hover:shadow-xl transition-all duration-200 cursor-pointer group border border-gray-200 rounded-2xl p-8 hover:-translate-y-1 bg-white">
                          <div className="text-center space-y-6">
                            <div className="relative">
                              <div
                                className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}
                              >
                                <IconComponent className="w-8 h-8 text-white" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                                {category.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                              <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
                                <span className="text-sm font-semibold text-gray-700">
                                  {category.calculators} calculators
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Popular Calculators */}
        <section className="py-12 md:py-20 px-2 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">{contentData.popular.title || "Most Popular Calculators"}</h2>
              <p className="text-base md:text-xl text-gray-600">{contentData.popular.description || "Our most frequently used calculation tools"}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 animate-stagger">
              {console.log('Content data calculators:', contentData.popular.calculators)}
              {console.log('Content data length:', contentData.popular.calculators.length)}
              {console.log('Using fallback?', contentData.popular.calculators.length === 0)}
              {console.log('Calculators to use:', calculatorsToUse)}
              {calculatorsToUse.map((calc: any, index: number) => {
                // Get the English href directly from the data or use fallback
                const englishHref = calc.href || "#";
                const localizedHref = getLocalizedCalculatorUrl(englishHref, language);
                
                // Debug logging
                console.log(`Calculator: ${calc.name}`, {
                  englishHref,
                  language,
                  localizedHref,
                  calcData: calc
                });
                
                return (
                <Link key={index} href={localizedHref !== "#" ? localizedHref : "#"}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg overflow-hidden h-full flex flex-col">
                    <div className={`h-2 ${index % 3 === 0 ? 'bg-gradient-to-r from-green-400 to-green-600' : index % 3 === 1 ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}></div>
                    <CardContent className="p-5 md:p-8 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors">
                          {calc.name}
                        </h3>
                        <p className="text-gray-600 mb-2 md:mb-4 leading-relaxed text-sm md:text-base">
                          {calc.description}
                        </p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {calc.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-100 mt-4 md:mt-6">
                        <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                          Calculate Now
                        </span>
                        <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )})}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 px-2 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                {contentData.features.title || "Why Choose Smart Calculator?"}
              </h2>
              <p className="text-base md:text-xl text-gray-600">{contentData.features.description || "Fast, accurate, and completely free to use"}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {(contentData.features.items.length > 0 ? contentData.features.items : [
                {
                  title: "Lightning Fast",
                  description: "Get instant results with our optimized calculation engines"
                },
                {
                  title: "100% Accurate",
                  description: "All calculators are verified by experts and mathematically precise"
                },
                {
                  title: "Always Free",
                  description: "Complete access to all calculators with no hidden charges ever"
                }
              ]).map((feature: any, index: number) => {
                const IconComponent = featureIcons[index] || Rocket;
                const colorClasses = index === 0 
                  ? "from-blue-400 to-blue-600 bg-blue-50" 
                  : index === 1 
                    ? "from-green-400 to-green-600 bg-green-50" 
                    : "from-purple-400 to-purple-600 bg-purple-50";
                
                return (
                  <Card
                    key={index}
                    className="text-center p-6 md:p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-gradient-to-r ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}