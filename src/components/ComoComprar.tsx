import { MINIMO_MAYORISTA } from "@/lib/config";

/**
 * Sección "Pedidos por WhatsApp": explica el circuito de compra en 4 pasos.
 *
 * Va sin botón: los accesos a productos ya están en el nav, en Destacados
 * y en el footer.
 */

function IconoElegir() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="8" width="34" height="27" rx="2.5" />
      <path d="M5 15h34" />
      <circle cx="9.5" cy="11.5" r=".9" fill="currentColor" />
      <circle cx="13" cy="11.5" r=".9" fill="currentColor" />
      <circle cx="16.5" cy="11.5" r=".9" fill="currentColor" />
      <path d="M16 24.5l6-3.2 6 3.2v6.4l-6 3.2-6-3.2z" />
      <path d="M16 24.5l6 3.2 6-3.2M22 27.7v6.4" />
      <path d="M30 31l10 10-3.6.7 2.2 4-2.4 1.2-2.2-4.2-2.6 2.7z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconoCarrito() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h5l4.6 21.4a2.5 2.5 0 0 0 2.4 2h17.6a2.5 2.5 0 0 0 2.4-1.9L41 15H10" />
      <circle cx="17" cy="38" r="3" fill="currentColor" stroke="none" />
      <circle cx="32" cy="38" r="3" fill="currentColor" stroke="none" />
      <circle cx="35" cy="10" r="7.5" fill="currentColor" stroke="none" />
      <path d="M35 6.5v7M31.5 10h7" stroke="var(--background)" strokeWidth="2.2" />
    </svg>
  );
}

function IconoWhatsApp() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 5c10 0 18 7.8 18 17.5S34 40 24 40c-2.9 0-5.7-.7-8.1-1.9L6 41l3.2-9.2A17 17 0 0 1 6 22.5C6 12.8 14 5 24 5Z" />
      <path
        d="M19.4 17.2c-.3-.7-.6-.7-.9-.7h-.8c-.3 0-.8.1-1.2.6-.4.5-1.6 1.5-1.6 3.7s1.6 4.3 1.8 4.6c.2.3 3.1 5 7.7 6.8 3.8 1.5 4.6 1.2 5.5 1.1.8-.1 2.7-1.1 3.1-2.2.4-1.1.4-2 .3-2.2-.1-.2-.4-.3-.9-.5-.4-.2-2.7-1.3-3.1-1.5-.4-.2-.7-.2-1 .2-.3.5-1.2 1.5-1.4 1.8-.3.3-.5.3-1 .1-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.3-2.8-2.6-3.2-.3-.5 0-.7.2-1 .2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.1-.3.1-.6 0-.8-.2-.3-1-2.5-1.5-3.4Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function IconoEntrega() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="24" cy="24" r="19" />
      <circle cx="24" cy="19" r="6.5" fill="currentColor" stroke="none" />
      <path
        d="M11.5 39.5c1.9-6.2 6.7-9.5 12.5-9.5s10.6 3.3 12.5 9.5"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

const PASOS = [
  {
    icono: <IconoElegir />,
    titulo: "Elegí tus productos",
    texto: `Elegí talles, colores y cantidades, y añadilos al carrito. En mayorista, desde ${MINIMO_MAYORISTA} prendas.`,
  },
  {
    icono: <IconoCarrito />,
    titulo: "Armá tu pedido",
    texto: "Sumá todas las prendas que quieras y entrá a “Mi pedido” cuando termines.",
  },
  {
    icono: <IconoWhatsApp />,
    titulo: "Contacto por WhatsApp",
    texto: "Se abre WhatsApp con tu pedido ya escrito y detallado. Solo tenés que enviarlo.",
  },
  {
    icono: <IconoEntrega />,
    titulo: "Entrega del pedido",
    texto: "Nos comunicamos con vos para coordinar el pago y la entrega. Enviamos a todo el país.",
  },
];

export function ComoComprar() {
  return (
    <section className="border-y border-borde bg-superficie/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-tenue">
            Simple y rápido
          </p>
          <h2 className="titulo-display mt-2 text-3xl uppercase sm:text-4xl">
            Pedidos por WhatsApp
          </h2>
          {/* Pincelada decorativa, como en la referencia. */}
          <svg
            viewBox="0 0 200 10"
            className="mx-auto mt-4 h-2.5 w-44 text-acento"
            aria-hidden="true"
          >
            <path
              d="M2 6.5c26-2.4 52-3.6 78-3.9 24-.3 48 .4 72 2.1 15 1 30 .6 45-1.2-14 3.4-28 4.9-43 4.4-25-.8-50-2-75-1.7-25 .3-51 1.6-77 3.8z"
              fill="currentColor"
            />
          </svg>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((paso, i) => (
            <li key={paso.titulo} className="text-center">
              <div className="mx-auto h-14 w-14 text-acento">{paso.icono}</div>
              <h3 className="mt-5 text-sm font-bold uppercase tracking-wide">
                {i + 1}. {paso.titulo}
              </h3>
              <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-tenue">
                {paso.texto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
