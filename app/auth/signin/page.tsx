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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 relative overflow-hidden">
      <h1 className="sr-only">Sign In to Smart Calculator</h1>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl" />
      
      <Card className="w-full max-w-md bg-white shadow-2xl border-2 border-gray-200 relative z-10">
        <CardHeader className="text-center space-y-4 pb-6 pt-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Chrome className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-base text-gray-600 px-4">
            Sign in with your Google account to access the community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-8">
          <Button
            onClick={() => signIn('google', { callbackUrl: '/community' })}
            className="w-full h-14 text-base gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            size="lg"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </Button>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
            <p className="text-sm font-semibold text-gray-900 mb-3 text-center">By signing in, you can:</p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                <span className="text-sm text-gray-700 font-medium">Create and share posts with the community</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                <span className="text-sm text-gray-700 font-medium">Comment and engage in discussions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                <span className="text-sm text-gray-700 font-medium">React and interact with community content</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
            <p className="text-xs text-center text-gray-700 font-medium">
              🛡️ All posts and comments are moderated before publishing to ensure quality
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
