import React from 'react';
import { Search, Users, CheckCircle, Shield } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Recherchez",
      description: "Trouvez un transporteur sur votre trajet ou publiez votre annonce de transport",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "2. Connectez",
      description: "Échangez directement avec les autres membres via notre messagerie sécurisée",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: CheckCircle,
      title: "3. Confirmez",
      description: "Validez les détails du transport et confirmez votre réservation",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "4. Transportez",
      description: "Effectuez le transport en toute sécurité avec notre garantie et suivi",
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un processus simple en 4 étapes pour connecter expéditeurs et transporteurs partout au Maroc
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors transform hover:scale-105">
            Commencer maintenant
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;