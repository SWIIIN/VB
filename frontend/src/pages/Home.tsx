import React, { useState } from 'react';
import Hero from '../components/Hero';
import SearchSection from '../components/SearchSection';
import HowItWorksSection from '../components/HowItWorksSection';
import Features from '../components/Features';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';

const Home = () => {
  const [activeTab, setActiveTab] = useState('send');

  return (
    <>
      <Hero />
      <SearchSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <HowItWorksSection />
      <Features />
      <Stats />
      <Testimonials />
    </>
  );
};

export default Home;