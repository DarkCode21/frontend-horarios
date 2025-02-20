"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import { CoursesTable } from "./courses-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import AddCourseModal from "@/components/vista-curso/AddCourseModal";
import AssignCourseModal from "@/components/vista-curso/AssignCourseModal";

export default function CoursesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  return (
    <div className="space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cursos</h2>
          <p className="text-muted-foreground">Hola, Deyvi</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Input placeholder="Buscar" className="w-[200px]" />
        </div>
      </div>
      <Card className="space-y-4 p-7 rounded-3xl">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button className="bg-primary" onClick={() => setIsModalOpen(true)}>
              + Agregar Curso
            </Button>
            <Button
              className="bg-primary"
              onClick={() => setIsAssignModalOpen(true)}
            >
              + Asignar Curso
            </Button>
          </div>
          <Input placeholder="Buscar curso..." className="w-[300px]" />
        </div>

        <CoursesTable />
      </Card>

      {/* Modales */}
      <AddCourseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AssignCourseModal
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
      />
    </div>
  );
}
