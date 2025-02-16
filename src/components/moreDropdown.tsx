"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiSun,
  FiMoon,
  FiMonitor,
} from "react-icons/fi";
import { MoreHorizontal } from "lucide-react";

import api from "@/utils/axios";

type ThemeOption = "system" | "light" | "dark";

export default function MoreDropdown() {
  const router = useRouter();

  const [theme, setTheme] = useState<ThemeOption>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as ThemeOption | null;
      if (savedTheme) return savedTheme;

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const toggleThemeDropdown = () => setThemeDropdownOpen((prev) => !prev);

  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    setThemeDropdownOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      html.classList.remove("dark");

      if (theme === "dark") {
        html.classList.add("dark");
      } else if (theme === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (prefersDark) {
          html.classList.add("dark");
        }
      }

      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");

      localStorage.removeItem("token");

      router.push("/auth/login");
    } catch (error) {
      console.error("Error al hacer logout:", error);

      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="h-8 w-8 flex items-center justify-center"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {dropdownOpen && (
        <div
          className="
            absolute z-10 right-0 
            bottom-full mb-2
            bg-card text-card-foreground 
            divide-y divide-border
            rounded-lg shadow w-44
          "
        >
          <ul className="py-2 text-sm">
            <li>
              <button
                onClick={() => {
                  router.push("/dashboard/perfil");
                  setDropdownOpen(false);
                }}
                className="
                  flex items-center w-full px-4 py-2 text-left
                  hover:bg-muted hover:text-muted-foreground
                  transition
                "
              >
                <FiUser className="mr-2" />
                Perfil
              </button>
            </li>

            <li className="relative">
              <button
                onClick={toggleThemeDropdown}
                className="
                  flex items-center justify-between w-full px-4 py-2 text-left
                  hover:bg-muted hover:text-muted-foreground 
                  transition
                "
              >
                <span className="flex items-center">
                  <FiSettings className="mr-2" />
                  Tema
                </span>
                <FiChevronRight />
              </button>

              {themeDropdownOpen && (
                <ul
                  className="
                    absolute top-0 
                    left-full ml-2
                    bg-card text-card-foreground
                    divide-y divide-border
                    rounded-lg shadow w-44 z-10
                  "
                >
                  <li>
                    <button
                      onClick={() => handleThemeChange("system")}
                      className={`
                        flex items-center px-4 py-2 w-full text-left
                        ${
                          theme === "system" ? "font-semibold text-primary" : ""
                        }
                        hover:bg-muted hover:text-muted-foreground
                        transition
                      `}
                    >
                      <FiMonitor className="mr-2" />
                      Por defecto
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleThemeChange("light")}
                      className={`
                        flex items-center px-4 py-2 w-full text-left
                        ${theme === "light" ? "font-semibold text-primary" : ""}
                        hover:bg-muted hover:text-muted-foreground
                        transition
                      `}
                    >
                      <FiSun className="mr-2" />
                      Claro
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className={`
                        flex items-center px-4 py-2 w-full text-left
                        ${theme === "dark" ? "font-semibold text-primary" : ""}
                        hover:bg-muted hover:text-muted-foreground
                        transition
                      `}
                    >
                      <FiMoon className="mr-2" />
                      Oscuro
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <div className="py-1">
            <button
              onClick={() => {
                handleLogout();
                setDropdownOpen(false);
              }}
              className="
                flex items-center w-full px-4 py-2 text-left text-sm
                hover:bg-destructive hover:text-destructive-foreground
                transition
              "
            >
              <FiLogOut className="mr-2" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
