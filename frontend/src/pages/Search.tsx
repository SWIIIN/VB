import React, { useState } from 'react';
import { Search as SearchIcon, Filter, MapPin, Calendar, Package, Star, MessageSquare } from 'lucide-react';
import { MOROCCAN_CITIES } from '../constants';

const Search = () => {
  const [searchType, setSearchType] = useState('send');
  const [filters, setFilters] = useState({
    departure: '',
    arrival: '',
    date: '',
    priceRange: [0, 500],
    packageType: ''
  });

  // Mock search results
  const searchResults = [
    {
      id: 1,
      type: 'carrier',
      user: {
        name: 'Ahmed Benali',
        rating: 4.8,
        reviews: 24,
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      route: {
        departure: 'Casablanca',
        arrival: 'Marrakech',
        date: '2024-01-15',
        time: '14:00'
      },
      price: 150,
      availableSpace: 'Colis moyens acceptés',
      description: 'Voyage régulier, transporteur expérimenté. Véhicule spacieux et sécurisé.'
    },
    {
      id: 2,
      type: 'shipper',
      user: {
        name: 'Fatima Zahra',
        rating: 4.9,
        reviews: 18,
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      route: {
        departure: 'Casablanca',
        arrival: 'Marrakech',
        date: '2024-01-16',
        time: 'Flexible'
      },
      price: 120,
      packageInfo: 'Petit colis (2kg)',
      description: 'Colis fragile, manipulation avec précaution requise.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Rechercher un transport</h1>
          
          {/* Search Type Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setSearchType('send')}
              className={`px-6 py-3 font-semibold transition-colors ${
                searchType === 'send'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <SearchIcon className="h-5 w-5" />
                <span>Envoyer un colis</span>
              </div>
            </button>
            <button
              onClick={() => setSearchType('transport')}
              className={`px-6 py-3 font-semibold transition-colors ${
                searchType === 'transport'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <SearchIcon className="h-5 w-5" />
                <span>Transporter des colis</span>
              </div>
            </button>
          </div>

          {/* Search Form */}
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="departure" className="block text-sm font-semibold text-gray-700 mb-2">
                Ville de départ
              </label>
              <select 
                id="departure"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={filters.departure}
                onChange={(e) => setFilters({...filters, departure: e.target.value})}
              >
                <option value="">Sélectionner</option>
                {MOROCCAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="arrival" className="block text-sm font-semibold text-gray-700 mb-2">
                Ville d'arrivée
              </label>
              <select 
                id="arrival"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={filters.arrival}
                onChange={(e) => setFilters({...filters, arrival: e.target.value})}
              >
                <option value="">Sélectionner</option>
                {MOROCCAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <input
                id="date"
                type="date"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              />
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center">
                <SearchIcon className="h-5 w-5 mr-2" />
                Rechercher
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          {searchResults.map((result) => (
            <div key={result.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <img
                    src={result.user.avatar}
                    alt={result.user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{result.user.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < Math.floor(result.user.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {result.user.rating} ({result.user.reviews} avis)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">{result.price} MAD</div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result.type === 'carrier' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {result.type === 'carrier' ? 'Transporteur' : 'Expéditeur'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="font-medium">{result.route.departure}</span>
                        <span className="mx-2">→</span>
                        <span className="font-medium">{result.route.arrival}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{result.route.date} à {result.route.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center text-gray-600">
                        <Package className="h-4 w-4 mr-1" />
                        <span>{result.availableSpace || result.packageInfo}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{result.description}</p>

                    <div className="flex items-center space-x-3">
                      <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contacter
                      </button>
                      <button className="border border-red-600 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors">
                        Voir le profil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;