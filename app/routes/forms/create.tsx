import { FormDefinitionCreatePage } from "~/forms/form-definition-create";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "Create Form Definition" },
    { name: "description", content: "Create a new form definition." },
  ];
}

export default function CreateFormDefinitionRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <FormDefinitionCreatePage />;
}
