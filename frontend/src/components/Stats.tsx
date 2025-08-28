import React from 'react';
import { TrendingUp, Users, Package, MapPin } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Utilisateurs actifs",
      description: "Membres vérifiés dans tout le Maroc"
    },
    {
      icon: Package,
      number: "100,000+",
      label: "Colis transportés",
      description: "Livraisons réussies depuis le lancement"
    },
    {
      icon: MapPin,
      number: "25+",
      label: "Villes couvertes",
      description: "Présent dans toutes les régions du Maroc"
    },
    {
      icon: TrendingUp,
      number: "99.2%",
      label: "Taux de satisfaction",
      description: "Clients satisfaits de leur expérience"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            VoyagaBagae en chiffres
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Une croissance constante grâce à la confiance de notre communauté
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-2">
                  {stat.label}
                </div>
                <div className="text-red-100 text-sm">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-red-100 mb-6">
            Rejoignez la révolution du transport collaboratif au Maroc
          </p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transition-colors transform hover:scale-105">
            Commencer maintenant
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;