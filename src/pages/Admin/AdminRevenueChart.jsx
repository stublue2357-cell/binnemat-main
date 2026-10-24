import React, { useState, useMemo } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

export default function AdminRevenueChart({ orders = [] }) {
  const [activePoint, setActivePoint] = useState(null);

  // Group orders into last 7 daily buckets
  const chartData = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
      days.push({ key, label, revenue: 0, count: 0 });
    }

    orders.forEach(o => {
      if (o.status === 'cancelled') return;
      const orderDate = (o.date_created || new Date().toISOString()).split('T')[0];
      const match = days.find(d => d.key === orderDate);
      if (match) {
        match.revenue += Number(o.total || 0);
        match.count += 1;
      } else if (days[days.length - 1]) {
        // Fallback to recent day if outside range
        days[days.length - 1].revenue += Number(o.total || 0);
        days[days.length - 1].count += 1;
      }
    });

    return days;
  }, [orders]);

  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 10000);
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = chartData.map((d, idx) => {
    const x = paddingX + (idx / (chartData.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (d.revenue / maxRevenue) * (height - paddingY * 2);
    return { ...d, x, y };
  });

  const linePath = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-neutral-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-bn-goldDark dark:text-bn-gold block flex items-center gap-1.5">
            <TrendingUp size={14} />
            <span>Revenue Trajectory</span>
          </span>
          <h4 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100 m-0">
            Daily Sales & Cashflow (Last 7 Days)
          </h4>
        </div>
        {activePoint ? (
          <div className="text-right">
            <span className="text-xs text-neutral-400 block">{activePoint.label}</span>
            <strong className="text-sm font-cinzel font-bold text-bn-gold">
              Rs. {activePoint.revenue.toLocaleString()} ({activePoint.count} orders)
            </strong>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Calendar size={13} />
            <span>Hover on points for details</span>
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 select-none">
          <defs>
            <linearGradient id="goldRevenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C49A45" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C49A45" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.5, 1].map((ratio, i) => {
            const y = height - paddingY - ratio * (height - paddingY * 2);
            return (
              <g key={i}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeDasharray="3 3" />
                <text x={paddingX - 6} y={y + 3} textAnchor="end" className="text-[9px] fill-neutral-400 font-mono">
                  {Math.round((maxRevenue * ratio) / 1000)}k
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#goldRevenueGrad)" />

          {/* Line Stroke */}
          <path d={linePath} fill="none" stroke="#C49A45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r={activePoint?.key === p.key ? 6 : 4}
                className="fill-white dark:fill-neutral-900 stroke-bn-gold stroke-[2.5px] cursor-pointer transition-all"
                onMouseEnter={() => setActivePoint(p)}
                onMouseLeave={() => setActivePoint(null)}
              />
              <text x={p.x} y={height - 10} textAnchor="middle" className="text-[10px] fill-neutral-500 font-sans">
                {p.label.split(',')[0]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
