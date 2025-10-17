import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import SiteFormModal from "./Site/SiteFormModal";
import RegionsToolbar from "./regions/RegionsToolbar";
import RegionsActions from "./regions/RegionsActions";

// Mock data
export interface Site {
  id: number;
  name: string;
  slug: string;
  region?: string;
  description?: string;
}

export const mockSites: Site[] = [
  {
    id: 1,
    name: "New York DC",
    slug: "new-york-dc",
    region: "North America",
    description: "Primary data center in New York",
  },
  {
    id: 2,
    name: "London DC",
    slug: "london-dc",
    region: "Europe",
    description: "Main London data center",
  },
  {
    id: 3,
    name: "Tokyo DC",
    slug: "tokyo-dc",
    region: "Asia Pacific",
    description: "Tokyo data center for APAC region",
  },
  {
    id: 4,
    name: "Sydney DC",
    slug: "sydney-dc",
    region: "Asia Pacific",
    description: "Secondary APAC site",
  },
];

const Sites: React.FC = () => {
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [showModal, setShowModal] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);

  const handleAdd = () => {
    setEditingSite(null);
    setShowModal(true);
  };

  const handleEdit = (site: Site) => {
    setEditingSite(site);
    setShowModal(true);
  };

  const handleDelete = (siteId: number) => {
    if (!confirm("Are you sure you want to delete this site?")) return;
    setSites(sites.filter((s) => s.id !== siteId));
  };

  const handleSave = (site: Site) => {
    const exists = sites.find((s) => s.id === site.id);
    if (exists) {
      setSites(sites.map((s) => (s.id === site.id ? site : s)));
    } else {
      setSites([site, ...sites]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Sites</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Add Site
        </button>
      </div>
      <RegionsToolbar />

      {/* Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-700 uppercase text-xs text-gray-300">
            <tr>
              <th className="px-4 py-3 w-10">
                <input type="checkbox" className="accent-emerald-500" />
              </th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Region</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  — No sites found —
                </td>
              </tr>
            ) : (
              sites.map((site) => (
                <tr
                  key={site.id}
                  className="border-t border-gray-700 hover:bg-gray-700/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="accent-emerald-500" />
                  </td>
                  <td className="px-4 py-3 text-white">{site.name}</td>
                  <td className="px-4 py-3 text-gray-300">{site.slug}</td>
                  <td className="px-4 py-3 text-gray-300">{site.region}</td>
                  <td className="px-4 py-3 text-gray-300">{site.description}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(site)}
                      className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(site.id)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <RegionsActions />

      {/* Modal */}
      {showModal && (
        <SiteFormModal
          site={editingSite}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Sites;
