import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";

interface Site {
  id: number;
  name: string;
  slug: string;
  region?: string;
  description?: string;
}

interface SiteFormModalProps {
  site?: Site | null;
  onClose: () => void;
  onSave: (site: Site) => void;
}

const SiteFormModal: React.FC<SiteFormModalProps> = ({ site, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    region: "",
    description: "",
  });

  useEffect(() => {
    if (site) {
      setFormData({
        name: site.name,
        slug: site.slug,
        region: site.region || "",
        description: site.description || "",
      });
    }
  }, [site]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const siteData: Site = {
      id: site?.id || Date.now(),
      name: formData.name,
      slug: formData.slug,
      region: formData.region,
      description: formData.description,
    };
    onSave(siteData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          ✖
        </button>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {site ? "Edit Site" : "Add New Site"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Site Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter site name"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter site slug"
              />
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-2">
                Region
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="">Select Region</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia Pacific">Asia Pacific</option>
                <option value="South America">South America</option>
                <option value="Africa">Africa</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                placeholder="Enter site description"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors flex items-center gap-2"
              >
                <Save size={16} /> {site ? "Update Site" : "Save Site"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SiteFormModal;
