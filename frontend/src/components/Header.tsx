import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
    setIsMenuOpen(false);
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">VoyagaBagae</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/comment-ca-marche" className={`transition-colors font-medium ${
              location.pathname === '/comment-ca-marche' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
            }`}>
              Comment ça marche
            </Link>
            <Link to="/annonces" className={`transition-colors font-medium ${
              location.pathname === '/annonces' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
            }`}>
              Annonces
            </Link>
            <Link to="/securite" className={`transition-colors font-medium ${
              location.pathname === '/securite' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
            }`}>
              Sécurité
            </Link>
            <Link to="/aide" className={`transition-colors font-medium ${
              location.pathname === '/aide' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
            }`}>
              Aide
            </Link>
            <Link to="/devenir-transporteur" className={`transition-colors font-medium ${
              location.pathname === '/devenir-transporteur' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
            }`}>
              Devenir transporteur
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="font-medium">{user?.firstName}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={handleLoginClick}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  Se connecter
                </button>
                <button 
                  onClick={handleRegisterClick}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  S'inscrire
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 transition-colors"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4" data-testid="mobile-menu">
            <nav className="flex flex-col space-y-4">
              <Link to="/comment-ca-marche" className="text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Comment ça marche
              </Link>
              <Link to="/annonces" className="text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Annonces
              </Link>
              <Link to="/securite" className="text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Sécurité
              </Link>
              <Link to="/aide" className="text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Aide
              </Link>
              <Link to="/devenir-transporteur" className="text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Devenir transporteur
              </Link>
              <hr className="border-gray-200" />
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-5 w-5" />
                    <span>Mon tableau de bord</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium flex items-center space-x-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Se déconnecter</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleLoginClick}
                    className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium"
                  >
                    Se connecter
                  </button>
                  <button 
                    onClick={handleRegisterClick}
                    className="text-left bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium w-fit"
                  >
                    S'inscrire
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
      </header>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={switchToRegister}
      />
      
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default Header;