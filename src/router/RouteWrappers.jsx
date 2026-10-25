import AdminPage from '../pages/Admin';
﻿import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import Home from '../pages/Home';
import CategoryView from '../pages/Categories';
import ProductView from '../pages/Product';
import AboutPage from '../pages/About';
import ContactPage from '../pages/Contact';
import FaqsPage from '../pages/Faqs';
import PolicyPage from '../pages/Policy';
import WarrantyPolicy from '../pages/Policy/WarrantyPolicy';
import ShippingPolicy from '../pages/Policy/ShippingPolicy';
import ReturnPolicy from '../pages/Policy/ReturnPolicy';
import PrivacyPolicy from '../pages/Policy/PrivacyPolicy';
import TermsPolicy from '../pages/Policy/TermsPolicy';
import { fetchProductBySlug } from '../services/wooService';

export function HomeRoute() {
  const navigate = useNavigate();
  return (
    <Home
      onSelectProduct={(p) => navigate({ to: `/product/${p.slug}` })}
      onSelectCategory={(slug) => navigate({ to: `/category/${slug}` })}
      setActivePage={(page) => navigate({ to: page === 'home' ? '/' : `/${page}` })}
    />
  );
}

export function CategoriesRoute() {
  const navigate = useNavigate();
  return (
    <CategoryView
      initialCategory="all"
      onSelectProduct={(p) => navigate({ to: `/product/${p.slug}` })}
      onNavigateHome={() => navigate({ to: '/' })}
    />
  );
}

export function CategorySlugRoute() {
  const navigate = useNavigate();
  const { slug } = useParams({ strict: false });
  return (
    <CategoryView
      initialCategory={slug || 'all'}
      onSelectProduct={(p) => navigate({ to: `/product/${p.slug}` })}
      onNavigateHome={() => navigate({ to: '/' })}
    />
  );
}

export function ProductSlugRoute() {
  const navigate = useNavigate();
  const { slug } = useParams({ strict: false });
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    async function load() {
      const data = await fetchProductBySlug(slug);
      if (isMounted) {
        setProduct(data);
        setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-[1360px] mx-auto px-[5%] py-24 text-center">
        <div className="w-10 h-10 border-4 border-[#6F4E37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-500 font-wix font-semibold">Loading certified appliance specifications...</p>
      </div>
    );
  }

  return (
    <ProductView
      product={product}
      onSelectProduct={(p) => navigate({ to: `/product/${p.slug}` })}
      onSelectCategory={(cSlug) => navigate({ to: `/category/${cSlug}` })}
      onNavigateHome={() => navigate({ to: '/' })}
    />
  );
}

export function AboutRoute() {
  return <AboutPage />;
}

export function ContactRoute() {
  return <ContactPage />;
}

export function FaqsRoute() {
  return <FaqsPage />;
}

export function PolicyRoute() {
  return <PolicyPage />;
}

export function WarrantyRoute() {
  return <WarrantyPolicy />;
}

export function ShippingRoute() {
  return <ShippingPolicy />;
}

export function ReturnRoute() {
  return <ReturnPolicy />;
}

export function PrivacyRoute() {
  return <PrivacyPolicy />;
}

export function TermsRoute() {
  return <TermsPolicy />;
}


export function AdminRoute() {
  const navigate = useNavigate();
  return <AdminPage onNavigateHome={() => navigate({ to: '/' })} />;
}

export function DecoyAdminRoute() {
  const navigate = useNavigate();
  return (
    <div className="max-w-[700px] mx-auto px-4 py-28 text-center space-y-4">
      <span className="font-wix text-7xl font-black text-slate-300 dark:text-neutral-700 block select-none">
        404
      </span>
      <h2 className="font-wix text-xl font-bold text-slate-800 dark:text-slate-200 m-0">
        Page Not Found
      </h2>
      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
        The requested URL was not found on this server. Please check your link or return to the main store.
      </p>
      <button
        onClick={() => navigate({ to: '/' })}
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 text-white font-bold text-xs transition-all shadow-md cursor-pointer border-none"
      >
        Return to Home Store
      </button>
    </div>
  );
}
