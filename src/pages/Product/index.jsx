import React from 'react';
import { Breadcrumb } from 'antd';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductSpecsTable from './ProductSpecsTable';
import ProductCarousel from '../../components/common/ProductCarousel';
import { useProductsByCategoryQuery } from '../../hooks/useWooQueries';

export default function ProductView({ 
  product, 
  onSelectProduct, 
  onSelectCategory, 
  onNavigateHome 
}) {
  // Uses cached category products (0 network calls when navigating from catalog/home)
  const { data: categoryProducts = [] } = useProductsByCategoryQuery(product?.category);
  const relatedProducts = (categoryProducts || []).filter(p => p.id !== product?.id);

  if (!product) {
    return (
      <div className="max-w-[1360px] mx-auto px-[5%] py-20 text-center">
        <h2 className="font-wix text-2xl font-bold mb-4">No Product Selected</h2>
        <button 
          onClick={onNavigateHome}
          className="px-6 py-2.5 rounded-full bg-[#6F4E37] text-white font-bold cursor-pointer border-none shadow-sm hover:bg-[#8C6547] transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1360px] mx-auto px-[5%] py-4 sm:py-6 relative z-10">
      {/* BREADCRUMB */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { title: <span onClick={onNavigateHome} className="cursor-pointer hover:text-[#6F4E37]">Home</span> },
            { title: <span onClick={() => onSelectCategory(product.category || 'all')} className="cursor-pointer hover:text-[#6F4E37] capitalize">{product.category?.replace('-', ' ') || 'Appliances'}</span> },
            { title: <span className="font-bold text-[#6F4E37] dark:text-[#C49774] line-clamp-1">{product.name}</span> }
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
