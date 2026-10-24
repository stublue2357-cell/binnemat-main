import React, { useEffect, useState } from 'react';

export default function AmbientGlow() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffsetY(window.pageYOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        className="absolute rounded-full blur-[120px] opacity-25 dark:opacity-20 w-[600px] height-[600px] -top-36 -left-36 bg-gradient-to-br from-bn-gold to-transparent transition-transform duration-150 ease-out"
        style={{ transform: `translate3d(${offsetY * 0.08}px, ${offsetY * 0.12}px, 0)` }}
      />
      <div 
        className="absolute rounded-full blur-[130px] opacity-20 dark:opacity-15 w-[700px] height-[700px] top-[40%] -right-44 bg-gradient-to-br from-bn-goldLight to-transparent transition-transform duration-150 ease-out"
        style={{ transform: `translate3d(${-offsetY * 0.07}px, ${-offsetY * 0.10}px, 0)` }}
      />
    </div>
  );
}
