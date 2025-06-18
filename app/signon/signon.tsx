import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { googleLogin } from '~/services/auth';
import { useNavigate } from 'react-router';
import { useAuth } from '~/contexts/AuthContext'; // Import useAuth
import { useEffect } from 'react';

export function SignOnPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth(); // Use states from AuthContext

  useEffect(() => {
    // If already authenticated and not loading, redirect to home
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]); // Dependencies include isAuthenticated, isLoading

  // Handle Google sign-in
  const handleGoogleSignIn = () => {
    googleLogin();
  };

  if (isLoading) {
    // Show loading state while AuthContext is checking status
    return <div className="flex min-h-screen items-center justify-center">Loading authentication...</div>;
  }

  // Only render the sign-on form if not authenticated
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign On</CardTitle>
          <CardDescription>
            Sign on to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={handleGoogleSignIn} className="w-full">
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
