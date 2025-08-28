import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithAuth } from '../../test-utils';
import RegisterModal from '../RegisterModal';

// Helper function to get form elements
const getFormElement = (name: string) => {
  const inputs = screen.getAllByDisplayValue('');
  switch (name) {
    case 'firstName':
      return inputs[0]; // Prénom input
    case 'lastName':
      return inputs[1]; // Nom input
    case 'email':
      return inputs[2]; // Email input
    case 'phone':
      return inputs[3]; // Phone input
    case 'password':
      return inputs[4]; // Password input
    case 'confirmPassword':
      return inputs[5]; // Confirm password input
    default:
      throw new Error(`Unknown form element: ${name}`);
  }
};

// Mock des fonctions
const mockOnClose = jest.fn();
const mockOnSwitchToLogin = jest.fn();

// Mock du contexte d'authentification
const mockRegister = jest.fn();
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    register: mockRegister,
  }),
}));

const defaultProps = {
  isOpen: true,
  onClose: mockOnClose,
  onSwitchToLogin: mockOnSwitchToLogin,
};

describe('RegisterModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Modal Visibility', () => {
    it('should not render when isOpen is false', () => {
      render(<RegisterModal {...defaultProps} isOpen={false} />);
      expect(screen.queryByText('Créer un compte')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(<RegisterModal {...defaultProps} />);
      expect(screen.getByText('Créer un compte')).toBeInTheDocument();
    });
  });

  describe('Modal Header', () => {
    it('should display correct title and subtitle', () => {
      render(<RegisterModal {...defaultProps} />);
      
      expect(screen.getByText('Créer un compte')).toBeInTheDocument();
      expect(screen.getByText('Rejoignez la communauté VoyagaBagae')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      await userEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should have proper close button styling', () => {
      render(<RegisterModal {...defaultProps} />);
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toHaveClass('absolute', 'top-4', 'right-4', 'text-gray-400');
    });
  });

  describe('Form Fields', () => {
    it('should have all required form fields', () => {
      render(<RegisterModal {...defaultProps} />);
      
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Prénom input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Nom input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Email input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Phone input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Password input
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Confirm password input
      expect(screen.getByRole('checkbox', { name: /j'accepte les conditions/i })).toBeInTheDocument();
    });

    it('should have proper input types', () => {
      render(<RegisterModal {...defaultProps} />);
      
      const inputs = screen.getAllByRole('textbox');
      const passwordInputs = screen.getAllByDisplayValue('');
      
      expect(inputs[0]).toHaveAttribute('type', 'text'); // Prénom
      expect(inputs[1]).toHaveAttribute('type', 'text'); // Nom
      expect(inputs[2]).toHaveAttribute('type', 'email'); // Email
      expect(inputs[3]).toHaveAttribute('type', 'tel'); // Phone
      expect(passwordInputs[4]).toHaveAttribute('type', 'password'); // Password
      expect(passwordInputs[5]).toHaveAttribute('type', 'password'); // Confirm password
    });

    it('should have proper placeholders', () => {
      render(<RegisterModal {...defaultProps} />);
      
      expect(screen.getByPlaceholderText('Prénom')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Nom')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('+212 6XX-XXX-XXX')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Confirmer le mot de passe')).toBeInTheDocument();
    });

    it('should have proper labels with required indicators', () => {
      render(<RegisterModal {...defaultProps} />);
      
      const labels = screen.getAllByText(/Prénom|Nom|Adresse email|Numéro de téléphone|Mot de passe|Confirmer le mot de passe/);
      labels.forEach(label => {
        expect(label).toHaveClass('font-semibold', 'text-gray-700');
      });
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility when eye icon is clicked', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      const passwordInputs = screen.getAllByDisplayValue('');
      const passwordInput = passwordInputs[4]; // Password input
      const confirmPasswordInput = passwordInputs[5]; // Confirm password input
      
      // Initially passwords should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');
      
      // Toggle password visibility
      const passwordToggle = screen.getAllByRole('button')[1]; // First toggle button
      await userEvent.click(passwordToggle);
      
      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    });

    it('should toggle confirm password visibility independently', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      const passwordInputs = screen.getAllByDisplayValue('');
      const confirmPasswordInput = passwordInputs[5]; // Confirm password input
      
      // Toggle confirm password visibility
      const confirmPasswordToggle = screen.getAllByRole('button')[2]; // Second toggle button
      await userEvent.click(confirmPasswordToggle);
      
      expect(confirmPasswordInput).toHaveAttribute('type', 'text');
    });
  });

  describe('Terms and Conditions', () => {
    it('should have terms and conditions checkbox', () => {
      render(<RegisterModal {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox', { name: /j'accepte les conditions/i });
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    it('should have terms and privacy policy buttons', () => {
      render(<RegisterModal {...defaultProps} />);
      
      expect(screen.getByText('Conditions d\'utilisation')).toBeInTheDocument();
      expect(screen.getByText('Politique de confidentialité')).toBeInTheDocument();
    });

    it('should toggle checkbox when clicked', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      const checkbox = screen.getByRole('checkbox', { name: /j'accepte les conditions/i });
      await userEvent.click(checkbox);
      
      expect(checkbox).toBeChecked();
    });
  });

  describe('Form Validation', () => {
    it('should show error for empty first name', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Le prénom est requis')).toBeInTheDocument();
    });

    it('should show error for empty last name', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      // Fill first name but leave last name empty
      await userEvent.type(getFormElement('firstName'), 'John');
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Le nom est requis')).toBeInTheDocument();
    });

    it('should show error for invalid email', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      // Fill required fields with invalid email
      await userEvent.type(getFormElement('firstName'), 'John');
      await userEvent.type(getFormElement('lastName'), 'Doe');
      await userEvent.type(getFormElement('email'), 'invalid-email');
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Veuillez entrer une adresse email valide')).toBeInTheDocument();
    });

    it('should show error for invalid phone number', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      // Fill required fields with invalid phone
      await userEvent.type(getFormElement('firstName'), 'John');
      await userEvent.type(getFormElement('lastName'), 'Doe');
      await userEvent.type(getFormElement('email'), 'test@example.com');
      await userEvent.type(getFormElement('phone'), '123');
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Numéro de téléphone invalide')).toBeInTheDocument();
    });

    it('should show error for short password', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      // Fill required fields with short password
      await userEvent.type(getFormElement('firstName'), 'John');
      await userEvent.type(getFormElement('lastName'), 'Doe');
      await userEvent.type(getFormElement('email'), 'test@example.com');
      await userEvent.type(getFormElement('phone'), '1234567890');
      await userEvent.type(getFormElement('password'), '123');
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Le mot de passe doit contenir au moins 6 caractères')).toBeInTheDocument();
    });

    it('should show error for mismatched passwords', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      // Fill required fields with mismatched passwords
      await userEvent.type(getFormElement('firstName'), 'John');
      await userEvent.type(getFormElement('lastName'), 'Doe');
      await userEvent.type(getFormElement('email'), 'test@example.com');
      await userEvent.type(getFormElement('phone'), '1234567890');
      await userEvent.type(getFormElement('password'), 'password123');
      await userEvent.type(getFormElement('confirmPassword'), 'different123');
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
    });

    it('should show error for unchecked terms', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      // Fill all required fields but don't check terms
      await userEvent.type(getFormElement('firstName'), 'John');
      await userEvent.type(getFormElement('lastName'), 'Doe');
      await userEvent.type(getFormElement('email'), 'test@example.com');
      await userEvent.type(getFormElement('phone'), '1234567890');
      await userEvent.type(getFormElement('password'), 'password123');
      await userEvent.type(getFormElement('confirmPassword'), 'password123');
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Vous devez accepter les conditions d\'utilisation')).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should call register function with correct data on successful submission', async () => {
      mockRegister.mockResolvedValue(true);
      
      render(<RegisterModal {...defaultProps} />);
      
      // Fill all required fields
      await userEvent.type(getFormElement('firstName'), 'John');
      await userEvent.type(getFormElement('lastName'), 'Doe');
      await userEvent.type(getFormElement('email'), 'test@example.com');
      await userEvent.type(getFormElement('phone'), '1234567890');
      await userEvent.type(getFormElement('password'), 'password123');
      await userEvent.type(getFormElement('confirmPassword'), 'password123');
      
      const checkbox = screen.getByRole('checkbox', { name: /j'accepte les conditions/i });
      await userEvent.click(checkbox);
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith({
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          phone: '1234567890',
          isCarrier: false,
        });
      });
    });

    it('should close modal on successful registration', async () => {
      mockRegister.mockResolvedValue(true);
      
      render(<RegisterModal {...defaultProps} />);
      
      // Fill all required fields
      await userEvent.type(getFormElement('firstName'), 'John');
      await userEvent.type(getFormElement('lastName'), 'Doe');
      await userEvent.type(getFormElement('email'), 'test@example.com');
      await userEvent.type(getFormElement('phone'), '1234567890');
      await userEvent.type(getFormElement('password'), 'password123');
      await userEvent.type(getFormElement('confirmPassword'), 'password123');
      
      const checkbox = screen.getByRole('checkbox', { name: /j'accepte les conditions/i });
      await userEvent.click(checkbox);
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('should not close modal on failed registration', async () => {
      mockRegister.mockResolvedValue(false);
      
      render(<RegisterModal {...defaultProps} />);
      
      // Fill all required fields
      await userEvent.type(getFormElement('firstName'), 'John');
      await userEvent.type(getFormElement('lastName'), 'Doe');
      await userEvent.type(getFormElement('email'), 'test@example.com');
      await userEvent.type(getFormElement('phone'), '1234567890');
      await userEvent.type(getFormElement('password'), 'password123');
      await userEvent.type(getFormElement('confirmPassword'), 'password123');
      
      const checkbox = screen.getByRole('checkbox', { name: /j'accepte les conditions/i });
      await userEvent.click(checkbox);
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
        expect(screen.getByText('Erreur lors de l\'inscription. Veuillez réessayer.')).toBeInTheDocument();
      });
    });

    it('should show general error on registration failure', async () => {
      mockRegister.mockRejectedValue(new Error('Network error'));
      
      render(<RegisterModal {...defaultProps} />);
      
      // Fill all required fields
      await userEvent.type(getFormElement('firstName'), 'John');
      await userEvent.type(getFormElement('lastName'), 'Doe');
      await userEvent.type(getFormElement('email'), 'test@example.com');
      await userEvent.type(getFormElement('phone'), '1234567890');
      await userEvent.type(getFormElement('password'), 'password123');
      await userEvent.type(getFormElement('confirmPassword'), 'password123');
      
      const checkbox = screen.getByRole('checkbox', { name: /j'accepte les conditions/i });
      await userEvent.click(checkbox);
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Erreur lors de l\'inscription. Veuillez réessayer.')).toBeInTheDocument();
      });
    });
  });

  describe('Switch to Login', () => {
    it('should call onSwitchToLogin when login link is clicked', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      const loginLink = screen.getByText('Se connecter');
      await userEvent.click(loginLink);
      
      expect(mockOnSwitchToLogin).toHaveBeenCalledTimes(1);
    });

    it('should display correct login prompt text', () => {
      render(<RegisterModal {...defaultProps} />);
      
      expect(screen.getByText('Déjà un compte ?')).toBeInTheDocument();
      expect(screen.getByText('Se connecter')).toBeInTheDocument();
    });
  });

  describe('Form Styling', () => {
    it('should have proper form styling', () => {
      render(<RegisterModal {...defaultProps} />);
      
      const form = screen.getByRole('form');
      expect(form).toHaveClass('space-y-6');
    });

    it('should have proper input styling', () => {
      render(<RegisterModal {...defaultProps} />);
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveClass('border', 'rounded-lg', 'focus:ring-2', 'focus:ring-red-500');
      });
    });

    it('should have proper submit button styling', () => {
      render(<RegisterModal {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      expect(submitButton).toHaveClass('bg-red-600', 'text-white', 'rounded-lg', 'font-semibold');
    });
  });

  describe('Error Display', () => {
    it('should display field-specific errors below inputs', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Le prénom est requis')).toBeInTheDocument();
      expect(screen.getByText('Le nom est requis')).toBeInTheDocument();
    });

    it('should clear field errors when user starts typing', async () => {
      render(<RegisterModal {...defaultProps} />);
      
      // Submit empty form to show errors
      const submitButton = screen.getByRole('button', { name: /créer mon compte/i });
      await userEvent.click(submitButton);
      
      expect(screen.getByText('Le prénom est requis')).toBeInTheDocument();
      
      // Start typing in first name field
      const firstNameInput = screen.getAllByDisplayValue('')[0]; // Prénom input
      await userEvent.type(firstNameInput, 'J');
      
      // Error should be cleared
      expect(screen.queryByText('Le prénom est requis')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form role', () => {
      render(<RegisterModal {...defaultProps} />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });

    it('should have proper button roles', () => {
      render(<RegisterModal {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /créer mon compte/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    });

    it('should have proper input labels', () => {
      render(<RegisterModal {...defaultProps} />);
      
      expect(screen.getByText('Prénom')).toBeInTheDocument();
      expect(screen.getByText('Nom')).toBeInTheDocument();
      expect(screen.getByText('Adresse email')).toBeInTheDocument();
      expect(screen.getByText('Numéro de téléphone')).toBeInTheDocument();
      expect(screen.getByText('Mot de passe')).toBeInTheDocument();
      expect(screen.getByText('Confirmer le mot de passe')).toBeInTheDocument();
    });
  });
});
