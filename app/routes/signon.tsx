import type { Route } from "./+types/signon";
import { SignOnPage } from "../signon/signon";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Sign On" },
    { name: "description", content: "Sign on to your account" },
  ];
}

export default function SignOnRoute() {
  return <SignOnPage />;
}
