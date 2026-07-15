'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { family } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

function PortraitPanel({
  member,
  index,
}: {
  member: (typeof family)[number];
  index: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imgRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 80%',
          },
        }
      );

      const panel = panelRef.current;
      const img = imgRef.current;
      if (!panel || !img) return;

      const onMove = (e: MouseEvent) => {
        const rect = panel.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(img, {
          x: x * 24,
          y: y * 24,
          scale: 1.06,
          duration: 1,
          ease: 'power3.out',
        });
      };
      const onLeave = () => {
        gsap.to(img, { x: 0, y: 0, scale: 1, duration: 1, ease: 'power3.out' });
      };

      panel.addEventListener('mousemove', onMove);
      panel.addEventListener('mouseleave', onLeave);
      return () => {
        panel.removeEventListener('mousemove', onMove);
        panel.removeEventListener('mouseleave', onLeave);
      };
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      data-cursor-hover
      className="group relative h-[70vh] w-full overflow-hidden md:h-screen md:w-1/2"
    >
      <div ref={imgRef} className="absolute inset-0">
        <Image
          src={member.portrait}
          alt={`${member.name} — ${member.role}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
      </div>

      <div
        ref={infoRef}
        className="absolute bottom-0 left-0 w-full p-6 opacity-0 md:p-12"
      >
        <span className="eyebrow">{String(index + 1).padStart(2, '0')} — {member.years}</span>
        <h3 className="mt-3 font-display text-5xl font-light md:text-6xl">{member.name}</h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest2 text-stone">
          {member.role}
        </p>
        <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-paper/80 md:text-base">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

export default function Legacy() {
  return (
    <section className="relative w-full bg-ink">
      <div className="px-6 pb-10 pt-20 md:px-16 md:pb-16 md:pt-28">
        <span className="eyebrow">02 — The Legacy</span>
        <h2 className="mt-4 font-display text-giant font-light">The Legacy</h2>
      </div>
      <div className="flex w-full flex-col md:flex-row">
        {family.map((member, i) => (
          <PortraitPanel key={member.id} member={member} index={i} />
        ))}
      </div>
    </section>
  );
}
