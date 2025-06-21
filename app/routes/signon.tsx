import type { Route } from "./+types/signon";
import { SignOnPage } from "../signon/signon";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Handl Form Manager - Sign On" },
    { name: "description", content: "Sign on to your Handl Form Manager account to manage your forms and submissions." },
    { name: "keywords", content: "sign on, login, account management, form manager" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function SignOnRoute() {
  return <SignOnPage />;
}
