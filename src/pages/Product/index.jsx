import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductSpecsTable from './ProductSpecsTable';
import ProductCarousel from '../../components/common/ProductCarousel';
import { fetchProductsByCategory } from '../../services/wooService';

export default function ProductView({ 
  product, 
  onSelectProduct, 
  onSelectCategory, 
  onNavigateHome 
}) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadRelated() {
      if (product?.category) {
        const prods = await fetchProductsByCategory(product.category);
        if (isMounted) {
          const filtered = prods.filter(p => p.id !== product.id);
          setRelatedProducts(filtered);
        }
      }
    }
    loadRelated();
    return () => { isMounted = false; };
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-[1360px] mx-auto px-[5%] py-20 text-center">
        <h2 className="font-cinzel text-2xl font-bold mb-4">No Product Selected</h2>
        <button 
          onClick={onNavigateHome}
          className="px-6 py-2.5 rounded-full bg-bn-gold text-white font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1360px] mx-auto px-[5%] py-8 relative z-10">
      {/* BREADCRUMB */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { title: <span onClick={onNavigateHome} className="cursor-pointer hover:text-bn-gold">Home</span> },
            { title: <span onClick={() => onSelectCategory(product.category || 'all')} className="cursor-pointer hover:text-bn-gold capitalize">{product.category?.replace('-', ' ') || 'Appliances'}</span> },
            { title: <span className="font-bold text-bn-goldDark dark:text-bn-goldLight line-clamp-1">{product.name}</span> }
          ]}
        />
      </div>

      {/* TOP SECTION: GALLERY + INFO (SPLIT 2 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6">
          <ProductGallery 
            images={product.images} 
            badge={product.badge} 
            name={product.name} 
          />
        </div>
        <div className="lg:col-span-6">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* TECHNICAL SPECIFICATIONS TABLE */}
      <ProductSpecsTable specs={product.specs} />

      {/* RELATED PRODUCTS CAROUSEL */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <ProductCarousel
            eyebrow="MATCHING CLIMATE SOLUTIONS"
            title="Related Certified Appliances"
            products={relatedProducts}
            onSelectProduct={onSelectProduct}
          />
        </div>
      )}
    </div>
  );
}
