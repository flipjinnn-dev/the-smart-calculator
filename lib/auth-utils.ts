import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { isDashboardAdminAuthenticated } from '@/lib/admin-dashboard-auth-server';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    redirect('/auth/signin');
  }
  return session;
}

/** NextAuth admin role, or hardcoded admin dashboard cookie session */
export async function requireAdmin() {
  if (await isDashboardAdminAuthenticated()) {
    return {
      user: {
        role: 'admin' as const,
        name: 'admin',
        userId: 'dashboard-admin',
        email: 'admin@dashboard.local',
      },
    };
  }

  const session = await requireAuth();
  if (session.user.role !== 'admin') {
    redirect('/community');
  }
  return session;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

export function isAdmin(session: any): boolean {
  return session?.user?.role === 'admin';
}

export function isAuthenticated(session: any): boolean {
  return !!session?.user;
}
