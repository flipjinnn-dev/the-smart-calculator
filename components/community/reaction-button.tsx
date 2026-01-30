'use client';

import { useState, useOptimistic } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toggleReaction } from '@/lib/actions/reaction-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ReactionButtonProps {
  postId: string;
  initialCount: number;
  hasReacted: boolean;
  isAuthenticated: boolean;
}

export function ReactionButton({ 
  postId, 
  initialCount, 
  hasReacted, 
  isAuthenticated 
}: ReactionButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [reacted, setReacted] = useState(hasReacted);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to react to posts');
      router.push('/auth/signin');
      return;
    }

    setIsLoading(true);
    const optimisticReacted = !reacted;
    const optimisticCount = optimisticReacted ? count + 1 : count - 1;
    
    setReacted(optimisticReacted);
    setCount(optimisticCount);

    const result = await toggleReaction(postId);

    if (result.error) {
      setReacted(!optimisticReacted);
      setCount(count);
      toast.error(result.error);
    }
    setIsLoading(false);
  };

  return (
    <Button
      variant={reacted ? 'default' : 'outline'}
      size="default"
      onClick={handleClick}
      disabled={isLoading}
      className={`gap-2 h-10 px-5 rounded-lg transition-all duration-200 font-medium text-sm ${
        reacted 
          ? 'bg-blue-600 hover:bg-blue-700 text-white border-0' 
          : 'border border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 text-gray-700'
      }`}
    >
      <ThumbsUp className={`w-4 h-4 transition-all ${reacted ? 'fill-current' : ''} ${isLoading ? 'animate-pulse' : ''}`} />
      <span className="font-semibold">{count}</span>
      <span>{reacted ? 'Liked' : 'Like'}</span>
    </Button>
  );
}
