import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CalendarCard() {
  return (
    <Card className="h-[450px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Febrero 2025
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <Calendar
          mode="single"
          selected={new Date()}
          className="h-full w-full" 
        />
      </CardContent>
    </Card>
  );
}
