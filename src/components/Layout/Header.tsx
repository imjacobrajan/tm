import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title, subtitle }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Open sidebar</span>
            ☰
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search devices, sites..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <span className="sr-only">Notifications</span>
            🔔
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800"></span>
          </button>
          
          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <span className="sr-only">Settings</span>
            ⚙️
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                Admin
              </span>
              <span className="text-gray-400">▼</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

