"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCamera, FiLoader } from "react-icons/fi";
import api from "@/utils/axios";
import Loader from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface EditTeacherModalProps {
  docenteId: number;
  onClose: () => void;
  onTeacherUpdated?: () => void;
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

interface Category {
  id: number;
  nombre: string;
}

interface Condition {
  id: number;
  nombre: string;
}

export default function EditTeacherModal({
  docenteId,
  onClose,
  onTeacherUpdated,
}: EditTeacherModalProps) {
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [nombres, setNombres] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [categoriaID, setCategoriaID] = useState("");
  const [condicionID, setCondicionID] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState("");

  const [categorias, setCategorias] = useState<Category[]>([]);
  const [condiciones, setCondiciones] = useState<Condition[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catResp, condResp] = await Promise.all([
          api.get<Category[]>("/api/auth/Docentes/categoriaDocente"),
          api.get<Condition[]>("/api/auth/Docentes/condicionDocente"),
        ]);
        setCategorias(catResp.data);
        setCondiciones(condResp.data);
      } catch (error) {
        console.error("Error al cargar cat/cond:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setAnimate(true);
    const fetchDocente = async () => {
      setLoading(true);
      try {
        const response = await api.get<VerDocenteResponse>(
          `/api/auth/Docentes/verDocente/${docenteId}`
        );
        const data = response.data;
        setNombres(data.nombre);
        setApellidoP(data.apellidoP);
        setTelefono(data.telefono);
        setDireccion(data.direccion || "");
        setEmail(data.profesor.email);

        if (data.categoria_docente) {
          setCategoriaID(String(data.categoria_docente.id));
        }
        if (data.condicion) {
          setCondicionID(String(data.condicion.id));
        }
        console.log("Datos del docente:", data);
        if (data.image_url) {
          setPreviewURL(data.image_url);
        }
      } catch (error) {
        console.error("Error al ver docente para editar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocente();
  }, [docenteId]);

  if (!docenteId) return null;

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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nombres", nombres);
      formData.append("apellidos", apellidoP);
      formData.append("telefono", telefono);
      formData.append("direccion", direccion);
      formData.append("email", email);
      formData.append("categoriaDocente", categoriaID);
      formData.append("condicion", condicionID);
      formData.append("rolusuario", "2");

      if (profileImage) {
        formData.append("image", profileImage);
      }

      const resp = await api.post(
        `/api/auth/Docentes/actualizarDocente/${docenteId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast({
        description: "Docente actualizado correctamente",
      });
      onTeacherUpdated?.();
      onClose();
    } catch (error) {
      console.error("Error al editar docente:", error);
      toast({
        description: "Error al editar docente.",
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
            <h2 className="text-lg font-semibold mb-4">Editar Docente</h2>
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
                {/* Nombre */}
                <div>
                  <label className="block font-normal text-sm mb-1">
                    Nombres
                  </label>
                  <Input
                    type="text"
                    className="w-full"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    required
                  />
                </div>
                {/* Apellidos */}
                <div>
                  <label className="block font-normal text-sm mb-1">
                    ApellidoP
                  </label>
                  <Input
                    type="text"
                    className="w-full"
                    value={apellidoP}
                    onChange={(e) => setApellidoP(e.target.value)}
                    required
                  />
                </div>
                {/* email */}
                <div>
                  <label className="block font-normal text-sm mb-1">
                    Correo
                  </label>
                  <Input
                    type="email"
                    className="w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* telefono */}
                <div>
                  <label className="block font-normal text-sm mb-1">
                    Teléfono
                  </label>
                  <Input
                    type="text"
                    className="w-full"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                </div>
                {/* direccion */}
                <div>
                  <label className="block font-normal text-sm mb-1">
                    Dirección
                  </label>
                  <Input
                    type="text"
                    className="w-full"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>
                {/* Categoria */}
                <div>
                  <label className="block font-normal text-sm mb-1">
                    Categoría docente
                  </label>
                  <Select value={categoriaID} onValueChange={setCategoriaID}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione categoría" />
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
                {/* Condición */}
                <div>
                  <label className="block font-normal text-sm mb-1">
                    Condición
                  </label>
                  <Select value={condicionID} onValueChange={setCondicionID}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione condición" />
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
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"
                >
                  {loading && <FiLoader className="mr-2 animate-spin" />}
                  Guardar
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
