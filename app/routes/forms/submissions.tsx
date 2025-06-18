import { FormSubmissionsListPage } from "~/forms/form-submissions-list";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "Form Submissions" },
    { name: "description", content: "View submissions for a specific form." },
  ];
}

export default function FormSubmissionsRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <FormSubmissionsListPage />;
}
