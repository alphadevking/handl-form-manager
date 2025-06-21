import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import AppLayout from "~/layouts/AppLayout";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Handl Form Manager - Streamline Your Forms" },
    { name: "description", content: "Effortlessly create, manage, and submit forms with Handl Form Manager. Boost your productivity and simplify your workflow." },
    { name: "keywords", content: "form manager, form builder, online forms, data collection, react router, typescript" },
    { name: "robots", content: "index, follow" },
  ];
}

export default function Home() {
  return (
    <AppLayout>
      <Welcome />
    </AppLayout>
  );
}
