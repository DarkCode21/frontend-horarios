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
import api from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: number;
  nombre: string;
}

interface Condition {
  id: number;
  nombre: string;
}

interface AddTeacherModalProps {
  open: boolean;
  onClose: () => void;
  onTeacherCreated?: () => void;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({
  open,
  onClose,
  onTeacherCreated,
}) => {
  const [animate, setAnimate] = useState(false);

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [categoriaID, setCategoriaID] = useState<string>("");
  const [condicionID, setCondicionID] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [categorias, setCategorias] = useState<Category[]>([]);
  const [condiciones, setCondiciones] = useState<Condition[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get<Category[]>(
          "/api/auth/Docentes/categoriaDocente"
        );
        setCategorias(response.data);
        if (response.data.length > 0) {
          setCategoriaID(String(response.data[0].id));
        }
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    const fetchCondiciones = async () => {
      try {
        const response = await api.get<Condition[]>(
          "/api/auth/Docentes/condicionDocente"
        );
        setCondiciones(response.data);
        if (response.data.length > 0) {
          setCondicionID(String(response.data[0].id));
        }
      } catch (error) {
        console.error("Error al obtener condiciones:", error);
      }
    };

    fetchCategorias();
    fetchCondiciones();
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

    try {
      const formData = new FormData();
      formData.append("nombres", nombres);
      formData.append("apellidos", apellidos);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("telefono", telefono);
      formData.append("direccion", direccion);
      formData.append("rolusuario", "2");
      formData.append("categoriaDocente", categoriaID);
      formData.append("condicion", condicionID);

      if (profileImage) {
        formData.append("image", profileImage);
      }

      const response = await api.post(
        "/api/auth/Docentes/crearDocente",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Docente creado:", response.data);

      toast({
        description: "Docente creado correctamente.",
      });

      onTeacherCreated?.();

      onClose();
    } catch (error) {
      console.error("Error al crear docente:", error);
      toast({
        description: "Error al crear docente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 !m-0 !p-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={animate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3 }}
        className="bg-card text-card-foreground p-6 rounded-xl shadow w-[600px] relative transform"
      >
        <h2 className="text-lg font-semibold mb-4">Agregar Docente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-center">
            <div className="w-40 h-40 relative group cursor-pointer">
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
                required
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
                required
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
                required
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
                required
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
                required
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
              <label className="block font-normal text-sm mb-1">
                Categoría docente
              </label>
              <Select
                value={categoriaID}
                onValueChange={setCategoriaID}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block font-normal text-sm mb-1">
                Condición
              </label>
              <Select
                value={condicionID}
                onValueChange={setCondicionID}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona condición" />
                </SelectTrigger>
                <SelectContent>
                  {condiciones.map((cond) => (
                    <SelectItem key={cond.id} value={String(cond.id)}>
                      {cond.nombre}
                    </SelectItem>
                  ))}
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
