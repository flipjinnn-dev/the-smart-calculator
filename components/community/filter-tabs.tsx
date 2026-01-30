'use client';

import { Flame, Clock, TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const filters = [
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'popular', label: 'Popular', icon: Flame },
    { id: 'discussed', label: 'Most Discussed', icon: MessageSquare },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl border-2 border-gray-200 shadow-md">
      <div className="flex items-center gap-3 flex-wrap">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          
          return (
            <Button
              key={filter.id}
              variant={isActive ? 'default' : 'outline'}
              onClick={() => onFilterChange(filter.id)}
              className={`gap-2 h-10 px-5 rounded-xl transition-all duration-300 font-medium ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl border-0' 
                  : 'border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
              {filter.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
