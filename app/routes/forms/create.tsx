import { FormDefinitionCreatePage } from "~/forms/form-definition-create";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
  return [
    { title: "Create Form Definition" },
    { name: "description", content: "Create a new form definition." },
  ];
}

export default function CreateFormDefinitionRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <FormDefinitionCreatePage />
    </AppLayout>
  );
}
