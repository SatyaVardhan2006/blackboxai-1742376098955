import React from 'react';

function SensorData({ icon, title, value, unit, status, trend }) {
  const getStatusColor = () => {
    switch (status) {
      case 'warning':
        return 'text-amber-500';
      case 'error':
        return 'text-red-500';
      case 'good':
      default:
        return 'text-emerald-500';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'fa-arrow-up';
      case 'down':
        return 'fa-arrow-down';
      default:
        return 'fa-minus';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-emerald-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="sensor-card group">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`${getStatusColor()} bg-opacity-10 p-3 rounded-lg`}>
            <i className={`fas ${icon} text-xl`}></i>
          </div>
          <h3 className="text-gray-700 font-medium">{title}</h3>
        </div>
        <div className={`flex items-center ${getTrendColor()}`}>
          <i className={`fas ${getTrendIcon()} text-sm mr-1`}></i>
        </div>
      </div>

      {/* Sensor Value */}
      <div className="flex items-end space-x-2 mb-4">
        <span className="text-3xl font-semibold text-gray-800">{value}</span>
        <span className="text-gray-500 mb-1">{unit}</span>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center space-x-2">
        <span className={`h-2 w-2 rounded-full ${getStatusColor()}`}></span>
        <span className="text-sm text-gray-600">
          {status === 'good' ? 'Optimal' : status === 'warning' ? 'Warning' : 'Critical'}
        </span>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-5 rounded-xl transition-all duration-300"></div>
    </div>
  );
}

export default SensorData;
