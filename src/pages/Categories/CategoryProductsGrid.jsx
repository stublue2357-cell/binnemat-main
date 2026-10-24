import React, { useState } from 'react';
import { Select, Input } from 'antd';
import { Search } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';

export default function CategoryProductsGrid({ products, onSelectProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = (products || []).filter((p) => {
    return p.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    return 0;
  });

  return (
    <div>
      {/* SEARCH & SORT HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="w-full sm:w-72">
          <Input
            prefix={<Search size={15} className="text-neutral-400" />}
            placeholder="Search within this collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            className="rounded-full h-10 px-4"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-neutral-500 font-semibold">Sort By:</span>
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
            <ProductCard 
              key={item.id} 
              product={item} 
              onSelectProduct={onSelectProduct} 
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel text-center py-16 px-6 rounded-3xl border border-bn-borderLight dark:border-bn-borderDark">
          <h3 className="font-cinzel text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            No Matching Appliances
          </h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">
            Try choosing a different sub-category tab on the left or resetting your search keyword.
          </p>
        </div>
      )}
    </div>
  );
}
