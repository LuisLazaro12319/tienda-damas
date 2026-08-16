"use client";

import { useId } from "react";

/**
 * Separador decorativo tipo "pasto/picos" (zigzag). Toma el color de acento,
 * así que cambia junto con la paleta elegida en el panel. Se repite a lo ancho.
 */
export function Separador({ className = "" }: { className?: string }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = `sep-${raw}`;
  return (
    <div aria-hidden className={`w-full leading-[0] ${className}`}>
      <svg
        width="100%"
        height="17"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <pattern id={id} width="13" height="17" patternUnits="userSpaceOnUse">
            {/* Diente de sierra inclinado a la derecha: sube en diagonal larga
                y baja corto, así el pico queda apuntando a la derecha. */}
            <path
              d="M0 12 L10 3 L13 12"
              fill="none"
              stroke="var(--acento)"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M0 17 L10 8 L13 17"
              fill="none"
              stroke="var(--acento)"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.45"
            />
          </pattern>
        </defs>
        <rect width="100%" height="17" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
