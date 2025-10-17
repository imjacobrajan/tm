import React, { useState } from 'react';
import type { Device } from '../../types';
import { mockDevices } from '../../data/mockData';

interface DeviceListProps {
  onDeviceSelect: (device: Device) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ onDeviceSelect }) => {
  const [devices] = useState<Device[]>(mockDevices);
  const [filters, setFilters] = useState({
    status: '',
    vendor: '',
    role: '',
    search: ''
  });
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'vendor' | 'lastSeen'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up': return 'bg-green-900 text-green-300';
      case 'down': return 'bg-red-900 text-red-300';
      case 'warning': return 'bg-yellow-900 text-yellow-300';
      case 'unknown': return 'bg-gray-700 text-gray-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up': return '🟢';
      case 'down': return '🔴';
      case 'warning': return '🟡';
      case 'unknown': return '⚪';
      default: return '⚪';
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesStatus = !filters.status || device.status === filters.status;
    const matchesVendor = !filters.vendor || device.vendor.toLowerCase().includes(filters.vendor.toLowerCase());
    const matchesRole = !filters.role || device.roles.some(role => role.name.toLowerCase().includes(filters.role.toLowerCase()));
    const matchesSearch = !filters.search || 
      device.hostname.toLowerCase().includes(filters.search.toLowerCase()) ||
      device.ipAddresses.some(ip => ip.includes(filters.search)) ||
      device.vendor.toLowerCase().includes(filters.search.toLowerCase()) ||
      device.model.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesVendor && matchesRole && matchesSearch;
  });

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.hostname;
        bValue = b.hostname;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'vendor':
        aValue = a.vendor;
        bValue = b.vendor;
        break;
      case 'lastSeen':
        aValue = new Date(a.lastSeen).getTime();
        bValue = new Date(b.lastSeen).getTime();
        break;
      default:
        aValue = a.hostname;
        bValue = b.hostname;
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              placeholder="Search devices..."
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="up">Up</option>
              <option value="down">Down</option>
              <option value="warning">Warning</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Vendor
            </label>
            <input
              type="text"
              value={filters.vendor}
              onChange={(e) => setFilters({...filters, vendor: e.target.value})}
              placeholder="Filter by vendor..."
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sort By
            </label>
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="status">Status</option>
                <option value="vendor">Vendor</option>
                <option value="lastSeen">Last Seen</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Devices ({sortedDevices.length})
            </h3>
            <div className="flex space-x-2">
              <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export
              </button>
              <button className="px-3 py-2 text-sm border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700">
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Vendor/Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  IP Addresses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Last Seen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {sortedDevices.map((device) => (
                <tr 
                  key={device.id} 
                  className="hover:bg-gray-700 cursor-pointer"
                  onClick={() => onDeviceSelect(device)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-gray-600 flex items-center justify-center">
                          <span className="text-lg">
                            {device.vendor === 'Cisco' ? '🔷' : 
                             device.vendor === 'Dell' ? '💻' : 
                             device.vendor === 'Fortinet' ? '🛡️' : '🖥️'}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {device.hostname}
                        </div>
                        <div className="text-sm text-gray-400">
                          {device.fqdn}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                      <span className="mr-1">{getStatusIcon(device.status)}</span>
                      {device.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {device.vendor}
                    </div>
                    <div className="text-sm text-gray-400">
                      {device.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {device.ipAddresses.slice(0, 2).join(', ')}
                      {device.ipAddresses.length > 2 && (
                        <span className="text-gray-400">
                          +{device.ipAddresses.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {device.location?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatLastSeen(device.lastSeen)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        View
                      </button>
                      <button className="text-gray-400 hover:text-gray-300">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedDevices.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl text-gray-600">🔍</span>
            <p className="text-gray-400 mt-2">No devices found</p>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your filters or start a discovery scan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceList;
