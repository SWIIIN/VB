import React, { useState } from 'react';
import { Package, Car, MessageSquare, Star, Plus, Eye, Edit, Trash2, Calendar, MapPin, User } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('announcements');

  // Mock data - à remplacer par des données réelles
  const userStats = {
    totalTransports: 24,
    rating: 4.8,
    earnings: 2450,
    activeAnnouncements: 3
  };

  const announcements = [
    {
      id: 1,
      type: 'shipper',
      departure: 'Casablanca',
      arrival: 'Marrakech',
      date: '2024-01-15',
      price: 150,
      status: 'open',
      responses: 3
    },
    {
      id: 2,
      type: 'carrier',
      departure: 'Rabat',
      arrival: 'Fès',
      date: '2024-01-18',
      price: 80,
      status: 'in_progress',
      responses: 1
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Ahmed Benali',
      preview: 'Bonjour, je suis intéressé par votre annonce...',
      time: '14:30',
      unread: true
    },
    {
      id: 2,
      sender: 'Fatima Zahra',
      preview: 'Le colis est-il toujours disponible ?',
      time: '12:15',
      unread: false
    }
  ];

  const transports = [
    {
      id: 1,
      route: 'Casablanca → Marrakech',
      date: '2024-01-10',
      type: 'Expéditeur',
      status: 'completed',
      amount: 150,
      rating: 5
    },
    {
      id: 2,
      route: 'Rabat → Casablanca',
      date: '2024-01-08',
      type: 'Transporteur',
      status: 'completed',
      amount: 120,
      rating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Ouvert';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
          <p className="text-gray-600">Gérez vos annonces et suivez votre activité</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userStats.totalTransports}</div>
                <div className="text-sm text-gray-500">Transports total</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userStats.rating}</div>
                <div className="text-sm text-gray-500">Note moyenne</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Car className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userStats.earnings} MAD</div>
                <div className="text-sm text-gray-500">Gains total</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userStats.activeAnnouncements}</div>
                <div className="text-sm text-gray-500">Annonces actives</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'announcements', label: 'Mes annonces', icon: Package },
                { id: 'messages', label: 'Messages', icon: MessageSquare },
                { id: 'history', label: 'Historique', icon: Calendar }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Mes annonces</h2>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle annonce
                  </button>
                </div>

                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${announcement.type === 'shipper' ? 'bg-blue-100' : 'bg-green-100'}`}>
                            {announcement.type === 'shipper' ? (
                              <Package className={`h-5 w-5 ${announcement.type === 'shipper' ? 'text-blue-600' : 'text-green-600'}`} />
                            ) : (
                              <Car className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">
                                {announcement.departure} → {announcement.arrival}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                                {getStatusText(announcement.status)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center space-x-4">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {announcement.date}
                              </span>
                              <span>{announcement.price} MAD</span>
                              <span>{announcement.responses} réponse(s)</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Messages</h2>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`border rounded-lg p-4 hover:shadow-sm transition-shadow ${message.unread ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{message.sender}</div>
                            <div className="text-sm text-gray-600">{message.preview}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{message.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Historique des transports</h2>
                <div className="space-y-4">
                  {transports.map((transport) => (
                    <div key={transport.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{transport.route}</span>
                          </div>
                          <span className="text-sm text-gray-500">{transport.date}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${transport.type === 'Expéditeur' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {transport.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-gray-900">{transport.amount} MAD</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < transport.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;