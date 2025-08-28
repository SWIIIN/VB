import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stats from '../Stats';

describe('Stats Component', () => {
  beforeEach(() => {
    render(<Stats />);
  });

  describe('Header Section', () => {
    it('should render the main heading', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('VoyagaBagae en chiffres');
    });

    it('should render the subtitle', () => {
      const subtitle = screen.getByText(/Une croissance constante grâce à la confiance de notre communauté/);
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass('text-xl', 'text-red-100');
    });

    it('should have correct heading styling', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-3xl', 'lg:text-4xl', 'font-bold', 'mb-4');
    });

    it('should have correct subtitle styling', () => {
      const subtitle = screen.getByText(/Une croissance constante grâce à la confiance de notre communauté/);
      expect(subtitle).toHaveClass('text-xl', 'text-red-100', 'max-w-3xl', 'mx-auto');
    });
  });

  describe('Statistics Grid', () => {
    it('should render exactly 4 statistics', () => {
      const statCards = document.querySelectorAll('.text-center.group');
      expect(statCards).toHaveLength(4);
    });

    it('should have correct grid layout classes', () => {
      const statsContainer = document.querySelector('.grid');
      expect(statsContainer).toHaveClass('md:grid-cols-2', 'lg:grid-cols-4');
    });

    it('should have proper spacing between stats', () => {
      const statsContainer = document.querySelector('.grid');
      expect(statsContainer).toHaveClass('gap-8');
    });
  });

  describe('Individual Statistics', () => {
    it('should render all expected statistics with correct values', () => {
      const expectedStats = [
        { number: '50,000+', label: 'Utilisateurs actifs', description: 'Membres vérifiés dans tout le Maroc' },
        { number: '100,000+', label: 'Colis transportés', description: 'Livraisons réussies depuis le lancement' },
        { number: '25+', label: 'Villes couvertes', description: 'Présent dans toutes les régions du Maroc' },
        { number: '99.2%', label: 'Taux de satisfaction', description: 'Clients satisfaits de leur expérience' }
      ];

      expectedStats.forEach(stat => {
        expect(screen.getByText(stat.number)).toBeInTheDocument();
        expect(screen.getByText(stat.label)).toBeInTheDocument();
        expect(screen.getByText(stat.description)).toBeInTheDocument();
      });
    });

    it('should have correct number styling', () => {
      const statNumbers = document.querySelectorAll('.text-3xl.lg\\:text-4xl.font-bold');
      expect(statNumbers).toHaveLength(4);
      
      statNumbers.forEach(number => {
        expect(number).toHaveClass('text-3xl', 'lg:text-4xl', 'font-bold', 'mb-2');
      });
    });

    it('should have correct label styling', () => {
      const statLabels = document.querySelectorAll('.text-lg.font-semibold');
      expect(statLabels).toHaveLength(4);
      
      statLabels.forEach(label => {
        expect(label).toHaveClass('text-lg', 'font-semibold', 'mb-2');
      });
    });

    it('should have correct description styling', () => {
      const statDescriptions = document.querySelectorAll('.text-red-100.text-sm');
      expect(statDescriptions).toHaveLength(4);
      
      statDescriptions.forEach(description => {
        expect(description).toHaveClass('text-red-100', 'text-sm');
      });
    });
  });

  describe('Statistics Icons', () => {
    it('should render icons with correct styling', () => {
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBe(4);
      
      icons.forEach(icon => {
        expect(icon).toHaveClass('h-8', 'w-8');
      });
    });

    it('should have icon containers with correct styling', () => {
      const iconContainers = document.querySelectorAll('.bg-white\\/10.backdrop-blur-sm');
      expect(iconContainers).toHaveLength(4);
      
      iconContainers.forEach(container => {
        expect(container).toHaveClass('bg-white/10', 'backdrop-blur-sm', 'w-16', 'h-16', 'rounded-full');
      });
    });

    it('should have hover effects on icon containers', () => {
      const iconContainers = document.querySelectorAll('.group-hover\\:bg-white\\/20');
      expect(iconContainers).toHaveLength(4);
      
      iconContainers.forEach(container => {
        expect(container).toHaveClass('group-hover:bg-white/20', 'transition-colors', 'duration-300');
      });
    });

    it('should have centered icons', () => {
      const iconContainers = document.querySelectorAll('.flex.items-center.justify-center');
      expect(iconContainers).toHaveLength(4);
    });
  });

  describe('Call to Action Section', () => {
    it('should render the CTA text', () => {
      const ctaText = screen.getByText('Rejoignez la révolution du transport collaboratif au Maroc');
      expect(ctaText).toBeInTheDocument();
      expect(ctaText).toHaveClass('text-lg', 'text-red-100', 'mb-6');
    });

    it('should render the CTA button', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it('should have correct button styling', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton).toHaveClass(
        'bg-white', 'text-red-600', 'px-8', 'py-4', 'rounded-xl', 
        'font-semibold', 'hover:bg-red-50', 'transition-colors'
      );
    });

    it('should have hover effects on button', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton).toHaveClass('transform', 'hover:scale-105');
    });
  });

  describe('Layout and Styling', () => {
    it('should have gradient background', () => {
      const section = screen.getByRole('region');
      expect(section).toHaveClass('bg-gradient-to-r', 'from-red-600', 'to-orange-500');
    });

    it('should have white text color', () => {
      const section = screen.getByRole('region');
      expect(section).toHaveClass('text-white');
    });

    it('should have proper section padding', () => {
      const section = screen.getByRole('region');
      expect(section).toHaveClass('py-20');
    });

    it('should have proper container max width', () => {
      const container = document.querySelector('.max-w-7xl');
      expect(container).toBeInTheDocument();
    });

    it('should have responsive padding', () => {
      const container = document.querySelector('.px-4.sm\\:px-6.lg\\:px-8');
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text classes', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      const statNumbers = document.querySelectorAll('.text-3xl.lg\\:text-4xl');
      
      expect(mainHeading).toHaveClass('text-3xl', 'lg:text-4xl');
      statNumbers.forEach(number => {
        expect(number).toHaveClass('text-3xl', 'lg:text-4xl');
      });
    });

    it('should have responsive grid classes', () => {
      const statsContainer = document.querySelector('.grid');
      expect(statsContainer).toHaveClass('md:grid-cols-2', 'lg:grid-cols-4');
    });

    it('should have responsive spacing', () => {
      const statsContainer = document.querySelector('.grid');
      expect(statsContainer).toHaveClass('gap-8');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const section = screen.getByRole('region');
      expect(section).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBe(1);
      
      const mainHeading = headings[0];
      expect(mainHeading.tagName).toBe('H2');
    });

    it('should have proper button roles', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(1);
    });

    it('should have descriptive button text', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton.textContent).toBeTruthy();
    });
  });

  describe('Interactive Elements', () => {
    it('should have hover effects on statistics', () => {
      const statCards = document.querySelectorAll('.group');
      statCards.forEach(card => {
        expect(card).toHaveClass('group');
      });
    });

    it('should have hover effects on icon containers', () => {
      const iconContainers = document.querySelectorAll('.group-hover\\:bg-white\\/20');
      expect(iconContainers.length).toBe(4);
    });

    it('should have hover effects on button', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton).toHaveClass('hover:bg-red-50', 'hover:scale-105');
    });

    it('should have transition effects', () => {
      const elementsWithTransitions = document.querySelectorAll('[class*="transition"]');
      expect(elementsWithTransitions.length).toBeGreaterThan(0);
    });
  });

  describe('Content Validation', () => {
    it('should contain app name', () => {
      expect(screen.getByText(/VoyagaBagae/)).toBeInTheDocument();
    });

    it('should mention Morocco in multiple places', () => {
      const moroccoMentions = screen.getAllByText(/Maroc/i);
      expect(moroccoMentions.length).toBeGreaterThanOrEqual(2);
    });

    it('should have realistic statistics', () => {
      expect(screen.getByText('50,000+')).toBeInTheDocument();
      expect(screen.getByText('100,000+')).toBeInTheDocument();
      expect(screen.getByText('25+')).toBeInTheDocument();
      expect(screen.getByText('99.2%')).toBeInTheDocument();
    });

    it('should have French language content', () => {
      expect(screen.getByText(/Utilisateurs actifs/i)).toBeInTheDocument();
      expect(screen.getByText(/Colis transportés/i)).toBeInTheDocument();
      expect(screen.getByText(/Villes couvertes/i)).toBeInTheDocument();
      expect(screen.getByText(/Taux de satisfaction/i)).toBeInTheDocument();
    });

    it('should have meaningful descriptions', () => {
      const descriptions = [
        /Membres vérifiés dans tout le Maroc/,
        /Livraisons réussies depuis le lancement/,
        /Présent dans toutes les régions du Maroc/,
        /Clients satisfaits de leur expérience/
      ];

      descriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument();
      });
    });
  });

  describe('Visual Effects', () => {
    it('should have backdrop blur effect on icon containers', () => {
      const iconContainers = document.querySelectorAll('.backdrop-blur-sm');
      expect(iconContainers.length).toBe(4);
    });

    it('should have semi-transparent white backgrounds', () => {
      const iconContainers = document.querySelectorAll('.bg-white\\/10');
      expect(iconContainers.length).toBe(4);
    });

    it('should have rounded icon containers', () => {
      const iconContainers = document.querySelectorAll('.rounded-full');
      expect(iconContainers.length).toBe(4);
    });

    it('should have proper icon sizing', () => {
      const icons = document.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveClass('h-8', 'w-8');
      });
    });
  });
});

