import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GsapTextReveal({ 
  text, 
  as: Component = 'h2', 
  className = '', 
  stagger = 0.05,
  delay = 0 
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.gsap-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 28,
          filter: 'blur(6px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: stagger,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, stagger, delay]);

  const words = text.split(' ');

  return (
    <Component ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.28em] gsap-word will-change-transform">
          {word}
        </span>
      ))}
    </Component>
  );
}
