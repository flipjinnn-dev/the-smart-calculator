"use client"

import { useState } from "react"
import type { Metadata } from "next"
import Head from "next/head"
import Link from "next/link"
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
  ChevronRight,
  CircleCheck,
  ArrowRight,
  Gamepad,
  Code,
  Briefcase
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import SearchBar from "@/components/search-bar"
import { getCalculatorCount, getCalculatorByName, calculators } from "@/lib/calculator-data"
import { getLocalizedCategoryUrl, getLocalizedCalculatorUrl } from "@/lib/url-utils"
import HomepageScientificCalculator from "@/components/homepage-scientific-calculator"
import AuthorsSection from "@/components/authors-section"
import type { Author } from "@/lib/sanity/client"

// Define category icons mapping
const categoryIcons: Record<string, React.ComponentType<any>> = {
  financial: TrendingUp,
  health: Heart,
  maths: Calculator,
  physics: Atom,
  construction: Home,
  food: Beef,
  sports: Bike,
  games: Gamepad,
  'more-calculators': Sparkles,
  'other-calculators': MoreHorizontal,
  software: Code,
  business: Briefcase,
}

// Define feature icons mapping
const featureIcons: Record<string, React.ComponentType<any>> = {
  0: Rocket,
  1: Shield,
  2: Sparkles,
}

interface HomeClientProps {
  content: any;
  language: string;
  authors: Author[];
}

export default function HomePage({ content, language, authors }: HomeClientProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

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
      },
      'other-calculators': {
        name: "",
        description: ""
      },
      software: {
        name: "",
        description: ""
      },
      business: {
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
    },
    introduction: {
      heading: "",
      title: "",
      description: ""
    },
    browse: {
      title: "",
      description: "",
      note: "",
      topCategoriesLabel: "",
      allCalculatorsLabel: "",
      viewAll: "",
      trustBadge: {
        title: "",
        description: ""
      }
    },
    whyBest: {
      title: "",
      items: []
    },
    howToUse: {
      title: "",
      steps: [],
      note: ""
    },
    trustedBy: {
      title: "",
      description: "",
      useCases: [],
      note: "",
      stats: {
        freeCalculators: "",
        freeAndSecure: "",
        availableOnline: "",
        categories: ""
      }
    },
    faqs: {
      title: "",
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
      id: "games",
      name: "Games",
      description: "Play fun and interactive games to train your brain",
      icon: categoryIcons.games,
      color: "from-indigo-400 to-violet-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      calculators: 2,
      itemLabel: "game",
      href: "/games",
    },
    {
      id: "other-calculators",
      name: contentData.categories['other-calculators']?.name || "Other Calculators",
      description: contentData.categories['other-calculators']?.description || "Miscellaneous calculators for various needs",
      icon: categoryIcons['other-calculators'],
      color: "from-gray-400 to-slate-600",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
      calculators: getCalculatorCount("other"),
      href: getLocalizedCategoryUrl("other", language),
    },
    {
      id: "software",
      name: contentData.categories.software?.name || "Software & IT",
      description: contentData.categories.software?.description || "Software development and IT calculators",
      icon: categoryIcons.software,
      color: "from-teal-400 to-cyan-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      calculators: getCalculatorCount("software"),
      href: getLocalizedCategoryUrl("software", language),
    },
    {
      id: "business",
      name: contentData.categories.business?.name || "Business",
      description: contentData.categories.business?.description || "Business and startup calculators",
      icon: categoryIcons.business,
      color: "from-amber-400 to-orange-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      calculators: getCalculatorCount("business"),
      href: getLocalizedCategoryUrl("business", language),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Online Calculators - Best Online Calculator Tools",
    url: "https://www.thesmartcalculator.com/",
    description: "Access free online calculators for finance, health, math, conversions, and daily tools. Fast, accurate, mobile-friendly, and expert-verified calculators.",
    inLanguage: language,
    isPartOf: {
      "@type": "WebSite",
      name: "thesmartcalculator",
      url: "https://www.thesmartcalculator.com/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.thesmartcalculator.com/search?q={search_term}",
        "query-input": "required name=search_term"
      }
    },
    publisher: {
      "@type": "Organization",
      name: "thesmartcalculator",
      url: "https://www.thesmartcalculator.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.thesmartcalculator.com/logo.png"
      },
      sameAs: [
        "https://www.pinterest.com/thesmartcalculators/",
        "https://x.com/SmartCalculat0r",
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.youtube.com/@TheSmartCalculators"
      ]
    },
    mainEntity: {
      "@type": "FAQPage",
      name: "Online Calculator FAQs",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an online calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An online calculator is a web-based tool that helps you perform quick calculations like finance, health, math, and conversions without installing any app."
          }
        },
        {
          "@type": "Question",
          name: "Are these online calculators free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all calculators on our website are 100% free with no sign-ups, subscriptions, or hidden charges."
          }
        },
        {
          "@type": "Question",
          name: "How accurate are the calculator results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our calculators use expert-verified formulas and accurate algorithms. Results depend on user inputs but are generally reliable."
          }
        },
        {
          "@type": "Question",
          name: "Do you store any personal data or calculations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, we do not store or track any user data. All calculations remain private and secure on your device."
          }
        },
        {
          "@type": "Question",
          name: "What makes your website the best online calculator platform?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer fast, accurate, mobile-friendly, and expert-verified calculators across finance, health, math, and daily tools — completely free."
          }
        },
        {
          "@type": "Question",
          name: "Can I use these calculators for school or professional work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Students, teachers, and professionals use our calculators for assignments, financial planning, math practice, and daily tasks."
          }
        },
        {
          "@type": "Question",
          name: "Do your calculators work on mobile devices?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all calculators are fully mobile-responsive and work smoothly on phones, tablets, and desktops."
          }
        },
        {
          "@type": "Question",
          name: "How often are your calculators updated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We update our tools regularly to ensure accuracy, fast performance, improved formulas, and better user experience."
          }
        },
        {
          "@type": "Question",
          name: "Can I request a new calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can contact us anytime to suggest a new calculator or request improvements to existing tools."
          }
        },
        {
          "@type": "Question",
          name: "Are these calculators suitable for medical or financial decisions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our calculators provide accurate estimates, but they should not replace professional financial, legal, or medical advice."
          }
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="x-language" content={language} />
      </Head>

      <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-slate-50/30">
          {/* Background Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/40 blur-3xl mix-blend-multiply opacity-50" />
            <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-purple-100/40 blur-3xl mix-blend-multiply opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/60 rounded-full blur-3xl mix-blend-overlay" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-flex-start">
              {/* Left Column: Content */}
              <div className="text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Sparkles className="w-3 h-3" />
                  {contentData.header?.subtitle || "100% Free Online Calculators"}
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100"
                  dangerouslySetInnerHTML={{ __html: contentData.hero.title || "Your life in <span class=\"bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent\">100+ free</span> calculators" }}
                />
                <div className="animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
                  <div className="bg-white p-2 rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-50 ring-1 ring-black/5 max-w-lg mx-auto lg:mx-0 relative z-[100]">
                    <SearchBar language={language} onFocusChange={setIsSearchFocused} />
                  </div>
                  <p className="mt-4 text-sm text-gray-400 font-medium pl-2 flex items-center justify-center lg:justify-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {contentData.search.placeholder || "Try searching for 'BMI', 'Mortgage', or 'Percentage'"}
                  </p>
                </div>
              </div>

              {/* Right Column: Scientific Calculator */}
              <div className={`home-calc relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 lg:translate-x-8 transition-all duration-300 ${isSearchFocused ? 'lg:z-0 -z-10' : 'z-0'}`}>
                {/* Decorative elements behind calculator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10" />
                <div className={`transition-opacity duration-300 ${isSearchFocused ? 'lg:opacity-100 opacity-0 pointer-events-none lg:pointer-events-auto' : 'opacity-100'}`}>
                  <HomepageScientificCalculator language={language} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {contentData.categories.title || "Browse by Category"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {contentData.categories.description || "Find the perfect tool for your specific needs from our organized collections"}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category, idx) => {
                const IconComponent = category.icon;
                return (
                  <Link key={category.id} href={category.href} className="group">
                    <div className="h-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:-translate-y-1 relative overflow-hidden">
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.color} opacity-5 rounded-bl-full transition-opacity group-hover:opacity-10`} />

                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {category.description}
                      </p>

                      <div className="flex items-center text-xs font-semibold text-gray-400 group-hover:text-blue-500 transition-colors">
                        <span>{category.calculators} {(category as any).itemLabel || "calculators"}</span>
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular Calculators */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                  {contentData.popular.title || "Most Popular Tools"}
                </h2>
                <p className="text-lg text-gray-600">
                  {contentData.popular.description || "The calculators our users rely on every day"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {calculatorsToUse.map((calc: any, index: number) => {
                const englishHref = calc.href || "#";
                const localizedHref = getLocalizedCalculatorUrl(englishHref, language);

                return (
                  <Link key={index} href={localizedHref !== "#" ? localizedHref : "#"}>
                    <div className="group h-full bg-white rounded-2xl border border-gray-100 p-6 md:p-8 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${index % 3 === 0 ? 'from-blue-500 to-blue-600' :
                        index % 3 === 1 ? 'from-purple-500 to-purple-600' :
                          'from-green-500 to-green-600'
                        }`} />

                      <div className="flex items-start justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${index % 3 === 0 ? 'bg-blue-50 text-blue-600' :
                          index % 3 === 1 ? 'bg-purple-50 text-purple-600' :
                            'bg-green-50 text-green-600'
                          }`}>
                          {calc.category}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {calc.name}
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {calc.description}
                      </p>

                      <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-auto">
                        Calculate Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Authors Section */}
        <AuthorsSection authors={authors} />

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

        {/* Introduction Section - Clean & Welcoming */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-60" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              {contentData.introduction?.heading || "ONLINE CALCULATORS"}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              {contentData.introduction?.title || "Welcome to The Best Free Online Calculator Platform"}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {contentData.introduction?.description || "Access fast, accurate, and easy-to-use calculators for your daily needs."}
            </p>
          </div>
        </section>

        {/* Browse & Why Best Section - Split Layout */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

            {/* Left Column: Browse All (4 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-blue-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                <h3 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">
                  {contentData.browse?.title || "All Free Calculators"}
                </h3>
                <p className="text-gray-600 mb-6 relative z-10">
                  {contentData.browse?.description || "Find exactly what you need from our complete collection."}
                </p>

                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                      {contentData.browse?.topCategoriesLabel || "Top Categories"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(0, 6).map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 ${category.bgColor} ${category.textColor} hover:shadow-md`}
                        >
                          <category.icon className="w-3.5 h-3.5" />
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                      {contentData.browse?.allCalculatorsLabel || "Popular Tools"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {calculatorsToUse.slice(0, 8).map((calc: any, idx: number) => {
                        const englishHref = calc.href || "#";
                        const localizedHref = getLocalizedCalculatorUrl(englishHref, language);
                        return (
                          <Link
                            key={idx}
                            href={localizedHref !== "#" ? localizedHref : "#"}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-100"
                          >
                            {calc.name}
                          </Link>
                        );
                      })}
                      <Link href="#hero-search" className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors">
                        {contentData.browse?.viewAll || "View All →"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-lg">{contentData.browse?.trustBadge?.title || "Trusted & Secure"}</h4>
                  </div>
                  <p className="text-blue-100 text-sm opacity-90">
                    {contentData.browse?.trustBadge?.description || "Our calculators are verified for accuracy and respect your privacy. No data is ever stored."}
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              </div>
            </div>

            {/* Right Column: Why Best (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {contentData.whyBest?.title || "Why We Offer the Best Online Calculators"}
                </h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full" />
              </div>

              <div className="grid gap-4">
                {(contentData.whyBest?.items || []).map((item: any, index: number) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-100 flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {index === 0 ? <Atom className="w-5 h-5" /> :
                        index === 1 ? <TrendingUp className="w-5 h-5" /> :
                          index === 2 ? <Sparkles className="w-5 h-5" /> :
                            <Shield className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section - Timeline Style */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {contentData.howToUse?.title || "How to Use Our Online Calculators"}
              </h2>
              {contentData.howToUse?.note && (
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {contentData.howToUse.note}
                </p>
              )}
            </div>

            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {(contentData.howToUse?.steps || []).map((step: string, index: number) => (
                  <div key={index} className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shadow-sm mb-6 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 relative">
                      {index + 1}
                      {/* Mobile connecting line */}
                      {index < (contentData.howToUse?.steps || []).length - 1 && (
                        <div className="md:hidden absolute bottom-0 left-1/2 w-0.5 h-8 bg-gray-100 translate-y-full -translate-x-1/2" />
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 w-full h-full flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all duration-300 border border-transparent group-hover:border-gray-100">
                      <p className="text-sm font-medium text-gray-800">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section - Stats Style */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
          {/* Background Accents */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  {contentData.trustedBy?.title || "Trusted by Users Worldwide"}
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  {contentData.trustedBy?.description || "People across the world use our calculators for school, work, and daily life."}
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  {(contentData.trustedBy?.useCases || []).map((useCase: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">100+</div>
                  <div className="text-sm text-gray-300">{contentData.trustedBy?.stats?.freeCalculators || "Free Calculators"}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">100%</div>
                  <div className="text-sm text-gray-300">{contentData.trustedBy?.stats?.freeAndSecure || "Free & Secure"}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">24/7</div>
                  <div className="text-sm text-gray-300">{contentData.trustedBy?.stats?.availableOnline || "Available Online"}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">8+</div>
                  <div className="text-sm text-gray-300">{contentData.trustedBy?.stats?.categories || "Categories"}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Modern Accordion */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {contentData.faqs?.title || "Frequently Asked Questions"}
              </h2>
              <p className="text-gray-600">
                {contentData.faqs?.description || "Everything you need to know about our calculators"}
              </p>
            </div>

            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {(contentData.faqs?.items || []).map((item: any, index: number) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm data-[state=open]:ring-2 data-[state=open]:ring-blue-100 data-[state=open]:border-blue-200 transition-all"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-gray-900 py-6 hover:text-blue-600 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
