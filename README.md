# Tapias.Arg — Demo de tienda

Demo de sitio web para **Tapias.Arg** (indumentaria masculina oversize, Flores CABA).
Catálogo + carrito + pedido por WhatsApp. **Sin pasarela de pago y sin backend.**

## Cómo levantarlo

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## Qué hay

| Ruta | Qué es |
|---|---|
| `/` | Home con hero, beneficios y destacados |
| `/productos` | Catálogo con filtro por categoría |
| `/productos/[slug]` | Ficha: colores, talles, cantidad |
| `/carrito` | Pedido + botón "Hacer el pedido por WhatsApp" |
| `/admin` | **Maqueta** del panel del dueño (no funciona todavía) |

## Modo minorista / mayorista

El toggle del header cambia tres cosas a la vez:

1. Los precios de todo el sitio
2. El mínimo de compra (10 prendas para mayorista)
3. **El número de WhatsApp al que se envía el pedido**

La elección queda guardada en el navegador del cliente.

## Deploy

Publicado en **https://luislazaro12319.github.io/tapias-web/**

Cada `git push` a `main` reconstruye y publica solo (GitHub Actions,
`.github/workflows/deploy.yml`). No hay que hacer nada más.

El workflow define dos variables al buildear:

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_BASE_PATH` | La subcarpeta (`/tapias-web`). En local queda vacía |
| `NEXT_PUBLIC_SITIO` | URL absoluta, la piden las etiquetas de compartir |

Van con prefijo `NEXT_PUBLIC_` porque el navegador también las necesita:
`next/image` con `unoptimized` **no** antepone el `basePath` solo, así que las
imágenes de `/public` lo llevan a mano (ver `src/components/Logo.tsx`).

### Cuando haya dominio propio

1. Apuntar el DNS del dominio a GitHub Pages (4 registros A + un CNAME)
2. Cargar el dominio en Settings → Pages del repo
3. En el workflow: borrar `NEXT_PUBLIC_BASE_PATH` y poner el dominio nuevo
   en `NEXT_PUBLIC_SITIO`
4. Regenerar `public/og.png` (ver abajo)

## Antes de publicar — cambiar esto

- **`src/lib/config.ts`** → los dos números de WhatsApp. Hoy ambos apuntan al
  número de prueba de Luis. Van los números reales de la bio de Instagram.
- **`src/data/productos.ts`** → productos y precios son inventados.
- **Fotos**: hoy se muestran siluetas de color como placeholder
  (`src/components/PrendaPlaceholder.tsx`). Cuando lleguen las fotos reales,
  se reemplaza ese componente por `<Image />` y no hay que tocar nada más.

## La imagen de vista previa (`public/og.png`)

Es lo que se ve al compartir el link por WhatsApp o Instagram. Es un archivo
estático **generado a mano una vez**: GitHub Pages necesita la extensión `.png`
para mandar el `content-type` correcto, y la ruta que genera Next sale sin
extensión.

Para regenerarla (si cambia la marca o el dominio), recuperar
`src/app/opengraph-image.tsx` del historial de git, buildear, y copiar
`out/opengraph-image` a `public/og.png`.

## Etapa 2 (solo si el dueño aprueba)

Conectar Firebase: **Auth** para el login del panel y **Firestore** para los
productos. El único archivo que cambia es `src/data/productos.ts`, que pasa de
devolver un array fijo a leer de la base. Todo el resto de la app consume el
tipo `Producto` de `src/lib/types.ts` y queda igual.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4
