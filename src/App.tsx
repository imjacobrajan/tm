import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import DeviceList from './components/Devices/DeviceList';
import DeviceDetails from './components/Devices/DeviceDetails';
import DiscoveryWizard from './components/Discovery/DiscoveryWizard';
import NetBoxImporter from './components/Discovery/NetBoxImporter';
import PathAnalysis from './components/Analysis/PathAnalysis';
import ReachabilityAnalysis from './components/Analysis/ReachabilityAnalysis';
import MapView from './components/Maps/MapView';
import GeotaggingManager from './components/Maps/GeotaggingManager';
import NetworkProtocolIngestion from './components/Network/NetworkProtocolIngestion';
import TopologyScansView from './components/Network/TopologyScansView';
import PerformanceDashboard from './components/Monitoring/PerformanceDashboard';
import NetworkTrafficAnalysis from './components/Analysis/NetworkTrafficAnalysis';
import WirelessNetworkMonitor from './components/Monitoring/WirelessNetworkMonitor';
import ApplicationPerformanceMonitor from './components/Monitoring/ApplicationPerformanceMonitor';
import CloudResourcesMonitor from './components/Monitoring/CloudResourcesMonitor';
import LogManagement from './components/Monitoring/LogManagement';
import ConfigurationManager from './components/Settings/ConfigurationManager';
import CredentialsManager from './components/Settings/CredentialsManager';
import BackupManagement from './components/Management/BackupManagement';
import FirmwareManagement from './components/Management/FirmwareManagement';
import AlertManagement from './components/Management/AlertManagement';
import UserList from './components/Management/UserList';
import UserRole from './components/Management/UserRole';
import UserProfile from './components/Management/UserProfile';
import Regions from './components/Organization/Regions';
import Sites from './components/Organization/Sites';
import Locations from './components/Organization/Locations';
import type { Device, Site, DiscoveryScan } from './types';
import { mockDiscoveryScans } from './data/mockData';
import { netboxTopologyData, scanMetadata } from './data/netboxMockData';
import { adaptSlurpitTopology } from './services/netboxAdapter';

function App() {
  // Initialize with NetBox data converted to internal format
  const netboxScan = adaptSlurpitTopology(netboxTopologyData, scanMetadata.scan_name);
  
  const [currentView, setCurrentView] = useState('nav-topology'); // Start with topology view
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [, setSelectedSite] = useState<Site | null>(null);
  const [showDiscoveryWizard, setShowDiscoveryWizard] = useState(false);
  const [showNetBoxImporter, setShowNetBoxImporter] = useState(false);
  const [discoveryScans, setDiscoveryScans] = useState<DiscoveryScan[]>([netboxScan, ...mockDiscoveryScans]);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [showPathAnalysis, setShowPathAnalysis] = useState(false);
  const [showReachabilityAnalysis, setShowReachabilityAnalysis] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [showGeotaggingManager, setShowGeotaggingManager] = useState(false);
  const [showLLDPIngestion, setShowLLDPIngestion] = useState(false);
  const [showCredentialsManager, setShowCredentialsManager] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    setShowDeviceDetails(true);
  };

  const handleSiteSelect = (site: Site) => {
    setSelectedSite(site);
  };

  const handleDiscoveryComplete = (scan: DiscoveryScan) => {
    console.log('Discovery completed:', scan);
    
    // Add the new scan to the list of discovery scans
    setDiscoveryScans(prev => [scan, ...prev]);
    
    setShowDiscoveryWizard(false);
    
    // Navigate to topology view to show the discovered network
    setCurrentView('nav-topology');
  };

  // Handle discovery scan navigation
  useEffect(() => {
    if (currentView === 'nav-discover-scan') {
      setShowDiscoveryWizard(true);
    } else if (currentView === 'nav-netbox-import') {
      setShowNetBoxImporter(true);
    }
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'nav-dashboard':
        return <Dashboard />;
      case 'nav-organization-regions':
        return <Regions />;
      case 'nav-organization-sites':
        return <Sites />;
      case 'nav-organization-locations':
        return <Locations />;
      case 'nav-discover-scan':
        // Discovery wizard will be opened via useEffect
        return <Dashboard />;
      case 'nav-netbox-import':
        // NetBox importer will be opened via useEffect
        return <Dashboard />;
      case 'nav-discover-history':
        return (
          <div className="text-center py-12">
            <span className="text-6xl">📜</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Scan History
            </h2>
            <p className="text-gray-600 mt-2">
              View previous network discovery scans and results
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              View All Scans
            </button>
          </div>
        );
      case 'nav-inventory-devices':
        return <DeviceList onDeviceSelect={handleDeviceSelect} />;
      case 'nav-topology':
        return <TopologyScansView 
          onDeviceSelect={handleDeviceSelect} 
          onSiteSelect={handleSiteSelect}
          scans={discoveryScans}
        />;
      case 'nav-analyze-paths':
        return <PathAnalysis onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-analyze-reachability':
        return <ReachabilityAnalysis onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-lldp-ingestion':
        return <NetworkProtocolIngestion onClose={() => setCurrentView('nav-dashboard')} />;
      
      // Monitoring Views
      case 'nav-monitoring-performance':
        return <PerformanceDashboard device={selectedDevice || undefined} onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-monitoring-traffic':
        return <NetworkTrafficAnalysis onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-monitoring-wireless':
        return <WirelessNetworkMonitor onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-monitoring-applications':
        return <ApplicationPerformanceMonitor onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-monitoring-cloud':
        return <CloudResourcesMonitor onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-monitoring-logs':
        return <LogManagement onClose={() => setCurrentView('nav-dashboard')} />;
      
      // Management Views
      case 'nav-config-management':
        return <ConfigurationManager onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-backups-management':
        return <BackupManagement onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-firmware-management':
        return <FirmwareManagement onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-alert-management':
        return <AlertManagement onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-user-list':
        return <UserList onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-user-roles':
        return <UserRole onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-analyze-reports':
        return (
          <div className="text-center py-12">
            <span className="text-6xl">📊</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Reports
            </h2>
            <p className="text-gray-600 mt-2">
              Generate network inventory and analysis reports
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        );
      case 'nav-settings-credentials':
        return <CredentialsManager onClose={() => setCurrentView('nav-dashboard')} />;
      case 'nav-settings-roles':
        return (
          <div className="text-center py-12">
            <span className="text-6xl">🏷️</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Device Roles
            </h2>
            <p className="text-gray-600 mt-2">
              Manage device roles and auto-monitoring templates
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Manage Roles
            </button>
          </div>
        );
      case 'nav-settings-dependencies':
        return (
          <div className="text-center py-12">
            <span className="text-6xl">🔗</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Dependencies
            </h2>
            <p className="text-gray-600 mt-2">
              Configure device dependencies for alert suppression
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Manage Dependencies
            </button>
          </div>
        );
      case 'nav-settings-schedules':
        return (
          <div className="text-center py-12">
            <span className="text-6xl">🕐</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Schedules
            </h2>
            <p className="text-gray-600 mt-2">
              Manage discovery and monitoring schedules
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Manage Schedules
            </button>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'nav-dashboard': return 'Dashboard';
      case 'nav-organization-regions': return 'Regions';
      case 'nav-organization-sites': return 'Sites';
      case 'nav-organization-locations': return 'Locations';
      case 'nav-discover-scan': return 'New Scan';
      case 'nav-netbox-import': return 'Import from NetBox';
      case 'nav-discover-history': return 'Scan History';
      case 'nav-inventory-devices': return 'Devices';
      case 'nav-topology': return 'Network Topology';
      case 'nav-analyze-paths': return 'Path Analysis';
      case 'nav-analyze-reachability': return 'Reachability Analysis';
      case 'nav-lldp-ingestion': return 'Network Protocol Ingestion';
      case 'nav-analyze-reports': return 'Reports';
      case 'nav-monitoring-performance': return 'Performance Monitoring';
      case 'nav-monitoring-traffic': return 'Traffic Analysis';
      case 'nav-monitoring-wireless': return 'Wireless Monitoring';
      case 'nav-monitoring-applications': return 'Application Performance';
      case 'nav-monitoring-cloud': return 'Cloud Resources';
      case 'nav-monitoring-logs': return 'Log Management';
      case 'nav-config-management': return 'Configuration Management';
      case 'nav-backups-management': return 'Backup Management';
      case 'nav-firmware-management': return 'Firmware Management';
      case 'nav-alert-management': return 'Alert Management';
      case 'nav-user-list': return 'User Management';
      case 'nav-user-roles': return 'User Roles';
      case 'nav-settings-credentials': return 'Credentials';
      case 'nav-settings-roles': return 'Device Roles';
      case 'nav-settings-dependencies': return 'Dependencies';
      case 'nav-settings-schedules': return 'Schedules';
      default: return 'Netpulse';
    }
  };

  const getPageSubtitle = () => {
    switch (currentView) {
      case 'nav-dashboard': return '';
      case 'nav-organization-regions': return 'Manage network regions and geographical areas';
      case 'nav-organization-sites': return 'Manage network sites and data centers';
      case 'nav-organization-locations': return 'Manage specific locations within sites';
      case 'nav-discover-scan': return 'Start a new network discovery scan';
      case 'nav-netbox-import': return 'Import network topology from NetBox or Slurpit';
      case 'nav-discover-history': return 'View previous discovery scans and results';
      case 'nav-inventory-devices': return 'Manage network devices';
      case 'nav-topology': return 'Visualize network topology and connections';
      case 'nav-analyze-paths': return 'Analyze network paths';
      case 'nav-analyze-reachability': return 'Test device reachability';
      case 'nav-lldp-ingestion': return 'Discover network topology using multiple protocols';
      case 'nav-analyze-reports': return 'Generate network reports';
      case 'nav-monitoring-performance': return 'Monitor device performance and health';
      case 'nav-monitoring-traffic': return 'Analyze network traffic and bandwidth';
      case 'nav-monitoring-wireless': return 'Monitor WiFi networks and access points';
      case 'nav-monitoring-applications': return 'Monitor application performance and availability';
      case 'nav-monitoring-cloud': return 'Monitor cloud resources and costs';
      case 'nav-monitoring-logs': return 'Manage and analyze system logs';
      case 'nav-config-management': return 'Manage device configurations and compliance';
      case 'nav-backups-management': return 'Manage configuration and system backups';
      case 'nav-firmware-management': return 'Manage firmware versions and updates';
      case 'nav-alert-management': return 'Monitor and manage network alarms';
      case 'nav-user-list': return 'Manage system users and their access';
      case 'nav-user-roles': return 'Manage user roles and permissions';
      case 'nav-settings-credentials': return 'Manage authentication credentials';
      case 'nav-settings-roles': return 'Configure device roles';
      case 'nav-settings-dependencies': return 'Set up device dependencies';
      case 'nav-settings-schedules': return 'Manage automation schedules';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Layout 
        title={getPageTitle()}
        subtitle={getPageSubtitle()}
        currentView={currentView}
        onNavigate={setCurrentView}
        onProfileClick={() => setShowUserProfile(true)}
      >
        {renderContent()}
      </Layout>

      {/* Modals and Overlays */}
      {showDiscoveryWizard && (
        <DiscoveryWizard
          onComplete={handleDiscoveryComplete}
          onCancel={() => setShowDiscoveryWizard(false)}
        />
      )}

      {showNetBoxImporter && (
        <NetBoxImporter
          onComplete={handleDiscoveryComplete}
          onCancel={() => setShowNetBoxImporter(false)}
        />
      )}

      {showDeviceDetails && selectedDevice && (
        <DeviceDetails
          device={selectedDevice}
          onClose={() => {
            setShowDeviceDetails(false);
            setSelectedDevice(null);
          }}
        />
      )}

      {showPathAnalysis && (
        <PathAnalysis
          onClose={() => setShowPathAnalysis(false)}
        />
      )}

      {showReachabilityAnalysis && (
        <ReachabilityAnalysis
          onClose={() => setShowReachabilityAnalysis(false)}
        />
      )}

      {showMapView && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Network Map
              </h2>
              <button
                onClick={() => setShowMapView(false)}
                className="text-gray-400 hover:text-gray-600:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <MapView
                onDeviceSelect={handleDeviceSelect}
                onSiteSelect={handleSiteSelect}
              />
            </div>
          </div>
        </div>
      )}

      {showGeotaggingManager && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="min-h-screen">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Geotagging Manager
              </h2>
              <button
                onClick={() => setShowGeotaggingManager(false)}
                className="text-gray-400 hover:text-gray-600:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <GeotaggingManager
                onClose={() => setShowGeotaggingManager(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showLLDPIngestion && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="min-h-screen">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Network Protocol Ingestion
              </h2>
              <button
                onClick={() => setShowLLDPIngestion(false)}
                className="text-gray-400 hover:text-gray-600:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <NetworkProtocolIngestion
                onClose={() => setShowLLDPIngestion(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showCredentialsManager && (
        <div className="fixed inset-0 z-50 bg-gray-900 overflow-y-auto">
          <div className="min-h-screen">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">
                Credentials Manager
              </h2>
              <button
                onClick={() => setShowCredentialsManager(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <CredentialsManager
                onClose={() => setShowCredentialsManager(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showUserProfile && (
        <div className="fixed inset-0 z-50 bg-gray-900 overflow-y-auto">
          <UserProfile
            onClose={() => setShowUserProfile(false)}
          />
        </div>
      )}

    </div>
  );
}

export default App;