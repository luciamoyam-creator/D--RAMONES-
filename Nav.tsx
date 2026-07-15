'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { artist } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // El logo del nav aparece tras pasar el hero
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top+=100 top',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleY: self.progress });
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-16 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <a href="#top" data-cursor-hover className="font-display text-sm tracking-[0.3em]">
        {artist.name}
      </a>

      <div className="hidden items-center gap-8 font-mono text-[0.65rem] uppercase tracking-widest2 text-stone md:flex">
        <a href="#legacy" data-cursor-hover className="transition-colors hover:text-paper">Legacy</a>
        <a href="#world" data-cursor-hover className="transition-colors hover:text-paper">World</a>
        <a href="#events" data-cursor-hover className="transition-colors hover:text-paper">Events</a>
        <a href="#contact" data-cursor-hover className="transition-colors hover:text-paper">Contact</a>
      </div>

      <div className="relative h-8 w-px bg-line">
        <div
          ref={progressRef}
          className="absolute left-0 top-0 h-full w-full origin-top bg-paper"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>
    </nav>
  );
}
