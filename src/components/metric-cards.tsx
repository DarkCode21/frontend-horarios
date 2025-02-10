import { Users, BookOpen, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">30</p>
            <p className="text-sm text-muted-foreground">
              Cantidad de profesores de Informática
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">60</p>
            <p className="text-sm text-muted-foreground">
              Número de cursos inscritos en el sistema
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <User className="h-8 w-8 text-primary" />
          <div>
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-muted-foreground">
              Cantidad de usuarios registrados
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
