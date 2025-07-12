import { LoadingSpinner } from "./LoadingSpinner";

export function LoadingOverlay({ isLoading, children }) {
    if (!isLoading) return children;

    return (
        <div className="relative">
            {children}

            <div className="fixed inset-0 z-50 bg-gray-50 bg-opacity-75 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <LoadingSpinner size="h-6 w-6" />
                    <span className="text-gray-600">Loading...</span>
                </div>
            </div>
        </div>
    );
}