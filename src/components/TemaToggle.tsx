"use client";

import { useEffect, useState } from "react";

/**
 * Botón de modo claro / oscuro. Cambia el atributo data-theme en <html> y
 * guarda la preferencia en localStorage. El tema inicial lo aplica un script
 * en el layout, antes de pintar, para que no haya parpadeo.
 */
export function TemaToggle() {
  const [oscuro, setOscuro] = useState(false);
  const [listo, setListo] = useState(false);

  // Leemos el tema real del DOM (lo puso el script del layout) recién en el
  // cliente, para que el ícono coincida sin romper la hidratación.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setOscuro(document.documentElement.getAttribute("data-theme") === "dark");
    setListo(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function alternar() {
    const nuevo = !oscuro;
    setOscuro(nuevo);
    document.documentElement.setAttribute("data-theme", nuevo ? "dark" : "light");
    try {
      localStorage.setItem("tienda.tema", nuevo ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="flex h-9 w-9 items-center justify-center rounded-none border border-borde text-foreground transition-colors hover:border-acento"
    >
      {listo && oscuro ? (
        // Sol
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // Luna
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}
