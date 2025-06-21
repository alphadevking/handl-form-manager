import { Button } from "~/components/ui/button";
import { useAuth } from "~/contexts/AuthContext";
import { Link } from "react-router";
import { RefreshCw, Copy, Check } from "lucide-react";
import { useState } from "react";
import { generateApiKey } from "~/services/auth";
import { setAuthHeader } from "~/lib/api";

// Dashboard component
export function Dashboard() {
  const { handleLogout, user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState({
    copied: false,
    regenerating: false,
  });

  /**
   * Toggles the loading state for a specific action.
   * @param action - The action to toggle the loading state for ('copied' or 'regenerating').
   * @param isLoading - Whether the action is currently loading.
   */
  const toggleLoading = (action: "copied" | "regenerating", isLoading: boolean) => {
    setLoading((prev) => ({ ...prev, [action]: isLoading }));
  };

  /**
   * Handles the logout process and refreshes the page.
   */
  const onLogoutClick = async () => {
    await handleLogout();
    window.location.reload();
  };

  /**
   * Handles the regeneration of the API key.
   */
  const handleRegenerateApiKey = async () => {
    toggleLoading("regenerating", true);
    try {
      const newApiKey = await generateApiKey();
      setAuthHeader(newApiKey); // Update auth header with new API key
      if (user) {
        user.apiKey = newApiKey; // Update the user object with the new API key
      }
      // TODO: Implement success handling (e.g., display a success message)
    } catch (error) {
      console.error("Failed to regenerate API key:", error);
      // TODO: Implement error handling (e.g., display an error message)
    } finally {
      toggleLoading("regenerating", false);
    }
  };

  /**
   * Handles the copying of the API key to the clipboard.
   */
  const handleCopyApiKey = async () => {
    if (user?.apiKey) {
      try {
        await navigator.clipboard.writeText(user.apiKey);
        // console.log("API key copied to clipboard");
        toggleLoading("copied", true);
      } catch (error) {
        console.error("Failed to copy API key:", error);
        // TODO: Implement error handling (e.g., display an error message)
      } finally {
        setTimeout(() => toggleLoading("copied", false), 5000);
      }
    }
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[600px] w-full space-y-8 px-4 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-5 sm:text-6xl">
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
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xs bg-accent px-3 py-2 rounded-sm">{user.apiKey}</span>
                <Button
                  size="icon"
                  className="h-6 w-6 p-0"
                  onClick={handleCopyApiKey}
                  disabled={loading.copied || loading.regenerating}
                >
                  {loading.copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
                <Button
                  size="icon"
                  className="h-6 w-6 p-0"
                  onClick={handleRegenerateApiKey}
                  disabled={loading.copied || loading.regenerating}
                >
                  <RefreshCw className={`h-3 w-3 ${loading.regenerating ? "animate-spin" : ""}`} />
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
