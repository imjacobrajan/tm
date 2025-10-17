import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";

interface Location {
  id: number;
  name: string;
  slug: string;
  parent?: string;
  status?: "Active" | "Inactive";
  facility?: string;
  description?: string;
  tags?: string[];
  tenantGroup?: string;
  tenant?: string;
}

interface LocationFormModalProps {
  location?: Location | null;
  onClose: () => void;
  onSave: (location: Location) => void;
}

const LocationFormModal: React.FC<LocationFormModalProps> = ({ location, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent: "",
    status: "Active" as "Active" | "Inactive",
    facility: "",
    description: "",
    tags: "",
    tenantGroup: "",
    tenant: "",
  });

  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name,
        slug: location.slug,
        parent: location.parent || "",
        status: location.status || "Active",
        facility: location.facility || "",
        description: location.description || "",
        tags: location.tags?.join(", ") || "",
        tenantGroup: location.tenantGroup || "",
        tenant: location.tenant || "",
      });
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const locationData: Location = {
      id: location?.id || Date.now(),
      name: formData.name,
      slug: formData.slug,
      parent: formData.parent,
      status: formData.status,
      facility: formData.facility,
      description: formData.description,
      tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : [],
      tenantGroup: formData.tenantGroup,
      tenant: formData.tenant,
    };
    onSave(locationData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          ✖
        </button>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {location ? "Edit Location" : "Add New Location"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Location Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter location name"
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
                  placeholder="Enter location slug"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="parent" className="block text-sm font-medium text-gray-300 mb-2">
                  Parent Site
                </label>
                <select
                  id="parent"
                  name="parent"
                  value={formData.parent}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select Parent Site</option>
                  <option value="New York DC">New York DC</option>
                  <option value="London DC">London DC</option>
                  <option value="Tokyo DC">Tokyo DC</option>
                  <option value="Sydney DC">Sydney DC</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="facility" className="block text-sm font-medium text-gray-300 mb-2">
                  Facility
                </label>
                <input
                  type="text"
                  id="facility"
                  name="facility"
                  value={formData.facility}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter facility name"
                />
              </div>

              <div>
                <label htmlFor="tenantGroup" className="block text-sm font-medium text-gray-300 mb-2">
                  Tenant Group
                </label>
                <select
                  id="tenantGroup"
                  name="tenantGroup"
                  value={formData.tenantGroup}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select Tenant Group</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="tenant" className="block text-sm font-medium text-gray-300 mb-2">
                Tenant
              </label>
              <input
                type="text"
                id="tenant"
                name="tenant"
                value={formData.tenant}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter tenant name"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="e.g., primary, critical, production"
              />
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
                placeholder="Enter location description"
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
                <Save size={16} /> {location ? "Update Location" : "Save Location"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationFormModal;
