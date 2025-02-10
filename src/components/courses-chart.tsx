"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const data = [
  { name: "R. Guevara", cursos: 3 },
  { name: "Y. Sifuentes", cursos: 2 },
  { name: "E. Mendoza", cursos: 1 },
  { name: "M. Rodriguez", cursos: 0 },
  { name: "L. García", cursos: 2 },
  { name: "C. Torres", cursos: 1 },
  { name: "R. Guevara", cursos: 3 },
  { name: "Y. Sifuentes", cursos: 2 },
  { name: "E. Mendoza", cursos: 1 },
  { name: "M. Rodriguez", cursos: 0 },
  { name: "L. García", cursos: 2 },
  { name: "C. Torres", cursos: 1 },
];

const chartConfig = {
  cursos: {
    label: "Cursos",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function CursosChart() {
  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <BarChart accessibilityLayer data={data} margin={{ top: 25 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="cursos" fill="var(--color-cursos)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  );
}
