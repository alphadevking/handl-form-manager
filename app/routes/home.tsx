import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <AppLayout>
      <Welcome />
    </AppLayout>
  );
}
