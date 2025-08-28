import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithAuth } from '../../test-utils';
import AnnouncementForm from '../AnnouncementForm';
import { MOROCCAN_CITIES, PACKAGE_TYPES, APP_LIMITS, ERROR_MESSAGES } from '../../constants';

// Helper function to get form elements
const getFormElement = (name: string) => {
  switch (name) {
    case 'title':
      return screen.getByDisplayValue(''); // title input
    case 'description':
      return screen.getByDisplayValue(''); // description textarea
    case 'departure':
      return screen.getByRole('combobox', { name: 'Ville de départ *' });
    case 'arrival':
      return screen.getByRole('combobox', { name: 'Ville d\'arrivée *' });
    case 'date':
      return screen.getByDisplayValue(''); // date input
    case 'packageType':
      return screen.getByRole('combobox', { name: 'Type de colis *' });
    case 'weight':
      return screen.getByDisplayValue(''); // weight input
    case 'price':
      return screen.getByDisplayValue(''); // price input
    case 'contactPhone':
      return screen.getByDisplayValue(''); // phone input
    default:
      throw new Error(`Unknown form element: ${name}`);
  }
};

// Mock des fonctions
const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();

const defaultProps = {
  isOpen: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
};

// Mock des constantes
jest.mock('../../constants', () => ({
  MOROCCAN_CITIES: ['Casablanca', 'Marrakech', 'Rabat', 'Fès', 'Agadir'],
  PACKAGE_TYPES: [
    { value: 'small', label: 'Petit colis (0-5kg)' },
    { value: 'medium', label: 'Colis moyen (5-15kg)' },
    { value: 'large', label: 'Gros colis (15-30kg)' },
  ],
  APP_LIMITS: {
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_PACKAGE_WEIGHT: 50,
    MAX_PACKAGE_DIMENSIONS: 200,
  },
  ERROR_MESSAGES: {
    REQUIRED_FIELD: 'Ce champ est requis',
  },
}));

describe('AnnouncementForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Modal Visibility', () => {
    it('should not render when isOpen is false', () => {
      render(<AnnouncementForm {...defaultProps} isOpen={false} />);
      expect(screen.queryByText('Créer une annonce')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(<AnnouncementForm {...defaultProps} />);
      expect(screen.getByText('Créer une annonce')).toBeInTheDocument();
    });
  });

  describe('Modal Header', () => {
    it('should display correct title and subtitle', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      expect(screen.getByText('Créer une annonce')).toBeInTheDocument();
      expect(screen.getByText('Publiez votre demande de transport')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const closeButton = screen.getByRole('button', { name: /fermer/i });
      await userEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should have proper close button styling', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const closeButton = screen.getByRole('button', { name: /fermer/i });
      expect(closeButton).toHaveClass('text-gray-400', 'hover:text-gray-600');
    });
  });

  describe('Form Fields', () => {
    it('should have all required form fields', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Check that all required labels exist
      expect(screen.getByText('Titre de l\'annonce *')).toBeInTheDocument();
      expect(screen.getByText('Description détaillée *')).toBeInTheDocument();
      expect(screen.getByText('Ville de départ *')).toBeInTheDocument();
      expect(screen.getByText('Ville d\'arrivée *')).toBeInTheDocument();
      expect(screen.getByText('Date souhaitée *')).toBeInTheDocument();
      expect(screen.getByText('Type de colis *')).toBeInTheDocument();
      expect(screen.getByText('Poids (kg) *')).toBeInTheDocument();
      expect(screen.getByText('Prix proposé (MAD) *')).toBeInTheDocument();
      expect(screen.getByText('Téléphone de contact *')).toBeInTheDocument();
      
      // Check that all required inputs exist
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // title input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // description textarea
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // date input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // weight input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // price input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // phone input
    });

    it('should have proper input types', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Find inputs by their attributes
      const titleInput = screen.getByDisplayValue(''); // title input
      const dateInput = screen.getByDisplayValue(''); // date input
      const weightInput = screen.getByDisplayValue(''); // weight input
      const priceInput = screen.getByDisplayValue(''); // price input
      const phoneInput = screen.getByDisplayValue(''); // phone input
      
      expect(titleInput).toHaveAttribute('type', 'text');
      expect(dateInput).toHaveAttribute('type', 'date');
      expect(weightInput).toHaveAttribute('type', 'number');
      expect(priceInput).toHaveAttribute('type', 'number');
      expect(phoneInput).toHaveAttribute('type', 'tel');
    });

    it('should have proper placeholders', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      expect(screen.getByPlaceholderText('Ex: Transport urgent Casablanca → Marrakech')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Décrivez votre colis, contraintes particulières, etc.')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ex: 5.5')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ex: 150')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('+212 6XX-XXX-XXX')).toBeInTheDocument();
    });

    it('should have proper labels with required indicators', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const labels = screen.getAllByText(/Titre de l'annonce|Description détaillée|Ville de départ|Ville d'arrivée|Date souhaitée|Type de colis|Poids|Prix proposé|Téléphone de contact/);
      labels.forEach(label => {
        expect(label).toHaveClass('font-semibold', 'text-gray-700');
      });
    });
  });

  describe('Package Type Selection', () => {
    it('should display all package types in dropdown', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Check if all package types are present
      PACKAGE_TYPES.forEach(type => {
        expect(screen.getByText(type.label)).toBeInTheDocument();
      });
      
      // Check that the select element exists
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // select element
    });

    it('should have default "Sélectionner un type" option', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      expect(screen.getByText('Sélectionner un type')).toBeInTheDocument();
    });
  });

  describe('City Selection', () => {
    it('should display all Moroccan cities in departure dropdown', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Check if all cities are present
      MOROCCAN_CITIES.forEach(city => {
        expect(screen.getByText(city)).toBeInTheDocument();
      });
      
      // Check that the departure select element exists
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // departure select
    });

    it('should display all Moroccan cities in arrival dropdown', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Check if all cities are present
      MOROCCAN_CITIES.forEach(city => {
        expect(screen.getByText(city)).toBeInTheDocument();
      });
      
      // Check that the arrival select element exists
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // arrival select
    });

    it('should have default "Sélectionner" options', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const defaultOptions = screen.getAllByText('Sélectionner');
      expect(defaultOptions).toHaveLength(2);
    });
  });

  describe('Dimensions Fields', () => {
    it('should have three dimension input fields', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      expect(screen.getByPlaceholderText('Longueur')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Largeur')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Hauteur')).toBeInTheDocument();
    });

    it('should have proper dimension field labels', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      expect(screen.getByText('Longueur')).toBeInTheDocument();
      expect(screen.getByText('Largeur')).toBeInTheDocument();
      expect(screen.getByText('Hauteur')).toBeInTheDocument();
    });

    it('should have proper dimension field attributes', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const lengthInput = screen.getByPlaceholderText('Longueur');
      const widthInput = screen.getByPlaceholderText('Largeur');
      const heightInput = screen.getByPlaceholderText('Hauteur');
      
      [lengthInput, widthInput, heightInput].forEach(input => {
        expect(input).toHaveAttribute('type', 'number');
        expect(input).toHaveAttribute('min', '1');
        expect(input).toHaveAttribute('max', '100');
        expect(input).toHaveAttribute('step', '1');
      });
    });
  });

  describe('Urgent Transport Option', () => {
    it('should have urgent transport checkbox', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const urgentCheckbox = screen.getByRole('checkbox', { name: /transport urgent/i });
      expect(urgentCheckbox).toBeInTheDocument();
      expect(urgentCheckbox).not.toBeChecked();
    });

    it('should toggle urgent transport when clicked', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const urgentCheckbox = screen.getByRole('checkbox', { name: /transport urgent/i });
      await userEvent.click(urgentCheckbox);
      
      expect(urgentCheckbox).toBeChecked();
    });
  });

  describe('Form Validation', () => {
    it('should show error for empty title', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Ce champ est requis')).toBeInTheDocument();
    });

    it('should show error for empty description', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill title but leave description empty
      const titleInput = screen.getByDisplayValue(''); // title input
      await userEvent.type(titleInput, 'Test Title');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Ce champ est requis')).toBeInTheDocument();
    });

    it('should show error for empty departure city', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields but leave departure empty
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Ville de départ requise')).toBeInTheDocument();
    });

    it('should show error for empty arrival city', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields but leave arrival empty
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Ville d\'arrivée requise')).toBeInTheDocument();
    });

    it('should show error for same departure and arrival cities', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields with same cities
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Casablanca');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Les villes de départ et d\'arrivée doivent être différentes')).toBeInTheDocument();
    });

    it('should show error for empty date', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields but leave date empty
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Date requise')).toBeInTheDocument();
    });

    it('should show error for past date', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields with past date
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const dateInput = getFormElement('date');
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      await userEvent.type(dateInput, yesterday.toISOString().split('T')[0]);
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('La date ne peut pas être dans le passé')).toBeInTheDocument();
    });

    it('should show error for empty package type', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields but leave package type empty
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const dateInput = getFormElement('date');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await userEvent.type(dateInput, tomorrow.toISOString().split('T')[0]);
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Type de colis requis')).toBeInTheDocument();
    });

    it('should show error for invalid weight', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields but leave weight invalid
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const dateInput = getFormElement('date');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await userEvent.type(dateInput, tomorrow.toISOString().split('T')[0]);
      
      const packageTypeSelect = getFormElement('packageType');
      await userEvent.selectOptions(packageTypeSelect, 'small');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Le poids doit être supérieur à 0')).toBeInTheDocument();
    });

    it('should show error for invalid dimensions', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields but leave dimensions invalid
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const dateInput = getFormElement('date');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await userEvent.type(dateInput, tomorrow.toISOString().split('T')[0]);
      
      const packageTypeSelect = getFormElement('packageType');
      await userEvent.selectOptions(packageTypeSelect, 'small');
      
      await userEvent.type(getFormElement('weight'), '5');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Toutes les dimensions doivent être supérieures à 0')).toBeInTheDocument();
    });

    it('should show error for invalid price', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields but leave price invalid
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const dateInput = getFormElement('date');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await userEvent.type(dateInput, tomorrow.toISOString().split('T')[0]);
      
      const packageTypeSelect = getFormElement('packageType');
      await userEvent.selectOptions(packageTypeSelect, 'small');
      
      await userEvent.type(getFormElement('weight'), '5');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Le prix doit être supérieur à 0')).toBeInTheDocument();
    });

    it('should show error for empty contact phone', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill required fields but leave phone empty
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const dateInput = getFormElement('date');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await userEvent.type(dateInput, tomorrow.toISOString().split('T')[0]);
      
      const packageTypeSelect = getFormElement('packageType');
      await userEvent.selectOptions(packageTypeSelect, 'small');
      
      await userEvent.type(getFormElement('weight'), '5');
      await userEvent.type(getFormElement('price'), '150');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Numéro de téléphone requis')).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with correct data on successful submission', async () => {
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill all required fields
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const dateInput = getFormElement('date');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await userEvent.type(dateInput, tomorrow.toISOString().split('T')[0]);
      
      const packageTypeSelect = getFormElement('packageType');
      await userEvent.selectOptions(packageTypeSelect, 'small');
      
      await userEvent.type(getFormElement('weight'), '5');
      await userEvent.type(getFormElement('price'), '150');
      
      await userEvent.type(screen.getByPlaceholderText('Longueur'), '20');
      await userEvent.type(screen.getByPlaceholderText('Largeur'), '15');
      await userEvent.type(screen.getByPlaceholderText('Hauteur'), '10');
      
      await userEvent.type(getFormElement('contactPhone'), '1234567890');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Title',
          description: 'Test Description',
          departure: 'Casablanca',
          arrival: 'Marrakech',
          date: tomorrow.toISOString().split('T')[0],
          packageType: 'small',
          weight: 5,
          dimensions: { length: 20, width: 15, height: 10 },
          price: 150,
          isUrgent: false,
          contactPhone: '1234567890',
        });
      });
    });

    it('should show success message on successful submission', async () => {
      mockOnSubmit.mockResolvedValue(undefined);
      
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill all required fields
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const dateInput = getFormElement('date');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await userEvent.type(dateInput, tomorrow.toISOString().split('T')[0]);
      
      const packageTypeSelect = getFormElement('packageType');
      await userEvent.selectOptions(packageTypeSelect, 'small');
      
      await userEvent.type(getFormElement('weight'), '5');
      await userEvent.type(getFormElement('price'), '150');
      
      await userEvent.type(screen.getByPlaceholderText('Longueur'), '20');
      await userEvent.type(screen.getByPlaceholderText('Largeur'), '15');
      await userEvent.type(screen.getByPlaceholderText('Hauteur'), '10');
      
      await userEvent.type(getFormElement('contactPhone'), '1234567890');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Annonce créée avec succès !')).toBeInTheDocument();
      });
    });

    it('should show general error on submission failure', async () => {
      mockOnSubmit.mockRejectedValue(new Error('Network error'));
      
      render(<AnnouncementForm {...defaultProps} />);
      
      // Fill all required fields
      await userEvent.type(getFormElement('title'), 'Test Title');
      await userEvent.type(getFormElement('description'), 'Test Description');
      
      const departureSelect = getFormElement('departure');
      const arrivalSelect = getFormElement('arrival');
      
      await userEvent.selectOptions(departureSelect, 'Casablanca');
      await userEvent.selectOptions(arrivalSelect, 'Marrakech');
      
      const dateInput = getFormElement('date');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await userEvent.type(dateInput, tomorrow.toISOString().split('T')[0]);
      
      const packageTypeSelect = getFormElement('packageType');
      await userEvent.selectOptions(packageTypeSelect, 'small');
      
      await userEvent.type(getFormElement('weight'), '5');
      await userEvent.type(getFormElement('price'), '150');
      
      await userEvent.type(screen.getByPlaceholderText('Longueur'), '20');
      await userEvent.type(screen.getByPlaceholderText('Largeur'), '15');
      await userEvent.type(screen.getByPlaceholderText('Hauteur'), '10');
      
      await userEvent.type(getFormElement('contactPhone'), '1234567890');
      
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Erreur lors de la création de l\'annonce. Veuillez réessayer.')).toBeInTheDocument();
      });
    });
  });

  describe('Form Actions', () => {
    it('should call onClose when cancel button is clicked', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const cancelButton = screen.getByRole('button', { name: /annuler/i });
      await userEvent.click(cancelButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should have proper button styling', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const cancelButton = screen.getByRole('button', { name: /annuler/i });
      const submitButton = screen.getByRole('button', { name: /créer l'annonce/i });
      
      expect(cancelButton).toHaveClass('border', 'border-gray-300', 'text-gray-700');
      expect(submitButton).toHaveClass('bg-red-600', 'text-white');
    });
  });

  describe('Character Counters', () => {
    it('should display character counter for title', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      expect(screen.getByText('0/100 caractères')).toBeInTheDocument();
    });

    it('should display character counter for description', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      expect(screen.getByText('0/500 caractères')).toBeInTheDocument();
    });

    it('should update character counter when typing', async () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const titleInput = getFormElement('title');
      await userEvent.type(titleInput, 'Test');
      
      expect(screen.getByText('4/100 caractères')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form role', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });

    it('should have proper button roles', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: /fermer/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /annuler/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /créer l'annonce/i })).toBeInTheDocument();
    });

    it('should have proper input labels', () => {
      render(<AnnouncementForm {...defaultProps} />);
      
      // Check that labels exist
      expect(screen.getByText('Titre de l\'annonce *')).toBeInTheDocument();
      expect(screen.getByText('Description détaillée *')).toBeInTheDocument();
      expect(screen.getByText('Ville de départ *')).toBeInTheDocument();
      expect(screen.getByText('Ville d\'arrivée *')).toBeInTheDocument();
      expect(screen.getByText('Date souhaitée *')).toBeInTheDocument();
      expect(screen.getByText('Type de colis *')).toBeInTheDocument();
      expect(screen.getByText('Poids (kg) *')).toBeInTheDocument();
      expect(screen.getByText('Prix proposé (MAD) *')).toBeInTheDocument();
      expect(screen.getByText('Téléphone de contact *')).toBeInTheDocument();
      
      // Check that inputs exist
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // title input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // description textarea
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // date input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // weight input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // price input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // phone input
    });
  });
});
