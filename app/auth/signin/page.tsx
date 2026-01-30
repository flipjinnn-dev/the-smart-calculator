'use client';

import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/community');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (status === 'authenticated') {
    return null;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to Community
          </CardTitle>
          <CardDescription className="text-base">
            Sign in with Google to join our community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => signIn('google', { callbackUrl: '/community' })}
            className="w-full h-12 text-base gap-3"
            size="lg"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </Button>
          
          <div className="text-center text-sm text-muted-foreground space-y-2 pt-4">
            <p>By signing in, you can:</p>
            <ul className="space-y-1">
              <li>✓ Create and share posts</li>
              <li>✓ Comment on discussions</li>
              <li>✓ React to community content</li>
            </ul>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-4">
            All posts and comments are moderated before publishing
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
