import type { Metadata } from "next";
import { AdminPanel } from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Panel de administración (vista previa)",
  robots: { index: false },
};

/**
 * ⚠️ MAQUETA navegable. Muestra cómo la dueña editaría productos, categorías,
 * el inicio de la web y la configuración. Los campos están deshabilitados: la
 * edición real se activa en la Etapa 2 (con login + base de datos).
 */
export default function AdminPage() {
  return <AdminPanel />;
}
