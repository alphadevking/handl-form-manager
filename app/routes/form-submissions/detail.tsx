import { FormSubmissionDetailPage } from "~/forms/form-submission-detail";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
  return [
    { title: "Form Submission Details" },
    { name: "description", content: "View details of a specific form submission." },
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
