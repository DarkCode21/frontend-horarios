"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Clock,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Calendar,
  CalendarClock,
} from "lucide-react";
import type React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import MoreDropdown from "./moreDropdown";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DocenteSidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "pb-12 min-h-screen w-60 border-r bg-white relative",
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-6 px-4 text-3xl font-bold text-primary">UNT</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/docente" ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname !== "/docente" && "text-slate-500"
              )}
              asChild
            >
              <Link href="/docente">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Panel de control
              </Link>
            </Button>

            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-slate-500"
                >
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Horarios
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 space-y-1">
                <Button
                  variant={
                    pathname === "/docente/horarios/general"
                      ? "secondary"
                      : "ghost"
                  }
                  className={cn(
                    "w-full justify-start",
                    pathname !== "/docente/horarios/general" && "text-slate-500"
                  )}
                  asChild
                >
                  <Link href="/docente/horarios/general">
                    <Calendar className="mr-2 h-4 w-4" />
                    General
                  </Link>
                </Button>
                <Button
                  variant={
                    pathname === "/docente/horarios/mi-horario"
                      ? "secondary"
                      : "ghost"
                  }
                  className={cn(
                    "w-full justify-start",
                    pathname !== "/docente/horarios/mi-horario" &&
                      "text-slate-500"
                  )}
                  asChild
                >
                  <Link href="/docente/horarios/mi-horario">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    Mi horario
                  </Link>
                </Button>
              </CollapsibleContent>
            </Collapsible>

            <Button
              variant={
                pathname.startsWith("/docente/cursos") ? "secondary" : "ghost"
              }
              className={cn(
                "w-full justify-start",
                !pathname.startsWith("/docente/cursos") && "text-slate-500"
              )}
              asChild
            >
              <Link href="/docente/cursos">
                <BookOpen className="mr-2 h-4 w-4" />
                Mis Cursos
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 space-y-4">
        <div className="px-3">
          <Button
            variant={
              pathname === "/docente/configuracion" ? "secondary" : "ghost"
            }
            className="w-full justify-start text-slate-500"
            asChild
          >
            <Link href="/docente/preguntas-frecuentes">
              <HelpCircle className="mr-2 h-4 w-4" />
              Preguntas frecuentes
            </Link>
          </Button>
        </div>
        <div className="px-4 flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/images/perfil.avif" />
            <AvatarFallback>RG</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Link href="/docente/perfil" className="block">
              <p className="text-sm font-medium">Ricardo Guevara</p>
              <p className="text-xs text-slate-500 truncate">
                rguevara@unitru.edu.pe
              </p>
            </Link>
          </div>
          <MoreDropdown />
        </div>
      </div>
    </div>
  );
}
