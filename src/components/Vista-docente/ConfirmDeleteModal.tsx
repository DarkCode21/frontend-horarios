"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import api from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";


interface ConfirmDeleteModalProps {
  docenteId: number;
  teacherName: string;
  onClose: () => void;
  onDeleted: () => void;
}

export default function ConfirmDeleteModal({
  docenteId,
  teacherName,
  onClose,
  onDeleted,
}: ConfirmDeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Se utiliza DELETE; si tu endpoint requiere POST, cámbialo
      await api.post(`/api/auth/Docentes/eliminarDocente/${docenteId}`);
      toast({
        description: "Docente eliminado correctamente",
      });
      onDeleted(); // refresca la tabla, por ejemplo
      onClose();
    } catch (error) {
      console.error("Error al eliminar docente:", error);
      toast({
        description: "Error al eliminar docente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card text-card-foreground p-6 rounded-xl shadow w-[500px] relative transform"
      >
        <h2 className="text-lg font-semibold mb-4">Confirmar eliminación</h2>
        <p className="mb-6">
          ¿Estás seguro de eliminar a <strong>{teacherName}</strong>? Esta
          acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} disabled={loading}>
            {loading ? <FiLoader className="mr-2 animate-spin" /> : "Eliminar"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
