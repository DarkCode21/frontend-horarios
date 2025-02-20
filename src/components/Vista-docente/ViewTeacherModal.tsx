"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "@/utils/axios";
import Loader from "@/components/loader";
import { Input } from "@/components/ui/input";

interface ViewTeacherModalProps {
  docenteId: number;
  onClose: () => void;
}

interface VerDocenteResponse {
  id: number;
  nombre: string;
  apellidoP: string;
  telefono: string;
  direccion: string | null;
  profesor: {
    email: string;
  };
  categoria_docente: {
    id: number;
    nombre: string;
  };
  condicion: {
    id: number;
    nombre: string;
  };
  image_url?: string;
}

export default function ViewTeacherModal({
  docenteId,
  onClose,
}: ViewTeacherModalProps) {
  const [loading, setLoading] = useState(false);
  const [docenteData, setDocenteData] = useState<VerDocenteResponse | null>(
    null
  );
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    const fetchDocente = async () => {
      setLoading(true);
      try {
        const response = await api.get<VerDocenteResponse>(
          `/api/auth/Docentes/verDocente/${docenteId}`
        );
        const data = response.data;
        if (data.image_url) {
          data.image_url = data.image_url;
        }
        setDocenteData(data);
      } catch (error) {
        console.error("Error al ver docente:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocente();
  }, [docenteId]);

  if (!docenteId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3 }}
        className="bg-card text-card-foreground p-6 rounded-xl shadow w-[600px] relative transform"
      >
        {loading ? (
          <div className="p-4 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">Detalles del Docente</h2>
            {docenteData ? (
              <div>
                <div className="mb-6 flex justify-center">
                  <div className="w-40 h-40 relative">
                    <img
                      src={docenteData.image_url || "/images/perfil.avif"}
                      alt="Foto docente"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-normal text-sm mb-1">
                      Nombres
                    </label>
                    <Input
                      type="text"
                      className="w-full"
                      value={docenteData.nombre}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block font-normal text-sm mb-1">
                      Apellidos
                    </label>
                    <Input
                      type="text"
                      className="w-full"
                      value={docenteData.apellidoP}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block font-normal text-sm mb-1">
                      Correo Electrónico
                    </label>
                    <Input
                      type="email"
                      className="w-full"
                      value={docenteData.profesor.email}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block font-normal text-sm mb-1">
                      Teléfono
                    </label>
                    <Input
                      type="text"
                      className="w-full"
                      value={docenteData.telefono}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block font-normal text-sm mb-1">
                      Dirección
                    </label>
                    <Input
                      type="text"
                      className="w-full"
                      value={docenteData.direccion || ""}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block font-normal text-sm mb-1">
                      Categoría docente
                    </label>
                    <Input
                      type="text"
                      className="w-full"
                      value={docenteData.categoria_docente?.nombre}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block font-normal text-sm mb-1">
                      Condición
                    </label>
                    <Input
                      type="text"
                      className="w-full"
                      value={docenteData.condicion?.nombre}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-muted text-foreground"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : (
              <p>No se encontró información del docente.</p>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
