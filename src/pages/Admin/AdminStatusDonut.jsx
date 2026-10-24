import React from 'react';
import { PieChart, CheckCircle2 } from 'lucide-react';

export default function AdminStatusDonut({ orders = [] }) {
  const total = orders.length;
  let completed = 0;
  let processing = 0;
  let cancelled = 0;
  let other = 0;

  orders.forEach(o => {
    if (o.status === 'completed') completed++;
    else if (o.status === 'processing') processing++;
    else if (o.status === 'cancelled') cancelled++;
    else other++;
  });

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // SVG circular segments
  const size = 160;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { label: 'Completed', count: completed, color: '#10B981', ringColor: 'text-emerald-500' },
    { label: 'Processing', count: processing, color: '#6366F1', ringColor: 'text-indigo-500' },
    { label: 'Cancelled', count: cancelled, color: '#F43F5E', ringColor: 'text-rose-500' },
    { label: 'On Hold', count: other, color: '#F59E0B', ringColor: 'text-amber-500' }
  ];

  let accumulatedOffset = 0;

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-neutral-800 shadow-sm space-y-4 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-bn-goldDark dark:text-bn-gold block flex items-center gap-1.5">
          <PieChart size={14} />
          <span>Fulfillment Breakdown</span>
        </span>
        <h4 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100 m-0">
          Order Status Distribution
        </h4>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-2">
        {/* DONUT SVG */}
        <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              className="text-neutral-100 dark:text-neutral-800"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Segment arcs */}
            {total > 0 && segments.map((seg, idx) => {
              if (seg.count === 0) return null;
              const segRatio = seg.count / total;
              const strokeDasharray = `${segRatio * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedOffset;
              accumulatedOffset += segRatio * circumference;

              return (
                <circle
                  key={idx}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  fill="transparent"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Center stats */}
          <div className="absolute text-center select-none pointer-events-none">
            <span className="text-xl font-cinzel font-black text-neutral-900 dark:text-neutral-100 block">
              {completionRate}%
            </span>
            <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider block">
              Fulfilled
            </span>
          </div>
        </div>

        {/* LEGEND LIST */}
        <div className="space-y-2 text-xs flex-grow max-w-[180px]">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                <span>{seg.label}</span>
              </span>
              <strong className="font-mono text-neutral-900 dark:text-neutral-100">
                {seg.count} ({total > 0 ? Math.round((seg.count / total) * 100) : 0}%)
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
