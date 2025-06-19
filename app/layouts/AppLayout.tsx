import type { ReactNode } from "react";
import { MainNav } from "../components/main-nav"; // Import the new MainNav component

export default function AppLayout({ children }: { children: ReactNode; }) {
    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center"> {/* Re-added container for MainNav */}
                    <MainNav /> {/* Render the MainNav component */}
                </div>
            </header>
            <main className="container mx-auto py-8">
                {children}
            </main>
        </>
    );
}
