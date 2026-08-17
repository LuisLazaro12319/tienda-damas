import Link from "next/link";
import Image from "next/image";
import { productos } from "@/data/productos";
import { ProductoCard } from "@/components/ProductoCard";
import { ModoToggle } from "@/components/ModoToggle";
import { ComoComprar } from "@/components/ComoComprar";
import { Separador } from "@/components/Separador";
import { SeccionConFondo } from "@/components/SeccionConFondo";
import { PromosCarrusel } from "@/components/PromosCarrusel";
import { MARCA, MINIMO_MAYORISTA, BASE_PATH, FONDOS } from "@/lib/config";

const BENEFICIOS = [
  {
    titulo: "Fabricación propia",
    texto: "Producimos nuestras prendas. Sin intermediarios en el medio.",
  },
  {
    titulo: "Envíos a todo el país",
    texto: "Despachamos por correo a cualquier punto de Argentina.",
  },
  {
    titulo: `Mayorista desde ${MINIMO_MAYORISTA} prendas`,
    texto: "Cambiá a modo mayorista y mirá los precios por cantidad.",
  },
];

export default function Home() {
  const destacados = productos.filter((p) => p.destacado);

  return (
    <>
      <section className="relative overflow-hidden">
        <Image
          src={`${BASE_PATH}/fondo-inicio.jpg`}
          alt=""
          aria-hidden
          fill
          priority
          className="object-cover object-right"
        />
        {/* Degradé para que el texto se lea sobre el fondo, en claro y oscuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/25 sm:to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-44 lg:py-52">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-acento">
            Temporada Invierno · Venta por mayor
          </p>
          <h1 className="titulo-display max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            Ropa de damas y niñas
            <br />
            <span className="text-acento">directo de fábrica</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-tenue">
            Somos fabricantes. Elegí las prendas, armá tu pedido por mayor y lo
            cerramos por WhatsApp — con envíos a todas las provincias.
          </p>
        </div>
      </section>

      <Separador />

      <section>
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {BENEFICIOS.map((b) => (
            <div key={b.titulo}>
              <h3 className="text-sm font-semibold">{b.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-tenue">{b.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <Separador />

      <PromosCarrusel />

      <Separador />

      <SeccionConFondo fondo={FONDOS.destacados} className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="titulo-display text-2xl sm:text-3xl">Destacados</h2>
            <Link
              href="/productos"
              className="shrink-0 text-sm text-tenue transition-colors hover:text-foreground"
            >
              Ver todo →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {destacados.map((producto) => (
              <ProductoCard key={producto.slug} producto={producto} />
            ))}
          </div>
        </div>
      </SeccionConFondo>

      <Separador />

      <ComoComprar />

      <Separador />

      <SeccionConFondo fondo={FONDOS.compras} className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-2xl border border-borde bg-superficie p-8 sm:p-12">
          <h2 className="titulo-display text-2xl sm:text-3xl">
            ¿Comprás por cantidad?
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-tenue">
            Desde {MINIMO_MAYORISTA} prendas accedés a precios mayoristas.
            Cambiá el modo arriba y vas a ver los precios por unidad en todo el
            catálogo. Tu pedido se envía directo al canal mayorista.
          </p>
          <div className="mt-7">
            <ModoToggle tamano="lg" />
          </div>
        </div>
      </SeccionConFondo>
    </>
  );
}
