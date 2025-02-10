"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
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
            autoComplete="current-password"
            className="py-6 rounded-xl"
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

        <Button
          type="submit"
          className="w-full bg-primary py-6 rounded-lg text-base"
        >
          Iniciar Sesión
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
          Iniciar sesión con Google
        </Button>
      </form>
    </div>
  );
}
