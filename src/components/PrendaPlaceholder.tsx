import type { Categoria } from "@/lib/types";

/**
 * Silueta de la prenda que se muestra mientras no haya fotos reales.
 * Cuando lleguen las fotos, este componente se reemplaza por <Image />
 * y no hay que tocar nada más.
 */
const SILUETAS: Record<Categoria, React.ReactNode> = {
  buzos: (
    <>
      <path d="M35 22 L18 30 L13 52 L24 55 L26 46 L26 84 L74 84 L74 46 L76 55 L87 52 L82 30 L65 22 Z" />
      <path d="M35 22 Q50 34 65 22" />
    </>
  ),
  hoodies: (
    <>
      <path d="M35 24 L18 32 L13 54 L24 57 L26 48 L26 86 L74 86 L74 48 L76 57 L87 54 L82 32 L65 24 Z" />
      <path d="M36 24 Q50 44 64 24" />
      <path d="M38 18 Q50 12 62 18 L65 24 Q50 34 35 24 Z" />
      <path d="M44 40 L44 56 M56 40 L56 56" />
    </>
  ),
  sweaters: (
    <>
      <path d="M34 24 L17 32 L12 54 L23 57 L26 48 L26 84 L74 84 L74 48 L77 57 L88 54 L83 32 L66 24 Z" />
      <path d="M34 24 Q50 32 66 24" />
      <path d="M30 40 L70 40 M30 52 L70 52 M30 64 L70 64" />
    </>
  ),
  pantalones: (
    <>
      <path d="M32 14 L68 14 L72 90 L54 90 L50 48 L46 90 L28 90 Z" />
      <path d="M32 22 L68 22" />
      <path d="M46 24 L50 44 L54 24" />
    </>
  ),
  remeras: (
    <>
      <path d="M36 26 L20 34 L15 50 L26 54 L27 46 L27 82 L73 82 L73 46 L74 54 L85 50 L80 34 L64 26 Z" />
      <path d="M36 26 Q50 38 64 26" />
    </>
  ),
  accesorios: (
    <>
      <path d="M28 62 Q50 70 72 62 L84 68 Q50 82 16 68 Z" />
      <path d="M30 62 Q30 30 50 30 Q70 30 70 62" />
    </>
  ),
};

export function PrendaPlaceholder({
  categoria,
  hex,
  nombre,
}: {
  categoria: Categoria;
  hex: string;
  nombre: string;
}) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: hex }}
      role="img"
      aria-label={`${nombre} — imagen de referencia`}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-3/5 w-3/5 opacity-25 mix-blend-luminosity"
        fill="none"
        stroke="#000"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {SILUETAS[categoria]}
      </svg>
      <span className="pointer-events-none absolute bottom-2 right-2.5 text-[9px] font-medium uppercase tracking-widest text-black/35">
        sin foto
      </span>
    </div>
  );
}
