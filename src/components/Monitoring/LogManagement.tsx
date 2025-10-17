import React, { useState, useEffect } from 'react';
import type { LogEntry } from '../../types';

interface LogManagementProps {
  onClose?: () => void;
}

interface LogStats {
  totalLogs: number;
  logsBySeverity: { severity: string; count: number }[];
  logsBySource: { source: string; count: number }[];
  logsByFacility: { facility: string; count: number }[];
  recentLogs: LogEntry[];
}

const LogManagement: React.FC<LogManagementProps> = ({ onClose }) => {
  const [selectedView, setSelectedView] = useState<'overview' | 'logs' | 'search' | 'alerts'>('overview');
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'emergency' | 'alert' | 'critical' | 'error' | 'warning' | 'notice' | 'info' | 'debug'>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [logStats, setLogStats] = useState<LogStats | null>(null);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate mock log data
  useEffect(() => {
    const generateMockData = () => {
      setIsLoading(true);
      
      const mockLogs: LogEntry[] = [
        {
          id: 'log-1',
          timestamp: new Date(Date.now() - 300000),
          source: '192.168.1.10',
          facility: 'kernel',
          severity: 'warning',
          message: 'Interface eth0: link up',
          rawMessage: 'Jan 15 10:25:00 router kernel: [12345.678] eth0: link up',
          parsedFields: {
            timestamp: 'Jan 15 10:25:00',
            hostname: 'router',
            process: 'kernel',
            pid: '12345.678',
            interface: 'eth0',
            event: 'link up'
          },
          tags: ['network', 'interface', 'link']
        },
        {
          id: 'log-2',
          timestamp: new Date(Date.now() - 600000),
          source: '192.168.1.20',
          facility: 'auth',
          severity: 'error',
          message: 'Failed login attempt from 192.168.1.100',
          rawMessage: 'Jan 15 10:20:00 server sshd[1234]: Failed password for user admin from 192.168.1.100',
          parsedFields: {
            timestamp: 'Jan 15 10:20:00',
            hostname: 'server',
            process: 'sshd',
            pid: '1234',
            user: 'admin',
            source_ip: '192.168.1.100',
            event: 'Failed password'
          },
          tags: ['security', 'authentication', 'ssh']
        },
        {
          id: 'log-3',
          timestamp: new Date(Date.now() - 900000),
          source: '192.168.1.30',
          facility: 'mail',
          severity: 'info',
          message: 'Email delivered successfully',
          rawMessage: 'Jan 15 10:15:00 mailserver postfix/smtp[5678]: 1234567890: to=<user@example.com>',
          parsedFields: {
            timestamp: 'Jan 15 10:15:00',
            hostname: 'mailserver',
            process: 'postfix/smtp',
            pid: '5678',
            message_id: '1234567890',
            recipient: 'user@example.com'
          },
          tags: ['mail', 'delivery', 'smtp']
        },
        {
          id: 'log-4',
          timestamp: new Date(Date.now() - 1200000),
          source: '192.168.1.40',
          facility: 'daemon',
          severity: 'critical',
          message: 'Service httpd failed to start',
          rawMessage: 'Jan 15 10:10:00 webserver systemd[1]: httpd.service: Failed to start',
          parsedFields: {
            timestamp: 'Jan 15 10:10:00',
            hostname: 'webserver',
            process: 'systemd',
            pid: '1',
            service: 'httpd.service',
            event: 'Failed to start'
          },
          tags: ['service', 'httpd', 'systemd']
        },
        {
          id: 'log-5',
          timestamp: new Date(Date.now() - 1500000),
          source: '192.168.1.50',
          facility: 'syslog',
          severity: 'alert',
          message: 'High CPU usage detected',
          rawMessage: 'Jan 15 10:05:00 monitor snmpd[9012]: High CPU usage: 95%',
          parsedFields: {
            timestamp: 'Jan 15 10:05:00',
            hostname: 'monitor',
            process: 'snmpd',
            pid: '9012',
            metric: 'CPU usage',
            value: '95%'
          },
          tags: ['monitoring', 'cpu', 'performance']
        }
      ];
      
      // Calculate statistics
      const totalLogs = mockLogs.length;
      const logsBySeverity = [
        { severity: 'emergency', count: mockLogs.filter(log => log.severity === 'emergency').length },
        { severity: 'alert', count: mockLogs.filter(log => log.severity === 'alert').length },
        { severity: 'critical', count: mockLogs.filter(log => log.severity === 'critical').length },
        { severity: 'error', count: mockLogs.filter(log => log.severity === 'error').length },
        { severity: 'warning', count: mockLogs.filter(log => log.severity === 'warning').length },
        { severity: 'notice', count: mockLogs.filter(log => log.severity === 'notice').length },
        { severity: 'info', count: mockLogs.filter(log => log.severity === 'info').length },
        { severity: 'debug', count: mockLogs.filter(log => log.severity === 'debug').length }
      ].filter(item => item.count > 0);
      
      const logsBySource = [
        { source: '192.168.1.10', count: mockLogs.filter(log => log.source === '192.168.1.10').length },
        { source: '192.168.1.20', count: mockLogs.filter(log => log.source === '192.168.1.20').length },
        { source: '192.168.1.30', count: mockLogs.filter(log => log.source === '192.168.1.30').length },
        { source: '192.168.1.40', count: mockLogs.filter(log => log.source === '192.168.1.40').length },
        { source: '192.168.1.50', count: mockLogs.filter(log => log.source === '192.168.1.50').length }
      ].filter(item => item.count > 0);
      
      const logsByFacility = [
        { facility: 'kernel', count: mockLogs.filter(log => log.facility === 'kernel').length },
        { facility: 'auth', count: mockLogs.filter(log => log.facility === 'auth').length },
        { facility: 'mail', count: mockLogs.filter(log => log.facility === 'mail').length },
        { facility: 'daemon', count: mockLogs.filter(log => log.facility === 'daemon').length },
        { facility: 'syslog', count: mockLogs.filter(log => log.facility === 'syslog').length }
      ].filter(item => item.count > 0);
      
      setLogStats({
        totalLogs,
        logsBySeverity,
        logsBySource,
        logsByFacility,
        recentLogs: mockLogs
      });
      
      setFilteredLogs(mockLogs);
      setIsLoading(false);
    };
    
    generateMockData();
    
    // Simulate real-time updates
    const interval = setInterval(generateMockData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter logs based on selected criteria
  useEffect(() => {
    if (!logStats) return;
    
    let filtered = logStats.recentLogs;
    
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === selectedSeverity);
    }
    
    if (selectedSource !== 'all') {
      filtered = filtered.filter(log => log.source === selectedSource);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.rawMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredLogs(filtered);
  }, [logStats, selectedSeverity, selectedSource, searchQuery]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'text-red-300 bg-red-900';
      case 'alert': return 'text-red-300 bg-red-900';
      case 'critical': return 'text-red-400 bg-red-900';
      case 'error': return 'text-red-400 bg-red-900';
      case 'warning': return 'text-yellow-400 bg-yellow-900';
      case 'notice': return 'text-blue-400 bg-blue-900';
      case 'info': return 'text-green-400 bg-green-900';
      case 'debug': return 'text-gray-400 bg-gray-700';
      default: return 'text-gray-400 bg-gray-700';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'emergency': return '🚨';
      case 'alert': return '⚠️';
      case 'critical': return '🔴';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'notice': return 'ℹ️';
      case 'info': return '✅';
      case 'debug': return '🔍';
      default: return '📝';
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

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Log Management
          </h2>
          <p className="text-gray-400">
            Centralized log collection, analysis, and monitoring
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
          { key: 'logs', label: 'Logs' },
          { key: 'search', label: 'Search' },
          { key: 'alerts', label: 'Alerts' }
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

      {/* Filters */}
      {(selectedView === 'logs' || selectedView === 'search') && (
        <div className="flex space-x-4 mb-6">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value as any)}
            className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
          >
            <option value="all">All Severities</option>
            <option value="emergency">Emergency</option>
            <option value="alert">Alert</option>
            <option value="critical">Critical</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="notice">Notice</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
          
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
          >
            <option value="all">All Sources</option>
            {logStats?.logsBySource.map(source => (
              <option key={source.source} value={source.source}>{source.source}</option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 flex-1"
          />
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-300">Loading log data...</p>
          </div>
        </div>
      )}

      {/* Content */}
      {!isLoading && logStats && (
        <div className="space-y-6">
          {/* Overview */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Total Logs
                </h3>
                <div className="text-2xl font-bold text-blue-400">
                  {logStats.totalLogs}
                </div>
                <div className="text-sm text-gray-400">
                  Last 24 hours
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Error Logs
                </h3>
                <div className="text-2xl font-bold text-red-400">
                  {logStats.logsBySeverity.filter(s => ['error', 'critical', 'alert', 'emergency'].includes(s.severity)).reduce((sum, s) => sum + s.count, 0)}
                </div>
                <div className="text-sm text-gray-400">
                  Critical issues
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Sources
                </h3>
                <div className="text-2xl font-bold text-green-400">
                  {logStats.logsBySource.length}
                </div>
                <div className="text-sm text-gray-400">
                  Active sources
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Facilities
                </h3>
                <div className="text-2xl font-bold text-purple-400">
                  {logStats.logsByFacility.length}
                </div>
                <div className="text-sm text-gray-400">
                  Log facilities
                </div>
              </div>
            </div>
          )}

          {/* Logs */}
          {selectedView === 'logs' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Recent Logs ({filteredLogs.length})
              </h3>
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="text-2xl mr-3">
                          {getSeverityIcon(log.severity)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(log.severity)}`}>
                              {log.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-400">
                              {log.facility}
                            </span>
                            <span className="text-sm text-gray-400">
                              {log.source}
                            </span>
                          </div>
                          <div className="font-medium text-white mb-1">
                            {log.message}
                          </div>
                          <div className="text-sm text-gray-400">
                            {log.rawMessage}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {log.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div>{formatTimestamp(log.timestamp)}</div>
                        <div>{formatTimeAgo(log.timestamp)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search */}
          {selectedView === 'search' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Log Search Results ({filteredLogs.length})
              </h3>
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="text-2xl mr-3">
                          {getSeverityIcon(log.severity)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(log.severity)}`}>
                              {log.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-400">
                              {log.facility}
                            </span>
                            <span className="text-sm text-gray-400">
                              {log.source}
                            </span>
                          </div>
                          <div className="font-medium text-white mb-1">
                            {log.message}
                          </div>
                          <div className="text-sm text-gray-400">
                            {log.rawMessage}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div>{formatTimestamp(log.timestamp)}</div>
                        <div>{formatTimeAgo(log.timestamp)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alerts */}
          {selectedView === 'alerts' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Log Alerts
              </h3>
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">🚨</div>
                <div className="text-lg font-medium text-white mb-2">
                  Alert Configuration
                </div>
                <div className="text-gray-400">
                  Configure log-based alerts and notifications
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Configure Alerts
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogManagement;

