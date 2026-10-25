import React, { useState, useEffect } from 'react';
import { ShieldAlert, X, Zap } from 'lucide-react';
import { isCircuitBreakerOpen } from '../../services/apiShield';

/**
 * ApiShieldBanner: Graceful Degradation & Rate Limit User Notice
 * 
 * If server returns HTTP 429 (Rate Limit) or HTTP 403 (Firewall Protection),
 * rather than crashing or showing raw error popups, this component gracefully
 * informs the visitor that the store is operating in high-performance cached mode.
 */
export default function ApiShieldBanner() {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');

  useEffect(() => {
    // Initial check on mount
    if (isCircuitBreakerOpen()) {
      setVisible(true);
      setReason('High traffic detected on server.');
    }

    const handleTrip = (e) => {
      setVisible(true);
      if (e?.detail?.reason) {
        setReason(e.detail.reason);
      }
    };

    const handleReset = () => {
      setVisible(false);
    };

    window.addEventListener('binnemat:circuit-breaker-tripped', handleTrip);
    window.addEventListener('binnemat:circuit-breaker-reset', handleReset);

    return () => {
      window.removeEventListener('binnemat:circuit-breaker-tripped', handleTrip);
      window.removeEventListener('binnemat:circuit-breaker-reset', handleReset);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm pointer-events-auto animate-fade-in">
      <div className="glass-apple bg-white/95 dark:bg-[#18181B]/95 border border-amber-500/30 dark:border-amber-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Zap size={18} className="animate-pulse" />
        </div>

        <div className="flex-1 pr-1">
          <div className="flex items-center gap-1.5 mb-1">
            <h4 className="font-wix font-bold text-xs text-neutral-900 dark:text-neutral-100 m-0 uppercase tracking-wider">
              High Traffic Mode Active
            </h4>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed m-0">
            Serving cached catalog to guarantee uninterrupted speed and protect connection limits.
          </p>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors p-1 -mr-1 -mt-1 rounded-lg"
          aria-label="Dismiss notice"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
