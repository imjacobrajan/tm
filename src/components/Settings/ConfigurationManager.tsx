import React, { useState, useEffect } from 'react';
import type { DeviceConfiguration, ConfigurationPolicy, Device } from '../../types';
import { mockDevices } from '../../data/mockData';

interface ConfigurationManagerProps {
  onClose?: () => void;
}

interface ConfigStats {
  totalDevices: number;
  configuredDevices: number;
  lastBackup: Date;
  totalBackups: number;
  policyViolations: number;
  recentChanges: number;
}

const ConfigurationManager: React.FC<ConfigurationManagerProps> = ({ onClose }) => {
  const [selectedView, setSelectedView] = useState<'overview' | 'backups' | 'policies' | 'changes' | 'compliance'>('overview');
  const [configStats, setConfigStats] = useState<ConfigStats | null>(null);
  const [deviceConfigs, setDeviceConfigs] = useState<DeviceConfiguration[]>([]);
  const [policies, setPolicies] = useState<ConfigurationPolicy[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate mock configuration data
  useEffect(() => {
    const generateMockData = () => {
      setIsLoading(true);
      
      // Generate mock device configurations
      const mockConfigs: DeviceConfiguration[] = mockDevices.map(device => ({
        deviceId: device.id,
        configuration: `# Configuration for ${device.hostname}\nhostname ${device.hostname}\ninterface GigabitEthernet0/0/1\n description Connected to network\n ip address ${device.ipAddresses[0]} 255.255.255.0\n no shutdown\nsnmp-server community public RO\nsnmp-server community private RW`,
        version: `v${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 10)}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000),
        checksum: `sha256:${Math.random().toString(36).substring(2, 15)}`,
        backupType: Math.random() > 0.5 ? 'scheduled' : 'manual',
        status: Math.random() > 0.8 ? 'backup' : 'current'
      }));
      
      // Generate mock policies
      const mockPolicies: ConfigurationPolicy[] = [
        {
          id: 'policy-1',
          name: 'Security Policy',
          description: 'Ensure all devices have security configurations',
          rules: [
            {
              type: 'contains',
              pattern: 'snmp-server community',
              severity: 'warning',
              message: 'SNMP community strings should be configured'
            },
            {
              type: 'not-contains',
              pattern: 'password 7',
              severity: 'error',
              message: 'Passwords should be encrypted'
            }
          ],
          devices: mockDevices.map(d => d.id),
          enabled: true
        },
        {
          id: 'policy-2',
          name: 'Network Policy',
          description: 'Standard network configuration requirements',
          rules: [
            {
              type: 'contains',
              pattern: 'no ip redirects',
              severity: 'info',
              message: 'IP redirects should be disabled'
            },
            {
              type: 'contains',
              pattern: 'no ip unreachables',
              severity: 'info',
              message: 'IP unreachables should be disabled'
            }
          ],
          devices: mockDevices.filter(d => d.roles.some(r => r.name.includes('Router'))).map(d => d.id),
          enabled: true
        }
      ];
      
      setDeviceConfigs(mockConfigs);
      setPolicies(mockPolicies);
      
      // Calculate statistics
      const totalDevices = mockDevices.length;
      const configuredDevices = mockConfigs.length;
      const lastBackup = new Date(Math.max(...mockConfigs.map(c => c.timestamp.getTime())));
      const totalBackups = mockConfigs.length;
      const policyViolations = Math.floor(Math.random() * 5);
      const recentChanges = Math.floor(Math.random() * 10);
      
      setConfigStats({
        totalDevices,
        configuredDevices,
        lastBackup,
        totalBackups,
        policyViolations,
        recentChanges
      });
      
      setIsLoading(false);
    };
    
    generateMockData();
    
    // Simulate real-time updates
    const interval = setInterval(generateMockData, 60000);
    return () => clearInterval(interval);
  }, []);

  const getDeviceByName = (deviceId: string) => {
    return mockDevices.find(d => d.id === deviceId);
  };

  const getBackupTypeColor = (type: string) => {
    switch (type) {
      case 'scheduled': return 'text-green-400';
      case 'manual': return 'text-blue-400';
      case 'change-triggered': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-400';
      case 'backup': return 'text-blue-400';
      case 'gold-standard': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString();
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const handleBackupDevice = (deviceId: string) => {
    // Simulate backup
    console.log(`Backing up device: ${deviceId}`);
  };

  const handleRestoreDevice = (deviceId: string) => {
    // Simulate restore
    console.log(`Restoring device: ${deviceId}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Configuration Manager
          </h2>
          <p className="text-gray-400">
            Manage device configurations, backups, and compliance
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <span className="text-2xl">×</span>
          </button>
        )}
      </div>

      {/* View Selector */}
      <div className="flex space-x-2 mb-6">
        {([
          { key: 'overview', label: 'Overview' },
          { key: 'backups', label: 'Backups' },
          { key: 'policies', label: 'Policies' },
          { key: 'changes', label: 'Changes' },
          { key: 'compliance', label: 'Compliance' }
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedView(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-300">Loading configuration data...</p>
          </div>
        </div>
      )}

      {/* Content */}
      {!isLoading && configStats && (
        <div className="space-y-6">
          {/* Overview */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Total Devices
                </h3>
                <div className="text-2xl font-bold text-blue-400">
                  {configStats.totalDevices}
                </div>
                <div className="text-sm text-gray-400">
                  Managed devices
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Configured Devices
                </h3>
                <div className="text-2xl font-bold text-green-400">
                  {configStats.configuredDevices}
                </div>
                <div className="text-sm text-gray-400">
                  With backups
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Total Backups
                </h3>
                <div className="text-2xl font-bold text-purple-400">
                  {configStats.totalBackups}
                </div>
                <div className="text-sm text-gray-400">
                  Configuration backups
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Policy Violations
                </h3>
                <div className="text-2xl font-bold text-red-400">
                  {configStats.policyViolations}
                </div>
                <div className="text-sm text-gray-400">
                  Compliance issues
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Recent Changes
                </h3>
                <div className="text-2xl font-bold text-orange-400">
                  {configStats.recentChanges}
                </div>
                <div className="text-sm text-gray-400">
                  Last 24 hours
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Last Backup
                </h3>
                <div className="text-2xl font-bold text-indigo-400">
                  {formatTimeAgo(configStats.lastBackup)}
                </div>
                <div className="text-sm text-gray-400">
                  {formatTimestamp(configStats.lastBackup)}
                </div>
              </div>
            </div>
          )}

          {/* Backups */}
          {selectedView === 'backups' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Configuration Backups
              </h3>
              <div className="space-y-4">
                {deviceConfigs.map((config) => {
                  const device = getDeviceByName(config.deviceId);
                  return (
                    <div key={config.deviceId} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">🖥️</div>
                          <div>
                            <div className="font-medium text-white">
                              {device?.hostname || 'Unknown Device'}
                            </div>
                            <div className="text-sm text-gray-400">
                              {device?.vendor} {device?.model} • {config.version}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Last Backup</div>
                            <div className="font-medium text-white">
                              {formatTimeAgo(config.timestamp)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Type</div>
                            <div className={`font-medium ${getBackupTypeColor(config.backupType)}`}>
                              {config.backupType}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Status</div>
                            <div className={`font-medium ${getStatusColor(config.status)}`}>
                              {config.status}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleBackupDevice(config.deviceId)}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                              Backup
                            </button>
                            <button
                              onClick={() => handleRestoreDevice(config.deviceId)}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            >
                              Restore
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-400">
                        Checksum: {config.checksum}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Policies */}
          {selectedView === 'policies' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Configuration Policies
              </h3>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-white">{policy.name}</div>
                        <div className="text-sm text-gray-400">{policy.description}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          policy.enabled ? 'bg-green-900 text-green-300' : 'bg-gray-600 text-gray-300'
                        }`}>
                          {policy.enabled ? 'ENABLED' : 'DISABLED'}
                        </span>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {policy.rules.map((rule, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-600 last:border-b-0">
                          <div>
                            <div className="font-medium text-white">{rule.message}</div>
                            <div className="text-sm text-gray-400">
                              {rule.type} • Pattern: {rule.pattern}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(rule.severity)}`}>
                            {rule.severity.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-400">
                      Applies to {policy.devices.length} devices
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Changes */}
          {selectedView === 'changes' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Configuration Changes
              </h3>
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <div className="text-lg font-medium text-white mb-2">
                  Change Tracking
                </div>
                <div className="text-gray-400">
                  Track and audit configuration changes across devices
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Change History
                </button>
              </div>
            </div>
          )}

          {/* Compliance */}
          {selectedView === 'compliance' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Compliance Report
              </h3>
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">✅</div>
                <div className="text-lg font-medium text-white mb-2">
                  Compliance Dashboard
                </div>
                <div className="text-gray-400">
                  Monitor policy compliance and generate audit reports
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Generate Report
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfigurationManager;

