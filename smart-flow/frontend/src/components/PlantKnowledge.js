import React, { useState } from 'react';

// Mock plant data - in a real app, this would come from an API
const plantDatabase = [
  {
    id: 1,
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    wateringNeeds: 'Low',
    sunlight: 'Indirect to low light',
    humidity: '30-50%',
    temperature: '18-27°C',
    description: 'Snake plants are excellent air-purifying plants that are very easy to care for. They can survive in various light conditions and are drought-tolerant.',
    care: [
      'Water every 2-6 weeks, allowing soil to dry between waterings',
      'Tolerates low light but grows faster in bright indirect light',
      'Can handle normal room humidity',
      'Propagate through division or leaf cuttings'
    ]
  },
  {
    id: 2,
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    image: 'https://images.pexels.com/photos/4425201/pexels-photo-4425201.jpeg',
    wateringNeeds: 'Medium',
    sunlight: 'Low to bright indirect',
    humidity: '50-70%',
    temperature: '18-30°C',
    description: 'Peace lilies are popular indoor plants known for their beautiful white flowers and air-purifying qualities.',
    care: [
      'Water when top inch of soil feels dry',
      'Prefers indirect sunlight',
      'Mist regularly to maintain humidity',
      'Feed with balanced fertilizer every 6-8 weeks during growing season'
    ]
  },
  {
    id: 3,
    name: 'Monstera',
    scientificName: 'Monstera deliciosa',
    image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
    wateringNeeds: 'Medium',
    sunlight: 'Bright indirect',
    humidity: '60-80%',
    temperature: '20-30°C',
    description: 'Monstera is famous for its distinctive split leaves and is a popular choice for adding a tropical touch to indoor spaces.',
    care: [
      'Water when top 2-3 inches of soil are dry',
      'Provide bright, indirect light',
      'Regular misting or humidifier recommended',
      'Support with moss pole for climbing'
    ]
  }
];

function PlantKnowledge() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredPlants = plantDatabase.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchesSearch;
    return matchesSearch && plant.wateringNeeds.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Plant Knowledge Base</h1>
        <p className="text-gray-600 mt-1">Learn about different plants and their care requirements</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'low'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Low Water
          </button>
          <button
            onClick={() => setFilter('medium')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'medium'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Medium Water
          </button>
        </div>
      </div>

      {/* Plant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map(plant => (
          <div
            key={plant.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setSelectedPlant(plant)}
          >
            <div className="relative pb-[60%]">
              <img
                src={plant.image}
                alt={plant.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{plant.name}</h3>
              <p className="text-sm text-gray-500 italic mb-3">{plant.scientificName}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <i className="fas fa-tint"></i>
                  <span>{plant.wateringNeeds}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <i className="fas fa-sun"></i>
                  <span>{plant.sunlight}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plant Detail Modal */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative pb-[50%]">
              <img
                src={selectedPlant.image}
                alt={selectedPlant.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                  {selectedPlant.name}
                </h2>
                <p className="text-gray-500 italic">{selectedPlant.scientificName}</p>
              </div>

              <p className="text-gray-600">{selectedPlant.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-emerald-500 mb-1">
                    <i className="fas fa-tint"></i>
                  </div>
                  <div className="text-sm text-gray-600">Water Needs</div>
                  <div className="font-medium text-gray-800">{selectedPlant.wateringNeeds}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-emerald-500 mb-1">
                    <i className="fas fa-sun"></i>
                  </div>
                  <div className="text-sm text-gray-600">Sunlight</div>
                  <div className="font-medium text-gray-800">{selectedPlant.sunlight}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-emerald-500 mb-1">
                    <i className="fas fa-temperature-high"></i>
                  </div>
                  <div className="text-sm text-gray-600">Temperature</div>
                  <div className="font-medium text-gray-800">{selectedPlant.temperature}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-emerald-500 mb-1">
                    <i className="fas fa-cloud"></i>
                  </div>
                  <div className="text-sm text-gray-600">Humidity</div>
                  <div className="font-medium text-gray-800">{selectedPlant.humidity}</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Care Instructions</h3>
                <ul className="space-y-2">
                  {selectedPlant.care.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-600">
                      <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            <i className="fas fa-seedling"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Plants Found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}

export default PlantKnowledge;
