import React from 'react';
import { Shield, CheckCircle, Users, Lock, Eye, AlertTriangle, Phone, FileText } from 'lucide-react';

const Safety = () => {
  const safetyFeatures = [
    {
      icon: Users,
      title: "Vérification d'identité",
      description: "Tous nos membres sont vérifiés avec pièce d'identité et numéro de téléphone",
      details: [
        "Vérification obligatoire de la carte d'identité",
        "Confirmation du numéro de téléphone par SMS",
        "Validation de l'adresse email",
        "Profils complets avec photo obligatoire"
      ]
    },
    {
      icon: Shield,
      title: "Assurance transport",
      description: "Vos colis sont assurés jusqu'à 500 MAD automatiquement",
      details: [
        "Couverture automatique incluse",
        "Extension possible jusqu'à 5000 MAD",
        "Remboursement rapide en cas de problème",
        "Partenariat avec des assureurs reconnus"
      ]
    },
    {
      icon: Eye,
      title: "Système de notation",
      description: "Évaluations et commentaires après chaque transport",
      details: [
        "Notes et avis détaillés",
        "Historique complet des transports",
        "Badges de confiance pour les membres actifs",
        "Signalement des comportements inappropriés"
      ]
    },
    {
      icon: Lock,
      title: "Paiement sécurisé",
      description: "Transactions protégées et paiement après livraison",
      details: [
        "Paiement en ligne sécurisé",
        "Libération des fonds après confirmation",
        "Protection contre la fraude",
        "Remboursement garanti si problème"
      ]
    }
  ];

  const guidelines = [
    {
      icon: CheckCircle,
      title: "Bonnes pratiques",
      tips: [
        "Vérifiez toujours le profil de votre interlocuteur",
        "Communiquez via la messagerie VoyagaBagae",
        "Prenez des photos du colis avant transport",
        "Respectez les rendez-vous convenus",
        "Laissez un avis après chaque transport"
      ]
    },
    {
      icon: AlertTriangle,
      title: "À éviter",
      tips: [
        "Ne transportez jamais d'objets interdits",
        "N'acceptez pas de colis non déclarés",
        "Évitez les paiements en dehors de la plateforme",
        "Ne donnez pas vos coordonnées bancaires",
        "Signalez tout comportement suspect"
      ]
    }
  ];

  const prohibitedItems = [
    "Substances dangereuses ou toxiques",
    "Armes et munitions",
    "Drogues et stupéfiants",
    "Objets de valeur non déclarés",
    "Animaux vivants",
    "Produits périssables sans emballage",
    "Liquides inflammables",
    "Médicaments sur ordonnance"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Shield className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Votre sécurité, notre priorité
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez toutes les mesures que nous mettons en place pour garantir des transports sûrs et sereins
          </p>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos garanties de sécurité
            </h2>
            <p className="text-xl text-gray-600">
              Un écosystème complet pour votre tranquillité d'esprit
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {safetyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Guide de sécurité
            </h2>
            <p className="text-xl text-gray-600">
              Conseils et recommandations pour des transports réussis
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {guidelines.map((guideline, index) => {
              const Icon = guideline.icon;
              const isGood = index === 0;
              
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-full mr-4 ${isGood ? 'bg-green-100' : 'bg-red-100'}`}>
                      <Icon className={`h-6 w-6 ${isGood ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{guideline.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {guideline.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <div className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${isGood ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prohibited Items */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Objets interdits au transport
            </h2>
            <p className="text-xl text-gray-600">
              Pour la sécurité de tous, ces objets ne peuvent pas être transportés
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {prohibitedItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Besoin d'aide ou de signaler un problème ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Notre équipe support est disponible 24h/24 pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
              <Phone className="h-5 w-5 mr-2" />
              Contacter le support
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center">
              <FileText className="h-5 w-5 mr-2" />
              Signaler un problème
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Safety;