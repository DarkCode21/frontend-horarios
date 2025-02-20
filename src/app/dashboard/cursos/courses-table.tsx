"use client";

import React, { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/loader";
import api from "@/utils/axios";

interface Course {
  curso_id: number;
  curso_nombre: string;
  ciclo_nombre: string;
  creditos: number;
  modalidades: string[];
  fecha: string[];
}

interface CoursesResponse {
  data: Course[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export function CoursesTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(6);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(1);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const fetchCourses = async (page: number, limit: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get<CoursesResponse>(
        `/api/auth/Cursos/listarcursos?page=${page}&per_page=${limit}`
      );
      const data = response.data;
      setCourses(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
      setPerPage(data.per_page);
      setTotalItems(data.total);
    } catch (err: any) {
      console.error("Error al obtener cursos:", err);
      setError("Error al cargar cursos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage, perPage);
  }, []);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > lastPage) return;
    fetchCourses(pageNumber, perPage);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    fetchCourses(1, newPerPage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Ciclo</TableHead>
            <TableHead>Modalidad</TableHead>
            <TableHead>N° Créditos</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.curso_id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">
                {course.curso_nombre}
              </TableCell>
              <TableCell>{course.ciclo_nombre}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {course.modalidades.map((modality) => (
                    <span
                      key={modality}
                      className="text-sm text-muted-foreground"
                    >
                      • {modality}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>{course.creditos}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-600 border-green-200"
                >
                  Activo
                </Badge>
              </TableCell>
              <TableCell>
                {course.fecha.map((date, index) => (
                  <span key={index}>{formatDate(date)}</span>
                ))}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menú</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    <DropdownMenuItem>Editar curso</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Eliminar curso
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Mostrando {courses.length} de {totalItems} | por página:
          <select
            value={perPage}
            onChange={(e) => handlePerPageChange(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </Button>

          {[...Array(lastPage)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <Button
                key={pageNum}
                variant="outline"
                size="sm"
                className={
                  pageNum === currentPage ? "bg-primary text-white" : ""
                }
                onClick={() => goToPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= lastPage}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
