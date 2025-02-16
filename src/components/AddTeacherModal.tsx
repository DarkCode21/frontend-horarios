"use client";

import React, { useState, useEffect } from "react";
import { FiCamera, FiLoader } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddTeacherModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ open, onClose }) => {
  const [animate, setAnimate] = useState(false);

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [categoria, setCategoria] = useState("Tiempo Completo");
  const [condicion, setCondicion] = useState("Principal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      const localURL = URL.createObjectURL(file);
      setPreviewURL(localURL);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newTeacher = {
      nombres,
      apellidos,
      telefono,
      direccion,
      categoria,
      condicion,
      email,
      password,
    };

    console.log("Nuevo docente:", newTeacher);

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
        <h2 className="text-lg font-semibold mb-4">Agregar Docente</h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 relative group cursor-pointer">
              <img
                src={previewURL || "/images/perfil.avif"}
                alt="Foto perfil"
                className="rounded-full w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <FiCamera size={30} color="white" />
              </div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-normal text-sm mb-1">Nombres</label>
              <Input
                type="text"
                className="w-full"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Nombres Completos"
              />
            </div>
            <div>
              <label className="block font-normal text-sm mb-1">
                Apellidos
              </label>
              <Input
                type="text"
                className="w-full"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Apellidos completos"
              />
            </div>

            <div>
              <label className="block font-normal text-sm mb-1">
                Correo Electrónico
              </label>
              <Input
                type="email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@gmail.com"
              />
            </div>
            <div>
              <label className="block font-normal text-sm mb-1">
                Contraseña
              </label>
              <Input
                type="password"
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
            </div>

            <div>
              <label className="block font-normal text-sm mb-1">Teléfono</label>
              <Input
                type="text"
                className="w-full"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="987654321"
              />
            </div>
            <div>
              <label className="block font-normal text-sm mb-1">
                Dirección
              </label>
              <Input
                type="text"
                className="w-full"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección (opcional)"
              />
            </div>

            <div>
              <span className="text-sm text-muted-foreground">
                Categoría docente
              </span>
              <Select defaultValue="Tiempo completo">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tiempo completo">
                    Tiempo completo
                  </SelectItem>
                  <SelectItem value="Tiempo parcial">Tiempo parcial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Condición</span>
              <Select defaultValue="Principal">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Principal">Principal</SelectItem>
                  <SelectItem value="Asociado">Asociado</SelectItem>
                  <SelectItem value="Auxiliar">Auxiliar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-muted text-foreground"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"
            >
              {isLoading && <FiLoader className="mr-2 animate-spin" />}
              {isLoading ? "Guardando" : "Guardar"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTeacherModal;
