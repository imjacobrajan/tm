import React from 'react';
import type { Event } from '../../types';

interface RecentEventsProps {
  events: Event[];
}

const RecentEvents: React.FC<RecentEventsProps> = ({ events }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🔴';
      case 'error': return '🟠';
      case 'warning': return '🟡';
      case 'info': return '🔵';
      default: return '⚪';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'error': return 'text-orange-600 dark:text-orange-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Events
        </h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {events.slice(0, 5).map((event) => (
          <div key={event.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <span className="text-lg">
                {getSeverityIcon(event.severity)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${getSeverityColor(event.severity)}`}>
                  {event.type.replace('_', ' ').toUpperCase()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimestamp(event.timestamp)}
                </p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {event.message}
              </p>
              {event.deviceId && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Device: {event.deviceId}
                </p>
              )}
              <div className="flex items-center space-x-4 mt-2">
                {event.acknowledged ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    ✓ Acknowledged
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    ⏳ Pending
                  </span>
                )}
                {event.resolved && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    ✓ Resolved
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-8">
          <span className="text-4xl text-gray-300 dark:text-gray-600">📭</span>
          <p className="text-gray-500 dark:text-gray-400 mt-2">No recent events</p>
        </div>
      )}
    </div>
  );
};

export default RecentEvents;
