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
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl border border-bn-borderLight dark:border-neutral-800 bg-white/90 dark:bg-[#18181B]/95 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center mx-auto mb-4 border border-bn-gold/30 shadow-md">
            <ShieldCheck size={32} />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-bn-gold/20 border border-bn-gold/40 text-bn-goldDark dark:text-bn-goldLight text-[10px] font-black uppercase tracking-widest mb-2">
            <Sparkles size={11} className="text-amber-500" />
            <span>PROTECTED GATEWAY</span>
          </span>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 m-0">
            Store Command Center
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-light">
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
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
              Admin Master Password
            </label>
            <Input.Password
              prefix={<Lock size={16} className="text-neutral-400 mr-2" />}
              placeholder="Enter Master Security Passphrase"
              value={password}
              disabled={isLocked}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-2xl h-12 px-4 bg-neutral-50 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white"
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={isLocked}
            icon={<ArrowRight size={16} />}
            className="w-full h-12 rounded-2xl font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            {isLocked ? `Locked (${lockoutRemaining}s)` : 'Unlock Dashboard'}
          </Button>
        </form>
      </div>
    </div>
  );
}
