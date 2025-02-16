"use client";

import React, { useState, useEffect } from "react";
import { Users, BookOpen, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/utils/axios";

export function MetricCards() {
  const [professorsCount, setProfessorsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProfessorsCount = async () => {
      try {
        const response = await api.get("/api/auth/Dashboard/cantProfesores");
        setProfessorsCount(response.data);
      } catch (err: any) {
        console.error("Error al obtener la cantidad de profesores:", err);
        setError("Error al cargar la cantidad de profesores");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessorsCount();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex flex-row items-center gap-4 p-6">
          <Users className="h-8 w-8 text-primary" />
          <div>
            {loading ? (
              <p className="text-2xl font-bold">-</p>
            ) : error ? (
              <p className="text-2xl font-bold text-destructive">Error</p>
            ) : (
              <p className="text-2xl font-bold">{professorsCount}</p>
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
            <p className="text-2xl font-bold">60</p>
            <p className="text-sm text-muted-foreground">
              Número de cursos inscritos en el sistema.
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
              Cantidad de usuarios registrados hasta el momento.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
