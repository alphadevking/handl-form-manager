import { FormSubmissionsAllPage } from "~/forms/form-submissions-all";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
  return [
    { title: "All Form Submissions" },
    { name: "description", content: "View all form submissions." },
  ];
}

export default function AllFormSubmissionsRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <FormSubmissionsAllPage />
    </AppLayout>
  );
}
