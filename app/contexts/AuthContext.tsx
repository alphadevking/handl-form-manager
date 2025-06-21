import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, type ReactNode } from 'react';
import { getAuthStatus, logout } from '~/services/auth';
import { setAuthHeader } from '~/lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null; // TODO: Define a proper User interface
  checkAuthStatus: () => Promise<boolean>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode; }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null); // TODO: Define a proper User interface

  // Sets isAuthenticated and user state based on the API response.
  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    // console.log('checkAuthStatus: Setting isLoading to true');
    setIsLoading(true);
    try {
      const status = await getAuthStatus();
      // console.log('checkAuthStatus: Received status:', status);
      const isAuthenticatedStatus = status && typeof status.isAuthenticated === 'boolean' ? status.isAuthenticated : false;
      setIsAuthenticated(isAuthenticatedStatus);
      setUser(status.user || null);
      // Set authentication headers (API key and/or Bearer token from sessionStorage)
      setAuthHeader(status.user && typeof status.user === 'object' ? status.user.apiKey : null);
      return isAuthenticatedStatus;
    } catch (error) {
      console.error('checkAuthStatus: Failed to check auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
      // Clear authentication headers on auth check failure
      setAuthHeader();
      return false;
    } finally {
      // console.log('checkAuthStatus: Setting isLoading to false');
      setIsLoading(false);
    }
  }, []);

  /**
   * Handles user logout.
   * Calls the logout API and updates authentication state.
   */
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      // After logout, re-check auth status to update context based on API response
      await checkAuthStatus();
      // Clear authentication headers after successful logout
      setAuthHeader();
      // The component calling handleLogout will handle redirection/refresh
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, [checkAuthStatus]);

  /**
   * Checks the current authentication status on component mount.
   * Ensures checkAuthStatus is called only once on component mount, even in Strict Mode.
   */
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const initAuth = async () => {
        await checkAuthStatus();
      };
      initAuth();
    }
  }, [checkAuthStatus]);

  // Memoizes the context value to prevent unnecessary re-renders of consuming components.
  const contextValue = useMemo(() => ({
    isAuthenticated,
    isLoading,
    user,
    checkAuthStatus,
    handleLogout,
  }), [isAuthenticated, isLoading, user, checkAuthStatus, handleLogout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the authentication context.
 * @returns The AuthContextType object.
 * @throws An error if used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
