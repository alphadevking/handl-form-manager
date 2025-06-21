import { FormDefinitionsListPage } from "~/forms/form-definitions-list";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
    return [
        { title: "Handl Form Manager - Form Definitions" },
        { name: "description", content: "Create, edit, and manage your form definitions with Handl Form Manager." },
        { name: "keywords", content: "form definitions, form builder, form management, custom forms" },
        { name: "robots", content: "index, nofollow" },
    ];
}

export default function FormDefinitionsRoute() {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <Preloader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <AppLayout>
            <FormDefinitionsListPage />
        </AppLayout>
    );
}
