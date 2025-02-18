import { Bell } from "lucide-react";
import { MisCursosTable } from "./mis-cursos-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function MisCursosPage() {
  return (
    <div className="space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mis Cursos</h2>
          <p className="text-muted-foreground">Hola, Ricardo</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Input placeholder="Buscar" className="w-[200px]" />
        </div>
      </div>
      <Card className="space-y-4 p-7 rounded-3xl">
        <div className="flex justify-end">
          <Input placeholder="Buscar curso..." className="w-[300px]" />
        </div>
        <MisCursosTable />
      </Card>
    </div>
  );
}
