import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Shield, Zap, Sparkles } from 'lucide-react';
import GsapCounter from '../../components/common/GsapCounter';

gsap.registerPlugin(ScrollTrigger);

export default function SuperconsciousTypographySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Staggered gliding entrance for typography lines
      gsap.fromTo(
        '.gsap-typo-line',
        { y: 35, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );

      // Smooth scroll parallax for capsules
      gsap.to('.gsap-capsule-1', {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        x: -18,
        ease: 'none'
      });

      gsap.to('.gsap-capsule-2', {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        x: 18,
        ease: 'none'
      });

      gsap.to('.gsap-capsule-3', {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        x: -12,
        ease: 'none'
      });

      // Metric tiles slide-up
      gsap.fromTo('.gsap-metric-tile', 
        { y: 25, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.gsap-metric-grid',
            start: 'top 95%',
            toggleActions: 'play none none none',
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden bg-transparent text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* BACKGROUND MESH VIGNETTE (PALE LAVENDER & MOCHA) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#E6EDFD]/75 dark:bg-[#6F4E37]/[0.12] blur-3xl pointer-events-none -z-10" />

      {/* TOP PILL BADGE */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6EDFD]/85 dark:bg-[#1A1614]/90 border border-[#E5E4E2] dark:border-white/[0.1] text-[#6F4E37] dark:text-[#E5E4E2] text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-sm">
          <Sparkles size={13} className="text-[#6F4E37] dark:text-[#C49774]" />
          <span className="font-bold">Domestic Serenity &bull; Engineered In Pakistan</span>
        </div>
      </div>

      {/* STAGGERED CAPSULE TYPOGRAPHY (SUPERCONSCIOUS SPEC IN MOCHA & PLATINUM) */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 select-none">
        {/* LINE 1 */}
        <div className="gsap-typo-line flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-wix text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight">
          <span>End</span>
          {/* Wireframe Capsule 1 */}
          <span className="gsap-capsule-1 inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-[#E6EDFD]/90 dark:bg-[#1C1816]/95 border border-[#E5E4E2] dark:border-[#8C6547]/40 text-xs sm:text-sm font-mono text-[#6F4E37] dark:text-[#E5E4E2] shadow-[0_4px_20px_rgba(111,78,55,0.08)] hover:scale-105 transition-transform cursor-default will-change-transform">
            <Flame size={16} className="text-[#6F4E37] dark:text-[#C49774] animate-pulse" />
            <span className="font-bold text-slate-900 dark:text-white tracking-normal">3s FastHeat™</span>
          </span>
          <span>Winter</span>
        </div>

        {/* LINE 2 */}
        <div className="gsap-typo-line flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-wix text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight">
          <span>Chills</span>
          {/* Wireframe Capsule 2 */}
          <span className="gsap-capsule-2 inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-[#F5F4F2] dark:bg-[#1C1816]/95 border border-[#E5E4E2] dark:border-white/15 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:scale-105 transition-transform cursor-default will-change-transform">
            <Shield size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold text-slate-900 dark:text-white tracking-normal">Incoloy 840</span>
          </span>
          <span className="font-serif-italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] to-[#8C6547] dark:from-[#C49774] dark:to-[#E5E4E2]">
            Master
          </span>
        </div>

        {/* LINE 3 */}
        <div className="gsap-typo-line flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-wix text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight">
          <span>Your</span>
          {/* Wireframe Capsule 3 */}
          <span className="gsap-capsule-3 inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-[#E6EDFD]/90 dark:bg-[#1C1816]/95 border border-[#E5E4E2] dark:border-[#8C6547]/40 text-xs sm:text-sm font-mono text-[#6F4E37] dark:text-[#E5E4E2] shadow-[0_4px_20px_rgba(111,78,55,0.08)] hover:scale-105 transition-transform cursor-default will-change-transform">
            <Zap size={16} className="text-amber-500" />
            <span className="font-bold text-slate-900 dark:text-white tracking-normal">30W Solar Fan</span>
          </span>
          <span className="font-serif-italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#8C6547] to-[#6F4E37] dark:from-[#E5E4E2] dark:to-[#C49774]">
            Comfort
          </span>
        </div>
      </div>

      {/* LOWER EXPLANATION GRID (2 COLUMNS) */}
      <div className="gsap-metric-grid grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-12 pt-8 border-t border-[#E5E4E2] dark:border-white/[0.08] max-w-4xl mx-auto">
        <div className="md:col-span-7">
          <h3 className="font-wix font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mb-2">
            Engineered For Pakistan.
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Zero Sui gas dependency, anti-saline water protection, and 65% summer bill cuts.
          </p>
        </div>

        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          <div className="gsap-metric-tile p-5 rounded-2xl bg-white/95 dark:bg-[#161311]/90 border border-[#E5E4E2] dark:border-white/[0.1] shadow-sm">
            <span className="text-3xl font-wix font-black text-[#6F4E37] dark:text-[#C49774] block">
              <GsapCounter endValue={85} prefix="+" suffix="%" />
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 block">
              Heat Retention
            </span>
          </div>
          <div className="gsap-metric-tile p-5 rounded-2xl bg-white/90 dark:bg-[#12111A]/90 border border-black/[0.08] dark:border-white/[0.1] shadow-sm">
            <span className="text-3xl font-wix font-black text-emerald-500 block">
              <GsapCounter endValue={30} suffix=" Watts" />
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 block">
              Solar BLDC Power
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
