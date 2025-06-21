import { FormSubmissionsAllPage } from "~/forms/form-submissions-all";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
  return [
    { title: "Handl Form Manager - All Form Submissions" },
    { name: "description", content: "Browse and manage all form submissions in Handl Form Manager." },
    { name: "keywords", content: "form submissions, data management, form data, submissions" },
    { name: "robots", content: "index, nofollow" },
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
