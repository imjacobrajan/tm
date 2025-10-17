import React from "react";
import { Edit, Trash2 } from "lucide-react";

interface Region {
  id: number;
  name: string;
  sites?: string;
  description?: string;
}

interface RegionsTableProps {
  regions: Region[];
}

const RegionsTable: React.FC<RegionsTableProps> = ({ regions }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-700 uppercase text-xs text-gray-300">
          <tr>
            <th className="px-4 py-3 w-10">
              <input type="checkbox" className="accent-emerald-500" />
            </th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Sites</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {regions.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                — No regions found —
              </td>
            </tr>
          ) : (
            regions.map((region) => (
              <tr
                key={region.id}
                className="border-t border-gray-700 hover:bg-gray-700/40 transition-colors"
              >
                <td className="px-4 py-3">
                  <input type="checkbox" className="accent-emerald-500" />
                </td>
                <td className="px-4 py-3 text-white">{region.name}</td>
                <td className="px-4 py-3 text-gray-300">{region.sites}</td>
                <td className="px-4 py-3 text-gray-300">{region.description}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegionsTable;
