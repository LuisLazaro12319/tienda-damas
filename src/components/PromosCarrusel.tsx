"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PROMOS, BASE_PATH } from "@/lib/config";

export function PromosCarrusel() {
  const [i, setI] = useState(0);
  const total = PROMOS.length;

  // Rotación automática solo si hay más de una promo.
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  if (total === 0) return null;

  return (
    <div className="relative h-44 w-full overflow-hidden sm:h-64 lg:h-80">
      {PROMOS.map((promo, idx) => (
        <Link
          key={promo.imagen}
          href={promo.link}
          aria-label={`Ver ${promo.titulo}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === i ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={`${BASE_PATH}/${promo.imagen}`}
            alt={promo.titulo}
            fill
            sizes="100vw"
            className="object-cover"
            priority={idx === 0}
          />
        </Link>
      ))}

      {/* Puntitos indicadores (solo si hay más de una) */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {PROMOS.map((p, idx) => (
            <button
              key={p.imagen}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Ver promo ${idx + 1}`}
              aria-current={idx === i}
              className={`h-2.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
