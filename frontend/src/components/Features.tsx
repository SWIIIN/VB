import React from 'react';
import { Shield, DollarSign, Clock, Star, MapPin, MessageSquare } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Transport sécurisé",
      description: "Vérification d'identité, assurance incluse et système de notation pour votre tranquillité d'esprit",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: DollarSign,
      title: "Prix attractifs",
      description: "Jusqu'à 60% moins cher que les services de livraison traditionnels grâce à notre modèle collaboratif",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Livraison rapide",
      description: "Transport le jour même possible grâce à notre réseau de voyageurs actifs dans tout le Maroc",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Star,
      title: "Communauté de confiance",
      description: "Plus de 50,000 membres vérifiés avec un système de notation et d'avis détaillé",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: MapPin,
      title: "Couverture nationale",
      description: "Disponible dans toutes les villes du Maroc avec des trajets quotidiens entre les principales destinations",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: MessageSquare,
      title: "Communication directe",
      description: "Messagerie intégrée pour échanger facilement avec votre transporteur ou expéditeur",
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir VoyagaBagae ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La première plateforme de transport collaboratif de colis au Maroc, conçue pour votre sécurité et votre satisfaction
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-2xl p-8 hover:border-red-200">
                <div className={`bg-gradient-to-r ${feature.gradient} p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Prêt à économiser sur vos envois ?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Rejoignez des milliers de Marocains qui font confiance à VoyagaBagae pour leurs transports de colis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Créer un compte gratuit
                </button>
                <button className="border border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors">
                  En savoir plus
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-red-600 mb-1">50K+</div>
                <div className="text-sm text-gray-600">Utilisateurs actifs</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">100K+</div>
                <div className="text-sm text-gray-600">Colis transportés</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">4.9★</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-1">24h</div>
                <div className="text-sm text-gray-600">Support client</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;