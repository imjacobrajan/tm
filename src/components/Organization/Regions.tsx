import React, { useState } from "react";
import { Plus, Upload, Download } from "lucide-react";
import RegionsToolbar from "./regions/RegionsToolbar";
import RegionsTable from "./regions/RegionsTable";
import RegionsActions from "./regions/RegionsActions";
import AddRegion from "./regions/AddRegion";
import { mockRegions } from "../../data/mockData";

export interface Region {
  id: number;
  name: string;
  sites?: string;
  description?: string;
}

const Regions: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>(mockRegions);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleOpenModal = () => setShowAddModal(true);
  const handleCloseModal = () => setShowAddModal(false);

  const handleAddRegion = (newRegion: Region) => {
    setRegions((prev) => [...prev, newRegion]);
    setShowAddModal(false);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Regions</h1>
        <div className="space-x-2">
          <div className="flex flex-row justify-between items-center mb-4">
            <button
              onClick={handleOpenModal}
              className="space-x-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Plus size={16} /> Add
            </button>
            <button className="space-x-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg flex items-center gap-1 transition-colors">
              <Upload size={16} /> Import
            </button>
            <button className="space-x-2 bg-fuchsia-700 hover:bg-fuchsia-800 px-4 py-2 rounded-lg flex items-center gap-1 transition-colors">
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <RegionsToolbar />

      {/* Table */}
      <RegionsTable regions={regions} />

      {/* Actions */}
      <RegionsActions />

      {/* AddRegion Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg w-full max-w-3xl relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
              ✖
            </button>
            <AddRegion onAddRegion={handleAddRegion} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Regions;
