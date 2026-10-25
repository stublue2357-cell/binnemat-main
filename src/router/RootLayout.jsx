import React, { useEffect } from 'react';
import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import AmbientGlow from '../components/common/AmbientGlow';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import { SiteBrandingProvider } from '../context/SiteBrandingContext';
import { APP_CONFIG } from '../config/env';

export default function RootLayout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState?.location?.pathname || '/';
  const isHome = currentPath === '/';

  // Stealth entrance: Ctrl + Shift + A (or Cmd + Shift + A) navigates to secret admin portal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate({ to: APP_CONFIG.ADMIN_PATH || '/bn-portal-2026' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <SiteBrandingProvider>
      <div className="min-h-screen bg-bn-cream dark:bg-bn-dark text-neutral-900 dark:text-neutral-100 transition-colors duration-300 relative flex flex-col justify-between">
        {/* PARALLAX AMBIENT GLOW */}
        <AmbientGlow />

        {/* HEADER WITH CART BUTTON */}
        <Navbar />

        {/* DYNAMIC ROUTE OUTLET WITH LUXURY TOP CLEARANCE BELOW FIXED NAVBAR */}
        <main className={`relative z-10 flex-grow pb-16 ${isHome ? '' : 'pt-24 sm:pt-28 md:pt-32'}`}>
          <Outlet />
        </main>

        {/* GLOBAL RIGHT-SIDE CART DRAWER */}
        <CartDrawer 
          onNavigateCategory={(slug) => navigate({ to: '/category/' + slug })} 
        />

        {/* FOOTER */}
        <Footer />
      </div>
    </SiteBrandingProvider>
  );
}
