import { BASE_PATH } from "@/lib/config";

/**
 * Sección a todo el ancho con una imagen de fondo opcional y un velo encima
 * para que el contenido (prendas, textos) se lea bien en claro y oscuro.
 * Si `fondo` viene vacío, se comporta como una sección normal.
 */
export function SeccionConFondo({
  fondo,
  className = "",
  children,
}: {
  fondo?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`relative isolate ${className}`}>
      {fondo ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{
              backgroundImage: `url(${BASE_PATH}/${fondo})`,
              // Desvanece la foto arriba y abajo para que no corte en una
              // línea recta que compita con el separador de luz.
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, #000 56px, #000 calc(100% - 56px), transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, #000 56px, #000 calc(100% - 56px), transparent)",
            }}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-background/75" />
        </>
      ) : null}
      {children}
    </section>
  );
}
