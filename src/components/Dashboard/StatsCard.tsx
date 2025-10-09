import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color, 
  subtitle 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    red: 'bg-red-500 text-white',
    purple: 'bg-purple-500 text-white',
    indigo: 'bg-indigo-500 text-white'
  };

  const changeColorClasses = {
    increase: 'text-green-600 dark:text-green-400',
    decrease: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${changeColorClasses[change.type]}`}>
                {change.type === 'increase' && '↗'}
                {change.type === 'decrease' && '↘'}
                {change.type === 'neutral' && '→'}
                {Math.abs(change.value)}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                vs last week
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

