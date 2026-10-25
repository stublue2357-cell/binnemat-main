import React, { useState } from 'react';
import { Button, Input, message, Alert } from 'antd';
import { Lock, ShieldCheck, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminLogin() {
  const { login, lockoutRemaining } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isLocked = lockoutRemaining > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) {
      message.warning(`Access locked. Please wait ${lockoutRemaining} seconds.`);
      return;
    }
    if (!password) {
      message.error('Please enter admin master password');
      return;
    }

    setLoading(true);
    try {
      const res = await login(password);
      if (res.success) {
        message.success('Admin portal unlocked successfully');
      } else {
        message.error(res.error || 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl border border-[#E5E4E2] dark:border-white/10 glass-apple-card shadow-2xl relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#E6EDFD] dark:bg-[#6F4E37]/20 text-[#6F4E37] dark:text-[#E6EDFD] flex items-center justify-center mx-auto mb-4 border border-[#E5E4E2] dark:border-white/10 shadow-sm">
            <ShieldCheck size={32} />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EDFD] dark:bg-[#6F4E37]/20 border border-[#E5E4E2] dark:border-white/10 text-[#6F4E37] dark:text-[#E6EDFD] text-[10px] font-black uppercase tracking-widest mb-3">
            <Sparkles size={11} className="text-[#8C6547]" />
            <span>PROTECTED GATEWAY</span>
          </span>
          <h1 className="font-wix text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white m-0 tracking-tight">
            Store Command Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-normal">
            Authorized management portal for orders, catalog, and inventory.
          </p>
        </div>

        {isLocked && (
          <div className="mb-4">
            <Alert
              type="error"
              showIcon
              icon={<AlertTriangle size={16} />}
              message="Security Lockout Active"
              description={`Too many incorrect attempts. Locked for ${Math.floor(lockoutRemaining / 60)}m ${lockoutRemaining % 60}s.`}
              className="rounded-2xl text-xs"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider font-wix">
              Admin Master Password
            </label>
            <Input.Password
              prefix={<Lock size={16} className="text-slate-400 mr-2" />}
              placeholder="Enter Master Security Passphrase"
              value={password}
              disabled={isLocked}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-2xl h-12 px-4 border-[#E5E4E2] dark:border-white/10"
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={isLocked}
            icon={<ArrowRight size={16} />}
            className="w-full h-12 rounded-full font-bold bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 border-none text-white shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            {isLocked ? `Locked (${lockoutRemaining}s)` : 'Unlock Dashboard'}
          </Button>
        </form>
      </div>
    </div>
  );
}
