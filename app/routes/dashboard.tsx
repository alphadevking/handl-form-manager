import { Dashboard } from "../dashboard/dashboard";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";

export function meta() {
  return [
    { title: "Handl Form Manager - Dashboard" },
    { name: "description", content: "Manage your forms and submissions with ease on the Handl Form Manager dashboard." },
    { name: "keywords", content: "form manager, dashboard, form submissions, user management" },
    { name: "robots", content: "index, nofollow" },
  ];
}

export default function DashboardRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    // Optionally render a loading spinner or skeleton
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-on" replace />;
  }

  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}
