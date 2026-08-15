"use client";

import Link from "next/link";
import { useTienda } from "@/context/TiendaContext";
import { ModoToggle } from "@/components/ModoToggle";
import { PrendaPlaceholder } from "@/components/PrendaPlaceholder";
import { precio } from "@/lib/formato";
import { linkPedido } from "@/lib/whatsapp";
import { MINIMO_MAYORISTA } from "@/lib/config";

export function Carrito() {
  const {
    lineas,
    unidades,
    total,
    modo,
    cambiarCantidad,
    quitar,
    vaciar,
    cumpleMinimo,
    faltanParaMayorista,
    listo,
  } = useTienda();

  if (!listo) {
    return <p className="mt-10 text-tenue">Cargando tu pedido…</p>;
  }

  if (lineas.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-borde bg-superficie p-10 text-center">
        <p className="text-tenue">Todavía no agregaste ninguna prenda.</p>
        <Link
          href="/productos"
          className="mt-6 inline-flex rounded-full bg-acento px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  const href = linkPedido(lineas, modo, total);

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-tenue">
          {unidades} {unidades === 1 ? "unidad" : "unidades"}
        </p>
        <ModoToggle />
      </div>

      <ul className="mt-6 divide-y divide-borde rounded-2xl border border-borde bg-superficie">
        {lineas.map((linea, i) => (
          <li key={`${linea.slug}-${linea.talle}-${linea.color}`} className="flex gap-4 p-4">
            <Link
              href={`/productos/${linea.slug}`}
              className="h-24 w-20 shrink-0 overflow-hidden rounded-lg"
            >
              <PrendaPlaceholder
                categoria={linea.producto.categoria}
                hex={
                  linea.producto.colores.find((c) => c.nombre === linea.color)
                    ?.hex ?? linea.producto.colores[0].hex
                }
                nombre={linea.producto.nombre}
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <Link
                href={`/productos/${linea.slug}`}
                className="text-sm font-medium hover:text-acento"
              >
                {linea.producto.nombre}
              </Link>
              <p className="mt-0.5 text-xs text-tenue">
                Talle {linea.talle} · {linea.color}
              </p>
              <p className="mt-0.5 text-xs text-tenue">
                {precio(linea.unitario)} c/u
              </p>

              <div className="mt-auto flex items-center gap-3 pt-2">
                <div className="inline-flex items-center rounded-lg border border-borde">
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(i, linea.cantidad - 1)}
                    className="px-3 py-1 text-tenue hover:text-foreground"
                    aria-label="Restar uno"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums">
                    {linea.cantidad}
                  </span>
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(i, linea.cantidad + 1)}
                    className="px-3 py-1 text-tenue hover:text-foreground"
                    aria-label="Sumar uno"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => quitar(i)}
                  className="text-xs text-tenue underline-offset-4 hover:text-foreground hover:underline"
                >
                  Quitar
                </button>
              </div>
            </div>

            <p className="shrink-0 text-sm font-semibold">{precio(linea.subtotal)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl border border-borde bg-superficie p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-tenue">Total</span>
          <span className="text-2xl font-semibold text-acento">
            {precio(total)}
          </span>
        </div>

        {modo === "mayorista" && !cumpleMinimo && (
          <p className="mt-4 rounded-lg border border-acento/40 bg-acento/10 px-4 py-3 text-sm text-acento">
            Te faltan {faltanParaMayorista}{" "}
            {faltanParaMayorista === 1 ? "prenda" : "prendas"} para llegar al
            mínimo mayorista de {MINIMO_MAYORISTA}.
          </p>
        )}

        <a
          href={cumpleMinimo ? href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!cumpleMinimo}
          className={`mt-5 flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold transition-opacity ${
            cumpleMinimo
              ? "bg-[#25D366] text-black hover:opacity-90"
              : "pointer-events-none bg-borde text-tenue"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Z" />
          </svg>
          {cumpleMinimo
            ? "Hacer el pedido por WhatsApp"
            : `Faltan ${faltanParaMayorista} prendas`}
        </a>

        <p className="mt-3 text-center text-xs leading-relaxed text-tenue">
          Se abre WhatsApp con tu pedido ya escrito. Coordinás pago y envío
          directo por el chat.
        </p>

        <div className="mt-5 flex justify-between text-xs">
          <Link href="/productos" className="text-tenue hover:text-foreground">
            ← Seguir comprando
          </Link>
          <button
            type="button"
            onClick={vaciar}
            className="text-tenue hover:text-foreground"
          >
            Vaciar pedido
          </button>
        </div>
      </div>
    </>
  );
}
