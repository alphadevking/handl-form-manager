import { FormDefinitionDetailPage } from "~/forms/form-definition-detail";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
  return [
    { title: "Handl Form Manager - Form Definition Details" },
    { name: "description", content: "View and edit the details of your form definitions with Handl Form Manager." },
    { name: "keywords", content: "form details, form editor, form management, custom forms" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function FormDefinitionDetailRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <FormDefinitionDetailPage />
    </AppLayout>
  );
}
