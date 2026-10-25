import React from 'react';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';
import { Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const imgSrc = product?.images?.[0]?.src || product?.image || SAFE_SVG_PLACEHOLDER;
  const badgeText = product?.badge || "ORIGINAL";
  const formattedPrice = product?.formatted_price || "Rs. 24,800";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      onClick={() => onSelectProduct && onSelectProduct(product)}
      className="glass-apple-card group relative rounded-3xl overflow-hidden border border-[#E5E4E2] dark:border-white/[0.1] hover:border-[#6F4E37]/45 bg-white/95 dark:bg-[#161311]/95 shadow-md hover:shadow-[0_15px_40px_rgba(111,78,55,0.14)] transition-all duration-500 flex flex-col cursor-pointer"
    >
      {/* THUMBNAIL CONTAINER */}
      <div className="h-52 bg-[#F6F5F4] dark:bg-[#0D0B0A] p-3 flex items-center justify-center relative overflow-hidden">
        {/* Subtle Ambient Radial Backlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(111,78,55,0.08)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="absolute top-3 left-3 z-10 bg-[#E6EDFD]/90 dark:bg-[#221B18]/90 text-[#6F4E37] dark:text-[#E5E4E2] border border-[#E5E4E2] dark:border-white/10 text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-md">
          {badgeText}
        </span>

        <img 
          src={imgSrc} 
          alt={product?.name || "Appliance"}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
          }}
          className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-108 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
        />
      </div>

      {/* CONTENT BODY */}
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-xs sm:text-sm font-wix font-bold text-slate-900 dark:text-white line-clamp-2 min-h-[38px] mb-2 leading-snug group-hover:text-[#6F4E37] dark:group-hover:text-[#C49774] transition-colors">
          {product?.name}
        </h4>

        <div className="mt-auto mb-3 flex items-baseline justify-between">
          <span className="text-base sm:text-lg font-wix font-extrabold text-[#6F4E37] dark:text-[#E5E4E2]">
            {formattedPrice}
          </span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-semibold">
            Factory Sealed
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectProduct) onSelectProduct(product);
            }}
            className="rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.14] text-slate-800 dark:text-slate-200 border border-[#E5E4E2] dark:border-white/10 h-9 cursor-pointer transition-colors"
          >
            <Eye size={13} className="text-slate-500 dark:text-slate-400" />
            <span>Details</span>
          </button>
          <button 
            onClick={handleAddToCart}
            className="rounded-full text-xs font-bold flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#6F4E37] to-[#8C6547] hover:brightness-105 border-none text-white shadow-sm h-9 cursor-pointer transition-all"
          >
            <ShoppingBag size={13} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
