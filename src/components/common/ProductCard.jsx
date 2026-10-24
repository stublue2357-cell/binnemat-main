import React from 'react';
import { Button } from 'antd';
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
      className="glass-panel luxury-card group relative rounded-3xl overflow-hidden border-2 border-bn-borderLight dark:border-bn-borderDark hover:border-bn-gold dark:hover:border-bn-gold bg-white/95 dark:bg-[#18181B]/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* THUMBNAIL CONTAINER WITH HIGH-RES PHOTO */}
      <div className="h-52 bg-neutral-900 p-0 flex items-center justify-center relative overflow-hidden transition-colors">
        <span className="absolute top-3 left-3 z-10 bg-neutral-950/90 text-bn-goldLight border border-bn-gold/40 text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm">
          {badgeText}
        </span>

        <img 
          src={imgSrc} 
          alt={product?.name || "Appliance"}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
      </div>

      {/* CONTENT BODY */}
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 min-h-[40px] mb-2 leading-snug group-hover:text-bn-gold transition-colors">
          {product?.name}
        </h4>

        <div className="mt-auto mb-3">
          <span className="text-lg font-black text-bn-goldDark dark:text-bn-goldLight">
            {formattedPrice}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            icon={<Eye size={13} />} 
            onClick={() => onSelectProduct && onSelectProduct(product)}
            className="rounded-full text-xs font-semibold flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 text-neutral-800 border border-neutral-300 h-9"
          >
            Details
          </Button>
          <Button 
            type="primary" 
            icon={<ShoppingBag size={13} />} 
            onClick={handleAddToCart}
            className="rounded-full text-xs font-bold flex items-center justify-center bg-bn-gold hover:bg-bn-goldDark border-none text-white shadow-sm h-9"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
