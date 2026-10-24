import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import CampaignBannerSection from './CampaignBannerSection';
import ManifestoSection from './ManifestoSection';
import CategoriesSection from './CategoriesSection';
import TechFeatureSection from './TechFeatureSection';
import ValueSection from './ValueSection';
import EnergyBannerSection from './EnergyBannerSection';
import DividerSection from './DividerSection';
import TestimonialsSection from './TestimonialsSection';
import BrandLogosSection from './BrandLogosSection';
import NewsletterSection from './NewsletterSection';
import Heater3DScrollShowcase from './HeaterScrollShowcase';
import ProductCarousel from '../../components/common/ProductCarousel';
import { fetchLiveCategories, fetchLiveProductsBySlug } from '../../services/wooService';

export default function Home({ onSelectProduct, onSelectCategory, setActivePage }) {
  const [categories, setCategories] = useState([]);
  const [winterProducts, setWinterProducts] = useState([]);
  const [summerProducts, setSummerProducts] = useState([]);
  const [cookingProducts, setCookingProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const [cats, winter, summer, cooking] = await Promise.all([
        fetchLiveCategories(),
        fetchLiveProductsBySlug('winter-collection'),
        fetchLiveProductsBySlug('summer-collection'),
        fetchLiveProductsBySlug('stoves-hobs')
      ]);

      if (isMounted) {
        setCategories(cats);
        setWinterProducts(winter);
        setSummerProducts(summer);
        setCookingProducts(cooking);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="relative z-10 space-y-4">
      {/* 1. HERO SECTION WITH MARKETING PHOTOGRAPHY */}
      <HeroSection onExploreClick={() => onSelectCategory && onSelectCategory('winter-collection')} />

      {/* 2. 4-POINT CAMPAIGN HIGHLIGHT BAR */}
      <CampaignBannerSection />

      {/* 3. URDU MANIFESTO SLOGAN */}
      <ManifestoSection />

      {/* 4. CATEGORIES DIRECTORY GRID WITH RICH IMAGERY */}
      <CategoriesSection 
        categories={categories} 
        onSelectCategory={onSelectCategory}
        onViewAllClick={() => setActivePage && setActivePage('categories')}
      />

      {/* 5. FASTHEAT & INCOLOY HARD-WATER MARKETING SPLIT */}
      <TechFeatureSection />

      {/* 6. VALUE PROMISE TILES */}
      <ValueSection />

      {/* 7. IMMERSIVE 3D SCROLL-DRIVEN ROTATING HEATER SHOWCASE */}
      <Heater3DScrollShowcase 
        liveProducts={winterProducts}
        onSelectProduct={onSelectProduct}
      />

      {/* 8. WINTER COLLECTION CAROUSEL (ELECTRIC GEYSERS) */}
      <section className="max-w-[1360px] mx-auto px-[5%]">
        <ProductCarousel
          eyebrow="WINTER WARMTH &bull; FASTHEAT"
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
          eyebrow="BEAT THE HEAT &bull; 30W ECO SAVERS"
          title="Summer Collection (BLDC & Electric Fans)"
          products={summerProducts}
          onSelectProduct={onSelectProduct}
        />
      </section>

      {/* 10. SECTION DIVIDER TILES (GEYSERS & BUILT-IN HOBS) */}
      <DividerSection 
        onExploreGeysers={() => onSelectCategory && onSelectCategory('winter-collection')}
        onExploreHobs={() => onSelectCategory && onSelectCategory('stoves-hobs')}
      />

      {/* 11. COOKING PRODUCTS CAROUSEL (STOVES & BUILT-IN HOBS) */}
      <section className="max-w-[1360px] mx-auto px-[5%]">
        <ProductCarousel
          eyebrow="CULINARY MASTERY &bull; 8MM GLASS"
          title="Cooking Stoves & Built-in Hobs"
          products={cookingProducts}
          onSelectProduct={onSelectProduct}
        />
      </section>

      {/* 12. CUSTOMER VOICES */}
      <TestimonialsSection />

      {/* 13. OFFICIAL BRAND PARTNERS */}
      <BrandLogosSection />

      {/* 14. VIP NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
}
