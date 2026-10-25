import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GsapCounter({ 
  endValue, 
  prefix = '', 
  suffix = '', 
  duration = 2,
  decimals = 0,
  className = '' 
}) {
  const numberRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const counterObj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counterObj, {
        val: endValue,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        },
        onUpdate: () => {
          if (decimals > 0) {
            setDisplayValue(counterObj.val.toFixed(decimals));
          } else {
            setDisplayValue(Math.floor(counterObj.val).toLocaleString());
          }
        }
      });
    }, el);

    return () => ctx.revert();
  }, [endValue, duration, decimals]);

  return (
    <span ref={numberRef} className={`tabular-nums ${className}`}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
