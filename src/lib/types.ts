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
  /** Nombre del archivo en /public/prod/ con la foto de la prenda en ESTE color.
   *  Al tocar el color en la ficha, la foto principal cambia a esta. Opcional. */
  foto?: string;
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
  /** Si true, aparece en el filtro "Ofertas" del catálogo. */
  oferta?: boolean;
  sinStock?: boolean;
  /** Si true, hay una foto real en /public/prod/<slug>.jpg. Si no, se usa la
   *  silueta de PrendaPlaceholder. */
  foto?: boolean;
};

export type ItemCarrito = {
  slug: string;
  talle: string;
  color: string;
  cantidad: number;
};
