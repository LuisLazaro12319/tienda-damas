"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTienda } from "@/context/TiendaContext";
import { PrendaPlaceholder } from "@/components/PrendaPlaceholder";
import { CintaAgotado } from "@/components/CintaAgotado";
import { CintaOferta } from "@/components/CintaOferta";
import { precio } from "@/lib/formato";
import { linkConsulta } from "@/lib/whatsapp";
import { MINIMO_MAYORISTA, BASE_PATH } from "@/lib/config";
import type { Producto } from "@/lib/types";

export function FichaProducto({ producto }: { producto: Producto }) {
  const { modo, precioDe, agregar } = useTienda();
  const [talle, setTalle] = useState<string | null>(
    producto.talles.length === 1 ? producto.talles[0] : null,
  );
  const [color, setColor] = useState(producto.colores[0]);
  const [cantidad, setCantidad] = useState(modo === "mayorista" ? MINIMO_MAYORISTA : 1);
  const [agregado, setAgregado] = useState(false);

  const unitario = precioDe(producto);
  const faltaElegirTalle = talle === null;

  // Foto grande: la del color elegido si tiene; si no, la principal del producto.
  const fotoPrincipal = color.foto
    ? `${BASE_PATH}/prod/${color.foto}`
    : producto.foto
      ? `${BASE_PATH}/prod/${producto.slug}.jpg`
      : null;

  function handleAgregar() {
    if (!talle || producto.sinStock) return;
    agregar({ slug: producto.slug, talle, color: color.nombre, cantidad });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2500);
  }

  return (
    <div className="mt-6 grid gap-10 md:grid-cols-2">
      <div>
        <div className="relative overflow-hidden rounded-2xl border border-borde">
          {producto.sinStock && <CintaAgotado />}
          {producto.oferta && !producto.sinStock && <CintaOferta />}
          <div className="aspect-[4/5]">
            {fotoPrincipal ? (
              <Image
                src={fotoPrincipal}
                alt={`${producto.nombre} — ${color.nombre}`}
                width={640}
                height={800}
                className="h-full w-full object-cover"
              />
            ) : (
              <PrendaPlaceholder
                categoria={producto.categoria}
                hex={color.hex}
                nombre={producto.nombre}
              />
            )}
          </div>
        </div>

        {/* Galería: una miniatura por color. Tocarla cambia la foto grande. */}
        <div className="mt-3 flex flex-wrap gap-3">
          {producto.colores.map((c) => {
            const src = c.foto ? `${BASE_PATH}/prod/${c.foto}` : null;
            const activo = color.nombre === c.nombre;
            return (
              <button
                key={c.nombre}
                type="button"
                onClick={() => setColor(c)}
                aria-label={c.nombre}
                aria-pressed={activo}
                className={`h-20 w-16 overflow-hidden rounded-none border-2 transition-colors ${
                  activo ? "border-acento" : "border-borde hover:border-tenue"
                }`}
              >
                {src ? (
                  <Image src={src} alt={c.nombre} width={128} height={160} className="h-full w-full object-cover" />
                ) : (
                  <PrendaPlaceholder categoria={producto.categoria} hex={c.hex} nombre="" />
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-tenue">
          Tocá un color y la foto cambia. Cada color puede tener su propia foto.
        </p>
      </div>

      <div>
        <h1 className="titulo-display text-3xl sm:text-4xl">{producto.nombre}</h1>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-3xl font-semibold text-acento">
            {precio(unitario)}
          </span>
          {modo === "mayorista" && (
            <>
              <s className="text-tenue">{precio(producto.precioMinorista)}</s>
              <span className="text-sm text-tenue">por unidad</span>
            </>
          )}
        </div>

        {modo === "mayorista" && (
          <p className="mt-2 text-sm text-tenue">
            Precio mayorista · mínimo {MINIMO_MAYORISTA} prendas en total
          </p>
        )}

        {producto.sinStock ? (
          <div className="mt-8 rounded-xl border border-borde bg-superficie p-5">
            <p className="font-medium">Sin stock por el momento</p>
            <p className="mt-1 text-sm text-tenue">
              Consultanos y te avisamos cuando vuelva.
            </p>
            <a
              href={linkConsulta(producto, modo)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-none border border-borde px-5 py-2.5 text-sm transition-colors hover:border-acento"
            >
              Consultar por WhatsApp
            </a>
          </div>
        ) : (
          <>
            <Bloque titulo="Color" valor={color.nombre}>
              <div className="flex flex-wrap gap-2.5">
                {producto.colores.map((c) => (
                  <button
                    key={c.nombre}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-label={c.nombre}
                    aria-pressed={color.nombre === c.nombre}
                    className={`h-9 w-9 rounded-none border-2 transition-colors ${
                      color.nombre === c.nombre
                        ? "border-acento"
                        : "border-borde hover:border-tenue"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </Bloque>

            <Bloque titulo="Talle">
              <div className="flex flex-wrap gap-2.5">
                {producto.talles.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTalle(t)}
                    aria-pressed={talle === t}
                    className={`min-w-12 rounded-none border px-3.5 py-2 text-sm transition-colors ${
                      talle === t
                        ? "border-acento bg-acento text-white"
                        : "border-borde text-tenue hover:border-tenue hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Bloque>

            <Bloque titulo="Cantidad">
              <div className="inline-flex items-center rounded-none border border-borde">
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  className="px-4 py-2 text-lg text-tenue hover:text-foreground"
                  aria-label="Restar uno"
                >
                  −
                </button>
                <span className="w-12 text-center tabular-nums">{cantidad}</span>
                <button
                  type="button"
                  onClick={() => setCantidad((c) => c + 1)}
                  className="px-4 py-2 text-lg text-tenue hover:text-foreground"
                  aria-label="Sumar uno"
                >
                  +
                </button>
              </div>
            </Bloque>

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAgregar}
                disabled={faltaElegirTalle}
                className="rounded-none bg-acento px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {faltaElegirTalle
                  ? "Elegí un talle"
                  : `Agregar — ${precio(unitario * cantidad)}`}
              </button>

              {agregado && (
                <Link
                  href="/carrito"
                  className="rounded-none border border-acento px-7 py-3.5 text-center text-sm font-medium text-acento"
                >
                  ✓ Agregado · Ir a mi pedido
                </Link>
              )}
            </div>
          </>
        )}

      </div>

      {producto.descripcion && (
        <div className="mt-4 border-t border-borde pt-8 md:col-span-2">
          <h2 className="text-lg font-semibold">Descripción:</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-tenue whitespace-pre-line">
            {producto.descripcion}
          </p>
        </div>
      )}
    </div>
  );
}

function Bloque({
  titulo,
  valor,
  children,
}: {
  titulo: string;
  valor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <h3 className="mb-3 text-sm font-medium">
        {titulo}
        {valor && <span className="ml-2 text-tenue">{valor}</span>}
      </h3>
      {children}
    </div>
  );
}
