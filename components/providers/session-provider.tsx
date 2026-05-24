"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <NextAuthSessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
      {children}
    </NextAuthSessionProvider>
  );
}
