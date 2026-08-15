export type Categoria =
  | "buzos"
  | "hoodies"
  | "sweaters"
  | "pantalones"
  | "remeras"
  | "accesorios";

export type Modo = "minorista" | "mayorista";

export type Color = {
  /** Nombre visible, ej: "Beige arena" */
  nombre: string;
  /** Hex usado para el swatch y para el placeholder mientras no haya fotos. */
  hex: string;
};

export type Producto = {
  slug: string;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  /** Precio unitario de venta al público. */
  precioMinorista: number;
  /** Precio unitario por cantidad (a partir de MINIMO_MAYORISTA unidades). */
  precioMayorista: number;
  talles: string[];
  colores: Color[];
  /** Composición / detalle de la prenda, se muestra en la ficha. */
  detalle: string;
  destacado?: boolean;
  sinStock?: boolean;
};

export type ItemCarrito = {
  slug: string;
  talle: string;
  color: string;
  cantidad: number;
};
