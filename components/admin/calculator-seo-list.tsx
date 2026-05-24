"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CalculatorSeoListItem } from "@/lib/calculator-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Pencil,
  Search,
  FileCheck,
  Calculator,
} from "lucide-react";

type Props = {
  items: CalculatorSeoListItem[];
  categories: { id: string; label: string }[];
};

export function CalculatorSeoList({ items, categories }: Props) {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [items, category, search]);

  const customSeoCount = items.filter((i) => i.hasSeoFile).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Total
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-0.5">{items.length}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50/80 px-4 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-green-700">
            Custom SEO saved
          </p>
          <p className="text-2xl font-bold text-green-900 mt-0.5">{customSeoCount}</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-blue-700">
            Showing
          </p>
          <p className="text-2xl font-bold text-blue-900 mt-0.5">{filtered.length}</p>
        </div>
      </div>

      <Card className="border-2 border-gray-200 shadow-md overflow-hidden">
        <CardContent className="p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,220px)_1fr]">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                id="category-filter"
                className="h-11 bg-white border-gray-300"
              >
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All categories ({items.length})
                </SelectItem>
                {categories.map((cat) => {
                  const count = items.filter((i) => i.category === cat.id).length;
                  return (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label} ({count})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                aria-hidden
              />
              <Input
                id="search-calculators"
                placeholder="Search by name or calculator ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 pl-10 bg-white border-gray-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-md overflow-hidden">
        <div className="hidden sm:grid sm:grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-500">
          <span>Calculator</span>
          <span className="w-28 text-center">Category</span>
          <span className="w-44 text-right">Actions</span>
        </div>

        <ul className="divide-y divide-gray-100 max-h-[min(65vh,720px)] overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="py-16 px-6 text-center">
              <Calculator
                className="w-10 h-10 text-gray-300 mx-auto mb-3"
                aria-hidden
              />
              <p className="text-gray-600 font-medium">No calculators found</p>
              <p className="text-sm text-gray-500 mt-1">
                Try another category or search term.
              </p>
            </li>
          ) : (
            filtered.map((item) => (
              <li
                key={item.id}
                className="group px-4 sm:px-5 py-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 transition-colors"
              >
                <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-center gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </p>
                      {item.hasSeoFile && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 shrink-0 gap-1">
                          <FileCheck className="w-3 h-3" aria-hidden />
                          Custom SEO
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 font-mono mt-0.5 truncate">
                      {item.id}
                    </p>
                  </div>

                  <div className="sm:w-28 sm:flex sm:justify-center">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 font-normal"
                    >
                      {item.categoryLabel}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:w-44 sm:justify-end">
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm"
                    >
                      <Link href={`/admin/calculators/seo/${item.id}`}>
                        <Pencil className="w-3.5 h-3.5" aria-hidden />
                        Edit SEO
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-gray-300"
                    >
                      <a
                        href={item.publicPath}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                        Live
                      </a>
                    </Button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
