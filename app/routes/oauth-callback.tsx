import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getAuthStatus } from '../services/auth';
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const success = params.get('success');
        const userId = params.get('userId');

        const handleAuthCallback = async () => {
            setIsLoading(true);
            if (success === 'true' && userId) {
                try {
                    // Call getAuthStatus directly from services/auth
                    const status = await getAuthStatus();
                    // Directly use status.isAuthenticated for navigation
                    if (status.isAuthenticated) {
                        navigate('/dashboard', { replace: true });
                    } else {
                        navigate('/sign-on', { replace: true });
                    }
                } catch (error) {
                    console.error('Authentication failed:', error);
                    navigate('/sign-on', { replace: true });
                }
            } else {
                console.error('Authentication failed: No success or userId in params');
                navigate('/sign-on', { replace: true }); // Consistent redirection on failure
            }
            setIsLoading(false);
        };

        handleAuthCallback();
    }, [location, navigate]);

    // Show preloader while authentication status is loading
    if (isLoading) {
        return <Preloader />;
    }

    // This return is a fallback, actual navigation happens in useEffect
    return (
        <AppLayout>
            <div>Processing OAuth Callback...</div>
        </AppLayout>
    );
};

export default OAuthCallback;
