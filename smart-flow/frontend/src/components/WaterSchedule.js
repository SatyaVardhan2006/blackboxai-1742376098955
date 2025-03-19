import React, { useState } from 'react';

function WaterSchedule() {
  const [schedules, setSchedules] = useState([
    { id: 1, time: '06:00', days: ['Mon', 'Wed', 'Fri'], duration: 10, active: true },
    { id: 2, time: '18:30', days: ['Tue', 'Thu'], duration: 15, active: false }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    time: '08:00',
    days: [],
    duration: 5,
    active: true
  });

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleDayToggle = (day) => {
    setNewSchedule(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleAddSchedule = () => {
    if (newSchedule.days.length === 0) return;

    setSchedules(prev => [
      ...prev,
      {
        ...newSchedule,
        id: Math.max(...prev.map(s => s.id), 0) + 1
      }
    ]);
    setShowAddModal(false);
    setNewSchedule({
      time: '08:00',
      days: [],
      duration: 5,
      active: true
    });
  };

  const handleToggleSchedule = (id) => {
    setSchedules(prev =>
      prev.map(schedule =>
        schedule.id === id
          ? { ...schedule, active: !schedule.active }
          : schedule
      )
    );
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Watering Schedule</h1>
          <p className="text-gray-600 mt-1">Manage your automated watering schedules</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 btn-primary flex items-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>Add Schedule</span>
        </button>
      </div>

      {/* Schedule List */}
      <div className="grid gap-6">
        {schedules.map(schedule => (
          <div
            key={schedule.id}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Time and Days */}
              <div className="flex items-center space-x-6">
                <div className="text-2xl font-semibold text-gray-800">
                  {schedule.time}
                </div>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map(day => (
                    <span
                      key={day}
                      className={`px-2 py-1 rounded-full text-sm ${
                        schedule.days.includes(day)
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Duration and Controls */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <i className="fas fa-clock"></i>
                  <span>{schedule.duration} min</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleToggleSchedule(schedule.id)}
                    className={`text-2xl transition-colors duration-200 ${
                      schedule.active ? 'text-emerald-500' : 'text-gray-400'
                    }`}
                  >
                    <i className="fas fa-toggle-on"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {schedules.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Schedules Yet</h3>
            <p className="text-gray-500">
              Click the "Add Schedule" button to create your first watering schedule
            </p>
          </div>
        )}
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Add New Schedule
            </h2>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Watering Time
              </label>
              <input
                type="time"
                value={newSchedule.time}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, time: e.target.value }))}
                className="input-field"
              />
            </div>

            {/* Days Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repeat On
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map(day => (
                  <button
                    key={day}
                    onClick={() => handleDayToggle(day)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                      newSchedule.days.includes(day)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setNewSchedule(prev => ({
                    ...prev,
                    duration: Math.max(1, prev.duration - 1)
                  }))}
                  className="btn-secondary px-3 py-1"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="text-lg font-medium text-gray-700 w-20 text-center">
                  {newSchedule.duration} min
                </span>
                <button
                  onClick={() => setNewSchedule(prev => ({
                    ...prev,
                    duration: Math.min(30, prev.duration + 1)
                  }))}
                  className="btn-secondary px-3 py-1"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>

            {/* Active Toggle */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    newSchedule.active ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setNewSchedule(prev => ({ ...prev, active: !prev.active }))}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      newSchedule.active ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Schedule Active
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddSchedule}
                disabled={newSchedule.days.length === 0}
                className={`flex-1 btn-primary ${
                  newSchedule.days.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Add Schedule
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 btn-secondary"
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

export default WaterSchedule;
