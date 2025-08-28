import React, { useState, useEffect } from 'react';
import AnnouncementForm from '../components/AnnouncementForm';
import { AnnouncementData } from '../components/AnnouncementForm';
import { Search, Filter, MapPin, Package, Calendar, User, Star } from 'lucide-react';
import { MOROCCAN_CITIES, PACKAGE_TYPES, PRICE_RANGES } from '../constants';

interface Announcement {
  id: string;
  title: string;
  description: string;
  origin: string;
  destination: string;
  packageType: string;
  weight: number;
  price: number;
  date: string;
  shipper: {
    name: string;
    rating: number;
    reviews: number;
  };
  status: 'active' | 'completed' | 'expired';
}

const Annonces = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedPackageType, setSelectedPackageType] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Ajout d'une annonce
  const handleCreateAnnouncement = async (announcementData: AnnouncementData) => {
    // Transformation AnnouncementData -> Announcement
    const newAnnouncement: Announcement = {
      id: Math.random().toString(36).substr(2, 9),
      title: announcementData.title,
      description: announcementData.description,
      origin: announcementData.departure,
      destination: announcementData.arrival,
      packageType: announcementData.packageType,
      weight: announcementData.weight,
      price: announcementData.price,
      date: announcementData.date,
      shipper: {
        name: 'Utilisateur',
        rating: 5,
        reviews: 1
      },
      status: 'active'
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    setFilteredAnnouncements(prev => [newAnnouncement, ...prev]);
    setIsFormOpen(false);
  };

  // Chargement des annonces depuis l'API (aucune donnée fictive)
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/announcements`);
        if (!response.ok) throw new Error('Erreur lors du chargement des annonces');
        const data = await response.json();
        setAnnouncements(Array.isArray(data) ? data : []);
        setFilteredAnnouncements(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setAnnouncements([]);
        setFilteredAnnouncements([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Filtrage des annonces
  useEffect(() => {
    let filtered = announcements;

    if (searchTerm) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedOrigin) {
      filtered = filtered.filter(announcement => announcement.origin === selectedOrigin);
    }

    if (selectedDestination) {
      filtered = filtered.filter(announcement => announcement.destination === selectedDestination);
    }

    if (selectedPackageType) {
      filtered = filtered.filter(announcement => announcement.packageType === selectedPackageType);
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(announcement => 
        announcement.price >= (min ?? 0) && (max ? announcement.price <= max : true)
      );
    }

    setFilteredAnnouncements(filtered);
  }, [searchTerm, selectedOrigin, selectedDestination, selectedPackageType, selectedPriceRange, announcements]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedOrigin('');
    setSelectedDestination('');
    setSelectedPackageType('');
    setSelectedPriceRange('');
  };

  const getPackageTypeLabel = (type: string) => {
    return PACKAGE_TYPES.find(pt => pt.value === type)?.label || type;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des annonces...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header + bouton ajouter */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Annonces de transport</h1>
            <p className="text-gray-600">Découvrez toutes les annonces de transport de colis disponibles</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="mt-4 md:mt-0 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Ajouter une annonce
          </button>
        </div>
      </div>
      {/* Modal/formulaire d'ajout d'annonce */}
      <AnnouncementForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateAnnouncement}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Recherche */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une annonce..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Origine */}
            <div>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Origine</option>
                {MOROCCAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Destination</option>
                {MOROCCAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Type de colis */}
            <div>
              <select
                value={selectedPackageType}
                onChange={(e) => setSelectedPackageType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Type de colis</option>
                {PACKAGE_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Plage de prix et bouton de réinitialisation */}
          <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Prix :</span>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Tous les prix</option>
                {PRICE_RANGES.map(range => (
                  <option key={`${range.min}-${range.max}`} value={`${range.min}-${range.max}`}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
            >
              <Filter className="h-4 w-4" />
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredAnnouncements.length} annonce{filteredAnnouncements.length !== 1 ? 's' : ''} trouvée{filteredAnnouncements.length !== 1 ? 's' : ''}
            </h2>
          </div>
        </div>

        {/* Liste des annonces */}
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune annonce trouvée</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {announcement.title}
                  </h3>
                  <span className="text-2xl font-bold text-red-600">
                    {announcement.price} MAD
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {announcement.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">De</p>
                      <p className="text-sm font-medium text-gray-900">{announcement.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Vers</p>
                      <p className="text-sm font-medium text-gray-900">{announcement.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {getPackageTypeLabel(announcement.packageType)} • {announcement.weight}kg
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(announcement.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{announcement.shipper && announcement.shipper.name ? announcement.shipper.name : '—'}</span>
                    {announcement.shipper && typeof announcement.shipper.rating === 'number' && typeof announcement.shipper.reviews === 'number' && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{announcement.shipper.rating}</span>
                        <span className="text-xs text-gray-500">({announcement.shipper.reviews})</span>
                      </div>
                    )}
                  </div>
                  
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Annonces;

