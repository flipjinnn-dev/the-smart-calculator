'use client';

import { Award, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Contributor {
  name: string;
  image?: string;
  postCount: number;
  reactionCount: number;
  rank: number;
}

interface TopContributorsSidebarProps {
  contributors: Contributor[];
}

export function TopContributorsSidebar({ contributors }: TopContributorsSidebarProps) {
  if (contributors.length === 0) return null;

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <Card className="p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
          <Award className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-xl text-gray-900">Top Contributors</h3>
      </div>
      
      <div className="space-y-4">
        {contributors.map((contributor) => (
          <div 
            key={contributor.name}
            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 group"
          >
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-white shadow-md ring-2 ring-gray-100 group-hover:ring-purple-200 transition-all">
                <AvatarImage src={contributor.image} alt={contributor.name} />
                <AvatarFallback className={`bg-gradient-to-br ${getRankColor(contributor.rank)} text-white font-bold text-sm`}>
                  {contributor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold shadow-md border-2 border-white">
                {getRankBadge(contributor.rank)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                {contributor.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200 px-2 py-0.5">
                  {contributor.postCount} posts
                </Badge>
                <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700 border-purple-200 px-2 py-0.5 flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5" />
                  {contributor.reactionCount}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
