import type { Metadata } from "next";
import { Carrito } from "@/components/Carrito";

export const metadata: Metadata = {
  title: "Mi pedido",
  description: "Revisá tu pedido y enviálo por WhatsApp.",
};

export default function CarritoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="titulo-display text-3xl sm:text-4xl">Mi pedido</h1>
      <Carrito />
    </div>
  );
}
