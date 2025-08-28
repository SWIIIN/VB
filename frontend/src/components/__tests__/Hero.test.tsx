import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Hero from '../Hero';

// Wrapper pour les composants qui utilisent React Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Hero Component', () => {
  beforeEach(() => {
    renderWithRouter(<Hero />);
  });

  describe('Main Content', () => {
    it('renders hero section with main heading', () => {
      expect(screen.getByText(/Transportez et expédiez vos/)).toBeInTheDocument();
      expect(screen.getByText(/colis facilement/)).toBeInTheDocument();
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent(/au Maroc/);
    });

    it('displays the main description', () => {
      expect(screen.getByText(/Connectez-vous avec des voyageurs/)).toBeInTheDocument();
      expect(screen.getByText(/Économique, rapide et sécurisé/)).toBeInTheDocument();
    });

    it('has correct heading hierarchy', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(1);
      
      const mainHeading = headings[0];
      expect(mainHeading.tagName).toBe('H1');
    });

    it('has proper heading styling', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-4xl', 'lg:text-6xl', 'font-bold');
    });
  });

  describe('Call to Action Buttons', () => {
    it('shows call-to-action buttons', () => {
      expect(screen.getByText('Publier une annonce')).toBeInTheDocument();
      expect(screen.getByText('Trouver un transporteur')).toBeInTheDocument();
    });

    it('has correct link destinations', () => {
      const publishButton = screen.getByText('Publier une annonce').closest('a');
      const searchButton = screen.getByText('Trouver un transporteur').closest('a');
      
      expect(publishButton).toHaveAttribute('href', '/publier-annonce');
      expect(searchButton).toHaveAttribute('href', '/rechercher');
    });

    it('has proper button styling', () => {
      const publishButton = screen.getByText('Publier une annonce').closest('a');
      const searchButton = screen.getByText('Trouver un transporteur').closest('a');
      
      expect(publishButton).toHaveClass('bg-red-600', 'text-white', 'px-8', 'py-4', 'rounded-xl');
      expect(searchButton).toHaveClass('border-2', 'border-red-600', 'text-red-600', 'px-8', 'py-4', 'rounded-xl');
    });

    it('has hover effects on buttons', () => {
      const publishButton = screen.getByText('Publier une annonce').closest('a');
      const searchButton = screen.getByText('Trouver un transporteur').closest('a');
      
      expect(publishButton).toHaveClass('hover:bg-red-700');
      expect(searchButton).toHaveClass('hover:bg-red-600', 'hover:text-white');
    });

    it('has transition effects on buttons', () => {
      const buttons = document.querySelectorAll('a[href]');
      buttons.forEach(button => {
        expect(button).toHaveClass('transition-all', 'duration-300');
      });
    });
  });

  describe('User Satisfaction Information', () => {
    it('displays user satisfaction information', () => {
      expect(screen.getByText(/Plus de 50,000 utilisateurs satisfaits/)).toBeInTheDocument();
    });

    it('has proper satisfaction text styling', () => {
      const satisfactionText = screen.getByText(/Plus de 50,000 utilisateurs satisfaits/);
      expect(satisfactionText).toHaveClass('text-lg', 'text-gray-600');
    });

    it('has realistic user count', () => {
      expect(screen.getByText(/50,000/)).toBeInTheDocument();
    });
  });

  describe('Package Example Section', () => {
    it('shows package example with cities', () => {
      expect(screen.getByText('Casablanca')).toBeInTheDocument();
      expect(screen.getByText('Marrakech')).toBeInTheDocument();
      expect(screen.getByText('Départ')).toBeInTheDocument();
      expect(screen.getByText('Arrivée')).toBeInTheDocument();
    });

    it('displays package details', () => {
      expect(screen.getByText('Prix suggéré')).toBeInTheDocument();
      expect(screen.getByText('150 MAD')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Aujourd\'hui')).toBeInTheDocument();
    });

    it('shows discount badge', () => {
      expect(screen.getByText('-60%')).toBeInTheDocument();
    });

    it('displays transport confirmation status', () => {
      expect(screen.getByText('Transport confirmé')).toBeInTheDocument();
    });

    it('has proper package card styling', () => {
      const packageCard = document.querySelector('.bg-white.rounded-2xl.shadow-xl');
      expect(packageCard).toHaveClass('bg-white', 'rounded-2xl', 'shadow-xl', 'border', 'border-gray-100');
    });

    it('has proper package card padding', () => {
      const packageCard = document.querySelector('.p-6');
      expect(packageCard).toHaveClass('p-6');
    });

    it('has proper city labels styling', () => {
      const cityLabels = document.querySelectorAll('.text-sm.font-semibold.text-gray-500');
      expect(cityLabels.length).toBe(2); // Départ and Arrivée
    });

    it('has proper city names styling', () => {
      const cityNames = document.querySelectorAll('.text-lg.font-bold.text-gray-900');
      expect(cityNames.length).toBe(2); // Casablanca and Marrakech
    });

    it('has proper price styling', () => {
      const price = screen.getByText('150 MAD');
      expect(price).toHaveClass('text-2xl', 'font-bold', 'text-green-600');
    });

    it('has proper discount badge styling', () => {
      const discountBadge = screen.getByText('-60%');
      expect(discountBadge).toHaveClass('bg-red-500', 'text-white', 'text-sm', 'font-bold');
    });

    it('has proper status styling', () => {
      const status = screen.getByText('Transport confirmé');
      expect(status).toHaveClass('bg-green-100', 'text-green-800', 'text-sm', 'font-semibold');
    });
  });

  describe('Layout and Styling', () => {
    it('applies correct styling classes', () => {
      const heroSection = screen.getByText(/Transportez et expédiez vos/).closest('section');
      expect(heroSection).toHaveClass('bg-gradient-to-br', 'from-red-50', 'via-orange-50', 'to-yellow-50');
    });

    it('has proper section padding', () => {
      const heroSection = screen.getByText(/Transportez et expédiez vos/).closest('section');
      expect(heroSection).toHaveClass('py-20');
    });

    it('has proper container max width', () => {
      const container = document.querySelector('.max-w-7xl');
      expect(container).toBeInTheDocument();
    });

    it('has responsive padding', () => {
      const container = document.querySelector('.px-4.sm\\:px-6.lg\\:px-8');
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });

    it('has proper grid layout', () => {
      const grid = document.querySelector('.grid.lg\\:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-2');
    });

    it('has proper spacing between grid items', () => {
      const grid = document.querySelector('.grid.lg\\:grid-cols-2');
      expect(grid).toHaveClass('gap-12');
    });
  });

  describe('Responsive Design', () => {
    it('has responsive text classes', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-4xl', 'lg:text-6xl');
    });

    it('has responsive grid classes', () => {
      const grid = document.querySelector('.grid.lg\\:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-2');
    });

    it('has responsive padding', () => {
      const container = document.querySelector('.px-4.sm\\:px-6.lg\\:px-8');
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      const section = screen.getByText(/Transportez et expédiez vos/).closest('section');
      expect(section).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(1);
      
      const mainHeading = headings[0];
      expect(mainHeading.tagName).toBe('H1');
    });

    it('has proper link roles', () => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(2);
    });

    it('has descriptive link text', () => {
      const publishButton = screen.getByRole('link', { name: /Publier une annonce/i });
      const searchButton = screen.getByRole('link', { name: /Trouver un transporteur/i });
      
      expect(publishButton.textContent).toBeTruthy();
      expect(searchButton.textContent).toBeTruthy();
    });

    it('has proper text contrast', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-gray-900');
      
      const description = screen.getByText(/Connectez-vous avec des voyageurs/);
      expect(description).toHaveClass('text-gray-600');
    });
  });

  describe('Interactive Elements', () => {
    it('has hover effects on buttons', () => {
      const publishButton = screen.getByText('Publier une annonce').closest('a');
      const searchButton = screen.getByText('Trouver un transporteur').closest('a');
      
      expect(publishButton).toHaveClass('hover:bg-red-700');
      expect(searchButton).toHaveClass('hover:bg-red-600', 'hover:text-white');
    });

    it('has transform effects on buttons', () => {
      const buttons = document.querySelectorAll('a[href]');
      buttons.forEach(button => {
        expect(button).toHaveClass('transform', 'hover:scale-105');
      });
    });

    it('has transition effects', () => {
      const elementsWithTransitions = document.querySelectorAll('[class*="transition"]');
      expect(elementsWithTransitions.length).toBeGreaterThan(0);
    });
  });

  describe('Content Validation', () => {
    it('contains app name or branding', () => {
      // Check if the content mentions the service or has appropriate branding
      const heroContent = screen.getByText(/Transportez et expédiez vos/);
      expect(heroContent).toBeInTheDocument();
    });

    it('mentions Morocco in the content', () => {
      expect(screen.getByText(/Maroc/)).toBeInTheDocument();
    });

    it('has realistic pricing example', () => {
      expect(screen.getByText('150 MAD')).toBeInTheDocument();
    });

    it('has realistic discount', () => {
      expect(screen.getByText('-60%')).toBeInTheDocument();
    });

    it('has French language content', () => {
      expect(screen.getByText(/Transportez et expédiez/i)).toBeInTheDocument();
      expect(screen.getByText(/colis facilement/i)).toBeInTheDocument();
      expect(screen.getByText(/Publier une annonce/i)).toBeInTheDocument();
    });

    it('has meaningful call to action text', () => {
      expect(screen.getByText(/Publier une annonce/i)).toBeInTheDocument();
      expect(screen.getByText(/Trouver un transporteur/i)).toBeInTheDocument();
    });
  });

  describe('Visual Effects', () => {
    it('has gradient background', () => {
      const heroSection = screen.getByText(/Transportez et expédiez vos/).closest('section');
      expect(heroSection).toHaveClass('bg-gradient-to-br');
    });

    it('has shadow effects on package card', () => {
      const packageCard = document.querySelector('.shadow-xl');
      expect(packageCard).toHaveClass('shadow-xl');
    });

    it('has rounded corners on package card', () => {
      const packageCard = document.querySelector('.rounded-2xl');
      expect(packageCard).toHaveClass('rounded-2xl');
    });

    it('has proper spacing between elements', () => {
      const elementsWithMargin = document.querySelectorAll('[class*="mb-"], [class*="mt-"]');
      expect(elementsWithMargin.length).toBeGreaterThan(0);
    });
  });

  describe('Package Example Details', () => {
    it('has proper package information layout', () => {
      const packageInfo = document.querySelector('.space-y-4');
      expect(packageInfo).toHaveClass('space-y-4');
    });

    it('has proper package grid layout', () => {
      const packageGrid = document.querySelector('.grid.grid-cols-2.gap-4');
      expect(packageGrid).toHaveClass('grid', 'grid-cols-2', 'gap-4');
    });

    it('has proper badge positioning', () => {
      const discountBadge = screen.getByText('-60%');
      const badgeContainer = discountBadge.closest('.absolute');
      expect(badgeContainer).toHaveClass('absolute', '-top-2', '-right-2');
    });

    it('has proper status positioning', () => {
      const status = screen.getByText('Transport confirmé');
      const statusContainer = status.closest('.absolute');
      expect(statusContainer).toHaveClass('absolute', 'bottom-2', 'right-2');
    });
  });
});

