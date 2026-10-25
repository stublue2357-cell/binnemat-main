import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FaqTroubleshooting() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-trouble-card',
        { y: 15, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const issues = [
    {
      symptom: "Electric Geyser not heating or red light off",
      cause: "High-voltage surge triggered the secondary thermal safety cutoff button on the thermostat.",
      solution: "Unplug geyser, open lower plastic access cover, and press the red manual reset pin. If it trips repeatedly, check breaker voltage."
    },
    {
      symptom: "Electric Geyser trips home breaker when switched on",
      cause: "Earthing leakage detected or heating coil element sheath cracked from hard water scaling.",
      solution: "Ensure 16A dedicated earth connection is active. If element is scaled, official warranty covers replacement."
    },
    {
      symptom: "BLDC Fan not responding to RF smart remote",
      cause: "Remote RF receiver desynchronized or 1.5V AAA remote batteries depleted.",
      solution: "Replace remote batteries. Hold 'Pairing/Speed 1' button for 5 seconds while turning wall power on until a beep sounds."
    },
    {
      symptom: "Built-in Glass Hob burner clicking but won't catch flame",
      cause: "Brass burner cap improperly seated over gas jet, or moisture on spark pin after kitchen cleaning.",
      solution: "Ensure burner cap is seated flush in its groove and dry the white porcelain spark electrode with a dry cloth."
    }
  ];

  return (
    <div ref={containerRef} className="glass-apple-card p-8 sm:p-10 rounded-3xl border border-[#E5E4E2] dark:border-white/10 my-10 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 border border-[#E5E4E2] dark:border-white/10 text-[#6F4E37] dark:text-[#E6EDFD] flex items-center justify-center shadow-sm">
          <AlertCircle size={20} />
        </div>
        <div>
          <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#6F4E37] dark:text-[#C49774] block">
            SELF-HELP DIAGNOSTICS
          </span>
          <h2 className="font-wix text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white m-0 tracking-tight">
            Quick Appliance Troubleshooting Guide
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
        {issues.map((item, idx) => (
          <div key={idx} className="gsap-trouble-card p-5 rounded-2xl glass-apple-card border border-[#E5E4E2] dark:border-white/10 space-y-2 shadow-sm">
            <strong className="block text-slate-900 dark:text-white font-wix font-bold text-sm">
              &bull; {item.symptom}
            </strong>
            <p className="text-slate-600 dark:text-slate-400 m-0">
              <span className="font-bold text-slate-700 dark:text-slate-300">Root Cause:</span> {item.cause}
            </p>
            <p className="text-[#6F4E37] dark:text-[#E6EDFD] m-0 font-medium pt-1.5 border-t border-[#E5E4E2] dark:border-white/10">
              <span className="font-bold">Fix:</span> {item.solution}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
