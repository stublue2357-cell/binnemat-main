import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Select, Input } from 'antd';
import { Search } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';

export default function CategoryProductsGrid({ products, onSelectProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const gridRef = useRef(null);

  const filtered = (products || []).filter((p) => {
    return p.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    return 0;
  });

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-prod-card',
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, [sorted.length, sortBy]);

  return (
    <div ref={gridRef}>
      {/* SEARCH & SORT HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="w-full sm:w-72">
          <Input
            prefix={<Search size={15} className="text-slate-400" />}
            placeholder="Search within this collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            className="rounded-full h-10 px-4 border-[#E5E4E2] dark:border-white/10"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-500 font-semibold font-wix">Sort By:</span>
          <Select
            value={sortBy}
            onChange={setSortBy}
            className="w-44 rounded-full"
            options={[
              { value: 'featured', label: 'Featured Models' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' }
            ]}
          />
        </div>
      </div>

      {/* PRODUCTS DISPLAY */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((item) => (
            <div key={item.id} className="gsap-prod-card">
              <ProductCard 
                product={item} 
                onSelectProduct={onSelectProduct} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-apple-card text-center py-16 px-6 rounded-3xl border border-[#E5E4E2] dark:border-white/10 shadow-sm relative overflow-hidden">
          <h3 className="font-wix text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            No Matching Appliances
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try choosing a different sub-category tab on the left or resetting your search keyword.
          </p>
        </div>
      )}
    </div>
  );
}
