import React, { useState } from "react";
import { Save, X } from "lucide-react";

interface Region {
  id: number;
  name: string;
  sites?: string;
  description?: string;
}

interface AddRegionProps {
  onAddRegion: (region: Region) => void;
}

const AddRegion: React.FC<AddRegionProps> = ({ onAddRegion }) => {
  const [formData, setFormData] = useState({
    name: "",
    sites: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRegion: Region = {
      id: Date.now(),
      name: formData.name,
      sites: formData.sites,
      description: formData.description,
    };
    onAddRegion(newRegion);
    setFormData({ name: "", sites: "", description: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Add New Region</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Region Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="Enter region name"
          />
        </div>

        <div>
          <label htmlFor="sites" className="block text-sm font-medium text-gray-300 mb-2">
            Sites
          </label>
          <input
            type="text"
            id="sites"
            name="sites"
            value={formData.sites}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
            placeholder="e.g., 5 Sites"
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
            placeholder="Enter region description"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <X size={16} /> Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <Save size={16} /> Save Region
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRegion;
