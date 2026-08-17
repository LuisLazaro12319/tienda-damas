import Link from "next/link";
import { Separador } from "@/components/Separador";
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

function IconoTikTok() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.02-2.82H12.5v12.35a2.53 2.53 0 1 1-2.53-2.53c.2 0 .4.03.59.08V9.66a5.66 5.66 0 0 0-.59-.03A5.63 5.63 0 1 0 15.6 15.3V9.4a7.32 7.32 0 0 0 4.3 1.38V7.66a4.28 4.28 0 0 1-3.3-1.84z" />
    </svg>
  );
}

function IconoInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconoWhatsApp() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-20">
      <Separador />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
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

          <div className="flex gap-3">
            {MARCA.instagram && (
              <a
                href={MARCA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${MARCA.nombre}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-borde text-foreground transition-colors hover:border-transparent hover:bg-[#E1306C] hover:text-white"
              >
                <IconoInstagram />
              </a>
            )}
            {MARCA.tiktok && (
              <a
                href={MARCA.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TikTok de ${MARCA.nombre}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-borde text-foreground transition-colors hover:border-transparent hover:bg-foreground hover:text-background"
              >
                <IconoTikTok />
              </a>
            )}
            <a
              href={`https://wa.me/${WHATSAPP.mayorista}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp de ${MARCA.nombre}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-borde text-foreground transition-colors hover:border-transparent hover:bg-[#25D366] hover:text-white"
            >
              <IconoWhatsApp />
            </a>
          </div>

          <h3 className="mb-2 mt-6 font-medium uppercase tracking-wide">
            Contacto
          </h3>
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

      <Separador />
      <div className="px-4 py-5 text-center text-xs text-tenue sm:px-6">
        Demo de sitio web · {MARCA.nombre} · Productos y precios de ejemplo
      </div>
    </footer>
  );
}
