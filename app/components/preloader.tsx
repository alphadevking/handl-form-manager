export const Preloader = () => {
    return (
        <div className="bg-black flex justify-center items-center h-screen w-screen">
            {/* Tailwind CSS Spinner */}
            <div
                className="w-16 h-16 border-4 bg-foreground/10 border-b-accent-foreground border-t-transparent rounded-full animate-spin"
            ></div>
        </div>
    );
};
