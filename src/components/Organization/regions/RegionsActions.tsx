import React from "react";
import { Edit, FileText, Trash2 } from "lucide-react";

const RegionsActions: React.FC = () => {
  return (
    <div className="flex gap-3">
      <button className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors">
        <Edit size={16} /> Edit Selected
      </button>
      <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors">
        <FileText size={16} /> Rename Selected
      </button>
      <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
        <Trash2 size={16} /> Delete Selected
      </button>
    </div>
  );
};

export default RegionsActions;
