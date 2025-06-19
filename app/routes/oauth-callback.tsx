import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '~/contexts/AuthContext';
import AppLayout from '~/layouts/AppLayout';
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
    const navigate = useNavigate();
    const { isLoading, isAuthenticated, checkAuthStatus } = useAuth();

    // Handles OAuth callback processing and redirection based on authentication status.
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const success = params.get('success');
        const userId = params.get('userId');

        if (success === 'true' && userId) {
            // Call checkAuthStatus to update authentication state
            checkAuthStatus();
        } else {
            console.error('Authentication failed');
            // Redirect to signon page on failure
            navigate('/sign-on');
        }

        // Redirect once authentication status is determined and not loading
        if (!isLoading) {
            if (isAuthenticated) {
                navigate('/dashboard');
            } else {
                navigate('/sign-on');
            }
        }
    }, [location, navigate, checkAuthStatus, isLoading, isAuthenticated]);

    // Show preloader while authentication status is loading
    if (isLoading) {
        return <Preloader />;
    }

    return (
        <AppLayout>
            <div>Processing OAuth Callback...</div>
        </AppLayout>
    );
};

export default OAuthCallback;
