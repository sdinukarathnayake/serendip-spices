import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TOKEN_KEY } from "../api/apiClient";
import { LoadingOverlay } from "../components/common/LoadingOverlay";

export default function SellerDashboard() {
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem(TOKEN_KEY);

    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }
        
        // loading dashboard data
        const loadDashboardData = async () => {
            try {
                // Add API calls here to load dashboard data
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading dashboard:", error);
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        navigate("/login", { replace: true });
    };

    if (!token) {
        return null;
    }

    return (
        <LoadingOverlay isLoading={isLoading}>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Seller Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">My Products</h2>
                        <p className="text-gray-600">Manage your product listings</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Orders</h2>
                        <p className="text-gray-600">View and manage orders</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                        <p className="text-gray-600">View sales analytics</p>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    );
}