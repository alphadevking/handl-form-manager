import { FormSubmissionsListPage } from "~/forms/form-submissions-list";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
  return [
    { title: "Handl Form Manager - Form Submissions" },
    { name: "description", content: "View and manage submissions for a specific form with Handl Form Manager." },
    { name: "keywords", content: "form submissions, data management, form data, custom forms" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function FormSubmissionsRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <FormSubmissionsListPage />
    </AppLayout>
  );
}
