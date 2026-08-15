import { MARCA, MINIMO_MAYORISTA, WHATSAPP } from "@/lib/config";
import { precio } from "@/lib/formato";
import type { Modo, Producto } from "@/lib/types";

type LineaPedido = {
  producto: Producto;
  talle: string;
  color: string;
  cantidad: number;
  unitario: number;
  subtotal: number;
};

/**
 * Arma el texto del pedido y devuelve el link de WhatsApp ya listo.
 * Según el modo, el mensaje sale al número mayorista o al minorista.
 */
export function linkPedido(
  lineas: LineaPedido[],
  modo: Modo,
  total: number,
): string {
  const encabezado =
    modo === "mayorista"
      ? `¡Hola ${MARCA.nombre}! Quiero hacer un *pedido MAYORISTA* 📦`
      : `¡Hola ${MARCA.nombre}! Quiero hacer un *pedido* 🛍️`;

  const detalle = lineas
    .map(
      (l) =>
        `• ${l.producto.nombre}\n  Talle ${l.talle} · ${l.color} · x${l.cantidad}` +
        `\n  ${precio(l.unitario)} c/u = ${precio(l.subtotal)}`,
    )
    .join("\n\n");

  const unidades = lineas.reduce((acc, l) => acc + l.cantidad, 0);

  const cierre =
    modo === "mayorista"
      ? `Total: *${precio(total)}* (${unidades} unidades)\n\n` +
        `Mínimo mayorista: ${MINIMO_MAYORISTA} unidades ✔️\n` +
        `Quedo atento para coordinar pago y envío.`
      : `Total: *${precio(total)}* (${unidades} ${unidades === 1 ? "prenda" : "prendas"})\n\n` +
        `Quedo atento para coordinar pago y envío.`;

  const mensaje = `${encabezado}\n\n${detalle}\n\n${cierre}`;
  const numero = modo === "mayorista" ? WHATSAPP.mayorista : WHATSAPP.minorista;

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/** Link para consultar por un producto puntual, desde la ficha. */
export function linkConsulta(producto: Producto, modo: Modo): string {
  const numero = modo === "mayorista" ? WHATSAPP.mayorista : WHATSAPP.minorista;
  const mensaje =
    `¡Hola ${MARCA.nombre}! Quería consultar por *${producto.nombre}*` +
    (modo === "mayorista" ? " (precio mayorista)." : ".");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
