'use client';

import { useState, useMemo, useTransition } from 'react';
import { Search, Download, ExternalLink, Filter, Loader2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface Workflow {
  name: string;
  description: string;
  link: string;
}

interface Category {
  name: string;
  count: number;
  workflows: Workflow[];
}

interface WorkflowsData {
  total: number;
  categories: Record<string, Category>;
}

interface WorkflowsDisplayProps {
  data: WorkflowsData;
}

export function WorkflowsDisplay({ data }: WorkflowsDisplayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isPending, startTransition] = useTransition();

  const sortedCategories = useMemo(() => {
    return Object.entries(data.categories)
      .sort(([, a], [, b]) => b.count - a.count)
      .map(([key, value]) => ({ key, ...value }));
  }, [data.categories]);

  const filteredWorkflows = useMemo(() => {
    let workflows: (Workflow & { category: string })[] = [];

    if (activeCategory === 'all') {
      Object.entries(data.categories).forEach(([, category]) => {
        workflows.push(
          ...category.workflows.map((w) => ({ ...w, category: category.name }))
        );
      });
    } else {
      const category = data.categories[activeCategory];
      if (category) {
        workflows = category.workflows.map((w) => ({ ...w, category: category.name }));
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      workflows = workflows.filter(
        (w) =>
          w.name.toLowerCase().includes(query) ||
          w.description.toLowerCase().includes(query) ||
          w.category.toLowerCase().includes(query)
      );
    }

    return workflows;
  }, [data.categories, activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setActiveCategory(category);
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats and Search Bar */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {data.total.toLocaleString()}+ Free n8n Workflows
            </h2>
            <p className="text-sm text-gray-600">
              Download ready-to-use automation templates
            </p>
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-sm bg-white border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs - Horizontal Scroll */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-base text-gray-900">Filter by Category</h3>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-2 pb-2 min-w-max">
              <Button
                variant="ghost"
                onClick={() => handleCategoryChange('all')}
                className={`whitespace-nowrap h-9 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                disabled={isPending}
              >
                All Categories
                <Badge 
                  variant="secondary"
                  className="ml-2 text-xs"
                >
                  {data.total}
                </Badge>
              </Button>
              {sortedCategories.map(({ key, name, count }) => (
                <Button
                  key={key}
                  variant="ghost"
                  onClick={() => handleCategoryChange(key)}
                  className={`whitespace-nowrap h-9 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === key
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                  disabled={isPending}
                >
                  {name}
                  <Badge 
                    variant="secondary"
                    className="ml-2 text-xs"
                  >
                    {count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="px-4 py-3 bg-blue-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {isPending && <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />}
            <p className="text-sm font-medium text-gray-700">
              {isPending ? (
                <span className="text-blue-600">Loading...</span>
              ) : (
                <>
                  Showing <span className="text-blue-600 font-semibold">{filteredWorkflows.length.toLocaleString()}</span> 
                  <span className="text-gray-600"> workflow{filteredWorkflows.length !== 1 ? 's' : ''}</span>
                  {searchQuery && <span className="text-gray-600"> for "{searchQuery}"</span>}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Workflows Grid with Fixed Height and Scroll */}
        <ScrollArea className="h-[700px]">
          <div className="p-4">
            {isPending ? (
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex gap-3">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-8 w-28" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredWorkflows.length > 0 ? (
              <div className="space-y-3">
                {filteredWorkflows.map((workflow, index) => (
                  <div
                    key={`${workflow.name}-${index}`}
                    className="group bg-white hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
                  >
                    <div className="p-4">
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                            <Download className="h-6 w-6 text-blue-600 group-hover:text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title and Category */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 leading-tight">
                              {workflow.name}
                            </h3>
                            {activeCategory === 'all' && (
                              <Badge variant="secondary" className="text-xs whitespace-nowrap">
                                {workflow.category}
                              </Badge>
                            )}
                          </div>

                          {/* Description - 2 lines max */}
                          <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                            {workflow.description}
                          </p>

                          {/* Download Button */}
                          <div className="flex items-center gap-3">
                            <Button
                              asChild
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs"
                            >
                              <a
                                href={workflow.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5"
                              >
                                <Download className="h-3.5 w-3.5" />
                                Download
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                            <span className="text-xs text-gray-500">Google Drive</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">No workflows found</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try different keywords.`
                    : 'No workflows available in this category.'}
                </p>
                {searchQuery && (
                  <Button
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
