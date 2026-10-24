import React, { useState, useEffect } from 'react';
import { Button, message, Tag } from 'antd';
import { Plus, RefreshCw, Layers, Edit } from 'lucide-react';
import { fetchAdminCategories } from '../../services/wooAdminService';
import AdminCreateCategoryModal from './AdminCreateCategoryModal';
import AdminEditCategoryModal from './AdminEditCategoryModal';

export default function AdminCategoriesTab() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      message.error(`Failed to load categories: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100 m-0">
              Product Categories ({categories.length})
            </h3>
            <span className="text-xs text-neutral-400">Live store taxonomy in WooCommerce</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="primary"
            icon={<Plus size={15} />}
            onClick={() => setCreateModalOpen(true)}
            className="rounded-xl h-9 font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white shadow-md"
          >
            Create Category
          </Button>
          <Button
            icon={<RefreshCw size={14} className={loading ? 'animate-spin' : ''} />}
            onClick={loadCategories}
            className="rounded-xl h-9 font-bold"
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-neutral-800 shadow-sm space-y-2.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-cinzel text-sm font-bold text-neutral-900 dark:text-neutral-100 m-0">
                  {c.name}
                </h4>
                <Tag color="gold" className="rounded-full text-[10px] font-bold">
                  {c.count} Items
                </Tag>
              </div>
              <code className="text-[11px] text-neutral-400 font-mono block mt-1">
                slug: {c.slug}
              </code>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 m-0 mt-1 line-clamp-2 font-light">
                {c.description || 'No description provided.'}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
              <Button
                size="small"
                icon={<Edit size={13} />}
                onClick={() => {
                  setEditingCategory(c);
                  setEditModalOpen(true);
                }}
                className="rounded-lg text-xs font-bold"
              >
                Edit Category
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE CATEGORY MODAL */}
      <AdminCreateCategoryModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCategoryCreated={loadCategories}
      />

      {/* EDIT CATEGORY MODAL */}
      <AdminEditCategoryModal
        open={editModalOpen}
        category={editingCategory}
        onClose={() => {
          setEditModalOpen(false);
          setEditingCategory(null);
        }}
        onCategoryUpdated={loadCategories}
      />
    </div>
  );
}
