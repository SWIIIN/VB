import React, { useState } from 'react';
import { Plus, Package, MapPin, Calendar } from 'lucide-react';
import AnnouncementForm, { AnnouncementData } from '../components/AnnouncementForm';
// ...existing code...

interface Announcement {
  id: string;
  title: string;
  description: string;
  departure: string;
  arrival: string;
  date: string;
  packageType: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  price: number;
  isUrgent: boolean;
  contactPhone: string;
  status: 'active' | 'inactive' | 'completed';
  createdAt: string;
}

const PostAnnouncement = () => {
  // ...existing code...
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Chargement des annonces réelles depuis l'API
  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/announcements`);
        if (!response.ok) throw new Error('Erreur lors du chargement des annonces');
        const data = await response.json();
        setAnnouncements(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setAnnouncements([]);
      }
    };
    fetchAnnouncements();
  }, []);

  import { AnnouncementData } from '../components/AnnouncementForm';
  const handleCreateAnnouncement = async (announcementData: AnnouncementData) => {
    const newAnnouncement: Announcement = {
      ...announcementData,
      id: Date.now().toString(),
      status: 'active' as const,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleStatusChange = (announcementId: string, newStatus: Announcement['status']) => {
    setAnnouncements(prev => 
      prev.map(announcement => 
        announcement.id === announcementId 
          ? { ...announcement, status: newStatus }
          : announcement
      )
    );
  };

  const handleDeleteAnnouncement = (announcementId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== announcementId));
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus;
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.arrival.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'completed': return 'Terminée';
      default: return 'Inconnu';
    }
  };

  const getPackageTypeLabel = (type: string) => {
    const packageType = PACKAGE_TYPES.find(pt => pt.value === type);
    return packageType ? packageType.label : type;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gérer mes annonces</h1>
              <p className="text-gray-600">
                Créez et gérez vos annonces de transport de colis
              </p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 md:mt-0 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Nouvelle annonce</span>
            </button>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rechercher
              </label>
              <input
                type="text"
                placeholder="Titre, ville de départ ou d'arrivée..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Terminée</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                {filteredAnnouncements.length} annonce(s) trouvée(s)
              </div>
            </div>
          </div>
        </div>

        {/* Liste des annonces */}
        <div className="space-y-6">
          {filteredAnnouncements.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune annonce trouvée</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Aucune annonce ne correspond à vos critères de recherche.'
                  : 'Vous n\'avez pas encore créé d\'annonce.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Créer votre première annonce
                </button>
              )}
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    {/* En-tête de l'annonce */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
                          {announcement.isUrgent && (
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                              URGENT
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                            {getStatusLabel(announcement.status)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{announcement.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-red-600">{announcement.price} MAD</div>
                        <div className="text-sm text-gray-500">Prix proposé</div>
                      </div>
                    </div>

                    {/* Détails du transport */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{announcement.departure}</span>
                        <span>→</span>
                        <span className="font-medium">{announcement.arrival}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(announcement.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Package className="h-4 w-4" />
                        <span>{getPackageTypeLabel(announcement.packageType)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className="font-medium">{announcement.weight}kg</span>
                        <span>•</span>
                        <span>{announcement.dimensions.length}×{announcement.dimensions.width}×{announcement.dimensions.height}cm</span>
                      </div>
                    </div>

                    {/* Informations de contact */}
                    <div className="text-sm text-gray-500">
                      Contact: {announcement.contactPhone} • Créée le {new Date(announcement.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 mt-4 lg:mt-0 lg:ml-6">
                    <select
                      value={announcement.status}
                      onChange={(e) => handleStatusChange(announcement.id, e.target.value as Announcement['status'])}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="completed">Terminée</option>
                    </select>
                    
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de création d'annonce */}
      <AnnouncementForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateAnnouncement}
      />
    </div>
  );
};

export default PostAnnouncement;