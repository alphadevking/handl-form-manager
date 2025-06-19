import { FormSubmissionsListPage } from "~/forms/form-submissions-list";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
  return [
    { title: "Form Submissions" },
    { name: "description", content: "View submissions for a specific form." },
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
