'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      slideRefs.current.forEach((slide) => {
        if (!slide) return;
        const img = slide.querySelector('[data-event-img]');
        gsap.fromTo(
          img,
          { scale: 1.25 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: slide,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-ink">
      <div className="pointer-events-none absolute left-6 top-8 z-10 md:left-16 md:top-12">
        <span className="eyebrow">04 — Events</span>
      </div>

      <div ref={trackRef} className="flex h-full w-max">
        {events.map((event, i) => (
          <div
            key={event.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            data-cursor-hover
            className="relative h-full w-[92vw] flex-shrink-0 overflow-hidden md:w-[80vw]"
          >
            <div data-event-img className="absolute inset-0 scale-110">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/30" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-14">
              <span className="font-mono text-xs uppercase tracking-widest2 text-sand">
                {String(i + 1).padStart(2, '0')} / {String(events.length).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-6xl font-light leading-none md:text-8xl">
                {event.title}
              </h3>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-light text-paper/80">
                <span>{event.venue}</span>
                <span className="hidden h-1 w-1 rounded-full bg-stone md:block" />
                <span>{event.location}</span>
                <span className="hidden h-1 w-1 rounded-full bg-stone md:block" />
                <span>{event.date}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="relative flex h-full w-[50vw] flex-shrink-0 items-center justify-center md:w-[30vw]">
          <p className="max-w-[220px] text-center font-display text-2xl font-light italic text-stone">
            More dates announced soon.
          </p>
        </div>
      </div>
    </section>
  );
}
