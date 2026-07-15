'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealTextProps = {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  trigger?: 'scroll' | 'mount';
  splitBy?: 'lines' | 'words';
  start?: string;
};

/**
 * Divide el texto en spans y los revela con una máscara + desplazamiento
 * vertical suave, como líneas de un guion que aparecen en cámara lenta.
 */
export default function RevealText({
  children,
  as = 'p',
  className = '',
  delay = 0,
  trigger = 'scroll',
  splitBy = 'words',
  start = 'top 85%',
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const Tag = as;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const targets = el.querySelectorAll('[data-reveal-item]');

    const anim = gsap.fromTo(
      targets,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.06,
        delay,
        scrollTrigger:
          trigger === 'scroll'
            ? {
                trigger: el,
                start,
                toggleActions: 'play none none reverse',
              }
            : undefined,
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay, trigger, start]);

  const units = splitBy === 'lines' ? children.split('\n') : children.split(' ');

  return (
    <div ref={containerRef} className={className}>
      <Tag className="flex flex-wrap">
        {units.map((unit, i) => (
          <span key={i} className="reveal-mask mr-[0.28em]">
            <span data-reveal-item>{unit}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
