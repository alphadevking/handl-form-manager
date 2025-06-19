import { FormDefinitionsListPage } from "~/forms/form-definitions-list";
import { useAuth } from "~/contexts/AuthContext";
import { Navigate } from "react-router";
import AppLayout from "~/layouts/AppLayout";
import { Preloader } from "~/components/preloader";

export function meta() {
    return [
        { title: "Form Definitions" },
        { name: "description", content: "Manage your form definitions." },
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
