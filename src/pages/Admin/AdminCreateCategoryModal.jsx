import React, { useState, useRef } from 'react';
import { Button, Input, Modal, message } from 'antd';
import { UploadCloud } from 'lucide-react';
import { createAdminCategory, uploadMediaToWordPress } from '../../services/wooAdminService';

export default function AdminCreateCategoryModal({ open, onClose, onCategoryCreated }) {
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    slug: '', 
    description: '',
    image_url: 'https://1301029.us21.myftpupload.com/wp-content/uploads/2026/10/geyser-storage.jpg' 
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadMediaToWordPress(file);
      setFormData(prev => ({ ...prev, image_url: res.url }));
      message.success('Category banner uploaded to WordPress Media Library!');
    } catch (err) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image_url: previewUrl }));
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      message.error('Please enter category name');
      return;
    }

    setCreating(true);
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        description: formData.description,
        image: formData.image_url ? { src: formData.image_url } : undefined
      };

      await createAdminCategory(payload);
      message.success('Category created successfully in WooCommerce!');
      onCategoryCreated && onCategoryCreated();
      onClose();
    } catch (err) {
      message.error(`Failed to create category: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title={<span className="font-cinzel font-bold">Create New Category</span>}
    >
      <form onSubmit={handleCreate} className="space-y-4 pt-3 text-xs">
        <div>
          <label className="block font-bold mb-1">Category Name *</label>
          <Input
            placeholder="e.g. Dual Hybrid Heaters"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-xl h-10"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Slug (Optional)</label>
          <Input
            placeholder="e.g. dual-hybrid-heaters"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="rounded-xl h-10"
          />
        </div>

        <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
          <label className="block font-bold text-neutral-700 dark:text-neutral-300">
            Category Banner Image
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="dashed"
              icon={<UploadCloud size={14} />}
              loading={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl text-xs font-bold h-9"
            >
              Upload from Computer
            </Button>
            {formData.image_url && (
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-neutral-800 shrink-0 border border-neutral-300 dark:border-neutral-700">
                <img src={formData.image_url} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1">Description (Optional)</label>
          <Input.TextArea
            rows={2}
            placeholder="Category overview..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="rounded-xl"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <Button onClick={onClose} className="rounded-xl">Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={creating}
            className="rounded-xl font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white px-5"
          >
            Create in Store
          </Button>
        </div>
      </form>
    </Modal>
  );
}
