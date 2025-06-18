import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { isLoading } = useAuth();

  if (isLoading) {
    // Optionally render a loading spinner or skeleton
    return <div>Loading...</div>;
  }

  return <Welcome />;
}
