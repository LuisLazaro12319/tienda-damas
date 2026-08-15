import Link from "next/link";
import { MARCA, TEL_MAYORISTA_VISIBLE, WHATSAPP } from "@/lib/config";

/**
 * Bandera argentina dibujada a mano.
 *
 * No se usa el emoji 🇦🇷 porque Windows no dibuja las banderas: en vez de la
 * bandera muestra las letras "AR", y la mayoría de los clientes de escritorio
 * están en Windows.
 */
function BanderaArgentina() {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 27 18"
      className="inline-block align-[-1px] rounded-[2px]"
      aria-label="Argentina"
      role="img"
    >
      <rect width="27" height="18" fill="#fff" />
      <rect width="27" height="6" fill="#75AADB" />
      <rect y="12" width="27" height="6" fill="#75AADB" />
      <circle cx="13.5" cy="9" r="2.1" fill="#F6B40E" />
    </svg>
  );
}

function IconoFacebook() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.1 23.7v-8H6.6v-3.7h2.5v-1.6c0-4.1 1.9-6 5.9-6 .4 0 1 0 1.5.1.4 0 .8.1 1.1.2v3.3l-.7-.1h-.7c-.7 0-1.3.1-1.7.3-.3.1-.5.3-.7.6-.2.4-.4 1-.4 1.8V12h3.9l-.4 2.1-.3 1.6h-3.2v8c5.1-.6 9.1-5 9.1-10.3C22.5 5.6 17.8 1 12 1S1.5 5.6 1.5 11.4c0 5.3 4 9.7 9.1 10.3l-1.5 2Z" />
    </svg>
  );
}

function IconoInstagram() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-borde">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="titulo-display text-xl font-extrabold italic tracking-tighter">
            {MARCA.nombre}
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-tenue">
            {MARCA.descripcion}
          </p>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-medium">Showroom</h3>
          <p className="text-tenue">{MARCA.ubicacion}</p>
          {MARCA.direccion && <p className="text-tenue">{MARCA.direccion}</p>}
          <p className="mt-3 text-tenue">
            Envíos a todo el país <BanderaArgentina />
          </p>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-medium">Navegación</h3>
          <ul className="space-y-2 text-tenue">
            <li>
              <Link href="/productos" className="hover:text-foreground">
                Ver productos
              </Link>
            </li>
            <li>
              <Link href="/carrito" className="hover:text-foreground">
                Mi pedido
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="mb-3 font-medium uppercase tracking-wide">
            Seguinos en nuestras redes
          </h3>

          {(MARCA.facebook || MARCA.instagram) && (
            <div className="flex gap-4">
              {MARCA.facebook && (
                <a
                  href={MARCA.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Facebook de ${MARCA.nombre}`}
                  className="text-foreground transition-colors hover:text-acento"
                >
                  <IconoFacebook />
                </a>
              )}
              {MARCA.instagram && (
                <a
                  href={MARCA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram de ${MARCA.nombre}`}
                  className="text-foreground transition-colors hover:text-acento"
                >
                  <IconoInstagram />
                </a>
              )}
            </div>
          )}

          {MARCA.email && (
            <p className="mt-5 text-tenue">
              Email:{" "}
              <a
                href={`mailto:${MARCA.email}`}
                className="underline underline-offset-4 hover:text-foreground"
              >
                {MARCA.email}
              </a>
            </p>
          )}

          <p className="mt-3 text-tenue">Cualquier consulta contactar al</p>
          <a
            href={`https://wa.me/${WHATSAPP.mayorista}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-tenue transition-colors hover:text-foreground"
          >
            {TEL_MAYORISTA_VISIBLE}
          </a>
        </div>
      </div>

      <div className="border-t border-borde px-4 py-5 text-center text-xs text-tenue sm:px-6">
        Demo de sitio web · {MARCA.nombre} · Productos y precios de ejemplo
      </div>
    </footer>
  );
}
