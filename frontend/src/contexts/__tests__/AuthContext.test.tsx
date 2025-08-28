import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../AuthContext';

// Composant de test pour accéder au contexte
const TestComponent = () => {
  const { user, isAuthenticated, isLoading, login, register, logout, updateProfile } = useAuth();
  
  return (
    <div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="user-name">{user?.firstName || 'No user'}</div>
      <button onClick={() => login('test@example.com', 'password')} data-testid="login-btn">
        Login
      </button>
      <button onClick={() => register({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+212 6XX-XXX-XXX',
        isCarrier: false
      })} data-testid="register-btn">
        Register
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
      <button onClick={() => updateProfile({ firstName: 'Jane' })} data-testid="update-btn">
        Update Profile
      </button>
    </div>
  );
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
    localStorageMock.removeItem.mockImplementation(() => {});
  });

  it('renders without crashing', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('starts with loading state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // Initially loading should be true
    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
  });

  it('initializes with no user', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user-name')).toHaveTextContent('No user');
  });

  it('loads user from localStorage on mount', async () => {
    const mockUser = {
      id: '1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+212 6XX-XXX-XXX',
      rating: 4.5,
      reviews: 10,
      isCarrier: false,
      avatar: 'test-avatar.jpg'
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Test');
  });

  it('handles localStorage error gracefully', async () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });

  it('handles login successfully', async () => {
    const user = userEvent.setup();
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    
    const loginButton = screen.getByTestId('login-btn');
    await user.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
    
    expect(screen.getByTestId('user-name')).toHaveTextContent('Utilisateur');
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('handles registration successfully', async () => {
    const user = userEvent.setup();
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    
    const registerButton = screen.getByTestId('register-btn');
    await user.click(registerButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
    
    expect(screen.getByTestId('user-name')).toHaveTextContent('John');
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('handles logout', async () => {
    const user = userEvent.setup();
    
    // First login to have a user
    localStorageMock.getItem.mockReturnValue(JSON.stringify({
      id: '1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+212 6XX-XXX-XXX',
      rating: 4.5,
      reviews: 10,
      isCarrier: false,
      avatar: 'test-avatar.jpg'
    }));
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
    
    const logoutButton = screen.getByTestId('logout-btn');
    await user.click(logoutButton);
    
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user-name')).toHaveTextContent('No user');
    expect(localStorageMock.removeItem).toHaveBeenCalled();
  });

  it('handles profile update', async () => {
    const user = userEvent.setup();
    
    // First login to have a user
    localStorageMock.getItem.mockReturnValue(JSON.stringify({
      id: '1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+212 6XX-XXX-XXX',
      rating: 4.5,
      reviews: 10,
      isCarrier: false,
      avatar: 'test-avatar.jpg'
    }));
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
    
    const updateButton = screen.getByTestId('update-btn');
    await user.click(updateButton);
    
    expect(screen.getByTestId('user-name')).toHaveTextContent('Jane');
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
});

