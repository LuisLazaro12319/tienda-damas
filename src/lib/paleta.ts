/**
 * Paleta de la tienda: color de acento editable en vivo desde el panel.
 * Se aplica seteando la variable CSS --acento en <html> (pisa el valor de
 * globals.css) y se guarda en localStorage para que persista entre visitas.
 * Mismo patrón que el modo claro/oscuro de TemaToggle.
 */

export const CLAVE_ACENTO = "tienda.acento";

/** Colores sugeridos. El primero (Rosa) es el default del sitio. */
export const PALETAS: { n: string; hex: string }[] = [
  { n: "Rosa", hex: "#dd5498" },
  { n: "Celeste", hex: "#2ba6e8" },
  { n: "Violeta", hex: "#8b5cf6" },
  { n: "Verde", hex: "#22b07d" },
  { n: "Coral", hex: "#f76c5e" },
  { n: "Dorado", hex: "#e0a324" },
];

export const ACENTO_DEFAULT = PALETAS[0].hex;

/** Devuelve una versión más oscura del color (para --acento-fuerte). */
export function oscurecer(hex: string, factor = 0.15): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.round(((n >> 16) & 255) * (1 - factor));
  const g = Math.round(((n >> 8) & 255) * (1 - factor));
  const b = Math.round((n & 255) * (1 - factor));
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function aplicarAcento(hex: string): void {
  const root = document.documentElement;
  root.style.setProperty("--acento", hex);
  root.style.setProperty("--acento-fuerte", oscurecer(hex));
}

export function guardarAcento(hex: string): void {
  try {
    localStorage.setItem(CLAVE_ACENTO, hex);
  } catch {
    /* localStorage bloqueado: no pasa nada */
  }
}

export function leerAcento(): string | null {
  try {
    return localStorage.getItem(CLAVE_ACENTO);
  } catch {
    return null;
  }
}

/** Vuelve al color por defecto del sitio (rosa de globals.css, claro y oscuro). */
export function restablecerAcento(): void {
  const root = document.documentElement;
  root.style.removeProperty("--acento");
  root.style.removeProperty("--acento-fuerte");
  try {
    localStorage.removeItem(CLAVE_ACENTO);
  } catch {
    /* nada */
  }
}
