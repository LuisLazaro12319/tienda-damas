"use client";

import { useTienda } from "@/context/TiendaContext";

interface ModoToggleProps {
  tamano?: "sm" | "md" | "lg";
}

export function ModoToggle({ tamano = "md" }: ModoToggleProps) {
  const { modo, setModo } = useTienda();

  const tamanos = {
    sm: "text-xs px-2.5 py-1 gap-1",
    md: "text-xs px-3 py-1.5 gap-1.5",
    lg: "text-sm px-4 py-2.5 gap-2",
  };

  return (
    <div className="inline-flex rounded-none border border-borde bg-superficie/80 p-1 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setModo("minorista")}
        className={`rounded-none font-bold uppercase tracking-wider transition-all duration-200 ${
          tamanos[tamano]
        } ${
          modo === "minorista"
            ? "bg-foreground text-background shadow-sm"
            : "text-tenue hover:text-foreground"
        }`}
      >
        Minorista
      </button>
      <button
        type="button"
        onClick={() => setModo("mayorista")}
        className={`rounded-none font-bold uppercase tracking-wider transition-all duration-200 ${
          tamanos[tamano]
        } ${
          modo === "mayorista"
            ? "bg-acento text-black shadow-sm"
            : "text-tenue hover:text-foreground"
        }`}
      >
        Mayorista
      </button>
    </div>
  );
}
