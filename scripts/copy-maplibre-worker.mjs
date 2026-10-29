// Copia o worker do MapLibre para /public (o bundler não publica esse arquivo sozinho e o
// mapa ficaria travado em "Carregando"). Roda no predev e no prebuild, inclusive no Docker.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";

const src = "node_modules/maplibre-gl/dist";
const out = "public/maplibre";
mkdirSync(out, { recursive: true });
for (const f of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  if (existsSync(`${src}/${f}`)) copyFileSync(`${src}/${f}`, `${out}/${f}`);
}
