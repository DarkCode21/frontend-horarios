"use client";

import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import api from "@/utils/axios";

const chartConfig = {
  capacidad: {
    label: "Capacidad",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function CursosChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await api.get("/api/auth/Dashboard/cursoxcapacidad");
        setChartData(response.data);
      } catch (err: any) {
        console.error("Error al obtener los datos del gráfico:", err);
        setError("Error al cargar el gráfico");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-destructive">Error</p>
        ) : (
          <BarChart data={chartData} margin={{ top: 25 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nombre"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="capacidad" fill="var(--color-capacidad)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        )}
      </ChartContainer>
    </CardContent>
  );
}
