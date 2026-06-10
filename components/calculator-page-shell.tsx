"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import SimilarCalculators from "@/components/similar-calculators";
import type { CalculatorColor } from "@/types/similar-calculators";
import CalculatorGuide, {
  type CalculatorGuideData,
} from "@/components/calculator-guide";
import { RatingProfileSection } from "@/components/rating-profile-section";

export type CalculatorAccent =
  | "emerald"
  | "blue"
  | "teal"
  | "orange"
  | "gray"
  | "purple"
  | "slate";

const ACCENT_ICON: Record<CalculatorAccent, string> = {
  emerald: "from-emerald-500 to-teal-600",
  blue: "from-blue-500 to-indigo-600",
  teal: "from-teal-500 to-cyan-600",
  orange: "from-orange-500 to-amber-600",
  gray: "from-gray-600 to-slate-700",
  purple: "from-purple-500 to-violet-600",
  slate: "from-slate-600 to-gray-700",
};

export interface CalculatorPageShellProps {
  icon: LucideIcon;
  accent?: CalculatorAccent;
  pageTitle: string;
  pageDescription?: string;
  pageDescriptionBefore?: string;
  pageDescriptionBold?: string;
  pageDescriptionAfter?: string;
  children: ReactNode;
  entityId: string;
  creatorSlug?: string;
  guideData: CalculatorGuideData;
  similarCalculators: Array<{
    calculatorName: string;
    calculatorHref: string;
    calculatorDescription: string;
  }>;
  similarColor?: CalculatorColor;
  similarTitle?: string;
  initialRatingTotal?: number;
  initialRatingCount?: number;
}

export function CalculatorPageShell({
  icon: Icon,
  accent = "emerald",
  pageTitle,
  pageDescription,
  pageDescriptionBefore,
  pageDescriptionBold,
  pageDescriptionAfter,
  children,
  entityId,
  creatorSlug = "hudson-hale",
  guideData,
  similarCalculators,
  similarColor = "teal",
  similarTitle = "Related calculators",
  initialRatingTotal = 0,
  initialRatingCount = 0,
}: CalculatorPageShellProps) {
  const iconGradient = ACCENT_ICON[accent];
  const hasStructuredDescription =
    pageDescriptionBefore != null ||
    pageDescriptionBold != null ||
    pageDescriptionAfter != null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {pageTitle}
            </h1>
            {hasStructuredDescription ? (
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {pageDescriptionBefore}
                {pageDescriptionBold ? (
                  <strong className="font-semibold text-gray-900">
                    {pageDescriptionBold}
                  </strong>
                ) : null}
                {pageDescriptionAfter}
              </p>
            ) : pageDescription ? (
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {pageDescription}
              </p>
            ) : null}
          </header>

          {children}

          <RatingProfileSection
            entityId={entityId}
            entityType="calculator"
            creatorSlug={creatorSlug}
            initialRatingTotal={initialRatingTotal}
            initialRatingCount={initialRatingCount}
          />

          <CalculatorGuide data={guideData} layout="article" />

          <SimilarCalculators
            calculators={similarCalculators}
            color={similarColor}
            title={similarTitle}
          />
        </div>
      </main>
    </div>
  );
}

export function calculatorFormHeaderClass(accent: CalculatorAccent = "emerald"): string {
  const map: Record<CalculatorAccent, string> = {
    emerald: "from-emerald-50 to-teal-50 border-emerald-100/80",
    blue: "from-blue-50 to-indigo-50 border-blue-100/80",
    teal: "from-teal-50 to-cyan-50 border-teal-100/80",
    orange: "from-orange-50 to-amber-50 border-orange-100/80",
    gray: "from-gray-50 to-slate-50 border-gray-100/80",
    purple: "from-purple-50 to-violet-50 border-purple-100/80",
    slate: "from-slate-50 to-gray-50 border-slate-100/80",
  };
  return map[accent];
}

export function calculatorAccentTextClass(accent: CalculatorAccent = "emerald"): string {
  const map: Record<CalculatorAccent, string> = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    teal: "text-teal-600",
    orange: "text-orange-600",
    gray: "text-gray-600",
    purple: "text-purple-600",
    slate: "text-slate-600",
  };
  return map[accent];
}
