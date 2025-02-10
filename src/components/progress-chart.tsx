import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          Docentes con cursos asignados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative h-40 w-40">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                className="stroke-slate-100"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              />
              <circle
                className="stroke-primary"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="75"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">12</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
