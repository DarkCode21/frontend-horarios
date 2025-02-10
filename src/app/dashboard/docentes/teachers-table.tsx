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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const teachers = [
  {
    id: "1",
    name: "Ricardo Manuel Guevara Ruiz",
    email: "rguevara@unitru.edu.pe",
    phone: "908546758",
    status: "Contratado",
    courses: 2,
    date: "18 sep, 2015",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Yenny Milagritos Sifuentes-Díaz",
    email: "ysifuentes@unitru.edu.pe",
    phone: "908546758",
    status: "Contratado",
    courses: 1,
    date: "18 mar, 2019",
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Edwin Raul Mendoza Torres",
    email: "edwin@unitru.edu.pe",
    phone: "908546758",
    status: "Contratado",
    courses: 0,
    date: "8 ene, 2025",
    avatar: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Ricardo Manuel Guevara Ruiz",
    email: "rguevara@unitru.edu.pe",
    phone: "908546758",
    status: "Contratado",
    courses: 2,
    date: "18 sep, 2015",
    avatar: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Yenny Milagritos Sifuentes-Díaz",
    email: "ysifuentes@unitru.edu.pe",
    phone: "908546758",
    status: "Contratado",
    courses: 1,
    date: "18 mar, 2019",
    avatar: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Edwin Raul Mendoza Torres",
    email: "edwin@unitru.edu.pe",
    phone: "908546758",
    status: "Contratado",
    courses: 0,
    date: "8 ene, 2025",
    avatar: "/placeholder.svg",
  },
];

export function TeachersTable() {
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
            <TableHead>Celular</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>N° Cursos</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="py-10">
          {teachers.map((teacher) => (
            <TableRow key={teacher.id} className="space-y-3">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={teacher.avatar} />
                  <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                </Avatar>
                {teacher.name}
              </TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.phone}</TableCell>
              <TableCell>{teacher.status}</TableCell>
              <TableCell>{teacher.courses}</TableCell>
              <TableCell>{teacher.date}</TableCell>
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
                    <DropdownMenuItem>Editar docente</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Eliminar docente
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
          <Button
            variant="outline"
            size="sm"
            className="bg-primary text-white"
          >
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
