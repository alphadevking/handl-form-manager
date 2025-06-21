import { FormSubmissionDetailPage } from "~/forms/form-submission-detail";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
  return [
    { title: "Handl Form Manager - Form Submission Details" },
    { name: "description", content: "View the details of a specific form submission with Handl Form Manager." },
    { name: "keywords", content: "form submission details, data management, form data, custom forms" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function FormSubmissionDetailRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <FormSubmissionDetailPage />
    </AppLayout>
  );
}
