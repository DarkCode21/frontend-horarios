import Link from "next/link";
import {
  LayoutDashboard,
  Clock,
  Users,
  BookOpen,
  User,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import type React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        "pb-12 min-h-screen w-60 border-r bg-white relative",
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-6 px-4 text-3xl font-bold text-blue-600">UNT</h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Panel de control
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-500"
              asChild
            >
              <Link href="/dashboard/horarios">
                <Clock className="mr-2 h-4 w-4" />
                Horarios
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-500"
              asChild
            >
              <Link href="/dashboard/docentes">
                <Users className="mr-2 h-4 w-4" />
                Docentes
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-500"
              asChild
            >
              <Link href="/dashboard/cursos">
                <BookOpen className="mr-2 h-4 w-4" />
                Cursos
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-500"
              asChild
            >
              <Link href="/dashboard/usuarios">
                <User className="mr-2 h-4 w-4" />
                Usuarios
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 space-y-4">
        <div className="px-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-500"
            asChild
          >
            <Link href="#">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Link>
          </Button>
        </div>
        <div className="px-4 flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/images/perfil.avif" />
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Deyvi Villegas</p>
            <p className="text-xs text-slate-500 truncate">
              1452700120@unitru.edu.pe
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
