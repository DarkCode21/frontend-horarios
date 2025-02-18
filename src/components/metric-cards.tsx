"use client";

import React, { useState, useEffect } from "react";
import { Users, BookOpen, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/utils/axios";

export function MetricCards() {
  const [metrics, setMetrics] = useState({
    professors: 0,
    courses: 0,
    classrooms: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [profRes, coursesRes, aulasRes] = await Promise.all([
          api.get("/api/auth/Dashboard/cantProfesores"),
          api.get("/api/auth/Dashboard/cursosTotales"),
          api.get("/api/auth/Dashboard/aulasTotales"),
        ]);
        setMetrics({
          professors: profRes.data,
          courses: coursesRes.data,
          classrooms: aulasRes.data,
        });
      } catch (err: any) {
        console.error("Error al obtener métricas:", err);
        setError("Error al cargar las métricas");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <Users className="h-8 w-8 text-primary" />
          <div>
            {loading ? (
              <p className="text-2xl font-bold">...</p>
            ) : error ? (
              <p className="text-2xl font-bold text-destructive">Error</p>
            ) : (
              <p className="text-2xl font-bold">{metrics.professors}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Cantidad de profesores de la escuela de Informática.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            {loading ? (
              <p className="text-2xl font-bold">...</p>
            ) : error ? (
              <p className="text-2xl font-bold text-destructive">Error</p>
            ) : (
              <p className="text-2xl font-bold">{metrics.courses}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Número de cursos inscritos en el sistema.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <Home className="h-8 w-8 text-primary" />
          <div>
            {loading ? (
              <p className="text-2xl font-bold">...</p>
            ) : error ? (
              <p className="text-2xl font-bold text-destructive">Error</p>
            ) : (
              <p className="text-2xl font-bold">{metrics.classrooms}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Número de aulas registradas en el sistema.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
