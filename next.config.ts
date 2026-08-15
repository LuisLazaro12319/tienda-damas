import type { NextConfig } from "next";

/**
 * GitHub Pages sirve archivos estáticos desde una subcarpeta
 * (usuario.github.io/tapias-web), así que exportamos HTML plano y
 * declaramos el basePath.
 *
 * NEXT_PUBLIC_BASE_PATH la define el workflow de deploy. En local queda
 * vacía y el sitio sirve desde la raíz, igual que con un dominio propio.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
};

export default nextConfig;
