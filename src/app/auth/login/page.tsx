"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { FiLoader } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axios";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });
      const { token } = response.data;

      localStorage.setItem("token", token);

      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[400px]">
      <div className="flex justify-end space-x-2 items-center">
        <span className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?
        </span>
        <Link
          href="/auth/register"
          className="bg-muted hover:bg-gray-200 py-2 px-3 rounded-xl text-sm"
        >
          Registrar
        </Link>
      </div>

      <div className="mt-32 space-y-2 text-center">
        <h1 className="text-3xl font-bold text-primary">Iniciar Sesión</h1>
        <p className="text-sm text-muted-foreground">
          Bienvenido a UNT, ingrese sus datos de inicio de sesión a continuación
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleLogin}>
        {error && (
          <div className="p-2 bg-red-100 text-red-600 text-sm rounded">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Correo electrónico"
            autoComplete="email"
            className="py-6 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            className="py-6 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-center font-semibold py-1">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading && <FiLoader className="mr-2 animate-spin" />}
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-8 text-muted-foreground">O</span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full py-6 rounded-lg"
        >
          <img src="/google.svg" alt="Google Logo" className="w-6 h-6" />
          Iniciar sesión con Google
        </Button>
      </form>
    </div>
  );
}
