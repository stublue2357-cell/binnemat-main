import React, { useState, useEffect } from 'react';
import SuperconsciousHero from './SuperconsciousHero';
import CampaignBannerSection from './CampaignBannerSection';
import SuperconsciousTypographySection from './SuperconsciousTypographySection';
import SuperconsciousWidgetsSection from './SuperconsciousWidgetsSection';
import CategoriesSection from './CategoriesSection';
import EnergyBannerSection from './EnergyBannerSection';
import ManifestoSection from './ManifestoSection';
import TestimonialsSection from './TestimonialsSection';
import BrandLogosSection from './BrandLogosSection';
import NewsletterSection from './NewsletterSection';
import ProductCarousel from '../../components/common/ProductCarousel';
import { 
  useCategoriesQuery, 
  useProductsByCategoryQuery 
} from '../../hooks/useWooQueries';

export default function Home({ onSelectProduct, onSelectCategory, setActivePage }) {
  // TanStack Query caching with 5-minute staleTime (0 network calls on component re-mounts)
  const { data: categories = [] } = useCategoriesQuery();
  const { data: winterProducts = [] } = useProductsByCategoryQuery('winter-collection');
  const { data: summerProducts = [] } = useProductsByCategoryQuery('summer-collection');
  const { data: cookingProducts = [] } = useProductsByCategoryQuery('stoves-hobs');

  return (
    <div className="relative z-10 bg-[#F7F6F4] dark:bg-[#0E0C0B] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* 1. SUPERCONSCIOUS HERO SECTION WITH 3D SPATIAL APPLIANCES & AURORA GLOW */}
      <SuperconsciousHero 
        onSelectProduct={onSelectProduct}
        onExploreClick={() => onSelectCategory && onSelectCategory('winter-collection')}
        onSelectCategory={onSelectCategory}
      />

      {/* 2. THE BINNEMAT URDU MANIFESTO ("ہر گھر کا سکون") */}
      <ManifestoSection />

      {/* 3. CAMPAIGN HIGHLIGHT BAR (FROSTED PILL CARDS) */}
      <CampaignBannerSection />

      {/* 4. SUPERCONSCIOUS SIGNATURE CAPSULE TYPOGRAPHY (CONTROL YOUR REALITY STYLE) */}
      <SuperconsciousTypographySection />

      {/* FIXED STILL BACKGROUND (MOCHA BROWN, PLATINUM SILVER & PALE LAVENDER AURORA) */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[#F7F6F4] dark:bg-[#0E0C0B] transition-colors duration-300">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-[#E6EDFD]/60 dark:bg-[#E6EDFD]/[0.06] blur-[150px] rounded-full" />
        <div className="absolute top-[55%] right-[-5%] w-[650px] h-[650px] bg-[#6F4E37]/[0.045] dark:bg-[#6F4E37]/[0.1] blur-[130px] rounded-full" />
        <div className="absolute top-[80%] left-[-5%] w-[550px] h-[550px] bg-[#E5E4E2]/50 dark:bg-[#E5E4E2]/[0.04] blur-[120px] rounded-full" />
      </div>

      {/* 4. UPGRADE YOUR LIVING - PINNED STACKING CARDS (BACKGROUND STILL, CARDS SLIDE UP) */}
      <SuperconsciousWidgetsSection onSelectCategory={onSelectCategory} />

      {/* 6. WINTER COLLECTION CAROUSEL (ELECTRIC GEYSERS) */}
      <section className="max-w-[1360px] mx-auto px-[5%]">
        <ProductCarousel
          eyebrow="THERMAL COMFORT &bull; 3S FASTHEAT"
          title="Winter Collection (Electric Geysers)"
          products={winterProducts}
          onSelectProduct={onSelectProduct}
        />
      </section>

      {/* 8. 30W BLDC FANS MARKETING BILL COMPARISON BANNER */}
      <EnergyBannerSection onShopClick={() => onSelectCategory && onSelectCategory('summer-collection')} />

      {/* 9. SUMMER COLLECTION CAROUSEL (BLDC & ELECTRIC FANS) */}
      <section className="max-w-[1360px] mx-auto px-[5%]">
        <ProductCarousel
          eyebrow="AERODYNAMIC COOLING &bull; 30W SOLAR INVERTERS"
          title="Summer Collection (BLDC & Electric Fans)"
          products={summerProducts}
          onSelectProduct={onSelectProduct}
        />
      </section>

      {/* 10. COOKING PRODUCTS CAROUSEL (STOVES & BUILT-IN HOBS) */}
      <section className="max-w-[1360px] mx-auto px-[5%]">
        <ProductCarousel
          eyebrow="CULINARY MASTERY &bull; 8MM BEVELED GLASS"
          title="Cooking Stoves & Built-in Hobs"
          products={cookingProducts}
          onSelectProduct={onSelectProduct}
        />
      </section>

      {/* 11. CATEGORIES DIRECTORY GRID IN FROSTED GLASS */}
      <CategoriesSection 
        categories={categories} 
        onSelectCategory={onSelectCategory}
        onViewAllClick={() => setActivePage && setActivePage('categories')}
      />

      {/* 13. REAL PAKISTANI HOMES VERIFIED REVIEWS */}
      <TestimonialsSection />

      {/* 14. OFFICIAL BRAND PARTNERS */}
      <BrandLogosSection />

      {/* 15. VIP CONCIERGE & CAPSULE NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
}
