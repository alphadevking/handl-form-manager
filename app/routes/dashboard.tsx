import { Dashboard } from "../dashboard/dashboard";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";

export function meta() {
  return [
    { title: "Dashboard" },
    { name: "description", content: "User dashboard for Handl." },
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

  return <Dashboard />;
}
