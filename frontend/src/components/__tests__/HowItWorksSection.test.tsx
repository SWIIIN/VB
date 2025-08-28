import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HowItWorksSection from '../HowItWorksSection';

describe('HowItWorksSection Component', () => {
  beforeEach(() => {
    render(<HowItWorksSection />);
  });

  describe('Header Section', () => {
    it('should render the main heading', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Comment ça marche ?');
    });

    it('should render the subtitle', () => {
      const subtitle = screen.getByText(/Un processus simple en 4 étapes pour connecter expéditeurs et transporteurs partout au Maroc/);
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass('text-xl', 'text-gray-600');
    });

    it('should have correct heading styling', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-3xl', 'lg:text-4xl', 'font-bold', 'text-gray-900');
    });

    it('should have correct subtitle styling', () => {
      const subtitle = screen.getByText(/Un processus simple en 4 étapes pour connecter expéditeurs et transporteurs partout au Maroc/);
      expect(subtitle).toHaveClass('text-xl', 'text-gray-600', 'max-w-3xl', 'mx-auto');
    });
  });

  describe('Steps Grid', () => {
    it('should render exactly 4 steps', () => {
      const stepCards = document.querySelectorAll('.text-center.group');
      expect(stepCards).toHaveLength(4);
    });

    it('should have correct grid layout classes', () => {
      const stepsContainer = document.querySelector('.grid');
      expect(stepsContainer).toHaveClass('md:grid-cols-2', 'lg:grid-cols-4');
    });

    it('should have proper spacing between steps', () => {
      const stepsContainer = document.querySelector('.grid');
      expect(stepsContainer).toHaveClass('gap-8');
    });
  });

  describe('Individual Steps', () => {
    it('should render all expected step titles', () => {
      const expectedTitles = [
        '1. Recherchez',
        '2. Connectez',
        '3. Confirmez',
        '4. Transportez'
      ];

      expectedTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });

    it('should render all expected step descriptions', () => {
      const expectedDescriptions = [
        /Trouvez un transporteur sur votre trajet ou publiez votre annonce de transport/,
        /Échangez directement avec les autres membres via notre messagerie sécurisée/,
        /Validez les détails du transport et confirmez votre réservation/,
        /Effectuez le transport en toute sécurité avec notre garantie et suivi/
      ];

      expectedDescriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument();
      });
    });

    it('should have correct step title styling', () => {
      const stepTitles = document.querySelectorAll('.text-xl.font-bold.text-gray-900');
      expect(stepTitles).toHaveLength(4);
      
      stepTitles.forEach(title => {
        expect(title).toHaveClass('text-xl', 'font-bold', 'text-gray-900', 'mb-4');
      });
    });

    it('should have correct step description styling', () => {
      const stepDescriptions = document.querySelectorAll('.text-gray-600.leading-relaxed');
      expect(stepDescriptions).toHaveLength(4);
      
      stepDescriptions.forEach(description => {
        expect(description).toHaveClass('text-gray-600', 'leading-relaxed');
      });
    });

    it('should have numbered steps in correct order', () => {
      const stepTitles = [
        '1. Recherchez',
        '2. Connectez',
        '3. Confirmez',
        '4. Transportez'
      ];
      
      stepTitles.forEach((title, index) => {
        const stepElement = screen.getByText(title);
        expect(stepElement).toBeInTheDocument();
        expect(stepElement.textContent).toContain((index + 1).toString());
      });
    });
  });

  describe('Step Icons', () => {
    it('should render icons with correct styling', () => {
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBe(4);
      
      icons.forEach(icon => {
        expect(icon).toHaveClass('h-8', 'w-8');
      });
    });

    it('should have icon containers with correct styling', () => {
      const iconContainers = document.querySelectorAll('.w-16.h-16.rounded-full');
      expect(iconContainers).toHaveLength(4);
      
      iconContainers.forEach(container => {
        expect(container).toHaveClass('w-16', 'h-16', 'rounded-full', 'flex', 'items-center', 'justify-center');
      });
    });

    it('should have different colors for each step icon container', () => {
      const blueContainer = document.querySelector('.bg-blue-100.text-blue-600');
      const greenContainer = document.querySelector('.bg-green-100.text-green-600');
      const purpleContainer = document.querySelector('.bg-purple-100.text-purple-600');
      const redContainer = document.querySelector('.bg-red-100.text-red-600');
      
      expect(blueContainer).toBeInTheDocument();
      expect(greenContainer).toBeInTheDocument();
      expect(purpleContainer).toBeInTheDocument();
      expect(redContainer).toBeInTheDocument();
    });

    it('should have hover effects on icon containers', () => {
      const iconContainers = document.querySelectorAll('.group-hover\\:scale-110');
      expect(iconContainers).toHaveLength(4);
    });

    it('should have transition effects on icon containers', () => {
      const iconContainers = document.querySelectorAll('.transition-transform.duration-300');
      expect(iconContainers).toHaveLength(4);
    });

    it('should have centered icons', () => {
      const iconContainers = document.querySelectorAll('.flex.items-center.justify-center');
      expect(iconContainers).toHaveLength(4);
    });
  });

  describe('Call to Action Section', () => {
    it('should render the CTA button', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it('should have correct button styling', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton).toHaveClass(
        'bg-red-600', 'text-white', 'px-8', 'py-4', 'rounded-xl', 
        'font-semibold', 'hover:bg-red-700', 'transition-colors'
      );
    });

    it('should have hover effects on button', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton).toHaveClass('transform', 'hover:scale-105');
    });

    it('should have proper button positioning', () => {
      const ctaContainer = document.querySelector('.text-center.mt-16');
      expect(ctaContainer).toHaveClass('text-center', 'mt-16');
    });
  });

  describe('Layout and Styling', () => {
    it('should have light gray background', () => {
      const section = screen.getByRole('region');
      expect(section).toHaveClass('bg-gray-50');
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

    it('should have proper spacing', () => {
      const header = document.querySelector('.text-center.mb-16');
      const cta = document.querySelector('.text-center.mt-16');
      
      expect(header).toHaveClass('mb-16');
      expect(cta).toHaveClass('mt-16');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text classes', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-3xl', 'lg:text-4xl');
    });

    it('should have responsive grid classes', () => {
      const stepsContainer = document.querySelector('.grid');
      expect(stepsContainer).toHaveClass('md:grid-cols-2', 'lg:grid-cols-4');
    });

    it('should have responsive spacing', () => {
      const stepsContainer = document.querySelector('.grid');
      expect(stepsContainer).toHaveClass('gap-8');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const section = screen.getByRole('region');
      expect(section).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBe(5); // 1 main + 4 step titles
      
      const mainHeading = headings[0];
      expect(mainHeading.tagName).toBe('H2');
      
      const stepHeadings = headings.slice(1);
      stepHeadings.forEach(heading => {
        expect(heading.tagName).toBe('H3');
      });
    });

    it('should have proper button roles', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(1);
    });

    it('should have descriptive button text', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton.textContent).toBeTruthy();
    });

    it('should have proper text contrast', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-gray-900');
      
      const subtitle = screen.getByText(/Un processus simple en 4 étapes pour connecter expéditeurs et transporteurs partout au Maroc/);
      expect(subtitle).toHaveClass('text-gray-600');
    });
  });

  describe('Interactive Elements', () => {
    it('should have hover effects on step cards', () => {
      const stepCards = document.querySelectorAll('.group');
      stepCards.forEach(card => {
        expect(card).toHaveClass('group');
      });
    });

    it('should have hover effects on icon containers', () => {
      const iconContainers = document.querySelectorAll('.group-hover\\:scale-110');
      expect(iconContainers.length).toBe(4);
    });

    it('should have hover effects on button', () => {
      const ctaButton = screen.getByRole('button', { name: /Commencer maintenant/i });
      expect(ctaButton).toHaveClass('hover:bg-red-700', 'hover:scale-105');
    });

    it('should have transition effects', () => {
      const elementsWithTransitions = document.querySelectorAll('[class*="transition"]');
      expect(elementsWithTransitions.length).toBeGreaterThan(0);
    });

    it('should have transform effects', () => {
      const elementsWithTransforms = document.querySelectorAll('[class*="transform"]');
      expect(elementsWithTransforms.length).toBeGreaterThan(0);
    });
  });

  describe('Content Validation', () => {
    it('should mention Morocco in the content', () => {
      expect(screen.getByText(/Maroc/i)).toBeInTheDocument();
    });

    it('should have French language content', () => {
      expect(screen.getByText(/Comment ça marche/i)).toBeInTheDocument();
      expect(screen.getByText(/Recherchez/i)).toBeInTheDocument();
      expect(screen.getByText(/Connectez/i)).toBeInTheDocument();
      expect(screen.getByText(/Confirmez/i)).toBeInTheDocument();
      expect(screen.getByText(/Transportez/i)).toBeInTheDocument();
    });

    it('should have meaningful step descriptions', () => {
      const stepDescriptions = [
        /Trouvez un transporteur sur votre trajet/,
        /Échangez directement avec les autres membres/,
        /Validez les détails du transport/,
        /Effectuez le transport en toute sécurité/
      ];

      stepDescriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument();
      });
    });

    it('should have logical step progression', () => {
      const steps = [
        '1. Recherchez',
        '2. Connectez',
        '3. Confirmez',
        '4. Transportez'
      ];
      
      steps.forEach((step, index) => {
        const stepElement = screen.getByText(step);
        expect(stepElement).toBeInTheDocument();
        expect(stepElement.textContent).toContain((index + 1).toString());
      });
    });

    it('should have clear action-oriented step titles', () => {
      const actionVerbs = ['Recherchez', 'Connectez', 'Confirmez', 'Transportez'];
      actionVerbs.forEach(verb => {
        expect(screen.getByText(new RegExp(verb))).toBeInTheDocument();
      });
    });
  });

  describe('Visual Effects', () => {
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

    it('should have proper spacing between elements', () => {
      const elementsWithMargin = document.querySelectorAll('[class*="mb-"], [class*="mt-"]');
      expect(elementsWithMargin.length).toBeGreaterThan(0);
    });

    it('should have consistent color scheme', () => {
      const colorClasses = [
        'bg-blue-100', 'text-blue-600',
        'bg-green-100', 'text-green-600',
        'bg-purple-100', 'text-purple-600',
        'bg-red-100', 'text-red-600'
      ];
      
      colorClasses.forEach(colorClass => {
        const elements = document.querySelectorAll(`.${colorClass}`);
        expect(elements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Step Flow Logic', () => {
    it('should have a logical progression from search to transport', () => {
      const stepOrder = [
        'Recherchez',
        'Connectez',
        'Confirmez',
        'Transportez'
      ];
      
      stepOrder.forEach((step, index) => {
        const stepElement = screen.getByText(new RegExp(`${index + 1}\\. ${step}`));
        expect(stepElement).toBeInTheDocument();
      });
    });

    it('should cover the complete user journey', () => {
      const userJourney = [
        /Recherchez.*transporteur.*annonce/,
        /Connectez.*membres.*messagerie/,
        /Confirmez.*détails.*réservation/,
        /Transportez.*sécurité.*garantie/
      ];
      
      userJourney.forEach(step => {
        expect(screen.getByText(step)).toBeInTheDocument();
      });
    });
  });
});

