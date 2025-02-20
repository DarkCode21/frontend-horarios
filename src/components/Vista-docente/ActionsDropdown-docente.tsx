"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionsDropdownProps {
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionsDropdown({
  onViewDetails,
  onEdit,
  onDelete,
}: ActionsDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        (triggerRef.current && triggerRef.current.contains(e.target as Node)) ||
        (dropdownRef.current && dropdownRef.current.contains(e.target as Node))
      ) {
        return;
      }
      setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!dropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 176 + window.scrollX, 
      });
    }
    setDropdownOpen((prev) => !prev);
  };

  const dropdownContent = (
    <div
      ref={dropdownRef}
      className="
        absolute z-50 bg-card text-card-foreground 
        divide-y divide-border rounded-lg shadow w-44
      "
      style={{ top: position.top, left: position.left }}
    >
      <ul className="py-2 text-sm">
        <li>
          <button
            onClick={() => {
              onViewDetails?.();
              setDropdownOpen(false);
            }}
            className="
              flex items-center w-full px-4 py-2 text-left
              hover:bg-muted hover:text-muted-foreground transition
            "
          >
            <FiEye className="mr-2" />
            Ver detalles
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onEdit?.();
              setDropdownOpen(false);
            }}
            className="
              flex items-center w-full px-4 py-2 text-left
              hover:bg-muted hover:text-muted-foreground transition
            "
          >
            <FiEdit className="mr-2" />
            Editar docente
          </button>
        </li>
      </ul>
      <div className="py-1">
        <button
          onClick={() => {
            onDelete?.();
            setDropdownOpen(false);
          }}
          className="
            flex items-center w-full px-4 py-2 text-left text-sm
            hover:bg-destructive hover:text-destructive-foreground transition text-red-600
          "
        >
          <FiTrash2 className="mr-2" />
          Eliminar docente
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        className="h-8 w-8 flex items-center justify-center"
      >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Abrir menú</span>
      </button>
      {dropdownOpen && ReactDOM.createPortal(dropdownContent, document.body)}
    </div>
  );
}
