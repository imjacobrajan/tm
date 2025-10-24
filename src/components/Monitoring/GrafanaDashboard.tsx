import React, { useState } from 'react';
import { ExternalLink, Maximize2, RefreshCw, X } from 'lucide-react';

interface GrafanaDashboardProps {
  onClose?: () => void;
}

const GrafanaDashboard: React.FC<GrafanaDashboardProps> = ({ onClose }) => {
  const [grafanaUrl, setGrafanaUrl] = useState('http://localhost:3000');
  const [dashboardPath, setDashboardPath] = useState('/d/client-demo/network-monitoring-dashboard');
  const [embedMode, setEmbedMode] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isConfiguring, setIsConfiguring] = useState(false);

  // Construct full Grafana URL
  const getFullUrl = () => {
    const baseUrl = grafanaUrl.endsWith('/') ? grafanaUrl.slice(0, -1) : grafanaUrl;
    const path = dashboardPath.startsWith('/') ? dashboardPath : `/${dashboardPath}`;
    return `${baseUrl}${path}`;
  };

  // Get embed URL with kiosk mode and other parameters - hide all Grafana UI for fullscreen
  const getEmbedUrl = () => {
    const fullUrl = getFullUrl();
    // kiosk=tv mode hides navbar and side menu for true fullscreen experience
    return `${fullUrl}?orgId=1&kiosk=tv&theme=dark&refresh=30s`;
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenInNewTab = () => {
    window.open(getFullUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleSaveConfig = () => {
    localStorage.setItem('grafana_url', grafanaUrl);
    localStorage.setItem('grafana_dashboard_path', dashboardPath);
    setIsConfiguring(false);
  };

  React.useEffect(() => {
    const savedUrl = localStorage.getItem('grafana_url');
    const savedPath = localStorage.getItem('grafana_dashboard_path');
    if (savedUrl) setGrafanaUrl(savedUrl);
    if (savedPath) setDashboardPath(savedPath);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-white">Grafana Dashboard</h2>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEmbedMode(!embedMode)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                embedMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Embed Mode
            </button>
            <button
              onClick={() => setIsConfiguring(!isConfiguring)}
              className="px-3 py-1.5 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Configure
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {embedMode && (
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          )}
          
          <button
            onClick={handleOpenInNewTab}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                iframe.requestFullscreen?.();
              }
            }}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Configuration Panel */}
      {isConfiguring && (
        <div className="p-4 bg-gray-800 border-b border-gray-700">
          <div className="max-w-4xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Grafana Base URL
              </label>
              <input
                type="text"
                value={grafanaUrl}
                onChange={(e) => setGrafanaUrl(e.target.value)}
                placeholder="http://localhost:3000"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-400">
                The base URL of your Grafana instance (e.g., http://grafana.example.com)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dashboard Path
              </label>
              <input
                type="text"
                value={dashboardPath}
                onChange={(e) => setDashboardPath(e.target.value)}
                placeholder="/d/client-demo/network-monitoring-dashboard"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-400">
                Default: /d/client-demo/network-monitoring-dashboard (Professional monitoring dashboard with graphs)
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSaveConfig}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Configuration
              </button>
              <button
                onClick={() => setIsConfiguring(false)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>Preview URL:</strong> {getFullUrl()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {embedMode ? (
          <div className="h-full relative">
            <iframe
              key={refreshKey}
              src={getEmbedUrl()}
              className="w-full h-full border-0"
              title="Grafana Dashboard"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              allow="fullscreen"
            />
            <div className="absolute bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm text-gray-300 px-3 py-2 rounded-lg text-xs">
              Connected to: {grafanaUrl}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ExternalLink className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                Open Grafana Dashboard
              </h3>
              
              <p className="text-gray-400 mb-6">
                Your Grafana dashboard will open in a new tab. Make sure pop-ups are enabled for this site.
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Dashboard URL:</p>
                  <p className="text-white font-mono text-sm break-all">{getFullUrl()}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleOpenInNewTab}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Open Dashboard</span>
                </button>
                
                <button
                  onClick={() => setEmbedMode(true)}
                  className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  View Embedded
                </button>
              </div>

              <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                <p className="text-sm text-yellow-300">
                  <strong>Note:</strong> Ensure your Grafana instance is accessible and you have the necessary permissions to view the dashboard.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrafanaDashboard;

