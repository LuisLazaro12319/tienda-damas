"use client";

import { useState } from "react";
import Link from "next/link";
import { productos, CATEGORIAS } from "@/data/productos";
import { precio } from "@/lib/formato";
import { MARCA } from "@/lib/config";

/* WhatsApp de contacto para activar el panel (número del desarrollador). */
const WA_CONTACTO = "5491156199449";

type Vista = "inicio" | "productos" | "categorias" | "web" | "colores" | "config";

const NAV: { id: Vista; nombre: string; icono: string }[] = [
  { id: "inicio", nombre: "Inicio", icono: "🏠" },
  { id: "productos", nombre: "Productos", icono: "👗" },
  { id: "categorias", nombre: "Categorías", icono: "🗂️" },
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

function Bloqueado() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button disabled className="cursor-not-allowed rounded-lg bg-borde px-5 py-2.5 text-sm font-semibold text-tenue">🔒 Guardar</button>
      <span className="text-xs text-tenue">Disponible cuando actives tu plan de panel</span>
    </div>
  );
}

function Acciones({ conMostrar = false }: { conMostrar?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="cursor-not-allowed rounded-md border border-borde bg-superficie px-2.5 py-1 text-xs font-medium text-tenue">✏️ Editar</span>
      <span className="cursor-not-allowed rounded-md border border-borde bg-superficie px-2.5 py-1 text-xs font-medium text-tenue">{conMostrar ? "👁️ Mostrar" : "🚫 Ocultar"}</span>
      <span className="cursor-not-allowed rounded-md border border-[#f3c9c4] bg-[#fdf2f1] px-2.5 py-1 text-xs font-medium text-[#c0392b]">🗑️ Eliminar</span>
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
        <main className="flex-1 px-4 py-6 sm:px-8">
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
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-tenue">Fotos del producto</label>
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-borde bg-superficie px-4 py-4 text-sm text-tenue">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-acento/15 text-xl">📷</span>
                    <span><span className="font-semibold text-acento">Subir fotos</span> — arrastrá o tocá para elegir desde el celular. Podés cargar varias.</span>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Campo label="Nombre" placeholder="Ej: Buzo Oversize Dama" />
                  <Campo label="Categoría" valor="Buzos" />
                  <Campo label="Precio minorista" placeholder="$ 0" />
                  <Campo label="Precio mayorista" placeholder="$ 0" />
                  <div className="sm:col-span-2"><Campo label="Descripción" area placeholder="Material, talles, colores disponibles…" /></div>
                  <Campo label="Talles" valor="S · M · L · XL" />
                  <Campo label="Destacar en la home" valor="No" />
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
                      {productos.slice(0, 8).map((p) => (
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
                              <span className="rounded-full bg-[#fdf2f1] px-2 py-0.5 text-xs font-semibold text-[#c0392b]">Sin stock</span>
                            ) : (
                              <span className="rounded-full bg-[#e6f6ec] px-2 py-0.5 text-xs font-semibold text-[#1c8a4d]">Publicado</span>
                            )}
                          </td>
                          <td className="py-2.5"><Acciones conMostrar={p.sinStock} /></td>
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

          {/* ===== INICIO DE LA WEB ===== */}
          {vista === "web" && (
            <div className="space-y-5">
              <div className="rounded-xl border border-borde bg-background p-6">
                <h2 className="mb-4 text-base font-semibold">Portada / Banner principal</h2>
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-tenue">Imagen de fondo</label>
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-borde bg-superficie px-4 py-4 text-sm text-tenue">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-acento/15 text-xl">🖼️</span>
                    <span><span className="font-semibold text-acento">Cambiar imagen</span> — la foto de fondo del inicio.</span>
                  </div>
                </div>
                <div className="grid gap-4">
                  <Campo label="Título" valor="Ropa de damas y niñas directo de fábrica" />
                  <Campo label="Bajada" area valor="Somos fabricantes. Elegí las prendas, armá tu pedido por mayor y lo cerramos por WhatsApp, con envíos a todas las provincias." />
                </div>
                <Bloqueado />
              </div>
            </div>
          )}

          {/* ===== COLORES Y TEMA ===== */}
          {vista === "colores" && (
            <div className="space-y-5">
              <div className="rounded-xl border border-borde bg-background p-6">
                <h2 className="mb-1 text-base font-semibold">Color principal</h2>
                <p className="mb-4 text-sm text-tenue">El color de los botones, precios y detalles de toda la tienda.</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { c: "#2ba6e8", n: "Celeste" },
                    { c: "#e5679a", n: "Rosa" },
                    { c: "#8b5cf6", n: "Violeta" },
                    { c: "#22b07d", n: "Verde" },
                    { c: "#f5b301", n: "Dorado" },
                    { c: "#12283d", n: "Azul noche" },
                  ].map((o, i) => (
                    <span key={o.c} className="cursor-not-allowed text-center">
                      <span
                        className={`block h-11 w-11 rounded-full ${i === 0 ? "ring-2 ring-offset-2 ring-offset-background" : ""}`}
                        style={{ backgroundColor: o.c, ...(i === 0 ? { boxShadow: "0 0 0 2px var(--acento)" } : {}) }}
                      />
                      <span className="mt-1 block text-[11px] text-tenue">{o.n}</span>
                    </span>
                  ))}
                </div>
                <Bloqueado />
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
