import type { ReactNode } from "react";
import { ThemeProvider } from "~/components/theme-provider";
import { AuthProvider } from "~/contexts/AuthContext";

const AppProviders = ({ children }: { children: ReactNode; }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
};

export default AppProviders;
