import { LoadingSpinner } from "./LoadingSpinner";

export function LoadingButton({
    isLoading,
    children,
    loadingText = "Loading...",
    className = "",
    ...props
}) {
    return (
        <button
            className={`flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <LoadingSpinner size="h-4 w-4" />
                    <span className="ml-2">{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}