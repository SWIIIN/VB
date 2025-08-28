import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils';
import Home from '../Home';

// Mock des composants
jest.mock('../../components/Hero', () => {
  return function MockHero() {
    return <div data-testid="hero">Hero Component</div>;
  };
});

jest.mock('../../components/SearchSection', () => {
  return function MockSearchSection() {
    return <div data-testid="search-section">Search Section Component</div>;
  };
});

jest.mock('../../components/HowItWorksSection', () => {
  return function MockHowItWorksSection() {
    return <div data-testid="how-it-works">How It Works Section Component</div>;
  };
});

jest.mock('../../components/Features', () => {
  return function MockFeatures() {
    return <div data-testid="features">Features Component</div>;
  };
});

jest.mock('../../components/Stats', () => {
  return function MockStats() {
    return <div data-testid="stats">Stats Component</div>;
  };
});

jest.mock('../../components/Testimonials', () => {
  return function MockTestimonials() {
    return <div data-testid="testimonials">Testimonials Component</div>;
  };
});

describe('Home', () => {
  it('should render all main sections', () => {
    render(<Home />);
    
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('search-section')).toBeInTheDocument();
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('stats')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
  });

  it('should render components in correct order', () => {
    render(<Home />);
    
    const container = screen.getByTestId('hero').parentElement;
    const children = Array.from(container?.children || []);
    
    // Vérifier l'ordre des composants
    expect(children[0]).toHaveAttribute('data-testid', 'hero');
    expect(children[1]).toHaveAttribute('data-testid', 'search-section');
    expect(children[2]).toHaveAttribute('data-testid', 'how-it-works');
    expect(children[3]).toHaveAttribute('data-testid', 'features');
    expect(children[4]).toHaveAttribute('data-testid', 'stats');
    expect(children[5]).toHaveAttribute('data-testid', 'testimonials');
  });

  it('should have proper component structure', () => {
    render(<Home />);
    
    // Vérifier que chaque composant est un div avec le bon testid
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('search-section')).toBeInTheDocument();
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('stats')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
  });

  it('should render with router wrapper', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('search-section')).toBeInTheDocument();
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('stats')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
  });
});

