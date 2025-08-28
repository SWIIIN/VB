import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from '../Features';

describe('Features Component', () => {
  beforeEach(() => {
    render(<Features />);
  });

  describe('Header Section', () => {
    it('should render the main heading', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Pourquoi choisir VoyagaBagae ?');
    });

    it('should render the subtitle', () => {
      const subtitle = screen.getByText(/La première plateforme de transport collaboratif de colis au Maroc/);
      expect(subtitle).toBeInTheDocument();
    });

    it('should have correct heading styling', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-3xl', 'lg:text-4xl', 'font-bold', 'text-gray-900');
    });
  });

  describe('Features Grid', () => {
    it('should render exactly 6 feature cards', () => {
      const featureCards = screen.getAllByRole('article');
      expect(featureCards).toHaveLength(6);
    });

    it('should render all expected feature titles', () => {
      const expectedTitles = [
        'Transport sécurisé',
        'Prix attractifs',
        'Livraison rapide',
        'Communauté de confiance',
        'Couverture nationale',
        'Communication directe'
      ];

      expectedTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });

    it('should render all expected feature descriptions', () => {
      const expectedDescriptions = [
        /Vérification d'identité, assurance incluse et système de notation pour votre tranquillité d'esprit/,
        /Jusqu'à 60% moins cher que les services de livraison traditionnels grâce à notre modèle collaboratif/,
        /Transport le jour même possible grâce à notre réseau de voyageurs actifs dans tout le Maroc/,
        /Plus de 50,000 membres vérifiés avec un système de notation et d'avis détaillé/,
        /Disponible dans toutes les villes du Maroc avec des trajets quotidiens entre les principales destinations/,
        /Messagerie intégrée pour échanger facilement avec votre transporteur ou expéditeur/
      ];

      expectedDescriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument();
      });
    });

    it('should have correct grid layout classes', () => {
      const featuresContainer = screen.getByRole('main').querySelector('.grid');
      expect(featuresContainer).toHaveClass('md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('should have hover effects on feature cards', () => {
      const featureCards = screen.getAllByRole('article');
      featureCards.forEach(card => {
        expect(card).toHaveClass('hover:shadow-xl', 'transition-all', 'duration-300');
      });
    });
  });

  describe('Feature Icons', () => {
    it('should render icons with correct styling', () => {
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThanOrEqual(6);
      
      icons.forEach(icon => {
        expect(icon).toHaveClass('h-6', 'w-6', 'text-white');
      });
    });

    it('should have gradient backgrounds for icons', () => {
      const iconContainers = document.querySelectorAll('[class*="bg-gradient-to-r"]');
      expect(iconContainers.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe('Call to Action Section', () => {
    it('should render the CTA heading', () => {
      const ctaHeading = screen.getByText('Prêt à économiser sur vos envois ?');
      expect(ctaHeading).toBeInTheDocument();
      expect(ctaHeading).toHaveClass('text-2xl', 'lg:text-3xl', 'font-bold');
    });

    it('should render the CTA description', () => {
      const ctaDescription = screen.getByText(/Rejoignez des milliers de Marocains qui font confiance à VoyagaBagae/);
      expect(ctaDescription).toBeInTheDocument();
    });

    it('should render both CTA buttons', () => {
      const primaryButton = screen.getByRole('button', { name: /Créer un compte gratuit/i });
      const secondaryButton = screen.getByRole('button', { name: /En savoir plus/i });
      
      expect(primaryButton).toBeInTheDocument();
      expect(secondaryButton).toBeInTheDocument();
    });

    it('should have correct button styling', () => {
      const primaryButton = screen.getByRole('button', { name: /Créer un compte gratuit/i });
      const secondaryButton = screen.getByRole('button', { name: /En savoir plus/i });
      
      expect(primaryButton).toHaveClass('bg-red-600', 'text-white', 'hover:bg-red-700');
      expect(secondaryButton).toHaveClass('border', 'border-red-600', 'text-red-600', 'hover:bg-red-600');
    });
  });

  describe('Statistics Section', () => {
    it('should render all 4 statistics', () => {
      const stats = [
        { value: '50K+', label: 'Utilisateurs actifs' },
        { value: '100K+', label: 'Colis transportés' },
        { value: '4.9★', label: 'Note moyenne' },
        { value: '24h', label: 'Support client' }
      ];

      stats.forEach(stat => {
        expect(screen.getByText(stat.value)).toBeInTheDocument();
        expect(screen.getByText(stat.label)).toBeInTheDocument();
      });
    });

    it('should have correct statistics styling', () => {
      const statValues = document.querySelectorAll('.text-2xl.font-bold');
      expect(statValues.length).toBe(4);
      
      statValues.forEach(value => {
        expect(value).toHaveClass('text-2xl', 'font-bold');
      });
    });

    it('should have different colors for each statistic', () => {
      const statContainers = document.querySelectorAll('[class*="text-"]');
      const coloredStats = Array.from(statContainers).filter(el => 
        el.className.includes('text-red-600') || 
        el.className.includes('text-green-600') || 
        el.className.includes('text-blue-600') || 
        el.className.includes('text-purple-600')
      );
      expect(coloredStats.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text classes', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      const ctaHeading = screen.getByText('Prêt à économiser sur vos envois ?');
      
      expect(mainHeading).toHaveClass('text-3xl', 'lg:text-4xl');
      expect(ctaHeading).toHaveClass('text-2xl', 'lg:text-3xl');
    });

    it('should have responsive grid classes', () => {
      const featuresContainer = screen.getByRole('main').querySelector('.grid');
      expect(featuresContainer).toHaveClass('md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('should have responsive padding classes', () => {
      const ctaSection = screen.getByText('Prêt à économiser sur vos envois ?').closest('.p-8');
      expect(ctaSection).toHaveClass('p-8', 'lg:p-12');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(2);
      
      const mainHeading = headings[0];
      expect(mainHeading.tagName).toBe('H2');
    });

    it('should have buttons with proper roles', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
      
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('should have descriptive button text', () => {
      const primaryButton = screen.getByRole('button', { name: /Créer un compte gratuit/i });
      const secondaryButton = screen.getByRole('button', { name: /En savoir plus/i });
      
      expect(primaryButton.textContent).toBeTruthy();
      expect(secondaryButton.textContent).toBeTruthy();
    });
  });

  describe('Content Validation', () => {
    it('should contain app name in multiple places', () => {
      const appNameOccurrences = screen.getAllByText(/VoyagaBagae/i);
      expect(appNameOccurrences.length).toBeGreaterThanOrEqual(2);
    });

    it('should mention Morocco in the content', () => {
      expect(screen.getByText(/Maroc/i)).toBeInTheDocument();
    });

    it('should have realistic statistics', () => {
      expect(screen.getByText('50K+')).toBeInTheDocument();
      expect(screen.getByText('100K+')).toBeInTheDocument();
      expect(screen.getByText('4.9★')).toBeInTheDocument();
      expect(screen.getByText('24h')).toBeInTheDocument();
    });

    it('should have French language content', () => {
      expect(screen.getByText(/Pourquoi choisir/i)).toBeInTheDocument();
      expect(screen.getByText(/sécurisé/i)).toBeInTheDocument();
      expect(screen.getByText(/attractifs/i)).toBeInTheDocument();
      expect(screen.getByText(/rapide/i)).toBeInTheDocument();
    });
  });
});

