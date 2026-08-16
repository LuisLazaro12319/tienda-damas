"use client";

import { useState } from "react";
import Link from "next/link";
import { productos, CATEGORIAS } from "@/data/productos";
import { precio } from "@/lib/formato";
import { SelectorPaleta } from "@/components/SelectorPaleta";
import { MARCA, MINIMO_MAYORISTA, BASE_PATH, FONDOS, PROMOS } from "@/lib/config";

/* WhatsApp de contacto para activar el panel (número del desarrollador). */
const WA_CONTACTO = "5491156199449";

type Vista = "inicio" | "productos" | "categorias" | "promos" | "web" | "colores" | "config";

const NAV: { id: Vista; nombre: string; icono: string }[] = [
  { id: "inicio", nombre: "Inicio", icono: "🏠" },
  { id: "productos", nombre: "Productos", icono: "👗" },
  { id: "categorias", nombre: "Categorías", icono: "🗂️" },
  { id: "promos", nombre: "Promos", icono: "🔥" },
  { id: "web", nombre: "Inicio de la web", icono: "🖼️" },
  { id: "colores", nombre: "Colores y tema", icono: "🎨" },
  { id: "config", nombre: "Configuración", icono: "⚙️" },
];

/* Campo deshabilitado reutilizable (maqueta). */
function Campo({ label, valor, placeholder, area = false }: { label: string; valor?: string; placeholder?: string; area?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-tenue">{label}</label>
      {area ? (
        <textarea rows={3} disabled defaultValue={valor} placeholder={placeholder}
          className="w-full cursor-not-allowed resize-none rounded-lg border border-borde bg-superficie px-3.5 py-2.5 text-sm text-foreground placeholder:text-tenue/60" />
      ) : (
        <input disabled defaultValue={valor} placeholder={placeholder}
          className="w-full cursor-not-allowed rounded-lg border border-borde bg-superficie px-3.5 py-2.5 text-sm text-foreground placeholder:text-tenue/60" />
      )}
    </div>
  );
}

function IconoFoto() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m3 17 5-4 4 3 3-2 6 5" />
    </svg>
  );
}

/* Bloque UNIFICADO fotos + colores (demo real del formulario de carga).
   Color principal con varias fotos + otros colores con una foto cada uno. */
function BloqueFotosColores() {
  const PRINCIPAL = { hex: "#e5a7bd", n: "Rosa" };
  const [extras, setExtras] = useState([
    { hex: "#a9cfe8", n: "Celeste" },
    { hex: "#1c1c1c", n: "Negro" },
  ]);
  const [abierto, setAbierto] = useState(false);
  const [hex, setHex] = useState("#c4b0dd");
  const [nombre, setNombre] = useState("");

  function agregar() {
    setExtras((prev) => [...prev, { hex, n: nombre.trim() || "Color" }]);
    setNombre("");
    setHex("#c4b0dd");
    setAbierto(false);
  }

  function Pastilla({ hex, n }: { hex: string; n: string }) {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-borde bg-superficie py-1 pl-1 pr-2.5 text-xs">
        <span className="h-5 w-5 rounded-full border border-borde" style={{ backgroundColor: hex }} />
        {n}
      </span>
    );
  }

  return (
    <div className="rounded-xl border border-borde bg-superficie/40 p-4 sm:col-span-2">
      <h3 className="text-sm font-semibold">Fotos y colores</h3>
      <p className="mt-0.5 text-xs text-tenue">
        Cargá el <strong className="text-foreground">color principal</strong> con sus fotos y después sumá los otros colores. Todo va dentro de <strong className="text-foreground">este mismo producto</strong>.
      </p>

      {/* COLOR PRINCIPAL */}
      <div className="mt-4 rounded-lg border border-acento/40 bg-background p-3.5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-acento/15 px-2 py-0.5 text-[11px] font-semibold text-acento">Color principal</span>
          <span className="text-[11px] text-tenue">es el que se ve al abrir la prenda</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Pastilla hex={PRINCIPAL.hex} n={PRINCIPAL.n} />
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex h-14 w-12 items-center justify-center rounded-lg border border-dashed border-borde bg-superficie text-tenue">
                <IconoFoto />
              </span>
            ))}
            <span className="text-[11px] text-tenue">varias fotos<br />(frente, espalda…)</span>
          </div>
        </div>
      </div>

      {/* OTROS COLORES */}
      {extras.length > 0 && (
        <div className="mt-3 space-y-2">
          {extras.map((c, i) => (
            <div key={`${c.n}-${i}`} className="flex flex-wrap items-center gap-3 rounded-lg border border-borde bg-background p-2.5">
              <Pastilla hex={c.hex} n={c.n} />
              <span className="flex h-12 w-10 items-center justify-center rounded-lg border border-dashed border-borde bg-superficie text-tenue">
                <IconoFoto />
              </span>
              <span className="text-[11px] text-tenue">su foto</span>
              <button
                type="button"
                onClick={() => setExtras((prev) => prev.filter((_, j) => j !== i))}
                className="ml-auto text-tenue transition-colors hover:text-[#c0392b]"
                aria-label={`Quitar ${c.n}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* AGREGAR OTRO COLOR */}
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="mt-3 flex items-center gap-1.5 rounded-full border border-dashed border-acento px-3 py-1.5 text-xs font-medium text-acento transition-colors hover:bg-acento/10"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-dashed border-acento">+</span>
        Agregar otro color
      </button>

      {abierto && (
        <div className="mt-3 rounded-xl border border-acento/40 bg-background p-4">
          <p className="mb-3 text-xs font-semibold text-foreground">Nuevo color</p>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1 block text-[11px] text-tenue">Tono</label>
              <input type="color" value={hex} onChange={(e) => setHex(e.target.value)}
                className="h-10 w-14 cursor-pointer rounded-lg border border-borde bg-background p-1" />
            </div>
            <div className="min-w-[130px] flex-1">
              <label className="mb-1 block text-[11px] text-tenue">Nombre</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Lila"
                className="w-full rounded-lg border border-borde bg-background px-3 py-2 text-sm text-foreground placeholder:text-tenue/60" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-tenue">Foto de este color</label>
              <span className="flex items-center gap-2 rounded-lg border border-dashed border-borde bg-background px-3 py-2 text-xs text-tenue">
                📷 Subir
              </span>
            </div>
            <button type="button" onClick={agregar}
              className="rounded-lg bg-acento px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Agregar
            </button>
          </div>
          <p className="mt-3 flex items-center gap-2 text-[11px] text-tenue">
            <span className="inline-block h-4 w-4 rounded-full border border-borde" style={{ backgroundColor: hex }} />
            Al tocar este color en la tienda, la foto grande cambia a la de este color.
          </p>
        </div>
      )}
    </div>
  );
}

function PreviewFondo({ archivo, nota }: { archivo: string; nota: string }) {
  return (
    <div>
      <div
        className="relative mb-1.5 h-28 overflow-hidden rounded-lg border border-borde bg-cover bg-center"
        style={{ backgroundImage: `url(${BASE_PATH}/${archivo})` }}
      >
        <span className="absolute bottom-2 right-2 cursor-not-allowed rounded-lg bg-background/90 px-3 py-1.5 text-xs font-semibold text-acento">🖼️ Cambiar imagen</span>
      </div>
      <p className="text-[11px] text-tenue">{nota}</p>
    </div>
  );
}

function Bloqueado() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button disabled className="cursor-not-allowed rounded-lg bg-borde px-5 py-2.5 text-sm font-semibold text-tenue">🔒 Guardar</button>
      <span className="text-xs text-tenue">Disponible cuando actives tu plan de panel</span>
    </div>
  );
}

function Acciones({ agotado = false }: { agotado?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="cursor-not-allowed rounded-md border border-borde bg-superficie px-2.5 py-1 text-xs font-medium text-tenue">✏️ Editar</span>
      {agotado ? (
        <span className="cursor-not-allowed rounded-md border border-[#bfe6cd] bg-[#e6f6ec] px-2.5 py-1 text-xs font-medium text-[#1c8a4d]">✅ Reponer</span>
      ) : (
        <span className="cursor-not-allowed rounded-md border border-[#f3c9c4] bg-[#fdf2f1] px-2.5 py-1 text-xs font-medium text-[#c0392b]">🔴 Marcar agotado</span>
      )}
      <span className="cursor-not-allowed rounded-md border border-borde bg-superficie px-2.5 py-1 text-xs font-medium text-tenue">🗑️ Eliminar</span>
    </div>
  );
}

export function AdminPanel() {
  const [vista, setVista] = useState<Vista>("inicio");
  const tituloVista = NAV.find((n) => n.id === vista)!.nombre;

  return (
    <div className="min-h-screen bg-superficie/60">
      {/* Ribbon */}
      <div className="sticky top-0 z-30 bg-acento px-4 py-2.5 text-center text-sm font-semibold text-white">
        ℹ️ Vista previa del panel — así lo manejarías vos. La edición en vivo se activa al confirmar tu plan.
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 flex-col bg-[#12283d] p-5 text-white md:flex" style={{ minHeight: "calc(100vh - 44px)" }}>
          <div className="mb-8 text-lg font-extrabold italic tracking-tighter">{MARCA.nombre}</div>
          <nav className="flex flex-1 flex-col gap-1">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => setVista(n.id)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  vista === n.id ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                }`}>
                <span>{n.icono}</span> {n.nombre}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-lg border border-white/15 bg-white/5 p-3 text-xs leading-relaxed text-white/70">
            <b className="text-white">Modo vista previa.</b> Así verías tu panel para editar el sitio vos misma, sin depender de nadie.
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
          {/* Tabs mobile */}
          <div className="mb-5 flex gap-2 overflow-x-auto md:hidden">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => setVista(n.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium ${
                  vista === n.id ? "bg-acento text-white" : "border border-borde bg-background text-tenue"
                }`}>
                {n.nombre}
              </button>
            ))}
          </div>

          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="titulo-display text-2xl">{tituloVista}</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-acento/15 px-3 py-1 text-xs font-semibold text-acento">👁️ Vista previa</span>
          </div>

          {/* ===== INICIO ===== */}
          {vista === "inicio" && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { lbl: "Visitas al sitio", val: "128", ex: "Ej. últimos 30 días" },
                  { lbl: "Consultas por WhatsApp", val: "34", ex: "Ej. últimos 30 días" },
                  { lbl: "Productos publicados", val: String(productos.length), ex: "En " + CATEGORIAS.filter((c) => productos.some((p) => p.categoria === c.id)).length + " categorías" },
                ].map((s) => (
                  <div key={s.lbl} className="rounded-xl border border-borde bg-background p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-tenue">{s.lbl}</div>
                    <div className="titulo-display mt-1 text-3xl text-acento">{s.val}</div>
                    <div className="mt-0.5 text-xs text-tenue">{s.ex}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-borde bg-background p-6">
                <h2 className="mb-4 text-base font-semibold">Resumen</h2>
                <div className="divide-y divide-borde text-sm">
                  <div className="flex justify-between py-2.5"><span>👗 Productos activos</span><b>{productos.length}</b></div>
                  <div className="flex justify-between py-2.5"><span>🏷️ Destacados en la home</span><b>{productos.filter((p) => p.destacado).length}</b></div>
                  <div className="flex justify-between py-2.5"><span>📦 Sin stock</span><b>{productos.filter((p) => p.sinStock).length}</b></div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-acento to-[#1789cf] p-7 text-white">
                <div>
                  <h3 className="text-lg font-bold">¿Te gustaría manejar tu tienda así?</h3>
                  <p className="mt-1 text-sm text-white/85">Activamos el panel real para que edites productos, fotos, precios y el inicio, vos misma.</p>
                </div>
                <a href={`https://wa.me/${WA_CONTACTO}?text=${encodeURIComponent("Hola! Vi la vista previa del panel de la tienda y quiero saber más")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-white px-5 py-3 text-sm font-bold text-acento">💬 Consultar</a>
              </div>
            </div>
          )}

          {/* ===== PRODUCTOS ===== */}
          {vista === "productos" && (
            <div className="space-y-5">
              <div className="rounded-xl border border-borde bg-background p-6">
                <h2 className="mb-4 text-base font-semibold">Agregar producto</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Campo label="Nombre" placeholder="Ej: Buzo Oversize Dama" />
                  <Campo label="Categoría" valor="Buzos" />
                  <Campo label="Precio minorista" placeholder="$ 0" />
                  <Campo label="Precio mayorista" placeholder="$ 0" />
                  <div className="sm:col-span-2"><Campo label="Descripción" area placeholder="Material, composición, detalles…" /></div>
                  <Campo label="Talles" valor="S · M · L · XL" />
                  <Campo label="Destacar en la home" valor="No" />
                  <BloqueFotosColores />
                </div>
                <Bloqueado />
              </div>

              <div className="rounded-xl border border-borde bg-background p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold">Productos cargados</h2>
                  <span className="cursor-not-allowed rounded-lg bg-acento/90 px-3 py-1.5 text-xs font-semibold text-white">+ Agregar producto</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead className="border-b border-borde text-xs uppercase tracking-wide text-tenue">
                      <tr>
                        <th className="py-2.5 pr-3 font-medium">Producto</th>
                        <th className="py-2.5 pr-3 font-medium">Categoría</th>
                        <th className="py-2.5 pr-3 font-medium">Minorista</th>
                        <th className="py-2.5 pr-3 font-medium">Estado</th>
                        <th className="py-2.5 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borde">
                      {[...productos].sort((a, b) => (b.sinStock ? 1 : 0) - (a.sinStock ? 1 : 0)).slice(0, 8).map((p) => (
                        <tr key={p.slug}>
                          <td className="py-2.5 pr-3">
                            <div className="flex items-center gap-2.5">
                              <span className="h-9 w-9 shrink-0 rounded-md border border-borde" style={{ backgroundColor: p.colores[0].hex }} />
                              <span className="font-medium">{p.nombre}</span>
                            </div>
                          </td>
                          <td className="py-2.5 pr-3 text-tenue">{CATEGORIAS.find((c) => c.id === p.categoria)?.nombre}</td>
                          <td className="py-2.5 pr-3 font-semibold">{precio(p.precioMinorista)}</td>
                          <td className="py-2.5 pr-3">
                            {p.sinStock ? (
                              <span className="rounded-full bg-[#fdf2f1] px-2 py-0.5 text-xs font-semibold text-[#c0392b]">Agotado</span>
                            ) : (
                              <span className="rounded-full bg-[#e6f6ec] px-2 py-0.5 text-xs font-semibold text-[#1c8a4d]">Publicado</span>
                            )}
                          </td>
                          <td className="py-2.5"><Acciones agotado={p.sinStock} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== CATEGORÍAS ===== */}
          {vista === "categorias" && (
            <div className="rounded-xl border border-borde bg-background p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold">Categorías</h2>
                <span className="cursor-not-allowed rounded-lg bg-acento/90 px-3 py-1.5 text-xs font-semibold text-white">+ Agregar categoría</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[440px] text-left text-sm">
                  <thead className="border-b border-borde text-xs uppercase tracking-wide text-tenue">
                    <tr><th className="py-2.5 pr-3 font-medium">Categoría</th><th className="py-2.5 pr-3 font-medium">Productos</th><th className="py-2.5 pr-3 font-medium">Estado</th><th className="py-2.5 font-medium">Acciones</th></tr>
                  </thead>
                  <tbody className="divide-y divide-borde">
                    {CATEGORIAS.filter((c) => productos.some((p) => p.categoria === c.id)).map((c) => (
                      <tr key={c.id}>
                        <td className="py-2.5 pr-3 font-medium">{c.nombre}</td>
                        <td className="py-2.5 pr-3 text-tenue">{productos.filter((p) => p.categoria === c.id).length}</td>
                        <td className="py-2.5 pr-3"><span className="rounded-full bg-[#e6f6ec] px-2 py-0.5 text-xs font-semibold text-[#1c8a4d]">Publicado</span></td>
                        <td className="py-2.5"><Acciones /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== PROMOS ===== */}
          {vista === "promos" && (
            <div className="rounded-xl border border-borde bg-background p-6">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base font-semibold">Promos / Ofertas</h2>
                <span className="cursor-not-allowed rounded-lg bg-acento/90 px-3 py-1.5 text-xs font-semibold text-white">+ Agregar promo</span>
              </div>
              <p className="mb-4 text-sm text-tenue">Banners que se muestran arriba de Destacados. Si cargás más de uno, <strong className="text-foreground">rotan solos</strong>. Al tocar una promo, la clienta va directo a la <strong className="text-foreground">categoría Ofertas</strong> del catálogo y elige qué comprar.</p>
              <div className="space-y-3">
                {PROMOS.map((promo, i) => (
                  <div key={promo.imagen} className="flex flex-col gap-3 rounded-lg border border-borde bg-superficie p-3 sm:flex-row sm:items-center">
                    <div
                      className="h-24 w-full shrink-0 overflow-hidden rounded-md border border-borde bg-cover bg-center sm:w-56"
                      style={{ backgroundImage: `url(${BASE_PATH}/${promo.imagen})` }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{promo.titulo}</p>
                      <p className="text-xs text-tenue">Orden {i + 1} · lleva a Ofertas</p>
                    </div>
                    <Acciones />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-dashed border-acento bg-acento/5 px-4 py-5 text-sm text-tenue">
                <span className="text-xl">🖼️</span>
                <span><span className="font-semibold text-acento">Subir promo</span> — elegí el banner (ideal ancho, tipo cartel). Podés sumar varias y ordenarlas.</span>
              </div>
              <Bloqueado />
            </div>
          )}

          {/* ===== INICIO DE LA WEB ===== */}
          {vista === "web" && (
            <div className="space-y-5">
              <div className="rounded-xl border border-borde bg-background p-6">
                <h2 className="mb-4 text-base font-semibold">Portada / Banner principal</h2>
                <label className="mb-1.5 block text-xs font-medium text-tenue">Imagen de fondo</label>
                <div
                  className="relative mb-1.5 h-32 overflow-hidden rounded-lg border border-borde bg-cover bg-center"
                  style={{ backgroundImage: `url(${BASE_PATH}/fondo-inicio.jpg)` }}
                >
                  <span className="absolute bottom-2 right-2 cursor-not-allowed rounded-lg bg-background/90 px-3 py-1.5 text-xs font-semibold text-acento">🖼️ Cambiar imagen</span>
                </div>
                <p className="mb-4 text-[11px] text-tenue">Se ve detrás del texto del inicio.</p>
                <div className="grid gap-4">
                  <Campo label="Etiqueta de arriba" valor="Temporada Invierno · Venta por mayor" />
                  <Campo label="Título" valor="Ropa de damas y niñas directo de fábrica" />
                  <Campo label="Bajada" area valor="Somos fabricantes. Elegí las prendas, armá tu pedido por mayor y lo cerramos por WhatsApp, con envíos a todas las provincias." />
                </div>
                <Bloqueado />
              </div>

              <div className="rounded-xl border border-borde bg-background p-6">
                <h2 className="mb-1 text-base font-semibold">Fondos de secciones</h2>
                <p className="mb-4 text-sm text-tenue">Imágenes de fondo detrás de las prendas. Se ven suaves, con un velo encima para que las fotos resalten.</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-tenue">Detrás de “Destacados” (inicio)</label>
                    <PreviewFondo archivo={FONDOS.destacados} nota="Detrás de las prendas destacadas del inicio." />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-tenue">Detrás de “Todos los productos”</label>
                    <PreviewFondo archivo={FONDOS.productos} nota="Detrás del catálogo completo." />
                  </div>
                </div>
                <Bloqueado />
              </div>

              <div className="rounded-xl border border-borde bg-background p-6">
                <h2 className="mb-1 text-base font-semibold">Bloque “Comprás por cantidad”</h2>
                <p className="mb-4 text-sm text-tenue">El recuadro del final del inicio que invita a comprar por mayor.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Campo label="Título" valor="¿Comprás por cantidad?" />
                  <Campo label="Mínimo de prendas para precio mayorista" valor={String(MINIMO_MAYORISTA)} />
                  <div className="sm:col-span-2">
                    <Campo label="Texto" area valor={`Desde ${MINIMO_MAYORISTA} prendas accedés a precios mayoristas. Cambiá el modo arriba y vas a ver los precios por unidad en todo el catálogo.`} />
                  </div>
                </div>
                <p className="mt-3 rounded-lg bg-acento/10 px-3 py-2 text-[11px] text-tenue">
                  💡 El <strong className="text-foreground">mínimo mayorista</strong> lo definís vos. Se usa en todo el sitio: el catálogo, la ficha y el pedido por WhatsApp toman este número.
                </p>
                <Bloqueado />
              </div>
            </div>
          )}

          {/* ===== COLORES Y TEMA ===== */}
          {vista === "colores" && (
            <div className="space-y-5">
              <div className="rounded-xl border border-borde bg-background p-6">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold">Color principal</h2>
                  <span className="rounded-full bg-[#e6f6ec] px-2 py-0.5 text-[11px] font-semibold text-[#1c8a4d]">✨ En vivo</span>
                </div>
                <p className="mb-4 text-sm text-tenue">Elegí el color de los botones, precios y detalles de toda la tienda. Se cambia al instante y queda guardado.</p>
                <SelectorPaleta />
              </div>

              <div className="rounded-xl border border-borde bg-background p-6">
                <h2 className="mb-1 text-base font-semibold">Tema por defecto</h2>
                <p className="mb-4 text-sm text-tenue">Con qué modo abre la tienda. Igual, tus clientas pueden cambiar entre claro y oscuro con el botón 🌙 del sitio.</p>
                <div className="flex gap-3">
                  <span className="cursor-not-allowed rounded-lg border-2 border-acento bg-superficie px-4 py-2.5 text-sm font-semibold">☀️ Claro</span>
                  <span className="cursor-not-allowed rounded-lg border border-borde bg-superficie px-4 py-2.5 text-sm font-medium text-tenue">🌙 Oscuro</span>
                </div>
                <Bloqueado />
              </div>
            </div>
          )}

          {/* ===== CONFIGURACIÓN ===== */}
          {vista === "config" && (
            <div className="rounded-xl border border-borde bg-background p-6">
              <h2 className="mb-4 text-base font-semibold">Datos del negocio</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Campo label="Nombre de la marca" valor={MARCA.nombre} />
                <Campo label="WhatsApp" valor="+54 9 11 2355-5043" />
                <Campo label="Envíos" valor="A todas las provincias de Argentina" />
                <Campo label="Rubro" valor="Ropa de damas y niñas · Fábrica" />
                <div className="sm:col-span-2"><Campo label="Descripción" area valor={MARCA.descripcion} /></div>
              </div>
              <Bloqueado />
            </div>
          )}

          <p className="mt-8 text-center text-xs text-tenue">
            <Link href="/" className="underline underline-offset-4 hover:text-foreground">← Volver a la tienda</Link>
          </p>
        </main>
      </div>
    </div>
  );
}
