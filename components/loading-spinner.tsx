export function LoadingSpinner() {
    return (
        <div className="flex min-h-dvh items-center justify-center bg-secondary">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
    );
}
