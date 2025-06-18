import { FormDefinitionDetailPage } from "~/forms/form-definition-detail";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "Form Definition Details" },
    { name: "description", content: "View and edit form definition details." },
  ];
}

export default function FormDefinitionDetailRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <FormDefinitionDetailPage />;
}
