import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router'; // Changed useNavigate to Navigate
import { useAuth } from '~/contexts/AuthContext';
import { Preloader } from '~/components/preloader';

// Defines metadata for the OAuth callback page.
export function meta() {
  return [
    { title: "OAuth Callback" },
    { name: "description", content: "Processing OAuth authentication callback" },
  ];
}

// Handles the OAuth callback logic and redirects based on authentication status.
const OAuthCallback = () => {
    const location = useLocation();
    const { isLoading, isAuthenticated, checkAuthStatus } = useAuth();

    // Handles OAuth callback processing to update authentication status.
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const success = params.get('success');
        const userId = params.get('userId');

        if (success === 'true' && userId) {
            // Call checkAuthStatus to update authentication state
            checkAuthStatus();
        } else {
            console.error('Authentication failed');
            // No direct navigation here, rely on Navigate component below
        }
    }, [location, checkAuthStatus]); // Removed navigate from dependencies as it's not used here

    // Show preloader while authentication status is loading
    if (isLoading) {
        return <Preloader />;
    }

    // Redirect to dashboard if authenticated, otherwise to signon
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    } else {
        return <Navigate to="/signon" replace />;
    }
};

export default OAuthCallback;
