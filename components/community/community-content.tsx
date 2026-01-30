'use client';

import { useState } from 'react';
import { PostCard } from '@/components/community/post-card';
import { CreatePostModal } from '@/components/community/create-post-modal';
import { TrendingPostsSidebar } from '@/components/community/trending-posts-sidebar';
import { TopContributorsSidebar } from '@/components/community/top-contributors-sidebar';
import { FilterTabs } from '@/components/community/filter-tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Users, Search, Sparkles } from 'lucide-react';

interface CommunityContentProps {
  posts: any[];
  userReactions: boolean[];
  user: any;
  trendingPosts: any[];
  topContributors: any[];
}

export function CommunityContent({ posts, userReactions, user, trendingPosts, topContributors }: CommunityContentProps) {
  const [activeFilter, setActiveFilter] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic filtering logic
  const getFilteredPosts = () => {
    let filtered = [...posts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting based on active filter
    switch (activeFilter) {
      case 'latest':
        // Sort by creation date (newest first)
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'trending':
        // Sort by combined engagement score (reactions + comments)
        filtered.sort((a, b) => {
          const scoreA = (a.reactionCount || 0) + (a.commentCount || 0);
          const scoreB = (b.reactionCount || 0) + (b.commentCount || 0);
          return scoreB - scoreA;
        });
        break;
      case 'popular':
        // Sort by reactions only
        filtered.sort((a, b) => (b.reactionCount || 0) - (a.reactionCount || 0));
        break;
      case 'discussed':
        // Sort by comments only
        filtered.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-extrabold text-gray-900">
                    Community
                  </h1>
                  <p className="text-gray-600 text-sm font-medium mt-1">
                    Share knowledge, ask questions, and connect with others
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {user ? (
                <>
                  <CreatePostModal />
                  {user.role === 'admin' && (
                    <Button asChild variant="outline" size="lg" className="border-2 border-gray-300 hover:bg-gray-50 rounded-xl font-semibold">
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </Button>
                  )}
                </>
              ) : (
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                  <Link href="/auth/signin">Sign In to Post</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search posts, topics, or questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2 border-gray-200 bg-white/50 focus:bg-white focus:border-blue-400 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <FilterTabs 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter}
            />

            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post: any, index: number) => (
                  <PostCard 
                    key={post._id} 
                    post={post} 
                    hasReacted={userReactions[index] || false}
                    isAuthenticated={!!user}
                  />
                ))
              ) : (
                <div className="text-center py-20 bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-dashed border-gray-300 shadow-lg">
                  <div className="relative inline-block mb-6">
                    <div className="p-6 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-3xl shadow-2xl">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full" />
                  </div>
                  <p className="text-gray-900 text-2xl font-bold mb-3">
                    {searchQuery ? 'No posts found' : 'No posts yet. Be the first to share!'}
                  </p>
                  <p className="text-gray-600 mb-8 text-lg">
                    {searchQuery ? 'Try adjusting your search terms' : 'Start the conversation and help build our community'}
                  </p>
                  {user && !searchQuery && (
                    <div className="mt-6">
                      <CreatePostModal />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <TrendingPostsSidebar posts={trendingPosts} />
            <TopContributorsSidebar contributors={topContributors} />
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl border-2 border-blue-400">
              <h3 className="font-bold text-xl mb-2">Community Guidelines</h3>
              <p className="text-blue-100 text-sm mb-4">
                Help us maintain a friendly and productive community
              </p>
              <ul className="space-y-2 text-sm text-blue-50">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 font-bold">✓</span>
                  <span>Be respectful and constructive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 font-bold">✓</span>
                  <span>Share helpful knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 font-bold">✓</span>
                  <span>Ask clear questions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
