"use client";

import { useEffect, useState } from "react";
import {
  PALETAS,
  ACENTO_DEFAULT,
  aplicarAcento,
  guardarAcento,
  leerAcento,
  restablecerAcento,
} from "@/lib/paleta";

export function SelectorPaleta() {
  const [acento, setAcento] = useState(ACENTO_DEFAULT);

  // Al montar, reflejamos el color guardado (si hay). El script del layout ya
  // lo aplicó antes de pintar; acá solo sincronizamos el estado del selector.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const guardado = leerAcento();
    if (guardado) setAcento(guardado);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function elegir(hex: string) {
    setAcento(hex);
    aplicarAcento(hex);
    guardarAcento(hex);
  }

  function restablecer() {
    restablecerAcento();
    setAcento(ACENTO_DEFAULT);
  }

  const esPreset = PALETAS.some((p) => p.hex.toLowerCase() === acento.toLowerCase());

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {PALETAS.map((o) => {
          const activo = o.hex.toLowerCase() === acento.toLowerCase();
          return (
            <button
              key={o.hex}
              type="button"
              onClick={() => elegir(o.hex)}
              aria-pressed={activo}
              aria-label={o.n}
              className="text-center"
            >
              <span
                className="block h-11 w-11 rounded-none transition-transform hover:scale-105"
                style={{
                  backgroundColor: o.hex,
                  boxShadow: activo
                    ? `0 0 0 2px var(--background), 0 0 0 4px ${o.hex}`
                    : "none",
                }}
              />
              <span className="mt-1 block text-[11px] text-tenue">{o.n}</span>
            </button>
          );
        })}

        {/* Rueda de color libre */}
        <label className="cursor-pointer text-center">
          <span
            className="relative block h-11 w-11 overflow-hidden rounded-none border border-borde"
            style={{
              background:
                "conic-gradient(#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)",
              boxShadow: !esPreset
                ? `0 0 0 2px var(--background), 0 0 0 4px ${acento}`
                : "none",
            }}
          >
            <input
              type="color"
              value={acento}
              onChange={(e) => elegir(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Elegir otro color"
            />
          </span>
          <span className="mt-1 block text-[11px] text-tenue">Otro</span>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-xs text-tenue">Color actual:</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-borde bg-superficie px-2 py-1 text-xs">
          <span className="h-4 w-4 rounded-full border border-borde" style={{ backgroundColor: acento }} />
          {acento.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={restablecer}
          className="text-xs text-tenue underline transition-colors hover:text-foreground"
        >
          Restablecer
        </button>
      </div>
    </div>
  );
}
