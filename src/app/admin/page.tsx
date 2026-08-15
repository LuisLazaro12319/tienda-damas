import type { Metadata } from "next";
import { productos } from "@/data/productos";

export const metadata: Metadata = {
  title: "Panel de administración (maqueta)",
  robots: { index: false },
};

/**
 * ⚠️ MAQUETA, no funciona. Es solo para mostrarle al dueño cómo cargaría
 * productos. En la Etapa 2 esta pantalla se conecta a Firebase (Auth para
 * el login + Firestore para guardar) y los campos pasan a ser reales.
 */
export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-8 rounded-xl border border-acento/40 bg-acento/10 px-5 py-4">
        <p className="text-sm font-semibold text-acento">
          Vista previa del panel de administración
        </p>
        <p className="mt-1 text-sm leading-relaxed text-tenue">
          Así se vería la pantalla donde cargás los productos. Todavía no
          guarda nada: es una maqueta para mostrar cómo funcionaría. Solo el
          dueño tendría acceso, con usuario y contraseña.
        </p>
      </div>

      <h1 className="titulo-display text-3xl">Cargar producto</h1>

      <form className="mt-8 grid gap-6 md:grid-cols-2">
        <Campo etiqueta="Nombre del producto" placeholder="Ej: Buzo Oversize Frisa" />
        <Campo etiqueta="Categoría" placeholder="Buzos" select />
        <Campo etiqueta="Precio minorista" placeholder="$ 0" />
        <Campo etiqueta="Precio mayorista" placeholder="$ 0" />

        <div className="md:col-span-2">
          <Etiqueta>Descripción</Etiqueta>
          <textarea
            rows={3}
            disabled
            placeholder="Descripción corta que ve el cliente en la ficha del producto…"
            className="w-full resize-none rounded-lg border border-borde bg-superficie px-4 py-3 text-sm placeholder:text-tenue/60"
          />
        </div>

        <div>
          <Etiqueta>Talles disponibles</Etiqueta>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((t) => (
              <span
                key={t}
                className="rounded-lg border border-borde px-4 py-2 text-sm text-tenue"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <Etiqueta>Colores</Etiqueta>
          <div className="flex flex-wrap gap-2">
            {["#1c1c1c", "#d9c9ae", "#8f9490", "#5c6250", "#4a382c"].map((c) => (
              <span
                key={c}
                className="h-9 w-9 rounded-full border-2 border-borde"
                style={{ backgroundColor: c }}
              />
            ))}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-borde text-tenue">
              +
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <Etiqueta>Fotos</Etiqueta>
          <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-borde bg-superficie text-sm text-tenue">
            Arrastrá las fotos acá o tocá para elegirlas desde el celular
          </div>
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3">
          <button
            type="button"
            disabled
            className="rounded-full bg-acento px-7 py-3 text-sm font-semibold text-white opacity-50"
          >
            Guardar producto
          </button>
          <span className="self-center text-xs text-tenue">
            (deshabilitado en la maqueta)
          </span>
        </div>
      </form>

      <h2 className="titulo-display mt-16 text-2xl">Productos cargados</h2>
      <div className="mt-5 overflow-x-auto rounded-xl border border-borde">
        <table className="w-full min-w-[540px] text-left text-sm">
          <thead className="border-b border-borde bg-superficie text-tenue">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Minorista</th>
              <th className="px-4 py-3 font-medium">Mayorista</th>
              <th className="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borde">
            {productos.slice(0, 6).map((p) => (
              <tr key={p.slug}>
                <td className="px-4 py-3">{p.nombre}</td>
                <td className="px-4 py-3 text-tenue">
                  ${p.precioMinorista.toLocaleString("es-AR")}
                </td>
                <td className="px-4 py-3 text-tenue">
                  ${p.precioMayorista.toLocaleString("es-AR")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.sinStock ? "text-tenue" : "text-[#25D366]"
                    }
                  >
                    {p.sinStock ? "Sin stock" : "Publicado"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Etiqueta({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-sm font-medium">{children}</label>;
}

function Campo({
  etiqueta,
  placeholder,
  select,
}: {
  etiqueta: string;
  placeholder: string;
  select?: boolean;
}) {
  return (
    <div>
      <Etiqueta>{etiqueta}</Etiqueta>
      {select ? (
        <div className="flex items-center justify-between rounded-lg border border-borde bg-superficie px-4 py-3 text-sm text-tenue/60">
          {placeholder}
          <span className="text-tenue">▾</span>
        </div>
      ) : (
        <input
          disabled
          placeholder={placeholder}
          className="w-full rounded-lg border border-borde bg-superficie px-4 py-3 text-sm placeholder:text-tenue/60"
        />
      )}
    </div>
  );
}
