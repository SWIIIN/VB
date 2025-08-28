import React from 'react';
import { Car, DollarSign, Clock, Users, CheckCircle, ArrowRight, Calculator, MapPin, Star } from 'lucide-react';

const BecomeCarrier = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Revenus complémentaires",
      description: "Gagnez entre 200 et 1000 MAD par mois selon vos trajets",
      details: "Rentabilisez vos déplacements quotidiens ou vos voyages occasionnels"
    },
    {
      icon: Clock,
      title: "Flexibilité totale",
      description: "Transportez quand vous voulez, sur vos trajets habituels",
      details: "Aucune contrainte d'horaire, vous restez maître de votre planning"
    },
    {
      icon: Users,
      title: "Rencontres enrichissantes",
      description: "Rencontrez de nouvelles personnes et créez du lien social",
      details: "Participez à une communauté solidaire et bienveillante"
    },
    {
      icon: Car,
      title: "Optimisez vos trajets",
      description: "Réduisez vos frais de transport en partageant les coûts",
      details: "Essence, péages, usure du véhicule : tout est compensé"
    }
  ];

  const requirements = [
    "Être âgé de 18 ans minimum",
    "Posséder un véhicule en bon état",
    "Avoir un permis de conduire valide",
    "Fournir une pièce d'identité",
    "Accepter la charte de qualité VoyagaBagae"
  ];

  const steps = [
    {
      number: "1",
      title: "Inscription gratuite",
      description: "Créez votre compte et complétez votre profil transporteur"
    },
    {
      number: "2",
      title: "Vérification",
      description: "Nous vérifions vos documents (24h maximum)"
    },
    {
      number: "3",
      title: "Premier transport",
      description: "Publiez votre première annonce et commencez à transporter"
    }
  ];

  const earnings = [
    { route: "Casablanca - Rabat", distance: "90 km", earning: "50-80 MAD" },
    { route: "Marrakech - Casablanca", distance: "240 km", earning: "120-200 MAD" },
    { route: "Fès - Meknès", distance: "60 km", earning: "40-60 MAD" },
    { route: "Tanger - Tétouan", distance: "65 km", earning: "40-70 MAD" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Devenez transporteur et 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> gagnez de l'argent</span> facilement
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transformez vos trajets quotidiens en source de revenus. Rejoignez plus de 10,000 transporteurs actifs au Maroc.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                  Devenir transporteur
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-colors">
                  Calculer mes gains
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <Car className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">Ahmed K.</div>
                        <div className="text-sm text-gray-500">Transporteur ⭐⭐⭐⭐⭐</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">+850 MAD</div>
                      <div className="text-sm text-gray-500">Ce mois-ci</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Casablanca → Marrakech</span>
                      <span className="font-semibold">180 MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rabat → Fès</span>
                      <span className="font-semibold">120 MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Casablanca → Rabat (x5)</span>
                      <span className="font-semibold">350 MAD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi devenir transporteur ?
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez tous les avantages de rejoindre notre communauté
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-6 flex-shrink-0">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 mb-3">{benefit.description}</p>
                      <p className="text-sm text-gray-500">{benefit.details}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Estimez vos gains potentiels
            </h2>
            <p className="text-xl text-gray-600">
              Exemples de revenus sur les trajets les plus populaires
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {earnings.map((earning, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="font-semibold text-gray-900">{earning.route}</div>
                      <div className="text-sm text-gray-500">{earning.distance}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{earning.earning}</div>
                    <div className="text-sm text-gray-500">par trajet</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center">
            <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Calculateur de gains personnalisé
            </h3>
            <p className="text-gray-600 mb-6">
              Découvrez combien vous pourriez gagner selon vos trajets habituels
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              Calculer mes gains
            </button>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Conditions requises
            </h2>
            <p className="text-xl text-gray-600">
              Critères simples pour devenir transporteur VoyagaBagae
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How to Start */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comment commencer ?
            </h2>
            <p className="text-xl text-gray-600">
              3 étapes simples pour devenir transporteur
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Témoignages de transporteurs
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez l'expérience de nos transporteurs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Karim Benali",
                location: "Casablanca",
                text: "Je fais le trajet Casablanca-Rabat tous les jours pour le travail. Grâce à VoyagaBagae, je gagne 400 MAD par semaine en transportant des colis. C'est parfait !",
                avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
                earnings: "+1600 MAD/mois"
              },
              {
                name: "Fatima Zahra",
                location: "Marrakech",
                text: "En tant qu'étudiante, VoyagaBagae m'aide à financer mes études. Je transporte lors de mes retours chez mes parents et ça couvre mes frais de transport.",
                avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
                earnings: "+800 MAD/mois"
              },
              {
                name: "Mohamed Alami",
                location: "Fès",
                text: "Excellent complément de revenus ! Les utilisateurs sont respectueux et l'équipe VoyagaBagae est très réactive. Je recommande vivement.",
                avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
                earnings: "+1200 MAD/mois"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-green-600 font-semibold">Gains moyens</div>
                  <div className="text-lg font-bold text-green-700">{testimonial.earnings}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à commencer votre aventure ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez des milliers de transporteurs qui font confiance à VoyagaBagae
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors">
              Devenir transporteur maintenant
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Télécharger l'app mobile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeCarrier;