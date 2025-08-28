import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import LoginModal from '../LoginModal';

// Mock du contexte d'authentification
const mockLogin = jest.fn();
const mockOnClose = jest.fn();
const mockOnSwitchToRegister = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

describe('LoginModal Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderModal = () => {
    return render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    );
  };

  it('renders login form when open', () => {
    renderModal();
    
    expect(screen.getByRole('heading', { name: 'Se connecter' })).toBeInTheDocument();
    expect(screen.getByText('Accédez à votre compte VoyagaBagae')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre mot de passe')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <LoginModal
        isOpen={false}
        onClose={mockOnClose}
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    );
    
    expect(screen.queryByText('Se connecter')).not.toBeInTheDocument();
  });

  it('has close button', () => {
    renderModal();
    
    // Le bouton de fermeture est le premier bouton
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('closes modal when clicking close button', async () => {
    renderModal();
    
    // Trouver le premier bouton (bouton de fermeture)
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons[0];
    if (!closeButton) throw new Error('Close button not found');
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has email and password input fields', () => {
    renderModal();
    
    const emailInput = screen.getByPlaceholderText('votre@email.com');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('has password visibility toggle', () => {
    renderModal();
    
    // Le bouton de visibilité est le deuxième bouton (après le bouton de fermeture)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1);
  });

  it('toggles password visibility when clicking toggle button', async () => {
    renderModal();
    
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    const buttons = screen.getAllByRole('button');
    const toggleButton = buttons[1];
    if (!toggleButton) throw new Error('Toggle button not found');
    
    // Password should be hidden initially
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click toggle to show password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Click toggle to hide password again
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('has remember me checkbox', () => {
    renderModal();
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByText('Se souvenir de moi')).toBeInTheDocument();
  });

  it('has forgot password link', () => {
    renderModal();
    
    const forgotPasswordLink = screen.getByText('Mot de passe oublié ?');
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  it('has submit button', () => {
    renderModal();
    
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('has switch to register link', () => {
    renderModal();
    
    const switchLink = screen.getByText('S\'inscrire');
    expect(switchLink).toBeInTheDocument();
  });

  it('switches to register modal when clicking register link', async () => {
    renderModal();
    
    const switchLink = screen.getByText('S\'inscrire');
    await user.click(switchLink);
    
    expect(mockOnSwitchToRegister).toHaveBeenCalledTimes(1);
  });

  it('has terms and conditions link', () => {
    renderModal();
    
    const termsLink = screen.getByText('Conditions d\'utilisation');
    expect(termsLink).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    mockLogin.mockResolvedValue(true);
    
    renderModal();
    
    const emailInput = screen.getByPlaceholderText('votre@email.com');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('handles successful login', async () => {
    mockLogin.mockResolvedValue(true);
    
    renderModal();
    
    const emailInput = screen.getByPlaceholderText('votre@email.com');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('handles failed login', async () => {
    mockLogin.mockResolvedValue(false);
    
    renderModal();
    
    const emailInput = screen.getByPlaceholderText('votre@email.com');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Identifiants incorrects. Veuillez réessayer.')).toBeInTheDocument();
    });
  });

  it('clears error when user types', async () => {
    mockLogin.mockResolvedValue(false);
    
    renderModal();
    
    const emailInput = screen.getByPlaceholderText('votre@email.com');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });
    
    // Submit with invalid data to show error
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Identifiants incorrects. Veuillez réessayer.')).toBeInTheDocument();
    });
    
    // Type in email field to clear error
    await user.type(emailInput, 'new@example.com');
    
    // Error should be cleared
    expect(screen.queryByText('Identifiants incorrects. Veuillez réessayer.')).not.toBeInTheDocument();
  });

  it('resets form when closing', async () => {
    renderModal();
    
    const emailInput = screen.getByPlaceholderText('votre@email.com');
    const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
    
    // Fill form
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    // Close modal
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons[0];
    if (!closeButton) throw new Error('Close button not found');
    await user.click(closeButton);
    
    // Reopen modal
    renderModal();
    
    // Form should be reset - utiliser getAllByPlaceholderText pour éviter l'erreur de doublon
    const emailInputs = screen.getAllByPlaceholderText('votre@email.com');
    const passwordInputs = screen.getAllByPlaceholderText('Votre mot de passe');
    expect(emailInputs[0]).toHaveValue('');
    expect(passwordInputs[0]).toHaveValue('');
  });
});

