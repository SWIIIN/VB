import React from 'react';
import { Search, Users, CheckCircle, Shield, Package, MapPin, Star } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Recherchez ou Publiez",
      description: "Trouvez un transporteur sur votre trajet ou publiez votre annonce de transport",
      details: [
        "Sélectionnez vos villes de départ et d'arrivée",
        "Choisissez votre date de voyage",
        "Précisez le type et la taille de votre colis",
        "Consultez les offres disponibles ou créez votre annonce"
      ]
    },
    {
      icon: Users,
      title: "2. Connectez-vous",
      description: "Échangez directement avec les autres membres via notre messagerie sécurisée",
      details: [
        "Consultez les profils et évaluations des membres",
        "Échangez via notre messagerie intégrée",
        "Négociez les détails du transport",
        "Vérifiez les disponibilités et contraintes"
      ]
    },
    {
      icon: CheckCircle,
      title: "3. Confirmez",
      description: "Validez les détails du transport et confirmez votre réservation",
      details: [
        "Finalisez les conditions de transport",
        "Confirmez le prix et les modalités",
        "Échangez vos coordonnées de contact",
        "Planifiez les points de rendez-vous"
      ]
    },
    {
      icon: Shield,
      title: "4. Transportez en sécurité",
      description: "Effectuez le transport en toute sécurité avec notre garantie et suivi",
      details: [
        "Bénéficiez de notre assurance transport",
        "Suivez votre colis en temps réel",
        "Confirmez la livraison",
        "Évaluez votre expérience"
      ]
    }
  ];

  const benefits = [
    {
      icon: Package,
      title: "Pour les expéditeurs",
      points: [
        "Économisez jusqu'à 60% sur vos envois",
        "Transport rapide et flexible",
        "Suivi en temps réel de vos colis",
        "Assurance incluse"
      ]
    },
    {
      icon: MapPin,
      title: "Pour les transporteurs",
      points: [
        "Rentabilisez vos trajets",
        "Revenus complémentaires",
        "Rencontrez de nouvelles personnes",
        "Contribuez à l'économie collaborative"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comment fonctionne VoyagaBagae ?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre processus simple et sécurisé pour connecter expéditeurs et transporteurs partout au Maroc
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="flex items-center mb-6">
                      <div className="bg-red-100 p-4 rounded-full mr-4">
                        <Icon className="h-8 w-8 text-red-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={isEven ? '' : 'lg:col-start-1'}>
                    <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                      <Icon className="h-32 w-32 text-red-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Avantages pour tous
            </h2>
            <p className="text-xl text-gray-600">
              VoyagaBagae profite à toute la communauté
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Icon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{benefit.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {benefit.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <Star className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Rejoignez des milliers de Marocains qui font confiance à VoyagaBagae
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transition-colors">
              Publier une annonce
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Rechercher un transport
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;