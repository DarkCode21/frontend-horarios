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
                onValueChange={setSelectedDocente}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un profesor" />
                </SelectTrigger>
                <SelectContent>
                  {docentes.map((docente) => (
                    <SelectItem key={docente.id} value={docente.nombre}>
                      {`${docente.nombre} ${docente.apellidoP}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Aula</span>
              <Select value={selectedAula} onValueChange={setSelectedAula}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un aula" />
                </SelectTrigger>
                <SelectContent>
                  {aulas.map((aula) => (
                    <SelectItem key={aula.id} value={aula.nombre}>
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
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.nombre}>
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
                onValueChange={setSelectedModalidad}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione modalidad" />
                </SelectTrigger>
                <SelectContent>
                  {modalidades.map((modalidad) => (
                    <SelectItem key={modalidad.id} value={modalidad.nombre}>
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
          <Button
            onClick={() =>
              console.log(
                selectedDocente,
                selectedAula,
                selectedCourse,
                selectedModalidad
              )
            }
          >
            Guardar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
