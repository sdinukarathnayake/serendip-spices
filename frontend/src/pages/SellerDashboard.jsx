import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
    
    const navigate = useNavigate();

    const token = localStorage.getItem("token-ss");

    if (!token) {
        navigate("/login", { replace: true });
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem("token-ss");
        navigate("/login");
    };

    return (
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
        </div>
    );
}