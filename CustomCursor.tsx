'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest('a, button, [data-cursor-hover]'));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[110] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[110] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/40 transition-all duration-300 ease-cinematic ${
          hovering ? 'h-14 w-14 border-paper/80' : 'h-8 w-8'
        }`}
      />
    </>
  );
}
