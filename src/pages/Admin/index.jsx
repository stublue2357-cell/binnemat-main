import React, { useState } from 'react';
import { Button, Tag } from 'antd';
import { 
  ShoppingCart, 
  Package, 
  Layers, 
  BarChart3, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminOrdersTab from './AdminOrdersTab';
import AdminProductsTab from './AdminProductsTab';
import AdminCategoriesTab from './AdminCategoriesTab';
import AdminAnalyticsTab from './AdminAnalyticsTab';
import AdminSettingsTab from './AdminSettingsTab';

export default function AdminPage({ onNavigateHome }) {
  const { isAuthenticated, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('orders');

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const tabs = [
    { id: 'orders', label: 'Live Orders', icon: <ShoppingCart size={15} /> },
    { id: 'products', label: 'Products', icon: <Package size={15} /> },
    { id: 'categories', label: 'Categories', icon: <Layers size={15} /> },
    { id: 'analytics', label: 'Revenue & Stats', icon: <BarChart3 size={15} /> },
    { id: 'settings', label: 'API & Keys', icon: <Settings size={15} /> }
  ];

  return (
    <div className="max-w-[1360px] mx-auto px-[5%] py-8 relative z-10 space-y-6">
      {/* TOP ADMIN BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-neutral-900 text-white shadow-xl border border-neutral-800">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-bn-gold/20 text-bn-goldLight flex items-center justify-center border border-bn-gold/40">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-cinzel text-lg font-black text-white m-0">
                Binnemat Master Admin
              </h2>
              <Tag color="gold" className="text-[10px] font-black uppercase m-0">
                Headless Control
              </Tag>
            </div>
            <span className="text-xs text-neutral-400 font-light block">
              Pure Frontend Management &bull; Zero wp-admin dependency
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="small"
            onClick={onNavigateHome}
            icon={<ExternalLink size={13} />}
            className="rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border-white/20"
          >
            Storefront View
          </Button>
          <Button
            size="small"
            danger
            icon={<LogOut size={13} />}
            onClick={logout}
            className="rounded-xl text-xs font-bold"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-neutral-200 dark:border-neutral-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap border ${
              activeTab === tab.id
                ? 'bg-bn-gold text-white border-bn-gold shadow-md'
                : 'bg-white dark:bg-[#18181B] text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-bn-gold/40'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ACTIVE TAB CONTENT */}
      <div>
        {activeTab === 'orders' && <AdminOrdersTab />}
        {activeTab === 'products' && <AdminProductsTab />}
        {activeTab === 'categories' && <AdminCategoriesTab />}
        {activeTab === 'analytics' && <AdminAnalyticsTab />}
        {activeTab === 'settings' && <AdminSettingsTab />}
      </div>
    </div>
  );
}
