import React, { useState } from 'react';

function WaterControl({ isWatering, onToggle, moisture }) {
  const [duration, setDuration] = useState(5); // Duration in minutes
  const [showConfirm, setShowConfirm] = useState(false);

  const handleWateringStart = () => {
    if (moisture >= 90) {
      setShowConfirm(true);
      return;
    }
    onToggle();
  };

  const getMoistureStatus = () => {
    if (moisture < 40) return { text: 'Low', color: 'text-red-500' };
    if (moisture < 70) return { text: 'Moderate', color: 'text-amber-500' };
    return { text: 'Optimal', color: 'text-emerald-500' };
  };

  const moistureStatus = getMoistureStatus();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Water Control</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status and Controls */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="space-y-2">
            <p className="text-gray-600">Current Status:</p>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-medium ${isWatering ? 'text-emerald-500' : 'text-gray-700'}`}>
                {isWatering ? 'Watering in Progress' : 'System Idle'}
              </span>
              <i className={`fas ${isWatering ? 'fa-spinner fa-spin text-emerald-500' : 'fa-pause text-gray-400'}`}></i>
            </div>
          </div>

          {/* Moisture Level Indicator */}
          <div className="space-y-2">
            <p className="text-gray-600">Soil Moisture Level:</p>
            <div className="flex items-center space-x-3">
              <span className={`text-lg font-medium ${moistureStatus.color}`}>
                {moistureStatus.text}
              </span>
              <span className="text-gray-600">({moisture}%)</span>
            </div>
            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${moisture}%` }}
              ></div>
            </div>
          </div>

          {/* Duration Control */}
          <div className="space-y-2">
            <p className="text-gray-600">Watering Duration:</p>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setDuration(Math.max(1, duration - 1))}
                className="btn-secondary px-3 py-1"
                disabled={isWatering}
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="text-lg font-medium text-gray-700 w-20 text-center">
                {duration} min
              </span>
              <button 
                onClick={() => setDuration(Math.min(30, duration + 1))}
                className="btn-secondary px-3 py-1"
                disabled={isWatering}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons and Recommendations */}
        <div className="space-y-6">
          {/* Main Control Button */}
          <button
            onClick={handleWateringStart}
            disabled={isWatering}
            className={`w-full py-4 rounded-xl text-white font-medium transition-all duration-300 ${
              isWatering 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <i className={`fas ${isWatering ? 'fa-spinner fa-spin' : 'fa-play'}`}></i>
              <span>{isWatering ? 'Watering...' : 'Start Watering'}</span>
            </div>
          </button>

          {/* Recommendations */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <i className="fas fa-info-circle text-blue-500"></i>
                <span>Optimal watering time: Early morning</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-cloud text-gray-500"></i>
                <span>Consider weather forecast before watering</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-tint text-emerald-500"></i>
                <span>Current moisture level is {moistureStatus.text.toLowerCase()}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Moisture Level High
            </h3>
            <p className="text-gray-600 mb-6">
              The soil moisture level is already optimal. Are you sure you want to start watering?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  onToggle();
                }}
                className="btn-primary flex-1"
              >
                Continue
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WaterControl;
