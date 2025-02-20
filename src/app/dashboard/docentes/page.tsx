"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import { TeachersTable } from "./teachers-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import AddTeacherModal from "@/components/Vista-docente/AddTeacherModal";
import { getUserData } from "@/utils/jwt";

export default function DocentesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reload, setReload] = useState(false);

  const userData = getUserData();
  const firstName = userData?.info_usuario?.nombre || "Invitado";

  const handleTeacherCreated = () => {
    setReload((prev) => !prev);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Docentes</h2>
          <p className="text-muted-foreground">Hola, {firstName}</p>
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
          <Button className="bg-primary" onClick={() => setIsModalOpen(true)}>
            + Agregar Docente
          </Button>
          <Input placeholder="Buscar docente..." className="w-[300px]" />
        </div>

        <TeachersTable reload={reload} />
      </Card>

      {/* Modal */}
      <AddTeacherModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTeacherCreated={handleTeacherCreated}
      />
    </div>
  );
}
