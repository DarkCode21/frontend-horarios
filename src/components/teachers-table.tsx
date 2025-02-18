"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "./ui/card";
import api from "@/utils/axios";

export function TeachersTable() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/api/auth/Dashboard/docentes");
        setTeachers(response.data);
      } catch (err: any) {
        console.error("Error al obtener docentes:", err);
        setError("Error al cargar docentes");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <Card className="p-5">
        <p>Cargando docentes...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-5">
        <p className="text-destructive">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-lg font-medium">Docentes</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Condición</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => {
            const fullName = `${teacher.nombre} ${
              teacher.nombre2 ? teacher.nombre2 + " " : ""
            }${teacher.apellidoP} ${teacher.apellidoM}`;
            return (
              <TableRow key={teacher.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/images/perfil.avif" />
                    <AvatarFallback>{fullName}</AvatarFallback>
                  </Avatar>
                  {fullName}
                </TableCell>
                <TableCell>{teacher.profesor.email}</TableCell>
                <TableCell>{teacher.telefono}</TableCell>
                <TableCell>{teacher.categoriadocente.nombre}</TableCell>
                <TableCell>{teacher.condicion.nombre}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
