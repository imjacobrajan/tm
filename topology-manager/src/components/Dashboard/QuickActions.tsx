import React from 'react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  href: string;
}

const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      id: 'discover',
      title: 'Discover Network',
      description: 'Start a new network discovery scan',
      icon: '🔍',
      color: 'blue',
      href: '/discover/scan'
    },
    {
      id: 'topology',
      title: 'View Topology',
      description: 'Open network topology map',
      icon: '🗺️',
      color: 'green',
      href: '/network/topology'
    },
    {
      id: 'path-analysis',
      title: 'Path Analysis',
      description: 'Analyze network paths and reachability',
      icon: '🛣️',
      color: 'purple',
      href: '/analyze/paths'
    },
    {
      id: 'reports',
      title: 'Generate Report',
      description: 'Create network inventory report',
      icon: '📊',
      color: 'orange',
      href: '/analyze/reports'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:border-blue-700 dark:text-blue-200',
    green: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-700 dark:bg-green-900 dark:hover:bg-green-800 dark:border-green-700 dark:text-green-200',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-900 dark:hover:bg-purple-800 dark:border-purple-700 dark:text-purple-200',
    orange: 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700 dark:bg-orange-900 dark:hover:bg-orange-800 dark:border-orange-700 dark:text-orange-200'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className={`block p-4 rounded-lg border-2 transition-colors ${colorClasses[action.color]}`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl flex-shrink-0">
                {action.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">
                  {action.title}
                </h4>
                <p className="text-xs opacity-75 mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

