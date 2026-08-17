import type { Metadata } from "next";
import { productos } from "@/data/productos";
import { Catalogo } from "@/components/Catalogo";
import { SeccionConFondo } from "@/components/SeccionConFondo";
import { FONDOS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Buzos, hoodies, sweaters y pantalones oversize. Precios minoristas y mayoristas.",
};

export default function ProductosPage() {
  return (
    <SeccionConFondo fondo={FONDOS.productos} className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="titulo-display text-3xl sm:text-4xl">Productos</h1>
        <p className="mt-2 text-tenue">
          {productos.length} prendas disponibles · Invierno 25
        </p>
        <Catalogo productos={productos} />
      </div>
    </SeccionConFondo>
  );
}
