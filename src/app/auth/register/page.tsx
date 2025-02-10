"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-[400px]">
      <div className="flex justify-end space-x-2 items-center">
        <span className="text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?
        </span>
        <Link
          href="/auth/login"
          className="bg-muted hover:bg-gray-200 py-2 px-3 rounded-xl text-sm"
        >
          Iniciar Sesión
        </Link>
      </div>

      <div className="mt-32 space-y-2 text-center">
        <h1 className="text-3xl font-bold text-primary">Crear Cuenta</h1>
        <p className="text-sm text-muted-foreground">
          Bienvenido a UNT, complete el formulario para crear su cuenta
        </p>
      </div>

      <form className="mt-8 space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Correo electrónico"
            autoComplete="email"
            className="py-6 rounded-xl"
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Contraseña"
            autoComplete="new-password"
            className="py-6 rounded-xl"
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            autoComplete="new-password"
            className="py-6 rounded-xl"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary py-6 rounded-lg text-base"
        >
          Registrarse
        </Button>

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
          Registrarse con Google
        </Button>
      </form>
    </div>
  );
}
