"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@radix-ui/react-checkbox";

interface AddCourseModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddCourseModal({ open, onClose }: AddCourseModalProps) {
  const [animate, setAnimate] = useState(false);

  const [name, setName] = useState("");
  const [cycle, setCycle] = useState("I");
  const [modalities, setModalities] = useState<string[]>([]);
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  if (!open) return null;

  const handleModalitiesChange = (option: string) => {
    if (modalities.includes(option)) {
      setModalities((prev) => prev.filter((m) => m !== option));
    } else {
      setModalities((prev) => [...prev, option]);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const newCourse = {
      name,
      cycle,
      modalities,
      credits,
    };
    console.log("Nuevo curso:", newCourse);

    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 !m-0 !p-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3 }}
        className="
          bg-card text-card-foreground p-6 rounded-xl shadow w-[500px]
          relative transform
        "
      >
        <h2 className="text-lg font-semibold mb-4">Agregar Curso</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <span className="text-sm text-muted-foreground">
              Nombre del curso
            </span>
            <Input
              type="text"
              className="w-full "
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Sistemas Operativos"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <span className="text-sm text-muted-foreground">Ciclo</span>
            <Select defaultValue="I">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="I">I</SelectItem>
                <SelectItem value="II">II</SelectItem>
                <SelectItem value="III">III</SelectItem>
                <SelectItem value="IV">IV</SelectItem>
                <SelectItem value="V">V</SelectItem>
                <SelectItem value="VI">VI</SelectItem>
                <SelectItem value="VII">VII</SelectItem>
                <SelectItem value="VIII">VIII</SelectItem>
                <SelectItem value="IX">IX</SelectItem>
                <SelectItem value="X">X</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Modalidades</span>
            <div className="flex flex-col gap-1">
              <label className="flex items-center text-sm">
                <Checkbox />
                Teoría
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={modalities.includes("Práctica")}
                  onChange={() => handleModalitiesChange("Práctica")}
                  className="mr-2"
                />
                Práctica
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={modalities.includes("Laboratorio")}
                  onChange={() => handleModalitiesChange("Laboratorio")}
                  className="mr-2"
                />
                Laboratorio
              </label>
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Créditos</span>
            <Input
              type="number"
              value={credits}
              onChange={(e) => setCredits(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading && <FiLoader className="mr-2 animate-spin" />}
            {isLoading ? "Guardando" : "Guardar"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
