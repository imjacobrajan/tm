import React, { useState, useRef } from 'react';
import type { Device, Site } from '../../types';
import { mockDevices, mockSites } from '../../data/mockData';

interface MapViewProps {
  onDeviceSelect?: (device: Device) => void;
  onSiteSelect?: (site: Site) => void;
}

const MapView: React.FC<MapViewProps> = ({ onDeviceSelect, onSiteSelect }) => {
  const [selectedOverlay, setSelectedOverlay] = useState<'devices' | 'sites' | 'links' | 'alerts'>('devices');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const getDeviceIcon = (device: Device) => {
    switch (device.vendor) {
      case 'Cisco': return '🔷';
      case 'Dell': return '💻';
      case 'Fortinet': return '🛡️';
      default: return '🖥️';
    }
  };

  const getDeviceColor = (device: Device) => {
    switch (device.status) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'unknown': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getSiteIcon = () => {
    return '🏢';
  };

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    onDeviceSelect?.(device);
  };

  const handleSiteClick = (site: Site) => {
    setSelectedSite(site);
    onSiteSelect?.(site);
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 20));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 1, 1));
  };

  const resetView = () => {
    setCenter({ lat: 37.7749, lng: -122.4194 });
    setZoom(10);
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Network Map
            </h3>
            
            {/* Overlay Controls */}
            <div className="flex space-x-2">
              {[
                { id: 'devices', label: 'Devices', icon: '🖥️' },
                { id: 'sites', label: 'Sites', icon: '🏢' },
                { id: 'links', label: 'Links', icon: '🔗' },
                { id: 'alerts', label: 'Alerts', icon: '🚨' }
              ].map((overlay) => (
                <button
                  key={overlay.id}
                  onClick={() => setSelectedOverlay(overlay.id as any)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedOverlay === overlay.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <span>{overlay.icon}</span>
                  <span>{overlay.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Map Type and Zoom Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={mapType}
              onChange={(e) => setMapType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="roadmap">Roadmap</option>
              <option value="satellite">Satellite</option>
              <option value="hybrid">Hybrid</option>
              <option value="terrain">Terrain</option>
            </select>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={zoomOut}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                ➖
              </button>
              <span className="px-2 py-1 text-sm text-gray-600 dark:text-gray-400 min-w-8 text-center">
                {zoom}
              </span>
              <button
                onClick={zoomIn}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                ➕
              </button>
            </div>
            
            <button
              onClick={resetView}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Reset View
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="relative">
          {/* Map Placeholder */}
          <div 
            ref={mapRef}
            className="w-full h-96 bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative"
          >
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 opacity-50"></div>
            
            {/* Map Content */}
            <div className="relative z-10 w-full h-full">
              {/* Sites */}
              {selectedOverlay === 'sites' && mockSites.map((site) => (
                <div
                  key={site.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${((site.location.longitude + 180) / 360) * 100}%`,
                    top: `${((90 - site.location.latitude) / 180) * 100}%`
                  }}
                  onClick={() => handleSiteClick(site)}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border-2 border-blue-500 hover:border-blue-700 transition-colors">
                    <span className="text-2xl">{getSiteIcon()}</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {site.name}
                  </div>
                </div>
              ))}
              
              {/* Devices */}
              {selectedOverlay === 'devices' && mockDevices.map((device) => (
                <div
                  key={device.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${((device.location!.longitude + 180) / 360) * 100}%`,
                    top: `${((90 - device.location!.latitude) / 180) * 100}%`
                  }}
                  onClick={() => handleDeviceClick(device)}
                >
                  <div className={`bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border-2 hover:border-blue-700 transition-colors ${
                    selectedDevice?.id === device.id ? 'border-blue-500' : 'border-gray-300'
                  }`}>
                    <span className={`text-xl ${getDeviceColor(device)}`}>
                      {getDeviceIcon(device)}
                    </span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {device.hostname}
                  </div>
                </div>
              ))}
              
              {/* Links */}
              {selectedOverlay === 'links' && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {mockDevices.map((device, index) => {
                    if (index === 0) return null; // Skip first device to avoid self-connection
                    const prevDevice = mockDevices[index - 1];
                    const x1 = ((device.location!.longitude + 180) / 360) * 100;
                    const y1 = ((90 - device.location!.latitude) / 180) * 100;
                    const x2 = ((prevDevice.location!.longitude + 180) / 360) * 100;
                    const y2 = ((90 - prevDevice.location!.latitude) / 180) * 100;
                    
                    return (
                      <line
                        key={`link-${index}`}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        opacity="0.7"
                      />
                    );
                  })}
                </svg>
              )}
            </div>
            
            {/* Map Info Overlay */}
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div>Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}</div>
                <div>Zoom: {zoom}</div>
                <div>Type: {mapType}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Device/Site Info */}
      {(selectedDevice || selectedSite) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedDevice ? 'Selected Device' : 'Selected Site'}
            </h3>
            <button
              onClick={() => {
                setSelectedDevice(null);
                setSelectedSite(null);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          
          {selectedDevice && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getDeviceIcon(selectedDevice)}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedDevice.hostname}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedDevice.vendor} {selectedDevice.model}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <div className={`font-medium ${getDeviceColor(selectedDevice)}`}>
                    {selectedDevice.status.toUpperCase()}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">IP Address:</span>
                  <div className="text-gray-900 dark:text-white">
                    {selectedDevice.ipAddresses[0]}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                  <div className="text-gray-900 dark:text-white">
                    {selectedDevice.location?.name || 'Unknown'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Last Seen:</span>
                  <div className="text-gray-900 dark:text-white">
                    {new Date(selectedDevice.lastSeen).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedSite && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getSiteIcon()}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedSite.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedSite.description}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Address:</span>
                  <div className="text-gray-900 dark:text-white">
                    {selectedSite.location.address}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Coordinates:</span>
                  <div className="text-gray-900 dark:text-white">
                    {selectedSite.location.latitude.toFixed(4)}, {selectedSite.location.longitude.toFixed(4)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Devices:</span>
                  <div className="text-gray-900 dark:text-white">
                    {selectedSite.devices.length}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Subnets:</span>
                  <div className="text-gray-900 dark:text-white">
                    {selectedSite.subnets.length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Map Legend */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">🟢</span>
            <span className="text-gray-700 dark:text-gray-300">Device Up</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-600">🔴</span>
            <span className="text-gray-700 dark:text-gray-300">Device Down</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600">🟡</span>
            <span className="text-gray-700 dark:text-gray-300">Device Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">⚪</span>
            <span className="text-gray-700 dark:text-gray-300">Device Unknown</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
