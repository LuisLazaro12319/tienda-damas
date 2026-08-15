"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProducto } from "@/data/productos";
import { MINIMO_MAYORISTA } from "@/lib/config";
import type { ItemCarrito, Modo, Producto } from "@/lib/types";

const CLAVE_CARRITO = "tapias.carrito";
const CLAVE_MODO = "tapias.modo";

type LineaCarrito = ItemCarrito & {
  producto: Producto;
  unitario: number;
  subtotal: number;
};

type Tienda = {
  modo: Modo;
  setModo: (modo: Modo) => void;
  items: ItemCarrito[];
  lineas: LineaCarrito[];
  unidades: number;
  total: number;
  /** Cuántas unidades faltan para poder cerrar un pedido mayorista. */
  faltanParaMayorista: number;
  cumpleMinimo: boolean;
  precioDe: (producto: Producto) => number;
  agregar: (item: ItemCarrito) => void;
  cambiarCantidad: (indice: number, cantidad: number) => void;
  quitar: (indice: number) => void;
  vaciar: () => void;
  /** false hasta que se leyó localStorage: evita mismatch de hidratación. */
  listo: boolean;
};

const TiendaContext = createContext<Tienda | null>(null);

function mismaLinea(a: ItemCarrito, b: ItemCarrito) {
  return a.slug === b.slug && a.talle === b.talle && a.color === b.color;
}

export function TiendaProvider({ children }: { children: React.ReactNode }) {
  const [modo, setModoState] = useState<Modo>("minorista");
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [listo, setListo] = useState(false);

  // Restaurar del navegador una sola vez, ya montado el componente.
  //
  // El lint desaconseja llamar a setState dentro de un efecto, pero acá es a
  // propósito: localStorage no existe cuando se genera el HTML, así que el
  // primer render tiene que salir vacío en el servidor y en el cliente. Si
  // leyéramos el carrito antes, el HTML y el navegador no coincidirían y React
  // tiraría error de hidratación.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);
      if (carritoGuardado) setItems(JSON.parse(carritoGuardado));
      const modoGuardado = localStorage.getItem(CLAVE_MODO);
      if (modoGuardado === "mayorista" || modoGuardado === "minorista") {
        setModoState(modoGuardado);
      }
    } catch {
      // localStorage bloqueado o JSON corrupto: arrancamos vacío.
    }
    setListo(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!listo) return;
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  }, [items, listo]);

  useEffect(() => {
    if (!listo) return;
    localStorage.setItem(CLAVE_MODO, modo);
  }, [modo, listo]);

  const setModo = useCallback((nuevo: Modo) => setModoState(nuevo), []);

  const precioDe = useCallback(
    (producto: Producto) =>
      modo === "mayorista" ? producto.precioMayorista : producto.precioMinorista,
    [modo],
  );

  const agregar = useCallback((item: ItemCarrito) => {
    setItems((actuales) => {
      const indice = actuales.findIndex((i) => mismaLinea(i, item));
      if (indice === -1) return [...actuales, item];
      const copia = [...actuales];
      copia[indice] = {
        ...copia[indice],
        cantidad: copia[indice].cantidad + item.cantidad,
      };
      return copia;
    });
  }, []);

  const cambiarCantidad = useCallback((indice: number, cantidad: number) => {
    setItems((actuales) =>
      cantidad <= 0
        ? actuales.filter((_, i) => i !== indice)
        : actuales.map((item, i) => (i === indice ? { ...item, cantidad } : item)),
    );
  }, []);

  const quitar = useCallback((indice: number) => {
    setItems((actuales) => actuales.filter((_, i) => i !== indice));
  }, []);

  const vaciar = useCallback(() => setItems([]), []);

  const lineas = useMemo(() => {
    return items.flatMap((item) => {
      const producto = getProducto(item.slug);
      if (!producto) return []; // producto dado de baja después de guardarse
      const unitario = precioDe(producto);
      return [{ ...item, producto, unitario, subtotal: unitario * item.cantidad }];
    });
  }, [items, precioDe]);

  const unidades = useMemo(
    () => lineas.reduce((acc, l) => acc + l.cantidad, 0),
    [lineas],
  );

  const total = useMemo(
    () => lineas.reduce((acc, l) => acc + l.subtotal, 0),
    [lineas],
  );

  const faltanParaMayorista =
    modo === "mayorista" ? Math.max(0, MINIMO_MAYORISTA - unidades) : 0;

  const valor: Tienda = {
    modo,
    setModo,
    items,
    lineas,
    unidades,
    total,
    faltanParaMayorista,
    cumpleMinimo: faltanParaMayorista === 0,
    precioDe,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
    listo,
  };

  return <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>;
}

export function useTienda(): Tienda {
  const ctx = useContext(TiendaContext);
  if (!ctx) throw new Error("useTienda debe usarse dentro de <TiendaProvider>");
  return ctx;
}
