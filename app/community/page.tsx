import { Suspense } from 'react';
import { getApprovedPosts } from '@/lib/actions/post-actions';
import { getCurrentUser } from '@/lib/auth-utils';
import { hasUserReacted } from '@/lib/actions/reaction-actions';
import { CommunityContent } from '@/components/community/community-content';

export const metadata = {
  title: 'Community - The Smart Calculator',
  description: 'Join our community to share knowledge, ask questions, and learn from others.',
};

export default async function CommunityPage() {
  const [posts, user] = await Promise.all([
    getApprovedPosts(20),
    getCurrentUser(),
  ]);

  const userReactions = user ? await Promise.all(
    posts.map((post: any) => hasUserReacted(post._id, user.userId!))
  ) : [];

  const trendingPosts = posts
    .sort((a: any, b: any) => (b.reactionCount + b.commentCount) - (a.reactionCount + a.commentCount))
    .slice(0, 5);

  const topContributors = [
    { name: 'John Doe', image: undefined, postCount: 15, reactionCount: 89, rank: 1 },
    { name: 'Jane Smith', image: undefined, postCount: 12, reactionCount: 76, rank: 2 },
    { name: 'Alex Johnson', image: undefined, postCount: 10, reactionCount: 64, rank: 3 },
    { name: 'Sarah Williams', image: undefined, postCount: 8, reactionCount: 52, rank: 4 },
    { name: 'Mike Brown', image: undefined, postCount: 7, reactionCount: 45, rank: 5 },
  ];

  return (
    <Suspense fallback={<CommunityLoadingSkeleton />}>
      <CommunityContent 
        posts={posts}
        userReactions={userReactions}
        user={user}
        trendingPosts={trendingPosts}
        topContributors={topContributors}
      />
    </Suspense>
  );
}

function CommunityLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200 shadow-xl h-48 animate-pulse" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl p-4 border-2 border-gray-200 h-20 animate-pulse" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white rounded-3xl animate-pulse border-2 border-gray-200 shadow-lg" />
            ))}
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 h-96 animate-pulse" />
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 h-64 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
