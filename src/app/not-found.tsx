import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="text-6xl font-black tracking-tighter text-acento">404</p>
      <h1 className="titulo-display mt-5 text-2xl">No encontramos esta página</h1>
      <p className="mt-3 leading-relaxed text-tenue">
        Puede que el producto ya no esté disponible o que el link esté mal
        escrito.
      </p>
      <Link
        href="/productos"
        className="mt-8 rounded-full bg-acento px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Ver todos los productos
      </Link>
    </div>
  );
}
