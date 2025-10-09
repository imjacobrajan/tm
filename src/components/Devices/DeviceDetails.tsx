import React, { useState } from 'react';
import type { Device } from '../../types';

interface DeviceDetailsProps {
  device: Device;
  onClose: () => void;
}

const DeviceDetails: React.FC<DeviceDetailsProps> = ({ device, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interfaces' | 'monitors' | 'events' | 'metrics'>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up': return 'bg-green-100 text-green-800';
      case 'down': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'unknown': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'interfaces', label: 'Interfaces', icon: '🔌' },
    { id: 'monitors', label: 'Monitors', icon: '📈' },
    { id: 'events', label: 'Events', icon: '📋' },
    { id: 'metrics', label: 'Metrics', icon: '📊' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Hostname:</span>
              <span className="text-gray-900">{device.hostname}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FQDN:</span>
              <span className="text-gray-900">{device.fqdn || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vendor:</span>
              <span className="text-gray-900">{device.vendor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Model:</span>
              <span className="text-gray-900">{device.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">OS:</span>
              <span className="text-gray-900">{device.os}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Network Information</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">IP Addresses:</span>
              <div className="mt-1 space-y-1">
                {device.ipAddresses.map((ip, index) => (
                  <div key={index} className="text-gray-900 font-mono text-xs bg-white px-2 py-1 rounded">
                    {ip}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="text-gray-900">{device.location?.name || 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Seen:</span>
              <span className="text-gray-900">{formatDate(device.lastSeen)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status and Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Status</h4>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getStatusIcon(device.status)}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
              {device.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Interfaces</h4>
          <div className="text-2xl font-bold text-gray-900">
            {device.interfaces.length}
          </div>
          <div className="text-sm text-gray-600">
            Total interfaces
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Monitors</h4>
          <div className="text-2xl font-bold text-gray-900">
            {device.monitors.length}
          </div>
          <div className="text-sm text-gray-600">
            Active monitors
          </div>
        </div>
      </div>

      {/* Roles and Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Device Roles</h4>
          <div className="space-y-2">
            {device.roles.length > 0 ? (
              device.roles.map((role, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-900">{role.name}</span>
                  {role.subRole && (
                    <span className="text-xs text-gray-500">({role.subRole})</span>
                  )}
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-500">No roles assigned</span>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Credentials</h4>
          <div className="space-y-2">
            {device.credentials.length > 0 ? (
              device.credentials.map((cred, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">{cred.name}</span>
                  <span className="text-xs text-gray-500">{cred.type}</span>
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-500">No credentials</span>
            )}
          </div>
        </div>
      </div>

      {/* Labels and Tags */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Labels & Tags</h4>
        <div className="flex flex-wrap gap-2">
          {device.labels.map((label, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {label}
            </span>
          ))}
          {device.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInterfaces = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Interfaces ({device.interfaces.length})</h4>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>
      
      <div className="space-y-3">
        {device.interfaces.map((iface) => (
          <div key={iface.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{iface.name}</span>
                <span className="text-sm text-gray-500">#{iface.ifIndex}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  iface.operStatus === 'up' ? 'bg-green-100 text-green-800' :
                  iface.operStatus === 'down' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {iface.operStatus.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Description:</span>
                <div className="text-gray-900">{iface.description || 'N/A'}</div>
              </div>
              <div>
                <span className="text-gray-600">Speed:</span>
                <div className="text-gray-900">
                  {iface.speed ? `${(iface.speed / 1000000).toFixed(0)} Mbps` : 'N/A'}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Duplex:</span>
                <div className="text-gray-900">{iface.duplex || 'N/A'}</div>
              </div>
              <div>
                <span className="text-gray-600">MAC:</span>
                <div className="text-gray-900 font-mono text-xs">{iface.macAddress || 'N/A'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMonitors = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Monitors ({device.monitors.length})</h4>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Monitor
        </button>
      </div>
      
      <div className="space-y-3">
        {device.monitors.map((monitor) => (
          <div key={monitor.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{monitor.name}</span>
                <span className="text-sm text-gray-500">({monitor.type})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  monitor.isActive ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {monitor.isActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Interval:</span>
                <div className="text-gray-900">{monitor.interval}s</div>
              </div>
              <div>
                <span className="text-gray-600">Timeout:</span>
                <div className="text-gray-900">{monitor.timeout}s</div>
              </div>
              <div>
                <span className="text-gray-600">Last Check:</span>
                <div className="text-gray-900">
                  {monitor.lastCheck ? formatDate(monitor.lastCheck) : 'Never'}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <div className="text-gray-900">
                  {monitor.lastResult?.status || 'Unknown'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Recent Events</h4>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          View All
        </button>
      </div>
      
      <div className="text-center py-8 text-gray-500">
        <span className="text-4xl">📋</span>
        <p className="mt-2">No events available</p>
        <p className="text-sm">Events will appear here when they occur</p>
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Metrics</h4>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Export Data
        </button>
      </div>
      
      <div className="text-center py-8 text-gray-500">
        <span className="text-4xl">📊</span>
        <p className="mt-2">No metrics available</p>
        <p className="text-sm">Metrics will appear here when monitors are active</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'interfaces': return renderInterfaces();
      case 'monitors': return renderMonitors();
      case 'events': return renderEvents();
      case 'metrics': return renderMetrics();
      default: return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl">
                    {device.vendor === 'Cisco' ? '🔷' : 
                     device.vendor === 'Dell' ? '💻' : 
                     device.vendor === 'Fortinet' ? '🛡️' : '🖥️'}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {device.hostname}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {device.vendor} {device.model} • {device.location?.name || 'Unknown Location'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600:text-gray-300"
              >
                ✕
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900:text-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
