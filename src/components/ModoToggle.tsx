"use client";

import { useTienda } from "@/context/TiendaContext";
import type { Modo } from "@/lib/types";

const OPCIONES: { id: Modo; nombre: string }[] = [
  { id: "minorista", nombre: "Minorista" },
  { id: "mayorista", nombre: "Mayorista" },
];

export function ModoToggle({ tamano = "sm" }: { tamano?: "sm" | "lg" }) {
  const { modo, setModo } = useTienda();
  const grande = tamano === "lg";

  return (
    <div
      className={`inline-flex rounded-full border border-borde bg-superficie ${grande ? "p-1.5" : "p-1"}`}
      role="group"
      aria-label="Tipo de compra"
    >
      {OPCIONES.map((opcion) => {
        const activo = modo === opcion.id;
        return (
          <button
            key={opcion.id}
            type="button"
            onClick={() => setModo(opcion.id)}
            aria-pressed={activo}
            className={`rounded-full font-medium transition-colors ${
              grande ? "px-6 py-2.5 text-sm" : "px-3.5 py-1.5 text-xs"
            } ${
              activo
                ? "bg-acento text-white"
                : "text-tenue hover:text-foreground"
            }`}
          >
            {opcion.nombre}
          </button>
        );
      })}
    </div>
  );
}
