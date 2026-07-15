# D-RAMONES — Web Experience

Experiencia cinematográfica para el dúo D-RAMONES. Next.js 14 (App Router) + TypeScript + Tailwind + GSAP/ScrollTrigger + Lenis + Three.js.

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para producción:

```bash
npm run build
npm run start
```

## Estructura

```
app/
  layout.tsx        → fuentes (Fraunces, Inter, Space Grotesk), SEO, providers
  page.tsx           → ensambla las 6 secciones
  globals.css        → estilos base y utilidades
components/
  Hero.tsx           → Sección 1
  BornInIbiza.tsx     → Sección 2 (scroll pinned, frases secuenciales)
  Legacy.tsx          → Sección 3 (retratos con parallax)
  WorldGlobe.tsx      → Sección 4 (globo 3D en Three.js)
  Events.tsx          → Sección 5 (carrusel horizontal por scroll)
  Contact.tsx         → Sección 6
  Nav.tsx             → navegación fija + indicador de progreso
  SmoothScroll.tsx    → Lenis + sincronización con ScrollTrigger
  CustomCursor.tsx     → cursor personalizado (desactivado en touch)
  GrainOverlay.tsx     → grano cinematográfico persistente
  RevealText.tsx       → helper reutilizable de texto animado
lib/
  data.ts             → TODO el contenido editable (ver abajo)
public/images/         → fotografías del proyecto
```

## Cómo editar contenido

**Todo el texto y los datos viven en `lib/data.ts`**: nombres, biografías, eventos, ciudades del mapa, email de contacto, frases de la Sección 2. No hace falta tocar los componentes para cambiar contenido.

## Cómo sustituir imágenes

Todas las imágenes se cargan desde `/public/images/`. Para cambiar una foto, sustituye el archivo manteniendo el mismo nombre, o edita la ruta correspondiente en `lib/data.ts` / `components/Hero.tsx`.

Imágenes actuales incluidas (puedes reemplazarlas por las tuyas en alta resolución):

| Archivo | Uso |
|---|---|
| `hero-duo-silhouette.png` | Fondo de la Sección 1 (Hero) |
| `jose-portrait-beach.jpeg` | Retrato principal de José (Sección 3) |
| `jose-carnales-portrait.jpeg` | Detalle de José |
| `jose-festival-waterfall.jpeg` | Evento — Waterfall |
| `ilhuan-unexpected-sunset.png` | Retrato principal de Ilhuan (Sección 3) + Evento The Unexpected |
| `ilhuan-night-set.png` | Detalle de Ilhuan |
| `duo-carnales-mountains.jpeg` | Evento — Carnales |
| `duo-silhouette-beachclub.jpeg` | Evento — Closing Set |
| `duo-stage-silhouette.jpeg` | Ciudad Berlín (mapa) |
| `jose-legacy-baby.jpeg` / `ilhuan-legacy-child.jpeg` | Disponibles para una futura sección de archivo familiar |

Recomendación: exporta las fotos en `.webp` o `.jpg` a máx. 2500px de lado largo para mantener el rendimiento — Next/Image ya optimiza automáticamente el resto.

## Notas técnicas

- **Lenis + GSAP ScrollTrigger** están sincronizados en `SmoothScroll.tsx` — no añadas otro smooth-scroll library.
- El globo 3D usa **Three.js puro** (sin React Three Fiber) por control fino sobre el raycasting de ciudades; el hub de las líneas es Ibiza (`lib/data.ts → cities[0]`).
- Todas las animaciones respetan `prefers-reduced-motion`.
- El cursor personalizado se desactiva automáticamente en dispositivos táctiles.
- SEO/OpenGraph configurado en `app/layout.tsx`.

## Stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis · Three.js
