"use client";

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

const courses = [
  {
    id: "1",
    name: "Sistema Operativos I",
    cycle: "VII",
    modalities: ["Teoría", "Práctica", "Laboratorio"],
    credits: 4,
    status: "Activo",
    date: "18 sep, 2015",
  },
  {
    id: "2",
    name: "Desarrollo de Software",
    cycle: "VII",
    modalities: ["Teoría", "Práctica", "Laboratorio"],
    credits: 4,
    status: "Activo",
    date: "18 mar, 2019",
  },
  {
    id: "3",
    name: "Sistemas de Información",
    cycle: "X",
    modalities: ["Teoría", "Práctica", "Laboratorio"],
    credits: 3,
    status: "Activo",
    date: "8 ene, 2025",
  },
  {
    id: "4",
    name: "Proyecto de Tesis",
    cycle: "IX",
    modalities: ["Teoría", "Práctica"],
    credits: 2,
    status: "Inactivo",
    date: "18 sep, 2015",
  },
];

export function MisCursosTable() {
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
            <TableRow key={course.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{course.name}</TableCell>
              <TableCell>{course.cycle}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {course.modalities.map((modality) => (
                    <span
                      key={modality}
                      className="text-sm text-muted-foreground"
                    >
                      • {modality}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>{course.credits}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    course.status === "Activo"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-red-50 text-red-600 border-red-200"
                  }
                >
                  {course.status}
                </Badge>
              </TableCell>
              <TableCell>{course.date}</TableCell>
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
                    <DropdownMenuItem>Ver horario</DropdownMenuItem>
                    <DropdownMenuItem>Ver alumnos</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Mostrando:
          <select className="border rounded px-2 py-1">
            <option>6</option>
            <option>12</option>
            <option>24</option>
          </select>
          de 30
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Prev
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-white">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
