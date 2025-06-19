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

  // Checks the current authentication status of the user.
  // Sets isAuthenticated and user state based on the API response.
  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const status = await getAuthStatus();
      setIsAuthenticated(status.isAuthenticated);
      setUser(status.user || null);
      setAuthHeader(status.user?.apiKey || null); // Set API key if available
      return status.isAuthenticated;
    } catch (error) {
      console.error('Failed to check auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
      setAuthHeader(null); // Clear API key on auth check failure
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handles user logout.
   * Calls the logout API and updates authentication state.
   * If the logout API returns a truthy status, it means logout was not successful,
   * and isAuthenticated context should not be cleaned.
   */
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      // After logout, re-check auth status to update context based on API response
      await checkAuthStatus();
      setAuthHeader(null); // Explicitly clear API key on successful logout
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
