"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORIAS } from "@/data/productos";
import { ProductoCard } from "@/components/ProductoCard";
import { ModoToggle } from "@/components/ModoToggle";
import type { Categoria, Producto } from "@/lib/types";

type Filtro = Categoria | "todos" | "ofertas";

export function Catalogo({ productos }: { productos: Producto[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const hayOfertas = useMemo(() => productos.some((p) => p.oferta), [productos]);

  // Solo mostramos categorías que efectivamente tienen productos cargados.
  const categorias = useMemo(
    () => CATEGORIAS.filter((c) => productos.some((p) => p.categoria === c.id)),
    [productos],
  );

  // Permite abrir el catálogo ya filtrado en Ofertas desde un link
  // (ej. /productos?ver=ofertas, usado por el carrusel de promos).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const ver = new URLSearchParams(window.location.search).get("ver");
    if (ver === "ofertas") setFiltro("ofertas");
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const visibles = useMemo(() => {
    if (filtro === "todos") return productos;
    if (filtro === "ofertas") return productos.filter((p) => p.oferta);
    return productos.filter((p) => p.categoria === filtro);
  }, [productos, filtro]);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <BotonFiltro activo={filtro === "todos"} onClick={() => setFiltro("todos")}>
            Todos
          </BotonFiltro>
          {hayOfertas && (
            <BotonFiltro activo={filtro === "ofertas"} onClick={() => setFiltro("ofertas")}>
              🔥 Ofertas
            </BotonFiltro>
          )}
          {categorias.map((c) => (
            <BotonFiltro
              key={c.id}
              activo={filtro === c.id}
              onClick={() => setFiltro(c.id)}
            >
              {c.nombre}
            </BotonFiltro>
          ))}
        </div>
        <ModoToggle />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {visibles.map((producto) => (
          <ProductoCard key={producto.slug} producto={producto} />
        ))}
      </div>

      {visibles.length === 0 && (
        <p className="mt-16 text-center text-tenue">
          No hay productos en esta categoría todavía.
        </p>
      )}
    </>
  );
}

function BotonFiltro({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`rounded-none border px-4 py-1.5 text-sm transition-colors ${
        activo
          ? "border-acento bg-acento text-white"
          : "border-borde text-tenue hover:border-tenue hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
