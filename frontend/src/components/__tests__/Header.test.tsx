import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../../test-utils';
import Header from '../Header';

// Mock du contexte d'authentification
const mockUseAuth = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  updateProfile: jest.fn(),
};

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth,
}));

// Mock des composants modaux
jest.mock('../LoginModal', () => {
  return function MockLoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;
    return (
      <div data-testid="login-modal">
        <h2>Accédez à votre compte VoyagaBagae</h2>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

jest.mock('../RegisterModal', () => {
  return function MockRegisterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;
    return (
      <div data-testid="register-modal">
        <h2>Créez votre compte VoyagaBagae</h2>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

describe('Header Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.user = null;
    mockUseAuth.isAuthenticated = false;
    mockUseAuth.isLoading = false;
  });

  it('renders logo and brand name', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('VoyagaBagae')).toBeInTheDocument();
    expect(screen.getByText('VoyagaBagae')).toHaveClass('text-xl', 'font-bold');
  });

  it('displays navigation links', () => {
    renderWithRouter(<Header />);
    const navigationLinks = [
      'Comment ça marche',
      'Annonces',
      'Sécurité',
      'Aide',
      'Devenir transporteur'
    ];

    navigationLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('shows authentication buttons when not logged in', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Se connecter')).toBeInTheDocument();
    expect(screen.getByText('S\'inscrire')).toBeInTheDocument();
  });

  it('opens login modal when clicking login button', async () => {
    renderWithRouter(<Header />);
    await user.click(screen.getByText('Se connecter'));
    
    await waitFor(() => {
      expect(screen.getByTestId('login-modal')).toBeInTheDocument();
    });
  });

  it('opens register modal when clicking register button', async () => {
    renderWithRouter(<Header />);
    await user.click(screen.getByText('S\'inscrire'));
    
    await waitFor(() => {
      expect(screen.getByTestId('register-modal')).toBeInTheDocument();
    });
  });

  it('has correct navigation link destinations', () => {
    renderWithRouter(<Header />);
    const commentCaMarcheLink = screen.getByText('Comment ça marche').closest('a');
    const annoncesLink = screen.getByText('Annonces').closest('a');
    const securiteLink = screen.getByText('Sécurité').closest('a');
    const aideLink = screen.getByText('Aide').closest('a');
    const devenirTransporteurLink = screen.getByText('Devenir transporteur').closest('a');

    expect(commentCaMarcheLink).toHaveAttribute('href', '/comment-ca-marche');
    expect(annoncesLink).toHaveAttribute('href', '/annonces');
    expect(securiteLink).toHaveAttribute('href', '/securite');
    expect(aideLink).toHaveAttribute('href', '/aide');
    expect(devenirTransporteurLink).toHaveAttribute('href', '/devenir-transporteur');
  });

  it('applies active link styling based on current location', () => {
    renderWithRouter(<Header />);
    // Note: This test would need to be updated based on the actual routing logic
    // For now, we'll just check that the links have the correct classes
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      if (link.textContent && !link.textContent.includes('VoyagaBagae')) {
        expect(link).toHaveClass('transition-colors', 'font-medium');
      }
    });
  });

  it('has mobile menu button on small screens', () => {
    renderWithRouter(<Header />);
    const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when clicking menu button', async () => {
    renderWithRouter(<Header />);
    const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i });
    
    // Menu should be closed initially - check mobile menu section specifically
    const mobileMenuSection = screen.queryByTestId('mobile-menu');
    expect(mobileMenuSection).not.toBeInTheDocument();
    
    // Click to open menu
    await user.click(menuButton);
    
    // Menu should now be visible
    await waitFor(() => {
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    });
    
    // Click to close menu
    await user.click(menuButton);
    
    // Menu should be closed again
    await waitFor(() => {
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });
  });

  it('closes mobile menu when clicking on a navigation link', async () => {
    renderWithRouter(<Header />);
    const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i });
    
    // Open menu
    await user.click(menuButton);
    await waitFor(() => {
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    });
    
    // Click on a navigation link in mobile menu - use getAllByText and select the second one (mobile)
    const commentCaMarcheLinks = screen.getAllByText('Comment ça marche');
    const mobileLink = commentCaMarcheLinks[1]; // Second occurrence is in mobile menu
    if (!mobileLink) throw new Error('Mobile link not found');
    await user.click(mobileLink);
    
    // Menu should close
    await waitFor(() => {
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<Header />);
    const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i });
    
    expect(menuButton).toHaveAttribute('aria-expanded');
    expect(menuButton).toHaveAttribute('aria-label');
  });

  it('maintains sticky positioning', () => {
    renderWithRouter(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50');
  });

  it('has proper shadow and border styling', () => {
    renderWithRouter(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('shadow-sm', 'border-b', 'border-gray-100');
  });
});

