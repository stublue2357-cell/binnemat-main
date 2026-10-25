import AdminContactSettingsCard from './AdminContactSettingsCard';
import AdminBrandingCard from './AdminBrandingCard';
﻿import React, { useState } from 'react';
import { Button, Input, message, Tag } from 'antd';
import { Key, ShieldCheck, RefreshCw, UploadCloud, User } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { fetchAdminOrders } from '../../services/wooAdminService';
import { resetCircuitBreaker, clearApiCache } from '../../services/apiShield';
import { queryClient } from '../../config/queryClient';
import { APP_CONFIG } from '../../config/env';

export default function AdminSettingsTab() {
  const { hasKeys, updateApiKeys } = useAdminAuth();
  const [ck, setCk] = useState(APP_CONFIG.WC_CONSUMER_KEY || localStorage.getItem('binnemat_admin_ck') || '');
  const [cs, setCs] = useState(APP_CONFIG.WC_CONSUMER_SECRET || localStorage.getItem('binnemat_admin_cs') || '');
  const [wpUser, setWpUser] = useState(localStorage.getItem('binnemat_wp_user') || APP_CONFIG.WP_USER || '');
  const [wpAppPass, setWpAppPass] = useState(localStorage.getItem('binnemat_wp_app_pass') || APP_CONFIG.WP_APP_PASS || '');
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(hasKeys ? 'configured' : 'missing');

  const handleSaveKeys = (e) => {
    e.preventDefault();
    const cleanKey = (ck || '').trim();
    const cleanSecret = (cs || '').trim();
    if (!cleanKey || !cleanSecret) {
      message.error('Please enter both Consumer Key and Consumer Secret');
      return;
    }
    const ok = updateApiKeys(cleanKey, cleanSecret);
    if (wpUser) localStorage.setItem('binnemat_wp_user', wpUser.trim());
    if (wpAppPass) localStorage.setItem('binnemat_wp_app_pass', wpAppPass.trim());

    if (ok) {
      message.success('API keys and upload credentials saved successfully!');
      setConnectionStatus('configured');
    }
  };

  const handleTestConnection = async () => {
    const cleanKey = (ck || '').trim();
    const cleanSecret = (cs || '').trim();
    if (!cleanKey || !cleanSecret) {
      message.warning('Please enter both Consumer Key and Consumer Secret first.');
      return;
    }
    updateApiKeys(cleanKey, cleanSecret);
    setTesting(true);
    try {
      const res = await fetchAdminProducts(1, { skipCache: true });
      setConnectionStatus('connected');
      message.success('Successfully connected to WooCommerce live database!');
    } catch (err) {
      setConnectionStatus('error');
      message.error(`Connection failed: ${err.message}`, 6);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* BRANDING CARD (LOGO & FAVICON) */}
      <AdminBrandingCard />
      {/* CONTACT & WHATSAPP CARD */}
      <AdminContactSettingsCard />
      <div className="p-6 rounded-3xl border border-bn-borderLight dark:border-neutral-800 bg-white dark:bg-[#18181B] shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-neutral-900 dark:text-neutral-100 m-0">
              WooCommerce REST API v3 Integration
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 mt-0.5">
              Connects this React frontend directly to your WordPress database.
            </p>
          </div>
          <Tag color={connectionStatus === 'connected' ? 'green' : connectionStatus === 'configured' ? 'blue' : 'orange'}>
            {connectionStatus.toUpperCase()}
          </Tag>
        </div>

        <form onSubmit={handleSaveKeys} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Consumer Key (ck_...)
            </label>
            <Input
              prefix={<Key size={14} className="text-neutral-400 mr-2" />}
              placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={ck}
              onChange={(e) => setCk(e.target.value)}
              className="rounded-xl h-11 bg-neutral-50 dark:bg-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Consumer Secret (cs_...)
            </label>
            <Input.Password
              placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={cs}
              onChange={(e) => setCs(e.target.value)}
              className="rounded-xl h-11 bg-neutral-50 dark:bg-neutral-900"
            />
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <h4 className="text-xs font-black uppercase text-bn-goldDark dark:text-bn-gold tracking-wider mb-2 flex items-center gap-1.5">
              <UploadCloud size={14} />
              <span>WordPress Media Library Direct Upload (Optional)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  WordPress Username
                </label>
                <Input
                  prefix={<User size={13} className="text-neutral-400 mr-1.5" />}
                  placeholder="e.g. admin"
                  value={wpUser}
                  onChange={(e) => setWpUser(e.target.value)}
                  className="rounded-xl h-10 bg-neutral-50 dark:bg-neutral-900 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                  Application Password
                </label>
                <Input.Password
                  placeholder="Generated in Users -> Profile"
                  value={wpAppPass}
                  onChange={(e) => setWpAppPass(e.target.value)}
                  className="rounded-xl h-10 bg-neutral-50 dark:bg-neutral-900 text-xs"
                />
              </div>
            </div>
            <span className="text-[10px] text-neutral-400 block mt-1 font-light">
              Found in wp-admin &rarr; Users &rarr; Profile &rarr; Application Passwords. Allows uploading files from computer to WordPress Media Library.
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-3">
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-xl font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white h-10 px-6 shadow-md"
            >
              Save Credentials
            </Button>
            <Button
              onClick={handleTestConnection}
              loading={testing}
              icon={<RefreshCw size={14} />}
              className="rounded-xl font-bold h-10 px-5"
            >
              Test Live Connection
            </Button>
            <Button
              onClick={() => {
                resetCircuitBreaker();
                clearApiCache();
                queryClient.clear();
                message.success('API Shield reset and TanStack cache cleared successfully!');
              }}
              className="rounded-xl font-semibold h-10 px-4 text-xs border-dashed"
            >
              Clear API Cache &amp; Reset Shield
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
