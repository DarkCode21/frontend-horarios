import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleGrid } from "@/app/dashboard/horarios/schedule-grid";

export default function MiHorarioPage() {
  return (
    <div className="space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mi Horario</h2>
          <p className="text-muted-foreground">Hola, Ricardo</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Input placeholder="Buscar" className="w-[200px]" />
        </div>
      </div>
      <Card className="p-7 rounded-3xl">
        <div className="flex justify-end items-center mb-6">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Periodo:</span>
              <Select defaultValue="2025-1">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-1">2025-I</SelectItem>
                  <SelectItem value="2025-2">2025-II</SelectItem>
                  <SelectItem value="2024-1">2024-I</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <ScheduleGrid />
      </Card>
    </div>
  );
}
