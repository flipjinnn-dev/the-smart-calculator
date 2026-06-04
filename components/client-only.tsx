"use client";

import { useEffect, useState } from "react";

/**
 * Renders children only after mount so server HTML matches the first client paint.
 * Use for Radix UI, browser APIs, or any client-only UI that causes hydration mismatches.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
