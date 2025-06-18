import { FormDefinitionsListPage } from "~/forms/form-definitions-list";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "Form Definitions" },
    { name: "description", content: "Manage your form definitions." },
  ];
}

export default function FormDefinitionsRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <FormDefinitionsListPage />;
}
