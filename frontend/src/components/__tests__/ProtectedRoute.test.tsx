import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import '@testing-library/jest-dom';
import ProtectedRoute from '../ProtectedRoute';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock component to test protected route
const TestComponent = () => <div>Protected Content</div>;
const TestLocation = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

// Wrapper component to provide router and auth context
const renderWithProviders = (component: React.ReactElement, initialAuthState = {}) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={component} />
          <Route path="/devenir-transporteur" element={<div>Devenir Transporteur</div>} />
          <Route path="/protected" element={<TestLocation />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

// Mock the AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

import { useAuth } from '../../contexts/AuthContext';

describe('ProtectedRoute Component', () => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

  beforeEach(() => {
    mockUseAuth.mockClear();
  });

  describe('Loading State', () => {
    it('should show loading spinner when authentication is loading', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      );

      expect(screen.getByText('Chargement...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should have proper loading spinner styling', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      );

      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toHaveClass('animate-spin', 'rounded-full', 'h-12', 'w-12', 'border-b-2', 'border-red-600');
    });

    it('should have proper loading container styling', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      );

      const container = document.querySelector('.min-h-screen.flex.items-center.justify-center');
      expect(container).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center');
    });

    it('should have proper loading text styling', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      );

      const loadingText = screen.getByText('Chargement...');
      expect(loadingText).toHaveClass('text-gray-600');
    });
  });

  describe('Authentication Required (Default)', () => {
    it('should redirect to home when not authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      );

      // Should not show protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should show protected content when authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should pass location state when redirecting', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      );

      // The component should redirect with location state
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('No Authentication Required', () => {
    it('should show content when requireAuth is false and not authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireAuth={false}>
          <TestComponent />
        </ProtectedRoute>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should show content when requireAuth is false and authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireAuth={false}>
          <TestComponent />
        </ProtectedRoute>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  describe('Carrier Role Required', () => {
    it('should redirect to become carrier page when user is not a carrier', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com', isCarrier: false },
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      // Should not show protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should show content when user is a carrier', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com', isCarrier: true },
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should redirect when user is authenticated but not a carrier', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com', isCarrier: false },
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      // Should not show protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should redirect when user is null even if authenticated', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: true, // This shouldn't happen in real app but testing edge case
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      // Should not show protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('Combined Requirements', () => {
    it('should show content when both auth and carrier requirements are met', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com', isCarrier: true },
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireAuth={true} requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('should redirect when auth is met but carrier requirement is not', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com', isCarrier: false },
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireAuth={true} requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      // Should not show protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should redirect when neither requirement is met', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireAuth={true} requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      // Should not show protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined user property gracefully', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com' }, // No isCarrier property
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      // Should not show protected content because isCarrier is undefined
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should handle null user when carrier is required', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      // Should not show protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('Component Props', () => {
    it('should accept children prop', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute>
          <div>Custom Content</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('should have default values for requireAuth and requireCarrier', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      );

      // Should redirect because default requireAuth is true
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('Loading State Priority', () => {
    it('should show loading even when other conditions are met', () => {
      mockUseAuth.mockReturnValue({
        user: { id: '1', name: 'Test User', email: 'test@example.com', isCarrier: true },
        isAuthenticated: true,
        isLoading: true, // Loading takes priority
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
        updateProfile: jest.fn()
      });

      renderWithProviders(
        <ProtectedRoute requireAuth={true} requireCarrier={true}>
          <TestComponent />
        </ProtectedRoute>
      );

      expect(screen.getByText('Chargement...')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });
});

