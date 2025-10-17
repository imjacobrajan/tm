import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Settings,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  title,
  subtitle,
  onProfileClick,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-gray-900 shadow-sm border-b border-gray-700">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="w-5 h-5" />
          </button>

          {/* <div>
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
          </div> */}
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search devices, sites..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Notifications</span>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Settings</span>
            <Settings className="w-5 h-5" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JC
              </div>
              <span className="hidden md:block text-sm font-medium text-white">
                John Carter
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                <button
                  onClick={() => {
                    onProfileClick?.();
                    setShowUserMenu(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <hr className="my-1 border-gray-700" />
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
