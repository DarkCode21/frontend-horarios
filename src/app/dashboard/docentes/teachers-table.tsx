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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Loader from "@/components/loader";
import api from "@/utils/axios";
import ActionsDropdown from "@/components/Vista-docente/ActionsDropdown-docente";
import ViewTeacherModal from "@/components/Vista-docente/ViewTeacherModal";
import EditTeacherModal from "@/components/Vista-docente/EditTeacherModal";

interface Docente {
  id: number;
  nombre: string;
  apellidoP: string;
  telefono: string;
  email: string;
  categoria_docente: string;
  condicion: string;
  total_cursos: number;
  image_url?: string;
}

interface DocentesResponse {
  current_page: number;
  data: Docente[];
  last_page: number;
  per_page: number;
  total: number;
}

interface TeachersTableProps {
  reload?: boolean;
}

export function TeachersTable({ reload }: TeachersTableProps) {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(6);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(1);

  const [viewTeacherId, setViewTeacherId] = useState<number | null>(null);
  const [editTeacherId, setEditTeacherId] = useState<number | null>(null);

  const fetchDocentes = async (page: number, limit: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get<DocentesResponse>(
        `/api/auth/Docentes/listarDocentes?page=${page}&per_page=${limit}`
      );
      const data = response.data;
      setDocentes(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
      setPerPage(data.per_page);
      setTotalItems(data.total);
    } catch (err: any) {
      console.error("Error al obtener docentes:", err);
      setError("Error al cargar docentes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocentes(currentPage, perPage);
  }, []);

  useEffect(() => {
    if (reload) {
      fetchDocentes(currentPage, perPage);
    }
  }, [reload]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > lastPage) return;
    fetchDocentes(pageNumber, perPage);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    fetchDocentes(1, newPerPage);
  };

  const getFullName = (doc: Docente) => `${doc.nombre} ${doc.apellidoP}`;

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

  const handleTeacherUpdated = () => {
    fetchDocentes(currentPage, perPage);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Condición</TableHead>
            <TableHead>N° Cursos</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {docentes.map((teacher) => (
            <TableRow key={teacher.id} className="space-y-3">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={teacher.image_url}
                    alt={getFullName(teacher)}
                  />
                  <AvatarFallback>
                    {teacher.nombre ? teacher.nombre[0] : "U"}
                  </AvatarFallback>
                </Avatar>
                {getFullName(teacher)}
              </TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.telefono}</TableCell>
              <TableCell>{teacher.categoria_docente}</TableCell>
              <TableCell>{teacher.condicion}</TableCell>
              <TableCell>{teacher.total_cursos}</TableCell>
              <TableCell>
                <ActionsDropdown
                  onViewDetails={() => setViewTeacherId(teacher.id)}
                  onEdit={() => setEditTeacherId(teacher.id)}
                  onDelete={() => alert("Eliminar: " + teacher.email)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagina */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Mostrando {docentes.length} de {totalItems}
          <span>|</span>
          <label htmlFor="perPageSelect">por página:</label>
          <select
            id="perPageSelect"
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

      {viewTeacherId && (
        <ViewTeacherModal
          docenteId={viewTeacherId}
          onClose={() => setViewTeacherId(null)}
        />
      )}

      {editTeacherId && (
        <EditTeacherModal
          docenteId={editTeacherId}
          onClose={() => setEditTeacherId(null)}
          onTeacherUpdated={handleTeacherUpdated}
        />
      )}
    </div>
  );
}
