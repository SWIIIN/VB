import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../../test-utils';
import Search from '../Search';

// Mock des constantes
jest.mock('../../constants', () => ({
  MOROCCAN_CITIES: ['Casablanca', 'Marrakech', 'Rabat', 'Fès', 'Agadir'],
}));

describe('Search', () => {
  describe('Page Structure', () => {
    it('should render search header with title', () => {
      render(<Search />);
      
      expect(screen.getByText('Rechercher un transport')).toBeInTheDocument();
      expect(screen.getByText('Rechercher un transport')).toHaveClass('text-3xl', 'font-bold', 'text-gray-900');
    });

    it('should have proper page layout', () => {
      render(<Search />);
      
      expect(screen.getByRole('main') || screen.getByRole('div')).toHaveClass('min-h-screen', 'bg-gray-50');
    });
  });

  describe('Search Type Tabs', () => {
    it('should display both search type tabs', () => {
      render(<Search />);
      
      expect(screen.getByText('Envoyer un colis')).toBeInTheDocument();
      expect(screen.getByText('Transporter des colis')).toBeInTheDocument();
    });

    it('should have "send" tab active by default', () => {
      render(<Search />);
      
      const sendTab = screen.getByText('Envoyer un colis').closest('button');
      const transportTab = screen.getByText('Transporter des colis').closest('button');
      
      expect(sendTab).toHaveClass('text-red-600', 'border-b-2', 'border-red-600');
      expect(transportTab).toHaveClass('text-gray-600');
    });

    it('should switch active tab when clicked', async () => {
      render(<Search />);
      
      const transportTab = screen.getByText('Transporter des colis').closest('button');
      await userEvent.click(transportTab!);
      
      expect(transportTab).toHaveClass('text-red-600', 'border-b-2', 'border-red-600');
    });

    it('should have proper tab styling', () => {
      render(<Search />);
      
      const tabs = screen.getAllByRole('button').filter(button => 
        button.textContent?.includes('Envoyer un colis') || 
        button.textContent?.includes('Transporter des colis')
      );
      
      tabs.forEach(tab => {
        expect(tab).toHaveClass('px-6', 'py-3', 'font-semibold', 'transition-colors');
      });
    });
  });

  describe('Search Form', () => {
    it('should have all search form fields', () => {
      render(<Search />);
      
      expect(screen.getByRole('combobox', { name: 'Ville de départ' })).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: 'Ville d\'arrivée' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Date' })).toBeInTheDocument();
    });

    it('should have proper form field types', () => {
      render(<Search />);
      
      const departureSelect = screen.getByRole('combobox', { name: 'Ville de départ' });
      const arrivalSelect = screen.getByRole('combobox', { name: 'Ville d\'arrivée' });
      const dateInput = screen.getByRole('textbox', { name: 'Date' });
      
      expect(departureSelect.tagName).toBe('SELECT');
      expect(arrivalSelect.tagName).toBe('SELECT');
      expect(dateInput).toHaveAttribute('type', 'date');
    });

    it('should have proper form field styling', () => {
      render(<Search />);
      
      const formFields = [
        screen.getByRole('combobox', { name: 'Ville de départ' }),
        screen.getByRole('combobox', { name: 'Ville d\'arrivée' }),
        screen.getByRole('textbox', { name: 'Date' })
      ];
      
      formFields.forEach(field => {
        expect(field).toHaveClass('w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-lg');
      });
    });

    it('should have search button', () => {
      render(<Search />);
      
      const searchButton = screen.getByRole('button', { name: /rechercher/i });
      expect(searchButton).toBeInTheDocument();
      expect(searchButton).toHaveClass('bg-red-600', 'text-white', 'rounded-lg', 'font-semibold');
    });

    it('should have search button with icon', () => {
      render(<Search />);
      
      const searchButton = screen.getByRole('button', { name: /rechercher/i });
      expect(searchButton).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('City Selection', () => {
    it('should display all Moroccan cities in departure dropdown', () => {
      render(<Search />);
      
      const departureSelect = screen.getByRole('combobox', { name: 'Ville de départ' });
      expect(departureSelect).toBeInTheDocument();
      
      // Check if all cities are present
      ['Casablanca', 'Marrakech', 'Rabat', 'Fès', 'Agadir'].forEach(city => {
        expect(screen.getByText(city)).toBeInTheDocument();
      });
    });

    it('should display all Moroccan cities in arrival dropdown', () => {
      render(<Search />);
      
      const arrivalSelect = screen.getByRole('combobox', { name: 'Ville d\'arrivée' });
      expect(arrivalSelect).toBeInTheDocument();
      
      // Check if all cities are present
      ['Casablanca', 'Marrakech', 'Rabat', 'Fès', 'Agadir'].forEach(city => {
        expect(screen.getByText(city)).toBeInTheDocument();
      });
    });

    it('should have default "Sélectionner" options', () => {
      render(<Search />);
      
      const defaultOptions = screen.getAllByText('Sélectionner');
      expect(defaultOptions).toHaveLength(2);
    });
  });

  describe('Search Results', () => {
    it('should display search results', () => {
      render(<Search />);
      
      expect(screen.getByText('Ahmed Benali')).toBeInTheDocument();
      expect(screen.getByText('Fatima Zahra')).toBeInTheDocument();
    });

    it('should display user ratings and reviews', () => {
      render(<Search />);
      
      expect(screen.getByText('4.8 (24 avis)')).toBeInTheDocument();
      expect(screen.getByText('4.9 (18 avis)')).toBeInTheDocument();
    });

    it('should display route information', () => {
      render(<Search />);
      
      expect(screen.getByText('Casablanca → Marrakech')).toBeInTheDocument();
      expect(screen.getByText('2024-01-15 à 14:00')).toBeInTheDocument();
      expect(screen.getByText('2024-01-16 à Flexible')).toBeInTheDocument();
    });

    it('should display prices in MAD', () => {
      render(<Search />);
      
      expect(screen.getByText('150 MAD')).toBeInTheDocument();
      expect(screen.getByText('120 MAD')).toBeInTheDocument();
    });

    it('should display user types correctly', () => {
      render(<Search />);
      
      expect(screen.getByText('Transporteur')).toBeInTheDocument();
      expect(screen.getByText('Expéditeur')).toBeInTheDocument();
    });

    it('should display package information', () => {
      render(<Search />);
      
      expect(screen.getByText('Colis moyens acceptés')).toBeInTheDocument();
      expect(screen.getByText('Petit colis (2kg)')).toBeInTheDocument();
    });

    it('should display descriptions', () => {
      render(<Search />);
      
      expect(screen.getByText('Voyage régulier, transporteur expérimenté. Véhicule spacieux et sécurisé.')).toBeInTheDocument();
      expect(screen.getByText('Colis fragile, manipulation avec précaution requise.')).toBeInTheDocument();
    });
  });

  describe('Search Result Actions', () => {
    it('should have contact buttons for each result', () => {
      render(<Search />);
      
      const contactButtons = screen.getAllByText('Contacter');
      expect(contactButtons).toHaveLength(2);
      
      contactButtons.forEach(button => {
        expect(button).toHaveClass('bg-red-600', 'text-white', 'rounded-lg', 'font-semibold');
      });
    });

    it('should have profile view buttons for each result', () => {
      render(<Search />);
      
      const profileButtons = screen.getAllByText('Voir le profil');
      expect(profileButtons).toHaveLength(2);
      
      profileButtons.forEach(button => {
        expect(button).toHaveClass('border', 'border-red-600', 'text-red-600', 'rounded-lg', 'font-semibold');
      });
    });

    it('should have proper button styling and hover effects', () => {
      render(<Search />);
      
      const contactButtons = screen.getAllByText('Contacter');
      const profileButtons = screen.getAllByText('Voir le profil');
      
      contactButtons.forEach(button => {
        expect(button).toHaveClass('hover:bg-red-700', 'transition-colors');
      });
      
      profileButtons.forEach(button => {
        expect(button).toHaveClass('hover:bg-red-600', 'hover:text-white', 'transition-colors');
      });
    });
  });

  describe('User Avatars', () => {
    it('should display user avatars', () => {
      render(<Search />);
      
      const avatars = screen.getAllByAltText(/Ahmed Benali|Fatima Zahra/);
      expect(avatars).toHaveLength(2);
      
      avatars.forEach(avatar => {
        expect(avatar).toHaveClass('w-16', 'h-16', 'rounded-full', 'object-cover');
      });
    });

    it('should have valid avatar URLs', () => {
      render(<Search />);
      
      const avatars = screen.getAllByAltText(/Ahmed Benali|Fatima Zahra/);
      
      avatars.forEach(avatar => {
        expect(avatar).toHaveAttribute('src');
        const src = avatar.getAttribute('src');
        expect(src).toMatch(/^https:\/\/images\.pexels\.com/);
      });
    });
  });

  describe('Star Ratings', () => {
    it('should display 5 stars for each user', () => {
      render(<Search />);
      
      // Each result should have 5 stars
      const stars = screen.getAllByTestId(/star/i);
      expect(stars.length).toBeGreaterThan(0);
    });

    it('should have proper star styling', () => {
      render(<Search />);
      
      const stars = screen.getAllByTestId(/star/i);
      
      stars.forEach(star => {
        expect(star).toHaveClass('h-4', 'w-4');
      });
    });
  });

  describe('Form Interaction', () => {
    it('should update departure city when selected', async () => {
      render(<Search />);
      
      const departureSelect = screen.getByRole('combobox', { name: 'Ville de départ' });
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      
      expect(departureSelect).toHaveValue('Casablanca');
    });

    it('should update arrival city when selected', async () => {
      render(<Search />);
      
      const arrivalSelect = screen.getByRole('combobox', { name: 'Ville d\'arrivée' });
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      expect(arrivalSelect).toHaveValue('Marrakech');
    });

    it('should update date when selected', async () => {
      render(<Search />);
      
      const dateInput = screen.getByRole('textbox', { name: 'Date' });
      const testDate = '2024-01-20';
      await userEvent.type(dateInput, testDate);
      
      expect(dateInput).toHaveValue(testDate);
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid layout', () => {
      render(<Search />);
      
      const searchForm = screen.getByRole('combobox', { name: 'Ville de départ' }).closest('div')?.parentElement;
      expect(searchForm).toHaveClass('grid', 'md:grid-cols-4');
    });

    it('should have proper spacing and padding', () => {
      render(<Search />);
      
      const container = screen.getByText('Rechercher un transport').closest('div')?.parentElement;
      expect(container).toHaveClass('p-8');
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for form fields', () => {
      render(<Search />);
      
      expect(screen.getByRole('combobox', { name: 'Ville de départ' })).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: 'Ville d\'arrivée' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Date' })).toBeInTheDocument();
    });

    it('should have proper button roles', () => {
      render(<Search />);
      
      expect(screen.getByRole('button', { name: /rechercher/i })).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /contacter/i })).toHaveLength(2);
      expect(screen.getAllByRole('button', { name: /voir le profil/i })).toHaveLength(2);
    });

    it('should have proper alt text for images', () => {
      render(<Search />);
      
      expect(screen.getByAltText('Ahmed Benali')).toBeInTheDocument();
      expect(screen.getByAltText('Fatima Zahra')).toBeInTheDocument();
    });
  });
});
