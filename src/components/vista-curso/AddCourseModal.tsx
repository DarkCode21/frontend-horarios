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

interface AddCourseModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddCourseModal({ open, onClose }: AddCourseModalProps) {
  const [animate, setAnimate] = useState(false);
  const [cycles, setCycles] = useState<{ id: number; nombre: string }[]>([]);
  const [courses, setCourses] = useState<{ id: number; nombre: string }[]>([]);
  const [selectedCycle, setSelectedCycle] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const fetchCycles = async () => {
    try {
      const response = await api.get<{ id: number; nombre: string }[]>(
        "/api/auth/Cursos/cicloPeriodos"
      );
      setCycles(response.data);
    } catch (error) {
      console.error("Error al obtener ciclos:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get<{ id: number; nombre: string }[]>(
        "/api/auth/Cursos/cursos"
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  useEffect(() => {
    if (open) {
      setAnimate(true);
      fetchCycles();
      fetchCourses();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 !m-0 !p-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3 }}
        className="bg-card text-card-foreground p-6 rounded-xl shadow w-[500px]"
      >
        <h2 className="text-lg font-semibold mb-4">Agregar Curso</h2>

        <div className="mb-4">
          <span className="text-sm text-muted-foreground">Ciclo</span>
          <Select value={selectedCycle} onValueChange={setSelectedCycle}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un ciclo" />
            </SelectTrigger>
            <SelectContent>
              {cycles.map((cycle) => (
                <SelectItem key={cycle.id} value={cycle.nombre}>
                  {cycle.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => console.log(selectedCycle, selectedCourse)}>
            Guardar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
