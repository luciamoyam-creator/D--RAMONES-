'use client';

/**
 * Grano cinematográfico persistente, como una capa de emulsión de película
 * sobre toda la experiencia. Es el hilo visual que conecta cada sección.
 * Se genera con SVG feTurbulence — ligero, sin peticiones de red.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.05] mix-blend-overlay"
    >
      <svg width="100%" height="100%">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
