import React, { useState, useEffect } from 'react';
import SensorData from './SensorData';
import WaterControl from './WaterControl';

function Dashboard() {
  const [sensorData, setSensorData] = useState({
    moisture: 65,
    humidity: 72,
    temperature: 24
  });
  const [isWatering, setIsWatering] = useState(false);
  const [lastWatered, setLastWatered] = useState('2 hours ago');

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        moisture: Math.max(0, Math.min(100, prev.moisture + (Math.random() * 2 - 1))),
        humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() * 2 - 1))),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() * 0.5 - 0.25)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleWateringToggle = () => {
    setIsWatering(!isWatering);
    if (!isWatering) {
      // Start watering
      setTimeout(() => {
        setIsWatering(false);
        setLastWatered('Just now');
        setSensorData(prev => ({
          ...prev,
          moisture: Math.min(100, prev.moisture + 15)
        }));
      }, 5000); // Simulate 5 seconds of watering
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">System Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and control your smart watering system</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800">
            <i className="fas fa-clock mr-2"></i>
            Last watered: {lastWatered}
          </span>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Moisture Card */}
        <SensorData
          icon="fa-tint"
          title="Soil Moisture"
          value={sensorData.moisture.toFixed(1)}
          unit="%"
          status={sensorData.moisture < 40 ? 'warning' : 'good'}
          trend={sensorData.moisture > 60 ? 'up' : 'down'}
        />

        {/* Humidity Card */}
        <SensorData
          icon="fa-water"
          title="Humidity"
          value={sensorData.humidity.toFixed(1)}
          unit="%"
          status={sensorData.humidity < 50 ? 'warning' : 'good'}
          trend={sensorData.humidity > 70 ? 'up' : 'down'}
        />

        {/* Temperature Card */}
        <SensorData
          icon="fa-thermometer-half"
          title="Temperature"
          value={sensorData.temperature.toFixed(1)}
          unit="°C"
          status={sensorData.temperature > 30 ? 'warning' : 'good'}
          trend={sensorData.temperature > 25 ? 'up' : 'down'}
        />
      </div>

      {/* Water Control Section */}
      <div className="mt-8">
        <WaterControl
          isWatering={isWatering}
          onToggle={handleWateringToggle}
          moisture={sensorData.moisture}
        />
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 text-gray-600">
            <i className="fas fa-wifi text-emerald-500"></i>
            <span>Connected</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <i className="fas fa-battery-full text-emerald-500"></i>
            <span>Battery: 92%</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <i className="fas fa-signal text-emerald-500"></i>
            <span>Signal Strength: Good</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <button className="btn-secondary flex items-center justify-center space-x-2">
          <i className="fas fa-history"></i>
          <span>View History</span>
        </button>
        <button className="btn-secondary flex items-center justify-center space-x-2">
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </button>
        <button className="btn-secondary flex items-center justify-center space-x-2">
          <i className="fas fa-calendar"></i>
          <span>Schedule</span>
        </button>
        <button className="btn-secondary flex items-center justify-center space-x-2">
          <i className="fas fa-chart-line"></i>
          <span>Analytics</span>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
