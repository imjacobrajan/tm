import React, { useState, useEffect } from 'react';
import type { Device, PerformanceMetric } from '../../types';

interface PerformanceDashboardProps {
  device?: Device;
  onClose?: () => void;
}

interface PerformanceData {
  cpu: PerformanceMetric[];
  memory: PerformanceMetric[];
  disk: PerformanceMetric[];
  network: PerformanceMetric[];
  temperature: PerformanceMetric[];
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ device, onClose }) => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    cpu: [],
    memory: [],
    disk: [],
    network: [],
    temperature: []
  });
  const [selectedMetric, setSelectedMetric] = useState<keyof PerformanceData>('cpu');
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h');

  // Mock performance data - in real implementation, this would come from API
  useEffect(() => {
    const generateMockData = () => {
      const now = new Date();
      const data: PerformanceData = {
        cpu: [],
        memory: [],
        disk: [],
        network: [],
        temperature: []
      };

      // Generate mock data for the last hour
      for (let i = 59; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60000); // Every minute
        
        data.cpu.push({
          deviceId: device?.id || 'device-1',
          metricType: 'cpu',
          value: Math.random() * 100,
          unit: '%',
          timestamp,
          threshold: { warning: 70, critical: 90 }
        });

        data.memory.push({
          deviceId: device?.id || 'device-1',
          metricType: 'memory',
          value: Math.random() * 100,
          unit: '%',
          timestamp,
          threshold: { warning: 80, critical: 95 }
        });

        data.disk.push({
          deviceId: device?.id || 'device-1',
          metricType: 'disk',
          value: Math.random() * 100,
          unit: '%',
          timestamp,
          threshold: { warning: 85, critical: 95 }
        });

        data.network.push({
          deviceId: device?.id || 'device-1',
          metricType: 'network',
          value: Math.random() * 1000,
          unit: 'Mbps',
          timestamp,
          threshold: { warning: 800, critical: 950 }
        });

        data.temperature.push({
          deviceId: device?.id || 'device-1',
          metricType: 'temperature',
          value: 20 + Math.random() * 40,
          unit: '°C',
          timestamp,
          threshold: { warning: 60, critical: 80 }
        });
      }

      setPerformanceData(data);
    };

    generateMockData();
    
    // Simulate real-time updates
    const interval = setInterval(generateMockData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [device?.id]);

  const getMetricColor = (value: number, threshold?: { warning: number; critical: number }) => {
    if (!threshold) return 'text-gray-400';
    if (value >= threshold.critical) return 'text-red-400';
    if (value >= threshold.warning) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getCurrentValue = (metrics: PerformanceMetric[]) => {
    return metrics.length > 0 ? metrics[metrics.length - 1] : null;
  };

  const getAverageValue = (metrics: PerformanceMetric[]) => {
    if (metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  };

  const getPeakValue = (metrics: PerformanceMetric[]) => {
    if (metrics.length === 0) return 0;
    return Math.max(...metrics.map(metric => metric.value));
  };

  const currentMetric = getCurrentValue(performanceData[selectedMetric]);
  const averageValue = getAverageValue(performanceData[selectedMetric]);
  const peakValue = getPeakValue(performanceData[selectedMetric]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Performance Dashboard
          </h2>
          {device && (
            <p className="text-gray-400">
              {device.hostname} - {device.vendor} {device.model}
            </p>
          )}
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

      {/* Metric Selector */}
      <div className="flex space-x-4 mb-6">
        {(['cpu', 'memory', 'disk', 'network', 'temperature'] as const).map((metric) => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedMetric === metric
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            {metric.charAt(0).toUpperCase() + metric.slice(1)}
          </button>
        ))}
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-2 mb-6">
        {(['1h', '6h', '24h', '7d'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Current Metrics */}
      {currentMetric && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Current Value
            </h3>
            <div className={`text-3xl font-bold ${getMetricColor(currentMetric.value, currentMetric.threshold)}`}>
              {currentMetric.value.toFixed(1)} {currentMetric.unit}
            </div>
            <div className="text-sm text-gray-400">
              {currentMetric.timestamp.toLocaleTimeString()}
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Average
            </h3>
            <div className="text-3xl font-bold text-blue-400">
              {averageValue.toFixed(1)} {currentMetric.unit}
            </div>
            <div className="text-sm text-gray-400">
              Last {timeRange}
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Peak
            </h3>
            <div className="text-3xl font-bold text-red-400">
              {peakValue.toFixed(1)} {currentMetric.unit}
            </div>
            <div className="text-sm text-gray-400">
              Last {timeRange}
            </div>
          </div>
        </div>
      )}

      {/* Performance Chart */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Usage Over Time
        </h3>
        
        {/* Simple ASCII Chart - In real implementation, use a proper charting library */}
        <div className="bg-gray-800 rounded p-4 h-64 flex items-end justify-between">
          {performanceData[selectedMetric].slice(-20).map((metric, index) => {
            const height = (metric.value / 100) * 200; // Scale to chart height
            
            return (
              <div
                key={index}
                className={`w-4 rounded-t transition-all duration-300 ${
                  metric.value >= (metric.threshold?.critical || 100) ? 'bg-red-500' :
                  metric.value >= (metric.threshold?.warning || 80) ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ height: `${height}px` }}
                title={`${metric.value.toFixed(1)} ${metric.unit} at ${metric.timestamp.toLocaleTimeString()}`}
              />
            );
          })}
        </div>
      </div>

      {/* Thresholds */}
      {currentMetric?.threshold && (
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Thresholds
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Warning</div>
              <div className="text-xl font-semibold text-yellow-400">
                {currentMetric.threshold.warning} {currentMetric.unit}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Critical</div>
              <div className="text-xl font-semibold text-red-400">
                {currentMetric.threshold.critical} {currentMetric.unit}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PerformanceDashboard;

