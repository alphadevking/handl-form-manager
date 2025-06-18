import { FormSubmissionsAllPage } from "~/forms/form-submissions-all";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "All Form Submissions" },
    { name: "description", content: "View all form submissions." },
  ];
}

export default function AllFormSubmissionsRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <FormSubmissionsAllPage />;
}
