import React from "react";
import { Settings } from "lucide-react";

const RegionsToolbar: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700">
      <div className="flex items-center gap-3 mb-3">
        <button className="text-sm text-gray-300 border-b-2 border-transparent hover:border-emerald-400 transition-colors">
          Results (0)
        </button>
        <button className="text-sm text-gray-300 border-b-2 border-transparent hover:border-emerald-400 transition-colors">
          Filters
        </button>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Quick search"
          className="bg-gray-700 text-sm text-white px-3 py-2 rounded-md w-64 outline-none border border-gray-600 focus:border-emerald-500 transition-colors"
        />
        <select className="bg-gray-700 text-sm text-white px-3 py-2 rounded-md outline-none border border-gray-600 focus:border-emerald-500 transition-colors">
          <option>Filter</option>
        </select>

        <div className="ml-auto">
          <button className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md flex items-center gap-2 transition-colors border border-gray-600">
            <Settings size={14} /> Configure Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegionsToolbar;
