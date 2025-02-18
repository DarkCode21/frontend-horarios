import { Bell } from "lucide-react";

import { Sidebar } from "@/components/sidebar";
import { MetricCards } from "@/components/metric-cards";
import { TeachersTable } from "@/components/teachers-table";
import { CalendarCard } from "@/components/calendar";
import { ProgressChart } from "@/components/progress-chart";
import { CursosChart } from "@/components/courses-chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Panel de Control
          </h2>
          <p className="text-muted-foreground">Hola, Deyvi</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Input placeholder="Buscar" className="w-[200px]" />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-12 lg:col-span-8 space-y-6">
          <MetricCards />
          <div className="rounded-xl border bg-white p-6">
            <h3 className="mb-4 text-lg font-medium">Capacidad de aulas</h3>
            <CursosChart />
          </div>
          <div>
            <TeachersTable />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <CalendarCard />
          <ProgressChart />
        </div>
      </div>
    </div>
  );
}
