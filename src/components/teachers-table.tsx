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

const teachers = [
  {
    name: "Ricardo Manuel Guevara Ruiz",
    email: "rguevara@unitru.edu.pe",
    phone: "908546758",
    status: "Contratado",
    date: "18 sep, 2015",
  },
  {
    name: "Yenny Milagritos Sifuentes-Díaz",
    email: "ysifuentes@unitru.edu.pe",
    phone: "908546758",
    status: "Contratado",
    date: "18 mar, 2019",
  },
  {
    name: "Edwin Raul Mendoza Torres",
    email: "edwin@unitru.edu.pe",
    phone: "908546758",
    status: "Contratado",
    date: "8 ene, 2025",
  },
];

export function TeachersTable() {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-lg font-medium">Docentes</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Celular</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.email}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/images/perfil.avif" />
                  <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                </Avatar>
                {teacher.name}
              </TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.phone}</TableCell>
              <TableCell>{teacher.status}</TableCell>
              <TableCell>{teacher.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
