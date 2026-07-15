'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contact, artist } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-contact-reveal]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-between bg-ink px-6 py-16 md:px-16 md:py-24"
    >
      <div data-contact-reveal>
        <span className="eyebrow">05 — Contact</span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-16">
        <h2
          data-contact-reveal
          data-cursor-hover
          className="font-display text-huge font-light leading-[0.9]"
        >
          <a href={`mailto:${contact.email}`}>Book<br />D-RAMONES</a>
        </h2>
      </div>

      <div
        data-contact-reveal
        className="grid grid-cols-1 gap-8 border-t border-line pt-8 text-sm font-light md:grid-cols-3"
      >
        <div>
          <span className="eyebrow">Email</span>
          <a
            href={`mailto:${contact.email}`}
            data-cursor-hover
            className="mt-2 block text-lg text-paper transition-colors hover:text-sand"
          >
            {contact.email}
          </a>
        </div>
        <div>
          <span className="eyebrow">Management</span>
          <a
            href={`mailto:${contact.management}`}
            data-cursor-hover
            className="mt-2 block text-lg text-paper transition-colors hover:text-sand"
          >
            {contact.management}
          </a>
        </div>
        <div>
          <span className="eyebrow">Instagram</span>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="mt-2 block text-lg text-paper transition-colors hover:text-sand"
          >
            {contact.instagram}
          </a>
        </div>
      </div>

      <div
        data-contact-reveal
        className="mt-12 flex flex-col items-start justify-between gap-4 text-xs font-light text-stone md:flex-row md:items-end"
      >
        <span>&copy; {new Date().getFullYear()} {artist.name}. All rights reserved.</span>
        <span>Ibiza, Spain</span>
      </div>
    </section>
  );
}
