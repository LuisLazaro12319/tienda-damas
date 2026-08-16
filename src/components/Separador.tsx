/**
 * Separador decorativo: línea gruesa con brillo (glow) que se desvanece hacia
 * los costados, tipo haz de luz. Toma el color de acento, así que cambia junto
 * con la paleta elegida en el panel.
 */
export function Separador({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative w-full ${className}`}
      style={{ height: "26px" }}
    >
      {/* Halo difuminado (el brillo) */}
      <span
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
        style={{
          height: "9px",
          background:
            "linear-gradient(to right, transparent, var(--acento), transparent)",
          filter: "blur(5px)",
          opacity: 0.55,
        }}
      />
      {/* Línea nítida */}
      <span
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full"
        style={{
          height: "3px",
          background:
            "linear-gradient(to right, transparent, var(--acento), transparent)",
        }}
      />
    </div>
  );
}
