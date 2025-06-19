import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Landing page
    index("routes/home.tsx"), // Changed to home.tsx as the landing page

    // Authentication routes
    route("/sign-on", "routes/signon.tsx"),

    // OAuth callback routes
    route("/:status/:param", "routes/oauth-callback.tsx"),

    // Authenticated dashboard
    route("/dashboard", "routes/dashboard.tsx"), // New dashboard route

    // Form Definition routes
    route("/forms", "routes/forms/index.tsx"), // Route for listing all form definitions
    route("/forms/create", "routes/forms/create.tsx"),
    route("/forms/:formId", "routes/forms/detail.tsx"), // For viewing/editing a specific form

    // Form Submission routes
    route("/form-submissions", "routes/form-submissions/index.tsx"), // Route for listing all form submissions
    route("/form-submissions/:submissionId", "routes/form-submissions/detail.tsx"), // Route for viewing a single form submission
    route("/forms/:formId/submit", "routes/forms/submit.tsx"), // For submitting data to a form
    route("/forms/:formId/submissions", "routes/forms/submissions.tsx"), // For viewing submissions of a form

] satisfies RouteConfig;
