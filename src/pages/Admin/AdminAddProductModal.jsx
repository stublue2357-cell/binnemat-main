import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { createAdminProduct, fetchAdminCategories, uploadMediaToWordPress } from '../../services/wooAdminService';

export default function AdminAddProductModal({ open, onClose, onProductCreated }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    regular_price: '',
    sale_price: '',
    category_id: null,
    stock_status: 'instock',
    image_url: '',
    description: ''
  });

  useEffect(() => {
    if (open) {
      fetchAdminCategories()
        .then(cats => setCategories(Array.isArray(cats) ? cats : []))
        .catch(() => {});
    }
  }, [open]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadMediaToWordPress(file);
      setFormData(prev => ({ ...prev, image_url: res.url }));
      message.success('Image uploaded directly to WordPress Media Library!');
    } catch (err) {
      message.error('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.regular_price) {
      message.error('Please fill in title and regular price');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        type: 'simple',
        regular_price: String(formData.regular_price),
        sale_price: formData.sale_price ? String(formData.sale_price) : '',
        stock_status: formData.stock_status,
        description: formData.description
      };
      if (formData.category_id) {
        payload.categories = [{ id: formData.category_id }];
      }
      if (formData.image_url) {
        payload.images = [{ src: formData.image_url }];
      }

      await createAdminProduct(payload);
      message.success(`Product "${formData.name}" published live to WooCommerce!`);
      setFormData({
        name: '',
        regular_price: '',
        sale_price: '',
        category_id: null,
        stock_status: 'instock',
        image_url: '',
        description: ''
      });
      onProductCreated && onProductCreated();
      onClose();
    } catch (err) {
      message.error(`Failed to create product: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={560}
      title={<span className="font-cinzel text-base font-bold">Add New Appliance to Store</span>}
    >
      <form onSubmit={handleSubmit} className="space-y-3 pt-3 text-xs">
        <div>
          <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
            Product Title *
          </label>
          <Input
            placeholder="e.g. Binnemat 50L Sapphire Enamel Geyser"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-xl h-10"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Regular Price (PKR) *
            </label>
            <Input
              type="number"
              placeholder="e.g. 38500"
              value={formData.regular_price}
              onChange={(e) => setFormData({ ...formData, regular_price: e.target.value })}
              className="rounded-xl h-10"
              required
            />
          </div>
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Sale Price (PKR)
            </label>
            <Input
              type="number"
              placeholder="Optional discount"
              value={formData.sale_price}
              onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
              className="rounded-xl h-10"
            />
          </div>
          <div>
            <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Stock Status
            </label>
            <Select
              value={formData.stock_status}
              onChange={(val) => setFormData({ ...formData, stock_status: val })}
              className="w-full h-10"
              options={[
                { value: 'instock', label: 'In Stock' },
                { value: 'outofstock', label: 'Out of Stock' }
              ]}
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
            Category
          </label>
          <Select
            value={formData.category_id}
            onChange={(val) => setFormData({ ...formData, category_id: val })}
            placeholder="Select category"
            className="w-full h-10"
            options={categories.map(c => ({ value: c.id, label: c.name }))}
            allowClear
          />
        </div>

        <div>
          <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
            Product Image (WordPress Media Library)
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Paste URL or click Upload"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="rounded-xl h-10 text-xs flex-grow"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              icon={<UploadCloud size={14} />}
              loading={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl h-10 px-3 text-xs flex items-center gap-1 font-bold bg-neutral-100 dark:bg-neutral-800"
            >
              Upload
            </Button>
          </div>
          {formData.image_url && (
            <div className="mt-2 h-20 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 flex items-center justify-center">
              <img src={formData.image_url} alt="Preview" className="h-full object-contain" />
            </div>
          )}
        </div>

        <div>
          <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
            Description
          </label>
          <Input.TextArea
            rows={2}
            placeholder="Appliance specifications..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="rounded-xl text-xs"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <Button onClick={onClose} className="rounded-xl h-9">Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="rounded-xl font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white h-9 px-6"
          >
            Publish Product
          </Button>
        </div>
      </form>
    </Modal>
  );
}
