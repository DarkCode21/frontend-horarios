"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/utils/axios";

export function ProgressChart() {
  const [assignedCourses, setAssignedCourses] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await api.get("/api/auth/Dashboard/cursosasignados");
        setAssignedCourses(response.data.total_cursociclos);
      } catch (err: any) {
        console.error("Error al obtener el progreso:", err);
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <Card className="h-80">
      <CardHeader>
        <CardTitle className="text-center">
          Docentes con cursos asignados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative h-52 w-52">
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
              {loading ? (
                <span className="text-3xl font-bold">...</span>
              ) : error ? (
                <span className="text-3xl font-bold text-destructive">!</span>
              ) : (
                <span className="text-3xl font-bold">{assignedCourses}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
