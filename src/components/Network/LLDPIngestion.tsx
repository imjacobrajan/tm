import React, { useState } from 'react';
import type { Device, Link, LLDPInfo } from '../../types';
import { mockDevices, mockLinks } from '../../data/mockData';

interface LLDPIngestionProps {
  onClose?: () => void;
}

const LLDPIngestion: React.FC<LLDPIngestionProps> = ({ onClose }) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestionResults, setIngestionResults] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleStartIngestion = async () => {
    if (!selectedDevice) {
      alert('Please select a device to start LLDP ingestion');
      return;
    }

    setIsIngesting(true);
    
    // Simulate LLDP ingestion process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock ingestion results
    const mockResults = [
      {
        id: 'result-1',
        deviceId: selectedDevice.id,
        deviceName: selectedDevice.hostname,
        timestamp: new Date(),
        status: 'success',
        linksDiscovered: 3,
        neighborsFound: 2,
        errors: []
      }
    ];
    
    setIngestionResults(mockResults);
    setIsIngesting(false);
  };

  const handleBulkIngestion = async () => {
    setIsIngesting(true);
    
    // Simulate bulk ingestion for all devices
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const mockResults = mockDevices.map(device => ({
      id: `result-${device.id}`,
      deviceId: device.id,
      deviceName: device.hostname,
      timestamp: new Date(),
      status: Math.random() > 0.2 ? 'success' : 'error',
      linksDiscovered: Math.floor(Math.random() * 5),
      neighborsFound: Math.floor(Math.random() * 3),
      errors: Math.random() > 0.8 ? ['SNMP timeout', 'Authentication failed'] : []
    }));
    
    setIngestionResults(mockResults);
    setIsIngesting(false);
  };

  const getDeviceIcon = (device: Device) => {
    switch (device.vendor) {
      case 'Cisco': return '🔷';
      case 'Dell': return '💻';
      case 'Fortinet': return '🛡️';
      default: return '🖥️';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            LLDP Link Ingestion
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Discover and ingest network links using LLDP/CDP protocols
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      {/* Device Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Select Device for LLDP Ingestion
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Device
            </label>
            <select
              value={selectedDevice?.id || ''}
              onChange={(e) => {
                const device = mockDevices.find(d => d.id === e.target.value);
                setSelectedDevice(device || null);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a device...</option>
              {mockDevices.map(device => (
                <option key={device.id} value={device.id}>
                  {device.hostname} ({device.vendor} {device.model})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end space-x-3">
            <button
              onClick={handleStartIngestion}
              disabled={!selectedDevice || isIngesting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isIngesting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Ingesting...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Start Ingestion</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleBulkIngestion}
              disabled={isIngesting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isIngesting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Bulk Ingesting...</span>
                </>
              ) : (
                <>
                  <span>🔄</span>
                  <span>Bulk Ingestion</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Selected Device Info */}
      {selectedDevice && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Device Information
          </h3>
          
          <div className="flex items-center space-x-4">
            <span className="text-3xl">{getDeviceIcon(selectedDevice)}</span>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {selectedDevice.hostname}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedDevice.vendor} {selectedDevice.model} • {selectedDevice.os}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                IP: {selectedDevice.ipAddresses[0]} • Status: {selectedDevice.status.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ingestion Results */}
      {ingestionResults.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ingestion Results
            </h3>
            <button
              onClick={() => setIngestionResults([])}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Clear Results
            </button>
          </div>
          
          <div className="space-y-3">
            {ingestionResults.map((result) => (
              <div key={result.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getStatusIcon(result.status)}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {result.deviceName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatTimestamp(result.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {result.status.toUpperCase()}
                    </span>
                    <button
                      onClick={() => setShowDetails(showDetails === result.id ? null : result.id)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {showDetails === result.id ? 'Hide' : 'Show'} Details
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Links Discovered:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {result.linksDiscovered}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Neighbors Found:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {result.neighborsFound}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Errors:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {result.errors.length}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {Math.floor(Math.random() * 30) + 5}s
                    </div>
                  </div>
                </div>
                
                {showDetails === result.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Detailed Results</h5>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Device ID:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">{result.deviceId}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Protocols Used:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">LLDP, CDP, SNMP</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Credentials Used:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">SNMP v2c, SNMP v3</span>
                      </div>
                      {result.errors.length > 0 && (
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Errors:</span>
                          <div className="mt-1 space-y-1">
                            {result.errors.map((error, index) => (
                              <div key={index} className="text-red-600 dark:text-red-400 text-xs">
                                • {error}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link Discovery Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Discovered Links
        </h3>
        
        <div className="space-y-3">
          {mockLinks.map((link) => {
            const sourceDevice = mockDevices.find(d => d.id === link.sourceDeviceId);
            const targetDevice = mockDevices.find(d => d.id === link.targetDeviceId);
            
            return (
              <div key={link.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🔗</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {sourceDevice?.hostname} ↔ {targetDevice?.hostname}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {link.discoverySource.toUpperCase()} • Confidence: {(link.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    link.isUp 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {link.isUp ? 'UP' : 'DOWN'}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {link.speed ? `${(link.speed / 1000000).toFixed(0)} Mbps` : 'Unknown'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LLDP Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          LLDP Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Protocol Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Enable LLDP</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Enable CDP</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Enable SNMP Bridge MIB</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Ingestion Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Polling Interval (seconds)
                </label>
                <input
                  type="number"
                  defaultValue="300"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link Timeout (seconds)
                </label>
                <input
                  type="number"
                  defaultValue="120"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLDPIngestion;
