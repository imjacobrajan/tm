import React, { useState, useEffect } from 'react';
import type { FlowRecord } from '../../types';

interface NetworkTrafficAnalysisProps {
  onClose?: () => void;
}

interface TrafficStats {
  totalBytes: number;
  totalPackets: number;
  topTalkers: { ip: string; bytes: number; percentage: number }[];
  topApplications: { name: string; bytes: number; percentage: number }[];
  topProtocols: { protocol: string; bytes: number; percentage: number }[];
  bandwidthUtilization: { time: Date; utilization: number }[];
}

const NetworkTrafficAnalysis: React.FC<NetworkTrafficAnalysisProps> = ({ onClose }) => {
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h');
  const [selectedView, setSelectedView] = useState<'overview' | 'top-talkers' | 'applications' | 'protocols' | 'bandwidth'>('overview');
  const [trafficStats, setTrafficStats] = useState<TrafficStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flowRecords, setFlowRecords] = useState<FlowRecord[]>([]);

  // Generate mock traffic data
  useEffect(() => {
    const generateMockData = () => {
      setIsLoading(true);
      
      // Generate mock flow records
      const mockFlows: FlowRecord[] = [];
      const applications = ['HTTP', 'HTTPS', 'SSH', 'DNS', 'SMTP', 'FTP', 'RDP', 'SMB'];
      const protocols = ['TCP', 'UDP', 'ICMP'];
      const ips = ['192.168.1.10', '192.168.1.20', '192.168.1.30', '10.0.1.100', '10.0.1.200'];
      
      for (let i = 0; i < 1000; i++) {
        const startTime = new Date(Date.now() - Math.random() * 3600000); // Last hour
        mockFlows.push({
          id: `flow-${i}`,
          sourceIP: ips[Math.floor(Math.random() * ips.length)],
          destinationIP: ips[Math.floor(Math.random() * ips.length)],
          sourcePort: Math.floor(Math.random() * 65535),
          destinationPort: Math.floor(Math.random() * 65535),
          protocol: protocols[Math.floor(Math.random() * protocols.length)],
          bytes: Math.floor(Math.random() * 1000000),
          packets: Math.floor(Math.random() * 1000),
          startTime,
          endTime: new Date(startTime.getTime() + Math.random() * 60000),
          application: applications[Math.floor(Math.random() * applications.length)],
          user: `user${Math.floor(Math.random() * 10)}`
        });
      }
      
      setFlowRecords(mockFlows);
      
      // Calculate statistics
      const totalBytes = mockFlows.reduce((sum, flow) => sum + flow.bytes, 0);
      const totalPackets = mockFlows.reduce((sum, flow) => sum + flow.packets, 0);
      
      // Top talkers
      const talkerMap = new Map<string, number>();
      mockFlows.forEach(flow => {
        talkerMap.set(flow.sourceIP, (talkerMap.get(flow.sourceIP) || 0) + flow.bytes);
      });
      const topTalkers = Array.from(talkerMap.entries())
        .map(([ip, bytes]) => ({ ip, bytes, percentage: (bytes / totalBytes) * 100 }))
        .sort((a, b) => b.bytes - a.bytes)
        .slice(0, 10);
      
      // Top applications
      const appMap = new Map<string, number>();
      mockFlows.forEach(flow => {
        if (flow.application) {
          appMap.set(flow.application, (appMap.get(flow.application) || 0) + flow.bytes);
        }
      });
      const topApplications = Array.from(appMap.entries())
        .map(([name, bytes]) => ({ name, bytes, percentage: (bytes / totalBytes) * 100 }))
        .sort((a, b) => b.bytes - a.bytes)
        .slice(0, 10);
      
      // Top protocols
      const protocolMap = new Map<string, number>();
      mockFlows.forEach(flow => {
        protocolMap.set(flow.protocol, (protocolMap.get(flow.protocol) || 0) + flow.bytes);
      });
      const topProtocols = Array.from(protocolMap.entries())
        .map(([protocol, bytes]) => ({ protocol, bytes, percentage: (bytes / totalBytes) * 100 }))
        .sort((a, b) => b.bytes - a.bytes);
      
      // Bandwidth utilization (mock data)
      const bandwidthUtilization = [];
      for (let i = 59; i >= 0; i--) {
        bandwidthUtilization.push({
          time: new Date(Date.now() - i * 60000),
          utilization: Math.random() * 100
        });
      }
      
      setTrafficStats({
        totalBytes,
        totalPackets,
        topTalkers,
        topApplications,
        topProtocols,
        bandwidthUtilization
      });
      
      setIsLoading(false);
    };
    
    generateMockData();
    
    // Simulate real-time updates
    const interval = setInterval(generateMockData, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const formatBytes = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const formatPackets = (packets: number) => {
    if (packets >= 1000000) {
      return `${(packets / 1000000).toFixed(2)}M`;
    } else if (packets >= 1000) {
      return `${(packets / 1000).toFixed(2)}K`;
    }
    return packets.toString();
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Network Traffic Analysis
          </h2>
          <p className="text-gray-400">
            Real-time network traffic monitoring and analysis
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

      {/* Time Range Selector */}
      <div className="flex space-x-2 mb-6">
        {(['1h', '6h', '24h', '7d'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* View Selector */}
      <div className="flex space-x-2 mb-6">
        {([
          { key: 'overview', label: 'Overview' },
          { key: 'top-talkers', label: 'Top Talkers' },
          { key: 'applications', label: 'Applications' },
          { key: 'protocols', label: 'Protocols' },
          { key: 'bandwidth', label: 'Bandwidth' }
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
            <p className="mt-2 text-gray-300">Analyzing traffic data...</p>
          </div>
        </div>
      )}

      {/* Content */}
      {!isLoading && trafficStats && (
        <div className="space-y-6">
          {/* Overview */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Total Traffic
                </h3>
                <div className="text-2xl font-bold text-blue-400">
                  {formatBytes(trafficStats.totalBytes)}
                </div>
                <div className="text-sm text-gray-400">
                  Last {timeRange}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Total Packets
                </h3>
                <div className="text-2xl font-bold text-green-400">
                  {formatPackets(trafficStats.totalPackets)}
                </div>
                <div className="text-sm text-gray-400">
                  Last {timeRange}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Active Flows
                </h3>
                <div className="text-2xl font-bold text-purple-400">
                  {flowRecords.length}
                </div>
                <div className="text-sm text-gray-400">
                  Current
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Avg Bandwidth
                </h3>
                <div className="text-2xl font-bold text-orange-400">
                  {formatBytes(trafficStats.totalBytes / 3600)}/s
                </div>
                <div className="text-sm text-gray-400">
                  Last hour
                </div>
              </div>
            </div>
          )}

          {/* Top Talkers */}
          {selectedView === 'top-talkers' && (
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Top Talkers (Last {timeRange})
              </h3>
              <div className="space-y-3">
                {trafficStats.topTalkers.map((talker, index) => (
                  <div key={talker.ip} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-blue-900 text-blue-300 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-white">{talker.ip}</div>
                        <div className="text-sm text-gray-400">
                          {formatBytes(talker.bytes)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">
                        {talker.percentage.toFixed(1)}%
                      </div>
                      <div className="w-32 bg-gray-600 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{ width: `${talker.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applications */}
          {selectedView === 'applications' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Top Applications (Last {timeRange})
              </h3>
              <div className="space-y-3">
                {trafficStats.topApplications.map((app, index) => (
                  <div key={app.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-green-900 text-green-300 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-white">{app.name}</div>
                        <div className="text-sm text-gray-400">
                          {formatBytes(app.bytes)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">
                        {app.percentage.toFixed(1)}%
                      </div>
                      <div className="w-32 bg-gray-600 rounded-full h-2 mt-1">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${app.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Protocols */}
          {selectedView === 'protocols' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Protocol Distribution (Last {timeRange})
              </h3>
              <div className="space-y-3">
                {trafficStats.topProtocols.map((protocol, index) => (
                  <div key={protocol.protocol} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-900 text-purple-300 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-white">{protocol.protocol}</div>
                        <div className="text-sm text-gray-400">
                          {formatBytes(protocol.bytes)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">
                        {protocol.percentage.toFixed(1)}%
                      </div>
                      <div className="w-32 bg-gray-600 rounded-full h-2 mt-1">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${protocol.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bandwidth Utilization */}
          {selectedView === 'bandwidth' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Bandwidth Utilization (Last Hour)
              </h3>
              <div className="bg-gray-700 rounded p-4 h-64 flex items-end justify-between">
                {trafficStats.bandwidthUtilization.slice(-20).map((point, index) => {
                  const height = (point.utilization / 100) * 200;
                  const color = point.utilization > 80 ? '#EF4444' : point.utilization > 60 ? '#F59E0B' : '#10B981';
                  
                  return (
                    <div
                      key={index}
                      className="w-4 rounded-t transition-all duration-300"
                      style={{ 
                        height: `${height}px`,
                        backgroundColor: color
                      }}
                      title={`${point.utilization.toFixed(1)}% at ${point.time.toLocaleTimeString()}`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NetworkTrafficAnalysis;

