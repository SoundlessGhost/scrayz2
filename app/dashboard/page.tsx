// src/app/dashboard/page.tsx
"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#164e63]"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return <DashboardLayout />;
}
