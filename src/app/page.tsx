import Link from "next/link";
import { productos } from "@/data/productos";
import { ProductoCard } from "@/components/ProductoCard";
import { ModoToggle } from "@/components/ModoToggle";
import { ComoComprar } from "@/components/ComoComprar";
import { MARCA, MINIMO_MAYORISTA } from "@/lib/config";

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
      <section className="border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
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

      <section className="border-b border-borde">
        <div className="mx-auto grid max-w-6xl gap-px bg-borde sm:grid-cols-3">
          {BENEFICIOS.map((b) => (
            <div key={b.titulo} className="bg-background px-4 py-7 sm:px-6">
              <h3 className="text-sm font-semibold">{b.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-tenue">{b.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
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
      </section>

      <ComoComprar />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-borde bg-superficie p-8 sm:p-12">
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
      </section>
    </>
  );
}
