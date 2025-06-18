import { FormSubmissionDetailPage } from "~/forms/form-submission-detail";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "Form Submission Details" },
    { name: "description", content: "View details of a specific form submission." },
  ];
}

export default function FormSubmissionDetailRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <FormSubmissionDetailPage />;
}
