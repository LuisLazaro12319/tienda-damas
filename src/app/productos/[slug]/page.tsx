import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProducto, productos } from "@/data/productos";
import { FichaProducto } from "@/components/FichaProducto";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) return { title: "Producto no encontrado" };
  return { title: producto.nombre, description: producto.descripcion };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/productos"
        className="text-sm text-tenue transition-colors hover:text-foreground"
      >
        ← Volver a productos
      </Link>
      <FichaProducto producto={producto} />
    </div>
  );
}
