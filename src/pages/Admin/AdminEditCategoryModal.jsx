import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { updateAdminCategory, uploadMediaToWordPress } from '../../services/wooAdminService';

export default function AdminEditCategoryModal({ open, onClose, category, onCategoryUpdated }) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        image_url: category.image?.src || ''
      });
    }
  }, [category]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await uploadMediaToWordPress(file);
      setFormData(prev => ({ ...prev, image_url: res.url }));
      message.success('Category banner uploaded to WordPress!');
    } catch (err) {
      message.error('Failed to upload banner: ' + err.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!category?.id || !formData.name) {
      message.error('Please enter category name');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        description: formData.description
      };
      if (formData.image_url) {
        payload.image = { src: formData.image_url };
      }

      await updateAdminCategory(category.id, payload);
      message.success(`Category #${category.id} updated successfully!`);
      onCategoryUpdated && onCategoryUpdated();
      onClose();
    } catch (err) {
      message.error(`Failed to update category: ${err.message}`);
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
      title={<span className="font-cinzel font-bold">Edit Category #{category?.id}</span>}
    >
      <form onSubmit={handleUpdate} className="space-y-4 pt-3 text-xs">
        <div>
          <label className="block font-bold mb-1">Category Name *</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-xl h-10"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Slug</label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="rounded-xl h-10"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Description</label>
          <Input.TextArea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Category Banner / Image</label>
          <div className="flex gap-2">
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://... image URL"
              className="rounded-xl h-9 text-xs"
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
              loading={uploadingImage}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl h-9 px-3 text-xs flex items-center gap-1 font-bold"
            >
              Upload
            </Button>
          </div>
          {formData.image_url && (
            <div className="mt-2 h-20 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
              <img src={formData.image_url} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <Button onClick={onClose} className="rounded-xl">Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="rounded-xl font-bold bg-bn-gold hover:bg-bn-goldDark border-none text-white px-5"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
