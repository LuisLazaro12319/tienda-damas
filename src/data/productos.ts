import type { Categoria, Producto } from "@/lib/types";

/**
 * ⚠️ DEMO: productos y precios de EJEMPLO (ropa de damas y niñas), para que la
 * maqueta se vea creíble. La dueña los reemplaza por sus prendas reales.
 *
 * En la Etapa 2 este archivo se cambia por una lectura de base de datos. El
 * resto de la app no se toca: todos los componentes consumen el tipo `Producto`.
 */

const TALLES_DAMA = ["S", "M", "L", "XL"];
const TALLES_PANTALON = ["36", "38", "40", "42", "44"];
const TALLES_NENA = ["2", "4", "6", "8", "10", "12", "14"];

const NEGRO = { nombre: "Negro", hex: "#1c1c1c" };
const CREMA = { nombre: "Crema", hex: "#e8e0d0" };
const GRIS = { nombre: "Gris melange", hex: "#8f9490" };
const OFFWHITE = { nombre: "Off white", hex: "#f0ece4" };
const ROSA = { nombre: "Rosa", hex: "#e5a7bd" };
const CELESTE = { nombre: "Celeste", hex: "#a9cfe8" };
const LILA = { nombre: "Lila", hex: "#c4b0dd" };
const VERDE = { nombre: "Verde agua", hex: "#a8d3c4" };

export const productos: Producto[] = [
  {
    slug: "buzo-oversize-dama",
    nombre: "Buzo Oversize Dama",
    categoria: "buzos",
    descripcion:
      "Buzo de frisa de corte oversize, cuello redondo. Suave y abrigado, la prenda estrella de la temporada.",
    detalle: "Frisa peinada 400gr · 80% algodón / 20% poliéster · Corte oversize",
    precioMinorista: 32000,
    precioMayorista: 19000,
    talles: TALLES_DAMA,
    // Ejemplo con foto por color: al tocar el círculo cambia la imagen.
    colores: [
      { ...ROSA, foto: "buzo-oversize-dama.jpg" },
      { ...CREMA, foto: "buzo-oversize-dama-crema.jpg" },
      { ...NEGRO, foto: "buzo-oversize-dama-negro.jpg" },
      { ...CELESTE, foto: "buzo-oversize-dama-celeste.jpg" },
    ],
    destacado: true,
    foto: true,
  },
  {
    slug: "campera-canguro-dama",
    nombre: "Campera Canguro Dama",
    categoria: "hoodies",
    descripcion:
      "Canguro con capucha forrada y bolsillo delantero. Silueta amplia y cómoda.",
    detalle: "Frisa peinada 420gr · Capucha doble tela · Puño y cintura elastizados",
    precioMinorista: 38000,
    precioMayorista: 23000,
    talles: TALLES_DAMA,
    colores: [GRIS, NEGRO, ROSA, LILA],
    destacado: true,
    foto: true,
  },
  {
    slug: "sweater-hilo-dama",
    nombre: "Sweater de Hilo Dama",
    categoria: "sweaters",
    descripcion:
      "Sweater de hilo liviano, cuello redondo. Ideal para entretiempo, combina con todo.",
    detalle: "Hilo de algodón · Tejido en Argentina · Calce holgado",
    precioMinorista: 29000,
    precioMayorista: 17500,
    talles: TALLES_DAMA,
    colores: [CREMA, NEGRO, OFFWHITE, VERDE],
    destacado: true,
    foto: true,
  },
  {
    slug: "pantalon-palazzo-dama",
    nombre: "Pantalón Palazzo",
    categoria: "pantalones",
    descripcion:
      "Pantalón de gabardina con pierna ancha y caída fluida. Cintura elastizada con cordón.",
    detalle: "Gabardina de algodón · Cintura ajustable · Tiro alto",
    precioMinorista: 34000,
    precioMayorista: 20000,
    talles: TALLES_PANTALON,
    colores: [NEGRO, CREMA, GRIS],
    destacado: true,
    foto: true,
  },
  {
    slug: "calza-deportiva-dama",
    nombre: "Calza Deportiva Dama",
    categoria: "pantalones",
    descripcion:
      "Calza de algodón con lycra, tiro alto y ajuste firme. No transparenta.",
    detalle: "Algodón con lycra · Tiro alto · Costura plana",
    precioMinorista: 22000,
    precioMayorista: 13000,
    talles: TALLES_DAMA,
    colores: [NEGRO, GRIS, LILA],
    oferta: true,
  },
  {
    slug: "remera-manga-corta-dama",
    nombre: "Remera Manga Corta Dama",
    categoria: "remeras",
    descripcion:
      "Remera de algodón peinado, corte al cuerpo. Básica indispensable para el día a día.",
    detalle: "Algodón peinado 24/1 · Cuello redondo reforzado",
    precioMinorista: 16000,
    precioMayorista: 9500,
    talles: TALLES_DAMA,
    colores: [OFFWHITE, NEGRO, ROSA, CELESTE],
    oferta: true,
  },
  {
    slug: "blusa-escote-v",
    nombre: "Blusa Escote V",
    categoria: "remeras",
    descripcion:
      "Blusa de morley con escote en V y manga larga. Cae suave, elegante y cómoda.",
    detalle: "Morley de viscosa · Manga larga · Escote en V",
    precioMinorista: 24000,
    precioMayorista: 14500,
    talles: TALLES_DAMA,
    colores: [NEGRO, CREMA, LILA],
    oferta: true,
  },
  {
    slug: "cardigan-tejido-dama",
    nombre: "Cárdigan Tejido",
    categoria: "sweaters",
    descripcion:
      "Cárdigan de punto con botones. Abrigado y versátil, para arriba de cualquier prenda.",
    detalle: "Punto de hilo · Botones frontales · Calce holgado",
    precioMinorista: 33000,
    precioMayorista: 20000,
    talles: TALLES_DAMA,
    colores: [CREMA, GRIS, ROSA],
  },
  {
    slug: "buzo-estampado-nena",
    nombre: "Buzo Estampado Nena",
    categoria: "buzos",
    descripcion:
      "Buzo de frisa para nena con estampa. Suave, abrigado y resistente al uso diario.",
    detalle: "Frisa peinada 350gr · Estampa infantil · Puño elastizado",
    precioMinorista: 21000,
    precioMayorista: 12500,
    talles: TALLES_NENA,
    colores: [ROSA, CELESTE, LILA],
    destacado: true,
    foto: true,
  },
  {
    slug: "conjunto-remera-calza-nena",
    nombre: "Conjunto Remera + Calza Nena",
    categoria: "remeras",
    descripcion:
      "Conjunto de remera de algodón y calza a tono. Cómodo para jugar y para todos los días.",
    detalle: "Algodón · Conjunto 2 piezas · Colores combinados",
    precioMinorista: 19000,
    precioMayorista: 11000,
    talles: TALLES_NENA,
    colores: [ROSA, CELESTE, NEGRO],
  },
  {
    slug: "pantalon-jogging-nena",
    nombre: "Pantalón Jogging Nena",
    categoria: "pantalones",
    descripcion:
      "Jogging de frisa para nena, con cintura elastizada y puño. Ideal para el cole y el finde.",
    detalle: "Frisa peinada 300gr · Cintura elastizada · Bolsillos laterales",
    precioMinorista: 18000,
    precioMayorista: 10500,
    talles: TALLES_NENA,
    colores: [GRIS, ROSA, LILA],
  },
  {
    slug: "camperon-frisa-nena",
    nombre: "Camperón de Frisa Nena",
    categoria: "hoodies",
    descripcion:
      "Camperón con capucha y cierre completo para nena. La versión más abrigada de la línea infantil.",
    detalle: "Frisa peinada 400gr · Cierre completo · Capucha con cordón",
    precioMinorista: 26000,
    precioMayorista: 15500,
    talles: TALLES_NENA,
    colores: [CELESTE, ROSA],
    sinStock: true,
  },
];

export const CATEGORIAS: { id: Categoria; nombre: string }[] = [
  { id: "buzos", nombre: "Buzos" },
  { id: "hoodies", nombre: "Camperas" },
  { id: "sweaters", nombre: "Sweaters" },
  { id: "pantalones", nombre: "Pantalones y Calzas" },
  { id: "remeras", nombre: "Remeras y Blusas" },
  { id: "accesorios", nombre: "Accesorios" },
];

export function getProducto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}
