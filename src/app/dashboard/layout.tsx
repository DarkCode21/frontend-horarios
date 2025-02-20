"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { getUserRole } from "@/utils/jwt";
import Loader from "@/components/loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      const role = getUserRole();
      if (role !== 1) {
        router.replace("/docente");
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50">
      <div className="fixed top-0 left-0 h-screen w-60 border-r bg-white">
        <Sidebar className="h-full" />
      </div>
      <div className="flex-1 ml-60 min-h-screen overflow-auto">{children}</div>
    </div>
  );
}
