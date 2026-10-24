import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, CheckCircle, Package, TrendingUp, CreditCard } from 'lucide-react';
import { fetchAdminOrders, fetchAdminProducts } from '../../services/wooAdminService';
import AdminRevenueChart from './AdminRevenueChart';
import AdminStatusDonut from './AdminStatusDonut';

export default function AdminAnalyticsTab() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    processing: 0,
    completed: 0,
    totalProducts: 0,
    avgOrderValue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [ordersData, products] = await Promise.all([
          fetchAdminOrders(),
          fetchAdminProducts()
        ]);

        const orderList = Array.isArray(ordersData) ? ordersData : [];
        const productList = Array.isArray(products) ? products : [];
        setOrders(orderList);

        let revenue = 0;
        let proc = 0;
        let comp = 0;

        orderList.forEach(o => {
          if (o.status !== 'cancelled') {
            revenue += Number(o.total || 0);
          }
          if (o.status === 'processing') proc++;
          if (o.status === 'completed') comp++;
        });

        const activeOrderCount = proc + comp;
        const avg = activeOrderCount > 0 ? Math.round(revenue / activeOrderCount) : 0;

        setStats({
          totalRevenue: revenue,
          totalOrders: orderList.length,
          processing: proc,
          completed: comp,
          totalProducts: productList.length,
          avgOrderValue: avg
        });
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { label: 'Total Store Revenue', value: `Rs. ${stats.totalRevenue.toLocaleString()}`, icon: <DollarSign size={20} className="text-amber-500" />, sub: 'All non-cancelled orders' },
    { label: 'Average Order Value', value: `Rs. ${stats.avgOrderValue.toLocaleString()}`, icon: <CreditCard size={20} className="text-emerald-500" />, sub: 'Average cart ticket size' },
    { label: 'Total Customer Orders', value: stats.totalOrders, icon: <ShoppingCart size={20} className="text-blue-500" />, sub: 'All-time lifetime orders' },
    { label: 'Active Processing', value: stats.processing, icon: <TrendingUp size={20} className="text-indigo-500" />, sub: 'Pending dispatch' },
    { label: 'Delivered / Completed', value: stats.completed, icon: <CheckCircle size={20} className="text-emerald-500" />, sub: 'Successfully fulfilled' },
    { label: 'Live Catalog Items', value: stats.totalProducts, icon: <Package size={20} className="text-purple-500" />, sub: 'Active models in store' }
  ];

  return (
    <div className="space-y-6">
      {/* SUMMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-neutral-800 shadow-sm flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
              {c.icon}
            </div>
            <div>
              <span className="text-xs text-neutral-400 block font-light">{c.label}</span>
              <strong className="text-xl sm:text-2xl font-cinzel font-black text-neutral-900 dark:text-neutral-100 block my-0.5">
                {c.value}
              </strong>
              <span className="text-[11px] text-neutral-500 font-light block">{c.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE VISUAL CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdminRevenueChart orders={orders} />
        </div>
        <div>
          <AdminStatusDonut orders={orders} />
        </div>
      </div>
    </div>
  );
}
