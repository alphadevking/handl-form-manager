import { PublicFormSubmissionPage } from "~/forms/public-form-submission";

export function meta() {
  return [
    { title: "Handl Form Manager - Submit Form" },
    { name: "description", content: "Submit your data to a form using Handl Form Manager." },
    { name: "keywords", content: "form submission, submit form, data collection, custom forms" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function PublicFormSubmitRoute() {
  // This page does not require authentication
  return <PublicFormSubmissionPage />;
}
