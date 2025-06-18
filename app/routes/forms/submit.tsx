import { PublicFormSubmissionPage } from "~/forms/public-form-submission";

export function meta() {
  return [
    { title: "Submit Form" },
    { name: "description", content: "Submit data to a form." },
  ];
}

export default function PublicFormSubmitRoute() {
  // This page does not require authentication
  return <PublicFormSubmissionPage />;
}
