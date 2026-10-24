import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function FaqTroubleshooting() {
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
    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark bg-white/75 dark:bg-[#18181B]/80 my-10 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
          <AlertCircle size={20} />
        </div>
        <div>
          <span className="text-xs font-extrabold tracking-widest uppercase text-bn-goldDark dark:text-bn-goldLight block">
            SELF-HELP DIAGNOSTICS
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 m-0">
            Quick Appliance Troubleshooting Guide
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
        {issues.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border border-bn-borderLight dark:border-bn-borderDark space-y-2">
            <strong className="block text-neutral-900 dark:text-neutral-100 font-bold text-sm">
              • {item.symptom}
            </strong>
            <p className="text-neutral-600 dark:text-neutral-400 m-0">
              <span className="font-bold text-neutral-700 dark:text-neutral-300">Root Cause:</span> {item.cause}
            </p>
            <p className="text-bn-goldDark dark:text-bn-goldLight m-0 font-medium pt-1 border-t border-neutral-200 dark:border-neutral-700">
              <span className="font-bold">Fix:</span> {item.solution}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
