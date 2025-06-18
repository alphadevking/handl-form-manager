import { Button } from "~/components/ui/button";
import { useAuth } from "~/contexts/AuthContext";
import { Link } from "react-router"; // Import Link

// Dashboard component
export function Dashboard() {
  const { handleLogout, user, isAuthenticated } = useAuth();

  /**
   * Handles the logout process and refreshes the page.
   */
  const onLogoutClick = async () => {
    await handleLogout();
    window.location.reload();
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[600px] w-full space-y-8 px-4 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl">
            Dashboard
          </h1>
          {isAuthenticated && user ? (
            <>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Welcome to your dashboard, {user.name || user.email}!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {/* Link to Manage Forms */}
                <Link to="/forms">
                  <Button className="px-6 py-3">
                    Manage Forms
                  </Button>
                </Link>
                {/* Link to All Submissions */}
                <Link to="/form-submissions">
                  <Button className="px-6 py-3">
                    All Submissions
                  </Button>
                </Link>
                <Button onClick={onLogoutClick} className="px-6 py-3">
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              You are not authenticated. Please log in.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
