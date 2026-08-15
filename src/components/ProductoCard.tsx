"use client";

import Link from "next/link";
import { useTienda } from "@/context/TiendaContext";
import { PrendaPlaceholder } from "@/components/PrendaPlaceholder";
import { precio } from "@/lib/formato";
import type { Producto } from "@/lib/types";

export function ProductoCard({ producto }: { producto: Producto }) {
  const { modo, precioDe } = useTienda();
  const valor = precioDe(producto);
  const ahorro = producto.precioMinorista - producto.precioMayorista;

  return (
    <Link
      href={`/productos/${producto.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-borde bg-superficie transition-colors hover:border-acento/60"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
          <PrendaPlaceholder
            categoria={producto.categoria}
            hex={producto.colores[0].hex}
            nombre={producto.nombre}
          />
        </div>
        {producto.sinStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/65">
            <span className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-widest">
              Sin stock
            </span>
          </div>
        )}
        {modo === "mayorista" && !producto.sinStock && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-acento px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            −{Math.round((ahorro / producto.precioMinorista) * 100)}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h3 className="text-sm leading-snug font-medium">{producto.nombre}</h3>

        <div className="mt-auto pt-1.5">
          <p className="text-base font-semibold text-acento">{precio(valor)}</p>
          {modo === "mayorista" ? (
            <p className="text-xs text-tenue">
              por unidad ·{" "}
              <s className="opacity-60">{precio(producto.precioMinorista)}</s>
            </p>
          ) : (
            <p className="text-xs text-tenue">
              {producto.colores.length} colores · {producto.talles.length} talles
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
