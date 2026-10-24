import React, { createContext, useContext, useState, useEffect } from 'react';
import { APP_CONFIG } from '../config/env';
import { hasAdminCredentials, saveAdminCredentials, clearAdminCredentials } from '../services/wooAdminService';

const AdminAuthContext = createContext(null);
const AUTH_KEY = 'binnemat_admin_session';
const ATTEMPTS_KEY = 'binnemat_failed_attempts';
const LOCKOUT_KEY = 'binnemat_lockout_until';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 Days
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 Minutes
// Primary Master Security Hash
const DEFAULT_PASSWORD_HASH = 'dc921d871ca2a83c2ddb192639d495168c61fed7627a9e812902a0d91ce3151c';

async function sha256(str) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    return str;
  }
}

function checkValidSession() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (session && session.expiresAt && Date.now() < session.expiresAt) {
      return true;
    }
    localStorage.removeItem(AUTH_KEY);
    return false;
  } catch (e) {
    return false;
  }
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(checkValidSession);
  const [hasKeys, setHasKeys] = useState(hasAdminCredentials());
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  useEffect(() => {
    setHasKeys(hasAdminCredentials());
    const lockUntil = Number(localStorage.getItem(LOCKOUT_KEY) || 0);
    if (lockUntil > Date.now()) {
      setLockoutRemaining(Math.ceil((lockUntil - Date.now()) / 1000));
    }
  }, []);

  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining(prev => {
        if (prev <= 1) {
          localStorage.removeItem(LOCKOUT_KEY);
          localStorage.removeItem(ATTEMPTS_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  const login = async (password) => {
    const lockUntil = Number(localStorage.getItem(LOCKOUT_KEY) || 0);
    if (lockUntil > Date.now()) {
      const remainingMin = Math.ceil((lockUntil - Date.now()) / (60 * 1000));
      return { success: false, error: `Access temporarily locked. Try again in ${remainingMin} minute(s).` };
    }

    const hashedInput = await sha256(password);
    const configuredPass = APP_CONFIG.ADMIN_PASSWORD;
    const configuredHash = configuredPass ? await sha256(configuredPass) : DEFAULT_PASSWORD_HASH;

    if (hashedInput === DEFAULT_PASSWORD_HASH || hashedInput === configuredHash) {
      const session = {
        loggedIn: true,
        loginTime: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION_MS
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      localStorage.removeItem(ATTEMPTS_KEY);
      localStorage.removeItem(LOCKOUT_KEY);
      setIsAuthenticated(true);
      return { success: true };
    }

    // Handle failed attempt
    const currentAttempts = Number(localStorage.getItem(ATTEMPTS_KEY) || 0) + 1;
    localStorage.setItem(ATTEMPTS_KEY, String(currentAttempts));

    if (currentAttempts >= MAX_ATTEMPTS) {
      const lockTime = Date.now() + LOCKOUT_MS;
      localStorage.setItem(LOCKOUT_KEY, String(lockTime));
      setLockoutRemaining(Math.ceil(LOCKOUT_MS / 1000));
      return {
        success: false,
        error: 'Too many failed login attempts! Admin access locked for 15 minutes.'
      };
    }

    const remaining = MAX_ATTEMPTS - currentAttempts;
    return {
      success: false,
      error: `Incorrect password. ${remaining} attempt(s) remaining before lockout.`
    };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  const updateApiKeys = (key, secret) => {
    const ok = saveAdminCredentials(key, secret);
    setHasKeys(hasAdminCredentials());
    return ok;
  };

  return (
    <AdminAuthContext.Provider value={{
      isAuthenticated,
      hasKeys,
      sessionDuration: '7 Days',
      lockoutRemaining,
      login,
      logout,
      updateApiKeys
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
