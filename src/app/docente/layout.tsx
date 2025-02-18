import { DocenteSidebar } from "@/components/docente-sidebar";
import type React from "react";

export default function DocenteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DocenteSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
