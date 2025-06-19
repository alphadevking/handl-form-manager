import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'; // Changed useLocation to useParams
import AppLayout from '~/layouts/AppLayout';
import { Preloader } from '~/components/preloader';
import type { Route } from './+types/oauth-callback';

// Defines metadata for the OAuth callback page.
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "OAuth Callback" },
    { name: "description", content: "Processing OAuth authentication callback" },
  ];
}

// Handles the OAuth callback logic and redirects based on authentication status.
const OAuthCallback = () => {
    const { status, param } = useParams(); // Extract status and param from URL path
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleAuthCallback = async () => {
            setIsLoading(true);
            if (status === 'success' && param) {
                // User ID is available in 'param'
                navigate('/dashboard', { replace: true });
            } else if (status === 'failure') {
                // Error message is available in 'param'
                console.error('Authentication failed:', param);
                navigate('/sign-on', { replace: true });
            } else {
                console.error('Authentication callback received unknown status:', status);
                navigate('/sign-on', { replace: true });
            }
            setIsLoading(false);
        };

        handleAuthCallback();
    }, [navigate, param, status]); // Removed 'location' and added 'param', 'status'

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
