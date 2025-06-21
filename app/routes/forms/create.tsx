import { FormDefinitionCreatePage } from "~/forms/form-definition-create";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
  return [
    { title: "Handl Form Manager - Create Form Definition" },
    { name: "description", content: "Create new form definitions with Handl Form Manager's intuitive form builder." },
    { name: "keywords", content: "form builder, create form, custom forms, form design" },
    { name: "robots", content: "noindex, nofollow" },
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
