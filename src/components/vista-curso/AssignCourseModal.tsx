"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/utils/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AssignCourseModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AssignCourseModal({
  open,
  onClose,
}: AssignCourseModalProps) {
  const [animate, setAnimate] = useState(false);

  const [docentes, setDocentes] = useState<any[]>([]);
  const [aulas, setAulas] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [modalidades, setModalidades] = useState<any[]>([]);

  const [selectedDocente, setSelectedDocente] = useState("");
  const [selectedAula, setSelectedAula] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModalidad, setSelectedModalidad] = useState("");

  const fetchDocentes = async () => {
    try {
      const response = await api.get("/api/auth/Cursos/docentes");
      setDocentes(response.data);
    } catch (error) {
      console.error("Error al obtener docentes:", error);
    }
  };

  const fetchAulas = async () => {
    try {
      const response = await api.get("/api/auth/Cursos/aulas");
      setAulas(response.data);
    } catch (error) {
      console.error("Error al obtener aulas:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get("/api/auth/Cursos/cursos");
      setCourses(response.data);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  const fetchModalidades = async () => {
    try {
      const response = await api.get("/api/auth/Cursos/modalidades");
      setModalidades(response.data);
    } catch (error) {
      console.error("Error al obtener modalidades:", error);
    }
  };

  useEffect(() => {
    if (open) {
      setAnimate(true);
      fetchDocentes();
      fetchAulas();
      fetchCourses();
      fetchModalidades();
    }
  }, [open]);

  const handleSave = async () => {
    try {
      const payload = {
        modalidad_id: selectedModalidad,
        cursociclo_id: selectedCourse,
        infousuario_id: selectedDocente,
        aula_id: selectedAula,
      };

      const response = await api.post(
        "/api/auth/Cursos/asignarcursos",
        payload
      );
      console.log("Asignación exitosa:", response.data);

      onClose();
    } catch (error) {
      console.error("Error al asignar curso:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 !m-0 !p-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3 }}
        className="bg-card text-card-foreground p-6 rounded-xl shadow w-[600px]"
      >
        <h2 className="text-lg font-semibold mb-4">Asignar Curso</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Profesor</span>
              <Select
                value={selectedDocente}
                onValueChange={(value) => setSelectedDocente(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un profesor" />
                </SelectTrigger>
                <SelectContent>
                  {docentes.map((docente) => (
                    <SelectItem key={docente.id} value={String(docente.id)}>
                      {`${docente.nombre} ${docente.apellidoP}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Aula</span>
              <Select
                value={selectedAula}
                onValueChange={(value) => setSelectedAula(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un aula" />
                </SelectTrigger>
                <SelectContent>
                  {aulas.map((aula) => (
                    <SelectItem key={aula.id} value={String(aula.id)}>
                      {aula.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Curso</span>
              <Select
                value={selectedCourse}
                onValueChange={(value) => setSelectedCourse(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={String(course.id)}>
                      {course.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Modalidad</span>
              <Select
                value={selectedModalidad}
                onValueChange={(value) => setSelectedModalidad(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione modalidad" />
                </SelectTrigger>
                <SelectContent>
                  {modalidades.map((modalidad) => (
                    <SelectItem key={modalidad.id} value={String(modalidad.id)}>
                      {modalidad.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </motion.div>
    </div>
  );
}
