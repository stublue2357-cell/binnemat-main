import React, { useState, useEffect } from 'react';
import AllCategoriesGrid from './AllCategoriesGrid';
import CategoryHeader from './CategoryHeader';
import CategorySidebarFilter from './CategorySidebarFilter';
import CategoryProductsGrid from './CategoryProductsGrid';
import { fetchLiveCategories, fetchProductsByCategory } from '../../services/wooService';

export default function CategoryView({ 
  initialCategory = 'all', 
  onSelectProduct, 
  onNavigateHome 
}) {
  const [selectedSlug, setSelectedSlug] = useState(initialCategory);
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [allProductsInCat, setAllProductsInCat] = useState([]);

  useEffect(() => {
    setSelectedSlug(initialCategory);
    setActiveSubCategory('all');
  }, [initialCategory]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const [cats, prods] = await Promise.all([
        fetchLiveCategories(),
        fetchProductsByCategory(selectedSlug)
      ]);
      if (isMounted) {
        setCategories(cats);
        setAllProductsInCat(prods);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [selectedSlug]);

  const currentCategory = categories.find((c) => c.slug === selectedSlug);
  const currentCategoryName = currentCategory ? currentCategory.name : 'All Appliances';

  // Subcategory filtering (By default, shows ALL products of the category!)
  const displayedProducts = activeSubCategory === 'all'
    ? allProductsInCat
    : allProductsInCat.filter(p => p.subCategory === activeSubCategory);

  return (
    <div className="max-w-[1360px] mx-auto px-[5%] py-4 sm:py-6 relative z-10">
      {selectedSlug === 'all' ? (
        <AllCategoriesGrid 
          categories={categories} 
          onSelectCategory={(slug) => {
            setSelectedSlug(slug);
            setActiveSubCategory('all');
          }} 
        />
      ) : (
        <div>
          <CategoryHeader
            currentCategoryName={currentCategoryName}
            categories={categories}
            selectedSlug={selectedSlug}
            onSelectCategory={(slug) => {
              setSelectedSlug(slug);
              setActiveSubCategory('all');
            }}
            onNavigateHome={onNavigateHome}
          />

          {/* TWO-COLUMN LAYOUT: LEFT SIDEBAR TABS + RIGHT PRODUCTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 xl:col-span-3">
              <CategorySidebarFilter
                selectedCategorySlug={selectedSlug}
                activeSubCategory={activeSubCategory}
                onSelectSubCategory={setActiveSubCategory}
                totalCount={displayedProducts.length}
              />
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              <CategoryProductsGrid 
                products={displayedProducts} 
                onSelectProduct={onSelectProduct} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
