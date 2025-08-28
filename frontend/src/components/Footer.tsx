import React from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "VoyagaBagae",
      links: ["À propos", "Comment ça marche", "Sécurité", "Aide et support", "Carrières"]
    },
    {
      title: "Services",
      links: ["Envoyer un colis", "Devenir transporteur", "Transport express", "Assurance colis", "Suivi en temps réel"]
    },
    {
      title: "Destinations populaires",
      links: ["Casablanca - Rabat", "Marrakech - Casablanca", "Fès - Meknès", "Tanger - Tétouan", "Agadir - Essaouira"]
    },
    {
      title: "Légal",
      links: ["Conditions d'utilisation", "Politique de confidentialité", "Mentions légales", "Cookies", "Charte de qualité"]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-red-600 to-orange-500 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">VoyagaBagae</span>
            </div>
            <p className="text-gray-300 mb-6">
              La première plateforme de transport collaboratif de colis au Maroc. Connectant expéditeurs et voyageurs pour un transport économique et écologique.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-sm text-gray-300">contact@voyagabagae.ma</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-sm text-gray-300">+212 5XX-XXX-XXX</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-300 hover:text-red-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold text-lg mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-l-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none"
                />
                <button className="bg-red-600 px-6 py-3 rounded-r-lg hover:bg-red-700 transition-colors font-semibold">
                  S'abonner
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Recevez nos dernières nouvelles et offres spéciales
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 VoyagaBagae. Tous droits réservés. Conçu avec ❤️ au Maroc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;