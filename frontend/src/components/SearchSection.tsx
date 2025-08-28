import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Send, Package } from 'lucide-react';

interface SearchSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ activeTab, setActiveTab }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Que souhaitez-vous faire ?
          </h2>
          <p className="text-lg text-gray-600">
            Choisissez votre option et trouvez la solution parfaite
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('send')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'send'
                  ? 'bg-red-50 text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Envoyer un colis</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('transport')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'transport'
                  ? 'bg-red-50 text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Transporter des colis</span>
              </div>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {activeTab === 'send' ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="departure" className="block text-sm font-semibold text-gray-700 mb-2">
                      Ville de départ
                    </label>
                    <select id="departure" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
                      <option>Casablanca</option>
                      <option>Rabat</option>
                      <option>Marrakech</option>
                      <option>Fès</option>
                      <option>Tanger</option>
                      <option>Agadir</option>
                      <option>Meknès</option>
                      <option>Oujda</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="arrival" className="block text-sm font-semibold text-gray-700 mb-2">
                      Ville d'arrivée
                    </label>
                    <select id="arrival" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
                      <option>Marrakech</option>
                      <option>Casablanca</option>
                      <option>Rabat</option>
                      <option>Fès</option>
                      <option>Tanger</option>
                      <option>Agadir</option>
                      <option>Meknès</option>
                      <option>Oujda</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                      Date souhaitée
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="packageType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Type de colis
                    </label>
                    <select id="packageType" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
                      <option>Petit colis (moins de 5kg)</option>
                      <option>Colis moyen (5-15kg)</option>
                      <option>Grand colis (15-30kg)</option>
                      <option>Colis volumineux</option>
                    </select>
                  </div>
                </div>

                <Link to="/rechercher" className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Rechercher un transporteur</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="transportDeparture" className="block text-sm font-semibold text-gray-700 mb-2">
                      Votre trajet - Départ
                    </label>
                    <select id="transportDeparture" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
                      <option>Casablanca</option>
                      <option>Rabat</option>
                      <option>Marrakech</option>
                      <option>Fès</option>
                      <option>Tanger</option>
                      <option>Agadir</option>
                      <option>Meknès</option>
                      <option>Oujda</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="transportArrival" className="block text-sm font-semibold text-gray-700 mb-2">
                      Votre trajet - Arrivée
                    </label>
                    <select id="transportArrival" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
                      <option>Marrakech</option>
                      <option>Casablanca</option>
                      <option>Rabat</option>
                      <option>Fès</option>
                      <option>Tanger</option>
                      <option>Agadir</option>
                      <option>Meknès</option>
                      <option>Oujda</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="transportDate" className="block text-sm font-semibold text-gray-700 mb-2">
                      Date de votre voyage
                    </label>
                    <input
                      id="transportDate"
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="availableSpace" className="block text-sm font-semibold text-gray-700 mb-2">
                      Espace disponible
                    </label>
                    <select id="availableSpace" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors">
                      <option>Petits colis uniquement</option>
                      <option>Colis moyens acceptés</option>
                      <option>Tous types de colis</option>
                      <option>Espace important disponible</option>
                    </select>
                  </div>
                </div>

                <Link to="/rechercher" className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Voir les colis à transporter</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;