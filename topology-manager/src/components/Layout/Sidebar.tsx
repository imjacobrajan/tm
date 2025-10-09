import React, { useState } from 'react';
import type { NavigationItem } from '../../types';
import { mockNavigationItems } from '../../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, currentView, onNavigate }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['nav-dashboard']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = currentView === item.id;

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onNavigate(item.id);
            }
          }}
          className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            level === 0 ? 'mb-1' : 'ml-4 mb-1'
          } ${
            isActive 
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          <span className="mr-3 text-lg">
            {item.icon === 'dashboard' && '📊'}
            {item.icon === 'search' && '🔍'}
            {item.icon === 'play' && '▶️'}
            {item.icon === 'history' && '📜'}
            {item.icon === 'network' && '🌐'}
            {item.icon === 'server' && '🖥️'}
            {item.icon === 'share' && '🔗'}
            {item.icon === 'map' && '🗺️'}
            {item.icon === 'chart' && '📈'}
            {item.icon === 'route' && '🛣️'}
            {item.icon === 'check-circle' && '✅'}
            {item.icon === 'file-text' && '📄'}
            {item.icon === 'settings' && '⚙️'}
            {item.icon === 'key' && '🔑'}
            {item.icon === 'tag' && '🏷️'}
            {item.icon === 'link' && '🔗'}
            {item.icon === 'clock' && '🕐'}
            {item.icon === 'activity' && '📊'}
            {item.icon === 'trending-up' && '📈'}
            {item.icon === 'bar-chart' && '📊'}
            {item.icon === 'wifi' && '📶'}
            {item.icon === 'layers' && '📚'}
            {item.icon === 'cloud' && '☁️'}
            {item.icon === 'database' && '🗄️'}
          </span>
          <span className="flex-1 text-left">{item.label}</span>
          {hasChildren && (
            <span className={`ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
              ▶
            </span>
          )}
          {item.badge && (
            <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
              {item.badge}
            </span>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:relative lg:inset-auto`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Topology Manager
        </h1>
        <button
          onClick={onToggle}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="sr-only">Close sidebar</span>
          ✕
        </button>
      </div>
      
      <nav className="mt-6 px-4 space-y-2">
        {mockNavigationItems.map(item => renderNavigationItem(item))}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              admin@company.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
