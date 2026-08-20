"use client";

import Link from "next/link";
import { useState } from "react";
import { useTienda } from "@/context/TiendaContext";
import { ModoToggle } from "@/components/ModoToggle";
import { TemaToggle } from "@/components/TemaToggle";
import { MARCA } from "@/lib/config";

const LINKS = [
  { href: "/", texto: "Inicio" },
  { href: "/productos", texto: "Productos" },
  { href: "/admin", texto: "Panel" },
];

export function Header() {
  const { unidades, listo } = useTienda();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="text-lg font-extrabold uppercase tracking-tighter sm:text-xl">
            {MARCA.nombre}
          </span>
        </Link>

        <nav className="ml-4 hidden gap-6 text-sm md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-tenue transition-colors hover:text-foreground"
            >
              {l.texto}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block">
            <ModoToggle />
          </div>

          <TemaToggle />

          <Link
            href="/carrito"
            className="relative flex h-9 items-center gap-2 rounded-none border border-borde px-3.5 text-sm transition-colors hover:border-acento"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="tabular-nums">{listo ? unidades : 0}</span>
          </Link>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setAbierto((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={abierto}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {abierto && (
        <div className="border-t border-borde px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setAbierto(false)}
                className="text-tenue transition-colors hover:text-foreground"
              >
                {l.texto}
              </Link>
            ))}
          </nav>
          <div className="mt-4 sm:hidden">
            <ModoToggle />
          </div>
        </div>
      )}

      {/* Línea de luz al pie del header (toma el color de la paleta) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] rounded-full"
        style={{ background: "linear-gradient(to right, transparent, var(--acento), transparent)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-4px] h-[8px]"
        style={{
          background: "linear-gradient(to right, transparent, var(--acento), transparent)",
          filter: "blur(4px)",
          opacity: 0.45,
        }}
      />
    </header>
  );
}
