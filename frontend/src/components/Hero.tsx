import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 text-sm">Plus de 50,000 utilisateurs satisfaits</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transportez et expédiez vos
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500"> colis facilement</span> au Maroc
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connectez-vous avec des voyageurs pour transporter vos colis partout au Maroc. 
              Économique, rapide et sécurisé.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/annonces" className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition-all transform hover:scale-105 flex items-center justify-center group">
                Publier une annonce
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/rechercher" className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all text-center">
                Trouver un transporteur
              </Link>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-100 p-4 rounded-xl">
                    <div className="w-8 h-8 bg-red-500 rounded-full mb-2"></div>
                    <div className="text-sm font-semibold text-gray-800">Casablanca</div>
                    <div className="text-xs text-gray-500">Départ</div>
                  </div>
                  <div className="bg-green-100 p-4 rounded-xl">
                    <div className="w-8 h-8 bg-green-500 rounded-full mb-2"></div>
                    <div className="text-sm font-semibold text-gray-800">Marrakech</div>
                    <div className="text-xs text-gray-500">Arrivée</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Prix suggéré</span>
                    <span className="font-bold text-red-600">150 MAD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Date</span>
                    <span className="font-semibold">Aujourd'hui</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-white p-3 rounded-full shadow-lg animate-bounce">
              <span className="font-bold text-sm">-60%</span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold">Transport confirmé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;