import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import LocationFormModal from "./Location/LocationFormModal";
import RegionsToolbar from "./regions/RegionsToolbar";

export interface Location {
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

export const mockLocations: Location[] = [
  {
    id: 1,
    name: "NYC Rack A",
    slug: "nyc-rack-a",
    parent: "New York DC",
    status: "Active",
    facility: "Rack A",
    description: "Main rack in NY data center",
    tags: ["primary", "critical"],
    tenantGroup: "Corporate",
    tenant: "Finance",
  },
  {
    id: 2,
    name: "London Rack B",
    slug: "london-rack-b",
    parent: "London DC",
    status: "Active",
    facility: "Rack B",
    description: "Secondary rack in London",
    tags: ["backup"],
    tenantGroup: "Corporate",
    tenant: "HR",
  },
  {
    id: 3,
    name: "Tokyo Server Room",
    slug: "tokyo-server-room",
    parent: "Tokyo DC",
    status: "Active",
    facility: "Server Room 1",
    description: "Primary server room in Tokyo",
    tags: ["primary", "production"],
    tenantGroup: "Corporate",
    tenant: "Operations",
  },
];

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const handleAdd = () => {
    setEditingLocation(null);
    setShowModal(true);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  const handleSave = (location: Location) => {
    const exists = locations.find((loc) => loc.id === location.id);
    if (exists) {
      setLocations(
        locations.map((loc) => (loc.id === location.id ? location : loc))
      );
    } else {
      setLocations([location, ...locations]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Locations</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Add Location
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
              <th className="px-4 py-2">Parent</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Facility</th>
              <th className="px-4 py-2">Tenant</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400">
                  — No locations found —
                </td>
              </tr>
            ) : (
              locations.map((loc) => (
                <tr
                  key={loc.id}
                  className="border-t border-gray-700 hover:bg-gray-700/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="accent-emerald-500" />
                  </td>
                  <td className="px-4 py-3 text-white">{loc.name}</td>
                  <td className="px-4 py-3 text-gray-300">{loc.slug}</td>
                  <td className="px-4 py-3 text-gray-300">{loc.parent}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      loc.status === 'Active' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-red-900 text-red-300'
                    }`}>
                      {loc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{loc.facility}</td>
                  <td className="px-4 py-3 text-gray-300">{loc.tenant}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(loc)}
                      className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(loc.id)}
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

      {/* Modal */}
      {showModal && (
        <LocationFormModal
          location={editingLocation}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Locations;
