import React, { useState } from 'react';
import { Button, Tag, message, Popconfirm } from 'antd';
import { Plus, RefreshCw, Trash2, Package, Edit } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { deleteAdminProduct } from '../../services/wooAdminService';
import { useAdminProductsQuery } from '../../hooks/useWooQueries';
import AdminAddProductModal from './AdminAddProductModal';
import AdminEditProductModal from './AdminEditProductModal';
import { SAFE_SVG_PLACEHOLDER } from '../../services/mockData';

export default function AdminProductsTab() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  // TanStack Query: Caches products across tab navigation, automatic cancellation on unmount
  const { 
    data: productsData = [], 
    isLoading: loading, 
    refetch: loadProducts 
  } = useAdminProductsQuery();
  const products = Array.isArray(productsData) ? productsData : [];

  const handleDelete = async (id) => {
    try {
      await deleteAdminProduct(id);
      message.success(`Product #${id} removed successfully`);
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    } catch (err) {
      message.error(`Failed to delete product: ${err.message}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* HEADER & ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-bn-gold/15 text-bn-goldDark dark:text-bn-gold flex items-center justify-center">
            <Package size={18} />
          </div>
          <div>
            <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-neutral-100 m-0">
              Live Product Catalog ({products.length})
            </h3>
            <span className="text-xs text-neutral-400">Directly synchronized with WooCommerce catalog</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="primary"
            icon={<Plus size={15} />}
            onClick={() => setModalOpen(true)}
            className="rounded-xl h-9 font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white shadow-md"
          >
            Add New Product
          </Button>
          <Button
            icon={<RefreshCw size={14} className={loading ? 'animate-spin' : ''} />}
            onClick={loadProducts}
            className="rounded-xl h-9 font-bold"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      {products.length === 0 && !loading ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#18181B] border border-neutral-200 dark:border-neutral-800 text-neutral-400">
          No products found. Click "Add New Product" to create one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#18181B] border border-bn-borderLight dark:border-neutral-800 shadow-sm flex gap-4 items-center"
            >
              <div className="w-20 h-20 rounded-xl bg-neutral-900 overflow-hidden shrink-0 relative">
                <img
                  src={p.images?.[0]?.src || SAFE_SVG_PLACEHOLDER}
                  alt={p.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = SAFE_SVG_PLACEHOLDER;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow min-w-0">
                <span className="text-[10px] font-bold text-bn-goldDark dark:text-bn-goldLight block uppercase">
                  {p.categories?.[0]?.name || 'Appliance'}
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 m-0 truncate">
                  {p.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Tag color={p.stock_status === 'outofstock' ? 'red' : 'green'} className="text-[9px] uppercase font-bold m-0">
                    {p.stock_status === 'outofstock' ? 'Out of Stock' : 'In Stock'}
                  </Tag>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white font-cinzel">
                    Rs. {Number(p.price || p.regular_price || 0).toLocaleString()}
                  </span>
                  {p.sale_price && (
                    <span className="text-[11px] text-neutral-400 line-through">
                      Rs. {Number(p.regular_price).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5">
                <Button
                  size="small"
                  icon={<Edit size={13} />}
                  onClick={() => {
                    setEditingProduct(p);
                    setEditModalOpen(true);
                  }}
                  className="rounded-lg text-xs"
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Delete Product"
                  description="Are you sure you want to delete this product from the store?"
                  onConfirm={() => handleDelete(p.id)}
                >
                  <Button
                    size="small"
                    danger
                    icon={<Trash2 size={13} />}
                    className="rounded-lg"
                  />
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      <AdminAddProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onProductCreated={loadProducts}
      />

      {/* EDIT PRODUCT MODAL */}
      <AdminEditProductModal
        open={editModalOpen}
        product={editingProduct}
        onClose={() => {
          setEditModalOpen(false);
          setEditingProduct(null);
        }}
        onProductUpdated={loadProducts}
      />
    </div>
  );
}
