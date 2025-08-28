import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, FileText } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqCategories = [
    {
      title: "Premiers pas",
      faqs: [
        {
          question: "Comment créer un compte sur VoyagaBagae ?",
          answer: "Cliquez sur 'S'inscrire' en haut de la page, remplissez le formulaire avec vos informations personnelles, vérifiez votre email et votre numéro de téléphone. Votre compte sera activé immédiatement après vérification."
        },
        {
          question: "Comment publier ma première annonce ?",
          answer: "Une fois connecté, cliquez sur 'Publier une annonce', choisissez si vous voulez envoyer ou transporter un colis, remplissez les détails du trajet, fixez votre prix et publiez. Votre annonce sera visible immédiatement."
        },
        {
          question: "Comment rechercher un transporteur ?",
          answer: "Utilisez le formulaire de recherche sur la page d'accueil, sélectionnez vos villes de départ et d'arrivée, votre date souhaitée, et parcourez les offres disponibles. Vous pouvez contacter directement les transporteurs."
        }
      ]
    },
    {
      title: "Transport et livraison",
      faqs: [
        {
          question: "Quels types de colis puis-je envoyer ?",
          answer: "Vous pouvez envoyer la plupart des objets personnels : vêtements, livres, électronique, cadeaux, documents, etc. Consultez notre liste d'objets interdits dans la section Sécurité."
        },
        {
          question: "Comment fixer le prix de transport ?",
          answer: "Le prix est libre et négociable entre expéditeur et transporteur. Nous suggérons des prix basés sur la distance et le type de colis. En moyenne, comptez 10-20 MAD par kg selon la distance."
        },
        {
          question: "Que faire si mon colis est endommagé ?",
          answer: "Contactez immédiatement notre support avec des photos du colis endommagé. Notre assurance couvre les dommages jusqu'à 500 MAD automatiquement, avec possibilité d'extension."
        }
      ]
    },
    {
      title: "Paiement et facturation",
      faqs: [
        {
          question: "Comment se déroule le paiement ?",
          answer: "Le paiement se fait en ligne de manière sécurisée. Les fonds sont bloqués lors de la réservation et libérés au transporteur après confirmation de livraison par l'expéditeur."
        },
        {
          question: "Puis-je annuler ma réservation ?",
          answer: "Oui, vous pouvez annuler jusqu'à 2h avant le départ prévu. Les frais d'annulation sont de 10% du montant total. Après ce délai, l'annulation n'est possible qu'en cas de force majeure."
        },
        {
          question: "Comment obtenir un remboursement ?",
          answer: "En cas d'annulation valide ou de problème de transport, le remboursement est automatique sous 3-5 jours ouvrés sur votre moyen de paiement original."
        }
      ]
    },
    {
      title: "Sécurité et confiance",
      faqs: [
        {
          question: "Comment vérifiez-vous les membres ?",
          answer: "Tous les membres doivent fournir une pièce d'identité valide, un numéro de téléphone vérifié par SMS, et une adresse email confirmée. Nous vérifions manuellement chaque inscription."
        },
        {
          question: "Que faire en cas de problème avec un membre ?",
          answer: "Utilisez notre système de signalement dans votre messagerie ou contactez directement notre support. Nous enquêtons sur tous les signalements et prenons les mesures appropriées."
        },
        {
          question: "Mes données personnelles sont-elles protégées ?",
          answer: "Absolument. Nous respectons le RGPD et ne partageons jamais vos données personnelles. Seules les informations nécessaires au transport sont visibles par vos interlocuteurs."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Chat en direct",
      description: "Réponse immédiate de 8h à 22h",
      action: "Démarrer le chat",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Phone,
      title: "Téléphone",
      description: "+212 5XX-XXX-XXX",
      action: "Appeler maintenant",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Mail,
      title: "Email",
      description: "support@voyagabagae.ma",
      action: "Envoyer un email",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: FileText,
      title: "Ticket support",
      description: "Pour les demandes complexes",
      action: "Créer un ticket",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comment pouvons-nous vous aider ?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Trouvez rapidement les réponses à vos questions ou contactez notre équipe support
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h2>
            <p className="text-lg text-gray-600">
              Choisissez le moyen de contact qui vous convient le mieux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow text-center">
                  <div className={`${option.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    {option.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-600">
              Les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openFaq === globalIndex;
                    
                    return (
                      <div key={faqIndex} className="bg-white border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleFaq(globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Aucun résultat trouvé pour "{searchTerm}"
              </p>
              <p className="text-gray-500 mt-2">
                Essayez avec d'autres mots-clés ou contactez notre support
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Notre équipe support est là pour vous aider personnellement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Contacter le support
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Programmer un appel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;