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
import { Badge } from "@/components/ui/badge";

const users = [
  {
    id: "1",
    name: "Ricardo Manuel Guevara Ruiz",
    email: "rguevara@unitru.edu.pe",
    phone: "908546758",
    role: "User",
    status: "Activo",
    date: "18 sep, 2015",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Yenny Milagritos Sifuentes-Díaz",
    email: "ysifuentes@unitru.edu.pe",
    phone: "908546758",
    role: "User",
    status: "Inactivo",
    date: "18 mar, 2019",
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Edwin Raul Mendoza Torres",
    email: "edwin@unitru.edu.pe",
    phone: "908546758",
    role: "User",
    status: "Activo",
    date: "8 ene, 2025",
    avatar: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Ricardo Manuel Guevara Ruiz",
    email: "rguevara@unitru.edu.pe",
    phone: "908546758",
    role: "Docente",
    status: "Activo",
    date: "18 sep, 2015",
    avatar: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Yenny Milagritos Sifuentes-Díaz",
    email: "ysifuentes@unitru.edu.pe",
    phone: "908546758",
    role: "Docente",
    status: "Activo",
    date: "18 mar, 2019",
    avatar: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Edwin Raul Mendoza Torres",
    email: "edwin@unitru.edu.pe",
    phone: "908546758",
    role: "Director",
    status: "Inactivo",
    date: "8 ene, 2025",
    avatar: "/placeholder.svg",
  },
];

export function UsersTable() {
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
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="space-y-3">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    user.status === "Activo"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-red-50 text-red-600 border-red-200"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.date}</TableCell>
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
                    <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Eliminar usuario
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
