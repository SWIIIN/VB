import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Annonces from './pages/Annonces';
import HowItWorks from './pages/HowItWorks';
import Safety from './pages/Safety';
import Help from './pages/Help';
import BecomeCarrier from './pages/BecomeCarrier';
import Search from './pages/Search';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/annonces" element={<Annonces />} />
              <Route path="/comment-ca-marche" element={<HowItWorks />} />
              <Route path="/securite" element={<Safety />} />
              <Route path="/aide" element={<Help />} />
              <Route path="/devenir-transporteur" element={<BecomeCarrier />} />
              <Route path="/rechercher" element={<Search />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;