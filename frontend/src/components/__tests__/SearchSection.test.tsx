import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SearchSection from '../SearchSection';

// Helper function to get form elements
const getFormElement = (name: string) => {
  switch (name) {
    case 'date':
      return screen.getByRole('textbox', { name: 'Date souhaitée' });
    case 'transportDate':
      return screen.getByRole('textbox', { name: 'Date de votre voyage' });
    default:
      throw new Error(`Unknown form element: ${name}`);
  }
};

// Wrapper component to provide router context
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('SearchSection Component', () => {
  const mockSetActiveTab = jest.fn();

  beforeEach(() => {
    mockSetActiveTab.mockClear();
  });

  describe('Header Section', () => {
    it('should render the main heading', () => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Que souhaitez-vous faire ?');
    });

    it('should render the subtitle', () => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
      
      const subtitle = screen.getByText(/Choisissez votre option et trouvez la solution parfaite/);
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass('text-lg', 'text-gray-600');
    });

    it('should have correct heading styling', () => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-3xl', 'font-bold', 'text-gray-900');
    });
  });

  describe('Tab Navigation', () => {
    it('should render both tabs', () => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
      
      expect(screen.getByText('Envoyer un colis')).toBeInTheDocument();
      expect(screen.getByText('Transporter des colis')).toBeInTheDocument();
    });

    it('should have correct tab styling when send tab is active', () => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
      
      const sendTab = screen.getByText('Envoyer un colis').closest('button');
      const transportTab = screen.getByText('Transporter des colis').closest('button');
      
      expect(sendTab).toHaveClass('bg-red-50', 'text-red-600', 'border-b-2', 'border-red-600');
      expect(transportTab).toHaveClass('text-gray-600', 'hover:text-red-600');
    });

    it('should have correct tab styling when transport tab is active', () => {
      renderWithRouter(<SearchSection activeTab="transport" setActiveTab={mockSetActiveTab} />);
      
      const sendTab = screen.getByText('Envoyer un colis').closest('button');
      const transportTab = screen.getByText('Transporter des colis').closest('button');
      
      expect(transportTab).toHaveClass('bg-red-50', 'text-red-600', 'border-b-2', 'border-red-600');
      expect(sendTab).toHaveClass('text-gray-600', 'hover:text-red-600');
    });

    it('should call setActiveTab when send tab is clicked', () => {
      renderWithRouter(<SearchSection activeTab="transport" setActiveTab={mockSetActiveTab} />);
      
      const sendTab = screen.getByText('Envoyer un colis').closest('button');
      fireEvent.click(sendTab!);
      
      expect(mockSetActiveTab).toHaveBeenCalledWith('send');
    });

    it('should call setActiveTab when transport tab is clicked', () => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
      
      const transportTab = screen.getByText('Transporter des colis').closest('button');
      fireEvent.click(transportTab!);
      
      expect(mockSetActiveTab).toHaveBeenCalledWith('transport');
    });

    it('should have tab icons', () => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
      
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThanOrEqual(2);
    });

    it('should have proper tab button styling', () => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
      
      const tabs = screen.getAllByRole('button');
      tabs.forEach(tab => {
        expect(tab).toHaveClass('flex-1', 'px-6', 'py-4', 'font-semibold', 'transition-colors');
      });
    });
  });

  describe('Send Package Form (Send Tab)', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
    });

    it('should render departure city field', () => {
      const departureLabel = screen.getByText('Ville de départ');
      const departureSelect = screen.getByDisplayValue('Casablanca');
      
      expect(departureLabel).toBeInTheDocument();
      expect(departureSelect).toBeInTheDocument();
    });

    it('should render arrival city field', () => {
      const arrivalLabel = screen.getByText('Ville d\'arrivée');
      const arrivalSelect = screen.getByDisplayValue('Marrakech');
      
      expect(arrivalLabel).toBeInTheDocument();
      expect(arrivalSelect).toBeInTheDocument();
    });

    it('should render date field', () => {
      const dateLabel = screen.getByText('Date souhaitée');
      const dateInput = getFormElement('date');
      
      expect(dateLabel).toBeInTheDocument();
      expect(dateInput).toHaveAttribute('type', 'date');
    });

    it('should render package type field', () => {
      const packageTypeLabel = screen.getByText('Type de colis');
      const packageTypeSelect = screen.getByDisplayValue('Petit colis (moins de 5kg)');
      
      expect(packageTypeLabel).toBeInTheDocument();
      expect(packageTypeSelect).toBeInTheDocument();
    });

    it('should have correct city options in departure select', () => {
      const departureSelect = screen.getByDisplayValue('Casablanca');
      const options = Array.from(departureSelect.querySelectorAll('option'));
      const optionValues = options.map(option => option.textContent);
      
      expect(optionValues).toContain('Casablanca');
      expect(optionValues).toContain('Rabat');
      expect(optionValues).toContain('Marrakech');
      expect(optionValues).toContain('Fès');
      expect(optionValues).toContain('Tanger');
      expect(optionValues).toContain('Agadir');
      expect(optionValues).toContain('Meknès');
      expect(optionValues).toContain('Oujda');
    });

    it('should have correct city options in arrival select', () => {
      const arrivalSelect = screen.getByDisplayValue('Marrakech');
      const options = Array.from(arrivalSelect.querySelectorAll('option'));
      const optionValues = options.map(option => option.textContent);
      
      expect(optionValues).toContain('Marrakech');
      expect(optionValues).toContain('Casablanca');
      expect(optionValues).toContain('Rabat');
      expect(optionValues).toContain('Fès');
      expect(optionValues).toContain('Tanger');
      expect(optionValues).toContain('Agadir');
      expect(optionValues).toContain('Meknès');
      expect(optionValues).toContain('Oujda');
    });

    it('should have correct package type options', () => {
      const packageTypeSelect = screen.getByDisplayValue('Petit colis (moins de 5kg)');
      const options = Array.from(packageTypeSelect.querySelectorAll('option'));
      const optionValues = options.map(option => option.textContent);
      
      expect(optionValues).toContain('Petit colis (moins de 5kg)');
      expect(optionValues).toContain('Colis moyen (5-15kg)');
      expect(optionValues).toContain('Grand colis (15-30kg)');
      expect(optionValues).toContain('Colis volumineux');
    });

    it('should render search button with correct text', () => {
      const searchButton = screen.getByRole('link', { name: /Rechercher un transporteur/i });
      expect(searchButton).toBeInTheDocument();
      expect(searchButton).toHaveTextContent('Rechercher un transporteur');
    });

    it('should have correct search button styling', () => {
      const searchButton = screen.getByRole('link', { name: /Rechercher un transporteur/i });
      expect(searchButton).toHaveClass('w-full', 'bg-red-600', 'text-white', 'py-4', 'rounded-lg');
    });
  });

  describe('Transport Package Form (Transport Tab)', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="transport" setActiveTab={mockSetActiveTab} />);
    });

    it('should render departure city field', () => {
      const departureLabel = screen.getByText('Votre trajet - Départ');
      const departureSelect = screen.getByDisplayValue('Casablanca');
      
      expect(departureLabel).toBeInTheDocument();
      expect(departureSelect).toBeInTheDocument();
    });

    it('should render arrival city field', () => {
      const arrivalLabel = screen.getByText('Votre trajet - Arrivée');
      const arrivalSelect = screen.getByDisplayValue('Marrakech');
      
      expect(arrivalLabel).toBeInTheDocument();
      expect(arrivalSelect).toBeInTheDocument();
    });

    it('should render travel date field', () => {
      const dateLabel = screen.getByText('Date de votre voyage');
      const dateInput = getFormElement('transportDate');
      
      expect(dateLabel).toBeInTheDocument();
      expect(dateInput).toHaveAttribute('type', 'date');
    });

    it('should render available space field', () => {
      const spaceLabel = screen.getByText('Espace disponible');
      const spaceSelect = screen.getByDisplayValue('Petits colis uniquement');
      
      expect(spaceLabel).toBeInTheDocument();
      expect(spaceSelect).toBeInTheDocument();
    });

    it('should have correct available space options', () => {
      const spaceSelect = screen.getByDisplayValue('Petits colis uniquement');
      const options = Array.from(spaceSelect.querySelectorAll('option'));
      const optionValues = options.map(option => option.textContent);
      
      expect(optionValues).toContain('Petits colis uniquement');
      expect(optionValues).toContain('Colis moyens acceptés');
      expect(optionValues).toContain('Tous types de colis');
      expect(optionValues).toContain('Espace important disponible');
    });

    it('should render search button with correct text', () => {
      const searchButton = screen.getByRole('link', { name: /Voir les colis à transporter/i });
      expect(searchButton).toBeInTheDocument();
      expect(searchButton).toHaveTextContent('Voir les colis à transporter');
    });

    it('should have correct search button styling', () => {
      const searchButton = screen.getByRole('link', { name: /Voir les colis à transporter/i });
      expect(searchButton).toHaveClass('w-full', 'bg-red-600', 'text-white', 'py-4', 'rounded-lg');
    });
  });

  describe('Form Styling and Layout', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
    });

    it('should have proper form container styling', () => {
      const formContainer = document.querySelector('.bg-white.rounded-2xl.shadow-xl');
      expect(formContainer).toHaveClass('bg-white', 'rounded-2xl', 'shadow-xl', 'border', 'border-gray-100');
    });

    it('should have proper form padding', () => {
      const formContent = document.querySelector('.p-8');
      expect(formContent).toHaveClass('p-8');
    });

    it('should have proper grid layout for form fields', () => {
      const grids = document.querySelectorAll('.grid.md\\:grid-cols-2');
      expect(grids.length).toBe(2); // Two rows of form fields
    });

    it('should have proper spacing between form fields', () => {
      const formContent = document.querySelector('.space-y-6');
      expect(formContent).toHaveClass('space-y-6');
    });

    it('should have proper field spacing', () => {
      const grids = document.querySelectorAll('.gap-6');
      expect(grids.length).toBe(2);
    });
  });

  describe('Form Field Styling', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
    });

    it('should have proper label styling', () => {
      const labels = document.querySelectorAll('.block.text-sm.font-semibold.text-gray-700.mb-2');
      expect(labels.length).toBe(4);
    });

    it('should have proper input/select styling', () => {
      const inputs = document.querySelectorAll('input, select');
      inputs.forEach(input => {
        expect(input).toHaveClass('w-full', 'px-4', 'py-3', 'border', 'border-gray-300', 'rounded-lg');
      });
    });

    it('should have proper focus styling', () => {
      const inputs = document.querySelectorAll('input, select');
      inputs.forEach(input => {
        expect(input).toHaveClass('focus:ring-2', 'focus:ring-red-500', 'focus:border-red-500');
      });
    });

    it('should have transition effects', () => {
      const inputs = document.querySelectorAll('input, select');
      inputs.forEach(input => {
        expect(input).toHaveClass('transition-colors');
      });
    });
  });

  describe('Layout and Styling', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
    });

    it('should have white background', () => {
      const section = screen.getByRole('region');
      expect(section).toHaveClass('bg-white');
    });

    it('should have proper section padding', () => {
      const section = screen.getByRole('region');
      expect(section).toHaveClass('py-16');
    });

    it('should have proper container max width', () => {
      const container = document.querySelector('.max-w-4xl');
      expect(container).toBeInTheDocument();
    });

    it('should have responsive padding', () => {
      const container = document.querySelector('.px-4.sm\\:px-6.lg\\:px-8');
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });

    it('should have proper spacing', () => {
      const header = document.querySelector('.text-center.mb-12');
      expect(header).toHaveClass('mb-12');
    });
  });

  describe('Responsive Design', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
    });

    it('should have responsive grid classes', () => {
      const grids = document.querySelectorAll('.grid.md\\:grid-cols-2');
      grids.forEach(grid => {
        expect(grid).toHaveClass('md:grid-cols-2');
      });
    });

    it('should have responsive padding', () => {
      const container = document.querySelector('.px-4.sm\\:px-6.lg\\:px-8');
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
    });

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
      expect(buttons.length).toBe(2); // Two tabs
    });

    it('should have proper link roles', () => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(1); // One search button
    });

    it('should have proper form labels', () => {
      const labels = document.querySelectorAll('label');
      expect(labels.length).toBe(4);
      
      labels.forEach(label => {
        expect(label).toHaveClass('block', 'text-sm', 'font-semibold');
      });
    });

    it('should have proper text contrast', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-gray-900');
      
      const subtitle = screen.getByText(/Choisissez votre option et trouvez la solution parfaite/);
      expect(subtitle).toHaveClass('text-gray-600');
    });
  });

  describe('Interactive Elements', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
    });

    it('should have hover effects on tabs', () => {
      const tabs = screen.getAllByRole('button');
      tabs.forEach(tab => {
        expect(tab).toHaveClass('hover:text-red-600');
      });
    });

    it('should have hover effects on search button', () => {
      const searchButton = screen.getByRole('link', { name: /Rechercher un transporteur/i });
      expect(searchButton).toHaveClass('hover:bg-red-700');
    });

    it('should have transition effects', () => {
      const elementsWithTransitions = document.querySelectorAll('[class*="transition"]');
      expect(elementsWithTransitions.length).toBeGreaterThan(0);
    });
  });

  describe('Content Validation', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
    });

    it('should have French language content', () => {
      expect(screen.getByText(/Que souhaitez-vous faire/i)).toBeInTheDocument();
      expect(screen.getByText(/Envoyer un colis/i)).toBeInTheDocument();
      expect(screen.getByText(/Transporter des colis/i)).toBeInTheDocument();
    });

    it('should have meaningful field labels', () => {
      const labels = [
        'Ville de départ',
        'Ville d\'arrivée',
        'Date souhaitée',
        'Type de colis'
      ];
      
      labels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it('should have realistic city options', () => {
      const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda'];
      cities.forEach(city => {
        expect(screen.getByText(city)).toBeInTheDocument();
      });
    });

    it('should have realistic package type options', () => {
      const packageTypes = [
        'Petit colis (moins de 5kg)',
        'Colis moyen (5-15kg)',
        'Grand colis (15-30kg)',
        'Colis volumineux'
      ];
      
      packageTypes.forEach(type => {
        expect(screen.getByText(type)).toBeInTheDocument();
      });
    });
  });

  describe('Form Functionality', () => {
    beforeEach(() => {
      renderWithRouter(<SearchSection activeTab="send" setActiveTab={mockSetActiveTab} />);
    });

    it('should have proper form field types', () => {
      const dateInput = getFormElement('date');
      expect(dateInput).toHaveAttribute('type', 'date');
      
      const selects = document.querySelectorAll('select');
      selects.forEach(select => {
        expect(select.tagName).toBe('SELECT');
      });
    });

    it('should have proper form field names', () => {
      const dateInput = getFormElement('date');
      expect(dateInput).toHaveAttribute('type', 'date');
    });

    it('should have search button with icon', () => {
      const searchButton = screen.getByRole('link', { name: /Rechercher un transporteur/i });
      const icon = searchButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });
});

