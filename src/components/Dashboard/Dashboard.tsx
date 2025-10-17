import React from 'react';
import { Search, AlertTriangle, Clock } from 'lucide-react';
import StatsCard from './StatsCard';
import DeviceStatusChart from './DeviceStatusChart';
import RecentEvents from './RecentEvents';
import QuickActions from './QuickActions';
import { mockDevices, mockEvents } from '../../data/mockData';
import { Monitor, CheckCircle, Building2, Link2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Calculate stats from mock data
  const totalDevices = mockDevices.length;
  const upDevices = mockDevices.filter(d => d.status === 'up').length;
  const downDevices = mockDevices.filter(d => d.status === 'down').length;
  const warningDevices = mockDevices.filter(d => d.status === 'warning').length;
  const unknownDevices = mockDevices.filter(d => d.status === 'unknown').length;
  
  const totalSites = 3; // From mock data
  const totalLinks = 1; // From mock data
  const activeScans = 0; // No active scans in mock data

  const deviceStatusData = {
    up: upDevices,
    down: downDevices,
    warning: warningDevices,
    unknown: unknownDevices
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Overview of your network infrastructure
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Devices"
          value={totalDevices}
          change={{ value: 12, type: 'increase' }}
          icon={Monitor}
          color="blue"
          subtitle="Across all sites"
        />
        <StatsCard
          title="Online Devices"
          value={upDevices}
          change={{ value: 5, type: 'increase' }}
          icon={CheckCircle}
          color="green"
          subtitle={`${((upDevices / totalDevices) * 100).toFixed(1)}% uptime`}
        />
        <StatsCard
          title="Sites"
          value={totalSites}
          change={{ value: 0, type: 'neutral' }}
          icon={Building2}
          color="purple"
          subtitle="Active locations"
        />
        <StatsCard
          title="Network Links"
          value={totalLinks}
          change={{ value: 2, type: 'increase' }}
          icon={Link2}
          color="indigo"
          subtitle="Discovered connections"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Status Chart */}
        <div className="lg:col-span-1">
          <DeviceStatusChart data={deviceStatusData} />
        </div>

        {/* Recent Events */}
        <div className="lg:col-span-1">
          <RecentEvents events={mockEvents} />
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Active Scans"
          value={activeScans}
          icon={Search}
          color="yellow"
          subtitle="Discovery in progress"
        />
        <StatsCard
          title="Critical Alerts"
          value={mockEvents.filter(e => e.severity === 'critical').length}
          icon={AlertTriangle}
          color="red"
          subtitle="Require immediate attention"
        />
        <StatsCard
          title="Last Discovery"
          value="2 hours ago"
          icon={Clock}
          color="blue"
          subtitle="Network scan completed"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Network Activity
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
            <span className="text-2xl">🔍</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                Network discovery completed
              </p>
              <p className="text-xs text-gray-400">
                Found 5 new devices across 3 sites
              </p>
            </div>
            <span className="text-xs text-gray-400">
              2 hours ago
            </span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
            <span className="text-2xl">🔗</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                LLDP link discovered
              </p>
              <p className="text-xs text-gray-400">
                New connection between SW-ACCESS-01 and CORE-ROUTER-01
              </p>
            </div>
            <span className="text-xs text-gray-400">
              4 hours ago
            </span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                Device status changed
              </p>
              <p className="text-xs text-gray-400">
                SW-DIST-01 status changed to warning
              </p>
            </div>
            <span className="text-xs text-gray-400">
              6 hours ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

